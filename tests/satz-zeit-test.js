// Test: Jeder Satz aus dem Trainingsmodus merkt sich seit Version 122, wann er fertig war (zeit, ISO-Text).
// Die Zeit bleibt beim Eintragen, Bearbeiten, Löschen eines anderen Satzes und beim Tauschen der Übung erhalten.
// Sätze ohne Zeit (ältere Einträge) bekommen keine dazu und bleiben unverändert.
// Starten mit: node tests/satz-zeit-test.js
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
const ECHT = ["satzZiel", "zaehltSeiten", "zaehlweiseKopieren", "einseitig", "rirLesen", "saetzeVon", "eintragSaetzeSchreiben", "eintragFinden", "neueId", "gleicheUebung", "stelleIst",
  "trainingUebungListen", "satzFertig", "satzSpeichern", "satzLoeschen", "satzAenderungSichern", "uebungTauschen",
  "naechsteOffene", "uebungErledigt"];

// Die zeichnen nur oder gehören zu anderen Teilen der App: Hier tun sie nichts
const LEER = ["anzeigen", "letztesMalAnzeigen", "trainingMerken", "pauseStarten", "pauseDauer", "modusFortschrittAnzeigen",
  "modusZustandAnzeigen", "modusSaetzeAnzeigen", "modusLetztesAnzeigen", "bestwertPruefen", "satzSheetSchliessen",
  "trainingsAufraeumen", "profilAnzeigen", "homeAnzeigen", "tagSheetFuellen", "zusatzSheetsSchliessen", "trainingstage",
  "sheetSchliessen", "modusAnzeigen", "routineUebungErsetzen", "tauschRoutineStelle", "sicherSpeichern", "uebungZeigen"];

// Die Uhr des Tests: new Date() und Date.now() liefern die Zeit, die der Test gerade eingestellt hat
let jetzt = Date.parse("2026-10-15T18:00:00.000Z");
class TestDate extends Date {
  constructor(...werte) {
    if (werte.length === 0) {
      super(jetzt);
    } else {
      super(...werte);
    }
  }
  static now() {
    return jetzt;
  }
}

// Die Zahlenfelder des Trainingsmodus (t-feld-…) und des Sheets "Satz bearbeiten" (s-feld-…)
const felder = {};

function umgebung(eintraegeVorher) {
  let code = "let eintraege = " + JSON.stringify(eintraegeVorher) + ";"
    + "let laufendesTraining = null; let gewaehlterRir = null; let gemerkteTrainingWerte = null; let idZaehler = 0;"
    + "let satzEintragId = ''; let satzIndex = -1; let satzRir = null; let trainingAnsicht = 'modus'; let aktiveSeite = 'training';"
    + "let tauschAuchRoutine = false; let tagSheetSchluessel = '';"
    + "const window = { scrollTo: function () {} };"
    + "const document = { getElementById: function () { return { classList: { contains: function () { return false; } } }; } };"
    + "function feldWert(id) { return felder[id]; } function gewichtFeldWert(id) { return felder[id]; }"
    + "function gewichtAnzeige(kg) { return kg; } function tauschVergeben() { return false; }";
  for (let i = 0; i < LEER.length; i++) {
    code += "function " + LEER[i] + "() {}";
  }
  for (let i = 0; i < ECHT.length; i++) {
    code += funktionHolen(ECHT[i]);
  }
  code += "return {"
    + "  starten: function (t) { laufendesTraining = t; },"
    + "  training: function () { return laufendesTraining; },"
    + "  eintraege: function () { return eintraege; },"
    + "  rir: function (wert) { gewaehlterRir = wert; },"
    + "  satzFertig: satzFertig,"
    // Wie das Sheet "Satz bearbeiten": Eintrag und Platz wählen, dann Speichern oder Löschen
    + "  bearbeiten: function (eintragId, index, rir) { satzEintragId = eintragId; satzIndex = index; satzRir = rir; satzSpeichern(); },"
    + "  loeschen: function (eintragId, index) { satzEintragId = eintragId; satzIndex = index; satzLoeschen(); },"
    + "  tauschen: uebungTauschen,"
    + "  saetzeVon: saetzeVon, eintragSaetzeSchreiben: eintragSaetzeSchreiben"
    + "};";
  return new Function("Date", "felder", code)(TestDate, felder);
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

// Ein Satz im Trainingsmodus zur genannten Uhrzeit (UTC)
function satz(app, uhrzeit, gewicht, wdh) {
  jetzt = Date.parse("2026-10-15T" + uhrzeit + ".000Z");
  felder["t-feld-gewicht"] = gewicht;
  felder["t-feld-wdh"] = wdh;
  app.satzFertig();
}

function zeit(uhrzeit) {
  return "2026-10-15T" + uhrzeit + ".000Z";
}

function zeiten(liste) {
  return liste.map(function (s) {
    return s.zeit;
  });
}

function platz(name, id) {
  return { name: name, uebungId: id, muskelgruppe: "Brust", zielSaetze: 3, zielWdh: 10, zielWdhMax: null, pause: null,
    saetze: [], eintragId: "", extraSatz: false, getauscht: [] };
}

// ---------- Eintragen ----------

// Ein älterer Eintrag ohne Zeiten liegt schon im Log
const ALT = { id: "e-alt", uebung: "Bankdrücken", uebungId: "bankdruecken-lh", muskelgruppe: "Brust", datum: "2026-10-01T18:00:00.000Z",
  saetze: 2, gewicht: 80, wdh: 10, einzelsaetze: [{ gewicht: 80, wdh: 10 }, { gewicht: 80, wdh: 8, rir: 2 }] };
const app = umgebung([ALT]);
app.starten({ routineId: "r1", routineName: "Push", index: 0, erledigt: [], gestartet: zeit("17:55:00"),
  uebungen: [platz("Bankdrücken", "bankdruecken-lh"), platz("Kniebeuge", "kniebeuge")] });

satz(app, "18:00:00", 80, 10);
app.rir(2);
satz(app, "18:02:30", 80, 8);
app.rir(null);
satz(app, "18:05:00", 80, 6);

const t = app.training();
const eintragId = t.uebungen[0].eintragId;
function eintrag() {
  return app.eintraege().find(function (e) {
    return e.id === eintragId;
  });
}
pruefe("Eintragen: drei Sätze mit ihrer Zeit im Eintrag", zeiten(eintrag().einzelsaetze), [zeit("18:00:00"), zeit("18:02:30"), zeit("18:05:00")]);
pruefe("Eintragen: dieselben Zeiten am Platz des Trainings", zeiten(t.uebungen[0].saetze), [zeit("18:00:00"), zeit("18:02:30"), zeit("18:05:00")]);
pruefe("Eintragen: RIR bleibt neben der Zeit", eintrag().einzelsaetze[1], { gewicht: 80, wdh: 8, rir: 2, zeit: zeit("18:02:30") });
pruefe("Eintragen: saetzeVon gibt die Zeit mit", app.saetzeVon(eintrag())[0], { gewicht: 80, wdh: 10, rir: null, zeit: zeit("18:00:00") });
pruefe("Eintragen: Datum des Eintrags ist der erste Satz", eintrag().datum, zeit("18:00:00"));

// ---------- Bearbeiten ----------

jetzt = Date.parse("2026-10-15T19:30:00.000Z");
felder["s-feld-gewicht"] = 85;
felder["s-feld-wdh"] = 9;
app.bearbeiten(eintragId, 1, 1);
pruefe("Bearbeiten: Werte geändert, Zeit bleibt", eintrag().einzelsaetze[1], { gewicht: 85, wdh: 9, rir: 1, zeit: zeit("18:02:30") });
pruefe("Bearbeiten: Platz des Trainings hat dieselben Zeiten", zeiten(t.uebungen[0].saetze), [zeit("18:00:00"), zeit("18:02:30"), zeit("18:05:00")]);

// Nur RIR ändern (Gewicht im Feld wie gespeichert)
felder["s-feld-gewicht"] = 80;
felder["s-feld-wdh"] = 10;
app.bearbeiten(eintragId, 0, 3);
pruefe("Bearbeiten nur RIR: Zeit bleibt", eintrag().einzelsaetze[0], { gewicht: 80, wdh: 10, rir: 3, zeit: zeit("18:00:00") });

// ---------- Löschen ----------

app.loeschen(eintragId, 0);
pruefe("Löschen: die anderen Sätze behalten ihre Zeit", zeiten(eintrag().einzelsaetze), [zeit("18:02:30"), zeit("18:05:00")]);
pruefe("Löschen: Platz des Trainings ebenso", zeiten(t.uebungen[0].saetze), [zeit("18:02:30"), zeit("18:05:00")]);

// ---------- Tauschen ----------

app.tauschen("Schrägbankdrücken", "Brust", "schraegbankdruecken-lh");
pruefe("Tauschen: Sätze der alten Übung liegen mit Zeit bei den getauschten", zeiten(t.uebungen[0].getauscht[0].saetze), [zeit("18:02:30"), zeit("18:05:00")]);
satz(app, "18:10:00", 60, 10);
const neuId = t.uebungen[0].eintragId;
pruefe("Tauschen: neue Übung bekommt eigene Zeit", zeiten(app.eintraege().find(function (e) {
  return e.id === neuId;
}).einzelsaetze), [zeit("18:10:00")]);

// Während die alte Übung weggetauscht ist, einen ihrer Sätze bearbeiten
felder["s-feld-gewicht"] = 82.5;
felder["s-feld-wdh"] = 9;
app.bearbeiten(eintragId, 1, null);
pruefe("Tauschen: Bearbeiten einer weggetauschten Übung behält die Zeit", zeiten(t.uebungen[0].getauscht[0].saetze), [zeit("18:02:30"), zeit("18:05:00")]);

app.tauschen("Bankdrücken", "Brust", "bankdruecken-lh");
pruefe("Zurücktauschen: Sätze kommen mit Zeit zurück", zeiten(t.uebungen[0].saetze), [zeit("18:02:30"), zeit("18:05:00")]);
satz(app, "18:12:00", 80, 8);
pruefe("Zurücktauschen: weiterer Satz hängt sich mit Zeit an", zeiten(eintrag().einzelsaetze), [zeit("18:02:30"), zeit("18:05:00"), zeit("18:12:00")]);

// ---------- Ältere Einträge ohne Zeit ----------

const altVorher = JSON.stringify(ALT);
const altJetzt = app.eintraege().find(function (e) {
  return e.id === "e-alt";
});
pruefe("Alter Eintrag: unberührt", JSON.stringify(altJetzt), altVorher);
pruefe("Alter Eintrag: saetzeVon ohne Feld zeit", app.saetzeVon(altJetzt)[0], { gewicht: 80, wdh: 10, rir: null });
felder["s-feld-gewicht"] = 80;
felder["s-feld-wdh"] = 12;
app.bearbeiten("e-alt", 0, null);
pruefe("Alter Eintrag: nach dem Bearbeiten weiter ohne zeit", altJetzt.einzelsaetze, [{ gewicht: 80, wdh: 12 }, { gewicht: 80, wdh: 8, rir: 2 }]);

// Gemischte Liste: nur die Sätze mit Zeit tragen eine
const gemischt = {};
app.eintragSaetzeSchreiben(gemischt, [{ gewicht: 50, wdh: 5 }, { gewicht: 50, wdh: 5, zeit: zeit("18:20:00") }]);
pruefe("Gemischt: zeit nur dort, wo sie war", gemischt.einzelsaetze, [{ gewicht: 50, wdh: 5 }, { gewicht: 50, wdh: 5, zeit: zeit("18:20:00") }]);

// Einträge aus "Übung eintragen" haben keine einzelnen Sätze und damit keine Zeit
pruefe("Eintrag ohne einzelne Sätze: keine zeit", app.saetzeVon({ gewicht: 60, wdh: 10, saetze: 1 }), [{ gewicht: 60, wdh: 10, rir: null }]);

console.log(fehler === 0 ? "\nAlle Tests bestanden." : "\n" + fehler + " Test(s) fehlgeschlagen.");
process.exit(fehler === 0 ? 0 : 1);
