import { Router } from "express";
import mongoose from "mongoose";
import { getProfile } from "../controllers/profile.controller.js";
import { getSkills } from "../controllers/skills.controller.js";
import { getCertifications } from "../controllers/certifications.controller.js";
import { getProjects, getProjectBySlug } from "../controllers/projects.controller.js";

const router = Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok", db: mongoose.connection.readyState === 1 ? "connected" : "disconnected" });
});

router.get("/profile", getProfile);
router.get("/skills", getSkills);
router.get("/certifications", getCertifications);
router.get("/projects", getProjects);
router.get("/projects/:slug", getProjectBySlug);

export default router;
