import type { ReactNode } from "react";

export type PageName = "home" | "projects" | "about" | "skills" | "certifications";

/** Wraps a page in <main> and applies the per-page entrance animation from the Figma CSS. */
export function PageView({ name, children }: { name: PageName; children: ReactNode }) {
  return <main className={`page-view page-${name}`}>{children}</main>;
}
