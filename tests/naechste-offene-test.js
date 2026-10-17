// Test: Seit Version 124 springt der Trainingsmodus nach dem letzten Ziel-Satz einer Übung gleich zur nächsten offenen Übung
// (naechsteOffene). Erledigte Übungen werden übersprungen, zuerst geht es vorwärts, dann wieder von vorn.
// Ohne Satz-Ziel springt die App nicht, ist keine Übung mehr offen, bleibt sie stehen. Die Pause läuft beim Sprung weiter.
// "Nächste Übung", "Übung überspringen" und der Text "Danach: …" nutzen dieselbe Regel.
// Starten mit: node tests/naechste-offene-test.js
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
const ECHT = ["satzNummer", "satzSeite", "satzZiel", "zaehltSeiten", "zaehlweiseKopieren", "einseitig", "rirLesen", "eintragSaetzeSchreiben", "eintragFinden", "neueId", "satzFertig", "uebungZeigen", "uebungBeenden",
  "uebungErledigt", "naechsteOffene", "extraSatzStarten", "modusZustandAnzeigen"];

// Seit Version 141: Aufwärmsätze (W). Die Helfer laufen echt, die zwei Merker der Seite stehen davor.
ECHT.push("istAufwaermen", "arbeitsAnzahl", "arbeitsSaetzeVon", "wKnopfAnzeigen", "arbeitsIndex", "satzKennung", "satzKennungElement");
const funktionHolenOhneW = funktionHolen;
funktionHolen = function (name) {
  return (name === "istAufwaermen" ? "\n  let aufwaermenGewaehlt = false; let satzW = false;" : "") + funktionHolenOhneW(name);
};

// Die zeichnen nur oder gehören zu anderen Teilen der App: Hier tun sie nichts
const LEER = ["modusKorundAnzeigen", "satzHinweisMerken", "anzeigen", "letztesMalAnzeigen", "modusFortschrittAnzeigen", "modusSaetzeAnzeigen", "modusLetztesAnzeigen",
  "bestwertPruefen", "modusAnzeigen", "sicherSpeichern", "modusFelderSetzen"];

// Ein kleiner Ersatz für die Seite: Jedes Element merkt sich seinen Text und seine Klassen
const elemente = {};
function elementHolen(id) {
  if (!elemente[id]) {
    const klassen = new Set();
    elemente[id] = {
      textContent: "",
      // Seit Version 141 setzt die Pause eine Variable für den Ring des Looks Korund
      style: { setProperty: function () {} },
      classList: {
        contains: function (k) { return klassen.has(k); },
        toggle: function (k, an) { if (an) { klassen.add(k); } else { klassen.delete(k); } }
      }
    };
  }
  return elemente[id];
}

// Was die App nebenher tut: gestartete Pausen, gespeicherte Stände des Trainings, Rückfrage zum Beenden
let protokoll;

function umgebung() {
  protokoll = { pausen: [], gemerkt: [], beendenFragen: 0, pauseRest: 0 };
  let code = "let eintraege = []; let laufendesTraining = null; let gewaehlterRir = null; let gemerkteTrainingWerte = null;"
    + "let idZaehler = 0; let pauseVorbeiSeit = 0; const PAUSE_VORBEI_ANZEIGE = 3000;"
    + "const window = { scrollTo: function () {} };"
    + "const document = { getElementById: elementHolen };"
    + "function feldWert() { return 10; } function gewichtFeldWert() { return 50; }"
    + "function txt(schluessel, werte) { return werte && werte.name ? schluessel + ':' + werte.name : schluessel; }"
    + "function anzeigeName(name) { return name; } function pauseText() { return '1:30'; }"
    + "function pauseDauer(u) { return 90; }"
    + "function pauseStarten(s) { protokoll.pausen.push({ sekunden: s, index: laufendesTraining.index }); protokoll.pauseRest = s * 1000; }"
    + "function pauseRest() { return protokoll.pauseRest; }"
    + "function trainingMerken() { protokoll.gemerkt.push(JSON.parse(JSON.stringify(laufendesTraining))); }"
    + "function trainingBeendenFragen() { protokoll.beendenFragen++; }";
  for (let i = 0; i < LEER.length; i++) {
    code += "function " + LEER[i] + "() {}";
  }
  for (let i = 0; i < ECHT.length; i++) {
    code += funktionHolen(ECHT[i]);
  }
  code += "return {"
    + "  starten: function (t) { laufendesTraining = t; },"
    + "  training: function () { return laufendesTraining; },"
    + "  satzFertig: satzFertig, uebungZeigen: uebungZeigen, uebungBeenden: uebungBeenden,"
    + "  naechsteOffene: naechsteOffene, extraSatz: extraSatzStarten, zustand: modusZustandAnzeigen"
    + "};";
  return new Function("elementHolen", "protokoll", code)(elementHolen, protokoll);
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

function platz(name, ziel) {
  return { name: name, uebungId: "", muskelgruppe: "", zielSaetze: ziel, zielWdh: 10, zielWdhMax: null, pause: null,
    saetze: [], eintragId: "", extraSatz: false, getauscht: [] };
}

// Ein Training mit diesen Übungen, alle mit dem Ziel aus "ziele" (null = ohne Satz-Ziel)
function training(namen, ziele) {
  const app = umgebung();
  const uebungen = [];
  for (let i = 0; i < namen.length; i++) {
    uebungen.push(platz(namen[i], ziele[i]));
  }
  app.starten({ routineId: "r1", routineName: "Push", index: 0, erledigt: [], gestartet: "2026-10-16T17:00:00.000Z", uebungen: uebungen });
  return app;
}

function saetze(app, anzahl) {
  for (let i = 0; i < anzahl; i++) {
    app.satzFertig();
  }
}

// Die Nummer der Übung, wie sie in der App steht ("Übung 5 von 6"), nicht der Platz in der Liste
function nummer(app) {
  return app.training().index + 1;
}

// ---------- Das Beispiel Push: 4 vor 3, nach 3 geht es zu 5 ----------

const PUSH = ["Schrägbankdrücken 45° Multipresse", "Pec Deck", "Seitheben Kabel einarmig", "Schulterdrücken sitzend KH",
  "Trizepsdrücken Kabel einarmig Neutralgriff", "JM Press Multipresse"];
let app = training(PUSH, [3, 3, 3, 3, 3, 3]);

saetze(app, 2);
pruefe("Push: nach 2 von 3 Sätzen bleibt die App bei Übung 1", nummer(app), 1);
saetze(app, 1);
pruefe("Push: nach dem 3. Satz springt sie zu Übung 2", nummer(app), 2);
saetze(app, 3);
pruefe("Push: nach Übung 2 springt sie zu Übung 3", nummer(app), 3);

// Die Kabelstation ist besetzt: mit dem Pfeil weiter zu Übung 4 und die zuerst machen
app.uebungZeigen(3);
saetze(app, 3);
pruefe("Push: nach Übung 4 geht es vorwärts zur nächsten offenen, Übung 5", nummer(app), 5);

// Die Station ist frei: über die Übersicht zurück zu Übung 3
app.uebungZeigen(2);
saetze(app, 3);
pruefe("Push: nach Übung 3 springt die App direkt zu 5, nicht zu 4", nummer(app), 5);
pruefe("Push: die Pause von Übung 3 ist bei Übung 3 gestartet", protokoll.pausen[protokoll.pausen.length - 1], { sekunden: 90, index: 2 });
pruefe("Push: die Pause läuft beim Sprung weiter", protokoll.pauseRest, 90000);
pruefe("Push: der Sprung ist gespeichert (Neuladen geht bei Übung 5 weiter)", protokoll.gemerkt[protokoll.gemerkt.length - 1].index, 4);

// Während der Pause zeigt Übung 5 ihren ersten Satz als Nächstes
app.zustand(false);
pruefe("Push: in der Pause steht bei Übung 5 'Als Nächstes', nicht 'Danach'", elemente["modus-naechstes"].textContent, "modus.alsNaechstes");
pruefe("Push: die Pause ist zu sehen", elemente["modus-pause"].classList.contains("versteckt"), false);

saetze(app, 3);
pruefe("Push: nach Übung 5 springt sie zu Übung 6", nummer(app), 6);
const pausenVorher = protokoll.pausen.length;
saetze(app, 3);
pruefe("Push: nach der letzten offenen Übung bleibt die App bei Übung 6", nummer(app), 6);
pruefe("Push: auch dann startet die Pause", protokoll.pausen.length, pausenVorher + 3);
pruefe("Push: keine offene Übung mehr", app.naechsteOffene(), -1);
pruefe("Push: es öffnet sich keine Rückfrage von selbst", protokoll.beendenFragen, 0);

app.zustand(false);
pruefe("Push, alles erledigt: Knopf heißt 'Training abschließen'", elemente["modus-wahl-weiter"].textContent, "modus.abschliessen");
pruefe("Push, alles erledigt: in der Pause steht 'Alle Übungen erledigt'", elemente["modus-naechstes"].textContent, "modus.alleErledigt");
pruefe("Push, alles erledigt: Auswahl mit '+ Satz' ist zu sehen", elemente["modus-wahl"].classList.contains("versteckt"), false);

app.uebungBeenden();
pruefe("Push: 'Training abschließen' fragt nach dem Beenden", protokoll.beendenFragen, 1);
pruefe("Push: und bleibt dabei bei Übung 6", nummer(app), 6);

// ---------- Text "Danach: …" und der Knopf ----------

app = training(["A", "B", "C", "D"], [2, 2, 2, 2]);
saetze(app, 2);
saetze(app, 2);
app.uebungZeigen(3);
saetze(app, 2);
pruefe("Danach: nach D geht es von vorn zur ersten offenen, C", nummer(app), 3);
// Zurück zu B (erledigt): dort zeigt die Pause, wohin es weitergeht
app.uebungZeigen(1);
app.zustand(false);
pruefe("Danach: bei erledigter B nennt die Pause die nächste offene C", elemente["modus-naechstes"].textContent, "modus.danach:C");
pruefe("Danach: der Knopf heißt 'Nächste Übung'", elemente["modus-wahl-weiter"].textContent, "modus.naechste");
app.uebungBeenden();
pruefe("Danach: 'Nächste Übung' bei B geht zu C", nummer(app), 3);

// ---------- Mit dem Pfeil zurück zu einer erledigten Übung und + Satz ----------

app = training(["A", "B", "C"], [2, 2, 2]);
saetze(app, 2);
pruefe("+ Satz: nach A geht es zu B", nummer(app), 2);
app.uebungZeigen(0);
app.extraSatz();
saetze(app, 1);
pruefe("+ Satz: nach einem Zusatz-Satz springt die App nicht", nummer(app), 1);
pruefe("+ Satz: A hat jetzt 3 Sätze", app.training().uebungen[0].saetze.length, 3);

// ---------- Angefangene Übungen bleiben offen ----------

app = training(["A", "B", "C"], [3, 3, 3]);
saetze(app, 2);
app.uebungZeigen(1);
saetze(app, 3);
pruefe("Angefangen: A mit 2 von 3 ist offen, nach B geht es zu C", nummer(app), 3);
saetze(app, 3);
pruefe("Angefangen: nach C geht es von vorn zu A", nummer(app), 1);
saetze(app, 1);
pruefe("Angefangen: mit dem 3. Satz von A ist alles erledigt, die App bleibt", nummer(app), 1);

// ---------- Übung ohne Satz-Ziel ----------

app = training(["A", "B", "C"], [null, 2, 2]);
saetze(app, 5);
pruefe("Ohne Ziel: kein Sprung, auch nach 5 Sätzen", nummer(app), 1);
app.uebungBeenden();
pruefe("Ohne Ziel: 'Nächste Übung' geht zu B", nummer(app), 2);
saetze(app, 2);
saetze(app, 2);
pruefe("Ohne Ziel: A mit Sätzen gilt als erledigt, nach C bleibt die App", nummer(app), 3);
pruefe("Ohne Ziel: keine offene Übung mehr", app.naechsteOffene(), -1);

app = training(["A", "B"], [2, null]);
saetze(app, 2);
pruefe("Ohne Ziel: B ohne Satz ist offen, nach A geht es zu B", nummer(app), 2);

// ---------- Übung überspringen ----------

app = training(["A", "B", "C"], [2, 2, 2]);
app.uebungBeenden();
pruefe("Überspringen: A ohne Satz, weiter zu B", nummer(app), 2);
saetze(app, 2);
pruefe("Überspringen: nach B geht es zu C", nummer(app), 3);
saetze(app, 2);
pruefe("Überspringen: nach C geht es zurück zur übersprungenen A", nummer(app), 1);
app.uebungBeenden();
pruefe("Überspringen: ist A die letzte offene, kommt die Rückfrage", protokoll.beendenFragen, 1);
pruefe("Überspringen: und die App bleibt bei A", nummer(app), 1);

// ---------- Satz gelöscht ----------

app = training(["A", "B", "C"], [2, 2, 2]);
saetze(app, 2);
saetze(app, 2);
// Wie nach dem Löschen eines Satzes (satzAenderungSichern): A hat nur noch einen
app.training().uebungen[0].saetze.pop();
pruefe("Gelöscht: die App springt nicht von selbst zurück", nummer(app), 3);
saetze(app, 2);
pruefe("Gelöscht: nach C geht es zu A, die wieder offen ist", nummer(app), 1);

// ---------- Nur eine Übung ----------

app = training(["A"], [2]);
saetze(app, 2);
pruefe("Eine Übung: nach dem letzten Satz bleibt die App", nummer(app), 1);
pruefe("Eine Übung: keine offene", app.naechsteOffene(), -1);

// ---------- Neuladen mitten im Training ----------

app = training(["A", "B", "C"], [2, 2, 2]);
saetze(app, 2);
const gespeichert = protokoll.gemerkt[protokoll.gemerkt.length - 1];
const neu = umgebung();
neu.starten(gespeichert);
pruefe("Neuladen: es geht bei B weiter", neu.training().index, 1);
neu.uebungZeigen(0);
neu.uebungBeenden();
pruefe("Neuladen: A ist weiter erledigt, 'Nächste Übung' geht zu B", neu.training().index, 1);
saetze(neu, 2);
pruefe("Neuladen: nach B geht es zu C", neu.training().index, 2);

console.log("");
if (fehler > 0) {
  console.log(fehler + " Fehler");
  process.exit(1);
}
console.log("Alles bestanden");
