import type { Project } from "../../types";

function SnowEdMockup() {
  return (
    <div className="phone-mockup">
      <div className="phone-top" />
      <div className="phone-date">TUE, 14 MAY</div>
      <strong>Good morning.</strong>
      <div className="schedule-line">
        <i />
        <span>
          09:00
          <br />
          <b>Algorithms</b>
        </span>
      </div>
      <div className="schedule-line lilac">
        <i />
        <span>
          13:30
          <br />
          <b>Software Eng.</b>
        </span>
      </div>
    </div>
  );
}

function OwletMockup() {
  return (
    <div className="browser-mockup">
      <div className="browser-bar">
        <i />
        <i />
        <i />
      </div>
      <div className="browser-body">
        <aside>
          <span />
          <span />
          <span />
        </aside>
        <main>
          <small>EVIDENCE BOARD</small>
          <div className="clip one">“Digital tools can improve…”</div>
          <div className="clip two">
            Key findings
            <br />
            <b>+ 12 sources</b>
          </div>
        </main>
      </div>
    </div>
  );
}

function LoxMockup() {
  return (
    <div className="terminal-mockup">
      <div className="terminal-bar">
        <i />
        <i />
        <i />
        <span>~/projects/lox</span>
      </div>
      <p>
        <em>➜</em> lox commit
      </p>
      <p className="muted">Analyzing 4 changed files...</p>
      <p>
        <b>✓</b> feat(cli): add semantic
        <br />
        &nbsp;&nbsp;version detection
      </p>
      <p className="muted">Committed locally in 1.8s</p>
    </div>
  );
}

const mockups: Record<Project["mockupKey"], () => React.JSX.Element> = {
  snowed: SnowEdMockup,
  owlet: OwletMockup,
  lox: LoxMockup,
};

export function ProjectMockup({ mockupKey }: { mockupKey: Project["mockupKey"] }) {
  const Mockup = mockups[mockupKey];
  return <Mockup />;
}
