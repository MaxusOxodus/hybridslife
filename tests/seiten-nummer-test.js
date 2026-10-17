// Test: Seit Version 135 zeigt jeder Satz einer Übung mit "Seiten: Einzeln" seine Seite: 1 R, 1 L, 2 R, 2 L ...
// Zuerst rechts, dann links, abwechselnd. Die Seite ergibt sich nur aus dem Platz des Satzes, gespeichert wird nichts.
// Bei "Beide" und allen anderen Übungen bleibt die Nummer wie bisher (1, 2, 3).
// Geprüft werden satzNummer, satzSeite, satzNummerElement, eintragSeiten und der Stand in der Übersicht (uebungStandText).
// Starten mit: node tests/seiten-nummer-test.js
// Die Datei gehört nicht zur App. Die Funktionen holt sie direkt aus der app.js, die Übungen aus der uebungen.js.

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const uebungenQuelle = fs.readFileSync(new URL("../uebungen.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const texteQuelle = fs.readFileSync(new URL("../texte.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");

function funktionHolen(name) {
  const start = quelle.indexOf("\n  function " + name + "(");
  const ende = quelle.indexOf("\n  }\n", start);
  if (start === -1 || ende === -1) {
    throw new Error("Funktion " + name + " nicht in der app.js gefunden");
  }
  return quelle.slice(start, ende + 5);
}
function konstanteHolen(name) {
  const treffer = new RegExp("\\n  const " + name + " = [\\s\\S]*?;\\n").exec(quelle);
  if (!treffer) {
    throw new Error("Konstante " + name + " nicht in der app.js gefunden");
  }
  return treffer[0];
}

const ECHT = ["satzNummer", "satzSeite", "satzNummerElement", "eintragSeiten", "einseitig", "zaehltSeiten", "satzZiel",
  "uebungStandText", "gleicheUebung", "routineFinden"];

// Seit Version 140: Aufwärmsätze (W). Die Helfer laufen echt, die zwei Merker der Seite stehen davor.
ECHT.push("istAufwaermen", "arbeitsAnzahl", "arbeitsSaetzeVon", "wKnopfAnzeigen", "arbeitsIndex", "satzKennung", "satzKennungElement");
const funktionHolenOhneW = funktionHolen;
funktionHolen = function (name) {
  return (name === "istAufwaermen" ? "\n  let aufwaermenGewaehlt = false; let satzW = false;" : "") + funktionHolenOhneW(name);
};

// sprache: "de" oder "en". routinen und laufend: was im Speicher steht. Die Texte kommen echt aus der texte.js.
function umgebung(sprache, routinen, laufend) {
  return new Function(uebungenQuelle + texteQuelle
    + "const UEBUNG_NACH_ID = {}; for (const u of UEBUNGEN) UEBUNG_NACH_ID[u.id] = u;"
    + "const sprache = " + JSON.stringify(sprache) + ";"
    + "const routinen = " + JSON.stringify(routinen || []) + ";"
    + "let laufendesTraining = " + JSON.stringify(laufend || null) + ";"
    + "function txt(s, w) { let t = TEXTE[s][sprache]; for (const k in (w || {})) t = t.split('{' + k + '}').join(w[k]); return t; }"
    + "function txtAnzahl(s, n) { return n + ' Sätze'; }"
    + "function element(tag, klasse, text) { return { tag, className: klasse, text: text === undefined ? '' : String(text), kinder: [], appendChild(k) { this.kinder.push(k); } }; }"
    + konstanteHolen("EINSEITIG_NAME")
    + ECHT.map(funktionHolen).join("")
    + "return { " + ECHT.join(", ") + " };")();
}

let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

// ---------- Nummern ----------
for (const sprache of ["de", "en"]) {
  const a = umgebung(sprache);
  const reihe = [0, 1, 2, 3, 4, 5].map(i => a.satzNummer(i, true)).join(", ");
  pruefe(sprache + ": Einzeln 1 R, 1 L, 2 R, 2 L, 3 R, 3 L", reihe === "1 R, 1 L, 2 R, 2 L, 3 R, 3 L", reihe);
  pruefe(sprache + ": ohne Einzeln wie bisher", [0, 1, 2, 3].map(i => a.satzNummer(i, false)).join() === "1,2,3,4");
  pruefe(sprache + ": Zusatz-Satz 7 ist 4 R", a.satzNummer(6, true) === "4 R");
  pruefe(sprache + ": zweistellig 10 L", a.satzNummer(19, true) === "10 L");
}

// ---------- Element für die Tabellen ----------
{
  const a = umgebung("de");
  const alt = a.satzNummerElement(2, false);
  pruefe("Element ohne Einzeln: genau wie früher", alt.className === "satz-nummer" && alt.text === "3" && alt.kinder.length === 0, JSON.stringify(alt));
  const neu = a.satzNummerElement(3, true);
  pruefe("Element Einzeln: Nummer 2 und kleines L", neu.className === "satz-nummer" && neu.text === "2" && neu.kinder.length === 1
    && neu.kinder[0].className === "satz-seite" && neu.kinder[0].text === "L", JSON.stringify(neu));
}

// ---------- Welche Einträge Seiten zeigen ----------
{
  const routinen = [{ id: "r1", name: "Pull", uebungen: [
    { name: "Kurzhantelrudern", uebungId: "kurzhantelrudern", zielSaetze: 3, zaehlweise: "seiten" },
    { name: "Seitheben", uebungId: "single-arm-cable-lateral-raise", zielSaetze: 3 },
    { name: "Bankdrücken", uebungId: "bankdruecken-lh", zielSaetze: 3, zaehlweise: "seiten" }
  ] }];
  const a = umgebung("de", routinen);
  pruefe("Eintrag der Routine mit Einzeln", a.eintragSeiten({ id: "e1", uebung: "Kurzhantelrudern", uebungId: "kurzhantelrudern", routineId: "r1" }) === true);
  pruefe("Eintrag der Routine mit Beide", a.eintragSeiten({ id: "e2", uebung: "Seitheben", uebungId: "single-arm-cable-lateral-raise", routineId: "r1" }) === false);
  pruefe("nicht einseitige Übung trotz seiten", a.eintragSeiten({ id: "e3", uebung: "Bankdrücken", uebungId: "bankdruecken-lh", routineId: "r1" }) === false);
  pruefe("Eintrag ohne Routine (Übung eintragen)", a.eintragSeiten({ id: "e4", uebung: "Kurzhantelrudern", uebungId: "kurzhantelrudern" }) === false);
  pruefe("Routine gelöscht", a.eintragSeiten({ id: "e5", uebung: "Kurzhantelrudern", uebungId: "kurzhantelrudern", routineId: "weg" }) === false);
  pruefe("kein Eintrag", a.eintragSeiten(null) === false);
  // Im laufenden Training gilt dessen Übung, auch wenn die Routine inzwischen anders eingestellt ist
  const b = umgebung("de", [{ id: "r1", name: "Pull", uebungen: [{ name: "Kurzhantelrudern", uebungId: "kurzhantelrudern", zielSaetze: 3 }] }],
    { routineId: "r1", index: 0, uebungen: [{ name: "Kurzhantelrudern", uebungId: "kurzhantelrudern", zielSaetze: 3, zaehlweise: "seiten", eintragId: "e9", saetze: [] }] });
  pruefe("laufendes Training geht vor", b.eintragSeiten({ id: "e9", uebung: "Kurzhantelrudern", uebungId: "kurzhantelrudern", routineId: "r1" }) === true);
}

// ---------- Stand in der Übersicht ----------
{
  const a = umgebung("de");
  const u = { name: "Kurzhantelrudern", uebungId: "kurzhantelrudern", zielSaetze: 3, zaehlweise: "seiten", saetze: [{}, {}, {}, {}] };
  pruefe("Übersicht Einzeln: 2 L von 3 Sätzen", a.uebungStandText(u) === "2 L von 3 Sätzen", a.uebungStandText(u));
  const b = Object.assign({}, u, { zaehlweise: undefined });
  pruefe("Übersicht Beide: 4 von 3 ist fertig wie bisher", a.uebungStandText(b) === "fertig · 4 Sätze", a.uebungStandText(b));
  const c = Object.assign({}, u, { zaehlweise: undefined, saetze: [{}, {}] });
  pruefe("Übersicht Beide: 2 von 3 wie bisher", a.uebungStandText(c) === "2 von 3 Sätzen", a.uebungStandText(c));
  const e = umgebung("en");
  pruefe("Übersicht Englisch: 2 L of 3 sets", e.uebungStandText(u) === "2 L of 3 sets", e.uebungStandText(u));
}

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
