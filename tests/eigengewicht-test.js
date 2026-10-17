// Test: Eine gelöschte eigene Eigengewicht-Übung rechnet für ihre alten Einträge weiter mit dem Körpergewicht.
// Starten mit: node tests/eigengewicht-test.js
// Die Datei gehört nicht zur App. Sie holt sich die Funktionen direkt aus der app.js, dazu die ganze
// uebungen.js und raenge.js, und lässt sie mit einem nachgebauten Speicher laufen.

import fs from "node:fs";

// Die Dateien können Windows-Zeilenenden (CRLF) oder LF haben, CRLF wird zu LF. Sonst findet funktionHolen nichts.
const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const uebungenQuelle = fs.readFileSync(new URL("../uebungen.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const raengeQuelle = fs.readFileSync(new URL("../raenge.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");

// Schneidet eine Funktion aus der app.js aus: von "function name(" bis zur schließenden Klammer auf derselben Einrückung.
// Mit darfFehlen kommt "" zurück, wenn es sie nicht gibt (so läuft der Test auch gegen die app.js vor dem Fix).
function funktionHolen(name, darfFehlen) {
  const start = quelle.indexOf("  function " + name + "(");
  const ende = quelle.indexOf("\n  }\n", start);
  if (start === -1 || ende === -1) {
    if (darfFehlen) {
      return "";
    }
    throw new Error("Funktion " + name + " nicht in der app.js gefunden");
  }
  return quelle.slice(start, ende + 5);
}

// Holt die Zeile einer Konstante aus der app.js, z. B. "const KRAFT_TAGE = 30;"
function konstanteHolen(name) {
  const treffer = quelle.match(new RegExp("\\n  (const " + name + " = [^\\n]*;)\\n"));
  if (!treffer) {
    throw new Error("Konstante " + name + " nicht in der app.js gefunden");
  }
  return treffer[1];
}

// Diese Funktionen laufen so, wie sie in der app.js stehen
const ECHT = ["notizenBereinigen", "gespeichertLesen", "sicherSpeichern", "speicherFehlerMelden", "nameSaeubern", "nameSchluessel", "istFesteId",
  "eigeneUebungBereinigen", "eigeneUebungenAufnehmen", "eigeneUebungenEintragen", "eigeneUebungenSpeichern",
  "uebungMitNamen", "bereichName", "jedeGespeicherteUebung", "gespeicherteUebungenSichern", "eigeneUebungZuweisen",
  "selbstNameUebertragen", "selbstLoeschenFragen", "gleicheUebung", "tagSchluessel", "saetzeVon", "hatDatum",
  "istEigengewicht", "koerperZusatz", "verlaufPunkte", "besterSatzIndex", "trainierteUebungen", "koerperfettVon",
  "gewichteSpeichern", "gewichtMessungen", "koerpergewichtAm", "trainingBereinigen", "gewichteImportieren",
  "eigeneImportieren", "backupText", "backupLesen", "eintragSchluessel", "importAusfuehren"];

// Seit Version 141: Aufwärmsätze (W). Die Helfer laufen echt, die zwei Merker der Seite stehen davor.
ECHT.push("istAufwaermen", "arbeitsAnzahl", "arbeitsSaetzeVon", "wKnopfAnzeigen", "arbeitsIndex", "satzKennung", "satzKennungElement");
const funktionHolenOhneW = funktionHolen;
funktionHolen = function (name) {
  return (name === "istAufwaermen" ? "\n  let aufwaermenGewaehlt = false; let satzW = false;" : "") + funktionHolenOhneW(name);
};

// Die gibt es erst seit dem Fix
const NEU = ["geloeschteEigengewichtAufnehmen"];

// Die zeichnen nur oder gehören zu anderen Teilen der App: Hier tun sie nichts
const LEER = ["txt", "txtAnzahl", "datenMeldung", "listeZuordnen", "eintragIdsErgaenzen", "einstellungenUebernehmen",
  "profilUebernehmen", "routinenImportieren", "trainingsImportieren", "einstellungenSpeichern", "rangPruefen", "anzeigen",
  "letztesMalAnzeigen", "einstWerteAnzeigen", "routinenSpeichern", "trainingMerken", "selbstFormSchliessen",
  "uebungenNeuAnzeigen", "sheetAnsichtZeigen", "neueId"];

// Baut die App-Teile mit einem eigenen Speicher zusammen und liest ihn wie beim Start der App
function umgebung(inhalt) {
  const daten = Object.assign({}, inhalt);
  const localStorage = {
    getItem: function (schluessel) {
      return schluessel in daten ? daten[schluessel] : null;
    },
    setItem: function (schluessel, wert) {
      daten[schluessel] = String(wert);
    },
    removeItem: function (schluessel) {
      delete daten[schluessel];
    }
  };
  const document = {
    getElementById: function () {
      return { textContent: "", classList: { add: function () {}, remove: function () {} } };
    }
  };

  let code = uebungenQuelle + raengeQuelle
    + "let sprache = 'de'; let startFertig = true; let speicherFehlerGemeldet = false; let speicherFehlerWartet = false;"
    + "const UEBUNG_NACH_ID = {}; const GRUPPE_NACH_ID = {}; const FESTER_NAME = Object.create(null);"
    + "for (let i = 0; i < MUSKELGRUPPEN.length; i++) { GRUPPE_NACH_ID[MUSKELGRUPPEN[i].id] = MUSKELGRUPPEN[i]; }"
    + "for (let i = 0; i < UEBUNGEN.length; i++) { UEBUNG_NACH_ID[UEBUNGEN[i].id] = UEBUNGEN[i]; }"
    + konstanteHolen("SELBST_PRAEFIX") + konstanteHolen("SELBST_NAME_MAX") + konstanteHolen("KRAFT_TAGE")
    + konstanteHolen("FETT_MIN") + konstanteHolen("FETT_MAX")
    + "let eintraege = []; let routinen = []; let wochenplan = []; let trainings = []; let koerpergewicht = [];"
    + "let eigeneUebungen = []; let selbstListe = []; let geloeschteEigengewicht = [];"
    + "let bearbeiteteRoutine = null; let laufendesTraining = null; let selbstBearbeitet = null;"
    + "let gewaehlteUebungId = ''; let gewaehlteUebung = ''; let gewaehlteGruppe = '';"
    + "let einstellungen = {}; let profil = {};"
    + "let importEintraege = []; let importRoutinen = null; let importWochenplan = null; let importTrainings = null;"
    + "let importGewichte = null; let importEinstellungen = null; let importProfil = null; let importEigene = null;"
    + "let importGeloeschte = null;"
    // Seit Version 141: Notizen je Übung im Backup, Auszeiten in den Einstellungen
    + "let notizen = {}; let importNotizen = null;" + konstanteHolen("AUSZEIT_ARTEN")
    // Eine Rückfrage gilt sofort als bestätigt: Der erste Knopf wird gedrückt
    + "function frageZeigen(titel, text, knoepfe) { if (knoepfe[0].aktion) { knoepfe[0].aktion(); } }"
    + "function rirLesen() { return null; }"
    + "function einstellungenBereinigen() { return {}; } function profilBereinigen() { return {}; }";
  for (let i = 0; i < LEER.length; i++) {
    code += "function " + LEER[i] + "() { return ''; }";
  }
  for (let i = 0; i < ECHT.length; i++) {
    code += funktionHolen(ECHT[i]);
  }
  for (let i = 0; i < NEU.length; i++) {
    code += funktionHolen(NEU[i], true);
  }

  // Der Start der App: den Speicher lesen
  code += "eintraege = gespeichertLesen('eintraege', []); koerpergewicht = gespeichertLesen('koerpergewicht', []);"
    + "eigeneUebungenAufnehmen(gespeichertLesen('eigeneUebungen', []));"
    + "if (typeof geloeschteEigengewichtAufnehmen === 'function') {"
    + "  geloeschteEigengewichtAufnehmen(gespeichertLesen('geloeschteEigengewicht', []));"
    + "}"
    + "function runden(punkte) { return punkte.map(function (p) { return Math.round(p.wert * 100) / 100; }); }"
    + "return {"
    // Legt eine eigene Übung an, auf dem Weg wie selbstSpeichern
    + "  anlegen: function (u) { eigeneUebungen.push(u); eigeneUebungenSpeichern(); },"
    + "  eintragen: function (liste) { eintraege = eintraege.concat(liste); sicherSpeichern('eintraege', eintraege); },"
    + "  wiegen: function (liste) { koerpergewicht = koerpergewicht.concat(liste); gewichteSpeichern(); },"
    // Löscht eine eigene Übung, auf dem Weg wie der Knopf 'Löschen' im Formular
    + "  loeschen: function (id) {"
    + "    for (let i = 0; i < eigeneUebungen.length; i++) { if (eigeneUebungen[i].id === id) { selbstBearbeitet = eigeneUebungen[i]; } }"
    + "    selbstLoeschenFragen(); selbstBearbeitet = null;"
    + "  },"
    // Stellt den Bereich einer eigenen Übung um, auf dem Weg wie selbstSpeichern beim Bearbeiten
    + "  bereichSetzen: function (id, bereich) {"
    + "    for (let i = 0; i < eigeneUebungen.length; i++) { if (eigeneUebungen[i].id === id) { eigeneUebungen[i].bereich = bereich; } }"
    + "    eigeneUebungenSpeichern();"
    + "  },"
    + "  gibtEs: function (id) { return Boolean(UEBUNG_NACH_ID[id]); },"
    // Alles, was die App aus den Einträgen einer Übung rechnet: Diagramm (1RM, Volumen, schwerstes Gewicht),
    // Rang (Punkte und Fortschritts-Rang), Rekorde über alle Übungen und der beste Satz des letzten Eintrags
    + "  werte: function (name, id) {"
    + "    const rang = verlaufPunkte(name, id, 'rang');"
    + "    const f = fortschrittRang(rang, Date.now());"
    + "    const listen = trainierteUebungen().map(function (u) { return verlaufPunkte(u.name, u.id, 'rang'); });"
    + "    let letzter = null;"
    + "    for (let i = 0; i < eintraege.length; i++) { if (gleicheUebung(eintraege[i], name, id)) { letzter = eintraege[i]; } }"
    + "    return {"
    + "      eigengewicht: istEigengewicht(id),"
    + "      diagramm1RM: runden(verlaufPunkte(name, id, '1rm')),"
    + "      diagrammVolumen: runden(verlaufPunkte(name, id, 'volumen')),"
    + "      diagrammSchwer: runden(verlaufPunkte(name, id, 'schwer')),"
    + "      rangPunkte: runden(rang),"
    + "      fortschrittRP: f ? f.rp : null,"
    + "      rekorde: rekorde(listen).length,"
    + "      besterSatz: letzter ? besterSatzIndex(letzter) : null"
    + "    };"
    + "  },"
    + "  backup: function () { return backupText(); },"
    + "  importieren: function (text, art) { backupLesen(text); importAusfuehren(art); },"
    + "  eintraege: function () { return eintraege; }"
    + "};";

  const app = new Function("localStorage", "document", code)(localStorage, document);
  app.speicher = daten;
  return app;
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

// ---------- Testdaten ----------

// Ein Zeitpunkt vor so vielen Tagen, mittags
function vorTagen(tage) {
  const d = new Date();
  d.setDate(d.getDate() - tage);
  d.setHours(12, 0, 0, 0);
  return d.toISOString();
}

const DIPS = { id: "selbst-test-dips", name: "Ring Dips Test", bereich: "eigen", haupt: "brust", hilfs: [] };
const KABEL = { id: "selbst-test-kabel", name: "Kabel Test", bereich: "maschine", haupt: "brust", hilfs: [] };

function eintrag(id, uebung, tage, saetze) {
  return { id: id, uebung: uebung.name, uebungId: uebung.id, muskelgruppe: "Brust", datum: vorTagen(tage), einzelsaetze: saetze };
}

// Drei Trainingstage Dips: ohne Zusatzgewicht, mit 5 kg, mit 10 kg. Dazu zwei Tage an der Maschine.
const EINTRAEGE = [
  eintrag("e1", DIPS, 60, [{ gewicht: 0, wdh: 8 }, { gewicht: 0, wdh: 6 }]),
  eintrag("e2", DIPS, 40, [{ gewicht: 5, wdh: 8 }]),
  eintrag("e3", DIPS, 10, [{ gewicht: 10, wdh: 6 }, { gewicht: 10, wdh: 5 }]),
  eintrag("e4", KABEL, 60, [{ gewicht: 40, wdh: 10 }]),
  eintrag("e5", KABEL, 10, [{ gewicht: 45, wdh: 10 }])
];
const GEWICHTE = [{ datum: vorTagen(70), gewicht: 80 }, { datum: vorTagen(15), gewicht: 82 }];

// Eine App mit beiden eigenen Übungen, ihren Einträgen und dem Körpergewicht
function gefuellt() {
  const app = umgebung({});
  app.anlegen(JSON.parse(JSON.stringify(DIPS)));
  app.anlegen(JSON.parse(JSON.stringify(KABEL)));
  app.eintragen(JSON.parse(JSON.stringify(EINTRAEGE)));
  app.wiegen(JSON.parse(JSON.stringify(GEWICHTE)));
  return app;
}

// ---------- Ausgangslage ----------

let app = gefuellt();
const dipsVorher = app.werte(DIPS.name, DIPS.id);
const kabelVorher = app.werte(KABEL.name, KABEL.id);
const eintraegeVorher = JSON.stringify(app.eintraege());

pruefe("vor dem Löschen: Dips sind Eigengewicht", dipsVorher.eigengewicht, true);
// Von Hand gerechnet: Tag 1 80 kg × (1 + 8/30), Tag 2 (5 + 80) × (1 + 8/30), Tag 3 (10 + 82) × (1 + 6/30)
pruefe("vor dem Löschen: 1RM mit Körpergewicht", dipsVorher.diagramm1RM, [101.33, 107.67, 110.4]);
pruefe("vor dem Löschen: zwei Rekorde bei den Dips, einer an der Maschine", dipsVorher.rekorde, 3);
pruefe("vor dem Löschen: Maschine ist kein Eigengewicht", kabelVorher.eigengewicht, false);

// ---------- Löschen ----------

app.loeschen(DIPS.id);
pruefe("nach dem Löschen: Die Übung ist weg", app.gibtEs(DIPS.id), false);
pruefe("nach dem Löschen: Die Einträge sind unverändert", JSON.stringify(app.eintraege()), eintraegeVorher);
pruefe("nach dem Löschen: Diagramm, Rang und Rekorde der Dips wie vorher", app.werte(DIPS.name, DIPS.id), dipsVorher);

app.loeschen(KABEL.id);
pruefe("gelöschte Maschinen-Übung: Werte wie vorher, weiter ohne Körpergewicht", app.werte(KABEL.name, KABEL.id), kabelVorher);

// ---------- Neustart der App mit demselben Speicher ----------

const neuGestartet = umgebung(app.speicher);
pruefe("nach dem Neustart: Werte der Dips wie vorher", neuGestartet.werte(DIPS.name, DIPS.id), dipsVorher);

// ---------- Backup nach dem Löschen: exportieren und in eine leere App holen ----------

const backupNeu = app.backup();
let ziel = umgebung({});
ziel.importieren(backupNeu, "ersetzen");
pruefe("neues Backup, ersetzen: Werte der Dips wie vorher", ziel.werte(DIPS.name, DIPS.id), dipsVorher);
pruefe("neues Backup, ersetzen: Maschine wie vorher", ziel.werte(KABEL.name, KABEL.id), kabelVorher);

ziel = umgebung({});
ziel.importieren(backupNeu, "ergaenzen");
pruefe("neues Backup, ergänzen: Werte der Dips wie vorher", ziel.werte(DIPS.name, DIPS.id), dipsVorher);
pruefe("neues Backup: nach dem Neustart weiter wie vorher", umgebung(ziel.speicher).werte(DIPS.name, DIPS.id), dipsVorher);

// ---------- Alte Backups (Version 10, ohne die Liste der gelöschten Übungen) ----------

// Mit der Übung: Sie ist nicht gelöscht, alles rechnet wie in der Ausgangslage
const altMitUebung = JSON.stringify({
  app: "gymstead", version: 10, exportiert: vorTagen(5), profil: {}, eintraege: EINTRAEGE, eigeneUebungen: [DIPS, KABEL],
  routinen: [], wochenplan: ["", "", "", "", "", "", ""], trainings: [], koerpergewicht: GEWICHTE, einstellungen: {}
});
ziel = umgebung({});
ziel.importieren(altMitUebung, "ersetzen");
pruefe("altes Backup mit der Übung, ersetzen: 5 Einträge", ziel.eintraege().length, 5);
pruefe("altes Backup mit der Übung, ersetzen: Werte der Dips wie vorher", ziel.werte(DIPS.name, DIPS.id), dipsVorher);
ziel = umgebung({});
ziel.importieren(altMitUebung, "ergaenzen");
pruefe("altes Backup mit der Übung, ergänzen: Werte der Dips wie vorher", ziel.werte(DIPS.name, DIPS.id), dipsVorher);

// Ein altes Backup in eine App, in der die Übung schon gelöscht ist: Es bringt sie zurück, sie gilt wieder
ziel = umgebung(app.speicher);
ziel.importieren(altMitUebung, "ergaenzen");
pruefe("altes Backup in die App nach dem Löschen: Die Übung ist wieder da", ziel.gibtEs(DIPS.id), true);
pruefe("altes Backup in die App nach dem Löschen: Werte wie vorher, nichts doppelt", ziel.werte(DIPS.name, DIPS.id), dipsVorher);

// Die zurückgeholte Übung wird zur Maschinen-Übung und dann wieder gelöscht: Jetzt gilt der neue Bereich
ziel.bereichSetzen(DIPS.id, "maschine");
ziel.loeschen(DIPS.id);
pruefe("zurückgeholt, auf Maschine gestellt, gelöscht: kein Eigengewicht mehr", ziel.werte(DIPS.name, DIPS.id).eigengewicht, false);

// Ohne die Übung: Sie wurde vor dem Fix gelöscht. Das Backup lässt sich lesen, aber niemand weiß mehr,
// dass es Eigengewicht war: Diese Einträge rechnen ohne Körpergewicht.
const altOhneUebung = JSON.stringify({
  app: "gymstead", version: 10, exportiert: vorTagen(5), profil: {}, eintraege: EINTRAEGE, eigeneUebungen: [],
  routinen: [], wochenplan: ["", "", "", "", "", "", ""], trainings: [], koerpergewicht: GEWICHTE, einstellungen: {}
});
ziel = umgebung({});
ziel.importieren(altOhneUebung, "ersetzen");
pruefe("altes Backup, Übung schon früher gelöscht: 5 Einträge", ziel.eintraege().length, 5);
pruefe("altes Backup, Übung schon früher gelöscht: kein Eigengewicht", ziel.werte(DIPS.name, DIPS.id).eigengewicht, false);
pruefe("altes Backup, Übung schon früher gelöscht: 1RM ohne Körpergewicht", ziel.werte(DIPS.name, DIPS.id).diagramm1RM, [0, 6.33, 12]);

// Ganz altes Backup: nur eine Liste von Einträgen
ziel = umgebung({});
ziel.importieren(JSON.stringify(EINTRAEGE), "ersetzen");
pruefe("Backup als reine Liste: 5 Einträge", ziel.eintraege().length, 5);

console.log(fehler === 0 ? "\nAlle Tests bestanden." : "\n" + fehler + " Test(s) fehlgeschlagen.");
process.exit(fehler === 0 ? 0 : 1);
