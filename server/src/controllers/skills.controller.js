import { Skill, SKILL_CATEGORIES } from "../models/Skill.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getSkills = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const filter = {};

  if (category) {
    if (!SKILL_CATEGORIES.includes(category)) {
      return res.status(400).json({ error: `Unknown category. Use one of: ${SKILL_CATEGORIES.join(", ")}` });
    }
    filter.category = category;
  }

  const skills = await Skill.find(filter).sort({ category: 1, order: 1 }).lean();
  res.json({ data: skills });
});
