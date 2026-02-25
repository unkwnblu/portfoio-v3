export type ProjectCategory = "UI/UX" | "Web Dev" | "Mobile Apps" | "IoT/Hardware";

export type ProjectStatus = "Completed" | "Ongoing";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  techStack: string[];
  gradient: string;
  icon: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  interests: string[];
  socialLinks: SocialLink[];
}
