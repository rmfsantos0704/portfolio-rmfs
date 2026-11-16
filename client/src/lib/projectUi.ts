import type { CSSProperties } from "react";
import type { Theme } from "../context/ThemeContext";
import type { Project, ProjectTheme } from "../types";

function luminance(hex: string): number {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) return 0;
  const value = parseInt(match[1], 16);
  const channel = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return (
    0.2126 * channel((value >> 16) & 255) +
    0.7152 * channel((value >> 8) & 255) +
    0.0722 * channel(value & 255)
  );
}

function contrast(a: number, b: number): number {
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

const DARK_TEXT = "#0b1220";

/** White or near-black, whichever is easier to read on the given background colour. */
export function readableOn(background: string): string {
  const l = luminance(background);
  return contrast(l, 1) >= contrast(l, luminance(DARK_TEXT)) ? "#ffffff" : DARK_TEXT;
}

/**
 * CSS variables for a project's colours in the given site mode (light or dark).
 * Spread onto the element that wraps the project's UI.
 */
export function themeVars(theme: ProjectTheme, mode: Theme): CSSProperties {
  const palette = theme[mode];
  return {
    "--pd-accent": theme.accent,
    "--pd-secondary": theme.secondary ?? theme.accent,
    "--pd-highlight": theme.highlight ?? theme.accent,
    "--pd-title": palette.title,
    "--pd-backdrop": palette.backdrop,
    "--pd-bg": palette.pageBackground,
    "--pd-surface": palette.pageSurface,
    "--pd-text": palette.pageText,
    "--pd-muted": palette.pageMuted,
    "--pd-on-accent": readableOn(theme.accent),
    "--pd-on-backdrop": readableOn(palette.backdrop),
  } as CSSProperties;
}

/** Text shown in the mockup's address bar. */
export function deviceAddress(project: Project): string {
  if (project.deviceType === "terminal") return `~/projects/${project.slug}`;
  if (project.liveUrl) {
    try {
      return new URL(project.liveUrl).host;
    } catch {
      /* fall through to the project name */
    }
  }
  return project.name;
}

export const DEVICE_LABELS: Record<Project["deviceType"], string> = {
  desktop: "Web / desktop",
  mobile: "Mobile app",
  terminal: "Command line",
};
