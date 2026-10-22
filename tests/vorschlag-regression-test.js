// Regressionstests der Audit-Phasen 4 bis 8 (seit Version 179): Satz-Vorschlag, Entlastung und Stillstand über den echten Weg.
// Alle Funktionen kommen unverändert aus der app.js und der raenge.js (steigerungVorschlag, letzterEintrag, saetzeVon, rirLesen,
// arbeitsSaetzeVon, verlaufPunkte, coachStillstaende, coachStillstaendeGemeldet …), nur die Uhr ist fest und die Daten synthetisch.
// Geprüft wird:
//  1. dieselbe Übung mehrmals in einer (Entlastungs-)Woche,
//  2. keine kumulative Senkung,
//  3. kein falscher Stillstand nach der Entlastung, ein echtes Plateau weiter erkannt,
//  6. Kurzhantel-Schritte auch über den Alias,
//  7. auffällige Gewichte: Vorschlag vorsichtig, Rückfrage beim Eintragen,
//  8. Zukunftsdaten,
//  dazu die 21-Tage-Grenze in Kalendertagen.
// Starten mit: node tests/vorschlag-regression-test.js
const fs = require("fs");
const path = require("path");
const wurzel = path.join(__dirname, "..");
const quelle = fs.readFileSync(path.join(wurzel, "app.js"), "utf8").replace(/\r\n/g, "\n");
const raenge = fs.readFileSync(path.join(wurzel, "raenge.js"), "utf8").replace(/\r\n/g, "\n");
const uebungenQuelle = fs.readFileSync(path.join(wurzel, "uebungen.js"), "utf8");
const index = fs.readFileSync(path.join(wurzel, "index.html"), "utf8");

function funktionHolen(name, src) {
  src = src || quelle;
  const t = new RegExp("\\n( *)function " + name + "\\(").exec(src);
  if (!t) {
    throw new Error("Funktion fehlt: " + name);
  }
  const ende = src.indexOf("\n" + t[1] + "}\n", t.index + 1);
  return src.slice(t.index, ende + t[1].length + 3);
}
function konstanteHolen(name, src) {
  const t = new RegExp("\\n *const " + name + " = [\\s\\S]*?;\\n").exec(src || quelle);
  if (!t) {
    throw new Error("Konstante fehlt: " + name);
  }
  return t[0];
}

const ECHT = ["satzZiel", "zaehltSeiten", "einseitig", "kurzhantel", "steigerungSchritt", "steigerungVorschlag", "vorletzterEintrag",
  "letzterEintrag", "gleicheUebung", "saetzeVon", "rirLesen", "wdhBis", "hatDatum", "istEigengewicht", "einheit", "ausKg", "zuKg",
  "istAufwaermen", "arbeitsAnzahl", "arbeitsSaetzeVon", "entlastungGewicht", "median", "punkteLuecke", "coachStillstaende",
  "coachStillstaendeGemeldet", "coachAbfall", "verlaufPunkte", "tagSchluessel", "inEntlastung", "entlastungsZeitraeume", "entlastungsEintragIds", "eintragInZukunft",
  "vorschlagAuffaellig", "arbeitsGewicht", "vorschlagEintrag", "fruehereArbeit", "gewichtUngewoehnlich", "gewichtAbweichung", "entlastungBeenden", "coachBereinigen", "coachZahl"];
const KONST = ["STEIGERN_PAUSE_TAGE", "KURZHANTEL_SCHRITT_KG", "STEIGERN_MIN_RIR", "STEIGERN_RIR_MIN_SAETZE", "STEIGERN_MAX_ANTEIL",
  "STEIGERN_EXTRA_WDH", "SENKEN_ANTEIL", "WIEDEREINSTIEG", "KURZHANTEL_NAME", "LBS_JE_KG", "GEWICHT_EINHEITEN", "ENTLASTUNG_GEWICHT",
  "ENTLASTUNG_DAUER_TAGE", "STILLSTAND_JETZT_TAGE", "STILLSTAND_VORHER_TAGE", "STILLSTAND_MIN_PUNKTE", "STILLSTAND_MAX_LUECKE_TAGE",
  "STILLSTAND_BESTAETIGT_TAGE", "ABFALL_EINHEITEN", "ABFALL_BEZUG_TAGE", "ENTLASTUNG_ABFALL", "ZUKUNFT_TOLERANZ_MS", "AUFFAELLIG_FAKTOR", "AUFFAELLIG_VERGLEICH", "AUFFAELLIG_MIN_VERGLEICH",
  "COACH_ZIELE", "COACH_TAGE", "COACH_MINUTEN", "COACH_ERFAHRUNG", "COACH_SCHWERPUNKTE", "COACH_MAX_SCHWERPUNKT",
  "COACH_MAX_ENTSCHEIDUNGEN", "COACH_MAX_BEWERTUNGEN", "COACH_ENTSCHEIDUNG_ARTEN"];

// Eine App mit diesen Einträgen, diesem Coach-Zustand und dieser Uhr. Die Übungen sind die echten aus der uebungen.js.
function umgebung(opt) {
  const RealDate = Date;
  const jetzt = opt.jetzt;
  class FakeDate extends RealDate {
    constructor(...a) {
      if (a.length === 0) {
        super(jetzt);
      } else {
        super(...a);
      }
    }
    static now() {
      return jetzt;
    }
  }
  let code = "let eintraege = " + JSON.stringify(opt.eintraege || []) + "; let coach = " + JSON.stringify(opt.coach || {}) + ";"
    + "const einstellungen = {}; let laufendesTraining = null; const geloeschteEigengewicht = []; const TAG_MS = 86400000;"
    + "let aufwaermenGewaehlt = false; let satzW = false;"
    + "function trainierteUebungen() { return " + JSON.stringify(opt.liste || [{ name: "Bankdrücken", id: "bankdruecken-lh" }]) + "; }"
    + "function koerperZusatz() { return 0; } function coachSpeichern() {} function korundSeitenSchliessen() {} function trainingAnzeigen() {}"
    + uebungenQuelle + ";const UEBUNG_NACH_ID = {}; UEBUNGEN.forEach(function (u) { UEBUNG_NACH_ID[u.id] = u; }); const ALTE_IDS_X = 0;"
    + funktionHolen("epley1RM", raenge) + funktionHolen("rangSatzGueltig", raenge) + konstanteHolen("RANG_WDH_MIN", raenge) + konstanteHolen("RANG_WDH_MAX", raenge)
    + KONST.map((k) => konstanteHolen(k)).join("") + ECHT.map((f) => funktionHolen(f)).join("")
    + "return { steigerungVorschlag, coachStillstaende, coachStillstaendeGemeldet, coachAbfall, gewichtUngewoehnlich, entlastungBeenden, coachBereinigen, kurzhantel,"
    + " neu: function (e) { eintraege.push(e); }, coach: function () { return coach; }, setzeTraining: function (t) { laufendesTraining = t; } };";
  return new Function("Date", code)(FakeDate);
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

const TAG = 86400000;
const START = new Date(2026, 6, 6, 18).getTime(); // Montag 6.7.2026, 18 Uhr
const B = "bankdruecken-lh";
const N = "Bankdrücken";
function eintrag(id, uebungId, name, tage, saetze, extra) {
  return Object.assign({ id: id, uebung: name, uebungId: uebungId, datum: new Date(START + tage * TAG).toISOString(),
    einzelsaetze: saetze.map((s) => Object.assign({ gewicht: s[0], wdh: s[1] }, s.length > 2 ? { rir: s[2] } : {})),
    saetze: saetze.length, gewicht: saetze[0][0], wdh: saetze[0][1] }, extra || {});
}
function platz(id, name, von, bis, saetze, extra) {
  return Object.assign({ name: name, uebungId: id, zielSaetze: saetze, zielWdh: von, zielWdhMax: bis, saetze: [], eintragId: "" }, extra || {});
}
function vorschlag(opt, u) {
  const app = umgebung(opt);
  app.setzeTraining({ index: 0, uebungen: [u] });
  return app.steigerungVorschlag(u);
}

// ---- 1 + 2: Entlastungswoche mit drei Einheiten derselben Übung ----
for (const mitMerker of [true, false]) {
  let ein = [eintrag("a", B, N, 0, [[100, 8], [100, 8], [100, 8]]), eintrag("b", B, N, 7, [[100, 8], [100, 8], [100, 8]])];
  const coach = { entlastung: { von: START + 14 * TAG - 3600e3, bis: START + 21 * TAG - 3600e3 } };
  const werte = [];
  for (const tag of [14, 16, 18]) {
    const v = vorschlag({ eintraege: ein, coach: coach, jetzt: START + tag * TAG }, platz(B, N, 6, 8, 2, { entlastung: true }));
    werte.push(v.art + " " + v.gewicht);
    // Ab Version 179 trägt der Eintrag den Merker, ältere Einträge nicht (dann erkennt die App sie am Zeitraum)
    ein = ein.concat([eintrag("d" + tag, B, N, tag, [[v.gewicht, 8], [v.gewicht, 8]], mitMerker ? { entlastung: true } : {})]);
  }
  pruefe("Entlastung " + (mitMerker ? "mit Merker" : "ohne Merker (alter Eintrag)") + ": jede Einheit 90 kg, kein weiteres Absinken",
    werte.join("|") === "entlastung 90|entlastung 90|entlastung 90", werte.join("|"));

  // Nach der Entlastung: Basis ist der Eintrag vor der Entlastung (3×8 @ 100 kg, Ziel 6–8 → +2,5 kg)
  const coachNach = mitMerker ? { letzteEntlastung: START + 21 * TAG - 3600e3, letzteEntlastungVon: START + 14 * TAG - 3600e3 }
    : { letzteEntlastung: START + 21 * TAG - 3600e3 }; // vor Version 179 beendet: kein Beginn gemerkt
  const nach = vorschlag({ eintraege: ein, coach: coachNach, jetzt: START + 22 * TAG }, platz(B, N, 6, 8, 3));
  pruefe("Nach der Entlastung " + (mitMerker ? "mit Merker" : "ohne Merker") + ": steigern von 100 kg", nach.art === "steigern" && nach.gewicht === 102.5, nach.art + " " + nach.gewicht);
}
// Nur Einheiten aus der Entlastung bekannt (erste Ausführung mitten in der Woche): deren Gewicht bleibt, nichts sinkt weiter
{
  const ein = [eintrag("d1", B, N, 14, [[90, 8], [90, 8]], { entlastung: true })];
  const v = vorschlag({ eintraege: ein, coach: { entlastung: { von: START + 13 * TAG, bis: START + 20 * TAG } }, jetzt: START + 16 * TAG }, platz(B, N, 6, 8, 2, { entlastung: true }));
  pruefe("Nur Entlastungseinheiten: Gewicht bleibt 90", v.art === "entlastung" && v.gewicht === 90, v.art + " " + v.gewicht);
}
// Pause zählt ab dem letzten echten Training, auch wenn es eine Entlastungseinheit war (Basis 25 Tage her, Entlastung vor 10)
{
  const ein = [eintrag("a", B, N, 0, [[100, 8], [100, 8], [100, 8]]), eintrag("d", B, N, 15, [[90, 8], [90, 8]], { entlastung: true })];
  const v = vorschlag({ eintraege: ein, coach: { letzteEntlastung: START + 20 * TAG, letzteEntlastungVon: START + 14 * TAG }, jetzt: START + 25 * TAG }, platz(B, N, 6, 8, 3));
  pruefe("Pause ab der Entlastungseinheit gerechnet, keine Pause-Meldung", v.art === "steigern" && v.gewicht === 102.5, v.art + " " + v.gewicht);
}
// entlastungBeenden merkt sich den Beginn, coachBereinigen behält ihn (Backup und Neustart)
{
  const app = umgebung({ coach: { entlastung: { von: START, bis: START + 7 * TAG } }, jetzt: START + 3 * TAG });
  app.entlastungBeenden();
  const c = app.coach();
  pruefe("Beenden merkt Beginn und Ende", c.letzteEntlastungVon === START && c.letzteEntlastung === START + 3 * TAG && !c.entlastung);
  const sauber = app.coachBereinigen(JSON.parse(JSON.stringify(c)));
  pruefe("coachBereinigen behält letzteEntlastungVon", sauber.letzteEntlastungVon === START && sauber.letzteEntlastung === START + 3 * TAG);
  pruefe("coachBereinigen verwirft Beginn nach dem Ende", app.coachBereinigen({ letzteEntlastung: 5, letzteEntlastungVon: 9 }).letzteEntlastungVon === undefined);
}

// ---- 3: kein falscher Stillstand nach der Entlastung, echtes Plateau weiter erkannt ----
// 2× pro Woche, +0,5 %/Woche ohne Rauschen, Entlastungswoche 10 mit 90 % (ohne Kaskade, wie ab Version 179)
function verlauf(proWoche, mitEntlastung, merker) {
  const ein = [];
  for (let w = 0; w < 14; w++) {
    for (const wt of [0, 3]) {
      const tag = w * 7 + wt;
      const g = 100 * Math.pow(1 + proWoche, w);
      const ent = mitEntlastung && w === 10;
      const last = Math.round((ent ? g * 0.9 : g) * 4) / 4;
      ein.push(eintrag("s" + tag, B, N, tag, [[last, 8], [last, 8]], ent && merker ? { entlastung: true } : {}));
    }
  }
  return ein;
}
const coachDanach = { letzteEntlastung: START + 77 * TAG - 3600e3, letzteEntlastungVon: START + 70 * TAG - 3600e3 };
for (const [name, ein, coach] of [["mit Merker", verlauf(0.005, true, true), coachDanach],
  ["ohne Merker, Zeitraum gemerkt", verlauf(0.005, true, false), coachDanach],
  ["ohne Merker, nur Ende gemerkt (vor Version 179)", verlauf(0.005, true, false), { letzteEntlastung: START + 77 * TAG - 3600e3 }]]) {
  const tage = [];
  for (let t = 78; t <= 96; t += 3) {
    const jetzt = START + t * TAG + 20 * 3600e3;
    tage.push(umgebung({ eintraege: ein, coach: coach, jetzt: jetzt }).coachStillstaendeGemeldet(jetzt).length);
  }
  pruefe("Kein Stillstand nach der Entlastung (" + name + ")", tage.every((n) => n === 0), tage.join(""));
}
// Hinweis (Phase 10): Die drei Prüfungen oben bestehen auch ohne den Ausschluss, weil zwei leichte Einheiten den Median
// von acht kaum bewegen. Sie zeigen nur, dass nach der Entlastung nichts gemeldet wird. Die empfindlichen Prüfungen
// (schlagen ohne den Ausschluss fehl) stehen darunter unter „Ausschluss wirkt“.
// Ohne Ausschluss (kein Merker, kein Zeitraum) zieht die leichte Woche den Median: hier zur Information, nicht gefordert
{
  const ein = verlauf(0.005, true, false);
  const tage = [];
  for (let t = 78; t <= 96; t += 3) {
    const jetzt = START + t * TAG + 20 * 3600e3;
    tage.push(umgebung({ eintraege: ein, coach: {}, jetzt: jetzt }).coachStillstaende(jetzt).length);
  }
  console.log("Info: Stillstand ohne Ausschluss der Entlastungswoche an den Prüftagen 78..96: " + tage.join(""));
}
// Ausschluss wirkt (seit Phase 10): Fälle, in denen die Entlastungswoche ohne Ausschluss eine Meldung auslöst
{
  // Stillstand: 8 Wochen 2× 100 kg, dann 2 Wochen 2× 102,5 kg, dann eine Entlastungswoche mit 4 Einheiten zu 92,5 kg.
  // Ohne Ausschluss: Median der letzten 28 Tage (4× 92,5, 4× 102,5) = 97,5 ≤ 100 → Stillstand. Mit Ausschluss: 102,5 > 100.
  const ein = [];
  for (let w = 0; w < 8; w++) for (const wt of [0, 3]) ein.push(eintrag("v" + w + wt, B, N, w * 7 + wt, [[100, 8], [100, 8]]));
  for (let w = 8; w < 10; w++) for (const wt of [0, 3]) ein.push(eintrag("n" + w + wt, B, N, w * 7 + wt, [[102.5, 8], [102.5, 8]]));
  const deload = [70, 71, 73, 75];
  const jetzt = START + 77 * TAG + 12 * 3600e3;
  const coach = { letzteEntlastung: START + 77 * TAG - 3600e3, letzteEntlastungVon: START + 70 * TAG - 3600e3 };
  const mitMerker = ein.concat(deload.map((t) => eintrag("d" + t, B, N, t, [[92.5, 8], [92.5, 8]], { entlastung: true })));
  const ohneMerker = ein.concat(deload.map((t) => eintrag("d" + t, B, N, t, [[92.5, 8], [92.5, 8]])));
  pruefe("Gegenprobe: ohne Merker und ohne Zeitraum gäbe es einen Stillstand", umgebung({ eintraege: ohneMerker, coach: {}, jetzt: jetzt }).coachStillstaende(jetzt).length === 1);
  pruefe("Ausschluss wirkt beim Stillstand (Merker)", umgebung({ eintraege: mitMerker, coach: {}, jetzt: jetzt }).coachStillstaende(jetzt).length === 0);
  pruefe("Ausschluss wirkt beim Stillstand (nur Zeitraum, alter Eintrag ohne Merker)", umgebung({ eintraege: ohneMerker, coach: coach, jetzt: jetzt }).coachStillstaende(jetzt).length === 0);
}
{
  // Abfall: 8 Wochen 2× 100 kg, dann die Entlastungswoche mit 2 Einheiten zu 90 kg. Ohne Ausschluss sind die letzten
  // zwei Einheiten ≤ 95 % des Medians → Abfall. Mit Ausschluss zählen die letzten normalen Einheiten → kein Abfall.
  const ein = [];
  for (let w = 0; w < 8; w++) for (const wt of [0, 3]) ein.push(eintrag("v" + w + wt, B, N, w * 7 + wt, [[100, 8], [100, 8]]));
  const jetzt = START + 60 * TAG + 20 * 3600e3;
  const coach = { entlastung: { von: START + 56 * TAG - 3600e3, bis: START + 63 * TAG - 3600e3 } };
  const mitMerker = ein.concat([56, 59].map((t) => eintrag("d" + t, B, N, t, [[90, 8], [90, 8]], { entlastung: true })));
  const ohneMerker = ein.concat([56, 59].map((t) => eintrag("d" + t, B, N, t, [[90, 8], [90, 8]])));
  pruefe("Gegenprobe: ohne Merker und ohne Zeitraum gäbe es einen Abfall", umgebung({ eintraege: ohneMerker, coach: {}, jetzt: jetzt }).coachAbfall(jetzt) === 1);
  pruefe("Ausschluss wirkt beim Abfall (Merker)", umgebung({ eintraege: mitMerker, coach: {}, jetzt: jetzt }).coachAbfall(jetzt) === 0);
  pruefe("Ausschluss wirkt beim Abfall (nur Zeitraum der laufenden Entlastung)", umgebung({ eintraege: ohneMerker, coach: coach, jetzt: jetzt }).coachAbfall(jetzt) === 0);
}
// Echtes Plateau (immer 100 kg, 14 Wochen, keine Entlastung): wird weiter gemeldet
{
  const jetzt = START + 96 * TAG + 20 * 3600e3;
  pruefe("Echtes Plateau weiter erkannt", umgebung({ eintraege: verlauf(0, false, false), jetzt: jetzt }).coachStillstaendeGemeldet(jetzt).length === 1);
}

// ---- 6: Kurzhantel-Schritte über den Alias ----
{
  const S = "seitheben";
  const v1 = vorschlag({ eintraege: [eintrag("x", S, "Seitheben", 0, [[4, 17], [4, 17], [4, 17]])], jetzt: START + 3 * TAG }, platz(S, "Seitheben", 12, 15, 3));
  pruefe("Seitheben 4 kg × 17 → 6 kg (+2 kg, vorher +2,5)", v1.art === "steigern" && v1.gewicht === 6, v1.art + " " + v1.gewicht);
  const v2 = vorschlag({ eintraege: [eintrag("x", S, "Seitheben", 0, [[5, 8], [5, 8], [5, 8]]), eintrag("y", S, "Seitheben", 3, [[5, 8], [5, 8], [5, 8]])], jetzt: START + 5 * TAG }, platz(S, "Seitheben", 12, 15, 3));
  pruefe("Seitheben zweimal unter Ziel → 3 kg (Schritt 2 kg; vorher 2,5 kg)", v2.art === "senken" && v2.gewicht === 3, v2.art + " " + v2.gewicht);
  const app = umgebung({ jetzt: START });
  pruefe("Seal Row und Kickbacks sind Kurzhantel, Bankdrücken nicht", app.kurzhantel("seal-row", "") && app.kurzhantel("kickbacks", "") && !app.kurzhantel(B, N));
}

// ---- 7: auffällige Gewichte ----
{
  const ein = [eintrag("p1", B, N, 0, [[40, 10], [40, 10], [40, 10]]), eintrag("p2", B, N, 3, [[40, 10], [40, 10], [40, 10]]), eintrag("p3", B, N, 7, [[40, 10], [400, 10], [40, 10]])];
  const v = vorschlag({ eintraege: ein, jetzt: START + 10 * TAG }, platz(B, N, 8, 10, 3));
  pruefe("400 statt 40 kg: Vorschlag 40 kg, keine Steigerung, Wert bleibt gespeichert", v.art === "auffaellig" && v.gewicht === 40 && v.auffaellig === 400 && ein[2].einzelsaetze[1].gewicht === 400, v.art + " " + v.gewicht);
  const normal = [eintrag("p1", B, N, 0, [[40, 10], [40, 10]]), eintrag("p2", B, N, 3, [[40, 10], [40, 10]]), eintrag("p3", B, N, 7, [[60, 10], [60, 10]])];
  const v2 = vorschlag({ eintraege: normal, jetzt: START + 10 * TAG }, platz(B, N, 8, 10, 2));
  pruefe("Sprung 40 → 60 kg (×1,5) gilt als normal", v2.art === "steigern" && v2.gewicht === 62.5, v2.art + " " + v2.gewicht);
  const lbs = [eintrag("p1", B, N, 0, [[80, 8]]), eintrag("p2", B, N, 3, [[80, 8]]), eintrag("p3", B, N, 7, [[176, 8]])];
  const v3 = vorschlag({ eintraege: lbs, jetzt: START + 10 * TAG }, platz(B, N, 6, 8, 1));
  pruefe("kg/lbs verwechselt (×2,2): auffällig", v3.art === "auffaellig" && v3.gewicht === 80, v3.art + " " + v3.gewicht);
  const kurz = [eintrag("p3", B, N, 7, [[400, 10]])];
  pruefe("Ohne Vergleich (nur ein Eintrag): kein Urteil", vorschlag({ eintraege: kurz, jetzt: START + 10 * TAG }, platz(B, N, 8, 10, 1)).art !== "auffaellig");

  // Rückfrage beim Eintragen: dieselbe Grenze, heute schon gespeicherte Sätze mit dem Gewicht gelten als bestätigt
  const app = umgebung({ eintraege: ein.slice(0, 2), jetzt: START + 10 * TAG });
  const u = platz(B, N, 8, 10, 3);
  pruefe("Eintragen 400 kg bei üblich 40: Rückfrage mit 40", app.gewichtUngewoehnlich(u, 400) === 40);
  pruefe("Eintragen 45 kg: keine Rückfrage", app.gewichtUngewoehnlich(u, 45) === null);
  pruefe("Eintragen 20 kg (halb): Rückfrage", app.gewichtUngewoehnlich(u, 20) === 40);
  pruefe("Eigengewicht ohne Zusatz (0): keine Rückfrage", app.gewichtUngewoehnlich(u, 0) === null);
  u.saetze.push({ gewicht: 400, wdh: 10 });
  pruefe("Schon ein Satz mit 400 kg heute: keine zweite Rückfrage", app.gewichtUngewoehnlich(u, 400) === null);
  pruefe("Knopf „Satz fertig“ geht über die Rückfrage", /onclick="satzFertigPruefen\(\)"/.test(index) && !/onclick="satzFertig\(\)"/.test(index));
  const pruefen = funktionHolen("satzFertigPruefen");
  pruefe("Rückfrage: „Ja, speichern“ speichert, „Korrigieren“ nicht, Aufwärmsätze ohne Rückfrage", /aktion: satzFertig \}/.test(pruefen) && /ungewoehnlichKorrigieren"\), art: "leise" \}/.test(pruefen) && /aufwaermenGewaehlt \? null/.test(pruefen));
}

// ---- 7b: Befunde der unabhängigen Prüfung: eigene Vorschläge bei leichten Gewichten und echte Sprünge ----
{
  const K = "bankdruecken-lh";
  // Bankdrücken 5 kg zweimal unter Ziel → Korund schlägt 2,5 kg vor; das ist kein Tippfehler
  const ein = [eintrag("a", K, N, 0, [[5, 6], [5, 6]]), eintrag("b", K, N, 3, [[5, 6], [5, 6]])];
  const v = vorschlag({ eintraege: ein, jetzt: START + 5 * TAG }, platz(K, N, 8, 10, 2));
  pruefe("Senken 5 → 2,5 kg", v.art === "senken" && v.gewicht === 2.5, v.art + " " + v.gewicht);
  const app = umgebung({ eintraege: ein, jetzt: START + 5 * TAG });
  pruefe("Eintragen des eigenen Vorschlags 2,5 kg: keine Rückfrage", app.gewichtUngewoehnlich(platz(K, N, 8, 10, 2), 2.5) === null);
  const danach = ein.concat([eintrag("c", K, N, 5, [[2.5, 9], [2.5, 9]])]);
  const v2 = vorschlag({ eintraege: danach, jetzt: START + 7 * TAG }, platz(K, N, 8, 10, 2));
  pruefe("Nach dem Senken nicht „auffällig“", v2.art !== "auffaellig", v2.art + " " + v2.gewicht);
  // Seitheben 2 kg × 17 → steigern 4 kg: keine Rückfrage
  const S = "seitheben";
  const sh = [eintrag("x", S, "Seitheben", 0, [[2, 17]]), eintrag("y", S, "Seitheben", 3, [[2, 17]])];
  pruefe("Seitheben 2 → 4 kg: keine Rückfrage", umgebung({ eintraege: sh, jetzt: START + 5 * TAG }).gewichtUngewoehnlich(platz(S, "Seitheben", 12, 15, 1), 4) === null);
  // Echter Sprung 20 → 45 kg: einmal nachgefragt, danach bestätigt
  const sprung = [0, 3, 7, 10, 14].map((t, i) => eintrag("s" + i, K, N, t, [[20, 10]])).concat([eintrag("j1", K, N, 17, [[45, 10]])]);
  const vs = vorschlag({ eintraege: sprung, jetzt: START + 19 * TAG }, platz(K, N, 8, 10, 1));
  pruefe("Erster echter Sprung: Vorschlag vorsichtig (20 kg)", vs.art === "auffaellig" && vs.gewicht === 20, vs.art + " " + vs.gewicht);
  pruefe("Zweites Mal 45 kg eintragen: keine Rückfrage mehr", umgebung({ eintraege: sprung, jetzt: START + 19 * TAG }).gewichtUngewoehnlich(platz(K, N, 8, 10, 1), 45) === null);
  const zweimal = sprung.concat([eintrag("j2", K, N, 20, [[45, 10]])]);
  const vz = vorschlag({ eintraege: zweimal, jetzt: START + 22 * TAG }, platz(K, N, 8, 10, 1));
  pruefe("Nach zwei Einheiten mit 45 kg: normaler Vorschlag", vz.art === "steigern" && vz.gewicht === 47.5, vz.art + " " + vz.gewicht);
}

// Weitere Grenzfälle aus den Mutationstests (Phase 10)
{
  // Nur ein früherer Eintrag: zu wenig Vergleich, auch wenn er stark abweicht (AUFFAELLIG_MIN_VERGLEICH = 2)
  const zwei = [eintrag("a", B, N, 0, [[40, 10]]), eintrag("b", B, N, 3, [[400, 10]])];
  pruefe("Ein früherer Eintrag reicht nicht für „auffällig“", vorschlag({ eintraege: zwei, jetzt: START + 5 * TAG }, platz(B, N, 8, 10, 1)).art !== "auffaellig");
  pruefe("Ein früherer Eintrag reicht nicht für die Rückfrage", umgebung({ eintraege: zwei.slice(0, 1), jetzt: START + 5 * TAG }).gewichtUngewoehnlich(platz(B, N, 8, 10, 1), 400) === null);
  // Einträge in der Zukunft zählen auch beim Vergleich nicht (fruehereArbeit): sonst wären 40 kg „ungewöhnlich“
  const zukunft = [eintrag("a", B, N, 0, [[40, 10]]), eintrag("b", B, N, 3, [[40, 10]]), eintrag("z1", B, N, 40, [[400, 10]]), eintrag("z2", B, N, 41, [[400, 10]]), eintrag("z3", B, N, 42, [[400, 10]])];
  pruefe("Zukunftseinträge verschieben den Vergleich nicht", umgebung({ eintraege: zukunft, jetzt: START + 5 * TAG }).gewichtUngewoehnlich(platz(B, N, 8, 10, 1), 40) === null);
}

// ---- 8: Zukunftsdaten ----
{
  const ein = [eintrag("z", B, N, 40, [[60, 10], [60, 10], [60, 10]]), eintrag("g", B, N, 9, [[80, 10], [80, 10], [80, 10]])];
  const v = vorschlag({ eintraege: ein, jetzt: START + 10 * TAG }, platz(B, N, 8, 10, 3));
  pruefe("Eintrag in 30 Tagen zählt nicht: Basis 80 kg von gestern", v.art === "steigern" && v.gewicht === 82.5 && v.alt === 80, v.art + " " + v.gewicht);
  const bald = [eintrag("g", B, N, 9, [[80, 10], [80, 10], [80, 10]]), Object.assign(eintrag("h", B, N, 0, [[85, 10], [85, 10], [85, 10]]), { datum: new Date(START + 10 * TAG + 2 * 3600e3).toISOString() })];
  const v2 = vorschlag({ eintraege: bald, jetzt: START + 10 * TAG }, platz(B, N, 8, 10, 3));
  pruefe("Eintrag 2 Stunden in der Zukunft (andere Zeitzone) zählt", v2.alt === 85, v2.art + " " + v2.gewicht);
}

// ---- 21-Tage-Grenze in Kalendertagen ----
{
  const t0 = new Date(2026, 6, 1, 20).getTime();
  const ein = [{ id: "k", uebung: N, uebungId: B, datum: new Date(t0).toISOString(), einzelsaetze: [{ gewicht: 80, wdh: 8 }, { gewicht: 80, wdh: 8 }, { gewicht: 80, wdh: 8 }], saetze: 3, gewicht: 80, wdh: 8 }];
  const arten = [19, 21, 23].map((h) => vorschlag({ eintraege: ein, jetzt: new Date(2026, 6, 22, h).getTime() }, platz(B, N, 6, 8, 3)).art);
  pruefe("Genau 21 Kalendertage: zu jeder Uhrzeit steigern", arten.every((a) => a === "steigern"), arten.join(","));
  pruefe("22 Kalendertage: pause", vorschlag({ eintraege: ein, jetzt: new Date(2026, 6, 23, 8).getTime() }, platz(B, N, 6, 8, 3)).art === "pause");
}

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
