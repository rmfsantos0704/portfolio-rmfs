import { PageView } from "../components/common/PageView";
import { SectionHeading } from "../components/common/SectionHeading";
import { ErrorState, LoadingState } from "../components/common/AsyncState";
import { SkillsExplorer } from "../components/skills/SkillsExplorer";
import { useApi } from "../hooks/useApi";
import { api } from "../services/api";

export default function SkillsPage() {
  const skills = useApi(api.getSkills);
  const projects = useApi(api.getProjects);

  return (
    <PageView name="skills">
      <section className="section skills-section">
        <SectionHeading
          className="skills-heading"
          kicker="The toolkit"
          title={
            <>
              Skills that move
              <br />
              ideas forward.
            </>
          }
          description="Pick a skill to see how well I know it and where I’ve actually used it."
        />
        {skills.loading && <LoadingState label="Loading skills…" />}
        {skills.error && <ErrorState message={skills.error} />}
        {skills.data && <SkillsExplorer skills={skills.data} projects={projects.data ?? []} />}
      </section>
    </PageView>
  );
}
