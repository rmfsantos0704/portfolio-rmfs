import { Link } from "react-router-dom";
import { PageView } from "../components/common/PageView";
import { ContactStrip } from "../components/home/ContactStrip";
import { CopyButton } from "../components/ui/CopyButton";
import { Icon } from "../components/ui/Icon";
import { useProfile } from "../context/ProfileContext";

export default function HomePage() {
  const profile = useProfile();

  return (
    <PageView name="home">
      <section className="hero section">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" /> {profile?.availability ?? "Available for opportunities"}
          </div>
          <h1>
            <span className="hero-line">Software designed</span>
            <span className="hero-line">
              for the <em>real world.</em>
            </span>
          </h1>
          <p className="hero-intro">
            I’m <strong>Russel Santos</strong>, a full-stack developer turning complex ideas into
            reliable web and mobile experiences.
          </p>
          <div className="hero-actions">
            <Link className="button primary" to="/projects">
              Explore my work <Icon name="arrow" />
            </Link>
            <a className="button outline" href="/Russel-Santos-Resume.pdf" download="Russel-Santos-Resume.pdf">
              Resume <Icon name="download" />
            </a>
            {profile?.email && (
              <CopyButton className="text-link" text={profile.email} label="Copy email address" copiedLabel="Email copied">
                Start a conversation
              </CopyButton>
            )}
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="code-card">
            <div className="code-header">
              <i />
              <i />
              <i />
              <span>build.ts</span>
            </div>
            <code>
              <span className="pink">const</span> developer = {"{"}
              <br />
              &nbsp;&nbsp;curious: <span className="blue">true</span>,<br />
              &nbsp;&nbsp;craft: <span className="green">'full-stack'</span>,<br />
              &nbsp;&nbsp;focus: <span className="green">'useful things'</span>
              <br />
              {"}"};
            </code>
          </div>
          <div className="floating-tag tag-one">
            <Icon name="spark" size={16} /> Build with care
          </div>
          <div className="floating-tag tag-two">
            <Icon name="code" size={16} /> Ship with purpose
          </div>
        </div>

        {profile && <ContactStrip profile={profile} />}
      </section>
    </PageView>
  );
}