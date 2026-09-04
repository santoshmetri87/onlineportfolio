import { MOCK_PORTFOLIO } from "./mock";
import type {
  Education,
  Experience,
  Portfolio,
  Profile,
  Project,
  SiteSettings,
  Skill,
  SocialLink,
} from "./types";

export type PortfolioClient = {
  from: (table: string) => {
    select: (columns: string) => Record<string, unknown>;
  };
};

function asList<T>(data: unknown): T[] {
  return Array.isArray(data) ? (data as T[]) : [];
}

export async function fetchPortfolio(supabase: { from: Function } | null): Promise<Portfolio> {
  if (!supabase) return MOCK_PORTFOLIO;

  const [
    profileRes,
    skillsRes,
    experiencesRes,
    projectsRes,
    educationRes,
    linksRes,
    settingsRes,
  ] = await Promise.all([
    supabase.from("profiles").select("*").limit(1).maybeSingle(),
    supabase.from("skills").select("*").eq("published", true).order("sort_order"),
    supabase.from("experiences").select("*").eq("published", true).order("sort_order"),
    supabase.from("projects").select("*").eq("published", true).order("sort_order"),
    supabase.from("education").select("*").eq("published", true).order("sort_order"),
    supabase.from("social_links").select("*").eq("published", true).order("sort_order"),
    supabase.from("site_settings").select("*").limit(1).maybeSingle(),
  ]);

  const failed = [
    profileRes.error,
    skillsRes.error,
    experiencesRes.error,
    projectsRes.error,
    educationRes.error,
    linksRes.error,
    settingsRes.error,
  ].some(Boolean);

  if (failed) return MOCK_PORTFOLIO;

  return {
    profile: (profileRes.data as Profile | null) ?? null,
    skills: asList<Skill>(skillsRes.data),
    experiences: asList<Experience>(experiencesRes.data),
    projects: asList<Project>(projectsRes.data),
    education: asList<Education>(educationRes.data),
    socialLinks: asList<SocialLink>(linksRes.data),
    settings: (settingsRes.data as SiteSettings | null) ?? null,
  };
}

export async function fetchAdminPortfolio(supabase: { from: Function }): Promise<Portfolio> {
  const [
    profileRes,
    skillsRes,
    experiencesRes,
    projectsRes,
    educationRes,
    linksRes,
    settingsRes,
  ] = await Promise.all([
    supabase.from("profiles").select("*").limit(1).maybeSingle(),
    supabase.from("skills").select("*").order("sort_order"),
    supabase.from("experiences").select("*").order("sort_order"),
    supabase.from("projects").select("*").order("sort_order"),
    supabase.from("education").select("*").order("sort_order"),
    supabase.from("social_links").select("*").order("sort_order"),
    supabase.from("site_settings").select("*").limit(1).maybeSingle(),
  ]);

  return {
    profile: (profileRes.data as Profile | null) ?? null,
    skills: asList<Skill>(skillsRes.data),
    experiences: asList<Experience>(experiencesRes.data),
    projects: asList<Project>(projectsRes.data),
    education: asList<Education>(educationRes.data),
    socialLinks: asList<SocialLink>(linksRes.data),
    settings: (settingsRes.data as SiteSettings | null) ?? null,
  };
}
