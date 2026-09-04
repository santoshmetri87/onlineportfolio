import Link from "next/link";
import { signOut } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/links", label: "Links" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground md:grid md:grid-cols-[220px_1fr]">
      <aside className="border-b border-line p-5 md:border-b-0 md:border-r">
        <p className="font-serif text-2xl">Admin</p>
        <nav className="mt-6 flex flex-col gap-2 text-sm text-muted">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-accent">
              {link.label}
            </Link>
          ))}
          <Link href="/" className="hover:text-accent">
            View site
          </Link>
          <form action={signOut}>
            <button className="text-left hover:text-accent" type="submit">
              Sign out
            </button>
          </form>
        </nav>
      </aside>
      <div className="p-6 md:p-10">{children}</div>
    </div>
  );
}
