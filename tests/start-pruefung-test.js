// Test: Prüfung beim Start (seit Version 164): Mindestalter 16 und drei Gesundheitsfragen. startPruefungNoetig und
// screeningBeantwortet stehen in der app.js, die Antworten nur unter dem Schlüssel "screening", nie im Backup.
// Starten mit: node tests/start-pruefung-test.js

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const texte = fs.readFileSync(new URL("../texte.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const einfuehrung = fs.readFileSync(new URL("../einfuehrung.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
function funktionHolen(name) {
  const start = quelle.indexOf("\n  function " + name + "(");
  const ende = quelle.indexOf("\n  }\n", start);
  if (start === -1 || ende === -1) {
    throw new Error("Funktion " + name + " nicht in der app.js gefunden");
  }
  return quelle.slice(start, ende + 5);
}
function konstanteHolen(name) {
  const start = quelle.indexOf("\n  const " + name + " = ");
  return quelle.slice(start, quelle.indexOf(";\n", start) + 2);
}
let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

const speicher = {};
globalThis.location = { hash: "" };
globalThis.localStorage = { getItem: k => (k in speicher ? speicher[k] : null) };
const f = new Function("let profil = { geburtstag: '' };"
  + konstanteHolen("GEBURTSTAG_MIN") + konstanteHolen("MINDESTALTER")
  + "function datumFeldText(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }"
  + ["geburtstagGueltig", "alterAus", "screeningBeantwortet", "startPruefungNoetig"].map(funktionHolen).join("")
  + "return { startPruefungNoetig, screeningBeantwortet, MINDESTALTER, setze: function (g) { profil.geburtstag = g; } };")();

function vorJahren(n, tage) {
  const d = new Date();
  d.setFullYear(d.getFullYear() - n);
  d.setDate(d.getDate() + (tage || 0));
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

pruefe("Mindestalter ist 16", f.MINDESTALTER === 16);
f.setze("");
pruefe("Ohne Geburtstag: Prüfung nötig", f.startPruefungNoetig() === true);
location.hash = "#access_token=x&type=recovery";
pruefe("Link „Passwort vergessen“: keine Prüfung (seit Version 173)", f.startPruefungNoetig() === false);
location.hash = "";
speicher.screening = JSON.stringify({ am: 1, ja: [] });
f.setze(vorJahren(16, 1));
pruefe("Einen Tag vor dem 16. Geburtstag: nötig", f.startPruefungNoetig() === true);
f.setze(vorJahren(16));
pruefe("Am 16. Geburtstag mit Antworten: nicht nötig", f.startPruefungNoetig() === false);
delete speicher.screening;
pruefe("Ab 16 ohne Antworten: nötig", f.startPruefungNoetig() === true);
speicher.screening = "kaputt";
pruefe("Kaputte Antworten zählen nicht", f.screeningBeantwortet() === false);
speicher.screening = JSON.stringify({ am: Date.now(), ja: [2] });
pruefe("Antworten mit Ja zählen als beantwortet", f.screeningBeantwortet() === true);

pruefe("screening steht in EINFUEHRUNG_APP_SCHLUESSEL", /EINFUEHRUNG_APP_SCHLUESSEL = \[[^\]]*"screening"/.test(einfuehrung));
const backup = funktionHolen("backupText");
pruefe("screening nicht im Backup", backup.indexOf("screening") === -1);
const schluessel = ["start.alterTitel", "start.alterText", "start.alterUngueltig", "start.weiter", "start.sperreTitel", "start.sperreText",
  "start.alterAendern", "start.fragenTitel", "start.fragenText", "start.frage.1", "start.frage.2", "start.frage.3",
  "start.hinweisTitel", "start.hinweisText", "start.verstanden"];
const fehlt = schluessel.filter(k => !new RegExp('"' + k.replace(/\./g, "\\.") + '": \\{ de: "[^"]+", en: "[^"]+" \\}').test(texte));
pruefe("Alle Texte auf Deutsch und Englisch", fehlt.length === 0, fehlt.join(", "));

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
if (fehler > 0) {
  process.exit(1);
}
