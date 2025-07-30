import express from 'express';
import { registerRoutes } from '../server/routes.js';

let app: express.Express | null = null;

export default async function handler(req: any, res: any) {
  if (!app) {
    app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    // Register API routes
    registerRoutes(app);
  }
  
  return app(req, res);
}