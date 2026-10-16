// Test: Seit Version 128 schlägt der Trainingsmodus für den ersten Satz einer Übung Gewicht und Wdh. vor
// (steigerungVorschlag): einen Schritt mehr, wenn beim letzten Mal alle Sätze mit dem Arbeitsgewicht das obere Ende
// des Wdh.-Ziels erreicht haben, sonst das gleiche Gewicht. Aufwärmsätze zählen nicht, Eigengewicht ohne
// Zusatzgewicht wird nie schwerer, nach mehr als 21 Tagen Pause bleibt das Gewicht, kg und lbs werden nicht gerundet.
// Seit Version 129 lässt sich das in den Einstellungen abschalten (einstellungen.steigern = false): Dann gilt
// die Vorbelegung bis Version 127 (erster Satz vom letzten Mal) und es gibt keinen Hinweis.
// Starten mit: node tests/steigerung-test.js
// Die Datei gehört nicht zur App. Die Funktionen holt sie direkt aus der app.js, alles fürs Zeichnen tut hier nichts.

import fs from "node:fs";

// Die Dateien können Windows-Zeilenenden (CRLF) oder LF haben, CRLF wird zu LF. Sonst findet funktionHolen nichts.
const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");

// Schneidet eine Funktion aus der app.js aus: von "function name(" bis zur schließenden Klammer auf derselben Einrückung.
// letzterEintrag steht tiefer eingerückt als die anderen, deshalb zählt die Einrückung der Zeile.
function funktionHolen(name) {
  const treffer = new RegExp("\\n( +)function " + name + "\\(").exec(quelle);
  if (!treffer) {
    throw new Error("Funktion " + name + " nicht in der app.js gefunden");
  }
  const ende = quelle.indexOf("\n" + treffer[1] + "}\n", treffer.index + 1);
  return quelle.slice(treffer.index, ende + treffer[1].length + 3);
}
function konstanteHolen(name) {
  const treffer = new RegExp("\\n  const " + name + " = [\\s\\S]*?;\\n").exec(quelle);
  if (!treffer) {
    throw new Error("Konstante " + name + " nicht in der app.js gefunden");
  }
  return treffer[0];
}

const ECHT = ["satzZiel", "zaehltSeiten", "zaehlweiseKopieren", "einseitig", "steigerungVorschlag", "steigerungText", "modusStartWerte", "letzterEintrag", "gleicheUebung", "saetzeVon",
  "rirLesen", "wdhBis", "hatDatum", "istEigengewicht", "einheit", "ausKg", "zuKg", "gewichtAnzeige", "gewichtText",
  "zahlText", "startGewicht", "steigernAn"];
const KONSTANTEN = ["START_WDH", "STEIGERN_PAUSE_TAGE", "LBS_JE_KG", "GEWICHT_EINHEITEN"];

// Baut die Funktionen mit diesen Einträgen und Einstellungen
function umgebung(eintraege, einstellungen) {
  let code = "const eintraege = " + JSON.stringify(eintraege) + ";"
    + "const einstellungen = " + JSON.stringify(einstellungen || {}) + ";"
    + "let laufendesTraining = null; const geloeschteEigengewicht = [];"
    + "const UEBUNG_NACH_ID = { klimmzug: { bereich: \"eigen\" }, bankdruecken: { bereich: \"frei\" } };"
    + "function gebiet() { return \"de-DE\"; }"
    + "function txt(schluessel, werte) { return schluessel + (werte ? \" \" + JSON.stringify(werte) : \"\"); }";
  for (const k of KONSTANTEN) {
    code += konstanteHolen(k);
  }
  for (const f of ECHT) {
    code += funktionHolen(f);
  }
  code += "return { steigerungVorschlag, steigerungText, modusStartWerte, setzeTraining: function (t) { laufendesTraining = t; } };";
  return new Function(code)();
}

let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

const TAG = 24 * 60 * 60 * 1000;
function vorTagen(n) {
  return new Date(Date.now() - n * TAG).toISOString();
}
// Ein Eintrag aus dem Trainingsmodus mit einzelnen Sätzen [gewicht, wdh]
function eintrag(id, saetze, tage, uebungId) {
  return { id: id, uebung: "Bankdrücken", uebungId: uebungId || "bankdruecken", datum: vorTagen(tage === undefined ? 3 : tage),
    einzelsaetze: saetze.map(s => ({ gewicht: s[0], wdh: s[1] })), saetze: saetze.length, gewicht: saetze[0][0], wdh: saetze[0][1] };
}
// Eine Übung im laufenden Training
function platz(ziel, uebungId) {
  return { name: "Bankdrücken", uebungId: uebungId || "bankdruecken", zielSaetze: ziel.saetze === undefined ? 3 : ziel.saetze,
    zielWdh: ziel.von, zielWdhMax: ziel.bis, saetze: [], eintragId: "" };
}
// Vorschlag und Startwerte der Felder für Satz 1
function rechne(eintraege, u, einstellungen) {
  const app = umgebung(eintraege, einstellungen);
  app.setzeTraining({ index: 0, uebungen: [u] });
  return { v: app.steigerungVorschlag(u), felder: app.modusStartWerte(), text: app.steigerungText(u) };
}
const BEREICH = { von: 8, bis: 12 };

// ---------- Das Beispiel aus dem Plan ----------
let r = rechne([eintrag("e1", [[70, 12], [70, 12], [70, 12]])], platz(BEREICH));
pruefe("3 × 12 mit 70 kg bei 8–12: steigern", r.v.art === "steigern", r.v.art);
pruefe("3 × 12 mit 70 kg: Feld 72,5 kg / 8 Wdh.", JSON.stringify(r.felder) === "[72.5,8]", JSON.stringify(r.felder));
pruefe("3 × 12: Hinweis +2,5 kg mit 70 kg und 12 Wdh.", r.text === 'modus.steigern {"schritt":"+2,5 kg","gewicht":"70 kg","wdh":12}', r.text);

r = rechne([eintrag("e1", [[70, 12], [70, 11], [70, 10]])], platz(BEREICH));
pruefe("12/11/10: halten", r.v.art === "halten" && JSON.stringify(r.felder) === "[70,12]", r.v.art + " " + JSON.stringify(r.felder));
pruefe("12/11/10: Hinweis Gleiches Gewicht, Ziel 12", r.text === 'modus.halten {"wdh":12}', r.text);

r = rechne([eintrag("e1", [[40, 12], [70, 12], [70, 12], [70, 12]])], platz(BEREICH));
pruefe("Aufwärmsatz 40 × 12 zählt nicht: steigern auf 72,5", r.v.art === "steigern" && JSON.stringify(r.felder) === "[72.5,8]", JSON.stringify(r.felder));
r = rechne([eintrag("e1", [[40, 5], [70, 12], [70, 12], [70, 12]])], platz(BEREICH));
pruefe("Aufwärmsatz 40 × 5 unter dem Bereich stört nicht", r.v.art === "steigern", r.v.art);
r = rechne([eintrag("e1", [[40, 12], [70, 9], [70, 12], [70, 12]])], platz(BEREICH));
pruefe("Mit Aufwärmsatz, ein Arbeitssatz unter 12: halten mit den Wdh. des ersten Arbeitssatzes", r.v.art === "halten" && JSON.stringify(r.felder) === "[70,9]", JSON.stringify(r.felder));

// ---------- Erreicht, überschritten, zu wenige Sätze ----------
r = rechne([eintrag("e1", [[70, 14], [70, 13], [70, 12]])], platz(BEREICH));
pruefe("Überschritten 14/13/12: ein Schritt, nicht zwei", r.v.art === "steigern" && r.felder[0] === 72.5, JSON.stringify(r.felder));
r = rechne([eintrag("e1", [[70, 12], [70, 12]])], platz(BEREICH));
pruefe("Nur 2 von 3 Ziel-Sätzen mit 12: halten", r.v.art === "halten", r.v.art);
r = rechne([eintrag("e1", [[70, 12], [70, 12]])], platz({ von: 8, bis: 12, saetze: null }));
pruefe("Ohne Satz-Ziel reicht ein Satz: 2 × 12 steigern", r.v.art === "steigern", r.v.art);
r = rechne([eintrag("e1", [[70, 12], [70, 12], [70, 12], [70, 8]])], platz(BEREICH));
pruefe("Zusatz-Satz unter dem Bereich (alle Sätze zählen): halten", r.v.art === "halten", r.v.art);
r = rechne([eintrag("e1", [[70, 12], [72.5, 6], [70, 12]])], platz(BEREICH));
pruefe("Schwerster Satz ist das Arbeitsgewicht: 72,5 × 6 → halten bei 72,5", r.v.art === "halten" && JSON.stringify(r.felder) === "[72.5,6]", JSON.stringify(r.felder));

// ---------- Feste Zahl und kein Ziel ----------
r = rechne([eintrag("e1", [[60, 10], [60, 10], [60, 10]])], platz({ von: 10, bis: null }));
pruefe("Feste Zahl 10, alle 10: steigern auf 62,5 / 10", r.v.art === "steigern" && JSON.stringify(r.felder) === "[62.5,10]", JSON.stringify(r.felder));
r = rechne([eintrag("e1", [[60, 10], [60, 9], [60, 10]])], platz({ von: 10, bis: null }));
pruefe("Feste Zahl 10, einmal 9: halten", r.v.art === "halten" && r.text === 'modus.halten {"wdh":10}', r.text);
r = rechne([eintrag("e1", [[40, 12], [60, 15], [60, 15]])], platz({ von: null, bis: null }));
pruefe("Ohne Wdh.-Ziel: nie steigern, Arbeitsgewicht statt Aufwärmsatz, kein Hinweis", r.v.art === "ohneZiel" && JSON.stringify(r.felder) === "[60,15]" && r.text === "", JSON.stringify(r.felder) + r.text);

// ---------- Erste Ausführung ----------
r = rechne([], platz(BEREICH));
pruefe("Erste Ausführung: kein Vorschlag, Startwerte 20 kg / 8 Wdh., kein Hinweis", r.v === null && JSON.stringify(r.felder) === "[20,8]" && r.text === "", JSON.stringify(r.felder));
r = rechne([], platz({ von: null, bis: null }));
pruefe("Erste Ausführung ohne Ziel: 20 kg / 10 Wdh.", JSON.stringify(r.felder) === "[20,10]", JSON.stringify(r.felder));
r = rechne([eintrag("e1", [[70, 12], [70, 12], [70, 12]], 3, "andere")], platz(BEREICH));
pruefe("Andere Übung zählt nicht", r.v === null, JSON.stringify(r.v));

// ---------- Lange Pause ----------
r = rechne([eintrag("e1", [[70, 12], [70, 12], [70, 12]], 22)], platz(BEREICH));
pruefe("22 Tage her: halten mit Hinweis", r.v.art === "pause" && JSON.stringify(r.felder) === "[70,12]" && r.text === 'modus.haltenPause {"tage":21}', r.text);
r = rechne([eintrag("e1", [[70, 12], [70, 12], [70, 12]], 20)], platz(BEREICH));
pruefe("20 Tage her: steigern", r.v.art === "steigern", r.v.art);
const ohneDatum = eintrag("e1", [[70, 12], [70, 12], [70, 12]]);
delete ohneDatum.datum;
r = rechne([ohneDatum], platz(BEREICH));
pruefe("Eintrag ohne Datum: keine Pause-Regel, steigern", r.v.art === "steigern", r.v.art);

// ---------- Neuester Eintrag zählt, der laufende nicht ----------
r = rechne([eintrag("alt", [[70, 12], [70, 12], [70, 12]], 10), eintrag("neu", [[72.5, 9], [72.5, 8], [72.5, 8]], 3)], platz(BEREICH));
pruefe("Der neueste Eintrag zählt: halten bei 72,5", r.v.art === "halten" && r.felder[0] === 72.5, JSON.stringify(r.felder));
const laufend = platz(BEREICH);
laufend.eintragId = "heute";
r = rechne([eintrag("e1", [[70, 12], [70, 12], [70, 12]], 3), eintrag("heute", [[50, 5]], 0)], laufend);
pruefe("Der Eintrag des laufenden Trainings zählt nicht", r.v.art === "steigern" && r.v.alt === 70, JSON.stringify(r.v));
// Ab Satz 2 gilt der Satz davor von heute, wie bisher
const zweiter = platz(BEREICH);
zweiter.saetze = [{ gewicht: 72.5, wdh: 9 }];
r = rechne([eintrag("e1", [[70, 12], [70, 12], [70, 12]])], zweiter);
pruefe("Satz 2: Werte des Satzes davor", JSON.stringify(r.felder) === "[72.5,9]", JSON.stringify(r.felder));

// ---------- Eigengewicht ----------
r = rechne([eintrag("e1", [[0, 12], [0, 12], [0, 12]], 3, "klimmzug")], platz(BEREICH, "klimmzug"));
pruefe("Eigengewicht ohne Zusatzgewicht: nie steigern, Hinweis", r.v.art === "eigengewicht" && JSON.stringify(r.felder) === "[0,12]" && r.text === "modus.eigengewicht", JSON.stringify(r.felder) + r.text);
r = rechne([eintrag("e1", [[0, 9], [0, 8], [0, 8]], 3, "klimmzug")], platz(BEREICH, "klimmzug"));
pruefe("Eigengewicht unter dem Bereich: halten", r.v.art === "halten" && r.felder[0] === 0, r.v.art);
r = rechne([eintrag("e1", [[10, 12], [10, 12], [10, 12]], 3, "klimmzug")], platz(BEREICH, "klimmzug"));
pruefe("Eigengewicht mit 10 kg Zusatz: steigern auf 12,5", r.v.art === "steigern" && r.felder[0] === 12.5, JSON.stringify(r.felder));

// ---------- lbs, nicht gerundet ----------
const lbs135 = 61.235; // so speichert die App 135 lbs (zuKg mit vier Nachkommastellen)
r = rechne([eintrag("e1", [[lbs135, 12], [lbs135, 12], [lbs135, 12]])], platz(BEREICH), { gewichtEinheit: "lbs" });
pruefe("lbs: 135 + 5 = 140 lbs", r.v.art === "steigern" && Math.abs(r.felder[0] * 2.20462262 - 140) < 0.001, r.felder[0] * 2.20462262);
pruefe("lbs: Hinweis +5 lbs", r.text.startsWith('modus.steigern {"schritt":"+5 lbs","gewicht":"135 lbs"'), r.text);
r = rechne([eintrag("e1", [[70, 12], [70, 12], [70, 12]])], platz(BEREICH), { gewichtEinheit: "lbs" });
const lbsWert = r.felder[0] * 2.20462262;
pruefe("Einheit gewechselt: 70 kg = 154,32 lbs + 5, nicht gerundet", Math.abs(lbsWert - (70 * 2.20462262 + 5)) < 0.001, lbsWert);

// ---------- Kaputte Daten ----------
const kaputt = { id: "k", uebung: "Bankdrücken", uebungId: "bankdruecken", datum: vorTagen(2), einzelsaetze: [{ gewicht: "abc", wdh: 12 }, null] };
r = rechne([kaputt], platz(BEREICH));
pruefe("Kaputte Sätze: kein Vorschlag, Startwerte", r.v === null && JSON.stringify(r.felder) === "[20,8]", JSON.stringify(r.felder));
const ausLog = { id: "l", uebung: "Bankdrücken", uebungId: "bankdruecken", datum: vorTagen(2), saetze: 3, wdh: 12, gewicht: 70 };
r = rechne([ausLog], platz(BEREICH));
pruefe("Eintrag aus dem Log ohne Einzelsätze: 3 × 12 → steigern", r.v.art === "steigern" && r.felder[0] === 72.5, JSON.stringify(r.felder));
const kommaText = { id: "c", uebung: "Bankdrücken", uebungId: "bankdruecken", datum: vorTagen(2), saetze: 3, wdh: 12, gewicht: "70,5" };
r = rechne([kommaText], platz(BEREICH));
pruefe("Gewicht als Text mit Komma: 70,5 → 73", r.v.art === "steigern" && r.felder[0] === 73, JSON.stringify(r.felder));

// ---------- Nichts wird gespeichert ----------
const daten = [eintrag("e1", [[70, 12], [70, 12], [70, 12]])];
const vorher = JSON.stringify(daten);
const u = platz(BEREICH);
const uVorher = JSON.stringify(u);
const app = umgebung(daten);
app.setzeTraining({ index: 0, uebungen: [u] });
app.steigerungVorschlag(u); app.steigerungText(u); app.modusStartWerte();
pruefe("Vorschlag ändert weder Übung noch Einträge", JSON.stringify(u) === uVorher && JSON.stringify(daten) === vorher);
pruefe("Im Code gibt es gewichtErhoehenText nicht mehr", !quelle.includes("gewichtErhoehenText"));

// ---------- Schalter "Gewicht automatisch steigern" (seit Version 129) ----------
const MIT_AUFWAERMEN = [eintrag("e1", [[40, 12], [70, 12], [70, 12], [70, 12]])];
r = rechne(MIT_AUFWAERMEN, platz(BEREICH), { steigern: true });
pruefe("Schalter an: 72,5 / 8 mit Hinweis", JSON.stringify(r.felder) === "[72.5,8]" && r.text.startsWith("modus.steigern"), JSON.stringify(r.felder));
r = rechne(MIT_AUFWAERMEN, platz(BEREICH), {});
pruefe("Ohne Eintrag gilt an", JSON.stringify(r.felder) === "[72.5,8]", JSON.stringify(r.felder));
r = rechne(MIT_AUFWAERMEN, platz(BEREICH), { steigern: false });
pruefe("Schalter aus: wie bis 127 der erste Satz vom letzten Mal (40 / 12)", JSON.stringify(r.felder) === "[40,12]", JSON.stringify(r.felder));
pruefe("Schalter aus: kein Hinweis", r.text === "", r.text);
r = rechne([eintrag("e1", [[70, 12], [70, 11], [70, 10]])], platz(BEREICH), { steigern: false });
pruefe("Schalter aus, 12/11/10: 70 / 12 ohne Hinweis", JSON.stringify(r.felder) === "[70,12]" && r.text === "", JSON.stringify(r.felder) + r.text);
r = rechne([eintrag("e1", [[70, 12], [70, 12], [70, 12]], 30)], platz(BEREICH), { steigern: false });
pruefe("Schalter aus, lange Pause: kein Hinweis", r.text === "", r.text);
r = rechne([], platz(BEREICH), { steigern: false });
pruefe("Schalter aus, erste Ausführung: 20 / 8", JSON.stringify(r.felder) === "[20,8]", JSON.stringify(r.felder));
r = rechne([kaputt], platz(BEREICH), { steigern: false });
pruefe("Schalter aus, kaputte Sätze: Startwerte", JSON.stringify(r.felder) === "[20,8]", JSON.stringify(r.felder));
const zweiterAus = platz(BEREICH);
zweiterAus.saetze = [{ gewicht: 65, wdh: 9 }];
r = rechne(MIT_AUFWAERMEN, zweiterAus, { steigern: false });
pruefe("Schalter aus, Satz 2: Satz davor", JSON.stringify(r.felder) === "[65,9]", JSON.stringify(r.felder));

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler ? 1 : 0);
