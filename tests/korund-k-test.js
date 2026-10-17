// Test: Seit Version 140 zeigt der Look "Korund" auf Home statt der Ringe das Korund-K. Der Stamm füllt sich mit dem Volumen,
// der obere Arm mit den Workouts, der untere Arm mit den Wiederholungen, je gemessen an WOCHEN_ZIELE (bei 100 % gekappt).
// Dazu die Farbwelten: fünf Werte, ohne Eintrag oder bei Unbekanntem "blau". Nichts davon ändert Trainingsdaten.
// Starten mit: node tests/korund-k-test.js
// Die Datei gehört nicht zur App. Die Funktionen holt sie direkt aus der app.js, die Texte aus der texte.js.

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const texte = fs.readFileSync(new URL("../texte.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const index = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const korundCss = fs.readFileSync(new URL("../korund.css", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const sw = fs.readFileSync(new URL("../sw.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
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
function element(tag, klasse, text) {
  const e = { tag, className: klasse || "", textContent: text === undefined ? "" : String(text), innerHTML: "", kinder: [], merkmale: {}, style: {} };
  e.appendChild = function (k) { this.kinder.push(k); return k; };
  e.setAttribute = function (n, w) { this.merkmale[n] = String(w); };
  return e;
}
const TEXTE = new Function(texte + "; return TEXTE;")();
let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

function bauen(sprache, einheitWahl, einst) {
  const code = konstanteHolen("WOCHEN_ZIELE") + konstanteHolen("LBS_JE_KG") + konstanteHolen("K_TEILE") + konstanteHolen("FARBWELT_AUSWAHL")
    + "let kZaehler = 0; const einstellungen = einst;"
    + "function einheit() { return einheitWahl; }"
    + "function ausKg(kg) { return einheit() === 'lbs' ? kg * LBS_JE_KG : kg; }"
    + "function gebiet() { return sprache === 'de' ? 'de-DE' : 'en-US'; }"
    + "function txt(s, w) { let t = TEXTE[s][sprache]; for (const k in (w || {})) t = t.replace('{' + k + '}', w[k]); return t; }"
    + "function requestAnimationFrame() {}"
    + funktionHolen("kBand") + funktionHolen("kSvg") + funktionHolen("wochenRingDaten") + funktionHolen("wochenKFeld") + funktionHolen("farbwelt")
    + "return { kBand, kSvg, daten: wochenRingDaten, feld: wochenKFeld, farbwelt, K_TEILE };";
  return new Function("element", "TEXTE", "sprache", "einheitWahl", "einst", code)(element, TEXTE, sprache, einheitWahl, einst || {});
}
// Die Anteile, die im SVG an den Bändern stehen: stamm, oben, unten
function anteile(svg) {
  return [...svg.matchAll(/data-anteil="([^"]+)"/g)].map(m => Number(m[1]));
}
const alle = (e, l = []) => { l.push(e); e.kinder.forEach(k => alle(k, l)); return l; };
const text = e => alle(e).map(k => k.textContent).filter(Boolean).join(" | ");

{
  const a = bauen("de", "kg");
  const f = a.feld(a.daten({ workouts: 3, wdh: 282, volumen: 16731 }));
  const svg = alle(f).find(k => k.className === "wochen-k-bild").innerHTML;
  const w = anteile(svg);
  pruefe("Volumen über dem Ziel: Stamm voll (gekappt)", w[0] === 1, w[0]);
  pruefe("Workouts 3 von 5: oberer Arm 0,6", Math.abs(w[1] - 0.6) < 1e-9, w[1]);
  pruefe("Wdh. 282 von 320: unterer Arm", Math.abs(w[2] - 282 / 320) < 1e-9, w[2]);
  pruefe("Drei Teile, drei Spuren", (svg.match(/class="k-spur"/g) || []).length === 3 && (svg.match(/class="k-teil k-/g) || []).length === 3);
  pruefe("Klassen für die Farben der Farbwelt", svg.indexOf("k-stamm") !== -1 && svg.indexOf("k-oben") !== -1 && svg.indexOf("k-unten") !== -1);
  const t = text(f);
  pruefe("Zahlen DE", t.indexOf("16.731") !== -1 && t.indexOf(" / 15.000 kg") !== -1 && t.indexOf(" / 5") !== -1 && t.indexOf(" / 320") !== -1, t);
  pruefe("Namen DE", t.indexOf("Volumen") !== -1 && t.indexOf("Workouts") !== -1 && t.indexOf("Wiederholungen") !== -1, t);
  const zeilen = alle(f).filter(k => k.className === "wochen-k-zeile");
  pruefe("Drei Zeilen", zeilen.length === 3);
  const mini = alle(f).filter(k => k.className === "wochen-k-mini").map(k => anteile(k.innerHTML).join(","));
  pruefe("Mini-K: nur der passende Teil gefüllt", mini.join(" ") === "1,0,0 0,1,0 0,0,1", mini.join(" "));
}
{
  const a = bauen("en", "lbs");
  const f = a.feld(a.daten({ workouts: 0, wdh: 0, volumen: 0 }));
  const w = anteile(alle(f).find(k => k.className === "wochen-k-bild").innerHTML);
  pruefe("Leere Woche: alles 0", w.every(x => x === 0), w.join(","));
  const t = text(f);
  pruefe("EN mit lbs: Ziel in lbs gerundet", t.indexOf(" / 33,000 lbs") !== -1, t);
  pruefe("Namen EN", t.indexOf("Volume") !== -1 && t.indexOf("Workouts") !== -1 && t.indexOf("Repetitions") !== -1, t);
}
{
  const a = bauen("de", "kg");
  const t = a.K_TEILE;
  // Das Band bei 0 endet am Startpunkt a, bei 1 am Endpunkt b (Mitte der zweiten und dritten Ecke)
  for (const teil of t) {
    for (const anteil of [0, 0.5, 1]) {
      const p = a.kBand(teil, anteil).split(" ").map(x => x.split(",").map(Number));
      const mx = (p[1][0] + p[2][0]) / 2, my = (p[1][1] + p[2][1]) / 2;
      const zx = teil.a[0] + (teil.b[0] - teil.a[0]) * anteil, zy = teil.a[1] + (teil.b[1] - teil.a[1]) * anteil;
      pruefe("Band " + teil.art + " bei " + anteil, Math.abs(mx - zx) < 0.2 && Math.abs(my - zy) < 0.2, mx + "," + my);
    }
  }
  pruefe("Feste Farben (Auswahl)", a.kSvg({ stamm: 1, oben: 1, unten: 1 }, ["#111111", "#222222", "#333333"]).indexOf('style="fill:#222222"') !== -1);
  pruefe("IDs der Clip-Pfade eindeutig", a.kSvg({}).match(/id="(k\d+)stamm"/)[1] !== a.kSvg({}).match(/id="(k\d+)stamm"/)[1]);
}
{
  // Farbwelt
  pruefe("Ohne Eintrag: blau", bauen("de", "kg", {}).farbwelt() === "blau");
  pruefe("Unbekannt: blau", bauen("de", "kg", { farbwelt: "grün" }).farbwelt() === "blau");
  for (const id of ["blau", "aurora", "volt", "gold", "puls"]) {
    pruefe("Farbwelt " + id + " gültig", bauen("de", "kg", { farbwelt: id }).farbwelt() === id);
    pruefe("Farbwelt " + id + " in der korund.css", id === "blau" || korundCss.indexOf('[data-farbwelt="' + id + '"][data-design="dunkel"]') !== -1 && korundCss.indexOf('[data-farbwelt="' + id + '"]:not([data-design="hell"])') !== -1);
    pruefe("Farbwelt " + id + " Text DE/EN", TEXTE["farbwelt." + id] && TEXTE["farbwelt." + id].de && TEXTE["farbwelt." + id].en);
    pruefe("Farbwelt " + id + " im Start-Skript", id === "blau" || index.indexOf('gespeichert.farbwelt === "' + id + '"') !== -1);
  }
  pruefe("farbwelt setzt nur die Einstellungen", !/eintraege|trainings|routinen/.test(funktionHolen("farbweltSetzen")));
}
{
  // Look Korund: Standard ohne Eintrag, alte Looks bleiben wählbar, korund.css offline im Cache
  const palette = new Function("einstellungen", funktionHolen("palette") + "return palette();");
  pruefe("Look ohne Eintrag: korund", palette({}) === "korund");
  pruefe("Look korund", palette({ palette: "korund" }) === "korund");
  pruefe("Look schwarz bleibt (Design bis 139)", palette({ palette: "schwarz" }) === "schwarz");
  pruefe("Look graphit bleibt", palette({ palette: "graphit" }) === "graphit");
  pruefe("Look mockup bleibt", palette({ palette: "mockup" }) === "mockup");
  pruefe("Look unbekannt: schwarz", palette({ palette: "xyz" }) === "schwarz");
  pruefe("Start-Skript: ohne Eintrag korund", /if \(palette === undefined \|\| palette === null \|\| palette === "korund"\)/.test(index));
  pruefe("korund.css in DATEIEN", sw.indexOf('"korund.css?v=" + VERSION') !== -1);
  pruefe("korund.css mit Versionsnummer in der index.html", /korund\.css\?v=\d+/.test(index));
  pruefe("Jede Korund-Regel zweimal (Dunkel und System)", (korundCss.match(/\[data-palette="korund"\]\[data-design="dunkel"\]/g) || []).length === (korundCss.match(/\[data-palette="korund"\]:not\(\[data-design="hell"\]\)/g) || []).length);
}

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
