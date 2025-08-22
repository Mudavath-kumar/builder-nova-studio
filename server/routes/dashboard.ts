import { RequestHandler } from "express";
import { DashboardMetrics } from "@shared/api";

export const handleDashboardMetrics: RequestHandler = (_req, res) => {
  const metrics: DashboardMetrics = {
    healthScore: 88,
    heartRate: 75,
    waterIntake: 7,
    sleepHours: 7.2,
    stepsCount: 9543,
    todayCalories: 1950,
  };
  res.json(metrics);
};
