// Test: Seit Version 131 zeigt die App nach "Training speichern" einen Bericht: Dauer, Gesamt-Kraftrang (mit Schild,
// wenn er mit dem Training eine Stufe gestiegen ist), neue Rekorde und was bis zur nächsten Stufe fehlt.
// Geprüft werden die Rechnungen dahinter: einheitMinuten (Dauer), verlaufPunkte mit einer Liste von ids zum Auslassen
// (Rang ohne das Training) und berichtRekorde (Regel des Abzeichens "Rekorde": rekorde() aus der raenge.js).
// Starten mit: node tests/bericht-test.js
// Die Datei gehört nicht zur App. Die Funktionen holt sie direkt aus der app.js und der raenge.js.

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const raenge = fs.readFileSync(new URL("../raenge.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");

function funktionHolen(name) {
  const start = quelle.indexOf("\n  function " + name + "(");
  const ende = quelle.indexOf("\n  }\n", start);
  if (start === -1 || ende === -1) {
    throw new Error("Funktion " + name + " nicht in der app.js gefunden");
  }
  return quelle.slice(start, ende + 5);
}

const ECHT = ["einheitMinuten", "verlaufPunkte", "berichtRekorde", "gleicheUebung", "hatDatum", "saetzeVon", "rirLesen",
  "tagSchluessel", "koerperZusatz", "istEigengewicht", "anzeigeName", "uebungName"];

// eintraege: die Einträge im Speicher. Körpergewicht gibt es im Test nicht.
function umgebung(eintraege) {
  let code = raenge
    + "const eintraege = " + JSON.stringify(eintraege) + ";"
    + "const sprache = \"de\"; const geloeschteEigengewicht = [];"
    + "const UEBUNG_NACH_ID = { bankdruecken: { de: \"Bankdrücken\", en: \"Bench press\", bereich: \"frei\" }, kniebeuge: { de: \"Kniebeuge\", en: \"Squat\", bereich: \"frei\" } };"
    + "function koerpergewichtAm() { return null; }";
  for (const f of ECHT) {
    code += funktionHolen(f);
  }
  code += "return { einheitMinuten, verlaufPunkte, berichtRekorde, rekorde };";
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

const TAG = 86400000;
function datum(tage, stunde) {
  const d = new Date();
  d.setHours(stunde === undefined ? 12 : stunde, 0, 0, 0);
  return new Date(d.getTime() - tage * TAG).toISOString();
}
function eintrag(id, uebungId, saetze, tage, stunde) {
  return { id: id, uebung: uebungId, uebungId: uebungId, datum: datum(tage, stunde),
    einzelsaetze: saetze.map(s => ({ gewicht: s[0], wdh: s[1] })), saetze: saetze.length, gewicht: saetze[0][0], wdh: saetze[0][1] };
}
// Der Stand, wie ihn rangStand liefert: je Übung ihre Punkte für die Ränge
function stand(a, ids) {
  return { uebungen: ids.map(id => ({ id: id, name: id, punkte: a.verlaufPunkte(id, id, "rang") })) };
}

// ---------- Dauer ----------
{
  const a = umgebung([]);
  pruefe("Dauer: 45 Minuten", a.einheitMinuten({ start: "2026-10-16T10:00:00.000Z", ende: "2026-10-16T10:45:10.000Z" }) === 45);
  pruefe("Dauer: unter einer Minute zählt als 1", a.einheitMinuten({ start: "2026-10-16T10:00:00.000Z", ende: "2026-10-16T10:00:20.000Z" }) === 1);
  pruefe("Dauer: über Mitternacht", a.einheitMinuten({ start: "2026-10-16T23:30:00.000Z", ende: "2026-10-17T00:35:00.000Z" }) === 65);
  pruefe("Dauer: ohne Startzeit null", a.einheitMinuten({ start: undefined, ende: "2026-10-16T10:00:00.000Z" }) === null);
  pruefe("Dauer: kaputte Startzeit null", a.einheitMinuten({ start: "kaputt", ende: "2026-10-16T10:00:00.000Z" }) === null);
}

// ---------- Rang ohne das Training: verlaufPunkte lässt eine Liste von ids aus ----------
{
  const liste = [eintrag("a", "bankdruecken", [[80, 5]], 10), eintrag("b", "bankdruecken", [[90, 5]], 0)];
  const a = umgebung(liste);
  pruefe("Auslassen: ohne Liste zwei Tage", a.verlaufPunkte("bankdruecken", "bankdruecken", "rang").length === 2);
  pruefe("Auslassen: eine id wie bisher", a.verlaufPunkte("bankdruecken", "bankdruecken", "rang", "b").length === 1);
  pruefe("Auslassen: Liste mit einer id", a.verlaufPunkte("bankdruecken", "bankdruecken", "rang", ["b"]).length === 1);
  pruefe("Auslassen: Liste mit beiden ids", a.verlaufPunkte("bankdruecken", "bankdruecken", "rang", ["a", "b"]).length === 0);
  pruefe("Auslassen: leere Liste lässt nichts aus", a.verlaufPunkte("bankdruecken", "bankdruecken", "rang", []).length === 2);
}

// ---------- Rekorde ----------
{
  // Bankdrücken: früher 80 × 5, heute 90 × 5 → Rekord. Kniebeuge: heute zum ersten Mal → kein Rekord.
  const liste = [eintrag("a", "bankdruecken", [[80, 5]], 10), eintrag("b", "bankdruecken", [[90, 5], [85, 5]], 0), eintrag("c", "kniebeuge", [[100, 5]], 0)];
  const a = umgebung(liste);
  const r = a.berichtRekorde(stand(a, ["bankdruecken", "kniebeuge"]), [liste[1], liste[2]]);
  pruefe("Rekord: ein Rekord", r.length === 1, JSON.stringify(r));
  pruefe("Rekord: Name in der Sprache", r[0] && r[0].name === "Bankdrücken", r[0] && r[0].name);
  pruefe("Rekord: Wert ist das 1RM des Tages (90 × 5 = 105)", r[0] && Math.abs(r[0].wert - 105) < 1e-9, r[0] && r[0].wert);
  // Dieselbe Regel wie das Abzeichen: rekorde() zählt für diese Daten genau einen Rekord
  const abzeichen = a.rekorde([a.verlaufPunkte("bankdruecken", "bankdruecken", "rang"), a.verlaufPunkte("kniebeuge", "kniebeuge", "rang")]);
  pruefe("Rekord: Abzeichen zählt dasselbe", abzeichen.length === 1);
}
{
  // Schwächer als früher, gleich stark wie früher: kein Rekord
  const liste = [eintrag("a", "bankdruecken", [[90, 5]], 10), eintrag("b", "bankdruecken", [[90, 5]], 0)];
  const a = umgebung(liste);
  pruefe("Rekord: gleich stark ist keiner", a.berichtRekorde(stand(a, ["bankdruecken"]), [liste[1]]).length === 0);
  const liste2 = [eintrag("a", "bankdruecken", [[90, 5]], 10), eintrag("b", "bankdruecken", [[80, 5]], 0)];
  const b = umgebung(liste2);
  pruefe("Rekord: schwächer ist keiner", b.berichtRekorde(stand(b, ["bankdruecken"]), [liste2[1]]).length === 0);
}
{
  // Mehr als 10 Wdh. zählen nicht: 60 × 15 hätte ein höheres 1RM, ist aber kein gültiger Satz
  const liste = [eintrag("a", "bankdruecken", [[80, 5]], 10), eintrag("b", "bankdruecken", [[80, 15]], 0)];
  const a = umgebung(liste);
  pruefe("Rekord: Satz mit 15 Wdh. zählt nicht", a.berichtRekorde(stand(a, ["bankdruecken"]), [liste[1]]).length === 0);
}
{
  // Ein Rekord an einem anderen Tag als dem des Trainings gehört nicht zum Training
  const liste = [eintrag("a", "bankdruecken", [[80, 5]], 10), eintrag("b", "bankdruecken", [[90, 5]], 5), eintrag("c", "bankdruecken", [[85, 5]], 0)];
  const a = umgebung(liste);
  pruefe("Rekord: alter Rekord zählt heute nicht", a.berichtRekorde(stand(a, ["bankdruecken"]), [liste[2]]).length === 0);
}
{
  // Zwei Übungen mit Rekord: Reihenfolge der Einträge des Trainings
  const liste = [eintrag("a", "bankdruecken", [[80, 5]], 10), eintrag("b", "kniebeuge", [[100, 5]], 10),
    eintrag("c", "kniebeuge", [[110, 5]], 0), eintrag("d", "bankdruecken", [[85, 5]], 0)];
  const a = umgebung(liste);
  const r = a.berichtRekorde(stand(a, ["bankdruecken", "kniebeuge"]), [liste[2], liste[3]]);
  pruefe("Rekord: zwei in der Reihenfolge des Trainings", r.map(x => x.name).join(",") === "Kniebeuge,Bankdrücken", r.map(x => x.name).join(","));
}
{
  // Ohne Einträge im Training: keine Rekorde, kein Fehler
  const a = umgebung([]);
  pruefe("Rekord: leeres Training", a.berichtRekorde({ uebungen: [] }, []).length === 0);
}

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
