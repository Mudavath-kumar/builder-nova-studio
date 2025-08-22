import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleDashboardMetrics } from "./routes/dashboard";
import { register, login } from "./routes/auth";
import { authMiddleware } from "./middleware/auth";

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

  app.get("/api/demo", handleDemo);
  app.get("/api/dashboard/metrics", authMiddleware, handleDashboardMetrics);

  // Auth routes
  app.post("/api/auth/register", register);
  app.post("/api/auth/login", login);

  return app;
}
