-- Korund Cloud-Backup (seit Version 146)
-- Einmal im Supabase-Dashboard unter "SQL Editor" einfügen und auf "Run" tippen.
-- Legt die Tabelle backups an: je Nutzer genau ein Datensatz mit seinem Backup (dasselbe wie "Backup exportieren").
-- Jeder Nutzer kann nur seinen eigenen Datensatz lesen, anlegen, ändern und löschen (Row Level Security).

create table if not exists public.backups (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  daten jsonb not null,
  eintraege integer not null default 0,
  aktualisiert timestamptz not null default now(),
  -- Schutz vor Missbrauch: ein Backup darf höchstens 20 MB groß sein
  constraint backups_groesse check (pg_column_size(daten) < 20000000)
);

alter table public.backups enable row level security;

drop policy if exists "Eigenes Backup lesen" on public.backups;
drop policy if exists "Eigenes Backup anlegen" on public.backups;
drop policy if exists "Eigenes Backup ändern" on public.backups;
drop policy if exists "Eigenes Backup löschen" on public.backups;

create policy "Eigenes Backup lesen" on public.backups
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Eigenes Backup anlegen" on public.backups
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Eigenes Backup ändern" on public.backups
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Eigenes Backup löschen" on public.backups
  for delete to authenticated using ((select auth.uid()) = user_id);

-- "Automatically expose new tables" ist aus: Zugriff nur für angemeldete Nutzer, nie für anonyme
revoke all on public.backups from anon;
grant select, insert, update, delete on public.backups to authenticated;
