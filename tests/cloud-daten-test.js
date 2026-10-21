// Prüft das Cloud-Backup ohne Gesundheitsfelder (seit Version 178): cloudDaten() lässt Körperfett, Notizen, Rückblick-Antworten
// und die Einstellungen, die der Import nicht übernimmt (Einschränkungen, Zielgewicht, Auszeiten, Geräte …), ganz weg
// (nicht leer), die Backup-Datei (backupText) bleibt vollständig, und das Holen aus der Cloud behält diese Werte auf dem Gerät.
// Der Weg ist echt: backupText → cloudDaten → JSON → backupLesen → importAusfuehren und gewichteImportieren aus der app.js,
// nur Anzeige und Speicher sind hier Attrappen. Starten mit: node tests/cloud-daten-test.js
const fs = require("fs");
const path = require("path");
const quelle = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8").replace(/\r\n/g, "\n");

function funktionHolen(name) {
  const t = new RegExp("\\n( +)function " + name + "\\(").exec(quelle);
  if (!t) {
    throw new Error("Funktion " + name + " fehlt");
  }
  const ende = quelle.indexOf("\n" + t[1] + "}\n", t.index + 1);
  return quelle.slice(t.index, ende + t[1].length + 3);
}
function konstanteHolen(name) {
  const t = new RegExp("\\n  const " + name + " = [\\s\\S]*?;\\n").exec(quelle);
  if (!t) {
    throw new Error("Konstante " + name + " fehlt");
  }
  return t[0];
}

let pruefungen = 0;
let fehler = 0;
function pruefe(name, ok) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name);
  }
}

const ECHT = ["cloudDaten", "backupText", "backupLesen", "importAusfuehren", "gewichteImportieren", "fettVonHierBehalten",
  "einstellungenBereinigen", "einstellungenUebernehmen", "eintragSchluessel", "hatDatum", "koerperfettVon", "tagSchluessel", "pauseLesen"];
const KONST = ["CLOUD_OHNE", "CLOUD_EINSTELLUNGEN", "AUSZEIT_ARTEN", "PAUSE_SCHRITT", "PAUSE_MAX"];

// Baut ein Gerät mit eigenem Stand. Die Attrappen tun nichts, außer was der Test braucht.
function geraet(stand) {
  const code = "let profil = " + JSON.stringify(stand.profil || {}) + "; let eintraege = " + JSON.stringify(stand.eintraege || []) + ";"
    + "let eigeneUebungen = []; let geloeschteEigengewicht = []; let notizen = " + JSON.stringify(stand.notizen || {}) + ";"
    + "let coach = " + JSON.stringify(stand.coach || {}) + "; let routinen = []; let wochenplan = [null,null,null,null,null,null,null]; let trainings = [];"
    + "let koerpergewicht = " + JSON.stringify(stand.koerpergewicht || []) + "; let einstellungen = " + JSON.stringify(stand.einstellungen || {}) + ";"
    + "let importEintraege = []; let importRoutinen = null; let importWochenplan = null; let importTrainings = null; let importGewichte = null;"
    + "let importEinstellungen = null; let importProfil = null; let importEigene = null; let importGeloeschte = null; let importNotizen = null; let importCoach = null; let importOhne = [];"
    + "const FETT_MIN = 3; const FETT_MAX = 60;"
    + "const document = { getElementById: function () { return { textContent: '', classList: { add: function () {}, remove: function () {} } }; } };"
    + "function txt(k) { return k; } function datenMeldung() {} function listeZuordnen() {} function eintragIdsErgaenzen() {}"
    + "function coachBereinigen(c) { return JSON.parse(JSON.stringify(c)); } function notizenBereinigen(n) { return JSON.parse(JSON.stringify(n)); }"
    + "function profilBereinigen(p) { return JSON.parse(JSON.stringify(p)); } function trainingBereinigen(t) { return t; } function routineBereinigen(r) { return r; }"
    + "function spracheBekannt(s) { return s === 'de' || s === 'en'; } function kraftUebungBereinigen() { return null; } function rangMerkerBereinigen(m) { return m; }"
    + "function statusAnzeigen() {} function einstellungenSpeichern() {} function designAnwenden() {} function designAnzeigen() {} function gewichtEinheitSetzen(e) { einstellungen.gewichtEinheit = e; }"
    + "function pauseStandardAnzeigen() {} function einheitenAnzeigen() {} function spracheSetzen(s) { einstellungen.sprache = s; } function profilUebernehmen() {}"
    + "function eigeneImportieren() { return ''; } function geloeschteEigengewichtAufnehmen() {} function sicherSpeichern() {} function coachSpeichern() {}"
    + "function routinenImportieren() { return ''; } function trainingsImportieren() { return ''; } function gewichteSpeichern() {} function rangPruefen() {}"
    + "function anzeigen() {} function letztesMalAnzeigen() {} function einstWerteAnzeigen() {}"
    + KONST.map(konstanteHolen).join("") + ECHT.map(funktionHolen).join("")
    + "return { cloudDaten, backupText, backupLesen, importAusfuehren, stand: function () { return { eintraege, notizen, coach, koerpergewicht, einstellungen }; } };";
  return new Function(code)();
}

const tag = (n) => new Date(2026, 9, n, 12).toISOString();
const A = geraet({
  profil: { name: "A", geburtstag: "1990-01-01" },
  eintraege: [{ id: "e1", uebung: "Bankdrücken", datum: tag(1), gewicht: 80, wdh: 8, saetze: 3 }],
  notizen: { "bankdruecken-lh": "Schulter zwickt" },
  coach: { ziel: "muskel", tage: 3, rueckblick: { am: 1, energie: "muede", menge: "zuViel" }, letzteEntlastung: 5 },
  koerpergewicht: [{ datum: tag(1), gewicht: 80, koerperfett: 18 }, { datum: tag(2), koerperfett: 17.5 }, { datum: tag(3), gewicht: 79.5 }],
  einstellungen: { pauseSekunden: 120, sprache: "de", design: "dunkel", gewichtEinheit: "kg", rangMerker: { x: 1 },
    auszeiten: [{ art: "krank", von: 1, bis: 2 }], einschraenkungen: [{ stelle: "knie", seite: "links", stufe: "mittel" }],
    zielGewicht: 76, geraete: { ort: "gym" }, rueckblickAm: 7, rueckblickAnzahl: 1, steigern: true }
});

// ---- Nutzlast ----
const nutz = A.cloudDaten();
const nutzText = JSON.stringify(Object.assign({}, nutz, { cloudOhne: undefined }));
pruefe("Nutzlast ohne Körperfett", !/koerperfett/.test(nutzText));
pruefe("Nutzlast ohne Notizen (Schlüssel fehlt)", !("notizen" in nutz) && !/Schulter zwickt/.test(nutzText));
pruefe("Nutzlast ohne Einschränkungen, Zielgewicht, Auszeiten, Geräte, Rückblick-Datum", !/einschraenkungen|zielGewicht|auszeiten|geraete|rueckblickAm|rueckblickAnzahl|krank/.test(nutzText));
pruefe("Nutzlast ohne Rückblick-Antworten", !("rueckblick" in nutz.coach) && !/muede|zuViel/.test(nutzText));
pruefe("Nutzlast: übrige Coach-Felder bleiben", nutz.coach.ziel === "muskel" && nutz.coach.tage === 3 && nutz.coach.letzteEntlastung === 5);
pruefe("Nutzlast: Einstellungen nur die übernommenen", JSON.stringify(Object.keys(nutz.einstellungen).sort()) === JSON.stringify(["design", "gewichtEinheit", "pauseSekunden", "rangMerker", "sprache"]));
pruefe("Nutzlast: Körpergewicht nur Gewicht unter koerpergewichtCloud", !("koerpergewicht" in nutz) && JSON.stringify(nutz.koerpergewichtCloud) === JSON.stringify([{ datum: tag(1), gewicht: 80 }, { datum: tag(3), gewicht: 79.5 }]));
pruefe("Nutzlast: Merker cloudOhne", Array.isArray(nutz.cloudOhne) && ["koerperfett", "notizen", "rueckblick", "einstellungen"].every((k) => nutz.cloudOhne.indexOf(k) !== -1));
pruefe("Nutzlast: Einträge, Profil, Version 13 wie die Datei", nutz.eintraege.length === 1 && nutz.profil.name === "A" && nutz.version === 13);
pruefe("cloudDaten ändert den Stand auf dem Gerät nicht", A.stand().coach.rueckblick.energie === "muede" && A.stand().koerpergewicht[0].koerperfett === 18 && A.stand().einstellungen.einschraenkungen.length === 1);

// ---- Backup-Datei bleibt vollständig ----
const datei = JSON.parse(A.backupText());
pruefe("Datei: Körperfett, Notizen, Einschränkungen, Rückblick enthalten", datei.koerpergewicht[0].koerperfett === 18 && datei.notizen["bankdruecken-lh"] === "Schulter zwickt"
  && datei.einstellungen.einschraenkungen.length === 1 && datei.coach.rueckblick.energie === "muede" && !("cloudOhne" in datei) && !("koerpergewichtCloud" in datei));

// ---- Holen aus der Cloud auf Gerät B mit „Ersetzen“ ----
function geraetB() {
  return geraet({
    eintraege: [{ id: "b1", uebung: "Kniebeuge", datum: tag(5), gewicht: 100, wdh: 5, saetze: 3 }],
    notizen: { "kniebeuge": "B-Notiz" },
    coach: { ziel: "kraft", rueckblick: { am: 9, energie: "gut", menge: "passt" } },
    koerpergewicht: [{ datum: tag(1), gewicht: 81, koerperfett: 20 }, { datum: tag(4), koerperfett: 19 }],
    einstellungen: { sprache: "en", auszeiten: [{ art: "urlaub", von: 3, bis: 4 }], einschraenkungen: [{ stelle: "schulter", seite: "rechts", stufe: "leicht" }], zielGewicht: 70 }
  });
}
const B = geraetB();
B.backupLesen(JSON.stringify(nutz));
B.importAusfuehren("ersetzen");
const b = B.stand();
pruefe("Ersetzen: Einträge aus der Cloud", b.eintraege.length === 1 && b.eintraege[0].id === "e1");
pruefe("Ersetzen: Notizen von B bleiben", b.notizen.kniebeuge === "B-Notiz" && !b.notizen["bankdruecken-lh"]);
pruefe("Ersetzen: Auszeiten, Einschränkungen, Zielgewicht von B bleiben", b.einstellungen.auszeiten[0].art === "urlaub" && b.einstellungen.einschraenkungen[0].stelle === "schulter" && b.einstellungen.zielGewicht === 70);
pruefe("Ersetzen: übernommene Einstellungen aus der Cloud", b.einstellungen.sprache === "de" && b.einstellungen.pauseSekunden === 120);
pruefe("Ersetzen: Coach aus der Cloud, Rückblick von B", b.coach.ziel === "muskel" && b.coach.rueckblick.energie === "gut" && b.coach.rueckblick.am === 9);
const kg = b.koerpergewicht.map((m) => JSON.stringify(m)).sort();
pruefe("Ersetzen: Gewichte aus der Cloud, Körperfett von B bleibt (" + kg.join(" ") + ")",
  b.koerpergewicht.length === 3
  && b.koerpergewicht.some((m) => m.datum === tag(1) && m.gewicht === 80 && m.koerperfett === 20)
  && b.koerpergewicht.some((m) => m.datum === tag(3) && m.gewicht === 79.5 && m.koerperfett === undefined)
  && b.koerpergewicht.some((m) => m.datum === tag(4) && m.gewicht === undefined && m.koerperfett === 19));

// ---- Ergänzen: nichts auf B geht verloren ----
const B2 = geraetB();
B2.backupLesen(JSON.stringify(nutz));
B2.importAusfuehren("ergaenzen");
const b2 = B2.stand();
pruefe("Ergänzen: beide Einträge, Körperfett von B unverändert", b2.eintraege.length === 2 && b2.koerpergewicht.some((m) => m.datum === tag(1) && m.gewicht === 81 && m.koerperfett === 20) && b2.koerpergewicht.some((m) => m.datum === tag(3)));
pruefe("Ergänzen: Coach und Rückblick von B unverändert", b2.coach.ziel === "kraft" && b2.coach.rueckblick.energie === "gut");

// ---- Altes Voll-Backup (Datei oder Cloud bis Version 177) lädt wie bisher ----
const B3 = geraetB();
B3.backupLesen(A.backupText());
B3.importAusfuehren("ersetzen");
const b3 = B3.stand();
pruefe("Voll-Backup Ersetzen: Körperfett und Notizen aus dem Backup wie bisher", b3.koerpergewicht.length === 3 && b3.koerpergewicht[0].koerperfett === 18 && b3.notizen["bankdruecken-lh"] === "Schulter zwickt" && b3.coach.rueckblick.energie === "muede");

// ---- Ein Cloud-Backup ab 178 in einer älteren App (V177): sie kennt koerpergewichtCloud nicht und lässt die Messungen liegen ----
pruefe("Ältere App findet kein koerpergewicht und ändert die Messungen nicht", !Array.isArray(nutz.koerpergewicht));

// ---- Die App lädt beim Hochladen cloudDaten, nicht die Datei ----
pruefe("cloudHochladen nutzt cloudDaten()", /upsert\(\{ user_id: nutzer, daten: cloudDaten\(\),/.test(quelle) && !/daten: JSON\.parse\(backupText\(\)\)/.test(quelle));

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
