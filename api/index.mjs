// Vercel serverless function entry point
import getApp from '../dist/index.js';

// Create app instance
const appPromise = getApp();

// Handler function for Vercel serverless
export default async function handler(req, res) {
  try {
    const app = await appPromise;
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}