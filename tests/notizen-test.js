// Test: Seit Version 141 gibt es Notizen je Übung im Trainingsmodus. Gespeichert unter dem eigenen Schlüssel "notizen"
// als { schluessel: text }, Schlüssel ist die ID der Übung oder "name:" und der Name. Im Backup als Feld "notizen"
// (Backup-Version bleibt 12). Beim Import: Ersetzen übernimmt die Notizen, Hinzufügen nur fehlende.
// Starten mit: node tests/notizen-test.js

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const einfuehrung = fs.readFileSync(new URL("../einfuehrung.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const index = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const texte = fs.readFileSync(new URL("../texte.js", import.meta.url), "utf8").replace(/\r\n/g, "\n");
function funktionHolen(name) {
  const start = quelle.indexOf("\n  function " + name + "(");
  const ende = quelle.indexOf("\n  }\n", start);
  if (start === -1 || ende === -1) {
    throw new Error("Funktion " + name + " nicht in der app.js gefunden");
  }
  return quelle.slice(start, ende + 5);
}
let pruefungen = 0, fehler = 0;
function pruefe(name, ok, info) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name + (info !== undefined ? "  (" + info + ")" : ""));
  }
}
const TEXTE = new Function(texte + "; return TEXTE;")();
const f = new Function(funktionHolen("nameSaeubern") + funktionHolen("notizSchluessel") + funktionHolen("notizenBereinigen") + "return { notizSchluessel, notizenBereinigen };")();

pruefe("Schlüssel feste Übung: ID", f.notizSchluessel({ uebungId: "bankdruecken-lh", name: "Bankdrücken" }) === "bankdruecken-lh");
pruefe("Schlüssel ohne ID: Name klein", f.notizSchluessel({ uebungId: "", name: "  Meine  Übung " }) === "name:meine übung", f.notizSchluessel({ uebungId: "", name: "  Meine  Übung " }));
const b = f.notizenBereinigen({ a: " Sitz 4 ", b: "", c: 5, d: "x".repeat(400) });
pruefe("Bereinigen: Text getrimmt", b.a === "Sitz 4");
pruefe("Bereinigen: leer und keine Texte fallen weg", !("b" in b) && !("c" in b));
pruefe("Bereinigen: höchstens 300 Zeichen", b.d.length === 300);
pruefe("Bereinigen: kaputt gibt leer", JSON.stringify(f.notizenBereinigen([1, 2])) === "{}" && JSON.stringify(f.notizenBereinigen(null)) === "{}");
pruefe("Im Backup", /notizen: notizen,/.test(funktionHolen("backupText")));
pruefe("Backup-Version bleibt 12", /version: 12,/.test(funktionHolen("backupText")));
pruefe("Import: Ersetzen und Hinzufügen", /if \(art === "ersetzen"\) \{\n\s+notizen = importNotizen;/.test(quelle) && /if \(!notizen\[schluessel\]\)/.test(quelle));
pruefe("Schlüssel in EINFUEHRUNG_APP_SCHLUESSEL", /"einfuehrungVariante", "notizen"\]/.test(einfuehrung));
pruefe("Feld in der index.html", index.indexOf('id="modus-notiz-feld"') !== -1 && index.indexOf('oninput="notizSpeichern()"') !== -1);
pruefe("Notiz speichert nur notizen", !/eintraege|routinen|trainings\b/.test(funktionHolen("notizSpeichern")));
pruefe("Texte DE/EN", ["notiz.titel", "notiz.platzhalter"].every(k => TEXTE[k] && TEXTE[k].de && TEXTE[k].en));

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
