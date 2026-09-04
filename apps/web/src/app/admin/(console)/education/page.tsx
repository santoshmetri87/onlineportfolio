import { fetchAdminPortfolio } from "@portfolio/shared";
import { deleteEducation, saveEducation } from "@/app/admin/actions";
import { Checkbox, Field, TextArea } from "@/components/admin/Fields";
import { createClient } from "@/lib/supabase/server";

export default async function EducationAdminPage() {
  const supabase = await createClient();
  const education = supabase ? (await fetchAdminPortfolio(supabase)).education : [];

  return (
    <div>
      <h1 className="font-serif text-4xl">Education</h1>
      <form action={saveEducation} className="mt-8 max-w-3xl space-y-4 rounded-2xl border border-line bg-panel p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Institution" name="institution" required />
          <Field label="Credential" name="credential" />
          <Field label="Start date" name="start_date" type="date" />
          <Field label="End date" name="end_date" type="date" />
          <Field label="Sort order" name="sort_order" type="number" defaultValue={0} />
        </div>
        <TextArea label="Details" name="details" />
        <Checkbox label="Published" name="published" defaultChecked />
        <button className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-[#1a1408]" type="submit">
          Add education
        </button>
      </form>
      <div className="mt-10 space-y-6">
        {education.map((item) => (
          <form key={item.id} action={saveEducation} className="max-w-3xl space-y-4 rounded-2xl border border-line p-5">
            <input type="hidden" name="id" value={item.id} />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Institution" name="institution" required defaultValue={item.institution} />
              <Field label="Credential" name="credential" defaultValue={item.credential} />
              <Field label="Start date" name="start_date" type="date" defaultValue={item.start_date ?? ""} />
              <Field label="End date" name="end_date" type="date" defaultValue={item.end_date ?? ""} />
              <Field label="Sort order" name="sort_order" type="number" defaultValue={item.sort_order} />
            </div>
            <TextArea label="Details" name="details" defaultValue={item.details} />
            <Checkbox label="Published" name="published" defaultChecked={item.published} />
            <div className="flex gap-2">
              <button className="rounded-full bg-accent px-4 py-2 text-sm text-[#1a1408]" type="submit">
                Save
              </button>
              <button formAction={deleteEducation} className="rounded-full border border-line px-4 py-2 text-sm" type="submit">
                Delete
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
