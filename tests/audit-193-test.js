// Test: Befunde des Audits vom 14.11.2026, die Version 193 behebt (K-02, K-03, K-04, K-06, K-07, K-10, K-11, K-14, K-15, K-16, K-21).
// Prüft den Quelltext (Schalter, Texte, Merkmale). Das Verhalten im Browser prüft `node tests/browser-regression.mjs audit193`.
// Starten mit: node tests/audit-193-test.js
// Die Datei gehört nicht zur App.

import fs from "node:fs";

const wurzel = new URL("../", import.meta.url);
const lesen = (datei) => fs.readFileSync(new URL(datei, wurzel), "utf8").replace(/\r\n/g, "\n");
const app = lesen("app.js"), index = lesen("index.html"), texte = lesen("texte.js"), sw = lesen("sw.js"), spiel = lesen("spiel/index.html");
let fehler = 0, zahl = 0;
function pruefe(name, ok, info) {
  zahl++;
  console.log((ok ? "ok     " : "FEHLER ") + name + (ok || info === undefined ? "" : "  (" + info + ")"));
  if (!ok) fehler++;
}

// K-02: beide Schalter für das helle Design gleich, Standard false
const inApp = /\n {2}const SHOW_HELL = (true|false);/.exec(app);
const inIndex = /var hellBeimStart = (true|false);/.exec(index);
pruefe("K-02 Schalter SHOW_HELL in der app.js", !!inApp);
pruefe("K-02 Schalter hellBeimStart im Start-Skript", !!inIndex);
pruefe("K-02 beide Schalter gleich", !!inApp && !!inIndex && inApp[1] === inIndex[1]);
pruefe("K-02 design() fragt den Schalter", /function design\(\) \{\n {4}if \(!SHOW_HELL\) \{\n {6}return "dunkel";/.test(app));
pruefe("K-02 Design-Wahl und ihr Hinweis tragen data-hell", /id="design-auswahl"[^>]*data-hell/.test(index) && /data-t="design\.hinweis"[^>]*data-hell/.test(index));
pruefe("K-02 Hinweis ohne „System“ für die Farbwelt", /data-t="farbwelt\.hinweisNurDunkel"[^>]*data-nur-dunkel/.test(index));

// Neue Texte gibt es auf Deutsch und Englisch
["andererTab.titel", "andererTab.text", "andererTab.neuLaden", "satz.ungueltigTitel", "satz.ungueltigText", "farbwelt.hinweisNurDunkel"].forEach(function (k) {
  const m = new RegExp('"' + k.replace(/\./g, "\\.") + '": \\{ de: "([^"]+)", en: "([^"]+)" \\}').exec(texte);
  pruefe("Text " + k + " Deutsch und Englisch", !!m && m[1].length > 0 && m[2].length > 0);
});

// K-03: Listener auf andere Tabs, ohne Spielstand und Cloud-Anmeldung
const liste = /const ANDERER_TAB_SCHLUESSEL = \[([\s\S]*?)\];/.exec(app);
pruefe("K-03 storage-Listener vorhanden", /window\.addEventListener\("storage"/.test(app));
pruefe("K-03 eintraege und laufendesTraining beobachtet", !!liste && /"eintraege"/.test(liste[1]) && /"laufendesTraining"/.test(liste[1]));
pruefe("K-03 Spielstand, Cloud und Pause nicht beobachtet", !!liste && !/korund-gym|korundCloud|cloudZuletzt|"pause"/.test(liste[1]));

// K-04: Sperre an „Satz fertig“ und an allen drei Knöpfen zum Überspringen der Pause
pruefe("K-04 SATZ_SPERRE_MS", /const SATZ_SPERRE_MS = \d+;/.test(app));
pruefe("K-04 satzFertigPruefen fragt die Sperre zuerst", /function satzFertigPruefen\(\) \{\n {4}if \(satzGesperrt\(\)\) \{/.test(app));
pruefe("K-04 kein Knopf ruft pauseUeberspringen direkt", !/onclick="pauseUeberspringen\(\)"/.test(index) && (index.match(/onclick="pauseUeberspringenTipp\(\)"/g) || []).length === 3);

// K-06: ungültige Eingabe wird erkannt
pruefe("K-06 feldEingabeGueltig", /function feldEingabeGueltig\(id\)/.test(app));
pruefe("K-06 satzFertigPruefen prüft beide Felder", /!feldEingabeGueltig\("t-feld-gewicht"\) \|\| !feldEingabeGueltig\("t-feld-wdh"\)/.test(app));

// K-07: Statistik-Kachel passt sich der Breite an (beide Blöcke der korund.css)
const korund = lesen("korund.css");
pruefe("K-07 Wert mit cqw in beiden Blöcken", (korund.match(/\.statistik-kachel-wert \{ font-size: 21px; font-size: min\(21px, 23cqw\);/g) || []).length === 2);
pruefe("K-07 Kachel ist Container in beiden Blöcken", (korund.match(/\.statistik-kachel \{[^}]*container-type: inline-size;/g) || []).length === 2);

// K-10: Namen und Tastatur
pruefe("K-10 Erklärung per Tastatur scrollbar", /id="erklaerung-inhalt"[^>]*tabindex="0"/.test(index));
pruefe("K-10 Datei-Feld mit Namen", /id="backup-datei"[^>]*aria-label="Backup importieren"/.test(index));
pruefe("K-10 ±1 Wdh. beginnt mit dem sichtbaren Text", /"wdh\.weniger": \{ de: "−1 /.test(texte) && /"wdh\.mehr": \{ de: "\+1 /.test(texte) && !/aria-label="Eine Wiederholung/.test(index));

// K-11: Gym-Name nie als HTML
pruefe("K-11 kein gymName() in innerHTML", !/innerHTML[^;\n]*gymName\(\)/.test(spiel) && !/'<b>' \+ gymName\(\)/.test(spiel));
pruefe("K-11 Toast als Text", /t\.querySelector\("b"\)\.textContent = gross/.test(spiel));

// K-14, K-15, K-16: Texte
pruefe("K-14 RIR-Feld auf Deutsch", /"modus\.rir": \{ de: "Wdh\. in Reserve/.test(texte));
const u = lesen("uebungen.js");
pruefe("K-15 Hip Thrust (Eigengewicht) eindeutig", /id: "hip-thrust-eigen", de: "Hip Thrust \(Eigengewicht\)", en: "Hip Thrust \(Bodyweight\)"/.test(u));
pruefe("K-16 keine Schutzaussage „schützt die Schultern“", !/schützt die Schultern/.test(lesen("erklaerungen.js")));

// K-21: Hinweis ohne Netz für das Gym-Spiel
pruefe("K-21 sw.js antwortet ohne Netz mit Hinweis", /SPIEL_OFFLINE/.test(sw) && /__gymOffline = true/.test(sw) && /Das Gym braucht Internet/.test(sw) && /The gym needs internet/.test(sw));
pruefe("K-21 App lädt das Spiel nach dem Hinweis neu", /contentWindow\.__gymOffline/.test(app));

console.log(zahl + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler ? 1 : 0);
