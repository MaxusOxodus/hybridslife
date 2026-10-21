// Test: flexible Serie und Comeback (seit Version 170, Forschung F10)
// Starten mit: node tests/serie-comeback-test.js

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const raenge = fs.readFileSync(new URL("../raenge.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
function funktionHolen(text, name) {
  const start = text.indexOf("function " + name + "(");
  if (start === -1) {
    throw new Error("Funktion " + name + " nicht gefunden");
  }
  const schluss = text === raenge ? "\n}\n" : "\n  }\n";
  return text.slice(start, text.indexOf(schluss, start) + schluss.length);
}
function konstanteHolen(name) {
  return new RegExp("\\n  const " + name + " = [\\s\\S]*?;\\n").exec(quelle)[0];
}
let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

const f = new Function("let coach = {}; let wochenplan = ['', '', '', '', '', '', '']; let tage = {}; const TAG_MS = 86400000;"
  + ["SERIE_TAGE_PRO_WOCHE", "SERIE_TAGE_MIN", "COMEBACK_PAUSE_TAGE"].map(konstanteHolen).join("")
  + "const SERIE_WOCHEN_JE_PAUSE = 8; const SERIE_PAUSEN_MAX = 2;"
  + "function trainingstage() { return tage; }"
  + funktionHolen(quelle, "geplanteTage") + funktionHolen(quelle, "serieMinTage") + funktionHolen(quelle, "comebacks") + funktionHolen(raenge, "serieBerechnen")
  + "return { serieMinTage, comebacks, serieBerechnen, setze: function (c, p, t) { coach = c || {}; wochenplan = p || ['', '', '', '', '', '', '']; tage = t || {}; } };")();

f.setze();
pruefe("Ohne Plan: 3 Tage", f.serieMinTage() === 3);
f.setze({}, ["a", "", "b", "", "", "", ""]);
pruefe("Wochenplan mit 2 Tagen: 2", f.serieMinTage() === 2);
f.setze({}, ["a", "ruhe", "b", "ruhe", "ruhe", "ruhe", "ruhe"]);
pruefe("Vorlage mit Ruhetagen: 2 geplant (seit Version 173)", f.serieMinTage() === 2, f.serieMinTage());
f.setze({}, ["a", "", "", "", "", "", ""]);
pruefe("Wochenplan mit 1 Tag: mindestens 2", f.serieMinTage() === 2);
f.setze({ tage: 5 }, ["a", "", "b", "", "", "", ""]);
pruefe("Plan mit Korund 5 Tage: höchstens 3 (geht vor dem Wochenplan)", f.serieMinTage() === 3);
f.setze({ tage: 2 }, ["a", "b", "c", "d", "", "", ""]);
pruefe("Plan mit Korund 2 Tage geht vor 4 im Wochenplan", f.serieMinTage() === 2);

// T20: Plan 2 Tage, 2 Einheiten → Woche zählt
const m1 = new Date(2026, 8, 7).getTime(), m2 = new Date(2026, 8, 14).getTime(), jetzt = new Date(2026, 8, 21).getTime();
const proWoche = {}; proWoche[m1] = 2; proWoche[m2] = 2;
f.setze({}, ["a", "", "b", "", "", "", ""]);
pruefe("T20: 2 geplant, 2 trainiert: Wochen zählen", f.serieBerechnen(proWoche, jetzt, f.serieMinTage()).serie === 2);
f.setze();
pruefe("Ohne Plan zählen 2 Trainings nicht", f.serieBerechnen(proWoche, jetzt, f.serieMinTage()).serie === 0);
pruefe("Serie nutzt serieMinTage", quelle.indexOf("serieBerechnen(tageProWoche, montagDerWoche(new Date()).getTime(), serieMinTage(), auszeitMontage())") !== -1);
pruefe("Keine feste 3 mehr außerhalb der Regel", (quelle.match(/SERIE_TAGE_PRO_WOCHE/g) || []).length === 5, (quelle.match(/SERIE_TAGE_PRO_WOCHE/g) || []).length);

function tage(liste) {
  const t = {};
  liste.forEach(function (d) { t[d] = { datum: new Date(2026, 8, d) }; });
  return t;
}
f.setze({}, null, tage([1, 8]));
pruefe("6 Tage Pause (1. und 8.): kein Comeback", f.comebacks().length === 0);
f.setze({}, null, tage([1, 9]));
const c = f.comebacks();
pruefe("7 Tage Pause (1. und 9.): Comeback mit pause 7", c.length === 1 && c[0].pause === 7 && c[0].zeit === new Date(2026, 8, 9).getTime(), JSON.stringify(c));
f.setze({}, null, tage([5]));
pruefe("Erster Trainingstag ist kein Comeback", f.comebacks().length === 0);
f.setze({}, null, tage([1, 2, 12, 13, 25]));
pruefe("Mehrere Comebacks", f.comebacks().length === 2);
pruefe("XP zählt Comebacks", /comebacks\(\)\.length \* XP_JE_COMEBACK/.test(quelle));

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
if (fehler > 0) {
  process.exit(1);
}
