// Test: Backups lassen sich unabhängig von ihrer Kennung "app" importieren. Neue Backups tragen seit Version 115
// die Kennung "korund", ältere "gymstead" oder "hybridslife", ganz alte gar keine.
// Starten mit: node tests/backup-kennung-test.js
// Die Datei gehört nicht zur App. Der nachgebaute Speicher und die Testdaten sind eine Kopie aus der
// tests/eigengewicht-test.js, die Funktionen holt sie direkt aus der app.js.

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8");
const uebungenQuelle = fs.readFileSync(new URL("../uebungen.js", import.meta.url), "utf8");
const raengeQuelle = fs.readFileSync(new URL("../raenge.js", import.meta.url), "utf8");

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
const ECHT = ["gespeichertLesen", "sicherSpeichern", "speicherFehlerMelden", "nameSaeubern", "nameSchluessel", "istFesteId",
  "eigeneUebungBereinigen", "eigeneUebungenAufnehmen", "eigeneUebungenEintragen", "eigeneUebungenSpeichern",
  "uebungMitNamen", "bereichName", "jedeGespeicherteUebung", "gespeicherteUebungenSichern", "eigeneUebungZuweisen",
  "selbstNameUebertragen", "selbstLoeschenFragen", "gleicheUebung", "tagSchluessel", "saetzeVon", "hatDatum",
  "istEigengewicht", "koerperZusatz", "verlaufPunkte", "besterSatzIndex", "trainierteUebungen", "koerperfettVon",
  "gewichteSpeichern", "gewichtMessungen", "koerpergewichtAm", "trainingBereinigen", "gewichteImportieren",
  "eigeneImportieren", "backupText", "backupLesen", "eintragSchluessel", "importAusfuehren"];

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

// ---------- Neues Backup: Kennung "korund", Backup-Version 11 ----------

const app = gefuellt();
const neu = JSON.parse(app.backup());
pruefe("neues Backup: Kennung korund", neu.app, "korund");
pruefe("neues Backup: Backup-Version 11", neu.version, 11);

// ---------- Alle vier Arten importieren, ersetzen und ergänzen ----------

function backupMit(kennung) {
  const daten = {
    version: 10, exportiert: vorTagen(5), profil: {}, eintraege: EINTRAEGE, eigeneUebungen: [DIPS, KABEL],
    routinen: [], wochenplan: ["", "", "", "", "", "", ""], trainings: [], koerpergewicht: GEWICHTE, einstellungen: {}
  };
  if (kennung !== null) {
    daten.app = kennung;
  }
  return JSON.stringify(daten);
}

const ARTEN = [
  { name: "hybridslife", text: backupMit("hybridslife") },
  { name: "gymstead", text: backupMit("gymstead") },
  { name: "korund", text: app.backup() },
  { name: "ohne Kennung", text: backupMit(null) }
];
const dipsSoll = app.werte(DIPS.name, DIPS.id);

for (let i = 0; i < ARTEN.length; i++) {
  const art = ARTEN[i];
  const arten = ["ersetzen", "ergaenzen"];
  for (let k = 0; k < arten.length; k++) {
    const ziel = umgebung({});
    ziel.importieren(art.text, arten[k]);
    pruefe("Backup " + art.name + ", " + arten[k] + ": 5 Einträge", ziel.eintraege().length, 5);
    pruefe("Backup " + art.name + ", " + arten[k] + ": Einträge unverändert", JSON.stringify(ziel.eintraege()), JSON.stringify(EINTRAEGE));
    pruefe("Backup " + art.name + ", " + arten[k] + ": Werte der Dips wie in der Ausgangs-App", ziel.werte(DIPS.name, DIPS.id), dipsSoll);
  }
}

console.log(fehler === 0 ? "\nAlle Tests bestanden." : "\n" + fehler + " Test(s) fehlgeschlagen.");
process.exit(fehler === 0 ? 0 : 1);
