// Test: Das 1RM im Verlauf (Art "1rm") zählt seit Version 162 nur Sätze mit 1 bis 10 Wdh., wie die Ränge (Art "rang").
// verlaufPunkte steht in der app.js, epley1RM und rangSatzGueltig in der raenge.js. Einträge sind hier nachgebaut.
// Starten mit: node tests/e1rm-grenze-test.js

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const raenge = fs.readFileSync(new URL("../raenge.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const texte = fs.readFileSync(new URL("../texte.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
function funktionHolen(text, name, einzug) {
  const start = text.indexOf("\n" + einzug + "function " + name + "(");
  const ende = text.indexOf("\n" + einzug + "}\n", start);
  if (start === -1 || ende === -1) {
    throw new Error("Funktion " + name + " nicht gefunden");
  }
  return text.slice(start, ende + einzug.length + 3);
}
function konstanteHolen(text, name) {
  const start = text.indexOf("const " + name + " = ");
  return text.slice(start, text.indexOf(";\n", start) + 2);
}
let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

const f = new Function("let eintraege = [];"
  + konstanteHolen(raenge, "RANG_WDH_MIN") + konstanteHolen(raenge, "RANG_WDH_MAX")
  + funktionHolen(raenge, "epley1RM", "") + funktionHolen(raenge, "rangSatzGueltig", "")
  + "function hatDatum(e) { return typeof e.datum === 'string'; }"
  + "function gleicheUebung(e, name) { return e.uebung === name; }"
  + "function arbeitsSaetzeVon(e) { return e.einzelsaetze.filter(function (s) { return !s.aufwaermen; }); }"
  + "function koerperZusatz() { return 0; }"
  + "function tagSchluessel(d) { return d.toISOString().slice(0, 10); }"
  + funktionHolen(quelle, "verlaufPunkte", "  ")
  + "return { verlaufPunkte, setze: function (e) { eintraege = e; } };")();

function eintrag(datum, saetze) {
  return { id: datum, uebung: "Bankdrücken", datum: datum + "T18:00:00.000Z", einzelsaetze: saetze.map(s => ({ gewicht: s[0], wdh: s[1] })) };
}
f.setze([
  eintrag("2026-10-01", [[100, 5], [60, 20]]),
  eintrag("2026-10-05", [[60, 15], [60, 12]]),
  eintrag("2026-10-08", [[80, 10]])
]);
const einsrm = f.verlaufPunkte("Bankdrücken", "", "1rm");
const rang = f.verlaufPunkte("Bankdrücken", "", "rang");
pruefe("1RM: Tag nur mit 12+ Wdh. fehlt", einsrm.length === 2, einsrm.length);
pruefe("1RM: 60 × 20 zählt nicht, 100 × 5 schon", Math.abs(einsrm[0].wert - 100 * (1 + 5 / 30)) < 1e-9, einsrm[0] && einsrm[0].wert);
pruefe("1RM: genau 10 Wdh. zählen", Math.abs(einsrm[1].wert - 80 * (1 + 10 / 30)) < 1e-9);
pruefe("1RM und Rang sind gleich", JSON.stringify(einsrm) === JSON.stringify(rang));
const schwer = f.verlaufPunkte("Bankdrücken", "", "schwer");
pruefe("Gewicht zeigt weiter alle Tage", schwer.length === 3);
const volumen = f.verlaufPunkte("Bankdrücken", "", "volumen");
pruefe("Volumen zeigt weiter alle Tage", volumen.length === 3);
pruefe("Hinweis-Text verlauf.1rmLeer auf Deutsch und Englisch", /"verlauf\.1rmLeer": \{ de: "[^"]+", en: "[^"]+" \}/.test(texte));

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
if (fehler > 0) {
  process.exit(1);
}
