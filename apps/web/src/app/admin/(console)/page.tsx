import { fetchAdminPortfolio } from "@portfolio/shared";
import Link from "next/link";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export default async function AdminHome() {
  const configured = isSupabaseConfigured();
  const supabase = await createClient();
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;
  const admin = user
    ? (
        await supabase!.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle()
      ).data
    : null;
  const portfolio = supabase ? await fetchAdminPortfolio(supabase) : null;

  return (
    <div>
      <h1 className="font-serif text-4xl">Overview</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Edit live content here. Native and web both read the same Supabase tables.
      </p>
      {!configured ? (
        <p className="mt-6 rounded-2xl border border-line bg-panel p-4 text-sm">
          Supabase is not configured yet. The public site uses sample data until you add env vars.
        </p>
      ) : null}
      {configured && user && !admin ? (
        <p className="mt-6 rounded-2xl border border-line bg-panel p-4 text-sm">
          Signed in as {user.email}, but this user is not in <code>admin_users</code>. Run the
          insert from the README.
        </p>
      ) : null}
      <dl className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          ["Skills", portfolio?.skills.length ?? 0, "/admin/skills"],
          ["Projects", portfolio?.projects.length ?? 0, "/admin/projects"],
          ["Experience", portfolio?.experiences.length ?? 0, "/admin/experience"],
        ].map(([label, count, href]) => (
          <Link key={label} href={String(href)} className="rounded-2xl border border-line bg-panel p-5">
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="mt-2 font-serif text-3xl">{count}</dd>
          </Link>
        ))}
      </dl>
    </div>
  );
}
