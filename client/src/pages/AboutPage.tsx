import { PageView } from "../components/common/PageView";
import { LoadingState } from "../components/common/AsyncState";
import { useProfile } from "../context/ProfileContext";

export default function AboutPage() {
  const profile = useProfile();
  const [lead, ...rest] = profile?.bio ?? [];
  const experience = profile?.experience[0];
  const education = profile?.education[0];

  return (
    <PageView name="about">
      <section className="about-section">
        <div className="section about-grid">
          <div className="about-title">
            <span className="kicker light">Behind the code</span>
            <h2>
              Curious by nature.
              <br />
              <em>Practical</em> by choice.
            </h2>
          </div>

          <div className="about-copy">
            {!profile && <LoadingState label="Loading…" />}
            {lead && <p className="large">{lead}</p>}
            {rest.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {experience && (
            <div className="experience-card">
              <div className="experience-top">
                <span>Experience</span>
                <span>{experience.period}</span>
              </div>
              <h3>{experience.role}</h3>
              <strong>{experience.company}</strong>
              <p>{experience.summary}</p>
            </div>
          )}

          {education && (
            <div className="education-card">
              <span className="mini-label">Education</span>
              <div className="edu-year">’26</div>
              <h3>{education.degree}</h3>
              <p>
                {education.major}
                <br />
                {education.school}
              </p>
              {education.graduation && <span className="graduation">{education.graduation}</span>}
            </div>
          )}
        </div>
      </section>
    </PageView>
  );
}
