import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    summary: { type: String, required: true },
    tags: { type: [String], default: [] },
    // Which card mockup + accent colour the client renders.
    mockupKey: { type: String, enum: ["snowed", "owlet", "lox"], required: true },
    color: { type: String, enum: ["blue", "orange", "lime"], default: "blue" },
    githubUrl: String,
    liveUrl: String,
    // Reserved for the project detail pages (built later).
    detail: {
      overview: String,
      problem: String,
      features: [String],
      techNotes: [String],
    },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true },
);

export const Project = mongoose.model("Project", projectSchema);
