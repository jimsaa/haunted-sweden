-- Haunted Sweden Book Archive — Supabase schema
-- Run in Supabase SQL Editor or via migration tooling.

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now(),
  book_title text,
  archive_id text,
  source text not null default 'Book Archive',
  verified boolean not null default false,
  status text not null default 'active' check (status in ('active', 'unsubscribed')),
  consent boolean not null default true,
  constraint newsletter_subscribers_email_unique unique (email)
);

create index if not exists newsletter_subscribers_archive_id_idx
  on public.newsletter_subscribers (archive_id);

create index if not exists newsletter_subscribers_created_at_idx
  on public.newsletter_subscribers (created_at desc);

create table if not exists public.archive_community_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  archive_id text not null,
  investigation_id text not null,
  visited text check (visited in ('yes', 'not_yet')),
  story text,
  email text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'archived'))
);

create index if not exists archive_community_responses_archive_idx
  on public.archive_community_responses (archive_id, investigation_id);

create index if not exists archive_community_responses_status_idx
  on public.archive_community_responses (status);

-- RLS: service role used from API routes only (no public anon insert without API validation)
alter table public.newsletter_subscribers enable row level security;
alter table public.archive_community_responses enable row level security;

-- Community landing page members
create table if not exists public.community_members (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now(),
  source text not null default 'Community Landing Page',
  status text not null default 'active' check (status in ('active', 'unsubscribed')),
  verified boolean not null default false,
  consent boolean not null default true,
  interests text[] default '{}',
  membership_tier text not null default 'free'
    check (membership_tier in ('free', 'premium', 'founder')),
  constraint community_members_email_unique unique (email)
);

create index if not exists community_members_created_at_idx
  on public.community_members (created_at desc);

create index if not exists community_members_status_idx
  on public.community_members (status);

alter table public.community_members enable row level security;

-- No public policies — access via service role key on server only.
