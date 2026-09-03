export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack' | 'Security & Crypto' | 'Systems & Backend';
  period: string;
  description: string;
  longDescription: string;
  metrics: string[];
  technologies: string[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  image: string;
  architectureHighlights: string[];
  interactiveType?: 'cipher' | 'jobFilter';
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: 'Project / Production' | 'Education' | 'Milestone';
  description: string;
  achievements: string[];
  skills: string[];
  link?: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    categoryBadge: string;
    description: string;
  }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  iconName: string;
  tag: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  projectType: string;
}
