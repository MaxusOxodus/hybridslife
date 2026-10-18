-- Korund Konto löschen (seit Version 148)
-- Einmal im Supabase-Dashboard unter "SQL Editor" einfügen und auf "Run" tippen. Vorher muss tabelle-backups.sql gelaufen sein.
-- Legt die Funktion konto_loeschen an: Ein angemeldeter Nutzer löscht damit sein eigenes Konto aus auth.users.
-- Sein Backup in der Tabelle backups fällt über "on delete cascade" mit weg. Andere Konten kann niemand damit löschen,
-- denn die Funktion löscht nur die Zeile mit auth.uid(), der id aus der Anmeldung. Ohne Anmeldung ist auth.uid() leer
-- und es wird nichts gelöscht.
-- "security definer" heißt: Die Funktion läuft mit den Rechten ihres Besitzers (postgres), denn ein Nutzer selbst darf
-- auth.users nicht ändern. Der leere search_path schützt davor, dass jemand eigene Tabellen mit gleichem Namen unterschiebt.

create or replace function public.konto_loeschen()
returns void
language sql
security definer
set search_path = ''
as $$
  delete from auth.users where id = auth.uid();
$$;

-- Postgres erlaubt neue Funktionen allen (PUBLIC). Deshalb erst allen wegnehmen, dann nur angemeldeten Nutzern geben.
revoke execute on function public.konto_loeschen() from public, anon;
grant execute on function public.konto_loeschen() to authenticated;
