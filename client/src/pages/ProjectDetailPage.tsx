import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PageView } from "../components/common/PageView";
import { ErrorState, LoadingState } from "../components/common/AsyncState";
import { ScreenshotShowcase } from "../components/projects/ScreenshotShowcase";
import { Icon } from "../components/ui/Icon";
import { useTheme } from "../context/ThemeContext";
import { useApi } from "../hooks/useApi";
import { api } from "../services/api";
import { DEVICE_LABELS, themeVars } from "../lib/projectUi";
import type { Project } from "../types";

function ProjectLogo({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="pd-logo" aria-hidden="true">
      {project.logo && !failed ? (
        <img src={encodeURI(project.logo)} alt="" onError={() => setFailed(true)} />
      ) : (
        <b>{project.name.slice(0, 2)}</b>
      )}
    </span>
  );
}

function ProjectDetail({ project, all }: { project: Project; all: Project[] }) {
  const { theme } = useTheme();
  useEffect(() => {
    const previous = document.title;
    document.title = `${project.name} — Russel Santos`;
    return () => {
      document.title = previous;
    };
  }, [project.name]);

  const index = all.findIndex((item) => item.slug === project.slug);
  const hasNeighbours = all.length > 1 && index >= 0;
  const previous = hasNeighbours ? all[(index - 1 + all.length) % all.length] : null;
  const next = hasNeighbours ? all[(index + 1) % all.length] : null;
  const showStory = Boolean(project.challenge || project.solution);

  return (
    <div className="pd" style={themeVars(project.theme, theme)}>
      <header className="pd-hero">
        <div className="pd-watermark" aria-hidden="true">
          {project.watermark ?? project.name.toUpperCase()}
        </div>
        <div className="pd-inner">
          <Link className="pd-back" to="/projects">
            <Icon name="arrow" size={14} /> All projects
          </Link>
          <span className="pd-badge">{project.type}</span>
          <div className="pd-titlerow">
            <ProjectLogo project={project} />
            <h1 className="pd-title">{project.name}</h1>
          </div>
          <p className="pd-lead">{project.summary}</p>

          <div className="pd-meta">
            <span className="pd-chip">
              <small>Platform</small>
              {DEVICE_LABELS[project.deviceType]}
            </span>
            {project.role && (
              <span className="pd-chip">
                <small>My role</small>
                {project.role}
              </span>
            )}
          </div>

          {(project.liveUrl || project.githubUrl) && (
            <div className="pd-actions">
              {project.liveUrl && (
                <a className="pd-button primary" href={project.liveUrl} target="_blank" rel="noreferrer">
                  Visit live site <Icon name="external" size={16} />
                </a>
              )}
              {project.githubUrl && (
                <a className="pd-button ghost" href={project.githubUrl} target="_blank" rel="noreferrer">
                  <Icon name="github" size={16} /> View source
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      <ScreenshotShowcase project={project} />

      {showStory && (
        <section className="pd-story">
          <div className="pd-inner pd-story-grid">
            {project.challenge && (
              <article className="pd-card">
                <span className="pd-kicker">The challenge</span>
                <p>{project.challenge}</p>
              </article>
            )}
            {project.solution && (
              <article className="pd-card">
                <span className="pd-kicker">The solution</span>
                <p>{project.solution}</p>
              </article>
            )}
          </div>
        </section>
      )}

      {project.sdlc.length > 0 && (
        <section className="pd-sdlc">
          <div className="pd-inner">
            <div className="pd-section-head">
              <span className="pd-kicker">Process</span>
              <h2>How it was built.</h2>
            </div>
            <ol className="pd-timeline">
              {project.sdlc.map((step, i) => (
                <li key={step.phase}>
                  <span className="pd-step">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{step.phase}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {project.techStack.length > 0 && (
        <section className="pd-tech">
          <div className="pd-inner">
            <div className="pd-section-head">
              <span className="pd-kicker">Built with</span>
              <h2>Tech stack.</h2>
            </div>
            <ul className="pd-stack">
              {project.techStack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {hasNeighbours && previous && next && (
        <nav className="pd-pager" aria-label="More projects">
          <div className="pd-inner pd-pager-grid">
            <Link className="pd-pager-link prev" to={`/projects/${previous.slug}`}>
              <small>Previous project</small>
              <strong>
                <Icon name="arrow" size={18} /> {previous.name}
              </strong>
            </Link>
            <Link className="pd-pager-link next" to={`/projects/${next.slug}`}>
              <small>Next project</small>
              <strong>
                {next.name} <Icon name="arrow" size={18} />
              </strong>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}

export default function ProjectDetailPage() {
  const { slug = "" } = useParams();
  const { data: project, loading, error } = useApi(() => api.getProject(slug), [slug]);
  const { data: all } = useApi(api.getProjects);

  return (
    <PageView name="project">
      {loading && (
        <div className="section">
          <LoadingState label="Loading project…" />
        </div>
      )}

      {!loading && error && (
        <div className="section not-found">
          {/not found/i.test(error) ? (
            <>
              <span className="kicker">404</span>
              <h2>That project doesn’t exist.</h2>
              <Link className="button primary" to="/projects">
                See all projects <Icon name="arrow" />
              </Link>
            </>
          ) : (
            <ErrorState message={error} />
          )}
        </div>
      )}

      {!loading && project && <ProjectDetail key={project.slug} project={project} all={all ?? []} />}
    </PageView>
  );
}
