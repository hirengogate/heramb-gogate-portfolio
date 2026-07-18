// Types and icon registry for the portfolio.
//
// The actual portfolio content is NOT exported from this file. It lives in
// src/data/portfolio.encrypted.ts as AES-GCM ciphertext and is only decoded
// in memory after the correct passcode is entered. Importing this file gives
// you the shape of the data and the icon registry needed to render it, but
// none of the content.

import {
  BarChart3,
  Brain,
  BriefcaseBusiness,
  LineChart,
  Mail,
  Megaphone,
  PenLine,
  Search,
  Share2,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const iconMap = {
  BarChart3,
  Brain,
  BriefcaseBusiness,
  LineChart,
  Mail,
  Megaphone,
  PenLine,
  Search,
  Share2,
  Sparkles,
  Target,
  Users,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

export type Metric = {
  value: string;
  label: string;
  detail: string;
};

export type CaseStudy = {
  title: string;
  eyebrow: string;
  summary: string;
  highlights: string[];
  accent: 'teal' | 'wine' | 'gold' | 'ink';
  icon: IconName;
};

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  points: string[];
};

export type SkillGroup = {
  title: string;
  icon: IconName;
  items: string[];
};

// Work is segmented by discipline/service. Each Discipline is its own routed
// page (#/work/:slug). A Discipline holds Projects (the actual case studies);
// these arrays start empty and get populated as case-study content is added.
export type Project = {
  title: string;
  brand: string;
  // Optional: omitted while a case study's dates are still being confirmed.
  period?: string;
  summary: string;
  highlights: string[];
  metrics?: { value: string; label: string }[];
  images?: { src: string; caption?: string; half?: boolean }[];
  // Lay the gallery out as equal-height tiles N across, wrapping onto further
  // rows, instead of stacking every image full-width. Omit to keep stacking.
  galleryColumns?: 2 | 3;
  // Vertical (9:16) case-study clips served from public/ and played inline.
  // `poster` defaults to /posters/<filename>.webp — see posterFor().
  videos?: { src: string; caption?: string; poster?: string }[];
};

export type Discipline = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  icon: IconName;
  accent: 'teal' | 'wine' | 'gold' | 'ink';
  projects: Project[];
};

export type Testimonial = {
  name: string;
  title: string;
  company: string;
  quote: string;
  avatar: string;
};

export type Certification = {
  title: string;
  detail: string;
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  email: string;
  linkedin: string;
  resume: string;
};

export type Education = {
  institution: string;
  degree: string;
  period: string;
  result: string;
  note: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type ContactAction = {
  label: string;
  href: string;
  icon: IconName;
};

export type PortfolioData = {
  profile: Profile;
  metrics: Metric[];
  caseStudies: CaseStudy[];
  experiences: Experience[];
  skillGroups: SkillGroup[];
  education: Education;
  certifications: Certification[];
  navItems: NavItem[];
  contactActions: ContactAction[];
};
