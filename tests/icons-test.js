// Test: Jedes Icon, auf das index.html, manifest.json und die Liste DATEIEN in der sw.js zeigen, gibt es wirklich (seit Version 130, Platin-K).
// Bei PNGs mit Größenangabe (sizes im HTML und im Manifest) muss das Bild genau so groß sein, und jedes Icon aus HTML und Manifest
// muss in DATEIEN stehen, sonst fehlt es offline.
// Starten mit: node tests/icons-test.js
// Die Datei gehört nicht zur App.

import fs from "node:fs";

const wurzel = new URL("../", import.meta.url);
const lesen = datei => fs.readFileSync(new URL(datei, wurzel), "utf8").replace(/\r\n/g, "\n");
let fehler = 0;

function pruefe(name, ist, soll) {
  const gleich = JSON.stringify(ist) === JSON.stringify(soll);
  console.log((gleich ? "ok     " : "FEHLER ") + name);
  if (!gleich) {
    console.log("         erwartet: " + JSON.stringify(soll));
    console.log("         bekommen: " + JSON.stringify(ist));
    fehler++;
  }
}

// Breite und Höhe aus dem Kopf eines PNG, null wenn es kein PNG ist
function pngGroesse(datei) {
  const b = fs.readFileSync(new URL(datei, wurzel));
  if (b.length < 24 || b.toString("latin1", 1, 4) !== "PNG" || b.toString("latin1", 12, 16) !== "IHDR") {
    return null;
  }
  return b.readUInt32BE(16) + "x" + b.readUInt32BE(20);
}

// index.html: alle <link> mit rel="icon" oder rel="apple-touch-icon"
const html = lesen("index.html");
const ausHtml = [];
const linkMuster = /<link\b[^>]*>/g;
let treffer;
while ((treffer = linkMuster.exec(html)) !== null) {
  const tag = treffer[0];
  const rel = (tag.match(/\brel="([^"]+)"/) || [])[1];
  if (rel === "icon" || rel === "apple-touch-icon") {
    ausHtml.push({ quelle: "index.html " + rel, pfad: tag.match(/\bhref="([^"]+)"/)[1], groesse: (tag.match(/\bsizes="([^"]+)"/) || [])[1] });
  }
}

// manifest.json: alle Einträge unter icons
const manifest = JSON.parse(lesen("manifest.json"));
const ausManifest = manifest.icons.map(function (icon) {
  return { quelle: "manifest.json" + (icon.purpose ? " " + icon.purpose : ""), pfad: icon.src, groesse: icon.sizes };
});

// sw.js: alle Einträge in DATEIEN, die im Ordner icons/ liegen
const sw = lesen("sw.js");
const liste = sw.slice(sw.indexOf("const DATEIEN = ["), sw.indexOf("\n];", sw.indexOf("const DATEIEN = [")));
const dateien = (liste.match(/"[^"]+"/g) || []).map(s => s.slice(1, -1));
const ausSw = dateien.filter(d => d.startsWith("icons/")).map(function (d) { return { quelle: "sw.js DATEIEN", pfad: d }; });

pruefe("index.html nennt Favicon und apple-touch-icon", ausHtml.length, 2);
pruefe("manifest.json nennt drei Icons", ausManifest.length, 3);
pruefe("DATEIEN nennt vier Icons", ausSw.length, 4);

const alle = ausHtml.concat(ausManifest, ausSw);
for (const icon of alle) {
  const da = fs.existsSync(new URL(icon.pfad, wurzel));
  pruefe(icon.quelle + ": " + icon.pfad + " existiert", da, true);
  if (da && icon.pfad.endsWith(".png")) {
    pruefe(icon.quelle + ": " + icon.pfad + " ist ein PNG" + (icon.groesse ? " mit " + icon.groesse : ""), pngGroesse(icon.pfad) !== null && (!icon.groesse || pngGroesse(icon.pfad) === icon.groesse), true);
  }
}
for (const icon of ausHtml.concat(ausManifest)) {
  pruefe(icon.quelle + ": " + icon.pfad + " steht in DATEIEN (offline)", dateien.includes(icon.pfad), true);
}

// Das apple-touch-icon zeigt iOS auf dem Homescreen: 180 x 180
const touch = ausHtml.find(i => i.quelle === "index.html apple-touch-icon");
pruefe("apple-touch-icon ist 180 x 180", touch && fs.existsSync(new URL(touch.pfad, wurzel)) ? pngGroesse(touch.pfad) : null, "180x180");

console.log(fehler === 0 ? "\nAlle Tests bestanden." : "\n" + fehler + " Test(s) fehlgeschlagen.");
process.exit(fehler === 0 ? 0 : 1);
