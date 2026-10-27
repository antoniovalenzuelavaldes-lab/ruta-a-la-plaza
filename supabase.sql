-- Ejecutar una vez en Supabase > SQL Editor.
-- Cada persona solo puede leer y escribir su propia fila.
create table if not exists public.progreso (
  user_id uuid primary key references auth.users(id) on delete cascade,
  estado  jsonb  not null default '{}'::jsonb,
  upd     bigint not null default 0
);
alter table public.progreso enable row level security;
create policy "leer lo propio"    on public.progreso for select using (auth.uid() = user_id);
create policy "crear lo propio"   on public.progreso for insert with check (auth.uid() = user_id);
create policy "cambiar lo propio" on public.progreso for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
