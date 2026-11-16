import { PageView } from "../components/common/PageView";
import { SectionHeading } from "../components/common/SectionHeading";
import { ErrorState, LoadingState } from "../components/common/AsyncState";
import { ProjectCard } from "../components/projects/ProjectCard";
import { useApi } from "../hooks/useApi";
import { api } from "../services/api";

export default function ProjectsPage() {
  const { data: projects, loading, error } = useApi(api.getProjects);

  return (
    <PageView name="projects">
      <section className="section projects-section">
        <SectionHeading
          kicker="Selected work"
          title={
            <>
              Projects built to
              <br />
              solve real problems.
            </>
          }
          description="From offline-first mobile apps to AI-assisted research tools—each project starts with a genuine need."
        />
        {loading && <LoadingState label="Loading projects…" />}
        {error && <ErrorState message={error} />}
        {projects && (
          <div className="project-list">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        )}
      </section>
    </PageView>
  );
}
