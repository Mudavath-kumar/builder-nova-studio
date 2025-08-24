import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleDashboardMetrics } from "./routes/dashboard";
import { register, login } from "./routes/auth";
import { authMiddleware } from "./middleware/auth";
import prisma from "./lib/prisma";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/health", (_req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  app.get("/api/demo", handleDemo);
  app.get("/api/dashboard/metrics", authMiddleware, handleDashboardMetrics);
  
  // Dashboard route (matches serverless function)
  app.get("/api/dashboard", authMiddleware, async (req, res) => {
    try {
      const userId = req.userId; // Set by authMiddleware
      const user = await prisma.user.findUnique({
        where: { id: userId },
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
      
      res.json({ user });
    } catch (error) {
      console.error('Dashboard error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Auth routes
  app.post("/api/auth/signup", register);
  app.post("/api/auth/login", login);

  return app;
}
