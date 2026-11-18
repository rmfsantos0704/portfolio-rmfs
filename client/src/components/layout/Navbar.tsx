import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { Brand } from "../ui/Brand";
import { CopyButton } from "../ui/CopyButton";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useProfile } from "../../context/ProfileContext";

const links = [
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/certifications", label: "Certifications" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const profile = useProfile();
  const close = () => setOpen(false);

  return (
    <header className="nav-wrap">
      <Brand onNavigate={close} />
      <nav className={open ? "nav-links open" : "nav-links"} aria-label="Primary navigation">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} onClick={close}>
            {link.label}
          </NavLink>
        ))}
        <a className="nav-resume" href="/Russel-Santos-Resume.pdf" target="_blank" rel="noopener noreferrer" onClick={close}>
          Resume <Icon name="download" size={15} />
        </a>
        {profile?.email && (
          <CopyButton className="nav-contact" text={profile.email} label="Copy email address" copiedLabel="Email copied">
            Let’s talk <Icon name="arrow" size={17} />
          </CopyButton>
        )}
      </nav>
      <div className="nav-actions">
        <ThemeToggle />
        <button
          className="menu-button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "x" : "menu"} />
        </button>
      </div>
    </header>
  );
}