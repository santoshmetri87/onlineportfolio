import { fetchAdminPortfolio } from "@portfolio/shared";
import { saveProfile } from "@/app/admin/actions";
import { Field, TextArea } from "@/components/admin/Fields";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { createClient } from "@/lib/supabase/server";

export default async function ProfileAdminPage() {
  const supabase = await createClient();
  const portfolio = supabase ? await fetchAdminPortfolio(supabase) : { profile: null };
  const profile = portfolio.profile;

  return (
    <div>
      <h1 className="font-serif text-4xl">Profile</h1>
      <form action={saveProfile} className="mt-8 max-w-2xl space-y-4">
        <input type="hidden" name="id" value={profile?.id ?? ""} />
        <Field label="Full name" name="full_name" required defaultValue={profile?.full_name} />
        <Field label="Headline" name="headline" defaultValue={profile?.headline} />
        <TextArea label="Bio" name="bio" defaultValue={profile?.bio} rows={6} />
        <Field label="Location" name="location" defaultValue={profile?.location} />
        <ImageUploadField name="headshot_url" defaultValue={profile?.headshot_url} folder="headshots" />
        <Field label="Resume URL" name="resume_url" defaultValue={profile?.resume_url} />
        <button className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-[#1a1408]" type="submit">
          Save profile
        </button>
      </form>
    </div>
  );
}
