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

export interface Project {
  _id: string;
  slug: string;
  name: string;
  type: string;
  summary: string;
  tags: string[];
  mockupKey: "snowed" | "owlet" | "lox";
  color: "blue" | "orange" | "lime";
  githubUrl?: string;
  liveUrl?: string;
  order: number;
}
