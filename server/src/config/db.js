import mongoose from "mongoose";
import { env } from "./env.js";
import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);


export async function connectDB() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(env.mongoUri);
  console.log(`MongoDB connected: ${mongoose.connection.name}`);
}

export async function disconnectDB() {
  await mongoose.disconnect();
}
