import type { SkillCategory } from "../../types";

export const CATEGORY_LABELS: Record<SkillCategory, string> = {
  languages: "Languages",
  frontend: "Frontend",
  "backend-data": "Backend & data",
  tools: "Tools & platforms",
};

export const CATEGORY_ORDER: SkillCategory[] = ["languages", "frontend", "backend-data", "tools"];

export const LEVEL_LABELS = ["", "Learning", "Familiar", "Comfortable", "Proficient", "Expert"];
