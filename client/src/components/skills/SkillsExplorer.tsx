import { useMemo, useState } from "react";
import { SkillDetail } from "./SkillDetail";
import { CATEGORY_LABELS, CATEGORY_ORDER } from "./skillMeta";
import type { Project, Skill, SkillCategory } from "../../types";

type Filter = "all" | SkillCategory;

interface SkillsExplorerProps {
  skills: Skill[];
  projects: Project[];
}

export function SkillsExplorer({ skills, projects }: SkillsExplorerProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedSlug, setSelectedSlug] = useState<string>(skills[0]?.slug ?? "");

  const visible = useMemo(
    () => (filter === "all" ? skills : skills.filter((skill) => skill.category === filter)),
    [skills, filter],
  );

  // If the selected skill is filtered out, fall back to the first visible one.
  const selected = visible.find((skill) => skill.slug === selectedSlug) ?? visible[0];

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: skills.length };
    for (const skill of skills) result[skill.category] = (result[skill.category] ?? 0) + 1;
    return result;
  }, [skills]);

  return (
    <div className="skills-explorer">
      <div className="skill-filters" role="group" aria-label="Filter skills by category">
        {(["all", ...CATEGORY_ORDER] as Filter[]).map((key) => (
          <button
            key={key}
            type="button"
            className={filter === key ? "filter-pill active" : "filter-pill"}
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
          >
            {key === "all" ? "All" : CATEGORY_LABELS[key]}
            <span>{counts[key] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="skills-layout">
        <div className="skill-chips" role="list">
          {visible.map((skill) => (
            <button
              key={skill.slug}
              type="button"
              role="listitem"
              className={selected?.slug === skill.slug ? "skill-chip active" : "skill-chip"}
              aria-pressed={selected?.slug === skill.slug}
              onClick={() => setSelectedSlug(skill.slug)}
            >
              <span className="skill-chip-name">{skill.name}</span>
              <span className="skill-chip-dots" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((step) => (
                  <i key={step} className={step <= skill.level ? "on" : ""} />
                ))}
              </span>
            </button>
          ))}
        </div>

        {selected && <SkillDetail skill={selected} projects={projects} />}
      </div>
    </div>
  );
}
