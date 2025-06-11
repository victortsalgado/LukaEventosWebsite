import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { Client } from '@replit/object-storage';

const app = express();
const client = new Client();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Endpoint de debug para object storage (antes do setupVite)
app.get("/api/storage/debug", async (req: Request, res: Response) => {
  try {
    console.log("🔍 Listando todos os arquivos no object storage...");
    const result = await client.list();
    
    console.log("📋 Resultado bruto da listagem:", JSON.stringify(result, null, 2));
    
    res.json({
      success: true,
      rawResult: result,
      resultType: typeof result,
      hasOk: result && typeof result === 'object' && 'ok' in result,
      okValue: result && typeof result === 'object' && 'ok' in result ? result.ok : null
    });
  } catch (error: any) {
    console.error("❌ Erro ao listar arquivos:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});



app.get("/api/images/:folder/:filename", async (req: Request, res: Response) => {
  try {
    const { folder, filename } = req.params;
    const filePath = `${folder}/${filename}`;

    console.log(`Tentando carregar imagem: ${filePath}`);

    // Baixar imagem do object storage
    const downloadResult = await client.downloadAsBytes(filePath);
    
    console.log(`Resultado do download:`, typeof downloadResult, downloadResult);

    // Verificar se o resultado é válido
    let imageBuffer;
    
    // Tentar diferentes formatos de resposta do client
    if (downloadResult && typeof downloadResult === 'object') {
      if ('ok' in downloadResult && downloadResult.ok) {
        // Formato Result com ok: true
        imageBuffer = (downloadResult as any).val?.[0] || (downloadResult as any).value?.[0];
      } else if (Buffer.isBuffer(downloadResult)) {
        // Resultado direto como Buffer
        imageBuffer = downloadResult;
      } else if (downloadResult instanceof Uint8Array) {
        // Resultado como Uint8Array
        imageBuffer = Buffer.from(downloadResult);
      } else if (Array.isArray(downloadResult) && downloadResult.length > 0) {
        // Resultado como array de buffers
        imageBuffer = downloadResult[0];
      }
    } else if (Buffer.isBuffer(downloadResult)) {
      imageBuffer = downloadResult;
    }
    
    if (!imageBuffer || imageBuffer.length === 0) {
      console.log(`Imagem não encontrada ou vazia: ${filePath}`);
      return res.status(404).send('Imagem não encontrada no Object Storage');
    }

    const extension = filename.split('.').pop()?.toLowerCase();
    let contentType = 'application/octet-stream';

    switch (extension) {
      case 'png':
        contentType = 'image/png';
        break;
      case 'jpg':
      case 'jpeg':
        contentType = 'image/jpeg';
        break;
      case 'gif':
        contentType = 'image/gif';
        break;
      case 'webp':
        contentType = 'image/webp';
        break;
      case 'svg':
        contentType = 'image/svg+xml';
        break;
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    
    console.log(`Servindo imagem com sucesso: ${filePath}, tamanho: ${imageBuffer.length} bytes`);
    res.send(imageBuffer);

  } catch (error: any) {
    console.error(`Erro ao buscar imagem ${req.params.folder}/${req.params.filename}:`, error);
    res.status(500).send("Erro interno do servidor ao buscar imagem");
  }
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
