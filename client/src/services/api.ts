import type { Certification, Profile, Project, Skill } from "../types";

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

export const api = {
  getProfile: () => get<Profile>("/profile"),
  getSkills: () => get<Skill[]>("/skills"),
  getCertifications: () => get<Certification[]>("/certifications"),
  getProjects: () => get<Project[]>("/projects"),
  getProject: (slug: string) => get<Project>(`/projects/${slug}`),
};
