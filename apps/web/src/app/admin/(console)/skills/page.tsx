import { fetchAdminPortfolio } from "@portfolio/shared";
import { deleteSkill, saveSkill } from "@/app/admin/actions";
import { Checkbox, Field } from "@/components/admin/Fields";
import { createClient } from "@/lib/supabase/server";

export default async function SkillsAdminPage() {
  const supabase = await createClient();
  const skills = supabase ? (await fetchAdminPortfolio(supabase)).skills : [];

  return (
    <div>
      <h1 className="font-serif text-4xl">Skills</h1>
      <form action={saveSkill} className="mt-8 grid max-w-3xl gap-4 rounded-2xl border border-line bg-panel p-5 md:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Category" name="category" defaultValue="General" />
        <Field label="Level (1-5)" name="level" type="number" defaultValue={3} />
        <Field label="Sort order" name="sort_order" type="number" defaultValue={0} />
        <Checkbox label="Published" name="published" defaultChecked />
        <div className="md:col-span-2">
          <button className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-[#1a1408]" type="submit">
            Add skill
          </button>
        </div>
      </form>
      <div className="mt-10 space-y-4">
        {skills.map((skill) => (
          <form key={skill.id} action={saveSkill} className="grid gap-3 rounded-2xl border border-line p-4 md:grid-cols-6 md:items-end">
            <input type="hidden" name="id" value={skill.id} />
            <Field label="Name" name="name" defaultValue={skill.name} required />
            <Field label="Category" name="category" defaultValue={skill.category} />
            <Field label="Level" name="level" type="number" defaultValue={skill.level} />
            <Field label="Order" name="sort_order" type="number" defaultValue={skill.sort_order} />
            <Checkbox label="Published" name="published" defaultChecked={skill.published} />
            <div className="flex gap-2">
              <button className="rounded-full bg-accent px-4 py-2 text-sm text-[#1a1408]" type="submit">
                Save
              </button>
              <button formAction={deleteSkill} className="rounded-full border border-line px-4 py-2 text-sm" type="submit">
                Delete
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
