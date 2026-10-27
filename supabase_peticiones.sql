-- Ejecutar una vez en Supabase > SQL Editor (despues de supabase.sql).
-- Buzon "Pide algo a Claude": cada persona crea y lee solo sus peticiones.
-- No puede modificar ni borrar, asi que la respuesta solo la escribe quien administra el proyecto.
create table if not exists public.peticiones (
  id        bigint generated always as identity primary key,
  user_id   uuid not null default auth.uid() references auth.users(id) on delete cascade,
  texto     text not null check (char_length(texto) between 3 and 1000),
  creada    timestamptz not null default now(),
  estado    text not null default 'pendiente' check (estado in ('pendiente','hecha')),
  respuesta text
);
alter table public.peticiones enable row level security;
create policy "ver las propias"   on public.peticiones for select using (auth.uid() = user_id);
create policy "crear las propias" on public.peticiones for insert
  with check (auth.uid() = user_id and estado = 'pendiente' and respuesta is null);
