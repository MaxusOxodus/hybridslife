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
pruefe("Anmeldung per Code, nicht per Link", /verifyOtp\(\{ email: cloudEmail, token: code, type: "email" \}\)/.test(app) && /detectSessionInUrl: false/.test(app));
pruefe("Sicherung nach jedem Training", /trainingseinheitSpeichern\(t\);\n[^\n]*\n\s+cloudAutomatisch\(\);/.test(app));

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
