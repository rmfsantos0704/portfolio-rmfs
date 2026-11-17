import type { Certification, Profile, Project, ProjectPalette, ProjectTheme, Skill } from "../types";

const BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) || "/api";

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = await response.json();
      if (body?.error) message = body.error;
    } catch {
      /* non-JSON error body */
    }
    throw new Error(message);
  }
  const body = (await response.json()) as { data: T };
  return body.data;
}

// Data seeded before light/dark palettes existed has one flat set of page colours.
// Use it for both modes so those pages still render until you re-seed.
function normalizeTheme(theme: ProjectTheme): ProjectTheme {
  if (theme.dark && theme.light) return theme;
  const flat = theme as unknown as Record<string, string>;
  const palette: ProjectPalette = {
    title: flat.title,
    backdrop: flat.backdrop,
    pageBackground: flat.pageBackground,
    pageSurface: flat.pageSurface,
    pageText: flat.pageText,
    pageMuted: flat.pageMuted,
  };
  return { ...theme, dark: theme.dark ?? palette, light: theme.light ?? palette };
}

// Lists the API may omit are turned into empty arrays so components can rely on them.
function normalizeProject(project: Project): Project {
  return {
    ...project,
    theme: normalizeTheme(project.theme),
    techStack: project.techStack ?? [],
    screenshots: project.screenshots ?? [],
    mobileScreenshots: project.mobileScreenshots ?? [],
    sdlc: project.sdlc ?? [],
  };
}

export const api = {
  getProfile: () => get<Profile>("/profile"),
  getSkills: () => get<Skill[]>("/skills"),
  getCertifications: () => get<Certification[]>("/certifications"),
  getProjects: () => get<Project[]>("/projects").then((list) => list.map(normalizeProject)),
  getProject: (slug: string) => get<Project>(`/projects/${slug}`).then(normalizeProject),
};