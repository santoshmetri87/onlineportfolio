import { fetchAdminPortfolio } from "@portfolio/shared";
import { deleteExperience, saveExperience } from "@/app/admin/actions";
import { Checkbox, Field, TextArea } from "@/components/admin/Fields";
import { createClient } from "@/lib/supabase/server";

export default async function ExperienceAdminPage() {
  const supabase = await createClient();
  const experiences = supabase ? (await fetchAdminPortfolio(supabase)).experiences : [];

  return (
    <div>
      <h1 className="font-serif text-4xl">Experience</h1>
      <form action={saveExperience} className="mt-8 max-w-3xl space-y-4 rounded-2xl border border-line bg-panel p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Role" name="role" required />
          <Field label="Company" name="company" required />
          <Field label="Location" name="location" />
          <Field label="Sort order" name="sort_order" type="number" defaultValue={0} />
          <Field label="Start date" name="start_date" type="date" />
          <Field label="End date" name="end_date" type="date" />
        </div>
        <TextArea label="Highlights (one per line)" name="highlights" />
        <Checkbox label="Published" name="published" defaultChecked />
        <button className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-[#1a1408]" type="submit">
          Add role
        </button>
      </form>
      <div className="mt-10 space-y-6">
        {experiences.map((job) => (
          <form key={job.id} action={saveExperience} className="max-w-3xl space-y-4 rounded-2xl border border-line p-5">
            <input type="hidden" name="id" value={job.id} />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Role" name="role" required defaultValue={job.role} />
              <Field label="Company" name="company" required defaultValue={job.company} />
              <Field label="Location" name="location" defaultValue={job.location} />
              <Field label="Sort order" name="sort_order" type="number" defaultValue={job.sort_order} />
              <Field label="Start date" name="start_date" type="date" defaultValue={job.start_date ?? ""} />
              <Field label="End date" name="end_date" type="date" defaultValue={job.end_date ?? ""} />
            </div>
            <TextArea label="Highlights (one per line)" name="highlights" defaultValue={job.highlights} />
            <Checkbox label="Published" name="published" defaultChecked={job.published} />
            <div className="flex gap-2">
              <button className="rounded-full bg-accent px-4 py-2 text-sm text-[#1a1408]" type="submit">
                Save
              </button>
              <button formAction={deleteExperience} className="rounded-full border border-line px-4 py-2 text-sm" type="submit">
                Delete
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
