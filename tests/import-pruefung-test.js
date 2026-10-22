// Prüft die Import-Prüfung (seit Version 183, Audit Phase 11) über den echten Weg backupLesen → importAusfuehren → cloudDaten
// aus der app.js. Nur Anzeige und Speicher sind Attrappen (die Meldungen werden mitgeschrieben).
// Positive Fälle: alte Backups ohne einzelsaetze, ohne Datum oder mit „80kg“ laden wie bisher, 400 kg (Grenze der Eingabe) gilt.
// Negative Fälle: unmögliche Werte, Dubletten, doppelte ids, zu große Dateien. Unbekannte Felder bleiben auf dem Gerät,
// gehen aber nicht ins Cloud-Backup. Starten mit: node tests/import-pruefung-test.js
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
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

const ECHT = ["cloudDaten", "backupText", "backupLesen", "importAusfuehren", "gewichteImportieren", "fettVonHierBehalten", "eintragNurBekannt",
  "eintraegePruefen", "inhaltText", "importPruefungText", "zahlUnmoeglich", "eintragInZukunft", "eintragFinden", "neueId",
  "einstellungenBereinigen", "einstellungenUebernehmen", "eintragSchluessel", "hatDatum", "koerperfettVon", "tagSchluessel", "pauseLesen"];
const KONST = ["CLOUD_OHNE", "CLOUD_EINSTELLUNGEN", "AUSZEIT_ARTEN", "PAUSE_SCHRITT", "PAUSE_MAX", "IMPORT_MAX_ZEICHEN", "IMPORT_MAX_GEWICHT_KG",
  "IMPORT_MAX_WDH", "IMPORT_MAX_SAETZE", "EINTRAG_FELDER", "SATZ_FELDER", "ZUKUNFT_TOLERANZ_MS"];

function geraet(stand) {
  const code = "let profil = {}; let eintraege = " + JSON.stringify(stand.eintraege || []) + ";"
    + "let eigeneUebungen = []; let geloeschteEigengewicht = []; let notizen = {}; let coach = {}; let routinen = []; let wochenplan = [null,null,null,null,null,null,null]; let trainings = [];"
    + "let koerpergewicht = []; let einstellungen = {}; let idZaehler = 0;"
    + "let importEintraege = []; let importRoutinen = null; let importWochenplan = null; let importTrainings = null; let importGewichte = null;"
    + "let importEinstellungen = null; let importProfil = null; let importEigene = null; let importGeloeschte = null; let importNotizen = null; let importCoach = null; let importOhne = []; let importPruefung = null;"
    + "const FETT_MIN = 3; const FETT_MAX = 60; const meldungen = []; const elemente = {};"
    + "const document = { getElementById: function (id) { if (!elemente[id]) { elemente[id] = { textContent: '', classList: { add: function () {}, remove: function () {} } }; } return elemente[id]; } };"
    + "function txt(k, w) { return k + (w ? JSON.stringify(w) : ''); } function datenMeldung(t) { meldungen.push(t); } function listeZuordnen() {} function eintragIdsErgaenzen() {}"
    + "function coachBereinigen(c) { return JSON.parse(JSON.stringify(c)); } function notizenBereinigen(n) { return n; } function profilBereinigen(p) { return p; }"
    + "function trainingBereinigen(t) { return t; } function routineBereinigen(r) { return r; } function spracheBekannt() { return false; } function kraftUebungBereinigen() { return null; }"
    + "function rangMerkerBereinigen(m) { return m; } function statusAnzeigen() {} function einstellungenSpeichern() {} function designAnwenden() {} function designAnzeigen() {}"
    + "function gewichtEinheitSetzen() {} function pauseStandardAnzeigen() {} function einheitenAnzeigen() {} function spracheSetzen() {} function profilUebernehmen() {}"
    + "function eigeneImportieren() { return ''; } function geloeschteEigengewichtAufnehmen() {} function sicherSpeichern() {} function coachSpeichern() {}"
    + "function routinenImportieren() { return ''; } function trainingsImportieren() { return ''; } function gewichteSpeichern() {} function rangPruefen() {}"
    + "function anzeigen() {} function letztesMalAnzeigen() {} function einstWerteAnzeigen() {}"
    + KONST.map(konstanteHolen).join("") + ECHT.map(funktionHolen).join("")
    + "return { cloudDaten, backupLesen, importAusfuehren, eintraegePruefen, eintragNurBekannt, stand: function () { return eintraege; },"
    + " dialog: function () { return (elemente['dialog-text'] || {}).textContent || ''; }, offen: function () { return importEintraege.length; }, meldungen: meldungen };";
  return new Function(code)();
}

// Vergleich unabhängig von der Reihenfolge der Schlüssel
function gleich(a, b) {
  const ordnen = (x) => Array.isArray(x) ? x.map(ordnen) : x && typeof x === "object" ? Object.keys(x).sort().reduce((o, k) => { o[k] = ordnen(x[k]); return o; }, {}) : x;
  return JSON.stringify(ordnen(a)) === JSON.stringify(ordnen(b));
}
const jetzt = Date.now();
const tag = (n) => new Date(jetzt - n * 86400000).toISOString();
const ok = (id, extra) => Object.assign({ id: id, uebung: "Bankdrücken", uebungId: "bankdruecken-lh", muskelgruppe: "brust", datum: tag(3), routineId: "", routineName: "",
  einzelsaetze: [{ gewicht: 80, wdh: 8, rir: 2, zeit: tag(3) }, { gewicht: 40, wdh: 10, aufwaermen: true }], saetze: 2, gewicht: 80, wdh: 8 }, extra || {});

// ---- Positive Fälle: alte und gültige Backups laden wie bisher ----
{
  const alt = [
    { uebung: "Kniebeuge", gewicht: 100, wdh: 5, saetze: 3, datum: tag(400) },          // sehr altes Format ohne id und einzelsaetze
    { uebung: "Kreuzheben", gewicht: "80kg", wdh: 5, saetze: 3 },                      // ohne Datum, Gewicht als Text
    ok("e1"), ok("e2", { gewicht: 400, einzelsaetze: [{ gewicht: 400, wdh: 1 }] }),   // 400 kg = Grenze der Eingabe
    ok("e3", { entlastung: true, trainingId: "t1" })
  ];
  const g = geraet({});
  g.backupLesen(JSON.stringify({ app: "gymstead", version: 9, eintraege: alt }));
  pruefe("Alte und gültige Einträge: alle 5 werden angeboten", g.offen() === 5, g.offen());
  // Seit Version 186 meldet die Frage nur den Eintrag ohne Datum (er wird trotzdem übernommen), sonst nichts
  pruefe("Ohne Befund kein Zusatz in der Frage (außer „ohne Datum“)", g.dialog().replace(/ backup\.pruefung\.ohneDatum\{"n":1\}/, "").indexOf("backup.pruefung") === -1 && /ohneDatum\{"n":1\}/.test(g.dialog()), g.dialog());
  g.importAusfuehren("ersetzen");
  pruefe("Ersetzen übernimmt alle 5 unverändert", g.stand().length === 5 && g.stand()[1].gewicht === "80kg" && g.stand()[0].datum === tag(400));
  pruefe("Bekannte Felder gehen vollständig ins Cloud-Backup", g.cloudDaten().eintraege.every((e, i) => gleich(e, alt[i])));
  pruefe("Reine Liste (sehr altes Backup) wird weiter angenommen", (function () { const h = geraet({}); h.backupLesen(JSON.stringify([ok("x")])); return h.offen() === 1; })());
}

// ---- Negative Fälle: unmögliche Werte ----
{
  const kaputt = [
    ok("k1", { gewicht: 5000 }), ok("k2", { wdh: 99999 }), ok("k3", { saetze: 1000000 }), ok("k4", { einzelsaetze: "viele" }),
    ok("k5", { einzelsaetze: Array.from({ length: 500 }, () => ({ gewicht: 50, wdh: 5 })) }), ok("k6", { einzelsaetze: [{ gewicht: -5, wdh: 5 }] }),
    ok("k7", { einzelsaetze: [{ gewicht: "1e309", wdh: 5 }] }), ok("k9", { einzelsaetze: [{ gewicht: 60, wdh: 5000 }] }),
    { uebung: 5 }, null, "text", [1, 2], ok("gut", { datum: tag(1) })
  ];
  const g = geraet({ eintraege: [ok("lokal")] });
  g.backupLesen(JSON.stringify({ eintraege: kaputt }));
  pruefe("Unmögliche Werte: nur der gültige Eintrag wird angeboten", g.offen() === 1, g.offen());
  pruefe("Die Frage nennt 8 Einträge mit unmöglichen Werten", /backup\.pruefung\.unmoeglich\{"n":8\}/.test(g.dialog()), g.dialog());
  g.importAusfuehren("ergaenzen");
  pruefe("Ergänzen: lokaler Eintrag bleibt, der gültige kommt dazu", g.stand().length === 2 && g.stand()[0].id === "lokal" && g.stand()[1].id === "gut");
}

// ---- Seit Version 184: null bei einzelsaetze oder an einem Satz kostet nicht den ganzen Eintrag ----
{
  const g = geraet({});
  g.backupLesen(JSON.stringify({ eintraege: [ok("n1", { einzelsaetze: null }), ok("n2", { einzelsaetze: [null, { gewicht: 80, wdh: 8 }] })] }));
  pruefe("einzelsaetze null und ein null-Satz: beide Einträge bleiben", g.offen() === 2 && g.dialog().indexOf("backup.pruefung") === -1, g.dialog());
}
// ---- Seit Version 184: alles verworfen → die Meldung nennt den Grund ----
{
  const g = geraet({});
  g.backupLesen(JSON.stringify({ eintraege: [ok("x", { gewicht: 5000 })] }));
  pruefe("Alles verworfen: „keine Einträge“ mit Grund", g.meldungen.some((m) => /^backup\.leer.*pruefung\.unmoeglich/.test(m)), g.meldungen.join("|"));
}

// ---- Dubletten und gleiche ids ----
{
  const a = ok("d1"), b = ok("d1"), c = ok("d1", { gewicht: 85, einzelsaetze: [{ gewicht: 85, wdh: 8 }] });
  const g = geraet({});
  g.backupLesen(JSON.stringify({ eintraege: [a, b, c, ok("d2")] }));
  pruefe("Gleiche id und gleicher Inhalt: einmal; gleiche id, anderer Inhalt: neue id", g.offen() === 3, g.offen());
  pruefe("Die Frage nennt Dublette und neue id", /pruefung\.doppelt\{"n":1\}/.test(g.dialog()) && /pruefung\.neueIds\{"n":1\}/.test(g.dialog()), g.dialog());
  g.importAusfuehren("ersetzen");
  const ids = g.stand().map((e) => e.id);
  pruefe("Keine id doppelt, die abweichende Fassung ist erhalten", new Set(ids).size === 3 && g.stand().some((e) => e.gewicht === 85), ids.join(","));
}
{
  // Ergänzen: gleiche id wie auf dem Gerät, aber anderer Inhalt. Seit Version 186: Ist es derselbe Eintrag (gleiche Übung,
  // gleiches Datum, auf einem Gerät bearbeitet), bleibt die Fassung des Geräts und die Meldung nennt die andere (vorher kam er
  // ein zweites Mal dazu). Ein anderer Eintrag mit derselben id bekommt wie seit Version 183 eine neue id.
  const g = geraet({ eintraege: [ok("x1")] });
  g.backupLesen(JSON.stringify({ eintraege: [ok("x1", { gewicht: 90, einzelsaetze: [{ gewicht: 90, wdh: 8 }] }), ok("x1"), ok("x1", { datum: tag(7) })] }));
  g.importAusfuehren("ergaenzen");
  const s = g.stand();
  pruefe("Ergänzen bei gleicher id: derselbe Eintrag nicht doppelt, ein anderer mit neuer id, keine id doppelt", s.length === 2 && s[0].id === "x1" && s[0].gewicht === 80 && s[1].datum === tag(7) && s[1].id !== "x1", s.map((e) => e.id + ":" + e.gewicht).join(","));
  pruefe("Ergänzen bei gleicher id: die Meldung nennt die abweichende Fassung", /backup\.abweichend\{"n":1\}/.test(g.meldungen[g.meldungen.length - 1]), g.meldungen.join("|"));
}

{
  // Seit Version 184: [x1:A, x1:B, x1:B] → A und einmal B (vorher wurde B zweimal übernommen)
  const A = ok("x1"), B1 = ok("x1", { gewicht: 85, einzelsaetze: [{ gewicht: 85, wdh: 8 }] }), B2 = ok("x1", { gewicht: 85, einzelsaetze: [{ gewicht: 85, wdh: 8 }] });
  const g = geraet({});
  g.backupLesen(JSON.stringify({ eintraege: [A, B1, B2] }));
  pruefe("Dublette einer späteren Fassung derselben id wird erkannt", g.offen() === 2 && /pruefung\.doppelt\{"n":1\}/.test(g.dialog()), g.dialog());
}

// ---- Zukunft und unbekannte Felder ----
{
  const zukunft = ok("z1", { datum: new Date(jetzt + 40 * 86400000).toISOString() });
  const bald = ok("z2", { datum: new Date(jetzt + 3 * 3600e3).toISOString() });
  const fremd = ok("f1", { notizIntern: "privat", einzelsaetze: [{ gewicht: 80, wdh: 8, puls: 150 }] });
  const g = geraet({});
  g.backupLesen(JSON.stringify({ eintraege: [zukunft, bald, fremd] }));
  pruefe("Zukunft: angeboten (nicht verworfen), gemeldet nur der Eintrag über 24 h", g.offen() === 3 && /pruefung\.zukunft\{"n":1\}/.test(g.dialog()), g.dialog());
  pruefe("Unbekannte Felder werden gemeldet", /pruefung\.unbekannt\{"n":1\}/.test(g.dialog()), g.dialog());
  g.importAusfuehren("ersetzen");
  const f = g.stand().filter((e) => e.id === "f1")[0];
  pruefe("Unbekannte Felder bleiben auf dem Gerät erhalten", f.notizIntern === "privat" && f.einzelsaetze[0].puls === 150);
  const c = JSON.stringify(g.cloudDaten().eintraege);
  pruefe("Unbekannte Felder gehen nicht ins Cloud-Backup, die bekannten schon", !/notizIntern|privat|puls/.test(c) && /"gewicht":80/.test(c) && /z1/.test(c));
}

// ---- Zu große Datei ----
{
  const g = geraet({ eintraege: [ok("lokal")] });
  g.backupLesen("x".repeat(20 * 1000 * 1000 + 1));
  pruefe("Zu große Datei: nicht gelesen, Meldung, nichts angeboten", g.meldungen.indexOf("backup.zuGross") !== -1 && g.offen() === 0 && g.stand().length === 1, g.meldungen.join("|"));
  const h = geraet({});
  h.backupLesen("{kaputt");
  pruefe("Kaputtes JSON: wie bisher „ungültig“", h.meldungen.indexOf("backup.ungueltig") !== -1);
  pruefe("Kein Text (null): „ungültig“ statt Absturz oder „zu groß“", (function () { try { h.meldungen.length = 0; h.backupLesen(null); return h.meldungen[0] === "backup.ungueltig"; } catch (e) { return false; } })());
}

// ---- Gleiches Schema für Datei und Cloud: ein Cloud-Backup läuft durch dieselbe Prüfung ----
{
  const quelleG = geraet({ eintraege: [ok("c1"), ok("c2", { fremd: 1 })] });
  const cloud = JSON.stringify(quelleG.cloudDaten());
  const ziel = geraet({});
  ziel.backupLesen(cloud);
  pruefe("Cloud-Backup: beide Einträge kommen an, ohne unbekanntes Feld und ohne Meldung", ziel.offen() === 2 && ziel.dialog().indexOf("backup.pruefung") === -1, ziel.dialog());
}

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
