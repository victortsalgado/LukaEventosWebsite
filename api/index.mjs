// Vercel serverless function entry point
import getApp from '../dist/index.js';

// Export the Express app for Vercel
export default await getApp();