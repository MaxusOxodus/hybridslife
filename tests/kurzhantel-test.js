// Test: Seit Version 139 steigt der Vorschlag im Trainingsmodus bei Kurzhantel-Übungen in kg um 2 kg statt 2,5 kg
// (steigerungSchritt, KURZHANTEL_SCHRITT_KG), mit dem Hinweis "+2 kg: …". Erkannt wird eine Kurzhantel-Übung wie eine einseitige
// am Namen (kurzhantel), auf Deutsch "Kurzhantel" oder Englisch "Dumbbell", bei eigenen Übungen an ihrem Namen.
// In lbs bleibt es +5 lbs, die Knöpfe −2,5/+2,5 bleiben, alle anderen Übungen wie bisher. Mit ausgeschaltetem Schalter
// "Gewicht automatisch steigern" gibt es weiter keinen Vorschlag und keinen Hinweis.
// Starten mit: node tests/kurzhantel-test.js
// Die Datei gehört nicht zur App. Die Funktionen holt sie direkt aus der app.js, die Übungen aus der uebungen.js.

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const uebungenQuelle = fs.readFileSync(new URL("../uebungen.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const UEBUNGEN = new Function(uebungenQuelle + "; return UEBUNGEN;")();

// Schneidet eine Funktion aus der app.js aus: von "function name(" bis zur schließenden Klammer auf derselben Einrückung
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

const ECHT = ["satzZiel", "zaehltSeiten", "einseitig", "kurzhantel", "steigerungSchritt", "steigerungVorschlag", "steigerungText", "modusStartWerte",
  "letzterEintrag", "gleicheUebung", "saetzeVon", "rirLesen", "wdhBis", "hatDatum", "istEigengewicht", "einheit", "ausKg", "zuKg",
  "gewichtAnzeige", "gewichtText", "zahlText", "startGewicht", "steigernAn"];
const KONSTANTEN = ["START_WDH", "STEIGERN_PAUSE_TAGE", "KURZHANTEL_SCHRITT_KG", "KURZHANTEL_NAME", "LBS_JE_KG", "GEWICHT_EINHEITEN"];

// Baut die Funktionen mit diesen Einträgen, Einstellungen und Sprache. Die Übungen sind die echten aus der uebungen.js.
function umgebung(eintraege, einstellungen, sprache) {
  let code = "const eintraege = " + JSON.stringify(eintraege) + ";"
    + "const einstellungen = " + JSON.stringify(einstellungen || {}) + ";"
    + "let laufendesTraining = null; const geloeschteEigengewicht = [];"
    + "const UEBUNG_NACH_ID = {}; for (const u of UEBUNGEN) UEBUNG_NACH_ID[u.id] = u;"
    + "function gebiet() { return " + JSON.stringify(sprache === "en" ? "en-US" : "de-DE") + "; }"
    + "function txt(schluessel, werte) { return schluessel + (werte ? \" \" + JSON.stringify(werte) : \"\"); }";
  for (const k of KONSTANTEN) {
    code += konstanteHolen(k);
  }
  for (const f of ECHT) {
    code += funktionHolen(f);
  }
  code += "return { kurzhantel, steigerungVorschlag, steigerungText, modusStartWerte, setzeTraining: function (t) { laufendesTraining = t; } };";
  return new Function("UEBUNGEN", code)(UEBUNGEN);
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
// Ein Eintrag vor drei Tagen mit einzelnen Sätzen [gewicht, wdh]
function eintrag(uebungId, name, saetze) {
  return { id: "e-" + uebungId, uebung: name, uebungId: uebungId, datum: new Date(Date.now() - 3 * TAG).toISOString(),
    einzelsaetze: saetze.map(s => ({ gewicht: s[0], wdh: s[1] })) };
}
// Eine Übung im laufenden Training mit 3 Sätzen und 8–12 Wdh.
function platz(uebungId, name) {
  return { name: name, uebungId: uebungId, zielSaetze: 3, zielWdh: 8, zielWdhMax: 12, saetze: [], eintragId: "" };
}
function rechne(uebungId, name, saetze, einstellungen, sprache) {
  const app = umgebung([eintrag(uebungId, name, saetze)], einstellungen, sprache);
  const u = platz(uebungId, name);
  app.setzeTraining({ index: 0, uebungen: [u] });
  return { v: app.steigerungVorschlag(u), felder: app.modusStartWerte(), text: app.steigerungText(u) };
}
const ALLE_12 = n => Array.from({ length: 3 }, () => [n, 12]);

// ---------- Erkennung ----------
{
  const app = umgebung([], {}, "de");
  pruefe("Bankdrücken (Kurzhantel) ist Kurzhantel", app.kurzhantel("bankdruecken-kh", ""));
  pruefe("Bankdrücken (Langhantel) nicht", !app.kurzhantel("bankdruecken-lh", ""));
  pruefe("Kniebeuge nicht", !app.kurzhantel("kniebeuge", ""));
  pruefe("eigene Übung „Kurzhantel-Curl“", app.kurzhantel("eigene-1", "Kurzhantel-Curl"));
  pruefe("eigene Übung „Dumbbell Fly“", app.kurzhantel("eigene-2", "Dumbbell Fly"));
  pruefe("eigene Übung „Kurzhantelrudern“ (zusammengeschrieben)", app.kurzhantel("eigene-3", "Kurzhantelrudern"));
  pruefe("eigene Übung „Hammer Curl“ nicht", !app.kurzhantel("eigene-4", "Hammer Curl"));
  pruefe("ohne Namen nicht", !app.kurzhantel("eigene-5", undefined));
  // In der uebungen.js tragen Deutsch und Englisch das Wort immer gemeinsam
  const de = UEBUNGEN.filter(u => /kurzhantel/i.test(u.de));
  const en = UEBUNGEN.filter(u => /dumbbell/i.test(u.en));
  pruefe("Deutsch und Englisch erkennen dieselben Übungen", de.length === en.length && de.every(u => /dumbbell/i.test(u.en)), de.length + "/" + en.length);
  const erkannt = UEBUNGEN.filter(u => app.kurzhantel(u.id, ""));
  pruefe("alle " + de.length + " Kurzhantel-Übungen erkannt, keine weitere", erkannt.length === de.length, erkannt.length);
}

// ---------- kg: Kurzhantel +2, Langhantel +2,5 ----------
let r = rechne("bankdruecken-kh", "Bankdrücken (Kurzhantel)", ALLE_12(30));
pruefe("Kurzhantel 3 × 12 mit 30 kg: Feld 32 kg / 8 Wdh.", r.v.art === "steigern" && JSON.stringify(r.felder) === "[32,8]", JSON.stringify(r.felder));
pruefe("Kurzhantel: Hinweis +2 kg", r.text === 'modus.steigern {"schritt":"+2 kg","gewicht":"30 kg","wdh":12}', r.text);
r = rechne("bankdruecken-lh", "Bankdrücken (Langhantel)", ALLE_12(70));
pruefe("Langhantel 3 × 12 mit 70 kg: Feld 72,5 kg", JSON.stringify(r.felder) === "[72.5,8]", JSON.stringify(r.felder));
pruefe("Langhantel: Hinweis +2,5 kg", r.text === 'modus.steigern {"schritt":"+2,5 kg","gewicht":"70 kg","wdh":12}', r.text);
r = rechne("bankdruecken-multi", "Bankdrücken an der Multipresse", ALLE_12(50));
pruefe("Maschine wie bisher: 52,5 kg", JSON.stringify(r.felder) === "[52.5,8]", JSON.stringify(r.felder));
r = rechne("eigene-1", "Kurzhantel-Curl", ALLE_12(12));
pruefe("eigene Kurzhantel-Übung: 14 kg", JSON.stringify(r.felder) === "[14,8]" && r.text.indexOf('"+2 kg"') !== -1, JSON.stringify(r.felder) + r.text);
r = rechne("bankdruecken-kh", "Bankdrücken (Kurzhantel)", [[30, 12], [30, 11], [30, 10]]);
pruefe("Kurzhantel nicht alle am oberen Ende: halten bei 30", r.v.art === "halten" && JSON.stringify(r.felder) === "[30,12]", JSON.stringify(r.felder));
r = rechne("bankdruecken-kh", "Bankdrücken (Kurzhantel)", ALLE_12(22.5));
pruefe("Kurzhantel von 22,5 kg: 24,5 kg (ungerundet wie bisher)", JSON.stringify(r.felder) === "[24.5,8]", JSON.stringify(r.felder));

// ---------- Englisch: dieselbe Rechnung, Zahl in englischer Schreibweise ----------
r = rechne("bankdruecken-kh", "Dumbbell Bench Press", ALLE_12(30), {}, "en");
pruefe("Englisch Kurzhantel: +2 kg", r.text === 'modus.steigern {"schritt":"+2 kg","gewicht":"30 kg","wdh":12}', r.text);
r = rechne("bankdruecken-lh", "Barbell Bench Press", ALLE_12(70), {}, "en");
pruefe("Englisch Langhantel: +2.5 kg", r.text === 'modus.steigern {"schritt":"+2.5 kg","gewicht":"70 kg","wdh":12}', r.text);

// ---------- lbs: überall +5 lbs ----------
// 30 kg = 66,14 lbs, +5 lbs = 71,14 lbs = 32,268 kg (vier Nachkommastellen wie zuKg)
r = rechne("bankdruecken-kh", "Bankdrücken (Kurzhantel)", ALLE_12(30), { gewichtEinheit: "lbs" });
pruefe("lbs Kurzhantel: +5 lbs", r.text.indexOf('"schritt":"+5 lbs"') !== -1, r.text);
pruefe("lbs Kurzhantel: Feld 30 kg + 5 lbs", Math.abs(r.felder[0] - (30 + 5 / 2.20462262)) < 0.001, r.felder[0]);
r = rechne("bankdruecken-lh", "Bankdrücken (Langhantel)", ALLE_12(70), { gewichtEinheit: "lbs" });
pruefe("lbs Langhantel: +5 lbs", r.text.indexOf('"schritt":"+5 lbs"') !== -1 && Math.abs(r.felder[0] - (70 + 5 / 2.20462262)) < 0.001, r.text);

// ---------- Schalter "Gewicht automatisch steigern" aus ----------
r = rechne("bankdruecken-kh", "Bankdrücken (Kurzhantel)", ALLE_12(30), { steigern: false });
pruefe("Schalter aus: Feld wie letztes Mal (30 kg / 12)", JSON.stringify(r.felder) === "[30,12]", JSON.stringify(r.felder));
pruefe("Schalter aus: kein Hinweis", r.text === "", r.text);

// ---------- Knöpfe −2,5/+2,5 unverändert ----------
pruefe("Gewichtsknöpfe rechnen weiter mit dem Schritt der Einheit", quelle.indexOf("feldAendern(id, richtung * GEWICHT_EINHEITEN[einheit()].schritt);") !== -1);
pruefe("Schritt der Einheiten unverändert", /kg: \{ max: 400, schritt: 2\.5,/.test(quelle) && /lbs: \{ max: 880, schritt: 5,/.test(quelle));

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
