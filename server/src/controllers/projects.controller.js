import { Project } from "../models/Project.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ order: 1 }).lean();
  res.json({ data: projects });
});

export const getProjectBySlug = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug.toLowerCase() }).lean();
  if (!project) return res.status(404).json({ error: "Project not found" });
  res.json({ data: project });
});
