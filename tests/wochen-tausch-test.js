// Test: Seit Version 138 hat die Karte "Diese Woche" auf Home einen neuen Aufbau: Kopf mit Symbol, Titel und Pfeil
// zur Statistik, links der große Ring, rechts sein Ziel in zwei Zeilen und die zwei kleinen Ringe als Knöpfe.
// Ein Tipp auf einen kleinen Ring tauscht ihn mit dem großen. Welcher groß ist, merkt sich nur die Sitzung (wochenReihe),
// Standard ist das Volumen. Nichts im Speicher, nichts im Backup.
// Starten mit: node tests/wochen-tausch-test.js
// Die Datei gehört nicht zur App. Die Funktionen holt sie direkt aus der app.js, die Texte aus der texte.js.

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const texte = fs.readFileSync(new URL("../texte.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const einfuehrung = fs.readFileSync(new URL("../einfuehrung.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
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

// Ein winziges Element: Klasse, Text, Merkmale, Kinder, innerHTML und onclick
function element(tag, klasse, text) {
  const e = { tag, className: klasse || "", textContent: text === undefined ? "" : String(text), innerHTML: "", kinder: [], merkmale: {} };
  e.appendChild = function (k) { this.kinder.push(k); return k; };
  e.setAttribute = function (n, w) { this.merkmale[n] = String(w); };
  e.classList = {
    toggle: function (k, an) { const l = e.className.split(" ").filter(x => x && x !== k); if (an) l.push(k); e.className = l.join(" "); },
    add: function (k) { e.classList.toggle(k, true); },
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
const text = e => alle(e).map(k => k.textContent).filter(Boolean).join(" | ");

const TEXTE = new Function(texte + "; return TEXTE;")();
function bauen(sprache, einheitWahl) {
  const protokoll = { tausch: [], seiten: [] };
  const code = konstanteHolen("WOCHEN_ZIELE") + konstanteHolen("LBS_JE_KG")
    + "function einheit() { return einheitWahl; }"
    // Seit Version 169 holen die Ringe persönliche Ziele, hier die festen
    + "function wochenZiele() { return WOCHEN_ZIELE; } const homeMontag = null;"
    + "function ausKg(kg) { return einheit() === 'lbs' ? kg * LBS_JE_KG : kg; }"
    + "function gebiet() { return sprache === 'de' ? 'de-DE' : 'en-US'; }"
    + "function txt(s, w) { let t = TEXTE[s][sprache]; for (const k in (w || {})) t = t.replace('{' + k + '}', w[k]); return t; }"
    + "function iconSvg(n) { return '<svg data-icon=\"' + n + '\"></svg>'; }"
    + "function seiteZeigen(s) { protokoll.seiten.push(s); }"
    + "function wochenTauschen(feld, index) { protokoll.tausch.push(index); wochenReihe = wochenReiheTauschen(wochenReihe, index); }"
    // Seit Version 141 hängt wochenRingeFeld die K-Karte des Looks Korund an. Sie hat ihren eigenen Test (korund-k-test.js).
    + "function wochenKFeld() { return element('div', 'wochen-k'); }"
    + funktionHolen("ringSvg")
    + /\n {2}let wochenReihe = [^\n]*\n/.exec(quelle)[0]
    + funktionHolen("wochenReiheTauschen") + funktionHolen("wochenRingDaten") + funktionHolen("wochenKreis") + funktionHolen("wochenRingeFeld")
    + "return { feld: wochenRingeFeld, reihe: function () { return wochenReihe; } };";
  const a = new Function("element", "TEXTE", "sprache", "einheitWahl", "protokoll", code)(element, TEXTE, sprache, einheitWahl, protokoll);
  a.protokoll = protokoll;
  return a;
}
const WOCHE = { workouts: 1, wdh: 92, volumen: 11755 };
// Was die Karte zeigt: der große Ring (Art, Text), die Zielzeilen und die kleinen Ringe (Art, Text, aria-label)
function lesen(f) {
  const gross = finde(f, "wochen-ring-gross");
  return {
    gross: gross.merkmale["data-ring"],
    grossText: text(gross),
    ziel: finde(f, "wochen-ziel").kinder.map(k => k.textContent),
    klein: findeAlle(f, "wochen-ring-klein").map(k => ({ art: k.merkmale["data-ring"], tag: k.tag, text: text(k), aria: k.merkmale["aria-label"], icon: finde(k, "wochen-ring-name").innerHTML }))
  };
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
  const f = a.feld(WOCHE, "Diese Woche");
  const l = lesen(f);
  pruefe("Kopf: Titel der Wochenleiste", finde(f, "wochen-ringe-titel").textContent === "Diese Woche");
  pruefe("Kopf: Symbol Balken", finde(f, "wochen-symbol").innerHTML.indexOf('data-icon="balken"') !== -1);
  const pfeil = finde(f, "wochen-pfeil");
  pruefe("Kopf: Pfeil ist ein Knopf mit Namen", pfeil.tag === "button" && pfeil.merkmale["aria-label"] === "Statistik öffnen");
  pfeil.onclick();
  pruefe("Pfeil öffnet den Fortschritt-Tab", a.protokoll.seiten.join() === "fortschritt");
  pruefe("Start: Volumen groß", l.gross === "volumen" && l.grossText === "Volumen | 11.755 | kg", l.grossText);
  pruefe("Zielzeile Volumen", l.ziel.join(" / ") === "Ziel 15.000 kg / noch 3.245 kg", l.ziel.join(" / "));
  pruefe("Klein: Workouts, dann Wdh.", l.klein.map(k => k.art).join() === "workouts,wdh");
  pruefe("Kleine Ringe sind Knöpfe", l.klein.every(k => k.tag === "button"));
  pruefe("Klein Workouts: 1 von 5", l.klein[0].text === "1 | von 5 | Workouts", l.klein[0].text);
  pruefe("Klein Wdh.: 92 von 320", l.klein[1].text === "92 | von 320 | Wdh.", l.klein[1].text);
  pruefe("aria-label", l.klein[0].aria === "Workouts groß anzeigen" && l.klein[1].aria === "Wiederholungen groß anzeigen", l.klein.map(k => k.aria).join());
  pruefe("Icons: Person und Hantel", l.klein[0].icon.indexOf('"person"') !== -1 && l.klein[1].icon.indexOf('"hantel"') !== -1);
  pruefe("Linie nur in der rechten Spalte", Boolean(finde(finde(f, "wochen-rechts"), "wochen-ringe-linie")));

  // Tipp auf Workouts: Workouts groß, Volumen klein an der Stelle von Workouts
  findeAlle(f, "wochen-ring-klein")[0].onclick();
  pruefe("Tipp ruft den Tausch mit Stelle 1", a.protokoll.tausch.join() === "1");
  pruefe("Reihe nach dem Tausch", a.reihe().join() === "workouts,volumen,wdh", a.reihe().join());
  let m = lesen(a.feld(WOCHE, "Diese Woche"));
  pruefe("Workouts groß: Name, Wert, von 5", m.grossText === "Workouts | 1 | von 5", m.grossText);
  pruefe("Zielzeile Workouts", m.ziel.join(" / ") === "Ziel 5 Workouts / noch 4", m.ziel.join(" / "));
  pruefe("Volumen klein links: 11.755 von 15.000 mit Gewicht-Icon", m.klein[0].art === "volumen" && m.klein[0].text === "11.755 | von 15.000 | Volumen" && m.klein[0].icon.indexOf('"gewicht"') !== -1, m.klein[0].text);
  pruefe("aria-label Volumen", m.klein[0].aria === "Volumen groß anzeigen");

  // Tipp auf Wdh. (Stelle 2): Wdh. groß, Workouts klein rechts
  a.reihe();
  const g = a.feld(WOCHE, "Diese Woche");
  findeAlle(g, "wochen-ring-klein")[1].onclick();
  m = lesen(a.feld(WOCHE, "Diese Woche"));
  pruefe("Reihe nach zweitem Tausch", a.reihe().join() === "wdh,volumen,workouts", a.reihe().join());
  pruefe("Wdh. groß", m.grossText === "Wdh. | 92 | von 320", m.grossText);
  pruefe("Zielzeile Wdh.", m.ziel.join(" / ") === "Ziel 320 Wdh. / noch 228", m.ziel.join(" / "));

  // Und zurück: Volumen (Stelle 1) wieder groß
  findeAlle(a.feld(WOCHE, "Diese Woche"), "wochen-ring-klein")[0].onclick();
  pruefe("zurück: Volumen groß", a.reihe().join() === "volumen,wdh,workouts", a.reihe().join());
  // Wochenwechsel baut neu mit derselben Reihe
  m = lesen(a.feld({ workouts: 3, wdh: 200, volumen: 5000 }, "Letzte Woche"));
  pruefe("Wochenwechsel behält die Wahl", m.gross === "volumen" && m.klein.map(k => k.art).join() === "wdh,workouts");
}
{
  // Ziel erreicht: Zielzeile "erreicht" ohne doppeltes "Ziel", im Ring "Ziel erreicht"
  const a = bauen("de", "kg");
  let m = lesen(a.feld({ workouts: 6, wdh: 400, volumen: 123456 }, "Diese Woche"));
  pruefe("Volumen erreicht: zwei Zeilen", m.ziel.join(" / ") === "Ziel 15.000 kg / erreicht", m.ziel.join(" / "));
  pruefe("Volumen groß, lange Zahl kleiner", m.grossText === "Volumen | 123.456 | kg");
  pruefe("Workouts klein: Ziel erreicht", m.klein[0].text === "6 | Ziel erreicht | Workouts", m.klein[0].text);
  findeAlle(a.feld({ workouts: 6, wdh: 400, volumen: 123456 }, "Diese Woche"), "wochen-ring-klein")[0].onclick();
  m = lesen(a.feld({ workouts: 6, wdh: 400, volumen: 123456 }, "Diese Woche"));
  pruefe("Workouts groß erreicht", m.grossText === "Workouts | 6 | Ziel erreicht" && m.ziel.join(" / ") === "Ziel 5 Workouts / erreicht", m.grossText + " / " + m.ziel.join(" / "));
  const e = bauen("en", "kg");
  m = lesen(e.feld({ workouts: 6, wdh: 400, volumen: 123456 }, "This Week"));
  pruefe("Englisch erreicht: Goal 15,000 kg / met", m.ziel.join(" / ") === "Goal 15,000 kg / met", m.ziel.join(" / "));
  pruefe("Englisch: Goal met im kleinen Ring, Reps", m.klein[1].text === "400 | Goal met | Reps", m.klein[1].text);
  pruefe("Englisch aria-label", m.klein[0].aria === "Show Workouts large" && m.klein[1].aria === "Show Repetitions large", m.klein.map(k => k.aria).join());
}
{
  // lbs: Ziel 33.000 lbs, Rest in lbs
  const a = bauen("de", "lbs");
  const m = lesen(a.feld({ workouts: 1, wdh: 92, volumen: 0.4536 }, "Diese Woche"));
  pruefe("lbs: Zielzeile", m.ziel.join(" / ") === "Ziel 33.000 lbs / noch 32.999 lbs", m.ziel.join(" / "));
  pruefe("lbs: großer Ring", m.grossText === "Volumen | 1 | lbs", m.grossText);
  const e = bauen("en", "lbs");
  const n = lesen(e.feld({ workouts: 1, wdh: 92, volumen: 4435 }, "This Week"));
  pruefe("lbs Englisch: Zielzeile", n.ziel.join(" / ") === "Goal 33,000 lbs / 23,222 lbs to go", n.ziel.join(" / "));
}
{
  // Nichts im Speicher: Die Reihe steht nur in der Sitzung
  const stellen = quelle.split("\n").filter(z => z.indexOf("wochenReihe") !== -1);
  pruefe("wochenReihe startet mit Volumen groß", /let wochenReihe = \["volumen", "workouts", "wdh"\];/.test(quelle));
  const tausch = funktionHolen("wochenTauschen") + funktionHolen("wochenRingeFeld") + funktionHolen("wochenReiheTauschen");
  pruefe("Tausch speichert nichts", !/localStorage|sicherSpeichern|einstellungenSpeichern|einstellungen\./.test(tausch));
  pruefe("wochenReihe nur an wenigen Stellen (kein Speicher, kein Backup)", stellen.length <= 7 && stellen.every(z => !/speicher|backup|export/i.test(z)), stellen.length);
  pruefe("Tausch sperrt während der Animation", funktionHolen("wochenTauschen").indexOf("if (wochenTauschLaeuft") !== -1);
  pruefe("Bewegung reduzieren: kein Gleiten", funktionHolen("wochenTauschen").indexOf('matchMedia("(prefers-reduced-motion: reduce)")') !== -1);
}
{
  // Einführung: seit Version 141 ohne Hinweis auf den Tausch, weil der Look Korund statt Ringen das K zeigt.
  // Der Text stimmt in jedem Look und auch ohne Daten.
  pruefe("Einführung: Text DE", einfuehrung.indexOf("Volumen, Workouts und Wiederholungen, gemessen an deinem Wochenziel.") !== -1);
  pruefe("Einführung: Text EN", einfuehrung.indexOf("volume, workouts and reps, measured against your weekly goal.") !== -1);
  pruefe("Texte in Deutsch und Englisch", ["home.ringGross", "home.zurStatistik", "home.ziel", "home.zielErreichtKurz"].every(k => TEXTE[k] && TEXTE[k].de && TEXTE[k].en));
}

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
