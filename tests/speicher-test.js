// Test für das Lesen und Speichern im Speicher des Geräts. Starten mit: node tests/speicher-test.js
// Die Datei gehört nicht zur App. Sie holt sich die Funktionen direkt aus der app.js
// und lässt sie mit einem nachgebauten Speicher laufen.

import fs from "node:fs";

const quelle = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8");

// Schneidet eine Funktion aus der app.js aus: von "function name(" bis zur schließenden Klammer auf derselben Einrückung
function funktionHolen(name) {
  const start = quelle.indexOf("  function " + name + "(");
  const ende = quelle.indexOf("\n  }\n", start);
  if (start === -1 || ende === -1) {
    throw new Error("Funktion " + name + " nicht in der app.js gefunden");
  }
  return quelle.slice(start, ende + 5);
}

// Ein nachgebauter Speicher. voll = true lässt jedes Schreiben scheitern, wie bei vollem Speicher.
function speicherBauen(inhalt, voll) {
  const daten = Object.assign({}, inhalt);
  return {
    daten: daten,
    getItem: function (schluessel) {
      return schluessel in daten ? daten[schluessel] : null;
    },
    setItem: function (schluessel, wert) {
      if (voll) {
        throw new Error("Speicher voll");
      }
      daten[schluessel] = String(wert);
    },
    removeItem: function (schluessel) {
      delete daten[schluessel];
    }
  };
}

// Baut die Funktionen mit einem eigenen Speicher zusammen. Dialog und Hinweis werden nur gezählt.
function umgebung(inhalt, voll) {
  const localStorage = speicherBauen(inhalt, voll);
  const gezeigt = { dialoge: 0, hinweise: 0 };
  const document = {
    getElementById: function () {
      return { classList: { add: function () { gezeigt.hinweise++; } } };
    }
  };
  const frageZeigen = function () { gezeigt.dialoge++; };
  const txt = function (schluessel) { return schluessel; };
  const bauen = new Function("localStorage", "document", "frageZeigen", "txt",
    "let eintraegeKaputt = false; let kaputtGesichert = false; let startFertig = true;"
    + "let speicherFehlerGemeldet = false; let speicherFehlerWartet = false;"
    + funktionHolen("gespeichertLesen") + funktionHolen("sicherSpeichern") + funktionHolen("speicherFehlerMelden")
    + funktionHolen("eintraegeLesen") + funktionHolen("rohtextSichern")
    + "return { gespeichertLesen: gespeichertLesen, sicherSpeichern: sicherSpeichern, eintraegeLesen: eintraegeLesen,"
    + "kaputt: function () { return eintraegeKaputt; }, gesichert: function () { return kaputtGesichert; } };");
  const app = bauen(localStorage, document, frageZeigen, txt);
  app.speicher = localStorage.daten;
  app.gezeigt = gezeigt;
  return app;
}

let fehler = 0;
function pruefe(name, ist, soll) {
  const gleich = JSON.stringify(ist) === JSON.stringify(soll);
  console.log((gleich ? "ok     " : "FEHLER ") + name);
  if (!gleich) {
    console.log("         erwartet: " + JSON.stringify(soll) + ", bekommen: " + JSON.stringify(ist));
    fehler++;
  }
}

// ---------- gespeichertLesen ----------

let app = umgebung({ gut: "[1,2]", kaputt: "{das ist kein JSON", leer: "", nichts: "null" });
pruefe("fehlender Wert gibt den Ersatz", app.gespeichertLesen("fehlt", "ersatz"), "ersatz");
pruefe("gültiger Wert wird gelesen", app.gespeichertLesen("gut", []), [1, 2]);
pruefe("kaputter Text gibt den Ersatz", app.gespeichertLesen("kaputt", "ersatz"), "ersatz");
pruefe("leerer Text gibt den Ersatz", app.gespeichertLesen("leer", "ersatz"), "ersatz");
pruefe("gespeichertes null gibt den Ersatz", app.gespeichertLesen("nichts", "ersatz"), "ersatz");

// ---------- eintraegeLesen ----------

app = umgebung({});
pruefe("ohne Einträge: leere Liste", app.eintraegeLesen(), []);
pruefe("ohne Einträge: nicht kaputt", app.kaputt(), false);

app = umgebung({ eintraege: '[{"uebung":"Bankdrücken"}]' });
pruefe("gültige Einträge werden gelesen", app.eintraegeLesen(), [{ uebung: "Bankdrücken" }]);
pruefe("gültige Einträge: nicht kaputt", app.kaputt(), false);

app = umgebung({ eintraege: '[{"uebung":"Bankdr' });
pruefe("abgeschnittener Text: leere Liste", app.eintraegeLesen(), []);
pruefe("abgeschnittener Text: als kaputt gemerkt", app.kaputt(), true);
pruefe("abgeschnittener Text: Rohtext gesichert", app.speicher.eintraegeKaputt, '[{"uebung":"Bankdr');
pruefe("abgeschnittener Text: Original bleibt stehen", app.speicher.eintraege, '[{"uebung":"Bankdr');

app = umgebung({ eintraege: '{"a":1}' });
pruefe("keine Liste: leere Liste", app.eintraegeLesen(), []);
pruefe("keine Liste: Rohtext gesichert", app.speicher.eintraegeKaputt, '{"a":1}');

app = umgebung({ eintraege: "neu kaputt", eintraegeKaputt: "alt kaputt" });
app.eintraegeLesen();
pruefe("frühere Sicherung bleibt stehen", app.speicher.eintraegeKaputt, "alt kaputt");
pruefe("neue Sicherung kommt daneben", app.speicher.eintraegeKaputt2, "neu kaputt");

app = umgebung({ eintraege: "kaputt", eintraegeKaputt: "kaputt" });
app.eintraegeLesen();
pruefe("derselbe Rohtext wird nicht doppelt gesichert", app.speicher.eintraegeKaputt2, undefined);

app = umgebung({ eintraege: "kaputt" }, true);
pruefe("Speicher voll: App startet trotzdem", app.eintraegeLesen(), []);
pruefe("Speicher voll: als nicht gesichert gemerkt", app.gesichert(), false);

// ---------- sicherSpeichern ----------

app = umgebung({});
pruefe("Speichern klappt: true", app.sicherSpeichern("eintraege", [1]), true);
pruefe("Speichern klappt: Wert steht als JSON im Speicher", app.speicher.eintraege, "[1]");
pruefe("Speichern klappt: keine Meldung", app.gezeigt, { dialoge: 0, hinweise: 0 });

app = umgebung({}, true);
pruefe("Speicher voll: false statt Absturz", app.sicherSpeichern("eintraege", [1]), false);
pruefe("erster Fehlschlag: Dialog", app.gezeigt, { dialoge: 1, hinweise: 0 });
app.sicherSpeichern("eintraege", [1]);
app.sicherSpeichern("eintraege", [1]);
pruefe("weitere Fehlschläge: nur der kleine Hinweis", app.gezeigt, { dialoge: 1, hinweise: 2 });

console.log(fehler === 0 ? "\nAlle Tests bestanden." : "\n" + fehler + " Test(s) fehlgeschlagen.");
process.exit(fehler === 0 ? 0 : 1);
