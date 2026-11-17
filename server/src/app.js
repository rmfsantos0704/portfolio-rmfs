import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import routes from "./routes/index.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

export function createApp() {
  const app = express();

  // The API is called from a different origin (the client site), so allow cross-origin reads.
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
  app.use(cors({ origin: env.clientOrigins }));
  app.use(express.json());
  if (env.nodeEnv !== "test") app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

  // Make sure the database is connected before any route runs. On serverless hosts this
  // is what connects on a cold start; locally the connection already exists, so it is a no-op.
  app.use("/api", async (req, res, next) => {
    try {
      await connectDB();
      next();
    } catch (error) {
      console.error("Database connection failed:", error.message);
      res.status(503).json({ error: "Database unavailable" });
    }
  });

  app.use("/api", routes);

  app.use(notFound);
  app.use(errorHandler);
  return app;
}

// Vercel looks for an Express app as the default export of this file.
export default createApp();