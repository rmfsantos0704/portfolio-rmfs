import mongoose from "mongoose";
import { env } from "./env.js";

// On serverless hosts (Vercel) the same process handles many requests and may be
// frozen between them, so the connection is created once and reused.
let connecting = null;

export async function connectDB() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (!connecting) {
    mongoose.set("strictQuery", true);
    connecting = mongoose
      .connect(env.mongoUri, { serverSelectionTimeoutMS: 8000 })
      .then(() => {
        console.log(`MongoDB connected: ${mongoose.connection.name}`);
        return mongoose.connection;
      })
      .catch((error) => {
        connecting = null; // let the next request retry
        throw error;
      });
  }
  return connecting;
}

export async function disconnectDB() {
  connecting = null;
  await mongoose.disconnect();
}