# Portfolio

Next.js public site + admin CMS, Expo native app, one Supabase database.

```
apps/web        Next.js (site + /admin)
apps/native     Expo (iOS / Android)
packages/shared  Types and data loaders
supabase/        SQL schema and seed
```

## 1. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. SQL editor: run `supabase/schema.sql`, then `supabase/seed.sql`.
3. Authentication → add a user (email + password).
4. Grant admin (use that user’s email):

```sql
insert into public.admin_users (user_id)
select id from auth.users where email = 'you@example.com';
```

5. Copy the project URL and anon key from Project Settings → API.

## 2. Secrets (do not commit values)

The app reads these names at runtime. Put the **values** in GitHub Secrets, never in source.

| Secret | Used by |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Next.js site + admin |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Next.js site + admin |
| `EXPO_PUBLIC_SUPABASE_URL` | Expo app |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Expo app |

GitHub: **Settings → Secrets and variables → Actions → New repository secret**.

CI loads them as environment variables (see `.github/workflows/web.yml`). For Vercel or another host, set the same names in that host’s environment settings.

Locally, copy the examples and fill in the same values (these files stay gitignored):

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/native/.env.example apps/native/.env
```

Without keys, the site still runs with sample content. Admin login needs keys.

## 3. Run

```bash
npm install
npm run web      # http://localhost:3000
npm run native   # Expo (iOS / Android)
```

- Public site: `/`
- Admin: `/admin/login`

## What you can edit in admin

Profile, skills, experience, projects (with image upload), education, social links, and site settings. Unpublished rows stay off the public site and native app.

Images go to the public `portfolio` storage bucket defined in `schema.sql`.
