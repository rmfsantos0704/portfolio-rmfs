// Vercel serverless entry. Every /api/* request is rewritten here (see vercel.json).
import { createApp } from "../src/app.js";
import { connectDB } from "../src/config/db.js";

const app = createApp();

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.error("Database connection failed:", error.message);
    res.statusCode = 503;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end(JSON.stringify({ error: "Database unavailable" }));
    return;
  }
  return app(req, res);
}