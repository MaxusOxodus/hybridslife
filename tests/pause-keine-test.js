// Test: Seit Version 125 kann eine Übung in der Routine "Keine Pause" haben (pause: 0).
// 0 bleibt beim Kopieren, beim Start des Trainings und beim Import erhalten, null heißt weiter "Standard-Pause".
// Ohne Pause startet nach "Satz fertig" kein Countdown, die Eingabe steht gleich wieder da (mit frischem RIR).
// Das Training ändert die Routine dabei nicht.
// Starten mit: node tests/pause-keine-test.js
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
const ECHT = ["pauseLesen", "uebungPauseLesen", "pauseStandard", "pauseDauer", "pauseText", "pauseAuswahlFuellen", "pauseFeld",
  "uebungenKopieren", "wdhBis", "zielLesen", "wdhZielBereinigen", "routineBereinigen", "neueId", "trainingBeginnen",
  "rirLesen", "eintragSaetzeSchreiben", "eintragFinden", "satzFertig", "uebungZeigen", "uebungErledigt", "naechsteOffene"];

// Die zeichnen nur oder gehören zu anderen Teilen der App: Hier tun sie nichts
const LEER = ["anzeigen", "letztesMalAnzeigen", "modusFortschrittAnzeigen", "modusSaetzeAnzeigen", "modusLetztesAnzeigen",
  "bestwertPruefen", "modusAnzeigen", "sicherSpeichern", "idErgaenzen", "verworfenHinweisSchliessen", "routineHinweisSchliessen",
  "trainingFortsetzen", "einfuehrungAnbieten"];

// Ein kleiner Ersatz für Auswahlfelder: Optionen, Gruppen, Wert und Klassen
class Option {
  constructor(text, wert) {
    this.text = text;
    this.value = String(wert);
  }
}
function auswahlBauen() {
  const klassen = new Set();
  const optionen = [];
  let wert = "";
  return {
    optionen: optionen,
    set innerHTML(x) { optionen.length = 0; },
    appendChild: function (gruppe) { for (const o of gruppe.kinder) { optionen.push(o); } },
    get value() { return wert; },
    set value(w) { const s = String(w); wert = optionen.some(o => o.value === s) ? s : ""; },
    classList: { contains: k => klassen.has(k), toggle: function (k, an) { if (an) { klassen.add(k); } else { klassen.delete(k); } } }
  };
}
const dokument = {
  createElement: function (art) {
    if (art === "optgroup") {
      return { kinder: [], appendChild: function (o) { this.kinder.push(o); } };
    }
    return auswahlBauen();
  }
};

let protokoll;
function umgebung(einstellungen) {
  protokoll = { pausen: [], gemerkt: 0, zustand: [] };
  let code = "let eintraege = []; let laufendesTraining = null; let gewaehlterRir = null; let gemerkteTrainingWerte = null;"
    + "let idZaehler = 0; const PAUSE_SCHRITT = 15; const PAUSE_MAX = 600; const PAUSE_STANDARD = 120;"
    + "const einstellungen = " + JSON.stringify(einstellungen || {}) + ";"
    + "const window = { scrollTo: function () {} };"
    + "function element(art, klasse, text) { return { art: art, kinder: [], appendChild: function (k) { this.kinder.push(k); } }; }"
    + "function feldWert() { return 10; } function gewichtFeldWert() { return 50; }"
    + "function txt(schluessel) { return schluessel; }"
    + "function pauseStarten(s) { protokoll.pausen.push(s); }"
    + "function modusZustandAnzeigen(neu) { protokoll.zustand.push(neu); }"
    + "function trainingMerken() { protokoll.gemerkt++; }";
  for (let i = 0; i < LEER.length; i++) {
    code += "function " + LEER[i] + "() {}";
  }
  for (let i = 0; i < ECHT.length; i++) {
    code += funktionHolen(ECHT[i]);
  }
  code += "return {"
    + "  uebungPauseLesen: uebungPauseLesen, pauseLesen: pauseLesen, pauseDauer: pauseDauer, pauseFeld: pauseFeld,"
    + "  kopieren: uebungenKopieren, bereinigen: routineBereinigen,"
    + "  beginnen: trainingBeginnen, satzFertig: satzFertig, training: function () { return laufendesTraining; }"
    + "};";
  return new Function("document", "Option", "protokoll", code)(dokument, Option, protokoll);
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

// ---------- Werte lesen ----------

let app = umgebung({ pauseSekunden: 90 });
pruefe("Lesen: 0 ist Keine Pause", app.uebungPauseLesen(0), 0);
pruefe("Lesen: \"0\" aus dem Auswahlfeld ist Keine Pause", app.uebungPauseLesen("0"), 0);
pruefe("Lesen: null bleibt Standard", app.uebungPauseLesen(null), null);
pruefe("Lesen: leer bleibt Standard", app.uebungPauseLesen(""), null);
pruefe("Lesen: fehlt (alte Routine) bleibt Standard", app.uebungPauseLesen(undefined), null);
pruefe("Lesen: 90 bleibt 90", app.uebungPauseLesen(90), 90);
pruefe("Lesen: \"105\" wird 105", app.uebungPauseLesen("105"), 105);
pruefe("Lesen: 7 Sekunden bleiben Standard wie bisher", app.uebungPauseLesen(7), null);
pruefe("Lesen: zu lang wird 10 Minuten", app.uebungPauseLesen(5000), 600);
pruefe("Lesen: Unsinn bleibt Standard", app.uebungPauseLesen("abc"), null);
pruefe("Lesen: false bleibt Standard", app.uebungPauseLesen(false), null);
pruefe("Standard-Pause: pauseLesen macht aus 0 weiter Standard", app.pauseLesen(0), null);

pruefe("Dauer: Keine Pause ist 0", app.pauseDauer({ pause: 0 }), 0);
pruefe("Dauer: ohne eigene Pause die Standard-Pause", app.pauseDauer({ pause: null }), 90);
pruefe("Dauer: alte Übung ohne Feld die Standard-Pause", app.pauseDauer({}), 90);
pruefe("Dauer: eigene Pause", app.pauseDauer({ pause: 45 }), 45);
pruefe("Dauer: Standard-Pause 0 in den Einstellungen gilt nicht", umgebung({ pauseSekunden: 0 }).pauseDauer({ pause: null }), 120);

// ---------- Auswahlfeld im Routinen-Editor ----------

app = umgebung({ pauseSekunden: 90 });
let uebung = { name: "A", pause: null };
let feld = app.pauseFeld(uebung).kinder[1];
pruefe("Editor: erste Wahl ist die Standard-Pause", [feld.optionen[0].text, feld.optionen[0].value], ["1:30", ""]);
pruefe("Editor: danach Keine Pause", [feld.optionen[1].text, feld.optionen[1].value], ["pause.keine", "0"]);
pruefe("Editor: danach 0:15 bis 10:00", [feld.optionen[2].text, feld.optionen[feld.optionen.length - 1].text, feld.optionen.length], ["0:15", "10:00", 42]);
pruefe("Editor: ohne eigene Pause ist Standard gewählt und dezent", [feld.value, feld.classList.contains("uebernommen")], ["", true]);
feld.value = "0";
feld.onchange();
pruefe("Editor: Keine Pause wählen speichert 0", uebung.pause, 0);
pruefe("Editor: Keine Pause ist nicht dezent", feld.classList.contains("uebernommen"), false);
feld = app.pauseFeld(uebung).kinder[1];
pruefe("Editor: neu gezeichnet steht Keine Pause wieder da", feld.value, "0");
feld.value = "";
feld.onchange();
pruefe("Editor: zurück auf Standard speichert null", uebung.pause, null);
feld = app.pauseFeld({ pause: 75 }).kinder[1];
pruefe("Editor: eigene Zeit 1:15 wie bisher gewählt", feld.value, "75");

// ---------- Kopieren, Import, Start des Trainings ----------

const routine = { id: "r1", name: "Push", uebungen: [
  { name: "A", uebungId: "", muskelgruppe: "brust", zielSaetze: 2, zielWdh: 10, zielWdhMax: null, pause: 0 },
  { name: "B", uebungId: "", muskelgruppe: "brust", zielSaetze: 2, zielWdh: 10, zielWdhMax: null, pause: null },
  { name: "C", uebungId: "", muskelgruppe: "brust", zielSaetze: 2, zielWdh: 10, zielWdhMax: null, pause: 60 }] };
const routineVorher = JSON.stringify(routine);
pruefe("Kopieren: 0, null und 60 bleiben", app.kopieren(routine.uebungen).map(u => u.pause), [0, null, 60]);
pruefe("Import: 0, null und 60 bleiben", app.bereinigen(routine).uebungen.map(u => u.pause), [0, null, 60]);
pruefe("Import: alte Routine ohne Feld pause bekommt Standard", app.bereinigen({ name: "Alt", uebungen: [{ name: "A", zielSaetze: 3 }] }).uebungen[0].pause, null);
pruefe("Import: alte Routine mit 120 bleibt 120", app.bereinigen({ name: "Alt", uebungen: [{ name: "A", pause: 120 }] }).uebungen[0].pause, 120);

app.beginnen(routine);
let t = app.training();
pruefe("Start: das Training übernimmt 0, null und 60", t.uebungen.map(u => u.pause), [0, null, 60]);

// ---------- Sätze ohne Pause ----------

app.satzFertig();
pruefe("Keine Pause: nach dem Satz startet kein Countdown", protokoll.pausen, []);
pruefe("Keine Pause: Eingabe wird neu gestellt (RIR frisch)", protokoll.zustand, [true]);
pruefe("Keine Pause: noch bei A", t.index, 0);
app.satzFertig();
pruefe("Keine Pause: nach dem letzten Satz gleich weiter zu B, ohne Pause", [t.index, protokoll.pausen], [1, []]);
app.satzFertig();
pruefe("Standard: bei B startet die Standard-Pause", protokoll.pausen, [90]);
pruefe("Standard: Eingabe bleibt bis zum Ende der Pause wie bisher", protokoll.zustand[protokoll.zustand.length - 1], false);
app.satzFertig();
app.satzFertig();
pruefe("Eigene Zeit: bei C startet die Pause 1:00", protokoll.pausen, [90, 90, 60]);
pruefe("Routine: bleibt nach dem Training unverändert", JSON.stringify(routine), routineVorher);


console.log("");
if (fehler > 0) {
  console.log(fehler + " Fehler");
  process.exit(1);
}
console.log("Alles bestanden");
