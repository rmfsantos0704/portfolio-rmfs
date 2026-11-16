import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { DeviceMockup } from "./DeviceMockup";
import { useTheme } from "../../context/ThemeContext";
import { deviceAddress, themeVars } from "../../lib/projectUi";
import type { Project } from "../../types";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { theme } = useTheme();
  const to = `/projects/${project.slug}`;

  return (
    <article className="project-card" style={themeVars(project.theme, theme)}>
      {/* The preview is a second link to the same page; hidden from keyboard/AT to avoid a duplicate stop. */}
      <Link to={to} className="project-visual themed" tabIndex={-1} aria-hidden="true">
        <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
        <span className="card-watermark">{project.watermark ?? project.name}</span>
        <DeviceMockup
          device={project.deviceType}
          src={project.screenshots[0]}
          alt={`${project.name} preview`}
          address={deviceAddress(project)}
        />
      </Link>
      <div className="project-info">
        <span className="project-type">{project.type}</span>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <div className="tags">
          {project.techStack.slice(0, 4).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <Link to={to} className="project-link" aria-label={`View ${project.name} project details`}>
          View project <Icon name="arrow" size={18} />
        </Link>
      </div>
    </article>
  );
}
