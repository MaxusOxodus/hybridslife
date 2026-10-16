// Test: Seit Version 133 zeigt der Bericht nach dem Training einen Knopf "Zeitverlauf", wenn jeder Satz eine Zeit hat.
// Geprüft werden alleSaetzeMitZeit (wann es den Knopf gibt), zeitverlaufBloecke (Reihenfolge, Blöcke je Übung,
// neuer Block nach Mitternacht) und uhrzeitText.
// Starten mit: node tests/zeitverlauf-test.js
// Die Datei gehört nicht zur App. Die Funktionen holt sie direkt aus der app.js.

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
const ECHT = ["alleSaetzeMitZeit", "zeitverlaufBloecke", "uhrzeitText", "saetzeVon", "rirLesen", "tagSchluessel"];
const a = new Function(ECHT.map(funktionHolen).join("") + "return { " + ECHT.join(", ") + " };")();

let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}

// Ortszeit: new Date(2026, 9, 16, 18, 4) ist der 16.10.2026 um 18:04 auf diesem Rechner
function zeit(tag, h, m) {
  return new Date(2026, 9, tag, h, m).toISOString();
}
function eintrag(id, uebung, zeiten) {
  return { id: id, uebung: uebung, uebungId: uebung, einzelsaetze: zeiten.map(z => ({ gewicht: 20, wdh: 10, zeit: z })), saetze: zeiten.length, gewicht: 20, wdh: 10 };
}

// ---------- Uhrzeit ----------
pruefe("Uhrzeit 18:04", a.uhrzeitText(new Date(2026, 9, 16, 18, 4)) === "18:04");
pruefe("Uhrzeit 07:05", a.uhrzeitText(new Date(2026, 9, 16, 7, 5)) === "07:05");
pruefe("Uhrzeit 00:00", a.uhrzeitText(new Date(2026, 9, 17, 0, 0)) === "00:00");

// ---------- Wann es den Knopf gibt ----------
const A = eintrag("a", "rudern", [zeit(16, 18, 0), zeit(16, 18, 3)]);
const B = eintrag("b", "latzug", [zeit(16, 18, 10)]);
pruefe("Knopf: alle Sätze mit Zeit", a.alleSaetzeMitZeit([A, B]) === true);
const ohne = JSON.parse(JSON.stringify(B));
delete ohne.einzelsaetze[0].zeit;
pruefe("Knopf: ein Satz ohne Zeit", a.alleSaetzeMitZeit([A, ohne]) === false);
const kaputt = JSON.parse(JSON.stringify(B));
kaputt.einzelsaetze[0].zeit = "gestern";
pruefe("Knopf: kaputte Zeit", a.alleSaetzeMitZeit([A, kaputt]) === false);
pruefe("Knopf: alter Eintrag ohne einzelsaetze", a.alleSaetzeMitZeit([A, { id: "c", uebung: "x", saetze: 3, gewicht: 20, wdh: 10 }]) === false);
pruefe("Knopf: ohne Sätze nein", a.alleSaetzeMitZeit([]) === false);

// ---------- Blöcke ----------
{
  const b = a.zeitverlaufBloecke([A, B]);
  pruefe("Blöcke: zwei", b.length === 2);
  pruefe("Blöcke: erst Rudern mit 2, dann Latzug mit 1", b[0].eintrag === A && b[0].saetze.length === 2 && b[1].eintrag === B && b[1].saetze.length === 1);
  pruefe("Blöcke: Nummern 1, 2", b[0].saetze.map(s => s.nummer).join() === "1,2");
}
{
  // Hin und her: Rudern 1, Latzug 1, Rudern 2 → drei Blöcke in der Reihenfolge der Zeit, Nummern bleiben die des Eintrags
  const R = eintrag("r", "rudern", [zeit(16, 18, 0), zeit(16, 18, 20)]);
  const L = eintrag("l", "latzug", [zeit(16, 18, 10)]);
  const b = a.zeitverlaufBloecke([R, L]);
  pruefe("Hin und her: drei Blöcke", b.length === 3 && b[0].eintrag === R && b[1].eintrag === L && b[2].eintrag === R, b.map(x => x.eintrag.id).join());
  pruefe("Hin und her: zweiter Rudern-Block ist Satz 2", b[2].saetze[0].nummer === 2);
}
{
  // Über Mitternacht: derselbe Eintrag wird am neuen Tag ein neuer Block
  const M = eintrag("m", "rudern", [zeit(16, 23, 55), zeit(17, 0, 2)]);
  const b = a.zeitverlaufBloecke([M]);
  pruefe("Mitternacht: zwei Blöcke", b.length === 2 && b[0].tag !== b[1].tag);
  pruefe("Mitternacht: Satz 2 am neuen Tag", b[1].saetze[0].nummer === 2 && a.uhrzeitText(b[1].saetze[0].zeit) === "00:02");
}
{
  // Ein Satz, der später bearbeitet wurde, behält seine Zeit (seit Version 122): Die Reihenfolge folgt der Zeit, nicht dem Platz
  const S = { id: "s", uebung: "rudern", einzelsaetze: [{ gewicht: 20, wdh: 10, zeit: zeit(16, 18, 5) }, { gewicht: 20, wdh: 10, zeit: zeit(16, 18, 1) }] };
  const b = a.zeitverlaufBloecke([S]);
  pruefe("Reihenfolge nach Zeit", b.length === 1 && b[0].saetze.map(s => s.nummer).join() === "2,1");
}

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
