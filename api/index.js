import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Initialize Prisma
const prisma = new PrismaClient();

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Auth schemas
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url, method } = req;
  const urlPath = new URL(url, `http://${req.headers.host}`).pathname;

  console.log(`=== API REQUEST DEBUG ===`);
  console.log(`Method: ${method}`);
  console.log(`URL: ${url}`);
  console.log(`URL Path: ${urlPath}`);
  console.log(`Headers:`, JSON.stringify(req.headers, null, 2));
  console.log(`Body:`, req.body);
  console.log(`========================`);

  try {
    // API Routes
    if (urlPath === '/api/health') {
      return res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
    }

    if (urlPath === '/api/demo') {
      return res.json({ message: "Hello from Express server" });
    }

    if (urlPath === '/api/auth/signup' && method === 'POST') {
      try {
        const { email, password, firstName, lastName } = signupSchema.parse(req.body);
        
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email }
        });
        
        if (existingUser) {
          return res.status(400).json({ error: 'User already exists' });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user
        const user = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            firstName,
            lastName,
          },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            createdAt: true,
          }
        });
        
        // Generate JWT
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );
        
        return res.status(201).json({ user, token });
      } catch (error) {
        console.error('Signup error:', error);
        if (error instanceof z.ZodError) {
          return res.status(400).json({ error: 'Invalid input', details: error.errors });
        }
        return res.status(500).json({ error: 'Internal server error' });
      }
    }

    if (urlPath === '/api/auth/login' && method === 'POST') {
      try {
        const { email, password } = loginSchema.parse(req.body);
        
        // Find user
        const user = await prisma.user.findUnique({
          where: { email }
        });
        
        if (!user || !await bcrypt.compare(password, user.password)) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Generate JWT
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );
        
        const userResponse = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          createdAt: user.createdAt,
        };
        
        return res.json({ user: userResponse, token });
      } catch (error) {
        console.error('Login error:', error);
        if (error instanceof z.ZodError) {
          return res.status(400).json({ error: 'Invalid input', details: error.errors });
        }
        return res.status(500).json({ error: 'Internal server error' });
      }
    }

    if (urlPath === '/api/dashboard' && method === 'GET') {
      try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).json({ error: 'No token provided' });
        }
        
        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await prisma.user.findUnique({
          where: { id: decoded.userId },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            createdAt: true,
          }
        });
        
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        
        return res.json({ user });
      } catch (error) {
        console.error('Dashboard error:', error);
        return res.status(401).json({ error: 'Invalid token' });
      }
    }

    // Handle API 404s
    if (urlPath.startsWith('/api/')) {
      console.log(`❌ API 404: No handler found for ${method} ${urlPath}`);
      console.log(`Available endpoints:`);
      console.log(`- GET /api/health`);
      console.log(`- GET /api/demo`);
      console.log(`- POST /api/auth/signup`);
      console.log(`- POST /api/auth/login`);
      console.log(`- GET /api/dashboard`);
      return res.status(404).json({ 
        error: 'API endpoint not found',
        method,
        path: urlPath,
        availableEndpoints: [
          'GET /api/health',
          'GET /api/demo', 
          'POST /api/auth/signup',
          'POST /api/auth/login',
          'GET /api/dashboard'
        ]
      });
    }

    // Serve the React app for all other routes
    try {
      const indexPath = path.join(process.cwd(), 'dist', 'spa', 'index.html');
      
      if (fs.existsSync(indexPath)) {
        const indexHtml = fs.readFileSync(indexPath, 'utf8');
        res.setHeader('Content-Type', 'text/html');
        return res.send(indexHtml);
      } else {
        // Fallback HTML if dist/spa/index.html is not found
        res.setHeader('Content-Type', 'text/html');
        return res.send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>HealPulse - AI Health Assistant</title>
            <style>
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                text-align: center; 
                margin: 0;
                padding: 50px 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                min-height: 100vh;
              }
              .container { 
                max-width: 600px; 
                margin: 0 auto; 
                padding: 40px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                backdrop-filter: blur(10px);
              }
              .status { color: #10B981; font-weight: bold; font-size: 18px; }
              .logo { font-size: 48px; margin-bottom: 20px; }
              h1 { margin: 0; font-size: 2.5em; }
              h2 { margin: 10px 0 30px 0; opacity: 0.9; }
              .endpoints { 
                background: rgba(255, 255, 255, 0.1); 
                border-radius: 10px; 
                padding: 20px; 
                margin-top: 30px; 
              }
              .endpoints ul { 
                text-align: left; 
                list-style: none; 
                padding: 0; 
              }
              .endpoints li { 
                padding: 8px 0; 
                border-bottom: 1px solid rgba(255, 255, 255, 0.1); 
              }
              .endpoints li:last-child { border-bottom: none; }
              code { 
                background: rgba(0, 0, 0, 0.3); 
                padding: 4px 8px; 
                border-radius: 4px; 
                font-family: 'Monaco', 'Consolas', monospace; 
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="logo">🩺</div>
              <h1>HealPulse</h1>
              <h2>AI Health Assistant</h2>
              <p class="status">✅ API Server is Running</p>
              <p>The backend API is working correctly on Vercel.</p>
              <p>Frontend will be served from this endpoint once fully deployed.</p>
              <div class="endpoints">
                <h3>Available API Endpoints:</h3>
                <ul>
                  <li><code>GET /api/health</code> - Health check</li>
                  <li><code>GET /api/demo</code> - Demo endpoint</li>
                  <li><code>POST /api/auth/signup</code> - User registration</li>
                  <li><code>POST /api/auth/login</code> - User authentication</li>
                  <li><code>GET /api/dashboard</code> - User dashboard (requires auth)</li>
                </ul>
              </div>
              <p style="margin-top: 30px; opacity: 0.7; font-size: 14px;">
                Deployed on Vercel • ${new Date().toISOString()}
              </p>
            </div>
          </body>
          </html>
        `);
      }
    } catch (error) {
      console.error('Error serving application:', error);
      return res.status(500).json({ 
        error: 'Unable to serve application',
        details: error.message,
        path: urlPath
      });
    }

  } catch (error) {
    console.error('Unhandled error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}