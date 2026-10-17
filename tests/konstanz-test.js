// Test: Seit Version 141 zeigt der Fortschritt im Look Korund das Raster "Konstanz": die Trainingstage
// der letzten 12 Wochen, eine Spalte je Woche. Gerechnet wird nur aus den Einträgen, gespeichert wird nichts.
// Starten mit: node tests/konstanz-test.js
// Die Datei gehört nicht zur App. Die Funktionen holt sie aus der app.js.

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const texte = fs.readFileSync(new URL("../texte.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
const stil = fs.readFileSync(new URL("../style.css", import.meta.url), "utf8");
const korund = fs.readFileSync(new URL("../korund.css", import.meta.url), "utf8");
function funktionHolen(name) {
  const start = quelle.indexOf("\n  function " + name + "(");
  const ende = quelle.indexOf("\n  }\n", start);
  if (start === -1 || ende === -1) {
    throw new Error("Funktion " + name + " nicht in der app.js gefunden");
  }
  return quelle.slice(start, ende + 5);
}
const TEXTE = new Function(texte + "; return TEXTE;")();
let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

const app = new Function(
  funktionHolen("montagDerWoche") + funktionHolen("tagSchluessel") + funktionHolen("konstanzDaten") +
  "; return { konstanzDaten };")();

// Heute: Mittwoch, 14. Oktober 2026
const heute = new Date(2026, 9, 14, 12);
const e = (t, m, h, routine) => ({ datum: new Date(2026, m, t, h || 17).toISOString(), routineName: routine || "Push" });

const leer = app.konstanzDaten([], heute, 12);
pruefe("leer: 12 Wochen", leer.zeilen.length === 12);
pruefe("leer: je 7 Tage", leer.zeilen.every(z => z.length === 7));
pruefe("leer: 0 Trainingstage", leer.tage === 0);
pruefe("leer: alle Stufe 0", leer.zeilen.every(z => z.every(f => f.stufe === 0)));
const letzte = leer.zeilen[11];
pruefe("heute ist der Mittwoch der letzten Woche", letzte[2].heute && !letzte[1].heute);
pruefe("Donnerstag bis Sonntag liegen später", letzte.slice(3).every(f => f.spaeter) && !letzte[2].spaeter);
pruefe("erste Spalte beginnt an einem Montag", leer.zeilen[0][0].tag === 20260727, leer.zeilen[0][0].tag);

const daten = app.konstanzDaten([
  e(14, 9), e(14, 9, 17, "Push"),            // zwei Einträge eines Trainings: ein Workout
  e(12, 9, 9, "Pull"), e(12, 9, 18, "Beine"),// zwei Trainings an einem Tag
  e(1, 9),
  e(20, 0),                                  // zu alt: nicht im Raster
  { datum: "kaputt" }, { datum: "" }, null    // ungültige Einträge stören nicht
], heute, 12);
pruefe("drei Trainingstage", daten.tage === 3, daten.tage);
pruefe("Mittwoch: ein Workout", daten.zeilen[11][2].stufe === 1);
pruefe("Montag: zwei Workouts", daten.zeilen[11][0].stufe === 2);
const okt1 = daten.zeilen.flat().find(f => f.tag === 20261001);
pruefe("1. Oktober zählt", okt1 && okt1.stufe === 1);

// Ein Eintrag in der Zukunft erscheint, zählt aber nicht als Trainingstag
const zukunft = app.konstanzDaten([e(16, 9)], heute, 12);
pruefe("Zukunft zählt nicht", zukunft.tage === 0);

pruefe("Text DE", TEXTE["konstanz.tage"].de === "{n} Trainingstage in {w} Wochen");
pruefe("Text EN", TEXTE["konstanz.titel"].en === "Consistency");
pruefe("Knopf-Text", TEXTE["gruppen.offenKnopf"].de.includes("{n}"));
pruefe("Raster steht im Fortschritt", html.includes('id="konstanz"'));
pruefe("andere Looks: ausgeblendet", /\.konstanz,\s*\n(?:[^{]*\n)?\.gruppen-offen-knopf,[^{]*\{\s*\n\s*display: none;/.test(stil));
pruefe("Korund: sichtbar", korund.includes('[data-palette="korund"][data-design="dunkel"] .konstanz {'));

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
if (fehler === 0) {
  console.log("Alles bestanden");
} else {
  process.exit(1);
}
