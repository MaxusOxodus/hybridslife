// Prüft das Cloud-Backup (seit Version 146) ohne Netz: nur der öffentliche Schlüssel steht in der App, nie ein geheimer,
// die Tabelle schützt jeden Datensatz mit Row Level Security, das Backup bleibt Version 12 und die Bibliothek ist offline da.
// Starten mit: node tests/cloud-test.js
const fs = require("fs");
const path = require("path");
const wurzel = path.join(__dirname, "..");
const lesen = (datei) => fs.readFileSync(path.join(wurzel, datei), "utf8");

let pruefungen = 0;
let fehler = 0;
function pruefe(name, ok) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name);
  }
}

const app = lesen("app.js");
const sql = lesen("supabase/tabelle-backups.sql");
const index = lesen("index.html");
const sw = lesen("sw.js");
const einfuehrung = lesen("einfuehrung.js");

// Kein geheimer Schlüssel in irgendeiner Datei des Projekts (ohne node_modules und .git)
function alleDateien(ordner) {
  return fs.readdirSync(ordner, { withFileTypes: true }).flatMap(function (e) {
    if (e.name === ".git" || e.name === "node_modules" || e.name === "entwuerfe") {
      return [];
    }
    const voll = path.join(ordner, e.name);
    return e.isDirectory() ? alleDateien(voll) : [voll];
  });
}
const geheim = alleDateien(wurzel).filter(function (datei) {
  return /\.(js|html|json|sql|md|css)$/.test(datei) && /sb_secret_[A-Za-z0-9_-]{10,}/.test(fs.readFileSync(datei, "utf8"));
});
pruefe("Kein geheimer Schlüssel im Projekt (" + geheim.join(", ") + ")", geheim.length === 0);
pruefe("Öffentlicher Schlüssel in der app.js", /const SUPABASE_KEY = "sb_publishable_[A-Za-z0-9_-]+";/.test(app));
pruefe("Adresse in der app.js", /const SUPABASE_URL = "https:\/\/[a-z0-9]+\.supabase\.co";/.test(app));

pruefe("SQL: Row Level Security an", /alter table public\.backups enable row level security;/.test(sql));
["select", "insert", "update", "delete"].forEach(function (art) {
  pruefe("SQL: Regel für " + art + " nur eigener Datensatz", new RegExp("for " + art + " to authenticated[^;]*auth\\.uid\\(\\)\\) = user_id").test(sql));
});
pruefe("SQL: kein Zugriff für anon", /revoke all on public\.backups from anon;/.test(sql));

pruefe("Backup-Version bleibt 12", /version: 12,/.test(app));
pruefe("Bibliothek in der index.html vor der app.js", index.indexOf('<script src="supabase-2.117.2.js"></script>') !== -1 && index.indexOf("supabase-2.117.2.js") < index.indexOf("app.js?v="));
pruefe("Bibliothek in DATEIEN", sw.indexOf('"supabase-2.117.2.js",') !== -1 && fs.existsSync(path.join(wurzel, "supabase-2.117.2.js")));
pruefe("Schlüssel der Anmeldung in EINFUEHRUNG_APP_SCHLUESSEL", /"korundCloud", "cloudZuletzt"/.test(einfuehrung));
pruefe("Anmeldung mit E-Mail und Passwort, kein Link", /signInWithPassword\(\{ email: email, password: passwort \}\)/.test(app) && /signUp\(\{ email: email, password: passwort, options: \{ emailRedirectTo: cloudAdresse\(\) \} \}\)/.test(app) && !/signInWithOtp|verifyOtp/.test(app));
// Seit Version 148: Aus der Adresse liest supabase-js nur den Link „Passwort vergessen“, und der Ablauf bleibt „implicit“
// (bei „pkce“ könnte Safari den Link aus der Mail nicht einlösen)
pruefe("Adresse: nur der Link Passwort vergessen", /detectSessionInUrl: function \(adresse, werte\) \{\s*return werte\.type === "recovery";\s*\}/.test(app));
pruefe("Ablauf bleibt implicit", !/flowType/.test(app));
pruefe("Passwort vergessen mit redirectTo auf die App", /resetPasswordForEmail\(email, \{ redirectTo: cloudAdresse\(\) \}\)/.test(app) && /return location\.origin \+ location\.pathname;/.test(app));
pruefe("Neues Passwort erst nach PASSWORD_RECOVERY", /ereignis === "PASSWORD_RECOVERY"/.test(app) && /cloudNeuesPasswort !== true/.test(app) && /updateUser\(\{ password: feld\.value \}\)/.test(app));
pruefe("Neues Passwort mindestens CLOUD_PASSWORT_MIN Zeichen", /feld\.value\.length < CLOUD_PASSWORT_MIN/.test(app));
pruefe("Feld für das neue Passwort ist ein Passwortfeld", /id="cloud-feld-neu" class="form-feld" type="password" autocomplete="new-password"/.test(index));
pruefe("Text auf der Seite für das neue Passwort", /data-t="cloud\.neuErklaerung">Neues Passwort hier setzen, dann in der App wie gewohnt anmelden\.</.test(index));
pruefe("Konto löschen über die SQL-Funktion", /verbindung\.rpc\("konto_loeschen"\)/.test(app) && /function cloudLoeschenFragen\(\)/.test(app));

// Konto löschen (seit Version 148): Funktion mit den Rechten des Besitzers, die nur den eigenen Nutzer löscht.
// Postgres gibt neue Funktionen allen (PUBLIC), deshalb erst allen und anon wegnehmen, dann nur authenticated geben.
const loeschen = lesen("supabase/konto-loeschen.sql");
const loeschenCode = loeschen.split("\n").filter(function (zeile) { return !/^\s*--/.test(zeile); }).join("\n");
pruefe("Löschen: security definer", /create or replace function public\.konto_loeschen\(\)[\s\S]*security definer/.test(loeschenCode));
pruefe("Löschen: leerer search_path", /set search_path = ''/.test(loeschenCode));
pruefe("Löschen: nur der eigene Nutzer", /delete from auth\.users where id = auth\.uid\(\);/.test(loeschenCode) && (loeschenCode.match(/delete from/g) || []).length === 1);
const entzug = loeschenCode.indexOf("revoke execute on function public.konto_loeschen() from public, anon;");
const freigabe = loeschenCode.indexOf("grant execute on function public.konto_loeschen() to authenticated;");
pruefe("Löschen: revoke von public und anon", entzug !== -1);
pruefe("Löschen: grant nur an authenticated, nach dem revoke", freigabe > entzug && entzug !== -1);
pruefe("Löschen: keine weitere Freigabe", (loeschenCode.match(/\bgrant\b/g) || []).length === 1);
pruefe("Löschen: Anleitung oben in der Datei", /^-- Korund Konto löschen/.test(loeschen) && /SQL Editor/.test(loeschen.split("\n").slice(0, 3).join("\n")));
pruefe("Backup fällt mit dem Konto weg (on delete cascade)", /references auth\.users \(id\) on delete cascade/.test(sql));
pruefe("SQL-Dateien gehören nicht in DATEIEN", sw.indexOf(".sql") === -1);

// Fehlertexte: zu viele Versuche (auch beim Mail-Versand von „Passwort vergessen“) und nicht bestätigte E-Mail
const texte = new Function(lesen("texte.js") + "; return TEXTE;")();
const start = app.indexOf("\n  function cloudFehlerText(");
const cloudFehlerText = new Function("navigator", "txt", app.slice(start, app.indexOf("\n  }\n", start) + 5) + "return cloudFehlerText;")(
  { onLine: true }, function (schluessel) { return schluessel; });
pruefe("429 heißt zu viele Versuche", cloudFehlerText({ status: 429, message: "email rate limit exceeded" }) === "cloud.zuOft");
pruefe("over_email_send_rate_limit heißt zu viele Versuche", cloudFehlerText({ code: "over_email_send_rate_limit", status: 429, message: "x" }) === "cloud.zuOft");
pruefe("Nicht bestätigt", cloudFehlerText({ message: "Email not confirmed", status: 400 }) === "cloud.nichtBestaetigt");
pruefe("Text nicht bestätigt richtet sich an Nutzer", texte["cloud.nichtBestaetigt"].de === "Bitte bestätige zuerst deine E-Mail. Schau auch im Spam-Ordner nach." && !/Supabase/.test(texte["cloud.nichtBestaetigt"].en));
pruefe("Text nach Neues Konto erstellen", texte["cloud.mailGeschickt"].de === "Wir haben dir eine Mail geschickt. Bestätige sie und melde dich dann hier an.");
pruefe("Passwortfeld ist ein Passwortfeld", /id="cloud-feld-passwort" class="form-feld" type="password"/.test(index));
pruefe("Sicherung nach jedem Training", /trainingseinheitSpeichern\(t\);\n[^\n]*\n\s+cloudAutomatisch\(\);/.test(app));

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
