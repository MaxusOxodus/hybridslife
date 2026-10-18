// Test: Seit Version 155 im Look Korund: Statistik mit Serie (Flamme, 8 Wochen) und drei Kacheln „Diese Woche“,
// Kraftrang lila statt Limette, Körpergewicht grün in Richtung des Ziels bzw. ohne Ziel jede Veränderung.
// Starten mit: node tests/statistik-farben-test.js

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const css = fs.readFileSync(new URL("../korund.css", import.meta.url), "utf8");
const texte = fs.readFileSync(new URL("../texte.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
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
const TEXTE = new Function(texte + "; return TEXTE;")();
const g = new Function(funktionHolen("gewichtGuteRichtung") + "return gewichtGuteRichtung;")();

pruefe("Ohne Ziel: Abnahme grün", g(80, -1.2, null) === true);
pruefe("Ohne Ziel: Zunahme grün", g(80, 1.2, null) === true);
pruefe("Keine Veränderung nie grün", g(80, 0, null) === false && g(80, 0, 75) === false);
pruefe("Ziel tiefer: Abnahme grün", g(80, -1, 75) === true);
pruefe("Ziel tiefer: Zunahme nicht grün", g(80, 1, 75) === false);
pruefe("Ziel höher: Zunahme grün", g(70, 1, 75) === true);
pruefe("Statistik Korund eingehängt", /if \(lookKorund\(\)\) \{\n\s+profilStatistikKorund\(inhalt\);/.test(funktionHolen("profilStatistikAnzeigen")));
pruefe("8 Wochen Serie", /const STATISTIK_SERIE_WOCHEN = 8;/.test(quelle));
pruefe("Kachel Körpergewicht nutzt koerper", quelle.indexOf('kachelDelta(flaeche, miniZeitraum(liste), "koerper")') !== -1);
pruefe("Mess-Kopf nutzt gewichtGuteRichtung", /gewichtGuteRichtung\(anfang, unterschied, zielWert\)/.test(quelle));
pruefe("Kraftrang lila in beiden Teilen", (css.match(/\.rang-svg \{ --akzent: #A98BFF;/g) || []).length === 2);
pruefe("CSS Statistik in beiden Teilen", (css.match(/\.statistik-serie-wochen \{/g) || []).length === 2);
pruefe("Symbole wiederholen und gewicht", /\n {4}wiederholen: '/.test(quelle) && /\n {4}gewicht: '<path/.test(quelle));
pruefe("Texte DE/EN", ["statistik.serieWoche", "statistik.serieWochen", "statistik.jetzt", "statistik.wocheAria"].every(k => TEXTE[k] && TEXTE[k].de && TEXTE[k].en));

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
