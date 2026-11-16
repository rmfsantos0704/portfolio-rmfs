import { Link } from "react-router-dom";
import { CATEGORY_LABELS, LEVEL_LABELS } from "./skillMeta";
import { Icon } from "../ui/Icon";
import type { Project, Skill } from "../../types";

interface SkillDetailProps {
  skill: Skill;
  projects: Project[];
}

export function SkillDetail({ skill, projects }: SkillDetailProps) {
  const usedIn = projects.filter((project) => skill.usedIn.includes(project.slug));

  return (
    // key remounts the panel so the entrance animation replays for each skill
    <aside className="skill-detail" key={skill.slug} aria-live="polite">
      <span className="skill-detail-category">{CATEGORY_LABELS[skill.category]}</span>
      <h3>{skill.name}</h3>

      <div className="level-meter" role="img" aria-label={`Proficiency: ${LEVEL_LABELS[skill.level]} (${skill.level} of 5)`}>
        <div className="level-bars">
          {[1, 2, 3, 4, 5].map((step) => (
            <span key={step} className={step <= skill.level ? "on" : ""} style={{ animationDelay: `${step * 70}ms` }} />
          ))}
        </div>
        <strong>{LEVEL_LABELS[skill.level]}</strong>
      </div>

      <p>{skill.summary}</p>

      <div className="skill-used">
        <span className="mini-label">Used in</span>
        {usedIn.length > 0 ? (
          <div className="skill-used-list">
            {usedIn.map((project) => (
              <Link key={project.slug} to={`/projects/${project.slug}`}>
                {project.name} <Icon name="arrow" size={14} />
              </Link>
            ))}
          </div>
        ) : (
          <small>Coursework, training & experiments</small>
        )}
      </div>
    </aside>
  );
}
