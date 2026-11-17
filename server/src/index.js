// Vercel serverless entry. Every /api/* request is rewritten here (see vercel.json).
// The app connects to MongoDB itself (see src/app.js), so it is exported as-is.
import app from "../src/app.js";

export default app;