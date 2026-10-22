// Datenintegrität beim Import (Audit Phase 12) über den echten Weg backupLesen → importAusfuehren → trainingsImportieren → cloudDaten
// aus der app.js. Nur Anzeige und Speicher sind Attrappen. Jeder Block reproduziert ein offenes Risiko aus Phase 11:
//   A Einträge ohne oder mit ungültigem Datum      B gleiche id, auf einem anderen Gerät bearbeitet (RIR, Satzgewicht)
//   C gleiche id, aber anderer Eintrag (andere Übung oder anderes Datum)   D trainings[].eintragIds nach neuer id
//   E Dubletten unabhängig von der Reihenfolge der Felder   F alte Backups (Formate vor Version 136 nur, soweit bekannt)
// Starten mit: node tests/import-integritaet-test.js
const fs = require("fs");
const path = require("path");
const quelle = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8").replace(/\r\n/g, "\n");

// Fehlt eine Funktion (z. B. auf einer älteren Version), bleibt sie leer: der Test läuft dann und zeigt die Fehler
function funktionHolen(name) {
  const t = new RegExp("\\n( +)function " + name + "\\(").exec(quelle);
  if (!t) {
    return "";
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
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

const ECHT = ["cloudDaten", "backupText", "backupLesen", "importAusfuehren", "gewichteImportieren", "fettVonHierBehalten", "eintragNurBekannt",
  "eintraegePruefen", "importPruefungText", "zahlUnmoeglich", "eintragInZukunft", "eintragFinden", "neueId", "inhaltText", "eintragIdsErgaenzen",
  "einstellungenBereinigen", "einstellungenUebernehmen", "eintragSchluessel", "hatDatum", "koerperfettVon", "tagSchluessel", "pauseLesen",
  "trainingsImportieren", "trainingBereinigen"];
const KONST = ["CLOUD_OHNE", "CLOUD_EINSTELLUNGEN", "AUSZEIT_ARTEN", "PAUSE_SCHRITT", "PAUSE_MAX", "IMPORT_MAX_ZEICHEN", "IMPORT_MAX_GEWICHT_KG",
  "IMPORT_MAX_WDH", "IMPORT_MAX_SAETZE", "EINTRAG_FELDER", "SATZ_FELDER", "ZUKUNFT_TOLERANZ_MS"];

function geraet(stand) {
  const code = "let profil = {}; let eintraege = " + JSON.stringify(stand.eintraege || []) + ";"
    + "let eigeneUebungen = []; let geloeschteEigengewicht = []; let notizen = {}; let coach = {}; let routinen = []; let wochenplan = [null,null,null,null,null,null,null];"
    + "let trainings = " + JSON.stringify(stand.trainings || []) + ";"
    + "let koerpergewicht = []; let einstellungen = {}; let idZaehler = 0;"
    + "let importEintraege = []; let importRoutinen = null; let importWochenplan = null; let importTrainings = null; let importGewichte = null;"
    + "let importEinstellungen = null; let importProfil = null; let importEigene = null; let importGeloeschte = null; let importNotizen = null; let importCoach = null; let importOhne = []; let importPruefung = null;"
    + "const FETT_MIN = 3; const FETT_MAX = 60; const meldungen = []; const elemente = {};"
    + "const document = { getElementById: function (id) { if (!elemente[id]) { elemente[id] = { textContent: '', classList: { add: function () {}, remove: function () {} } }; } return elemente[id]; } };"
    + "function txt(k, w) { return k + (w ? JSON.stringify(w) : ''); } function datenMeldung(t) { meldungen.push(t); } function listeZuordnen() {}"
    + "function coachBereinigen(c) { return JSON.parse(JSON.stringify(c)); } function notizenBereinigen(n) { return n; } function profilBereinigen(p) { return p; }"
    + "function routineBereinigen(r) { return r; } function spracheBekannt() { return false; } function kraftUebungBereinigen() { return null; }"
    + "function rangMerkerBereinigen(m) { return m; } function statusAnzeigen() {} function einstellungenSpeichern() {} function designAnwenden() {} function designAnzeigen() {}"
    + "function gewichtEinheitSetzen() {} function pauseStandardAnzeigen() {} function einheitenAnzeigen() {} function spracheSetzen() {} function profilUebernehmen() {}"
    + "function eigeneImportieren() { return ''; } function geloeschteEigengewichtAufnehmen() {} function sicherSpeichern() {} function coachSpeichern() {}"
    + "function routinenImportieren() { return ''; } function gewichteSpeichern() {} function rangPruefen() {}"
    + "function anzeigen() {} function letztesMalAnzeigen() {} function einstWerteAnzeigen() {}"
    + KONST.map(konstanteHolen).join("") + ECHT.map(funktionHolen).join("")
    + "return { cloudDaten, backupText, backupLesen, importAusfuehren, stand: function () { return eintraege; }, trainings: function () { return trainings; },"
    + " dialog: function () { return (elemente['dialog-text'] || {}).textContent || ''; }, offen: function () { return importEintraege.length; }, meldungen: meldungen };";
  return new Function(code)();
}
// Ein Backup über den echten Weg einlesen und übernehmen; zurück kommt die Meldung danach
function importieren(g, backup, art) {
  g.backupLesen(typeof backup === "string" ? backup : JSON.stringify(backup));
  const frage = g.dialog();
  g.importAusfuehren(art, true); // Ersetzen ausdrücklich bestätigt (seit Version 189)
  return { frage: frage, meldung: g.meldungen[g.meldungen.length - 1] || "" };
}
const ordnen = (x) => Array.isArray(x) ? x.map(ordnen) : x && typeof x === "object" ? Object.keys(x).sort().reduce((o, k) => { o[k] = ordnen(x[k]); return o; }, {}) : x;
const gleich = (a, b) => JSON.stringify(ordnen(a)) === JSON.stringify(ordnen(b));
const kopie = (x) => JSON.parse(JSON.stringify(x));

const jetzt = Date.now();
const tag = (n) => new Date(jetzt - n * 86400000).toISOString();
const ok = (id, extra) => Object.assign({ id: id, uebung: "Bankdrücken", uebungId: "bankdruecken-lh", muskelgruppe: "brust", datum: tag(3), routineId: "r1", routineName: "Push",
  einzelsaetze: [{ gewicht: 80, wdh: 8, rir: 2 }, { gewicht: 80, wdh: 8, rir: 1 }], saetze: 2, gewicht: 80, wdh: 8 }, extra || {});
const volumen = (liste) => liste.reduce((s, e) => s + (Array.isArray(e.einzelsaetze) ? e.einzelsaetze.reduce((t, x) => t + (x ? x.gewicht * x.wdh : 0), 0) : 0), 0);

// ---- A: ohne oder mit ungültigem Datum ----
{
  const g = geraet({});
  const r = importieren(g, { eintraege: [ok("a1", { datum: undefined }), ok("a2", { datum: "gestern" }), ok("a3", { datum: "2026-13-45" }), ok("a4")] }, "ersetzen");
  pruefe("A Einträge ohne gültiges Datum werden übernommen (Bestandsdaten, im Log unter „Ohne Datum“)", g.stand().length === 4, g.stand().length);
  pruefe("A Die Frage nennt die 3 Einträge ohne gültiges Datum", /pruefung\.ohneDatum\{"n":3\}/.test(r.frage), r.frage);
  pruefe("A Ohne Datum: die Felder bleiben, wie sie waren (kein Datum wird erfunden)", g.stand()[0].datum === undefined && g.stand()[1].datum === "gestern" && g.stand()[2].datum === "2026-13-45");
}

// ---- B: gleiche id, auf einem anderen Gerät bearbeitet ----
{
  // B1 nur RIR geändert: die Zusammenfassung (Gewicht, Wdh., Sätze, Datum) ist gleich
  const lokal = ok("b1");
  const anders = ok("b1", { einzelsaetze: [{ gewicht: 80, wdh: 8, rir: 0 }, { gewicht: 80, wdh: 8, rir: 0 }] });
  const g = geraet({ eintraege: [lokal] });
  const r = importieren(g, { eintraege: [anders] }, "ergaenzen");
  pruefe("B1 RIR auf anderem Gerät geändert: kein zweiter Eintrag", g.stand().length === 1, g.stand().length);
  pruefe("B1 Die Fassung dieses Geräts bleibt unverändert", gleich(g.stand()[0], lokal));
  pruefe("B1 Die Meldung nennt die abweichende Fassung (nicht still)", /backup\.abweichend\{"n":1\}/.test(r.meldung), r.meldung);
}
{
  // B2 ein Satzgewicht geändert, dadurch auch das Gewicht der Zusammenfassung: bisher kam derselbe Eintrag ein zweites Mal dazu
  const lokal = ok("b2");
  const anders = ok("b2", { gewicht: 85, einzelsaetze: [{ gewicht: 85, wdh: 8, rir: 2 }, { gewicht: 80, wdh: 8, rir: 1 }] });
  const g = geraet({ eintraege: [lokal, ok("b3", { datum: tag(10) })] });
  const vorher = volumen(g.stand());
  const r = importieren(g, { eintraege: [anders, ok("b3", { datum: tag(10) })] }, "ergaenzen");
  pruefe("B2 Satz auf anderem Gerät geändert: kein doppeltes Training", g.stand().length === 2, g.stand().map((e) => e.id + ":" + e.gewicht).join(","));
  pruefe("B2 Volumen bleibt (nicht doppelt gezählt)", volumen(g.stand()) === vorher, vorher + " → " + volumen(g.stand()));
  pruefe("B2 Fassung dieses Geräts bleibt, keine id doppelt", gleich(g.stand()[0], lokal) && new Set(g.stand().map((e) => e.id)).size === 2);
  pruefe("B2 Die Meldung nennt die abweichende Fassung", /backup\.abweichend\{"n":1\}/.test(r.meldung), r.meldung);
  // Mit „Ersetzen“ kommt die Fassung aus dem Backup
  const h = geraet({ eintraege: [lokal] });
  importieren(h, { eintraege: [anders] }, "ersetzen");
  pruefe("B2 Ersetzen übernimmt die Fassung aus dem Backup", h.stand().length === 1 && h.stand()[0].gewicht === 85);
}
{
  // B3 dasselbe Backup zweimal ergänzen: beim zweiten Mal kommt nichts dazu
  const g = geraet({ eintraege: [ok("c1")] });
  const backup = { eintraege: [ok("c1", { einzelsaetze: [{ gewicht: 90, wdh: 5 }], gewicht: 90, wdh: 5, saetze: 1 }), ok("c2", { datum: tag(1) })] };
  importieren(g, kopie(backup), "ergaenzen");
  const n = g.stand().length;
  importieren(g, kopie(backup), "ergaenzen");
  pruefe("B3 Zweimal ergänzen ändert beim zweiten Mal nichts", g.stand().length === n && n === 2, n + " → " + g.stand().length);
}

{
  // B4 eigenes Cloud-Backup per Ergänzen zurückholen: unbekannte Felder und null-Sätze fehlen dort, das ist keine andere Fassung
  const g = geraet({ eintraege: [ok("e1", { altFeld: 1 }), ok("e2", { einzelsaetze: [{ gewicht: 80, wdh: 8 }, null] })] });
  const r = importieren(g, JSON.stringify(g.cloudDaten()), "ergaenzen");
  pruefe("B4 Cloud zurückholen: nichts dazu, keine „andere Fassung“", g.stand().length === 2 && !/abweichend/.test(r.meldung) && g.stand()[0].altFeld === 1, r.meldung);
}

// ---- C: gleiche id, aber ein anderer Eintrag (andere Übung oder anderes Datum, z. B. ältere id-Vergabe): beide bleiben ----
{
  const lokal = ok("d1");
  const fremd = ok("d1", { uebung: "Kniebeuge", uebungId: "kniebeuge-lh", muskelgruppe: "beine", datum: tag(20), gewicht: 120, einzelsaetze: [{ gewicht: 120, wdh: 5 }] });
  const g = geraet({ eintraege: [lokal] });
  importieren(g, { eintraege: [fremd] }, "ergaenzen");
  const s = g.stand();
  pruefe("C Anderer Eintrag mit gleicher id: beide bleiben, neue id für den aus dem Backup", s.length === 2 && s[0].id === "d1" && s[1].uebung === "Kniebeuge" && s[1].id !== "d1", s.map((e) => e.id + ":" + e.uebung).join(","));
}

{
  // C2 nur die Übung anders (gleiche id, gleiches Datum) und C3 nur das Datum anders: jeweils ein anderer Eintrag
  const g = geraet({ eintraege: [ok("d2"), ok("d3")] });
  importieren(g, { eintraege: [ok("d2", { uebung: "Rudern", uebungId: "rudern-lh" }), ok("d3", { datum: tag(8) })] }, "ergaenzen");
  const s = g.stand();
  pruefe("C2/C3 Nur Übung oder nur Datum anders: beide kommen mit neuer id dazu", s.length === 4 && s[2].uebung === "Rudern" && s[3].datum === tag(8) && new Set(s.map((e) => e.id)).size === 4, s.map((e) => e.id + ":" + e.uebung).join(","));
}

// ---- D: trainings[].eintragIds folgen einer neuen id ----
{
  const lokal = ok("t1");
  const fremd = ok("t1", { uebung: "Kniebeuge", uebungId: "kniebeuge-lh", datum: tag(20) });
  const g = geraet({ eintraege: [lokal], trainings: [{ id: "T-lokal", start: tag(3), ende: tag(3), routineId: "", routineName: "", eintragIds: ["t1"] }] });
  importieren(g, { eintraege: [fremd], trainings: [{ id: "T-backup", start: tag(20), ende: tag(20), routineId: "", routineName: "", eintragIds: ["t1"] }] }, "ergaenzen");
  const neu = g.stand()[1].id;
  const tb = g.trainings().filter((t) => t.id === "T-backup")[0];
  const tl = g.trainings().filter((t) => t.id === "T-lokal")[0];
  pruefe("D Neue Einheit aus dem Backup zeigt auf die neue id ihres Eintrags", tb && tb.eintragIds.length === 1 && tb.eintragIds[0] === neu, tb && tb.eintragIds.join(","));
  pruefe("D Die Einheit dieses Geräts bleibt unverändert", tl && tl.eintragIds.join(",") === "t1");
}

// ---- E: Dubletten unabhängig von der Reihenfolge der Felder ----
{
  const a = ok("f1");
  const b = {};
  Object.keys(a).reverse().forEach((k) => { b[k] = a[k]; });
  b.einzelsaetze = a.einzelsaetze.map((s) => { const x = {}; Object.keys(s).reverse().forEach((k) => { x[k] = s[k]; }); return x; });
  const g = geraet({});
  const r = importieren(g, JSON.stringify({ eintraege: [a, b] }), "ersetzen");
  pruefe("E Gleicher Inhalt in anderer Feldreihenfolge ist eine Dublette", g.stand().length === 1, g.stand().length);
  pruefe("E Die Frage nennt sie als Dublette, nicht als neue id", /pruefung\.doppelt\{"n":1\}/.test(r.frage) && !/neueIds/.test(r.frage), r.frage);
  // Ergänzen: lokale Fassung in anderer Feldreihenfolge (z. B. aus dem Cloud-Backup) gilt als gleich, nicht als abweichend
  const h = geraet({ eintraege: [b] });
  const r2 = importieren(h, { eintraege: [a] }, "ergaenzen");
  pruefe("E Ergänzen: andere Feldreihenfolge ist keine abweichende Fassung", h.stand().length === 1 && !/abweichend/.test(r2.meldung), r2.meldung);
}

// ---- F: alte Backups bleiben importierbar, nichts Gültiges geht verloren ----
{
  const alteFormate = [
    { name: "reine Liste ohne Kennung", daten: [{ uebung: "Kniebeuge", gewicht: 100, wdh: 5, saetze: 3, datum: tag(500) }] },
    { name: "gymstead v9 ohne id und einzelsaetze", daten: { app: "gymstead", version: 9, eintraege: [{ uebung: "Kniebeuge", gewicht: 100, wdh: 5, saetze: 3, datum: tag(400) }, { uebung: "Rudern", gewicht: "60kg", wdh: 8, saetze: 3, datum: tag(399) }] } },
    { name: "hybridslife ohne Version", daten: { app: "hybridslife", eintraege: [{ uebung: "Klimmzug", gewicht: 0, wdh: 8, saetze: 3, datum: tag(300) }] } },
    { name: "Version 12 mit Zeit je Satz", daten: { app: "korund", version: 12, eintraege: [ok("v12", { einzelsaetze: [{ gewicht: 80, wdh: 8, zeit: tag(3) }] })] } },
    { name: "Version 13 mit unbekannten Feldern", daten: { app: "korund", version: 13, eintraege: [ok("v13", { fremd: 1, einzelsaetze: [{ gewicht: 80, wdh: 8, puls: 140 }] })] } }
  ];
  alteFormate.forEach((f) => {
    const zahl = (Array.isArray(f.daten) ? f.daten : f.daten.eintraege).length;
    const g = geraet({});
    importieren(g, kopie(f.daten), "ersetzen");
    pruefe("F " + f.name + ": Ersetzen übernimmt alle " + zahl, g.stand().length === zahl, g.stand().length);
    const h = geraet({ eintraege: [ok("lokal", { datum: tag(1) })] });
    importieren(h, kopie(f.daten), "ergaenzen");
    pruefe("F " + f.name + ": Ergänzen behält den lokalen und nimmt alle " + zahl + " dazu", h.stand().length === zahl + 1 && h.stand()[0].id === "lokal", h.stand().length);
    // Noch einmal ergänzen: nichts doppelt (alte Einträge ohne id erkennt eintragSchluessel)
    importieren(h, kopie(f.daten), "ergaenzen");
    pruefe("F " + f.name + ": zweites Ergänzen ändert nichts", h.stand().length === zahl + 1, h.stand().length);
    const unbekannt = JSON.stringify(g.stand()).indexOf("fremd") !== -1;
    if (f.name.indexOf("unbekannten") !== -1) {
      pruefe("F unbekannte Felder bleiben auf dem Gerät", unbekannt && JSON.stringify(g.stand()).indexOf("puls") !== -1);
      pruefe("F unbekannte Felder gehen nicht ins Cloud-Backup", JSON.stringify(g.cloudDaten().eintraege).indexOf("fremd") === -1);
    }
  });
  // Runde: Export → Import ergibt dieselben Einträge
  const g = geraet({ eintraege: [ok("r1"), ok("r2", { datum: tag(9), fremd: "x" }), { id: "r3", uebung: "Rudern", gewicht: "60kg", wdh: 8, saetze: 3 }] });
  const h = geraet({});
  importieren(h, g.backupText(), "ersetzen");
  pruefe("F Export → Ersetzen ergibt dieselben Einträge", gleich(h.stand(), g.stand()), JSON.stringify(h.stand()).slice(0, 120));
}

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
