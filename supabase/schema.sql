create extension if not exists pgcrypto;

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  occasion text not null,
  event_date date not null,
  guest_count text not null,
  pickup_location text not null,
  dropoff_location text not null,
  preferred_car text,
  package_name text,
  extras text[] not null default '{}',
  full_name text not null,
  email text not null,
  phone text not null,
  notes text,
  constraint enquiries_name_length check (char_length(full_name) between 1 and 120),
  constraint enquiries_email_length check (char_length(email) between 3 and 320),
  constraint enquiries_notes_length check (notes is null or char_length(notes) <= 3000)
);

alter table public.enquiries enable row level security;

-- The public site can submit requests but cannot read customer enquiries.
drop policy if exists "Allow public enquiry submissions" on public.enquiries;
create policy "Allow public enquiry submissions"
  on public.enquiries
  for insert
  to anon, authenticated
  with check (
    char_length(full_name) between 1 and 120
    and char_length(email) between 3 and 320
    and char_length(notes) <= 3000
  );

revoke all on public.enquiries from anon, authenticated;
grant insert on public.enquiries to anon, authenticated;