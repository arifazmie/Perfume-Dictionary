-- Create enum types
create type gender_type as enum ('Masculine', 'Feminine', 'Unisex');
create type status_type as enum ('NEW', 'LIMITED', 'BESTSELLER', 'DISCONTINUED');

-- Create categories table
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create brands table
create table brands (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create notes table
create table notes (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create perfumes table
create table perfumes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand_id uuid references brands(id),
  release_year integer,
  gender gender_type,
  image_url text,
  rating decimal(3,2) check (rating >= 0 and rating <= 5),
  status status_type[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create perfume_categories junction table
create table perfume_categories (
  perfume_id uuid references perfumes(id),
  category_id uuid references categories(id),
  primary key (perfume_id, category_id)
);

-- Create perfume_notes junction table
create table perfume_notes (
  perfume_id uuid references perfumes(id),
  note_id uuid references notes(id),
  note_type text check (note_type in ('top', 'heart', 'base')),
  primary key (perfume_id, note_id, note_type)
);

-- Create indexes
create index idx_perfumes_brand on perfumes(brand_id);
create index idx_perfume_categories_perfume on perfume_categories(perfume_id);
create index idx_perfume_categories_category on perfume_categories(category_id);
create index idx_perfume_notes_perfume on perfume_notes(perfume_id);
create index idx_perfume_notes_note on perfume_notes(note_id);

-- Create RLS policies
alter table categories enable row level security;
alter table brands enable row level security;
alter table notes enable row level security;
alter table perfumes enable row level security;
alter table perfume_categories enable row level security;
alter table perfume_notes enable row level security;

-- Create public read policies
create policy "Allow public read access" on categories for select using (true);
create policy "Allow public read access" on brands for select using (true);
create policy "Allow public read access" on notes for select using (true);
create policy "Allow public read access" on perfumes for select using (true);
create policy "Allow public read access" on perfume_categories for select using (true);
create policy "Allow public read access" on perfume_notes for select using (true);
