import { fetchAdminPortfolio } from "@portfolio/shared";
import { deleteProject, saveProject } from "@/app/admin/actions";
import { Checkbox, Field, TextArea } from "@/components/admin/Fields";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { createClient } from "@/lib/supabase/server";

export default async function ProjectsAdminPage() {
  const supabase = await createClient();
  const projects = supabase ? (await fetchAdminPortfolio(supabase)).projects : [];

  return (
    <div>
      <h1 className="font-serif text-4xl">Projects</h1>
      <form action={saveProject} className="mt-8 max-w-3xl space-y-4 rounded-2xl border border-line bg-panel p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Title" name="title" required />
          <Field label="Sort order" name="sort_order" type="number" defaultValue={0} />
          <Field label="Live URL" name="live_url" />
          <Field label="Repo URL" name="repo_url" />
        </div>
        <Field label="Stack (comma separated)" name="stack" />
        <TextArea label="Summary" name="summary" />
        <TextArea label="Description" name="description" />
        <ImageUploadField name="image_url" folder="projects" />
        <div className="flex gap-6">
          <Checkbox label="Featured" name="featured" />
          <Checkbox label="Published" name="published" defaultChecked />
        </div>
        <button className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-[#1a1408]" type="submit">
          Add project
        </button>
      </form>
      <div className="mt-10 space-y-6">
        {projects.map((project) => (
          <form key={project.id} action={saveProject} className="max-w-3xl space-y-4 rounded-2xl border border-line p-5">
            <input type="hidden" name="id" value={project.id} />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Title" name="title" required defaultValue={project.title} />
              <Field label="Sort order" name="sort_order" type="number" defaultValue={project.sort_order} />
              <Field label="Live URL" name="live_url" defaultValue={project.live_url} />
              <Field label="Repo URL" name="repo_url" defaultValue={project.repo_url} />
            </div>
            <Field label="Stack (comma separated)" name="stack" defaultValue={project.stack} />
            <TextArea label="Summary" name="summary" defaultValue={project.summary} />
            <TextArea label="Description" name="description" defaultValue={project.description} />
            <ImageUploadField name="image_url" defaultValue={project.image_url} folder="projects" />
            <div className="flex gap-6">
              <Checkbox label="Featured" name="featured" defaultChecked={project.featured} />
              <Checkbox label="Published" name="published" defaultChecked={project.published} />
            </div>
            <div className="flex gap-2">
              <button className="rounded-full bg-accent px-4 py-2 text-sm text-[#1a1408]" type="submit">
                Save
              </button>
              <button formAction={deleteProject} className="rounded-full border border-line px-4 py-2 text-sm" type="submit">
                Delete
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
