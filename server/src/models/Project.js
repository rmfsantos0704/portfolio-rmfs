import mongoose from "mongoose";

// Colours the page uses in one site mode (light or dark).
const paletteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    // Background of the mockup panels (project card + screenshot stage)
    backdrop: { type: String, required: true },
    pageBackground: { type: String, required: true },
    pageSurface: { type: String, required: true },
    pageText: { type: String, required: true },
    pageMuted: { type: String, required: true },
  },
  { _id: false },
);

// Accent colours are shared; the page palette changes with the site's light/dark mode.
const themeSchema = new mongoose.Schema(
  {
    accent: { type: String, required: true },
    secondary: String,
    highlight: String,
    dark: { type: paletteSchema, required: true },
    light: { type: paletteSchema, required: true },
  },
  { _id: false },
);

const sdlcSchema = new mongoose.Schema(
  {
    phase: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false },
);

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true },
    name: { type: String, required: true },
    // Short category line, e.g. "Mobile app • Planner"
    type: { type: String, required: true },
    summary: { type: String, required: true },
    techStack: { type: [String], default: [] },

    // Decides which mockup frame the screenshots are shown in.
    deviceType: { type: String, enum: ["desktop", "mobile", "terminal"], default: "desktop" },
    // Files live in client/public — e.g. /logos/snowed.png and /SnowEd/calendar.jpeg
    logo: String,
    screenshots: { type: [String], default: [] },
    theme: { type: themeSchema, required: true },
    watermark: String,

    role: String,
    challenge: String,
    solution: String,
    sdlc: { type: [sdlcSchema], default: [] },

    liveUrl: String,
    githubUrl: String,
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true },
);

export const Project = mongoose.model("Project", projectSchema);
