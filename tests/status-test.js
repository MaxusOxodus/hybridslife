// Test: Seit Version 141 gibt es den Status Aktiv, Krank oder Urlaub. Krank und Urlaub sind Auszeiten
// (einstellungen.auszeiten: { art, von, bis }). Eine Woche mit Auszeit ohne genug Trainingstage bricht die Serie nicht
// und verbraucht keine Pausenwoche. Trainingsdaten ändern sich nie.
// Starten mit: node tests/status-test.js
// Die Datei gehört nicht zur App. Die Funktionen holt sie aus der app.js und der raenge.js.

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const raenge = fs.readFileSync(new URL("../raenge.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
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
  return treffer[0];
}
const R = new Function(raenge + "; return { serieBerechnen, SERIE_WOCHEN_JE_PAUSE };")();
const TEXTE = new Function(texte + "; return TEXTE;")();
let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

// Wochen ab Montag, 5. Januar 2026
const montag = n => new Date(2026, 0, 5 + n * 7).getTime();
function wochen(tage) {
  const t = {};
  tage.forEach((n, i) => { if (n > 0) t[montag(i)] = n; });
  return t;
}
{
  // 3 gute Wochen, 1 verpasste, 2 gute: ohne Auszeit bricht die Serie (keine Pausenwoche angespart)
  const t = wochen([3, 3, 3, 0, 3, 3]);
  const ohne = R.serieBerechnen(t, montag(6), 3);
  pruefe("Ohne Auszeit: Serie bricht", ohne.serie === 2, ohne.serie);
  const mit = R.serieBerechnen(t, montag(6), 3, { [montag(3)]: true });
  pruefe("Mit Auszeit: Serie läuft weiter (5)", mit.serie === 5, mit.serie);
  pruefe("Mit Auszeit: längste Serie 5", mit.laengste === 5, mit.laengste);
  pruefe("Ohne 4. Parameter wie bisher", R.serieBerechnen(t, montag(6), 3, undefined).serie === 2);
}
{
  // Pausenwoche: nach 8 Wochen eine angespart. Eine Auszeit-Woche verbraucht sie nicht.
  const t = wochen([3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3]);
  const mit = R.serieBerechnen(t, montag(11), 3, { [montag(8)]: true });
  pruefe("Auszeit verbraucht keine Pausenwoche, die zweite verpasste Woche nimmt sie", mit.serie === 9 && mit.pausen === 0, mit.serie + "/" + mit.pausen);
  const ohne = R.serieBerechnen(t, montag(11), 3);
  pruefe("Ohne Auszeit: zwei verpasste Wochen brechen die Serie", ohne.serie === 1, ohne.serie);
}
{
  // Training in einer Auszeit-Woche zählt normal
  const t = wochen([3, 3, 3]);
  pruefe("Training in Auszeit zählt", R.serieBerechnen(t, montag(3), 3, { [montag(1)]: true }).serie === 3);
}
{
  // Auszeiten lesen und Montage bestimmen
  const code = konstanteHolen("AUSZEIT_ARTEN") + funktionHolen("montagDerWoche") + funktionHolen("auszeiten") + funktionHolen("auszeitAktuell") + funktionHolen("auszeitMontage")
    + "return { auszeiten, auszeitAktuell, auszeitMontage };";
  const mach = e => new Function("einstellungen", code)(e);
  pruefe("Ohne Eintrag: keine Auszeit", mach({}).auszeitAktuell() === null);
  pruefe("Kaputte Einträge zählen nicht", mach({ auszeiten: [{ art: "x", von: 1, bis: null }, null, { art: "krank", von: "a", bis: null }] }).auszeiten().length === 0);
  const von = new Date(2026, 0, 7, 12).getTime(); // Mittwoch der 1. Woche
  const bis = new Date(2026, 0, 20, 9).getTime(); // Dienstag der 3. Woche
  const a = mach({ auszeiten: [{ art: "urlaub", von, bis }] });
  const m = Object.keys(a.auszeitMontage()).map(Number).sort();
  pruefe("Urlaub über 3 Wochen: 3 Montage", m.length === 3 && m[0] === montag(0) && m[2] === montag(2), m.join(","));
  pruefe("Beendete Auszeit läuft nicht", a.auszeitAktuell() === null);
  const l = mach({ auszeiten: [{ art: "urlaub", von, bis }, { art: "krank", von: bis + 1000, bis: null }] });
  pruefe("Laufende Auszeit: krank", l.auszeitAktuell().art === "krank");
}
{
  // statusSetzen: speichert nur die Einstellungen
  const f = funktionHolen("statusSetzen");
  pruefe("statusSetzen ändert keine Trainingsdaten", !/eintraege|trainings\b|routinen|wochenplan/.test(f));
  pruefe("Serie rechnet mit Auszeiten", quelle.indexOf("SERIE_TAGE_PRO_WOCHE, auszeitMontage())") !== -1);
  for (const k of ["status.titel", "status.text", "status.aktiv", "status.krank", "status.urlaub", "status.wiederAktiv", "home.status.krank", "home.status.urlaub"]) {
    pruefe("Text " + k, TEXTE[k] && TEXTE[k].de && TEXTE[k].en);
  }
}

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
