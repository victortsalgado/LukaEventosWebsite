// Vercel serverless function for APIs only
import getApp from '../dist/index.js';

// Cache the app instance
let app;

export default async function handler(req, res) {
  try {
    // Only handle API routes
    if (!req.url.startsWith('/api/')) {
      // This should never happen with proper routing, but just in case
      return res.status(404).json({ error: 'Not found' });
    }

    // Initialize app if not cached
    if (!app) {
      app = await getApp();
    }

    // Handle the request with Express app
    return app(req, res);
  } catch (error) {
    console.error('API Handler error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}