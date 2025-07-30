// Vercel serverless function - APIs only
import getApp from '../dist/index.js';

let app;

export default async function handler(req, res) {
  try {
    // Initialize Express app if needed
    if (!app) {
      app = await getApp();
    }

    // Handle API requests only
    return app(req, res);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}