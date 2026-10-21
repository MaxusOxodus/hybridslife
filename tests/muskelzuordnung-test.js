// Test: Hilfsmuskeln (seit Version 166, Forschung AP4, Vault „Korund Forschung 16“). 64 Übungen mit hoher Sicherheit
// haben ihre Hilfsmuskeln bekommen (Drücken: Trizeps und vordere bzw. seitliche Schulter, Latzug und Klimmzug: oberer
// Rücken und Bizeps, Kniebeuge-Muster und Beinpresse: Po und Adduktoren). Geprüft wird auch, dass alle Übungen
// gültige Hilfsmuskeln haben und keiner gleich dem Hauptmuskel ist.
// Starten mit: node tests/muskelzuordnung-test.js

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../uebungen.js", import.meta.url), "utf8");
const { UEBUNGEN, MUSKELN } = new Function(quelle + "; return { UEBUNGEN, MUSKELN };")();
let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

const nachId = {};
UEBUNGEN.forEach(u => { nachId[u.id] = u; });
const gueltig = Object.keys(MUSKELN);
const falsch = UEBUNGEN.filter(u => !Array.isArray(u.hilfs) || u.hilfs.some(h => gueltig.indexOf(h) === -1 || h === u.haupt));
pruefe("Alle Hilfsmuskeln gültig und nicht gleich dem Hauptmuskel", falsch.length === 0, falsch.map(u => u.id).join(", "));

const erwartet = {
  "smith-machine-overhead-press": ["schulter-seite", "trizeps"],
  "barbell-overhead-press": ["schulter-seite", "trizeps"],
  "cable-lat-pulldown": ["ruecken-oben", "bizeps"],
  "chin-up": ["ruecken-oben", "bizeps"],
  "beinpresse": ["po", "adduktoren"],
  "front-squat": ["po", "adduktoren"],
  "pause-smith-machine-bench-press": ["schulter-vorn", "trizeps"],
  "ring-chest-fly": ["schulter-vorn"]
};
Object.keys(erwartet).forEach(id => {
  pruefe(id + ": " + erwartet[id].join(", "), nachId[id] && JSON.stringify(nachId[id].hilfs) === JSON.stringify(erwartet[id]), nachId[id] && JSON.stringify(nachId[id].hilfs));
});
const leer = UEBUNGEN.filter(u => u.hilfs.length === 0).length;
pruefe("Höchstens 300 Übungen ohne Hilfsmuskeln (vorher 351)", leer <= 300, leer);

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
if (fehler > 0) {
  process.exit(1);
}
