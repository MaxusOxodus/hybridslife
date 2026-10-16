// Test: Seit Version 127 ist das Wdh.-Ziel im Routinen-Editor ein einziges Auswahlfeld
// ("Kein Ziel", Bereiche, feste Zahlen 1 bis 30). Gespeichert wird weiter in zielWdh und zielWdhMax.
// Geprüft wird: Alte Routinen zeigen den gleichen Wert wie vorher, ein gespeicherter Bereich, der nicht
// in der Liste steht, kommt dazu, ohne Wahl bleibt die Übung unverändert, jede Wahl schreibt die richtigen Zahlen.
// Starten mit: node tests/wdh-feld-test.js
// Die Datei gehört nicht zur App. Die Funktionen holt sie direkt aus der app.js, das Auswahlfeld ist hier nachgebaut.

import fs from "node:fs";

// Die Dateien können Windows-Zeilenenden (CRLF) oder LF haben, CRLF wird zu LF. Sonst findet funktionHolen nichts.
const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");

// Schneidet eine Funktion aus der app.js aus: von "function name(" bis zur schließenden Klammer auf derselben Einrückung.
function funktionHolen(name) {
  const start = quelle.indexOf("  function " + name + "(");
  const ende = quelle.indexOf("\n  }\n", start);
  if (start === -1 || ende === -1) {
    throw new Error("Funktion " + name + " nicht in der app.js gefunden");
  }
  return quelle.slice(start, ende + 5);
}

// Die Liste der Bereiche steht als Konstante direkt vor wdhZielFeld
const bereicheZeile = quelle.match(/\n  const WDH_BEREICHE = .*\n/)[0];

// Ein kleiner Ersatz für Auswahlfeld, Gruppen und Optionen. Wie im Browser gilt ein Wert, den es nicht gibt, als "".
class Option {
  constructor(text, wert) {
    this.textContent = text;
    this.value = String(wert);
  }
}
function auswahlBauen() {
  const optionen = [];
  const lauscher = {};
  let wert = "";
  return {
    art: "select",
    kinder: [],
    optionen: optionen,
    appendChild: function (k) {
      this.kinder.push(k);
      if (k.art === "optgroup") {
        for (const o of k.kinder) { optionen.push(o); }
      } else {
        optionen.push(k);
      }
    },
    addEventListener: function (name, f) { if (name === "pointerdown") { throw new Error("pointerdown soll es nicht geben"); } lauscher[name] = f; },
    ausloesen: function (name) { (name === "change" ? this.onchange : lauscher[name])(); },
    get value() { return wert; },
    set value(w) { const s = String(w); wert = optionen.some(o => o.value === s) ? s : ""; },
    // Der Text, der im geschlossenen Feld steht
    get anzeige() { return optionen.find(o => o.value === wert).textContent; }
  };
}
const dokument = {
  createElement: function (art) {
    if (art === "optgroup") {
      return { art: "optgroup", kinder: [], appendChild: function (o) { this.kinder.push(o); } };
    }
    return auswahlBauen();
  }
};

const code = "function element(art, klasse, text) { return { art: art, klasse: klasse, text: text, kinder: [], appendChild: function (k) { this.kinder.push(k); } }; }"
  + "function txt(schluessel) { return schluessel; }"
  + bereicheZeile
  + funktionHolen("wdhBis")
  + funktionHolen("wdhZielFeld")
  + "return wdhZielFeld;";
const wdhZielFeld = new Function("document", "Option", code)(dokument, Option);

let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

// Baut das Feld zu einer Übung und gibt das Auswahlfeld zurück
function feld(uebung) {
  const rahmen = wdhZielFeld(uebung);
  pruefe("Rahmen ist ein label mit Beschriftung Wdh.", rahmen.art === "label" && rahmen.klasse === "ziel" && rahmen.kinder[0].text === "wdh");
  return rahmen.kinder[1];
}

// ---------- Reihenfolge der Liste ----------
const leer = feld({ zielWdh: null, zielWdhMax: null });
const werte = leer.optionen.map(o => o.value);
const BEREICHE = ["4-6", "5-8", "5-9", "6-8", "6-10", "8-10", "8-12", "10-12", "10-15", "12-15", "15-20"];
const FEST = [];
for (let n = 1; n <= 30; n++) { FEST.push(String(n)); }
pruefe("Liste: Kein Ziel, 11 Bereiche, 1 bis 30", JSON.stringify(werte) === JSON.stringify([""].concat(BEREICHE, FEST)), werte.join(","));
pruefe("Bereiche mit Halbgeviertstrich", leer.optionen[7].textContent === "8–12", leer.optionen[7].textContent);
pruefe("Gruppen heißen Bereich und Feste Zahl",
  leer.kinder[1].label === "editor.eigenerBereich" && leer.kinder[2].label === "editor.festeZahl");

// ---------- Alte Routinen zeigen den gleichen Wert ----------
const FAELLE = [
  { name: "kein Ziel", u: { zielWdh: null, zielWdhMax: null }, wert: "", anzeige: "–" },
  { name: "feste Zahl 10", u: { zielWdh: 10, zielWdhMax: null }, wert: "10", anzeige: "10" },
  { name: "feste Zahl 30", u: { zielWdh: 30, zielWdhMax: null }, wert: "30", anzeige: "30" },
  { name: "Bereich 8–12", u: { zielWdh: 8, zielWdhMax: 12 }, wert: "8-12", anzeige: "8–12" },
  { name: "Vorlage 5–8", u: { zielWdh: 5, zielWdhMax: 8 }, wert: "5-8", anzeige: "5–8" },
  { name: "Vorlage 12–15", u: { zielWdh: 12, zielWdhMax: 15 }, wert: "12-15", anzeige: "12–15" },
  { name: "alte Vorgabe 5–9", u: { zielWdh: 5, zielWdhMax: 9 }, wert: "5-9", anzeige: "5–9" },
  { name: "gleiche Enden 10–10 (wie bisher feste Zahl)", u: { zielWdh: 10, zielWdhMax: 10 }, wert: "10", anzeige: "10" },
  { name: "vertauschte Enden 12/8 (wie bisher 12)", u: { zielWdh: 12, zielWdhMax: 8 }, wert: "12", anzeige: "12" },
  { name: "nur oberes Ende (wie bisher leer)", u: { zielWdh: null, zielWdhMax: 12 }, wert: "", anzeige: "–" },
  { name: "ältere Routine ohne die Felder", u: {}, wert: "", anzeige: "–" }
];
for (const f of FAELLE) {
  const vorher = JSON.stringify(f.u);
  const a = feld(f.u);
  pruefe(f.name + ": Wert", a.value === f.wert, a.value);
  pruefe(f.name + ": im Feld steht " + f.anzeige, a.anzeige === f.anzeige, a.anzeige);
  pruefe(f.name + ": Übung unverändert", JSON.stringify(f.u) === vorher, JSON.stringify(f.u));
  // Öffnen und wieder schließen ohne Wahl ändert nichts
  a.ausloesen("focus");
  a.ausloesen("blur");
  pruefe(f.name + ": Öffnen ohne Wahl ändert nichts", JSON.stringify(f.u) === vorher);
}

// ---------- Eigener älterer Bereich kommt dazu, an der richtigen Stelle ----------
const eigen = { zielWdh: 7, zielWdhMax: 11 };
const ae = feld(eigen);
const ew = ae.optionen.map(o => o.value);
pruefe("7–11 steht in der Liste", ae.value === "7-11" && ae.anzeige === "7–11", ae.value);
pruefe("7–11 sortiert zwischen 6–10 und 8–10", ew.indexOf("7-11") === ew.indexOf("6-10") + 1 && ew.indexOf("8-10") === ew.indexOf("7-11") + 1, ew.join(","));
pruefe("7–11 steht in der Gruppe Bereich", ae.kinder[1].kinder.some(o => o.value === "7-11"));
pruefe("Die nächste Übung hat 7–11 nicht", !feld({ zielWdh: 8, zielWdhMax: 12 }).optionen.some(o => o.value === "7-11"));
const grenze = feld({ zielWdh: 20, zielWdhMax: 30 });
pruefe("20–30 steht am Ende der Bereiche", grenze.kinder[1].kinder.at(-1).value === "20-30" && grenze.value === "20-30");

// ---------- Eine Wahl schreibt die Zahlen ----------
const u = { name: "Bankdrücken", zielSaetze: 3, zielWdh: 10, zielWdhMax: null, pause: null };
const a = feld(u);
a.value = "8-12"; a.ausloesen("change");
pruefe("Wahl 8–12", u.zielWdh === 8 && u.zielWdhMax === 12, JSON.stringify(u));
a.value = "15"; a.ausloesen("change");
pruefe("Wahl 15", u.zielWdh === 15 && u.zielWdhMax === null, JSON.stringify(u));
a.value = "15-20"; a.ausloesen("change");
pruefe("Wahl 15–20", u.zielWdh === 15 && u.zielWdhMax === 20, JSON.stringify(u));
a.value = ""; a.ausloesen("change");
pruefe("Wahl Kein Ziel", u.zielWdh === null && u.zielWdhMax === null, JSON.stringify(u));
a.value = "1"; a.ausloesen("change");
pruefe("Wahl 1", u.zielWdh === 1 && u.zielWdhMax === null);
pruefe("Andere Felder und Reihenfolge der Schlüssel bleiben",
  JSON.stringify(Object.keys(u)) === JSON.stringify(["name", "zielSaetze", "zielWdh", "zielWdhMax", "pause"]) && u.zielSaetze === 3 && u.pause === null);
pruefe("Zahlen sind Zahlen, kein Text", typeof u.zielWdh === "number");

// ---------- Text des ersten Eintrags ----------
const t = feld({ zielWdh: null, zielWdhMax: null });
pruefe("Geschlossen steht ein Strich", t.anzeige === "–");
t.ausloesen("focus");
pruefe("Beim Öffnen (Fokus) heißt er Kein Ziel", t.optionen[0].textContent === "editor.keinZiel");
t.ausloesen("blur");
pruefe("Nach dem Schließen wieder Strich", t.anzeige === "–");
t.ausloesen("focus");
t.value = ""; t.ausloesen("change");
pruefe("Nach der Wahl wieder Strich", t.anzeige === "–");

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler ? 1 : 0);
