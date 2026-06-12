export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  photo: string;
  linkedin?: string;
  github?: string;
  department: "faculty" | "leadership" | "technical" | "design" | "events" | "operations" | "alumni";
  order: number;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: EventCategory;
  date: string;
  endDate?: string;
  banner: string;
  location: string;
  participationCount: number;
  featured?: boolean;
  speakers?: Speaker[];
  schedule?: ScheduleItem[];
  resources?: Resource[];
}

export type EventCategory =
  | "Workshops"
  | "Webinars"
  | "Hackathons"
  | "Competitions"
  | "Guest Talks"
  | "Technical Sessions"
  | "Research Events";

export interface Speaker {
  id: string;
  name: string;
  designation: string;
  photo: string;
  bio?: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description?: string;
}

export interface Resource {
  title: string;
  url: string;
  type: "pdf" | "link" | "video";
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  banner: string;
  category: ProjectCategory;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  contributors: string[];
  featured?: boolean;
}

export type ProjectCategory =
  | "AI/ML"
  | "Web Development"
  | "Mobile Development"
  | "Open Source"
  | "IoT"
  | "Research";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: "hackathon" | "publication" | "award" | "certification" | "milestone";
  date: string;
  icon?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  year: number;
  eventId?: string;
  collection?: string;
}

export interface GalleryCollection {
  id: string;
  title: string;
  description: string;
  cover: string;
  year: number;
  imageCount: number;
  category: GalleryCategory;
}

export type GalleryCategory =
  | "Workshops"
  | "Team Meetings"
  | "Technical Events"
  | "Competitions"
  | "Guest Sessions"
  | "Celebrations"
  | "Outreach Activities"
  | "Industrial Visits"
  | "Research Activities"
  | "Community Events";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  coverImage: string;
}

export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  type: "establishment" | "event" | "workshop" | "growth" | "achievement" | "present";
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

export interface TechNode {
  id: string;
  label: string;
  description: string;
  icon: string;
  color: string;
}
