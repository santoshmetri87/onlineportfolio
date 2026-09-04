import { fetchAdminPortfolio } from "@portfolio/shared";
import { saveSettings } from "@/app/admin/actions";
import { Field, TextArea } from "@/components/admin/Fields";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsAdminPage() {
  const supabase = await createClient();
  const portfolio = supabase ? await fetchAdminPortfolio(supabase) : { settings: null };
  const settings = portfolio.settings;

  return (
    <div>
      <h1 className="font-serif text-4xl">Settings</h1>
      <form action={saveSettings} className="mt-8 max-w-2xl space-y-4">
        <input type="hidden" name="id" value={settings?.id ?? ""} />
        <Field label="Site title" name="site_title" required defaultValue={settings?.site_title} />
        <Field label="Tagline" name="tagline" defaultValue={settings?.tagline} />
        <TextArea label="SEO description" name="seo_description" defaultValue={settings?.seo_description} />
        <Field label="Contact email" name="contact_email" type="email" defaultValue={settings?.contact_email} />
        <Field label="Availability" name="availability" defaultValue={settings?.availability} />
        <button className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-[#1a1408]" type="submit">
          Save settings
        </button>
      </form>
    </div>
  );
}
