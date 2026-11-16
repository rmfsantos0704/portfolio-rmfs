import type { MouseEvent } from "react";
import { Icon } from "./Icon";
import { useTheme } from "../../context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    // The light spreads from (or is pulled back into) the centre of this button.
    const rect = event.currentTarget.getBoundingClientRect();
    toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={handleClick}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      {/* key remounts the icon so its spin-in animation replays on every switch */}
      <span className="theme-icon" key={theme}>
        <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
      </span>
    </button>
  );
}