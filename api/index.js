import { createServer } from '../server/index.js';
import serverless from 'serverless-http';
import path from 'path';
import express from 'express';

// Create the Express app
const app = createServer();

// In production, serve the built SPA files
const __dirname = import.meta.dirname || path.dirname(new URL(import.meta.url).pathname);
const distPath = path.join(__dirname, '../dist/spa');

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

// Serve static files
app.use(express.static(distPath));

// Handle React Router - serve index.html for all non-API routes
app.get('*', (req, res) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

// Export as serverless function
export default serverless(app);