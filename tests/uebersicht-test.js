// Test: Seit Version 126 zeigt die Übersicht der Übungen im Trainingsmodus erledigte Übungen leise mit ✓ (Klasse "erledigt").
// Erledigt heißt wie beim Weiterspringen (uebungErledigt): Satz-Ziel erreicht, ohne Satz-Ziel schon ein Satz.
// Die Reihenfolge bleibt die der Routine, offene Übungen stehen wie bisher da, die aktuelle bleibt "aktuell".
// Starten mit: node tests/uebersicht-test.js
// Die Datei gehört nicht zur App. Die Funktionen holt sie direkt aus der app.js, alles fürs Zeichnen tut hier nichts.

import fs from "node:fs";

// Die Dateien können Windows-Zeilenenden (CRLF) oder LF haben, CRLF wird zu LF. Sonst findet funktionHolen nichts.
const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");

// Schneidet eine Funktion aus der app.js aus: von "function name(" bis zur schließenden Klammer auf derselben Einrückung.
function funktionHolen(name) {
  const start = quelle.indexOf("  function " + name + "(");
  const ende = quelle.indexOf("\n  }\n", start);
  if (start === -1 || ende === -1) {
    throw new Error("Funktion " + name + " nicht in der app.js gefunden");
  }
  return quelle.slice(start, ende + 5);
}

// Diese Funktionen laufen so, wie sie in der app.js stehen
const ECHT = ["satzZiel", "zaehltSeiten", "zaehlweiseKopieren", "einseitig", "element", "uebersichtOeffnen", "uebungErledigt", "uebungStandText", "gleicheUebung", "stelleIst"];

// Ein kleiner Ersatz für die Seite: Elemente mit Klassen, Kindern, Text und Merkmalen
function knoten(tag) {
  const klassen = new Set();
  return {
    tag: tag, kinder: [], merkmale: {}, textContent: "",
    set className(k) { k.split(" ").forEach(x => klassen.add(x)); },
    set innerHTML(x) { this.kinder.length = 0; },
    classList: { add: k => klassen.add(k), contains: k => klassen.has(k) },
    appendChild: function (k) { this.kinder.push(k); return k; },
    setAttribute: function (n, w) { this.merkmale[n] = w; }
  };
}
const liste = knoten("div");
const dokument = { createElement: knoten, getElementById: function () { return liste; } };

function umgebung(training) {
  let code = "let laufendesTraining = " + JSON.stringify(training) + "; let geoeffnet = '';"
    + "function txt(s, w) { return s + (w ? ':' + JSON.stringify(w) : ''); }"
    + "function txtAnzahl(s, n) { return n + ' ' + s; }"
    + "function anzeigeName(name) { return name; }"
    + "function zusatzSheetOeffnen(id) { geoeffnet = id; } function zusatzSheetsSchliessen() {} function uebungZeigen() {}";
  for (let i = 0; i < ECHT.length; i++) {
    code += funktionHolen(ECHT[i]);
  }
  code += "return { oeffnen: uebersichtOeffnen, geoeffnet: function () { return geoeffnet; } };";
  return new Function("document", code)(dokument);
}

let fehler = 0;
function pruefe(name, ist, soll) {
  const gleich = JSON.stringify(ist) === JSON.stringify(soll);
  console.log((gleich ? "ok     " : "FEHLER ") + name);
  if (!gleich) {
    console.log("         erwartet: " + JSON.stringify(soll));
    console.log("         bekommen: " + JSON.stringify(ist));
    fehler++;
  }
}

function saetze(n) {
  const liste = [];
  for (let i = 0; i < n; i++) {
    liste.push({ gewicht: 50, wdh: 10 });
  }
  return liste;
}
function platz(name, ziel, gemacht) {
  return { name: name, uebungId: "", muskelgruppe: "", zielSaetze: ziel, zielWdh: 10, zielWdhMax: null, pause: null,
    saetze: saetze(gemacht), eintragId: "", extraSatz: false, getauscht: [] };
}

// Die Zeilen der Übersicht als kurze Beschreibung: Name, erledigt, aktuell, ✓ da, ✓ für Vorleser versteckt
function zeilen() {
  return liste.kinder.map(function (z) {
    const haken = z.kinder.find(k => k.classList.contains("sheet-zeile-haken"));
    return {
      name: z.kinder[0].textContent,
      erledigt: z.classList.contains("erledigt"),
      aktuell: z.classList.contains("aktuell"),
      haken: haken ? haken.textContent : "",
      versteckt: haken ? haken.merkmale["aria-hidden"] : ""
    };
  });
}

// ---------- Das Beispiel Push: 1, 2 und 4 fertig, 5 angefangen, jetzt bei 3 ----------

const PUSH = ["Schrägbankdrücken 45° Multipresse", "Pec Deck", "Seitheben Kabel einarmig", "Schulterdrücken sitzend KH",
  "Trizepsdrücken Kabel einarmig Neutralgriff", "JM Press Multipresse"];
let app = umgebung({ routineName: "Push", index: 2, erledigt: [], uebungen: [
  platz(PUSH[0], 3, 3), platz(PUSH[1], 3, 3), platz(PUSH[2], 3, 0), platz(PUSH[3], 3, 3), platz(PUSH[4], 3, 2), platz(PUSH[5], 3, 0)] });
app.oeffnen();
let z = zeilen();
pruefe("Push: die Übersicht geht auf", app.geoeffnet(), "uebungen-sheet");
pruefe("Push: Reihenfolge der Routine bleibt", z.map(x => x.name), PUSH.map((n, i) => (i + 1) + ". " + n));
pruefe("Push: 1, 2 und 4 sind erledigt", z.map(x => x.erledigt), [true, true, false, true, false, false]);
pruefe("Push: erledigte haben ein ✓", z.map(x => x.haken), ["✓", "✓", "", "✓", "", ""]);
pruefe("Push: das ✓ ist für Vorleser versteckt (der Stand sagt 'fertig')", z.filter(x => x.haken).map(x => x.versteckt), ["true", "true", "true"]);
pruefe("Push: angefangene 5 (2 von 3) ist offen", z[4].erledigt, false);
pruefe("Push: aktuell ist 3", z.map(x => x.aktuell), [false, false, true, false, false, false]);
pruefe("Push: Stand der erledigten heißt 'fertig'", liste.kinder[0].kinder[1].textContent.startsWith("stand.fertig"), true);

// ---------- Aktuelle Übung erledigt ----------

app = umgebung({ routineName: "Push", index: 0, erledigt: [], uebungen: [platz("A", 2, 2), platz("B", 2, 0)] });
app.oeffnen();
z = zeilen();
pruefe("Aktuell erledigt: bleibt aktuell und bekommt ✓", [z[0].aktuell, z[0].erledigt, z[0].haken], [true, true, "✓"]);
pruefe("Aktuell erledigt: B offen", [z[1].aktuell, z[1].erledigt], [false, false]);

// ---------- Ohne Satz-Ziel und Zusatz-Satz ----------

app = umgebung({ routineName: "Push", index: 0, erledigt: [], uebungen: [platz("A", null, 0), platz("B", null, 1), platz("C", 2, 3)] });
app.oeffnen();
z = zeilen();
pruefe("Ohne Ziel: ohne Satz offen, mit Satz erledigt", [z[0].erledigt, z[1].erledigt], [false, true]);
pruefe("Zusatz-Satz: mehr als das Ziel ist erledigt", z[2].erledigt, true);

// ---------- Neu öffnen ----------

app = umgebung({ routineName: "Push", index: 0, erledigt: [], uebungen: [platz("A", 2, 0), platz("B", 2, 0)] });
app.oeffnen();
app.oeffnen();
pruefe("Neu öffnen: die Liste hat nicht doppelt so viele Zeilen", liste.kinder.length, 2);
pruefe("Leeres Training: nichts erledigt", zeilen().map(x => x.erledigt), [false, false]);

console.log("");
if (fehler > 0) {
  console.log(fehler + " Fehler");
  process.exit(1);
}
console.log("Alles bestanden");
