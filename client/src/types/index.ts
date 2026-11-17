export interface Experience {
  role: string;
  company: string;
  period: string;
  summary: string;
}

export interface Education {
  degree: string;
  major?: string;
  school: string;
  graduation?: string;
}

export interface Profile {
  name: string;
  headline: string;
  availability: string;
  intro?: string;
  bio: string[];
  email: string;
  phone?: string;
  location?: string;
  socials: { github?: string; linkedin?: string };
  experience: Experience[];
  education: Education[];
}

export type SkillCategory = "languages" | "frontend" | "backend-data" | "tools";

export interface Skill {
  _id: string;
  name: string;
  slug: string;
  category: SkillCategory;
  level: number;
  summary: string;
  usedIn: string[];
  order: number;
}

export interface Certification {
  _id: string;
  title: string;
  slug: string;
  issuer: string;
  program?: string;
  description: string;
  highlights: string[];
  imageUrl?: string;
  credentialUrl?: string;
  issuedAt?: string;
  order: number;
}

export type DeviceType = "desktop" | "mobile" | "terminal" ;

/** Page colours for one site mode. */
export interface ProjectPalette {
  title: string;
  /** Background of the mockup panels (card + screenshot stage). */
  backdrop: string;
  pageBackground: string;
  pageSurface: string;
  pageText: string;
  pageMuted: string;
}

export interface ProjectTheme {
  accent: string;
  secondary?: string;
  highlight?: string;
  dark: ProjectPalette;
  light: ProjectPalette;
}

export interface SdlcPhase {
  phase: string;
  description: string;
}

export interface Project {
  _id: string;
  slug: string;
  name: string;
  type: string;
  summary: string;
  techStack: string[];
  deviceType: DeviceType;
  logo?: string;
  screenshots: string[];
  /** Optional phone screenshots, shown in a phone frame behind a Desktop / Mobile switch. */
  mobileScreenshots?: string[];
  theme: ProjectTheme;
  watermark?: string;
  role?: string;
  challenge?: string;
  solution?: string;
  sdlc: SdlcPhase[];
  liveUrl?: string;
  githubUrl?: string;
  order: number;
}