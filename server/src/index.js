import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";

async function main() {
  await connectDB();
  createApp().listen(env.port, () => {
    console.log(`API listening on http://localhost:${env.port}/api`);
  });
}

main().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});