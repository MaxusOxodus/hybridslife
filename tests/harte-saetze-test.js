// Test: Harte Sätze je Muskelgruppe und Woche (seit Version 167, Forschung AP5). harteSaetzeWoche steht in der app.js,
// die Übungen kommen echt aus der uebungen.js. Hauptmuskel 1, jede andere Gruppe aus hilfs 0,5.
// Starten mit: node tests/harte-saetze-test.js

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const uebungen = fs.readFileSync(new URL("../uebungen.js", import.meta.url), "utf8");
const texte = fs.readFileSync(new URL("../texte.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
function funktionHolen(name) {
  const start = quelle.indexOf("\n  function " + name + "(");
  const ende = quelle.indexOf("\n  }\n", start);
  if (start === -1 || ende === -1) {
    throw new Error("Funktion " + name + " nicht in der app.js gefunden");
  }
  return quelle.slice(start, ende + 5);
}
function konstanteHolen(name) {
  const treffer = new RegExp("\\n  const " + name + " = [\\s\\S]*?;\\n").exec(quelle);
  return treffer[0];
}
let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

const f = new Function(uebungen
  + ";const UEBUNG_NACH_ID = {}; UEBUNGEN.forEach(function (u) { UEBUNG_NACH_ID[u.id] = u; });"
  + "const GRUPPE_NACH_ID = {}; MUSKELGRUPPEN.forEach(function (g) { GRUPPE_NACH_ID[g.id] = g; });"
  + "function hatDatum(e) { return typeof e.datum === 'string'; }"
  + "function arbeitsSaetzeVon(e) { return e.einzelsaetze.filter(function (s) { return !s.aufwaermen; }); }"
  + "function gruppeIdVon(id, gruppe) { return gruppe || ''; }"
  + ["HARTER_SATZ_RIR", "HARTER_SATZ_WDH", "HILFS_ANTEIL"].map(konstanteHolen).join("")
  + ["harteSaetzeVon", "muskelGruppeVon", "gruppenAnteile", "harteSaetzeWoche"].map(funktionHolen).join("")
  + "return { harteSaetzeWoche };")();

const MONTAG = new Date(2026, 9, 19);
function eintrag(tag, id, saetze, gruppe) {
  return { datum: new Date(2026, 9, 19 + tag, 18).toISOString(), uebungId: id, muskelgruppe: gruppe || "", einzelsaetze: saetze };
}
const satz = (wdh, rir, w) => (rir === undefined ? { gewicht: 60, wdh: wdh, aufwaermen: w } : { gewicht: 60, wdh: wdh, rir: rir, aufwaermen: w });

let r = f.harteSaetzeWoche([eintrag(1, "pause-smith-machine-bench-press", [satz(8), satz(8), satz(8)])], MONTAG);
pruefe("Bankdrücken Multipresse mit Pause 3 Sätze: Brust 3, Trizeps 1,5, Schulter vorn 1,5", r.brust === 3 && r.trizeps === 1.5 && r["schulter-vorn"] === 1.5, JSON.stringify(r));
r = f.harteSaetzeWoche([eintrag(1, "pause-smith-machine-bench-press", [satz(8, undefined, true), satz(8, 5), satz(8, 2), satz(40, 1)])], MONTAG);
pruefe("Aufwärmen, RIR 5 und 40 Wdh. zählen nicht: 1 harter Satz", r.brust === 1, JSON.stringify(r));
r = f.harteSaetzeWoche([eintrag(-1, "pause-smith-machine-bench-press", [satz(8)]), eintrag(7, "pause-smith-machine-bench-press", [satz(8)])], MONTAG);
pruefe("Sonntag davor und Montag danach zählen nicht", Object.keys(r).length === 0, JSON.stringify(r));
r = f.harteSaetzeWoche([eintrag(0, "cable-lat-pulldown", [satz(10), satz(10)]), eintrag(3, "chin-up", [satz(6), satz(6)])], MONTAG);
pruefe("Latzug + Klimmzug: Lat 4, Bizeps 2, oberer Rücken 2", r.lat === 4 && r.bizeps === 2 && r["ruecken-oben"] === 2, JSON.stringify(r));
r = f.harteSaetzeWoche([eintrag(2, "", [satz(10), satz(10)], "brust")], MONTAG);
pruefe("Unbekannte Übung mit Gruppe: nur die Gruppe zählt", r.brust === 2 && Object.keys(r).length === 1, JSON.stringify(r));
const schluessel = ["saetze.titel", "saetze.ziel", "saetze.leer", "saetze.viel", "saetze.hilfeTitel", "saetze.hilfeText"];
const fehlt = schluessel.filter(k => !new RegExp('"' + k.replace(/\./g, "\\.") + '": \\{ de: "[^"]+", en: "[^"]+" \\}').test(texte));
pruefe("Texte auf Deutsch und Englisch", fehlt.length === 0, fehlt.join(", "));

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
if (fehler > 0) {
  process.exit(1);
}
