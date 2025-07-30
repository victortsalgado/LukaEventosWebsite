// Vercel serverless function entry point
import getApp from '../dist/index.js';

// Handler function for Vercel serverless
export default async function handler(req, res) {
  const app = await getApp();
  return app(req, res);
}