import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { Client } from '@replit/object-storage';

const app = express();
const client = new Client();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/images/:folder/:filename", async (req: Request, res: Response) => {
  try {
    const { folder, filename } = req.params;
    const filePath = `${folder}/${filename}`;

    // Download image from object storage
    const imageData = await client.downloadAsBytes(filePath);
    
    // Check if we got valid data
    if (!imageData) {
      console.log(`Image not found: ${filePath}`);
      return res.status(404).send('Image not found in Object Storage');
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
    
    // Convert to buffer and send
    let buffer;
    if (Buffer.isBuffer(imageData)) {
      buffer = imageData;
    } else if (imageData instanceof Uint8Array) {
      buffer = Buffer.from(imageData);
    } else {
      // Handle other formats
      buffer = Buffer.from(imageData as any);
    }
    
    res.send(buffer);

  } catch (error) {
    console.error(`Error fetching image ${req.params.folder}/${req.params.filename}:`, error);
    res.status(404).send("Image not found");
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
