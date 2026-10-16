// Test: Seit Version 134 wechselt im Trainingsmodus ein seitlicher Wisch auf der Übungskarte die Übung, wie die Pfeile ‹ ›.
// Nach links die nächste, nach rechts die vorherige. Ab 50 px oder mit einem kurzen schnellen Wisch (30 px, 0,5 px/ms).
// Unter 8 px gilt es als Tipp, senkrecht scrollt die Seite, am Rand (24 px) beginnt nichts, an der ersten und letzten
// Übung folgt die Karte nur zu einem Drittel und es passiert nichts.
// Starten mit: node tests/modus-wischen-test.js
// Die Datei gehört nicht zur App. Die Funktionen wischen und modusWischbarMachen holt sie direkt aus der app.js.

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
const KONSTANTEN = ["WISCH_SPIEL_PX", "WISCH_SCHNELL_WEG_PX", "WISCH_SCHNELL_TEMPO", "WISCH_TEMPO_FENSTER_MS", "WISCH_KLICK_SPERRE_MS", "WISCH_SEITE_PX", "WISCH_RAND_PX"];

// Eine Karte, die sich ihre Ereignisse und ihren Stil merkt
function umgebung(index, anzahl, gesperrt) {
  const karte = { style: {}, hoerer: {}, addEventListener: function (art, f) { this.hoerer[art] = f; } };
  const protokoll = { wechsel: [], verlauf: [] };
  const code = KONSTANTEN.map(konstanteHolen).join("")
    + "let laufendesTraining = { index: " + index + ", uebungen: new Array(" + anzahl + ").fill({}) };"
    + "const window = { innerWidth: 390 };"
    + "function wischenGesperrt() { return " + Boolean(gesperrt) + "; }"
    + "function uebungWechseln(r) { protokoll.wechsel.push(r); laufendesTraining.index += r; }"
    + "const document = { querySelector: function () { return karte; } };"
    + funktionHolen("wischen") + funktionHolen("modusWischbarMachen")
    + "modusWischbarMachen(); return { training: function () { return laufendesTraining; } };";
  const a = new Function("karte", "protokoll", code)(karte, protokoll);
  return { karte, protokoll, a };
}
// Ein Wisch: Startpunkt, Schritte als [dx, dy] und die Zeit je Schritt in ms
function wisch(u, x, y, schritte, ms) {
  let zeit = 1000;
  const p = (dx, dy) => ({ touches: [{ clientX: x + dx, clientY: y + dy }], timeStamp: zeit, cancelable: true, preventDefault: function () { this.verhindert = true; } });
  u.karte.hoerer.touchstart(p(0, 0));
  let verhindert = false;
  for (const s of schritte) {
    zeit += ms;
    const e = p(s[0], s[1]);
    u.karte.hoerer.touchmove(e);
    verhindert = verhindert || Boolean(e.verhindert);
    u.protokoll.verlauf.push(u.karte.style.transform);
  }
  u.karte.hoerer.touchend({ timeStamp: zeit });
  return verhindert;
}
const langsam = n => Array.from({ length: n }, (x, i) => [-(i + 1) * 10, 0]);

let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

{
  const u = umgebung(1, 4);
  const verhindert = wisch(u, 200, 300, langsam(6), 30);
  pruefe("60 px nach links: nächste Übung", u.protokoll.wechsel.join() === "1", u.protokoll.wechsel.join());
  pruefe("Karte folgt dem Finger 1:1", u.protokoll.verlauf[5] === "translateX(-60px)", u.protokoll.verlauf.join());
  pruefe("Seite scrollt dabei nicht seitlich", verhindert);
  pruefe("Karte danach wieder an ihrem Platz", u.karte.style.transform === "" && u.karte.style.transition === "");
}
{
  const u = umgebung(2, 4);
  wisch(u, 200, 300, langsam(6).map(s => [-s[0], 0]), 30);
  pruefe("60 px nach rechts: vorherige Übung", u.protokoll.wechsel.join() === "-1");
}
{
  const u = umgebung(1, 4);
  wisch(u, 200, 300, langsam(4), 40);
  pruefe("40 px langsam: nichts", u.protokoll.wechsel.length === 0);
}
{
  const u = umgebung(1, 4);
  wisch(u, 200, 300, [[-12, 0], [-24, 0], [-36, 0]], 10);
  pruefe("36 px schnell: nächste Übung", u.protokoll.wechsel.join() === "1", u.protokoll.wechsel.join());
}
{
  const u = umgebung(1, 4);
  wisch(u, 200, 300, [[-3, 2], [-5, 3]], 30);
  pruefe("unter 8 px: nichts (Tipp)", u.protokoll.wechsel.length === 0);
}
{
  const u = umgebung(1, 4);
  const verhindert = wisch(u, 200, 300, [[-3, 12], [-6, 40], [-10, 90]], 30);
  pruefe("senkrecht: nichts, die Seite scrollt", u.protokoll.wechsel.length === 0 && !verhindert);
}
{
  const u = umgebung(1, 4);
  wisch(u, 10, 300, langsam(8).map(s => [-s[0], 0]), 30);
  pruefe("vom linken Rand: nichts (Safari)", u.protokoll.wechsel.length === 0);
  const v = umgebung(1, 4);
  wisch(v, 380, 300, langsam(8), 30);
  pruefe("vom rechten Rand: nichts", v.protokoll.wechsel.length === 0);
}
{
  const u = umgebung(0, 4);
  wisch(u, 200, 300, langsam(9).map(s => [-s[0], 0]), 30);
  pruefe("erste Übung nach rechts: nichts", u.protokoll.wechsel.length === 0);
  pruefe("erste Übung: Karte folgt nur zu einem Drittel", u.protokoll.verlauf[8] === "translateX(30px)", u.protokoll.verlauf[8]);
  const v = umgebung(3, 4);
  wisch(v, 200, 300, langsam(9), 30);
  pruefe("letzte Übung nach links: nichts", v.protokoll.wechsel.length === 0);
}
{
  const u = umgebung(1, 4, true);
  wisch(u, 200, 300, langsam(8), 30);
  pruefe("Einführung oder Rückfrage offen: nichts", u.protokoll.wechsel.length === 0);
}
{
  // Abgebrochene Berührung (z. B. Anruf): nichts
  const u = umgebung(1, 4);
  let zeit = 1000;
  const p = dx => ({ touches: [{ clientX: 200 + dx, clientY: 300 }], timeStamp: (zeit += 30), cancelable: true, preventDefault: function () {} });
  u.karte.hoerer.touchstart(p(0));
  for (let i = 1; i <= 8; i++) u.karte.hoerer.touchmove(p(-i * 10));
  u.karte.hoerer.touchcancel({ timeStamp: zeit });
  pruefe("abgebrochen: nichts, Karte zurück", u.protokoll.wechsel.length === 0 && u.karte.style.transform === "");
}
{
  // Erst nach links, zum Schluss schnell zurück nach rechts: Der Weg zählt (80 px links), das Tempo zeigt zurück
  const u = umgebung(1, 4);
  wisch(u, 200, 300, [[-20, 0], [-40, 0], [-60, 0], [-80, 0], [-79, 0], [-60, 0]], 20);
  pruefe("80 px links, dann zurück auf 60 px: zählt als weit", u.protokoll.wechsel.join() === "1", u.protokoll.wechsel.join());
}

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
