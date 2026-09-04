-- Yes, this is a valid Supabase/Postgres seed SQL file.
-- Each insert statement uses a WHERE NOT EXISTS
-- clause to ensure the data is only seeded if it doesn't already exist.

insert into public.profiles (full_name, headline, bio, location)
select
  'Santosh Metri',
  'Software engineer building products people actually use',
  'Replace this bio in Admin. I care about clear interfaces, reliable systems, and shipping.',
  'Remote'
where not exists (select 1 from public.profiles);

insert into public.site_settings (site_title, tagline, seo_description, contact_email, availability)
select
  'Santosh Metri',
  'Engineer. Builder.',
  'Selected work, skills, and ways to get in touch.',
  'hello@example.com',
  'Open to interesting work'
where not exists (select 1 from public.site_settings);

insert into public.skills (name, category, level, sort_order)
select * from (
  values
    ('TypeScript', 'Languages', 5, 0),
    ('React / Next.js', 'Frontend', 5, 1),
    ('React Native', 'Mobile', 4, 2),
    ('Postgres', 'Data', 4, 3),
    ('Supabase', 'Backend', 4, 4)
) as s(name, category, level, sort_order)
where not exists (select 1 from public.skills);

insert into public.experiences (company, role, location, start_date, end_date, highlights, sort_order)
select * from (
  values
    (
      'Example Studio',
      'Senior Software Engineer',
      'Remote',
      '2022-01-01'::date,
      null,
      'Led web and mobile delivery for customer-facing products.' || chr(10) || 'Set up design systems, CI, and observability.',
      0
    ),
    (
      'Previous Company',
      'Software Engineer',
      'London',
      '2019-03-01'::date,
      '2021-12-01'::date,
      'Shipped features across the stack.' || chr(10) || 'Mentored junior engineers.',
      1
    )
) as e(company, role, location, start_date, end_date, highlights, sort_order)
where not exists (select 1 from public.experiences);

insert into public.projects (title, summary, description, stack, featured, sort_order)
select * from (
  values
    (
      'Portfolio OS',
      'A public portfolio with a private admin CMS.',
      'Next.js on the web, Expo on native, one Supabase backend.',
      'Next.js, Expo, Supabase, Tailwind',
      true,
      0
    )
) as p(title, summary, description, stack, featured, sort_order)
where not exists (select 1 from public.projects);

insert into public.education (institution, credential, start_date, end_date, sort_order)
select * from (
  values
    ('University', 'BSc Computer Science', '2015-09-01'::date, '2019-06-01'::date, 0)
) as ed(institution, credential, start_date, end_date, sort_order)
where not exists (select 1 from public.education);

insert into public.social_links (label, url, sort_order)
select * from (
  values
    ('GitHub', 'https://github.com', 0),
    ('LinkedIn', 'https://linkedin.com', 1)
) as l(label, url, sort_order)
where not exists (select 1 from public.social_links);
