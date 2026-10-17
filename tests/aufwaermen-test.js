// Test: Seit Version 141 kann ein Satz ein Aufwärmsatz sein (Feld aufwaermen: true im Satz, "W" im Look Korund).
// Aufwärmsätze stehen mit "W" in den Tabellen, zählen aber nicht zum Satz-Ziel, nicht zum Volumen,
// nicht zur Zahl der Sätze und nicht zum 1RM. Sätze ohne das Feld bleiben genau wie bisher.
// Starten mit: node tests/aufwaermen-test.js
// Die Datei gehört nicht zur App. Die Funktionen holt sie aus der app.js.

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
const stil = fs.readFileSync(new URL("../style.css", import.meta.url), "utf8");
function funktionHolen(name) {
  const start = quelle.indexOf("\n  function " + name + "(");
  const ende = quelle.indexOf("\n  }\n", start);
  if (start === -1 || ende === -1) {
    throw new Error("Funktion " + name + " nicht in der app.js gefunden");
  }
  return quelle.slice(start, ende + 5);
}
let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

const ECHT = ["saetzeVon", "rirLesen", "istAufwaermen", "arbeitsAnzahl", "arbeitsSaetzeVon", "eintragVolumen", "satzNummer",
  "satzSeite", "arbeitsIndex", "satzKennung", "satzZiel", "uebungErledigt", "eintragSaetzeSchreiben", "uebungStandText"];
const app = new Function(
  "function txt(s, w) { return w ? s + JSON.stringify(w) : (s === 'seite.rechts' ? 'R' : s === 'seite.links' ? 'L' : s); }"
  + "function txtAnzahl(s, n) { return n + ' Sätze'; }"
  + "function zaehltSeiten(u) { return u.zaehlweise === 'seiten'; }"
  + ECHT.map(funktionHolen).join("")
  + "return { " + ECHT.join(", ") + " };")();

const W = { gewicht: 40, wdh: 10, aufwaermen: true };
const A = (g, w) => ({ gewicht: g, wdh: w });

// Gespeicherter Eintrag mit einem Aufwärmsatz vorn
const eintrag = { einzelsaetze: [W, A(80, 8), A(80, 8), A(80, 7)], saetze: 4, gewicht: 80, wdh: 8 };
const saetze = app.saetzeVon(eintrag);
pruefe("saetzeVon: alle vier Sätze", saetze.length === 4);
pruefe("saetzeVon: Merker bleibt", saetze[0].aufwaermen === true && saetze[1].aufwaermen === undefined);
pruefe("Arbeitssätze: drei", app.arbeitsSaetzeVon(eintrag).length === 3);
pruefe("Volumen ohne Aufwärmsatz", app.eintragVolumen(eintrag, 0) === 80 * 23, app.eintragVolumen(eintrag, 0));

// Alte Einträge ohne das Feld: genau wie bisher
const alt = { einzelsaetze: [A(60, 10), A(60, 10)], saetze: 2, gewicht: 60, wdh: 10 };
pruefe("alt: kein Merker", app.saetzeVon(alt).every(s => !("aufwaermen" in s)));
pruefe("alt: Volumen gleich", app.eintragVolumen(alt, 0) === 1200);
pruefe("alt: nur aufwaermen === true zählt", app.saetzeVon({ einzelsaetze: [{ gewicht: 1, wdh: 1, aufwaermen: "ja" }] })[0].aufwaermen === undefined);
pruefe("ohne einzelsaetze: wie bisher", app.saetzeVon({ saetze: 3, gewicht: 50, wdh: 5 }).length === 3);

// Kennungen: W, dann 1, 2, 3
const kennungen = saetze.map((s, i) => app.satzKennung(saetze, i, false));
pruefe("Kennungen W 1 2 3", kennungen.join(" ") === "W 1 2 3", kennungen.join(" "));
const mitte = [A(80, 8), W, A(80, 8)];
pruefe("W in der Mitte: 1 W 2", mitte.map((s, i) => app.satzKennung(mitte, i, false)).join(" ") === "1 W 2");
const seiten = [W, A(20, 10), A(20, 10)];
pruefe("Einzeln: W 1 R 1 L", seiten.map((s, i) => app.satzKennung(seiten, i, true)).join(" ") === "W 1 R 1 L");

// Satz-Ziel: Aufwärmsätze zählen nicht
const u = { zielSaetze: 3, saetze: [W, A(80, 8), A(80, 8)] };
pruefe("2 von 3 + W: offen", !app.uebungErledigt(u));
u.saetze.push(A(80, 7));
pruefe("3 von 3 + W: erledigt", app.uebungErledigt(u));
pruefe("ohne Ziel: nur W ist offen", !app.uebungErledigt({ zielSaetze: 0, saetze: [W] }));
pruefe("ohne Ziel: ein Arbeitssatz erledigt", app.uebungErledigt({ zielSaetze: 0, saetze: [W, A(1, 1)] }));
pruefe("Stand: nur W ist offen", app.uebungStandText({ zielSaetze: 3, saetze: [W] }) === "stand.offen");

// Schreiben: Merker kommt in den Eintrag, der schwerste Satz bleibt
const neu = {};
app.eintragSaetzeSchreiben(neu, [W, A(80, 8)]);
pruefe("Schreiben: Merker im Eintrag", neu.einzelsaetze[0].aufwaermen === true && !("aufwaermen" in neu.einzelsaetze[1]));
pruefe("Schreiben: schwerster Satz", neu.gewicht === 80 && neu.wdh === 8);
const ohne = {};
app.eintragSaetzeSchreiben(ohne, [A(60, 10)]);
pruefe("Schreiben ohne W: kein Feld", !("aufwaermen" in ohne.einzelsaetze[0]));

// Knöpfe: im HTML vorhanden, in anderen Looks ausgeblendet
pruefe("Knopf im Trainingsmodus", html.includes('id="modus-w"'));
pruefe("Knopf im Sheet", html.includes('id="satz-w"'));
pruefe("andere Looks: Knopf aus", /\.w-knopf,[^{]*\{\s*\n\s*display: none;/.test(stil));

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
if (fehler === 0) {
  console.log("Alles bestanden");
} else {
  process.exit(1);
}
