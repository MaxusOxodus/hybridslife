// Prüft, dass App und Gym-Spiel dieselbe Zukunftsregel nutzen (Audit Phase 12): dieselbe Grenze ZUKUNFT_TOLERANZ_MS,
// das Spiel überspringt beim Abgleich Einträge jenseits der Grenze, und seine Wochenzahl zählt nur Tage bis heute.
// Das Verhalten selbst prüft der Browser-Test (node tests/browser-regression.mjs spiel). Starten mit: node tests/zukunft-spiel-test.js
const fs = require("fs");
const path = require("path");
const app = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
const spiel = fs.readFileSync(path.join(__dirname, "..", "spiel", "index.html"), "utf8");

let pruefungen = 0;
let fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}
const wert = (quelle) => {
  const t = /const ZUKUNFT_TOLERANZ_MS = ([^;]+);/.exec(quelle);
  return t ? Function("return " + t[1])() : null;
};
pruefe("App kennt ZUKUNFT_TOLERANZ_MS", typeof wert(app) === "number");
pruefe("Spiel kennt ZUKUNFT_TOLERANZ_MS", typeof wert(spiel) === "number");
pruefe("Beide Grenzen gleich", wert(app) === wert(spiel), wert(app) + " / " + wert(spiel));
const imp = spiel.slice(spiel.indexOf("function importieren("), spiel.indexOf("function infoBauen("));
pruefe("importieren rechnet die Grenze aus Date.now() und ZUKUNFT_TOLERANZ_MS", /grenze = Date\.now\(\) \+ ZUKUNFT_TOLERANZ_MS/.test(imp));
pruefe("importieren merkt Tage mit Einträgen jenseits der Grenze", /d\.getTime\(\) > grenze\) warten\[iso\(d\)\] = true/.test(imp));
pruefe("importieren überspringt diese Tage ganz", /isNaN\(d\) \|\| warten\[iso\(d\)\]\) return;/.test(imp));
const woche = spiel.slice(spiel.indexOf("function wochenDaten("), spiel.indexOf("function serieWochen("));
pruefe("wochenDaten zählt nur Tage bis heute", /iso\(d\) <= heute\(\)/.test(woche));

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
