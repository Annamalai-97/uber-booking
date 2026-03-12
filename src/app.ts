import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import connectDB from "./config/db";
import sessionMiddleware from "./config/session";
import { connectRabbitMQ } from "./config/rabbitmq";
import logger from "./utils/logger";

const app = express();

// ── Middlewares ─────────────────────────────────────────
app.use(express.json());
app.use(sessionMiddleware);

// ── Connections ─────────────────────────────────────────
connectDB();
connectRabbitMQ();

// ── Routes (will add in next sections) ──────────────────
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "Uber Booking API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

// ── 404 Handler ─────────────────────────────────────────
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// ── Global Error Handler ────────────────────────────────
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message);
  res.status(500).json({ error: "Something went wrong" });
});

// ── Start Server ────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));