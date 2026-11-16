import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { useProfile } from "../../context/ProfileContext";

export function Footer() {
  const profile = useProfile();

  return (
    <footer className="compact-footer">
      <div className="footer-inner">
        <Link className="brand footer-brand" to="/">
          RS<span>.</span>
        </Link>
        <p>Full-stack developer · Orani, Bataan, Philippines</p>
        <div className="socials">
          {profile?.socials.linkedin && (
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Icon name="linkedin" />
            </a>
          )}
          {profile?.socials.github && (
            <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Icon name="github" />
            </a>
          )}
        </div>
        <p className="copyright">© {new Date().getFullYear()} Russel Santos. Designed & built with care.</p>
      </div>
    </footer>
  );
}
