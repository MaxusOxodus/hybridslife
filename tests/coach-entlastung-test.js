// Test: Stillstand und Entlastungswoche des Coachs (seit Version 150). Die Regeln stehen in der app.js
// (coachStillstaende, coachAbfall, entlastungGrund, entlastungGewicht). Übungen und ihre 1RM-Werte je Tag sind hier
// nachgebaut. Dazu: Training in der Entlastungswoche halbiert die Ziel-Sätze nur im laufenden Training, Backup-Feld coach.
// Starten mit: node tests/coach-entlastung-test.js

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const texte = fs.readFileSync(new URL("../texte.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
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

const TAG = 86400000;
const HEUTE = new Date(2026, 9, 18, 12).getTime();
const KONSTANTEN = ["STILLSTAND_FENSTER_TAGE", "STILLSTAND_MIN_EINHEITEN", "STILLSTAND_LETZTE", "STILLSTAND_MIN_TAGE",
  "ENTLASTUNG_STILLSTAENDE", "ENTLASTUNG_ABFALL", "ENTLASTUNG_ABFALL_UEBUNGEN", "ENTLASTUNG_ABSTAND_TAGE",
  "ENTLASTUNG_RUECKBLICK_TAGE", "ENTLASTUNG_GEWICHT", "COACH_ZIELE", "COACH_TAGE", "COACH_MINUTEN", "COACH_ERFAHRUNG",
  "COACH_SCHWERPUNKTE", "COACH_MAX_SCHWERPUNKT", "COACH_MAX_ENTSCHEIDUNGEN", "COACH_MAX_BEWERTUNGEN", "COACH_ENTSCHEIDUNG_ARTEN"];
const f = new Function("const TAG_MS = " + TAG + "; let uebungen = []; let coach = {}; let blockStart = 0;"
  + "const Date = globalThis.Date;"
  + "function trainierteUebungen() { return uebungen.map(function (u) { return { name: u.name, id: u.name }; }); }"
  + "function verlaufPunkte(name) { return uebungen.filter(function (u) { return u.name === name; })[0].punkte; }"
  + "function steigerungSchritt(u) { return u.kurz ? 2 : 2.5; } function ausKg(x) { return x; } function zuKg(x) { return x; }"
  + "function rueckblickStart() { return blockStart; }"
  + KONSTANTEN.map(konstanteHolen).join("")
  + ["coachStillstaende", "coachAbfall", "entlastungGrund", "entlastungGewicht", "entlastungAktiv", "coachZahl", "coachBereinigen"].map(n => funktionHolen(n)).join("")
  + "return { coachStillstaende, coachAbfall, entlastungGrund, entlastungGewicht, coachBereinigen,"
  + " setze: function (u, c, s) { uebungen = u; coach = c || {}; blockStart = s || 0; } };")();

// Punkte: Liste von [Tage vor heute, 1RM], der älteste zuerst
function uebung(name, liste) {
  return { name: name, punkte: liste.map(p => ({ zeit: HEUTE - p[0] * TAG, wert: p[1] })) };
}
const steigt = uebung("steigt", [[40, 90], [33, 92], [26, 94], [19, 96], [12, 98], [5, 100]]);
const steht = uebung("steht", [[40, 90], [33, 95], [26, 95], [19, 95], [12, 95]]);
const stehtKurz = uebung("kurz", [[40, 90], [33, 95], [12, 95], [9, 95], [5, 95]]);
const wenig = uebung("wenig", [[60, 90], [50, 95], [26, 95], [19, 95], [12, 95]]);
const genau = uebung("genau", [[40, 90], [33, 95], [28, 95], [21, 95], [14, 95]]);

f.setze([steigt, steht]);
pruefe("Steigende Übung: kein Stillstand, stehende: Stillstand", JSON.stringify(f.coachStillstaende(HEUTE).map(s => s.name)) === '["steht"]');
f.setze([stehtKurz]);
pruefe("Letzte 3 Einheiten in weniger als 14 Tagen: kein Stillstand", f.coachStillstaende(HEUTE).length === 0);
f.setze([wenig]);
pruefe("Nur 3 Einheiten in 6 Wochen: kein Stillstand", f.coachStillstaende(HEUTE).length === 0);
f.setze([genau]);
pruefe("Genau 14 Tage und 4 Einheiten: Stillstand", f.coachStillstaende(HEUTE).length === 1);
f.setze([uebung("neu", [[19, 95], [12, 95], [5, 95]])]);
pruefe("Nur 3 Einheiten insgesamt: kein Stillstand (nichts davor)", f.coachStillstaende(HEUTE).length === 0);
f.setze([uebung("rekord", [[40, 90], [33, 95], [26, 94], [19, 93], [12, 95.5]])]);
pruefe("Neuer Bestwert in den letzten 3: kein Stillstand", f.coachStillstaende(HEUTE).length === 0);

// Abfall: letzter Wert höchstens 95 % des Besten im Fenster
f.setze([uebung("a", [[20, 100], [10, 100], [3, 95]]), uebung("b", [[20, 100], [3, 94]]), uebung("c", [[20, 100], [3, 96]])]);
pruefe("Abfall: genau 95 % und darunter zählen, 96 % nicht", f.coachAbfall(HEUTE) === 2, f.coachAbfall(HEUTE));

// Grund
f.setze([steht, genau, uebung("steht3", [[40, 90], [33, 95], [26, 95], [19, 95], [12, 95]])]);
pruefe("3 Stillstände: Grund stillstand", f.entlastungGrund(HEUTE, f.coachStillstaende(HEUTE)) === "stillstand");
f.setze([steht, genau]);
pruefe("2 Stillstände ohne Abfall: kein Grund", f.entlastungGrund(HEUTE, f.coachStillstaende(HEUTE)) === "");
f.setze([uebung("a", [[20, 100], [3, 90]]), uebung("b", [[20, 100], [3, 90]])]);
pruefe("2 Übungen mit Abfall: Grund abfall", f.entlastungGrund(HEUTE, []) === "abfall");
f.setze([uebung("a", [[20, 100], [3, 90]]), uebung("b", [[20, 100], [3, 90]])], { letzteEntlastung: HEUTE - 20 * TAG });
pruefe("Letzte Entlastung vor 20 Tagen: kein Grund", f.entlastungGrund(HEUTE, []) === "");
f.setze([steigt], { rueckblick: { am: HEUTE - 2 * TAG, energie: "muede", menge: "passt" } }, HEUTE - 50 * TAG);
pruefe("Rückblick müde nach 6 Wochen: Grund rueckblick", f.entlastungGrund(HEUTE, []) === "rueckblick");
f.setze([steigt], { rueckblick: { am: HEUTE - 2 * TAG, energie: "normal", menge: "viel" } }, HEUTE - 50 * TAG);
pruefe("Rückblick zu viel: Grund rueckblick", f.entlastungGrund(HEUTE, []) === "rueckblick");
f.setze([steigt], { rueckblick: { am: HEUTE - 2 * TAG, energie: "muede", menge: "passt" } }, HEUTE - 30 * TAG);
pruefe("Rückblick müde, Block erst 30 Tage: kein Grund", f.entlastungGrund(HEUTE, []) === "");
f.setze([steigt], { rueckblick: { am: HEUTE - 20 * TAG, energie: "muede", menge: "viel" } }, HEUTE - 50 * TAG);
pruefe("Rückblick älter als 14 Tage: kein Grund", f.entlastungGrund(HEUTE, []) === "");

// Gewicht
pruefe("90 % von 75 kg = 67,5 kg", f.entlastungGewicht(75, {}) === 67.5);
pruefe("90 % von 100 kg = 90 kg", f.entlastungGewicht(100, {}) === 90);
pruefe("90 % von 32 kg Kurzhantel = 28 kg (Schritt 2)", f.entlastungGewicht(32, { kurz: true }) === 28, f.entlastungGewicht(32, { kurz: true }));
pruefe("Eigengewicht ohne Zusatz bleibt 0", f.entlastungGewicht(0, {}) === 0);

// Bereinigen der neuen Felder
const b = f.coachBereinigen({ ziel: "kraft", entlastung: { von: HEUTE, bis: HEUTE + 7 * TAG }, letzteEntlastung: "x",
  rueckblick: { am: HEUTE, energie: "muede", menge: "viel" }, ausgeblendet: { entlastung: HEUTE, quatsch: HEUTE } });
pruefe("Bereinigen: Entlastung bleibt", b.entlastung && b.entlastung.bis === HEUTE + 7 * TAG);
pruefe("Bereinigen: kaputte letzteEntlastung fällt weg", !("letzteEntlastung" in b));
pruefe("Bereinigen: Rückblick bleibt", b.rueckblick && b.rueckblick.energie === "muede");
pruefe("Bereinigen: nur bekannte Karten ausgeblendet", JSON.stringify(Object.keys(b.ausgeblendet)) === '["entlastung"]');
pruefe("Bereinigen: Entlastung mit bis vor von fällt weg", !("entlastung" in f.coachBereinigen({ entlastung: { von: HEUTE, bis: HEUTE - 1 } })));

// Gedächtnis (seit Version 154)
const g = f.coachBereinigen({ entscheidungen: [{ am: HEUTE, art: "plan", angenommen: 1, info: "x".repeat(80) }, { am: HEUTE, art: "quatsch" }, { am: "x", art: "plan" }],
  bewertungen: [{ am: HEUTE, art: "wochenbericht", schluessel: "1:mehr", gut: 0 }, { am: HEUTE, art: 5 }], wochenbericht: HEUTE });
pruefe("Gedächtnis: nur gültige Entscheidungen, Info gekürzt", g.entscheidungen.length === 1 && g.entscheidungen[0].angenommen === true && g.entscheidungen[0].info.length === 60);
pruefe("Gedächtnis: nur gültige Bewertungen", g.bewertungen.length === 1 && g.bewertungen[0].gut === false);
pruefe("Gedächtnis: Woche des Berichts bleibt", g.wochenbericht === HEUTE);
const viele = f.coachBereinigen({ entscheidungen: Array.from({ length: 250 }, (_, i) => ({ am: HEUTE + i, art: "plan" })) });
pruefe("Gedächtnis: höchstens 200 Entscheidungen, die neuesten", viele.entscheidungen.length === 200 && viele.entscheidungen[199].am === HEUTE + 249);

// Training und Texte
const beginnen = funktionHolen("trainingBeginnen");
pruefe("Training: Ziel-Sätze halbiert, aufgerundet, mindestens 1", /neu\.zielSaetze = Math\.max\(1, Math\.ceil\(neu\.zielSaetze \/ 2\)\)/.test(beginnen));
pruefe("Training: nur in der Entlastungswoche und mit Merker", /if \(entlastungAktiv\(\)\)/.test(beginnen) && /neu\.entlastung = true/.test(beginnen));
pruefe("Vorschlag: in der Entlastung leichter, keine Steigerung", /if \(u\.entlastung\) \{\n\s+vorschlag\.art = "entlastung";\n\s+vorschlag\.gewicht = entlastungGewicht\(alt, u\);\n\s+return vorschlag;/.test(funktionHolen("steigerungVorschlag")));
pruefe("Rückblick merkt Energie und Menge", /coach\.rueckblick = \{ am: einstellungen\.rueckblickAm, energie: rueckblick\.energie, menge: rueckblick\.menge \}/.test(funktionHolen("rueckblickUebernehmen")));
const TEXTE = new Function(texte + "; return TEXTE;")();
const benutzt = (quelle.match(/txt\("(entlastung|stillstand)\.[a-zA-Z.]*[a-zA-Z]"[,)]/g) || []).map(t => t.slice(5, -2)).concat(["modus.entlastung", "coach.nichtJetzt", "coach.verstanden"]);
pruefe("Texte DE und EN", benutzt.every(k => TEXTE[k] && TEXTE[k].de && TEXTE[k].en), benutzt.filter(k => !TEXTE[k]).join(", "));
pruefe("Gründe haben Texte", ["stillstand", "abfall", "rueckblick"].every(g => TEXTE["entlastung.grund." + g]));

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
if (fehler > 0) {
  process.exit(1);
}
