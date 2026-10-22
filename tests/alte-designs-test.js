// Prüft den Schalter SHOW_ALTE_DESIGNS (seit Version 191): Mit false zeigt die App immer Glass, Blau und den Look Korund,
// das Start-Skript der index.html setzt beim Start dieselben Attribute (nichts blitzt auf), gespeicherte Werte bleiben
// unverändert. Mit true gilt wieder die gespeicherte Wahl, genau wie bis Version 190.
// Starten mit: node tests/alte-designs-test.js
const fs = require("fs");
const path = require("path");
const wurzel = path.join(__dirname, "..");
const app = fs.readFileSync(path.join(wurzel, "app.js"), "utf8");
const index = fs.readFileSync(path.join(wurzel, "index.html"), "utf8");

let pruefungen = 0;
let fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

// Beide Schalter sind gleich und stehen auf false
const inApp = /const SHOW_ALTE_DESIGNS = (true|false);/.exec(app);
const inIndex = /var alteDesignsBeimStart = (true|false);/.exec(index);
pruefe("Schalter in der app.js", !!inApp && inApp[1] === "false", inApp && inApp[1]);
pruefe("Schalter im Start-Skript", !!inIndex && inIndex[1] === "false", inIndex && inIndex[1]);
pruefe("beide Schalter gleich", !!inApp && !!inIndex && inApp[1] === inIndex[1]);

// Die Zeilen Stil, Farbe und Look tragen das Merkmal, Design und Farbwelt nicht
const design = index.slice(index.indexOf('id="einst-ansicht-design"'), index.indexOf('id="einst-ansicht-sprache"'));
const markiert = (design.match(/<[a-z0-9]+ [^>]*data-alte-designs[^>]*>/g) || []);
pruefe("acht Elemente markiert", markiert.length === 8, markiert.length);
["stil", "stil-auswahl", "stil.hinweis", "akzent", "akzent-auswahl", "palette", "palette-auswahl", "palette.hinweis"].forEach(function (name) {
  pruefe("markiert: " + name, markiert.some(function (m) {
    return m.indexOf('data-t="' + name + '"') !== -1 || m.indexOf('id="' + name + '"') !== -1;
  }));
});
["design-auswahl", "design.hinweis", "farbwelt", "farbwelt-auswahl", "farbwelt.hinweis"].forEach(function (name) {
  const zeile = new RegExp('<[^>]*(data-t|id)="' + name.replace(".", "\\.") + '"[^>]*>').exec(design);
  pruefe("nicht markiert: " + name, !!zeile && zeile[0].indexOf("data-alte-designs") === -1);
});

// Das Start-Skript mit einem nachgebauten document und localStorage
const startSkript = /<script>\s*(var alteDesignsBeimStart[\s\S]*?)<\/script>/.exec(index)[1];
function start(einstellungen, schalter) {
  const attribute = {};
  const document = { documentElement: {
    setAttribute: function (k, v) { attribute[k] = v; },
    removeAttribute: function (k) { delete attribute[k]; }
  } };
  const localStorage = { getItem: function () { return einstellungen === null ? null : JSON.stringify(einstellungen); } };
  const quelle = startSkript.replace("var alteDesignsBeimStart = false;", "var alteDesignsBeimStart = " + schalter + ";");
  new Function("document", "localStorage", quelle)(document, localStorage);
  return attribute;
}

// Die Funktionen der app.js mit dem Schalter
function funktionHolen(name) {
  const m = new RegExp("\\n( +)function " + name + "\\(").exec(app);
  const ende = app.indexOf("\n" + m[1] + "}\n", m.index + 1);
  return app.slice(m.index, ende + m[1].length + 3);
}
const konstante = (name) => new RegExp("\\n +const " + name + " = \\[[\\s\\S]*?\\];").exec(app)[0];
function appWerte(einstellungen, schalter) {
  const kopie = JSON.parse(JSON.stringify(einstellungen));
  const f = new Function("einstellungen", "const SHOW_ALTE_DESIGNS = " + schalter + ";" + konstante("AKZENT_AUSWAHL")
    + funktionHolen("stil") + funktionHolen("akzent") + funktionHolen("palette")
    + "return { stil: stil(), akzent: akzent(), palette: palette() };");
  const werte = f(kopie);
  pruefe("app.js ändert die Einstellungen nicht " + JSON.stringify(einstellungen) + " " + schalter, JSON.stringify(kopie) === JSON.stringify(einstellungen));
  return werte;
}

const FAELLE = [
  { name: "leer", e: null },
  { name: "ohne Designwerte", e: {} },
  { name: "Standard", e: { stil: "glass", akzent: "blau", palette: "korund", farbwelt: "blau" } },
  { name: "Limette", e: { akzent: "limette" } },
  { name: "Klassisch", e: { stil: "klassisch", akzent: "blau" } },
  { name: "Schwarz", e: { palette: "schwarz", akzent: "blau" } },
  { name: "Graphit", e: { palette: "graphit", akzent: "rot", design: "dunkel" } },
  { name: "Mockup", e: { palette: "mockup", akzent: "lila", design: "hell" } },
  { name: "alles alt", e: { stil: "klassisch", akzent: "limette", palette: "graphit", farbwelt: "gold", design: "dunkel" } },
  { name: "unbekannt", e: { stil: "neu", akzent: "grau", palette: "bunt", farbwelt: "x" } }
];

FAELLE.forEach(function (fall) {
  // Mit false: immer Glass, kein data-akzent (Blau), Korund; Design und Farbwelt wie gespeichert
  const a = start(fall.e, false);
  pruefe(fall.name + ": Start Glass", a["data-stil"] === "glass", JSON.stringify(a));
  pruefe(fall.name + ": Start Blau", a["data-akzent"] === undefined, JSON.stringify(a));
  pruefe(fall.name + ": Start Korund", a["data-palette"] === "korund", JSON.stringify(a));
  const e = fall.e || {};
  const welt = ["aurora", "volt", "gold", "puls"].indexOf(e.farbwelt) !== -1 ? e.farbwelt : "blau";
  pruefe(fall.name + ": Start Farbwelt", a["data-farbwelt"] === welt, JSON.stringify(a));
  const designErwartet = e.design === "dunkel" || e.design === "hell" ? e.design : undefined;
  pruefe(fall.name + ": Start Hell/Dunkel/System", a["data-design"] === designErwartet, JSON.stringify(a));

  // Die app.js setzt danach dieselben Werte (kein Wechsel nach dem Start)
  const w = appWerte(e, false);
  pruefe(fall.name + ": app.js Glass, Blau, Korund", w.stil === "glass" && w.akzent === "blau" && w.palette === "korund", JSON.stringify(w));

  // Mit true: genau wie bis Version 190
  const b = start(fall.e, true);
  const alt = appWerte(e, true);
  pruefe(fall.name + ": mit true Stil wie gespeichert", (b["data-stil"] === "glass") === (alt.stil === "glass") && alt.stil === (e.stil === "klassisch" ? "klassisch" : "glass"), JSON.stringify(b));
  const akzentAlt = ["limette", "rot", "pink", "lila"].indexOf(e.akzent) !== -1 ? e.akzent : (["blau"].indexOf(e.akzent) !== -1 ? "blau" : "blau");
  pruefe(fall.name + ": mit true Akzent wie gespeichert", alt.akzent === akzentAlt, alt.akzent);
  // Das Start-Skript setzt Limette auch ohne Eintrag in vorhandenen Einstellungen (akzentUebernehmen speichert es danach)
  const startAkzent = fall.e === null ? undefined : (e.akzent === undefined ? "limette" : (akzentAlt === "blau" ? undefined : akzentAlt));
  pruefe(fall.name + ": mit true Start-Akzent wie bis 190", b["data-akzent"] === startAkzent, JSON.stringify(b));
  const paletteAlt = e.palette === undefined || e.palette === "korund" ? "korund" : (e.palette === "graphit" || e.palette === "mockup" ? e.palette : "schwarz");
  pruefe(fall.name + ": mit true Look wie gespeichert", alt.palette === paletteAlt && (b["data-palette"] || "schwarz") === paletteAlt, JSON.stringify(b));
});

// Die Setzer und akzentUebernehmen sind unverändert (sie laufen nur über die ausgeblendeten Zeilen bzw. füllen nur einen fehlenden Wert)
pruefe("stilSetzen unverändert", /function stilSetzen\(neu\) \{\n    if \(neu === "klassisch"\) \{\n      einstellungen\.stil = "klassisch";/.test(app));
pruefe("akzentUebernehmen füllt nur einen fehlenden Wert", /if \(einstellungen\.akzent === undefined\) \{\n      einstellungen\.akzent = tourAppNeu \? "blau" : "limette";/.test(app));
pruefe("platzhalterAnwenden blendet data-alte-designs nach dem Schalter aus", /querySelectorAll\("\[data-alte-designs\]"\)[\s\S]{0,120}classList\.toggle\("versteckt", !SHOW_ALTE_DESIGNS\)/.test(app));

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
