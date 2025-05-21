-- supabase/migrations/YYYYMMDDHHMMSS_create_profiles_and_trigger.sql
-- This migration creates the public.profiles table, a trigger to populate it
-- when a new user signs up, and Row Level Security (RLS) policies for the table.

-- 1. Create public.profiles table
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  full_name text,
  email text unique, -- Store email here for easier access if needed, synced from auth.users
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  primary key (id)
);

comment on table public.profiles is 'Stores public profile information for each user.';
comment on column public.profiles.id is 'References the user in auth.users.';
comment on column public.profiles.full_name is 'The user\'s full name.';
comment on column public.profiles.email is 'The user\'s email, synced from auth.users.';

-- 2. Enable Row Level Security
alter table public.profiles enable row level security;

-- 3. Create a function to handle new user creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email
  );
  return new;
end;
$$;

comment on function public.handle_new_user() is 'Trigger function to insert a new profile when a user is created in auth.users.';

-- 4. Create a trigger to call the function on new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

comment on trigger on_auth_user_created on auth.users is 'When a new user signs up, automatically create a profile for them in public.profiles.';

-- 5. RLS policies for public.profiles

-- Allow authenticated users to select their own profile
create policy "Users can select their own profile."
on public.profiles for select
to authenticated
using ( (select auth.uid()) = id );

-- Allow authenticated users to insert their own profile
-- Note: The trigger handles the initial insert. This policy might be useful for specific scenarios
-- or if direct insertion is ever needed by the user for their own profile.
create policy "Users can insert their own profile."
on public.profiles for insert
to authenticated
with check ( (select auth.uid()) = id );

-- Allow authenticated users to update their own profile
create policy "Users can update their own profile."
on public.profiles for update
to authenticated
using ( (select auth.uid()) = id )
with check ( (select auth.uid()) = id );

-- Allow authenticated users to delete their own profile
create policy "Users can delete their own profile."
on public.profiles for delete
to authenticated
using ( (select auth.uid()) = id );

-- Function to automatically update 'updated_at' timestamp
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

comment on function public.update_updated_at_column() is 'Automatically updates the updated_at timestamp on row modification.';

create trigger handle_profile_updated_at
  before update on public.profiles
  for each row
  execute procedure public.update_updated_at_column();

comment on trigger handle_profile_updated_at on public.profiles is 'Automatically update the updated_at timestamp when a profile is modified.'; 