// Prüft die Texte zum Datenschutz (seit Version 148): Seit dem Cloud-Backup (Version 146) gibt es ein Konto und eine Cloud.
// Keine Datei der App darf noch sagen, dass es keine Cloud oder kein Konto gibt oder dass nichts an einen Server geht.
// Die neuen Texte stehen in Deutsch und Englisch da und nennen, was mit und ohne Cloud-Backup gilt.
// Starten mit: node tests/datenschutz-texte-test.js
const fs = require("fs");
const path = require("path");
const wurzel = path.join(__dirname, "..");
const lesen = (datei) => fs.readFileSync(path.join(wurzel, datei), "utf8");

let pruefungen = 0;
let fehler = 0;
function pruefe(name, ok) {
  pruefungen++;
  if (!ok) {
    fehler++;
    console.log("FEHLER " + name);
  }
}

// Alle Dateien der App im Hauptordner (ohne die fremde Bibliothek supabase-*.js), dazu die Tests nicht
const dateien = fs.readdirSync(wurzel).filter(function (name) {
  return /\.(js|html|json)$/.test(name) && !/^supabase-/.test(name);
});
pruefe("Dateien gefunden", dateien.indexOf("texte.js") !== -1 && dateien.indexOf("index.html") !== -1 && dateien.indexOf("app.js") !== -1);

const VERBOTEN = /keine cloud|no cloud|kein konto|nothing is sent|no account|gibt es noch nicht\. bis dahin|bleiben auf deinem gerät|stays on your device/i;
dateien.forEach(function (datei) {
  const treffer = [];
  lesen(datei).split("\n").forEach(function (zeile, i) {
    if (VERBOTEN.test(zeile)) {
      treffer.push((i + 1) + ": " + zeile.trim().slice(0, 120));
    }
  });
  pruefe(datei + " sagt nirgends, es gebe keine Cloud oder kein Konto (" + treffer.join(" | ") + ")", treffer.length === 0);
});

const TEXTE = new Function(lesen("texte.js") + "; return TEXTE;")();
function beide(schluessel) {
  const t = TEXTE[schluessel];
  return !!t && typeof t.de === "string" && t.de.length > 0 && typeof t.en === "string" && t.en.length > 0;
}

// Jeder Text des Cloud-Backups und der FAQ steht in beiden Sprachen da
Object.keys(TEXTE).filter(function (k) {
  return /^(cloud\.|faq\.|ueber\.|einst\.konto)/.test(k);
}).forEach(function (k) {
  pruefe(k + " in Deutsch und Englisch", beide(k));
});

// Die zwei Texte zum Datenschutz sagen, was ohne und mit Cloud-Backup gilt
["ueber.lokal", "faq.1.antwort"].forEach(function (k) {
  const t = TEXTE[k];
  pruefe(k + ": ohne Cloud-Backup auf dem Gerät", /Ohne Cloud-Backup/.test(t.de) && /[Ww]ithout cloud backup/.test(t.en));
  pruefe(k + ": Server in der EU", /in der EU/.test(t.de) && /in the EU/.test(t.en));
  pruefe(k + ": alle Daten samt Körperdaten", /Körpergewicht, Körperfett, Profil und Einschränkungen/.test(t.de) && /body weight, body fat, profile and limitations/.test(t.en));
  pruefe(k + ": verschlüsselt, löschbar, andere Nutzer können es nicht lesen", /verschlüsselt/.test(t.de) && /löschbar/.test(t.de) && /Andere Nutzer können es nicht lesen\./.test(t.de) && /encrypted/.test(t.en) && /deleted/.test(t.en) && /Other users cannot read it\./.test(t.en));
});
// Die App verspricht nicht, dass nur der Nutzer die Daten lesen kann (der Besitzer des Supabase-Projekts kann es),
// sondern nur, dass andere Nutzer sie nicht lesen können
pruefe("cloud.datenschutz: andere Nutzer können es nicht lesen", TEXTE["cloud.datenschutz"].de === "Gespeichert wird dein Backup auf Servern in der EU. Andere Nutzer können es nicht lesen." && TEXTE["cloud.datenschutz"].en === "Your backup is stored on servers in the EU. Other users cannot read it.");
dateien.forEach(function (datei) {
  pruefe(datei + " verspricht nicht „nur du kannst es lesen“", !/nur du kannst|nur für dich lesbar|only you can read|readable only by you/i.test(lesen(datei)));
});
const cloudErsatz = /data-t="cloud\.datenschutz">([^<]*)</.exec(lesen("index.html"));
pruefe("Ersatztext cloud.datenschutz in der index.html passt", !!cloudErsatz && cloudErsatz[1] === TEXTE["cloud.datenschutz"].de);
pruefe("faq.3.antwort: mit Cloud-Backup wandern die Daten mit", /Mit Cloud-Backup wandern deine Daten mit/.test(TEXTE["faq.3.antwort"].de) && /With cloud backup, your data moves with you/.test(TEXTE["faq.3.antwort"].en));
pruefe("faq.3.antwort: ohne nicht", /Ohne Cloud-Backup wandern sie nicht von allein mit/.test(TEXTE["faq.3.antwort"].de) && /Without cloud backup, it does not move over by itself/.test(TEXTE["faq.3.antwort"].en));

// Die Ersatztexte in der index.html (vor dem Einsetzen der Sprache) sagen dasselbe wie die texte.js
const index = lesen("index.html");
const ersatz = /data-t="ueber\.lokal">([^<]*)</.exec(index);
pruefe("Ersatztext ueber.lokal in der index.html passt", !!ersatz && TEXTE["ueber.lokal"].de.indexOf(ersatz[1]) === 0);

// Jeder Schlüssel, den die index.html auf der Seite Cloud-Backup nennt, steht in der texte.js
const cloudSeite = index.slice(index.indexOf('id="einst-ansicht-cloud"'), index.indexOf('id="einst-ansicht-profil"'));
(cloudSeite.match(/data-t(?:-platzhalter)?="[^"]+"/g) || []).forEach(function (treffer) {
  const k = treffer.replace(/^[^"]*"|"$/g, "");
  pruefe("Schlüssel " + k + " der Seite Cloud-Backup in der texte.js", beide(k));
});

console.log(pruefungen + " Prüfungen, " + fehler + " Fehler");
process.exit(fehler > 0 ? 1 : 0);
