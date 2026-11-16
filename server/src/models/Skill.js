import mongoose from "mongoose";

export const SKILL_CATEGORIES = ["languages", "frontend", "backend-data", "tools"];

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: { type: String, required: true, enum: SKILL_CATEGORIES, index: true },
    // 1 (learning) → 5 (expert). Adjust honestly in seed/data.js.
    level: { type: Number, required: true, min: 1, max: 5 },
    summary: { type: String, required: true },
    // Slugs of Project documents where this skill was used.
    usedIn: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

skillSchema.index({ category: 1, order: 1 });

export const Skill = mongoose.model("Skill", skillSchema);
