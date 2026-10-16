// Test: Seit Version 132 lässt sich bei einseitigen Übungen (einarmig, einbeinig) in der Routine wählen, wie gezählt wird:
// "Beide" (Standard, ohne Feld: ein Satz sind beide Seiten, wie bisher) oder "Einzeln" (zaehlweise "seiten":
// jede Seite ist ein eigener Satz, das Satz-Ziel gilt je Seite und zählt doppelt).
// Geprüft werden einseitig, zaehltSeiten, satzZiel, zaehlweiseKopieren, uebungenKopieren, routineBereinigen (Import),
// uebungErledigt, uebungStandText und zielText.
// Starten mit: node tests/seiten-test.js
// Die Datei gehört nicht zur App. Die Funktionen holt sie direkt aus der app.js, die Übungen aus der uebungen.js.

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const uebungenQuelle = fs.readFileSync(new URL("../uebungen.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");

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
  if (!treffer) {
    throw new Error("Konstante " + name + " nicht in der app.js gefunden");
  }
  return treffer[0];
}

const ECHT = ["einseitig", "zaehltSeiten", "satzZiel", "zaehlweiseKopieren", "uebungenKopieren", "routineBereinigen",
  "uebungErledigt", "uebungStandText", "zielText", "wdhBis", "zielLesen", "wdhZielBereinigen", "uebungPauseLesen", "pauseLesen", "neueId"];

const a = new Function(uebungenQuelle
  + "const UEBUNG_NACH_ID = {}; for (const u of UEBUNGEN) UEBUNG_NACH_ID[u.id] = u;"
  + "const PAUSE_SCHRITT = 15; const PAUSE_MAX = 600; let idZaehler = 0;"
  + "function idErgaenzen() {}"
  + "function txt(s, w) { return s + (w ? \" \" + JSON.stringify(w) : \"\"); }"
  + "function txtAnzahl(s, n) { return s + \" \" + n; }"
  + konstanteHolen("EINSEITIG_NAME")
  + ECHT.map(funktionHolen).join("")
  + "return { " + ECHT.join(", ") + " };")();

let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

// ---------- Welche Übungen einseitig sind ----------
const JA = ["kurzhantelrudern", "single-arm-cable-lateral-raise", "bankdruecken-kh-einarmig", "single-leg-45-leg-press",
  "smith-machine-bulgarian-split-squat", "smith-machine-lunge", "liegestuetze-einarmig", "single-arm-dumbbell-press"];
const NEIN = ["bankdruecken-lh", "kniebeuge", "kurzhantelcurls", "latzug", "military-press", "kreuzheben"];
for (const id of JA) {
  pruefe("einseitig: " + id, a.einseitig(id, "") === true);
}
for (const id of NEIN) {
  pruefe("nicht einseitig: " + id, a.einseitig(id, "") === false);
}
pruefe("eigene Übung mit Namen einarmig", a.einseitig("selbst-1", "Rudern einarmig am Seil") === true);
pruefe("eigene Übung ohne passenden Namen", a.einseitig("selbst-2", "Rudern am Seil") === false);
pruefe("ohne id und Name", a.einseitig("", undefined) === false);
// Alle Übungen mit Zählung proSeite für die Ränge sind einseitig
const proSeite = new Function(uebungenQuelle + "return UEBUNGEN.filter(u => u.rang && u.rang.zaehlung === 'proSeite').map(u => u.id);")();
pruefe("alle proSeite-Übungen einseitig", proSeite.length > 0 && proSeite.every(id => a.einseitig(id, "")), proSeite.join());

// ---------- Satz-Ziel ----------
const rudern = { name: "Kurzhantelrudern", uebungId: "kurzhantelrudern", zielSaetze: 3, zielWdh: 8, zielWdhMax: 12, saetze: [] };
pruefe("Satz-Ziel ohne Feld wie bisher", a.satzZiel(rudern) === 3);
pruefe("Satz-Ziel mit beide wie bisher", a.satzZiel(Object.assign({}, rudern, { zaehlweise: "beide" })) === 3);
pruefe("Satz-Ziel Einzeln doppelt", a.satzZiel(Object.assign({}, rudern, { zaehlweise: "seiten" })) === 6);
pruefe("Satz-Ziel Einzeln bei nicht einseitiger Übung bleibt", a.satzZiel({ uebungId: "bankdruecken-lh", name: "Bankdrücken", zielSaetze: 3, zaehlweise: "seiten" }) === 3);
pruefe("ohne Satz-Ziel 0, auch Einzeln", a.satzZiel(Object.assign({}, rudern, { zielSaetze: null, zaehlweise: "seiten" })) === 0);

// ---------- Erledigt und Stand ----------
function mitSaetzen(u, n) {
  return Object.assign({}, u, { saetze: Array.from({ length: n }, () => ({ gewicht: 20, wdh: 10 })) });
}
const einzeln = Object.assign({}, rudern, { zaehlweise: "seiten" });
pruefe("Zusammen: 3 von 3 erledigt", a.uebungErledigt(mitSaetzen(rudern, 3)) === true);
pruefe("Einzeln: 3 von 6 offen", a.uebungErledigt(mitSaetzen(einzeln, 3)) === false);
pruefe("Einzeln: 5 von 6 offen", a.uebungErledigt(mitSaetzen(einzeln, 5)) === false);
pruefe("Einzeln: 6 von 6 erledigt", a.uebungErledigt(mitSaetzen(einzeln, 6)) === true);
pruefe("Einzeln ohne Satz-Ziel: ein Satz erledigt", a.uebungErledigt(mitSaetzen(Object.assign({}, einzeln, { zielSaetze: null }), 1)) === true);
pruefe("Stand Einzeln 4 von 6", a.uebungStandText(mitSaetzen(einzeln, 4)) === 'stand.xVonY {"x":4,"y":6}', a.uebungStandText(mitSaetzen(einzeln, 4)));
pruefe("Stand Einzeln fertig", a.uebungStandText(mitSaetzen(einzeln, 6)).startsWith("stand.fertig"));

// ---------- Ziel-Text ----------
pruefe("Ziel-Text Zusammen", a.zielText(rudern) === 'ziel.beides {"saetze":3,"wdh":"8–12"}', a.zielText(rudern));
pruefe("Ziel-Text Einzeln je Seite", a.zielText(einzeln) === 'ziel.beidesSeiten {"saetze":3,"wdh":"8–12"}', a.zielText(einzeln));
pruefe("Ziel-Text Einzeln nur Sätze", a.zielText(Object.assign({}, einzeln, { zielWdh: null, zielWdhMax: null })) === 'ziel.saetzeSeiten {"saetze":3}');

// ---------- Kopieren (Editor, Duplizieren) und Import ----------
const routineUebungen = [
  { name: "Kurzhantelrudern", uebungId: "kurzhantelrudern", muskelgruppe: "Rücken", zielSaetze: 3, zielWdh: 8, zielWdhMax: 12, pause: null, zaehlweise: "seiten" },
  { name: "Seitheben", uebungId: "single-arm-cable-lateral-raise", muskelgruppe: "Schultern", zielSaetze: 3, zielWdh: 10, zielWdhMax: 15, pause: 60 },
  { name: "Bankdrücken", uebungId: "bankdruecken-lh", muskelgruppe: "Brust", zielSaetze: 3, zielWdh: 6, zielWdhMax: 8, pause: null }
];
const kopie = a.uebungenKopieren(routineUebungen);
pruefe("Kopie: Einzeln bleibt", kopie[0].zaehlweise === "seiten");
pruefe("Kopie: ohne Feld bleibt ohne Feld, Byte für Byte", JSON.stringify(kopie.slice(1)) === JSON.stringify(routineUebungen.slice(1)), JSON.stringify(kopie.slice(1)));
pruefe("Kopie: mit Feld Byte für Byte", JSON.stringify(kopie[0]) === JSON.stringify(routineUebungen[0]), JSON.stringify(kopie[0]));
const importiert = a.routineBereinigen({ id: "r1", name: "Pull", uebungen: [
  Object.assign({}, routineUebungen[0]),
  Object.assign({}, routineUebungen[1], { zaehlweise: "beide" }),
  Object.assign({}, routineUebungen[2], { zaehlweise: "<script>" }),
  Object.assign({}, routineUebungen[1], { zaehlweise: 1 })
] });
pruefe("Import: seiten bleibt", importiert.uebungen[0].zaehlweise === "seiten");
pruefe("Import: beide, Unsinn und Zahl fallen weg", importiert.uebungen.slice(1).every(u => !("zaehlweise" in u)), JSON.stringify(importiert.uebungen.map(u => u.zaehlweise)));
const ohneFeld = a.routineBereinigen({ id: "r2", name: "Alt", uebungen: routineUebungen.slice(1) });
pruefe("Import älterer Routine: kein Feld", ohneFeld.uebungen.every(u => !("zaehlweise" in u)));

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
