import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    issuer: { type: String, required: true },
    program: String,
    description: { type: String, required: true },
    highlights: { type: [String], default: [] },
    // Served from client/public/certificates/<slug>.png — the UI falls back
    // to a placeholder until the real image exists.
    imageUrl: String,
    credentialUrl: String,
    issuedAt: Date,
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true },
);

export const Certification = mongoose.model("Certification", certificationSchema);
