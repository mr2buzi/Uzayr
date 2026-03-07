export type AudienceMode = "plain" | "balanced" | "technical";

export type ProjectTag =
  | "systems"
  | "ai-data"
  | "full-stack"
  | "embedded"
  | "security"
  | "automation";

export type ProjectTab =
  | "overview"
  | "impact"
  | "technical"
  | "tradeoffs"
  | "artifacts"
  | "links";

export type ModeCopy = Record<AudienceMode, string>;

export type ArtifactKind =
  | "live-demo"
  | "github"
  | "screenshot"
  | "architecture-snippet"
  | "api-example"
  | "cli-example"
  | "metrics-result";

export interface Artifact {
  kind: ArtifactKind;
  title: string;
  summary: string;
  preview?: string;
  href?: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectEmbed {
  title: string;
  href: string;
  caption: string;
}

export interface Project {
  slug: string;
  title: string;
  accent: string;
  heroLabel: string;
  tags: ProjectTag[];
  role: string;
  stack: string[];
  recruiterSummary: string;
  balancedSummary: string;
  technicalSummary: string;
  whyItMatters: ModeCopy[];
  technicalDetail: string[];
  tradeoffs: string[];
  outcomeBullets: ModeCopy[];
  evidencePoints: string[];
  artifacts: Artifact[];
  links: ProjectLink[];
  embed?: ProjectEmbed;
}

export interface ExperienceItem {
  company: string;
  role: string;
  date: string;
  bullets: ModeCopy[];
}

export interface SkillGroup {
  title: string;
  eyebrow: string;
  items: string[];
}

export interface EducationItem {
  institution: string;
  date: string;
  detail: string;
}

export interface SecondaryProject {
  title: string;
  tag: ProjectTag;
  summary: ModeCopy;
}

export interface InfoPanel {
  eyebrow: string;
  title: string;
  body: ModeCopy;
}

export interface CvBlock {
  eyebrow: string;
  title: string;
  items: string[];
}
