// Test: Seit Version 137 zeigt Home die Zahlen der gewählten Woche als Ringe, gemessen an WOCHEN_ZIELE
// (5 Workouts, 15.000 kg, 320 Wiederholungen). In lbs Wert und Ziel in lbs, das Ziel auf volle 1.000 gerundet (33.000 lbs).
// Fortschritt bei 100 % gekappt, dann "Ziel erreicht" statt "von …". Zahlen wie die App (Deutsch 4.435, Englisch 4,435).
// Das Profil zeigt die Woche weiter mit wochenZahlenFeld. Seit Version 138 rechnet das wochenRingDaten,
// den Aufbau und den Tausch prüft tests/wochen-tausch-test.js.
// Starten mit: node tests/wochen-ringe-test.js
// Die Datei gehört nicht zur App. Die Funktionen holt sie direkt aus der app.js, die Texte aus der texte.js.

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
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
  if (!treffer) {
    throw new Error("Konstante " + name + " nicht in der app.js gefunden");
  }
  return treffer[0];
}

const TEXTE = new Function(texte + "; return TEXTE;")();
function bauen(sprache, einheitWahl) {
  const code = konstanteHolen("WOCHEN_ZIELE") + konstanteHolen("LBS_JE_KG")
    + "function einheit() { return einheitWahl; }"
    + "function ausKg(kg) { return einheit() === 'lbs' ? kg * LBS_JE_KG : kg; }"
    + "function gebiet() { return sprache === 'de' ? 'de-DE' : 'en-US'; }"
    + "function txt(s, w) { let t = TEXTE[s][sprache]; for (const k in (w || {})) t = t.replace('{' + k + '}', w[k]); return t; }"
    + funktionHolen("ringSvg") + funktionHolen("wochenRingDaten")
    + "return { ringSvg: ringSvg, wochenRingDaten: wochenRingDaten, WOCHEN_ZIELE: WOCHEN_ZIELE };";
  return new Function("TEXTE", "sprache", "einheitWahl", code)(TEXTE, sprache, einheitWahl);
}
// Wie weit ein Ring gefüllt ist (0 bis 1), aus stroke-dasharray und stroke-dashoffset. Ohne Fortschritt: 0.
function anteil(svg) {
  const m = /stroke-dasharray: ([\d.]+)px; stroke-dashoffset: ([\d.e-]+)px; --ring-leer: ([\d.]+)px/.exec(svg);
  return m ? Math.round((1 - Number(m[2]) / Number(m[1])) * 1000) / 1000 : 0;
}

let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

{
  const a = bauen("de", "kg");
  pruefe("Ziele an einer Stelle: 5, 15000, 320", JSON.stringify(a.WOCHEN_ZIELE) === '{"workouts":5,"volumen":15000,"wdh":320}');
  pruefe("WOCHEN_ZIELE steht genau einmal in der app.js", quelle.split("const WOCHEN_ZIELE").length === 2);
  const d = a.wochenRingDaten({ workouts: 1, wdh: 92, volumen: 4435 });
  pruefe("Volumen 4.435", d.volumen.wertText === "4.435", d.volumen.wertText);
  pruefe("Einheit kg", d.volumen.einheit === "kg");
  pruefe("Workouts 1 von 5", d.workouts.wertText === "1" && d.workouts.von === "von 5");
  pruefe("Wiederholungen 92 von 320", d.wdh.wertText === "92" && d.wdh.von === "von 320");
  pruefe("Volumen von 15.000", d.volumen.von === "von 15.000", d.volumen.von);
  const svg = a.ringSvg(4435 / 15000, "volumen");
  pruefe("Ring zu 4435/15000 gefüllt", anteil(svg) === Math.round(4435 / 15000 * 1000) / 1000, anteil(svg));
  pruefe("Ring beginnt oben (−90°)", svg.indexOf('transform="rotate(-90 50 50)"') !== -1);
  pruefe("Art des Rings als Klasse", svg.indexOf("ring-wert volumen") !== -1);
}
{
  const d = bauen("en", "kg").wochenRingDaten({ workouts: 2, wdh: 1234, volumen: 4435.5 });
  pruefe("Englisch: 4,435.5", d.volumen.wertText === "4,435.5", d.volumen.wertText);
  pruefe("Englisch: of 5", d.workouts.von === "of 5");
  pruefe("Englisch: 1,234", d.wdh.wertText === "1,234");
}
{
  // lbs: 4435 kg = 9.778 lbs, Ziel 15.000 kg = 33.069 lbs, gerundet 33.000 lbs
  const d = bauen("de", "lbs").wochenRingDaten({ workouts: 1, wdh: 92, volumen: 4435 });
  pruefe("lbs: Wert gerundet", d.volumen.wertText === "9.778", d.volumen.wertText);
  pruefe("lbs: Einheit", d.volumen.einheit === "lbs");
  pruefe("lbs: Ziel 33.000", d.volumen.ziel === 33000 && d.volumen.von === "von 33.000");
}
{
  // Ziel erreicht und überschritten: Ring voll, "Ziel erreicht"
  const a = bauen("de", "kg");
  const d = a.wochenRingDaten({ workouts: 7, wdh: 320, volumen: 123456 });
  pruefe("123.456 kg", d.volumen.wertText === "123.456");
  pruefe("Volumen erreicht", d.volumen.erreicht && d.volumen.von === "Ziel erreicht");
  pruefe("Ring gekappt auf voll", anteil(a.ringSvg(123456 / 15000, "volumen")) === 1);
  pruefe("Workouts 7: Ziel erreicht", d.workouts.von === "Ziel erreicht");
  pruefe("Wdh. genau 320: Ziel erreicht", d.wdh.von === "Ziel erreicht");
  const e = bauen("en", "kg").wochenRingDaten({ workouts: 5, wdh: 10, volumen: 0 });
  pruefe("Englisch: Goal met", e.workouts.von === "Goal met");
  const leer = a.ringSvg(0, "volumen");
  pruefe("Volumen 0: kein Fortschritt, nur Spur", leer.indexOf("ring-wert") === -1 && leer.indexOf("ring-spur") !== -1);
}
{
  // Home nutzt die Ringe, das Profil weiter wochenZahlenFeld
  const home = funktionHolen("homeWocheAnzeigen");
  pruefe("Home baut die Ringe mit dem Titel der Wochenleiste", home.indexOf("wochenRingeFeld(zahlen, titel || zeitraum)") !== -1 && home.indexOf("wochenZahlenFeld") === -1);
  pruefe("Profil unverändert mit wochenZahlenFeld", quelle.indexOf("woche.appendChild(wochenZahlenFeld(wochenZahlen(profilTage, montagDerWoche(new Date()))));") !== -1);
  pruefe("Texte in Deutsch und Englisch", ["home.ziel", "home.zielNoch", "home.zielVon", "home.zielErreicht", "home.zielErreichtKurz"].every(k => TEXTE[k] && TEXTE[k].de && TEXTE[k].en));
}

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
