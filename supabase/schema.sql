-- This schema is correct for a simple "admin user" setup in Supabase/Postgres.
-- The admin_users table acts as an allow-list for admin users, keyed by user_id from auth.users.
-- The is_admin() function is used in RLS policies to check admin status for authenticated calls.

-- Usage:
-- After creating your Auth user, grant admin role with:
--   insert into public.admin_users (user_id)
--   select id from auth.users where email = 'you@example.com';

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- To check if a user is admin, you can use the below function.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

-- (Below is just for completeness from your original snippet, but only the above parts are needed for "admin user" functionality.)

alter table public.admin_users enable row level security;

drop policy if exists "read own admin row" on public.admin_users;
create policy "read own admin row"
  on public.admin_users for select
  to authenticated
  using (user_id = auth.uid());
