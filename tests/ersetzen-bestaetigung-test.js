// „Ersetzen“ nur nach Bestätigung (seit Version 189, Audit Phase 13, Befund F3) über den echten Weg backupLesen → importAusfuehren
// mit den echten Funktionen für Routinen, Trainingseinheiten, Körpergewicht, eigene Übungen, Profil und Einstellungen.
// Nur Anzeige und Speicher sind Attrappen. Geprüft: ohne Bestätigung ändert sich nichts, Abbrechen ändert nichts und lässt
// „Ergänzen“ weiter zu, „Endgültig ersetzen“ ersetzt genau den dokumentierten Umfang, die Liste nennt nur, was das Backup
// wirklich ersetzt, und die Texte stehen auf Deutsch und Englisch da. Starten mit: node tests/ersetzen-bestaetigung-test.js
const fs = require("fs");
const path = require("path");
const quelle = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8").replace(/\r\n/g, "\n");
const TEXTE = new Function(fs.readFileSync(path.join(__dirname, "..", "texte.js"), "utf8") + "; return TEXTE;")();

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

const ECHT = ["txtAnzahl", "backupLesen", "importAusfuehren", "ersetzenFragen", "ersetzenUmfang", "eintraegePruefen", "importPruefungText", "zahlUnmoeglich",
  "eintragInZukunft", "eintragFinden", "neueId", "inhaltText", "eintragNurBekannt", "eintragIdsErgaenzen", "einstellungenBereinigen",
  "einstellungenUebernehmen", "eintragSchluessel", "hatDatum", "tagSchluessel", "pauseLesen", "trainingsImportieren", "trainingBereinigen",
  "routinenImportieren", "routineFinden", "gewichteImportieren", "fettVonHierBehalten", "koerperfettVon", "eigeneImportieren", "profilUebernehmen"];
const KONST = ["AUSZEIT_ARTEN", "PAUSE_SCHRITT", "PAUSE_MAX", "IMPORT_MAX_ZEICHEN", "IMPORT_MAX_GEWICHT_KG", "IMPORT_MAX_WDH", "IMPORT_MAX_SAETZE",
  "EINTRAG_FELDER", "SATZ_FELDER", "ZUKUNFT_TOLERANZ_MS"];

// sprache: null = Schlüssel statt Text (für die Logik), "de"/"en" = echte Texte aus der texte.js
function geraet(stand, sprache) {
  const code = "let profil = " + JSON.stringify(stand.profil || {}) + "; let eintraege = " + JSON.stringify(stand.eintraege || []) + ";"
    + "let eigeneUebungen = " + JSON.stringify(stand.eigeneUebungen || []) + "; let geloeschteEigengewicht = []; let notizen = " + JSON.stringify(stand.notizen || {}) + ";"
    + "let coach = " + JSON.stringify(stand.coach || {}) + "; let routinen = " + JSON.stringify(stand.routinen || []) + "; let wochenplan = " + JSON.stringify(stand.wochenplan || ["", "", "", "", "", "", ""]) + ";"
    + "let trainings = " + JSON.stringify(stand.trainings || []) + "; let koerpergewicht = " + JSON.stringify(stand.koerpergewicht || []) + ";"
    + "let einstellungen = " + JSON.stringify(stand.einstellungen || {}) + "; let idZaehler = 0;"
    + "let importEintraege = []; let importRoutinen = null; let importWochenplan = null; let importTrainings = null; let importGewichte = null;"
    + "let importEinstellungen = null; let importProfil = null; let importEigene = null; let importGeloeschte = null; let importNotizen = null; let importCoach = null; let importOhne = []; let importPruefung = null;"
    + "const FETT_MIN = 3; const FETT_MAX = 60; const meldungen = []; const elemente = {}; const fragen = [];"
    + "const SPRACHE = " + JSON.stringify(sprache || null) + "; const TEXTE = " + JSON.stringify(TEXTE) + ";"
    + "const klassen = function () { const s = {}; return { add: function (k) { s[k] = true; }, remove: function (k) { delete s[k]; }, contains: function (k) { return !!s[k]; } }; };"
    + "const document = { getElementById: function (id) { if (!elemente[id]) { elemente[id] = { textContent: '', classList: klassen() }; } return elemente[id]; } };"
    + "function txt(k, w) { if (!SPRACHE) { return k + (w ? JSON.stringify(w) : ''); } let t = TEXTE[k] ? TEXTE[k][SPRACHE] : '§' + k; Object.keys(w || {}).forEach(function (x) { t = t.split('{' + x + '}').join(w[x]); }); return t; }"
    + "function frageZeigen(titel, text, knoepfe) { fragen.push({ titel: titel, text: text, knoepfe: knoepfe }); }"
    + "function datenMeldung(t) { meldungen.push(t); } function listeZuordnen() {}"
    + "function coachBereinigen(c) { return JSON.parse(JSON.stringify(c)); } function notizenBereinigen(n) { return n; } function profilBereinigen(p) { return p; }"
    + "function routineBereinigen(r) { return r; } function spracheBekannt(s) { return s === 'de' || s === 'en'; } function kraftUebungBereinigen() { return null; }"
    + "function rangMerkerBereinigen(m) { return m; } function statusAnzeigen() {} function einstellungenSpeichern() {} function designAnwenden() {} function designAnzeigen() {}"
    + "function gewichtEinheitSetzen(e) { einstellungen.gewichtEinheit = e; } function pauseStandardAnzeigen() {} function einheitenAnzeigen() {} function spracheSetzen(s) { einstellungen.sprache = s; }"
    + "function profilSichern() {} function eigeneUebungenEintragen() {} function eigeneUebungenAufnehmen(l) { let n = 0; l.forEach(function (u) { if (!eigeneUebungen.some(function (x) { return x.id === u.id; })) { eigeneUebungen.push(u); n++; } }); return n; } function eigeneUebungenSpeichern() {}"
    + "function geloeschteEigengewichtAufnehmen(l) { l.forEach(function (x) { if (geloeschteEigengewicht.indexOf(x) === -1) geloeschteEigengewicht.push(x); }); } function sicherSpeichern() {} function coachSpeichern() {}"
    + "function wochenplanBereinigen() {} function routinenSpeichern() {} function trainingAnzeigen() {} function gewichteSpeichern() {} function rangPruefen() {}"
    + "function anzeigen() {} function letztesMalAnzeigen() {} function einstWerteAnzeigen() {}"
    + KONST.map(konstanteHolen).join("") + ECHT.map(funktionHolen).join("")
    + "return { backupLesen, importAusfuehren, fragen, meldungen,"
    + " zustand: function () { return JSON.stringify({ profil, eintraege, eigeneUebungen, geloeschteEigengewicht, notizen, coach, routinen, wochenplan, trainings, koerpergewicht, einstellungen }); },"
    + " daten: function () { return { profil, eintraege, eigeneUebungen, geloeschteEigengewicht, notizen, coach, routinen, wochenplan, trainings, koerpergewicht, einstellungen }; },"
    + " importDialogOffen: function () { return document.getElementById('dialog-hintergrund').classList.contains('offen'); },"
    + " offen: function () { return importEintraege.length; } };";
  return new Function(code)();
}

const jetzt = Date.now();
const tag = (n) => new Date(jetzt - n * 86400000).toISOString();
const eintrag = (id, n, kg) => ({ id, uebung: "Bankdrücken", uebungId: "bankdruecken-lh", muskelgruppe: "brust", datum: tag(n), routineId: "", routineName: "", einzelsaetze: [{ gewicht: kg, wdh: 8 }], saetze: 1, gewicht: kg, wdh: 8 });
// Das Gerät: von allem etwas, auch Dinge, die Ersetzen nie anfasst
const GERAET = {
  profil: { name: "Gerät", benutzername: "geraet", geburtstag: "1990-01-01", geschlecht: "m" },
  eintraege: [eintrag("g1", 5, 60), eintrag("g2", 3, 62)],
  eigeneUebungen: [{ id: "eg", name: "Eigene vom Gerät", muskelgruppe: "brust" }],
  notizen: { "bankdruecken-lh": "Notiz vom Gerät" },
  coach: { ziel: "kraft", tage: 3 },
  routinen: [{ id: "rg", name: "Routine vom Gerät", uebungen: [] }], wochenplan: ["rg", "", "", "", "", "", ""],
  trainings: [{ id: "tg", start: tag(3), ende: tag(3), routineId: "", routineName: "", eintragIds: ["g2"] }],
  koerpergewicht: [{ datum: tag(4), gewicht: 81, koerperfett: 17 }],
  einstellungen: { pauseSekunden: 90, gewichtEinheit: "kg", sprache: "de", design: "dunkel", stil: "klassisch", akzent: "lila", palette: "graphit", zielGewicht: 75, einschraenkungen: [{ stelle: "knie", seite: "links", stufe: "leicht" }], auszeiten: [{ art: "krank", von: 1, bis: 2 }] }
};
const VOLL = { app: "korund", version: 13,
  profil: { name: "Backup", benutzername: "backup" },
  eintraege: [eintrag("b1", 20, 70), eintrag("b2", 18, 72), eintrag("b3", 16, 74)],
  eigeneUebungen: [{ id: "eb", name: "Eigene aus dem Backup", muskelgruppe: "beine" }],
  notizen: { "kniebeuge-lh": "Notiz aus dem Backup" },
  coach: { ziel: "muskel", tage: 4 },
  routinen: [{ id: "rb", name: "Routine aus dem Backup", uebungen: [] }], wochenplan: ["", "rb", "", "", "", "", ""],
  trainings: [{ id: "tb", start: tag(16), ende: tag(16), routineId: "", routineName: "", eintragIds: ["b3"] }],
  koerpergewicht: [{ datum: tag(17), gewicht: 79 }],
  einstellungen: { pauseSekunden: 120, gewichtEinheit: "lbs", sprache: "en", design: "hell", stil: "glass", akzent: "blau", zielGewicht: 60, auszeiten: [{ art: "urlaub", von: 3, bis: 4 }] }
};
const kopie = (x) => JSON.parse(JSON.stringify(x));

// ---- 1. Ohne Bestätigung ändert sich nichts, die Rückfrage erscheint ----
{
  const g = geraet(kopie(GERAET));
  g.backupLesen(JSON.stringify(VOLL));
  const vorher = g.zustand();
  pruefe("Import-Dialog ist offen", g.importDialogOffen());
  g.importAusfuehren("ersetzen");
  pruefe("Ohne Bestätigung: keine Daten verändert", g.zustand() === vorher);
  pruefe("Ohne Bestätigung: Rückfrage erscheint", g.fragen.length === 1 && g.fragen[0].titel === "backup.ersetzenTitel", JSON.stringify(g.fragen.map((f) => f.titel)));
  pruefe("Ohne Bestätigung: keine Erfolgsmeldung", g.meldungen.length === 0, g.meldungen.join("|"));
  pruefe("Import-Dialog wird für die Rückfrage geschlossen", !g.importDialogOffen());
  const f = g.fragen[0] || { titel: "", text: "", knoepfe: [{ text: "", aktion: function () {} }, { text: "", aktion: function () {} }] };
  pruefe("Rückfrage hat genau zwei Knöpfe: Abbrechen und Endgültig ersetzen", f.knoepfe.length === 2 && f.knoepfe[0].text === "abbrechen" && f.knoepfe[1].text === "backup.ersetzenJa" && f.knoepfe[1].art === "gefahr", JSON.stringify(f.knoepfe.map((k) => [k.text, k.art])));
  pruefe("Abbrechen ist der hervorgehobene Knopf", f.knoepfe[0].art === "haupt");
  pruefe("Text nennt die Zahl der Einträge hier und im Backup", /backup\.ersetzenText\{.*"hier":2/.test(f.text) && /"neu":3/.test(f.text), f.text);
  ["eintraege", "trainings", "routinen", "eigene", "gewicht", "notizen", "coach", "profil", "einstellungen"].forEach((teil) => {
    pruefe("Volles Backup: Liste nennt " + teil, f.text.indexOf("backup.ersetzenTeil." + teil) !== -1, f.text);
  });

  // ---- 2. Abbrechen: nichts verändert, Import-Dialog wieder da, Ergänzen geht danach wie bisher ----
  f.knoepfe[0].aktion();
  pruefe("Abbrechen: keine Daten verändert", g.zustand() === vorher);
  pruefe("Abbrechen: Import-Dialog wieder offen, Backup noch geladen", g.importDialogOffen() && g.offen() === 3);
  g.importAusfuehren("ergaenzen");
  const d = g.daten();
  pruefe("Danach Ergänzen ohne Rückfrage: 2 + 3 Einträge, Routinen ergänzt", g.fragen.length === 1 && d.eintraege.length === 5 && d.routinen.length === 2 && d.einstellungen.sprache === "de", d.eintraege.length + "/" + d.routinen.length);
}

// ---- 3. Endgültig ersetzen: genau der dokumentierte Umfang ----
{
  const g = geraet(kopie(GERAET));
  g.backupLesen(JSON.stringify(VOLL));
  g.importAusfuehren("ersetzen");
  (g.fragen[0] || { titel: "", text: "", knoepfe: [{ text: "", aktion: function () {} }, { text: "", aktion: function () {} }] }).knoepfe[1].aktion();
  const d = g.daten();
  pruefe("Ersetzt: Einträge = die aus dem Backup", d.eintraege.map((e) => e.id).join() === "b1,b2,b3");
  pruefe("Ersetzt: Trainingseinheiten", d.trainings.map((t) => t.id).join() === "tb");
  pruefe("Ersetzt: Routinen und Wochenplan", d.routinen.map((r) => r.id).join() === "rb" && d.wochenplan[0] === "" && d.wochenplan[1] === "rb");
  pruefe("Ersetzt: eigene Übungen", d.eigeneUebungen.map((u) => u.id).join() === "eb");
  pruefe("Ersetzt: Körpergewicht (Datei: auch ohne Körperfett des Geräts)", d.koerpergewicht.length === 1 && d.koerpergewicht[0].gewicht === 79);
  pruefe("Ersetzt: Notizen", JSON.stringify(d.notizen) === JSON.stringify({ "kniebeuge-lh": "Notiz aus dem Backup" }));
  pruefe("Ersetzt: Coach-Angaben", d.coach.ziel === "muskel" && d.coach.tage === 4);
  pruefe("Ersetzt: Profilfelder aus dem Backup, übrige bleiben", d.profil.name === "Backup" && d.profil.benutzername === "backup" && d.profil.geburtstag === "1990-01-01" && d.profil.geschlecht === "m");
  pruefe("Ersetzt: einige Einstellungen (Pause, Einheit, Sprache, Hell/Dunkel, Auszeiten)", d.einstellungen.pauseSekunden === 120 && d.einstellungen.gewichtEinheit === "lbs" && d.einstellungen.sprache === "en" && d.einstellungen.design === "hell" && d.einstellungen.auszeiten[0].art === "urlaub");
  pruefe("Unberührt: Stil, Akzent, Look, Zielgewicht, Einschränkungen", d.einstellungen.stil === "klassisch" && d.einstellungen.akzent === "lila" && d.einstellungen.palette === "graphit" && d.einstellungen.zielGewicht === 75 && d.einstellungen.einschraenkungen[0].stelle === "knie");
  pruefe("Erfolgsmeldung wie bisher", /^backup\.ersetzt\{"n":3\}/.test(g.meldungen[0] || ""), g.meldungen.join("|"));
}

// ---- 4. Altes Backup (nur Einträge): Liste nennt nur, was wirklich ersetzt wird, der Rest bleibt ----
{
  const g = geraet(kopie(GERAET));
  g.backupLesen(JSON.stringify({ app: "gymstead", version: 9, eintraege: [{ uebung: "Kniebeuge", gewicht: 100, wdh: 5, saetze: 3, datum: tag(400) }] }));
  g.importAusfuehren("ersetzen");
  const t = (g.fragen[0] || { titel: "", text: "", knoepfe: [{ text: "", aktion: function () {} }, { text: "", aktion: function () {} }] }).text;
  pruefe("Altes Backup: Liste nennt Einträge und Trainingseinheiten", t.indexOf("backup.ersetzenTeil.eintraege") !== -1 && t.indexOf("backup.ersetzenTeil.trainings") !== -1, t);
  ["routinen", "eigene", "gewicht", "notizen", "coach", "profil", "einstellungen"].forEach((teil) => {
    pruefe("Altes Backup: Liste nennt nicht " + teil, t.indexOf("backup.ersetzenTeil." + teil) === -1, t);
  });
  (g.fragen[0] || { titel: "", text: "", knoepfe: [{ text: "", aktion: function () {} }, { text: "", aktion: function () {} }] }).knoepfe[1].aktion();
  const d = g.daten();
  pruefe("Altes Backup ersetzt: Einträge ersetzt, Einheiten geleert", d.eintraege.length === 1 && d.eintraege[0].uebung === "Kniebeuge" && d.trainings.length === 0);
  pruefe("Altes Backup ersetzt: Routinen, Notizen, Coach, Körpergewicht, Profil, Einstellungen bleiben", d.routinen[0].id === "rg" && d.notizen["bankdruecken-lh"] === "Notiz vom Gerät" && d.coach.ziel === "kraft" && d.koerpergewicht[0].koerperfett === 17 && d.profil.name === "Gerät" && d.einstellungen.sprache === "de");
}

// ---- 5. Texte auf Deutsch und Englisch ----
["de", "en"].forEach((sprache) => {
  const schluessel = ["backup.ersetzenTitel", "backup.ersetzenText", "backup.ersetzenJa", "backup.ersetzenUnd", "abbrechen"].concat(
    ["eintraege", "trainings", "routinen", "eigene", "gewicht", "notizen", "coach", "profil", "einstellungen"].map((t) => "backup.ersetzenTeil." + t));
  schluessel.forEach((k) => pruefe(sprache + ": Text " + k + " vorhanden", !!TEXTE[k] && typeof TEXTE[k][sprache] === "string" && TEXTE[k][sprache].length > 0));
  const g = geraet(kopie(GERAET), sprache);
  g.backupLesen(JSON.stringify(VOLL));
  g.importAusfuehren("ersetzen");
  const f = g.fragen[0] || { titel: "", text: "", knoepfe: [{ text: "", aktion: function () {} }, { text: "", aktion: function () {} }] };
  pruefe(sprache + ": keine fehlenden Texte oder Platzhalter", f && !/§|\{\w+\}/.test(f.titel + f.text + f.knoepfe.map((k) => k.text).join("")), f && f.text);
  pruefe(sprache + ": Text sagt, dass es dieses Gerät betrifft und nicht rückgängig zu machen ist", sprache === "de" ? /diesem Gerät/.test(f.titel + f.text) && /nicht rückgängig/.test(f.text) : /this device/.test(f.titel + f.text) && /cannot be undone/.test(f.text), f.text);
  pruefe(sprache + ": Text sagt, dass nicht nur ergänzt wird", sprache === "de" ? /nicht nur/.test(f.text) : /not just/.test(f.text), f.text);
  console.log("[" + sprache + "] " + f.titel + "\n     " + f.text + "\n     [" + f.knoepfe.map((k) => k.text).join("] [") + "]");
});

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
