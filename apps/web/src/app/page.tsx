import type { Metadata } from "next";
import { fetchPortfolio } from "@portfolio/shared";
import { PortfolioView } from "@/components/PortfolioView";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();
  const portfolio = await fetchPortfolio(supabase);
  return {
    title: portfolio.settings?.site_title ?? "Portfolio",
    description: portfolio.settings?.seo_description ?? "Selected work and skills.",
  };
}

export default async function Home() {
  const supabase = await createClient();
  const portfolio = await fetchPortfolio(supabase);
  const demo = !isSupabaseConfigured();

  return <PortfolioView portfolio={portfolio} demo={demo} />;
}
