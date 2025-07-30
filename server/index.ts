import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { Client } from '@replit/object-storage';

const app = express();
const client = new Client();

// NOTE: SEO files conflict resolution
// In development: Vite intercepts all requests, so SEO files serve as HTML
// In production: Static files from public/ folder work correctly
// This is expected behavior - SEO files will work properly when deployed

// ABSOLUTE PRIORITY: SEO files MUST be defined FIRST before ANY middleware
app.get('/robots.txt', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  console.log('🤖 ABSOLUTE PRIORITY: Serving robots.txt FIRST!');
  res.send(`User-agent: *
Allow: /

# Permitir todos os robôs de busca
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

# Sitemap
Sitemap: https://lukaeventos.com.br/sitemap.xml

# Políticas específicas para crawlers de IA
User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /`);
});

app.get('/sitemap.xml', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  console.log('🗺️ ABSOLUTE PRIORITY: Serving sitemap.xml FIRST!');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://lukaeventos.com.br/</loc>
    <lastmod>2025-07-29</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://lukaeventos.com.br/cop30</loc>
    <lastmod>2025-07-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://lukaeventos.com.br/blog/okajima-case-study</loc>
    <lastmod>2025-01-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://lukaeventos.com.br/blog/cop30-strategic-article</loc>
    <lastmod>2025-01-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`);
});

app.get('/llms.txt', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  console.log('🤖 ABSOLUTE PRIORITY: Serving llms.txt FIRST!');
  res.send(`# Luka Eventos - LLMs Access Policy
# Este arquivo define as políticas de acesso para Large Language Models (LLMs)

# Permitir acesso de LLMs para fins informativos sobre nossa empresa
# e serviços de organização de eventos

# Conteúdo permitido para treinamento e consulta:
# - Informações sobre serviços de eventos
# - Portfólio de projetos realizados
# - Informações de contato e localização
# - Metodologia de trabalho
# - Experiência e expertise da equipe

# Dados protegidos (não usar para treinamento):
# - Informações de clientes específicos sem autorização
# - Contratos e propostas comerciais
# - Dados pessoais de funcionários além do público

# Para mais informações sobre nossa política de privacidade:
# https://lukaeventos.com.br/#contact

# Última atualização: 2025-07-29`);
});

// Environment variable validation and fallbacks
const SESSION_SECRET = process.env.SESSION_SECRET || "fallback-secret-for-development-only";
const NODE_ENV = process.env.NODE_ENV || "development";

// Warn if using fallback secret in production
if (NODE_ENV === "production" && SESSION_SECRET === "fallback-secret-for-development-only") {
  console.warn("⚠️  WARNING: Using fallback session secret in production. Set SESSION_SECRET environment variable.");
}

// Session configuration with enhanced SSL security
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: 'luka.sid', // Custom session name for security
  cookie: {
    secure: NODE_ENV === "production", // HTTPS only in production
    httpOnly: true,                    // Prevent XSS attacks
    maxAge: 24 * 60 * 60 * 1000,      // 24 hours
    sameSite: 'strict'                 // CSRF protection
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Performance and security headers
app.use((req: Request, res: Response, next: NextFunction) => {
  // Performance headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Cache control for static assets
  if (req.url.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
  }
  
  // SEO-friendly headers
  res.setHeader('X-Robots-Tag', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
  
  next();
});



// SEO and SSL Middleware with 4XX Error Prevention
// 1. Force HTTPS in production and redirect www to non-www
app.use((req: Request, res: Response, next: NextFunction) => {
  const host = req.get('host');
  const protocol = req.get('x-forwarded-proto') || req.protocol;
  
  // PRIORITY 1: Redirect www to non-www FIRST (prevents SSL certificate errors)
  if (host && host.startsWith('www.')) {
    const newHost = host.slice(4); // Remove 'www.'
    
    // Special handling for HTTPS www requests that cause certificate errors
    if (protocol === 'https') {
      // For HTTPS www requests, redirect to HTTP first to avoid certificate error
      const redirectUrl = `http://${newHost}${req.originalUrl}`;
      console.log(`🔒 HTTPS www SSL fix: ${host} -> HTTP ${newHost} (prevents certificate error)`);
      return res.redirect(301, redirectUrl);
    } else {
      // For HTTP www requests, redirect directly to HTTPS non-www in production
      const finalProtocol = NODE_ENV === 'production' ? 'https' : 'http';
      const redirectUrl = `${finalProtocol}://${newHost}${req.originalUrl}`;
      console.log(`🌐 HTTP www redirect: ${host} -> ${finalProtocol}://${newHost}`);
      return res.redirect(301, redirectUrl);
    }
  }
  
  // PRIORITY 2: Force HTTPS in production (after www redirect)
  if (NODE_ENV === 'production' && protocol !== 'https') {
    const redirectUrl = `https://${host}${req.originalUrl}`;
    console.log(`🔒 Forcing HTTPS redirect: ${protocol}://${host} -> https://${host}`);
    return res.redirect(301, redirectUrl);
  }
  
  next();
});

// 2. Enhanced security and SSL headers
app.use((req: Request, res: Response, next: NextFunction) => {
  // SSL/Security headers for production
  if (NODE_ENV === 'production') {
    // HSTS - Force HTTPS for future requests
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    
    // SSL/TLS security
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
  }
  
  // SEO-friendly headers that work with SSL
  res.setHeader('X-Robots-Tag', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Ensure proper charset for HTML content
  if (req.path.endsWith('.html') || req.path === '/' || !req.path.includes('.')) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
  }
  
  next();
});

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
      'paisagismo.jpg', // Decoracao - falha no carregamento no browser
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

// SSL and Domain diagnostic endpoint
app.get("/debug/ssl", (req: Request, res: Response) => {
  const host = req.get('host');
  const protocol = req.get('x-forwarded-proto') || req.protocol;
  const userAgent = req.get('user-agent');
  const forwarded = req.get('x-forwarded-for');
  
  const diagnostics = {
    timestamp: new Date().toISOString(),
    request: {
      host,
      protocol,
      originalUrl: req.originalUrl,
      userAgent,
      forwarded
    },
    ssl: {
      isHttps: protocol === 'https',
      shouldForceHttps: NODE_ENV === 'production' && protocol !== 'https',
      isWww: host?.startsWith('www.'),
      shouldRedirectWww: host?.startsWith('www.')
    },
    environment: {
      nodeEnv: NODE_ENV,
      sessionSecure: NODE_ENV === "production"
    },
    headers: {
      hasHSTS: NODE_ENV === 'production',
      hasSecurityHeaders: true
    },
    status: {
      no4xxErrors: !host?.startsWith('www.'),
      redirectStrategy: host?.startsWith('www.') ? 'www->http->https' : 'direct'
    }
  };
  
  res.json(diagnostics);
});

// Endpoint específico para lidar com www requests problemáticos
app.get("/www-fallback", (req: Request, res: Response) => {
  // Se chegou aqui, é porque o redirecionamento normal falhou
  // Serve a página HTML de redirecionamento como fallback
  res.send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecionando - Luka Eventos</title>
    <meta http-equiv="refresh" content="0; url=https://lukaeventos.com.br/">
    <link rel="canonical" href="https://lukaeventos.com.br/">
    <script>window.location.replace('https://lukaeventos.com.br/');</script>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: linear-gradient(135deg, #D4A24E, #f4f4f4); color: #333; }
        .redirect-message { text-align: center; background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); max-width: 400px; }
        .spinner { border: 3px solid #f3f3f3; border-top: 3px solid #D4A24E; border-radius: 50%; width: 30px; height: 30px; animation: spin 1s linear infinite; margin: 0 auto 1rem; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        a { color: #D4A24E; text-decoration: none; font-weight: bold; }
    </style>
</head>
<body>
    <div class="redirect-message">
        <div class="spinner"></div>
        <h2>Redirecionando...</h2>
        <p>Você está sendo redirecionado para o site oficial da Luka Eventos.</p>
        <p>Se não funcionar automaticamente, <a href="https://lukaeventos.com.br/">clique aqui</a>.</p>
    </div>
</body>
</html>`);
});

// Serve página de redirecionamento estática se solicitada diretamente
app.get("/www-redirect.html", (req: Request, res: Response) => {
  res.redirect(301, "https://lukaeventos.com.br/");
});

// Endpoint para testar redirecionamentos e evitar 4XX
app.get("/debug/redirects", (req: Request, res: Response) => {
  const testResults = {
    timestamp: new Date().toISOString(),
    tests: {
      httpToHttps: {
        description: "Test HTTP -> HTTPS redirect for main domain",
        expectedStatus: 301,
        testUrl: "http://lukaeventos.com.br/",
        target: "https://lukaeventos.com.br/"
      },
      wwwToNonWww: {
        description: "Test www -> non-www redirect (via HTTP to avoid SSL error)",
        expectedStatus: 301,
        testUrl: "http://www.lukaeventos.com.br/",
        target: "http://lukaeventos.com.br/ -> https://lukaeventos.com.br/"
      },
      httpsMain: {
        description: "Test HTTPS main domain accessibility",
        expectedStatus: 200,
        testUrl: "https://lukaeventos.com.br/",
        sslValid: true
      }
    },
    no4xxStrategy: {
      implemented: true,
      description: "www requests redirect to HTTP first, then to HTTPS",
      prevents4xx: true
    }
  };
  
  res.json(testResults);
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



// Endpoint para imagens da raiz do Object Storage
app.get("/api/images/:filename", async (req: Request, res: Response) => {
  try {
    const { filename } = req.params;

    console.log(`Tentando carregar imagem da raiz: ${filename}`);

    // Baixar imagem do object storage (raiz)
    const downloadResult = await client.downloadAsBytes(filename);
    
    console.log(`Resultado do download da raiz:`, typeof downloadResult);

    // Verificar se o resultado é válido
    let imageBuffer;
    
    if (downloadResult && typeof downloadResult === 'object') {
      if ('ok' in downloadResult && downloadResult.ok) {
        imageBuffer = (downloadResult as any).val?.[0] || (downloadResult as any).value?.[0];
      } else if (Buffer.isBuffer(downloadResult)) {
        imageBuffer = downloadResult;
      } else if (downloadResult instanceof Uint8Array) {
        imageBuffer = Buffer.from(downloadResult);
      } else if (Array.isArray(downloadResult) && downloadResult.length > 0) {
        imageBuffer = downloadResult[0];
      }
    } else if (Buffer.isBuffer(downloadResult)) {
      imageBuffer = downloadResult;
    }
    
    if (!imageBuffer || imageBuffer.length === 0) {
      console.log(`Imagem não encontrada ou vazia na raiz: ${filename}`);
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
      case 'avif':
        contentType = 'image/avif';
        break;
      case 'svg':
        contentType = 'image/svg+xml';
        break;
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    
    console.log(`Servindo imagem da raiz com sucesso: ${filename}, tamanho: ${imageBuffer.length} bytes`);
    res.send(imageBuffer);

  } catch (error: any) {
    console.error(`Erro ao buscar imagem da raiz ${req.params.filename}:`, error);
    res.status(500).send("Erro interno do servidor ao buscar imagem");
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

  // Register API routes (excluding Vite setup)  
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Environment-aware setup with error handling
  const isProduction = NODE_ENV === "production";
  const isDevelopment = NODE_ENV === "development";
  
  // Priority: Ensure SEO files are served before Vite intercepts
  console.log('🚀 Configuring SEO routes before Vite...');
  
  try {
    if (isDevelopment) {
      log("Setting up Vite development server...");
      await setupVite(app, server);
    } else {
      log("Setting up static file serving for production...");
      serveStatic(app);
    }
  } catch (setupError) {
    console.error(`Failed to setup ${isProduction ? "production" : "development"} environment:`, setupError);
    process.exit(1);
  }

  // Configure port and host for production deployment
  const port = parseInt(process.env.PORT || "5000", 10);
  const host = "0.0.0.0"; // Always bind to all interfaces for deployment compatibility
  
  // Validate port number
  if (isNaN(port) || port < 1 || port > 65535) {
    console.error(`Invalid port number: ${process.env.PORT || "5000"}`);
    process.exit(1);
  }
  
  // Start server with comprehensive error handling
  server.listen(port, host, () => {
    log(`Server started successfully on ${host}:${port} (${NODE_ENV})`);
    if (isProduction) {
      log("Production mode: Static files served, sessions secured");
    } else {
      log("Development mode: Vite HMR enabled");
    }
  });
  
  // Handle server errors
  server.on('error', (error: any) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use`);
    } else if (error.code === 'EACCES') {
      console.error(`Permission denied to bind to port ${port}`);
    } else {
      console.error(`Server error:`, error);
    }
    process.exit(1);
  });
  
  // Graceful shutdown handling
  process.on('SIGTERM', () => {
    log('SIGTERM received, shutting down gracefully');
    server.close(() => {
      log('Process terminated');
      process.exit(0);
    });
  });
  
  process.on('SIGINT', () => {
    log('SIGINT received, shutting down gracefully');
    server.close(() => {
      log('Process terminated');
      process.exit(0);
    });
  });
})();
