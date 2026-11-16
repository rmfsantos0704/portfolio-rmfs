import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

export type Theme = "light" | "dark";

/** Screen position (px) the theme change spreads from / collapses into. */
export interface ToggleOrigin {
  x: number;
  y: number;
}

const STORAGE_KEY = "theme";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: (origin?: ToggleOrigin) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// The inline script in index.html has already set data-theme before React
// mounts (no flash), so read it back instead of recomputing.
function readInitialTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

// In development, say why a switch was not animated. Open the browser console
// (F12) if the theme ever changes instantly.
function explain(reason: string) {
  if (import.meta.env.DEV) console.info(`[theme] switched without the circle animation: ${reason}`);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);
  const animating = useRef(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage unavailable (private mode) — theme still works for this visit */
    }
  }, [theme]);

  const toggleTheme = useCallback(
    (origin?: ToggleOrigin) => {
      if (animating.current) return;

      const next: Theme = theme === "dark" ? "light" : "dark";
      const root = document.documentElement;

      const apply = () => {
        root.setAttribute("data-theme", next);
        // Render synchronously so the browser captures the finished "new" state.
        flushSync(() => setTheme(next));
      };

      if (!origin) {
        explain("no click position was provided");
        apply();
        return;
      }
      if (typeof document.startViewTransition !== "function") {
        explain("this browser does not support View Transitions");
        apply();
        return;
      }

      // Visitors who ask their OS for less motion get a short fade instead of the circle.
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) explain("your OS/browser has 'reduce motion' turned on, using a quick fade instead");

      // The animation itself lives in CSS (interactions.css) and reads these values,
      // so it starts in the very same frame the browser creates the transition.
      const { x, y } = origin;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      animating.current = true;
      const cleanup = () => {
        animating.current = false;
        root.classList.remove("theme-switching");
        root.removeAttribute("data-theme-anim");
        root.style.removeProperty("--vt-x");
        root.style.removeProperty("--vt-y");
        root.style.removeProperty("--vt-r");
      };

      root.classList.add("theme-switching"); // pauses normal CSS transitions mid-switch
      root.style.setProperty("--vt-x", `${x}px`);
      root.style.setProperty("--vt-y", `${y}px`);
      root.style.setProperty("--vt-r", `${radius}px`);
      root.setAttribute("data-theme-anim", reduceMotion ? "fade" : next === "light" ? "to-light" : "to-dark");

      try {
        const transition = document.startViewTransition(apply);
        transition.ready.catch((error: unknown) => {
          explain(`the browser skipped the transition (${(error as Error)?.name ?? "unknown"})`);
        });
        transition.finished.then(cleanup, cleanup);
      } catch (error) {
        explain(`starting the transition failed (${(error as Error)?.message})`);
        cleanup();
        apply();
      }
    },
    [theme],
  );

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside <ThemeProvider>");
  return context;
}