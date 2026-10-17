// Test: Seit Version 140 wechselt ein seitlicher Wisch auf der Tab-Leiste unten den Tab wie ein Tipp:
// nach links zum Tab rechts daneben (Home → Training → Fortschritt → Profil), nach rechts zum Tab links daneben.
// Am Ende der Reihe passiert nichts. Ab 50 px zeigt der Ziel-Tab schon den hellen Kreis (Klasse wisch-ziel).
// Regeln wie in Version 134: ab 50 px oder kurz und schnell (30 px, 0,5 px/ms), unter 8 px ein Tipp, senkrecht
// bleibt alles wie bisher, 24 px am Rand beginnt nichts. Nichts neben den Knöpfen (Streifen am Home-Strich),
// in der Trainingsansicht, über einem offenen Sheet, bei offener Tastatur, in der Einführung und bei Rückfragen.
// Starten mit: node tests/nav-wischen-test.js
// Die Datei gehört nicht zur App. Die Funktionen wischen und navWischbarMachen holt sie direkt aus der app.js.

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
  "WISCH_KLICK_SPERRE_MS", "WISCH_SEITE_PX", "WISCH_RAND_PX"];

if (quelle.indexOf("\nnavWischbarMachen();\n") === -1) {
  throw new Error("navWischbarMachen() wird beim Start nicht aufgerufen");
}

// Die Leiste mit ihren Knöpfen. Ein Tipp auf einen Knopf landet im Protokoll.
// stand: seite (aktiver Tab), ansicht (des Training-Tabs), gym (Gym-Tab sichtbar), sheet, gesperrt, fokus (Tastatur)
function umgebung(stand) {
  const protokoll = [];
  const NAMEN = ["home", "training", "fortschritt", "gym", "profil"];
  const knoepfe = NAMEN.map(function (name) {
    const klassen = new Set(name === "gym" && !stand.gym ? ["versteckt"] : []);
    return {
      name,
      click: function () { protokoll.push(name); },
      classList: {
        contains: function (k) { return klassen.has(k); },
        toggle: function (k, an) { if (an) { klassen.add(k); } else { klassen.delete(k); } }
      }
    };
  });
  const leiste = {
    hoerer: {},
    addEventListener: function (art, f) { this.hoerer[art] = f; },
    querySelectorAll: function () { return knoepfe; }
  };
  const elemente = { navigation: leiste };
  knoepfe.forEach(function (k) { elemente["nav-" + k.name] = k; });
  const document = {
    getElementById: function (id) { return elemente[id]; },
    body: { classList: { contains: function (k) { return k === "sheet-offen" && Boolean(stand.sheet); } } },
    activeElement: { matches: function () { return Boolean(stand.fokus); } }
  };
  const code = KONSTANTEN.map(konstanteHolen).join("")
    + "let aktiveSeite = stand.seite || 'home';"
    + "let trainingAnsicht = stand.ansicht || 'uebersicht';"
    + "const window = { innerWidth: 390 };"
    + "function wischenGesperrt() { return Boolean(stand.gesperrt); }"
    + funktionHolen("wischen") + funktionHolen("navWischbarMachen")
    + "navWischbarMachen();";
  new Function("stand", "document", code)(stand, document);
  const vorschau = function () {
    return knoepfe.filter(function (k) { return k.classList.contains("wisch-ziel"); }).map(function (k) { return k.name; }).join();
  };
  return { leiste, protokoll, vorschau };
}
// Ein Finger auf einem Tab-Knopf (oder daneben: knopf false). Die Knöpfe enden bei y = 820, darunter liegt der Streifen am Home-Strich.
function ziel(knopf) {
  return {
    closest: function (s) { return knopf !== false && s === ".nav-btn" ? this : null; },
    getBoundingClientRect: function () { return { top: 764, bottom: 820 }; }
  };
}
// Ein Wisch: Startpunkt, Schritte als [dx, dy] und die Zeit je Schritt in ms. beimSchritt sieht den Stand nach jedem Schritt.
function wisch(u, x, y, schritte, ms, optionen) {
  const o = optionen || {};
  let zeit = 1000;
  const target = ziel(o.knopf);
  const p = (dx, dy) => ({ touches: [{ clientX: x + dx, clientY: y + dy }], target, timeStamp: zeit, cancelable: true, preventDefault: function () { this.verhindert = true; } });
  u.leiste.hoerer.touchstart(p(0, 0));
  let verhindert = false;
  for (const s of schritte) {
    zeit += ms;
    const e = p(s[0], s[1]);
    u.leiste.hoerer.touchmove(e);
    verhindert = verhindert || Boolean(e.verhindert);
    if (o.beimSchritt) {
      o.beimSchritt(s);
    }
  }
  if (o.abbrechen) {
    u.leiste.hoerer.touchcancel({ timeStamp: zeit });
  } else {
    u.leiste.hoerer.touchend({ timeStamp: zeit });
  }
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

// Nach links: der Tab rechts daneben, nach rechts: der Tab links daneben, ohne den ausgeblendeten Gym-Tab
const NACH_LINKS = { home: "training", training: "fortschritt", fortschritt: "profil", profil: "" };
const NACH_RECHTS = { home: "", training: "home", fortschritt: "training", profil: "fortschritt" };
for (const seite of Object.keys(NACH_LINKS)) {
  const u = umgebung({ seite });
  const verhindert = wisch(u, 200, 800, links(6), 30);
  pruefe(seite + ", 60 px nach links: " + (NACH_LINKS[seite] || "nichts"), u.protokoll.join() === NACH_LINKS[seite], u.protokoll.join());
  pruefe(seite + ", nach links: Browser bekommt den Finger nur am Ende der Reihe", verhindert === Boolean(NACH_LINKS[seite]));
  const v = umgebung({ seite });
  wisch(v, 200, 800, rechts(6), 30);
  pruefe(seite + ", 60 px nach rechts: " + (NACH_RECHTS[seite] || "nichts"), v.protokoll.join() === NACH_RECHTS[seite], v.protokoll.join());
}
{
  const u = umgebung({ seite: "fortschritt", gym: true });
  wisch(u, 200, 800, links(6), 30);
  pruefe("Gym-Tab sichtbar: Fortschritt nach links führt zu Gym", u.protokoll.join() === "gym", u.protokoll.join());
  const v = umgebung({ seite: "profil", gym: true });
  wisch(v, 200, 800, rechts(6), 30);
  pruefe("Gym-Tab sichtbar: Profil nach rechts führt zu Gym", v.protokoll.join() === "gym", v.protokoll.join());
}
{
  // Vorschau: ab 50 px der helle Kreis am Ziel-Tab, zurückziehen nimmt ihn weg, nach dem Loslassen ist er weg
  const u = umgebung({ seite: "home" });
  const stand = {};
  wisch(u, 200, 800, [[-20, 0], [-40, 0], [-60, 0], [-70, 0], [-40, 0], [-60, 0]], 30, {
    beimSchritt: function (s) { stand[s[0] + "/" + Object.keys(stand).length] = u.vorschau(); }
  });
  const werte = Object.values(stand);
  pruefe("Vorschau bei 20 und 40 px: keine", werte[0] === "" && werte[1] === "", werte.join("|"));
  pruefe("Vorschau ab 60 px: Training", werte[2] === "training" && werte[3] === "training", werte.join("|"));
  pruefe("Vorschau zurück auf 40 px: weg", werte[4] === "", werte.join("|"));
  pruefe("Vorschau wieder 60 px: Training", werte[5] === "training", werte.join("|"));
  pruefe("nach dem Loslassen: keine Vorschau", u.vorschau() === "", u.vorschau());
  pruefe("und der Tab wechselt", u.protokoll.join() === "training", u.protokoll.join());
  const v = umgebung({ seite: "profil" });
  wisch(v, 200, 800, links(8), 30, { beimSchritt: function () { pruefe("Profil nach links: nie eine Vorschau", v.vorschau() === ""); } });
  const w = umgebung({ seite: "home" });
  wisch(w, 200, 800, links(8), 30, { abbrechen: true });
  pruefe("abgebrochen: keine Vorschau, kein Wechsel", w.vorschau() === "" && w.protokoll.length === 0, w.protokoll.join());
}
{
  const u = umgebung({ seite: "home" });
  wisch(u, 200, 800, links(4), 40);
  pruefe("40 px langsam: nichts", u.protokoll.length === 0);
  const v = umgebung({ seite: "home" });
  wisch(v, 200, 800, [[-12, 0], [-24, 0], [-36, 0]], 10);
  pruefe("36 px schnell: Training", v.protokoll.join() === "training", v.protokoll.join());
  const w = umgebung({ seite: "training" });
  wisch(w, 200, 800, [[-30, 0], [-60, 0], [-60, 0], [-50, 0], [-40, 0]], 40);
  pruefe("60 px, dann zurück auf 40 px: nichts", w.protokoll.length === 0, w.protokoll.join());
}
{
  const u = umgebung({ seite: "home" });
  wisch(u, 200, 800, [[-3, 2], [-5, 3]], 30);
  pruefe("unter 8 px: nichts (Tipp)", u.protokoll.length === 0);
  const v = umgebung({ seite: "home" });
  const verhindert = wisch(v, 200, 800, [[-3, -12], [-6, -40], [-30, -120]], 30);
  pruefe("senkrecht: nichts, der Browser behält den Finger", v.protokoll.length === 0 && !verhindert);
}
{
  const u = umgebung({ seite: "home" });
  wisch(u, 380, 800, links(8), 30);
  pruefe("vom rechten Rand: nichts", u.protokoll.length === 0);
  const v = umgebung({ seite: "profil" });
  wisch(v, 10, 800, rechts(8), 30);
  pruefe("vom linken Rand: nichts (Safari)", v.protokoll.length === 0);
  const w = umgebung({ seite: "home" });
  wisch(w, 30, 800, links(8), 30);
  pruefe("knapp innerhalb des Rands (30 px): Training", w.protokoll.join() === "training", w.protokoll.join());
}
{
  const u = umgebung({ seite: "home" });
  wisch(u, 200, 830, links(8), 30, { knopf: false });
  pruefe("neben den Knöpfen (Streifen am Home-Strich): nichts", u.protokoll.length === 0);
  const v = umgebung({ seite: "home" });
  wisch(v, 200, 826, links(8), 30);
  pruefe("unter dem Knopf, der Browser schreibt den Finger dem Knopf zu: nichts", v.protokoll.length === 0);
  const w = umgebung({ seite: "home" });
  wisch(w, 200, 818, links(8), 30);
  pruefe("knapp über der Unterkante des Knopfs: Training", w.protokoll.join() === "training", w.protokoll.join());
}
{
  const u = umgebung({ seite: "training", ansicht: "modus" });
  wisch(u, 200, 800, links(8), 30);
  pruefe("Trainingsansicht: nichts", u.protokoll.length === 0);
  const v = umgebung({ seite: "training", ansicht: "uebersicht" });
  wisch(v, 200, 800, links(8), 30);
  pruefe("Übersicht im Training-Tab: Fortschritt", v.protokoll.join() === "fortschritt", v.protokoll.join());
  const w = umgebung({ seite: "home", ansicht: "modus" });
  wisch(w, 200, 800, links(8), 30);
  pruefe("Home bei laufendem Training (Ansicht Modus im Hintergrund): Training", w.protokoll.join() === "training", w.protokoll.join());
}
{
  const u = umgebung({ seite: "home", sheet: true });
  wisch(u, 200, 800, links(8), 30);
  pruefe("Sheet offen: nichts", u.protokoll.length === 0);
  const v = umgebung({ seite: "home", gesperrt: true });
  wisch(v, 200, 800, links(8), 30);
  pruefe("Einführung oder Rückfrage offen: nichts", v.protokoll.length === 0);
  const w = umgebung({ seite: "home", fokus: true });
  wisch(w, 200, 800, links(8), 30);
  pruefe("Tastatur offen: nichts", w.protokoll.length === 0);
}
{
  // Nach einem Wisch zählt der Klick des Browsers nicht als Tipp, ein Klick der App selbst schon
  const u = umgebung({ seite: "home" });
  wisch(u, 200, 800, links(6), 30);
  const klick = { isTrusted: true, stopPropagation: function () { this.gestoppt = true; }, preventDefault: function () {} };
  u.leiste.hoerer.click(klick);
  pruefe("Klick des Browsers nach dem Wisch wird geschluckt", klick.gestoppt === true);
  const eigen = { isTrusted: false, stopPropagation: function () { this.gestoppt = true; }, preventDefault: function () {} };
  u.leiste.hoerer.click(eigen);
  pruefe("Klick der App (der Tipp auf den Tab) geht durch", !eigen.gestoppt);
}

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
