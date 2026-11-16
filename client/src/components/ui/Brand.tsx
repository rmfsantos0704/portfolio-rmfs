import { useState, type MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * The "RS." logo. It invites interaction in three ways:
 *  - the dot gives off a slow pulse,
 *  - hovering / focusing expands it to "Russel Santos." and shows a "Home" hint,
 *  - clicking bounces the dot and takes you home (or back to the top if you're already there).
 */
export function Brand({ onNavigate }: { onNavigate?: () => void }) {
  const [popping, setPopping] = useState(false);
  const { pathname } = useLocation();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setPopping(true);
    onNavigate?.();
    if (pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      className={popping ? "brand brand-interactive popping" : "brand brand-interactive"}
      to="/"
      onClick={handleClick}
      aria-label="Russel Santos, home"
    >
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-letter">R</span>
        <span className="brand-more">ussel</span>
        <span className="brand-letter">S</span>
        <span className="brand-more">antos</span>
        <span className="brand-dot" onAnimationEnd={() => setPopping(false)} />
      </span>
      <span className="brand-hint" aria-hidden="true">
        Home
      </span>
    </Link>
  );
}