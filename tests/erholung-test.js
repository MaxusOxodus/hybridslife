// Test: Erholungskarte mit Bedarf je Partie (seit Version 165, Forschung AP7): ohne RIR 2 Tage, leicht 1 Tag,
// schwer (RIR 0 und viele harte Sätze) 3 Tage. erholungTage, erholungBedarf und partieErholt stehen in der app.js.
// Starten mit: node tests/erholung-test.js

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
  const treffer = new RegExp("\\n  const " + name + " = [\\s\\S]*?;\\n").exec(quelle);
  if (!treffer) {
    throw new Error("Konstante " + name + " nicht gefunden");
  }
  return treffer[0];
}
let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

const f = new Function(["ERHOLUNG_TAGE", "ERHOLUNG_LEICHT", "ERHOLUNG_SCHWER", "ERHOLUNG_HART_RIR", "ERHOLUNG_FENSTER_TAGE", "ERHOLUNG_PARTIEN"].map(konstanteHolen).join("")
  + "function hatDatum(e) { return typeof e.datum === 'string'; }"
  + "function gruppeIdVon(id, gruppe) { return gruppe; }"
  + "function arbeitsSaetzeVon(e) { return e.einzelsaetze.filter(function (s) { return !s.aufwaermen; }); }"
  + ["erholungPartie", "erholungTage", "erholungBedarf", "partieErholt"].map(funktionHolen).join("")
  + "return { erholungTage, erholungBedarf, partieErholt };")();

const HEUTE = new Date(2026, 9, 21, 12);
function eintrag(tageZurueck, gruppe, saetze) {
  const d = new Date(2026, 9, 21 - tageZurueck, 18);
  return { datum: d.toISOString(), muskelgruppe: gruppe, einzelsaetze: saetze.map(s => (s.length > 1 ? { gewicht: 50, wdh: 8, rir: s[1] } : { gewicht: 50, wdh: 8 })) };
}
function rechne(liste) {
  const tage = f.erholungTage(liste, HEUTE);
  return { tage: tage, bedarf: f.erholungBedarf(liste, HEUTE, tage) };
}
const ohneRir = (n) => Array.from({ length: n }, () => [1]);
const mitRir = (liste) => liste.map(r => [1, r]);

let r = rechne([eintrag(1, "brust", ohneRir(12))]);
pruefe("Ohne RIR: 2 Tage", r.bedarf.brust === 2, r.bedarf.brust);
pruefe("Ohne RIR, gestern: noch nicht erholt", !f.partieErholt(r.tage, r.bedarf, "brust"));
r = rechne([eintrag(1, "brust", mitRir([3, 3, 4, 3]))]);
pruefe("Leicht (RIR 3+, 4 Sätze): 1 Tag, gestern = erholt", r.bedarf.brust === 1 && f.partieErholt(r.tage, r.bedarf, "brust"), r.bedarf.brust);
r = rechne([eintrag(2, "quadrizeps", mitRir([2, 1, 0, 1, 1, 0, 2, 1, 1, 0]))]);
pruefe("Schwer (RIR 0, 10 Sätze): 3 Tage, vorgestern = noch nicht", r.bedarf.beine === 3 && !f.partieErholt(r.tage, r.bedarf, "beine"), r.bedarf.beine);
r = rechne([eintrag(2, "quadrizeps", mitRir([2, 1, 0, 1]))]);
pruefe("RIR 0, aber nur 4 Sätze: 2 Tage", r.bedarf.beine === 2, r.bedarf.beine);
r = rechne([eintrag(1, "brust", mitRir([3, 3, 3, 3, 3, 3, 3]))]);
pruefe("RIR 3, aber 7 Sätze: 2 Tage", r.bedarf.brust === 2, r.bedarf.brust);
r = rechne([eintrag(1, "brust", mitRir([5, 5, 3, 3]))]);
pruefe("Sätze mit RIR 5 sind nicht hart: 2 harte mit RIR 3 → 1 Tag", r.bedarf.brust === 1, r.bedarf.brust);
r = rechne([eintrag(1, "lat", mitRir([0, 0, 0, 0, 0])), eintrag(1, "ruecken-oben", mitRir([0, 1, 0, 1, 0]))]);
pruefe("Mehrere Einträge einer Partie am selben Tag zählen zusammen (10 Sätze, RIR 0): 3 Tage", r.bedarf.ruecken === 3, r.bedarf.ruecken);
r = rechne([eintrag(5, "brust", mitRir([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])), eintrag(1, "brust", mitRir([3, 3]))]);
pruefe("Zählt nur der letzte Trainingstag der Partie", r.bedarf.brust === 1, r.bedarf.brust);
pruefe("Ohne Bedarf gilt ERHOLUNG_TAGE", f.partieErholt({ arme: 2 }, {}, "arme") && !f.partieErholt({ arme: 1 }, {}, "arme"));
pruefe("Text sagt voraussichtlich", /"erholung\.erholt": \{ de: "[^"]*voraussichtlich/.test(texte));

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
if (fehler > 0) {
  process.exit(1);
}
