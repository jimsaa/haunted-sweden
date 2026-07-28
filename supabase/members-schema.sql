-- Haunted Sweden Members — target schema (v2+)
-- Scale target: ~100k members, 20 books, thousands of badges
-- Apply in Supabase when migrating off JSON Blob storage.

create extension if not exists "pgcrypto";

create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  email text not null unique,
  password_hash text,
  display_name text not null,
  biography text not null default '',
  country text not null default '',
  avatar_url text,
  tier text not null default 'free'
    check (tier in ('guest','free','premium','founder','administrator')),
  role text not null default 'member'
    check (role in ('member','moderator','editor','administrator')),
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists badges (
  id text primary key,
  name text not null,
  name_sv text,
  description text not null default '',
  rarity text not null default 'common',
  icon text,
  created_at timestamptz not null default now()
);

create table if not exists member_badges (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,
  badge_id text not null references badges(id),
  unlocked_at timestamptz not null default now(),
  source text not null default 'system',
  unique (member_id, badge_id)
);

create table if not exists book_editions (
  id text primary key,
  book_number int not null,
  edition text not null,
  title text not null,
  status text not null default 'planned',
  archive_id text,
  created_at timestamptz not null default now()
);

create table if not exists member_books (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,
  book_edition_id text not null references book_editions(id),
  progress text not null default 'owned',
  updated_at timestamptz not null default now(),
  unique (member_id, book_edition_id)
);

create table if not exists qr_markers (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  kind text not null,
  badge_id text references badges(id),
  place_slug text,
  archive_id text,
  title text not null,
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists qr_discoveries (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,
  marker_id uuid not null references qr_markers(id) on delete cascade,
  discovered_at timestamptz not null default now(),
  unique (member_id, marker_id)
);

create table if not exists stripe_customers (
  member_id uuid primary key references members(id) on delete cascade,
  stripe_customer_id text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists memberships (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,
  stripe_subscription_id text,
  stripe_price_id text,
  interval text check (interval in ('month','year','lifetime')),
  status text not null default 'inactive',
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists member_activity (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,
  kind text not null,
  payload jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists idx_member_badges_member on member_badges(member_id);
create index if not exists idx_qr_discoveries_member on qr_discoveries(member_id);
create index if not exists idx_memberships_member on memberships(member_id);
create index if not exists idx_member_activity_member_created
  on member_activity(member_id, created_at desc);
