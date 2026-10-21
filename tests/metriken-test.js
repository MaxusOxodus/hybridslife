// Test: Metriken (seit Version 169, Forschung AP9): persönliche Wochenziele (wochenZiele, wochenSchnitt),
// XP je hartem Satz statt je Tonne, realistischere Stufen beim Fortschritts-Rang.
// Starten mit: node tests/metriken-test.js

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const raenge = fs.readFileSync(new URL("../raenge.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
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

// trainingstage: { JJJJMMTT: { wdh, volumen } } wie in der app.js
const f = new Function("let wochenplan = ['', '', '', '', '', '', '']; let coach = {}; let tage = {};"
  + ["WOCHEN_ZIELE", "ZIEL_SCHNITT_WOCHEN", "ZIEL_SUCH_WOCHEN"].map(konstanteHolen).join("")
  + "function trainingstage() { return tage; }"
  + "function tagSchluessel(d) { return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate(); }"
  + ["montagDerWoche", "wochenZahlen", "wochenSchnitt", "wochenZiele"].map(funktionHolen).join("")
  + "return { wochenZiele, setze: function (t, p, c) { tage = t; wochenplan = p || ['', '', '', '', '', '', '']; coach = c || {}; } };")();

function tagVor(wochen, tag) {
  const d = new Date();
  const montag = new Date(d.getFullYear(), d.getMonth(), d.getDate() - ((d.getDay() + 6) % 7));
  const x = new Date(montag.getFullYear(), montag.getMonth(), montag.getDate() - 7 * wochen + tag);
  return x.getFullYear() * 10000 + (x.getMonth() + 1) * 100 + x.getDate();
}

f.setze({});
pruefe("Ohne Daten: feste Ziele 5 / 15.000 / 320", JSON.stringify(f.wochenZiele()) === '{"workouts":5,"volumen":15000,"wdh":320}', JSON.stringify(f.wochenZiele()));
f.setze({}, ["a", "", "b", "", "c", "", ""]);
pruefe("Wochenplan mit 3 Tagen: Ziel 3 Workouts", f.wochenZiele().workouts === 3);
f.setze({}, ["a", "", "b", "", "c", "", ""], { tage: 4 });
pruefe("Coach-Tage gehen vor dem Plan", f.wochenZiele().workouts === 4);
const t = {};
t[tagVor(1, 0)] = { wdh: 200, volumen: 9000 };
t[tagVor(2, 0)] = { wdh: 300, volumen: 11000 };
t[tagVor(6, 2)] = { wdh: 100, volumen: 4000 };
t[tagVor(0, 0)] = { wdh: 999, volumen: 99999 };
f.setze(t);
const z = f.wochenZiele();
pruefe("Schnitt der Wochen mit Training davor (9.000, 11.000, 4.000 → 8.000 kg; 200, 300, 100 → 200 Wdh.), diese Woche zählt nicht", z.volumen === 8000 && z.wdh === 200, JSON.stringify(z));
const t2 = {};
t2[tagVor(10, 0)] = { wdh: 300, volumen: 20000 };
f.setze(t2);
pruefe("Training nur vor mehr als 8 Wochen: feste Ziele", f.wochenZiele().volumen === 15000);

pruefe("XP je hartem Satz statt je Tonne", /harte \* XP_JE_HARTER_SATZ/.test(quelle) && quelle.indexOf("XP_JE_TONNE") === -1);
pruefe("Fortschritt-Stufen 5/10/20/30/45/60 %", /FORTSCHRITT_SCHWELLEN = \[0, 0\.05, 0\.10, 0\.20, 0\.30, 0\.45, 0\.60\]/.test(raenge));
pruefe("Wochenbericht vergleicht mit dem Schnitt", /const vorher = wochenSchnitt\(tage, letzte\)/.test(quelle));

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
if (fehler > 0) {
  process.exit(1);
}
