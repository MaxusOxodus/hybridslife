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
const KONSTANTEN = ["STILLSTAND_JETZT_TAGE", "STILLSTAND_VORHER_TAGE", "STILLSTAND_MIN_PUNKTE", "STILLSTAND_MAX_LUECKE_TAGE", "ABFALL_EINHEITEN", "ABFALL_BEZUG_TAGE",
  "COACH_AUSBLENDEN_TAGE", "STILLSTAND_BESTAETIGT_TAGE", "STILLSTAND_AUSBLENDEN_TAGE", "ENTLASTUNG_STILLSTAENDE", "ENTLASTUNG_ABFALL", "ENTLASTUNG_ABFALL_UEBUNGEN", "ENTLASTUNG_ABSTAND_TAGE",
  "ENTLASTUNG_RUECKBLICK_TAGE", "ENTLASTUNG_GEWICHT", "COACH_ZIELE", "COACH_TAGE", "COACH_MINUTEN", "COACH_ERFAHRUNG",
  "COACH_SCHWERPUNKTE", "COACH_MAX_SCHWERPUNKT", "COACH_MAX_ENTSCHEIDUNGEN", "COACH_MAX_BEWERTUNGEN", "COACH_ENTSCHEIDUNG_ARTEN"];
const f = new Function("const TAG_MS = " + TAG + "; let uebungen = []; let coach = {}; let blockStart = 0;"
  + "const Date = globalThis.Date;"
  + "function trainierteUebungen() { return uebungen.map(function (u) { return { name: u.name, id: u.name }; }); }"
  + "function verlaufPunkte(name) { return uebungen.filter(function (u) { return u.name === name; })[0].punkte; }"
  + "function steigerungSchritt(u) { return u.kurz ? 2 : 2.5; } function ausKg(x) { return x; } function zuKg(x) { return x; }"
  + "function rueckblickStart() { return blockStart; }"
  + KONSTANTEN.map(konstanteHolen).join("")
  + ["median", "punkteLuecke", "coachStillstaende", "coachStillstaendeGemeldet", "coachAusgeblendet", "coachAbfall", "entlastungGrund", "entlastungGewicht", "entlastungAktiv", "coachZahl", "coachBereinigen"].map(n => funktionHolen(n)).join("")
  + "return { coachStillstaende, coachStillstaendeGemeldet, coachAusgeblendet, coachAbfall, entlastungGrund, entlastungGewicht, coachBereinigen,"
  + " setze: function (u, c, s) { uebungen = u; coach = c || {}; blockStart = s || 0; } };")();

// Punkte: Liste von [Tage vor heute, 1RM], der älteste zuerst
function uebung(name, liste) {
  return { name: name, punkte: liste.map(p => ({ zeit: HEUTE - p[0] * TAG, wert: p[1] })) };
}
// Seit Version 175 (Audit Phase 2, K2/K3): Stillstand = Median der letzten 28 Tage nicht über dem Median der 56 Tage davor,
// je mindestens 3 Trainingstage, keine Lücke über 14 Tage. Abfall = die letzten 2 Tage beide ≤ 95 % des Medians der 42 Tage davor.
// Gleichmäßige Reihe: alle abstand Tage von vor tage bis heute, Wert start × (1 + proWoche)^(Wochen)
function reihe(name, tage, abstand, start, proWoche) {
  const liste = [];
  for (let t = tage; t >= 0; t -= abstand) {
    liste.push([t, Math.round(start * Math.pow(1 + proWoche, (tage - t) / 7) * 100) / 100]);
  }
  return uebung(name, liste);
}
const steigt = reihe("steigt", 84, 7, 90, 0.01);
const flach1 = reihe("flach1", 84, 7, 100, 0);
const flach2 = reihe("flach2", 84, 3.5, 100, 0);

f.setze([steigt, flach1]);
pruefe("1×/Woche: steigende Übung kein Stillstand, flache Stillstand", JSON.stringify(f.coachStillstaende(HEUTE).map(s => s.name)) === '["flach1"]', JSON.stringify(f.coachStillstaende(HEUTE)));
f.setze([flach2]);
pruefe("2×/Woche flach: Stillstand (vorher nie erkannt)", f.coachStillstaende(HEUTE).length === 1);
f.setze([reihe("steigt2", 84, 3.5, 90, 0.01)]);
pruefe("2×/Woche steigend 1 %/Woche: kein Stillstand", f.coachStillstaende(HEUTE).length === 0);
f.setze([uebung("glueck", [[77, 100], [70, 100], [63, 112], [56, 100], [49, 100], [42, 100], [35, 100], [21, 102], [14, 103], [7, 102], [0, 103]])]);
pruefe("Ein einzelner Glückstag (112) davor entscheidet nicht: kein Stillstand", f.coachStillstaende(HEUTE).length === 0);
f.setze([uebung("wenigJetzt", [[77, 100], [63, 100], [49, 100], [35, 100], [14, 100], [3, 100]])]);
pruefe("Nur 2 Trainingstage in den letzten 28 Tagen: kein Stillstand", f.coachStillstaende(HEUTE).length === 0);
f.setze([uebung("pause", [[84, 110], [77, 110], [70, 110], [63, 110], [20, 95], [13, 97], [6, 99]])]);
pruefe("Nach einer Pause über 14 Tage niedriger: kein Stillstand", f.coachStillstaende(HEUTE).length === 0);
f.setze([uebung("unregel", [[80, 100], [70, 100], [57, 100], [45, 100], [33, 100], [25, 100], [12, 100], [3, 100]])]);
pruefe("Unregelmäßige Abstände bis 13 Tage, flach: Stillstand", f.coachStillstaende(HEUTE).length === 1);
f.setze([uebung("neu", [[19, 95], [12, 95], [5, 95]])]);
pruefe("Nur 3 Trainingstage insgesamt (nichts davor): kein Stillstand", f.coachStillstaende(HEUTE).length === 0);
f.setze([uebung("gleich", [[70, 98], [56, 100], [42, 102], [30, 100], [21, 99], [14, 100], [7, 101]])]);
pruefe("Median gleich (100 = 100): Stillstand", f.coachStillstaende(HEUTE).length === 1);
f.setze([uebung("knapp", [[70, 98], [56, 100], [42, 102], [30, 100], [21, 99], [14, 100.5], [7, 101]])]);
pruefe("Median knapp höher (100,5 > 100): kein Stillstand", f.coachStillstaende(HEUTE).length === 0);
f.setze([uebung("ausreisser", [[77, 100], [70, 100], [63, 100], [56, 100], [49, 100], [42, 100], [35, 100], [21, 100], [14, 100], [7, 130]])]);
pruefe("Ein Ausreißer nach oben (130) zählt nicht: Median 100 = 100, Stillstand (ein Mittelwert wäre 110)", f.coachStillstaende(HEUTE).length === 1);

// Abfall: die letzten 2 Trainingstage beide ≤ 95 % des Medians der 42 Tage davor
f.setze([uebung("a", [[35, 100], [28, 100], [21, 100], [14, 100], [7, 100], [2, 90]])]);
pruefe("Ein einzelner schlechter Tag: kein Abfall", f.coachAbfall(HEUTE) === 0);
f.setze([uebung("a", [[35, 100], [28, 100], [21, 100], [14, 100], [7, 94], [2, 93]])]);
pruefe("Zwei schlechte Tage in Folge: Abfall", f.coachAbfall(HEUTE) === 1);
f.setze([uebung("a", [[35, 100], [28, 100], [21, 100], [7, 95], [2, 95]]), uebung("b", [[35, 100], [28, 100], [21, 100], [7, 95.5], [2, 90]])]);
pruefe("Genau 95 % zählt, 95,5 % nicht", f.coachAbfall(HEUTE) === 1, f.coachAbfall(HEUTE));
f.setze([uebung("a", [[60, 100], [50, 100], [40, 100], [30, 90], [20, 90]])]);
pruefe("Letzter Tag vor 20 Tagen: kein Abfall (nicht aktuell)", f.coachAbfall(HEUTE) === 0);
f.setze([uebung("a", [[90, 100], [85, 100], [80, 100], [9, 90], [2, 90]])]);
pruefe("Nach einer Pause über 14 Tage: kein Abfall", f.coachAbfall(HEUTE) === 0);
f.setze([uebung("a", [[14, 100], [10, 100], [7, 90], [2, 90]])]);
pruefe("Nur 2 Tage als Bezug: kein Abfall", f.coachAbfall(HEUTE) === 0);
f.setze([uebung("a", [[40, 100], [38, 100], [36, 100], [16, 100], [7, 90], [2, 90]])]);
pruefe("Lücke von 20 Tagen mitten im Bezug: kein Abfall", f.coachAbfall(HEUTE) === 0);
f.setze([uebung("a", [[35, 100], [28, 112], [21, 100], [14, 100], [7, 100], [2, 100]])]);
pruefe("Glückstag im Bezug zählt nicht (Median): kein Abfall bei 100", f.coachAbfall(HEUTE) === 0);

// Grund
const flach3 = reihe("flach3", 84, 7, 80, 0);
f.setze([flach1, flach2, flach3]);
pruefe("3 Stillstände: Grund stillstand", f.entlastungGrund(HEUTE, f.coachStillstaende(HEUTE)) === "stillstand");
f.setze([flach1, flach2]);
pruefe("2 Stillstände ohne Abfall: kein Grund", f.entlastungGrund(HEUTE, f.coachStillstaende(HEUTE)) === "");
const ab1 = uebung("a", [[35, 100], [28, 100], [21, 100], [14, 100], [7, 90], [2, 90]]);
const ab2 = uebung("b", [[35, 100], [28, 100], [21, 100], [14, 100], [7, 90], [2, 90]]);
f.setze([ab1, ab2]);
pruefe("2 Übungen mit Abfall: Grund abfall", f.entlastungGrund(HEUTE, []) === "abfall");
f.setze([ab1]);
pruefe("1 Übung mit Abfall: kein Grund", f.entlastungGrund(HEUTE, []) === "");
// Überschneidung: Ein Abfall senkt auch den Median der letzten 4 Wochen, die Übung zählt dann zugleich als Stillstand.
// Seit Version 175 gewinnt der genauere Grund, der Abfall.
function eingebrochen(name) {
  return uebung(name, [[84, 100], [77, 100], [70, 100], [63, 100], [56, 100], [49, 100], [42, 100], [35, 100], [28, 100], [21, 100], [14, 100], [7, 90], [0, 90]]);
}
f.setze([eingebrochen("x"), eingebrochen("y"), eingebrochen("z")]);
pruefe("Abfall in 3 Übungen, die zugleich als Stillstand zählen: Grund abfall",
  f.coachStillstaende(HEUTE).length === 3 && f.coachAbfall(HEUTE) === 3 && f.entlastungGrund(HEUTE, f.coachStillstaende(HEUTE)) === "abfall",
  f.coachStillstaende(HEUTE).length + "/" + f.coachAbfall(HEUTE) + "/" + f.entlastungGrund(HEUTE, f.coachStillstaende(HEUTE)));
f.setze([ab1, ab2], { letzteEntlastung: HEUTE - 20 * TAG });
pruefe("Letzte Entlastung vor 20 Tagen: kein Grund", f.entlastungGrund(HEUTE, []) === "");
f.setze([steigt], { rueckblick: { am: HEUTE - 2 * TAG, energie: "muede", menge: "passt" } }, HEUTE - 50 * TAG);
pruefe("Rückblick müde nach 6 Wochen: Grund rueckblick", f.entlastungGrund(HEUTE, []) === "rueckblick");
f.setze([steigt], { rueckblick: { am: HEUTE - 2 * TAG, energie: "normal", menge: "viel" } }, HEUTE - 50 * TAG);
pruefe("Rückblick zu viel: Grund rueckblick", f.entlastungGrund(HEUTE, []) === "rueckblick");
f.setze([steigt], { rueckblick: { am: HEUTE - 2 * TAG, energie: "muede", menge: "passt" } }, HEUTE - 30 * TAG);
pruefe("Rückblick müde, Block erst 30 Tage: kein Grund", f.entlastungGrund(HEUTE, []) === "");
f.setze([steigt], { rueckblick: { am: HEUTE - 20 * TAG, energie: "muede", menge: "viel" } }, HEUTE - 50 * TAG);
pruefe("Rückblick älter als 14 Tage: kein Grund", f.entlastungGrund(HEUTE, []) === "");

// Seit Version 176: gemeldet wird ein Stillstand erst, wenn er auch 7 Tage vorher schon galt; „Verstanden“ blendet die
// Stillstand-Karte 28 Tage aus, „Nicht jetzt“ die Entlastungskarte weiter 7 Tage (bei anhaltendem Plateau wöchentlich wieder)
f.setze([flach2]);
pruefe("176: 2×/Woche Plateau über 12 Wochen: gleich gemeldet (galt auch vor 7 Tagen)", f.coachStillstaendeGemeldet(HEUTE).length === 1);
f.setze([steigt, reihe("steigt2", 84, 3.5, 90, 0.01)]);
pruefe("176: Fortschritt 1 %/Woche (1× und 2×): nichts gemeldet", f.coachStillstaendeGemeldet(HEUTE).length === 0);
// Erst seit dieser Woche erfüllt: heute Median 100 = 100, vor 7 Tagen noch 105 > 100
const frisch = [[84, 100], [77, 100], [70, 100], [63, 100], [56, 100], [49, 100], [42, 100], [35, 100], [28, 110], [21, 110], [14, 100], [7, 100], [0, 100]];
f.setze([uebung("frisch", frisch)]);
pruefe("176: Stillstand erst seit dieser Woche: heute erfüllt, aber noch nicht gemeldet",
  f.coachStillstaende(HEUTE).length === 1 && f.coachStillstaende(HEUTE - 7 * TAG).length === 0 && f.coachStillstaendeGemeldet(HEUTE).length === 0);
f.setze([uebung("frisch", frisch.concat([[-7, 100]]))]);
pruefe("176: Eine Woche später, weiter flach: gemeldet", f.coachStillstaendeGemeldet(HEUTE + 7 * TAG).length === 1);
f.setze([flach1, flach2, flach3]);
pruefe("176: 3 gemeldete Stillstände: Grund stillstand", f.entlastungGrund(HEUTE, f.coachStillstaendeGemeldet(HEUTE)) === "stillstand");
// Abgrenzung: frischer Einbruch nach Fortschritt in 2 Übungen ist ein Abfall, kein gemeldeter Stillstand
function einbruch(name) {
  const u = reihe(name, 84, 3.5, 90, 0.01);
  u.punkte.slice(-2).forEach(function (p) { p.wert = Math.round(p.wert * 0.88 * 100) / 100; });
  return u;
}
f.setze([einbruch("e1"), einbruch("e2")]);
pruefe("176: Frischer Einbruch um 12 % in 2 Übungen: Abfall, kein gemeldeter Stillstand, Grund abfall",
  f.coachAbfall(HEUTE) === 2 && f.coachStillstaendeGemeldet(HEUTE).length === 0 && f.entlastungGrund(HEUTE, f.coachStillstaendeGemeldet(HEUTE)) === "abfall",
  f.coachAbfall(HEUTE) + "/" + f.coachStillstaendeGemeldet(HEUTE).length + "/" + f.entlastungGrund(HEUTE, f.coachStillstaendeGemeldet(HEUTE)));
// Ausblenden (mit der echten Uhr, coachAusgeblendet nutzt Date.now)
const jetztMs = Date.now();
f.setze([], { ausgeblendet: { stillstand: jetztMs - 10 * TAG } });
pruefe("176: „Verstanden“ vor 10 Tagen: Stillstand noch ausgeblendet", f.coachAusgeblendet("stillstand") === true);
f.setze([], { ausgeblendet: { stillstand: jetztMs - 27 * TAG } });
pruefe("176: „Verstanden“ vor 27 Tagen: noch ausgeblendet", f.coachAusgeblendet("stillstand") === true);
f.setze([], { ausgeblendet: { stillstand: jetztMs - 29 * TAG } });
pruefe("176: „Verstanden“ vor 29 Tagen: wieder sichtbar", f.coachAusgeblendet("stillstand") === false);
f.setze([], { ausgeblendet: { entlastung: jetztMs - 6 * TAG } });
pruefe("176: „Nicht jetzt“ vor 6 Tagen: Entlastung ausgeblendet", f.coachAusgeblendet("entlastung") === true);
f.setze([flach1, flach2, flach3], { ausgeblendet: { entlastung: jetztMs - 8 * TAG } });
pruefe("176: „Nicht jetzt“ vor 8 Tagen bei anhaltendem Plateau: Entlastung wieder dran und nicht ausgeblendet",
  f.coachAusgeblendet("entlastung") === false && f.entlastungGrund(HEUTE, f.coachStillstaendeGemeldet(HEUTE)) === "stillstand");
f.setze([], { ausgeblendet: { entlastung: jetztMs - 10 * TAG, stillstand: jetztMs - 10 * TAG } });
pruefe("176: Beide vor 10 Tagen weggetippt: Entlastung sichtbar, Stillstand ausgeblendet", f.coachAusgeblendet("entlastung") === false && f.coachAusgeblendet("stillstand") === true);
f.setze([], {});
pruefe("176: Nie weggetippt: nichts ausgeblendet", f.coachAusgeblendet("entlastung") === false && f.coachAusgeblendet("stillstand") === false);

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
