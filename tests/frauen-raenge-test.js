// Test: Rang-Tabelle für Frauen (seit Version 172, Forschung AP11, F9)
// Starten mit: node tests/frauen-raenge-test.js

import fs from "node:fs";

const raenge = fs.readFileSync(new URL("../raenge.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}
function funktionHolen(name) {
  const start = quelle.indexOf("\n  function " + name + "(");
  return quelle.slice(start, quelle.indexOf("\n  }\n", start) + 5);
}

const r = new Function(raenge + "; return { kraftRaenge, naechsterSchritt, musterSchwellen, MUSTER_SCHWELLEN };")();
const jetzt = new Date(2026, 9, 21).getTime();
function stand(muster, verhaeltnis, tabelle) {
  const ids = { beine: "kniebeuge", drueckenH: "bankdruecken-lh", huefte: "kreuzheben" };
  const uebungen = [{ id: ids[muster], rang: { muster: muster, faktor: 1, zaehlung: "normal" }, punkte: [{ zeit: jetzt - 86400000, wert: verhaeltnis * 70 }] }];
  return r.kraftRaenge(uebungen, function () { return 70; }, jetzt, tabelle);
}

const mann = stand("beine", 1.5).muster.beine.rp;
const frau = stand("beine", 1.2, "w").muster.beine.rp;
pruefe("T19: Frau 1,2 × KG Kniebeuge = Mann 1,5 × KG", Math.abs(mann - frau) <= 1, mann + " / " + frau);
pruefe("Ohne Tabelle wie bisher (gleiche Schwellen wie \"m\")", stand("beine", 1.5).muster.beine.rp === stand("beine", 1.5, "m").muster.beine.rp);
pruefe("Standard-Schwellen unverändert", r.musterSchwellen("beine", "m") === r.MUSTER_SCHWELLEN.beine);
pruefe("Frauen: Bankdrücken × 0,69", Math.abs(r.musterSchwellen("drueckenH", "w")[3] - 1.00 * 0.69) < 1e-9);
pruefe("Frauen: Kreuzheben × 0,82", Math.abs(r.musterSchwellen("huefte", "w")[2] - 1.40 * 0.82) < 1e-9);
pruefe("Frauen-Tabelle gibt mehr RP bei gleicher Kraft", stand("drueckenH", 0.8, "w").muster.drueckenH.rp > stand("drueckenH", 0.8).muster.drueckenH.rp);
const s = r.naechsterSchritt(stand("beine", 1.2, "w"));
const sm = r.naechsterSchritt(stand("beine", 1.2));
pruefe("Noch X kg rechnet mit derselben Tabelle", s && sm && s.fehltKg !== sm.fehltKg, s && sm ? s.fehltKg + " / " + sm.fehltKg : "");

// rangTabelle in der app.js
const t = new Function("let profil = {};" + funktionHolen("rangTabelle") + "return function (p) { profil = p; return rangTabelle(); };")();
pruefe("Weiblich: Frauen-Tabelle", t({ geschlecht: "w", rangTabelle: "" }) === "w");
pruefe("Männlich: Standard, auch wenn eine alte Wahl Frauen sagt", t({ geschlecht: "m", rangTabelle: "w" }) === "m");
pruefe("Divers mit Wahl Frauen", t({ geschlecht: "d", rangTabelle: "w" }) === "w");
pruefe("Ohne Angabe und ohne Wahl: Standard", t({ geschlecht: "", rangTabelle: "" }) === "m");
pruefe("rangStand übergibt die Tabelle", quelle.indexOf("}, jetzt, rangTabelle());") !== -1);
pruefe("Backup-Import kennt rangTabelle", quelle.indexOf('"aktivitaet", "rangTabelle"]') !== -1);

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
if (fehler > 0) {
  process.exit(1);
}
