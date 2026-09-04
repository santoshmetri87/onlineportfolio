import { signIn } from "@/app/admin/actions";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const configured = isSupabaseConfigured();

  return (
    <div className="mx-auto max-w-md py-24">
      <h1 className="font-serif text-4xl">Admin login</h1>
      <p className="mt-3 text-muted">
        Sign in with the Auth user you added to <code>admin_users</code>.
      </p>
      {!configured ? (
        <p className="mt-6 rounded-2xl border border-line bg-panel p-4 text-sm text-muted">
          Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to <code>apps/web/.env.local</code>.
        </p>
      ) : null}
      {error ? <p className="mt-4 text-sm text-accent">{error}</p> : null}
      <form action={signIn} className="mt-8 space-y-4">
        <label className="block space-y-2">
          <span className="text-sm text-muted">Email</span>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-line bg-background px-3 py-2"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-muted">Password</span>
          <input
            name="password"
            type="password"
            required
            className="w-full rounded-xl border border-line bg-background px-3 py-2"
          />
        </label>
        <button
          className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-[#1a1408]"
          type="submit"
          disabled={!configured}
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
