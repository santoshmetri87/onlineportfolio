import { fetchAdminPortfolio } from "@portfolio/shared";
import { deleteLink, saveLink } from "@/app/admin/actions";
import { Checkbox, Field } from "@/components/admin/Fields";
import { createClient } from "@/lib/supabase/server";

export default async function LinksAdminPage() {
  const supabase = await createClient();
  const socialLinks = supabase ? (await fetchAdminPortfolio(supabase)).socialLinks : [];

  return (
    <div>
      <h1 className="font-serif text-4xl">Links</h1>
      <form action={saveLink} className="mt-8 grid max-w-3xl gap-4 rounded-2xl border border-line bg-panel p-5 md:grid-cols-2">
        <Field label="Label" name="label" required />
        <Field label="URL" name="url" required />
        <Field label="Sort order" name="sort_order" type="number" defaultValue={0} />
        <Checkbox label="Published" name="published" defaultChecked />
        <div className="md:col-span-2">
          <button className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-[#1a1408]" type="submit">
            Add link
          </button>
        </div>
      </form>
      <div className="mt-10 space-y-4">
        {socialLinks.map((link) => (
          <form key={link.id} action={saveLink} className="grid max-w-3xl gap-3 rounded-2xl border border-line p-4 md:grid-cols-4 md:items-end">
            <input type="hidden" name="id" value={link.id} />
            <Field label="Label" name="label" required defaultValue={link.label} />
            <Field label="URL" name="url" required defaultValue={link.url} />
            <Field label="Order" name="sort_order" type="number" defaultValue={link.sort_order} />
            <div className="space-y-3">
              <Checkbox label="Published" name="published" defaultChecked={link.published} />
              <div className="flex gap-2">
                <button className="rounded-full bg-accent px-4 py-2 text-sm text-[#1a1408]" type="submit">
                  Save
                </button>
                <button formAction={deleteLink} className="rounded-full border border-line px-4 py-2 text-sm" type="submit">
                  Delete
                </button>
              </div>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
