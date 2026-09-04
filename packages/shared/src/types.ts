export type Profile = {
  id: string;
  full_name: string;
  headline: string | null;
  bio: string | null;
  location: string | null;
  headshot_url: string | null;
  resume_url: string | null;
  updated_at: string | null;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  level: number;
  sort_order: number;
  published: boolean;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  highlights: string | null;
  sort_order: number;
  published: boolean;
};

export type Project = {
  id: string;
  title: string;
  summary: string | null;
  description: string | null;
  stack: string | null;
  live_url: string | null;
  repo_url: string | null;
  image_url: string | null;
  featured: boolean;
  sort_order: number;
  published: boolean;
};

export type Education = {
  id: string;
  institution: string;
  credential: string | null;
  start_date: string | null;
  end_date: string | null;
  details: string | null;
  sort_order: number;
  published: boolean;
};

export type SocialLink = {
  id: string;
  label: string;
  url: string;
  sort_order: number;
  published: boolean;
};

export type SiteSettings = {
  id: string;
  site_title: string;
  tagline: string | null;
  seo_description: string | null;
  contact_email: string | null;
  availability: string | null;
  updated_at: string | null;
};

export type Portfolio = {
  profile: Profile | null;
  skills: Skill[];
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  socialLinks: SocialLink[];
  settings: SiteSettings | null;
};
