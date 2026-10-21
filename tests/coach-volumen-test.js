// Test: Plan mit Korund nach Wochenvolumen (seit Version 171, Forschung AP12)
// Starten mit: node tests/coach-volumen-test.js

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
function funktionHolen(name) {
  const start = quelle.indexOf("\n  function " + name + "(");
  if (start === -1) {
    throw new Error("Funktion " + name + " nicht gefunden");
  }
  return quelle.slice(start, quelle.indexOf("\n  }\n", start) + 5);
}
function konstanteHolen(name) {
  return new RegExp("\\n  const " + name + " = [\\s\\S]*?;\\n").exec(quelle)[0];
}
let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

// Kleine Welt: Muskeln mit Gruppe, Übungen mit Haupt- und Hilfsmuskeln
const welt = "const MUSKELN = { brust: { gruppe: 'brust' }, trizeps: { gruppe: 'trizeps' }, lat: { gruppe: 'lat' }, bizeps: { gruppe: 'bizeps' }, quad: { gruppe: 'quad' } };"
  + "const GRUPPE_NACH_ID = { brust: 1, trizeps: 1, lat: 1, bizeps: 1, quad: 1 };"
  + "const UEBUNG_NACH_ID = { bank: { haupt: 'brust', hilfs: ['trizeps'] }, drueck: { haupt: 'trizeps' }, zug: { haupt: 'lat', hilfs: ['bizeps'] },"
  + " curl: { haupt: 'bizeps' }, beuge: { haupt: 'quad' } };"
  + "function pauseStandard() { return 90; } function uebungGruppe(u) { return u.haupt; } function erholungPartie(g) { return g === 'brust' ? 'brust' : 'andere'; }";
const f = new Function(welt
  + ["HILFS_ANTEIL", "SAETZE_ZIEL", "SAETZE_ZIEL_EINSTEIGER", "COACH_MAX_SAETZE", "COACH_MAX_ANFAENGER", "COACH_MIN_SAETZE", "COACH_ZEIT_DRUEBER",
    "COACH_AUSGLEICH_RUNDEN", "COACH_SATZ_SEKUNDEN"].map(konstanteHolen).join("")
  + ["muskelGruppeVon", "gruppenAnteile", "coachDauer", "coachWochenSaetze", "coachSaetzeZiel", "coachSlotSchwerpunkt", "coachVolumenAbstand",
    "coachVolumenAnpassen"].map(funktionHolen).join("")
  + "return { gruppenAnteile, coachWochenSaetze, coachVolumenAnpassen, coachDauer, UEBUNG_NACH_ID };")();

function slot(id, saetze) {
  return { uebungId: id, saetze: saetze, pause: null };
}
function kopie(tage) {
  return JSON.parse(JSON.stringify(tage));
}
function abstand(x, ziel) {
  return Math.max(0, ziel.von - x) + Math.max(0, x - ziel.bis);
}

pruefe("Hilfsmuskel zählt halb", JSON.stringify(f.gruppenAnteile(f.UEBUNG_NACH_ID.bank, "brust")) === '{"brust":1,"trizeps":0.5}');
const w = f.coachWochenSaetze([{ slots: [slot("bank", 3), slot("drueck", 2)] }, { slots: [slot("bank", 3)] }]);
pruefe("Wochensätze: Brust 6, Trizeps 2 + 3 = 5", w.werte.brust === 6 && w.werte.trizeps === 5 && w.haupt.join() === "brust,trizeps", JSON.stringify(w));

// Brust deutlich zu viel, Latissimus zu wenig, am selben Tag: Sätze wandern, die Zeit bleibt
const a = { ziel: "muskel", minuten: 60, erfahrung: "fortgeschritten", schwerpunkt: [] };
const tage = [1, 2, 3, 4].map(function () { return { slots: [slot("bank", 5), slot("zug", 2), slot("beuge", 3)] }; });
const dauerVorher = tage.map(function (t) { return f.coachDauer(t.slots); });
const vorher = f.coachWochenSaetze(kopie(tage)).werte;
const schritte = f.coachVolumenAnpassen(tage, a);
const nachher = f.coachWochenSaetze(tage).werte;
pruefe("Ausgleich macht Schritte", schritte > 0);
pruefe("Brust von 20 ins Ziel oder darunter nicht weiter weg", abstand(nachher.brust, { von: 10, bis: 20 }) <= abstand(vorher.brust, { von: 10, bis: 20 }));
pruefe("Latissimus näher ans Ziel", nachher.lat > vorher.lat, vorher.lat + " → " + nachher.lat);
pruefe("Kein Tag länger als erlaubt", tage.every(function (t, i) { return f.coachDauer(t.slots) <= Math.max(65, dauerVorher[i]); }));
pruefe("Kein Muskel weiter vom Ziel weg", ["brust", "lat", "quad"].every(function (g) { return abstand(nachher[g], { von: 10, bis: 20 }) <= abstand(vorher[g], { von: 10, bis: 20 }) + 1e-9; }));
pruefe("Kein Platz unter 2 Sätzen", tage.every(function (t) { return t.slots.every(function (s) { return s.saetze >= 2; }); }));

// Kraft: nie mehr Sätze als vorher
const kraft = [{ slots: [slot("bank", 3), slot("zug", 2)] }];
const summeVorher = 5;
f.coachVolumenAnpassen(kraft, { ziel: "kraft", minuten: 90, erfahrung: "fortgeschritten", schwerpunkt: [] });
pruefe("Kraft: kein Satz kommt dazu", kraft[0].slots[0].saetze + kraft[0].slots[1].saetze <= summeVorher);

// Schwerpunkt Brust: gibt nichts ab, auch wenn es viel ist
const schwer = [1, 2, 3, 4, 5].map(function () { return { slots: [slot("bank", 5), slot("zug", 3)] }; });
f.coachVolumenAnpassen(schwer, { ziel: "muskel", minuten: 60, erfahrung: "fortgeschritten", schwerpunkt: ["brust"] });
pruefe("Schwerpunkt bleibt unangetastet", schwer.every(function (t) { return t.slots[0].saetze === 5; }));

// Anfänger: Obergrenze 10
const anf = [1, 2, 3].map(function () { return { slots: [slot("bank", 4), slot("zug", 3)] }; });
f.coachVolumenAnpassen(anf, { ziel: "muskel", minuten: 60, erfahrung: "anfaenger", schwerpunkt: [] });
const wa = f.coachWochenSaetze(anf).werte;
pruefe("Anfänger: Brust höchstens 10", wa.brust <= 10, wa.brust);

pruefe("Ergebnisseite zeigt die Sätze", quelle.indexOf("coachSaetzeAnzeigen(inhalt, plan, a);") !== -1);
pruefe("Statistik nutzt dieselbe Rechnung", /const anteile = gruppenAnteile\(u, haupt\);/.test(quelle));

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
if (fehler > 0) {
  process.exit(1);
}
