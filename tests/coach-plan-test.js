// Test: Plan mit Korund (seit Version 149). Prüft die Regeln, mit denen der Coach aus den Antworten einen Plan
// aus den Vorlagen baut (Aufteilung, Sätze nach Erfahrung und Schwerpunkt, Wdh. und Pause nach Ziel, Zeit),
// das Bereinigen der Antworten und das Feld "coach" im Backup (Backup-Version 13).
// Geräte und Einschränkungen sind hier nachgebaut: alles da, nichts eingeschränkt, außer ein Test sagt etwas anderes.
// Starten mit: node tests/coach-plan-test.js

import fs from "node:fs";

function lesen(datei) {
  return fs.readFileSync(new URL("../" + datei, import.meta.url), "utf8").replace(/\r\n/g, "\n");
}
const quelle = lesen("app.js");
const texte = lesen("texte.js");
const einfuehrung = lesen("einfuehrung.js");
function funktionHolen(name) {
  const start = quelle.indexOf("\n  function " + name + "(");
  const ende = quelle.indexOf("\n  }\n", start);
  if (start === -1 || ende === -1) {
    throw new Error("Funktion " + name + " nicht in der app.js gefunden");
  }
  return quelle.slice(start, ende + 5);
}
function konstanteHolen(name) {
  const start = quelle.indexOf("\n  const " + name + " = ");
  if (start === -1) {
    throw new Error("Konstante " + name + " nicht in der app.js gefunden");
  }
  return quelle.slice(start, quelle.indexOf(";\n", start) + 2);
}
let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

const KONSTANTEN = ["COACH_ZIELE", "COACH_TAGE", "COACH_MINUTEN", "COACH_ERFAHRUNG", "COACH_SCHWERPUNKTE", "COACH_MAX_SCHWERPUNKT",
  "COACH_MAX_SAETZE", "COACH_MAX_ANFAENGER", "COACH_MIN_SAETZE", "COACH_MIN_PLAETZE", "COACH_KRAFT_PAUSE", "COACH_SATZ_SEKUNDEN",
  "COACH_ZEIT_DRUEBER", "COACH_ZEIT_DRUNTER", "COACH_GRUNDUEBUNGEN", "COACH_AUFTEILUNG", "COACH_AUFTEILUNG_ANFAENGER",
  "COACH_AUFTEILUNG_ARME", "ERHOLUNG_PARTIEN"];
const FUNKTIONEN = ["coachBereinigen", "coachBasis", "coachPasst", "coachSlotUebung", "coachSlotWerte", "coachDauer",
  "coachZeitAnpassen", "coachPlanBauen", "erholungPartie", "uebungGruppe"];
const f = new Function(lesen("uebungen.js") + lesen("vorlagen.js")
  + "const UEBUNG_NACH_ID = {}; UEBUNGEN.forEach(function (u) { UEBUNG_NACH_ID[u.id] = u; });"
  + "let gesperrt = []; let fehlen = [];"
  + "function geraeteVorhanden() { return ['alles']; }"
  + "function uebungGeraete(u) { return fehlen.indexOf(u.id) !== -1 ? ['fehlt'] : []; }"
  + "function uebungEingeschraenkt(u) { return gesperrt.indexOf(u.id) !== -1; }"
  + "function vorschlagKandidaten() { return []; }"
  + "function pauseStandard() { return 120; }"
  + "function vorlagenGeplant() { return 0; }"
  + KONSTANTEN.map(konstanteHolen).join("") + FUNKTIONEN.map(funktionHolen).join("")
  + "return { coachBereinigen, coachPlanBauen, coachDauer, coachSlotWerte, VORLAGEN_PLAENE, UEBUNG_NACH_ID,"
  + " sperren: function (ids) { gesperrt = ids; }, ohneGeraet: function (ids) { fehlen = ids; } };")();

function antworten(o) {
  return Object.assign({ ziel: "beides", tage: 4, minuten: 60, erfahrung: "fortgeschritten", schwerpunkt: [] }, o);
}
function vorlage(id) {
  for (const p of f.VORLAGEN_PLAENE) {
    for (const v of p.varianten) {
      if (v.id === id) {
        return v;
      }
    }
  }
  return null;
}

// Bereinigen
const b = f.coachBereinigen({ ziel: "kraft", tage: 7, minuten: 60, erfahrung: "profi", schwerpunkt: ["arme", "arme", "beine", "brust", "po"], x: 1 });
pruefe("Bereinigen: gültiges Ziel bleibt", b.ziel === "kraft");
pruefe("Bereinigen: ungültige Tage und Erfahrung fallen weg", !("tage" in b) && !("erfahrung" in b));
pruefe("Bereinigen: Schwerpunkt ohne Doppelte, höchstens 2", JSON.stringify(b.schwerpunkt) === '["arme","beine"]', JSON.stringify(b.schwerpunkt));
pruefe("Bereinigen: Unbekanntes fällt weg", !("x" in b));
pruefe("Bereinigen: kaputt gibt leer", JSON.stringify(f.coachBereinigen(null)) === "{}" && JSON.stringify(f.coachBereinigen([1])) === "{}");

// Aufteilung
pruefe("2 Tage: Ganzkörper", f.coachPlanBauen(antworten({ tage: 2 })).basis === "2-ganzkoerper");
pruefe("3 Tage: OK/UK/GK", f.coachPlanBauen(antworten({ tage: 3 })).basis === "3-ok-uk-gk");
pruefe("3 Tage Anfänger: Ganzkörper", f.coachPlanBauen(antworten({ tage: 3, erfahrung: "anfaenger" })).basis === "3-ganzkoerper");
pruefe("4 Tage: OK/UK", f.coachPlanBauen(antworten({ tage: 4 })).basis === "4-ok-uk");
pruefe("5 Tage: PPL + OK/UK", f.coachPlanBauen(antworten({ tage: 5 })).basis === "5-ppl-ok-uk");
pruefe("5 Tage mit Schwerpunkt Arme: Brust/Rücken-Split", f.coachPlanBauen(antworten({ tage: 5, schwerpunkt: ["arme"] })).basis === "5-brust-ruecken");
pruefe("6 Tage: PPL", f.coachPlanBauen(antworten({ tage: 6 })).basis === "6-ppl");
pruefe("Gewählte Aufteilung gilt", f.coachPlanBauen(antworten({ tage: 4 }), "4-push-pull").basis === "4-push-pull");
pruefe("Unbekannte Aufteilung: erste der Tageszahl", f.coachPlanBauen(antworten({ tage: 4 }), "gibt-es-nicht").basis === "4-ok-uk");
const p4 = f.coachPlanBauen(antworten({ tage: 4 }));
pruefe("Plan ist eine Variante mit id korund", p4.id === "korund" && p4.korund === true && p4.tage.length === 4 && p4.wochentage.length === 4);

// Werte je Platz, ohne Zeitanpassung prüfen: 90 Minuten Spielraum nach oben verhindert Kürzen, Vergleich mit der Vorlage
const basis = vorlage("4-ok-uk");
const kraft = f.coachPlanBauen(antworten({ ziel: "kraft", minuten: 90 }));
pruefe("Kraft: Platz 1 und 2 mit 4–6 Wdh. und 3:00 Pause", kraft.tage.every(t => t.slots.slice(0, 2).every(s => s.wdhVon === 4 && s.wdhBis === 6 && s.pause === 180)));
pruefe("Kraft: ab Platz 3 Wdh. wie Vorlage, Standard-Pause", kraft.tage.every((t, i) => t.slots.slice(2).every((s, k) => s.wdhVon === basis.tage[i].slots[k + 2].wdhVon && s.pause === null)));
const kraftA = f.coachPlanBauen(antworten({ ziel: "kraft", erfahrung: "anfaenger", minuten: 90 }));
pruefe("Kraft Anfänger: Platz 1 und 2 mit 5–8 Wdh.", kraftA.tage.every(t => t.slots.slice(0, 2).every(s => s.wdhVon === 5 && s.wdhBis === 8)));
const muskel = f.coachPlanBauen(antworten({ ziel: "muskel", minuten: 90 }));
pruefe("Muskelaufbau: Platz 1 und 2 mit 6–10", muskel.tage.every(t => t.slots.slice(0, 2).every(s => s.wdhVon === 6 && s.wdhBis === 10)));
pruefe("Muskelaufbau: sonst oberes Ende mindestens 10", muskel.tage.every(t => t.slots.slice(2).every(s => s.wdhBis >= 10)));
const beides = f.coachPlanBauen(antworten({ ziel: "beides", minuten: 45 }));
pruefe("Beides: Wdh. wie Vorlage", beides.tage.every((t, i) => t.slots.every(s => basis.tage[i].slots.some(v => v.wdhVon === s.wdhVon && v.wdhBis === s.wdhBis))));

// Sätze nach Erfahrung und Schwerpunkt (ein Platz mit 3 Sätzen, ohne Zeitanpassung)
const slot3 = { saetze: 3, wdhVon: 6, wdhBis: 10 };
const brustU = f.UEBUNG_NACH_ID["bankdruecken-lh"];
pruefe("Anfänger: 1 Satz weniger", f.coachSlotWerte(slot3, 0, antworten({ erfahrung: "anfaenger" }), brustU).saetze === 2);
pruefe("Fortgeschritten: wie Vorlage", f.coachSlotWerte(slot3, 0, antworten({}), brustU).saetze === 3);
pruefe("Erfahren: Platz 1 und 2 einer mehr", f.coachSlotWerte(slot3, 1, antworten({ erfahrung: "erfahren" }), brustU).saetze === 4 && f.coachSlotWerte(slot3, 2, antworten({ erfahrung: "erfahren" }), brustU).saetze === 3);
pruefe("Schwerpunkt Brust: einer mehr", f.coachSlotWerte(slot3, 3, antworten({ schwerpunkt: ["brust"] }), brustU).saetze === 4);
pruefe("Schwerpunkt Beine: Brust bleibt", f.coachSlotWerte(slot3, 3, antworten({ schwerpunkt: ["beine"] }), brustU).saetze === 3);
pruefe("Erfahren + Schwerpunkt bei 4 Sätzen: höchstens 5", f.coachSlotWerte({ saetze: 4, wdhVon: 6, wdhBis: 10 }, 0, antworten({ erfahrung: "erfahren", schwerpunkt: ["brust"] }), brustU).saetze === 5);
pruefe("Anfänger mit 2 Sätzen: bleibt 2", f.coachSlotWerte({ saetze: 2, wdhVon: 6, wdhBis: 10 }, 3, antworten({ erfahrung: "anfaenger" }), brustU).saetze === 2);
pruefe("Nie mehr als 5 Sätze, nie weniger als 2", [2, 3, 4, 5, 6].every(t => ["anfaenger", "fortgeschritten", "erfahren"].every(e => [45, 60, 75, 90].every(m =>
  f.coachPlanBauen(antworten({ tage: t, erfahrung: e, minuten: m, schwerpunkt: ["arme", "beine"] })).tage.every(tag => tag.slots.every(s => s.saetze >= 2 && s.saetze <= 5))))));
pruefe("Anfänger höchstens 4 Sätze", [45, 60, 75, 90].every(m => f.coachPlanBauen(antworten({ erfahrung: "anfaenger", minuten: m })).tage.every(t => t.slots.every(s => s.saetze <= 4))));

// Zeit: nie länger als Zeit + 5 Minuten, solange gekürzt werden kann
let zuLang = 0;
for (const t of [2, 3, 4, 5, 6]) {
  for (const e of ["anfaenger", "fortgeschritten", "erfahren"]) {
    for (const m of [45, 60, 75, 90]) {
      for (const z of ["kraft", "muskel", "beides"]) {
        const p = f.coachPlanBauen(antworten({ tage: t, erfahrung: e, minuten: m, ziel: z }));
        p.tage.forEach(tag => {
          if (f.coachDauer(tag.slots) > m + 5 && tag.slots.some(s => s.saetze > 2)) {
            zuLang++;
          }
        });
      }
    }
  }
}
pruefe("Zeit: kein Tag länger als Zeit + 5 Minuten (180 Pläne)", zuLang === 0, zuLang);
const kurz = f.coachPlanBauen(antworten({ tage: 2, minuten: 45, ziel: "kraft", erfahrung: "erfahren" }));
pruefe("Zeit: mindestens 4 Übungen bleiben", kurz.tage.every(t => t.slots.length >= 4));
const lang = f.coachPlanBauen(antworten({ tage: 6, minuten: 90 }));
const normal = f.coachPlanBauen(antworten({ tage: 6, minuten: 45 }));
pruefe("Zeit: mehr Zeit gibt mehr Sätze", lang.tage[0].slots.reduce((a, s) => a + s.saetze, 0) > normal.tage[0].slots.reduce((a, s) => a + s.saetze, 0));

// Geräte und Einschränkungen
const std = basis.tage[0].slots[0].uebungId;
f.sperren([std]);
const gesperrt = f.coachPlanBauen(antworten({ minuten: 1000 }));
pruefe("Eingeschränkte Standard-Übung wird ersetzt", gesperrt.tage[0].slots[0].uebungId !== std && gesperrt.tage[0].slots[0].muster === basis.tage[0].slots[0].muster, gesperrt.tage[0].slots[0].uebungId);
f.sperren([]);
const muster = basis.tage[0].slots[0].muster;
const alle = [basis.tage[0].slots[0].uebungId].concat(VORLAGEN_ALTERNATIVEN(muster));
function VORLAGEN_ALTERNATIVEN(m) {
  const plan = lesen("vorlagen.js");
  return new Function(plan + "return VORLAGEN_MUSTER;")()[m].alternativen;
}
f.ohneGeraet(alle);
const ohne = f.coachPlanBauen(antworten({ minuten: 1000 }));
pruefe("Ohne passendes Gerät fällt der Platz weg und zählt bei fehlt", ohne.fehlt >= 1 && ohne.tage[0].slots.every(s => s.muster !== muster));
f.ohneGeraet([]);
pruefe("Keine Übung doppelt an einem Tag", f.coachPlanBauen(antworten({ tage: 5 })).tage.every(t => new Set(t.slots.map(s => s.uebungId)).size === t.slots.length));

// Backup, Speicher, Texte
pruefe("Backup-Version 13 mit Feld coach", /version: 13,/.test(funktionHolen("backupText")) && /coach: coach,/.test(funktionHolen("backupText")));
pruefe("Import: Ersetzen übernimmt, Ergänzen nur ohne eigene Antworten", /importCoach !== null && \(art === "ersetzen" \|\| Object\.keys\(coach\)\.length === 0\)/.test(quelle));
pruefe("Import bereinigt", /importCoach = coachBereinigen\(daten\.coach\)/.test(quelle));
pruefe("Schlüssel in EINFUEHRUNG_APP_SCHLUESSEL", /"cloudZuletzt", "coach"\]/.test(einfuehrung));
pruefe("Übernehmen nimmt die Pause des Plans", /pause: slot\.pause \? uebungPauseLesen\(slot\.pause\) : null/.test(funktionHolen("vorlageUebernehmen")));
const TEXTE = new Function(texte + "; return TEXTE;")();
const coachTexte = Object.keys(TEXTE).filter(k => k.indexOf("coach.") === 0);
pruefe("Texte des Coachs DE und EN", coachTexte.length > 20 && coachTexte.every(k => TEXTE[k].de && TEXTE[k].en), coachTexte.length);
const benutzt = (quelle.match(/txt\("coach\.[a-zA-Z.]*[a-zA-Z]"[,)]/g) || []).map(t => t.slice(5, -2));
pruefe("Jeder benutzte Text existiert", benutzt.every(k => TEXTE[k]), benutzt.filter(k => !TEXTE[k]).join(", "));
pruefe("Text der Variante korund", TEXTE["vorlage.variante.korund"] && TEXTE["vorlage.variante.korund"].en);

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
if (fehler > 0) {
  process.exit(1);
}
