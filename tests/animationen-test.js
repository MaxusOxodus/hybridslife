// Test: Seit Version 157 Animationen im Look Korund: Haken über „Geschafft!“, Zahlen zählen hoch, Rang springt bei Aufstieg,
// Pokal bei Rekorden, Pause-Ring und Haken bei „Satz gespeichert“, Serie-Seite, Symbol in der Meldung.
// Starten mit: node tests/animationen-test.js

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const korund = fs.readFileSync(new URL("../korund.css", import.meta.url), "utf8");
const stil = fs.readFileSync(new URL("../style.css", import.meta.url), "utf8");
function funktionHolen(name) {
  const start = quelle.indexOf("\n  function " + name + "(");
  const ende = quelle.indexOf("\n  }\n", start);
  if (start === -1 || ende === -1) {
    throw new Error("Funktion " + name + " nicht in der app.js gefunden");
  }
  return quelle.slice(start, ende + 5);
}
let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

// hochzaehlen: ohne Bewegung (oder bei 0) steht der Endwert sofort da
const f = new Function("window", "performance", "requestAnimationFrame", "const HOCHZAEHLEN_MS = 800;" + funktionHolen("bewegungReduziert") + funktionHolen("hochzaehlen") + "return hochzaehlen;");
const reduziert = { matchMedia: function () { return { matches: true }; } };
const el = { textContent: "" };
f(reduziert, { now: () => 0 }, () => {})(el, 18, String, 0);
pruefe("Bewegung reduziert: Endwert sofort", el.textContent === "18");
const el2 = { textContent: "" };
let gemerkt = null;
f({ matchMedia: () => ({ matches: false }) }, { now: () => 0 }, (fn) => { gemerkt = fn; })(el2, 18, String, 0);
pruefe("Mit Bewegung: Start bei 0", el2.textContent === "0");
gemerkt(10000);
pruefe("Mit Bewegung: am Ende genau der Wert", el2.textContent === "18", el2.textContent);
const el3 = { textContent: "" };
f({ matchMedia: () => ({ matches: false }) }, { now: () => 0 }, () => { throw new Error("darf nicht laufen"); })(el3, 0, String, 0);
pruefe("Null zählt nicht", el3.textContent === "0");

pruefe("Hochzählen nur im Look Korund", /if \(lookKorund\(\)\) \{\n\s+hochzaehlen\(document.getElementById\("fertig-uebungen"\)/.test(funktionHolen("trainingAbschliessen")));
pruefe("Aufgestiegen-Klasse", /karte.classList.add\("aufgestiegen"\)/.test(funktionHolen("berichtAnzeigen")));
pruefe("Pokal bei Rekorden", /fertig-rekord-symbol/.test(funktionHolen("berichtAnzeigen")));
pruefe("Haken angelegt", /fertigHakenAnlegen\(\);/.test(funktionHolen("berichtAnzeigen")));
pruefe("Meldung mit Symbol", /rangHinweisSymbol\(aufstiege.length > 0 \? "rang" : "abzeichen"\)/.test(funktionHolen("rangMeldungZeigen")));
pruefe("Neue Elemente in style.css ausgeblendet", /#fertig-haken,\n\.fertig-rekord-symbol,\n\.rang-hinweis-symbol \{\n  display: none;/.test(stil));
["#fertig-haken .bogen", ".rang-karte.aufgestiegen .rang-bild", ".fertig-rekord-symbol", "#modus-pause:not(.versteckt) #modus-countdown", ".serie-held .serie-symbol", ".rang-hinweis-symbol.abzeichen"].forEach(function (r) {
  pruefe("korund.css in beiden Teilen: " + r, korund.split(r + " {").length - 1 === 2, korund.split(r + " {").length - 1);
});
pruefe("Symbole medaille und sechseck", /\n {4}medaille: '/.test(quelle) && /\n {4}sechseck: '/.test(quelle));

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
