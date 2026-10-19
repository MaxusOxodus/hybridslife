// Test: Übungsvideos in der Erklärung (seit Version 162).
// Jede Übung in UEBUNGSVIDEOS hat eine Erklärung und für jede vorhandene Figur (Mann immer, Frau/Roboter laut UEBUNGSVIDEO_FIGUREN) MP4, WebM und Standbild,
// die Figur folgt dem Geschlecht im Profil, die sw.js lässt videos/ durch, und die uebungsvideos.js ist eingebunden.
// Starten mit: node tests/uebungsvideos-test.js
// Die Datei gehört nicht zur App.

import fs from "node:fs";

const wurzel = new URL("../", import.meta.url);
const lesen = (d) => fs.readFileSync(new URL(d, wurzel), "utf8").replace(/\r\n/g, "\n");
let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

// Liste und Figur aus der uebungsvideos.js
const videos = new Function(lesen("uebungsvideos.js") + "; return { UEBUNGSVIDEOS, UEBUNGSVIDEO_FIGUREN, videoFigur, videoDatei };")();
pruefe("Liste ist nicht leer", videos.UEBUNGSVIDEOS.length > 0);
pruefe("m zeigt den Mann", videos.videoFigur("m") === "mann");
pruefe("w zeigt die Frau", videos.videoFigur("w") === "frau");
pruefe("d zeigt den Roboter", videos.videoFigur("d") === "roboter");
pruefe("ohne Angabe zeigt den Roboter", videos.videoFigur("") === "roboter");
pruefe("videoDatei mit Figur", videos.videoDatei("kniebeuge", "w") === (videos.UEBUNGSVIDEO_FIGUREN.kniebeuge && videos.UEBUNGSVIDEO_FIGUREN.kniebeuge.indexOf("frau") === -1 ? "videos/kniebeuge-mann" : "videos/kniebeuge-frau"));
for (const [id, figs] of Object.entries(videos.UEBUNGSVIDEO_FIGUREN)) {
  pruefe("Teilliste nur für Übungen mit Video: " + id, videos.UEBUNGSVIDEOS.indexOf(id) !== -1);
  pruefe("Mann immer dabei: " + id, figs.indexOf("mann") !== -1);
  for (const g of ["m", "w", "d", ""]) {
    const d = videos.videoDatei(id, g);
    pruefe("Fehlende Figur fällt auf den Mann zurück: " + id + " " + g, figs.indexOf(d.split("-").pop()) !== -1);
  }
}

// Jede Übung hat eine Erklärung (sonst öffnet sich das Sheet gar nicht)
const fenster = {};
// dazu die Pakete pro Muskelgruppe (erklaerungen-*.js), sie hängen ihre Einträge an ERKLAERUNGEN an
const pakete = fs.readdirSync(new URL(".", wurzel)).filter((d) => /^erklaerungen-.+\.js$/.test(d)).sort();
const erklaerungen = new Function("window", lesen("erklaerungen.js") + pakete.map((d) => ";\n" + lesen(d)).join("") + "; return ERKLAERUNGEN;")(fenster);
for (const id of videos.UEBUNGSVIDEOS) {
  pruefe("Erklärung für " + id, Boolean(erklaerungen[id]));
  for (const figur of videos.UEBUNGSVIDEO_FIGUREN[id] || ["mann", "frau", "roboter"]) {
    for (const endung of ["mp4", "webm", "webp"]) {
      const datei = "videos/" + id + "-" + figur + "." + endung;
      const da = fs.existsSync(new URL(datei, wurzel));
      pruefe("Datei " + datei, da);
      if (da) {
        pruefe("nicht zu groß: " + datei, fs.statSync(new URL(datei, wurzel)).size < 600 * 1024);
      }
    }
  }
}

// Eingebunden: index.html lädt die Liste vor der app.js, DATEIEN enthält sie, videos/ kommt aus dem Netz
const html = lesen("index.html");
const sw = lesen("sw.js");
pruefe("index.html lädt uebungsvideos.js", html.includes('<script src="uebungsvideos.js"></script>'));
pruefe("uebungsvideos.js vor app.js", html.indexOf("uebungsvideos.js") < html.indexOf('src="app.js'));
pruefe("DATEIEN enthält uebungsvideos.js", sw.includes('"uebungsvideos.js",'));
pruefe("sw.js lässt videos/ durch", sw.includes('adresse.pathname.includes("/videos/")'));

// Versionsnummer an allen zwölf Stellen gleich
const nummern = (html.match(/\?v=(\d+)"/g) || []).map((t) => t.match(/\d+/)[0]);
const swNummer = (sw.match(/const VERSION = (\d+);/) || [])[1];
pruefe("elf Stellen in der index.html", nummern.length === 11, nummern.length);
pruefe("alle gleich wie in der sw.js", nummern.every((n) => n === swNummer), nummern.join(",") + " / " + swNummer);

// Das Video in der app.js: stumm, Schleife, inline, mit Standbild und beiden Formaten
const app = lesen("app.js");
const start = app.indexOf("\n  function uebungsVideo(");
const teil = app.slice(start, app.indexOf("\n  }\n", start));
for (const stueck of ["video.muted = true", "video.loop = true", "playsinline", ".webp", ".mp4", ".webm", "videoDatei(eid, profil.geschlecht)"]) {
  pruefe("uebungsVideo enthält " + stueck, teil.includes(stueck));
}

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler ? 1 : 0);
