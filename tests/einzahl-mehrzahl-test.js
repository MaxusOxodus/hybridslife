// Einzahl und Mehrzahl (seit Version 190, Audit Phase 13, Befund F4): „1 Eintrag“ statt „1 Einträge“, „1 entry“ statt „1 entries“.
// Geprüft mit den echten Texten (texte.js) und den echten Funktionen txt und txtAnzahl aus der app.js:
//   1. Import, Backup und Cloud über den echten Weg backupLesen → importAusfuehren (Frage und Meldung), 0, 1 und 2,
//      bei zwei Zahlen 1/1, 1/2, 2/1 und 2/2
//   2. Trainingsmodus, Ziele, Profil und Konstanz: feste Sätze für 0, 1 und 2 (zielText echt, sonst die Texte über txtAnzahl)
//   3. Wächter: Die Aufrufstellen nutzen txtAnzahl, jeder betroffene Text hat eine Einzahl in beiden Sprachen
// Starten mit: node tests/einzahl-mehrzahl-test.js
const fs = require("fs");
const path = require("path");
const quelle = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8").replace(/\r\n/g, "\n");
const texteQuelle = fs.readFileSync(path.join(__dirname, "..", "texte.js"), "utf8");
const TEXTE = new Function(texteQuelle + "; return TEXTE;")();

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
function gleich(name, ist, soll) {
  pruefe(name, ist === soll, "ist: " + ist + " | soll: " + soll);
}

// ---------- 1. Import über den echten Weg ----------
const ECHT = ["txt", "txtAnzahl", "backupLesen", "importAusfuehren", "eintraegePruefen", "importPruefungText", "zahlUnmoeglich", "eintragInZukunft",
  "eintragFinden", "neueId", "inhaltText", "eintragNurBekannt", "eintragIdsErgaenzen", "einstellungenBereinigen", "eintragSchluessel", "hatDatum",
  "tagSchluessel", "pauseLesen", "trainingsImportieren", "trainingBereinigen", "routinenImportieren", "routineFinden", "gewichteImportieren",
  "fettVonHierBehalten", "koerperfettVon", "eigeneImportieren", "backupText", "cloudDaten"];
const KONST = ["AUSZEIT_ARTEN", "PAUSE_SCHRITT", "PAUSE_MAX", "IMPORT_MAX_ZEICHEN", "IMPORT_MAX_GEWICHT_KG", "IMPORT_MAX_WDH", "IMPORT_MAX_SAETZE",
  "EINTRAG_FELDER", "SATZ_FELDER", "ZUKUNFT_TOLERANZ_MS", "CLOUD_OHNE", "CLOUD_EINSTELLUNGEN"];
function geraet(sprache, stand) {
  const code = texteQuelle + ";let sprache = " + JSON.stringify(sprache) + "; let profil = {}; let eintraege = " + JSON.stringify(stand.eintraege || []) + ";"
    + "let eigeneUebungen = " + JSON.stringify(stand.eigeneUebungen || []) + "; let geloeschteEigengewicht = []; let notizen = {}; let coach = {};"
    + "let routinen = " + JSON.stringify(stand.routinen || []) + "; let wochenplan = ['', '', '', '', '', '', ''];"
    + "let trainings = " + JSON.stringify(stand.trainings || []) + "; let koerpergewicht = " + JSON.stringify(stand.koerpergewicht || []) + "; let einstellungen = {}; let idZaehler = 0;"
    + "let importEintraege = []; let importRoutinen = null; let importWochenplan = null; let importTrainings = null; let importGewichte = null;"
    + "let importEinstellungen = null; let importProfil = null; let importEigene = null; let importGeloeschte = null; let importNotizen = null; let importCoach = null; let importOhne = []; let importPruefung = null;"
    + "const FETT_MIN = 3; const FETT_MAX = 60; const meldungen = []; const elemente = {};"
    + "const document = { getElementById: function (id) { if (!elemente[id]) { elemente[id] = { textContent: '', classList: { add: function () {}, remove: function () {} } }; } return elemente[id]; } };"
    + "function datenMeldung(t) { meldungen.push(t); } function listeZuordnen() {} function frageZeigen() {}"
    + "function coachBereinigen(c) { return c; } function notizenBereinigen(n) { return n; } function profilBereinigen(p) { return p; } function profilUebernehmen() {}"
    + "function routineBereinigen(r) { return r; } function spracheBekannt() { return false; } function kraftUebungBereinigen() { return null; } function rangMerkerBereinigen(m) { return m; }"
    + "function einstellungenUebernehmen() {} function einstellungenSpeichern() {} function eigeneUebungenEintragen() {}"
    + "function eigeneUebungenAufnehmen(l) { let n = 0; l.forEach(function (u) { if (!eigeneUebungen.some(function (x) { return x.id === u.id; })) { eigeneUebungen.push(u); n++; } }); return n; } function eigeneUebungenSpeichern() {}"
    + "function geloeschteEigengewichtAufnehmen() {} function sicherSpeichern() {} function coachSpeichern() {} function wochenplanBereinigen() {} function routinenSpeichern() {} function trainingAnzeigen() {}"
    + "function rangPruefen() {} function anzeigen() {} function letztesMalAnzeigen() {} function einstWerteAnzeigen() {} function gewichteSpeichern() {}"
    + KONST.map(konstanteHolen).join("") + ECHT.map(funktionHolen).join("")
    + "return { backupLesen, importAusfuehren, txt, txtAnzahl, meldungen, frage: function () { return (elemente['dialog-text'] || {}).textContent || ''; } };";
  return new Function(code)();
}
// Feste Uhrzeit, damit derselbe Eintrag im Gerät und im Backup genau dasselbe Datum hat
const JETZT = Date.now();
const tag = (n) => new Date(JETZT - n * 86400000).toISOString();
const e = (id, n) => ({ id, uebung: "Bankdrücken", uebungId: "bankdruecken-lh", muskelgruppe: "brust", datum: tag(n), routineId: "", routineName: "", einzelsaetze: [{ gewicht: 50, wdh: 8 }], saetze: 1, gewicht: 50, wdh: 8 });
const viele = (anfang, zahl, ab) => Array.from({ length: zahl }, (_, i) => e(anfang + i, ab + i));

// Frage: neu × hier, je 1/1, 1/2, 2/1, 2/2 (und 0 hier)
const FRAGE = {
  de: { "1/0": "Das Backup enthält 1 Eintrag. Auf diesem Gerät sind 0 Einträge gespeichert.", "1/1": "Das Backup enthält 1 Eintrag. Auf diesem Gerät ist 1 Eintrag gespeichert.",
    "1/2": "Das Backup enthält 1 Eintrag. Auf diesem Gerät sind 2 Einträge gespeichert.", "2/1": "Das Backup enthält 2 Einträge. Auf diesem Gerät ist 1 Eintrag gespeichert.",
    "2/2": "Das Backup enthält 2 Einträge. Auf diesem Gerät sind 2 Einträge gespeichert." },
  en: { "1/0": "The backup contains 1 entry. This device has 0 entries saved.", "1/1": "The backup contains 1 entry. This device has 1 entry saved.",
    "1/2": "The backup contains 1 entry. This device has 2 entries saved.", "2/1": "The backup contains 2 entries. This device has 1 entry saved.",
    "2/2": "The backup contains 2 entries. This device has 2 entries saved." }
};
["de", "en"].forEach((sp) => {
  Object.keys(FRAGE[sp]).forEach((fall) => {
    const [neu, hier] = fall.split("/").map(Number);
    const g = geraet(sp, { eintraege: viele("h", hier, 100) });
    g.backupLesen(JSON.stringify({ eintraege: viele("n", neu, 10) }));
    gleich(sp + " Frage " + fall, g.frage(), FRAGE[sp][fall]);
  });
});
// Routinen in der Frage: neu × hier
const ROUTINEN = {
  de: { "1/1": "Außerdem enthält es 1 Routine und den Wochenplan, hier ist 1 Routine gespeichert.", "1/2": "Außerdem enthält es 1 Routine und den Wochenplan, hier sind 2 Routinen gespeichert.",
    "2/1": "Außerdem enthält es 2 Routinen und den Wochenplan, hier ist 1 Routine gespeichert.", "2/2": "Außerdem enthält es 2 Routinen und den Wochenplan, hier sind 2 Routinen gespeichert.",
    "0/0": "Außerdem enthält es 0 Routinen und den Wochenplan, hier sind 0 Routinen gespeichert." },
  en: { "1/1": "It also contains 1 routine and the weekly plan; 1 routine is saved here.", "1/2": "It also contains 1 routine and the weekly plan; 2 routines are saved here.",
    "2/1": "It also contains 2 routines and the weekly plan; 1 routine is saved here.", "2/2": "It also contains 2 routines and the weekly plan; 2 routines are saved here.",
    "0/0": "It also contains 0 routines and the weekly plan; 0 routines are saved here." }
};
const routinenListe = (anfang, n) => Array.from({ length: n }, (_, i) => ({ id: anfang + i, name: anfang + i, uebungen: [] }));
["de", "en"].forEach((sp) => {
  Object.keys(ROUTINEN[sp]).forEach((fall) => {
    const [neu, hier] = fall.split("/").map(Number);
    const g = geraet(sp, { eintraege: [e("x", 50)], routinen: routinenListe("h", hier) });
    g.backupLesen(JSON.stringify({ eintraege: [e("y", 40)], routinen: routinenListe("n", neu), wochenplan: ["", "", "", "", "", "", ""] }));
    const text = g.frage();
    pruefe(sp + " Routinen in der Frage " + fall, text.indexOf(ROUTINEN[sp][fall]) !== -1, text);
  });
});
// Meldung nach Ergänzen: neu × schon vorhanden, dazu „andere Fassung“
const ERGAENZT = {
  de: { "1/1": "1 Eintrag hinzugefügt, 1 war schon vorhanden.", "1/2": "1 Eintrag hinzugefügt, 2 waren schon vorhanden.", "2/1": "2 Einträge hinzugefügt, 1 war schon vorhanden.",
    "2/2": "2 Einträge hinzugefügt, 2 waren schon vorhanden.", "0/1": "0 Einträge hinzugefügt, 1 war schon vorhanden.", "1/0": "1 Eintrag hinzugefügt, 0 waren schon vorhanden." },
  en: { "1/1": "1 entry added, 1 already existed.", "1/2": "1 entry added, 2 already existed.", "2/1": "2 entries added, 1 already existed.",
    "2/2": "2 entries added, 2 already existed.", "0/1": "0 entries added, 1 already existed.", "1/0": "1 entry added, 0 already existed." }
};
["de", "en"].forEach((sp) => {
  Object.keys(ERGAENZT[sp]).forEach((fall) => {
    const [neu, alt] = fall.split("/").map(Number);
    const hier = viele("a", alt, 100);
    const g = geraet(sp, { eintraege: hier });
    g.backupLesen(JSON.stringify({ eintraege: hier.concat(viele("n", neu, 10)) }));
    g.importAusfuehren("ergaenzen");
    gleich(sp + " Ergänzt " + fall, g.meldungen[0], ERGAENZT[sp][fall]);
  });
});
// Andere Fassung: 1 und 2
{
  const andere = (id) => Object.assign(e(id, 100), { einzelsaetze: [{ gewicht: 50, wdh: 8, rir: 0 }] });
  [["de", 1, "1 Eintrag hinzugefügt, 1 war schon vorhanden. 1 davon gibt es hier in einer anderen Fassung"], ["de", 2, "0 Einträge hinzugefügt, 2 waren schon vorhanden. 2 davon gibt es hier in einer anderen Fassung"],
    ["en", 1, "1 entry added, 1 already existed. 1 of them exists here in a different version"], ["en", 2, "0 entries added, 2 already existed. 2 of them exist here in a different version"]].forEach(([sp, n, soll]) => {
    const hier = [e("a0", 100), e("a1", 101)].slice(0, n);
    const g = geraet(sp, { eintraege: hier });
    const backup = n === 1 ? [andere("a0"), e("neu", 5)] : [andere("a0"), Object.assign(e("a1", 101), { einzelsaetze: [{ gewicht: 50, wdh: 8, rir: 0 }] })];
    g.backupLesen(JSON.stringify({ eintraege: backup }));
    g.importAusfuehren("ergaenzen");
    pruefe(sp + " Andere Fassung " + n, g.meldungen[0].indexOf(soll) === 0, g.meldungen[0]);
  });
}
// Befunde der Prüfung (0 kommt nie in die Frage), 1 und 2
const PRUEFUNG = {
  de: {
    unmoeglich: ["1 Eintrag mit unmöglichen Werten wird nicht übernommen.", "2 Einträge mit unmöglichen Werten werden nicht übernommen."],
    doppelt: ["1 doppelter Eintrag wird nur einmal übernommen.", "2 doppelte Einträge werden nur einmal übernommen."],
    neueIds: ["1 Eintrag mit gleicher Kennung bekommt eine neue.", "2 Einträge mit gleicher Kennung bekommen eine neue."],
    zukunft: ["1 Eintrag liegt in der Zukunft und zählt erst ab seinem Datum.", "2 Einträge liegen in der Zukunft und zählen erst ab ihrem Datum."],
    ohneDatum: ["1 Eintrag hat kein gültiges Datum. Er wird nicht verworfen und steht im Log unter „Ohne Datum“.", "2 Einträge haben kein gültiges Datum. Sie werden nicht verworfen und stehen im Log unter „Ohne Datum“."],
    unbekannt: ["1 Eintrag hat Zusatzangaben, die Korund nicht kennt. Sie bleiben auf dem Gerät, gehen aber nicht ins Cloud-Backup.", "2 Einträge haben Zusatzangaben, die Korund nicht kennt. Sie bleiben auf dem Gerät, gehen aber nicht ins Cloud-Backup."]
  },
  en: {
    unmoeglich: ["1 entry with impossible values will not be imported.", "2 entries with impossible values will not be imported."],
    doppelt: ["1 duplicate entry will be imported only once.", "2 duplicate entries will be imported only once."],
    neueIds: ["1 entry with the same ID gets a new one.", "2 entries with the same ID get a new one."],
    zukunft: ["1 entry is in the future and only counts from its date.", "2 entries are in the future and only count from their date."],
    ohneDatum: ["1 entry has no valid date. It is not discarded and is listed in the log under “No date”.", "2 entries have no valid date. They are not discarded and are listed in the log under “No date”."],
    unbekannt: ["1 entry has extra data Korund does not know. It stays on the device but is not included in the cloud backup.", "2 entries have extra data Korund does not know. It stays on the device but is not included in the cloud backup."]
  }
};
const BEFUND = {
  unmoeglich: (i) => Object.assign(e("u" + i, 10 + i), { gewicht: 5000 }),
  doppelt: (i) => [e("d" + i, 20 + i), e("d" + i, 20 + i)],
  neueIds: (i) => [e("k" + i, 30 + i), Object.assign(e("k" + i, 30 + i), { gewicht: 51 })],
  zukunft: (i) => e("z" + i, -5 - i),
  ohneDatum: (i) => { const x = e("o" + i, 1); delete x.datum; return x; },
  unbekannt: (i) => Object.assign(e("f" + i, 40 + i), { fremd: 1 })
};
["de", "en"].forEach((sp) => {
  Object.keys(BEFUND).forEach((art) => {
    [1, 2].forEach((n) => {
      const g = geraet(sp, {});
      const liste = [];
      for (let i = 0; i < n; i++) {
        liste.push(...[].concat(BEFUND[art](i)));
      }
      g.backupLesen(JSON.stringify({ eintraege: liste.concat([e("gut", 60)]) }));
      const soll = PRUEFUNG[sp][art][n - 1];
      pruefe(sp + " Prüfung " + art + " " + n, g.frage().indexOf(soll) !== -1, g.frage());
    });
  });
});
// Meldungen nach Ersetzen und die Teilmeldungen (Routinen, Einheiten, Körpergewicht, eigene Übungen): 0, 1, 2
const TEIL = {
  de: { ersetzt: ["0 Einträge aus dem Backup wiederhergestellt.", "1 Eintrag aus dem Backup wiederhergestellt.", "2 Einträge aus dem Backup wiederhergestellt."],
    routinen: [" 0 Routinen und der Wochenplan wurden wiederhergestellt.", " 1 Routine und der Wochenplan wurden wiederhergestellt.", " 2 Routinen und der Wochenplan wurden wiederhergestellt."],
    trainings: [" 0 Trainingseinheiten wurden wiederhergestellt.", " 1 Trainingseinheit wurde wiederhergestellt.", " 2 Trainingseinheiten wurden wiederhergestellt."],
    gewichte: [" 0 Messungen des Körpergewichts wurden wiederhergestellt.", " 1 Messung des Körpergewichts wurde wiederhergestellt.", " 2 Messungen des Körpergewichts wurden wiederhergestellt."],
    eigene: [" 0 eigene Übungen wurden wiederhergestellt.", " 1 eigene Übung wurde wiederhergestellt.", " 2 eigene Übungen wurden wiederhergestellt."] },
  en: { ersetzt: ["0 entries restored from the backup.", "1 entry restored from the backup.", "2 entries restored from the backup."],
    routinen: [" 0 routines and the weekly plan were restored.", " 1 routine and the weekly plan were restored.", " 2 routines and the weekly plan were restored."],
    trainings: [" 0 workouts were restored.", " 1 workout was restored.", " 2 workouts were restored."],
    gewichte: [" 0 body weight measurements were restored.", " 1 body weight measurement was restored.", " 2 body weight measurements were restored."],
    eigene: [" 0 exercises of your own were restored.", " 1 exercise of your own was restored.", " 2 exercises of your own were restored."] }
};
["de", "en"].forEach((sp) => {
  [0, 1, 2].forEach((n) => {
    const g = geraet(sp, {});
    // Ein Backup ohne Einträge und ohne Routinen lehnt der Import als leer ab, „0 Einträge wiederhergestellt“ ist nicht erreichbar:
    // bei 0 deshalb 1 Eintrag, geprüft werden dort nur die anderen Teile
    g.backupLesen(JSON.stringify({ eintraege: viele("r", Math.max(n, 1), 10), routinen: routinenListe("r", n), wochenplan: ["", "", "", "", "", "", ""],
      trainings: Array.from({ length: n }, (_, i) => ({ id: "t" + i, start: tag(9), ende: tag(9), eintragIds: [] })),
      koerpergewicht: Array.from({ length: n }, (_, i) => ({ datum: tag(3 + i), gewicht: 80 })),
      eigeneUebungen: Array.from({ length: n }, (_, i) => ({ id: "eu" + i, name: "Eigen " + i, muskelgruppe: "brust" })) }));
    g.importAusfuehren("ersetzen", true);
    const m = g.meldungen[0] || "";
    ["ersetzt", "routinen", "trainings", "gewichte", "eigene"].filter((teil) => n > 0 || teil !== "ersetzt").forEach((teil) => {
      pruefe(sp + " Ersetzen " + teil + " " + n, m.indexOf(TEIL[sp][teil][n]) !== -1, m);
    });
  });
});

// ---------- 2. Texte mit fester Erwartung über die echte txtAnzahl (und zielText) ----------
function texter(sprache) {
  return new Function(texteQuelle + ";let sprache = " + JSON.stringify(sprache) + ";" + funktionHolen("txt") + funktionHolen("txtAnzahl")
    + "function zaehltSeiten(u) { return u.zaehlweise === 'seiten'; } function wdhBis(u) { return u.zielWdhMax && u.zielWdhMax !== u.zielWdh ? u.zielWdhMax : null; }"
    + funktionHolen("zielText") + "return { txt, txtAnzahl, zielText };")();
}
const SOLL = {
  de: [
    ["backup.exportiert", [0, 1, 2], ["Backup mit 0 Einträgen exportiert.", "Backup mit 1 Eintrag exportiert.", "Backup mit 2 Einträgen exportiert."]],
    ["cloud.gesichert", [0, 1, 2], ["Gesichert: 0 Einträge.", "Gesichert: 1 Eintrag.", "Gesichert: 2 Einträge."]],
    ["backup.routinenErgaenzt", [0, 1, 2], ["0 Routinen hinzugefügt.", "1 Routine hinzugefügt.", "2 Routinen hinzugefügt."]],
    ["backup.trainingsErgaenzt", [0, 1, 2], ["0 Trainingseinheiten hinzugefügt.", "1 Trainingseinheit hinzugefügt.", "2 Trainingseinheiten hinzugefügt."]],
    ["backup.gewichteErgaenzt", [0, 1, 2], ["0 Messungen des Körpergewichts hinzugefügt.", "1 Messung des Körpergewichts hinzugefügt.", "2 Messungen des Körpergewichts hinzugefügt."]],
    ["backup.eigeneErgaenzt", [0, 1, 2], ["0 eigene Übungen hinzugefügt.", "1 eigene Übung hinzugefügt.", "2 eigene Übungen hinzugefügt."]],
    ["chip.saetze", [1, 2], ["1 Satz", "2 Sätze"]],
    ["chip.saetzeSeiten", [1, 2], ["1 Satz je Seite", "2 Sätze je Seite"]],
    ["chip.wdh", [1, 2], ["1 Wdh.", "2 Wdh."]],
    ["profil.serieKurz", [1, 2], ["1 Woche Serie", "2 Wochen Serie"]],
    ["konstanz.serie", [0, 1, 2], ["Serie 0 Wochen", "Serie 1 Woche", "Serie 2 Wochen"]],
    ["konstanz.tage30", [0, 1, 2], ["0 Trainingstage in 30 Tagen", "1 Trainingstag in 30 Tagen", "2 Trainingstage in 30 Tagen"]]
  ],
  en: [
    ["backup.exportiert", [0, 1, 2], ["Backup with 0 entries exported.", "Backup with 1 entry exported.", "Backup with 2 entries exported."]],
    ["cloud.gesichert", [0, 1, 2], ["Backed up: 0 entries.", "Backed up: 1 entry.", "Backed up: 2 entries."]],
    ["backup.routinenErgaenzt", [0, 1, 2], ["0 routines added.", "1 routine added.", "2 routines added."]],
    ["backup.trainingsErgaenzt", [0, 1, 2], ["0 workouts added.", "1 workout added.", "2 workouts added."]],
    ["backup.gewichteErgaenzt", [0, 1, 2], ["0 body weight measurements added.", "1 body weight measurement added.", "2 body weight measurements added."]],
    ["backup.eigeneErgaenzt", [0, 1, 2], ["0 exercises of your own added.", "1 exercise of your own added.", "2 exercises of your own added."]],
    ["chip.saetze", [1, 2], ["1 set", "2 sets"]],
    ["chip.saetzeSeiten", [1, 2], ["1 set per side", "2 sets per side"]],
    ["chip.wdh", [1, 2], ["1 rep", "2 reps"]],
    ["profil.serieKurz", [1, 2], ["1 week streak", "2 week streak"]],
    ["konstanz.serie", [0, 1, 2], ["Streak 0 weeks", "Streak 1 week", "Streak 2 weeks"]],
    ["konstanz.tage30", [0, 1, 2], ["0 training days in 30 days", "1 training day in 30 days", "2 training days in 30 days"]]
  ]
};
["de", "en"].forEach((sp) => {
  const t = texter(sp);
  SOLL[sp].forEach(([k, zahlen, soll]) => {
    zahlen.forEach((n, i) => gleich(sp + " " + k + " " + n, t.txtAnzahl(k, n, { wdh: n }), soll[i]));
  });
  // Ziele über die echte zielText (Sätze und Wdh. unabhängig, auch „je Seite“ und Bereiche)
  const Z = sp === "de" ? [
    [{ zielSaetze: 1, zielWdh: 1 }, "Ziel: 1 Satz × 1 Wdh."], [{ zielSaetze: 1, zielWdh: 2 }, "Ziel: 1 Satz × 2 Wdh."], [{ zielSaetze: 2, zielWdh: 1 }, "Ziel: 2 Sätze × 1 Wdh."],
    [{ zielSaetze: 2, zielWdh: 8, zielWdhMax: 12 }, "Ziel: 2 Sätze × 8–12 Wdh."], [{ zielSaetze: 1, zielWdh: 1, zielWdhMax: 3 }, "Ziel: 1 Satz × 1–3 Wdh."],
    [{ zielSaetze: 1 }, "Ziel: 1 Satz"], [{ zielSaetze: 3 }, "Ziel: 3 Sätze"], [{ zielWdh: 1 }, "Ziel: 1 Wdh."], [{ zielWdh: 5 }, "Ziel: 5 Wdh."],
    [{ zielSaetze: 1, zielWdh: 8, zaehlweise: "seiten" }, "Ziel: 1 Satz je Seite × 8 Wdh."], [{ zielSaetze: 2, zielWdh: 1, zaehlweise: "seiten" }, "Ziel: 2 Sätze je Seite × 1 Wdh."],
    [{ zielSaetze: 1, zaehlweise: "seiten" }, "Ziel: 1 Satz je Seite"]
  ] : [
    [{ zielSaetze: 1, zielWdh: 1 }, "Target: 1 × 1 rep"], [{ zielSaetze: 1, zielWdh: 2 }, "Target: 1 × 2 reps"], [{ zielSaetze: 2, zielWdh: 1 }, "Target: 2 × 1 rep"],
    [{ zielSaetze: 2, zielWdh: 8, zielWdhMax: 12 }, "Target: 2 × 8–12 reps"], [{ zielSaetze: 1, zielWdh: 1, zielWdhMax: 3 }, "Target: 1 × 1–3 reps"],
    [{ zielSaetze: 1 }, "Target sets: 1"], [{ zielSaetze: 3 }, "Target sets: 3"], [{ zielWdh: 1 }, "Target: 1 rep"], [{ zielWdh: 5 }, "Target: 5 reps"],
    [{ zielSaetze: 1, zielWdh: 8, zaehlweise: "seiten" }, "Target: 1 per side × 8 reps"], [{ zielSaetze: 2, zielWdh: 1, zaehlweise: "seiten" }, "Target: 2 per side × 1 rep"],
    [{ zielSaetze: 1, zaehlweise: "seiten" }, "Target sets: 1 per side"]
  ];
  Z.forEach(([u, soll]) => gleich(sp + " zielText " + JSON.stringify(u), t.zielText(u), soll));
  // „x von y Sätzen“ hängt an y; „geschafft“ ebenso
  const XY = sp === "de" ? [["stand.xVonY", 1, { x: 1, y: 1 }, "1 von 1 Satz"], ["stand.xVonY", 2, { x: 1, y: 2 }, "1 von 2 Sätzen"], ["modus.zielGeschafft", 1, { n: 1, ziel: 1 }, "1 von 1 Satz geschafft"],
    ["modus.zielGeschafft", 3, { n: 3, ziel: 3 }, "3 von 3 Sätzen geschafft"], ["modus.zielGeschafftSeiten", 1, { n: 1, ziel: 1 }, "1 von 1 Satz je Seite geschafft"], ["modus.zielGeschafftSeiten", 2, { n: 2, ziel: 2 }, "2 von 2 Sätzen je Seite geschafft"]]
    : [["stand.xVonY", 1, { x: 1, y: 1 }, "1 of 1 set"], ["stand.xVonY", 2, { x: 1, y: 2 }, "1 of 2 sets"], ["modus.zielGeschafft", 1, { n: 1, ziel: 1 }, "1 of 1 set done"],
      ["modus.zielGeschafft", 3, { n: 3, ziel: 3 }, "3 of 3 sets done"], ["modus.zielGeschafftSeiten", 1, { n: 1, ziel: 1 }, "1 of 1 set per side done"], ["modus.zielGeschafftSeiten", 2, { n: 2, ziel: 2 }, "2 of 2 sets per side done"]];
  XY.forEach(([k, anzahl, werte, soll]) => gleich(sp + " " + k + " " + JSON.stringify(werte), t.txtAnzahl(k, anzahl, werte), soll));
  // Hinweise zur Steigerung (englisch „1 rep“), eintrag.gleich (Sätze und Wdh. unabhängig)
  const H = sp === "de" ? [["modus.halten", 1, "Gleiches Gewicht: Ziel 1 Wdh. noch nicht in allen Sätzen."], ["modus.halten", 8, "Gleiches Gewicht: Ziel 8 Wdh. noch nicht in allen Sätzen."]]
    : [["modus.halten", 1, "Same weight: target of 1 rep not yet hit in every set."], ["modus.halten", 8, "Same weight: target of 8 reps not yet hit in every set."]];
  H.forEach(([k, wdh, soll]) => gleich(sp + " " + k + " " + wdh, t.txtAnzahl(k, wdh, { wdh: wdh }), soll));
  const st = t.txtAnzahl("modus.steigern", 1, { schritt: "+2,5 kg", gewicht: "100 kg", wdh: 1 });
  gleich(sp + " modus.steigern 1", st, sp === "de" ? "+2,5 kg: Letztes Mal hast du mit 100 kg in allen Sätzen 1 Wdh. erreicht." : "+2,5 kg: last time you hit 1 rep in every set with 100 kg.");
  const G = (saetze, wdh) => t.txtAnzahl("eintrag.gleich", saetze, { wdhText: t.txtAnzahl("chip.wdh", wdh, { wdh: wdh }), gewicht: "50 kg" });
  const GS = sp === "de" ? [[1, 1, "1 Satz × 1 Wdh. à 50 kg"], [1, 5, "1 Satz × 5 Wdh. à 50 kg"], [3, 1, "3 Sätze × 1 Wdh. à 50 kg"], [3, 5, "3 Sätze × 5 Wdh. à 50 kg"]]
    : [[1, 1, "1 set × 1 rep at 50 kg"], [1, 5, "1 set × 5 reps at 50 kg"], [3, 1, "3 sets × 1 rep at 50 kg"], [3, 5, "3 sets × 5 reps at 50 kg"]];
  GS.forEach(([s, w, soll]) => gleich(sp + " eintrag.gleich " + s + "/" + w, G(s, w), soll));
});

// ---------- 3. Wächter ----------
// Jede betroffene Aufrufstelle nutzt txtAnzahl (ein txt-Aufruf mit diesen Schlüsseln wäre wieder „1 Einträge“)
const AUFRUFE = ["backup.exportiert", "backup.ersetzt", "backup.ergaenzt", "backup.ergaenztAlt", "backup.abweichend", "backup.frage", "backup.frageHier", "backup.frageRoutinen",
  "backup.frageRoutinenHier", "backup.routinenErsetzt", "backup.routinenErgaenzt", "backup.trainingsErsetzt", "backup.trainingsErgaenzt", "backup.gewichteErsetzt",
  "backup.gewichteErgaenzt", "cloud.gesichert", "cloud.mehrInCloud", "cloud.mehrInCloudHier", "ziel.beides", "ziel.saetze", "ziel.wdh", "chip.wdh",
  "modus.zielGeschafft", "modus.zielGeschafftSeiten", "stand.xVonY", "modus.steigern", "modus.halten", "profil.serieKurz", "konstanz.serie", "konstanz.tage30", "eintrag.gleich"];
AUFRUFE.forEach((k) => {
  const roh = new RegExp('\\btxt\\(\\s*"' + k.replace(/\./g, "\\.") + '"').test(quelle);
  pruefe("Aufruf " + k + " ohne txt(…) (nur txtAnzahl)", !roh);
});
pruefe("Aufruf backup.pruefung.* über txtAnzahl", /txtAnzahl\("backup\.pruefung\.unmoeglich"/.test(quelle) && !/txt\("backup\.pruefung\./.test(quelle));
pruefe("Aufruf eigene Übungen über txtAnzahl", /txtAnzahl\(schluessel, anzahl\)/.test(funktionHolen("eigeneImportieren")));
pruefe("Aufruf chip.saetze über txtAnzahl", /txtAnzahl\(zaehltSeiten\(u\) \? "chip\.saetzeSeiten" : "chip\.saetze"/.test(quelle));
pruefe("zielText nutzt txtAnzahl", /txtAnzahl\("ziel\.beides" \+ seiten/.test(funktionHolen("zielText")) && /txtAnzahl\("ziel\.saetze" \+ seiten/.test(funktionHolen("zielText")));
// Jeder betroffene Text hat eine Einzahl in beiden Sprachen, und sie ist nicht gleich der Mehrzahl, wo die Sprache unterscheidet
const EINZAHL = ["backup.exportiert", "backup.pruefung.unmoeglich", "backup.pruefung.doppelt", "backup.pruefung.neueIds", "backup.pruefung.zukunft", "backup.pruefung.ohneDatum",
  "backup.pruefung.unbekannt", "backup.ersetzt", "backup.abweichend", "backup.ergaenzt", "backup.ergaenztAlt", "backup.frage", "backup.frageHier", "backup.frageRoutinen",
  "backup.frageRoutinenHier", "backup.routinenErsetzt", "backup.routinenErgaenzt", "backup.trainingsErsetzt", "backup.trainingsErgaenzt", "backup.gewichteErsetzt",
  "backup.gewichteErgaenzt", "backup.eigeneErsetzt", "backup.eigeneErgaenzt", "cloud.gesichert", "cloud.mehrInCloud", "cloud.mehrInCloudHier", "ziel.beides", "ziel.saetze",
  "ziel.beidesSeiten", "ziel.saetzeSeiten", "ziel.wdh", "chip.saetze", "chip.saetzeSeiten", "chip.wdh", "modus.zielGeschafft", "modus.zielGeschafftSeiten", "stand.xVonY",
  "modus.steigern", "modus.halten", "profil.serieKurz", "konstanz.serie", "konstanz.tage30"];
EINZAHL.forEach((k) => {
  const eins = TEXTE[k + ".eins"];
  pruefe("Einzahl " + k + ".eins in Deutsch und Englisch", !!eins && !!eins.de && !!eins.en && !!TEXTE[k] && !!TEXTE[k].de && !!TEXTE[k].en);
});
// Platzhalter in Einzahl und Mehrzahl gleich (sonst bliebe {…} stehen)
EINZAHL.forEach((k) => {
  const p = (s) => (String(s || "").match(/\{\w+\}/g) || []).sort().join(",");
  const eins = TEXTE[k + ".eins"] || {}, mehr = TEXTE[k] || {};
  pruefe("Platzhalter " + k + " gleich", p(eins.de) === p(mehr.de) && p(eins.en) === p(mehr.en) && p(mehr.de) === p(mehr.en), p(eins.de) + " / " + p(mehr.de) + " / " + p(mehr.en));
});
// txtAnzahl bleibt für die alten Schlüssel mit .eins/.viele gleich
{
  const t = texter("de");
  gleich("Alte Form .eins/.viele unverändert (selbst.alteEintraege 1)", t.txtAnzahl("selbst.alteEintraege", 1), t.txt("selbst.alteEintraege.eins", { n: 1 }));
  gleich("Alte Form .eins/.viele unverändert (selbst.alteEintraege 3)", t.txtAnzahl("selbst.alteEintraege", 3), t.txt("selbst.alteEintraege.viele", { n: 3 }));
}

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
