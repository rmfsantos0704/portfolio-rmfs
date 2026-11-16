import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Icon } from "../ui/Icon";
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
      <Link className="brand" to="/" onClick={close} aria-label="Russel Santos, home">
        RS<span>.</span>
      </Link>
      <nav className={open ? "nav-links open" : "nav-links"} aria-label="Primary navigation">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} onClick={close}>
            {link.label}
          </NavLink>
        ))}
        <a className="nav-contact" href={`mailto:${profile?.email ?? ""}`}>
          Let’s talk <Icon name="arrow" size={17} />
        </a>
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
