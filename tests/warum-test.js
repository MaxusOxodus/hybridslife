// Test: „Warum?“-Erklärungen (seit Version 168, Forschung AP10). Jede Art, die steigerungVorschlag zurückgeben kann,
// hat einen Text warum.art.<art> auf Deutsch und Englisch, dazu die Texte für Entlastung, Stillstand und Erholung.
// Starten mit: node tests/warum-test.js

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const texte = fs.readFileSync(new URL("../texte.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const TEXTE = new Function(texte + "; return TEXTE;")();
let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

const start = quelle.indexOf("\n  function steigerungVorschlag(");
const ende = quelle.indexOf("\n  }\n", start);
const koerper = quelle.slice(start, ende);
const arten = new Set(["halten"]);
(koerper.match(/art = "([a-zA-Z]+)"/g) || []).forEach(t => arten.add(t.slice(7, -1)));
pruefe("Mindestens 8 Arten gefunden", arten.size >= 8, [...arten].join(", "));
arten.forEach(a => {
  const t = TEXTE["warum.art." + a];
  pruefe("Text für " + a, t && t.de && t.en, a);
});
["warum.titel", "warum.knopf", "warum.vorschlag", "warum.entlastung", "warum.stillstand", "warum.erholung"].forEach(k => {
  pruefe("Text " + k, TEXTE[k] && TEXTE[k].de && TEXTE[k].en, k);
});
const ehrlich = Object.keys(TEXTE).filter(k => k.indexOf("warum.art.") === 0 || ["warum.entlastung", "warum.stillstand", "warum.erholung"].indexOf(k) !== -1)
  .filter(k => !/Quelle|Erfahrungswert|kann Korund|schlägt Korund/.test(TEXTE[k].de));
pruefe("Jede Erklärung nennt eine Quelle oder sagt, dass es ein Erfahrungswert ist", ehrlich.length === 0, ehrlich.join(", "));

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
if (fehler > 0) {
  process.exit(1);
}
