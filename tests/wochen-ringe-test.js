// Test: Seit Version 137 zeigt Home die Zahlen der gewählten Woche als Ringe (wochenRingeFeld), gemessen an WOCHEN_ZIELE
// (5 Workouts, 15.000 kg, 320 Wiederholungen). In lbs Wert und Ziel in lbs, das Ziel auf volle 1.000 gerundet (33.000 lbs).
// Fortschritt bei 100 % gekappt, dann "Ziel erreicht" statt "noch …" und "von …". Zahlen wie die App (Deutsch 4.435, Englisch 4,435).
// Das Profil zeigt die Woche weiter mit wochenZahlenFeld.
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

// Ein winziges Element: Klasse, Text, Kinder und innerHTML
function element(tag, klasse, text) {
  const e = { tag, className: klasse || "", textContent: text === undefined ? "" : String(text), innerHTML: "", kinder: [] };
  e.appendChild = function (k) { this.kinder.push(k); return k; };
  e.classList = {
    toggle: function (k, an) { const l = e.className.split(" ").filter(x => x && x !== k); if (an) l.push(k); e.className = l.join(" "); },
    contains: function (k) { return e.className.split(" ").indexOf(k) !== -1; }
  };
  return e;
}
function alle(e, liste) {
  liste = liste || [];
  liste.push(e);
  e.kinder.forEach(k => alle(k, liste));
  return liste;
}
const finde = (e, klasse) => alle(e).find(k => k.className.split(" ").indexOf(klasse) !== -1);
const findeAlle = (e, klasse) => alle(e).filter(k => k.className.split(" ").indexOf(klasse) !== -1);

const TEXTE = new Function(texte + "; return TEXTE;")();
function bauen(sprache, einheitWahl) {
  const code = konstanteHolen("WOCHEN_ZIELE") + konstanteHolen("LBS_JE_KG")
    + "function einheit() { return einheitWahl; }"
    + "function ausKg(kg) { return einheit() === 'lbs' ? kg * LBS_JE_KG : kg; }"
    + "function gebiet() { return sprache === 'de' ? 'de-DE' : 'en-US'; }"
    + "function txt(s, w) { let t = TEXTE[s][sprache]; for (const k in (w || {})) t = t.replace('{' + k + '}', w[k]); return t; }"
    + funktionHolen("ringSvg") + funktionHolen("wochenRingeFeld")
    + "return { wochenRingeFeld: wochenRingeFeld, WOCHEN_ZIELE: WOCHEN_ZIELE };";
  return new Function("element", "TEXTE", "sprache", "einheitWahl", code)(element, TEXTE, sprache, einheitWahl);
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
  const f = a.wochenRingeFeld({ workouts: 1, wdh: 92, volumen: 4435 }, "Diese Woche");
  pruefe("Titel der Wochenleiste", finde(f, "wochen-ringe-titel").textContent === "Diese Woche");
  pruefe("Volumen 4.435", finde(f, "wochen-ring-wert").textContent === "4.435", finde(f, "wochen-ring-wert").textContent);
  pruefe("Einheit kg", finde(f, "wochen-ring-einheit").textContent === "kg");
  pruefe("Beschriftung Volumen", finde(f, "wochen-ring-titel").textContent === "Volumen");
  pruefe("Ziel-Zeile", finde(f, "wochen-ring-ziel").textContent === "Ziel 15.000 kg · noch 10.565 kg", finde(f, "wochen-ring-ziel").textContent);
  const gross = finde(f, "wochen-ring-gross").innerHTML;
  pruefe("großer Ring 165 px, Stärke 20", gross.indexOf('width="165"') !== -1 && gross.indexOf('stroke-width="20"') !== -1);
  pruefe("großer Ring zu 4435/15000 gefüllt", anteil(gross) === Math.round(4435 / 15000 * 1000) / 1000, anteil(gross));
  pruefe("Ring beginnt oben (−90°)", gross.indexOf('transform="rotate(-90 82.5 82.5)"') !== -1);
  const klein = findeAlle(f, "wochen-ring-klein");
  pruefe("zwei kleine Ringe", klein.length === 2);
  pruefe("Workouts 1 von 5", findeAlle(f, "wochen-ring-zahl")[0].textContent === "1" && findeAlle(f, "wochen-ring-von")[0].textContent === "von 5");
  pruefe("Wiederholungen 92 von 320", findeAlle(f, "wochen-ring-zahl")[1].textContent === "92" && findeAlle(f, "wochen-ring-von")[1].textContent === "von 320");
  pruefe("Namen unter den Ringen", findeAlle(f, "wochen-ring-name").map(n => n.textContent).join() === "Workouts,Wiederholungen");
  pruefe("Workouts-Ring zu 1/5", anteil(klein[0].innerHTML) === 0.2, anteil(klein[0].innerHTML));
  pruefe("Arten der Ringe", klein[0].innerHTML.indexOf("ring-wert workouts") !== -1 && klein[1].innerHTML.indexOf("ring-wert wdh") !== -1 && gross.indexOf("ring-wert volumen") !== -1);
  pruefe("Trennlinie", Boolean(finde(f, "wochen-ringe-linie")));
}
{
  const a = bauen("en", "kg");
  const f = a.wochenRingeFeld({ workouts: 2, wdh: 1234, volumen: 4435.5 }, "Last Week");
  pruefe("Englisch: 4,435.5", finde(f, "wochen-ring-wert").textContent === "4,435.5", finde(f, "wochen-ring-wert").textContent);
  pruefe("Englisch: Ziel-Zeile", finde(f, "wochen-ring-ziel").textContent === "Goal 15,000 kg · 10,564.5 kg to go", finde(f, "wochen-ring-ziel").textContent);
  pruefe("Englisch: of 5", findeAlle(f, "wochen-ring-von")[0].textContent === "of 5");
  pruefe("lange Wdh.-Zahl kleiner", findeAlle(f, "wochen-ring-zahl")[1].classList.contains("lang"));
  pruefe("kurze Workouts-Zahl normal", !findeAlle(f, "wochen-ring-zahl")[0].classList.contains("lang"));
}
{
  // lbs: 4435 kg = 9.778 lbs, Ziel 15.000 kg = 33.069 lbs, gerundet 33.000 lbs
  const a = bauen("de", "lbs");
  const f = a.wochenRingeFeld({ workouts: 1, wdh: 92, volumen: 4435 }, "Diese Woche");
  pruefe("lbs: Wert gerundet", finde(f, "wochen-ring-wert").textContent === "9.778", finde(f, "wochen-ring-wert").textContent);
  pruefe("lbs: Einheit", finde(f, "wochen-ring-einheit").textContent === "lbs");
  pruefe("lbs: Ziel 33.000 und Rest", finde(f, "wochen-ring-ziel").textContent === "Ziel 33.000 lbs · noch 23.222 lbs", finde(f, "wochen-ring-ziel").textContent);
  pruefe("lbs: Ring 9778/33000", anteil(finde(f, "wochen-ring-gross").innerHTML) === Math.round(9778 / 33000 * 1000) / 1000);
}
{
  // Ziel erreicht und überschritten: Ring voll, "Ziel erreicht"
  const a = bauen("de", "kg");
  const f = a.wochenRingeFeld({ workouts: 7, wdh: 320, volumen: 123456 }, "Diese Woche");
  pruefe("123.456 kg, lange Zahl kleiner", finde(f, "wochen-ring-wert").textContent === "123.456" && finde(f, "wochen-ring-wert").classList.contains("lang"));
  pruefe("Volumen erreicht", finde(f, "wochen-ring-ziel").textContent === "Ziel 15.000 kg · Ziel erreicht", finde(f, "wochen-ring-ziel").textContent);
  pruefe("Volumen-Ring gekappt auf voll", anteil(finde(f, "wochen-ring-gross").innerHTML) === 1);
  const von = findeAlle(f, "wochen-ring-von");
  pruefe("Workouts 7: Ziel erreicht", von[0].textContent === "Ziel erreicht" && von[0].classList.contains("erreicht"));
  pruefe("Wdh. genau 320: Ziel erreicht", von[1].textContent === "Ziel erreicht");
  const klein = findeAlle(f, "wochen-ring-klein");
  pruefe("kleine Ringe voll", anteil(klein[0].innerHTML) === 1 && anteil(klein[1].innerHTML) === 1);
  const g = bauen("en", "kg").wochenRingeFeld({ workouts: 5, wdh: 10, volumen: 0 }, "This Week");
  pruefe("Englisch: Goal met", findeAlle(g, "wochen-ring-von")[0].textContent === "Goal met");
  pruefe("Volumen 0: kein Fortschritt, nur Spur", finde(g, "wochen-ring-gross").innerHTML.indexOf("ring-wert") === -1 && finde(g, "wochen-ring-gross").innerHTML.indexOf("ring-spur") !== -1);
}
{
  // Home nutzt die Ringe, das Profil weiter wochenZahlenFeld
  const home = funktionHolen("homeWocheAnzeigen");
  pruefe("Home baut die Ringe mit dem Titel der Wochenleiste", home.indexOf("wochenRingeFeld(zahlen, titel || zeitraum)") !== -1 && home.indexOf("wochenZahlenFeld") === -1);
  pruefe("Profil unverändert mit wochenZahlenFeld", quelle.indexOf("woche.appendChild(wochenZahlenFeld(wochenZahlen(profilTage, montagDerWoche(new Date()))));") !== -1);
  pruefe("Texte in Deutsch und Englisch", ["home.zielVolumen", "home.zielNoch", "home.zielVon", "home.zielErreicht"].every(k => TEXTE[k] && TEXTE[k].de && TEXTE[k].en));
}

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
