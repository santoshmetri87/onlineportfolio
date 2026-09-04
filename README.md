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

## 2. Environment

```bash
cp .env.example apps/web/.env.local
cp .env.example apps/native/.env
```

Fill in the same URL and anon key for `NEXT_PUBLIC_*` and `EXPO_PUBLIC_*`.

Without keys, the site still runs with sample content. Admin login needs keys.

If Next.js says the parent `package.json` is outside the Git repo, remove `apps/web/.git` so this folder is the only repo root (create-next-app created a nested git directory).

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
