import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { Client } from '@replit/object-storage';

const app = express();
const client = new Client();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cache para otimizar performance
let imageCache: { [key: string]: any } = {};
let cacheExpiry: { [key: string]: number } = {};
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos

// Endpoint para buscar imagens de uma pasta específica (antes do setupVite)
app.get("/api/storage/images/:folder", async (req: Request, res: Response) => {
  try {
    const { folder } = req.params;
    const now = Date.now();
    
    // Verificar cache
    if (imageCache[folder] && cacheExpiry[folder] > now) {
      return res.json(imageCache[folder]);
    }
    
    console.log(`🔍 Buscando imagens da pasta: ${folder}`);
    
    const result = await client.list();
    
    if (!result || typeof result !== 'object' || !('ok' in result) || !result.ok) {
      return res.status(500).json({ success: false, message: "Falha ao listar arquivos" });
    }
    
    const files = (result as any).value || [];
    
    // Lista de arquivos problemáticos conhecidos que falham no carregamento
    const problematicFiles = [
      'locacao_mesa_cadeira.png', // Locacao - falha no carregamento  
      'buffet_tabuadefrios.png', // Buffet - falha no carregamento
      'exposibram_dinamica.png', // Feiras - falha no carregamento
      'supernorte_bendo_alimentos.png', // Feiras - falha no carregamento
      'supernorte_marata.png', // Feiras - falha no carregamento
      'supernorte_okajima.png', // Feiras - falha no carregamento
      'promotoras_1.png', // Equipes - falha no carregamento
    ];
    
    const folderImages = files
      .filter((file: any) => {
        const fileName = typeof file === 'string' ? file : file.name;
        const baseFileName = fileName.replace(`${folder}/`, '');
        return fileName.startsWith(`${folder}/`) && 
               /\.(jpg|jpeg|png|gif|webp|mp4|webm|mov)$/i.test(fileName) &&
               !problematicFiles.includes(baseFileName); // Excluir arquivos problemáticos
      })
      .map((file: any) => {
        const fileName = typeof file === 'string' ? file : file.name;
        return fileName.replace(`${folder}/`, ''); // Remove o prefixo da pasta
      });
    
    console.log(`✅ Encontradas ${folderImages.length} arquivos na pasta ${folder}:`, folderImages);
    
    const response = {
      success: true,
      folder,
      totalImages: folderImages.length,
      images: folderImages
    };
    
    // Cachear resultado
    imageCache[folder] = response;
    cacheExpiry[folder] = now + CACHE_DURATION;
    
    res.json(response);
  } catch (error: any) {
    console.error(`❌ Erro ao buscar imagens da pasta ${req.params.folder}:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Debug endpoint antes do setupVite
app.get("/debug/storage", async (req: Request, res: Response) => {
  try {
    console.log("🔍 Listando arquivos no object storage...");
    const result = await client.list();
    
    console.log("📋 Resultado da listagem:", result);
    
    let files = [];
    let resultInfo = {
      type: typeof result,
      hasOk: false,
      isOk: false,
      hasVal: false,
      hasValue: false
    };

    if (result && typeof result === 'object') {
      resultInfo.hasOk = 'ok' in result;
      resultInfo.isOk = 'ok' in result ? (result as any).ok : false;
      resultInfo.hasVal = 'val' in result;
      resultInfo.hasValue = 'value' in result;
      
      if ('ok' in result && (result as any).ok) {
        files = (result as any).val || (result as any).value || [];
      }
    }
    
    res.json({
      success: true,
      totalFiles: Array.isArray(files) ? files.length : 0,
      files: Array.isArray(files) ? files.slice(0, 20) : [], // Primeiros 20 arquivos
      resultInfo,
      rawType: typeof result
    });
  } catch (error: any) {
    console.error("❌ Erro:", error);
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
  // Primeiro vamos verificar o object storage antes de configurar as rotas
  try {
    console.log("🔍 Verificando object storage...");
    const storageResult = await client.list();
    console.log("📋 Arquivos no storage:", storageResult);
    
    if (storageResult && typeof storageResult === 'object' && 'ok' in storageResult && storageResult.ok) {
      const files = (storageResult as any).val || [];
      console.log(`✅ ${files.length} arquivos encontrados no object storage:`);
      files.slice(0, 10).forEach((file: any, index: number) => {
        const fileName = typeof file === 'string' ? file : file.name || file.path || file;
        console.log(`  ${index + 1}. ${fileName}`);
      });
    } else {
      console.log("❌ Nenhum arquivo encontrado no object storage");
    }
  } catch (error) {
    console.error("❌ Erro ao verificar object storage:", error);
  }

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
