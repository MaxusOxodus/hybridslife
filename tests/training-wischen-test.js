// Test: Seit Version 136 wechselt im Training-Tab ein seitlicher Wisch in der Übersicht den Reiter wie ein Tipp auf
// den Umschalter "Pläne | Übungen": nach links zu "Übungen", nach rechts zu "Pläne". Steht in "Übungen" der
// Zurück-Pfeil (Muskelgruppe, Suche), geht der Wisch nach rechts zurück wie der Pfeil ←.
// Regeln wie in Version 134: ab 50 px oder kurz und schnell (30 px, 0,5 px/ms), unter 8 px ein Tipp, senkrecht
// scrollt die Seite, 24 px am Rand beginnt nichts. Nichts im Suchfeld, bei offener Tastatur, über einem offenen Sheet,
// in der Einführung, in einer anderen Ansicht als der Übersicht.
// Starten mit: node tests/training-wischen-test.js
// Die Datei gehört nicht zur App. Die Funktionen wischen und trainingWischbarMachen holt sie direkt aus der app.js.

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
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
const KONSTANTEN = ["WISCH_SPIEL_PX", "WISCH_SCHNELL_WEG_PX", "WISCH_SCHNELL_TEMPO", "WISCH_TEMPO_FENSTER_MS",
  "WISCH_KLICK_SPERRE_MS", "WISCH_SEITE_PX", "WISCH_RAND_PX", "TRAINING_REITER"];

if (quelle.indexOf("\ntrainingWischbarMachen();\n") === -1) {
  throw new Error("trainingWischbarMachen() wird beim Start nicht aufgerufen");
}

// Die Übersicht mit Umschalter und Zurück-Pfeil. Ein Tipp auf einen Knopf landet im Protokoll.
// stand: reiter ("plaene" oder "uebungen"), zurueck (Pfeil zu sehen), ansicht, sheet, gesperrt, fokus (Feld mit Tastatur)
function umgebung(stand) {
  const protokoll = [];
  const flaeche = { hoerer: {}, addEventListener: function (art, f) { this.hoerer[art] = f; } };
  const knopfBauen = function (name) {
    return { click: function () { protokoll.push(name); }, classList: { contains: function () { return !stand.zurueck; } } };
  };
  const reiter = { children: [knopfBauen("plaene"), knopfBauen("uebungen")] };
  const zurueck = knopfBauen("zurueck");
  const elemente = { "ansicht-uebersicht": flaeche, "training-reiter": reiter, "bib-zurueck": zurueck };
  const document = {
    getElementById: function (id) { return elemente[id]; },
    body: { classList: { contains: function (k) { return k === "sheet-offen" && Boolean(stand.sheet); } } },
    activeElement: { matches: function () { return Boolean(stand.fokus); } }
  };
  const code = KONSTANTEN.map(konstanteHolen).join("")
    + "let trainingReiter = stand.reiter || 'plaene';"
    + "let trainingAnsicht = stand.ansicht || 'uebersicht';"
    + "const window = { innerWidth: 390 };"
    + "function wischenGesperrt() { return Boolean(stand.gesperrt); }"
    + funktionHolen("wischen") + funktionHolen("trainingWischbarMachen")
    + "trainingWischbarMachen();";
  new Function("stand", "document", code)(stand, document);
  return { flaeche, protokoll };
}
// Ein Wisch: Startpunkt, Schritte als [dx, dy] und die Zeit je Schritt in ms. ziel ist das Element unter dem Finger.
function wisch(u, x, y, schritte, ms, ziel) {
  let zeit = 1000;
  const target = ziel || { closest: function () { return null; } };
  const p = (dx, dy) => ({ touches: [{ clientX: x + dx, clientY: y + dy }], target, timeStamp: zeit, cancelable: true, preventDefault: function () { this.verhindert = true; } });
  u.flaeche.hoerer.touchstart(p(0, 0));
  let verhindert = false;
  for (const s of schritte) {
    zeit += ms;
    const e = p(s[0], s[1]);
    u.flaeche.hoerer.touchmove(e);
    verhindert = verhindert || Boolean(e.verhindert);
  }
  u.flaeche.hoerer.touchend({ timeStamp: zeit });
  return verhindert;
}
const links = n => Array.from({ length: n }, (x, i) => [-(i + 1) * 10, 0]);
const rechts = n => links(n).map(s => [-s[0], 0]);

let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

{
  const u = umgebung({ reiter: "plaene" });
  const verhindert = wisch(u, 200, 300, links(6), 30);
  pruefe("Pläne, 60 px nach links: Tipp auf Übungen", u.protokoll.join() === "uebungen", u.protokoll.join());
  pruefe("Seite scrollt dabei nicht", verhindert);
}
{
  const u = umgebung({ reiter: "plaene" });
  const verhindert = wisch(u, 200, 300, rechts(6), 30);
  pruefe("Pläne, nach rechts: nichts", u.protokoll.length === 0, u.protokoll.join());
  pruefe("Pläne, nach rechts: der Browser behält den Finger", !verhindert);
}
{
  const u = umgebung({ reiter: "uebungen" });
  wisch(u, 200, 300, rechts(6), 30);
  pruefe("Übungen (Muskelgruppen), nach rechts: Tipp auf Pläne", u.protokoll.join() === "plaene", u.protokoll.join());
}
{
  const u = umgebung({ reiter: "uebungen" });
  wisch(u, 200, 300, links(6), 30);
  pruefe("Übungen, nach links: nichts", u.protokoll.length === 0, u.protokoll.join());
}
{
  const u = umgebung({ reiter: "uebungen", zurueck: true });
  wisch(u, 200, 300, rechts(6), 30);
  pruefe("Muskelgruppe oder Suche, nach rechts: Tipp auf ←", u.protokoll.join() === "zurueck", u.protokoll.join());
  const v = umgebung({ reiter: "uebungen", zurueck: true });
  wisch(v, 200, 300, links(6), 30);
  pruefe("Muskelgruppe, nach links: nichts", v.protokoll.length === 0, v.protokoll.join());
}
{
  const u = umgebung({ reiter: "plaene" });
  wisch(u, 200, 300, links(4), 40);
  pruefe("40 px langsam: nichts", u.protokoll.length === 0);
  const v = umgebung({ reiter: "plaene" });
  wisch(v, 200, 300, [[-12, 0], [-24, 0], [-36, 0]], 10);
  pruefe("36 px schnell: Übungen", v.protokoll.join() === "uebungen", v.protokoll.join());
}
{
  const u = umgebung({ reiter: "plaene" });
  wisch(u, 200, 300, [[-3, 2], [-5, 3]], 30);
  pruefe("unter 8 px: nichts (Tipp)", u.protokoll.length === 0);
  const v = umgebung({ reiter: "plaene" });
  const verhindert = wisch(v, 200, 300, [[-3, 12], [-6, 40], [-30, 120]], 30);
  pruefe("senkrecht: nichts, die Seite scrollt", v.protokoll.length === 0 && !verhindert);
}
{
  const u = umgebung({ reiter: "plaene" });
  wisch(u, 380, 300, links(8), 30);
  pruefe("vom rechten Rand: nichts", u.protokoll.length === 0);
  const v = umgebung({ reiter: "uebungen" });
  wisch(v, 10, 300, rechts(8), 30);
  pruefe("vom linken Rand: nichts (Safari)", v.protokoll.length === 0);
}
{
  const feld = { closest: function (s) { return s.indexOf("input") !== -1 ? this : null; } };
  const u = umgebung({ reiter: "uebungen", zurueck: true });
  wisch(u, 200, 100, rechts(8), 30, feld);
  pruefe("im Suchfeld: nichts", u.protokoll.length === 0);
  const v = umgebung({ reiter: "uebungen", zurueck: true, fokus: true });
  wisch(v, 200, 300, rechts(8), 30);
  pruefe("bei offener Tastatur: nichts", v.protokoll.length === 0);
}
{
  const u = umgebung({ reiter: "plaene", sheet: true });
  wisch(u, 200, 300, links(8), 30);
  pruefe("Sheet offen: nichts", u.protokoll.length === 0);
  const v = umgebung({ reiter: "plaene", gesperrt: true });
  wisch(v, 200, 300, links(8), 30);
  pruefe("Einführung oder Rückfrage offen: nichts", v.protokoll.length === 0);
  const w = umgebung({ reiter: "plaene", ansicht: "bearbeiten" });
  wisch(w, 200, 300, links(8), 30);
  pruefe("andere Ansicht (Editor): nichts", w.protokoll.length === 0);
}
{
  // Abgebrochene Berührung (z. B. Anruf): nichts
  const u = umgebung({ reiter: "plaene" });
  let zeit = 1000;
  const target = { closest: function () { return null; } };
  const p = dx => ({ touches: [{ clientX: 200 + dx, clientY: 300 }], target, timeStamp: (zeit += 30), cancelable: true, preventDefault: function () {} });
  u.flaeche.hoerer.touchstart(p(0));
  for (let i = 1; i <= 8; i++) u.flaeche.hoerer.touchmove(p(-i * 10));
  u.flaeche.hoerer.touchcancel({ timeStamp: zeit });
  pruefe("abgebrochen: nichts", u.protokoll.length === 0);
}
{
  // Nach einem Wisch zählt der Klick des Browsers nicht als Tipp, ein Klick der App selbst schon
  const u = umgebung({ reiter: "plaene" });
  wisch(u, 200, 300, links(6), 30);
  const klick = { isTrusted: true, stopPropagation: function () { this.gestoppt = true; }, preventDefault: function () {} };
  u.flaeche.hoerer.click(klick);
  pruefe("Klick des Browsers nach dem Wisch wird geschluckt", klick.gestoppt === true);
  const eigen = { isTrusted: false, stopPropagation: function () { this.gestoppt = true; }, preventDefault: function () {} };
  u.flaeche.hoerer.click(eigen);
  pruefe("Klick der App (der Tipp auf den Knopf) geht durch", !eigen.gestoppt);
}

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
