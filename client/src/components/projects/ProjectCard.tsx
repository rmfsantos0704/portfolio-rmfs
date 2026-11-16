import { Icon } from "../ui/Icon";
import { ProjectMockup } from "./ProjectMockup";
import type { Project } from "../../types";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project-card">
      <div className={`project-visual ${project.color}`}>
        <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
        <ProjectMockup mockupKey={project.mockupKey} />
      </div>
      <div className="project-info">
        <span className="project-type">{project.type}</span>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <div className="tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {/* TODO (projects phase): link to /projects/:slug detail page instead. */}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="project-link"
          aria-label={`View ${project.name} on GitHub`}
        >
          View project <Icon name="arrow" size={18} />
        </a>
      </div>
    </article>
  );
}
