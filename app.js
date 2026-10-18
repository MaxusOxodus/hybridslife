  // Die Übungsdaten stehen in der uebungen.js: MUSKELGRUPPEN, BEREICHE, MUSKELN, UEBUNGEN, UEBUNGSLISTEN, ALTE_NAMEN und ALTE_IDS.
  // Die Texte der Oberfläche stehen in der texte.js: SPRACHEN und TEXTE.
  // Die Vorlagen für Trainingspläne stehen in der vorlagen.js: VORLAGEN_MUSTER und VORLAGEN_PLAENE.

  // "Folge uns" in den Einstellungen: Hier trägst du die Adressen ein, z. B. "https://www.instagram.com/deinname".
  // Solange eine Adresse leer ist, bleibt ihre Zeile ausgeblendet.
  const INSTAGRAM_URL = "https://www.instagram.com/korundapp";
  const TIKTOK_URL = "https://www.tiktok.com/@korundapp";
  const YOUTUBE_URL = "https://www.youtube.com/@korundapp";

  // Platzhalter für das, was es noch nicht gibt: der Gym-Tab und in den Einstellungen Konto, Abo und Blockierte Nutzer.
  // Mit false sind sie ausgeblendet, mit true wieder da. In der index.html tragen sie das Merkmal data-platzhalter.
  const SHOW_PLATZHALTER = false;

  // Wischgesten (seit Version 100): Alle Gesten nutzen diese Zahlen. Hier lassen sie sich nach dem Test auf dem Handy ändern.
  // Ab so vielen Pixeln steht fest, in welche Richtung der Finger wischt. Darunter gilt es noch als Tipp.
  const WISCH_SPIEL_PX = 8;
  // Ein Sheet schließt, wenn es beim Loslassen so viele Pixel nach unten gezogen ist ...
  const WISCH_SHEET_WEG_PX = 90;
  // ... oder so weit, gemessen an seiner Höhe (0.25 ist ein Viertel). Es gilt der kleinere der beiden Wege.
  const WISCH_SHEET_ANTEIL = 0.25;
  // Ein kurzer, schneller Wisch schließt auch: mindestens so viele Pixel weit ...
  const WISCH_SCHNELL_WEG_PX = 30;
  // ... und mindestens so schnell, in Pixeln pro Millisekunde (0.5 sind 500 Pixel in der Sekunde)
  const WISCH_SCHNELL_TEMPO = 0.5;
  // Das Tempo wird über die letzten so vielen Millisekunden vor dem Loslassen gemessen
  const WISCH_TEMPO_FENSTER_MS = 100;
  // So lange nach einem Wisch (in Millisekunden) zählt ein Klick des Browsers nicht als Tipp
  const WISCH_KLICK_SPERRE_MS = 400;
  // Seitlich (Übungskarte im Trainingsmodus, seit Version 134): ab so vielen Pixeln wechselt die Übung
  const WISCH_SEITE_PX = 50;
  // So nah am linken oder rechten Bildschirmrand (in Pixeln) beginnt keine seitliche Geste: Dort wischt Safari zurück
  const WISCH_RAND_PX = 24;

  // Ziele einer Woche für die Ringe auf Home (seit Version 137): Workouts (Trainingstage), Volumen in kg und Wiederholungen.
  // Sie stehen nur hier und sollen sich später einstellen lassen. In lbs wird das Volumen umgerechnet und auf volle 1.000 gerundet.
  const WOCHEN_ZIELE = { workouts: 5, volumen: 15000, wdh: 320 };

  // Die Sprache der App als Kürzel, z. B. "de" oder "en". Sie gilt für die Texte der Oberfläche
  // und für die Namen der Übungen und Muskelgruppen. Der richtige Wert kommt weiter unten,
  // sobald die Einstellungen gelesen sind.
  let sprache = "de";

  // So viele Übungen zeigt ein Bereich im Sheet sofort, der Rest steckt hinter "Mehr anzeigen"
  const TOP_ANZAHL = 7;

  // Nachschlagen ohne Suchen: Übung über ihre ID, Muskelgruppe über ihre ID,
  // und Übungs-ID über einen Namen (deutsch, englisch, Alias oder früherer Name, kleingeschrieben)
  const UEBUNG_NACH_ID = {};
  const GRUPPE_NACH_ID = {};
  const ID_NACH_NAME = {};

  // Namen, die zwei Übungen tragen, z. B. "Hip Thrust" mit Gewicht und als Eigengewicht.
  // Bei ihnen nennt die Suche zusätzlich den Bereich.
  const NAME_MEHRFACH = {};

  // Trägt einen Namen ein. Ist er schon vergeben, bleibt die erste Übung stehen.
  function nameMerken(name, id) {
    const schluessel = name.toLowerCase();
    if (!ID_NACH_NAME[schluessel]) {
      ID_NACH_NAME[schluessel] = id;
    } else if (ID_NACH_NAME[schluessel] !== id) {
      NAME_MEHRFACH[schluessel] = true;
    }
  }

  for (let i = 0; i < MUSKELGRUPPEN.length; i++) {
    GRUPPE_NACH_ID[MUSKELGRUPPEN[i].id] = MUSKELGRUPPEN[i];
  }
  for (let i = 0; i < UEBUNGEN.length; i++) {
    const u = UEBUNGEN[i];
    UEBUNG_NACH_ID[u.id] = u;
    nameMerken(u.en, u.id);
    nameMerken(u.de, u.id);
  }
  // Die Aliase kommen danach, damit ein richtiger Name immer Vorrang hat
  for (let i = 0; i < UEBUNGEN.length; i++) {
    const alias = UEBUNGEN[i].alias || [];
    for (let j = 0; j < alias.length; j++) {
      nameMerken(alias[j], UEBUNGEN[i].id);
    }
  }
  Object.keys(ALTE_NAMEN).forEach(function (name) {
    ID_NACH_NAME[name] = ALTE_NAMEN[name];
  });

  // Eigene Übungen legt man in der App selbst an. Ihre ID beginnt mit "selbst-", damit sie nie
  // mit einer festen Übung verwechselt wird. ("eigen" heißt im Code schon der Bereich Eigengewicht.)
  const SELBST_PRAEFIX = "selbst-";

  // Die Kachel "Eigene" in der Übungsauswahl. Steht dieser Wert in sheetGruppe, ist sie geöffnet.
  const KACHEL_SELBST = "selbst";
  const KACHEL_TAUSCH = "tausch";

  // So lang darf der Name einer eigenen Übung höchstens sein
  const SELBST_NAME_MAX = 60;

  // Macht aus einem Namen den Schlüssel zum Vergleichen: Groß-/Kleinschreibung, Bindestriche
  // und Leerzeichen zählen nicht. "Pull-up", "Pull up" und "pullup" ergeben alle "pullup".
  function nameSchluessel(name) {
    return String(name).toLowerCase().replace(/[\s\-‐‑‒–—]+/g, "");
  }

  // Alle Namen der festen Übungen (deutsch, englisch, Alias, früherer Name) als Schlüssel, dazu die ID.
  // Object.create(null) ist ein ganz leeres Objekt: Auch ein Name wie "constructor" findet darin nichts.
  const FESTER_NAME = Object.create(null);
  Object.keys(ID_NACH_NAME).forEach(function (name) {
    const schluessel = nameSchluessel(name);
    if (!FESTER_NAME[schluessel]) {
      FESTER_NAME[schluessel] = ID_NACH_NAME[name];
    }
  });

  // Startwerte der Zahlenfelder bei einer neuen Übung. Der für das Gewicht steht bei den Einheiten.
  const START_WDH = 10;
  const START_SAETZE = 3;

  // Liegt das letzte Training einer Übung länger zurück, schlägt der Trainingsmodus keine Steigerung vor
  const STEIGERN_PAUSE_TAGE = 21;
  // Schritt der automatischen Steigerung bei Kurzhanteln in kg (seit Version 139), sie hängen meist in 2-kg-Stufen.
  // In lbs bleibt es wie bei allen Übungen der Schritt der Gewichtsknöpfe (5 lbs).
  const KURZHANTEL_SCHRITT_KG = 2;

  // Höhe eines Wertes im Rad in Pixeln. Muss zur Höhe von .rad-wert im CSS passen.
  const RAD_HOEHE = 44;

  // So viele Trainingstage braucht eine Woche, damit sie für die Serie zählt
  const SERIE_TAGE_PRO_WOCHE = 3;

  // Aktivitäts-Raster im Profil: so viele Wochen zeigt es (53 sind gut ein Jahr)
  const RASTER_WOCHEN = 53;

  // Breite einer Spalte des Rasters in Pixeln. Muss zur Größe von .raster-feld im CSS passen.
  const RASTER_SPALTE = 15;

  // So viele Spalten braucht ein ausgeschriebener Monatsname über dem Raster
  const RASTER_MONAT_SPALTEN = 4;

  // Farbstufen des Rasters: Sie richten sich nach deinen eigenen Trainingstagen, gemessen an den Sätzen pro Tag.
  // Die drei Grenzen sind Anteile: 0.25 heißt, ein Viertel deiner Trainingstage liegt darunter.
  // Ein Tag bekommt für jede Grenze, die er erreicht, eine Stufe mehr, von 1 (hell) bis 4 (kräftig).
  const RASTER_GRENZEN = [0.25, 0.5, 0.75];

  // Nach so vielen Tagen ohne Backup-Export erinnert das Profil daran
  const BACKUP_ERINNERUNG_TAGE = 14;

  // Grenzen für Name und Benutzername im Profil
  const NAME_MAX = 30;
  const BENUTZER_MIN = 3;
  const BENUTZER_MAX = 20;

  // Die Angaben zum Geschlecht ("" heißt: keine Angabe). Die Texte stehen unter "profil.geschlecht.m" usw.
  const GESCHLECHTER = ["m", "w", "d"];

  // So viele Stufen hat das Aktivitätsniveau, von 1 (sitzend) bis 5 (extrem aktiv). 0 heißt: nicht gesetzt.
  // Name und Erklärung jeder Stufe stehen unter "profil.aktivitaet.1" und "profil.aktivitaetText.1" usw.
  const AKTIVITAET_STUFEN = 5;

  // Der früheste Geburtstag, den das Feld annimmt
  const GEBURTSTAG_MIN = "1920-01-01";

  // So viele Trainingstage zeigt der Verlauf im Profil sofort, der Rest steckt hinter "Mehr anzeigen"
  const VERLAUF_ANZAHL = 30;

  // So viele Fragen hat die FAQ. Die Texte stehen in der texte.js unter "faq.1.frage", "faq.1.antwort" usw.
  const FAQ_ANZAHL = 8;

  // Merkt sich zu jedem Rad seine Werte und welcher gerade markiert ist
  const raeder = {};

  // Die gerade sichtbare Seite
  let aktiveSeite = "home";

  // Die sichtbare Ansicht auf der Home-Seite: "home" (Übersicht) oder "log" (Eintragen und Liste)
  let homeAnsicht = "home";

  // Die gerade gewählte Übung und ihre Muskelgruppe ("" = nichts gewählt).
  // Die ID fehlt nur bei frei eingetippten Übungen aus älteren Versionen, dort bleibt sie "".
  let gewaehlteUebung = "";
  let gewaehlteGruppe = "";
  let gewaehlteUebungId = "";

  // Im Sheet geöffnete Muskelgruppe als ID ("" = Übersicht der Muskelgruppen, KACHEL_SELBST = die eigenen Übungen,
  // KACHEL_TAUSCH = die Vorschläge beim Tauschen)
  let sheetGruppe = "";

  // Wochenleiste: Montag der angezeigten Woche und der angetippte Tag (null = kein Tag gewählt)
  let angezeigterMontag = montagDerWoche(new Date());
  let gewaehlterTag = null;

  // So viele Trainingstage zeigt die Liste im Log gerade, "Mehr anzeigen" legt jeweils VERLAUF_ANZAHL drauf
  let logGezeigt = VERLAUF_ANZAHL;

  // Home: Montag der Woche, die über den Tagen gerade gezeigt wird. Er wird nicht gespeichert,
  // nach dem Öffnen der App ist es also wieder die aktuelle Woche.
  let homeMontag = montagDerWoche(new Date());

  // Merker für Probleme mit dem Speicher des Geräts. Sie stehen hier oben, weil schon beim Start gelesen und gespeichert wird.
  // eintraegeKaputt: Die gespeicherten Einträge waren nicht lesbar. kaputtGesichert: Ihr Rohtext liegt als Sicherung im Speicher.
  let eintraegeKaputt = false;
  let kaputtGesichert = false;
  // Meldungen erscheinen erst, wenn der Start durch ist: Vorher steht die Sprache noch nicht fest.
  let startFertig = false;
  // Der Dialog "Speichern hat nicht geklappt" erscheint nur einmal pro Start der App, danach nur noch der kleine Hinweis
  let speicherFehlerGemeldet = false;
  let speicherFehlerWartet = false;

  let eintraege = eintraegeLesen();

  // Wofür das Sheet gerade geöffnet ist: "log" (neuer Eintrag), "routine" (Übung zur Routine hinzufügen),
  // "tausch" (im Trainingsmodus die Übung tauschen) oder "vorlage" (in der Vorschau einer Vorlage die Übung tauschen).
  // "bibliothek" ist kein Sheet: Dann zeichnet die Auswahl in den Reiter "Übungen" im Training (siehe sheetTeil).
  let sheetZiel = "log";

  // Die zwei Reiter in der Übersicht des Trainings und der gewählte
  const TRAINING_REITER = [
    { id: "plaene", schluessel: "training.reiter.plaene" },
    { id: "uebungen", schluessel: "uebungen" }
  ];
  let trainingReiter = "plaene";

  // Routinen: jede hat eine id, einen Namen und eine Liste von Übungen mit optionalen Zielen
  let routinen = gespeichertLesen("routinen", []);
  if (!Array.isArray(routinen)) {
    routinen = [];
  }

  // Wochenplan: sieben Plätze für Montag bis Sonntag.
  // "" = nichts geplant, "ruhe" = Ruhetag, sonst die id einer Routine
  let wochenplan = gespeichertLesen("wochenplan", null);
  if (!Array.isArray(wochenplan) || wochenplan.length !== 7) {
    wochenplan = ["", "", "", "", "", "", ""];
  }

  // Das laufende Training (null = keins). Es wird nach jedem Schritt gespeichert,
  // damit es weitergehen kann, wenn das Handy die App im Hintergrund schließt.
  let laufendesTraining = gespeichertLesen("laufendesTraining", null);
  if (!laufendesTraining || !Array.isArray(laufendesTraining.uebungen) || !Array.isArray(laufendesTraining.erledigt)
    || !(laufendesTraining.index >= 0 && laufendesTraining.index < laufendesTraining.uebungen.length)) {
    laufendesTraining = null;
  }

  // Ein Training aus einer älteren Version merkt sich die Sätze noch nicht bei jeder Übung einzeln
  if (laufendesTraining) {
    trainingUmwandeln(laufendesTraining);
  }

  // Einstellungen der App: die Standard-Pause in Sekunden (pauseSekunden),
  // die Einheit für Gewichte (gewichtEinheit: "kg" oder "lbs") und für Längen (laengeEinheit: "cm" oder "ftin"),
  // die Sprache (sprache: "de" oder "en"), das Design (design: "dunkel" oder "hell"), der Stil (stil: "glass" oder "klassisch")
  // und die für die Kraft-Karte gewählte Übung (kraftUebung: { name, uebungId }).
  // Fehlt die Sprache, gilt die des Geräts. Fehlt das Design, folgt die App dem Gerät. Fehlt der Stil, gilt "Glass".
  // Fehlt die Übung, zeigt die Karte die zuletzt am häufigsten trainierte.
  let einstellungen = gespeichertLesen("einstellungen", {});
  if (!einstellungen || typeof einstellungen !== "object" || Array.isArray(einstellungen)) {
    einstellungen = {};
  }
  sprache = spracheErmitteln();

  // Das Profil: Name und Benutzername (ohne @). Beides ist leer, bis es im Profil eingetragen wird.
  let profil = profilBereinigen(gespeichertLesen("profil", {}));

  // Die laufende Pause (null = keine). "ende" ist der Zeitpunkt in Millisekunden, an dem sie vorbei ist.
  // Weil das Ende feststeht, stimmt die Restzeit auch, wenn das Handy zwischendurch gesperrt war.
  let pause = gespeichertLesen("pause", null);
  if (!pause || typeof pause.ende !== "number") {
    pause = null;
  }

  // Trainingseinheiten: Jede entsteht, wenn ein Training im Trainingsmodus beendet wird.
  // Sie merkt sich Start, Ende, die Routine und die ids der Einträge, die dabei gespeichert wurden.
  let trainings = gespeichertLesen("trainings", []);
  if (!Array.isArray(trainings)) {
    trainings = [];
  }

  // Körpergewicht: eine Liste von Messungen mit Datum und Gewicht, die älteste zuerst. Pro Tag gibt es eine.
  // Wer mag, gibt zum Gewicht das Körperfett in Prozent an (koerperfett). Ohne Angabe fehlt das Feld.
  let koerpergewicht = gespeichertLesen("koerpergewicht", []);
  if (!Array.isArray(koerpergewicht)) {
    koerpergewicht = [];
  }

  // Zählt bei jeder neuen id hoch, damit auch zwei ids aus derselben Millisekunde verschieden sind
  let idZaehler = 0;

  // Eigene Übungen: Jede hat eine id ("selbst-…"), einen Namen, den Bereich ("maschine", "frei" oder "eigen"),
  // die Hauptmuskelgruppe (haupt) und eine Liste von Hilfsmuskelgruppen (hilfs).
  // selbstListe enthält dieselben Übungen in der Form der festen Übungen aus UEBUNGEN (mit "de" und "en"),
  // damit der Rest der App sie genauso behandeln kann.
  let eigeneUebungen = [];
  let selbstListe = [];
  eigeneUebungenAufnehmen(gespeichertLesen("eigeneUebungen", []));

  // Die ids gelöschter eigener Eigengewicht-Übungen (seit Version 105). Ihre alten Einträge rechnen damit
  // weiter mit dem Körpergewicht, siehe istEigengewicht. Im Backup stehen sie ab Backup-Version 11.
  let geloeschteEigengewicht = [];

  // Notizen je Übung (seit Version 141): { schluessel: text }. Schlüssel ist die ID der Übung, bei Übungen ohne ID "name:" und der Name.
  let notizen = gespeichertLesen("notizen", {});
  if (!notizen || typeof notizen !== "object" || Array.isArray(notizen)) {
    notizen = {};
  }
  geloeschteEigengewichtAufnehmen(gespeichertLesen("geloeschteEigengewicht", []));

  // Gespeicherte Daten aus älteren Versionen kennen nur Übungsnamen: einmal die feste ID ergänzen
  gespeicherteDatenZuordnen();

  // Die sichtbare Ansicht im Training-Tab: "uebersicht", "varianten" und "vorschau" (Vorlagen),
  // "bearbeiten", "modus" oder "fertig"
  let trainingAnsicht = "uebersicht";

  // Arbeitskopie der Routine, die gerade bearbeitet wird. Erst "Routine speichern" übernimmt sie.
  let bearbeiteteRoutine = null;

  // Eingabe im Trainingsmodus (Gewicht, Wdh., RIR), solange die Training-Seite ausgeblendet ist
  let gemerkteTrainingWerte = null;

  // Die im Trainingsmodus gewählten Reps in Reserve für den nächsten Satz: 0 bis 4 (4 heißt "4 oder mehr"), null = keine Angabe
  let gewaehlterRir = null;

  // Liest einen gespeicherten Wert. Fehlt er oder ist er kaputt, gilt der Ersatzwert.
  function gespeichertLesen(schluessel, ersatz) {
    try {
      const wert = JSON.parse(localStorage.getItem(schluessel));
      if (wert === null) {
        return ersatz;
      }
      return wert;
    } catch (fehler) {
      return ersatz;
    }
  }

  // Speichert einen Wert als JSON-Text und gibt zurück, ob es geklappt hat. Ein Fehler (z. B. Speicher voll)
  // bricht die laufende Aktion nicht ab, sondern wird gemeldet.
  function sicherSpeichern(schluessel, wert) {
    try {
      localStorage.setItem(schluessel, JSON.stringify(wert));
      return true;
    } catch (fehler) {
      speicherFehlerMelden();
      return false;
    }
  }

  // Meldet, dass das Speichern nicht geklappt hat: beim ersten Mal mit einem Dialog, danach nur mit dem kleinen Hinweis
  function speicherFehlerMelden() {
    if (!startFertig) {
      speicherFehlerWartet = true;
      return;
    }
    if (speicherFehlerGemeldet) {
      document.getElementById("speicher-hinweis").classList.add("sichtbar");
      return;
    }
    speicherFehlerGemeldet = true;
    frageZeigen(txt("speicher.fehlerTitel"), txt("speicher.fehlerText"), [{ text: txt("ok"), art: "haupt" }]);
  }

  function speicherHinweisSchliessen() {
    document.getElementById("speicher-hinweis").classList.remove("sichtbar");
  }

  // Liest die gespeicherten Einträge. Ist der Wert kaputt (nicht lesbar oder keine Liste), startet die App
  // mit einer leeren Liste, und der Rohtext wird vorher gesichert, damit nichts verloren geht.
  function eintraegeLesen() {
    const leer = [];
    const liste = gespeichertLesen("eintraege", leer);
    if (liste !== leer && Array.isArray(liste)) {
      return liste;
    }
    let roh = null;
    try {
      roh = localStorage.getItem("eintraege");
    } catch (fehler) {
      return leer;
    }
    // Noch nie etwas gespeichert: Das ist kein Fehler
    if (roh === null || roh === "null") {
      return leer;
    }
    eintraegeKaputt = true;
    kaputtGesichert = rohtextSichern(roh);
    return leer;
  }

  // Legt den Rohtext der kaputten Einträge unter "eintraegeKaputt" ab. Liegt dort schon eine frühere Sicherung,
  // bleibt sie stehen und die neue kommt unter "eintraegeKaputt2". Gibt zurück, ob der Rohtext gesichert ist.
  function rohtextSichern(roh) {
    try {
      let ziel = "eintraegeKaputt";
      const frueher = localStorage.getItem(ziel);
      if (frueher === roh || localStorage.getItem("eintraegeKaputt2") === roh) {
        return true;
      }
      if (frueher !== null) {
        ziel = "eintraegeKaputt2";
      }
      try {
        localStorage.setItem(ziel, roh);
        return true;
      } catch (fehler) {
        // Kein Platz für eine Kopie: den Rohtext stattdessen verschieben. Klappt auch das nicht, kommt er zurück an seinen Platz.
        localStorage.removeItem("eintraege");
        try {
          localStorage.setItem(ziel, roh);
          return true;
        } catch (fehler2) {
          localStorage.setItem("eintraege", roh);
          return false;
        }
      }
    } catch (fehler) {
      return false;
    }
  }

  // Zeigt nach dem Start, was beim Lesen und Speichern schiefging, eine Meldung nach der anderen.
  // Danach kommt die Frage nach einem unfertigen Training noch einmal, weil die Meldungen sie überdeckt haben.
  function startMeldungenZeigen() {
    const meldungen = [];
    if (eintraegeKaputt) {
      meldungen.push({
        titel: txt("speicher.kaputtTitel"),
        text: txt(kaputtGesichert ? "speicher.kaputtText" : "speicher.kaputtNichtGesichert")
      });
    }
    if (speicherFehlerWartet) {
      speicherFehlerGemeldet = true;
      meldungen.push({ titel: txt("speicher.fehlerTitel"), text: txt("speicher.fehlerText") });
    }
    if (meldungen.length === 0) {
      return;
    }
    function naechste() {
      if (meldungen.length === 0) {
        trainingBeimStartPruefen();
        return;
      }
      const m = meldungen.shift();
      frageZeigen(m.titel, m.text, [{ text: txt("ok"), art: "haupt", aktion: naechste }]);
    }
    naechste();
  }

  // ---------- Übungen nachschlagen ----------

  // Die ID der Muskelgruppe, bei der eine Übung steht: die Gruppe ihres Hauptmuskels
  function uebungGruppe(u) {
    return MUSKELN[u.haupt].gruppe;
  }

  // Ist das die ID einer festen Übung, einer heutigen oder einer früheren?
  function istFesteId(id) {
    const u = UEBUNG_NACH_ID[id];
    return (Boolean(u) && !u.selbst) || Object.prototype.hasOwnProperty.call(ALTE_IDS, id);
  }

  // Entfernt Leerzeichen am Rand eines Namens und macht aus mehreren hintereinander eins
  function nameSaeubern(name) {
    return String(name).trim().replace(/\s+/g, " ");
  }

  // Prüft eine eigene Übung aus dem Speicher oder einem Backup und gibt eine saubere Kopie zurück,
  // oder null, wenn sie unbrauchbar ist
  function eigeneUebungBereinigen(u) {
    if (!u || typeof u !== "object" || typeof u.id !== "string" || typeof u.name !== "string") {
      return null;
    }
    const name = nameSaeubern(u.name);
    if (u.id.indexOf(SELBST_PRAEFIX) !== 0 || u.id.length === SELBST_PRAEFIX.length || istFesteId(u.id)
      || nameSchluessel(name) === "" || name.length > SELBST_NAME_MAX
      || bereichName(u.bereich) === "" || !GRUPPE_NACH_ID[u.haupt]) {
      return null;
    }

    const sauber = { id: u.id, name: name, bereich: u.bereich, haupt: u.haupt, hilfs: [] };
    if (Array.isArray(u.hilfs)) {
      for (let i = 0; i < u.hilfs.length; i++) {
        if (GRUPPE_NACH_ID[u.hilfs[i]] && u.hilfs[i] !== u.haupt && sauber.hilfs.indexOf(u.hilfs[i]) === -1) {
          sauber.hilfs.push(u.hilfs[i]);
        }
      }
    }
    return sauber;
  }

  // Nimmt eigene Übungen aus einer Liste auf (aus dem Speicher oder einem Backup). Übersprungen wird,
  // was unbrauchbar ist, wessen ID es schon gibt und wessen Name schon vergeben ist: Die vorhandene Übung bleibt.
  // Gibt zurück, wie viele dazugekommen sind.
  function eigeneUebungenAufnehmen(liste) {
    if (!Array.isArray(liste)) {
      return 0;
    }
    let anzahl = 0;
    for (let i = 0; i < liste.length; i++) {
      const u = eigeneUebungBereinigen(liste[i]);
      if (u && !UEBUNG_NACH_ID[u.id] && !uebungMitNamen(u.name, "")) {
        eigeneUebungen.push(u);
        eigeneUebungenEintragen();
        anzahl++;
      }
    }
    return anzahl;
  }

  // Nimmt ids gelöschter Eigengewicht-Übungen aus einer Liste auf (aus dem Speicher oder einem Backup).
  // Übersprungen wird, was keine id einer eigenen Übung ist oder schon in der Liste steht.
  function geloeschteEigengewichtAufnehmen(liste) {
    if (!Array.isArray(liste)) {
      return;
    }
    for (let i = 0; i < liste.length; i++) {
      const id = liste[i];
      if (typeof id === "string" && id.indexOf(SELBST_PRAEFIX) === 0 && geloeschteEigengewicht.indexOf(id) === -1) {
        geloeschteEigengewicht.push(id);
      }
    }
  }

  // Führt die eigenen Übungen mit den festen zusammen: Sie kommen in UEBUNG_NACH_ID und in selbstListe.
  // Muss nach jeder Änderung an eigeneUebungen laufen.
  function eigeneUebungenEintragen() {
    for (let i = 0; i < selbstListe.length; i++) {
      delete UEBUNG_NACH_ID[selbstListe[i].id];
    }

    selbstListe = [];
    for (let i = 0; i < eigeneUebungen.length; i++) {
      const e = eigeneUebungen[i];
      // Eigene Übungen haben nur einen Namen, er gilt in jeder Sprache.
      // Die ID der Muskelgruppe ist zugleich ein Muskel aus MUSKELN.
      const u = { id: e.id, de: e.name, en: e.name, bereich: e.bereich, haupt: e.haupt, hilfs: e.hilfs, auch: [], selbst: true };
      selbstListe.push(u);
      UEBUNG_NACH_ID[u.id] = u;
    }
    selbstListe.sort(function (a, b) {
      return a.de.localeCompare(b.de);
    });
  }

  // Speichert die eigenen Übungen und führt sie neu mit den festen zusammen
  function eigeneUebungenSpeichern() {
    sicherSpeichern("eigeneUebungen", eigeneUebungen);
    eigeneUebungenEintragen();
  }

  // Sucht eine eigene Übung über ihre id. Gibt null zurück, wenn es sie nicht gibt.
  function eigeneUebungFinden(id) {
    for (let i = 0; i < eigeneUebungen.length; i++) {
      if (eigeneUebungen[i].id === id) {
        return eigeneUebungen[i];
      }
    }
    return null;
  }

  // Die Übung, die diesen Namen schon trägt: eine feste (Name, Alias oder früherer Name) oder eine eigene.
  // ohneId lässt eine eigene Übung aus, nämlich die, die gerade bearbeitet wird. Ist der Name frei: null.
  function uebungMitNamen(name, ohneId) {
    const schluessel = nameSchluessel(name);
    if (FESTER_NAME[schluessel] && UEBUNG_NACH_ID[FESTER_NAME[schluessel]]) {
      return UEBUNG_NACH_ID[FESTER_NAME[schluessel]];
    }
    for (let i = 0; i < selbstListe.length; i++) {
      if (selbstListe[i].id !== ohneId && nameSchluessel(selbstListe[i].de) === schluessel) {
        return selbstListe[i];
      }
    }
    return null;
  }

  // Eine neue ID für eine eigene Übung. Sie beginnt mit "selbst-" und wird trotzdem gegen
  // die festen Übungen, die früheren IDs und die vorhandenen eigenen Übungen geprüft.
  function neueSelbstId() {
    let id;
    do {
      idZaehler++;
      id = SELBST_PRAEFIX + Date.now().toString(36) + "-" + idZaehler + "-" + Math.floor(Math.random() * 1000000);
    } while (istFesteId(id) || UEBUNG_NACH_ID[id]);
    return id;
  }

  // Ruft die Funktion für jede Stelle auf, an der eine Übung gespeichert ist: für jeden Eintrag,
  // jede Übung einer Routine (auch der gerade bearbeiteten) und des laufenden Trainings.
  // Die Funktion bekommt das Objekt und den Namen des Feldes, in dem der Übungsname steht.
  function jedeGespeicherteUebung(funktion) {
    for (let i = 0; i < eintraege.length; i++) {
      if (eintraege[i] && typeof eintraege[i].uebung === "string") {
        funktion(eintraege[i], "uebung");
      }
    }

    const listen = [];
    for (let i = 0; i < routinen.length; i++) {
      if (routinen[i] && Array.isArray(routinen[i].uebungen)) {
        listen.push(routinen[i].uebungen);
      }
    }
    if (bearbeiteteRoutine) {
      listen.push(bearbeiteteRoutine.uebungen);
    }
    if (laufendesTraining) {
      const trainingListen = trainingUebungListen();
      for (let i = 0; i < trainingListen.length; i++) {
        listen.push(trainingListen[i]);
      }
    }
    for (let i = 0; i < listen.length; i++) {
      for (let j = 0; j < listen[i].length; j++) {
        if (listen[i][j] && typeof listen[i][j].name === "string") {
          funktion(listen[i][j], "name");
        }
      }
    }
  }

  // Die Listen des laufenden Trainings, in denen Übungen stehen: seine Plätze und an jedem Platz
  // die Übungen, die dort vor einem Tausch dran waren
  function trainingUebungListen() {
    const listen = [laufendesTraining.uebungen];
    for (let i = 0; i < laufendesTraining.uebungen.length; i++) {
      if (Array.isArray(laufendesTraining.uebungen[i].getauscht)) {
        listen.push(laufendesTraining.uebungen[i].getauscht);
      }
    }
    return listen;
  }

  // Speichert alles, was jedeGespeicherteUebung durchgeht
  function gespeicherteUebungenSichern() {
    sicherSpeichern("eintraege", eintraege);
    routinenSpeichern();
    trainingMerken();
  }

  // Schreibt Name und Muskelgruppe einer eigenen Übung an eine gespeicherte Stelle und hängt sie über die ID an.
  // Angezeigt wird der Name über die ID. Der gespeicherte Name ist die Reserve, falls die Übung gelöscht wird.
  function eigeneUebungZuweisen(objekt, feld, uebung) {
    objekt.uebungId = uebung.id;
    objekt[feld] = uebung.name;
    objekt.muskelgruppe = GRUPPE_NACH_ID[uebung.haupt].de;
  }

  // Gehört diese gespeicherte Stelle zu keiner Übung? Das gilt ohne ID und mit der ID einer gelöschten eigenen Übung.
  function ohneUebung(objekt) {
    if (!objekt.uebungId) {
      return true;
    }
    return String(objekt.uebungId).indexOf(SELBST_PRAEFIX) === 0 && !UEBUNG_NACH_ID[objekt.uebungId];
  }

  // Baut alles neu auf, was Übungsnamen zeigt, z. B. nach dem Umbenennen einer eigenen Übung
  function uebungenNeuAnzeigen() {
    uebungFeldAktualisieren();
    letztesMalAnzeigen();
    anzeigen();
    homeAnzeigen();
    trainingAnzeigen();
    if (bearbeiteteRoutine && trainingAnsicht === "bearbeiten") {
      routineUebungenAnzeigen();
    }
  }

  // Der Name zum Anzeigen. Bei festen und eigenen Übungen kommt er über die ID (bei festen in der
  // eingestellten Sprache). Ohne ID oder nach dem Löschen einer eigenen Übung gilt der gespeicherte Name.
  function anzeigeName(name, id) {
    return uebungName(id) || name;
  }

  // Der Name einer Übung aus der Übungsliste in der eingestellten Sprache. Unbekannte ID: "".
  function uebungName(id) {
    const u = UEBUNG_NACH_ID[id];
    if (u) {
      return u[sprache];
    }
    return "";
  }

  // Dasselbe für die Muskelgruppe: über die ID der Übung, sonst die gespeicherte Gruppe
  function anzeigeGruppe(gruppe, id) {
    const u = UEBUNG_NACH_ID[id];
    if (u) {
      return GRUPPE_NACH_ID[uebungGruppe(u)][sprache];
    }
    return gruppe;
  }

  // Ergänzt bei einem Eintrag oder einer Routinen-Übung die feste ID, wenn der Name bekannt ist.
  // Gibt true zurück, wenn etwas ergänzt wurde. Der gespeicherte Name bleibt unverändert.
  // Eine ID, die es nicht mehr gibt, weil zwei Übungen zusammengelegt wurden, wird auf die heutige umgestellt.
  function idErgaenzen(objekt, name) {
    if (objekt && typeof objekt.uebungId === "string" && ALTE_IDS[objekt.uebungId]) {
      objekt.uebungId = ALTE_IDS[objekt.uebungId];
      return true;
    }
    if (!objekt || objekt.uebungId || typeof name !== "string") {
      return false;
    }
    const id = ID_NACH_NAME[name.trim().toLowerCase()];
    if (!id) {
      return false;
    }
    objekt.uebungId = id;
    return true;
  }

  // Dasselbe für eine ganze Liste von Einträgen (Feld "uebung") oder Routinen-Übungen (Feld "name")
  function listeZuordnen(liste, feld) {
    let geaendert = false;
    for (let i = 0; i < liste.length; i++) {
      if (liste[i] && idErgaenzen(liste[i], liste[i][feld])) {
        geaendert = true;
      }
    }
    return geaendert;
  }

  // Gibt jedem Eintrag ohne eigene id eine. Über diese id merkt sich eine Trainingseinheit ihre Einträge.
  // Gibt true zurück, wenn etwas ergänzt wurde.
  function eintragIdsErgaenzen(liste) {
    let geaendert = false;
    for (let i = 0; i < liste.length; i++) {
      if (liste[i] && (typeof liste[i].id !== "string" || liste[i].id === "")) {
        liste[i].id = neueId("e");
        geaendert = true;
      }
    }
    return geaendert;
  }

  // Geht beim Start einmal durch Einträge, Routinen und das laufende Training.
  // Gespeichert wird nur, wenn wirklich etwas ergänzt wurde.
  function gespeicherteDatenZuordnen() {
    // Beide Schritte laufen immer, gespeichert wird einmal
    const uebungenErgaenzt = listeZuordnen(eintraege, "uebung");
    const idsErgaenzt = eintragIdsErgaenzen(eintraege);
    if (uebungenErgaenzt || idsErgaenzt) {
      sicherSpeichern("eintraege", eintraege);
    }

    let routinenGeaendert = false;
    for (let i = 0; i < routinen.length; i++) {
      if (routinen[i] && Array.isArray(routinen[i].uebungen) && listeZuordnen(routinen[i].uebungen, "name")) {
        routinenGeaendert = true;
      }
    }
    if (routinenGeaendert) {
      sicherSpeichern("routinen", routinen);
    }

    if (laufendesTraining) {
      let trainingGeaendert = false;
      const trainingListen = trainingUebungListen();
      for (let i = 0; i < trainingListen.length; i++) {
        if (listeZuordnen(trainingListen[i], "name")) {
          trainingGeaendert = true;
        }
      }
      if (trainingGeaendert) {
        sicherSpeichern("laufendesTraining", laufendesTraining);
      }
    }

    // Die für die Kraft-Karte gewählte Übung: Ist sie unbrauchbar gespeichert, gilt wieder "Automatisch"
    const wahl = kraftUebungBereinigen(einstellungen.kraftUebung);
    if (wahl) {
      einstellungen.kraftUebung = wahl;
    } else {
      delete einstellungen.kraftUebung;
    }
  }

  // Macht aus einer gespeicherten oder importierten Wahl für die Kraft-Karte eine saubere: Name und ID der Übung.
  // Eine frühere ID wird wie bei den Einträgen auf die heutige umgestellt. Ohne brauchbaren Namen: null.
  function kraftUebungBereinigen(wahl) {
    if (!wahl || typeof wahl !== "object" || typeof wahl.name !== "string" || wahl.name.trim() === "") {
      return null;
    }
    const sauber = { name: wahl.name, uebungId: "" };
    if (typeof wahl.uebungId === "string") {
      sauber.uebungId = wahl.uebungId;
    }
    idErgaenzen(sauber, sauber.name);
    return sauber;
  }

  // Passt ein Eintrag zu einer Übung? Mit ID zählt die ID, sonst der Name.
  function gleicheUebung(eintrag, name, id) {
    if (id && eintrag.uebungId) {
      return eintrag.uebungId === id;
    }
    return eintrag.uebung.trim().toLowerCase() === name.trim().toLowerCase();
  }

  // Macht aus einer Zahl Text in der Schreibweise der Sprache: 82.5 wird auf Deutsch "82,5"
  function zahlText(wert) {
    const komma = (1.5).toLocaleString(gebiet()).charAt(1);
    return String(wert).replace(".", komma);
  }

  // ---------- Sprache ----------

  // Gibt es diese Sprache in der Liste SPRACHEN?
  function spracheBekannt(id) {
    for (let i = 0; i < SPRACHEN.length; i++) {
      if (SPRACHEN[i].id === id) {
        return true;
      }
    }
    return false;
  }

  // Die Sprache der App: die im Profil gewählte, sonst die des Geräts.
  // Ist das Gerät auf eine Sprache eingestellt, die die App nicht kennt, gilt Englisch.
  function spracheErmitteln() {
    if (spracheBekannt(einstellungen.sprache)) {
      return einstellungen.sprache;
    }
    const geraet = (navigator.language || "").toLowerCase();
    for (let i = 0; i < SPRACHEN.length; i++) {
      if (geraet.indexOf(SPRACHEN[i].id) === 0) {
        return SPRACHEN[i].id;
      }
    }
    return "en";
  }

  // Der Eintrag der eingestellten Sprache aus der Liste SPRACHEN
  function spracheDaten() {
    for (let i = 0; i < SPRACHEN.length; i++) {
      if (SPRACHEN[i].id === sprache) {
        return SPRACHEN[i];
      }
    }
    return SPRACHEN[0];
  }

  // Das Gebiet, nach dem Zahlen und Datum geschrieben werden, z. B. "de-DE" oder "en-US".
  // Passt die Sprache des Geräts zur Sprache der App, gilt das Gebiet des Geräts.
  function gebiet() {
    const geraet = navigator.language || "";
    if (geraet.toLowerCase().indexOf(sprache) === 0) {
      return geraet;
    }
    return spracheDaten().gebiet;
  }

  // Holt einen Text aus der Tabelle TEXTE (texte.js) in der eingestellten Sprache.
  // werte füllt die Platzhalter: txt("modus.satz", { n: 2 }) macht aus "Satz {n}" den Text "Satz 2".
  // Fehlt die Übersetzung, kommt der deutsche Text. Fehlt der Schlüssel ganz, kommt der Schlüssel selbst.
  function txt(schluessel, werte) {
    const eintrag = TEXTE[schluessel];
    let text = schluessel;
    if (eintrag) {
      text = eintrag[sprache] || eintrag.de;
    }
    if (werte) {
      Object.keys(werte).forEach(function (name) {
        text = text.split("{" + name + "}").join(String(werte[name]));
      });
    }
    return text;
  }

  // Dasselbe für Texte mit Einzahl und Mehrzahl: Bei genau 1 gilt der Schlüssel mit ".eins",
  // sonst der mit ".viele". Die Anzahl steht im Text als {n}.
  function txtAnzahl(schluessel, anzahl, werte) {
    const alle = { n: anzahl };
    if (werte) {
      Object.keys(werte).forEach(function (name) {
        alle[name] = werte[name];
      });
    }
    if (Number(anzahl) === 1) {
      return txt(schluessel + ".eins", alle);
    }
    return txt(schluessel + ".viele", alle);
  }

  // Setzt die festen Texte der index.html in der eingestellten Sprache ein. Jedes Element nennt seinen
  // Schlüssel: data-t für den Text, data-t-aria für die Ansage (aria-label), data-t-platzhalter für den Platzhalter.
  function texteEinsetzen() {
    document.documentElement.lang = sprache;
    const mitText = document.querySelectorAll("[data-t]");
    for (let i = 0; i < mitText.length; i++) {
      mitText[i].textContent = txt(mitText[i].getAttribute("data-t"));
    }
    const mitAnsage = document.querySelectorAll("[data-t-aria]");
    for (let i = 0; i < mitAnsage.length; i++) {
      mitAnsage[i].setAttribute("aria-label", txt(mitAnsage[i].getAttribute("data-t-aria")));
    }
    const mitPlatzhalter = document.querySelectorAll("[data-t-platzhalter]");
    for (let i = 0; i < mitPlatzhalter.length; i++) {
      mitPlatzhalter[i].placeholder = txt(mitPlatzhalter[i].getAttribute("data-t-platzhalter"));
    }
  }

  // Einstellungen: der Umschalter für die Sprache
  function spracheAnzeigen() {
    const auswahl = [];
    for (let i = 0; i < SPRACHEN.length; i++) {
      auswahl.push({ id: SPRACHEN[i].id, text: SPRACHEN[i].name });
    }
    umschalterBauen(document.getElementById("sprache-auswahl"), auswahl, sprache, spracheSetzen);
  }

  // Wechselt die Sprache und baut alles neu auf, was gerade Text zeigt
  function spracheSetzen(neu) {
    if (neu === sprache || !spracheBekannt(neu)) {
      return;
    }
    einstellungen.sprache = neu;
    einstellungenSpeichern();
    sprache = neu;

    texteEinsetzen();
    document.getElementById("kopfzeile").textContent = document.querySelector("#seite-" + aktiveSeite + " h1").textContent;
    // Die Zahlenfelder schreiben ihre Werte neu, weil sich Komma und Punkt unterscheiden
    Object.keys(felder).forEach(function (id) {
      feldSetzen(id, felder[id].wert);
    });
    spracheAnzeigen();
    designAnzeigen();
    stilAnzeigen();
    akzentAnzeigen();
    paletteAnzeigen();
    farbweltAnzeigen();
    einstTitelAnzeigen();
    einstWerteAnzeigen();
    einheitenAnwenden();
    einheitenAnzeigen();
    wochenleisteAnzeigen();
    uebungFeldAktualisieren();
    letztesMalAnzeigen();
    anzeigen();
    homeAnzeigen();
    trainingAnzeigen();
    pauseAnzeigen();
    if (bearbeiteteRoutine && trainingAnsicht === "bearbeiten") {
      bearbeitenTitelAnzeigen();
      routineUebungenAnzeigen();
    }
  }

  // ---------- Einheiten ----------

  // Gespeichert wird immer in kg. Nur zum Anzeigen und Eingeben wird in die gewählte Einheit umgerechnet.
  const LBS_JE_KG = 2.20462262;

  // Je Einheit: höchstes Trainingsgewicht, Schritt der Schnellbuttons, Startwert der Gewichtsfelder
  // und die Grenzen für das Körpergewicht
  const GEWICHT_EINHEITEN = {
    kg: { max: 400, schritt: 2.5, start: 20, koerperMin: 30, koerperMax: 200 },
    lbs: { max: 880, schritt: 5, start: 45, koerperMin: 66, koerperMax: 440 }
  };

  // Die Auswahl im Profil
  const GEWICHT_AUSWAHL = [
    { id: "kg", text: "kg" },
    { id: "lbs", text: "lbs" }
  ];
  const LAENGE_AUSWAHL = [
    { id: "cm", text: "cm" },
    { id: "ftin", text: "ft-in" }
  ];

  // Die gewählte Einheit für Gewichte: "kg" oder "lbs"
  function einheit() {
    if (einstellungen.gewichtEinheit === "lbs") {
      return "lbs";
    }
    return "kg";
  }

  // Die gewählte Einheit für Längen: "cm" oder "ftin". Sie gilt für spätere Körpermaße.
  function laengeEinheit() {
    if (einstellungen.laengeEinheit === "ftin") {
      return "ftin";
    }
    return "cm";
  }

  function einstellungenSpeichern() {
    sicherSpeichern("einstellungen", einstellungen);
  }

  // Rechnet ein Gewicht aus kg in die gewählte Einheit um, ohne zu runden
  function ausKg(kg) {
    if (einheit() === "lbs") {
      return kg * LBS_JE_KG;
    }
    return kg;
  }

  // Rechnet eine Eingabe in der gewählten Einheit in kg um. Vier Nachkommastellen,
  // damit aus 135 lbs beim Zurückrechnen wieder genau 135 lbs werden.
  function zuKg(wert) {
    if (einheit() === "lbs") {
      return Math.round(wert / LBS_JE_KG * 10000) / 10000;
    }
    return wert;
  }

  // Ein Trainingsgewicht als Zahl in der gewählten Einheit, auf zwei Nachkommastellen
  function gewichtAnzeige(kg) {
    return Math.round(ausKg(kg) * 100) / 100;
  }

  // Ein Trainingsgewicht als Text mit Einheit, z. B. "80 kg" oder "176,37 lbs"
  function gewichtText(kg) {
    const zahl = Number(String(kg).replace(",", "."));
    if (isNaN(zahl)) {
      return zahlText(kg) + " " + einheit();
    }
    return zahlText(gewichtAnzeige(zahl)) + " " + einheit();
  }

  // Bewegtes Gewicht als Text, z. B. "12.400 kg". In lbs auf ganze Pfund gerundet.
  function volumenText(kg) {
    let wert = kg;
    if (einheit() === "lbs") {
      wert = Math.round(ausKg(kg));
    }
    return wert.toLocaleString(gebiet()) + " " + einheit();
  }

  // Der Startwert der Gewichtsfelder in kg
  function startGewicht() {
    return zuKg(GEWICHT_EINHEITEN[einheit()].start);
  }

  // Der Wert eines Gewichtsfeldes in kg
  function gewichtFeldWert(id) {
    return zuKg(feldWert(id));
  }

  // Schreibt ein Gewicht in kg in ein Gewichtsfeld. Ist es keine Zahl, bleibt das Feld, wie es war.
  function gewichtFeldSetzen(id, kg) {
    const zahl = Number(String(kg).replace(",", "."));
    if (String(kg).trim() === "" || isNaN(zahl)) {
      return;
    }
    feldSetzen(id, gewichtAnzeige(zahl));
  }

  // Die Schnellbuttons am Gewicht: ein Schritt leichter (-1) oder schwerer (1)
  function gewichtAendern(id, richtung) {
    feldAendern(id, richtung * GEWICHT_EINHEITEN[einheit()].schritt);
  }

  // Stellt alles auf die gewählte Einheit ein: Grenzen der Gewichtsfelder, Beschriftungen,
  // Schnellbuttons und das Rad für das Körpergewicht
  function einheitenAnwenden() {
    const e = GEWICHT_EINHEITEN[einheit()];
    felder["feld-gewicht"].max = e.max;
    felder["t-feld-gewicht"].max = e.max;
    felder["s-feld-gewicht"].max = e.max;
    document.getElementById("feld-gewicht").setAttribute("aria-label", txt("gewicht.in", { einheit: einheit() }));
    document.getElementById("t-feld-gewicht").setAttribute("aria-label", txt("gewicht.in", { einheit: einheit() }));
    document.getElementById("s-feld-gewicht").setAttribute("aria-label", txt("gewicht.in", { einheit: einheit() }));

    const titel = document.querySelectorAll(".gewicht-titel");
    for (let i = 0; i < titel.length; i++) {
      titel[i].textContent = txt("gewicht.titel", { einheit: einheit() });
    }
    gewichtTitelAnzeigen();
    const weniger = document.querySelectorAll(".gewicht-weniger");
    for (let i = 0; i < weniger.length; i++) {
      weniger[i].textContent = "−" + zahlText(e.schritt);
      weniger[i].setAttribute("aria-label", txt("gewicht.weniger", { schritt: zahlText(e.schritt), einheit: einheit() }));
    }
    const mehr = document.querySelectorAll(".gewicht-mehr");
    for (let i = 0; i < mehr.length; i++) {
      mehr[i].textContent = "+" + zahlText(e.schritt);
      mehr[i].setAttribute("aria-label", txt("gewicht.mehr", { schritt: zahlText(e.schritt), einheit: einheit() }));
    }

    // Körpergewicht in Schritten von 0,1
    const koerpergewichte = [];
    for (let i = e.koerperMin * 10; i <= e.koerperMax * 10; i++) {
      koerpergewichte.push(i / 10);
    }
    radBauen("rad-koerpergewicht", koerpergewichte, null);
  }

  // Wird bei dieser Übung das Gewicht einer einzelnen Kurzhantel eingetragen? Das gilt für alle Übungen,
  // die "Kurzhantel" im Namen tragen, und für die, deren Kraft-Rang mit Kurzhanteln rechnet (Feld "rang").
  function proHantel(id) {
    const u = UEBUNG_NACH_ID[id];
    if (!u) {
      return false;
    }
    if (u.rang && (u.rang.zaehlung === "summe" || u.rang.zaehlung === "proSeite")) {
      return true;
    }
    return /kurzhantel/i.test(u.de) || /dumbbell/i.test(u.en);
  }

  // Schreibt den Titel über ein Gewichtsfeld: "Gewicht (kg)", bei Kurzhantel-Übungen "Gewicht pro Hantel (kg)".
  // Der Titel ist das Element direkt vor dem Feld.
  function gewichtTitelSetzen(feldId, uebungId) {
    let schluessel = "gewicht.titel";
    if (proHantel(uebungId)) {
      schluessel = "gewicht.titelHantel";
    }
    document.getElementById(feldId).previousElementSibling.textContent = txt(schluessel, { einheit: einheit() });
    // Look Korund (seit Version 142): Über dem Feld steht dort nur die Einheit, z. B. "KG"
    document.getElementById(feldId).previousElementSibling.setAttribute("data-kurz", einheit().toUpperCase());
  }

  // Die Titel aller drei Gewichtsfelder passend zu ihrer Übung: im Log, im Trainingsmodus und im Sheet "Satz bearbeiten"
  function gewichtTitelAnzeigen() {
    gewichtTitelSetzen("feld-gewicht", gewaehlteUebungId);
    let imModus = "";
    if (laufendesTraining && laufendesTraining.uebungen[laufendesTraining.index]) {
      imModus = laufendesTraining.uebungen[laufendesTraining.index].uebungId;
    }
    gewichtTitelSetzen("t-feld-gewicht", imModus);
    const eintrag = eintragFinden(satzEintragId);
    let imSheet = "";
    if (eintrag) {
      imSheet = eintrag.uebungId;
    }
    gewichtTitelSetzen("s-feld-gewicht", imSheet);
  }

  // Wechselt die Einheit für Gewichte. Was gerade in den Gewichtsfeldern steht, wird umgerechnet.
  function gewichtEinheitSetzen(neu) {
    if (neu === einheit()) {
      return;
    }
    let imLog = gewichtFeldWert("feld-gewicht");
    let imModus = gewichtFeldWert("t-feld-gewicht");
    const alterStart = startGewicht();
    einstellungen.gewichtEinheit = neu;
    einstellungenSpeichern();

    // Steht in einem Feld noch der Startwert, bekommt es den runden Startwert der neuen Einheit
    if (imLog === alterStart) {
      imLog = startGewicht();
    }
    if (imModus === alterStart) {
      imModus = startGewicht();
    }
    einheitenAnwenden();
    gewichtFeldSetzen("feld-gewicht", imLog);
    gewichtFeldSetzen("t-feld-gewicht", imModus);
    einheitenAnzeigen();
    anzeigen();
    letztesMalAnzeigen();
  }

  // Einstellungen: die Umschalter für Gewicht und Länge
  function einheitenAnzeigen() {
    umschalterBauen(document.getElementById("einheit-gewicht"), GEWICHT_AUSWAHL, einheit(), gewichtEinheitSetzen);
    umschalterBauen(document.getElementById("einheit-laenge"), LAENGE_AUSWAHL, laengeEinheit(), function (neu) {
      einstellungen.laengeEinheit = neu;
      einstellungenSpeichern();
      einheitenAnzeigen();
    });
  }

  // ---------- Seiten und Navigation ----------

  // Zeigt eine Seite und markiert ihren Tab
  function seiteZeigen(name) {
    // Die Seiten im Look Korund (Serie, Vorschlag, Rückblick …) liegen über allen Tabs und gehen beim Wechsel zu
    if (korundSeiten.length > 0) {
      korundSeitenSchliessen();
    }
    // Beim Zurückkommen wird der Trainingsmodus neu aufgebaut, deshalb die Eingabe vorher merken
    if (aktiveSeite === "training" && trainingAnsicht === "modus" && !document.getElementById("modus-eingabe").classList.contains("versteckt")) {
      gemerkteTrainingWerte = [gewichtFeldWert("t-feld-gewicht"), feldWert("t-feld-wdh"), gewaehlterRir];
    }

    // Der Home-Tab führt von der Log-Ansicht zurück zur Übersicht
    if (name === "home" && aktiveSeite === "home") {
      homeAnsichtZeigen("home");
    }

    document.getElementById("seite-" + aktiveSeite).classList.remove("aktiv");
    document.getElementById("nav-" + aktiveSeite).classList.remove("aktiv");
    document.getElementById("seite-" + name).classList.add("aktiv");
    document.getElementById("nav-" + name).classList.add("aktiv");
    aktiveSeite = name;
    window.scrollTo(0, 0);

    // Die Kopfzeile zeigt den Titel der Seite
    document.getElementById("kopfzeile").textContent = document.querySelector("#seite-" + name + " h1").textContent;
    kopfzeileAktualisieren();

    if (name === "home") {
      homeAnzeigen();
    }

    if (name === "fortschritt") {
      fortschrittAnzeigen();
      // Beim ersten Öffnen bietet die Einführung an, den Bereich kurz zu zeigen (einfuehrung.js)
      einfuehrungAnbieten("fortschritt");
    }

    if (name === "profil") {
      profilAnzeigen();
      // Beim ersten Öffnen bietet die Einführung an, den Bereich kurz zu zeigen (einfuehrung.js)
      einfuehrungAnbieten("profil");
    }

    if (name === "training") {
      trainingAnzeigen();
      if (trainingAnsicht === "modus" && laufendesTraining) {
        modusAnzeigen();
      }
      // Beim ersten Öffnen bietet die Einführung an, den Bereich kurz zu zeigen (einfuehrung.js)
      einfuehrungAnbieten("training");
    }

    // Die Pausen-Leiste ist überall zu sehen außer im Trainingsmodus, das Display bleibt nur dort an, die Uhr läuft nur dort
    pauseAnzeigen();
    wachSperreAktualisieren();
    uhrAktualisieren();
    rangMeldungAnsicht();
  }

  // Blendet die Kopfzeile ein, sobald der große Titel nach oben weggescrollt ist
  function kopfzeileAktualisieren() {
    document.getElementById("kopfzeile").classList.toggle("sichtbar", window.scrollY > 52);
  }

  window.addEventListener("scroll", kopfzeileAktualisieren);

  // ---------- Datum-Helfer ----------

  // Montag (0 Uhr) der Woche, in der das Datum liegt
  function montagDerWoche(datum) {
    const montag = new Date(datum.getFullYear(), datum.getMonth(), datum.getDate());
    const tageSeitMontag = (montag.getDay() + 6) % 7;
    montag.setDate(montag.getDate() - tageSeitMontag);
    return montag;
  }

  // Kalenderwoche nach ISO-Regel: Eine Woche gehört zu dem Jahr, in dem ihr Donnerstag liegt
  function kalenderwoche(montag) {
    const donnerstag = new Date(montag.getFullYear(), montag.getMonth(), montag.getDate() + 3);
    const ersterJanuar = new Date(donnerstag.getFullYear(), 0, 1);
    const tageImJahr = Math.round((donnerstag - ersterJanuar) / 86400000);
    return Math.floor(tageImJahr / 7) + 1;
  }

  // Der kurze Name eines Wochentags in der eingestellten Sprache: 0 ist Montag ("Mo"), 6 ist Sonntag ("So")
  function wochentag(index) {
    // Der 1. Januar 2024 war ein Montag
    return new Date(2024, 0, 1 + index).toLocaleDateString(gebiet(), { weekday: "short" });
  }

  // Tag und Monat in der Schreibweise der Sprache, z. B. "5.10." oder "5 Oct"
  function tagMonat(datum) {
    return datum.toLocaleDateString(gebiet(), { day: "numeric", month: spracheDaten().monat });
  }

  // Dasselbe mit Jahr, z. B. "5.10.2026" oder "5 Oct 2026"
  function datumMitJahr(datum) {
    return datum.toLocaleDateString(gebiet(), { day: "numeric", month: spracheDaten().monat, year: "numeric" });
  }

  // Überschrift einer Woche, z. B. "KW 41 · 5.10. – 11.10.2026"
  function wochenTitel(montag) {
    const sonntag = new Date(montag.getFullYear(), montag.getMonth(), montag.getDate() + 6);
    return txt("woche.kw", { nr: kalenderwoche(montag) }) + " · " + tagMonat(montag) + " – " + datumMitJahr(sonntag);
  }

  // Eine Zahl pro Kalendertag, z. B. 20261005. Damit lassen sich Tage vergleichen.
  function tagSchluessel(datum) {
    return datum.getFullYear() * 10000 + (datum.getMonth() + 1) * 100 + datum.getDate();
  }

  // Kurzer Text für einen Tag, z. B. "Mo, 5.10."
  function tagText(datum) {
    return wochentag((datum.getDay() + 6) % 7) + ", " + tagMonat(datum);
  }

  // Dasselbe mit Jahr, z. B. "Mo, 5.10.2026"
  function tagTextMitJahr(datum) {
    return wochentag((datum.getDay() + 6) % 7) + ", " + datumMitJahr(datum);
  }

  // ---------- Wochenleiste ----------

  // Baut die sieben Tage der angezeigten Woche
  function wochenleisteAnzeigen() {
    const heute = new Date();
    document.getElementById("wochen-titel").textContent = wochenTitel(angezeigterMontag);

    // Weiter als bis zur aktuellen Woche kann man nicht blättern
    document.getElementById("woche-vor").disabled = angezeigterMontag.getTime() >= montagDerWoche(heute).getTime();

    const leiste = document.getElementById("wochenleiste");
    leiste.innerHTML = "";

    for (let i = 0; i < 7; i++) {
      const tag = new Date(angezeigterMontag.getFullYear(), angezeigterMontag.getMonth(), angezeigterMontag.getDate() + i);
      const btn = document.createElement("button");
      btn.className = "tag-btn";

      const name = document.createElement("span");
      name.className = "tag-name";
      name.textContent = wochentag(i);
      btn.appendChild(name);

      const zahl = document.createElement("span");
      zahl.className = "tag-zahl";
      zahl.textContent = tag.getDate();
      btn.appendChild(zahl);

      if (tagSchluessel(tag) === tagSchluessel(heute)) {
        btn.classList.add("heute");
      }
      if (gewaehlterTag && tagSchluessel(tag) === tagSchluessel(gewaehlterTag)) {
        btn.classList.add("gewaehlt");
      }
      // Tage in der Zukunft lassen sich nicht antippen
      btn.disabled = tagSchluessel(tag) > tagSchluessel(heute);

      btn.onclick = function () {
        tagWaehlen(tag);
      };
      leiste.appendChild(btn);
    }
  }

  // Wählt einen Tag aus. Nochmal antippen hebt die Auswahl wieder auf.
  function tagWaehlen(tag) {
    if (gewaehlterTag && tagSchluessel(tag) === tagSchluessel(gewaehlterTag)) {
      gewaehlterTag = null;
    } else {
      gewaehlterTag = tag;
    }
    wochenleisteAnzeigen();
    speichernButtonAktualisieren();
    anzeigen();
  }

  // Blättert eine Woche zurück (-1) oder vor (1). Die Tagesauswahl wird dabei aufgehoben.
  function wocheBlaettern(richtung) {
    angezeigterMontag = new Date(angezeigterMontag.getFullYear(), angezeigterMontag.getMonth(), angezeigterMontag.getDate() + richtung * 7);
    gewaehlterTag = null;
    wochenleisteAnzeigen();
    speichernButtonAktualisieren();
    anzeigen();
  }

  // ---------- Scroll-Räder ----------

  // Füllt ein Rad mit Werten. seite ist die Seite, auf der das Rad steht.
  // Ein Rad, das es schon gibt, wird dabei neu gefüllt.
  function radBauen(id, werte, seite) {
    const rad = document.getElementById(id);
    rad.innerHTML = "";
    raeder[id] = { werte: werte, aktiv: -1 };

    for (let i = 0; i < werte.length; i++) {
      const wert = document.createElement("div");
      wert.className = "rad-wert";
      wert.textContent = zahlText(werte[i]);
      // Antippen eines Wertes dreht das Rad dorthin
      wert.onclick = function () {
        rad.scrollTo({ top: i * RAD_HOEHE, behavior: "smooth" });
      };
      rad.appendChild(wert);
    }

    rad.onscroll = function () {
      // Nur auf der eigenen Seite: Ausgeblendete Räder melden eine falsche Stellung.
      // Ein Rad ohne Seite steht in einem Sheet und ist nie ausgeblendet.
      if (!seite || aktiveSeite === seite) {
        radMarkieren(id);
      }
    };
  }

  // Position des Wertes, der gerade in der Mitte steht
  function radIndex(id) {
    const rad = document.getElementById(id);
    const index = Math.round(rad.scrollTop / RAD_HOEHE);
    return Math.max(0, Math.min(index, raeder[id].werte.length - 1));
  }

  // Hebt den Wert in der Mitte hervor
  function radMarkieren(id) {
    const rad = document.getElementById(id);
    const index = radIndex(id);

    if (index === raeder[id].aktiv) {
      return;
    }
    if (raeder[id].aktiv >= 0) {
      rad.children[raeder[id].aktiv].classList.remove("aktiv");
    }
    rad.children[index].classList.add("aktiv");
    raeder[id].aktiv = index;
  }

  // Liest den eingestellten Wert als Zahl
  function radWert(id) {
    return raeder[id].werte[radIndex(id)];
  }

  // Dreht ein Rad auf einen Wert. Gibt es den Wert im Rad nicht, bleibt es stehen.
  function radSetzen(id, wert) {
    if (String(wert).trim() === "") {
      return;
    }
    const zahl = Number(String(wert).replace(",", "."));
    const index = raeder[id].werte.indexOf(zahl);
    if (index === -1) {
      return;
    }
    document.getElementById(id).scrollTop = index * RAD_HOEHE;
    radMarkieren(id);
  }

  // ---------- Zahlenfelder ----------

  // Merkt sich zu jedem Zahlenfeld seine Grenzen und den letzten gültigen Wert
  const felder = {};

  // Richtet ein Zahlenfeld ein. Mit komma = true sind Nachkommastellen erlaubt (z. B. 82,5 kg).
  function feldBauen(id, min, max, komma, start) {
    const feld = document.getElementById(id);
    felder[id] = { min: min, max: max, komma: komma, wert: start };
    feld.value = zahlText(start);

    // Antippen markiert den ganzen Wert: Die erste getippte Ziffer ersetzt ihn.
    // Etwas verzögert, weil das iPhone die Markierung beim Antippen sonst gleich wieder aufhebt.
    feld.onfocus = function () {
      setTimeout(function () {
        feld.setSelectionRange(0, feld.value.length);
      }, 0);
    };
    // Nach dem Verlassen steht im Feld, was wirklich gilt (z. B. die Obergrenze statt 999)
    feld.onblur = function () {
      feldSetzen(id, feldWert(id));
    };
    feld.onkeydown = function (ereignis) {
      if (ereignis.key === "Enter") {
        feld.blur();
      }
    };
  }

  // Macht aus einem Text oder einer Zahl einen gültigen Wert für das Feld: innerhalb der Grenzen,
  // das Gewicht auf zwei Nachkommastellen, alles andere ganzzahlig. Ist es keine Zahl: null.
  function feldLesen(id, wert) {
    const text = String(wert).trim().replace(",", ".");
    const zahl = Number(text);
    if (text === "" || isNaN(zahl)) {
      return null;
    }
    let gerundet = Math.round(zahl);
    if (felder[id].komma) {
      gerundet = Math.round(zahl * 100) / 100;
    }
    return Math.max(felder[id].min, Math.min(gerundet, felder[id].max));
  }

  // Der Wert des Feldes als Zahl. Steht gerade nichts Gültiges darin, gilt der letzte gültige Wert.
  function feldWert(id) {
    const zahl = feldLesen(id, document.getElementById(id).value);
    if (zahl !== null) {
      felder[id].wert = zahl;
    }
    return felder[id].wert;
  }

  // Schreibt einen Wert ins Feld. Ist er keine Zahl, bleibt das Feld, wie es war.
  function feldSetzen(id, wert) {
    const zahl = feldLesen(id, wert);
    if (zahl === null) {
      return;
    }
    felder[id].wert = zahl;
    document.getElementById(id).value = zahlText(zahl);
  }

  // Die Schnellbuttons: erhöhen oder verringern den Wert um einen Schritt
  function feldAendern(id, schritt) {
    feldSetzen(id, feldWert(id) + schritt);
  }

  // Stellt die Felder im Log auf die Startwerte oder, falls es die Übung schon gab, auf die Werte vom letzten Mal
  function felderVoreinstellen() {
    gewichtFeldSetzen("feld-gewicht", startGewicht());
    feldSetzen("feld-wdh", START_WDH);
    feldSetzen("feld-saetze", START_SAETZE);

    const letzter = letzterEintrag(gewaehlteUebung, gewaehlteUebungId);
    if (letzter) {
      gewichtFeldSetzen("feld-gewicht", letzter.gewicht);
      feldSetzen("feld-wdh", letzter.wdh);
      feldSetzen("feld-saetze", letzter.saetze);
    }
  }

  // ---------- Bottom Sheet für die Übungsauswahl ----------

  // ziel ist "log", "routine", "tausch" oder "vorlage". Ohne Angabe gilt "log".
  function sheetOeffnen(ziel) {
    sheetZiel = ziel || "log";
    // Der Schalter "Auch in der Routine ändern" gehört nur zum Tauschen und ist bei jedem Öffnen aus
    tauschSchalterSetzen(false);
    document.getElementById("tausch-schalter").classList.toggle("versteckt", sheetZiel !== "tausch" || !tauschRoutineStelle());
    if (sheetTauscht()) {
      sheetTauschZeigen();
    } else {
      sheetGruppenZeigen();
    }
    document.getElementById("sheet").classList.add("offen");
    document.getElementById("sheet-hintergrund").classList.add("offen");
    document.body.classList.add("sheet-offen");
  }

  // Wird im Sheet gerade eine Übung getauscht, im Trainingsmodus oder in der Vorschau einer Vorlage?
  // Dann beginnt das Sheet mit Vorschlägen statt mit den Muskelgruppen.
  function sheetTauscht() {
    return sheetZiel === "tausch" || sheetZiel === "vorlage";
  }

  function sheetSchliessen() {
    selbstFormSchliessen();
    document.getElementById("sheet-suche").blur();
    document.getElementById("sheet").classList.remove("offen");
    document.getElementById("sheet-hintergrund").classList.remove("offen");
    document.body.classList.remove("sheet-offen");
  }

  // Ein Teil der Auswahl: "suche", "titel", "zurueck" oder "inhalt". Im Sheet heißen die Elemente "sheet-…",
  // in der Bibliothek (Reiter "Übungen") "bib-…". So zeichnen dieselben Funktionen an beide Orte.
  function sheetTeil(name) {
    if (sheetZiel === "bibliothek") {
      return document.getElementById("bib-" + name);
    }
    return document.getElementById("sheet-" + name);
  }

  // Setzt Titel und Zurück-Pfeil und gibt den geleerten Inhaltsbereich zurück
  function sheetLeeren(titel, mitZurueck) {
    sheetTeil("titel").textContent = titel;
    sheetTeil("zurueck").classList.toggle("versteckt", !mitZurueck);

    const inhalt = sheetTeil("inhalt");
    inhalt.innerHTML = "";
    inhalt.scrollTop = 0;
    // Die Bibliothek steht in der Seite: Dort scrollt die Seite nach oben, außer beim Tippen in der Suche
    if (sheetZiel === "bibliothek" && document.activeElement !== sheetTeil("suche")) {
      window.scrollTo(0, 0);
    }
    return inhalt;
  }

  // Zeigt die Ansicht, die in sheetGruppe steht: die Kacheln, die eigenen Übungen oder eine Muskelgruppe
  function sheetAnsichtZeigen() {
    if (sheetGruppe === "") {
      sheetGruppenZeigen();
    } else if (sheetGruppe === KACHEL_TAUSCH) {
      sheetTauschZeigen();
    } else if (sheetGruppe === KACHEL_SELBST) {
      sheetSelbstZeigen();
    } else {
      sheetUebungenZeigen(sheetGruppe);
    }
  }

  // Der Zurück-Pfeil im Sheet. Beim Tauschen geht es aus der Suche zur Ansicht davor und von den
  // Muskelgruppen zurück zu den Vorschlägen, sonst immer zu den Muskelgruppen.
  function sheetZurueck() {
    if (!sheetTauscht()) {
      sheetGruppenZeigen();
      return;
    }
    const suche = sheetTeil("suche");
    if (suche.value.trim() !== "") {
      suche.value = "";
      sheetAnsichtZeigen();
    } else if (sheetGruppe === "") {
      sheetTauschZeigen();
    } else {
      sheetGruppenZeigen();
    }
  }

  // Der Button "Eigene Übung hinzufügen". Er öffnet das Formular.
  function selbstNeuKnopf() {
    const knopf = element("button", "sheet-neu", txt("selbst.neu"));
    knopf.onclick = function () {
      selbstFormOeffnen(null, "");
    };
    return knopf;
  }

  // Die Kachel "Eigene": dieselbe Figur wie bei den Muskelgruppen, mit einem Stern statt eines Muskels.
  // Die Figuren (KOERPER_UMRISS und koerperSvg) stehen in der figuren.js.
  function kachelSelbst() {
    const kachel = element("button", "muskel-kachel");
    kachel.innerHTML = '<svg class="koerper" viewBox="0 0 60 118" aria-hidden="true"><g class="umriss">' + KOERPER_UMRISS + '</g>'
      + '<g class="muskel aktiv"><path d="M30 30l2.9 8 8.5.3-6.6 5.3 2.3 8.1L30 47l-7.1 4.7 2.3-8.1-6.6-5.3 8.5-.3z"/></g></svg>';
    kachel.appendChild(element("span", "", txt("selbst.kachel")));
    kachel.onclick = sheetSelbstZeigen;
    return kachel;
  }

  // Schritt 1: alle Muskelgruppen als Kacheln mit Körper-Grafik, davor die Kachel für die eigenen Übungen
  function sheetGruppenZeigen() {
    sheetGruppe = "";
    sheetTeil("suche").value = "";
    // Beim Tauschen führt der Pfeil von hier zurück zu den Vorschlägen
    const inhalt = sheetLeeren(txt("sheet.muskelgruppe"), sheetTauscht());
    inhalt.appendChild(selbstNeuKnopf());
    const raster = element("div", "muskel-raster");
    raster.appendChild(kachelSelbst());

    for (let i = 0; i < MUSKELGRUPPEN.length; i++) {
      const gruppe = MUSKELGRUPPEN[i];
      const kachel = element("button", "muskel-kachel");
      kachel.innerHTML = koerperSvg(gruppe);
      kachel.appendChild(element("span", "", gruppe[sprache]));
      kachel.onclick = function () {
        sheetUebungenZeigen(gruppe.id);
      };
      raster.appendChild(kachel);
    }
    inhalt.appendChild(raster);
  }

  // Die Kachel "Eigene": alle eigenen Übungen nach Namen sortiert, jede mit einem Stift zum Bearbeiten
  function sheetSelbstZeigen() {
    sheetGruppe = KACHEL_SELBST;
    sheetTeil("suche").value = "";
    const inhalt = sheetLeeren(txt("selbst.kachel"), true);
    inhalt.appendChild(selbstNeuKnopf());

    if (selbstListe.length === 0) {
      inhalt.appendChild(element("p", "leer-hinweis", txt("selbst.leer")));
      return;
    }

    for (let i = 0; i < selbstListe.length; i++) {
      const u = selbstListe[i];
      const zeile = element("div", "selbst-zeile");
      zeile.appendChild(uebungZeile(u, true));
      const stift = element("button", "selbst-stift", "✎");
      stift.setAttribute("aria-label", txt("selbst.bearbeitenAnsage", { name: u.de }));
      stift.onclick = function () {
        selbstFormOeffnen(eigeneUebungFinden(u.id), "");
      };
      zeile.appendChild(stift);
      inhalt.appendChild(zeile);
    }
  }

  // Schritt 2: die Übungen einer Muskelgruppe, sortiert nach Maschine, Freie Gewichte und Eigengewicht.
  // Welche festen Übungen das sind und in welcher Reihenfolge, steht in UEBUNGSLISTEN.
  // Die eigenen Übungen der Gruppe stehen in ihrem Bereich ganz oben, damit sie nicht hinter "Mehr anzeigen" landen.
  // Darunter "Trainiert auch": Übungen anderer Gruppen, bei denen diese Gruppe stark mitarbeitet.
  function sheetUebungenZeigen(gruppeId) {
    sheetGruppe = gruppeId;
    const inhalt = sheetLeeren(GRUPPE_NACH_ID[gruppeId][sprache], true);
    const gezeigt = {};
    let anzahl = 0;

    for (let i = 0; i < BEREICHE.length; i++) {
      const bereich = BEREICHE[i];
      const ids = UEBUNGSLISTEN[gruppeId][bereich.id];
      const liste = selbstListe.filter(function (u) {
        return uebungGruppe(u) === gruppeId && u.bereich === bereich.id;
      });
      for (let j = 0; j < ids.length; j++) {
        if (UEBUNG_NACH_ID[ids[j]]) {
          liste.push(UEBUNG_NACH_ID[ids[j]]);
          gezeigt[ids[j]] = true;
        }
      }
      sheetAbschnitt(inhalt, bereich[sprache], liste, false);
      anzahl += liste.length;
    }

    // Was oben schon steht, wird hier nicht wiederholt
    const auch = UEBUNGEN.filter(function (u) {
      return u.auch.indexOf(gruppeId) !== -1 && !gezeigt[u.id];
    });
    sheetAbschnitt(inhalt, txt("sheet.trainiertAuch"), auch, true);

    if (anzahl === 0) {
      inhalt.insertBefore(element("p", "leer-hinweis", txt("sheet.gruppeLeer")), inhalt.firstChild);
    }

    // Ganz unten: eine eigene Übung für diese Muskelgruppe anlegen
    inhalt.appendChild(selbstNeuKnopf());
  }

  // Ein Abschnitt im Sheet: Überschrift, die ersten Übungen und "Mehr anzeigen (+N)" für den Rest.
  // Ein leerer Abschnitt wird gar nicht gezeigt.
  function sheetAbschnitt(inhalt, titel, liste, mitGruppe) {
    if (liste.length === 0) {
      return;
    }
    inhalt.appendChild(element("h3", "sheet-abschnitt", titel));

    for (let i = 0; i < liste.length && i < TOP_ANZAHL; i++) {
      inhalt.appendChild(uebungZeile(liste[i], mitGruppe));
    }

    if (liste.length > TOP_ANZAHL) {
      const mehr = element("button", "sheet-mehr", txt("sheet.mehr", { n: liste.length - TOP_ANZAHL }));
      mehr.onclick = function () {
        // Die restlichen Übungen an die Stelle des Buttons setzen
        for (let i = TOP_ANZAHL; i < liste.length; i++) {
          inhalt.insertBefore(uebungZeile(liste[i], mitGruppe), mehr);
        }
        mehr.remove();
      };
      inhalt.appendChild(mehr);
    }
  }

  // Der Name eines Bereichs ("maschine", "frei" oder "eigen") in der eingestellten Sprache
  function bereichName(id) {
    for (let i = 0; i < BEREICHE.length; i++) {
      if (BEREICHE[i].id === id) {
        return BEREICHE[i][sprache];
      }
    }
    return "";
  }

  // Eine Übung als Zeile: oben der Name, darunter klein der Name in der anderen Sprache.
  // Eine eigene Übung hat nur einen Namen, bei ihr steht dort das Zeichen "Eigene".
  // mitGruppe hängt die Muskelgruppe an, z. B. in der Suche und bei "Trainiert auch".
  function uebungZeile(u, mitGruppe) {
    const gruppe = GRUPPE_NACH_ID[uebungGruppe(u)];
    const btn = element("button", "sheet-zeile");
    btn.appendChild(element("span", "sheet-zeile-name", u[sprache]));

    const teile = [];
    if (!u.selbst) {
      if (sprache === "en") {
        teile.push(u.de);
      } else {
        teile.push(u.en);
      }
    }
    if (mitGruppe) {
      teile.push(gruppe[sprache]);
      // Gibt es den Namen zweimal, zeigt der Bereich, welche Übung gemeint ist.
      // Bei eigenen Übungen steht er immer dabei.
      if (u.selbst || NAME_MEHRFACH[u.de.toLowerCase()] || NAME_MEHRFACH[u.en.toLowerCase()]) {
        teile.push(bereichName(u.bereich));
      }
    }
    const zweit = element("span", "sheet-zeile-zweit");
    if (u.selbst) {
      zweit.appendChild(element("span", "selbst-zeichen", txt("selbst.zeichen")));
    }
    zweit.appendChild(document.createTextNode(teile.join(" · ")));
    btn.appendChild(zweit);

    // Beim Tauschen: Eine Übung, die schon an einem anderen Platz des Trainings steht, lässt sich nicht wählen
    if ((sheetZiel === "tausch" && tauschVergeben(u.de, u.id)) || (sheetZiel === "hinzu" && hinzuVergeben(u.de, u.id))) {
      btn.disabled = true;
      btn.appendChild(element("span", "sheet-zeile-zweit", txt("tausch.vergeben")));
    }

    // In der Vorschau einer Vorlage: Eine Übung, die am selben Trainingstag schon vorkommt, lässt sich nicht wählen
    if (sheetZiel === "vorlage" && vorlageVergeben(u.id)) {
      btn.disabled = true;
      btn.appendChild(element("span", "sheet-zeile-zweit", txt("vorlage.vergeben")));
    }

    // In der Bibliothek wählt die Zeile nichts aus: Sie öffnet die Erklärung, auch wenn es noch keine gibt.
    // Ein "i" braucht sie dort nicht.
    if (sheetZiel === "bibliothek") {
      btn.onclick = function () {
        erklaerungOeffnen(u.id, u.de, true);
      };
      return btn;
    }

    // Gespeichert wird neben der ID immer der deutsche Name, als Reserve
    btn.onclick = function () {
      uebungWaehlen(u.de, gruppe.de, u.id);
    };

    // Ohne Erklärung bleibt die Zeile, wie sie ist: kein "i", kein leeres Sheet
    if (erklaerungId(u.id, u.de) === "") {
      return btn;
    }
    // Mit Erklärung: Zeile und "i" stehen nebeneinander. Ein Button darf nicht in einem Button stecken,
    // deshalb der Rahmen. Das "i" bleibt auch antippbar, wenn die Zeile ausgegraut ist.
    const reihe = element("div", "sheet-reihe");
    reihe.appendChild(btn);
    reihe.appendChild(infoKnopf(u.id, u.de, u[sprache]));
    return reihe;
  }

  // Das runde "i" neben einer Übung: Es öffnet ihre Erklärung. Die Tippfläche ist 44 × 44 px, der Kreis darin kleiner.
  function infoKnopf(id, name, ansageName) {
    const knopf = element("button", "info-knopf");
    knopf.setAttribute("aria-label", txt("erklaerung.ansage", { name: ansageName }));
    const kreis = element("span", "", "i");
    kreis.setAttribute("aria-hidden", "true");
    knopf.appendChild(kreis);
    knopf.onclick = function () {
      erklaerungOeffnen(id, name);
    };
    return knopf;
  }

  // Macht aus einem Text die Form, in der die Suche vergleicht: klein geschrieben, "ß" wie "ss",
  // Umlaute wie der einfache Buchstabe, und "ae", "oe", "ue" genauso. "Drücken", "drucken" und "druecken"
  // ergeben alle "drucken". Das gilt für die Eingabe und für die Namen, angezeigt wird weiter der echte Name.
  function suchForm(text) {
    return String(text).toLowerCase().replace(/ß/g, "ss")
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/ae/g, "a").replace(/oe/g, "o").replace(/ue/g, "u");
  }

  // Wie genau ein Name zur Eingabe passt: 0 = genau gleich, 1 = der Name beginnt mit der Eingabe,
  // 2 = zu jedem eingetippten Wort gibt es im Namen ein Wort, das damit beginnt, 3 = jedes eingetippte Wort
  // steckt irgendwo im Namen. Passt der Name nicht, ist das Ergebnis -1. name und eingabe sind schon in der Such-Form.
  function suchStufe(name, eingabe, woerter) {
    if (name === eingabe) {
      return 0;
    }
    if (name.indexOf(eingabe) === 0) {
      return 1;
    }
    // Wörter im Namen: getrennt an allem, was kein Buchstabe und keine Ziffer ist (Leerzeichen, Bindestrich, Klammer)
    const teile = name.split(/[^a-z0-9]+/);
    const wortAnfang = woerter.every(function (wort) {
      return teile.some(function (teil) {
        return teil.indexOf(wort) === 0;
      });
    });
    if (wortAnfang) {
      return 2;
    }
    const irgendwo = woerter.every(function (wort) {
      return name.indexOf(wort) !== -1;
    });
    if (irgendwo) {
      return 3;
    }
    return -1;
  }

  // Die Treffer der Suche, die besten zuerst. Gesucht wird in allen Übungen, auf Deutsch und Englisch und in den
  // Aliasen. Jedes eingetippte Wort muss vorkommen, die Reihenfolge der Wörter ist egal.
  // Die Reihenfolge: zuerst die Treffer im Namen der eingestellten Sprache (Stufe 0 bis 3, siehe suchStufe),
  // dann die im Namen der anderen Sprache (4 bis 7), zuletzt die, die nur über einen Alias passen (8).
  // Bei gleicher Stufe: eigene Übungen, dann Übungen mit Erklärung, dann der kürzere Name, dann das Alphabet.
  function sucheTreffer(text) {
    const eingabe = suchForm(text).trim().replace(/\s+/g, " ");
    const woerter = eingabe.split(" ");
    let andere = "en";
    if (sprache === "en") {
      andere = "de";
    }

    const treffer = [];
    const alle = selbstListe.concat(UEBUNGEN);
    for (let i = 0; i < alle.length; i++) {
      const u = alle[i];
      let stufe = suchStufe(suchForm(u[sprache]), eingabe, woerter);
      if (stufe === -1) {
        stufe = suchStufe(suchForm(u[andere]), eingabe, woerter);
        if (stufe !== -1) {
          stufe += 4;
        }
      }
      if (stufe === -1) {
        const namen = suchForm(u.de + " " + u.en + " " + (u.alias || []).join(" "));
        const passt = woerter.every(function (wort) {
          return namen.indexOf(wort) !== -1;
        });
        if (!passt) {
          continue;
        }
        stufe = 8;
      }
      treffer.push({ uebung: u, stufe: stufe, eigene: Boolean(u.selbst), erklaert: erklaerungId(u.id, u.de) !== "" });
    }

    treffer.sort(function (a, b) {
      if (a.stufe !== b.stufe) {
        return a.stufe - b.stufe;
      }
      if (a.eigene !== b.eigene) {
        return Number(b.eigene) - Number(a.eigene);
      }
      if (a.erklaert !== b.erklaert) {
        return Number(b.erklaert) - Number(a.erklaert);
      }
      const nameA = a.uebung[sprache];
      const nameB = b.uebung[sprache];
      if (nameA.length !== nameB.length) {
        return nameA.length - nameB.length;
      }
      return nameA.localeCompare(nameB, sprache);
    });

    return treffer.map(function (t) {
      return t.uebung;
    });
  }

  // Wird bei jeder Eingabe im Suchfeld aufgerufen. Was gefunden wird und in welcher Reihenfolge, steht in sucheTreffer.
  function sheetSucheGeaendert() {
    const eingabe = sheetTeil("suche").value.trim();

    // Leeres Feld: zurück zur vorherigen Ansicht
    if (eingabe === "") {
      sheetAnsichtZeigen();
      return;
    }

    const treffer = sucheTreffer(eingabe);

    const inhalt = sheetLeeren(txt("sheet.suche"), true);
    for (let i = 0; i < treffer.length; i++) {
      inhalt.appendChild(uebungZeile(treffer[i], true));
    }
    if (treffer.length === 0) {
      inhalt.appendChild(element("p", "leer-hinweis", txt("sheet.keinTreffer")));
    }

    // Eigene Übung anbieten, außer es gibt schon eine Übung mit genau diesem Namen.
    // Der Button öffnet das Formular, der Name ist dort schon eingetragen.
    if (nameSchluessel(eingabe) !== "" && !uebungMitNamen(eingabe, "")) {
      const eigene = element("button", "sheet-zeile eigene", txt("sheet.eigene", { name: eingabe }));
      eigene.onclick = function () {
        selbstFormOeffnen(null, eingabe);
      };
      inhalt.appendChild(eigene);
    }
  }

  // ---------- Eigene Übungen: Formular ----------

  // Die eigene Übung, die das Formular gerade bearbeitet (null = eine neue wird angelegt)
  let selbstBearbeitet = null;

  // Die im Formular gewählte Art ("maschine", "frei" oder "eigen") und die angetippten Hilfsmuskelgruppen
  let selbstArt = "maschine";
  let selbstHilfs = {};

  // Öffnet das Formular über der Übungsauswahl. uebung ist die eigene Übung, die bearbeitet wird,
  // oder null für eine neue. name füllt bei einer neuen Übung das Namensfeld vor.
  function selbstFormOeffnen(uebung, name) {
    selbstBearbeitet = uebung;
    selbstArt = "maschine";
    selbstHilfs = {};
    let haupt = "";
    // Eine neue Übung startet mit der Muskelgruppe, die in der Auswahl gerade offen ist
    if (GRUPPE_NACH_ID[sheetGruppe]) {
      haupt = sheetGruppe;
    }

    if (uebung) {
      name = uebung.name;
      haupt = uebung.haupt;
      selbstArt = uebung.bereich;
      for (let i = 0; i < uebung.hilfs.length; i++) {
        selbstHilfs[uebung.hilfs[i]] = true;
      }
    }

    let titel = txt("selbst.titelNeu");
    if (uebung) {
      titel = txt("selbst.titelBearbeiten");
    }
    document.getElementById("selbst-titel").textContent = titel;
    document.getElementById("selbst-loeschen").classList.toggle("versteckt", !uebung);
    document.getElementById("selbst-name").value = name;
    document.getElementById("selbst-haupt-meldung").textContent = "";

    // Die Auswahl der Hauptmuskelgruppe: zuerst "Bitte wählen", dann alle Gruppen
    const auswahl = document.getElementById("selbst-haupt");
    auswahl.innerHTML = "";
    const leer = element("option", "", txt("selbst.bitteWaehlen"));
    leer.value = "";
    auswahl.appendChild(leer);
    for (let i = 0; i < MUSKELGRUPPEN.length; i++) {
      const option = element("option", "", MUSKELGRUPPEN[i][sprache]);
      option.value = MUSKELGRUPPEN[i].id;
      auswahl.appendChild(option);
    }
    auswahl.value = haupt;

    selbstHilfsAnzeigen();
    selbstArtAnzeigen();
    selbstNameGeaendert();

    document.getElementById("selbst-sheet").querySelector(".zusatz-inhalt").scrollTop = 0;
    sheetTeil("suche").blur();
    document.getElementById("selbst-sheet").classList.add("offen");
    // In der Bibliothek liegt kein Sheet darunter: Das Formular bringt den dunklen Hintergrund selbst mit
    if (sheetZiel === "bibliothek") {
      document.getElementById("sheet-hintergrund").classList.add("offen");
      document.body.classList.add("sheet-offen");
    }
  }

  function selbstFormSchliessen() {
    document.getElementById("selbst-name").blur();
    document.getElementById("selbst-sheet").classList.remove("offen");
    if (sheetZiel === "bibliothek") {
      document.getElementById("sheet-hintergrund").classList.remove("offen");
      document.body.classList.remove("sheet-offen");
    }
  }

  // Die Hilfsmuskeln als Knöpfe zum An- und Abwählen. Die Hauptmuskelgruppe fehlt in der Reihe.
  function selbstHilfsAnzeigen() {
    const bereich = document.getElementById("selbst-hilfs");
    const haupt = document.getElementById("selbst-haupt").value;
    bereich.innerHTML = "";

    for (let i = 0; i < MUSKELGRUPPEN.length; i++) {
      const gruppe = MUSKELGRUPPEN[i];
      if (gruppe.id === haupt) {
        continue;
      }
      const knopf = element("button", "wahl-knopf", gruppe[sprache]);
      knopf.classList.toggle("aktiv", Boolean(selbstHilfs[gruppe.id]));
      knopf.setAttribute("aria-pressed", String(Boolean(selbstHilfs[gruppe.id])));
      knopf.onclick = function () {
        selbstHilfs[gruppe.id] = !selbstHilfs[gruppe.id];
        selbstHilfsAnzeigen();
      };
      bereich.appendChild(knopf);
    }
  }

  // Wird aufgerufen, wenn eine andere Hauptmuskelgruppe gewählt wurde
  function selbstHauptGeaendert() {
    document.getElementById("selbst-haupt-meldung").textContent = "";
    selbstHilfsAnzeigen();
  }

  // Der Umschalter für die Art und darunter der Hinweis, was sie bedeutet
  function selbstArtAnzeigen() {
    const auswahl = [];
    for (let i = 0; i < BEREICHE.length; i++) {
      auswahl.push({ id: BEREICHE[i].id, text: BEREICHE[i][sprache] });
    }
    umschalterBauen(document.getElementById("selbst-art"), auswahl, selbstArt, function (art) {
      selbstArt = art;
      selbstArtAnzeigen();
    });

    let hinweis = "";
    if (selbstArt === "eigen") {
      hinweis = txt("selbst.artEigengewicht");
    }
    document.getElementById("selbst-art-hinweis").textContent = hinweis;
  }

  // Wird bei jeder Eingabe im Namensfeld aufgerufen. Gibt es den Namen schon, erscheint der Hinweis
  // "Gibt es schon" und darunter die vorhandene Übung zum Antippen. Gibt die vorhandene Übung zurück oder null.
  function selbstNameGeaendert() {
    const name = nameSaeubern(document.getElementById("selbst-name").value);
    let ohneId = "";
    if (selbstBearbeitet) {
      ohneId = selbstBearbeitet.id;
    }

    let vorhanden = null;
    if (nameSchluessel(name) !== "") {
      vorhanden = uebungMitNamen(name, ohneId);
    }

    const bereich = document.getElementById("selbst-vorhanden");
    bereich.innerHTML = "";
    let meldung = "";
    if (vorhanden) {
      meldung = txt("selbst.gibtEs");
      bereich.appendChild(uebungZeile(vorhanden, true));
    }
    document.getElementById("selbst-name-meldung").textContent = meldung;
    return vorhanden;
  }

  // Prüft das Formular und legt die Übung an oder übernimmt die Änderungen
  function selbstSpeichern() {
    const name = nameSaeubern(document.getElementById("selbst-name").value);
    const haupt = document.getElementById("selbst-haupt").value;

    if (selbstNameGeaendert()) {
      return;
    }
    if (nameSchluessel(name) === "") {
      document.getElementById("selbst-name-meldung").textContent = txt("selbst.nameFehlt");
      return;
    }
    if (name.length > SELBST_NAME_MAX) {
      document.getElementById("selbst-name-meldung").textContent = txt("selbst.nameZuLang", { n: SELBST_NAME_MAX });
      return;
    }
    if (!GRUPPE_NACH_ID[haupt]) {
      document.getElementById("selbst-haupt-meldung").textContent = txt("selbst.hauptFehlt");
      return;
    }

    const hilfs = [];
    for (let i = 0; i < MUSKELGRUPPEN.length; i++) {
      if (selbstHilfs[MUSKELGRUPPEN[i].id] && MUSKELGRUPPEN[i].id !== haupt) {
        hilfs.push(MUSKELGRUPPEN[i].id);
      }
    }

    let uebung = selbstBearbeitet;
    const neu = !uebung;
    if (neu) {
      uebung = { id: neueSelbstId(), name: name, bereich: selbstArt, haupt: haupt, hilfs: hilfs };
      eigeneUebungen.push(uebung);
    } else {
      uebung.name = name;
      uebung.bereich = selbstArt;
      uebung.haupt = haupt;
      uebung.hilfs = hilfs;
    }
    eigeneUebungenSpeichern();
    if (!neu) {
      // Der neue Name erscheint über die ID von selbst überall. Er wird zusätzlich
      // an jeder Stelle gespeichert, damit er nach einem späteren Löschen sichtbar bleibt.
      selbstNameUebertragen(uebung);
    }
    selbstFormSchliessen();

    alteVerknuepfenFragen(uebung, function () {
      uebungenNeuAnzeigen();
      if (neu) {
        // Die neue Übung ist gleich gewählt, wie eine angetippte aus der Liste
        uebungWaehlen(uebung.name, GRUPPE_NACH_ID[uebung.haupt].de, uebung.id);
      } else {
        sheetAnsichtZeigen();
      }
    });
  }

  // Schreibt den Namen und die Muskelgruppe einer eigenen Übung an alle Stellen, die zu ihr gehören
  function selbstNameUebertragen(uebung) {
    jedeGespeicherteUebung(function (objekt, feld) {
      if (objekt.uebungId === uebung.id) {
        eigeneUebungZuweisen(objekt, feld, uebung);
      }
    });
    gespeicherteUebungenSichern();

    if (gewaehlteUebungId === uebung.id) {
      gewaehlteUebung = uebung.name;
      gewaehlteGruppe = GRUPPE_NACH_ID[uebung.haupt].de;
    }
  }

  // Sucht alte Einträge und Routinen-Übungen, die genau so heißen wie die eigene Übung, aber zu keiner Übung
  // gehören (Groß-/Kleinschreibung, Bindestriche und Leerzeichen sind egal). Gibt es welche, fragt die App,
  // ob sie verknüpft werden sollen. Ohne Zustimmung wird nichts umgehängt. danach läuft in jedem Fall.
  function alteVerknuepfenFragen(uebung, danach) {
    const schluessel = nameSchluessel(uebung.name);
    const treffer = [];
    let anzahlEintraege = 0;
    let anzahlRoutinen = 0;

    jedeGespeicherteUebung(function (objekt, feld) {
      if (ohneUebung(objekt) && nameSchluessel(objekt[feld]) === schluessel) {
        treffer.push({ objekt: objekt, feld: feld });
        if (feld === "uebung") {
          anzahlEintraege++;
        } else {
          anzahlRoutinen++;
        }
      }
    });

    if (treffer.length === 0) {
      danach();
      return;
    }

    const saetze = [];
    if (anzahlEintraege > 0) {
      saetze.push(txtAnzahl("selbst.alteEintraege", anzahlEintraege));
    }
    if (anzahlRoutinen > 0) {
      saetze.push(txtAnzahl("selbst.alteRoutinen", anzahlRoutinen));
    }
    saetze.push(txt("selbst.verknuepfenText", { name: uebung.name }));

    frageZeigen(txt("selbst.verknuepfenFrage"), saetze.join(" "), [
      {
        text: txt("selbst.verknuepfen"),
        art: "haupt",
        aktion: function () {
          for (let i = 0; i < treffer.length; i++) {
            eigeneUebungZuweisen(treffer[i].objekt, treffer[i].feld, uebung);
          }
          gespeicherteUebungenSichern();
          danach();
        }
      },
      { text: txt("selbst.nichtVerknuepfen"), art: "leise", aktion: danach }
    ]);
  }

  // Fragt nach, bevor die bearbeitete eigene Übung gelöscht wird. Ihre Einträge bleiben erhalten:
  // Sie behalten den gespeicherten Namen und zeigen ihn weiter an.
  function selbstLoeschenFragen() {
    const uebung = selbstBearbeitet;
    if (!uebung) {
      return;
    }

    let anzahl = 0;
    for (let i = 0; i < eintraege.length; i++) {
      if (eintraege[i] && eintraege[i].uebungId === uebung.id) {
        anzahl++;
      }
    }
    let text = txt("selbst.loeschenTextLeer", { name: uebung.name });
    if (anzahl > 0) {
      text = txtAnzahl("selbst.loeschenText", anzahl, { name: uebung.name });
    }

    frageZeigen(txt("selbst.loeschenFrage"), text, [
      {
        text: txt("loeschen"),
        art: "haupt",
        aktion: function () {
          // Zur Sicherheit den heutigen Namen noch einmal an alle Stellen schreiben
          selbstNameUebertragen(uebung);
          // Merken, ob es Eigengewicht war: Die alten Einträge rechnen sonst ohne das Körpergewicht weiter
          const gemerkt = geloeschteEigengewicht.indexOf(uebung.id);
          if (gemerkt !== -1) {
            geloeschteEigengewicht.splice(gemerkt, 1);
          }
          if (uebung.bereich === "eigen") {
            geloeschteEigengewicht.push(uebung.id);
          }
          sicherSpeichern("geloeschteEigengewicht", geloeschteEigengewicht);
          eigeneUebungen.splice(eigeneUebungen.indexOf(uebung), 1);
          eigeneUebungenSpeichern();
          selbstFormSchliessen();
          uebungenNeuAnzeigen();
          sheetAnsichtZeigen();
        }
      },
      { text: txt("abbrechen"), art: "leise" }
    ]);
  }

  // Merkt sich die gewählte Übung, schließt das Sheet und stellt die Zahlenfelder ein
  function uebungWaehlen(name, gruppe, id) {
    // In der Bibliothek wird nichts gewählt. Hierher kommt nur eine eigene Übung, die dort gerade neu
    // angelegt wurde: Die Liste zeigt sie gleich mit.
    if (sheetZiel === "bibliothek") {
      sheetSucheGeaendert();
      return;
    }
    // Aus dem Routinen-Editor geöffnet: Die Übung kommt in die Routine, nicht in den neuen Eintrag
    if (sheetZiel === "routine") {
      sheetSchliessen();
      routineUebungHinzufuegen(name, gruppe, id);
      return;
    }
    // Aus der Übersicht im Trainingsmodus geöffnet (seit Version 141): Die Übung kommt ans Ende des Trainings
    if (sheetZiel === "hinzu") {
      trainingUebungHinzufuegen(name, gruppe, id);
      return;
    }
    // Aus dem Trainingsmodus geöffnet: Die Übung ersetzt die aktuelle Übung des Trainings
    if (sheetZiel === "tausch") {
      uebungTauschen(name, gruppe, id);
      return;
    }
    // Aus der Vorschau einer Vorlage geöffnet: Die Übung ersetzt die Übung des Slots
    if (sheetZiel === "vorlage") {
      vorlageUebungTauschen(id);
      return;
    }

    gewaehlteUebung = name;
    gewaehlteGruppe = gruppe;
    gewaehlteUebungId = id;
    uebungFeldAktualisieren();
    sheetSchliessen();
    letztesMalAnzeigen();
    felderVoreinstellen();
  }

  // Zeigt die gewählte Übung im Feld
  function uebungFeldAktualisieren() {
    const feld = document.getElementById("uebung");
    const leer = gewaehlteUebung === "";

    if (leer) {
      feld.textContent = txt("log.uebungWaehlen");
    } else {
      feld.textContent = anzeigeName(gewaehlteUebung, gewaehlteUebungId);
    }
    feld.classList.toggle("leer", leer);
    gewichtTitelSetzen("feld-gewicht", gewaehlteUebungId);
    speichernButtonAktualisieren();
  }

  // Beschriftet den Speichern-Button mit dem gewählten Tag. Ohne Übung ist er gesperrt.
  function speichernButtonAktualisieren() {
    const btn = document.getElementById("speichern");

    if (gewaehlterTag) {
      btn.textContent = txt("log.speichernFuer", { tag: tagText(gewaehlterTag) });
    } else {
      btn.textContent = txt("speichern");
    }
    btn.disabled = gewaehlteUebung === "";
  }

  // ---------- Liste ----------

  // Die Liste im Log: je Tag eine Datumszeile und je Training eine Karte, der neueste Tag zuerst.
  // Tippen auf eine Karte öffnet die Details des Tags. Gelöscht wird dort, nicht in der Liste.
  function anzeigen() {
    const liste = document.getElementById("liste");
    liste.innerHTML = "";
    const tage = trainingstage();

    // Ist ein Tag angetippt, zeigt die Liste nur dessen Trainings
    if (gewaehlterTag) {
      const tag = tage[tagSchluessel(gewaehlterTag)];
      if (tag) {
        logTagAnzeigen(liste, tag);
      } else {
        liste.appendChild(element("h2", "", tagTextMitJahr(gewaehlterTag)));
        liste.appendChild(element("p", "leer-hinweis", txt("log.tagLeer")));
      }
      return;
    }

    const schluessel = Object.keys(tage).sort(function (a, b) {
      return b - a;
    });
    for (let i = 0; i < schluessel.length && i < logGezeigt; i++) {
      logTagAnzeigen(liste, tage[schluessel[i]]);
    }

    if (schluessel.length > logGezeigt) {
      const mehr = element("button", "zweit-btn", txt("profil.mehr"));
      mehr.onclick = function () {
        logGezeigt += VERLAUF_ANZAHL;
        anzeigen();
      };
      liste.appendChild(mehr);
    }

    // Einträge ohne Datum gehören zu keinem Tag. Sie stehen ganz unten und lassen sich nur hier löschen.
    const ohneDatum = [];
    for (let i = 0; i < eintraege.length; i++) {
      if (!hatDatum(eintraege[i])) {
        ohneDatum.push(eintraege[i]);
      }
    }
    if (ohneDatum.length > 0) {
      liste.appendChild(element("h2", "", txt("log.ohneDatum")));
      for (let i = 0; i < ohneDatum.length; i++) {
        liste.appendChild(logZeileOhneDatum(ohneDatum[i]));
      }
    }

    if (schluessel.length === 0 && ohneDatum.length === 0) {
      liste.appendChild(element("div", "karte kommt-bald log-leer", txt("log.leer")));
    }
  }

  // Ein Tag in der Liste: die Datumszeile und je Training eine Karte. Die Trainings teilt tagBloecke auf,
  // so zeigt die Liste dasselbe wie die Details des Tags.
  function logTagAnzeigen(liste, tag) {
    liste.appendChild(element("h2", "", tagTextMitJahr(tag.datum)));
    const bloecke = tagBloecke(tag);
    for (let i = 0; i < bloecke.length; i++) {
      liste.appendChild(logKarte(bloecke[i], tag.schluessel));
    }
  }

  // Die Karte eines Trainings: "Push A · 58 Min." und darunter "6 Übungen · 18 Sätze · 4.250 kg"
  function logKarte(block, schluessel) {
    let saetze = 0;
    let volumen = 0;
    for (let i = 0; i < block.eintraege.length; i++) {
      saetze += arbeitsSaetzeVon(block.eintraege[i]).length;
      volumen += eintragVolumen(block.eintraege[i], 0);
    }

    const karte = element("button", "log-karte");
    const links = element("span", "verlauf-text");
    const name = element("span", "verlauf-name", block.name);
    if (block.minuten !== null) {
      name.appendChild(element("span", "tag-block-dauer", " · " + dauerText(block.minuten)));
    }
    links.appendChild(name);
    if (block.laeuft) {
      links.appendChild(element("span", "verlauf-info", txt("home.laeuft")));
    }
    links.appendChild(element("span", "verlauf-info", txtAnzahl("anzahl.uebungen", tagUebungen(block).length)
      + " · " + txtAnzahl("anzahl.saetze", saetze) + " · " + volumenText(volumen)));
    karte.appendChild(links);
    karte.onclick = function () {
      tagSheetOeffnen(schluessel);
    };
    return karte;
  }

  // Eine Zeile unter "Ohne Datum": die Übung, ihre Sätze und "Löschen"
  function logZeileOhneDatum(e) {
    const zeile = element("div", "log-zeile");
    const links = element("span", "verlauf-text");
    links.appendChild(element("span", "verlauf-name", anzeigeName(e.uebung, e.uebungId)));
    links.appendChild(element("span", "verlauf-info", saetzeText(e)));
    zeile.appendChild(links);
    const btn = element("button", "", txt("loeschen"));
    btn.onclick = function () {
      loeschenFragen(e);
    };
    zeile.appendChild(btn);
    return zeile;
  }

    // Datum für einen neuen Eintrag: der angetippte Tag mit der jetzigen Uhrzeit, ohne Auswahl heute
    function eintragDatum() {
      const jetzt = new Date();
      if (!gewaehlterTag) {
        return jetzt;
      }
      return new Date(gewaehlterTag.getFullYear(), gewaehlterTag.getMonth(), gewaehlterTag.getDate(),
        jetzt.getHours(), jetzt.getMinutes(), jetzt.getSeconds());
    }

    function speichern() {
    // Ohne Übung wird nichts gespeichert
    if (gewaehlteUebung === "") {
      return;
    }

    const eintrag = {
        id: neueId("e"),
        uebung: gewaehlteUebung,
        uebungId: gewaehlteUebungId,
        muskelgruppe: gewaehlteGruppe,
        gewicht: gewichtFeldWert("feld-gewicht"),
        wdh: feldWert("feld-wdh"),
        saetze: feldWert("feld-saetze"),
        datum: eintragDatum().toISOString()
  };

      eintraege.push(eintrag);
      sicherSpeichern("eintraege", eintraege);

      gewaehlteUebung = "";
      gewaehlteGruppe = "";
      gewaehlteUebungId = "";
      uebungFeldAktualisieren();
      // Zeigt das Log und alles andere neu an, was aus den Einträgen berechnet wird, auch Home
      nachTrainingAnzeigen();
      felderVoreinstellen();
      bestwertPruefen(eintrag, 0);

}

      // Fragt nach, bevor ein Eintrag ohne Datum gelöscht wird
      function loeschenFragen(eintrag) {
        const text = txt("log.loeschenText", {
          name: anzeigeName(eintrag.uebung, eintrag.uebungId),
          saetze: saetzeText(eintrag)
        });
        frageZeigen(txt("log.loeschenFrage"), text, [
          {
            text: txt("loeschen"),
            art: "gefahr",
            aktion: function () {
              loeschen(eintrag);
            }
          },
          { text: txt("abbrechen"), art: "leise" }
        ]);
      }

      function loeschen(eintrag) {
        const platz = eintraege.indexOf(eintrag);
        if (platz === -1) {
          return;
        }
        eintraege.splice(platz, 1);
        sicherSpeichern("eintraege", eintraege);
        trainingsAufraeumen();
        nachTrainingAnzeigen();
      }

      // Sucht den neuesten Eintrag zu einer Übung. Gibt null zurück, wenn es keinen gibt.
      // Verglichen wird über die ID, bei Übungen ohne ID über den Namen.
      // ohneId lässt einen Eintrag aus: im Trainingsmodus den der Übung, die gerade läuft.
      function letzterEintrag(name, id, ohneId) {
        if (name.trim() === "") {
          return null;
        }

        // Der Eintrag mit dem spätesten Datum gewinnt. Einträge ohne Datum gelten als die ältesten.
        let neuester = null;
        let neuesteZeit = 0;

        for (let i = 0; i < eintraege.length; i++) {
          const e = eintraege[i];
          if (gleicheUebung(e, name, id) && (!ohneId || e.id !== ohneId)) {
            let zeit = 0;
            if (e.datum && !isNaN(new Date(e.datum))) {
              zeit = new Date(e.datum).getTime();
            }
            if (neuester === null || zeit >= neuesteZeit) {
              neuester = e;
              neuesteZeit = zeit;
            }
          }
        }
        return neuester;
      }

      // Zeigt unter dem Übung-Feld den letzten Eintrag zur gewählten Übung
      function letztesMalAnzeigen() {
        document.getElementById("letztesMal").textContent = letztesMalText(gewaehlteUebung, gewaehlteUebungId);
      }

      // Der Text "Letztes Mal ..." zu einer Übung. Ohne früheren Eintrag ist er leer.
      function letztesMalText(name, id, ohneId) {
        const e = letzterEintrag(name, id, ohneId);
        if (!e) {
          return "";
        }

        let datumText = "";
        if (e.datum) {
          datumText = " (" + datumMitJahr(new Date(e.datum)) + ")";
        }
        return txt("letztesMal", { datum: datumText, saetze: saetzeText(e) });
      }

  // ---------- Einzelne Sätze ----------

  // Reps in Reserve eines Satzes: eine ganze Zahl von 0 bis 4 (4 heißt "4 oder mehr").
  // Alles andere, auch ein fehlender Wert bei älteren Einträgen, ergibt null (keine Angabe).
  function rirLesen(wert) {
    if (typeof wert !== "number" || Math.round(wert) !== wert || wert < 0 || wert > 4) {
      return null;
    }
    return wert;
  }

  // "RIR 2", bei 4 "RIR 4+"
  function rirText(rir) {
    if (rir === 4) {
      return "RIR 4+";
    }
    return "RIR " + rir;
  }

  // Die Sätze eines Eintrags als Liste von { gewicht, wdh, rir }. Einträge aus dem Trainingsmodus
  // haben sie einzeln gespeichert (einzelsaetze). Bei allen anderen sind alle Sätze gleich,
  // sie entstehen aus Sätze, Wdh. und Gewicht. Steht irgendwo keine Zahl, ist die Liste leer.
  // rir ist null, wenn beim Satz keine Reps in Reserve angegeben wurden.
  // zeit (seit Version 122) ist der Zeitpunkt von "Satz fertig" als ISO-Text. Ältere Sätze haben keine.
  function saetzeVon(e) {
    const liste = [];
    if (Array.isArray(e.einzelsaetze) && e.einzelsaetze.length > 0) {
      for (let i = 0; i < e.einzelsaetze.length; i++) {
        const s = e.einzelsaetze[i];
        if (s) {
          const gewicht = Number(String(s.gewicht).replace(",", "."));
          const wdh = Number(s.wdh);
          if (!isNaN(gewicht) && !isNaN(wdh)) {
            const satz = { gewicht: gewicht, wdh: wdh, rir: rirLesen(s.rir) };
            if (typeof s.zeit === "string") {
              satz.zeit = s.zeit;
            }
            if (s.aufwaermen === true) {
              satz.aufwaermen = true;
            }
            liste.push(satz);
          }
        }
      }
      return liste;
    }

    const gewicht = Number(String(e.gewicht).replace(",", "."));
    const wdh = Number(e.wdh);
    const anzahl = Number(e.saetze);
    if (isNaN(gewicht) || isNaN(wdh) || isNaN(anzahl)) {
      return liste;
    }
    for (let i = 0; i < anzahl && i < 100; i++) {
      liste.push({ gewicht: gewicht, wdh: wdh, rir: null });
    }
    return liste;
  }

  // Das bewegte Gewicht eines Eintrags: Wdh. × Gewicht, über alle Sätze zusammengezählt.
  // zusatz kommt bei jedem Satz zum Gewicht dazu (das Körpergewicht bei Eigengewicht-Übungen, sonst 0).
  // Aufwärmsätze (seit Version 141, Feld aufwaermen: true am Satz) zählen nicht mit: nicht beim Volumen,
  // nicht bei der Zahl der Sätze, nicht beim Satz-Ziel und nicht beim 1RM. Ohne das Feld ist jeder Satz ein Arbeitssatz.
  function istAufwaermen(satz) {
    return !!satz && satz.aufwaermen === true;
  }

  // Wie viele Sätze einer Liste keine Aufwärmsätze sind
  function arbeitsAnzahl(saetze) {
    let n = 0;
    for (let i = 0; i < saetze.length; i++) {
      if (!istAufwaermen(saetze[i])) {
        n++;
      }
    }
    return n;
  }

  // Die Sätze eines Eintrags ohne Aufwärmsätze
  function arbeitsSaetzeVon(e) {
    return saetzeVon(e).filter(function (satz) {
      return !istAufwaermen(satz);
    });
  }

  function eintragVolumen(e, zusatz) {
    const saetze = arbeitsSaetzeVon(e);
    let summe = 0;
    for (let i = 0; i < saetze.length; i++) {
      summe += saetze[i].wdh * (saetze[i].gewicht + zusatz);
    }
    return summe;
  }

  // Die Sätze eines Eintrags als Text in der eingestellten Sprache. Sind alle gleich: "3 Sätze × 10 Wdh. à 80 kg".
  // Unterscheiden sie sich: "80 kg × 10, 10, 8", bei wechselndem Gewicht "80 kg × 10 · 85 kg × 8".
  // Mit Reps in Reserve steht jeder Satz einzeln da: "80 kg × 10 @ RIR 2, 10 @ RIR 1".
  function saetzeText(e) {
    let saetze = [];
    if (Array.isArray(e.einzelsaetze)) {
      saetze = saetzeVon(e);
    }
    let alleGleich = true;
    for (let i = 0; i < saetze.length; i++) {
      if (saetze[i].gewicht !== saetze[0].gewicht || saetze[i].wdh !== saetze[0].wdh || saetze[i].rir !== null) {
        alleGleich = false;
      }
    }
    if (alleGleich) {
      return txtAnzahl("eintrag.gleich", e.saetze, { wdh: e.wdh, gewicht: gewichtText(e.gewicht) });
    }

    const teile = [];
    let i = 0;
    while (i < saetze.length) {
      // Aufeinanderfolgende Sätze mit demselben Gewicht kommen in einen Teil
      const wiederholungen = [];
      const gewicht = saetze[i].gewicht;
      while (i < saetze.length && saetze[i].gewicht === gewicht) {
        let text = String(saetze[i].wdh);
        if (saetze[i].rir !== null) {
          text += " @ " + rirText(saetze[i].rir);
        }
        wiederholungen.push(text);
        i++;
      }
      teile.push(gewichtText(gewicht) + " × " + wiederholungen.join(", "));
    }
    return teile.join(" · ");
  }

  // Sucht einen Eintrag über seine id. Gibt null zurück, wenn es ihn nicht (mehr) gibt.
  function eintragFinden(id) {
    if (!id) {
      return null;
    }
    for (let i = 0; i < eintraege.length; i++) {
      if (eintraege[i] && eintraege[i].id === id) {
        return eintraege[i];
      }
    }
    return null;
  }

  // ---------- Fortschritt ----------

  // Die Zahlen über alle Einträge: Workouts (Tage mit mindestens einem Eintrag), verschiedene Übungen,
  // das bewegte Gesamtgewicht in kg und die Serie in Wochen. Fortschritt und Profil zeigen dieselben Zahlen.
  function gesamtZahlen() {
    const trainingstage = {};    // jeder Tag mit mindestens einem Eintrag
    const tageProWoche = {};     // Anzahl Trainingstage je Woche (Schlüssel: Montag)
    const uebungen = {};         // jede Übung einmal: über ihre ID, eigene Übungen über den Namen
    let anzahlTage = 0;
    let anzahlUebungen = 0;
    let gesamtgewicht = 0;

    for (let i = 0; i < eintraege.length; i++) {
      const e = eintraege[i];

      const name = e.uebung.trim().toLowerCase();
      let schluessel = "name:" + name;
      if (e.uebungId) {
        schluessel = "id:" + e.uebungId;
      }
      if (name !== "" && !uebungen[schluessel]) {
        uebungen[schluessel] = true;
        anzahlUebungen++;
      }

      // Einträge, bei denen keine Zahl steht (z. B. "80kg"), ergeben NaN und werden übersprungen
      gesamtgewicht += eintragVolumen(e, 0);

      if (e.datum && !isNaN(new Date(e.datum))) {
        const datum = new Date(e.datum);
        const tag = tagSchluessel(datum);
        if (!trainingstage[tag]) {
          trainingstage[tag] = true;
          anzahlTage++;
          const woche = montagDerWoche(datum).getTime();
          tageProWoche[woche] = (tageProWoche[woche] || 0) + 1;
        }
      }
    }

    // Serie: Wochen in Folge mit genug Trainingstagen, mit Pausenwochen (serieBerechnen in der raenge.js).
    // Die laufende Woche zählt erst, wenn sie vorbei ist. Sie unterbricht die Serie aber nicht.
    const serie = serieBerechnen(tageProWoche, montagDerWoche(new Date()).getTime(), SERIE_TAGE_PRO_WOCHE, auszeitMontage());

    return {
      workouts: anzahlTage, uebungen: anzahlUebungen, gewicht: gesamtgewicht,
      serie: serie.serie, pausen: serie.pausen, laengsteSerie: serie.laengste, serieErreichtAm: serie.erreichtAm
    };
  }

  function fortschrittAnzeigen() {
    const zahlen = gesamtZahlen();
    document.getElementById("stat-workouts").textContent = zahlen.workouts;
    document.getElementById("stat-gewicht").textContent = volumenText(zahlen.gewicht);
    document.getElementById("stat-uebungen").textContent = zahlen.uebungen;
    document.getElementById("stat-serie").textContent = zahlen.serie;
    document.getElementById("stat-serie-titel").textContent = txt("fortschritt.serie", { n: SERIE_TAGE_PRO_WOCHE });

    konstanzAnzeigen();
    koerpergewichtAnzeigen();
    fortschrittUebungenAnzeigen();
    statistikKorundAnzeigen(zahlen);
    fortschrittReiterAnzeigen();
  }

  // ---------- Fortschritt › Statistik im Look Korund (seit Version 143) ----------

  // So viele kg wiegt ein Auto für den Vergleich "So viel wie 23 Autos"
  const AUTO_KG = 1500;
  // So viele Monate zeigen die Balken unter dem Gesamtgewicht
  const STATISTIK_MONATE = 6;
  // Der Zeitraum für "Volumen je Muskelgruppe" in Tagen
  const VOLUMEN_TAGE = 30;

  // Baut den Reiter Statistik neu: oben das bewegte Gewicht mit Monatsbalken, dann vier Kacheln, dann das Volumen
  // je Körperpartie. Nur im Look Korund zu sehen (style.css blendet es sonst aus). Die Einführung zeigt dort auf diesen
  // Block, in den anderen Looks wie bisher auf die Kacheln.
  function statistikKorundAnzeigen(zahlen) {
    const bereich = document.getElementById("statistik-korund");
    const alt = document.querySelector('#seite-fortschritt .kacheln[data-teil="statistik"]');
    if (!bereich || !alt) {
      return;
    }
    bereich.innerHTML = "";
    if (!lookKorund()) {
      alt.setAttribute("data-tour", "fortschritt-statistik");
      bereich.removeAttribute("data-tour");
      return;
    }
    alt.removeAttribute("data-tour");
    bereich.setAttribute("data-tour", "fortschritt-statistik");

    // Das bewegte Gewicht: in kg als Tonnen, in lbs als ganze Zahl
    const held = element("div", "karte statistik-held");
    held.appendChild(element("div", "statistik-label", txt("statistik.bewegt")));
    const zahl = element("div", "statistik-gross");
    if (einheit() === "kg") {
      zahl.appendChild(element("span", "", (Math.round(zahlen.gewicht / 100) / 10).toLocaleString(gebiet())));
      zahl.appendChild(element("span", "mess-einheit", " " + txt("statistik.tonnen")));
    } else {
      const text = volumenText(zahlen.gewicht);
      zahl.appendChild(element("span", "", text.slice(0, text.lastIndexOf(" "))));
      zahl.appendChild(element("span", "mess-einheit", " " + einheit()));
    }
    held.appendChild(zahl);
    const autos = Math.floor(zahlen.gewicht / AUTO_KG);
    if (autos >= 1) {
      held.appendChild(element("div", "statistik-klein", txtAnzahl("statistik.autos", autos)));
    }

    // Monatsbalken: das Volumen je Kalendermonat, der laufende Monat rechts und kräftig
    const tage = trainingstage();
    const heute = new Date();
    const monate = [];
    for (let i = STATISTIK_MONATE - 1; i >= 0; i--) {
      const anfang = new Date(heute.getFullYear(), heute.getMonth() - i, 1);
      monate.push({ jahr: anfang.getFullYear(), monat: anfang.getMonth(), volumen: 0, name: anfang.toLocaleDateString(gebiet(), { month: "short" }).replace(".", "") });
    }
    Object.keys(tage).forEach(function (s) {
      const d = tage[s].datum;
      for (let i = 0; i < monate.length; i++) {
        if (monate[i].jahr === d.getFullYear() && monate[i].monat === d.getMonth()) {
          monate[i].volumen += tage[s].volumen;
        }
      }
    });
    let groesstes = 0;
    for (let i = 0; i < monate.length; i++) {
      groesstes = Math.max(groesstes, monate[i].volumen);
    }
    if (groesstes > 0) {
      const balken = element("div", "statistik-balken");
      balken.setAttribute("aria-hidden", "true");
      for (let i = 0; i < monate.length; i++) {
        const spalte = element("div", "statistik-spalte" + (i === monate.length - 1 ? " jetzt" : ""));
        const saeule = element("i", "");
        saeule.style.height = Math.max(3, Math.round(monate[i].volumen / groesstes * 52)) + "px";
        spalte.appendChild(saeule);
        spalte.appendChild(element("small", "", monate[i].name));
        balken.appendChild(spalte);
      }
      held.appendChild(balken);
    }
    bereich.appendChild(held);

    // Vier Kacheln: Workouts, Trainingszeit, Serie, Rekorde
    let minuten = 0;
    let einheiten = 0;
    for (let i = 0; i < trainings.length; i++) {
      const t = trainings[i];
      const dauer = t ? (new Date(t.ende) - new Date(t.start)) / 60000 : NaN;
      if (!isNaN(dauer) && dauer > 0 && dauer < 24 * 60) {
        minuten += dauer;
        einheiten++;
      }
    }
    const stand = rangStand();
    const anzahlRekorde = rekorde(stand.uebungen.map(function (u) {
      return u.punkte;
    })).length;
    const kacheln = element("div", "statistik-kacheln");
    const kachel = function (wert, titel, klasse) {
      const k = element("div", "karte statistik-kachel");
      k.appendChild(element("div", "statistik-wert" + (klasse ? " " + klasse : ""), wert));
      k.appendChild(element("div", "statistik-klein", titel));
      kacheln.appendChild(k);
    };
    kachel(String(zahlen.workouts), txt("fortschritt.workouts"));
    kachel(einheiten > 0 ? txt("statistik.stunden", { n: Math.round(minuten / 60) }) : "–", einheiten > 0 ? txt("statistik.schnitt", { m: Math.round(minuten / einheiten) }) : txt("statistik.zeit"));
    kachel(String(zahlen.serie), txt("statistik.serie"), "serie");
    // Ein Tipp auf die Serie öffnet die Seite Serie (seit Version 144)
    const serieKachel = kacheln.lastChild;
    serieKachel.classList.add("tippbar");
    serieKachel.setAttribute("role", "button");
    serieKachel.tabIndex = 0;
    serieKachel.onclick = serieSeiteOeffnen;
    kachel(String(anzahlRekorde), txt("statistik.rekorde"), "rekord");
    bereich.appendChild(kacheln);

    // Volumen je Körperpartie in den letzten 30 Tagen, die größte zuerst
    const grenze = Date.now() - VOLUMEN_TAGE * 86400000;
    const jePartie = {};
    let summe = 0;
    for (let i = 0; i < eintraege.length; i++) {
      const e = eintraege[i];
      if (!hatDatum(e) || new Date(e.datum).getTime() < grenze) {
        continue;
      }
      const partie = erholungPartie(gruppeIdVon(e.uebungId, e.muskelgruppe));
      const volumen = eintragVolumen(e, 0);
      if (!partie || !(volumen > 0)) {
        continue;
      }
      jePartie[partie] = (jePartie[partie] || 0) + volumen;
      summe += volumen;
    }
    if (summe > 0) {
      const karte = element("div", "karte statistik-volumen");
      const kopf = element("div", "statistik-kopf");
      kopf.appendChild(element("span", "statistik-titel", txt("statistik.volumen")));
      kopf.appendChild(element("span", "statistik-klein", txt("statistik.tage", { n: VOLUMEN_TAGE })));
      karte.appendChild(kopf);
      const reihen = Object.keys(jePartie).sort(function (a, b) {
        return jePartie[b] - jePartie[a];
      });
      const groesste = jePartie[reihen[0]];
      for (let i = 0; i < reihen.length; i++) {
        const anteil = jePartie[reihen[i]] / summe;
        const zeile = element("div", "statistik-zeile");
        zeile.appendChild(element("span", "statistik-name", txt("partie." + reihen[i])));
        const bahn = element("span", "statistik-bahn");
        const fuellung = element("i", "");
        fuellung.style.width = Math.round(jePartie[reihen[i]] / groesste * 100) + "%";
        fuellung.style.opacity = String(Math.round((0.45 + 0.55 * jePartie[reihen[i]] / groesste) * 100) / 100);
        bahn.appendChild(fuellung);
        zeile.appendChild(bahn);
        zeile.appendChild(element("span", "statistik-prozent", Math.round(anteil * 100) + " %"));
        karte.appendChild(zeile);
      }
      bereich.appendChild(karte);
    }
  }

  // Look Korund (seit Version 142): Der Fortschritt hat drei Reiter. Welcher Teil wo steht, sagt data-teil in der index.html,
  // die korund.css blendet die anderen aus. In den anderen Looks ist der Umschalter ausgeblendet und alles steht untereinander.
  // Der Reiter wird nie gespeichert, nach dem Öffnen der App ist es wieder "Kraft".
  let fortschrittReiter = "kraft";
  const FORTSCHRITT_REITER = [
    { id: "kraft", schluessel: "fortschritt.reiterKraft" },
    { id: "koerper", schluessel: "fortschritt.reiterKoerper" },
    { id: "statistik", schluessel: "fortschritt.statistik" }
  ];

  // Für die Einführung: stellt den Reiter ein, in dem das Element mit diesem data-tour steht. Nichts wird gespeichert.
  function fortschrittReiterFuer(ziel) {
    const el = document.querySelector('#seite-fortschritt [data-tour="' + ziel + '"]');
    const teil = el ? el.closest("[data-teil]") : null;
    if (teil && teil.getAttribute("data-teil") !== fortschrittReiter) {
      fortschrittReiter = teil.getAttribute("data-teil");
      fortschrittReiterAnzeigen();
    }
  }

  function fortschrittReiterAnzeigen() {
    document.getElementById("seite-fortschritt").setAttribute("data-reiter", fortschrittReiter);
    // Die kleine Zeile über dem Titel passt zum Reiter (seit Version 143): Kraft 30 Tage, Körper der gewählte Zeitraum, Statistik seit Beginn
    let ueber = txt("fortschritt.ueber");
    if (fortschrittReiter === "statistik") {
      ueber = txt("fortschritt.ueberStart");
    } else if (fortschrittReiter === "koerper") {
      ueber = txt("fortschritt.ueberZeitraum." + messStand.kg.zeitraum);
    }
    document.getElementById("fortschritt-ueber").textContent = ueber;
    umschalterBauen(document.getElementById("fortschritt-reiter"), FORTSCHRITT_REITER, fortschrittReiter, function (id) {
      fortschrittReiter = id;
      fortschrittReiterAnzeigen();
    });
  }

  // ---------- Fortschritt: Konstanz (nur im Look Korund zu sehen) ----------

  // So viele Wochen zeigt das Raster, die laufende Woche ist die letzte Zeile
  const KONSTANZ_WOCHEN = 12;
  // Seit Version 142 zeigt das Raster die letzten 30 Tage (zwei Reihen zu 15)
  const KONSTANZ_TAGE = 30;

  // Die Trainingstage der letzten Wochen als Raster: eine Zeile je Woche, Montag bis Sonntag.
  // stufe: 0 = kein Training, 1 = ein Workout, 2 = mehr als ein Workout an dem Tag. Tage nach heute sind "spaeter".
  function konstanzDaten(liste, heute, wochen) {
    const jeTag = {};
    for (let i = 0; i < liste.length; i++) {
      const e = liste[i];
      if (!e || !e.datum || isNaN(new Date(e.datum))) {
        continue;
      }
      const tag = tagSchluessel(new Date(e.datum));
      // Mehrere Einträge eines Trainings zählen als ein Workout: unterschieden wird nach Routine bzw. Stunde
      const training = (e.routineName || "") + "|" + (e.trainingId || new Date(e.datum).getHours());
      if (!jeTag[tag]) {
        jeTag[tag] = {};
      }
      jeTag[tag][training] = true;
    }
    const heuteTag = tagSchluessel(heute);
    const start = montagDerWoche(heute);
    start.setDate(start.getDate() - (wochen - 1) * 7);
    const zeilen = [];
    let tage = 0;
    for (let w = 0; w < wochen; w++) {
      const zeile = [];
      for (let d = 0; d < 7; d++) {
        const datum = new Date(start.getFullYear(), start.getMonth(), start.getDate() + w * 7 + d);
        const tag = tagSchluessel(datum);
        const anzahl = jeTag[tag] ? Object.keys(jeTag[tag]).length : 0;
        zeile.push({ tag: tag, stufe: Math.min(anzahl, 2), heute: tag === heuteTag, spaeter: tag > heuteTag });
        if (anzahl > 0 && tag <= heuteTag) {
          tage++;
        }
      }
      zeilen.push(zeile);
    }
    return { zeilen: zeilen, tage: tage };
  }

  function konstanzAnzeigen() {
    const bereich = document.getElementById("konstanz");
    if (!bereich) {
      return;
    }
    // Seit Version 142 wie im Entwurf: die letzten 30 Tage in zwei Reihen, oben die Serie, unten die Workouts dieser Woche
    const daten = konstanzDaten(eintraege, new Date(), 6);
    const tage = [];
    for (let w = 0; w < daten.zeilen.length; w++) {
      for (let d = 0; d < 7; d++) {
        if (!daten.zeilen[w][d].spaeter) {
          tage.push(daten.zeilen[w][d]);
        }
      }
    }
    const letzte = tage.slice(-KONSTANZ_TAGE);
    let anzahl = 0;
    for (let i = 0; i < letzte.length; i++) {
      if (letzte[i].stufe > 0) {
        anzahl++;
      }
    }
    bereich.innerHTML = "";
    const kopf = element("div", "konstanz-kopf");
    kopf.appendChild(element("span", "konstanz-titel", txt("konstanz.titel")));
    kopf.appendChild(element("span", "konstanz-zahl", txt("konstanz.serie", { n: gesamtZahlen().serie })));
    bereich.appendChild(kopf);

    const raster = element("div", "konstanz-raster");
    raster.setAttribute("role", "img");
    raster.setAttribute("aria-label", txt("konstanz.tage30", { n: anzahl }));
    for (let i = 0; i < letzte.length; i++) {
      raster.appendChild(element("span", "konstanz-feld stufe-" + letzte[i].stufe + (letzte[i].heute ? " heute" : "")));
    }
    bereich.appendChild(raster);

    const fuss = element("div", "konstanz-fuss");
    fuss.appendChild(element("span", "konstanz-fuss-text", txt("konstanz.dieseWoche")));
    const workouts = wochenZahlen(trainingstage(), montagDerWoche(new Date())).workouts;
    const zahl = element("span", "konstanz-fuss-zahl");
    zahl.appendChild(element("b", "", String(workouts)));
    zahl.appendChild(document.createTextNode(" / " + txt("konstanz.workouts", { n: WOCHEN_ZIELE.workouts })));
    fuss.appendChild(zahl);
    bereich.appendChild(fuss);
  }

  // ---------- Training: Helfer ----------

  // Baut ein HTML-Element mit Klasse und Text. Spart bei den vielen Karten Schreibarbeit.
  function element(tag, klasse, text) {
    const el = document.createElement(tag);
    if (klasse) {
      el.className = klasse;
    }
    if (text !== undefined) {
      el.textContent = text;
    }
    return el;
  }

  // Speichert Routinen und Wochenplan
  function routinenSpeichern() {
    sicherSpeichern("routinen", routinen);
    sicherSpeichern("wochenplan", wochenplan);
  }

  // Speichert das laufende Training oder entfernt es, wenn keins mehr läuft
  function trainingMerken() {
    if (laufendesTraining) {
      sicherSpeichern("laufendesTraining", laufendesTraining);
    } else {
      localStorage.removeItem("laufendesTraining");
    }
  }

  // Eine neue, eindeutige id. Der Anfangsbuchstabe zeigt, wofür sie ist:
  // "r" für eine Routine (gilt ohne Angabe), "e" für einen Eintrag, "t" für eine Trainingseinheit.
  function neueId(anfang) {
    idZaehler++;
    return (anfang || "r") + Date.now() + "-" + idZaehler + "-" + Math.floor(Math.random() * 1000000);
  }

  // Sucht eine Routine über ihre id. Gibt null zurück, wenn es sie nicht gibt.
  function routineFinden(id) {
    for (let i = 0; i < routinen.length; i++) {
      if (routinen[i].id === id) {
        return routinen[i];
      }
    }
    return null;
  }

  // Macht aus einer Eingabe ein Ziel: eine ganze Zahl von 1 bis zum Höchstwert, sonst null (kein Ziel)
  function zielLesen(wert, hoechstwert) {
    const zahl = Math.round(Number(wert));
    if (wert === null || wert === "" || isNaN(zahl) || zahl < 1) {
      return null;
    }
    return Math.min(zahl, hoechstwert);
  }

  // Das obere Ende des Wiederholungsbereichs einer Übung, z. B. 12 bei 8–12.
  // Bei einer festen Zahl oder ohne Ziel: null. So sind auch alle älteren Routinen gespeichert.
  function wdhBis(uebung) {
    if (uebung.zielWdh && uebung.zielWdhMax > uebung.zielWdh) {
      return uebung.zielWdhMax;
    }
    return null;
  }

  // Bringt das Wdh.-Ziel einer Übung in Ordnung: Ein Bereich braucht ein unteres und ein größeres oberes Ende.
  // Vertauschte Enden werden getauscht, alles andere wird zu einer festen Zahl (zielWdhMax = null).
  function wdhZielBereinigen(uebung) {
    const von = zielLesen(uebung.zielWdh, 30);
    const bis = zielLesen(uebung.zielWdhMax, 30);
    uebung.zielWdh = von || bis;
    uebung.zielWdhMax = null;
    if (von && bis && von !== bis) {
      uebung.zielWdh = Math.min(von, bis);
      uebung.zielWdhMax = Math.max(von, bis);
    }
  }

  // Der Text zum Ziel einer Übung, z. B. "Ziel: 3 Sätze × 10 Wdh." oder mit Bereich "Ziel: 3 Sätze × 8–12 Wdh.".
  // Zählt jede Seite einzeln, steht "je Seite" dabei. Ohne Ziel ist er leer.
  function zielText(uebung) {
    let wdh = uebung.zielWdh;
    if (wdhBis(uebung)) {
      wdh += "–" + wdhBis(uebung);
    }
    let seiten = "";
    if (zaehltSeiten(uebung)) {
      seiten = "Seiten";
    }
    if (uebung.zielSaetze && uebung.zielWdh) {
      return txt("ziel.beides" + seiten, { saetze: uebung.zielSaetze, wdh: wdh });
    }
    if (uebung.zielSaetze) {
      return txt("ziel.saetze" + seiten, { saetze: uebung.zielSaetze });
    }
    if (uebung.zielWdh) {
      return txt("ziel.wdh", { wdh: wdh });
    }
    return "";
  }

  // Einseitige Übungen (eine Seite nach der anderen, z. B. einarmig). Ein eigenes Feld dafür gibt es in der uebungen.js nicht:
  // Es zählen die Zählung "proSeite" für die Ränge und der Name auf Deutsch oder Englisch (bei eigenen Übungen ihr Name).
  const EINSEITIG_NAME = /einarmig|einbeinig|single[ -]?(arm|leg)|one[ -]?(arm|leg)|split[ -]?squat|ausfallschritt|lunge/i;

  function einseitig(id, name) {
    const u = UEBUNG_NACH_ID[id];
    if (u) {
      return Boolean(u.rang && u.rang.zaehlung === "proSeite") || EINSEITIG_NAME.test(u.de) || EINSEITIG_NAME.test(u.en);
    }
    return typeof name === "string" && EINSEITIG_NAME.test(name);
  }

  // Gibt die Zählweise einer Übung an eine Kopie weiter (Editor, Duplizieren, Trainingsmodus, Import).
  // Gespeichert wird nur "seiten". Fehlt sie oder steht etwas anderes da, bekommt die Kopie kein Feld:
  // So bleibt eine Übung ohne Wahl genau, wie sie war.
  function zaehlweiseKopieren(von, nach) {
    if (von.zaehlweise === "seiten") {
      nach.zaehlweise = "seiten";
    }
  }

  // Zählt bei dieser Übung jede Seite als eigener Satz? Nur mit der Wahl "Einzeln" (zaehlweise "seiten", seit Version 132)
  // und nur bei einer einseitigen Übung. Ohne Feld gilt wie bisher: ein Satz sind beide Seiten.
  function zaehltSeiten(u) {
    return u.zaehlweise === "seiten" && einseitig(u.uebungId, u.name);
  }

  // Das Satz-Ziel, wie es im Trainingsmodus zählt: das Ziel der Routine, bei "Einzeln" je Seite, also doppelt. Ohne Ziel 0.
  function satzZiel(u) {
    const ziel = u.zielSaetze || 0;
    if (zaehltSeiten(u)) {
      return ziel * 2;
    }
    return ziel;
  }

  // Die Nummer eines Satzes zum Anzeigen (seit Version 135). index zählt ab 0. Zählt jede Seite einzeln (seiten = true),
  // ergibt sich die Seite nur aus dem Platz: zuerst rechts, dann links, abwechselnd, also "1 R", "1 L", "2 R" ...
  // Gespeichert wird die Seite nirgends. Sonst wie bisher "1", "2", "3".
  function satzNummer(index, seiten) {
    if (!seiten) {
      return String(index + 1);
    }
    return (Math.floor(index / 2) + 1) + " " + satzSeite(index);
  }

  // "R" für die Sätze auf Platz 0, 2, 4 ..., "L" für 1, 3, 5 ...
  function satzSeite(index) {
    return txt(index % 2 === 0 ? "seite.rechts" : "seite.links");
  }

  // Das Kennzeichen für die Tabellen: die Nummer wie bisher, bei "Einzeln" dahinter klein die Seite (.satz-seite).
  // Ohne "Einzeln" ist es genau das Element von früher.
  function satzNummerElement(index, seiten) {
    if (!seiten) {
      return element("span", "satz-nummer", index + 1);
    }
    const nummer = element("span", "satz-nummer", Math.floor(index / 2) + 1);
    nummer.appendChild(element("span", "satz-seite", satzSeite(index)));
    return nummer;
  }

  // Zählt dieser gespeicherte Eintrag jede Seite einzeln? Am Eintrag steht das nicht: Gehört er zum laufenden Training,
  // gilt dessen Übung, sonst die Übung in seiner Routine (routineId), so wie sie heute eingestellt ist.
  function eintragSeiten(eintrag) {
    if (!eintrag) {
      return false;
    }
    if (laufendesTraining) {
      for (let i = 0; i < laufendesTraining.uebungen.length; i++) {
        if (laufendesTraining.uebungen[i].eintragId === eintrag.id) {
          return zaehltSeiten(laufendesTraining.uebungen[i]);
        }
      }
    }
    const routine = routineFinden(eintrag.routineId);
    if (!routine || typeof eintrag.uebung !== "string") {
      return false;
    }
    for (let i = 0; i < routine.uebungen.length; i++) {
      const u = routine.uebungen[i];
      if (typeof u.name === "string" && gleicheUebung(eintrag, u.name, u.uebungId)) {
        return zaehltSeiten(u);
      }
    }
    return false;
  }

  // "1 Übung" oder "5 Übungen"
  function uebungenText(anzahl) {
    return txtAnzahl("anzahl.uebungen", anzahl);
  }

  // Die Zeile unter dem Namen einer Routine, z. B. "6 Übungen · Brust, Schultern, Trizeps"
  function routineInfo(routine) {
    const gruppen = [];
    for (let i = 0; i < routine.uebungen.length; i++) {
      const gruppe = anzeigeGruppe(routine.uebungen[i].muskelgruppe, routine.uebungen[i].uebungId);
      if (gruppe && gruppen.indexOf(gruppe) === -1) {
        gruppen.push(gruppe);
      }
    }

    let text = uebungenText(routine.uebungen.length);
    if (gruppen.length > 0) {
      text += " · " + gruppen.join(", ");
    }
    return text;
  }

  // Leert im Wochenplan alle Tage, deren Routine es nicht mehr gibt
  function wochenplanBereinigen() {
    for (let i = 0; i < 7; i++) {
      if (wochenplan[i] !== "" && wochenplan[i] !== "ruhe" && !routineFinden(wochenplan[i])) {
        wochenplan[i] = "";
      }
    }
  }

  // Wechselt die Ansicht im Training-Tab
  function trainingAnsichtZeigen(name) {
    const ansichten = ["uebersicht", "varianten", "vorschau", "bearbeiten", "modus", "fertig"];
    for (let i = 0; i < ansichten.length; i++) {
      document.getElementById("ansicht-" + ansichten[i]).classList.toggle("versteckt", ansichten[i] !== name);
    }
    trainingAnsicht = name;
    // Zurück in der Übersicht: Die Bibliothek zeichnet neu, falls die Auswahl inzwischen woanders in Gebrauch war
    bibliothekAnzeigen();
    window.scrollTo(0, 0);
    kopfzeileAktualisieren();
    pauseAnzeigen();
    wachSperreAktualisieren();
    uhrAktualisieren();
    rangMeldungAnsicht();
  }

  // ---------- Training: Rückfrage-Dialog ----------

  // Zeigt eine Frage mit beliebigen Buttons. Jeder Knopf hat einen Text, optional eine Art
  // ("haupt", "leise" oder "gefahr" für rotes Löschen) und optional eine Aktion, die nach dem Antippen läuft.
  function frageZeigen(titel, text, knoepfe) {
    document.getElementById("frage-titel").textContent = titel;
    document.getElementById("frage-text").textContent = text;

    const bereich = document.getElementById("frage-knoepfe");
    bereich.innerHTML = "";
    for (let i = 0; i < knoepfe.length; i++) {
      const btn = element("button", "dialog-btn", knoepfe[i].text);
      if (knoepfe[i].art) {
        btn.classList.add(knoepfe[i].art);
      }
      btn.onclick = function () {
        document.getElementById("frage-hintergrund").classList.remove("offen");
        if (knoepfe[i].aktion) {
          knoepfe[i].aktion();
        }
      };
      bereich.appendChild(btn);
    }
    document.getElementById("frage-hintergrund").classList.add("offen");
  }

  // ---------- Training: Übersicht ----------

  // Baut die ganze Übersicht neu auf
  function trainingAnzeigen() {
    laufendKarteAnzeigen();
    wochenplanAnzeigen();
    trainingHeuteAnzeigen();
    routinenAnzeigen();
    vorlagenAnzeigen();
    trainingReiterAnzeigen();
    // Ist gerade eine Vorlage geöffnet, wird auch sie neu aufgebaut, z. B. nach dem Wechsel der Sprache
    if (trainingAnsicht === "varianten") {
      variantenAnzeigen();
    }
    if (trainingAnsicht === "vorschau") {
      vorschauAnzeigen();
    }
  }

  // ---------- Training: Reiter "Pläne" und "Übungen" ----------

  // Baut den Umschalter und zeigt den gewählten Reiter
  function trainingReiterAnzeigen() {
    umschalterBauen(document.getElementById("training-reiter"), TRAINING_REITER, trainingReiter, function (neu) {
      trainingReiter = neu;
      trainingReiterAnzeigen();
    });
    // Die Unterzeile unter dem Titel passt zum Reiter
    let unterzeile = "training.unterzeile";
    if (trainingReiter === "uebungen") {
      unterzeile = "training.unterzeileUebungen";
    }
    document.getElementById("training-unterzeile").textContent = txt(unterzeile);
    // Look Korund (seit Version 142): Dort steht über dem Titel nur „Woche 42“ (data-korund, korund.css)
    document.getElementById("training-unterzeile").setAttribute("data-korund", txt("training.woche", { nr: kalenderwoche(montagDerWoche(new Date())) }));
    document.getElementById("reiter-plaene").classList.toggle("versteckt", trainingReiter !== "plaene");
    document.getElementById("reiter-uebungen").classList.toggle("versteckt", trainingReiter !== "uebungen");
    bibliothekAnzeigen();
  }

  // Die Bibliothek im Reiter "Übungen": die Übungsauswahl aus dem Sheet, direkt in der Seite.
  // Sie wird nur aufgebaut, wenn sie zu sehen ist und das Sheet zu ist, denn beide teilen sich sheetZiel.
  function bibliothekAnzeigen() {
    if (trainingReiter !== "uebungen" || trainingAnsicht !== "uebersicht" || document.getElementById("sheet").classList.contains("offen")) {
      return;
    }
    if (sheetZiel !== "bibliothek") {
      // Die Auswahl war zuletzt woanders in Gebrauch: von vorn mit den Muskelgruppen
      sheetZiel = "bibliothek";
      sheetGruppenZeigen();
      return;
    }
    // Sonst bleibt alles, wo es war (Muskelgruppe, Suche, Stelle auf der Seite), nur neu gezeichnet,
    // z. B. nach dem Wechsel der Sprache
    const stelle = window.scrollY;
    sheetSucheGeaendert();
    window.scrollTo(0, stelle);
  }

  // Das Suchfeld und der Zurück-Pfeil der Bibliothek. Sie stellen zuerst sicher, dass die Auswahl in die Bibliothek zeichnet.
  function bibliothekSuche() {
    sheetZiel = "bibliothek";
    sheetSucheGeaendert();
  }

  function bibliothekZurueck() {
    sheetZiel = "bibliothek";
    sheetZurueck();
  }

  // Hinweis ganz oben, solange ein Training noch nicht abgeschlossen ist
  function laufendKarteAnzeigen() {
    const bereich = document.getElementById("laufend-karte");
    bereich.innerHTML = "";
    if (!laufendesTraining) {
      return;
    }

    const karte = element("div", "karte laufend");
    karte.appendChild(element("div", "routine-name", txt("training.fortsetzenFrage")));
    karte.appendChild(element("div", "routine-info", laufendesTraining.routineName + " · "
      + txt("uebung.xVonY", { x: laufendesTraining.index + 1, y: laufendesTraining.uebungen.length })));

    const knoepfe = element("div", "karten-knoepfe");
    const weiter = element("button", "knopf haupt", txt("fortsetzen"));
    weiter.onclick = trainingFortsetzen;
    knoepfe.appendChild(weiter);
    const weg = element("button", "knopf leise", txt("modus.abbrechen"));
    weg.onclick = function () {
      trainingAbbrechenFragen();
    };
    knoepfe.appendChild(weg);
    karte.appendChild(knoepfe);
    bereich.appendChild(karte);
  }

  // Wochenplan: pro Wochentag ein Auswahlfeld mit "Nicht geplant", "Ruhetag" und allen Routinen
  function wochenplanAnzeigen() {
    const plan = document.getElementById("wochenplan");
    plan.innerHTML = "";
    const heute = (new Date().getDay() + 6) % 7;

    for (let i = 0; i < 7; i++) {
      const zeile = element("label", "plan-zeile");
      if (i === heute) {
        zeile.classList.add("heute");
      }
      zeile.appendChild(element("span", "plan-tag", wochentag(i)));
      // Look Korund (seit Version 142): das Datum des Tags in dieser Woche (sonst ausgeblendet)
      const tagDatum = montagDerWoche(new Date());
      tagDatum.setDate(tagDatum.getDate() + i);
      zeile.appendChild(element("span", "plan-datum", tagDatum.getDate()));

      const auswahl = document.createElement("select");
      auswahl.appendChild(new Option(txt("plan.nichtGeplant"), ""));
      auswahl.appendChild(new Option(txt("ruhetag"), "ruhe"));
      for (let j = 0; j < routinen.length; j++) {
        auswahl.appendChild(new Option(routinen[j].name, routinen[j].id));
      }
      auswahl.value = wochenplan[i];
      // Look Korund (seit Version 141): Der Plan steht als sieben schmale Tages-Kacheln nebeneinander. Die Auswahl liegt
      // unsichtbar über der Kachel, sichtbar ist nur der kurze Text darunter ("Push", "Ruhe" oder "–"). Nur dort zu sehen.
      const kurz = element("span", "plan-kurz");
      kurz.setAttribute("aria-hidden", "true");
      function kurzSetzen() {
        const routine = routineFinden(auswahl.value);
        kurz.textContent = routine ? routine.name : (auswahl.value === "ruhe" ? txt("ruhetag") : "–");
        zeile.classList.toggle("geplant", Boolean(routine));
      }
      kurzSetzen();
      auswahl.onchange = function () {
        wochenplan[i] = auswahl.value;
        routinenSpeichern();
        kurzSetzen();
      };
      zeile.appendChild(auswahl);
      zeile.appendChild(kurz);
      plan.appendChild(zeile);
    }
  }

  // ---------- Training-Tab im Look Korund (seit Version 142) ----------

  // Ist gerade der Look Korund zu sehen? Er wirkt nur mit Glass im dunklen Design (gewählt oder vom Gerät).
  function lookKorund() {
    const html = document.documentElement;
    const dunkel = html.getAttribute("data-design") === "dunkel"
      || (html.getAttribute("data-design") !== "hell" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    return html.getAttribute("data-stil") === "glass" && html.getAttribute("data-palette") === "korund" && dunkel;
  }

  // Sind die Knöpfe der Routinen zu sehen („Bearbeiten“)? Nur für diese Sitzung.
  let routinenBearbeitenAn = false;

  function routinenBearbeitenUmschalten() {
    routinenBearbeitenAn = !routinenBearbeitenAn;
    document.getElementById("routinen-liste").classList.toggle("bearbeiten-an", routinenBearbeitenAn);
    document.getElementById("routinen-bearbeiten").textContent = txt(routinenBearbeitenAn ? "fertig" : "routinen.bearbeiten");
  }

  // „Vorlagen“ klappt die Vorlagen auf und zu und rollt beim Aufklappen hin
  function vorlagenUmschalten() {
    // Seit Version 143 öffnet der Knopf im Look Korund die Vorlagen als eigene Seite wie im Entwurf
    if (lookKorund()) {
      vorlagenSeiteAnzeigen();
      trainingAnsichtZeigen("varianten");
      window.scrollTo(0, 0);
      return;
    }
    const plaene = document.getElementById("reiter-plaene");
    plaene.classList.toggle("vorlagen-offen");
    if (plaene.classList.contains("vorlagen-offen")) {
      document.getElementById("vorlagen-liste").scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  // Wann eine Routine zuletzt trainiert wurde: in den letzten 6 Tagen der Wochentag ("Di"), sonst das Datum. Ohne: "".
  function routineZuletzt(routine) {
    let zuletzt = null;
    for (let i = 0; i < eintraege.length; i++) {
      const e = eintraege[i];
      if (e && e.routineId === routine.id && hatDatum(e)) {
        const datum = new Date(e.datum);
        if (!zuletzt || datum > zuletzt) {
          zuletzt = datum;
        }
      }
    }
    if (!zuletzt) {
      return "";
    }
    const tage = Math.round((tagNull(new Date()) - tagNull(zuletzt)) / 86400000);
    if (tage < 7) {
      return wochentag((zuletzt.getDay() + 6) % 7);
    }
    return tagMonat(zuletzt);
  }

  function tagNull(datum) {
    return new Date(datum.getFullYear(), datum.getMonth(), datum.getDate()).getTime();
  }

  // Die Karte des heutigen Trainings im Training-Tab: Name, „HEUTE“, Dauer, Übungen, Figuren und „Starten“.
  // Nur wenn heute eine Routine geplant ist und kein Training läuft.
  function trainingHeuteAnzeigen() {
    const bereich = document.getElementById("training-heute");
    bereich.innerHTML = "";
    if (laufendesTraining) {
      return;
    }
    // Look Korund (seit Version 144): oben der Rückblick, wenn er fällig ist, und an Tagen ohne Plan die Karte Ruhetag
    if (lookKorund()) {
      rueckblickKarteAnzeigen(bereich);
    }
    const routine = routineFinden(wochenplan[(new Date().getDay() + 6) % 7]);
    if (!routine) {
      if (lookKorund()) {
        trainingRuhetagAnzeigen(bereich);
      }
      return;
    }
    const karte = element("div", "karte heute-karte training-heute-karte");
    const kopf = element("div", "training-heute-kopf");
    kopf.appendChild(element("span", "training-heute-name", routine.name));
    kopf.appendChild(element("span", "training-heute-marke", txt("heute")));
    karte.appendChild(kopf);
    const meta = element("div", "korund-kopf-meta");
    meta.appendChild(element("span", "korund-dauer", txt("routine.dauer", { n: routineDauerMinuten(routine) })));
    meta.appendChild(element("span", "korund-anzahl", uebungenText(routine.uebungen.length)));
    karte.appendChild(meta);
    karte.appendChild(routineFiguren(routine));
    const start = element("button", "speichern-btn", txt("routine.starten"));
    start.onclick = function () {
      routineStarten(routine);
    };
    karte.appendChild(start);
    bereich.appendChild(karte);
  }

  // Die Symbole der Routine-Karte als Pfad für ein SVG mit 24 × 24 Einheiten: Stift, zwei Blätter, Papierkorb
  const SYMBOL_BEARBEITEN = "M4 20h4L19 9l-4-4L4 16v4zM13.5 6.5l4 4";
  const SYMBOL_DUPLIZIEREN = "M9 9h10v10H9zM5 15V5h10";
  const SYMBOL_LOESCHEN = "M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13M10 11v6M14 11v6";

  // Ein quadratischer Knopf mit Symbol statt Text. Die Ansage nennt Screenreadern, was er tut.
  function symbolKnopf(pfad, ansage) {
    const knopf = element("button", "knopf symbol");
    knopf.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + pfad + '"/></svg>';
    knopf.setAttribute("aria-label", ansage);
    knopf.title = ansage;
    return knopf;
  }

  // Alle eigenen Routinen als Karten: Name, eine Zeile Kurzinfo und eine Reihe mit allen vier Knöpfen
  function routinenAnzeigen() {
    const liste = document.getElementById("routinen-liste");
    liste.innerHTML = "";

    if (routinen.length === 0) {
      liste.appendChild(element("p", "leer-hinweis", txt("routinen.leer")));
      return;
    }

    for (let i = 0; i < routinen.length; i++) {
      const routine = routinen[i];
      const karte = element("div", "karte routine-karte");
      // Die erste Karte erklärt die Einführung im Schritt "Training starten" (einfuehrung.js)
      if (i === 0) {
        karte.setAttribute("data-tour", "training-start");
      }
      karte.appendChild(element("div", "routine-name", routine.name));
      karte.appendChild(element("div", "routine-info", routineInfo(routine)));
      // Look Korund (seit Version 142): kompakte Zeile mit Figuren, „5 Übungen · zuletzt Di“ und Pfeil (sonst ausgeblendet).
      // Ein Tipp auf die Zeile öffnet dort die Routine, die Knöpfe zeigt „Bearbeiten“.
      const figuren = routineFiguren(routine);
      figuren.className = "routine-figuren";
      karte.insertBefore(figuren, karte.firstChild);
      let info = uebungenText(routine.uebungen.length);
      const zuletzt = routineZuletzt(routine);
      if (zuletzt) {
        info += " · " + txt("routine.zuletzt", { tag: zuletzt });
      }
      karte.appendChild(element("div", "routine-korund-info", info));
      const pfeil = element("span", "routine-pfeil", "›");
      pfeil.setAttribute("aria-hidden", "true");
      karte.appendChild(pfeil);
      karte.addEventListener("click", function (ereignis) {
        if (lookKorund() && !routinenBearbeitenAn && !ereignis.target.closest("button")) {
          routineBearbeiten(routine);
        }
      });

      const knoepfe = element("div", "karten-knoepfe");
      const start = element("button", "knopf haupt", txt("routine.starten"));
      start.onclick = function () {
        routineStarten(routine);
      };
      knoepfe.appendChild(start);
      // Vier Textknöpfe passen auf schmalen Bildschirmen nicht nebeneinander, deshalb drei Symbole
      const aendern = symbolKnopf(SYMBOL_BEARBEITEN, txt("routine.bearbeiten"));
      aendern.onclick = function () {
        routineBearbeiten(routine);
      };
      knoepfe.appendChild(aendern);
      const doppelt = symbolKnopf(SYMBOL_DUPLIZIEREN, txt("routine.duplizieren"));
      doppelt.onclick = function () {
        routineDuplizieren(routine, routine.name, routine.uebungen);
      };
      knoepfe.appendChild(doppelt);
      const weg = symbolKnopf(SYMBOL_LOESCHEN, txt("loeschen"));
      weg.onclick = function () {
        routineLoeschenFragen(routine);
      };
      knoepfe.appendChild(weg);
      karte.appendChild(knoepfe);
      liste.appendChild(karte);
    }
  }

  // ---------- Training: Vorlagen ----------
  // Drei Ebenen: Tageszahl (in der Übersicht) → Varianten → Vorschau einer Variante.
  // Die Pläne stehen in der vorlagen.js. Erst "Als Routinen übernehmen" legt etwas an.

  // Die geöffnete Tageszahl (ein Eintrag aus VORLAGEN_PLAENE) und die geöffnete Variante (null = keine)
  let vorlagePlan = null;
  let vorlageVariante = null;

  // Welche Trainingstage in der Vorschau aufgeklappt sind: Nummer des Tags → true
  let vorschauOffen = {};

  // In der Vorschau getauschte Übungen: "Variante/Tag/Slot" → ID der Übung. Sie werden nicht gespeichert
  // und gelten, bis die App geschlossen wird.
  const vorlageGetauscht = {};

  // Der Slot, dessen Übung gerade im Sheet getauscht wird, als { tag, slot } (null = keiner)
  let vorlageTauschStelle = null;

  // Eine Karte zum Antippen: links der Inhalt, rechts ein Pfeil
  function vorlageKarte(aktion) {
    const karte = element("button", "karte vorlage-karte");
    karte.appendChild(element("span", "vorlage-karte-text"));
    const pfeil = element("span", "vorlage-pfeil", "›");
    pfeil.setAttribute("aria-hidden", "true");
    karte.appendChild(pfeil);
    karte.onclick = aktion;
    return karte;
  }

  // Eine flache Kachel zum Antippen: die Zahl mit "Tage", darunter die Zahl der Varianten, unten rechts ein Pfeil
  function vorlageKachel(plan, aktion) {
    const kachel = element("button", "karte vorlage-kachel");
    const oben = element("span", "vorlage-kachel-oben");
    oben.appendChild(element("span", "vorlage-kachel-zahl", String(plan.tage)));
    oben.appendChild(element("span", "vorlage-kachel-wort", txt("vorlage.tageWort")));
    kachel.appendChild(oben);
    kachel.appendChild(element("span", "routine-info", txtAnzahl("vorlage.varianten", plan.varianten.length)));
    const pfeil = element("span", "vorlage-pfeil", "›");
    pfeil.setAttribute("aria-hidden", "true");
    kachel.appendChild(pfeil);
    kachel.onclick = aktion;
    return kachel;
  }

  // Ebene 1 in der Übersicht: 2 bis 5 Tage als flache Kacheln, zwei pro Reihe.
  // "6 Tage" bleibt eine Karte über die volle Breite, ihre Schrift ist dieselbe wie in den Kacheln.
  function vorlagenAnzeigen() {
    const liste = document.getElementById("vorlagen-liste");
    liste.innerHTML = "";

    for (let i = 0; i < VORLAGEN_PLAENE.length; i++) {
      const plan = VORLAGEN_PLAENE[i];
      const oeffnen = function () {
        variantenOeffnen(plan);
      };
      if (plan.tage <= 5) {
        liste.appendChild(vorlageKachel(plan, oeffnen));
        continue;
      }
      const karte = vorlageKarte(oeffnen);
      const oben = element("span", "vorlage-kachel-oben");
      oben.appendChild(element("span", "vorlage-kachel-zahl", String(plan.tage)));
      oben.appendChild(element("span", "vorlage-kachel-wort", txt("vorlage.tageWort")));
      karte.firstChild.appendChild(oben);
      karte.firstChild.appendChild(element("span", "routine-info", txtAnzahl("vorlage.varianten", plan.varianten.length)));
      liste.appendChild(karte);
    }
    vorlagenKorundAnzeigen(liste);
  }

  // Look Korund (seit Version 143): Welche Tageszahl der Umschalter zeigt. Wird nie gespeichert.
  // Ohne Wahl gilt die Zahl der Trainingstage im Wochenplan (2 bis 6), ohne Plan 3.
  let vorlagenTage = 0;

  // Nur im Look Korund zu sehen: oben der Umschalter 2× bis 6×, darunter die Varianten dieser Tageszahl
  // als Karten mit Wochenleiste. Ein Tipp öffnet wie bisher die Vorschau. In den anderen Looks ausgeblendet (style.css).
  // Die Zahl der Trainingstage im Wochenplan, wenn sie zu einer Vorlage passt (2 bis 6), sonst 0
  function vorlagenGeplant() {
    let geplant = 0;
    for (let i = 0; i < wochenplan.length; i++) {
      if (wochenplan[i] && wochenplan[i] !== "ruhe") {
        geplant++;
      }
    }
    return geplant >= 2 && geplant <= 6 ? geplant : 0;
  }

  function vorlagenKorundAnzeigen(liste) {
    if (!vorlagenTage) {
      vorlagenTage = vorlagenGeplant() || 3;
    }
    const bereich = element("div", "vorlagen-korund");
    const schalter = element("div", "umschalter vorlagen-tage");
    const auswahl = VORLAGEN_PLAENE.map(function (p) {
      return { id: p.tage, text: p.tage + "×" };
    });
    umschalterBauen(schalter, auswahl, vorlagenTage, function (tage) {
      vorlagenTage = tage;
      vorlagenAnzeigen();
      if (vorlagenSeiteOffen) {
        vorlagenSeiteAnzeigen();
      }
    });
    bereich.appendChild(schalter);
    for (let i = 0; i < VORLAGEN_PLAENE.length; i++) {
      if (VORLAGEN_PLAENE[i].tage !== vorlagenTage) {
        continue;
      }
      for (let j = 0; j < VORLAGEN_PLAENE[i].varianten.length; j++) {
        const variante = VORLAGEN_PLAENE[i].varianten[j];
        const karte = vorlageKarte(function () {
          vorlagePlan = VORLAGEN_PLAENE[i];
          vorschauOeffnen(variante);
        });
        karte.classList.add("vorlage-variante-korund");
        // "Passt zu dir": der erste Plan der Tageszahl, die dein Wochenplan schon hat
        if (j === 0 && vorlagenTage === vorlagenGeplant()) {
          karte.classList.add("passt");
          karte.firstChild.appendChild(element("span", "vorlage-passt", txt("vorlage.passt")));
        }
        karte.firstChild.appendChild(element("span", "routine-name", txt("vorlage.variante." + variante.id)));
        // Ungefähre Dauer eines Tages wie bei den Routinen: je Satz 45 s plus Standard-Pause
        let saetze = 0;
        for (let t = 0; t < variante.tage.length; t++) {
          for (let k = 0; k < variante.tage[t].slots.length; k++) {
            saetze += variante.tage[t].slots[k].saetze;
          }
        }
        const minuten = Math.round(saetze / variante.tage.length * (45 + pauseStandard()) / 60 / 5) * 5;
        karte.firstChild.appendChild(element("span", "routine-info", txt("routine.dauer", { n: minuten }) + " · " + txt("vorlage.tage", { n: variante.tage.length })));
        const leiste = wochenleisteBauen(variante.wochentage);
        // Unter den Balken der Trainingstage steht das Kürzel des Tags (O, U, Pu, Pl …), sonst der Wochentag
        const namen = variante.tage.map(function (tag) {
          return txt("vorlage.tag." + tag.name);
        });
        // Haben alle Tage dasselbe erste Wort ("Ganzkörper A", "Ganzkörper B"), zählt das letzte Wort
        const ersteWorte = namen.map(function (name) {
          return name.split(" ")[0];
        });
        const gleicherAnfang = namen.length > 1 && ersteWorte.every(function (w) {
          return w === ersteWorte[0];
        });
        const kuerzel = namen.map(function (name) {
          if (gleicherAnfang) {
            return name.split(" ").pop().slice(0, 2);
          }
          const doppelt = namen.some(function (anderer) {
            return anderer !== name && anderer.charAt(0) === name.charAt(0);
          });
          return doppelt ? name.slice(0, 2) : name.charAt(0);
        });
        for (let t = 0; t < variante.wochentage.length; t++) {
          leiste.children[variante.wochentage[t]].textContent = kuerzel[t];
        }
        karte.firstChild.appendChild(leiste);
        bereich.appendChild(karte);
      }
    }
    liste.appendChild(bereich);
  }

  // Ebene 2: die Varianten einer Tageszahl
  function variantenOeffnen(plan) {
    vorlagePlan = plan;
    variantenAnzeigen();
    trainingAnsichtZeigen("varianten");
  }

  function variantenZurueck() {
    trainingAnsichtZeigen("uebersicht");
  }

  // Look Korund: die Seite "Vorlagen" in der Ansicht der Varianten. Oben die Frage, dann Umschalter und Pläne.
  // Die Vorschau geht von dort wie bisher zurück zu dieser Ansicht.
  let vorlagenSeiteOffen = false;

  function vorlagenSeiteAnzeigen() {
    vorlagenSeiteOffen = true;
    document.getElementById("varianten-titel").textContent = txt("training.vorlagen");
    const liste = document.getElementById("varianten-liste");
    liste.innerHTML = "";
    liste.appendChild(element("div", "vorlagen-seite-frage", txt("vorlage.frageKurz")));
    vorlagenKorundAnzeigen(liste);
  }

  function variantenAnzeigen() {
    vorlagenSeiteOffen = false;
    document.getElementById("varianten-titel").textContent = txt("vorlage.tageProWoche", { n: vorlagePlan.tage });
    const liste = document.getElementById("varianten-liste");
    liste.innerHTML = "";

    for (let i = 0; i < vorlagePlan.varianten.length; i++) {
      const variante = vorlagePlan.varianten[i];
      const karte = vorlageKarte(function () {
        vorschauOeffnen(variante);
      });
      karte.firstChild.appendChild(element("span", "routine-name", txt("vorlage.variante." + variante.id)));
      karte.firstChild.appendChild(wochenleisteBauen(variante.wochentage));
      liste.appendChild(karte);
    }
  }

  // Die Trainingstage einer Variante als Text, z. B. "Mo Di Do Fr"
  function vorlageTageText(wochentage) {
    const namen = [];
    for (let i = 0; i < wochentage.length; i++) {
      namen.push(wochentag(wochentage[i]));
    }
    return namen.join(" ");
  }

  // Die Mini-Wochenleiste Montag bis Sonntag: Die Trainingstage sind markiert
  function wochenleisteBauen(wochentage) {
    const leiste = element("span", "vorlage-woche");
    leiste.setAttribute("role", "img");
    leiste.setAttribute("aria-label", vorlageTageText(wochentage));
    for (let i = 0; i < 7; i++) {
      const tag = element("span", "vorlage-wochentag", wochentag(i));
      if (wochentage.indexOf(i) !== -1) {
        tag.classList.add("aktiv");
      }
      leiste.appendChild(tag);
    }
    return leiste;
  }

  // Ebene 3: die Vorschau einer Variante. Der erste Trainingstag ist aufgeklappt.
  function vorschauOeffnen(variante) {
    vorlageVariante = variante;
    vorschauOffen = { 0: true };
    vorschauAnzeigen();
    trainingAnsichtZeigen("vorschau");
  }

  function vorschauZurueck() {
    trainingAnsichtZeigen("varianten");
  }

  // Die Übung, die gerade an einem Slot steht: die getauschte, sonst die Standard-Übung des Plans.
  // Gibt es eine getauschte Übung nicht mehr (eine gelöschte eigene Übung), gilt wieder der Standard.
  function vorlageSlotUebung(variante, tag, slot) {
    const getauscht = UEBUNG_NACH_ID[vorlageGetauscht[variante.id + "/" + tag + "/" + slot]];
    return getauscht || UEBUNG_NACH_ID[variante.tage[tag].slots[slot].uebungId];
  }

  function vorschauAnzeigen() {
    const variante = vorlageVariante;
    document.getElementById("vorschau-titel").textContent = txt("vorlage.variante." + variante.id);
    document.getElementById("vorschau-info").textContent = txt("vorlage.tage", { n: variante.tage.length })
      + " · " + vorlageTageText(variante.wochentage);
    const liste = document.getElementById("vorschau-tage");
    liste.innerHTML = "";

    for (let t = 0; t < variante.tage.length; t++) {
      const tag = variante.tage[t];
      const offen = Boolean(vorschauOffen[t]);
      const box = element("div", "karte vorschau-tag");

      // Der Kopf klappt die Übungsliste auf und zu
      const kopf = element("button", "vorschau-kopf");
      kopf.setAttribute("aria-expanded", String(offen));
      const text = element("span", "vorschau-kopf-text");
      text.appendChild(element("span", "vorschau-tag-name", wochentag(variante.wochentage[t]) + " · " + txt("vorlage.tag." + tag.name)));
      text.appendChild(element("span", "routine-info", uebungenText(tag.slots.length)));
      kopf.appendChild(text);
      const pfeil = element("span", "vorschau-klapp", "›");
      pfeil.setAttribute("aria-hidden", "true");
      kopf.appendChild(pfeil);
      kopf.onclick = function () {
        vorschauOffen[t] = !offen;
        vorschauAnzeigen();
      };
      box.appendChild(kopf);

      if (offen) {
        box.classList.add("offen");
        for (let s = 0; s < tag.slots.length; s++) {
          box.appendChild(vorschauSlotZeile(variante, t, s));
        }
      }
      liste.appendChild(box);
    }
  }

  // Ein Slot in der Vorschau: die Übung, darunter Bewegungsmuster und Sätze × Wdh., rechts der Knopf zum Tauschen
  function vorschauSlotZeile(variante, t, s) {
    const slot = variante.tage[t].slots[s];
    const uebung = vorlageSlotUebung(variante, t, s);
    const zeile = element("div", "vorschau-slot");

    const text = element("div", "vorschau-slot-text");
    text.appendChild(element("div", "vorschau-uebung", uebung[sprache]));
    text.appendChild(element("div", "routine-info", txt("vorlage.muster." + slot.muster) + " · "
      + txt("vorlage.satzWdh", { saetze: slot.saetze, von: slot.wdhVon, bis: slot.wdhBis })));
    zeile.appendChild(text);

    const tausch = element("button", "vorschau-tausch", "⇄");
    tausch.setAttribute("aria-label", txt("vorlage.tauschAnsage", { name: uebung[sprache] }));
    tausch.onclick = function () {
      vorlageTauschStelle = { tag: t, slot: s };
      sheetOeffnen("vorlage");
    };
    zeile.appendChild(tausch);
    return zeile;
  }

  // Steht die Übung am selben Trainingstag schon an einem anderen Slot?
  function vorlageVergeben(id) {
    const stelle = vorlageTauschStelle;
    if (!stelle || !vorlageVariante) {
      return false;
    }
    const slots = vorlageVariante.tage[stelle.tag].slots;
    for (let s = 0; s < slots.length; s++) {
      if (s !== stelle.slot && vorlageSlotUebung(vorlageVariante, stelle.tag, s).id === id) {
        return true;
      }
    }
    return false;
  }

  // Die Vorschläge beim Tauschen in der Vorschau: die Übungen des Bewegungsmusters aus der vorlagen.js.
  // Bei "Übung deiner Wahl" und "Isolation deiner Wahl" gibt es keine Liste, dort sind es die Übungen
  // derselben Muskelgruppe wie die Übung, die gerade am Slot steht.
  function vorlageVorschlaege() {
    const stelle = vorlageTauschStelle;
    const slot = vorlageVariante.tage[stelle.tag].slots[stelle.slot];
    const aktuelle = vorlageSlotUebung(vorlageVariante, stelle.tag, stelle.slot);
    const alternativen = VORLAGEN_MUSTER[slot.muster].alternativen;

    let kandidaten = [];
    for (let i = 0; i < alternativen.length; i++) {
      if (UEBUNG_NACH_ID[alternativen[i]]) {
        kandidaten.push(UEBUNG_NACH_ID[alternativen[i]]);
      }
    }
    if (alternativen.length === 0) {
      const gruppe = uebungGruppe(aktuelle);
      kandidaten = selbstListe.concat(UEBUNGEN).filter(function (u) {
        return uebungGruppe(u) === gruppe;
      });
    }

    const liste = kandidaten.filter(function (u) {
      return u.id !== aktuelle.id && !vorlageVergeben(u.id);
    });
    return { titel: txt("tausch.vorschlaege") + " · " + txt("vorlage.muster." + slot.muster), liste: liste };
  }

  // Setzt die gewählte Übung an den Slot. Sätze, Wiederholungen und das Bewegungsmuster bleiben.
  function vorlageUebungTauschen(id) {
    const stelle = vorlageTauschStelle;
    if (!stelle || !vorlageVariante || !UEBUNG_NACH_ID[id] || vorlageVergeben(id)) {
      return;
    }
    const schluessel = vorlageVariante.id + "/" + stelle.tag + "/" + stelle.slot;
    if (id === vorlageVariante.tage[stelle.tag].slots[stelle.slot].uebungId) {
      // Zurück zur Standard-Übung: Der Tausch wird vergessen
      delete vorlageGetauscht[schluessel];
    } else {
      vorlageGetauscht[schluessel] = id;
    }
    sheetSchliessen();
    vorschauAnzeigen();
  }

  // Der Name für eine Routine aus einer Vorlage. Gibt es ihn schon, kommt " (2)", " (3)" usw. dahinter.
  // vergeben enthält alle Namen in Kleinbuchstaben, die es schon gibt.
  function vorlageRoutineName(name, vergeben) {
    const laenge = document.getElementById("routine-name").maxLength;
    let nummer = 1;
    while (true) {
      let anhang = "";
      if (nummer > 1) {
        anhang = " (" + nummer + ")";
      }
      // Ein langer Name wird gekürzt, damit der Anhang in das Namensfeld passt
      const vorschlag = name.slice(0, laenge - anhang.length).trim() + anhang;
      if (!vergeben[vorschlag.toLowerCase()]) {
        return vorschlag;
      }
      nummer++;
    }
  }

  // "Als Routinen übernehmen": Legt aus jedem Trainingstag der geöffneten Variante eine eigene Routine an,
  // mit den Übungen, die gerade in der Vorschau stehen. Bestehende Routinen bleiben, wie sie sind.
  // Danach die Frage, ob auch der Wochenplan gesetzt werden soll. Er ändert sich nur bei "Ja".
  function vorlageUebernehmen() {
    const variante = vorlageVariante;
    if (!variante) {
      return;
    }

    const vergeben = {};
    for (let i = 0; i < routinen.length; i++) {
      vergeben[String(routinen[i].name).trim().toLowerCase()] = true;
    }

    const neue = [];
    for (let t = 0; t < variante.tage.length; t++) {
      const tag = variante.tage[t];
      const name = vorlageRoutineName(txt("vorlage.routineName", { n: variante.tage.length, name: txt("vorlage.tag." + tag.name) }), vergeben);
      vergeben[name.toLowerCase()] = true;

      const routine = { id: neueId(), name: name, uebungen: [] };
      for (let s = 0; s < tag.slots.length; s++) {
        const slot = tag.slots[s];
        const uebung = vorlageSlotUebung(variante, t, s);
        // Gespeichert wird wie im Editor: die ID, dazu der deutsche Name und die Muskelgruppe als Reserve
        const neu = {
          name: uebung.de,
          uebungId: uebung.id,
          muskelgruppe: GRUPPE_NACH_ID[uebungGruppe(uebung)].de,
          zielSaetze: zielLesen(slot.saetze, 10),
          zielWdh: slot.wdhVon,
          zielWdhMax: slot.wdhBis,
          pause: null
        };
        wdhZielBereinigen(neu);
        routine.uebungen.push(neu);
      }
      routinen.push(routine);
      neue.push(routine);
    }

    // Der Vorschlag für die Woche, einmal als Daten und einmal als Text für die Frage.
    // Tage ohne Training werden Ruhetage.
    const vorschlag = ["ruhe", "ruhe", "ruhe", "ruhe", "ruhe", "ruhe", "ruhe"];
    for (let t = 0; t < neue.length; t++) {
      vorschlag[variante.wochentage[t]] = neue[t].id;
    }
    const zeilen = [];
    let hattePlan = false;
    for (let i = 0; i < 7; i++) {
      const routine = routineFinden(vorschlag[i]);
      if (routine) {
        zeilen.push(wochentag(i) + ": " + routine.name);
      } else {
        zeilen.push(wochentag(i) + ": " + txt("ruhetag"));
      }
      if (wochenplan[i] !== "") {
        hattePlan = true;
      }
    }

    routinenSpeichern();
    trainingAnzeigen();
    trainingAnsichtZeigen("uebersicht");

    let text = txt("vorlage.angelegt", { n: neue.length, plan: zeilen.join("\n") });
    if (hattePlan) {
      text += "\n\n" + txt("vorlage.planErsetzt");
    }
    frageZeigen(txt("vorlage.planFrage"), text, [
      {
        text: txt("vorlage.planJa"),
        art: "haupt",
        aktion: function () {
          wochenplan = vorschlag;
          routinenSpeichern();
          trainingAnzeigen();
        }
      },
      { text: txt("vorlage.planNein"), art: "leise" }
    ]);
  }

  function routineLoeschenFragen(routine) {
    frageZeigen(txt("routine.loeschenFrage"), txt("routine.loeschenText", { name: routine.name }), [
      {
        text: txt("loeschen"),
        art: "haupt",
        aktion: function () {
          routinen.splice(routinen.indexOf(routine), 1);
          wochenplanBereinigen();
          routinenSpeichern();
          trainingAnzeigen();
        }
      },
      { text: txt("abbrechen"), art: "leise" }
    ]);
  }

  // ---------- Training: Routine erstellen und bearbeiten ----------

  function routineNeu() {
    routineBearbeiten(null);
  }

  // Baut die Übungen einer Routine als neue Objekte nach. So teilt die Kopie nichts mit dem Original:
  // Was an der Kopie geändert wird, bleibt in der Kopie.
  function uebungenKopieren(uebungen) {
    const kopie = [];
    for (let i = 0; i < uebungen.length; i++) {
      const u = uebungen[i];
      kopie.push({ name: u.name, uebungId: u.uebungId || "", muskelgruppe: u.muskelgruppe, zielSaetze: u.zielSaetze, zielWdh: u.zielWdh, zielWdhMax: wdhBis(u), pause: uebungPauseLesen(u.pause) });
      zaehlweiseKopieren(u, kopie[i]);
    }
    return kopie;
  }

  // Der Name für die Kopie einer Routine: "Name (Kopie)", und wenn es den schon gibt "Name (Kopie 2)" usw.
  // Endet der Name schon auf "(Kopie)", wird weitergezählt statt "(Kopie) (Kopie)" anzuhängen.
  function kopieName(name) {
    const stamm = name.trim().replace(/ \((Kopie|Copy)( \d+)?\)$/, "");
    const laenge = document.getElementById("routine-name").maxLength;
    let nummer = 1;
    while (true) {
      let anhang = " " + txt("routine.kopie");
      if (nummer > 1) {
        anhang = " " + txt("routine.kopieN", { n: nummer });
      }
      // Ein langer Name wird vorne gekürzt, damit der Anhang in das Namensfeld passt
      const vorschlag = stamm.slice(0, laenge - anhang.length).trim() + anhang;
      let vergeben = false;
      for (let i = 0; i < routinen.length; i++) {
        if (routinen[i].name.trim().toLowerCase() === vorschlag.toLowerCase()) {
          vergeben = true;
        }
      }
      if (!vergeben) {
        return vorschlag;
      }
      nummer++;
    }
  }

  // Legt eine Kopie mit neuer id direkt hinter dem Original an und öffnet sie im Editor.
  // Der Wochenplan bleibt, wie er ist.
  function routineDuplizieren(original, name, uebungen) {
    const kopie = { id: neueId(), name: kopieName(name), uebungen: uebungenKopieren(uebungen) };
    for (let i = 0; i < kopie.uebungen.length; i++) {
      wdhZielBereinigen(kopie.uebungen[i]);
    }
    routinen.splice(routinen.indexOf(original) + 1, 0, kopie);
    routinenSpeichern();
    trainingAnzeigen();
    routineBearbeiten(kopie);
  }

  // "Duplizieren" im Editor: kopiert, was gerade zu sehen ist. Das Original bleibt, wie es gespeichert war.
  function routineDuplizierenAusEditor() {
    const original = routineFinden(bearbeiteteRoutine.id);
    if (!original) {
      return;
    }
    if (bearbeiteteRoutine.uebungen.length === 0) {
      document.getElementById("routine-meldung").textContent = txt("editor.ohneUebung");
      return;
    }
    const name = document.getElementById("routine-name").value.trim() || original.name;
    routineDuplizieren(original, name, bearbeiteteRoutine.uebungen);
  }

  // Öffnet den Editor mit einer Kopie der Routine. Ohne Routine startet er leer.
  function routineBearbeiten(routine) {
    bearbeiteteRoutine = { id: "", name: "", uebungen: [] };
    if (routine) {
      bearbeiteteRoutine.id = routine.id;
      bearbeiteteRoutine.name = routine.name;
      bearbeiteteRoutine.uebungen = uebungenKopieren(routine.uebungen);
    }

    bearbeitenTitelAnzeigen();
    document.getElementById("routine-name").value = bearbeiteteRoutine.name;
    document.getElementById("routine-meldung").textContent = "";
    routineUebungenAnzeigen();
    trainingAnsichtZeigen("bearbeiten");
  }

  // Der Titel über dem Editor: Eine Routine, die es schon gibt, hat eine id
  function bearbeitenTitelAnzeigen() {
    let titel = txt("editor.neu");
    if (bearbeiteteRoutine.id) {
      titel = txt("editor.bearbeiten");
    }
    document.getElementById("bearbeiten-titel").textContent = titel;
    // Duplizieren geht nur bei einer Routine, die schon gespeichert ist
    document.getElementById("routine-duplizieren").classList.toggle("versteckt", !bearbeiteteRoutine.id);
  }

  // Die Übungen der bearbeiteten Routine: Pfeile zum Umsortieren, Ziel-Felder und Entfernen
  function routineUebungenAnzeigen() {
    const liste = document.getElementById("routine-uebungen");
    liste.innerHTML = "";
    const uebungen = bearbeiteteRoutine.uebungen;

    if (uebungen.length === 0) {
      liste.appendChild(element("p", "leer-hinweis", txt("editor.leer")));
      return;
    }

    for (let i = 0; i < uebungen.length; i++) {
      const u = uebungen[i];
      const zeile = element("div", "karte uebung-zeile");
      // Oben Pfeile, Name und Entfernen, darunter die Ziele über die ganze Breite der Karte
      const kopf = element("div", "uebung-kopf");

      const pfeile = element("div", "pfeile");
      const hoch = element("button", "", "↑");
      hoch.setAttribute("aria-label", txt("editor.hoch"));
      hoch.disabled = i === 0;
      hoch.onclick = function () {
        routineUebungVerschieben(i, -1);
      };
      pfeile.appendChild(hoch);
      const runter = element("button", "", "↓");
      runter.setAttribute("aria-label", txt("editor.runter"));
      runter.disabled = i === uebungen.length - 1;
      runter.onclick = function () {
        routineUebungVerschieben(i, 1);
      };
      pfeile.appendChild(runter);
      kopf.appendChild(pfeile);

      const mitte = element("div", "uebung-mitte");
      // Der Name ist ein Button: Antippen zeigt den Verlauf der Übung
      const nameKnopf = element("button", "uebung-name name-knopf", anzeigeName(u.name, u.uebungId));
      nameKnopf.insertAdjacentHTML("beforeend", VERLAUF_ICON);
      nameKnopf.onclick = function () {
        verlaufOeffnen(u.name, u.uebungId);
      };
      mitte.appendChild(nameKnopf);
      const gruppe = anzeigeGruppe(u.muskelgruppe, u.uebungId);
      if (gruppe) {
        mitte.appendChild(element("div", "uebung-gruppe", gruppe));
      }
      kopf.appendChild(mitte);

      const weg = element("button", "entfernen", "✕");
      weg.setAttribute("aria-label", txt("editor.entfernen"));
      weg.onclick = function () {
        uebungen.splice(i, 1);
        routineUebungenAnzeigen();
      };
      kopf.appendChild(weg);
      zeile.appendChild(kopf);

      // Sätze, Wdh. und Pause untereinander: links die Beschriftungen, rechts die Felder
      const ziele = element("div", "ziele");
      ziele.appendChild(zielFeld(txt("saetze"), u, "zielSaetze", 10));
      ziele.appendChild(wdhZielFeld(u));
      ziele.appendChild(pauseFeld(u));
      if (einseitig(u.uebungId, u.name)) {
        ziele.appendChild(zaehlFeld(u));
      }
      zeile.appendChild(ziele);

      liste.appendChild(zeile);
    }
  }

  // Ein kleines Zahlenfeld für ein Ziel. Leer heißt: kein Ziel.
  function zielFeld(titel, uebung, feldName, hoechstwert) {
    const rahmen = element("label", "ziel");
    rahmen.appendChild(element("span", "", titel));

    const feld = document.createElement("input");
    feld.className = "ziel-haupt";
    feld.type = "number";
    feld.inputMode = "numeric";
    feld.min = 1;
    feld.max = hoechstwert;
    feld.placeholder = "–";
    if (uebung[feldName]) {
      feld.value = uebung[feldName];
    }
    feld.oninput = function () {
      uebung[feldName] = zielLesen(feld.value, hoechstwert);
    };
    // Nach dem Verlassen steht im Feld, was wirklich gilt (z. B. 30 statt 50)
    feld.onchange = function () {
      feld.value = uebung[feldName] || "";
    };
    rahmen.appendChild(feld);
    return rahmen;
  }

  // Die Bereiche in der Auswahl für das Wdh.-Ziel im Routinen-Editor
  const WDH_BEREICHE = [[4, 6], [5, 8], [5, 9], [6, 8], [6, 10], [8, 10], [8, 12], [10, 12], [10, 15], [12, 15], [15, 20]];

  // Das Wdh.-Ziel einer Übung als ein Auswahlfeld: oben "Kein Ziel", dann die Bereiche, dann die festen Zahlen 1 bis 30.
  // Gespeichert wird wie bisher in zielWdh und zielWdhMax. Der Wert einer Wahl ist "" (kein Ziel),
  // "8-12" (Bereich) oder "10" (feste Zahl). Ein gespeicherter Bereich, der nicht in der Liste steht,
  // kommt zusätzlich hinein, damit er erhalten bleibt.
  function wdhZielFeld(uebung) {
    const rahmen = element("label", "ziel");
    rahmen.appendChild(element("span", "", txt("wdh")));

    const auswahl = document.createElement("select");
    auswahl.className = "ziel-haupt";
    // Im Feld steht bei "Kein Ziel" nur ein Strich, in der geöffneten Liste der ganze Text
    const keinZiel = new Option("–", "");
    auswahl.appendChild(keinZiel);

    const bereiche = WDH_BEREICHE.slice();
    const bis = wdhBis(uebung);
    let wert = "";
    if (bis) {
      wert = uebung.zielWdh + "-" + bis;
      if (!bereiche.some(function (b) { return b[0] + "-" + b[1] === wert; })) {
        bereiche.push([uebung.zielWdh, bis]);
        bereiche.sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
      }
    } else if (uebung.zielWdh) {
      wert = String(uebung.zielWdh);
    }

    const gruppeBereich = document.createElement("optgroup");
    gruppeBereich.label = txt("editor.eigenerBereich");
    for (let i = 0; i < bereiche.length; i++) {
      gruppeBereich.appendChild(new Option(bereiche[i][0] + "–" + bereiche[i][1], bereiche[i][0] + "-" + bereiche[i][1]));
    }
    auswahl.appendChild(gruppeBereich);

    const gruppeFest = document.createElement("optgroup");
    gruppeFest.label = txt("editor.festeZahl");
    for (let n = 1; n <= 30; n++) {
      gruppeFest.appendChild(new Option(String(n), String(n)));
    }
    auswahl.appendChild(gruppeFest);
    auswahl.value = wert;

    // Beim Öffnen (Fokus) heißt der erste Eintrag "Kein Ziel", danach steht im Feld wieder der Strich
    function keinZielText(text) {
      keinZiel.textContent = text;
    }
    auswahl.addEventListener("focus", function () { keinZielText(txt("editor.keinZiel")); });
    auswahl.addEventListener("blur", function () { keinZielText("–"); });

    // Nur eine Wahl ändert die Übung. Ohne Wahl bleiben zielWdh und zielWdhMax genau, wie sie waren.
    auswahl.onchange = function () {
      keinZielText("–");
      const teile = auswahl.value.split("-");
      if (auswahl.value === "") {
        uebung.zielWdh = null;
        uebung.zielWdhMax = null;
      } else if (teile.length === 2) {
        uebung.zielWdh = Number(teile[0]);
        uebung.zielWdhMax = Number(teile[1]);
      } else {
        uebung.zielWdh = Number(teile[0]);
        uebung.zielWdhMax = null;
      }
    };
    rahmen.appendChild(auswahl);
    return rahmen;
  }

  // Auswahlfeld für die Pause nach jedem Satz dieser Übung. Der erste Eintrag (Wert "") heißt: die Zeit
  // aus dem Profil. Er zeigt diese Zeit an, gespeichert wird aber weiter "keine eigene Pause" (null).
  // So zieht die Übung mit, wenn die Standard-Pause später geändert wird.
  function pauseFeld(uebung) {
    const rahmen = element("label", "ziel");
    rahmen.appendChild(element("span", "", txt("pause")));

    const auswahl = document.createElement("select");
    auswahl.className = "ziel-haupt";
    pauseAuswahlFuellen(auswahl, uebung);
    rahmen.appendChild(auswahl);
    return rahmen;
  }

  // Auswahlfeld "Seiten" für einseitige Übungen (seit Version 132), gebaut wie das Pause-Feld:
  // "Beide" (Standard, ein Satz sind beide Seiten) oder "Einzeln" (jede Seite ist ein eigener Satz, zaehlweise "seiten").
  // "Beide" nimmt das Feld wieder weg, so bleibt eine Übung ohne Wahl genau, wie sie war.
  function zaehlFeld(uebung) {
    const rahmen = element("label", "ziel");
    rahmen.appendChild(element("span", "", txt("editor.seiten")));

    const auswahl = document.createElement("select");
    auswahl.className = "ziel-haupt zaehl-feld";
    auswahl.appendChild(new Option(txt("editor.seitenZusammen"), ""));
    auswahl.appendChild(new Option(txt("editor.seitenEinzeln"), "seiten"));
    auswahl.value = uebung.zaehlweise === "seiten" ? "seiten" : "";
    auswahl.onchange = function () {
      if (auswahl.value === "seiten") {
        uebung.zaehlweise = "seiten";
      } else {
        delete uebung.zaehlweise;
      }
    };
    rahmen.appendChild(auswahl);
    return rahmen;
  }

  // Füllt das Auswahlfeld für die Pause einer Übung im Routinen-Editor und schreibt
  // jede Wahl in uebung.pause. "Keine Pause" ist 0.
  function pauseAuswahlFuellen(auswahl, uebung) {
    // Zwei Überschriften in der aufgeklappten Liste, damit dieselbe Zeit nicht zweimal ohne Erklärung dasteht
    const standard = document.createElement("optgroup");
    standard.label = txt("profil.standardPause");
    standard.appendChild(new Option(pauseText(pauseStandard()), ""));
    auswahl.appendChild(standard);
    const eigene = document.createElement("optgroup");
    eigene.label = txt("editor.pauseEigene");
    eigene.appendChild(new Option(txt("pause.keine"), 0));
    for (let sekunden = PAUSE_SCHRITT; sekunden <= PAUSE_MAX; sekunden += PAUSE_SCHRITT) {
      eigene.appendChild(new Option(pauseText(sekunden), sekunden));
    }
    auswahl.appendChild(eigene);
    const eigen = uebungPauseLesen(uebung.pause);
    if (eigen !== null) {
      auswahl.value = eigen;
    }
    // Eine übernommene Standard-Zeit steht dezenter da als eine selbst gewählte
    auswahl.classList.toggle("uebernommen", eigen === null);
    auswahl.onchange = function () {
      uebung.pause = uebungPauseLesen(auswahl.value);
      auswahl.classList.toggle("uebernommen", uebung.pause === null);
    };
  }

  // Tauscht eine Übung mit der darüber (-1) oder darunter (1)
  function routineUebungVerschieben(index, richtung) {
    const uebungen = bearbeiteteRoutine.uebungen;
    const ziel = index + richtung;
    if (ziel < 0 || ziel >= uebungen.length) {
      return;
    }
    const gemerkt = uebungen[index];
    uebungen[index] = uebungen[ziel];
    uebungen[ziel] = gemerkt;
    routineUebungenAnzeigen();
  }

  // Wird vom Sheet aufgerufen, wenn es aus dem Editor geöffnet wurde
  function routineUebungHinzufuegen(name, gruppe, id) {
    bearbeiteteRoutine.uebungen.push({ name: name, uebungId: id, muskelgruppe: gruppe, zielSaetze: null, zielWdh: null, zielWdhMax: null, pause: null });
    document.getElementById("routine-meldung").textContent = "";
    routineUebungenAnzeigen();
  }

  // Übernimmt die Arbeitskopie: als neue Routine oder anstelle der bisherigen
  function routineSpeichern() {
    const name = document.getElementById("routine-name").value.trim();
    if (name === "") {
      document.getElementById("routine-meldung").textContent = txt("editor.ohneName");
      return;
    }
    if (bearbeiteteRoutine.uebungen.length === 0) {
      document.getElementById("routine-meldung").textContent = txt("editor.ohneUebung");
      return;
    }

    for (let i = 0; i < bearbeiteteRoutine.uebungen.length; i++) {
      wdhZielBereinigen(bearbeiteteRoutine.uebungen[i]);
    }

    const vorhandene = routineFinden(bearbeiteteRoutine.id);
    if (vorhandene) {
      vorhandene.name = name;
      vorhandene.uebungen = bearbeiteteRoutine.uebungen;
    } else {
      routinen.push({ id: neueId(), name: name, uebungen: bearbeiteteRoutine.uebungen });
    }

    bearbeiteteRoutine = null;
    routinenSpeichern();
    trainingAnzeigen();
    trainingAnsichtZeigen("uebersicht");
  }

  function routineBearbeitenAbbrechen() {
    bearbeiteteRoutine = null;
    trainingAnsichtZeigen("uebersicht");
  }

  // ---------- Training: Trainingsmodus ----------

  // Startet eine Routine. Läuft schon ein Training, wird erst gefragt. Hat das laufende Training
  // schon Sätze, folgt bei "neu starten" die Auswahl, ob sie gespeichert oder verworfen werden.
  function routineStarten(routine) {
    if (routine.uebungen.length === 0) {
      return;
    }
    if (!laufendesTraining) {
      trainingBeginnen(routine);
      return;
    }

    frageZeigen(txt("modus.laeuftNoch"), txt("modus.laeuftNochText", { name: laufendesTraining.routineName }), [
      { text: txt("modus.laufendesFortsetzen"), art: "haupt", aktion: trainingFortsetzen },
      {
        text: txt("modus.neuStarten", { name: routine.name }),
        aktion: function () {
          trainingAbbrechenFragen(function () {
            trainingBeginnen(routine);
          });
        }
      },
      { text: txt("abbrechen"), art: "leise" }
    ]);
  }

  // Legt das laufende Training an. Die Übungen werden kopiert, damit spätere Änderungen
  // an der Routine ein laufendes Training nicht durcheinanderbringen.
  function trainingBeginnen(routine) {
    // Mit einem neuen Training lässt sich ein verworfenes nicht mehr zurückholen
    verworfenHinweisSchliessen();
    routineHinweisSchliessen();
    laufendesTraining = {
      routineId: routine.id,
      routineName: routine.name,
      uebungen: [],
      index: 0,
      erledigt: [],
      gestartet: new Date().toISOString()
    };
    for (let i = 0; i < routine.uebungen.length; i++) {
      const u = routine.uebungen[i];
      laufendesTraining.uebungen.push({
        name: u.name,
        uebungId: u.uebungId || "",
        muskelgruppe: u.muskelgruppe || "",
        zielSaetze: u.zielSaetze,
        zielWdh: u.zielWdh,
        zielWdhMax: wdhBis(u),
        pause: uebungPauseLesen(u.pause),
        // Jede Übung merkt sich ihre Sätze und die id des Eintrags, in dem sie gespeichert sind.
        // So bleibt alles erhalten, wenn man zwischen den Übungen wechselt.
        saetze: [],
        eintragId: "",
        extraSatz: false,
        // Nach einem Tausch: die Übungen, die an diesem Platz schon Sätze haben (siehe uebungTauschen)
        getauscht: []
      });
      zaehlweiseKopieren(u, laufendesTraining.uebungen[i]);
    }
    gemerkteTrainingWerte = null;
    trainingMerken();
    trainingFortsetzen();
    // Beim ersten gestarteten Training bietet die Einführung an, den Trainingsmodus kurz zu zeigen (einfuehrung.js)
    einfuehrungAnbieten("modus");
  }

  // Bringt ein gespeichertes Training in die heutige Form. Ältere Versionen kannten nur die Sätze
  // der aktuellen Übung (t.saetze, t.eintragId), jetzt hat jede Übung ihre eigenen.
  // Ein Training aus der Zeit vor dem Tauschen bekommt an jedem Platz eine leere Liste "getauscht".
  function trainingUmwandeln(t) {
    const alt = !Array.isArray(t.uebungen[t.index].saetze);

    for (let i = 0; i < t.uebungen.length; i++) {
      const u = t.uebungen[i];
      if (!Array.isArray(u.saetze)) {
        u.saetze = [];
      }
      if (typeof u.eintragId !== "string") {
        u.eintragId = "";
      }
      u.extraSatz = Boolean(u.extraSatz);

      // Nur brauchbare getauschte Übungen bleiben: mit Namen und Sätzen
      const getauscht = [];
      if (Array.isArray(u.getauscht)) {
        for (let j = 0; j < u.getauscht.length; j++) {
          const g = u.getauscht[j];
          if (g && typeof g.name === "string" && Array.isArray(g.saetze) && g.saetze.length > 0 && typeof g.eintragId === "string") {
            getauscht.push(g);
          }
        }
      }
      u.getauscht = getauscht;
      if (u.ursprung && typeof u.ursprung.name !== "string") {
        delete u.ursprung;
      }
    }
    if (!alt) {
      return;
    }

    // Die aktuelle Übung übernimmt, was bisher am Training selbst hing
    const aktuell = t.uebungen[t.index];
    if (Array.isArray(t.saetze)) {
      aktuell.saetze = t.saetze;
    }
    if (typeof t.eintragId === "string") {
      aktuell.eintragId = t.eintragId;
    }
    aktuell.extraSatz = Boolean(t.extraSatz);

    // Die Übungen davor bekommen ihre Sätze aus den Einträgen zurück, die schon im Log stehen
    for (let i = 0; i < t.erledigt.length; i++) {
      const eintrag = eintragFinden(t.erledigt[i].id);
      if (!eintrag || eintrag.id === aktuell.eintragId) {
        continue;
      }
      for (let j = 0; j < t.index; j++) {
        const u = t.uebungen[j];
        if (u.eintragId === "" && u.name === eintrag.uebung) {
          u.eintragId = eintrag.id;
          u.saetze = saetzeVon(eintrag);
          break;
        }
      }
    }

    delete t.saetze;
    delete t.eintragId;
    delete t.extraSatz;
    delete t.uebersprungen;
    sicherSpeichern("laufendesTraining", t);
  }

  // Öffnet den Trainingsmodus an der Stelle, an der das Training steht
  function trainingFortsetzen() {
    if (aktiveSeite !== "training") {
      seiteZeigen("training");
    }
    trainingAnsichtZeigen("modus");
    modusAnzeigen();
  }

  // Was am laufenden Training hängt: seine Einträge im Log, die Zahl der Sätze und das bewegte Gewicht.
  // Zum Training gehören genau die Einträge, deren id es sich gemerkt hat. Jeder davon ist im
  // Trainingsmodus neu entstanden, andere Einträge derselben Übung haben eine andere id.
  function trainingStand() {
    const t = laufendesTraining;
    const ids = [];
    for (let i = 0; i < t.erledigt.length; i++) {
      ids.push(t.erledigt[i].id);
    }
    for (let i = 0; i < t.uebungen.length; i++) {
      ids.push(t.uebungen[i].eintragId);
    }

    const stand = { eintraege: [], saetze: 0, bewegt: 0 };
    for (let i = 0; i < ids.length; i++) {
      const eintrag = eintragFinden(ids[i]);
      if (!ids[i] || !eintrag || stand.eintraege.indexOf(eintrag) !== -1) {
        continue;
      }
      stand.eintraege.push(eintrag);
      stand.saetze += arbeitsSaetzeVon(eintrag).length;
      stand.bewegt += eintragVolumen(eintrag, 0);
    }
    return stand;
  }

  // "3 Sätze · 2 Übungen · 1.240 kg"
  function trainingStandText(stand) {
    return txtAnzahl("anzahl.saetze", stand.saetze) + " · " + txtAnzahl("anzahl.uebungen", stand.eintraege.length)
      + " · " + volumenText(stand.bewegt);
  }

  // Setzt die laufende Einheit und die Pause zurück. Die Einträge im Log bleiben, wie sie sind.
  function trainingZuruecksetzen() {
    pause = null;
    pauseVorbeiSeit = 0;
    localStorage.removeItem("pause");

    laufendesTraining = null;
    gemerkteTrainingWerte = null;
    trainingMerken();
  }

  // Zeigt alles neu an, was aus den Einträgen und dem laufenden Training berechnet wird
  function nachTrainingAnzeigen() {
    anzeigen();
    letztesMalAnzeigen();
    wochenleisteAnzeigen();
    trainingAnzeigen();
    if (aktiveSeite === "home") {
      homeAnzeigen();
    }
    if (aktiveSeite === "fortschritt") {
      fortschrittAnzeigen();
    }
    if (aktiveSeite === "profil") {
      profilAnzeigen();
    }
  }

  // Beendet ein Training, in dem noch kein Satz eingetragen ist: ohne Rückfrage, gespeichert wird nichts
  function trainingOhneSaetzeBeenden() {
    trainingZuruecksetzen();
    if (trainingAnsicht === "modus") {
      trainingAnsichtZeigen("uebersicht");
    }
    nachTrainingAnzeigen();
  }

  // Das zuletzt verworfene Training für "Rückgängig" (null = keins): die laufende Einheit und ihre
  // Einträge mit dem Platz, an dem sie im Log standen. Es gilt nur, solange der Hinweis zu sehen ist.
  let verworfenesTraining = null;

  // Die Uhr, die den Hinweis "Training verworfen" wieder ausblendet
  let verworfenUhr = null;

  // So lange bleibt "Rückgängig" nach dem Verwerfen stehen, in Millisekunden
  const VERWORFEN_ANZEIGE = 8000;

  // Verwirft das laufende Training: Seine Einträge verschwinden aus dem Log, alle anderen bleiben unberührt.
  // Einheit und Pause werden zurückgesetzt. Danach lässt es sich kurz zurückholen.
  function trainingVerwerfen() {
    const t = laufendesTraining;
    const stand = trainingStand();

    const geloescht = [];
    for (let i = 0; i < stand.eintraege.length; i++) {
      geloescht.push({ platz: eintraege.indexOf(stand.eintraege[i]), eintrag: stand.eintraege[i] });
    }
    geloescht.sort(function (a, b) {
      return a.platz - b.platz;
    });
    // Von hinten nach vorn, damit die Plätze davor stimmen
    for (let i = geloescht.length - 1; i >= 0; i--) {
      eintraege.splice(geloescht[i].platz, 1);
    }
    sicherSpeichern("eintraege", eintraege);

    trainingZuruecksetzen();
    if (trainingAnsicht === "modus") {
      trainingAnsichtZeigen("uebersicht");
    }
    nachTrainingAnzeigen();

    verworfenesTraining = { training: t, eintraege: geloescht };
    document.getElementById("verworfen-hinweis").classList.add("sichtbar");
    clearTimeout(verworfenUhr);
    verworfenUhr = setTimeout(verworfenHinweisSchliessen, VERWORFEN_ANZEIGE);
  }

  // Blendet den Hinweis aus. Damit ist auch "Rückgängig" vorbei.
  function verworfenHinweisSchliessen() {
    clearTimeout(verworfenUhr);
    verworfenUhr = null;
    verworfenesTraining = null;
    document.getElementById("verworfen-hinweis").classList.remove("sichtbar");
  }

  // "Rückgängig": Die verworfenen Einträge kommen an ihren Platz zurück, und das Training läuft wieder
  function verwerfenRueckgaengig() {
    const v = verworfenesTraining;
    verworfenHinweisSchliessen();
    if (!v || laufendesTraining) {
      return;
    }

    // Von vorn nach hinten, so landet jeder Eintrag wieder an seinem alten Platz
    for (let i = 0; i < v.eintraege.length; i++) {
      eintraege.splice(Math.min(v.eintraege[i].platz, eintraege.length), 0, v.eintraege[i].eintrag);
    }
    sicherSpeichern("eintraege", eintraege);

    laufendesTraining = v.training;
    trainingMerken();
    nachTrainingAnzeigen();
    trainingFortsetzen();
  }

  // "Abbrechen" außerhalb des Trainingsmodus: fragt, ob die bisherigen Sätze gespeichert oder verworfen werden.
  // Ohne Sätze endet das Training ohne Rückfrage. danach läuft, sobald das Training weg ist
  // (z. B. der Start einer anderen Routine). Ohne danach zeigt Speichern die Zusammenfassung.
  function trainingAbbrechenFragen(danach) {
    const stand = trainingStand();
    if (stand.saetze === 0) {
      trainingOhneSaetzeBeenden();
      if (danach) {
        danach();
      }
      return;
    }

    frageZeigen(txt("modus.abbrechenFrage"), trainingStandText(stand), [
      {
        text: txt("modus.bisherigeSpeichern"),
        art: "haupt",
        aktion: function () {
          if (danach) {
            trainingseinheitSpeichern(laufendesTraining);
            trainingZuruecksetzen();
            danach();
            return;
          }
          if (aktiveSeite !== "training") {
            seiteZeigen("training");
          }
          trainingAbschliessen();
        }
      },
      {
        text: txt("modus.allesVerwerfen"),
        art: "gefahr",
        aktion: function () {
          trainingVerwerfen();
          if (danach) {
            danach();
          }
        }
      },
      { text: txt("modus.weitermachen"), art: "leise" }
    ]);
  }

  // Zeigt die aktuelle Übung und stellt die Räder ein
  function modusAnzeigen() {
    const t = laufendesTraining;
    const u = t.uebungen[t.index];

    document.getElementById("modus-routine").textContent = t.routineName;
    document.getElementById("modus-schritt").textContent = txt("uebung.xVonY", { x: t.index + 1, y: t.uebungen.length }) + " ▾";
    document.getElementById("modus-zurueck").disabled = t.index === 0;
    document.getElementById("modus-vor").disabled = t.index === t.uebungen.length - 1;
    document.getElementById("modus-uebung").textContent = anzeigeName(u.name, u.uebungId);
    // Das Bild der Übung aus der bilder.js und darunter die Geräte-Zeile, z. B. "Maschine · Brust"
    document.getElementById("modus-bild").innerHTML = uebungsBild(u.uebungId);
    // Look Korund (seit Version 142): die Muskelfigur statt des Bilds (sonst ausgeblendet)
    document.getElementById("modus-figur").innerHTML = uebungFigurSvg(u);
    document.getElementById("modus-erklaerung").classList.toggle("versteckt", erklaerungId(u.uebungId, u.name) === "");
    const bekannt = UEBUNG_NACH_ID[u.uebungId];
    let geraet = "";
    if (bekannt) {
      geraet = bereichName(bekannt.bereich) + " · " + anzeigeGruppe("", u.uebungId);
    }
    document.getElementById("modus-geraet").textContent = geraet;
    gewichtTitelSetzen("t-feld-gewicht", u.uebungId);
    document.getElementById("modus-ziel").textContent = zielText(u);
    document.getElementById("modus-hinweis").textContent = steigerungText(u);
    modusChipsAnzeigen(u);
    document.getElementById("modus-notiz-feld").value = notizen[notizSchluessel(u)] || "";

    modusFortschrittAnzeigen();
    modusZustandAnzeigen(true);
    modusSaetzeAnzeigen();
    modusLetztesAnzeigen();
  }

  // Das letzte Training einer Übung: { datum, saetze, bester }. Ohne früheren Eintrag mit Sätzen: null.
  // datum ist null, wenn der Eintrag keins hat. bester ist der Platz des Satzes mit dem höchsten
  // geschätzten 1RM (bei Eigengewicht-Übungen mit dem Körpergewicht des Tages), der frühere gewinnt
  // bei Gleichstand. Sind alle Sätze gleich stark, ist bester -1.
  // ohneId lässt einen Eintrag aus: den der Übung, die gerade läuft.
  function letztesTrainingDaten(name, id, ohneId) {
    const e = letzterEintrag(name, id, ohneId);
    if (!e) {
      return null;
    }
    const saetze = saetzeVon(e);
    if (saetze.length === 0) {
      return null;
    }

    let datum = null;
    let zusatz = 0;
    if (hatDatum(e)) {
      datum = new Date(e.datum);
      zusatz = koerperZusatz(e.uebungId, datum);
    }

    let bester = 0;
    let hoechstes = -Infinity;
    let niedrigstes = Infinity;
    for (let i = 0; i < saetze.length; i++) {
      if (istAufwaermen(saetze[i])) {
        continue;
      }
      const wert = epley1RM(saetze[i].gewicht + zusatz, saetze[i].wdh);
      if (wert > hoechstes) {
        hoechstes = wert;
        bester = i;
      }
      niedrigstes = Math.min(niedrigstes, wert);
    }
    if (hoechstes === niedrigstes) {
      bester = -1;
    }
    return { datum: datum, saetze: saetze, bester: bester };
  }

  // Im Trainingsmodus: das letzte Training der gezeigten Übung, ein Kästchen je Satz mit den Spalten
  // Gewicht, Wdh. und RIR. Der Satz mit der Nummer, die heute dran ist, ist hervorgehoben.
  // Ohne früheres Training steht dort nur ein kurzer Hinweis.
  function modusLetztesAnzeigen() {
    const bereich = document.getElementById("modus-letztes");
    bereich.innerHTML = "";
    const t = laufendesTraining;
    if (!t || !t.uebungen[t.index]) {
      return;
    }
    const u = t.uebungen[t.index];
    const daten = letztesTrainingDaten(u.name, u.uebungId, u.eintragId);
    if (!daten) {
      bereich.appendChild(element("p", "letztes-mal", txt("letztesMal.leer")));
      return;
    }

    // Das Datum steht in einem eigenen Element, damit es rechts neben der Überschrift stehen kann
    const kopf = element("h2", "abschnitt", txt("letztes.titel"));
    if (daten.datum) {
      kopf.appendChild(element("span", "letztes-datum", datumMitJahr(daten.datum)));
    }
    bereich.appendChild(kopf);

    // Der Platz des Satzes, der heute dran ist. Nach dem letzten Ziel-Satz ist keiner dran,
    // bis "+ Satz" einen weiteren startet (dieselbe Regel wie in modusSaetzeAnzeigen).
    const eintrag = eintragFinden(u.eintragId);
    let dran = 0;
    if (eintrag) {
      dran = arbeitsAnzahl(saetzeVon(eintrag));
    }
    const ziel = satzZiel(u);
    if (ziel > 0 && dran >= ziel && !u.extraSatz) {
      dran = -1;
    }

    const karte = element("div", "karte satz-liste");
    for (let i = 0; i < daten.saetze.length; i++) {
      const satz = daten.saetze[i];
      const zeile = element("div", "letztes-zeile");
      // Aufwärmsätze stehen mit "W" da und zählen beim Vergleich mit heute nicht mit (seit Version 141)
      const platz = istAufwaermen(satz) ? -1 : arbeitsIndex(daten.saetze, i);
      if (platz >= 0 && platz === dran) {
        zeile.classList.add("aktuell");
      }
      zeile.appendChild(satzKennungElement(daten.saetze, i, zaehltSeiten(u)));
      seiteLMarkieren(zeile, zaehltSeiten(u) ? platz : -1);

      // Drei Spalten, jede mit kleinem Titel und dem Wert darunter. Ohne RIR-Angabe steht ein Strich.
      let rir = "–";
      if (rirLesen(satz.rir) !== null) {
        rir = rirText(satz.rir).replace("RIR ", "");
      }
      const spalten = [
        { titel: txt("gewicht"), wert: gewichtText(satz.gewicht) },
        { titel: txt("wdh"), wert: satz.wdh },
        { titel: "RIR", wert: rir }
      ];
      for (let s = 0; s < spalten.length; s++) {
        const spalte = element("span", "letztes-spalte");
        spalte.appendChild(element("span", "letztes-titel", spalten[s].titel));
        spalte.appendChild(element("span", "letztes-wert", spalten[s].wert));
        zeile.appendChild(spalte);
      }
      if (i === daten.bester) {
        zeile.appendChild(element("span", "letztes-bestes", txt("letztes.bestes")));
      }
      karte.appendChild(zeile);
    }
    bereich.appendChild(karte);
  }

  // Der Balken oben füllt sich mit jeder Übung, die mindestens einen Satz hat
  function modusFortschrittAnzeigen() {
    const t = laufendesTraining;
    let begonnen = 0;
    for (let i = 0; i < t.uebungen.length; i++) {
      if (platzBegonnen(t.uebungen[i])) {
        begonnen++;
      }
    }
    document.getElementById("modus-fortschritt").style.width = (begonnen / t.uebungen.length * 100) + "%";
  }

  // Kurzhantel-Übungen (seit Version 139). Ein eigenes Feld dafür gibt es in der uebungen.js nicht, wie bei einseitig
  // zählt der Name auf Deutsch oder Englisch (bei eigenen Übungen ihr Name).
  const KURZHANTEL_NAME = /kurzhantel|dumbbell/i;

  function kurzhantel(id, name) {
    const u = UEBUNG_NACH_ID[id];
    if (u) {
      return KURZHANTEL_NAME.test(u.de) || KURZHANTEL_NAME.test(u.en);
    }
    return typeof name === "string" && KURZHANTEL_NAME.test(name);
  }

  // Um so viel steigt der Vorschlag in der gewählten Einheit: bei Kurzhanteln in kg 2 kg, sonst wie die Gewichtsknöpfe
  // (2,5 kg oder 5 lbs). Die Knöpfe selbst bleiben bei ihrem Schritt.
  function steigerungSchritt(u) {
    if (einheit() === "kg" && kurzhantel(u.uebungId, u.name)) {
      return KURZHANTEL_SCHRITT_KG;
    }
    return GEWICHT_EINHEITEN[einheit()].schritt;
  }

  // Der Vorschlag für den ersten Satz einer Übung im Trainingsmodus, aus dem letzten Training dieser Übung.
  // Arbeitsgewicht ist das schwerste Gewicht vom letzten Mal, leichtere Sätze (Aufwärmen) zählen nicht.
  // Die Regel: Haben mindestens so viele Sätze mit dem Arbeitsgewicht, wie das Satz-Ziel vorgibt (mindestens einer),
  // das obere Ende des Wdh.-Ziels erreicht (bei einer festen Zahl diese Zahl), geht es einen Schritt der
  // Gewichtsknöpfe hoch (2,5 kg oder 5 lbs, bei Kurzhanteln in kg 2 kg, steigerungSchritt, in der gewählten Einheit gerechnet,
  // nicht gerundet), mit dem unteren Ende als Wdh. Sonst bleibt das Gewicht, mit den Wdh. des ersten Satzes mit dem Arbeitsgewicht.
  // Nie gesteigert wird ohne Wdh.-Ziel, bei Eigengewicht ohne Zusatzgewicht und nach mehr als STEIGERN_PAUSE_TAGE Tagen.
  // Zurück kommt { art, gewicht (kg), wdh, alt (kg), ziel } mit art "steigern", "halten", "pause", "eigengewicht"
  // oder "ohneZiel". Ohne früheres Training mit Sätzen: null.
  function steigerungVorschlag(u) {
    const letzter = letzterEintrag(u.name, u.uebungId, u.eintragId);
    if (!letzter) {
      return null;
    }
    const saetze = arbeitsSaetzeVon(letzter);
    if (saetze.length === 0) {
      return null;
    }

    let alt = saetze[0].gewicht;
    for (let i = 1; i < saetze.length; i++) {
      alt = Math.max(alt, saetze[i].gewicht);
    }
    const arbeit = saetze.filter(function (s) { return s.gewicht === alt; });
    const vorschlag = { art: "halten", gewicht: alt, wdh: arbeit[0].wdh, alt: alt, ziel: wdhBis(u) || u.zielWdh };

    if (!u.zielWdh) {
      vorschlag.art = "ohneZiel";
      return vorschlag;
    }
    if (hatDatum(letzter) && Date.now() - new Date(letzter.datum).getTime() > STEIGERN_PAUSE_TAGE * 24 * 60 * 60 * 1000) {
      vorschlag.art = "pause";
      return vorschlag;
    }
    const erreicht = arbeit.filter(function (s) { return s.wdh >= vorschlag.ziel; }).length;
    if (erreicht < arbeit.length || erreicht < Math.max(1, satzZiel(u))) {
      return vorschlag;
    }
    if (istEigengewicht(u.uebungId) && alt <= 0) {
      vorschlag.art = "eigengewicht";
      return vorschlag;
    }
    vorschlag.art = "steigern";
    vorschlag.gewicht = zuKg(ausKg(alt) + steigerungSchritt(u));
    vorschlag.wdh = u.zielWdh;
    return vorschlag;
  }

  // Der Hinweis unter dem Ziel im Trainingsmodus zum Vorschlag, z. B. "+2,5 kg: …" oder "Gleiches Gewicht: …".
  // Ohne Vorschlag und ohne Wdh.-Ziel ist er leer.
  function steigerungText(u) {
    if (!steigernAn()) {
      return "";
    }
    const v = steigerungVorschlag(u);
    if (!v || v.art === "ohneZiel") {
      return "";
    }
    if (v.art === "steigern") {
      const schritt = "+" + zahlText(steigerungSchritt(u)) + " " + einheit();
      return txt("modus.steigern", { schritt: schritt, gewicht: gewichtText(v.alt), wdh: v.ziel });
    }
    if (v.art === "pause") {
      return txt("modus.haltenPause", { tage: STEIGERN_PAUSE_TAGE });
    }
    if (v.art === "eigengewicht") {
      return txt("modus.eigengewicht");
    }
    return txt("modus.halten", { wdh: v.ziel });
  }

  // ---------- Notizen je Übung (seit Version 141) ----------

  // Der Schlüssel einer Übung für die Notizen: ihre ID, ohne ID der Name (kleingeschrieben, ohne Leerzeichen am Rand)
  function notizSchluessel(u) {
    if (u.uebungId) {
      return u.uebungId;
    }
    return "name:" + nameSaeubern(u.name).toLowerCase();
  }

  // Speichert die Notiz der Übung, die im Trainingsmodus offen ist. Eine leere Notiz wird entfernt.
  function notizSpeichern() {
    const t = laufendesTraining;
    if (!t || !t.uebungen[t.index]) {
      return;
    }
    const schluessel = notizSchluessel(t.uebungen[t.index]);
    const text = document.getElementById("modus-notiz-feld").value.trim();
    if (text === "") {
      delete notizen[schluessel];
    } else {
      notizen[schluessel] = text.slice(0, 300);
    }
    sicherSpeichern("notizen", notizen);
  }

  // Prüft Notizen aus einem Backup: nur Texte bis 300 Zeichen
  function notizenBereinigen(roh) {
    const sauber = {};
    if (roh && typeof roh === "object" && !Array.isArray(roh)) {
      Object.keys(roh).forEach(function (schluessel) {
        if (typeof roh[schluessel] === "string" && roh[schluessel].trim() !== "") {
          sauber[schluessel] = roh[schluessel].trim().slice(0, 300);
        }
      });
    }
    return sauber;
  }

  // Look Korund (seit Version 141): Ziel und Vorschlag der Übung als Chips über "Satz 2 von 3".
  // Dieselben Werte wie zielText und steigerungVorschlag, nur kurz: "3 Sätze", "8–12 Wdh." und das Gewicht des Vorschlags.
  // Steigt der Vorschlag, steht ein Pfeil davor und der Chip ist grün (Klasse "steigt"). Ohne Ziel und Vorschlag bleibt die Zeile leer.
  function modusChipsAnzeigen(u) {
    const behaelter = document.getElementById("modus-chips");
    behaelter.innerHTML = "";
    if (u.zielSaetze) {
      behaelter.appendChild(element("span", "modus-chip", txt(zaehltSeiten(u) ? "chip.saetzeSeiten" : "chip.saetze", { n: u.zielSaetze })));
    }
    if (u.zielWdh) {
      let wdh = String(u.zielWdh);
      if (wdhBis(u)) {
        wdh += "–" + wdhBis(u);
      }
      behaelter.appendChild(element("span", "modus-chip", txt("chip.wdh", { wdh: wdh })));
    }
    // Einseitige Übung (seit Version 141): Ein Tipp schaltet für dieses Training zwischen "Beide" und "Einzeln" (R/L) um
    if (einseitig(u.uebungId, u.name)) {
      const seiten = element("button", "modus-chip seiten-chip", txt(zaehltSeiten(u) ? "chip.seitenEinzeln" : "chip.seitenBeide"));
      seiten.type = "button";
      seiten.setAttribute("aria-pressed", zaehltSeiten(u) ? "true" : "false");
      seiten.setAttribute("aria-label", txt("chip.seitenAria"));
      // Nach dem ersten Satz ist die Wahl fest: Ein Satz mit "Beide" lässt sich nicht sinnvoll in R und L aufteilen
      if (u.saetze.length > 0) {
        seiten.classList.add("gesperrt");
      }
      seiten.onclick = function () {
        seitenUmschalten(u);
      };
      behaelter.appendChild(seiten);
    }
    const v = steigernAn() ? steigerungVorschlag(u) : null;
    if (v && v.art !== "ohneZiel" && v.gewicht > 0) {
      const chip = element("span", "modus-chip vorschlag", gewichtText(v.gewicht));
      chip.setAttribute("aria-label", txt("chip.vorschlag", { gewicht: gewichtText(v.gewicht) }));
      if (v.art === "steigern") {
        chip.classList.add("steigt");
        chip.textContent = "↑ " + chip.textContent;
      }
      behaelter.appendChild(chip);
    }
  }

  // Schaltet bei einer einseitigen Übung im laufenden Training um: "Beide" (ein Satz sind beide Seiten) oder "Einzeln"
  // (jede Seite ein eigener Satz, R und L). Es gilt nur für dieses Training, die Routine bleibt, wie sie ist.
  // Nur vor dem ersten Satz der Übung: Danach bleibt die Wahl, damit kein Satz falsch als R oder L dasteht.
  function seitenUmschalten(u) {
    // Umstellen geht nur, solange die Übung in diesem Training noch keinen Satz hat (auch keinen Aufwärmsatz)
    if (u.saetze.length > 0) {
      frageZeigen(txt("seiten.festTitel"), txt("seiten.festText"), [{ text: txt("ok"), art: "haupt" }]);
      return;
    }
    if (zaehltSeiten(u)) {
      delete u.zaehlweise;
    } else {
      u.zaehlweise = "seiten";
    }
    trainingMerken();
    document.getElementById("modus-ziel").textContent = zielText(u);
    modusChipsAnzeigen(u);
    modusFortschrittAnzeigen();
    modusZustandAnzeigen(false);
    modusSaetzeAnzeigen();
    modusLetztesAnzeigen();
  }

  // Zeigt im Trainingsmodus den passenden Teil: die Eingabe für den nächsten Satz, den Countdown
  // der Pause oder nach dem letzten Ziel-Satz die Wahl zwischen "Nächste Übung" und "+ Satz".
  // Läuft jede Viertelsekunde, solange eine Pause läuft. felderNeu = true stellt die Zahlenfelder in jedem Fall neu ein.
  function modusZustandAnzeigen(felderNeu) {
    const t = laufendesTraining;
    if (!t || !t.uebungen[t.index]) {
      return;
    }
    const u = t.uebungen[t.index];
    const ziel = satzZiel(u);
    // Aufwärmsätze zählen nicht zum Ziel
    const gemacht = arbeitsAnzahl(u.saetze);
    // Weiter geht es zur nächsten offenen Übung. Ist keine mehr offen, wird das Training abgeschlossen.
    const naechsteIndex = naechsteOffene();
    const keineOffene = naechsteIndex < 0;
    const pauseLaeuft = pauseRest() > 0;
    const zielErreicht = ziel > 0 && gemacht >= ziel && !u.extraSatz;

    // "Satz 2 von 4". Ohne Ziel und bei einem zusätzlichen Satz nur "Satz 5".
    // Bei "Einzeln" mit Seite und dem Ziel je Seite: "Satz 2 L von 3", am Ende "3 von 3 Sätzen je Seite geschafft".
    const seiten = zaehltSeiten(u);
    let satzText = txt("modus.satz", { n: satzNummer(gemacht, seiten) });
    if (zielErreicht && gemacht === ziel && seiten) {
      satzText = txt("modus.zielGeschafftSeiten", { n: u.zielSaetze, ziel: u.zielSaetze });
    } else if (zielErreicht && gemacht === ziel) {
      satzText = txt("modus.zielGeschafft", { n: gemacht, ziel: ziel });
    } else if (zielErreicht) {
      satzText = txt("modus.geschafft", { n: gemacht });
    } else if (gemacht < ziel) {
      satzText = txt("modus.satzVon", { n: satzNummer(gemacht, seiten), ziel: seiten ? u.zielSaetze : ziel });
    }
    document.getElementById("modus-satz").textContent = satzText;

    let weiterText = txt("modus.naechste");
    if (keineOffene) {
      weiterText = txt("modus.abschliessen");
    }
    document.getElementById("modus-wahl-weiter").textContent = weiterText;

    // Der kleine Button unten: Ohne einen einzigen Satz wird die Übung übersprungen
    const weiter = document.getElementById("modus-weiter");
    if (gemacht === 0) {
      weiter.textContent = txt("modus.uebungUeberspringen");
    } else {
      weiter.textContent = weiterText;
    }
    weiter.classList.toggle("versteckt", zielErreicht);

    // Pause: Countdown und was danach kommt
    document.getElementById("modus-pause").classList.toggle("versteckt", !pauseLaeuft);
    document.getElementById("modus-countdown").textContent = pauseText(Math.ceil(pauseRest() / 1000));
    // Look Korund (seit Version 141): Der Ring um den Countdown zeigt den Rest der Pause, gemessen an der Pause dieser Übung.
    // Nur eine Variable für die korund.css, gespeichert wird nichts. Nach "+15 s" bleibt der Ring höchstens voll.
    const dauer = pauseDauer(u) * 1000;
    document.getElementById("modus-pause").style.setProperty("--pause-anteil", dauer > 0 ? Math.min(1, pauseRest() / dauer).toFixed(3) : "1");
    let danach = txt("modus.alsNaechstes", { text: satzText });
    if (zielErreicht && keineOffene) {
      danach = txt("modus.alleErledigt");
    } else if (zielErreicht) {
      const naechste = t.uebungen[naechsteIndex];
      danach = txt("modus.danach", { name: anzeigeName(naechste.name, naechste.uebungId) });
    }
    document.getElementById("modus-naechstes").textContent = danach;

    document.getElementById("modus-wahl").classList.toggle("versteckt", !zielErreicht);
    document.getElementById("modus-vorbei").classList.toggle("versteckt", Date.now() - pauseVorbeiSeit >= PAUSE_VORBEI_ANZEIGE);

    // Die Eingabe erscheint wieder (z. B. nach der Pause): die Zahlenfelder für den nächsten Satz einstellen
    const eingabe = document.getElementById("modus-eingabe");
    const zeigen = !pauseLaeuft && !zielErreicht;
    const warVersteckt = eingabe.classList.contains("versteckt");
    eingabe.classList.toggle("versteckt", !zeigen);
    if (zeigen && (warVersteckt || felderNeu)) {
      modusFelderSetzen();
    }
    modusKorundAnzeigen(u, gemacht, zielErreicht, naechsteIndex, pauseLaeuft);
  }

  // ---------- Trainingsmodus im Look Korund (seit Version 142) ----------
  // Alles hier füllt Elemente, die die style.css ausblendet und nur die korund.css zeigt. Gespeichert wird nichts.

  // Der zuletzt fertige Satz für "Satz 2 gespeichert · 32 kg × 8" in der Pause. Nur im Speicher der Seite.
  let letzterSatzHinweis = null;

  // Merkt den gerade fertigen Satz als Text für die Pause, z. B. "Satz 2 gespeichert · 32 kg × 8"
  function satzHinweisMerken(u) {
    const satz = u.saetze[u.saetze.length - 1];
    letzterSatzHinweis = txt("pause.gespeichert", { n: satzKennung(u.saetze, u.saetze.length - 1, zaehltSeiten(u)), satz: gewichtText(satz.gewicht) + " × " + satz.wdh });
  }

  function modusKorundAnzeigen(u, gemacht, zielErreicht, naechsteIndex, pauseLaeuft) {
    const t = laufendesTraining;
    // "Letztes Mal 30 × 8": derselbe Arbeitssatz im letzten Training dieser Übung
    let letztmal = "";
    const daten = letztesTrainingDaten(u.name, u.uebungId, u.eintragId);
    if (daten && !zielErreicht) {
      const arbeit = daten.saetze.filter(function (satz) {
        return !istAufwaermen(satz);
      });
      const satz = arbeit[Math.min(gemacht, arbeit.length - 1)];
      if (satz) {
        letztmal = txt("modus.letztmal", { satz: zahlKurz(gewichtAnzeige(satz.gewicht)) + " × " + satz.wdh });
      }
    }
    document.getElementById("modus-letztmal").textContent = letztmal;

    // Pause: "von 2:00" im Ring, der gespeicherte Satz und die Karte "Als Nächstes"
    const countdown = document.getElementById("modus-countdown");
    countdown.setAttribute("data-von", txt("pause.von", { zeit: pauseText(pauseDauer(u)) }));
    const gespeichert = document.getElementById("modus-gespeichert");
    gespeichert.textContent = letzterSatzHinweis ? letzterSatzHinweis : "";
    if (!pauseLaeuft) {
      return;
    }
    const karte = document.getElementById("modus-als-naechstes");
    let naechste = u;
    if (zielErreicht) {
      naechste = naechsteIndex >= 0 ? t.uebungen[naechsteIndex] : null;
    }
    const schluessel = naechste ? naechste.name + "|" + naechste.saetze.length + "|" + zaehltSeiten(naechste) : "fertig";
    if (karte.getAttribute("data-schluessel") === schluessel) {
      return;
    }
    karte.setAttribute("data-schluessel", schluessel);
    karte.innerHTML = "";
    if (!naechste) {
      karte.appendChild(element("div", "naechstes-titel", txt("modus.alleErledigt")));
      return;
    }
    const figur = element("div", "naechstes-figur");
    figur.innerHTML = uebungFigurSvg(naechste);
    karte.appendChild(figur);
    const text = element("div", "naechstes-text");
    const nummer = satzNummer(arbeitsAnzahl(naechste.saetze), zaehltSeiten(naechste));
    text.appendChild(element("div", "naechstes-label", txt("pause.alsNaechstes", { n: nummer })));
    text.appendChild(element("div", "naechstes-name", anzeigeName(naechste.name, naechste.uebungId)));
    // Gewicht: der letzte Satz von heute, sonst der Vorschlag oder das letzte Mal. Wdh.: das Ziel, sonst die vom Satz.
    let gewicht = null;
    let wdh = "";
    if (naechste.saetze.length > 0) {
      const davor = naechste.saetze[naechste.saetze.length - 1];
      gewicht = davor.gewicht;
      wdh = davor.wdh;
    } else {
      const vorschlag = steigernAn() ? steigerungVorschlag(naechste) : null;
      if (vorschlag) {
        gewicht = vorschlag.gewicht;
        wdh = vorschlag.wdh;
      }
    }
    if (naechste.zielWdh) {
      wdh = naechste.zielWdh + (wdhBis(naechste) ? "–" + wdhBis(naechste) : "");
    }
    const teile = [];
    if (gewicht !== null) {
      teile.push(gewichtText(gewicht));
    }
    if (wdh !== "") {
      teile.push(txt("chip.wdh", { wdh: wdh }));
    }
    text.appendChild(element("div", "naechstes-ziel", teile.join(" × ")));
    karte.appendChild(text);
  }

  // "‹" oben links im Trainingsmodus (Look Korund): zurück zu Home, das Training läuft weiter
  function modusVerlassen() {
    seiteZeigen("home");
  }

  // "…" oben rechts und der Knopf unten links (Look Korund): die Aktionen, die dort sonst als Knöpfe stehen
  function modusOptionenOeffnen() {
    const knoepfe = [
      { text: txt("tausch.knopf"), aktion: tauschOeffnen },
      { text: txt("modus.uebungUeberspringen"), aktion: uebungBeenden },
      { text: txt("modus.beenden"), art: "gefahr", aktion: function () { trainingBeendenFragen(); } },
      { text: txt("abbrechen"), art: "leise" }
    ];
    frageZeigen(txt("modus.optionen"), "", knoepfe);
  }

  // Die Werte, mit denen die Zahlenfelder für den nächsten Satz starten: die des Satzes davor,
  // beim ersten Satz der Vorschlag aus dem letzten Training (steigerungVorschlag), bei ausgeschaltetem
  // Schalter "Gewicht automatisch steigern" wie bis Version 127 der erste Satz vom letzten Mal,
  // ohne früheres Training die Startwerte und das Wdh.-Ziel der Routine
  function modusStartWerte() {
    const t = laufendesTraining;
    const u = t.uebungen[t.index];
    if (u.saetze.length > 0) {
      const davor = u.saetze[u.saetze.length - 1];
      return [davor.gewicht, davor.wdh];
    }

    if (steigernAn()) {
      const vorschlag = steigerungVorschlag(u);
      if (vorschlag) {
        return [vorschlag.gewicht, vorschlag.wdh];
      }
    } else {
      const letzter = letzterEintrag(u.name, u.uebungId, u.eintragId);
      const saetze = letzter ? arbeitsSaetzeVon(letzter) : [];
      if (saetze.length > 0) {
        return [saetze[0].gewicht, saetze[0].wdh];
      }
    }
    return [startGewicht(), u.zielWdh || START_WDH];
  }

  // Ist der Schalter "Gewicht automatisch steigern" an? Ohne Eintrag in den Einstellungen: an.
  function steigernAn() {
    return einstellungen.steigern !== false;
  }

  // Zeigt den Schalter in den Einstellungen so, wie er gespeichert ist
  function steigernAnzeigen() {
    document.getElementById("steigern-schalter").setAttribute("aria-checked", String(steigernAn()));
  }

  // Ein Tipp auf die Zeile legt den Schalter um. Er gilt ab dem nächsten Anzeigen einer Übung im Trainingsmodus.
  function steigernUmlegen() {
    einstellungen.steigern = !steigernAn();
    einstellungenSpeichern();
    steigernAnzeigen();
  }

  // Stellt die zwei Zahlenfelder ein: auf die gemerkte Eingabe (nach einem Tab-Wechsel), sonst auf die Startwerte.
  // Die Reps in Reserve sind bei jedem neuen Satz erst einmal nicht gewählt.
  function modusFelderSetzen() {
    const werte = gemerkteTrainingWerte || modusStartWerte();
    gewichtFeldSetzen("t-feld-gewicht", startGewicht());
    feldSetzen("t-feld-wdh", START_WDH);
    gewichtFeldSetzen("t-feld-gewicht", werte[0]);
    feldSetzen("t-feld-wdh", werte[1]);

    gewaehlterRir = null;
    if (gemerkteTrainingWerte) {
      gewaehlterRir = rirLesen(gemerkteTrainingWerte[2]);
    }
    rirAnzeigen();
    // Jeder neue Satz ist erst einmal ein Arbeitssatz
    aufwaermenGewaehlt = false;
    wKnopfAnzeigen("modus-w", false);
  }

  // Die Auswahl der Reps in Reserve
  const RIR_AUSWAHL = [
    { id: 0, text: "0" },
    { id: 1, text: "1" },
    { id: 2, text: "2" },
    { id: 3, text: "3" },
    { id: 4, text: "4+" }
  ];

  // Baut die Auswahl der Reps in Reserve. Ein Tipp auf den gewählten Wert nimmt die Angabe wieder zurück.
  function rirAnzeigen() {
    umschalterBauen(document.getElementById("modus-rir"), RIR_AUSWAHL, gewaehlterRir, function (rir) {
      if (gewaehlterRir === rir) {
        gewaehlterRir = null;
      } else {
        gewaehlterRir = rir;
      }
      rirAnzeigen();
    });
  }

  // "Satz fertig": Der Satz kommt in den Eintrag der Übung, danach startet die Pause.
  // Der Eintrag entsteht mit dem ersten Satz und wächst mit jedem weiteren. So geht nichts verloren,
  // wenn das Handy die App mitten in der Übung schließt.
  // routineId und routineName halten fest, aus welcher Routine der Eintrag stammt.
  function satzFertig() {
    const t = laufendesTraining;
    const u = t.uebungen[t.index];

    // rir steht nur im Satz, wenn es angegeben wurde. zeit hält fest, wann der Satz fertig war.
    const satz = { gewicht: gewichtFeldWert("t-feld-gewicht"), wdh: feldWert("t-feld-wdh") };
    if (gewaehlterRir !== null) {
      satz.rir = gewaehlterRir;
    }
    satz.zeit = new Date().toISOString();
    // Aufwärmsatz (seit Version 141): nur, wenn "W" gewählt ist. Danach ist "W" wieder aus.
    if (aufwaermenGewaehlt) {
      satz.aufwaermen = true;
    }
    aufwaermenGewaehlt = false;
    wKnopfAnzeigen("modus-w", false);
    u.saetze.push(satz);
    if (!satz.aufwaermen) {
      u.extraSatz = false;
    }
    satzHinweisMerken(u);

    let eintrag = eintragFinden(u.eintragId);
    if (!eintrag) {
      eintrag = {
        id: neueId("e"),
        uebung: u.name,
        uebungId: u.uebungId || "",
        muskelgruppe: u.muskelgruppe,
        datum: new Date().toISOString(),
        routineId: t.routineId,
        routineName: t.routineName
      };
      eintraege.push(eintrag);
      u.eintragId = eintrag.id;
      t.erledigt.push({ id: eintrag.id, uebung: eintrag.uebung });
    }

    eintragSaetzeSchreiben(eintrag, u.saetze);

    sicherSpeichern("eintraege", eintraege);
    anzeigen();
    letztesMalAnzeigen();

    gemerkteTrainingWerte = null;
    trainingMerken();
    // Bei "Keine Pause" (0) gibt es keinen Countdown, die Eingabe für den nächsten Satz steht gleich da
    const dauer = pauseDauer(u);
    if (dauer > 0) {
      pauseStarten(dauer);
    }
    // Mit dem letzten Ziel-Satz geht es gleich zur nächsten offenen Übung, die Pause läuft dort weiter.
    // Ohne Satz-Ziel ist nicht klar, welcher Satz der letzte ist, und ohne offene Übung bleibt die App hier.
    const naechste = naechsteOffene();
    if (!satz.aufwaermen && satzZiel(u) > 0 && arbeitsAnzahl(u.saetze) === satzZiel(u) && naechste >= 0) {
      uebungZeigen(naechste);
    } else {
      modusFortschrittAnzeigen();
      // Ohne Pause steht die Eingabe gleich wieder da: Zahlenfelder und RIR neu wie nach einer Pause
      modusZustandAnzeigen(dauer === 0);
      modusSaetzeAnzeigen();
      modusLetztesAnzeigen();
      window.scrollTo(0, 0);
    }
    bestwertPruefen(eintrag, u.saetze.length - 1);
  }

  // Schreibt eine Liste von Sätzen in einen Eintrag: die einzelnen Sätze, dazu wie bei jedem Eintrag
  // Sätze, Wdh. und Gewicht, also die Anzahl der Sätze und die Werte des schwersten Satzes
  // (bei gleichem Gewicht der mit mehr Wdh.). Die Liste darf nicht leer sein.
  function eintragSaetzeSchreiben(eintrag, saetze) {
    let schwerster = saetze[0];
    eintrag.einzelsaetze = [];
    for (let i = 0; i < saetze.length; i++) {
      const s = saetze[i];
      const einzeln = { gewicht: s.gewicht, wdh: s.wdh };
      if (rirLesen(s.rir) !== null) {
        einzeln.rir = s.rir;
      }
      if (typeof s.zeit === "string") {
        einzeln.zeit = s.zeit;
      }
      if (s.aufwaermen === true) {
        einzeln.aufwaermen = true;
      }
      eintrag.einzelsaetze.push(einzeln);
      if (s.gewicht > schwerster.gewicht || (s.gewicht === schwerster.gewicht && s.wdh > schwerster.wdh)) {
        schwerster = s;
      }
    }
    eintrag.saetze = saetze.length;
    eintrag.gewicht = schwerster.gewicht;
    eintrag.wdh = schwerster.wdh;
  }

  // Nach dem Speichern eines Satzes: Liegt er um mehr als 15 % über dem Bestwert der Übung aus den letzten
  // 14 Tagen, fragt die App einmal nach, ob der Wert stimmt. Gespeichert ist er in jedem Fall schon.
  // Verglichen wird mit den anderen Einträgen der Übung. Ein früherer Satz desselben Eintrags,
  // der schon genauso gut war, verhindert die zweite Nachfrage.
  function bestwertPruefen(eintrag, index) {
    const saetze = saetzeVon(eintrag);
    const satz = saetze[index];
    if (!satz || istAufwaermen(satz) || !hatDatum(eintrag)) {
      return;
    }
    const datum = new Date(eintrag.datum);
    const koerper = koerperZusatz(eintrag.uebungId, datum);
    if (!rangSatzGueltig(satz.gewicht + koerper, satz.wdh)) {
      return;
    }
    const neu = epley1RM(satz.gewicht + koerper, satz.wdh);
    for (let i = 0; i < index; i++) {
      if (!istAufwaermen(saetze[i]) && epley1RM(saetze[i].gewicht + koerper, saetze[i].wdh) >= neu) {
        return;
      }
    }
    const vorher = bestwertIn(verlaufPunkte(eintrag.uebung, eintrag.uebungId, "rang", eintrag.id), datum.getTime(), PLAUSIBEL_TAGE);
    if (!vorher || !bestwertUnplausibel(neu, vorher.wert)) {
      return;
    }
    frageZeigen(txt("plausibel.titel"), txt("plausibel.text", {
      name: anzeigeName(eintrag.uebung, eintrag.uebungId),
      satz: satzText(satz),
      tage: PLAUSIBEL_TAGE
    }), [
      { text: txt("plausibel.ja"), art: "haupt" },
      {
        text: txt("plausibel.bearbeiten"),
        aktion: function () {
          satzSheetOeffnen(eintrag.id, index);
        }
      }
    ]);
  }

  // ---------- Satz bearbeiten ----------

  // Der Satz, der gerade im Sheet bearbeitet wird: die id seines Eintrags und sein Platz in den Sätzen.
  // satzRir ist die Auswahl der Reps in Reserve im Sheet.
  let satzEintragId = "";
  let satzIndex = -1;
  let satzRir = null;
  // Ist der bearbeitete Satz ein Aufwärmsatz? Umschalten mit "W" im Sheet (nur im Look Korund zu sehen).
  let satzW = false;

  // Ist "W" für den nächsten Satz im Trainingsmodus gewählt? Nur im Speicher der Seite, nach "Satz fertig" wieder aus.
  let aufwaermenGewaehlt = false;

  // Zeigt einen der zwei Knöpfe "W" (Trainingsmodus "modus-w", Sheet "satz-w") an oder aus
  function wKnopfAnzeigen(id, an) {
    const knopf = document.getElementById(id);
    if (knopf && knopf.setAttribute) {
      knopf.setAttribute("aria-pressed", an ? "true" : "false");
      // Zusätzlich als Klasse: Daran hängt die Farbe in der korund.css
      knopf.classList.toggle("an", an);
    }
  }

  // Ein Tipp auf "W" im Trainingsmodus: Der nächste Satz wird ein Aufwärmsatz (noch ein Tipp nimmt es zurück)
  function aufwaermenUmschalten() {
    aufwaermenGewaehlt = !aufwaermenGewaehlt;
    wKnopfAnzeigen("modus-w", aufwaermenGewaehlt);
    // Die Überschrift sagt, was als Nächstes kommt: "Aufwärmsatz" oder wieder "Satz 1 von 3"
    if (aufwaermenGewaehlt) {
      document.getElementById("modus-satz").textContent = txt("w.satz");
    } else {
      modusZustandAnzeigen(false);
    }
  }

  // Ein Tipp auf "W" im Sheet "Satz bearbeiten"
  function satzWUmschalten() {
    satzW = !satzW;
    wKnopfAnzeigen("satz-w", satzW);
  }

  // Bei "Seiten: Einzeln" bekommt die linke Seite eines Paars die Klasse "seite-l". Der Look Korund zeigt R und L
  // damit als zusammengehörigen Block (korund.css), sonst ändert die Klasse nichts. platz < 0: keine Seite.
  function seiteLMarkieren(zeile, platz) {
    if (platz >= 0 && platz % 2 === 1) {
      zeile.classList.add("seite-l");
    }
  }

  // Der Platz eines Satzes unter den Arbeitssätzen davor (ohne Aufwärmsätze), ab 0
  function arbeitsIndex(saetze, index) {
    return arbeitsAnzahl(saetze.slice(0, index));
  }

  // Die Kennung eines Satzes als Text: "W" für einen Aufwärmsatz, sonst die Nummer unter den Arbeitssätzen
  function satzKennung(saetze, index, seiten) {
    if (istAufwaermen(saetze[index])) {
      return "W";
    }
    return satzNummer(arbeitsIndex(saetze, index), seiten);
  }

  // Dasselbe als Element für die Tabellen. Ohne Aufwärmsätze genau das Element von früher.
  function satzKennungElement(saetze, index, seiten) {
    if (istAufwaermen(saetze[index])) {
      const w = element("span", "satz-nummer satz-w", "W");
      return w;
    }
    return satzNummerElement(arbeitsIndex(saetze, index), seiten);
  }

  // "80 kg × 10", mit Reps in Reserve "80 kg × 10 · RIR 2"
  function satzText(satz) {
    let text = gewichtText(satz.gewicht) + " × " + satz.wdh;
    if (rirLesen(satz.rir) !== null) {
      text += " · " + rirText(satz.rir);
    }
    return text;
  }

  // Der Platz des besten Satzes eines Eintrags: der mit dem höchsten geschätzten 1RM, wie bei
  // "Letzte Trainingsergebnisse" im Trainingsmodus. Sind alle Sätze gleich gut, ist es keiner (-1).
  function besterSatzIndex(eintrag) {
    const saetze = saetzeVon(eintrag);
    let zusatz = 0;
    if (hatDatum(eintrag)) {
      zusatz = koerperZusatz(eintrag.uebungId, new Date(eintrag.datum));
    }
    let bester = -1;
    let hoechstes = -Infinity;
    let niedrigstes = Infinity;
    for (let i = 0; i < saetze.length; i++) {
      // Aufwärmsätze (seit Version 141) können nicht der beste Satz sein
      if (istAufwaermen(saetze[i])) {
        continue;
      }
      const wert = epley1RM(saetze[i].gewicht + zusatz, saetze[i].wdh);
      if (wert > hoechstes) {
        hoechstes = wert;
        bester = i;
      }
      niedrigstes = Math.min(niedrigstes, wert);
    }
    if (hoechstes === niedrigstes) {
      return -1;
    }
    return bester;
  }

  // Baut zu einem Eintrag die Tabelle seiner Sätze: Satz, Gewicht × Wdh. und RIR, eine Reihe je Satz.
  // Der beste Satz ist markiert. Antippen öffnet das Bearbeiten.
  function satzZeilenBauen(behaelter, eintrag) {
    const saetze = saetzeVon(eintrag);
    const seiten = eintragSeiten(eintrag);
    const bester = besterSatzIndex(eintrag);

    const kopf = element("div", "tag-reihe kopf");
    kopf.appendChild(element("span", "", txt("satz.spalte")));
    kopf.appendChild(element("span", "", txt("gewicht") + " × " + txt("wdh")));
    kopf.appendChild(element("span", "", "RIR"));
    kopf.appendChild(element("span", ""));
    behaelter.appendChild(kopf);

    for (let i = 0; i < saetze.length; i++) {
      const zeile = element("button", "tag-reihe");
      zeile.appendChild(satzKennungElement(saetze, i, seiten));
      seiteLMarkieren(zeile, seiten && !istAufwaermen(saetze[i]) ? arbeitsIndex(saetze, i) : -1);

      const werte = element("span", "tag-werte");
      werte.appendChild(element("span", "", gewichtText(saetze[i].gewicht) + " × " + saetze[i].wdh));
      if (i === bester) {
        zeile.classList.add("bester");
        werte.appendChild(element("span", "letztes-bestes", txt("letztes.bestes")));
      }
      zeile.appendChild(werte);

      // Ohne RIR-Angabe steht ein Strich
      let rir = "–";
      if (rirLesen(saetze[i].rir) !== null) {
        rir = rirText(saetze[i].rir).replace("RIR ", "");
      }
      zeile.appendChild(element("span", "tag-rir", rir));

      const pfeil = element("span", "einst-pfeil", "›");
      pfeil.setAttribute("aria-hidden", "true");
      zeile.appendChild(pfeil);
      zeile.setAttribute("aria-label", txt("satz.bearbeiten", { n: satzKennung(saetze, i, seiten) }) + ": " + satzText(saetze[i]));
      zeile.onclick = function () {
        satzSheetOeffnen(eintrag.id, i);
      };
      behaelter.appendChild(zeile);
    }
  }

  // Im Trainingsmodus: die Sätze der gezeigten Übung als Tabelle mit Satz, Gewicht, Wdh. und Häkchen.
  // Erst die erledigten Sätze (Antippen öffnet das Bearbeiten), dann der aktuelle, dann die offenen
  // bis zum Ziel der Routine. Der aktuelle und die offenen zeigen in Grau das Wdh.-Ziel, ohne Ziel einen Strich.
  function modusSaetzeAnzeigen() {
    const bereich = document.getElementById("modus-saetze");
    bereich.innerHTML = "";
    const t = laufendesTraining;
    if (!t || !t.uebungen[t.index]) {
      return;
    }
    const u = t.uebungen[t.index];
    const eintrag = eintragFinden(u.eintragId);
    let saetze = [];
    if (eintrag) {
      saetze = saetzeVon(eintrag);
    }
    // Bei "Einzeln" tragen die Nummern die Seite (seit Version 135)
    const seiten = zaehltSeiten(u);
    // Der Chip "Seiten" (Look Korund) ist gesperrt, sobald die Übung einen Satz hat, und wieder frei ohne Satz
    const seitenChip = document.querySelector ? document.querySelector("#modus-chips .seiten-chip") : null;
    if (seitenChip) {
      seitenChip.classList.toggle("gesperrt", u.saetze.length > 0);
    }

    // Nach dem letzten Ziel-Satz gibt es keinen aktuellen Satz, bis "+ Satz" einen weiteren startet
    // Aufwärmsätze stehen mit "W" in der Tabelle, zählen aber nicht zum Ziel
    const ziel = satzZiel(u);
    const aufwaermen = saetze.length - arbeitsAnzahl(saetze);
    const zielErreicht = ziel > 0 && saetze.length - aufwaermen >= ziel && !u.extraSatz;
    let zeilen = Math.max(saetze.length, ziel + aufwaermen);
    if (!zielErreicht) {
      zeilen = Math.max(saetze.length + 1, ziel + aufwaermen);
    }

    let zielWdh = "–";
    if (u.zielWdh) {
      zielWdh = String(u.zielWdh);
      if (wdhBis(u)) {
        zielWdh += "–" + wdhBis(u);
      }
    }

    bereich.appendChild(element("h2", "abschnitt", txt("satz.deine")));
    const karte = element("div", "karte satz-tabelle");
    const kopf = element("div", "satz-reihe kopf");
    kopf.appendChild(element("span", "", txt("satz.spalte")));
    kopf.appendChild(element("span", "satz-kg-text", txt("gewicht")));
    // Look Korund (seit Version 142): Spalten KG, WDH., RIR wie im Entwurf (sonst ausgeblendet)
    kopf.appendChild(element("span", "satz-kg-zahl", einheit()));
    kopf.appendChild(element("span", "", txt("wdh")));
    kopf.appendChild(element("span", "satz-rir-spalte", "RIR"));
    kopf.appendChild(element("span", ""));
    karte.appendChild(kopf);

    for (let i = 0; i < zeilen; i++) {
      let zeile;
      if (i < saetze.length) {
        const satz = saetze[i];
        zeile = element("button", "satz-reihe erledigt");
        zeile.appendChild(satzKennungElement(saetze, i, seiten));
        seiteLMarkieren(zeile, seiten && !istAufwaermen(satz) ? arbeitsIndex(saetze, i) : -1);
        zeile.appendChild(element("span", "satz-kg-text", gewichtText(satz.gewicht)));
        zeile.appendChild(element("span", "satz-kg-zahl", zahlKurz(gewichtAnzeige(satz.gewicht))));
        const wdh = element("span", "", satz.wdh);
        if (rirLesen(satz.rir) !== null) {
          wdh.appendChild(element("span", "satz-rir", rirText(satz.rir)));
        }
        zeile.appendChild(wdh);
        zeile.appendChild(element("span", "satz-rir-spalte", rirLesen(satz.rir) !== null ? rirText(satz.rir).replace("RIR ", "") : "–"));
        const haken = element("span", "satz-haken", "✓");
        haken.setAttribute("aria-hidden", "true");
        zeile.appendChild(haken);
        zeile.setAttribute("aria-label", txt("satz.bearbeiten", { n: satzKennung(saetze, i, seiten) }) + ": " + satzText(satz));
        zeile.onclick = function () {
          satzSheetOeffnen(eintrag.id, i);
        };
      } else {
        zeile = element("div", "satz-reihe offen");
        if (i === saetze.length && !zielErreicht) {
          zeile.className = "satz-reihe aktuell";
        }
        zeile.appendChild(satzNummerElement(i - aufwaermen, seiten));
        seiteLMarkieren(zeile, seiten ? i - aufwaermen : -1);
        zeile.appendChild(element("span", "", "–"));
        zeile.appendChild(element("span", "", zielWdh));
        zeile.appendChild(element("span", "satz-rir-spalte", "–"));
        zeile.appendChild(element("span", ""));
      }
      karte.appendChild(zeile);
    }
    bereich.appendChild(karte);
  }

  // Öffnet das Sheet für einen Satz und stellt die Felder auf seine Werte
  function satzSheetOeffnen(eintragId, index) {
    const eintrag = eintragFinden(eintragId);
    if (!eintrag) {
      return;
    }
    const satz = saetzeVon(eintrag)[index];
    if (!satz) {
      return;
    }
    satzEintragId = eintragId;
    satzIndex = index;
    satzRir = satz.rir;
    satzW = istAufwaermen(satz);
    wKnopfAnzeigen("satz-w", satzW);

    document.getElementById("satz-sheet-titel").textContent = txt("satz.bearbeiten", { n: satzKennung(saetzeVon(eintrag), index, eintragSeiten(eintrag)) });
    document.getElementById("satz-sheet-uebung").textContent = anzeigeName(eintrag.uebung, eintrag.uebungId);
    gewichtTitelSetzen("s-feld-gewicht", eintrag.uebungId);
    gewichtFeldSetzen("s-feld-gewicht", startGewicht());
    feldSetzen("s-feld-wdh", START_WDH);
    gewichtFeldSetzen("s-feld-gewicht", satz.gewicht);
    feldSetzen("s-feld-wdh", satz.wdh);
    satzRirAnzeigen();
    zusatzSheetOeffnen("satz-sheet");
  }

  // Die Auswahl der Reps in Reserve im Sheet. Ein Tipp auf den gewählten Wert nimmt die Angabe wieder zurück.
  function satzRirAnzeigen() {
    umschalterBauen(document.getElementById("satz-rir"), RIR_AUSWAHL, satzRir, function (rir) {
      if (satzRir === rir) {
        satzRir = null;
      } else {
        satzRir = rir;
      }
      satzRirAnzeigen();
    });
  }

  // Schließt nur das Bearbeiten. Der Trainingstag darunter bleibt offen, wenn es von dort geöffnet wurde.
  function satzSheetSchliessen() {
    if (document.getElementById("tag-sheet").classList.contains("offen")) {
      document.getElementById("satz-sheet").classList.remove("offen");
    } else {
      zusatzSheetsSchliessen();
    }
  }

  // "Speichern" im Sheet: Der Satz bekommt die neuen Werte, an seinem Platz im vorhandenen Eintrag.
  // Alle anderen Sätze bleiben, wie sie sind. Eine Pause startet dabei nicht.
  function satzSpeichern() {
    const eintrag = eintragFinden(satzEintragId);
    if (!eintrag) {
      satzSheetSchliessen();
      return;
    }
    const saetze = saetzeVon(eintrag);
    const alt = saetze[satzIndex];
    if (!alt) {
      satzSheetSchliessen();
      return;
    }

    // Steht im Feld noch das angezeigte Gewicht, bleibt das gespeicherte unverändert.
    // Sonst könnte es sich in lbs durch das Hin- und Zurückrechnen um Bruchteile verschieben.
    let gewicht = alt.gewicht;
    if (feldWert("s-feld-gewicht") !== gewichtAnzeige(alt.gewicht)) {
      gewicht = gewichtFeldWert("s-feld-gewicht");
    }
    saetze[satzIndex] = { gewicht: gewicht, wdh: feldWert("s-feld-wdh"), rir: satzRir };
    // Bearbeiten ändert nur die Werte, der Zeitpunkt des Satzes bleibt
    if (alt.zeit) {
      saetze[satzIndex].zeit = alt.zeit;
    }
    if (satzW) {
      saetze[satzIndex].aufwaermen = true;
    }
    const geaendert = gewicht !== alt.gewicht || saetze[satzIndex].wdh !== alt.wdh;
    const index = satzIndex;

    eintragSaetzeSchreiben(eintrag, saetze);
    satzAenderungSichern(eintrag, saetze);
    satzSheetSchliessen();
    if (geaendert) {
      bestwertPruefen(eintrag, index);
    }
  }

  // Fragt nach, bevor der Satz gelöscht wird
  function satzLoeschenFragen() {
    const eintrag = eintragFinden(satzEintragId);
    if (!eintrag) {
      satzSheetSchliessen();
      return;
    }
    const saetze = saetzeVon(eintrag);
    if (!saetze[satzIndex]) {
      satzSheetSchliessen();
      return;
    }

    let text = txt("satz.loeschenText", {
      name: anzeigeName(eintrag.uebung, eintrag.uebungId),
      n: satzKennung(saetze, satzIndex, eintragSeiten(eintrag)),
      satz: satzText(saetze[satzIndex])
    });
    if (saetze.length === 1) {
      text += " " + txt("satz.loeschenEinziger");
    }
    frageZeigen(txt("satz.loeschenFrage"), text, [
      { text: txt("loeschen"), art: "gefahr", aktion: satzLoeschen },
      { text: txt("abbrechen"), art: "leise" }
    ]);
  }

  // Löscht den Satz aus seinem Eintrag. War es der einzige, verschwindet der Eintrag selbst.
  function satzLoeschen() {
    const eintrag = eintragFinden(satzEintragId);
    if (!eintrag) {
      satzSheetSchliessen();
      return;
    }
    const saetze = saetzeVon(eintrag);
    if (!saetze[satzIndex]) {
      satzSheetSchliessen();
      return;
    }
    saetze.splice(satzIndex, 1);

    if (saetze.length > 0) {
      eintragSaetzeSchreiben(eintrag, saetze);
    } else {
      eintraege.splice(eintraege.indexOf(eintrag), 1);
    }
    satzAenderungSichern(eintrag, saetze);
    satzSheetSchliessen();
  }

  // Nach dem Ändern oder Löschen eines Satzes: speichern, das laufende Training nachziehen
  // und alles neu anzeigen, was den Eintrag zeigt. saetze sind die Sätze, die der Eintrag jetzt hat.
  function satzAenderungSichern(eintrag, saetze) {
    sicherSpeichern("eintraege", eintraege);
    // Ohne Sätze ist der Eintrag weg. War es der letzte seiner Trainingseinheit, geht sie mit.
    if (saetze.length === 0) {
      trainingsAufraeumen();
    }

    // Gehört der Eintrag zum laufenden Training, bekommt dessen Übung dieselben Sätze.
    // Ohne Sätze ist die Übung wieder offen.
    // Das gilt auch für eine Übung, die vor einem Tausch an ihrem Platz dran war. Hat sie keinen Satz mehr,
    // verschwindet sie aus der Liste der getauschten Übungen.
    const t = laufendesTraining;
    if (t) {
      const listen = trainingUebungListen();
      for (let l = 0; l < listen.length; l++) {
        for (let i = listen[l].length - 1; i >= 0; i--) {
          const u = listen[l][i];
          if (u.eintragId !== eintrag.id) {
            continue;
          }
          u.saetze = [];
          for (let j = 0; j < saetze.length; j++) {
            const satz = { gewicht: saetze[j].gewicht, wdh: saetze[j].wdh };
            if (rirLesen(saetze[j].rir) !== null) {
              satz.rir = saetze[j].rir;
            }
            if (saetze[j].zeit) {
              satz.zeit = saetze[j].zeit;
            }
            if (saetze[j].aufwaermen === true) {
              satz.aufwaermen = true;
            }
            u.saetze.push(satz);
          }
          if (saetze.length === 0) {
            u.eintragId = "";
            for (let j = t.erledigt.length - 1; j >= 0; j--) {
              if (t.erledigt[j].id === eintrag.id) {
                t.erledigt.splice(j, 1);
              }
            }
            if (l > 0) {
              listen[l].splice(i, 1);
            }
          }
        }
      }
      trainingMerken();
    }

    anzeigen();
    letztesMalAnzeigen();

    // Der Trainingsmodus: Die Eingabe für den nächsten Satz und eine laufende Pause bleiben, wie sie sind
    if (t && trainingAnsicht === "modus") {
      modusFortschrittAnzeigen();
      modusZustandAnzeigen(false);
      modusSaetzeAnzeigen();
      modusLetztesAnzeigen();
    }

    // Home und das Profil mit dem offenen Trainingstag. Hat der Tag keinen Eintrag mehr, schließt sich sein Sheet.
    if (aktiveSeite === "profil") {
      profilAnzeigen();
    }
    if (aktiveSeite === "home") {
      homeAnzeigen();
    }
    if (document.getElementById("tag-sheet").classList.contains("offen")) {
      if (trainingstage()[tagSheetSchluessel]) {
        tagSheetFuellen(tagSheetSchluessel);
      } else {
        zusatzSheetsSchliessen();
      }
    }
  }

  // "+ Satz" nach dem letzten Ziel-Satz: noch ein Satz derselben Übung
  function extraSatzStarten() {
    laufendesTraining.uebungen[laufendesTraining.index].extraSatz = true;
    gemerkteTrainingWerte = null;
    trainingMerken();
    modusZustandAnzeigen(true);
    modusSaetzeAnzeigen();
    modusLetztesAnzeigen();
  }

  // "Nächste Übung" oder "Übung überspringen": weiter zur nächsten offenen Übung.
  // Ist keine mehr offen, endet das Training, vorher kommt die Auswahl zum Speichern oder Verwerfen.
  function uebungBeenden() {
    const naechste = naechsteOffene();
    if (naechste >= 0) {
      uebungZeigen(naechste);
      return;
    }
    trainingBeendenFragen(true);
  }

  // Erledigt ist eine Übung, wenn sie ihr Satz-Ziel erreicht hat, ohne Satz-Ziel schon mit einem Satz.
  // Eine angefangene Übung (2 von 3 Sätzen) ist noch offen.
  function uebungErledigt(u) {
    if (satzZiel(u) > 0) {
      return arbeitsAnzahl(u.saetze) >= satzZiel(u);
    }
    return arbeitsAnzahl(u.saetze) > 0;
  }

  // Der Platz der nächsten offenen Übung: zuerst die hinter der aktuellen, dann wieder von vorn.
  // Ist keine andere mehr offen: -1. So geht es nach Übung 3 gleich zu 5, wenn 4 schon vorher dran war.
  function naechsteOffene() {
    const t = laufendesTraining;
    for (let schritt = 1; schritt < t.uebungen.length; schritt++) {
      const i = (t.index + schritt) % t.uebungen.length;
      if (!uebungErledigt(t.uebungen[i])) {
        return i;
      }
    }
    return -1;
  }

  // Die Pfeile neben "Übung 2 von 6": zur vorherigen (-1) oder nächsten (1) Übung
  function uebungWechseln(richtung) {
    uebungZeigen(laufendesTraining.index + richtung);
  }

  // Springt zu einer Übung des laufenden Trainings. Ihre schon gemachten Sätze sind noch da,
  // es geht mit dem nächsten Satz weiter. Eine laufende Pause läuft weiter.
  function uebungZeigen(index) {
    const t = laufendesTraining;
    if (!t || index < 0 || index >= t.uebungen.length) {
      return;
    }
    // Ein angefangener, aber nicht gemachter Zusatz-Satz verfällt beim Verlassen der Übung
    t.uebungen[t.index].extraSatz = false;
    t.index = index;
    gemerkteTrainingWerte = null;
    trainingMerken();
    modusAnzeigen();
    window.scrollTo(0, 0);
  }

  // Hat dieser Platz des Trainings schon einen Satz? Es zählen auch die Sätze einer Übung,
  // die an diesem Platz vor einem Tausch dran war.
  function platzBegonnen(u) {
    return u.saetze.length > 0 || u.getauscht.length > 0;
  }

  // Die Plätze aller Übungen, die noch keinen Satz haben. ohne lässt eine Übung aus.
  function offeneUebungen(ohne) {
    const t = laufendesTraining;
    const liste = [];
    for (let i = 0; i < t.uebungen.length; i++) {
      if (i !== ohne && !platzBegonnen(t.uebungen[i])) {
        liste.push(i);
      }
    }
    return liste;
  }

  // "2 Übungen sind noch offen: Kniebeuge, Latzug."
  function offenText(offen) {
    const t = laufendesTraining;
    const namen = [];
    for (let i = 0; i < offen.length; i++) {
      namen.push(anzeigeName(t.uebungen[offen[i]].name, t.uebungen[offen[i]].uebungId));
    }
    return txtAnzahl("modus.offen", offen.length, { namen: namen.join(", ") });
  }

  // ---------- Training: Übung tauschen ----------

  // Ist diese Stelle (ein Platz des Trainings, eine getauschte Übung oder eine Übung der Routine) die genannte Übung?
  // Verglichen wird wie bei den Einträgen: über die ID, ohne ID über den Namen.
  function stelleIst(stelle, name, id) {
    return gleicheUebung({ uebung: stelle.name, uebungId: stelle.uebungId }, name, id);
  }

  // Steht die Übung schon an einem anderen Platz des laufenden Trainings, als aktuelle oder als getauschte Übung?
  // Übung hinzufügen (seit Version 141): Steht die Übung schon irgendwo im Training, auch an der aktuellen Stelle?
  function hinzuVergeben(name, id) {
    const t = laufendesTraining;
    if (!t) {
      return false;
    }
    for (let i = 0; i < t.uebungen.length; i++) {
      if (stelleIst(t.uebungen[i], name, id)) {
        return true;
      }
      for (let j = 0; j < t.uebungen[i].getauscht.length; j++) {
        if (stelleIst(t.uebungen[i].getauscht[j], name, id)) {
          return true;
        }
      }
    }
    return false;
  }

  // Satz-Ziel einer Übung, die erst im Training dazukommt: drei Sätze, ohne Wdh.-Ziel, Standard-Pause
  const HINZU_ZIEL_SAETZE = 3;

  // Hängt eine Übung ans Ende des laufenden Trainings und springt zu ihr. Die Routine bleibt, wie sie ist.
  function trainingUebungHinzufuegen(name, gruppe, id) {
    const t = laufendesTraining;
    if (!t) {
      sheetSchliessen();
      return;
    }
    if (hinzuVergeben(name, id)) {
      return;
    }
    t.uebungen.push({
      name: name,
      uebungId: id || "",
      muskelgruppe: gruppe || "",
      zielSaetze: HINZU_ZIEL_SAETZE,
      zielWdh: null,
      zielWdhMax: null,
      pause: null,
      saetze: [],
      eintragId: "",
      extraSatz: false,
      getauscht: [],
      hinzugefuegt: true
    });
    gemerkteTrainingWerte = null;
    trainingMerken();
    sheetSchliessen();
    uebungZeigen(t.uebungen.length - 1);
    window.scrollTo(0, 0);
  }

  // Der Knopf unter der Übersicht der Übungen: schließt die Übersicht und öffnet die Auswahl
  function uebungHinzufuegenOeffnen() {
    zusatzSheetsSchliessen();
    sheetOeffnen("hinzu");
  }

  function tauschVergeben(name, id) {
    const t = laufendesTraining;
    if (!t) {
      return false;
    }
    for (let i = 0; i < t.uebungen.length; i++) {
      if (i === t.index) {
        continue;
      }
      if (stelleIst(t.uebungen[i], name, id)) {
        return true;
      }
      for (let j = 0; j < t.uebungen[i].getauscht.length; j++) {
        if (stelleIst(t.uebungen[i].getauscht[j], name, id)) {
          return true;
        }
      }
    }
    return false;
  }

  // Die Übung der Routine, die zum aktuellen Platz des Trainings gehört, oder null:
  // wenn es die Routine nicht mehr gibt oder die Übung dort nicht mehr steht.
  // Gesucht wird die Übung, die die Routine an diesem Platz vorsieht, zuerst an derselben Stelle.
  function tauschRoutineStelle() {
    const t = laufendesTraining;
    if (!t) {
      return null;
    }
    const routine = routineFinden(t.routineId);
    if (!routine || !Array.isArray(routine.uebungen)) {
      return null;
    }
    const gesucht = t.uebungen[t.index].ursprung || t.uebungen[t.index];
    const gleicherPlatz = routine.uebungen[t.index];
    if (gleicherPlatz && stelleIst(gleicherPlatz, gesucht.name, gesucht.uebungId)) {
      return gleicherPlatz;
    }
    for (let i = 0; i < routine.uebungen.length; i++) {
      if (stelleIst(routine.uebungen[i], gesucht.name, gesucht.uebungId)) {
        return routine.uebungen[i];
      }
    }
    return null;
  }

  // Der Schalter "Auch in der Routine ändern" im Sheet
  let tauschAuchRoutine = false;

  function tauschSchalterSetzen(an) {
    tauschAuchRoutine = an;
    document.getElementById("tausch-schalter").setAttribute("aria-checked", String(an));
  }

  function tauschSchalterUmlegen() {
    tauschSchalterSetzen(!tauschAuchRoutine);
  }

  // Der Knopf "Übung tauschen" im Trainingsmodus
  function tauschOeffnen() {
    if (laufendesTraining) {
      sheetOeffnen("tausch");
    }
  }

  // Die Vorschläge für den Tausch: Übungen mit demselben Bewegungsmuster, danach die übrigen derselben
  // Muskelgruppe. In beiden Teilen stehen die Übungen vorn, zu denen es schon Einträge gibt.
  // Ohne bekannte Übung (ein frei eingetippter Name aus einer alten Version) gibt es keine Vorschläge.
  function tauschVorschlaege() {
    const t = laufendesTraining;
    const u = t.uebungen[t.index];
    const aktuelle = UEBUNG_NACH_ID[u.uebungId];
    if (!aktuelle) {
      return { titel: "", liste: [] };
    }
    const gruppe = uebungGruppe(aktuelle);
    let muster = "";
    if (aktuelle.rang) {
      muster = aktuelle.rang.muster;
    }

    const bekannt = {};
    for (let i = 0; i < eintraege.length; i++) {
      if (eintraege[i].uebungId) {
        bekannt[eintraege[i].uebungId] = true;
      }
    }

    // Vier Töpfe in der Reihenfolge der Anzeige: gleiches Muster (schon gemacht, neu), gleiche Gruppe (schon gemacht, neu)
    const toepfe = [[], [], [], []];
    const alle = selbstListe.concat(UEBUNGEN);
    for (let i = 0; i < alle.length; i++) {
      const k = alle[i];
      if (k.id === aktuelle.id || tauschVergeben(k.de, k.id)) {
        continue;
      }
      const gleichesMuster = muster !== "" && Boolean(k.rang) && k.rang.muster === muster;
      if (!gleichesMuster && uebungGruppe(k) !== gruppe) {
        continue;
      }
      let topf = 0;
      if (!gleichesMuster) {
        topf = 2;
      }
      if (!bekannt[k.id]) {
        topf++;
      }
      toepfe[topf].push(k);
    }

    let titel = GRUPPE_NACH_ID[gruppe][sprache];
    if (muster !== "") {
      titel = txt("muster." + muster);
    }
    return { titel: txt("tausch.vorschlaege") + " · " + titel, liste: toepfe[0].concat(toepfe[1], toepfe[2], toepfe[3]) };
  }

  // Die erste Ansicht des Sheets beim Tauschen: die Vorschläge, darunter der Weg zu allen Muskelgruppen.
  // Das Suchfeld darüber sucht wie immer in allen Übungen.
  function sheetTauschZeigen() {
    sheetGruppe = KACHEL_TAUSCH;
    document.getElementById("sheet-suche").value = "";
    const inhalt = sheetLeeren(txt("tausch.titel"), false);

    let vorschlaege;
    if (sheetZiel === "vorlage") {
      vorschlaege = vorlageVorschlaege();
    } else {
      vorschlaege = tauschVorschlaege();
    }
    sheetAbschnitt(inhalt, vorschlaege.titel, vorschlaege.liste, false);
    if (vorschlaege.liste.length === 0) {
      inhalt.appendChild(element("p", "leer-hinweis", txt("tausch.keineVorschlaege")));
    }

    const alle = element("button", "sheet-neu", txt("tausch.alle"));
    alle.onclick = sheetGruppenZeigen;
    inhalt.appendChild(alle);
  }

  // Tauscht die aktuelle Übung des Trainings gegen eine andere. Der Platz in der Reihenfolge, die Ziele
  // und die Pause bleiben. Die neue Übung beginnt ohne Sätze, ihre Vorgaben kommen aus ihrem eigenen Verlauf.
  // Die Sätze der alten Übung bleiben in ihrem Eintrag und im Training: Die alte Übung wandert mit ihnen
  // in die Liste "getauscht" des Platzes. Wird später zu ihr zurückgetauscht, geht es dort weiter.
  // Der Tausch gilt nur für dieses Training, außer der Schalter "Auch in der Routine ändern" ist an.
  function uebungTauschen(name, gruppe, id) {
    const t = laufendesTraining;
    if (!t) {
      sheetSchliessen();
      return;
    }
    const u = t.uebungen[t.index];
    // Dieselbe Übung noch einmal gewählt: Es ändert sich nichts
    if (stelleIst(u, name, id)) {
      sheetSchliessen();
      return;
    }
    if (tauschVergeben(name, id)) {
      return;
    }

    // Vor dem Tausch nachsehen, denn danach steht am Platz schon die neue Übung
    let routineStelle = null;
    if (tauschAuchRoutine) {
      routineStelle = tauschRoutineStelle();
    }

    const alt = { name: u.name, uebungId: u.uebungId, muskelgruppe: u.muskelgruppe, saetze: u.saetze, eintragId: u.eintragId };
    const ursprungVorher = u.ursprung || null;
    if (!u.ursprung) {
      u.ursprung = { name: u.name, uebungId: u.uebungId, muskelgruppe: u.muskelgruppe };
    }

    // War die neue Übung an diesem Platz schon einmal dran, kommt sie mit ihren Sätzen zurück
    let neu = { name: name, uebungId: id || "", muskelgruppe: gruppe, saetze: [], eintragId: "" };
    for (let i = 0; i < u.getauscht.length; i++) {
      if (stelleIst(u.getauscht[i], name, id)) {
        neu = u.getauscht.splice(i, 1)[0];
        break;
      }
    }
    if (alt.saetze.length > 0) {
      u.getauscht.push(alt);
    }

    u.name = neu.name;
    u.uebungId = neu.uebungId || "";
    u.muskelgruppe = neu.muskelgruppe;
    u.saetze = neu.saetze;
    u.eintragId = neu.eintragId;
    u.extraSatz = false;

    if (routineStelle) {
      routineUebungErsetzen(routineStelle, u, ursprungVorher);
    }

    gemerkteTrainingWerte = null;
    trainingMerken();
    sheetSchliessen();
    modusAnzeigen();
    window.scrollTo(0, 0);
  }

  // Die zuletzt über den Tausch geänderte Routine für "Rückgängig" (null = keine).
  // Es gilt nur, solange der Hinweis zu sehen ist.
  let geaenderteRoutine = null;
  let routineHinweisUhr = null;

  // Ersetzt in der Routine die Übung: Name, ID und Muskelgruppe werden die des Platzes, Ziele und Pause bleiben.
  // Damit sieht die Routine an diesem Platz jetzt die neue Übung vor.
  function routineUebungErsetzen(stelle, platz, ursprungVorher) {
    geaenderteRoutine = {
      stelle: stelle,
      vorher: { name: stelle.name, uebungId: stelle.uebungId || "", muskelgruppe: stelle.muskelgruppe || "" },
      platz: platz,
      ursprungVorher: ursprungVorher || platz.ursprung
    };
    stelle.name = platz.name;
    stelle.uebungId = platz.uebungId;
    stelle.muskelgruppe = platz.muskelgruppe;
    platz.ursprung = { name: platz.name, uebungId: platz.uebungId, muskelgruppe: platz.muskelgruppe };
    routinenSpeichern();
    trainingAnzeigen();

    document.getElementById("routine-hinweis").classList.add("sichtbar");
    clearTimeout(routineHinweisUhr);
    routineHinweisUhr = setTimeout(routineHinweisSchliessen, VERWORFEN_ANZEIGE);
  }

  // Blendet den Hinweis "Routine geändert" aus. Damit ist auch "Rückgängig" vorbei.
  function routineHinweisSchliessen() {
    clearTimeout(routineHinweisUhr);
    routineHinweisUhr = null;
    geaenderteRoutine = null;
    document.getElementById("routine-hinweis").classList.remove("sichtbar");
  }

  // "Rückgängig": Die Routine bekommt ihre Übung zurück. Der Tausch im laufenden Training bleibt.
  function routineTauschRueckgaengig() {
    const g = geaenderteRoutine;
    routineHinweisSchliessen();
    if (!g) {
      return;
    }
    g.stelle.name = g.vorher.name;
    g.stelle.uebungId = g.vorher.uebungId;
    g.stelle.muskelgruppe = g.vorher.muskelgruppe;
    g.platz.ursprung = g.ursprungVorher;
    routinenSpeichern();
    trainingMerken();
    trainingAnzeigen();
  }

  // Wie weit eine Übung im laufenden Training ist: "offen", "2 von 3 Sätzen" oder "fertig · 3 Sätze"
  function uebungStandText(u) {
    const gemacht = arbeitsAnzahl(u.saetze);
    if (gemacht === 0) {
      return txt("stand.offen");
    }
    const saetze = txtAnzahl("anzahl.saetze", gemacht);
    if (!satzZiel(u)) {
      return saetze;
    }
    if (gemacht >= satzZiel(u)) {
      return txt("stand.fertig", { saetze: saetze });
    }
    // Bei "Einzeln": der letzte gemachte Satz mit Seite und das Ziel je Seite, z. B. "2 L von 3 Sätzen"
    if (zaehltSeiten(u)) {
      return txt("stand.xVonY", { x: satzNummer(gemacht - 1, true), y: u.zielSaetze });
    }
    return txt("stand.xVonY", { x: gemacht, y: satzZiel(u) });
  }

  // Look Korund (seit Version 142): die Teile einer Zeile in der Übersicht wie im Entwurf.
  // Kurzer Stand: fertig "3 × 72,5 kg · fertig", angefangen "Satz 2 von 3 · 32 kg", offen "3 × 45 kg" oder "3 Sätze".
  function uebersichtZeileKorund(zeile, u, i) {
    const figur = element("span", "sheet-figur");
    figur.innerHTML = uebungFigurSvg(u);
    figur.setAttribute("aria-hidden", "true");
    zeile.appendChild(figur);
    const text = element("span", "sheet-korund-text");
    const bekannt = UEBUNG_NACH_ID[u.uebungId];
    text.appendChild(element("span", "sheet-korund-gruppe", bekannt ? anzeigeGruppe("", u.uebungId) + " · " + bereichName(bekannt.bereich) : (u.muskelgruppe || "")));
    text.appendChild(element("span", "sheet-korund-name", anzeigeName(u.name, u.uebungId)));
    const arbeit = u.saetze.filter(function (satz) {
      return !istAufwaermen(satz);
    });
    let schwerstes = null;
    for (let j = 0; j < arbeit.length; j++) {
      if (schwerstes === null || arbeit[j].gewicht > schwerstes) {
        schwerstes = arbeit[j].gewicht;
      }
    }
    let stand = "";
    if (uebungErledigt(u)) {
      stand = txt("uebersicht.fertig", { n: arbeit.length, gewicht: gewichtText(schwerstes) });
    } else if (arbeit.length > 0) {
      stand = txt("uebersicht.angefangen", { n: satzNummer(arbeit.length, zaehltSeiten(u)), ziel: u.zielSaetze || "–", gewicht: gewichtText(arbeit[arbeit.length - 1].gewicht) });
    } else {
      const vorschlag = steigernAn() ? steigerungVorschlag(u) : null;
      if (u.zielSaetze && vorschlag) {
        stand = u.zielSaetze + " × " + gewichtText(vorschlag.gewicht);
      } else {
        stand = uebungStandText(u);
      }
    }
    text.appendChild(element("span", "sheet-korund-stand", stand));
    zeile.appendChild(text);
    // Tauschen direkt aus der Liste: zur Übung springen und die Auswahl öffnen (bei erledigten steht stattdessen das ✓)
    if (!uebungErledigt(u)) {
      const tausch = element("span", "sheet-tausch", "⇄");
      tausch.setAttribute("role", "button");
      tausch.setAttribute("aria-label", txt("tausch.knopf"));
      tausch.onclick = function (ereignis) {
        ereignis.stopPropagation();
        zusatzSheetsSchliessen();
        uebungZeigen(i);
        tauschOeffnen();
      };
      zeile.appendChild(tausch);
    }
  }

  // Öffnet die Übersicht aller Übungen des Trainings. Antippen springt zu der Übung.
  function uebersichtOeffnen() {
    const t = laufendesTraining;
    if (!t) {
      return;
    }
    const liste = document.getElementById("uebungen-sheet-liste");
    liste.innerHTML = "";

    for (let i = 0; i < t.uebungen.length; i++) {
      const u = t.uebungen[i];
      const zeile = element("button", "sheet-zeile");
      if (i === t.index) {
        zeile.classList.add("aktuell");
      }
      zeile.appendChild(element("span", "sheet-zeile-name", (i + 1) + ". " + anzeigeName(u.name, u.uebungId)));
      let stand = uebungStandText(u);
      // Nach einem Tausch steht dabei, welche Übung die Routine an diesem Platz vorsieht
      if (u.ursprung && !stelleIst(u, u.ursprung.name, u.ursprung.uebungId)) {
        stand += " · " + txt("tausch.statt", { name: anzeigeName(u.ursprung.name, u.ursprung.uebungId) });
      }
      zeile.appendChild(element("span", "sheet-zeile-zweit", stand));
      // Look Korund (seit Version 142): Figur, Gruppe, Name ohne Nummer, kurzer Stand und Tausch-Symbol (sonst ausgeblendet)
      uebersichtZeileKorund(zeile, u, i);
      // Erledigte Übungen stehen leise mit ✓ da, die offenen wie bisher. Die Reihenfolge bleibt die der Routine.
      if (uebungErledigt(u)) {
        zeile.classList.add("erledigt");
        zeile.appendChild(element("span", "sheet-zeile-haken", "✓")).setAttribute("aria-hidden", "true");
      }
      zeile.onclick = function () {
        zusatzSheetsSchliessen();
        uebungZeigen(i);
      };
      liste.appendChild(zeile);
    }
    // Übung hinzufügen (seit Version 141) und Beenden (seit Version 142): nur im Look Korund zu sehen (korund.css)
    const knoepfe = element("div", "uebersicht-knoepfe");
    const hinzu = element("button", "sheet-neu uebung-hinzu", txt("hinzu.knopf"));
    hinzu.onclick = uebungHinzufuegenOeffnen;
    knoepfe.appendChild(hinzu);
    const beenden = element("button", "uebersicht-beenden", txt("modus.beenden"));
    beenden.onclick = function () {
      zusatzSheetsSchliessen();
      trainingBeendenFragen();
    };
    knoepfe.appendChild(beenden);
    liste.appendChild(knoepfe);
    zusatzSheetOeffnen("uebungen-sheet");
  }

  // "Beenden" und "Training abschließen": fragt, ob das Training gespeichert oder verworfen wird.
  // Ohne einen einzigen Satz endet es ohne Rückfrage. zurOffenen = true bietet nach der letzten Übung
  // zusätzlich den Sprung zur ersten Übung an, die noch offen ist.
  function trainingBeendenFragen(zurOffenen) {
    const stand = trainingStand();
    if (stand.saetze === 0) {
      trainingOhneSaetzeBeenden();
      return;
    }

    const offen = offeneUebungen(-1);
    let text = trainingStandText(stand);
    if (offen.length > 0) {
      text += "\n" + offenText(offen) + " " + txtAnzahl("modus.entfallen", offen.length);
    }

    const knoepfe = [{ text: txt("modus.speichern"), art: "haupt", aktion: trainingAbschliessen }];
    if (zurOffenen && offen.length > 0) {
      knoepfe.push({
        text: txt("modus.zurOffenen"),
        aktion: function () {
          uebungZeigen(offen[0]);
        }
      });
    }
    knoepfe.push({ text: txt("verwerfen"), art: "gefahr", aktion: trainingVerwerfen });
    knoepfe.push({ text: txt("modus.zurueckZumTraining"), art: "leise" });
    frageZeigen(txt("modus.beendenFrage"), text, knoepfe);
  }

  // Beendet das Training und zeigt die Zusammenfassung: Übungen, Sätze, bewegtes Gewicht
  function trainingAbschliessen() {
    const t = laufendesTraining;
    let anzahlSaetze = 0;
    let bewegt = 0;
    for (let i = 0; i < t.erledigt.length; i++) {
      // Gezählt wird, was im Eintrag steht. Gibt es ihn nicht mehr, gelten die gemerkten Werte.
      const eintrag = eintragFinden(t.erledigt[i].id) || t.erledigt[i];
      anzahlSaetze += arbeitsSaetzeVon(eintrag).length;
      bewegt += eintragVolumen(eintrag, 0);
    }

    // "3 von 4 Übungen" zählt die Plätze der Routine: Nach einem Tausch kann ein Platz zwei Einträge haben
    const uebersprungen = offeneUebungen(-1).length;
    let text = t.routineName + " · " + txt("fertig.gespeichert", { x: t.uebungen.length - uebersprungen, uebungen: uebungenText(t.uebungen.length) });
    // Übersprungen ist jede Übung, die keinen einzigen Satz hat
    if (uebersprungen > 0) {
      text += ", " + txt("fertig.uebersprungen", { n: uebersprungen });
    }
    document.getElementById("fertig-text").textContent = text;
    document.getElementById("fertig-uebungen").textContent = t.erledigt.length;
    document.getElementById("fertig-saetze").textContent = anzahlSaetze;
    document.getElementById("fertig-gewicht").textContent = volumenText(bewegt);
    berichtAnzeigen(t, trainingStand().eintraege);

    trainingseinheitSpeichern(t);
    // Mit Anmeldung geht das Backup nach jedem Training still in die Cloud (seit Version 146)
    cloudAutomatisch();

    // Nach dem Training braucht es keine Pause mehr
    pause = null;
    pauseVorbeiSeit = 0;
    localStorage.removeItem("pause");

    laufendesTraining = null;
    gemerkteTrainingWerte = null;
    trainingMerken();
    trainingAnzeigen();
    trainingAnsichtZeigen("fertig");
    rangPruefen(true);
  }

  // Der Bericht nach dem Training (seit Version 131), unter "Geschafft!" in dieser Reihenfolge: die Dauer,
  // der Gesamt-Kraftrang (mit Schild, wenn er mit diesem Training eine Stufe gestiegen ist), die neuen Rekorde
  // und was bis zur nächsten Stufe fehlt. Die Kacheln Übungen, Sätze und Bewegtes Gewicht darunter füllt
  // trainingAbschliessen. liste sind die Einträge des Trainings. Gespeichert wird nichts, nach dem Neuladen ist der Bericht weg.
  function berichtAnzeigen(t, liste) {
    // Die Dauer wie im Tag-Sheet. Ohne gültige Startzeit fehlt die Kachel.
    let minuten = null;
    if (typeof t.gestartet === "string") {
      minuten = einheitMinuten({ start: t.gestartet, ende: new Date().toISOString() });
    }
    document.getElementById("fertig-dauer").textContent = minuten === null ? "" : dauerText(minuten);
    document.getElementById("fertig-dauer-karte").classList.toggle("versteckt", minuten === null);

    const ids = [];
    for (let i = 0; i < liste.length; i++) {
      ids.push(liste[i].id);
    }
    const stand = rangStand();
    const vorher = rangStand(ids).kraft.gesamt;
    const gesamt = stand.kraft.gesamt;

    const karte = element("div", "karte rang-karte");
    const kopf = rangKopf(gesamt, txt("rang.gesamt"), gesamt === null ? txt("rang.keiner") : rangName(gesamt));
    // Aufgestiegen heißt wie bei der Meldung "Neuer Rang": eine höhere Stufe als ohne dieses Training (neueStufen in der raenge.js)
    const alt = {};
    if (vorher !== null) {
      alt.gesamt = vorher;
    }
    if (neueStufen(alt, { gesamt: gesamt }).length > 0) {
      kopf.querySelector(".rang-kopf-text").appendChild(element("span", "letztes-bestes fertig-aufstieg", txt("fertig.aufstieg")));
    }
    karte.appendChild(kopf);

    // Ohne neuen Rekord fehlt der Abschnitt ganz
    const rekordListe = berichtRekorde(stand, liste);
    if (rekordListe.length > 0) {
      const block = element("div", "rang-schritt fertig-rekorde");
      block.appendChild(element("div", "kachel-titel", txt("fertig.rekorde")));
      for (let i = 0; i < rekordListe.length; i++) {
        block.appendChild(element("div", "fertig-rekord", rekordListe[i].name + " · " + kgText(rekordListe[i].wert)));
      }
      karte.appendChild(block);
    }

    if (gesamt === null) {
      karte.appendChild(element("div", "routine-info", rangFehltText(stand)));
    } else {
      const r = rpZuRang(gesamt);
      karte.appendChild(rangBalken(r.rpInStufe / RP_JE_STUFE));
      let rest = txt("fertig.hoechster");
      if (r.rpBisNaechste > 0) {
        rest = txt("rang.nochRp", { rp: r.rpBisNaechste, rang: rangName(gesamt + r.rpBisNaechste) });
      }
      karte.appendChild(element("div", "routine-info", rest));
    }

    const bereich = document.getElementById("fertig-rang");
    bereich.innerHTML = "";
    bereich.appendChild(karte);

    // Den Zeitverlauf gibt es nur, wenn jeder Satz des Trainings eine Zeit hat (seit Version 133)
    berichtEintraege = liste;
    document.getElementById("fertig-zeit").classList.toggle("versteckt", !alleSaetzeMitZeit(liste));
  }

  // ---------- Zeitverlauf (seit Version 133) ----------

  // Die Einträge des zuletzt beendeten Trainings für den Zeitverlauf. Nur im Speicher der Seite, nach dem Neuladen leer.
  let berichtEintraege = [];

  // Hat jeder Satz dieser Einträge eine Zeit (zeit, seit Version 122)? Ohne einen einzigen Satz: nein.
  function alleSaetzeMitZeit(liste) {
    let anzahl = 0;
    for (let i = 0; i < liste.length; i++) {
      const saetze = saetzeVon(liste[i]);
      for (let j = 0; j < saetze.length; j++) {
        if (typeof saetze[j].zeit !== "string" || isNaN(new Date(saetze[j].zeit))) {
          return false;
        }
        anzahl++;
      }
    }
    return anzahl > 0;
  }

  // Die Uhrzeit als Text, z. B. "18:04", in beiden Sprachen mit 24 Stunden wie die Trainingsuhr
  function uhrzeitText(datum) {
    return String(datum.getHours()).padStart(2, "0") + ":" + String(datum.getMinutes()).padStart(2, "0");
  }

  // Die Sätze des Trainings in der Reihenfolge, in der sie fertig waren, in Blöcken: Ein neuer Block beginnt,
  // wenn die Übung wechselt oder ein neuer Tag anfängt. Jeder Block ist { eintrag, tag, saetze: [{ nummer, satz, zeit }] }.
  // nummer ist der Platz des Satzes in seinem Eintrag (1, 2, 3 ...).
  function zeitverlaufBloecke(liste) {
    const alle = [];
    for (let i = 0; i < liste.length; i++) {
      const saetze = saetzeVon(liste[i]);
      for (let j = 0; j < saetze.length; j++) {
        alle.push({ eintrag: liste[i], nummer: j + 1, satz: saetze[j], zeit: new Date(saetze[j].zeit) });
      }
    }
    // Bei gleicher Zeit bleibt die Reihenfolge der Einträge und Sätze
    alle.sort(function (a, b) {
      return a.zeit - b.zeit;
    });
    const bloecke = [];
    for (let i = 0; i < alle.length; i++) {
      const s = alle[i];
      const tag = tagSchluessel(s.zeit);
      const letzter = bloecke[bloecke.length - 1];
      if (!letzter || letzter.eintrag !== s.eintrag || letzter.tag !== tag) {
        bloecke.push({ eintrag: s.eintrag, tag: tag, saetze: [] });
      }
      bloecke[bloecke.length - 1].saetze.push(s);
    }
    return bloecke;
  }

  // Öffnet den Zeitverlauf: je Block eine Karte mit Übung und Uhrzeit von bis, darin jeder Satz mit seiner Uhrzeit.
  // Geht das Training über Mitternacht, steht vor jedem Tag eine Datumszeile.
  function zeitverlaufOeffnen() {
    const inhalt = document.getElementById("zeit-sheet-inhalt");
    inhalt.innerHTML = "";
    const bloecke = zeitverlaufBloecke(berichtEintraege);
    const mehrereTage = bloecke.length > 0 && bloecke[0].tag !== bloecke[bloecke.length - 1].tag;
    let tag = "";
    for (let i = 0; i < bloecke.length; i++) {
      const b = bloecke[i];
      if (mehrereTage && b.tag !== tag) {
        inhalt.appendChild(element("div", "sheet-abschnitt", tagTextMitJahr(b.saetze[0].zeit)));
        tag = b.tag;
      }
      const karte = element("div", "karte tag-karte");
      const seiten = eintragSeiten(b.eintrag);
      karte.appendChild(element("div", "routine-name", anzeigeName(b.eintrag.uebung, b.eintrag.uebungId)));
      let von = uhrzeitText(b.saetze[0].zeit);
      if (b.saetze.length > 1) {
        von += " – " + uhrzeitText(b.saetze[b.saetze.length - 1].zeit);
      }
      karte.appendChild(element("div", "routine-info", von));
      for (let j = 0; j < b.saetze.length; j++) {
        const s = b.saetze[j];
        const zeile = element("div", "tag-reihe zeit-reihe");
        zeile.appendChild(satzNummerElement(s.nummer - 1, seiten));
        zeile.appendChild(element("span", "tag-werte", gewichtText(s.satz.gewicht) + " × " + s.satz.wdh));
        zeile.appendChild(element("span", "tag-rir", uhrzeitText(s.zeit)));
        karte.appendChild(zeile);
      }
      inhalt.appendChild(karte);
    }
    zusatzSheetOeffnen("zeit-sheet");
  }

  // Die neuen Rekorde eines Trainings als Liste von { name, wert }, in der Reihenfolge der Einträge.
  // Die Regel ist die des Abzeichens "Rekorde" (rekorde in der raenge.js): ein Tag mit neuem bestem geschätztem 1RM
  // aus Sätzen mit 1 bis 10 Wdh., der erste Tag einer Übung zählt nicht. Ein Rekord gehört zum Training,
  // wenn sein Tag der Tag eines Eintrags des Trainings ist. wert ist das 1RM dieses Tages in kg.
  // stand kommt von rangStand, liste sind die Einträge des Trainings.
  function berichtRekorde(stand, liste) {
    const ergebnis = [];
    const gesehen = [];
    for (let i = 0; i < liste.length; i++) {
      for (let j = 0; j < stand.uebungen.length; j++) {
        const u = stand.uebungen[j];
        if (gesehen.indexOf(u) !== -1 || !gleicheUebung(liste[i], u.name, u.id)) {
          continue;
        }
        gesehen.push(u);
        // Die Tage der Einträge dieser Übung im Training, gezählt ab Mitternacht wie in verlaufPunkte
        const tage = [];
        for (let k = 0; k < liste.length; k++) {
          if (hatDatum(liste[k]) && gleicheUebung(liste[k], u.name, u.id)) {
            const d = new Date(liste[k].datum);
            tage.push(new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime());
          }
        }
        const neu = rekorde([u.punkte]);
        let wert = 0;
        for (let k = 0; k < neu.length; k++) {
          if (tage.indexOf(neu[k].zeit) === -1) {
            continue;
          }
          for (let p = 0; p < u.punkte.length; p++) {
            if (u.punkte[p].zeit === neu[k].zeit) {
              wert = Math.max(wert, u.punkte[p].wert);
            }
          }
        }
        if (wert > 0) {
          ergebnis.push({ name: anzeigeName(u.name, u.id), wert: wert });
        }
      }
    }
    return ergebnis;
  }

  // Hält das beendete Training als Einheit fest: Startzeit, Endzeit, Routine und die ids der Einträge.
  // Wurde keine einzige Übung gespeichert, entsteht keine Einheit.
  function trainingseinheitSpeichern(t) {
    const eintragIds = [];
    for (let i = 0; i < t.erledigt.length; i++) {
      if (t.erledigt[i].id) {
        eintragIds.push(t.erledigt[i].id);
      }
    }
    if (eintragIds.length === 0) {
      return;
    }

    const ende = new Date().toISOString();
    trainings.push({
      id: neueId("t"),
      start: t.gestartet || ende,
      ende: ende,
      routineId: t.routineId || "",
      routineName: t.routineName || "",
      eintragIds: eintragIds
    });
    sicherSpeichern("trainings", trainings);
  }

  // Die ids aller vorhandenen Einträge, zum schnellen Nachsehen: vorhanden[id] ist true
  function eintragIdsVorhanden() {
    const vorhanden = {};
    for (let i = 0; i < eintraege.length; i++) {
      if (eintraege[i] && eintraege[i].id) {
        vorhanden[eintraege[i].id] = true;
      }
    }
    return vorhanden;
  }

  // Gibt es von dieser Trainingseinheit noch mindestens einen Eintrag? vorhanden kommt aus eintragIdsVorhanden().
  function einheitHatEintraege(t, vorhanden) {
    if (!t || !Array.isArray(t.eintragIds)) {
      return false;
    }
    for (let i = 0; i < t.eintragIds.length; i++) {
      if (vorhanden[t.eintragIds[i]]) {
        return true;
      }
    }
    return false;
  }

  // Entfernt die Trainingseinheiten, von denen es keinen Eintrag mehr gibt.
  // Gespeichert wird nur, wenn wirklich eine wegfällt.
  function trainingsAufraeumen() {
    const vorhanden = eintragIdsVorhanden();
    let entfernt = false;
    // Von hinten nach vorn, damit die Plätze davor stimmen
    for (let i = trainings.length - 1; i >= 0; i--) {
      if (!einheitHatEintraege(trainings[i], vorhanden)) {
        trainings.splice(i, 1);
        entfernt = true;
      }
    }
    if (entfernt) {
      sicherSpeichern("trainings", trainings);
    }
  }

  // Beim Öffnen der App: Wartet noch ein Training, wird gefragt, ob es weitergehen soll
  function trainingBeimStartPruefen() {
    if (!laufendesTraining) {
      return;
    }
    frageZeigen(txt("training.fortsetzenFrage"), txt("modus.nichtFertig", {
      name: laufendesTraining.routineName,
      stand: txt("uebung.xVonY", { x: laufendesTraining.index + 1, y: laufendesTraining.uebungen.length })
    }), [
      { text: txt("fortsetzen"), art: "haupt", aktion: trainingFortsetzen },
      {
        text: txt("modus.abbrechen"),
        aktion: function () {
          trainingAbbrechenFragen();
        }
      },
      { text: txt("spaeter"), art: "leise" }
    ]);
  }

  // ---------- Home ----------

  // Wechselt auf der Home-Seite zwischen Übersicht ("home") und "Übung eintragen" mit der Liste der Einträge ("log")
  function homeAnsichtZeigen(name) {
    document.getElementById("ansicht-home").classList.toggle("versteckt", name !== "home");
    document.getElementById("ansicht-log").classList.toggle("versteckt", name !== "log");
    homeAnsicht = name;
    window.scrollTo(0, 0);
    kopfzeileAktualisieren();
  }

  // Öffnet das Log. Mit zurListe = true springt die Seite gleich zur Liste der Einträge.
  function logZeigen(zurListe) {
    homeAnsichtZeigen("log");
    if (zurListe) {
      document.getElementById("liste").scrollIntoView();
      kopfzeileAktualisieren();
    }
  }

  // Zurück vom Log zur Übersicht
  function homeZeigen() {
    homeAnzeigen();
    homeAnsichtZeigen("home");
  }

  // Öffnet das Log mit einem Tag, so als wäre er dort angetippt worden
  function logFuerTagZeigen(tag) {
    angezeigterMontag = montagDerWoche(tag);
    gewaehlterTag = tag;
    wochenleisteAnzeigen();
    speichernButtonAktualisieren();
    anzeigen();
    logZeigen();
  }

  // Baut die ganze Übersicht neu auf
  function homeAnzeigen() {
    // Look Korund (seit Version 142): Der Titel heißt dort "Heute" (die korund.css zeigt data-korund statt des Texts)
    document.querySelector("#ansicht-home > h1").setAttribute("data-korund", txt("home.heute"));
    document.getElementById("home-datum").textContent = new Date().toLocaleDateString(gebiet(), { weekday: "long", day: "numeric", month: "long" });
    homeSerieAnzeigen();
    homeHeuteAnzeigen();
    homeWocheAnzeigen();
    homeLetztesAnzeigen();
    homeGewichtAnzeigen();
    homeKraftAnzeigen();
    homeErholungAnzeigen();
    // Look Korund (seit Version 143): Die Überschrift heißt dort nur "Einblicke"
    document.getElementById("home-einblicke-titel").setAttribute("data-korund", txt("home.einblicke"));
  }

  // Nur im Look Korund zu sehen (seit Version 143): die Veränderung im Zeitraum des kleinen Diagramms, z. B. "+4,5 kg seit 19.9."
  // plus färbt einen Anstieg grün (bei der Kraft), beim Körpergewicht bleibt der Text leise.
  function kachelDelta(flaeche, punkte, plus) {
    if (punkte.length < 2) {
      return;
    }
    const unterschied = gewichtAnzeige(punkte[punkte.length - 1].wert) - gewichtAnzeige(punkte[0].wert);
    const gerundet = Math.round(unterschied * 10) / 10;
    const zeichen = gerundet > 0 ? "+" : gerundet < 0 ? "−" : "±";
    const zeile = element("div", "kachel-delta");
    const wert = element("span", plus && gerundet > 0 ? "plus" : "", zeichen + zahlText(Math.abs(gerundet)) + " " + einheit());
    zeile.appendChild(wert);
    zeile.appendChild(document.createTextNode(" " + txt("home.seit", { datum: datumKurz(punkte[0].zeit) })));
    flaeche.appendChild(zeile);
  }

  // Baut eine der zwei quadratischen Kacheln auf Home in den Bereich. Die ganze Fläche ist ein Button (beimTipp).
  // Der runde Knopf oben rechts liegt als eigener Button darüber: icon ist sein Zeichen,
  // knopfText sein Name für Screenreader, beimKnopf läuft nach dem Antippen.
  // Zurück kommt die Fläche, in die der Inhalt gehört. Oben steht schon der Name.
  function homeKachel(bereich, name, beimTipp, icon, knopfText, beimKnopf) {
    const karte = element("div", "karte home-kachel");
    const flaeche = element("button", "kachel-flaeche");
    flaeche.onclick = beimTipp;
    flaeche.appendChild(element("div", "kachel-name", name));
    karte.appendChild(flaeche);

    const knopf = element("button", "kachel-knopf icon");
    knopf.innerHTML = iconSvg(icon);
    knopf.setAttribute("aria-label", knopfText);
    knopf.onclick = beimKnopf;
    karte.appendChild(knopf);
    bereich.appendChild(karte);
    return flaeche;
  }

  // Die Kachel "Körpergewicht": das zuletzt eingetragene Gewicht und das kleine Diagramm der letzten drei Monate.
  // Ein Tipp öffnet das Diagramm im Fortschritt-Tab, der Plus-Knopf das Eintragen.
  function homeGewichtAnzeigen() {
    const bereich = document.getElementById("home-gewicht");
    bereich.innerHTML = "";
    const flaeche = homeKachel(bereich, txt("koerpergewicht"), koerpergewichtZeigen, "plus", txt("fortschritt.gewichtEintragen"), gewichtSheetOeffnen);
    const liste = gewichtMessungen();

    if (liste.length === 0) {
      flaeche.appendChild(element("div", "home-zahl", "– " + einheit()));
      flaeche.appendChild(element("div", "routine-info", txt("messung.gewichtLeer")));
      return;
    }
    const letzte = liste[liste.length - 1];
    flaeche.appendChild(element("div", "home-zahl", kgText(letzte.wert)));
    kachelDelta(flaeche, miniZeitraum(liste), false);

    // Das kleine Diagramm zeigt wie das große die Messungen und ihren 7-Tage-Schnitt.
    // Der Schnitt rechnet immer mit allen Messungen, auch mit denen vor dem gezeigten Zeitraum.
    const messungen = miniZeitraum(liste);
    const schnitt = [];
    for (let i = 0; i < messungen.length; i++) {
      schnitt.push({ zeit: messungen[i].zeit, wert: schnittAm(liste, new Date(messungen[i].zeit)) });
    }
    miniDiagramm(flaeche, [
      { punkte: messungen, art: "neben", mitPunkten: true, ring: true },
      { punkte: schnitt, art: "haupt", mitPunkten: false }
    ]);
  }

  // Öffnet den Fortschritt-Tab und rollt zum Diagramm des Körpergewichts
  function koerpergewichtZeigen() {
    seiteZeigen("fortschritt");
    document.getElementById("kg-abschnitt").scrollIntoView();
  }

  // Hat der Eintrag ein gültiges Datum?
  function hatDatum(e) {
    return Boolean(e && e.datum) && !isNaN(new Date(e.datum));
  }

  // ---------- Status: Aktiv, Krank oder Urlaub (seit Version 141) ----------

  // Krank und Urlaub sind Auszeiten. Gespeichert in einstellungen.auszeiten als Liste von { art, von, bis }
  // (Zeiten in Millisekunden, bis ist null, solange die Auszeit läuft). Ohne Eintrag ist man aktiv.
  // Eine Woche mit Auszeit ohne genug Trainingstage bricht die Serie nicht und verbraucht keine Pausenwoche (serieBerechnen).
  const AUSZEIT_ARTEN = ["krank", "urlaub"];

  // Die gespeicherten Auszeiten, nur gültige Einträge
  function auszeiten() {
    if (!Array.isArray(einstellungen.auszeiten)) {
      return [];
    }
    return einstellungen.auszeiten.filter(function (a) {
      return a && AUSZEIT_ARTEN.indexOf(a.art) !== -1 && typeof a.von === "number" && (a.bis === null || typeof a.bis === "number");
    });
  }

  // Die laufende Auszeit oder null
  function auszeitAktuell() {
    const liste = auszeiten();
    for (let i = liste.length - 1; i >= 0; i--) {
      if (liste[i].bis === null) {
        return liste[i];
      }
    }
    return null;
  }

  // Die Montage aller Wochen, die eine Auszeit berühren, als { montag: true } für serieBerechnen
  function auszeitMontage() {
    const montage = {};
    const liste = auszeiten();
    for (let i = 0; i < liste.length; i++) {
      const ende = liste[i].bis === null ? Date.now() : liste[i].bis;
      let montag = montagDerWoche(new Date(liste[i].von));
      while (montag.getTime() <= ende) {
        montage[montag.getTime()] = true;
        montag = new Date(montag.getFullYear(), montag.getMonth(), montag.getDate() + 7);
      }
    }
    return montage;
  }

  // Setzt den Status: "aktiv" beendet die laufende Auszeit, "krank" oder "urlaub" beginnt eine (eine andere laufende endet dabei)
  function statusSetzen(art) {
    const liste = auszeiten();
    const jetzt = Date.now();
    const laufend = auszeitAktuell();
    if (laufend && laufend.art === art) {
      return;
    }
    if (laufend) {
      laufend.bis = jetzt;
    }
    if (AUSZEIT_ARTEN.indexOf(art) !== -1) {
      liste.push({ art: art, von: jetzt, bis: null });
    }
    einstellungen.auszeiten = liste;
    einstellungenSpeichern();
    statusAnzeigen();
    homeAnzeigen();
  }

  // Training-Tab (Look Korund): der Knopf oben rechts mit dem Status. Ein Tipp öffnet die Auswahl.
  function statusAnzeigen() {
    const knopf = document.getElementById("status-knopf");
    const laufend = auszeitAktuell();
    const art = laufend ? laufend.art : "aktiv";
    knopf.textContent = txt("status." + art);
    knopf.setAttribute("data-status", art);
    knopf.setAttribute("aria-label", txt("status.titel") + ": " + txt("status." + art));
  }

  function statusWaehlen() {
    const laufend = auszeitAktuell();
    const jetzt = laufend ? laufend.art : "aktiv";
    // Look Korund (seit Version 142): ein eigenes Sheet mit drei Karten wie im Entwurf
    if (lookKorund()) {
      statusAuswahl = jetzt;
      statusSheetFuellen();
      zusatzSheetOeffnen("status-sheet");
      return;
    }
    const knoepfe = ["aktiv", "krank", "urlaub"].map(function (art) {
      return {
        text: (art === jetzt ? "✓ " : "") + txt("status." + art),
        art: art === jetzt ? "haupt" : "",
        aktion: function () {
          statusSetzen(art);
        }
      };
    });
    knoepfe.push({ text: txt("abbrechen"), art: "leise" });
    frageZeigen(txt("status.titel"), txt("status.text"), knoepfe);
  }

  // Die Auswahl im Status-Sheet, bis „Übernehmen“ sie speichert
  let statusAuswahl = "aktiv";

  // Die drei Karten im Status-Sheet: Symbol, Name, kurze Erklärung und rechts der Kreis der Auswahl
  function statusSheetFuellen() {
    const liste = document.getElementById("status-sheet-liste");
    liste.innerHTML = "";
    const svg = function (inhalt) {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inhalt + "</svg>";
    };
    const symbole = {
      aktiv: svg('<polyline points="3 12 7 12 10 5 14 19 17 12 21 12"/>'),
      krank: svg('<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/>'),
      urlaub: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>')
    };
    ["aktiv", "krank", "urlaub"].forEach(function (art) {
      const karte = element("button", "status-karte status-" + art);
      karte.type = "button";
      karte.setAttribute("role", "radio");
      karte.setAttribute("aria-checked", art === statusAuswahl ? "true" : "false");
      const symbol = element("span", "status-symbol");
      symbol.innerHTML = symbole[art];
      karte.appendChild(symbol);
      const text = element("span", "status-karte-text");
      text.appendChild(element("span", "status-karte-name", txt("status." + art)));
      text.appendChild(element("span", "status-karte-info", txt("status.info." + art)));
      karte.appendChild(text);
      karte.appendChild(element("span", "status-kreis"));
      karte.onclick = function () {
        statusAuswahl = art;
        statusSheetFuellen();
      };
      liste.appendChild(karte);
    });
  }

  function statusUebernehmen() {
    zusatzSheetsSchliessen();
    statusSetzen(statusAuswahl);
  }

  // Look Korund (seit Version 141): die Serie oben rechts neben dem Titel, z. B. "Serie: 6 Wochen". Ohne Serie leer.
  // Dieselbe Zahl wie im Profil (gesamtZahlen). Die korund.css zeigt sie nur im Look Korund.
  function homeSerieAnzeigen() {
    const feld = document.getElementById("home-serie");
    const serie = gesamtZahlen().serie;
    feld.textContent = serie > 0 ? txtAnzahl("profil.serieText", serie) : "";
    feld.onclick = serieSeiteOeffnen;
    if (serie > 0) {
      feld.setAttribute("role", "button");
      feld.tabIndex = 0;
    } else {
      feld.removeAttribute("role");
      feld.removeAttribute("tabindex");
    }
  }

  // Die IDs der Muskelgruppen einer Routine in ihrer Reihenfolge, jede einmal, höchstens max.
  // Feste Übungen über ihren Hauptmuskel, eigene über den gespeicherten Namen der Gruppe.
  function routineGruppenIds(routine, max) {
    const ids = [];
    for (let i = 0; i < routine.uebungen.length && ids.length < max; i++) {
      const u = routine.uebungen[i];
      let id = "";
      if (UEBUNG_NACH_ID[u.uebungId]) {
        id = uebungGruppe(UEBUNG_NACH_ID[u.uebungId]);
      } else {
        for (let j = 0; j < MUSKELGRUPPEN.length; j++) {
          if (MUSKELGRUPPEN[j].de === u.muskelgruppe || MUSKELGRUPPEN[j].en === u.muskelgruppe) {
            id = MUSKELGRUPPEN[j].id;
          }
        }
      }
      if (id && GRUPPE_NACH_ID[id] && ids.indexOf(id) === -1) {
        ids.push(id);
      }
    }
    return ids;
  }

  // Look Korund (seit Version 142): Wie lange eine Routine ungefähr dauert, in Minuten. Aus den letzten (bis zu 5)
  // Trainings dieser Routine mit Start und Ende, sonst geschätzt: je Satz 45 s Arbeit plus die Pause der Übung.
  function routineDauerMinuten(routine) {
    const dauern = [];
    for (let i = trainings.length - 1; i >= 0 && dauern.length < 5; i--) {
      const t = trainings[i];
      if (t && t.routineId === routine.id && t.start && t.ende) {
        const minuten = (new Date(t.ende) - new Date(t.start)) / 60000;
        if (minuten > 5 && minuten < 300) {
          dauern.push(minuten);
        }
      }
    }
    if (dauern.length > 0) {
      return Math.round(dauern.reduce(function (a, b) { return a + b; }, 0) / dauern.length);
    }
    let sekunden = 0;
    for (let i = 0; i < routine.uebungen.length; i++) {
      const u = routine.uebungen[i];
      sekunden += (u.zielSaetze || 3) * (45 + pauseDauer(u));
    }
    return Math.round(sekunden / 60);
  }

  // Look Korund (seit Version 142): der Kopf einer Routinen-Karte wie im Entwurf. Die Teile sind sonst ausgeblendet.
  function routineKopfKorund(karte, routine, label) {
    karte.classList.add("mit-korund-kopf");
    const gruppen = [];
    const ids = routineGruppenIds(routine, 3);
    for (let i = 0; i < ids.length; i++) {
      gruppen.push(GRUPPE_NACH_ID[ids[i]][sprache] || GRUPPE_NACH_ID[ids[i]].de);
    }
    if (label) {
      karte.appendChild(element("div", "korund-kopf-label", label + " · " + routine.name));
    }
    karte.appendChild(element("div", "korund-kopf-titel", gruppen.length > 0 ? gruppen.join(", ") : routine.name));
    const meta = element("div", "korund-kopf-meta");
    meta.appendChild(element("span", "korund-dauer", txt("routine.dauer", { n: routineDauerMinuten(routine) })));
    meta.appendChild(element("span", "korund-anzahl", uebungenText(routine.uebungen.length)));
    karte.appendChild(meta);
  }

  // Look Korund (seit Version 142): die Muskelfigur einer einzelnen Übung als SVG, ohne Gruppe die leere Figur
  function uebungFigurSvg(u) {
    const ids = routineGruppenIds({ uebungen: [u] }, 1);
    return koerperSvg(GRUPPE_NACH_ID[ids[0]] || { id: "", ansicht: "vorn" });
  }

  // Look Korund: die Muskelfiguren einer Routine als kleine Kacheln (Klasse heute-figuren, nur im Look Korund zu sehen)
  function routineFiguren(routine) {
    const reihe = element("div", "heute-figuren");
    const ids = routineGruppenIds(routine, 4);
    for (let i = 0; i < ids.length; i++) {
      const kachel = element("span", "heute-figur");
      kachel.innerHTML = koerperSvg(GRUPPE_NACH_ID[ids[i]]);
      reihe.appendChild(kachel);
    }
    return reihe;
  }

  // Look Korund: der Hinweis über der Heute-Karte, wenn bei einer Übung der geplanten Routine die Steigerung dran ist,
  // z. B. "Steigerung möglich · Bankdrücken: heute 92,5 kg". Dieselbe Rechnung wie im Trainingsmodus (steigerungVorschlag).
  // Ohne Steigerung oder mit ausgeschaltetem Schalter gibt es keinen Hinweis. Die korund.css zeigt ihn nur im Look Korund.
  function homeHinweis(routine) {
    if (!steigernAn()) {
      return null;
    }
    for (let i = 0; i < routine.uebungen.length; i++) {
      const u = routine.uebungen[i];
      const v = steigerungVorschlag(u);
      if (v && v.art === "steigern") {
        const karte = element("div", "karte home-hinweis");
        const symbol = element("span", "home-hinweis-symbol", "↑");
        symbol.setAttribute("aria-hidden", "true");
        karte.appendChild(symbol);
        const text = element("div", "home-hinweis-text");
        text.appendChild(element("div", "home-hinweis-titel", txt("home.steigerung")));
        text.appendChild(element("div", "routine-info", txt("home.steigerungText", { name: anzeigeName(u.name, u.uebungId), gewicht: gewichtText(v.gewicht) })));
        karte.appendChild(text);
        return karte;
      }
    }
    return null;
  }

  // Die Karte ganz oben: das laufende Training, sonst das, was laut Wochenplan heute dran ist
  function homeHeuteAnzeigen() {
    const bereich = document.getElementById("home-heute");
    bereich.innerHTML = "";
    const karte = element("div", "karte heute-karte");
    bereich.appendChild(karte);

    if (laufendesTraining) {
      karte.appendChild(element("div", "heute-label", txt("home.laeuft")));
      karte.appendChild(element("div", "ansicht-titel", laufendesTraining.routineName));
      karte.appendChild(element("div", "routine-info", txt("uebung.xVonY", { x: laufendesTraining.index + 1, y: laufendesTraining.uebungen.length })));
      const weiter = element("button", "speichern-btn", txt("training.fortsetzen"));
      weiter.onclick = trainingFortsetzen;
      karte.appendChild(weiter);
      return;
    }

    // Läuft eine Auszeit (Krank oder Urlaub), steht sie oben, mit dem Knopf zurück zu "Aktiv"
    const auszeit = auszeitAktuell();
    if (auszeit) {
      karte.appendChild(element("div", "heute-label", txt("status.titel")));
      karte.appendChild(element("div", "ansicht-titel", txt("status." + auszeit.art)));
      karte.appendChild(element("div", "routine-info", txt("home.status." + auszeit.art)));
      const aktiv = element("button", "knopf heute-knopf", txt("status.wiederAktiv"));
      aktiv.onclick = function () {
        statusSetzen("aktiv");
      };
      karte.appendChild(aktiv);
      return;
    }

    const heute = new Date();
    const plan = wochenplan[(heute.getDay() + 6) % 7];
    const routine = routineFinden(plan);

    if (routine) {
      // Schon erledigt ist die Routine, wenn es heute einen Eintrag aus ihr gibt
      let erledigt = false;
      for (let i = 0; i < eintraege.length; i++) {
        const e = eintraege[i];
        if (hatDatum(e) && e.routineId === routine.id && tagSchluessel(new Date(e.datum)) === tagSchluessel(heute)) {
          erledigt = true;
        }
      }

      if (erledigt) {
        karte.appendChild(element("div", "heute-label", txt("home.erledigt")));
      } else {
        karte.appendChild(element("div", "heute-label", txt("home.geplant")));
        const hinweis = homeHinweis(routine);
        if (hinweis) {
          bereich.insertBefore(hinweis, karte);
        }
      }
      karte.appendChild(element("div", "ansicht-titel", routine.name));
      karte.appendChild(element("div", "routine-info", routineInfo(routine)));
      // Look Korund (seit Version 142): "GEPLANT · PUSH", die Muskelgruppen als Titel und "ca. 62 Min · 4 Übungen"
      routineKopfKorund(karte, routine, txt(erledigt ? "home.erledigt" : "home.geplantKurz"));
      karte.appendChild(routineFiguren(routine));

      let start;
      if (erledigt) {
        start = element("button", "knopf heute-knopf", txt("home.nochmal"));
      } else {
        start = element("button", "speichern-btn", txt("home.starten"));
      }
      start.onclick = function () {
        routineStarten(routine);
      };
      karte.appendChild(start);
      return;
    }

    if (plan === "ruhe") {
      karte.appendChild(element("div", "heute-label heute-label-tag", txt("heute")));
      karte.appendChild(element("div", "ansicht-titel", txt("ruhetag")));
      karte.appendChild(element("div", "routine-info", txt("home.ruheText")));
      return;
    }

    karte.appendChild(element("div", "heute-label heute-label-tag", txt("heute")));
    karte.appendChild(element("div", "ansicht-titel", txt("home.nichtsGeplant")));
    karte.appendChild(element("div", "routine-info", txt("home.nichtsText")));
    const zumPlan = element("button", "knopf heute-knopf", txt("home.zumPlan"));
    zumPlan.onclick = function () {
      seiteZeigen("training");
    };
    karte.appendChild(zumPlan);
  }

  // ---------- Home: die Woche zum Blättern ----------

  // So lange dauert das Hinübergleiten zur nächsten Woche (in Millisekunden, wie in der style.css)
  const HOME_WOCHE_DAUER = 220;

  // So viele Wochen nach der aktuellen lassen sich ansehen. Der Wochenplan wiederholt sich jede Woche,
  // weiter vorn sähe also alles gleich aus.
  const HOME_WOCHEN_VORAUS = 4;

  // Die Trainingstage, aus denen Home die Woche baut (Schlüssel wie bei tagSchluessel)
  let homeTage = {};

  // Gleitet die Leiste gerade zur nächsten Woche? Solange lässt sich nicht weiterblättern.
  let homeWocheWechselt = false;

  // Der Montag eine oder mehrere Wochen davor (wochen negativ) oder danach
  function montagVerschieben(montag, wochen) {
    return new Date(montag.getFullYear(), montag.getMonth(), montag.getDate() + wochen * 7);
  }

  // Der Montag der ersten Woche mit Einträgen. Ohne Einträge ist es die aktuelle Woche.
  function homeErsterMontag() {
    let erster = montagDerWoche(new Date());
    Object.keys(homeTage).forEach(function (schluessel) {
      const montag = montagDerWoche(homeTage[schluessel].datum);
      if (montag < erster) {
        erster = montag;
      }
    });
    return erster;
  }

  // Der Montag der letzten Woche, die sich ansehen lässt
  function homeLetzterMontag() {
    return montagVerschieben(montagDerWoche(new Date()), HOME_WOCHEN_VORAUS);
  }

  // Gibt es in dieser Richtung (-1 zurück, 1 vor) noch eine Woche? Zurück geht es bis zur ersten Woche
  // mit Einträgen, vor ein paar Wochen über die aktuelle hinaus.
  function homeWocheErlaubt(richtung) {
    const ziel = montagVerschieben(homeMontag, richtung);
    return ziel >= homeErsterMontag() && ziel <= homeLetzterMontag();
  }

  // Der Zeitraum einer Woche als Text, z. B. "5. bis 11. Okt.", "28. Sept. bis 4. Okt." oder
  // "29. Dez. 2025 bis 4. Jan. 2026". Das Jahr steht nur dabei, wenn es nicht das aktuelle ist.
  // Geschrieben wird immer in der Schreibweise der Sprache (Englisch britisch: "5 – 11 Oct"),
  // sonst stünde bei amerikanisch eingestellten Geräten der Monat mitten im Zeitraum.
  function homeZeitraum(montag) {
    const sonntag = new Date(montag.getFullYear(), montag.getMonth(), montag.getDate() + 6);
    const jahreswechsel = montag.getFullYear() !== sonntag.getFullYear();

    const bis = { day: "numeric", month: "short" };
    if (jahreswechsel || sonntag.getFullYear() !== new Date().getFullYear()) {
      bis.year = "numeric";
    }
    const ort = spracheDaten().gebiet;
    const ende = sonntag.toLocaleDateString(ort, bis);

    // Liegt die ganze Woche in einem Monat, steht er nur einmal da
    if (montag.getMonth() === sonntag.getMonth()) {
      return txt("home.zeitraum.kurz", { von: montag.getDate(), bis: ende });
    }
    let von = { day: "numeric", month: "short" };
    if (jahreswechsel) {
      von = bis;
    }
    return txt("home.zeitraum", { von: montag.toLocaleDateString(ort, von), bis: ende });
  }

  // Die sieben Tage einer Woche als Leiste. In der aktuellen Woche und in den Wochen danach steht bei jedem Tag
  // die geplante Routine. Der Wochenplan von früher ist nicht gespeichert, vergangene Wochen zeigen deshalb,
  // aus welcher Routine wirklich trainiert wurde. Ein grüner Punkt heißt: An dem Tag gibt es Einträge.
  // sichtbar: false bei den Nachbarwochen, die nur beim Wischen ins Bild kommen.
  function homeWocheBauen(montag, sichtbar) {
    const heute = new Date();
    const geplant = montag.getTime() >= montagDerWoche(heute).getTime();
    const seite = element("div", "home-woche-seite");
    if (!sichtbar) {
      seite.setAttribute("aria-hidden", "true");
    }

    for (let i = 0; i < 7; i++) {
      const tag = new Date(montag.getFullYear(), montag.getMonth(), montag.getDate() + i);
      const trainiert = homeTage[tagSchluessel(tag)];
      const btn = element("button", "home-tag");
      // Nur ein Merkmal für den Look Korund (gefüllter Kreis): an der Anzeige sonst ändert es nichts
      if (trainiert) {
        btn.classList.add("trainiert");
      }
      btn.appendChild(element("span", "tag-name", wochentag(i)));
      btn.appendChild(element("span", "tag-zahl", tag.getDate()));

      let plan = "–";
      let ansage = txt("home.tag.nichts");
      if (geplant) {
        const routine = routineFinden(wochenplan[i]);
        if (routine) {
          plan = routine.name;
          ansage = routine.name;
        } else if (wochenplan[i] === "ruhe") {
          plan = txt("home.tag.ruhe");
          ansage = txt("ruhetag");
        }
        if (trainiert) {
          ansage += ", " + txt("home.tag.trainiert");
        }
      } else {
        const namen = trainiert ? tagRoutinen(trainiert) : [];
        if (namen.length > 0) {
          plan = namen.join(" + ");
          ansage = plan + ", " + txt("home.tag.trainiert");
        } else if (trainiert) {
          ansage = txt("home.tag.trainiert");
        } else {
          ansage = txt("home.tag.frei");
        }
      }
      btn.appendChild(element("span", "tag-plan", plan));

      const punkt = element("span", "tag-punkt");
      if (trainiert) {
        punkt.classList.add("trainiert");
      }
      btn.appendChild(punkt);
      btn.setAttribute("aria-label", tagText(tag) + " " + ansage);

      if (tagSchluessel(tag) === tagSchluessel(heute)) {
        btn.classList.add("heute");
      }
      if (!sichtbar) {
        btn.tabIndex = -1;
      }
      // Jeder Tag öffnet seine Details, auch ein Tag in der Zukunft: Er zeigt, was geplant ist
      btn.onclick = function () {
        tagSheetOeffnen(tagSchluessel(tag));
      };
      seite.appendChild(btn);
    }
    return seite;
  }

  // Die gewählte Woche: Titel und Zeitraum, die sieben Tage und darunter die Zahlen der Woche.
  // Links und rechts der Tage liegen unsichtbar die Nachbarwochen, damit sie beim Wischen mitgleiten.
  function homeWocheAnzeigen() {
    homeTage = trainingstage();
    const diese = montagDerWoche(new Date());
    const erster = homeErsterMontag();

    // Die gewählte Woche bleibt zwischen der ersten Woche mit Einträgen und der letzten erlaubten,
    // auch wenn Einträge gelöscht wurden
    const letzter = homeLetzterMontag();
    if (homeMontag > letzter) {
      homeMontag = letzter;
    }
    if (homeMontag < erster) {
      homeMontag = erster;
    }
    const istDiese = homeMontag.getTime() === diese.getTime();

    // Titel: "Diese Woche", "Letzte Woche" und "Nächste Woche" mit dem Zeitraum darunter,
    // alle anderen Wochen nur mit dem Zeitraum
    const zeitraum = homeZeitraum(homeMontag);
    let titel = "";
    if (istDiese) {
      titel = txt("home.dieseWoche");
    } else if (homeMontag.getTime() === montagVerschieben(diese, -1).getTime()) {
      titel = txt("home.letzteWoche");
    } else if (homeMontag.getTime() === montagVerschieben(diese, 1).getTime()) {
      titel = txt("home.naechsteWoche");
    }
    document.getElementById("home-woche-titel").textContent = titel || zeitraum;
    const unterzeile = document.getElementById("home-woche-zeitraum");
    unterzeile.textContent = zeitraum;
    unterzeile.classList.toggle("versteckt", titel === "");
    // Der Knopf "Heute" hängt frei rechts neben dem Zeitraum. Ragt er dort zu weit in den Pfeil, steht er wie früher in der Zeile.
    const heute = document.getElementById("home-woche-heute");
    heute.classList.toggle("versteckt", istDiese);
    heute.classList.remove("eng");
    heute.classList.toggle("eng", !istDiese && heute.getBoundingClientRect().right > document.getElementById("home-woche-vor").getBoundingClientRect().left + 8);

    document.getElementById("home-woche-zurueck").disabled = !homeWocheErlaubt(-1);
    document.getElementById("home-woche-vor").disabled = !homeWocheErlaubt(1);

    // Die drei Wochen nebeneinander. Wo es keine Nachbarwoche gibt, bleibt ihr Platz leer.
    const leiste = document.getElementById("home-woche");
    leiste.innerHTML = "";
    for (let richtung = -1; richtung <= 1; richtung++) {
      if (richtung === 0 || homeWocheErlaubt(richtung)) {
        leiste.appendChild(homeWocheBauen(montagVerschieben(homeMontag, richtung), richtung === 0));
      } else {
        leiste.appendChild(element("div", "home-woche-seite"));
      }
    }
    // Ohne Übergang zurück in die Mitte, sonst würde die neue Woche ein zweites Mal hereingleiten
    leiste.style.transition = "none";
    leiste.style.transform = "";

    // Die Zahlen der Woche, in einer Woche ohne Training ein kurzer Satz.
    // In künftigen Wochen steht da, wie viele Trainings der Wochenplan vorsieht.
    const karte = document.getElementById("home-woche-zahlen");
    karte.innerHTML = "";
    const zahlen = wochenZahlen(homeTage, homeMontag);
    let satz;
    if (zahlen.workouts > 0) {
      karte.appendChild(wochenRingeFeld(zahlen, titel || zeitraum));
      return;
    } else if (istDiese) {
      satz = txt("home.wocheLeerNoch");
    } else if (homeMontag > diese) {
      let geplant = 0;
      for (let i = 0; i < 7; i++) {
        if (routineFinden(wochenplan[i])) {
          geplant++;
        }
      }
      if (geplant > 0) {
        satz = txtAnzahl("home.wocheGeplant", geplant);
      } else {
        satz = txt("home.nichtsGeplant");
      }
    } else {
      satz = txt("home.wocheLeer");
    }
    karte.appendChild(element("div", "routine-info home-woche-leer", satz));
  }

  // Springt ohne Gleiten zurück zur aktuellen Woche
  function homeWocheHeute() {
    if (homeWocheWechselt) {
      return;
    }
    homeMontag = montagDerWoche(new Date());
    homeWocheAnzeigen();
  }

  // Blättert eine Woche zurück (-1) oder vor (1): Die Nachbarwoche gleitet ins Bild, danach wird neu aufgebaut.
  // Gibt es in der Richtung keine Woche mehr, gleitet die Leiste zurück in die Mitte.
  function homeWocheBlaettern(richtung) {
    if (homeWocheWechselt) {
      return;
    }
    const leiste = document.getElementById("home-woche");
    leiste.style.transition = "";
    if (!homeWocheErlaubt(richtung)) {
      leiste.style.transform = "";
      return;
    }

    if (richtung < 0) {
      leiste.style.transform = "translateX(0)";
    } else {
      leiste.style.transform = "translateX(calc(-200% - 12px))";
    }
    // Wer am Gerät "Bewegung reduzieren" eingestellt hat, bekommt die neue Woche sofort
    let dauer = HOME_WOCHE_DAUER;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dauer = 0;
    }
    homeWocheWechselt = true;
    setTimeout(function () {
      homeWocheWechselt = false;
      homeMontag = montagVerschieben(homeMontag, richtung);
      homeWocheAnzeigen();
    }, dauer);
  }

  // Wischen über die Tage: Die Leiste folgt dem Finger und rastet beim Loslassen in der Nachbarwoche ein.
  // Hoch und runter scrollt der Browser die Seite selbst (touch-action: pan-y in der style.css),
  // hier kommt nur die seitliche Bewegung an.
  (function () {
    const rahmen = document.getElementById("home-woche-rahmen");
    const leiste = document.getElementById("home-woche");
    // Ab so vielen Pixeln steht fest, ob seitlich gewischt oder gescrollt wird
    const SPIEL = 8;
    // Ab so vielen Pixeln seitlich wird beim Loslassen geblättert
    const WEIT_GENUG = 50;

    // Der Finger auf der Leiste: wo er aufgesetzt hat, ob er seitlich wischt (null = noch offen) und wie weit
    let finger = null;
    // Nach dem Wischen kommt vom Browser manchmal noch ein Klick: Der darf keinen Tag öffnen
    let gewischt = false;

    rahmen.addEventListener("touchstart", function (ereignis) {
      gewischt = false;
      if (ereignis.touches.length !== 1 || homeWocheWechselt) {
        finger = null;
        return;
      }
      finger = { x: ereignis.touches[0].clientX, y: ereignis.touches[0].clientY, seitlich: null, weg: 0 };
    }, { passive: true });

    rahmen.addEventListener("touchmove", function (ereignis) {
      if (!finger) {
        return;
      }
      let weg = ereignis.touches[0].clientX - finger.x;
      const hoch = ereignis.touches[0].clientY - finger.y;
      if (finger.seitlich === null) {
        if (Math.abs(weg) < SPIEL && Math.abs(hoch) < SPIEL) {
          return;
        }
        finger.seitlich = Math.abs(weg) > Math.abs(hoch);
      }
      if (!finger.seitlich) {
        return;
      }
      gewischt = true;
      // Gibt es in der Richtung keine Woche, gibt die Leiste nur ein Stück nach
      if (!homeWocheErlaubt(weg > 0 ? -1 : 1)) {
        weg = weg / 3;
      }
      finger.weg = weg;
      leiste.style.transition = "none";
      leiste.style.transform = "translateX(calc(-100% - 6px + " + weg + "px))";
    }, { passive: true });

    function loslassen(blaettern) {
      if (!finger || !finger.seitlich) {
        finger = null;
        return;
      }
      const weg = finger.weg;
      finger = null;
      if (blaettern && Math.abs(weg) >= WEIT_GENUG) {
        homeWocheBlaettern(weg > 0 ? -1 : 1);
      } else {
        // Zurück in die Mitte
        leiste.style.transition = "";
        leiste.style.transform = "";
      }
    }

    rahmen.addEventListener("touchend", function () {
      loslassen(true);
    });
    rahmen.addEventListener("touchcancel", function () {
      loslassen(false);
    });

    rahmen.addEventListener("click", function (ereignis) {
      if (gewischt) {
        gewischt = false;
        ereignis.stopPropagation();
        ereignis.preventDefault();
      }
    }, true);
  })();

  // Sucht das letzte Training. Gibt null zurück, wenn es noch keins gibt, sonst
  // { name, datum, eintraege, minuten }. minuten ist null, wenn keine Dauer bekannt ist.
  function letztesTraining() {
    // Der Tag mit den neuesten Einträgen
    let letzterTag = null;
    for (let i = 0; i < eintraege.length; i++) {
      if (hatDatum(eintraege[i])) {
        const datum = new Date(eintraege[i].datum);
        if (letzterTag === null || datum > letzterTag) {
          letzterTag = datum;
        }
      }
    }

    // Die neueste gespeicherte Trainingseinheit, von der es noch Einträge gibt
    const nachId = {};
    for (let i = 0; i < eintraege.length; i++) {
      if (eintraege[i] && eintraege[i].id) {
        nachId[eintraege[i].id] = eintraege[i];
      }
    }
    let einheit = null;
    let einheitEintraege = [];
    for (let i = 0; i < trainings.length; i++) {
      const t = trainings[i];
      if (!t || !Array.isArray(t.eintragIds) || isNaN(new Date(t.ende)) || isNaN(new Date(t.start))) {
        continue;
      }
      const liste = [];
      for (let j = 0; j < t.eintragIds.length; j++) {
        if (nachId[t.eintragIds[j]]) {
          liste.push(nachId[t.eintragIds[j]]);
        }
      }
      if (liste.length > 0 && (einheit === null || new Date(t.ende) > new Date(einheit.ende))) {
        einheit = t;
        einheitEintraege = liste;
      }
    }

    // Die Einheit gilt, außer an einem späteren Tag wurde noch etwas frei eingetragen
    if (einheit && (letzterTag === null || tagSchluessel(letzterTag) <= tagSchluessel(new Date(einheit.ende)))) {
      return {
        name: einheit.routineName || txt("freiesTraining"),
        datum: new Date(einheit.start),
        eintraege: einheitEintraege,
        minuten: Math.max(1, Math.round((new Date(einheit.ende) - new Date(einheit.start)) / 60000))
      };
    }

    if (letzterTag === null) {
      return null;
    }

    // Ohne Einheit: alle Einträge des letzten Tages. Der Name kommt von den Routinen, aus denen sie stammen.
    const liste = [];
    const namen = [];
    for (let i = 0; i < eintraege.length; i++) {
      const e = eintraege[i];
      if (hatDatum(e) && tagSchluessel(new Date(e.datum)) === tagSchluessel(letzterTag)) {
        liste.push(e);
        if (e.routineName && namen.indexOf(e.routineName) === -1) {
          namen.push(e.routineName);
        }
      }
    }
    return {
      name: namen.join(" + ") || txt("freiesTraining"),
      datum: letzterTag,
      eintraege: liste,
      minuten: null
    };
  }

  // Die Dauer eines Trainings in ganzen Minuten (mindestens 1) aus start und ende (ISO-Texte).
  // Ohne gültige Zeiten: null. Das Tag-Sheet und der Bericht nach dem Training rechnen beide so.
  function einheitMinuten(t) {
    if (isNaN(new Date(t.start)) || isNaN(new Date(t.ende))) {
      return null;
    }
    return Math.max(1, Math.round((new Date(t.ende) - new Date(t.start)) / 60000));
  }

  // Macht aus Minuten einen Text: "45 Min." oder "1 Std. 5 Min."
  function dauerText(minuten) {
    if (minuten < 60) {
      return txt("dauer.minuten", { m: minuten });
    }
    return txt("dauer.stunden", { h: Math.floor(minuten / 60), m: minuten % 60 });
  }

  // Die Karte "Letztes Training": Routine, Datum, Dauer und die drei Zahlen
  function homeLetztesAnzeigen() {
    const bereich = document.getElementById("home-letztes");
    bereich.innerHTML = "";
    const karte = element("div", "karte");
    bereich.appendChild(karte);

    const training = letztesTraining();
    if (!training) {
      karte.classList.add("kommt-bald");
      karte.textContent = txt("home.keinTraining");
      return;
    }

    // Jede Übung zählt einmal: über ihre ID, eigene Übungen über den Namen
    const uebungen = {};
    let anzahlUebungen = 0;
    let anzahlSaetze = 0;
    let bewegt = 0;
    for (let i = 0; i < training.eintraege.length; i++) {
      const e = training.eintraege[i];
      let schluessel = "name:" + String(e.uebung).trim().toLowerCase();
      if (e.uebungId) {
        schluessel = "id:" + e.uebungId;
      }
      if (!uebungen[schluessel]) {
        uebungen[schluessel] = true;
        anzahlUebungen++;
      }
      // Einträge, bei denen keine Zahl steht, werden wie auf der Fortschritt-Seite übersprungen
      anzahlSaetze += arbeitsSaetzeVon(e).length;
      bewegt += eintragVolumen(e, 0);
    }

    let info = tagTextMitJahr(training.datum);
    if (training.minuten !== null) {
      info += " · " + dauerText(training.minuten);
    }
    // Nur im Look Korund zu sehen (seit Version 143): Datum und Dauer klein über dem Namen
    let label = tagText(training.datum);
    if (training.minuten !== null) {
      label += " · " + dauerText(training.minuten);
    }
    karte.appendChild(element("div", "letztes-label", label));
    karte.appendChild(element("div", "routine-name", training.name));
    karte.appendChild(element("div", "routine-info", info));

    const zahlen = element("div", "home-zahlen");
    zahlen.appendChild(homeZahl(anzahlUebungen, txt("uebungen")));
    zahlen.appendChild(homeZahl(anzahlSaetze, txt("saetze")));
    zahlen.appendChild(homeVolumenZahl(bewegt, txt("home.bewegt")));
    karte.appendChild(zahlen);

    // Nur im Look Korund (seit Version 143): neue Rekorde dieses Trainings in einer leisen Zeile, dieselbe Regel wie im Bericht
    if (lookKorund()) {
      const rekordListe = berichtRekorde(rangStand(), training.eintraege);
      if (rekordListe.length > 0) {
        const zeile = element("div", "letztes-rekord");
        const symbol = element("span", "letztes-rekord-symbol");
        symbol.innerHTML = iconSvg("pokal");
        zeile.appendChild(symbol);
        const namen = rekordListe.map(function (r) {
          return r.name;
        });
        const text = element("span", "");
        text.appendChild(element("b", "", txt(rekordListe.length === 1 ? "home.rekord" : "home.rekorde")));
        // Ab drei Rekorden steht nur der erste mit "und 2 weitere" da, damit die Zeile kurz bleibt
        let liste = namen.join(", ");
        if (rekordListe.length === 1) {
          liste = namen[0] + " " + kgText(rekordListe[0].wert);
        } else if (rekordListe.length > 2) {
          liste = txt("home.rekordeMehr", { name: namen[0], n: rekordListe.length - 1 });
        }
        text.appendChild(document.createTextNode(" · " + liste));
        zeile.appendChild(text);
        karte.appendChild(zeile);
      }
    }
  }

  // ---------- Home: Erholung (Look Korund, seit Version 143) ----------

  // Nach so vielen Kalendertagen gilt eine Körperpartie als erholt (gestern trainiert = noch nicht, vorgestern = ja)
  const ERHOLUNG_TAGE = 2;
  // Partien, die länger nicht trainiert wurden, zählen nicht mit
  const ERHOLUNG_FENSTER_TAGE = 14;
  // Die Körperpartien der Karte und welche Muskelgruppen dazugehören
  const ERHOLUNG_PARTIEN = [
    { id: "brust", gruppen: ["brust"] },
    { id: "ruecken", gruppen: ["lat", "ruecken-oben", "ruecken-unten", "trapez"] },
    { id: "beine", gruppen: ["quadrizeps", "beinbeuger", "po", "adduktoren", "abduktoren", "waden"] },
    { id: "schultern", gruppen: ["schulter-vorn", "schulter-seite", "schulter-hinten"] },
    { id: "arme", gruppen: ["bizeps", "trizeps", "unterarme"] }
  ];

  // Die ID der Muskelgruppe eines Eintrags oder einer Übung der Routine: über die bekannte Übung, sonst über den gespeicherten Namen der Gruppe
  function gruppeIdVon(uebungId, gruppenName) {
    const bekannt = UEBUNG_NACH_ID[uebungId] || UEBUNG_NACH_ID[ALTE_IDS[uebungId]];
    if (bekannt && !bekannt.selbst && bekannt.haupt) {
      return uebungGruppe(bekannt);
    }
    const name = String(gruppenName || "").trim().toLowerCase();
    for (let i = 0; i < MUSKELGRUPPEN.length; i++) {
      if (name !== "" && (MUSKELGRUPPEN[i].de.toLowerCase() === name || MUSKELGRUPPEN[i].en.toLowerCase() === name)) {
        return MUSKELGRUPPEN[i].id;
      }
    }
    return "";
  }

  // Die Partie zu einer Muskelgruppe oder null
  function erholungPartie(gruppeId) {
    for (let i = 0; i < ERHOLUNG_PARTIEN.length; i++) {
      if (ERHOLUNG_PARTIEN[i].gruppen.indexOf(gruppeId) !== -1) {
        return ERHOLUNG_PARTIEN[i].id;
      }
    }
    return null;
  }

  // Je Partie, vor wie vielen Kalendertagen sie zuletzt trainiert wurde (nur Partien im Fenster).
  // liste: Einträge, heute: Date. Ergebnis: { brust: 1, beine: 4, ... }
  function erholungTage(liste, heute) {
    const heuteTag = new Date(heute.getFullYear(), heute.getMonth(), heute.getDate()).getTime();
    const tage = {};
    for (let i = 0; i < liste.length; i++) {
      const e = liste[i];
      if (!hatDatum(e) || arbeitsSaetzeVon(e).length === 0) {
        continue;
      }
      const partie = erholungPartie(gruppeIdVon(e.uebungId, e.muskelgruppe));
      if (!partie) {
        continue;
      }
      const d = new Date(e.datum);
      const abstand = Math.round((heuteTag - new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()) / 86400000);
      if (abstand < 0 || abstand > ERHOLUNG_FENSTER_TAGE) {
        continue;
      }
      if (tage[partie] === undefined || abstand < tage[partie]) {
        tage[partie] = abstand;
      }
    }
    return tage;
  }

  // Die Routine, deren Partien alle erholt sind: zuerst die heute geplante, dann die mit den am längsten erholten Partien.
  // Routinen ohne erkannte Partie zählen nicht. Ohne passende Routine null.
  function erholungRoutine(tage, liste, geplantId) {
    let beste = null;
    let besteWert = -1;
    for (let i = 0; i < liste.length; i++) {
      const r = liste[i];
      if (!r || !Array.isArray(r.uebungen) || r.uebungen.length === 0) {
        continue;
      }
      let passt = true;
      let wert = Infinity;
      let erkannt = 0;
      for (let j = 0; j < r.uebungen.length; j++) {
        const partie = erholungPartie(gruppeIdVon(r.uebungen[j].uebungId, r.uebungen[j].muskelgruppe));
        if (!partie) {
          continue;
        }
        erkannt++;
        const t = tage[partie] === undefined ? ERHOLUNG_FENSTER_TAGE + 1 : tage[partie];
        if (t < ERHOLUNG_TAGE) {
          passt = false;
        }
        wert = Math.min(wert, t);
      }
      if (!passt || erkannt === 0) {
        continue;
      }
      if (r.id === geplantId) {
        return r;
      }
      if (wert > besteWert) {
        beste = r;
        besteWert = wert;
      }
    }
    return beste;
  }

  // Die Karte "Erholung" auf Home. Ohne Training in den letzten zwei Wochen fehlt sie ganz (data-leer).
  // Die Figur je Partie und welche Partien in der Mehrzahl stehen („Beine sind“, „Brust ist“)
  const ERHOLUNG_FIGUR = { brust: "brust", ruecken: "lat", beine: "quadrizeps", schultern: "schulter-seite", arme: "bizeps" };
  const ERHOLUNG_MEHRZAHL = ["beine", "schultern", "arme"];

  // Seit Version 145 wie im ersten Entwurf „Bereit für heute“: oben ein Satz mit rundem Symbol, darunter je trainierter Partie
  // Figur, Punkt (grün erholt, orange noch nicht) und die Tage seit dem Training, unten der Knopf zur passenden Routine
  function homeErholungAnzeigen() {
    const bereich = document.getElementById("home-erholung");
    const titel = document.getElementById("home-erholung-titel");
    if (!bereich || !lookKorund()) {
      return;
    }
    bereich.innerHTML = "";
    const tage = erholungTage(eintraege, new Date());
    // Die Partien mit Training in den letzten zwei Wochen, die am längsten erholten zuerst
    const partien = ERHOLUNG_PARTIEN.map(function (p) {
      return p.id;
    }).filter(function (id) {
      return tage[id] !== undefined;
    }).sort(function (a, b) {
      return tage[b] - tage[a];
    });
    if (partien.length === 0) {
      bereich.setAttribute("data-leer", "ja");
      titel.setAttribute("data-leer", "ja");
      return;
    }
    bereich.removeAttribute("data-leer");
    titel.removeAttribute("data-leer");
    const erholt = partien.filter(function (id) {
      return tage[id] >= ERHOLUNG_TAGE;
    });
    const muede = partien.filter(function (id) {
      return tage[id] < ERHOLUNG_TAGE;
    });
    const namen = function (liste) {
      return listeText(liste.map(function (id) {
        return txt("partie." + id);
      }));
    };
    const mehrzahl = function (liste) {
      return liste.length > 1 || ERHOLUNG_MEHRZAHL.indexOf(liste[0]) !== -1;
    };

    const kopf = element("div", "erholung-kopf");
    const symbol = element("span", "erholung-symbol" + (erholt.length > 0 ? " erholt" : ""));
    symbol.innerHTML = iconSvg("puls");
    kopf.appendChild(symbol);
    const text = element("div", "erholung-text");
    text.appendChild(element("b", "", erholt.length > 0 ? txt(mehrzahl(erholt) ? "erholung.erholt" : "erholung.erholtEins", { wer: namen(erholt) }) : txt("erholung.nochNicht")));
    if (muede.length > 0) {
      // Am längsten braucht die zuletzt trainierte Partie
      const rest = ERHOLUNG_TAGE - Math.min.apply(null, muede.map(function (id) {
        return tage[id];
      }));
      text.appendChild(element("div", "erholung-info", txt(mehrzahl(muede) ? "erholung.brauchen" : "erholung.braucht", { wer: namen(muede), tage: txtAnzahl("erholung.tage", rest) })));
    }
    kopf.appendChild(text);
    bereich.appendChild(kopf);

    const liste = element("div", "erholung-liste");
    liste.style.setProperty("--spalten", partien.length);
    partien.forEach(function (id) {
      const partie = element("div", "erholung-partie");
      const figur = element("span", "erholung-figur");
      figur.innerHTML = koerperSvg(GRUPPE_NACH_ID[ERHOLUNG_FIGUR[id]]);
      partie.appendChild(figur);
      const name = element("span", "erholung-name");
      name.appendChild(element("i", "erholung-punkt" + (tage[id] >= ERHOLUNG_TAGE ? " erholt" : "")));
      name.appendChild(document.createTextNode(txt("partie." + id)));
      partie.appendChild(name);
      let wann = txtAnzahl("erholung.tage", tage[id]);
      if (tage[id] === 0) {
        wann = txt("heute");
      } else if (tage[id] === 1) {
        wann = txt("erholung.gestern");
      }
      partie.appendChild(element("small", "", wann));
      liste.appendChild(partie);
    });
    bereich.appendChild(liste);

    const plan = wochenplan[(new Date().getDay() + 6) % 7];
    const routine = laufendesTraining ? null : erholungRoutine(tage, routinen, plan);
    if (routine) {
      const knopf = element("button", "zweit-btn erholung-start", txt("erholung.starten", { name: routine.name }));
      knopf.type = "button";
      knopf.onclick = function () {
        routineStarten(routine);
      };
      bereich.appendChild(knopf);
    }
  }

  // "Beine", "Beine und Rücken", "Beine, Rücken und Arme"
  function listeText(namen) {
    if (namen.length <= 1) {
      return namen.join("");
    }
    return namen.slice(0, -1).join(", ") + " " + txt("und") + " " + namen[namen.length - 1];
  }

  // Eine Zahl mit Beschriftung darunter
  function homeZahl(zahl, titel) {
    const feld = element("div", "");
    feld.appendChild(element("div", "home-zahl", zahl));
    feld.appendChild(element("div", "kachel-titel", titel));
    return feld;
  }

  // Das Volumen als Zahl in einer von drei Spalten: "4.820 kg" bleibt in einer Zeile, die Einheit steht
  // kleiner dahinter. Lange Zahlen bekommen etwas kleinere Ziffern, damit sie in die Karte passen.
  function homeVolumenZahl(kg, titel) {
    const text = volumenText(kg);
    const trenner = text.lastIndexOf(" ");
    const feld = homeZahl("", titel);
    const zahl = feld.firstChild;
    zahl.classList.add("mit-einheit");
    if (trenner >= 9) {
      zahl.classList.add("sehr-lang");
    } else if (trenner >= 7) {
      zahl.classList.add("lang");
    }
    zahl.appendChild(element("span", "zahl-wert", text.slice(0, trenner)));
    zahl.appendChild(element("span", "zahl-einheit", text.slice(trenner)));
    return feld;
  }

  // Die App bleibt oft tagelang offen: beim Zurückkehren stimmt "heute" sonst nicht mehr.
  // Home zeigt dann auch wieder die aktuelle Woche, so wie nach dem Öffnen.
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
      homeMontag = montagDerWoche(new Date());
      if (aktiveSeite === "home") {
        homeAnzeigen();
      }
    }
  });

  // ---------- Pausentimer ----------

  // Die Pause lässt sich in diesen Schritten einstellen, bis zu diesem Höchstwert (alles in Sekunden)
  const PAUSE_SCHRITT = 15;
  const PAUSE_MAX = 600;
  const PAUSE_STANDARD = 120;

  // So lange steht nach dem Ende "Pause vorbei" da (in Millisekunden)
  const PAUSE_VORBEI_ANZEIGE = 5000;

  // Wann die letzte Pause abgelaufen ist (0 = keine oder übersprungen)
  let pauseVorbeiSeit = 0;

  // Der Takt, der die Anzeige viermal pro Sekunde auffrischt (null = läuft nicht)
  let pauseTakt = null;

  // Macht aus einer Eingabe eine Pause in Sekunden: auf 15 Sekunden gerundet, höchstens 10 Minuten.
  // Leer oder keine Zahl ergibt null, das heißt "Standard".
  function pauseLesen(wert) {
    const zahl = Math.round(Number(wert) / PAUSE_SCHRITT) * PAUSE_SCHRITT;
    if (wert === null || wert === undefined || wert === "" || isNaN(zahl) || zahl < PAUSE_SCHRITT) {
      return null;
    }
    return Math.min(zahl, PAUSE_MAX);
  }

  // Sekunden als Text, z. B. 105 wird "1:45"
  function pauseText(sekunden) {
    return Math.floor(sekunden / 60) + ":" + String(sekunden % 60).padStart(2, "0");
  }

  // Die Standard-Pause aus den Einstellungen
  function pauseStandard() {
    return pauseLesen(einstellungen.pauseSekunden) || PAUSE_STANDARD;
  }

  // Die eigene Pause einer Übung: wie pauseLesen, dazu 0 für "Keine Pause". null heißt: die Standard-Pause.
  // Die Standard-Pause selbst kann nie 0 sein, sie liest weiter pauseLesen.
  function uebungPauseLesen(wert) {
    if (wert === 0 || wert === "0") {
      return 0;
    }
    return pauseLesen(wert);
  }

  // Die Pause für eine Übung: ihre eigene aus der Routine (auch 0), sonst die Standard-Pause
  function pauseDauer(uebung) {
    const eigene = uebungPauseLesen(uebung.pause);
    if (eigene !== null) {
      return eigene;
    }
    return pauseStandard();
  }

  // Einstellungen: zeigt die Standard-Pause
  function pauseStandardAnzeigen() {
    document.getElementById("pause-standard").textContent = pauseText(pauseStandard());
  }

  // Einstellungen: macht die Standard-Pause um 15 Sekunden kürzer oder länger
  function pauseStandardAendern(sekunden) {
    einstellungen.pauseSekunden = Math.max(PAUSE_SCHRITT, Math.min(PAUSE_MAX, pauseStandard() + sekunden));
    sicherSpeichern("einstellungen", einstellungen);
    pauseStandardAnzeigen();
    // Ist der Routinen-Editor offen, zeigen seine Pause-Felder die neue Standard-Zeit
    if (bearbeiteteRoutine && trainingAnsicht === "bearbeiten") {
      routineUebungenAnzeigen();
    }
  }

  // Restzeit der laufenden Pause in Millisekunden. Ohne Pause oder nach ihrem Ende: 0.
  function pauseRest() {
    if (!pause) {
      return 0;
    }
    return Math.max(0, pause.ende - Date.now());
  }

  function pauseMerken() {
    if (pause) {
      sicherSpeichern("pause", pause);
    } else {
      localStorage.removeItem("pause");
    }
  }

  // Startet eine Pause. Gemerkt wird nur ihr Ende, die Restzeit wird daraus immer neu berechnet.
  function pauseStarten(sekunden) {
    pause = { ende: Date.now() + sekunden * 1000 };
    pauseVorbeiSeit = 0;
    pauseMerken();
    tonVorbereiten();
    pauseTaktStarten();
  }

  // Verlängert (+) oder verkürzt (−) die laufende Pause
  function pauseAendern(sekunden) {
    if (pauseRest() === 0) {
      return;
    }
    pause.ende += sekunden * 1000;
    if (pauseRest() === 0) {
      pauseUeberspringen();
      return;
    }
    pauseMerken();
    pauseAnzeigen();
  }

  // Beendet die Pause sofort, ohne Ton
  function pauseUeberspringen() {
    pause = null;
    pauseVorbeiSeit = 0;
    pauseMerken();
    pauseAnzeigen();
  }

  function pauseTaktStarten() {
    if (pauseTakt === null) {
      pauseTakt = setInterval(pauseTick, 250);
    }
    pauseTick();
  }

  // Läuft viermal pro Sekunde und beim Zurückkehren zur App: bemerkt das Ende der Pause und frischt die Anzeige auf
  function pauseTick() {
    if (pause && pauseRest() === 0) {
      // Ton und Vibration nur, wenn die Pause gerade eben abgelaufen ist, also die App dabei offen war
      if (Date.now() - pause.ende < 2000) {
        tonSpielen();
        if (navigator.vibrate) {
          navigator.vibrate([200, 100, 200]);
        }
      }
      pause = null;
      pauseVorbeiSeit = Date.now();
      pauseMerken();
    }
    pauseAnzeigen();
  }

  // Zeigt die Pause: im Trainingsmodus als großen Countdown, überall sonst als Leiste über der Navigation
  function pauseAnzeigen() {
    const laeuft = pauseRest() > 0;
    const vorbei = !laeuft && Date.now() - pauseVorbeiSeit < PAUSE_VORBEI_ANZEIGE;
    const imModus = aktiveSeite === "training" && trainingAnsicht === "modus";

    const leiste = document.getElementById("pause-leiste");
    leiste.classList.toggle("sichtbar", !imModus && (laeuft || vorbei));
    leiste.classList.toggle("vorbei", !laeuft);
    if (laeuft) {
      document.getElementById("pause-leiste-rest").textContent = pauseText(Math.ceil(pauseRest() / 1000));
    } else {
      document.getElementById("pause-leiste-rest").textContent = txt("pause.vorbei");
    }

    if (imModus) {
      modusZustandAnzeigen(false);
    }

    // Gibt es nichts mehr zu zeigen, hört der Takt auf
    if (!laeuft && !vorbei && pauseTakt !== null) {
      clearInterval(pauseTakt);
      pauseTakt = null;
    }
  }

  // Der Ton am Ende der Pause wird von der App selbst erzeugt, es gibt keine Sounddatei.
  // Browser erlauben Ton erst nach einem Tippen. Deshalb wird er beim Start der Pause vorbereitet.
  let tonKontext = null;

  function tonVorbereiten() {
    try {
      const Klasse = window.AudioContext || window.webkitAudioContext;
      if (!Klasse) {
        return;
      }
      if (!tonKontext) {
        tonKontext = new Klasse();
      }
      if (tonKontext.state === "suspended") {
        tonKontext.resume();
      }
    } catch (fehler) {
      // Ohne Ton läuft der Timer normal weiter
    }
  }

  // Drei kurze Pieptöne
  function tonSpielen() {
    if (!tonKontext) {
      return;
    }
    try {
      for (let i = 0; i < 3; i++) {
        const start = tonKontext.currentTime + i * 0.25;
        const ton = tonKontext.createOscillator();
        const lautstaerke = tonKontext.createGain();
        ton.frequency.value = 880;
        lautstaerke.gain.setValueAtTime(0.0001, start);
        lautstaerke.gain.exponentialRampToValueAtTime(0.4, start + 0.02);
        lautstaerke.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);
        ton.connect(lautstaerke);
        lautstaerke.connect(tonKontext.destination);
        ton.start(start);
        ton.stop(start + 0.2);
      }
    } catch (fehler) {
      // Kein Ton möglich
    }
  }

  // ---------- Display anlassen ----------

  // Die Sperre, die das Display anlässt (null = keine), und ob gerade eine angefragt wird
  let wachSperre = null;
  let wachSperreAngefragt = false;

  // Das Display bleibt an, solange der Trainingsmodus zu sehen ist. Sonst gibt die App es wieder frei.
  // Nicht jedes Gerät kann das (Screen Wake Lock API). Dann passiert einfach nichts.
  function wachSperreAktualisieren() {
    const soll = Boolean(laufendesTraining) && aktiveSeite === "training" && trainingAnsicht === "modus"
      && document.visibilityState === "visible";

    if (!soll) {
      if (wachSperre) {
        wachSperre.release().catch(function () {});
        wachSperre = null;
      }
      return;
    }
    if (wachSperre || wachSperreAngefragt || !("wakeLock" in navigator)) {
      return;
    }

    wachSperreAngefragt = true;
    navigator.wakeLock.request("screen").then(function (sperre) {
      wachSperreAngefragt = false;
      wachSperre = sperre;
      // Das Handy nimmt die Sperre von selbst zurück, sobald die App in den Hintergrund geht
      sperre.addEventListener("release", function () {
        if (wachSperre === sperre) {
          wachSperre = null;
        }
      });
      // Hat sich inzwischen etwas geändert, wird sie gleich wieder freigegeben
      wachSperreAktualisieren();
    }).catch(function () {
      wachSperreAngefragt = false;
    });
  }

  // ---------- Trainingsuhr ----------

  // Der Takt, der die Uhr im Trainingsmodus viermal pro Sekunde auffrischt (null = läuft nicht).
  // Wie beim Countdown der Pause: So springt die Anzeige pünktlich und lässt keine Sekunde aus.
  let uhrTakt = null;

  // Die Uhr läuft nur, solange der Trainingsmodus zu sehen ist. Sonst steht ihr Takt.
  function uhrAktualisieren() {
    const soll = Boolean(laufendesTraining) && aktiveSeite === "training" && trainingAnsicht === "modus"
      && document.visibilityState === "visible";
    if (!soll) {
      clearInterval(uhrTakt);
      uhrTakt = null;
      return;
    }
    if (uhrTakt === null) {
      uhrTakt = setInterval(uhrAnzeigen, 250);
    }
    uhrAnzeigen();
  }

  // Zeigt, wie lange das Training schon läuft: "07:42", ab einer Stunde "1:02:05".
  // Gerechnet wird immer aus der gespeicherten Startzeit. So stimmt die Uhr auch nach dem Neuladen
  // oder wenn das Handy gesperrt war. Ohne Startzeit bleibt sie leer, vor der Startzeit zeigt sie 00:00.
  function uhrAnzeigen() {
    const uhr = document.getElementById("modus-uhr");
    let start = NaN;
    if (laufendesTraining) {
      start = new Date(laufendesTraining.gestartet).getTime();
    }
    // Look Korund (seit Version 142): dieselbe Zeit noch einmal als "ZEIT 23:41" über der Übung
    const zeit = document.getElementById("modus-zeit");
    if (isNaN(start)) {
      uhr.textContent = "";
      if (zeit) {
        zeit.textContent = "";
      }
      return;
    }
    const sekunden = Math.max(0, Math.floor((Date.now() - start) / 1000));
    const stunden = Math.floor(sekunden / 3600);
    let text = String(Math.floor(sekunden / 60) % 60).padStart(2, "0") + ":" + String(sekunden % 60).padStart(2, "0");
    if (stunden > 0) {
      text = stunden + ":" + text;
    }
    uhr.textContent = text;
    if (zeit) {
      zeit.textContent = text;
      zeit.setAttribute("data-label", txt("modus.zeit"));
    }
  }

  // Beim Zurückkehren zur App: Restzeit der Pause neu berechnen, das Display wieder anlassen und die Uhr auffrischen
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
      pauseTick();
    }
    wachSperreAktualisieren();
    uhrAktualisieren();
  });

  // ---------- Diagramme ----------

  // Das kleine Diagramm-Zeichen hinter einem Übungsnamen, den man antippen kann
  const VERLAUF_ICON = '<svg class="verlauf-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17l5-5 4 3 8-9"/></svg>';

  // Eine Zahl zum Anzeigen: höchstens eine Nachkommastelle, in der Schreibweise der Sprache (1.234,5 oder 1,234.5)
  function zahlKurz(wert) {
    return (Math.round(wert * 10) / 10).toLocaleString(gebiet());
  }

  // Ein Wert, der schon in der gewählten Einheit vorliegt, mit immer genau einer Nachkommastelle, z. B. "82,0 kg"
  function einheitText(wert) {
    return wert.toLocaleString(gebiet(), { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + " " + einheit();
  }

  // Dasselbe für ein Gewicht in kg: Es wird vorher in die gewählte Einheit umgerechnet
  function kgText(kg) {
    return einheitText(ausKg(kg));
  }

  // Kurzes Datum für die Achse, z. B. "5.10." oder mit Jahr "5.10.26"
  function datumKurz(zeit, mitJahr) {
    const d = new Date(zeit);
    if (mitJahr) {
      return d.toLocaleDateString(gebiet(), { day: "numeric", month: spracheDaten().monat, year: "2-digit" });
    }
    return tagMonat(d);
  }

  // Abstand der waagerechten Hilfslinien: 1, 2 oder 5 mal eine Zehnerpotenz, sodass etwa vier Linien entstehen
  function schoenerSchritt(spanne) {
    const roh = spanne / 4;
    const potenz = Math.pow(10, Math.floor(Math.log10(roh)));
    const anteil = roh / potenz;
    let faktor = 10;
    if (anteil <= 1) {
      faktor = 1;
    } else if (anteil <= 2) {
      faktor = 2;
    } else if (anteil <= 5) {
      faktor = 5;
    }
    return faktor * potenz;
  }

  // Zeichnet ein Liniendiagramm als SVG in den Behälter.
  // reihen: Liste von Linien, gezeichnet in dieser Reihenfolge. Jede hat
  //   punkte: [{ zeit, wert }] (zeit in Millisekunden, die älteste zuerst),
  //   art: "haupt" (kräftig, grün) oder "neben" (dünn, grau),
  //   mitPunkten: true zeichnet zu jedem Wert einen Punkt,
  //   tasten: true bei der Linie, deren Punkte man antippen kann.
  // ablesen(punkt) liefert den Text für den angetippten Punkt.
  // von und bis legen die Zeitachse fest. Ohne Angabe reicht sie vom ersten bis zum letzten Punkt.
  // Mit hinweis ist am Anfang kein Punkt gewählt: Über dem Diagramm steht dann dieser Text, bis man einen antippt.
  function diagrammZeichnen(behaelter, reihen, ablesen, von, bis, hinweis) {
    // Maße der Zeichenfläche in SVG-Einheiten und die Ränder für die Beschriftung
    const BREITE = 340;
    const HOEHE = 190;
    const LINKS = 46;
    const RECHTS = 12;
    const OBEN = 10;
    const UNTEN = 24;

    let min = Infinity;
    let max = -Infinity;
    let erste = Infinity;
    let letzte = -Infinity;
    let taster = reihen[0];
    for (let r = 0; r < reihen.length; r++) {
      if (reihen[r].tasten) {
        taster = reihen[r];
      }
      for (let i = 0; i < reihen[r].punkte.length; i++) {
        const p = reihen[r].punkte[i];
        min = Math.min(min, p.wert);
        max = Math.max(max, p.wert);
        erste = Math.min(erste, p.zeit);
        letzte = Math.max(letzte, p.zeit);
      }
    }
    if (von === undefined) {
      von = erste;
      bis = letzte;
    }

    // Sind alle Werte gleich, bekommt die Achse trotzdem etwas Luft nach oben und unten
    if (max === min) {
      const luft = Math.max(Math.abs(max) * 0.05, 1);
      min = Math.max(0, min - luft);
      max = max + luft;
    }
    const schritt = schoenerSchritt(max - min);
    const unten = Math.floor(min / schritt) * schritt;
    const oben = Math.ceil(max / schritt) * schritt;

    // Rechnet eine Zeit in die waagerechte und einen Wert in die senkrechte Position um
    function x(zeit) {
      if (bis === von) {
        return LINKS + (BREITE - LINKS - RECHTS) / 2;
      }
      return LINKS + (zeit - von) / (bis - von) * (BREITE - LINKS - RECHTS);
    }
    function y(wert) {
      return OBEN + (oben - wert) / (oben - unten) * (HOEHE - OBEN - UNTEN);
    }

    let svg = '<svg class="diagramm" viewBox="0 0 ' + BREITE + ' ' + HOEHE + '" role="img" aria-label="' + txt("diagramm") + '">';

    // Waagerechte Hilfslinien mit ihren Werten
    for (let i = 0; unten + i * schritt <= oben + schritt / 1000; i++) {
      const wert = unten + i * schritt;
      const hoehe = y(wert).toFixed(1);
      svg += '<line class="gitter" x1="' + LINKS + '" x2="' + (BREITE - RECHTS) + '" y1="' + hoehe + '" y2="' + hoehe + '"/>';
      svg += '<text x="' + (LINKS - 6) + '" y="' + (y(wert) + 4).toFixed(1) + '" text-anchor="end">' + zahlKurz(wert) + '</text>';
    }

    // Datum am linken und rechten Ende der Zeitachse
    const mitJahr = bis - von > 300 * 86400000;
    if (bis === von) {
      svg += '<text x="' + x(von) + '" y="' + (HOEHE - 6) + '" text-anchor="middle">' + datumKurz(von, true) + '</text>';
    } else {
      svg += '<text x="' + LINKS + '" y="' + (HOEHE - 6) + '">' + datumKurz(von, mitJahr) + '</text>';
      svg += '<text x="' + (BREITE - RECHTS) + '" y="' + (HOEHE - 6) + '" text-anchor="end">' + datumKurz(bis, mitJahr) + '</text>';
    }

    svg += '<line class="faden" y1="' + OBEN + '" y2="' + (HOEHE - UNTEN) + '"/>';

    for (let r = 0; r < reihen.length; r++) {
      const punkte = reihen[r].punkte;
      if (punkte.length > 1) {
        let weg = "";
        for (let i = 0; i < punkte.length; i++) {
          weg += (i === 0 ? "M" : "L") + x(punkte[i].zeit).toFixed(1) + " " + y(punkte[i].wert).toFixed(1);
        }
        // Bei sehr vielen Werten wird die Linie feiner (Klasse "viele"), damit sie lesbar bleibt
        if (reihen[r].flaeche) {
          svg += '<path class="flaeche-' + reihen[r].art + '" d="' + weg + "L" + x(punkte[punkte.length - 1].zeit).toFixed(1) + " " + (HOEHE - UNTEN) + "L" + x(punkte[0].zeit).toFixed(1) + " " + (HOEHE - UNTEN) + 'Z"/>';
        }
        svg += '<path class="linie-' + reihen[r].art + (punkte.length > 45 ? " viele" : "") + '" d="' + weg + '"/>';
        // Eine Linie mit Beschriftung (das Ziel im Look Korund) bekommt ihren Text links darüber
        if (reihen[r].beschriftung) {
          svg += '<text class="ziel-text" x="' + LINKS + '" y="' + (y(punkte[0].wert) - 6).toFixed(1) + '">' + reihen[r].beschriftung + "</text>";
        }
      }
      // Bei sehr vielen Werten würden die Punkte die Linie verdecken. Ein einzelner Wert braucht immer einen.
      if ((reihen[r].mitPunkten && punkte.length <= 45) || punkte.length === 1) {
        let radius = 4;
        if (reihen[r].art === "neben") {
          radius = 2.5;
        }
        for (let i = 0; i < punkte.length; i++) {
          svg += '<circle class="punkt-' + reihen[r].art + '" r="' + radius + '" cx="' + x(punkte[i].zeit).toFixed(1) + '" cy="' + y(punkte[i].wert).toFixed(1) + '"/>';
        }
      }
    }
    svg += '<circle class="marke" r="6"/></svg>';

    behaelter.innerHTML = "";
    const info = element("div", "diagramm-info");
    const infoWert = element("span", "home-zahl");
    const infoDatum = element("span", "routine-info");
    info.appendChild(infoWert);
    info.appendChild(infoDatum);
    behaelter.appendChild(info);
    behaelter.insertAdjacentHTML("beforeend", svg);

    const bild = behaelter.querySelector("svg");
    const faden = bild.querySelector(".faden");
    const marke = bild.querySelector(".marke");

    // Markiert einen Punkt der antippbaren Linie und zeigt darüber Wert und Datum
    function punktZeigen(index) {
      const p = taster.punkte[index];
      bild.classList.remove("ohne-wahl");
      faden.setAttribute("x1", x(p.zeit));
      faden.setAttribute("x2", x(p.zeit));
      marke.setAttribute("cx", x(p.zeit));
      marke.setAttribute("cy", y(p.wert));
      infoWert.textContent = ablesen(p);
      let datumText = datumMitJahr(new Date(p.zeit));
      if (p.zusatz) {
        datumText += " · " + p.zusatz;
      }
      infoDatum.textContent = datumText;
    }

    // Finger oder Maus über dem Diagramm: Der Punkt, der waagerecht am nächsten liegt, wird gezeigt
    function beiZeiger(ereignis) {
      const rahmen = bild.getBoundingClientRect();
      const stelle = (ereignis.clientX - rahmen.left) / rahmen.width * BREITE;
      let naechster = 0;
      for (let i = 1; i < taster.punkte.length; i++) {
        if (Math.abs(x(taster.punkte[i].zeit) - stelle) < Math.abs(x(taster.punkte[naechster].zeit) - stelle)) {
          naechster = i;
        }
      }
      punktZeigen(naechster);
    }
    bild.onpointerdown = beiZeiger;
    bild.onpointermove = beiZeiger;

    // Am Anfang ist der neueste Wert gewählt, außer es gibt einen Hinweis
    if (hinweis) {
      bild.classList.add("ohne-wahl");
      infoDatum.textContent = hinweis;
    } else {
      punktZeigen(taster.punkte.length - 1);
    }
  }

  // Füllt einen Umschalter mit Buttons. auswahl ist eine Liste von { id, text },
  // aktiv die id des gewählten Buttons, beimWechsel(id) läuft nach dem Antippen.
  function umschalterBauen(behaelter, auswahl, aktiv, beimWechsel) {
    behaelter.innerHTML = "";
    for (let i = 0; i < auswahl.length; i++) {
      // Eine Möglichkeit hat entweder einen festen Text oder den Schlüssel eines Textes aus der texte.js
      const btn = element("button", "", auswahl[i].text || txt(auswahl[i].schluessel));
      if (auswahl[i].id === aktiv) {
        btn.classList.add("aktiv");
      }
      btn.onclick = function () {
        beimWechsel(auswahl[i].id);
      };
      behaelter.appendChild(btn);
    }
  }

  // Öffnet eines der Sheets ("verlauf-sheet", "gewicht-sheet", "uebungen-sheet", "tag-sheet", "satz-sheet" oder "muster-sheet")
  function zusatzSheetOeffnen(id) {
    document.getElementById(id).classList.add("offen");
    document.getElementById("zusatz-hintergrund").classList.add("offen");
    document.body.classList.add("sheet-offen");
  }

  function zusatzSheetsSchliessen() {
    document.getElementById("uebungen-sheet").classList.remove("offen");
    document.getElementById("verlauf-sheet").classList.remove("offen");
    document.getElementById("gewicht-sheet").classList.remove("offen");
    document.getElementById("tag-sheet").classList.remove("offen");
    document.getElementById("satz-sheet").classList.remove("offen");
    document.getElementById("kraft-sheet").classList.remove("offen");
    document.getElementById("erklaerung-sheet").classList.remove("offen");
    document.getElementById("muster-sheet").classList.remove("offen");
    document.getElementById("teilen-sheet").classList.remove("offen");
    document.getElementById("zeit-sheet").classList.remove("offen");
    document.getElementById("status-sheet").classList.remove("offen");
    document.getElementById("zusatztraining-sheet").classList.remove("offen");
    document.getElementById("zusatz-hintergrund").classList.remove("offen");
    // Liegt darunter noch die Übungsauswahl (die Erklärung wurde von dort geöffnet), bleibt die Seite gesperrt
    if (!document.getElementById("sheet").classList.contains("offen")) {
      document.body.classList.remove("sheet-offen");
    }
  }

  // ---------- Wischgesten ----------

  // Läuft gerade etwas, bei dem keine Wischgeste gelten soll? Das sind die Einführung und die Rückfragen.
  function wischenGesperrt() {
    return Boolean(tourSchritte)
      || document.getElementById("frage-hintergrund").classList.contains("offen")
      || document.getElementById("dialog-hintergrund").classList.contains("offen");
  }

  // Die gemeinsame Erkennung für alle Wischgesten (seit Version 100). element ist die Fläche, auf der der Finger aufsetzt.
  // Die Funktion erkennt Richtung, Weg und Tempo. Was dabei passieren soll, sagen ihr die optionen:
  //   achse                                  "y" für hoch und runter, "x" für seitlich
  //   beginnt(ereignis)                      freiwillig. false: An dieser Stelle startet keine Geste.
  //   will(weg)                              freiwillig. false: In diese Richtung gilt die Geste nicht, der Browser scrollt weiter.
  //   bewegt(weg)                            Der Finger ist weg Pixel vom Start entfernt (über 0: nach unten oder rechts).
  //   losgelassen(weg, tempo, abgebrochen)   tempo in Pixeln pro Millisekunde, abgebrochen: Das Gerät hat die Berührung beendet.
  function wischen(element, optionen) {
    // Der Finger auf der Fläche: wo er aufgesetzt hat, ob die Geste gilt (null = noch offen), wie weit er ist
    // und die letzten Messpunkte für das Tempo
    let finger = null;
    // Wann der letzte Wisch zu Ende war. Kurz danach kommt vom Browser manchmal noch ein Klick: Der darf nichts antippen.
    let gewischtUm = 0;

    // Wie weit der Finger vom Start entfernt ist: in der Richtung der Geste (haupt) und quer dazu
    function abstand(ereignis) {
      const x = ereignis.touches[0].clientX - finger.x;
      const y = ereignis.touches[0].clientY - finger.y;
      if (optionen.achse === "x") {
        return { haupt: x, quer: y };
      }
      return { haupt: y, quer: x };
    }

    element.addEventListener("touchstart", function (ereignis) {
      finger = null;
      if (ereignis.touches.length !== 1 || wischenGesperrt()) {
        return;
      }
      if (optionen.beginnt && optionen.beginnt(ereignis) === false) {
        return;
      }
      // Der erste Messpunkt ist das Aufsetzen, so zählt bei einem kurzen Wisch der ganze Weg für das Tempo
      finger = { x: ereignis.touches[0].clientX, y: ereignis.touches[0].clientY, gilt: null, weg: 0, punkte: [{ zeit: ereignis.timeStamp, weg: 0 }] };
    }, { passive: true });

    // Nicht "passive": Nur so kann die Geste dem Browser das Scrollen abnehmen (preventDefault)
    element.addEventListener("touchmove", function (ereignis) {
      if (!finger || finger.gilt === false) {
        return;
      }
      const a = abstand(ereignis);
      if (finger.gilt === null) {
        // Noch zu kurz für eine Entscheidung: Es kann auch ein Tipp sein
        if (Math.abs(a.haupt) < WISCH_SPIEL_PX && Math.abs(a.quer) < WISCH_SPIEL_PX) {
          return;
        }
        finger.gilt = Math.abs(a.haupt) > Math.abs(a.quer) && (!optionen.will || optionen.will(a.haupt) !== false);
        if (!finger.gilt) {
          return;
        }
      }
      if (ereignis.cancelable) {
        ereignis.preventDefault();
      }
      finger.weg = a.haupt;
      // Nur die Messpunkte der letzten Augenblicke bleiben, aus ihnen ergibt sich das Tempo beim Loslassen
      const jetzt = ereignis.timeStamp;
      finger.punkte.push({ zeit: jetzt, weg: a.haupt });
      while (finger.punkte.length > 1 && jetzt - finger.punkte[0].zeit > WISCH_TEMPO_FENSTER_MS) {
        finger.punkte.shift();
      }
      optionen.bewegt(a.haupt);
    }, { passive: false });

    function loslassen(ereignis, abgebrochen) {
      if (!finger || !finger.gilt) {
        finger = null;
        return;
      }
      const weg = finger.weg;
      // Das Tempo zählt ab dem ältesten Messpunkt der letzten Augenblicke.
      // Hat der Finger vor dem Loslassen stillgestanden, gibt es keinen so frischen Punkt, und das Tempo ist 0.
      const jetzt = ereignis.timeStamp;
      while (finger.punkte.length > 1 && jetzt - finger.punkte[0].zeit > WISCH_TEMPO_FENSTER_MS) {
        finger.punkte.shift();
      }
      let tempo = 0;
      const erster = finger.punkte[0];
      if (jetzt - erster.zeit <= WISCH_TEMPO_FENSTER_MS && jetzt > erster.zeit) {
        tempo = (weg - erster.weg) / (jetzt - erster.zeit);
      }
      finger = null;
      gewischtUm = Date.now();
      optionen.losgelassen(weg, tempo, abgebrochen);
    }

    element.addEventListener("touchend", function (ereignis) {
      loslassen(ereignis, false);
    });
    element.addEventListener("touchcancel", function (ereignis) {
      loslassen(ereignis, true);
    });

    // Nur ein Klick vom Browser wird geschluckt (isTrusted), kein Klick, den die App selbst auslöst
    element.addEventListener("click", function (ereignis) {
      if (ereignis.isTrusted && Date.now() - gewischtUm < WISCH_KLICK_SPERRE_MS) {
        ereignis.stopPropagation();
        ereignis.preventDefault();
      }
    }, true);
  }

  // Sheets mit Eingaben: Sie lassen sich nur am Griff und an der Kopfzeile ziehen, damit beim Tippen und Drehen
  // nichts aus Versehen zugeht. Alle anderen Sheets lassen sich auch im Inhalt ziehen, wenn er ganz oben steht.
  const SHEETS_NUR_KOPF = ["satz-sheet", "selbst-sheet", "gewicht-sheet"];

  // Der dunkle Hintergrund, der mit diesem Sheet verschwindet. Liegt darunter noch ein Sheet, bleibt er (null).
  function sheetHintergrund(sheet) {
    if (sheet.id === "sheet" || sheet.id === "selbst-sheet") {
      const beide = document.getElementById("sheet").classList.contains("offen")
        && document.getElementById("selbst-sheet").classList.contains("offen");
      if (beide) {
        return null;
      }
      return document.getElementById("sheet-hintergrund");
    }
    if (document.querySelectorAll(".zusatz-sheet.offen:not(#selbst-sheet)").length > 1) {
      return null;
    }
    return document.getElementById("zusatz-hintergrund");
  }

  // Macht ein Sheet wischbar: Nach unten ziehen schließt es. Es folgt dabei dem Finger, der Hintergrund wird heller.
  // Geschlossen wird über das ✕ des Sheets, so läuft derselbe Weg wie beim Antippen.
  function sheetWischbar(sheet) {
    const nurKopf = SHEETS_NUR_KOPF.indexOf(sheet.id) !== -1;
    // Hat der Finger im Inhalt aufgesetzt (und nicht am Griff oder an der Kopfzeile)?
    let imInhalt = false;
    let hoehe = 0;
    let hintergrund = null;

    // Nimmt die Werte des Ziehens wieder weg. Danach gelten die Regeln der style.css,
    // das Sheet gleitet von dort, wo es gerade steht, zurück oder hinaus.
    function freigeben() {
      sheet.style.transition = "";
      sheet.style.transform = "";
      if (hintergrund) {
        hintergrund.style.transition = "";
        hintergrund.style.opacity = "";
      }
    }

    wischen(sheet, {
      achse: "y",
      beginnt: function (ereignis) {
        if (!sheet.classList.contains("offen")) {
          return false;
        }
        const ziel = ereignis.target;
        imInhalt = !ziel.closest(".sheet-griff, .sheet-kopf");
        if (imInhalt) {
          // Eingabefelder, das Rad und das Diagramm brauchen den Finger selbst
          if (nurKopf || ziel.closest("input, select, textarea, .rad, .diagramm")) {
            return false;
          }
          // Ist die Liste schon ein Stück gescrollt, scrollt der Finger sie weiter
          for (let e = ziel; e && e !== sheet; e = e.parentElement) {
            if (e.scrollTop > 0) {
              return false;
            }
          }
        }
        hoehe = sheet.getBoundingClientRect().height;
        hintergrund = sheetHintergrund(sheet);
      },
      // Im Inhalt gilt nur der Wisch nach unten, nach oben scrollt die Liste
      will: function (weg) {
        return !imInhalt || weg > 0;
      },
      bewegt: function (weg) {
        // Nach oben geht das Sheet nicht mit, sonst wäre unter ihm die Seite zu sehen
        const tief = Math.max(0, weg);
        sheet.style.transition = "none";
        sheet.style.transform = "translateY(" + tief + "px)";
        if (hintergrund) {
          hintergrund.style.transition = "none";
          hintergrund.style.opacity = String(Math.max(0, 1 - tief / hoehe));
        }
      },
      losgelassen: function (weg, tempo, abgebrochen) {
        const weit = weg >= Math.min(WISCH_SHEET_WEG_PX, hoehe * WISCH_SHEET_ANTEIL);
        const schnell = weg >= WISCH_SCHNELL_WEG_PX && tempo >= WISCH_SCHNELL_TEMPO;
        // Wer zum Schluss schnell wieder nach oben wischt, will das Sheet behalten
        const zurueck = tempo <= -WISCH_SCHNELL_TEMPO;
        freigeben();
        if (!abgebrochen && !zurueck && (weit || schnell)) {
          sheet.querySelector('.sheet-kopf button[data-t-aria="schliessen"]').click();
        }
      }
    });
  }

  // Alle Sheets mit Griff lassen sich nach unten wischen. Die Einstellungen füllen den ganzen Bildschirm und gehören nicht dazu.
  function sheetsWischbarMachen() {
    sheetWischbar(document.getElementById("sheet"));
    const sheets = document.querySelectorAll(".zusatz-sheet");
    for (let i = 0; i < sheets.length; i++) {
      sheetWischbar(sheets[i]);
    }
  }

  // Trainingsmodus (seit Version 134): Auf der Übungskarte nach links wischen zeigt die nächste Übung, nach rechts
  // die vorherige. Es passiert dasselbe wie bei den Pfeilen ‹ › (uebungWechseln), auch erledigte Übungen kommen dran.
  // Die Eingabefelder liegen nicht auf der Karte, dort beginnt keine Geste. Die Karte folgt dem Finger,
  // wo es nicht weitergeht (erste oder letzte Übung), nur zu einem Drittel.
  function modusWischbarMachen() {
    const karte = document.querySelector("#ansicht-modus .modus-karte");

    // Gibt es in dieser Richtung eine Übung? Nach links (weg < 0) die nächste, nach rechts die vorherige.
    function moeglich(weg) {
      const t = laufendesTraining;
      const neu = t.index + (weg < 0 ? 1 : -1);
      return neu >= 0 && neu < t.uebungen.length;
    }

    wischen(karte, {
      achse: "x",
      beginnt: function (ereignis) {
        const x = ereignis.touches[0].clientX;
        if (!laufendesTraining || x < WISCH_RAND_PX || x > window.innerWidth - WISCH_RAND_PX) {
          return false;
        }
      },
      bewegt: function (weg) {
        karte.style.transition = "none";
        karte.style.transform = "translateX(" + (moeglich(weg) ? weg : weg / 3) + "px)";
      },
      losgelassen: function (weg, tempo, abgebrochen) {
        // Danach gilt wieder die style.css: Die Karte gleitet von dort, wo sie steht, zurück
        karte.style.transition = "";
        karte.style.transform = "";
        const weit = Math.abs(weg) >= WISCH_SEITE_PX;
        const schnell = Math.abs(weg) >= WISCH_SCHNELL_WEG_PX && Math.abs(tempo) >= WISCH_SCHNELL_TEMPO && tempo * weg > 0;
        if (!abgebrochen && (weit || schnell) && moeglich(weg)) {
          uebungWechseln(weg < 0 ? 1 : -1);
        }
      }
    });
  }

  // Training-Tab (seit Version 136): In der Übersicht wechselt ein seitlicher Wisch den Reiter wie ein Tipp auf den
  // Umschalter "Pläne | Übungen": nach links zu "Übungen", nach rechts zu "Pläne". Steht in "Übungen" der Zurück-Pfeil
  // (Muskelgruppe, Eigene, Suche), geht es nach rechts stattdessen zurück wie mit dem Pfeil ←.
  // Der Wisch tippt den Knopf selbst an, so läuft derselbe Weg wie beim Antippen. Die Fläche folgt dem Finger nicht.
  function trainingWischbarMachen() {
    const flaeche = document.getElementById("ansicht-uebersicht");

    // Der Knopf, den ein Wisch nach links (weg < 0) oder rechts antippt. null: In dieser Richtung gibt es nichts.
    function knopf(weg) {
      const zurueck = document.getElementById("bib-zurueck");
      if (trainingReiter === "uebungen" && weg > 0 && !zurueck.classList.contains("versteckt")) {
        return zurueck;
      }
      const ziel = weg < 0 ? "uebungen" : "plaene";
      if (ziel === trainingReiter) {
        return null;
      }
      for (let i = 0; i < TRAINING_REITER.length; i++) {
        if (TRAINING_REITER[i].id === ziel) {
          return document.getElementById("training-reiter").children[i];
        }
      }
      return null;
    }

    wischen(flaeche, {
      achse: "x",
      // Keine Geste am Rand (dort wischt Safari zurück), über einem offenen Sheet, im Suchfeld und bei offener Tastatur
      beginnt: function (ereignis) {
        const x = ereignis.touches[0].clientX;
        const fokus = document.activeElement;
        if (trainingAnsicht !== "uebersicht" || document.body.classList.contains("sheet-offen")
          || x < WISCH_RAND_PX || x > window.innerWidth - WISCH_RAND_PX
          || ereignis.target.closest("input, textarea") || (fokus && fokus.matches("input, textarea"))) {
          return false;
        }
      },
      will: function (weg) {
        return knopf(weg) !== null;
      },
      bewegt: function () {},
      losgelassen: function (weg, tempo, abgebrochen) {
        const weit = Math.abs(weg) >= WISCH_SEITE_PX;
        const schnell = Math.abs(weg) >= WISCH_SCHNELL_WEG_PX && Math.abs(tempo) >= WISCH_SCHNELL_TEMPO && tempo * weg > 0;
        const ziel = knopf(weg);
        if (!abgebrochen && (weit || schnell) && ziel) {
          ziel.click();
        }
      }
    });
  }

  // Tab-Leiste (seit Version 140): Ein seitlicher Wisch auf der Leiste unten wechselt den Tab wie ein Tipp auf ihn:
  // nach links zum Tab rechts daneben, nach rechts zum Tab links daneben. Am Ende der Reihe passiert nichts.
  // Die Geste beginnt nur auf einem Tab-Knopf, nicht im Streifen darunter: Dort wischt iOS zwischen den Apps.
  // Ist der Wisch weit genug, zeigt der Tab, zu dem es geht, schon den hellen Kreis (Klasse wisch-ziel).
  function navWischbarMachen() {
    const leiste = document.getElementById("navigation");

    // Der Tab-Knopf, den ein Wisch nach links (weg < 0) oder rechts antippt. null: In dieser Richtung gibt es keinen.
    // Ausgeblendete Tabs (der Gym-Tab, solange SHOW_PLATZHALTER aus ist) zählen nicht mit.
    function knopf(weg) {
      const knoepfe = Array.prototype.filter.call(leiste.querySelectorAll(".nav-btn"), function (k) {
        return !k.classList.contains("versteckt");
      });
      const i = knoepfe.indexOf(document.getElementById("nav-" + aktiveSeite)) + (weg < 0 ? 1 : -1);
      return knoepfe[i] || null;
    }

    // Setzt den hellen Kreis an den Ziel-Tab, null nimmt ihn weg
    function vorschau(ziel) {
      const knoepfe = leiste.querySelectorAll(".nav-btn");
      for (let i = 0; i < knoepfe.length; i++) {
        knoepfe[i].classList.toggle("wisch-ziel", knoepfe[i] === ziel);
      }
    }

    wischen(leiste, {
      achse: "x",
      // Keine Geste neben den Knöpfen, am Rand (dort wischt Safari zurück), in der Trainingsansicht,
      // über einem offenen Sheet und bei offener Tastatur. Unter einem Knopf beginnt auch dann nichts, wenn der Browser
      // die Berührung dem nächsten Knopf zuschreibt (das tut Chrome), deshalb zählt auch die Höhe des Fingers.
      beginnt: function (ereignis) {
        const x = ereignis.touches[0].clientX;
        const fokus = document.activeElement;
        const tab = ereignis.target.closest(".nav-btn");
        if (!tab || ereignis.touches[0].clientY > tab.getBoundingClientRect().bottom
          || (aktiveSeite === "training" && trainingAnsicht === "modus")
          || document.body.classList.contains("sheet-offen")
          || x < WISCH_RAND_PX || x > window.innerWidth - WISCH_RAND_PX
          || (fokus && fokus.matches("input, select, textarea"))) {
          return false;
        }
      },
      will: function (weg) {
        return knopf(weg) !== null;
      },
      bewegt: function (weg) {
        vorschau(Math.abs(weg) >= WISCH_SEITE_PX ? knopf(weg) : null);
      },
      losgelassen: function (weg, tempo, abgebrochen) {
        vorschau(null);
        const weit = Math.abs(weg) >= WISCH_SEITE_PX;
        const schnell = Math.abs(weg) >= WISCH_SCHNELL_WEG_PX && Math.abs(tempo) >= WISCH_SCHNELL_TEMPO && tempo * weg > 0;
        const ziel = knopf(weg);
        if (!abgebrochen && (weit || schnell) && ziel) {
          ziel.click();
        }
      }
    });
  }

  // ---------- Erklärungen ----------

  // Die ID, unter der die Erklärung einer Übung in der erklaerungen.js steht. Eine alte ID führt über ALTE_IDS
  // zur heutigen Übung. Ohne ID zählt der Name (auch Alias oder früherer Name). Gibt es keine Erklärung
  // (z. B. bei eigenen Übungen), ist das Ergebnis "".
  function erklaerungId(id, name) {
    let eid = id || "";
    if (eid && ALTE_IDS[eid]) {
      eid = ALTE_IDS[eid];
    }
    if (!eid && name) {
      eid = ID_NACH_NAME[String(name).toLowerCase()] || "";
    }
    if (eid && Object.prototype.hasOwnProperty.call(ERKLAERUNGEN, eid)) {
      return eid;
    }
    return "";
  }

  // Eine schmale Box unter den Schritten: "Häufiger Fehler", "Sicherheit" oder "Tipp"
  function erklaerungBox(art, text) {
    const box = element("div", "erklaerung-box " + art);
    box.appendChild(element("div", "erklaerung-box-titel", txt("erklaerung." + art)));
    box.appendChild(element("p", "erklaerung-box-text", text));
    return box;
  }

  // Die Erklärung einer Übung, die (noch) keine hat: Name, Bild und ein Hinweis. So öffnet sie nur die Bibliothek.
  function erklaerungOhneOeffnen(id, name) {
    document.getElementById("erklaerung-titel").textContent = anzeigeName(name, id);

    const inhalt = document.getElementById("erklaerung-inhalt");
    inhalt.innerHTML = "";
    inhalt.scrollTop = 0;
    const bild = element("div", "erklaerung-bild");
    bild.setAttribute("aria-hidden", "true");
    bild.innerHTML = uebungsBild(id);
    inhalt.appendChild(bild);

    // Für eine eigene Übung wird es nie eine Erklärung geben, das sagt der Hinweis auch so
    let hinweis = txt("erklaerung.kommtNoch");
    if (eigeneUebungFinden(id)) {
      hinweis = txt("erklaerung.eigene");
    }
    inhalt.appendChild(element("p", "erklaerung-hinweis", hinweis));
    sheetTeil("suche").blur();
    zusatzSheetOeffnen("erklaerung-sheet");
  }

  // Öffnet die Erklärung: Name oben, darunter das Bild, die Schritte und die schmalen Boxen.
  // Gibt es keine, passiert nichts. Nur mit auchOhne (die Bibliothek) öffnet sich das Sheet mit einem Hinweis.
  function erklaerungOeffnen(id, name, auchOhne) {
    const eid = erklaerungId(id, name);
    if (eid === "") {
      if (auchOhne) {
        erklaerungOhneOeffnen(id, name);
      }
      return;
    }
    const daten = ERKLAERUNGEN[eid];
    document.getElementById("erklaerung-titel").textContent = anzeigeName(name, eid);

    const inhalt = document.getElementById("erklaerung-inhalt");
    inhalt.innerHTML = "";
    inhalt.scrollTop = 0;
    const bild = element("div", "erklaerung-bild");
    bild.setAttribute("aria-hidden", "true");
    bild.innerHTML = uebungsBild(eid);
    inhalt.appendChild(bild);

    const schritte = daten.schritte[sprache] || daten.schritte.de;
    for (let i = 0; i < schritte.length; i++) {
      const schritt = element("div", "erklaerung-schritt");
      schritt.appendChild(element("div", "erklaerung-nummer", String(i + 1)));
      const text = element("div", "erklaerung-schritt-text");
      text.appendChild(element("div", "erklaerung-schritt-titel", schritte[i].titel));
      text.appendChild(element("p", "erklaerung-schritt-satz", schritte[i].text));
      schritt.appendChild(text);
      inhalt.appendChild(schritt);
    }

    const arten = ["fehler", "sicherheit", "tipp"];
    for (let i = 0; i < arten.length; i++) {
      const eintrag = daten[arten[i]];
      if (eintrag) {
        inhalt.appendChild(erklaerungBox(arten[i], eintrag[sprache] || eintrag.de));
      }
    }
    // Aus der Suche der Übungsauswahl geöffnet: Die Tastatur geht zu, der Suchtext bleibt stehen
    sheetTeil("suche").blur();
    zusatzSheetOeffnen("erklaerung-sheet");
  }

  // Im Trainingsmodus: die Erklärung der Übung, die gerade dran ist
  function erklaerungImModus() {
    if (!laufendesTraining) {
      return;
    }
    const u = laufendesTraining.uebungen[laufendesTraining.index];
    erklaerungOeffnen(u.uebungId, u.name);
  }

  // Im Verlauf: die Erklärung der Übung, deren Verlauf offen ist
  function erklaerungImVerlauf() {
    erklaerungOeffnen(verlaufId, verlaufName);
  }

  // Schließt nur die Erklärung. Der Verlauf darunter bleibt offen, wenn sie von dort geöffnet wurde.
  // Auch die Übungsauswahl darunter bleibt offen, mit Suche und Stand (siehe zusatzSheetsSchliessen).
  function erklaerungSchliessen() {
    if (document.getElementById("verlauf-sheet").classList.contains("offen")) {
      document.getElementById("erklaerung-sheet").classList.remove("offen");
    } else {
      zusatzSheetsSchliessen();
    }
  }

  // ---------- Kraftentwicklung ----------

  // Die drei Ansichten des Verlaufs
  const VERLAUF_ARTEN = [
    { id: "1rm", text: "1RM" },
    { id: "schwer", schluessel: "gewicht" },
    { id: "volumen", schluessel: "verlauf.volumen" }
  ];

  // Die Abstände der Veränderungs-Kacheln unter dem Diagramm in Tagen (0 = seit dem ersten Eintrag),
  // jeder mit dem Schlüssel seiner Beschriftung und der Zahl darin
  const VERLAUF_ABSTAENDE = [
    { tage: 30, schluessel: "fortschritt.tage", n: 30 },
    { tage: 91, schluessel: "verlauf.monate", n: 3 },
    { tage: 182, schluessel: "verlauf.monate", n: 6 },
    { tage: 0, schluessel: "kraft.seitStart" }
  ];

  // Die Übung, deren Verlauf gerade offen ist, die gewählte Ansicht und der Zeitraum in Tagen (0 = alles)
  let verlaufName = "";
  let verlaufId = "";
  let verlaufArt = "1rm";
  let verlaufZeitraum = 0;

  // true, wenn der Verlauf von der Kraft-Karte auf Home geöffnet wurde.
  // Nur dann gilt ein Wechsel der Übung im Verlauf auch für die Karte.
  let verlaufVonKarte = false;

  // Öffnet den Verlauf einer Übung. Er startet immer mit dem geschätzten Maximalgewicht (1RM) über die ganze Zeit.
  function verlaufOeffnen(name, id, vonKarte) {
    verlaufArt = "1rm";
    verlaufZeitraum = 0;
    verlaufVonKarte = vonKarte === true;
    verlaufUebungSetzen(name, id);
    zusatzSheetOeffnen("verlauf-sheet");
  }

  // Zeigt im Verlauf eine (andere) Übung. Ansicht und Zeitraum bleiben, wie sie sind.
  function verlaufUebungSetzen(name, id) {
    verlaufName = name;
    verlaufId = id || "";
    document.getElementById("verlauf-titel").textContent = anzeigeName(name, id);
    document.getElementById("verlauf-erklaerung").classList.toggle("versteckt", erklaerungId(id, name) === "");
    verlaufAnzeigen();
  }

  // Im Trainingsmodus: der Verlauf der Übung, die gerade dran ist
  function verlaufImModus() {
    if (!laufendesTraining) {
      return;
    }
    const u = laufendesTraining.uebungen[laufendesTraining.index];
    verlaufOeffnen(u.name, u.uebungId);
  }

  // Ist das eine Übung aus dem Bereich Eigengewicht? Übungen ohne ID sind es nie.
  // Eine gelöschte eigene Übung bleibt es für ihre alten Einträge, wenn sie beim Löschen eine war.
  function istEigengewicht(id) {
    const u = UEBUNG_NACH_ID[id];
    if (u) {
      return u.bereich === "eigen";
    }
    return geloeschteEigengewicht.indexOf(id) !== -1;
  }

  // Was bei einer Übung an einem Tag zum eingetragenen Gewicht dazukommt: bei Eigengewicht-Übungen
  // das Körpergewicht des Tages, sonst 0. Ohne jede Messung ebenfalls 0.
  function koerperZusatz(id, datum) {
    if (!istEigengewicht(id)) {
      return 0;
    }
    const gemessen = koerpergewichtAm(datum);
    if (gemessen === null) {
      return 0;
    }
    return gemessen;
  }

  // Die Punkte für das Diagramm einer Übung: ein Wert pro Trainingstag, der älteste Tag zuerst.
  // art "1rm": geschätztes Maximalgewicht für eine Wiederholung nach Epley (epley1RM in der raenge.js),
  //            der beste Wert des Tages.
  // art "rang": dasselbe, aber nur aus Sätzen, die für die Ränge zählen (1 bis 10 Wdh.).
  // art "schwer": das schwerste eingetragene Gewicht des Tages.
  // art "volumen": Sätze × Wdh. × Gewicht, über den Tag zusammengezählt.
  // Bei Eigengewicht-Übungen zählt für 1RM und Volumen das Körpergewicht des Tages zum eingetragenen Gewicht dazu.
  // ohneEintragId lässt einen Eintrag aus (für die Nachfrage "Stimmt der Wert?"), eine Liste von ids lässt
  // alle diese aus (für den Bericht: der Rang ohne das gerade beendete Training).
  function verlaufPunkte(name, id, art, ohneEintragId) {
    const tage = {};

    for (let i = 0; i < eintraege.length; i++) {
      const e = eintraege[i];
      if (!hatDatum(e) || typeof e.uebung !== "string" || !gleicheUebung(e, name, id)) {
        continue;
      }
      if (ohneEintragId && (e.id === ohneEintragId || (Array.isArray(ohneEintragId) && ohneEintragId.indexOf(e.id) !== -1))) {
        continue;
      }
      const saetze = arbeitsSaetzeVon(e);
      if (saetze.length === 0) {
        continue;
      }

      const datum = new Date(e.datum);
      const koerper = koerperZusatz(id, datum);

      // Der Wert des Eintrags: der beste Satz (1RM, schwerstes Gewicht) oder die Summe aller Sätze (Volumen)
      let wert = 0;
      for (let j = 0; j < saetze.length; j++) {
        const last = saetze[j].gewicht + koerper;
        if (art === "1rm") {
          wert = Math.max(wert, epley1RM(last, saetze[j].wdh));
        } else if (art === "rang") {
          if (rangSatzGueltig(last, saetze[j].wdh)) {
            wert = Math.max(wert, epley1RM(last, saetze[j].wdh));
          }
        } else if (art === "volumen") {
          wert += saetze[j].wdh * last;
        } else {
          wert = Math.max(wert, saetze[j].gewicht);
        }
      }
      // Für die Ränge gibt es einen Tag nur, wenn er einen gültigen Satz hat
      if (art === "rang" && wert === 0) {
        continue;
      }

      const schluessel = tagSchluessel(datum);
      if (!tage[schluessel]) {
        tage[schluessel] = { zeit: new Date(datum.getFullYear(), datum.getMonth(), datum.getDate()).getTime(), wert: wert };
      } else if (art === "volumen") {
        tage[schluessel].wert += wert;
      } else {
        tage[schluessel].wert = Math.max(tage[schluessel].wert, wert);
      }
    }

    const punkte = Object.keys(tage).map(function (schluessel) {
      return tage[schluessel];
    });
    punkte.sort(function (a, b) {
      return a.zeit - b.zeit;
    });
    return punkte;
  }

  // Baut den Inhalt des Verlauf-Sheets: die Umschalter für Ansicht und Zeitraum, das Diagramm und den Hinweis
  function verlaufAnzeigen() {
    umschalterBauen(document.getElementById("verlauf-art"), VERLAUF_ARTEN, verlaufArt, function (art) {
      verlaufArt = art;
      verlaufAnzeigen();
    });
    umschalterBauen(document.getElementById("verlauf-zeitraum"), VERLAUF_ZEITRAEUME, verlaufZeitraum, function (tage) {
      verlaufZeitraum = tage;
      verlaufAnzeigen();
    });

    const diagramm = document.getElementById("verlauf-diagramm");
    const alle = verlaufPunkte(verlaufName, verlaufId, verlaufArt);

    // Mit einem Zeitraum reicht die Zeitachse von damals bis heute, gezeigt werden nur die Punkte darin
    let von;
    let bis;
    if (verlaufZeitraum > 0) {
      bis = Date.now();
      von = bis - verlaufZeitraum * 86400000;
    }
    // Gerechnet wird in kg, gezeichnet in der gewählten Einheit
    const punkte = [];
    for (let i = 0; i < alle.length; i++) {
      if (von === undefined || alle[i].zeit >= von) {
        punkte.push({ zeit: alle[i].zeit, wert: ausKg(alle[i].wert) });
      }
    }
    let hinweis = "";

    if (punkte.length === 0) {
      diagramm.innerHTML = "";
      hinweis = txt("verlauf.leer");
      if (alle.length > 0) {
        hinweis = txt("verlauf.zeitraumLeer");
      }
    } else {
      diagrammZeichnen(diagramm, [{ punkte: punkte, art: "haupt", mitPunkten: true }], function (p) {
        return kraftText(p.wert);
      }, von, bis);

      if (verlaufArt === "1rm") {
        hinweis = txt("verlauf.1rm");
      } else if (verlaufArt === "schwer") {
        hinweis = txt("verlauf.schwer");
      } else {
        hinweis = txt("verlauf.volumenText");
      }
      if (istEigengewicht(verlaufId) && verlaufArt !== "schwer") {
        if (gewichtMessungen().length > 0) {
          hinweis += " " + txt("verlauf.mitKoerper");
        } else {
          hinweis += " " + txt("verlauf.ohneKoerper");
        }
      }
      if (punkte.length === 1) {
        hinweis += " " + txt("verlauf.einPunkt");
      }
    }
    document.getElementById("verlauf-hinweis").textContent = hinweis;

    // Kacheln: die Veränderung des letzten Werts in der gewählten Ansicht. Sie gelten unabhängig vom Zeitraum
    // des Diagramms. Reichen die Einträge für einen Abstand noch nicht weit genug zurück, steht dort ein Strich.
    const kacheln = document.getElementById("verlauf-kacheln");
    kacheln.innerHTML = "";
    document.getElementById("verlauf-kacheln-titel").classList.toggle("versteckt", alle.length === 0);
    document.getElementById("verlauf-rang").innerHTML = "";
    if (alle.length === 0) {
      return;
    }
    fortschrittRangAnzeigen(document.getElementById("verlauf-rang"), verlaufName, verlaufId);
    for (let i = 0; i < VERLAUF_ABSTAENDE.length; i++) {
      const abstand = VERLAUF_ABSTAENDE[i];
      const aenderung = kraftAenderung(alle, abstand.tage);
      let text = "–";
      if (aenderung && aenderung.art === "gleich") {
        text = "→ " + kraftText(0);
      } else if (aenderung) {
        text = aenderung.text;
      }
      const kachel = element("div", "karte");
      kachel.appendChild(element("div", "home-zahl", text));
      kachel.appendChild(element("div", "kachel-titel", txt(abstand.schluessel, { n: abstand.n })));
      kacheln.appendChild(kachel);
    }
  }

  // Alle Übungen, zu denen es Einträge gibt, die zuletzt trainierte zuerst. Jede hat ihren gespeicherten Namen,
  // ihre ID ("" bei Übungen ohne ID), die im Eintrag gespeicherte Muskelgruppe (gruppe, "" ohne),
  // den Zeitpunkt des letzten Eintrags (zeit, 0 ohne Datum)
  // und die Zahl ihrer Trainingstage in den letzten KRAFT_TAGE Tagen (tageZuletzt).
  // Der Fortschritt-Tab, die Kraft-Karte auf Home und die Auswahl der Übung nutzen alle diese Liste.
  function trainierteUebungen() {
    // Jede Übung einmal: über ihre ID, Übungen ohne ID über den Namen
    const gefunden = {};
    const liste = [];
    const grenze = Date.now() - KRAFT_TAGE * 86400000;
    for (let i = 0; i < eintraege.length; i++) {
      const e = eintraege[i];
      if (!e || typeof e.uebung !== "string" || e.uebung.trim() === "") {
        continue;
      }
      let schluessel = "name:" + e.uebung.trim().toLowerCase();
      if (e.uebungId) {
        schluessel = "id:" + e.uebungId;
      }
      let zeit = 0;
      if (hatDatum(e)) {
        zeit = new Date(e.datum).getTime();
      }
      if (!gefunden[schluessel]) {
        gefunden[schluessel] = { name: e.uebung, id: e.uebungId || "", gruppe: "", zeit: zeit, tage: {}, tageZuletzt: 0 };
        liste.push(gefunden[schluessel]);
      } else if (zeit > gefunden[schluessel].zeit) {
        gefunden[schluessel].zeit = zeit;
      }
      if (gefunden[schluessel].gruppe === "" && typeof e.muskelgruppe === "string") {
        gefunden[schluessel].gruppe = e.muskelgruppe;
      }
      if (zeit >= grenze) {
        gefunden[schluessel].tage[tagSchluessel(new Date(zeit))] = true;
      }
    }
    for (let i = 0; i < liste.length; i++) {
      liste[i].tageZuletzt = Object.keys(liste[i].tage).length;
    }
    liste.sort(function (a, b) {
      return b.zeit - a.zeit;
    });
    return liste;
  }

  // ---------- Fortschritt-Tab: Kraftentwicklung nach Muskelgruppen ----------

  // Die Karte für Übungen, die zu keiner Muskelgruppe gehören: alte Einträge ohne ID und ohne gespeicherte Gruppe
  const GRUPPE_WEITERE = "weitere";

  // Die zwei Sortierungen der Übungen einer Gruppe
  const GRUPPEN_SORTIERUNGEN = [
    { id: "zuletzt", schluessel: "gruppen.zuletzt" },
    { id: "steigerung", schluessel: "gruppen.steigerung" }
  ];

  // Die geöffnete Muskelgruppe als ID ("" = die Liste der Gruppen), die Sortierung ihrer Übungen und der Zeitraum
  // der Veränderung in Tagen (0 = seit dem ersten Eintrag). Nichts davon wird gespeichert:
  // Nach dem Öffnen der App ist es wieder die Liste der Gruppen mit drei Monaten.
  let fortschrittGruppe = "";
  let fortschrittSortierung = "zuletzt";
  let fortschrittZeitraum = 91;

  // Die ID der Muskelgruppe einer Übung aus trainierteUebungen(): die Gruppe ihres Hauptmuskels.
  // Ohne bekannte ID (alte Einträge, gelöschte eigene Übungen) gilt die im Eintrag gespeicherte Gruppe,
  // sonst GRUPPE_WEITERE. So steht jede Übung in genau einer Gruppe.
  function gruppeVonTrainierter(u) {
    const bekannt = UEBUNG_NACH_ID[u.id] || UEBUNG_NACH_ID[ALTE_IDS[u.id]];
    if (bekannt) {
      return uebungGruppe(bekannt);
    }
    const name = u.gruppe.trim().toLowerCase();
    for (let i = 0; i < MUSKELGRUPPEN.length; i++) {
      if (name !== "" && (MUSKELGRUPPEN[i].de.toLowerCase() === name || MUSKELGRUPPEN[i].en.toLowerCase() === name)) {
        return MUSKELGRUPPEN[i].id;
      }
    }
    return GRUPPE_WEITERE;
  }

  // Alle Muskelgruppen mit ihren trainierten Übungen, dazu am Ende GRUPPE_WEITERE, wenn es dort Übungen gibt.
  // Jede Gruppe: { id, gruppe (aus MUSKELGRUPPEN, null bei GRUPPE_WEITERE), uebungen, zeit, beste }.
  // uebungen: die Übungen aus trainierteUebungen(), die zuletzt trainierte zuerst, jede zusätzlich mit ihren
  //           1RM-Punkten (punkte) und der Veränderung über den Zeitraum (aenderung, aus kraftAenderung).
  // zeit:     der letzte Eintrag der Gruppe. beste: der höchste Anteil ihrer Übungen, null ohne Vergleich.
  // Reihenfolge: die zuletzt trainierte Gruppe zuerst, dann GRUPPE_WEITERE, dann die Gruppen ohne Übung.
  function kraftGruppen(tage) {
    const nachId = {};
    const gruppen = [];
    for (let i = 0; i < MUSKELGRUPPEN.length; i++) {
      nachId[MUSKELGRUPPEN[i].id] = { id: MUSKELGRUPPEN[i].id, gruppe: MUSKELGRUPPEN[i], uebungen: [], zeit: 0, beste: null };
      gruppen.push(nachId[MUSKELGRUPPEN[i].id]);
    }
    const weitere = { id: GRUPPE_WEITERE, gruppe: null, uebungen: [], zeit: 0, beste: null };

    const liste = trainierteUebungen();
    for (let i = 0; i < liste.length; i++) {
      const u = liste[i];
      const ziel = nachId[gruppeVonTrainierter(u)] || weitere;
      u.punkte = verlaufPunkte(u.name, u.id, "1rm");
      u.aenderung = kraftAenderung(u.punkte, tage);
      ziel.uebungen.push(u);
      ziel.zeit = Math.max(ziel.zeit, u.zeit);
      if (u.aenderung && u.aenderung.anteil !== null && (ziel.beste === null || u.aenderung.anteil > ziel.beste)) {
        ziel.beste = u.aenderung.anteil;
      }
    }

    const trainiert = [];
    const offen = [];
    for (let i = 0; i < gruppen.length; i++) {
      if (gruppen[i].uebungen.length > 0) {
        trainiert.push(gruppen[i]);
      } else {
        offen.push(gruppen[i]);
      }
    }
    trainiert.sort(function (a, b) {
      return b.zeit - a.zeit;
    });
    if (weitere.uebungen.length > 0) {
      trainiert.push(weitere);
    }
    return trainiert.concat(offen);
  }

  // Der Name einer Gruppe aus kraftGruppen in der eingestellten Sprache
  function kraftGruppeName(g) {
    if (g.gruppe) {
      return g.gruppe[sprache];
    }
    return txt("gruppen.weitere");
  }

  // Der Umschalter für den Zeitraum der Veränderung. Er gilt für die Gruppen und für ihre Übungen.
  function fortschrittZeitraumBauen(bereich) {
    const schalter = element("div", "umschalter klein");
    umschalterBauen(schalter, VERLAUF_ZEITRAEUME, fortschrittZeitraum, function (tage) {
      fortschrittZeitraum = tage;
      fortschrittUebungenAnzeigen();
    });
    bereich.appendChild(schalter);
  }

  // Wechselt zwischen der Liste der Gruppen ("") und einer Gruppe und rollt zur Überschrift "Kraftentwicklung"
  function fortschrittGruppeZeigen(id) {
    fortschrittGruppe = id;
    fortschrittUebungenAnzeigen();
    document.getElementById("kraft-abschnitt").scrollIntoView();
  }

  // Fortschritt-Tab, Kraftentwicklung: zuerst die Muskelgruppen, nach einem Tipp die Übungen der Gruppe
  function fortschrittUebungenAnzeigen() {
    const bereich = document.getElementById("fortschritt-uebungen");
    bereich.innerHTML = "";
    const gruppen = kraftGruppen(fortschrittZeitraum);

    if (gruppen[0].uebungen.length === 0) {
      fortschrittGruppe = "";
      const leer = element("p", "leer-hinweis", txt("fortschritt.kraftLeer"));
      // Die Einführung erklärt die Kraftentwicklung an diesem Hinweis, mit Einträgen an der ersten Muskelgruppe (einfuehrung.js)
      leer.setAttribute("data-tour", "fortschritt-kraft");
      bereich.appendChild(leer);
      return;
    }

    // Die geöffnete Gruppe. Hat sie keine Übung mehr (z. B. nach dem Löschen von Einträgen), gilt wieder die Liste.
    let offen = null;
    for (let i = 0; i < gruppen.length; i++) {
      if (gruppen[i].id === fortschrittGruppe && gruppen[i].uebungen.length > 0) {
        offen = gruppen[i];
      }
    }
    if (offen) {
      gruppeUebungenAnzeigen(bereich, offen);
    } else {
      fortschrittGruppe = "";
      gruppenListeAnzeigen(bereich, gruppen);
    }
  }

  // Ebene 1: die Muskelgruppen als Zeilen. Unter dem Namen stehen die Zahl der trainierten Übungen und die beste
  // Steigerung der Gruppe im gewählten Zeitraum. Gruppen ohne Übung stehen ausgegraut am Ende.
  // Sind im Look Korund die Gruppen ohne Einträge aufgeklappt?
  let gruppenOffenAuf = false;

  function gruppenListeAnzeigen(bereich, gruppen) {
    fortschrittZeitraumBauen(bereich);
    bereich.classList.add("liste");
    let titelGesetzt = false;

    for (let i = 0; i < gruppen.length; i++) {
      const g = gruppen[i];
      const trainiert = g.uebungen.length > 0;
      if (!trainiert && !titelGesetzt) {
        bereich.appendChild(element("div", "sheet-abschnitt gruppen-offen", txt("gruppen.offen")));
        // Im Look Korund sind die Gruppen ohne Einträge eingeklappt. Dieser Knopf ist nur dort zu sehen (korund.css).
        let ohne = 0;
        for (let j = i; j < gruppen.length; j++) {
          if (gruppen[j].uebungen.length === 0) {
            ohne++;
          }
        }
        const knopf = element("button", "gruppen-offen-knopf", txt("gruppen.offenKnopf", { n: ohne }));
        knopf.setAttribute("aria-expanded", gruppenOffenAuf ? "true" : "false");
        knopf.onclick = function () {
          gruppenOffenAuf = !gruppenOffenAuf;
          fortschrittUebungenAnzeigen();
        };
        bereich.appendChild(knopf);
        if (gruppenOffenAuf) {
          bereich.classList.add("gruppen-offen-auf");
        } else {
          bereich.classList.remove("gruppen-offen-auf");
        }
        titelGesetzt = true;
      }

      const zeile = element(trainiert ? "button" : "div", "listen-zeile gruppen-zeile");
      // Die Einführung erklärt die Kraftentwicklung an der ersten Muskelgruppe (einfuehrung.js)
      if (i === 0) {
        zeile.setAttribute("data-tour", "fortschritt-kraft");
      }
      const figur = element("span", "gruppen-figur");
      figur.innerHTML = koerperSvg(g.gruppe || { id: "", ansicht: "vorn" });
      zeile.appendChild(figur);

      const text = element("span", "listen-text");
      text.appendChild(element("span", "", kraftGruppeName(g)));
      if (trainiert) {
        let steigerung = "–";
        if (g.beste !== null) {
          steigerung = txt("gruppen.in." + fortschrittZeitraum, { wert: prozentText(g.beste) });
        }
        text.appendChild(element("span", "routine-info gruppen-info", txtAnzahl("anzahl.uebungen", g.uebungen.length) + " · " + steigerung));
        // Nur im Look Korund zu sehen: die Zahl der Übungen allein, die Steigerung steht dort als Plakette rechts
        text.appendChild(element("span", "routine-info gruppen-anzahl", txtAnzahl("anzahl.uebungen", g.uebungen.length)));
      } else {
        zeile.classList.add("aus");
        text.appendChild(element("span", "routine-info", txt("gruppen.keine")));
      }
      zeile.appendChild(text);

      if (trainiert) {
        if (g.beste !== null) {
          const plakette = element("span", "gruppen-plakette " + (g.beste > 0 ? "plus" : g.beste < 0 ? "minus" : "gleich"), prozentText(g.beste));
          plakette.setAttribute("aria-hidden", "true");
          zeile.appendChild(plakette);
        }
        const pfeil = element("span", "einst-pfeil", "›");
        pfeil.setAttribute("aria-hidden", "true");
        zeile.appendChild(pfeil);
        zeile.onclick = function () {
          fortschrittGruppeZeigen(g.id);
        };
      }
      bereich.appendChild(zeile);
      // Nur im Look Korund zu sehen: unter dem Kopf der Gruppe die Karte ihrer zuletzt trainierten Übung mit Gewicht
      if (trainiert) {
        const karte = kraftKarteKorund(g);
        if (karte) {
          bereich.appendChild(karte);
        }
      }
    }
  }

  // Wie weit die Karten im Look Korund zurückschauen: 12 Wochen
  const KRAFT_KARTE_TAGE = 84;

  // Die Karte einer Gruppe im Look Korund: Figur, Name, "Bestes Gewicht · 12 Wochen", die Veränderung und die Linie
  // des schwersten Gewichts je Trainingstag. Genommen wird die zuletzt trainierte Übung der Gruppe mit Gewicht.
  // Ohne eine solche Übung (nur Eigengewicht ohne Zusatz) gibt es keine Karte. Ein Tipp öffnet den großen Verlauf.
  function kraftKarteKorund(g) {
    const grenze = Date.now() - KRAFT_KARTE_TAGE * 86400000;
    let u = null;
    let punkte = [];
    for (let i = 0; i < g.uebungen.length && !u; i++) {
      const alle = verlaufPunkte(g.uebungen[i].name, g.uebungen[i].id, "schwer");
      const neue = alle.filter(function (p) {
        return p.zeit >= grenze && p.wert > 0;
      });
      if (neue.length > 0) {
        u = g.uebungen[i];
        punkte = neue;
      }
    }
    if (!u) {
      return null;
    }
    const karte = element("button", "karte kraft-karte");
    karte.type = "button";
    const kopf = element("span", "kraft-karte-kopf");
    const figur = element("span", "kraft-karte-figur");
    figur.innerHTML = koerperSvg(g.gruppe || { id: "", ansicht: "vorn" });
    kopf.appendChild(figur);
    const text = element("span", "kraft-karte-text");
    text.appendChild(element("span", "kraft-karte-name", anzeigeName(u.name, u.id)));
    text.appendChild(element("span", "kraft-karte-info", txt("kraft.bestesGewicht")));
    kopf.appendChild(text);
    const erster = punkte[0].wert;
    const letzter = punkte[punkte.length - 1].wert;
    const unterschied = gewichtAnzeige(letzter) - gewichtAnzeige(erster);
    if (punkte.length > 1) {
      const zeichen = unterschied > 0 ? "+" : unterschied < 0 ? "−" : "±";
      kopf.appendChild(element("span", "kraft-karte-plus" + (unterschied > 0 ? " plus" : ""), zeichen + zahlText(Math.abs(Math.round(unterschied * 100) / 100)) + " " + einheit()));
    }
    karte.appendChild(kopf);
    const linie = element("span", "kraft-karte-linie");
    linie.innerHTML = kraftLinieSvg(punkte);
    karte.appendChild(linie);
    karte.setAttribute("aria-label", anzeigeName(u.name, u.id) + ", " + gewichtText(letzter));
    karte.onclick = function () {
      verlaufOeffnen(u.name, u.id);
    };
    return karte;
  }

  // Die Linie einer Karte als SVG (300 × 120 Einheiten): Fläche darunter, Punkt am Anfang und am Ende mit Wert
  function kraftLinieSvg(punkte) {
    const links = 12, rechts = 286, oben = 46, unten = 108;
    let min = Infinity, max = -Infinity;
    for (let i = 0; i < punkte.length; i++) {
      min = Math.min(min, punkte[i].wert);
      max = Math.max(max, punkte[i].wert);
    }
    const t0 = punkte[0].zeit;
    const t1 = punkte[punkte.length - 1].zeit;
    const xy = punkte.map(function (p) {
      const x = t1 > t0 ? links + (p.zeit - t0) / (t1 - t0) * (rechts - links) : rechts;
      const y = max > min ? unten - (p.wert - min) / (max - min) * (unten - oben) : (oben + unten) / 2;
      return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
    });
    const weg = xy.map(function (p, i) {
      return (i === 0 ? "M" : "L") + p[0] + " " + p[1];
    }).join(" ");
    const erstes = xy[0];
    const letztes = xy[xy.length - 1];
    let svg = '<svg viewBox="0 0 300 120" aria-hidden="true"><defs><linearGradient id="kraft-flaeche" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" class="kraft-flaeche-oben"/><stop offset="1" class="kraft-flaeche-unten"/></linearGradient></defs>';
    if (xy.length > 1) {
      svg += '<path class="kraft-flaeche" d="' + weg + " L" + letztes[0] + " 120 L" + erstes[0] + ' 120 Z"/>';
      svg += '<path class="kraft-weg" d="' + weg + '"/>';
      svg += '<circle class="kraft-anfang" cx="' + erstes[0] + '" cy="' + erstes[1] + '" r="4.5"/>';
      svg += '<text class="kraft-wert-klein" x="' + erstes[0] + '" y="' + (erstes[1] - 12) + '">' + zahlText(gewichtAnzeige(punkte[0].wert)) + "</text>";
    }
    svg += '<circle class="kraft-ende" cx="' + letztes[0] + '" cy="' + letztes[1] + '" r="6"/>';
    svg += '<text class="kraft-wert" x="' + letztes[0] + '" y="' + (letztes[1] - 16) + '" text-anchor="end">' + gewichtText(punkte[punkte.length - 1].wert) + "</text>";
    return svg + "</svg>";
  }

  // Ebene 2: die Übungen einer Gruppe mit ihrem aktuellen 1RM, der Veränderung im gewählten Zeitraum
  // und dem kleinen Diagramm dieses Zeitraums. Ein Tipp öffnet den großen Verlauf.
  function gruppeUebungenAnzeigen(bereich, g) {
    bereich.classList.remove("liste");
    const kopf = element("div", "gruppen-kopf");
    const zurueck = element("button", "text-btn", txt("zurueck.pfeil"));
    zurueck.onclick = function () {
      fortschrittGruppeZeigen("");
    };
    kopf.appendChild(zurueck);
    kopf.appendChild(element("div", "gruppen-titel", kraftGruppeName(g)));
    bereich.appendChild(kopf);

    const sortierung = element("div", "umschalter");
    sortierung.setAttribute("aria-label", txt("gruppen.sortierung"));
    umschalterBauen(sortierung, GRUPPEN_SORTIERUNGEN, fortschrittSortierung, function (art) {
      fortschrittSortierung = art;
      fortschrittUebungenAnzeigen();
    });
    bereich.appendChild(sortierung);
    fortschrittZeitraumBauen(bereich);

    // Die Übungen sind schon nach der letzten Nutzung sortiert. Für "Größte Steigerung" kommt der höchste Anteil
    // zuerst, Übungen ohne Vergleich stehen am Ende. Bei Gleichstand bleibt die zuletzt trainierte vorn.
    const uebungen = g.uebungen.slice();
    if (fortschrittSortierung === "steigerung") {
      const anteil = function (u) {
        if (u.aenderung && u.aenderung.anteil !== null) {
          return u.aenderung.anteil;
        }
        return -Infinity;
      };
      uebungen.sort(function (a, b) {
        if (anteil(a) !== anteil(b)) {
          return anteil(b) - anteil(a);
        }
        return b.zeit - a.zeit;
      });
    }

    for (let i = 0; i < uebungen.length; i++) {
      const u = uebungen[i];
      const zeile = element("button", "listen-zeile kraft-zeile");
      const text = element("span", "listen-text");
      text.appendChild(element("span", "", anzeigeName(u.name, u.id)));

      // Übungen, die nur Einträge ohne Datum oder ohne Zahlen haben, bekommen einen Strich statt der Werte
      if (u.punkte.length === 0) {
        text.appendChild(element("span", "routine-info", "–"));
      } else {
        text.appendChild(element("span", "kraft-wert", txt("gruppen.1rm", { wert: kraftText(ausKg(u.punkte[u.punkte.length - 1].wert)) })));
        let aenderung = "–";
        if (u.aenderung && u.aenderung.art === "gleich") {
          aenderung = "→ " + kraftText(0);
        } else if (u.aenderung) {
          aenderung = u.aenderung.text;
        }
        if (u.aenderung && u.aenderung.anteil !== null) {
          aenderung += " · " + prozentText(u.aenderung.anteil);
        }
        text.appendChild(element("span", "routine-info", aenderung));
      }
      zeile.appendChild(text);

      if (u.punkte.length > 0) {
        const diagramm = element("span", "zeilen-diagramm");
        miniDiagramm(diagramm, [{ punkte: miniZeitraum(u.punkte, fortschrittZeitraum), art: "haupt", mitPunkten: true, ring: true }], true);
        zeile.appendChild(diagramm);
      }
      zeile.onclick = function () {
        verlaufOeffnen(u.name, u.id);
      };
      bereich.appendChild(zeile);
    }
  }

  // ---------- Home: Karte "Kraft" ----------

  // Zeitraum in Tagen: Die Karte zeigt von sich aus die Übung, die in dieser Zeit am häufigsten trainiert wurde.
  const KRAFT_TAGE = 30;

  // So viele Tage zeigt das kleine Diagramm der Karte (91 sind drei Monate)
  const KRAFT_DIAGRAMM_TAGE = 91;

  // Bis zu so vielen Werten zeichnet das kleine Diagramm jeden als Punkt, darüber nur noch die Linie
  const MINI_PUNKTE = 20;

  // Ein Kraftwert, der schon in der gewählten Einheit vorliegt, als Text, z. B. "102,5 kg".
  // Die Karte und der große Verlauf schreiben ihre Werte beide so.
  function kraftText(wert) {
    return zahlKurz(wert) + " " + einheit();
  }

  // Die Übung, die die Karte von sich aus zeigt: die mit den meisten Trainingstagen in den letzten KRAFT_TAGE Tagen,
  // bei Gleichstand die zuletzt trainierte. liste kommt von trainierteUebungen() und ist danach schon sortiert.
  // Ohne Einträge: null.
  function kraftStandard(liste) {
    let beste = null;
    for (let i = 0; i < liste.length; i++) {
      if (beste === null || liste[i].tageZuletzt > beste.tageZuletzt) {
        beste = liste[i];
      }
    }
    return beste;
  }

  // Die von Hand gewählte Übung aus der Liste. Ohne Wahl oder wenn es zu ihr keine Einträge mehr gibt: null,
  // dann gilt wieder die Übung von kraftStandard.
  function kraftGewaehlt(liste) {
    const wahl = einstellungen.kraftUebung;
    if (!wahl) {
      return null;
    }
    for (let i = 0; i < liste.length; i++) {
      if (gleicheUebung({ uebung: liste[i].name, uebungId: liste[i].id }, wahl.name, wahl.uebungId)) {
        return liste[i];
      }
    }
    return null;
  }

  // Die Veränderung des letzten Werts gegenüber dem letzten Punkt, der mindestens so viele Tage alt ist.
  // tage 0 vergleicht mit dem ersten Eintrag ("seit Start"). Gibt es keinen so alten Punkt oder nur einen einzigen: null.
  // Verglichen werden die Werte so, wie sie angezeigt werden: in der gewählten Einheit, auf eine Nachkommastelle.
  // anteil ist dieselbe Veränderung als Anteil des alten Werts (0.08 heißt 8 % mehr), null bei einem alten Wert von 0.
  // Der Verlauf und die Muskelgruppen im Fortschritt-Tab rechnen beide hiermit.
  function kraftAenderung(punkte, tage) {
    if (punkte.length < 2) {
      return null;
    }
    let vergleich = punkte[0];
    if (tage > 0) {
      const heute = new Date();
      const grenze = new Date(heute.getFullYear(), heute.getMonth(), heute.getDate() - tage).getTime();
      vergleich = null;
      for (let i = 0; i < punkte.length; i++) {
        if (punkte[i].zeit <= grenze) {
          vergleich = punkte[i];
        }
      }
      if (vergleich === null) {
        return null;
      }
    }

    const jetzt = Math.round(ausKg(punkte[punkte.length - 1].wert) * 10) / 10;
    const damals = Math.round(ausKg(vergleich.wert) * 10) / 10;
    const unterschied = Math.round((jetzt - damals) * 10) / 10;
    let anteil = null;
    if (damals > 0) {
      anteil = unterschied / damals;
    }
    if (unterschied > 0) {
      return { text: "↑ " + kraftText(unterschied), art: "hoch", anteil: anteil };
    }
    if (unterschied < 0) {
      return { text: "↓ " + kraftText(-unterschied), art: "runter", anteil: anteil };
    }
    return { text: "–", art: "gleich", anteil: anteil };
  }

  // Die Punkte für das kleine Diagramm: die der letzten KRAFT_DIAGRAMM_TAGE Tage.
  // Liegt dort keiner, sind es alle. punkte: [{ zeit, wert }], der älteste zuerst.
  // Mit tage gilt dieser Zeitraum statt KRAFT_DIAGRAMM_TAGE, 0 heißt: alle.
  function miniZeitraum(punkte, tage) {
    if (tage === 0) {
      return punkte;
    }
    const von = Date.now() - (tage || KRAFT_DIAGRAMM_TAGE) * 86400000;
    const sichtbar = [];
    for (let i = 0; i < punkte.length; i++) {
      if (punkte[i].zeit >= von) {
        sichtbar.push({ zeit: punkte[i].zeit, wert: punkte[i].wert });
      }
    }
    if (sichtbar.length === 0) {
      return punkte;
    }
    return sichtbar;
  }

  // Hängt das kleine Diagramm einer Kachel an die Fläche, im Stil der großen Diagramme: feines Gitter,
  // dieselben Linien und Punkte, der letzte Wert mit hellem Rand, darunter das erste und das letzte Datum.
  // Zahlen am Rand hat es keine.
  // reihen wie bei diagrammZeichnen: [{ punkte, art, mitPunkten }], die Punkte mindestens einer, der älteste zuerst.
  // ring: true bei der Linie, deren letzter Wert den Rand bekommt.
  // Ein einzelner Wert steht am rechten Rand in der Mitte, ohne Linie.
  // Das SVG füllt den Platz, der in der Kachel übrig ist, und wird dafür in Breite und Höhe gezogen.
  // Die Linien behalten dabei ihre Stärke (im CSS). Punkte sind winzige Striche mit runden Enden,
  // so bleiben sie rund.
  // ohneDaten: true lässt die Datumszeile weg (in den Übungszeilen des Fortschritt-Tabs).
  function miniDiagramm(flaeche, reihen, ohneDaten) {
    let min = Infinity;
    let max = -Infinity;
    let von = Infinity;
    let bis = -Infinity;
    for (let r = 0; r < reihen.length; r++) {
      for (let i = 0; i < reihen[r].punkte.length; i++) {
        const p = reihen[r].punkte[i];
        min = Math.min(min, p.wert);
        max = Math.max(max, p.wert);
        von = Math.min(von, p.zeit);
        bis = Math.max(bis, p.zeit);
      }
    }

    // Der Wertebereich bekommt oben und unten etwas Rand. Sind alle Werte gleich (oder ist es nur einer),
    // liegt er wie im großen Diagramm um den Wert herum.
    let luft = (max - min) * 0.1;
    if (max === min) {
      luft = Math.max(Math.abs(max) * 0.05, 1);
    }
    const unten = min - luft;
    const oben = max + luft;

    function x(zeit) {
      if (bis === von) {
        return "100";
      }
      return ((zeit - von) / (bis - von) * 100).toFixed(1);
    }
    function y(wert) {
      return ((oben - wert) / (oben - unten) * 100).toFixed(1);
    }

    // Ein Punkt als SVG-Text: ein winziger Strich, den das CSS mit runden Enden so dick macht wie der Punkt breit ist
    function punkt(klasse, p) {
      return '<path class="' + klasse + '" d="M' + x(p.zeit) + " " + y(p.wert) + 'h0.01"/>';
    }

    // Drei feine waagerechte Hilfslinien: oben, in der Mitte und unten
    let svg = '<svg class="mini-diagramm" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">'
      + '<path class="gitter" d="M0 0H100M0 50H100M0 100H100"/>';
    let ring = "";
    for (let r = 0; r < reihen.length; r++) {
      const punkte = reihen[r].punkte;
      if (punkte.length > 1) {
        let weg = "";
        for (let i = 0; i < punkte.length; i++) {
          weg += (i === 0 ? "M" : "L") + x(punkte[i].zeit) + " " + y(punkte[i].wert);
        }
        // Die Fläche unter der Hauptlinie zeigt nur der Look Korund (korund.css), sonst ist sie ausgeblendet
        if (reihen[r].art === "haupt") {
          svg += '<path class="mini-flaeche" d="' + weg + "L" + x(punkte[punkte.length - 1].zeit) + " 100L" + x(punkte[0].zeit) + ' 100Z"/>';
        }
        svg += '<path class="linie-' + reihen[r].art + '" d="' + weg + '"/>';
      }
      // In der kleinen Kachel würden viele Punkte zu einem Balken verkleben, dann bleibt nur die Linie
      if (reihen[r].mitPunkten && punkte.length <= MINI_PUNKTE) {
        for (let i = 0; i < punkte.length; i++) {
          svg += punkt("punkt-" + reihen[r].art, punkte[i]);
        }
      }
      // Der letzte Wert: sein Punkt mit einem hellen Rand, gezeichnet über allem anderen
      if (reihen[r].ring) {
        const letzter = punkte[punkte.length - 1];
        ring = punkt("ring", letzter) + punkt("punkt-" + reihen[r].art, letzter);
      }
    }
    svg += ring + "</svg>";

    const rahmen = element("div", "mini-rahmen");
    rahmen.innerHTML = svg;
    flaeche.appendChild(rahmen);
    if (ohneDaten) {
      return;
    }
    // Darunter links das erste und rechts das letzte Datum. Bei einem einzigen Tag steht nur rechts eins.
    const daten = element("div", "mini-daten");
    let links = "";
    if (bis > von) {
      links = datumKurz(von);
    }
    daten.appendChild(element("span", "", links));
    daten.appendChild(element("span", "", datumKurz(bis)));
    flaeche.appendChild(daten);
  }

  // Die Kachel "Kraft" auf Home: der Name der Übung, ihr geschätztes Maximalgewicht (1RM)
  // und das kleine Diagramm der letzten drei Monate. Die Werte kommen aus verlaufPunkte, genau wie im großen Verlauf.
  function homeKraftAnzeigen() {
    const bereich = document.getElementById("home-kraft");
    bereich.innerHTML = "";

    const liste = trainierteUebungen();
    const uebung = kraftGewaehlt(liste) || kraftStandard(liste);
    if (!uebung) {
      const leer = element("div", "karte home-kachel");
      const text = element("div", "kachel-flaeche");
      text.appendChild(element("div", "kachel-name", txt("kraft.titel")));
      text.appendChild(element("div", "routine-info", txt("kraft.leer")));
      leer.appendChild(text);
      bereich.appendChild(leer);
      return;
    }

    // Die Fläche öffnet den großen Verlauf. Der Knopf öffnet nur die Auswahl der Übung.
    const flaeche = homeKachel(bereich, anzeigeName(uebung.name, uebung.id), function () {
      verlaufOeffnen(uebung.name, uebung.id, true);
    }, "wechsel", txt("kraft.waehlen"), function () {
      kraftWahlOeffnen("karte");
    });

    const punkte = verlaufPunkte(uebung.name, uebung.id, "1rm");
    if (punkte.length === 0) {
      // Die Übung hat nur Einträge ohne Datum oder ohne Zahlen
      flaeche.appendChild(element("div", "routine-info", txt("verlauf.leer")));
      return;
    }
    const letzter = punkte[punkte.length - 1];
    flaeche.appendChild(element("div", "home-zahl", kraftText(ausKg(letzter.wert))));
    kachelDelta(flaeche, miniZeitraum(punkte), true);
    miniDiagramm(flaeche, [{ punkte: miniZeitraum(punkte), art: "haupt", mitPunkten: true, ring: true }]);
  }

  // ---------- Auswahl der Übung für Karte und Verlauf ----------

  // Wofür die Auswahl gerade offen ist: "karte" (der Knopf an der Kraft-Karte) oder "verlauf" (der Titel im Verlauf)
  let kraftWahlZiel = "karte";

  // Öffnet die Liste aller Übungen mit Einträgen, die zuletzt trainierte oben.
  // Geht es um die Kraft-Karte, steht darüber "Automatisch": Dann sucht sich die Karte ihre Übung wieder selbst.
  function kraftWahlOeffnen(ziel) {
    kraftWahlZiel = ziel;
    const liste = trainierteUebungen();
    const fuerKarte = ziel === "karte" || verlaufVonKarte;

    // Welche Zeile den Haken bekommt: bei der Karte die gewählte Übung (ohne Wahl "Automatisch"),
    // sonst die Übung, die der Verlauf gerade zeigt
    let aktiv = kraftGewaehlt(liste);
    if (!fuerKarte) {
      aktiv = { name: verlaufName, id: verlaufId };
    }

    const inhalt = document.getElementById("kraft-sheet-liste");
    inhalt.innerHTML = "";
    inhalt.scrollTop = 0;

    if (fuerKarte) {
      const standard = kraftStandard(liste);
      const zeile = element("button", "listen-zeile");
      const text = element("span", "wahl-text");
      text.appendChild(element("div", "", txt("kraft.automatisch")));
      if (standard) {
        text.appendChild(element("div", "routine-info", txt("kraft.meist", { name: anzeigeName(standard.name, standard.id) })));
      }
      zeile.appendChild(text);
      if (!aktiv) {
        zeile.appendChild(element("span", "wahl-haken", "✓"));
      }
      zeile.onclick = function () {
        kraftWaehlen(null);
      };
      inhalt.appendChild(zeile);
    }

    for (let i = 0; i < liste.length; i++) {
      const u = liste[i];
      const zeile = element("button", "listen-zeile");
      zeile.appendChild(element("span", "wahl-text", anzeigeName(u.name, u.id)));
      if (u.zeit > 0) {
        zeile.appendChild(element("span", "routine-info", datumMitJahr(new Date(u.zeit))));
      }
      if (aktiv && gleicheUebung({ uebung: u.name, uebungId: u.id }, aktiv.name, aktiv.id)) {
        zeile.appendChild(element("span", "wahl-haken", "✓"));
      }
      zeile.onclick = function () {
        kraftWaehlen(u);
      };
      inhalt.appendChild(zeile);
    }

    document.getElementById("kraft-sheet").classList.add("offen");
    document.getElementById("zusatz-hintergrund").classList.add("offen");
    document.body.classList.add("sheet-offen");
  }

  // Eine Übung wurde angetippt (null = "Automatisch"). Für die Kraft-Karte wird die Wahl gespeichert.
  // Ist der Verlauf offen, zeigt er danach die neue Übung.
  function kraftWaehlen(uebung) {
    if (kraftWahlZiel === "karte" || verlaufVonKarte) {
      if (uebung) {
        einstellungen.kraftUebung = { name: uebung.name, uebungId: uebung.id };
      } else {
        delete einstellungen.kraftUebung;
      }
      einstellungenSpeichern();
      homeKraftAnzeigen();
    }

    if (kraftWahlZiel === "verlauf") {
      const neu = uebung || kraftStandard(trainierteUebungen());
      if (neu) {
        verlaufUebungSetzen(neu.name, neu.id);
      }
    }
    kraftWahlSchliessen();
  }

  // Schließt nur die Auswahl. Der Verlauf darunter bleibt offen, wenn sie von dort geöffnet wurde.
  function kraftWahlSchliessen() {
    if (document.getElementById("verlauf-sheet").classList.contains("offen")) {
      document.getElementById("kraft-sheet").classList.remove("offen");
    } else {
      zusatzSheetsSchliessen();
    }
  }

  // ---------- Körpergewicht ----------

  // Startwert des Rades, solange noch kein Gewicht eingetragen ist
  const START_KOERPERGEWICHT = 75;

  // Die Zeiträume des Diagramms in Tagen. 0 heißt: alles.
  const KG_ZEITRAEUME = [
    { id: 7, text: "1W" },
    { id: 30, text: "1M" },
    { id: 91, text: "3M" },
    { id: 182, text: "6M" },
    { id: 365, schluessel: "zeitraum.jahr" },
    { id: 0, schluessel: "zeitraum.alle" }
  ];

  // Der Verlauf einer Übung hat dieselben Zeiträume, nur ohne die einzelne Woche: Dafür wird zu selten trainiert.
  const VERLAUF_ZEITRAEUME = KG_ZEITRAEUME.slice(1);

  // Grenzen für das Körperfett in Prozent
  const FETT_MIN = 3;
  const FETT_MAX = 60;

  // Macht aus einer Eingabe einen gültigen Wert für das Körperfett: innerhalb der Grenzen,
  // eine Nachkommastelle. Leer oder keine Zahl: null (keine Angabe).
  function koerperfettLesen(wert) {
    const text = String(wert).trim().replace(",", ".");
    const zahl = Number(text);
    if (text === "" || isNaN(zahl)) {
      return null;
    }
    return Math.max(FETT_MIN, Math.min(Math.round(zahl * 10) / 10, FETT_MAX));
  }

  // Das Körperfett einer gespeicherten Messung. Fehlt es oder ist es ungültig: null.
  function koerperfettVon(m) {
    if (!m || typeof m.koerperfett !== "number" || isNaN(m.koerperfett) || m.koerperfett < FETT_MIN || m.koerperfett > FETT_MAX) {
      return null;
    }
    return m.koerperfett;
  }

  // Ein Körperfett-Wert mit immer genau einer Nachkommastelle, z. B. "15,0 %"
  function fettText(wert) {
    return wert.toLocaleString(gebiet(), { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + " %";
  }

  // Schreibt einen Wert ins Körperfett-Feld. null leert es.
  function koerperfettFeldSetzen(wert) {
    let text = "";
    if (wert !== null) {
      text = zahlText(wert);
    }
    document.getElementById("feld-koerperfett").value = text;
  }

  // Nach dem Verlassen steht im Feld, was wirklich gilt (z. B. 60 statt 99)
  function koerperfettFeldPruefen() {
    koerperfettFeldSetzen(koerperfettLesen(document.getElementById("feld-koerperfett").value));
  }

  // Speichert die Messungen, die älteste zuerst
  function gewichteSpeichern() {
    koerpergewicht.sort(function (a, b) {
      return new Date(a.datum) - new Date(b.datum);
    });
    sicherSpeichern("koerpergewicht", koerpergewicht);
  }

  // Alle Messungen mit gültigem Gewicht als { zeit, wert, fett }, die älteste zuerst.
  // fett ist das Körperfett in Prozent oder null, wenn es nicht angegeben wurde.
  // Einträge, die nur ein Körperfett haben, zählen hier nicht mit.
  function gewichtMessungen() {
    const liste = [];
    for (let i = 0; i < koerpergewicht.length; i++) {
      const m = koerpergewicht[i];
      if (hatDatum(m) && typeof m.gewicht === "number" && !isNaN(m.gewicht)) {
        liste.push({ zeit: new Date(m.datum).getTime(), wert: m.gewicht, fett: koerperfettVon(m) });
      }
    }
    liste.sort(function (a, b) {
      return a.zeit - b.zeit;
    });
    return liste;
  }

  // Alle Messungen mit Körperfett als { zeit, wert }, die älteste zuerst. wert ist hier das Körperfett.
  // Ein Gewicht braucht der Eintrag dafür nicht.
  function fettMessungen() {
    const liste = [];
    for (let i = 0; i < koerpergewicht.length; i++) {
      const m = koerpergewicht[i];
      if (hatDatum(m) && koerperfettVon(m) !== null) {
        liste.push({ zeit: new Date(m.datum).getTime(), wert: m.koerperfett });
      }
    }
    liste.sort(function (a, b) {
      return a.zeit - b.zeit;
    });
    return liste;
  }

  // Das Körpergewicht an einem Tag: die Messung dieses Tages, sonst die letzte davor.
  // Liegt der Tag vor der allerersten Messung, gilt diese. Ohne jede Messung: null.
  function koerpergewichtAm(datum) {
    const liste = gewichtMessungen();
    if (liste.length === 0) {
      return null;
    }
    let wert = liste[0].wert;
    for (let i = 0; i < liste.length; i++) {
      if (tagSchluessel(new Date(liste[i].zeit)) <= tagSchluessel(datum)) {
        wert = liste[i].wert;
      }
    }
    return wert;
  }

  // Der 7-Tage-Schnitt an einem Tag: der Mittelwert aller Messungen von diesem Tag
  // und den sechs Tagen davor. Ohne Messung in dieser Zeit: null.
  function schnittAm(liste, datum) {
    const start = new Date(datum.getFullYear(), datum.getMonth(), datum.getDate() - 6).getTime();
    const ende = new Date(datum.getFullYear(), datum.getMonth(), datum.getDate() + 1).getTime();
    let summe = 0;
    let anzahl = 0;
    for (let i = 0; i < liste.length; i++) {
      if (liste[i].zeit >= start && liste[i].zeit < ende) {
        summe += liste[i].wert;
        anzahl++;
      }
    }
    if (anzahl === 0) {
      return null;
    }
    return summe / anzahl;
  }

  // Die Veränderung im 7-Tage-Schnitt: der Schnitt am Tag der letzten Messung minus der Schnitt so viele Tage davor,
  // in der gewählten Einheit und auf eine Nachkommastelle.
  // Ohne Messung in der Woche vor dem Vergleichstag: null.
  function schnittAenderung(liste, tage) {
    if (liste.length === 0) {
      return null;
    }
    const letzter = new Date(liste[liste.length - 1].zeit);
    const frueher = new Date(letzter.getFullYear(), letzter.getMonth(), letzter.getDate() - tage);
    const damals = schnittAm(liste, frueher);
    if (damals === null) {
      return null;
    }
    return Math.round(ausKg(schnittAm(liste, letzter) - damals) * 10) / 10;
  }

  // Der Text zu einer Veränderung: Pfeil und Betrag, z. B. "↓ 0,4 kg".
  // text macht aus dem Betrag den Text mit Einheit.
  function aenderungText(unterschied, text) {
    let pfeil = "→";
    if (unterschied > 0) {
      pfeil = "↑";
    } else if (unterschied < 0) {
      pfeil = "↓";
    }
    return pfeil + " " + text(Math.abs(unterschied));
  }

  // Dasselbe für eine Veränderung des Gewichts in der gewählten Einheit
  function schnittAenderungText(unterschied) {
    return aenderungText(unterschied, einheitText);
  }

  // ---------- Messungen: einen Tag lesen und schreiben ----------

  // Ein Datum als Text für das Datumsfeld, z. B. "2026-10-09"
  function datumFeldText(datum) {
    return datum.getFullYear() + "-" + String(datum.getMonth() + 1).padStart(2, "0") + "-" + String(datum.getDate()).padStart(2, "0");
  }

  // Macht aus einem tagSchluessel (z. B. 20261009) wieder ein Datum, um Mitternacht
  function tagDatum(tag) {
    return new Date(Math.floor(tag / 10000), Math.floor(tag / 100) % 100 - 1, tag % 100);
  }

  // Was für einen Tag gespeichert ist: { gewicht, fett }. gewicht ist in kg, fett in Prozent.
  // Was fehlt, ist null. Ein Eintrag darf auch nur eins von beiden haben.
  function messungAm(tag) {
    const werte = { gewicht: null, fett: null };
    for (let i = 0; i < koerpergewicht.length; i++) {
      const m = koerpergewicht[i];
      if (hatDatum(m) && tagSchluessel(new Date(m.datum)) === tag) {
        if (typeof m.gewicht === "number" && !isNaN(m.gewicht)) {
          werte.gewicht = m.gewicht;
        }
        if (koerperfettVon(m) !== null) {
          werte.fett = m.koerperfett;
        }
      }
    }
    return werte;
  }

  // Schreibt die Werte eines Tages: Was bisher für den Tag gespeichert war, weicht einem neuen Eintrag.
  // gewicht (in kg) und fett (in Prozent) dürfen null sein. Sind beide null, ist der Tag danach leer.
  function tagSchreiben(tag, gewicht, fett) {
    koerpergewicht = koerpergewicht.filter(function (m) {
      return !hatDatum(m) || tagSchluessel(new Date(m.datum)) !== tag;
    });
    if (gewicht !== null || fett !== null) {
      // Heute gilt die Uhrzeit von jetzt, ein früherer Tag bekommt 12 Uhr mittags
      let zeit = new Date();
      if (tagSchluessel(zeit) !== tag) {
        zeit = tagDatum(tag);
        zeit.setHours(12);
      }
      const messung = { datum: zeit.toISOString() };
      if (gewicht !== null) {
        messung.gewicht = gewicht;
      }
      if (fett !== null) {
        messung.koerperfett = fett;
      }
      koerpergewicht.push(messung);
    }
    gewichteSpeichern();

    homeGewichtAnzeigen();
    koerpergewichtAnzeigen();
    if (aktiveSeite === "profil") {
      profilAnzeigen();
    }
  }

  // Löscht den Wert eines Tages: bei "kg" das Gewicht, bei "fett" das Körperfett. Der andere Wert bleibt.
  function messwertLoeschen(kennung, tag) {
    const alt = messungAm(tag);
    if (kennung === "fett") {
      tagSchreiben(tag, alt.gewicht, null);
    } else {
      tagSchreiben(tag, null, alt.fett);
    }
  }

  // ---------- Messungen: das Sheet zum Eintragen ----------

  // Was das Sheet gerade einträgt. art ist "kg" (Gewicht, dazu freiwillig das Körperfett) oder "fett"
  // (nur das Körperfett). aendern ist der Tag, dessen Wert über "Ändern" geöffnet wurde, sonst null.
  let messSheet = { art: "kg", aendern: null };

  // Der Tag aus dem Datumsfeld als tagSchluessel. Leer, unvollständig oder in der Zukunft: null.
  function messTagLesen() {
    const teile = document.getElementById("feld-messdatum").value.split("-");
    if (teile.length !== 3 || Number(teile[0]) < 1900) {
      return null;
    }
    const datum = new Date(Number(teile[0]), Number(teile[1]) - 1, Number(teile[2]));
    if (isNaN(datum) || tagSchluessel(datum) > tagSchluessel(new Date())) {
      return null;
    }
    return tagSchluessel(datum);
  }

  // Stellt Rad und Körperfett-Feld auf den Tag im Datumsfeld ein.
  // Beim Öffnen steht das Rad auf dem Gewicht des Tages, sonst auf dem letzten davor.
  // Nach einem Wechsel des Datums bewegt sich das Rad nur, wenn der neue Tag schon ein Gewicht hat.
  function messSheetFuellen(beimOeffnen) {
    const tag = messTagLesen();
    if (tag === null) {
      return;
    }
    const alt = messungAm(tag);

    if (messSheet.art === "kg") {
      koerperfettFeldSetzen(alt.fett);
      let start = alt.gewicht;
      if (start === null && beimOeffnen) {
        start = koerpergewichtAm(tagDatum(tag));
        if (start === null) {
          start = START_KOERPERGEWICHT;
        }
      }
      if (start !== null) {
        // Das Rad zeigt die gewählte Einheit und kennt nur Werte innerhalb seiner Grenzen
        const grenzen = GEWICHT_EINHEITEN[einheit()];
        const wert = Math.round(ausKg(start) * 10) / 10;
        radSetzen("rad-koerpergewicht", Math.max(grenzen.koerperMin, Math.min(wert, grenzen.koerperMax)));
      }
    } else if (alt.fett !== null || beimOeffnen) {
      koerperfettFeldSetzen(alt.fett);
    }
  }

  // Öffnet das Eintragen für "kg" oder "fett". tag ist der Tag als tagSchluessel, ohne Angabe gilt heute.
  // aendern ist true, wenn der Wert dieses Tages geändert werden soll: Dann fragt das Speichern nicht nach.
  function messSheetOeffnen(art, tag, aendern) {
    const heute = new Date();
    if (tag === undefined) {
      tag = tagSchluessel(heute);
    }
    messSheet = { art: art, aendern: null };
    if (aendern) {
      messSheet.aendern = tag;
    }

    let titel = "koerpergewicht";
    let fettTitel = "messung.fettFeld";
    if (art === "fett") {
      titel = "koerperfett";
      fettTitel = "messung.fettFeldAllein";
    }
    document.getElementById("gewicht-sheet-titel").textContent = txt(titel);
    document.getElementById("fett-feld-titel").textContent = txt(fettTitel);
    document.getElementById("gewicht-sheet-rad").classList.toggle("versteckt", art === "fett");
    // Das Feld "Ziel" gibt es nur beim Körpergewicht und nur im Look Korund (korund.css)
    document.getElementById("ziel-eingabe").classList.toggle("versteckt", art === "fett");
    zielGewichtFeldFuellen();

    // Die Zukunft ist gesperrt
    const feld = document.getElementById("feld-messdatum");
    feld.max = datumFeldText(heute);
    feld.value = datumFeldText(tagDatum(tag));

    zusatzSheetOeffnen("gewicht-sheet");
    messSheetFuellen(true);
  }

  function gewichtSheetOeffnen() {
    messSheetOeffnen("kg");
  }

  function fettSheetOeffnen() {
    messSheetOeffnen("fett");
  }

  // Das Datum wurde geändert: Ein Tag in der Zukunft springt auf heute zurück, dann zeigt das Sheet,
  // was für den Tag schon eingetragen ist.
  function messDatumGeaendert() {
    const feld = document.getElementById("feld-messdatum");
    if (feld.value > feld.max) {
      feld.value = feld.max;
    }
    messSheetFuellen(false);
  }

  // Speichert die Werte aus dem Sheet für den gewählten Tag. Pro Tag gibt es einen Wert:
  // Steht für den Tag schon einer da, fragt die App vorher nach. Nach "Ändern" fragt sie nicht.
  function gewichtSpeichern() {
    const tag = messTagLesen();
    if (tag === null) {
      const feld = document.getElementById("feld-messdatum");
      feld.value = feld.max;
      feld.focus();
      return;
    }
    const art = messSheet.art;
    const alt = messungAm(tag);
    let gewicht = alt.gewicht;
    const fett = koerperfettLesen(document.getElementById("feld-koerperfett").value);
    let bisher = null;
    if (art === "fett") {
      // Ohne Wert gibt es nichts zu speichern
      if (fett === null) {
        document.getElementById("feld-koerperfett").focus();
        return;
      }
      if (alt.fett !== null) {
        bisher = fettText(alt.fett);
      }
    } else {
      gewicht = zuKg(radWert("rad-koerpergewicht"));
      if (alt.gewicht !== null) {
        bisher = kgText(alt.gewicht);
      }
    }

    // Danach zeigt der Kalender den Monat des Eintrags und hat den Tag gewählt
    function speichern() {
      messStand[art].monat = Math.floor(tag / 10000) * 12 + Math.floor(tag / 100) % 100 - 1;
      messStand[art].tag = tag;
      zusatzSheetsSchliessen();
      tagSchreiben(tag, gewicht, fett);
    }

    if (bisher !== null && messSheet.aendern !== tag) {
      frageZeigen(txt("messung.ersetzenFrage"), txt("messung.ersetzenText", { datum: datumMitJahr(tagDatum(tag)), wert: bisher }), [
        { text: txt("messung.ersetzen"), art: "haupt", aktion: speichern },
        { text: txt("abbrechen"), art: "leise" }
      ]);
      return;
    }
    speichern();
  }

  // ---------- Messungen: Kopf, Diagramm und Kalender ----------

  // Körpergewicht ("kg") und Körperfett ("fett") teilen sich Kopf, Diagramm und Kalender. Je Art steht hier,
  // woher die Messungen kommen, wie aus einem gespeicherten Wert der gezeigte wird (umrechnen),
  // wie ein gezeigter Wert als Text mit Einheit aussieht (text) und was ohne jede Messung da steht (leer).
  function messArt(kennung) {
    if (kennung === "fett") {
      return {
        messungen: fettMessungen,
        umrechnen: function (wert) {
          return wert;
        },
        text: fettText,
        leer: txt("messung.fettLeer")
      };
    }
    return { messungen: gewichtMessungen, umrechnen: ausKg, text: einheitText, leer: txt("messung.gewichtLeer") };
  }

  // Ein gespeicherter Wert in der gezeigten Einheit, auf eine Nachkommastelle
  function messWert(art, wert) {
    return Math.round(art.umrechnen(wert) * 10) / 10;
  }

  // Der Kopf der Karte: der letzte Eintrag, darunter sein Datum und die Veränderung zum Eintrag davor.
  // Er gilt unabhängig vom gewählten Zeitraum.
  function messKopfAnzeigen(kennung, art, liste) {
    const kopf = document.getElementById(kennung + "-kopf");
    kopf.innerHTML = "";
    kopf.classList.toggle("versteckt", liste.length === 0);
    if (liste.length === 0) {
      return;
    }
    const letzte = liste[liste.length - 1];
    const wert = messWert(art, letzte.wert);
    const zahl = element("div", "home-zahl", art.text(wert));
    // Look Korund (seit Version 143): die Zahl groß, die Einheit klein dahinter
    if (lookKorund()) {
      const text = art.text(wert);
      const trenner = text.lastIndexOf(" ");
      zahl.textContent = "";
      zahl.classList.add("mess-gross");
      zahl.appendChild(element("span", "", text.slice(0, trenner)));
      zahl.appendChild(element("span", "mess-einheit", text.slice(trenner)));
    }
    kopf.appendChild(zahl);
    let zeile = datumMitJahr(new Date(letzte.zeit));
    if (liste.length > 1) {
      const unterschied = Math.round((wert - messWert(art, liste[liste.length - 2].wert)) * 10) / 10;
      zeile += " · " + txt("messung.zurDavor", { wert: aenderungText(unterschied, art.text) });
    }
    if (!lookKorund()) {
      kopf.appendChild(element("div", "routine-info", zeile));
      return;
    }
    // Look Korund (seit Version 143): die Veränderung im gewählten Zeitraum, beim Körpergewicht dazu das Ziel
    const zeitraum = messStand[kennung].zeitraum;
    const grenze = zeitraum > 0 ? Date.now() - zeitraum * 86400000 : -Infinity;
    const imZeitraum = liste.filter(function (m) {
      return m.zeit >= grenze;
    });
    const info = element("div", "routine-info mess-ziel");
    if (imZeitraum.length > 1) {
      const anfang = messWert(art, imZeitraum[0].wert);
      const unterschied = Math.round((wert - anfang) * 10) / 10;
      const zeichen = unterschied > 0 ? "+" : unterschied < 0 ? "−" : "±";
      const zielWert = kennung === "kg" && zielGewicht() !== null ? messWert(art, zielGewicht()) : null;
      const richtung = zielWert !== null && unterschied !== 0 && Math.sign(unterschied) === Math.sign(zielWert - anfang);
      const betrag = element("span", "mess-delta" + (richtung ? " plus" : ""), zeichen + art.text(Math.abs(unterschied)));
      info.appendChild(betrag);
      const rest = txt("gruppen.in." + zeitraum, { wert: "" }).trim();
      info.appendChild(document.createTextNode(" " + rest));
    } else {
      info.appendChild(document.createTextNode(datumMitJahr(new Date(letzte.zeit))));
    }
    const ziel = kennung === "kg" ? zielGewicht() : null;
    if (ziel !== null) {
      const zielWert = messWert(art, ziel);
      const fehlt = Math.round((zielWert - wert) * 10) / 10;
      let text = txt("ziel.gewichtErreicht", { ziel: art.text(zielWert) });
      if (fehlt !== 0) {
        text = txt("ziel.gewichtKurz", { ziel: art.text(zielWert) });
        // Schätzung aus dem Tempo im Zeitraum: nur wenn es in Richtung Ziel geht und unter einem Jahr bleibt
        if (imZeitraum.length > 1) {
          const tage = (imZeitraum[imZeitraum.length - 1].zeit - imZeitraum[0].zeit) / 86400000;
          const tempo = (wert - messWert(art, imZeitraum[0].wert)) / Math.max(tage, 1);
          if (tage >= 7 && tempo !== 0 && Math.sign(tempo) === Math.sign(fehlt)) {
            const wochen = Math.ceil(Math.abs(fehlt) / Math.abs(tempo) / 7);
            if (wochen <= 52) {
              text = txtAnzahl("ziel.inWochen", wochen);
            }
          }
        }
      }
      info.appendChild(document.createTextNode(" · " + text));
    }
    kopf.appendChild(info);
  }

  // ---------- Ziel für das Körpergewicht (Look Korund, seit Version 143) ----------

  // Gespeichert als einstellungen.zielGewicht in kg. Ohne gültigen Eintrag gibt es kein Ziel (null).
  function zielGewicht() {
    const wert = einstellungen.zielGewicht;
    if (typeof wert !== "number" || isNaN(wert) || wert < GEWICHT_EINHEITEN.kg.koerperMin || wert > GEWICHT_EINHEITEN.kg.koerperMax) {
      return null;
    }
    return wert;
  }

  // Liest das Feld "Ziel" im Sheet Körpergewicht: leer löscht das Ziel, eine Zahl im erlaubten Bereich speichert es.
  // Eine ungültige Zahl wird verworfen und das Feld zeigt wieder das alte Ziel.
  function zielGewichtFeldPruefen() {
    const feld = document.getElementById("feld-zielgewicht");
    const roh = String(feld.value).trim().replace(",", ".");
    if (roh === "") {
      delete einstellungen.zielGewicht;
    } else {
      const zahl = Number(roh);
      const grenzen = GEWICHT_EINHEITEN[einheit()];
      if (!isNaN(zahl) && zahl >= grenzen.koerperMin && zahl <= grenzen.koerperMax) {
        einstellungen.zielGewicht = Math.round(zuKg(zahl) * 100) / 100;
      }
    }
    einstellungenSpeichern();
    zielGewichtFeldFuellen();
    koerpergewichtAnzeigen();
    homeGewichtAnzeigen();
  }

  function zielGewichtFeldFuellen() {
    const feld = document.getElementById("feld-zielgewicht");
    const ziel = zielGewicht();
    feld.value = ziel === null ? "" : zahlText(Math.round(ausKg(ziel) * 10) / 10);
    document.getElementById("ziel-feld-titel").textContent = txt("ziel.feld", { einheit: einheit() });
  }

  // Zeichnet Messungen mit ihrem 7-Tage-Schnitt: die Messungen dünn und grau, darüber kräftig der Schnitt.
  // kennung ist "kg" oder "fett" und steht vorn an den ids von Diagramm und Legende.
  // zeitraum ist die Zahl der Tage (0 = alles, vom ersten Eintrag bis heute).
  function messungenZeichnen(kennung, art, liste, zeitraum) {
    const diagramm = document.getElementById(kennung + "-diagramm");
    const jetzt = Date.now();
    let von;
    let bis;
    if (zeitraum > 0) {
      von = jetzt - zeitraum * 86400000;
      bis = jetzt;
    } else if (liste.length > 0 && jetzt - liste[0].zeit > 86400000) {
      von = liste[0].zeit;
      bis = Math.max(jetzt, liste[liste.length - 1].zeit);
    }
    const messungen = [];
    const schnitt = [];
    for (let i = 0; i < liste.length; i++) {
      if (von === undefined || liste[i].zeit >= von) {
        const mittel = art.umrechnen(schnittAm(liste, new Date(liste[i].zeit)));
        messungen.push({ zeit: liste[i].zeit, wert: art.umrechnen(liste[i].wert), zusatz: txt("messung.schnitt", { wert: art.text(mittel) }) });
        schnitt.push({ zeit: liste[i].zeit, wert: mittel });
      }
    }

    document.getElementById(kennung + "-legende").classList.toggle("versteckt", messungen.length === 0);
    if (messungen.length === 0) {
      diagramm.innerHTML = "";
      let hinweis = txt("messung.zeitraumLeer");
      if (liste.length === 0) {
        hinweis = art.leer;
      }
      diagramm.appendChild(element("p", "meldung", hinweis));
    } else {
      // Der letzte Wert steht schon im Kopf der Karte. Über dem Diagramm steht erst etwas nach dem Antippen.
      const reihen = [
        { punkte: messungen, art: "neben", mitPunkten: true, tasten: true },
        // Im Look Korund bekommt der Schnitt eine Fläche darunter (seit Version 143)
        { punkte: schnitt, art: "haupt", mitPunkten: false, flaeche: lookKorund() }
      ];
      // Look Korund (seit Version 143): das Ziel als gestrichelte Linie über den ganzen Zeitraum
      const ziel = kennung === "kg" ? zielGewicht() : null;
      if (ziel !== null && lookKorund()) {
        const anfang = von === undefined ? messungen[0].zeit : von;
        const ende = von === undefined ? messungen[messungen.length - 1].zeit : bis;
        reihen.unshift({ punkte: [{ zeit: anfang, wert: art.umrechnen(ziel) }, { zeit: ende, wert: art.umrechnen(ziel) }], art: "ziel", mitPunkten: false, beschriftung: txt("ziel.gewichtKurz", { ziel: art.text(messWert(art, ziel)) }) });
      }
      diagrammZeichnen(diagramm, reihen, function (p) {
        return art.text(p.wert);
      }, von, bis, txt("messung.antippen"));
    }
  }

  // Je Art: der gewählte Zeitraum des Diagramms in Tagen, der gezeigte Monat des Kalenders
  // (Jahr mal 12 plus Monat, null ist der laufende Monat) und der angetippte Tag als tagSchluessel.
  const messStand = {
    kg: { zeitraum: 30, monat: null, tag: null },
    fett: { zeitraum: 30, monat: null, tag: null }
  };

  // Klappt den Kalender "Alle Einträge" von "kg" oder "fett" auf oder zu. Am Anfang ist er zu.
  // Der Button sagt mit aria-expanded, ob der Kalender offen ist, und zeigt es mit dem Pfeil.
  function messKalenderKlappen(kennung) {
    const offen = document.getElementById(kennung + "-klapp").classList.toggle("offen");
    const btn = document.getElementById(kennung + "-klapp-btn");
    let pfeil = "▾";
    if (offen) {
      pfeil = "▴";
    }
    btn.setAttribute("aria-expanded", String(offen));
    btn.querySelector(".klapp-pfeil").textContent = pfeil;
  }

  // Das Kästchen "Alle Einträge": ein Monat als Kalender, Montag ist der erste Tag der Woche.
  // Tage mit Eintrag sind markiert und zeigen ihren Wert. Ein Tipp auf einen Tag zeigt ihn darunter
  // mit "Ändern" und "Löschen" oder, ohne Eintrag, mit "Eintragen".
  function messKalenderAnzeigen(kennung, art, liste) {
    const stand = messStand[kennung];
    const bereich = document.getElementById(kennung + "-kalender");
    bereich.innerHTML = "";

    const heute = new Date();
    const heuteTag = tagSchluessel(heute);
    const heuteMonat = heute.getFullYear() * 12 + heute.getMonth();

    // Der Wert jedes Tages. Zurück geht es bis zum Monat des ersten Eintrags, vor bis zum laufenden Monat.
    const werte = {};
    let ersterMonat = heuteMonat;
    for (let i = 0; i < liste.length; i++) {
      const datum = new Date(liste[i].zeit);
      werte[tagSchluessel(datum)] = messWert(art, liste[i].wert);
      ersterMonat = Math.min(ersterMonat, datum.getFullYear() * 12 + datum.getMonth());
    }
    // Der gezeigte Monat bleibt stehen, auch wenn sein letzter Eintrag gerade gelöscht wurde
    let monat = heuteMonat;
    if (stand.monat !== null) {
      monat = Math.min(stand.monat, heuteMonat);
      ersterMonat = Math.min(ersterMonat, monat);
    }
    const jahr = Math.floor(monat / 12);
    const monatImJahr = monat % 12;

    function zeigen(neuerMonat, tag) {
      stand.monat = neuerMonat;
      stand.tag = tag;
      messKalenderAnzeigen(kennung, art, liste);
    }

    // Oben: "Heute", darunter der Monat mit den Pfeilen zum Blättern
    const kopf = element("div", "kal-kopf");
    const zuHeute = element("button", "kal-heute", txt("heute"));
    zuHeute.onclick = function () {
      zeigen(null, heuteTag);
    };
    kopf.appendChild(zuHeute);
    bereich.appendChild(kopf);

    const leiste = element("div", "kal-monat");
    const zurueck = element("button", "kal-pfeil", "‹");
    zurueck.setAttribute("aria-label", txt("kalender.monatZurueck"));
    zurueck.disabled = monat <= ersterMonat;
    zurueck.onclick = function () {
      zeigen(monat - 1, null);
    };
    const vor = element("button", "kal-pfeil", "›");
    vor.setAttribute("aria-label", txt("kalender.monatVor"));
    vor.disabled = monat >= heuteMonat;
    vor.onclick = function () {
      zeigen(monat + 1, null);
    };
    leiste.appendChild(zurueck);
    leiste.appendChild(element("div", "kal-monat-name", new Date(jahr, monatImJahr, 1).toLocaleDateString(gebiet(), { month: "long", year: "numeric" })));
    leiste.appendChild(vor);
    bereich.appendChild(leiste);

    // Die Wochentage, dann leere Felder bis zum Wochentag des Monatsersten, dann die Tage
    const gitter = element("div", "kal-gitter");
    for (let i = 0; i < 7; i++) {
      gitter.appendChild(element("div", "kal-wochentag", wochentag(i)));
    }
    const versatz = (new Date(jahr, monatImJahr, 1).getDay() + 6) % 7;
    for (let i = 0; i < versatz; i++) {
      gitter.appendChild(element("div"));
    }
    const tageImMonat = new Date(jahr, monatImJahr + 1, 0).getDate();
    for (let t = 1; t <= tageImMonat; t++) {
      const tag = jahr * 10000 + (monatImJahr + 1) * 100 + t;
      const btn = element("button", "kal-tag");
      btn.appendChild(element("span", "kal-zahl", t));
      let ansage = datumMitJahr(tagDatum(tag));
      if (werte[tag] !== undefined) {
        btn.classList.add("hat");
        // Immer mit einer Nachkommastelle, damit alle Tage gleich aussehen, z. B. "81,0"
        btn.appendChild(element("span", "kal-wert", werte[tag].toLocaleString(gebiet(), { minimumFractionDigits: 1, maximumFractionDigits: 1 })));
        ansage += ", " + art.text(werte[tag]);
      }
      btn.setAttribute("aria-label", ansage);
      if (tag === heuteTag) {
        btn.classList.add("heute");
      }
      if (tag === stand.tag) {
        btn.classList.add("gewaehlt");
      }
      // Zukünftige Tage lassen sich nicht antippen
      btn.disabled = tag > heuteTag;
      btn.onclick = function () {
        zeigen(monat, tag);
      };
      gitter.appendChild(btn);
    }
    bereich.appendChild(gitter);

    // Der angetippte Tag, solange er im gezeigten Monat liegt
    if (stand.tag === null || Math.floor(stand.tag / 100) !== jahr * 100 + monatImJahr + 1) {
      return;
    }
    const tag = stand.tag;
    const detail = element("div", "kal-detail");
    const knoepfe = element("div", "kal-knoepfe");
    if (werte[tag] !== undefined) {
      detail.appendChild(element("div", "home-zahl", art.text(werte[tag])));
      // Beim Gewicht steht das Körperfett des Tages dabei, wenn es eins gibt
      let zeile = tagTextMitJahr(tagDatum(tag));
      const fett = messungAm(tag).fett;
      if (kennung === "kg" && fett !== null) {
        zeile += " · " + txt("messung.fett", { wert: fettText(fett) });
      }
      detail.appendChild(element("div", "routine-info", zeile));
      const aendern = element("button", "kal-knopf", txt("messung.aendern"));
      aendern.onclick = function () {
        messSheetOeffnen(kennung, tag, true);
      };
      const weg = element("button", "kal-knopf gefahr", txt("loeschen"));
      weg.onclick = function () {
        messwertLoeschen(kennung, tag);
      };
      knoepfe.appendChild(aendern);
      knoepfe.appendChild(weg);
    } else {
      detail.appendChild(element("div", "routine-info", tagTextMitJahr(tagDatum(tag)) + " · " + txt("messung.keinEintrag")));
      const neu = element("button", "kal-knopf", txt("messung.eintragen"));
      neu.onclick = function () {
        messSheetOeffnen(kennung, tag);
      };
      knoepfe.appendChild(neu);
    }
    detail.appendChild(knoepfe);
    bereich.appendChild(detail);
  }

  // Baut Kopf, Diagramm und Kalender für "kg" oder "fett"
  function messBereichAnzeigen(kennung) {
    const art = messArt(kennung);
    const stand = messStand[kennung];
    const liste = art.messungen();

    messKopfAnzeigen(kennung, art, liste);
    umschalterBauen(document.getElementById(kennung + "-zeitraum"), KG_ZEITRAEUME, stand.zeitraum, function (tage) {
      stand.zeitraum = tage;
      messBereichAnzeigen(kennung);
      fortschrittReiterAnzeigen();
    });
    messungenZeichnen(kennung, art, liste, stand.zeitraum);
    messKalenderAnzeigen(kennung, art, liste);
    if (kennung === "fett") {
      koerperKachelnAnzeigen();
    }
  }

  // Look Korund (seit Version 143): unter der Karte Körpergewicht zwei Kacheln Körperfett und Magermasse.
  // Ein Tipp auf Körperfett klappt den ganzen Bereich Körperfett (Diagramm, Eintragen) auf und zu. Sonst ausgeblendet.
  let koerperFettOffen = false;

  function koerperKachelnAnzeigen() {
    const bereich = document.getElementById("koerper-kacheln");
    if (!bereich) {
      return;
    }
    bereich.innerHTML = "";
    document.getElementById("seite-fortschritt").setAttribute("data-fett-offen", koerperFettOffen ? "ja" : "nein");
    const fett = fettMessungen();
    const fettKachel = element("button", "karte koerper-kachel");
    fettKachel.type = "button";
    fettKachel.setAttribute("aria-expanded", koerperFettOffen ? "true" : "false");
    fettKachel.appendChild(element("div", "statistik-label", txt("koerperfett")));
    if (fett.length === 0) {
      fettKachel.appendChild(element("div", "koerper-wert leise", "–"));
      fettKachel.appendChild(element("div", "statistik-klein", txt("koerper.fettLeer")));
    } else {
      const letzte = fett[fett.length - 1];
      fettKachel.appendChild(element("div", "koerper-wert", fettText(letzte.wert)));
      if (fett.length > 1) {
        const unterschied = Math.round((letzte.wert - fett[fett.length - 2].wert) * 10) / 10;
        const zeichen = unterschied > 0 ? "+" : unterschied < 0 ? "−" : "±";
        fettKachel.appendChild(element("div", "statistik-klein" + (unterschied < 0 ? " plus" : ""), zeichen + fettText(Math.abs(unterschied))));
      }
    }
    fettKachel.onclick = function () {
      koerperFettOffen = !koerperFettOffen;
      koerperKachelnAnzeigen();
    };
    bereich.appendChild(fettKachel);

    // Magermasse: Gewicht ohne Fett, aus der letzten Messung, die beides hat
    const gewichte = gewichtMessungen();
    let mager = null;
    for (let i = gewichte.length - 1; i >= 0 && mager === null; i--) {
      if (gewichte[i].fett !== null) {
        mager = gewichte[i].wert * (1 - gewichte[i].fett / 100);
      }
    }
    const magerKachel = element("div", "karte koerper-kachel");
    magerKachel.appendChild(element("div", "statistik-label", txt("koerper.mager")));
    magerKachel.appendChild(element("div", "koerper-wert" + (mager === null ? " leise" : ""), mager === null ? "–" : kgText(mager)));
    magerKachel.appendChild(element("div", "statistik-klein", mager === null ? txt("koerper.magerLeer") : txt("koerper.magerInfo")));
    bereich.appendChild(magerKachel);
  }

  // Fortschritt-Tab: Körpergewicht und Körperfett mit Kopf, Diagramm und Kalender, dazu die Kacheln
  function koerpergewichtAnzeigen() {
    const liste = gewichtMessungen();
    messBereichAnzeigen("kg");
    messBereichAnzeigen("fett");

    // Ohne Messungen blendet der Look Korund Zeitraum, Legende, Kalender und Kacheln aus (korund.css)
    const seite = document.getElementById("seite-fortschritt");
    if (seite && seite.setAttribute) {
      seite.setAttribute("data-kg-leer", liste.length === 0 ? "ja" : "nein");
      seite.setAttribute("data-fett-leer", messArt("fett").messungen().length === 0 ? "ja" : "nein");
    }

    // Kacheln: Schnitt am Tag der letzten Messung minus Schnitt so viele Tage davor
    const kacheln = document.getElementById("kg-kacheln");
    kacheln.innerHTML = "";
    const abstaende = [3, 7, 14, 30];
    for (let i = 0; i < abstaende.length; i++) {
      let text = "–";
      const unterschied = schnittAenderung(liste, abstaende[i]);
      if (unterschied !== null) {
        text = schnittAenderungText(unterschied);
      }
      const kachel = element("div", "karte");
      kachel.appendChild(element("div", "home-zahl", text));
      kachel.appendChild(element("div", "kachel-titel", txt("fortschritt.tage", { n: abstaende[i] })));
      kacheln.appendChild(kachel);
    }
  }

  // ---------- Backup ----------

  // Einträge aus der gewählten Datei, die auf die Entscheidung "ergänzen oder ersetzen" warten
  let importEintraege = [];

  // Routinen und Wochenplan aus der Datei. null heißt: Das Backup enthält keine (z. B. ein älteres Backup).
  let importRoutinen = null;
  let importWochenplan = null;

  // Trainingseinheiten aus der Datei. null heißt: Das Backup enthält keine (z. B. ein älteres Backup).
  let importTrainings = null;

  // Messungen des Körpergewichts aus der Datei. null heißt: Das Backup enthält keine.
  let importGewichte = null;

  // Die Einstellungen aus der Datei (Standard-Pause, Einheiten, Sprache, Design, Übung der Kraft-Karte).
  // null heißt: Das Backup enthält keine.
  let importEinstellungen = null;

  // Name und Benutzername aus der Datei. null heißt: Das Backup enthält keine (z. B. ein älteres Backup).
  let importProfil = null;

  // Die eigenen Übungen aus der Datei. null heißt: Das Backup enthält keine (z. B. ein älteres Backup).
  let importEigene = null;

  // Die ids gelöschter Eigengewicht-Übungen aus der Datei. null heißt: Das Backup enthält keine (Backup vor Version 11).
  let importGeloeschte = null;
  let importNotizen = null;

  // Prüft eine Routine aus einem Backup und gibt eine saubere Kopie zurück, oder null, wenn sie unbrauchbar ist
  function routineBereinigen(r) {
    if (!r || typeof r !== "object" || typeof r.name !== "string" || !Array.isArray(r.uebungen)) {
      return null;
    }

    const sauber = { id: neueId(), name: r.name, uebungen: [] };
    if (typeof r.id === "string" && r.id !== "") {
      sauber.id = r.id;
    }
    for (let i = 0; i < r.uebungen.length; i++) {
      const u = r.uebungen[i];
      if (u && typeof u === "object" && typeof u.name === "string") {
        let gruppe = "";
        if (typeof u.muskelgruppe === "string") {
          gruppe = u.muskelgruppe;
        }
        // Neuere Backups bringen die ID mit, bei älteren wird sie über den Namen ergänzt
        let id = "";
        if (typeof u.uebungId === "string") {
          id = u.uebungId;
        }
        const neu = { name: u.name, uebungId: id, muskelgruppe: gruppe, zielSaetze: zielLesen(u.zielSaetze, 10), zielWdh: u.zielWdh, zielWdhMax: u.zielWdhMax, pause: uebungPauseLesen(u.pause) };
        wdhZielBereinigen(neu);
        zaehlweiseKopieren(u, neu);
        idErgaenzen(neu, u.name);
        sauber.uebungen.push(neu);
      }
    }
    return sauber;
  }

  // Übernimmt Routinen und Wochenplan aus dem Backup. Gibt den Text für die Meldung zurück.
  function routinenImportieren(art) {
    if (importRoutinen === null) {
      return "";
    }

    let text;
    if (art === "ersetzen") {
      routinen = importRoutinen;
      wochenplan = ["", "", "", "", "", "", ""];
      if (importWochenplan) {
        for (let i = 0; i < 7; i++) {
          wochenplan[i] = String(importWochenplan[i] || "");
        }
      }
      text = " " + txt("backup.routinenErsetzt", { n: routinen.length });
    } else {
      // Nur Routinen hinzufügen, die es hier noch nicht gibt (erkannt an der id)
      let hinzugefuegt = 0;
      for (let i = 0; i < importRoutinen.length; i++) {
        if (!routineFinden(importRoutinen[i].id)) {
          routinen.push(importRoutinen[i]);
          hinzugefuegt++;
        }
      }
      // Im Wochenplan nur Tage füllen, für die noch nichts geplant ist
      if (importWochenplan) {
        for (let i = 0; i < 7; i++) {
          if (wochenplan[i] === "") {
            wochenplan[i] = String(importWochenplan[i] || "");
          }
        }
      }
      text = " " + txt("backup.routinenErgaenzt", { n: hinzugefuegt });
    }

    wochenplanBereinigen();
    routinenSpeichern();
    trainingAnzeigen();
    return text;
  }

  // Prüft eine Trainingseinheit aus einem Backup und gibt eine saubere Kopie zurück, oder null, wenn sie unbrauchbar ist
  function trainingBereinigen(t) {
    if (!t || typeof t !== "object" || typeof t.start !== "string" || typeof t.ende !== "string" || !Array.isArray(t.eintragIds)) {
      return null;
    }

    const sauber = { id: neueId("t"), start: t.start, ende: t.ende, routineId: "", routineName: "", eintragIds: [] };
    if (typeof t.id === "string" && t.id !== "") {
      sauber.id = t.id;
    }
    if (typeof t.routineId === "string") {
      sauber.routineId = t.routineId;
    }
    if (typeof t.routineName === "string") {
      sauber.routineName = t.routineName;
    }
    for (let i = 0; i < t.eintragIds.length; i++) {
      if (typeof t.eintragIds[i] === "string") {
        sauber.eintragIds.push(t.eintragIds[i]);
      }
    }
    return sauber;
  }

  // Übernimmt die Trainingseinheiten aus dem Backup. Gibt den Text für die Meldung zurück.
  function trainingsImportieren(art) {
    let text = "";
    if (art === "ersetzen") {
      // Die bisherigen Einheiten gehören zu den ersetzten Einträgen und gehen mit ihnen
      trainings = importTrainings || [];
      if (importTrainings !== null) {
        text = " " + txt("backup.trainingsErsetzt", { n: trainings.length });
      }
    } else if (importTrainings !== null) {
      // Nur Einheiten hinzufügen, die es hier noch nicht gibt (erkannt an der id)
      const vorhanden = {};
      for (let i = 0; i < trainings.length; i++) {
        vorhanden[trainings[i].id] = true;
      }
      let hinzugefuegt = 0;
      for (let i = 0; i < importTrainings.length; i++) {
        if (!vorhanden[importTrainings[i].id]) {
          trainings.push(importTrainings[i]);
          vorhanden[importTrainings[i].id] = true;
          hinzugefuegt++;
        }
      }
      text = " " + txt("backup.trainingsErgaenzt", { n: hinzugefuegt });
    }

    sicherSpeichern("trainings", trainings);
    return text;
  }

  // Übernimmt das Körpergewicht aus dem Backup. Gibt den Text für die Meldung zurück.
  // Fehlt es im Backup, bleiben die Messungen auf diesem Gerät, wie sie sind.
  function gewichteImportieren(art) {
    if (importGewichte === null) {
      return "";
    }

    let text;
    if (art === "ersetzen") {
      koerpergewicht = importGewichte;
      text = " " + txt("backup.gewichteErsetzt", { n: koerpergewicht.length });
    } else {
      // Nur Tage hinzufügen, für die es hier noch keine Messung gibt
      const vorhanden = {};
      for (let i = 0; i < koerpergewicht.length; i++) {
        if (hatDatum(koerpergewicht[i])) {
          vorhanden[tagSchluessel(new Date(koerpergewicht[i].datum))] = true;
        }
      }
      let hinzugefuegt = 0;
      for (let i = 0; i < importGewichte.length; i++) {
        const tag = tagSchluessel(new Date(importGewichte[i].datum));
        if (!vorhanden[tag]) {
          koerpergewicht.push(importGewichte[i]);
          vorhanden[tag] = true;
          hinzugefuegt++;
        }
      }
      text = " " + txt("backup.gewichteErgaenzt", { n: hinzugefuegt });
    }

    gewichteSpeichern();
    return text;
  }

  // Übernimmt die eigenen Übungen aus dem Backup. Gibt den Text für die Meldung zurück.
  // Fehlen sie im Backup (älteres Backup), bleiben die eigenen Übungen auf diesem Gerät, wie sie sind.
  function eigeneImportieren(art) {
    if (importEigene === null) {
      return "";
    }

    let schluessel = "backup.eigeneErgaenzt";
    if (art === "ersetzen") {
      eigeneUebungen = [];
      eigeneUebungenEintragen();
      schluessel = "backup.eigeneErsetzt";
    }
    // Dazu kommt nur, wessen ID es hier noch nicht gibt. Bei gleicher ID bleibt die vorhandene Übung,
    // auch wenn sie im Backup anders heißt.
    const anzahl = eigeneUebungenAufnehmen(importEigene);
    eigeneUebungenSpeichern();
    return " " + txt(schluessel, { n: anzahl });
  }

  // Prüft die Einstellungen aus einem Backup und gibt nur zurück, was gültig ist
  function einstellungenBereinigen(e) {
    const sauber = {};
    if (pauseLesen(e.pauseSekunden) !== null) {
      sauber.pauseSekunden = pauseLesen(e.pauseSekunden);
    }
    if (e.gewichtEinheit === "kg" || e.gewichtEinheit === "lbs") {
      sauber.gewichtEinheit = e.gewichtEinheit;
    }
    if (e.laengeEinheit === "cm" || e.laengeEinheit === "ftin") {
      sauber.laengeEinheit = e.laengeEinheit;
    }
    if (spracheBekannt(e.sprache)) {
      sauber.sprache = e.sprache;
    }
    if (e.design === "dunkel" || e.design === "hell") {
      sauber.design = e.design;
    }
    if (kraftUebungBereinigen(e.kraftUebung)) {
      sauber.kraftUebung = kraftUebungBereinigen(e.kraftUebung);
    }
    // Den Merker des Rang-Systems gibt es erst ab Backup-Version 8
    if (e.rangMerker && typeof e.rangMerker === "object") {
      sauber.rangMerker = rangMerkerBereinigen(e.rangMerker);
    }
    // Die Auszeiten (Krank, Urlaub) gibt es seit Version 141. Sie gehören zur Serie und kommen deshalb mit.
    if (Array.isArray(e.auszeiten)) {
      sauber.auszeiten = e.auszeiten.filter(function (a) {
        return a && AUSZEIT_ARTEN.indexOf(a.art) !== -1 && typeof a.von === "number" && (a.bis === null || typeof a.bis === "number");
      }).map(function (a) {
        return { art: a.art, von: a.von, bis: a.bis };
      });
    }
    return sauber;
  }

  // Übernimmt Einstellungen aus einem Backup. Was dort fehlt, bleibt, wie es ist.
  function einstellungenUebernehmen(neu) {
    if (neu.pauseSekunden) {
      einstellungen.pauseSekunden = neu.pauseSekunden;
    }
    if (neu.laengeEinheit) {
      einstellungen.laengeEinheit = neu.laengeEinheit;
    }
    if (neu.design) {
      einstellungen.design = neu.design;
    }
    if (neu.kraftUebung) {
      einstellungen.kraftUebung = neu.kraftUebung;
    }
    if (neu.auszeiten) {
      einstellungen.auszeiten = neu.auszeiten;
      statusAnzeigen();
    }
    einstellungenSpeichern();
    designAnwenden();
    designAnzeigen();
    if (neu.gewichtEinheit) {
      gewichtEinheitSetzen(neu.gewichtEinheit);
    }
    pauseStandardAnzeigen();
    einheitenAnzeigen();
    if (neu.sprache) {
      spracheSetzen(neu.sprache);
    }
  }

  // Zeigt eine Meldung unter den Backup-Buttons
  function datenMeldung(text) {
    document.getElementById("daten-meldung").textContent = text;
  }

  // Der Inhalt der Backup-Datei als JSON-Text
  function backupText() {
    const backup = {
      app: "korund",
      version: 12,
      exportiert: new Date().toISOString(),
      profil: profil,
      eintraege: eintraege,
      eigeneUebungen: eigeneUebungen,
      geloeschteEigengewicht: geloeschteEigengewicht,
      notizen: notizen,
      routinen: routinen,
      wochenplan: wochenplan,
      trainings: trainings,
      koerpergewicht: koerpergewicht,
      einstellungen: einstellungen
    };
    return JSON.stringify(backup, null, 2);
  }

  // Speichert alle Einträge als Datei, z. B. korund-backup-2026-10-07.json
  function backupExportieren() {
    const heute = new Date();
    const dateiname = "korund-backup-" + heute.getFullYear()
      + "-" + String(heute.getMonth() + 1).padStart(2, "0")
      + "-" + String(heute.getDate()).padStart(2, "0") + ".json";
    const datei = new File([backupText()], dateiname, { type: "application/json" });

    // iPhone und iPad: das Teilen-Menü öffnen ("In Dateien sichern"), weil ein normaler
    // Download in der Homescreen-App nicht zuverlässig ankommt. "standalone" gibt es nur dort.
    const istIOS = "standalone" in navigator;
    if (istIOS && navigator.canShare && navigator.canShare({ files: [datei] })) {
      navigator.share({ files: [datei] }).then(function () {
        backupDatumMerken();
        datenMeldung(txt("backup.exportiert", { n: eintraege.length }));
      }).catch(function (fehler) {
        // AbortError heißt nur: Das Teilen-Menü wurde ohne Auswahl geschlossen
        if (fehler.name !== "AbortError") {
          dateiHerunterladen(datei);
        }
      });
      return;
    }

    dateiHerunterladen(datei);
  }

  // Download des Backups: Danach gilt das Backup als exportiert
  function dateiHerunterladen(datei) {
    dateiSpeichern(datei);
    backupDatumMerken();
    datenMeldung(txt("backup.exportiert", { n: eintraege.length }));
  }

  // Normaler Download einer Datei über einen unsichtbaren Link. Mehr passiert hier nicht:
  // Auch das Bild der Teilen-Karte kommt so aufs Gerät, und das ist kein Backup.
  function dateiSpeichern(datei) {
    const adresse = URL.createObjectURL(datei);
    const link = document.createElement("a");
    link.href = adresse;
    link.download = datei.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () {
      URL.revokeObjectURL(adresse);
    }, 60000);
  }

  // Merkt sich, wann zuletzt ein Backup exportiert wurde. Das Datum bleibt auf dem Gerät und steht nicht im Backup.
  function backupDatumMerken() {
    sicherSpeichern("letztesBackup", new Date().toISOString());
    einstWerteAnzeigen();
  }

  // Wird aufgerufen, sobald im Datei-Feld eine Datei gewählt wurde
  function backupDateiGewaehlt(feld) {
    const datei = feld.files[0];
    if (!datei) {
      return;
    }

    const leser = new FileReader();
    leser.onload = function () {
      backupLesen(leser.result);
    };
    leser.onerror = function () {
      datenMeldung(txt("backup.nichtLesbar"));
    };
    leser.readAsText(datei);

    // Feld leeren, damit dieselbe Datei später nochmal gewählt werden kann
    feld.value = "";
  }

  // Prüft den Inhalt der Datei und fragt dann, ob ergänzt oder ersetzt werden soll
  function backupLesen(text) {
    let daten;
    try {
      daten = JSON.parse(text);
    } catch (fehler) {
      datenMeldung(txt("backup.ungueltig"));
      return;
    }

    // Die Einträge stehen im Backup unter "eintraege". Eine reine Liste wird auch angenommen.
    // Die Kennung "app" wird bewusst nicht geprüft: So lassen sich auch alte Backups
    // mit den Kennungen "hybridslife" und "gymstead" weiter importieren.
    let liste = daten;
    if (daten && !Array.isArray(daten)) {
      liste = daten.eintraege;
    }
    if (!Array.isArray(liste)) {
      datenMeldung(txt("backup.ungueltig"));
      return;
    }

    // Nur Einträge übernehmen, die einen Übungsnamen haben
    importEintraege = [];
    for (let i = 0; i < liste.length; i++) {
      const e = liste[i];
      if (e && typeof e === "object" && typeof e.uebung === "string") {
        importEintraege.push(e);
      }
    }
    // Einträge aus älteren Backups kennen nur den Übungsnamen: die feste ID ergänzen
    listeZuordnen(importEintraege, "uebung");
    // Ebenso fehlt ihnen die eigene id des Eintrags
    eintragIdsErgaenzen(importEintraege);

    // Eigene Übungen gibt es erst in neueren Backups. Geprüft werden sie beim Übernehmen.
    importEigene = null;
    if (daten && !Array.isArray(daten) && Array.isArray(daten.eigeneUebungen)) {
      importEigene = daten.eigeneUebungen;
    }

    // Die ids gelöschter Eigengewicht-Übungen gibt es erst ab Backup-Version 11. Ältere Backups lassen die Liste, wie sie ist.
    importGeloeschte = null;
    if (daten && !Array.isArray(daten) && Array.isArray(daten.geloeschteEigengewicht)) {
      importGeloeschte = daten.geloeschteEigengewicht;
    }

    // Notizen je Übung gibt es seit Version 141 (Backup-Version bleibt 12, ältere Versionen lassen das Feld liegen)
    importNotizen = null;
    if (daten && !Array.isArray(daten) && daten.notizen && typeof daten.notizen === "object") {
      importNotizen = notizenBereinigen(daten.notizen);
    }

    // Einstellungen gibt es erst in neueren Backups
    importEinstellungen = null;
    if (daten && !Array.isArray(daten) && daten.einstellungen && typeof daten.einstellungen === "object") {
      importEinstellungen = einstellungenBereinigen(daten.einstellungen);
    }

    // Name und Benutzername gibt es erst ab Backup-Version 7, Geschlecht, Geburtstag und Aktivitätsniveau ab Version 10.
    // Ältere Backups lassen am Profil, was sie nicht kennen, wie es ist.
    importProfil = null;
    if (daten && !Array.isArray(daten) && daten.profil && typeof daten.profil === "object") {
      importProfil = profilBereinigen(daten.profil);
    }

    // Das Körpergewicht gibt es erst in neueren Backups. Übernommen wird, was ein Datum und ein gültiges
    // Gewicht oder Körperfett hat. Bis Backup-Version 8 hatte jeder Eintrag ein Gewicht,
    // ab Version 9 darf einer auch nur das Körperfett haben.
    importGewichte = null;
    if (daten && !Array.isArray(daten) && Array.isArray(daten.koerpergewicht)) {
      importGewichte = [];
      for (let i = 0; i < daten.koerpergewicht.length; i++) {
        const m = daten.koerpergewicht[i];
        const mitGewicht = Boolean(m) && typeof m.gewicht === "number" && !isNaN(m.gewicht);
        if (hatDatum(m) && (mitGewicht || koerperfettVon(m) !== null)) {
          const messung = { datum: m.datum };
          if (mitGewicht) {
            messung.gewicht = m.gewicht;
          }
          if (koerperfettVon(m) !== null) {
            messung.koerperfett = m.koerperfett;
          }
          importGewichte.push(messung);
        }
      }
    }

    // Trainingseinheiten gibt es erst in neueren Backups
    importTrainings = null;
    if (daten && !Array.isArray(daten) && Array.isArray(daten.trainings)) {
      importTrainings = [];
      for (let i = 0; i < daten.trainings.length; i++) {
        const training = trainingBereinigen(daten.trainings[i]);
        if (training) {
          importTrainings.push(training);
        }
      }
    }

    // Routinen und Wochenplan gibt es erst in neueren Backups
    importRoutinen = null;
    importWochenplan = null;
    if (daten && !Array.isArray(daten) && Array.isArray(daten.routinen)) {
      importRoutinen = [];
      for (let i = 0; i < daten.routinen.length; i++) {
        const routine = routineBereinigen(daten.routinen[i]);
        if (routine) {
          importRoutinen.push(routine);
        }
      }
      if (Array.isArray(daten.wochenplan) && daten.wochenplan.length === 7) {
        importWochenplan = daten.wochenplan;
      }
    }

    if (importEintraege.length === 0 && (importRoutinen === null || importRoutinen.length === 0)) {
      importRoutinen = null;
      importWochenplan = null;
      importTrainings = null;
      importGewichte = null;
      importEigene = null;
      importGeloeschte = null;
      importProfil = null;
      datenMeldung(txt("backup.leer"));
      return;
    }

    let dialogText = txt("backup.frage", { neu: importEintraege.length, hier: eintraege.length });
    if (importRoutinen !== null) {
      dialogText += " " + txt("backup.frageRoutinen", { neu: importRoutinen.length, hier: routinen.length });
    }
    document.getElementById("dialog-text").textContent = dialogText;
    document.getElementById("dialog-hintergrund").classList.add("offen");
  }

  // Woran zwei gleiche Einträge erkannt werden: Übung, Werte und Zeitpunkt stimmen überein
  function eintragSchluessel(e) {
    return JSON.stringify([e.uebung, String(e.gewicht), String(e.wdh), String(e.saetze), e.datum || ""]);
  }

  // Übernimmt die Einträge aus dem Backup. art ist "ergaenzen" oder "ersetzen".
  function importAusfuehren(art) {
    // Die Einstellungen werden nur beim Ersetzen übernommen. Sie kommen zuerst,
    // damit die Meldung danach schon in der Sprache aus dem Backup erscheint.
    if (art === "ersetzen" && importEinstellungen !== null) {
      einstellungenUebernehmen(importEinstellungen);
    }
    if (importProfil !== null) {
      profilUebernehmen(importProfil, art);
    }

    // Die eigenen Übungen kommen vor den Einträgen, damit diese ihre Übung gleich finden
    const eigeneText = eigeneImportieren(art);

    // Die ids gelöschter Eigengewicht-Übungen kommen immer dazu, auch beim Ersetzen: Eine id, zu der es
    // keine Einträge mehr gibt, ändert nichts. Gibt es die Übung noch, gilt ohnehin sie.
    if (importGeloeschte !== null) {
      geloeschteEigengewichtAufnehmen(importGeloeschte);
      sicherSpeichern("geloeschteEigengewicht", geloeschteEigengewicht);
    }

    // Notizen: Beim Ersetzen gelten die aus dem Backup, beim Hinzufügen kommen nur fehlende dazu
    if (importNotizen !== null) {
      if (art === "ersetzen") {
        notizen = importNotizen;
      } else {
        Object.keys(importNotizen).forEach(function (schluessel) {
          if (!notizen[schluessel]) {
            notizen[schluessel] = importNotizen[schluessel];
          }
        });
      }
      sicherSpeichern("notizen", notizen);
    }

    let meldung;
    if (art === "ersetzen") {
      eintraege = importEintraege;
      meldung = txt("backup.ersetzt", { n: eintraege.length });
    } else {
      // Zählen, wie oft es jeden Eintrag schon gibt. Nur was darüber hinausgeht, kommt dazu.
      const vorhanden = {};
      for (let i = 0; i < eintraege.length; i++) {
        const schluessel = eintragSchluessel(eintraege[i]);
        vorhanden[schluessel] = (vorhanden[schluessel] || 0) + 1;
      }

      let hinzugefuegt = 0;
      let uebersprungen = 0;
      for (let i = 0; i < importEintraege.length; i++) {
        const schluessel = eintragSchluessel(importEintraege[i]);
        if (vorhanden[schluessel] > 0) {
          vorhanden[schluessel]--;
          uebersprungen++;
        } else {
          eintraege.push(importEintraege[i]);
          hinzugefuegt++;
        }
      }
      meldung = txt("backup.ergaenzt", { neu: hinzugefuegt, alt: uebersprungen });
    }
    datenMeldung(meldung + routinenImportieren(art) + trainingsImportieren(art) + gewichteImportieren(art) + eigeneText);

    sicherSpeichern("eintraege", eintraege);

    // Der Merker des Rang-Systems: Beim Ersetzen gilt der aus dem Backup. Hat das Backup keinen (ältere Backups),
    // entsteht er aus den importierten Daten neu. In beiden Fällen ohne Meldung "Neuer Rang".
    if (art === "ersetzen") {
      delete einstellungen.rangMerker;
      if (importEinstellungen !== null && importEinstellungen.rangMerker) {
        einstellungen.rangMerker = importEinstellungen.rangMerker;
      }
      einstellungenSpeichern();
    }
    rangPruefen(false);
    importEintraege = [];
    importRoutinen = null;
    importWochenplan = null;
    importTrainings = null;
    importGewichte = null;
    importEigene = null;
    importGeloeschte = null;
    importProfil = null;
    document.getElementById("dialog-hintergrund").classList.remove("offen");
    anzeigen();
    letztesMalAnzeigen();
    einstWerteAnzeigen();
  }

  function importAbbrechen() {
    importEintraege = [];
    importRoutinen = null;
    importWochenplan = null;
    importTrainings = null;
    importGewichte = null;
    importEigene = null;
    importGeloeschte = null;
    importProfil = null;
    document.getElementById("dialog-hintergrund").classList.remove("offen");
  }

  // ---------- Icons ----------

  // Selbst gezeichnete Linien-Icons im selben Stil wie die der Navigationsleiste (24 × 24, nur Striche).
  // Im HTML steht an der Stelle nur data-icon="name", die Zeichnung setzt iconsEinsetzen() ein.
  const ICONS = {
    zahnrad: '<circle cx="12" cy="12" r="6.5"/><circle cx="12" cy="12" r="2.5"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"/>',
    person: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>',
    schloss: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    karte: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 14.5h4"/>',
    gesperrt: '<circle cx="12" cy="12" r="8"/><path d="M6.5 6.5l11 11"/>',
    waage: '<path d="M12 4v16M7 20h10M5 7h14M5 7l-3 7h6zM19 7l-3 7h6z"/>',
    design: '<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor"/>',
    globus: '<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c3 3 3 13 0 16M12 4c-3 3-3 13 0 16"/>',
    stoppuhr: '<circle cx="12" cy="13" r="7"/><path d="M12 13V9.5M10 3h4M12 3v3"/>',
    export: '<path d="M12 15V4M8 8l4-4 4 4M5 14v5h14v-5"/>',
    import: '<path d="M12 4v11M8 11l4 4 4-4M5 14v5h14v-5"/>',
    frage: '<circle cx="12" cy="12" r="8"/><path d="M9.6 9.6a2.5 2.5 0 1 1 3.6 2.2c-.8.4-1.2 1-1.2 1.8M12 16.5v.01"/>',
    info: '<circle cx="12" cy="12" r="8"/><path d="M12 11v5M12 8v.01"/>',
    liste: '<path d="M9 7h11M9 12h11M9 17h11M4.5 7v.01M4.5 12v.01M4.5 17v.01"/>',
    link: '<path d="M8 6h10v10M18 6L6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    wechsel: '<path d="M8 20V4M8 4L4.5 7.5M8 4l3.5 3.5M16 4v16M16 20l-3.5-3.5M16 20l3.5-3.5"/>',
    abzeichen: '<circle cx="12" cy="14.5" r="5"/><path d="M9.3 10.2L6 3h4l2 4 2-4h4l-3.3 7.2"/>',
    anleitung: '<path d="M12 7v13M12 7C10 5.5 7 5 4 5.5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-13c-3-.5-6 0-8 1.5z"/>',
    steigern: '<path d="M4 17l5-5 4 4 7-8M15 8h5v5"/>',
    // Für die Karte "Diese Woche" auf Home (seit Version 138): Balken, Pfeil, Gewicht und Hantel (wie in der Tab-Leiste)
    balken: '<path d="M6 20v-7M12 20V5M18 20v-10"/>',
    weiter: '<path d="M10 6l6 6-6 6"/>',
    gewicht: '<path d="M9 8a3 3 0 0 1 6 0M6.5 8h11l2 12h-15z"/>',
    hantel: '<path d="M3 9v6M6 6v12M18 6v12M21 9v6M6 12h12"/>',
    // Look Korund (seit Version 143): Rekord-Zeile auf Home
    pokal: '<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20h7M10 17h4"/>',
    // Look Korund (seit Version 143): Symbole der Abzeichen
    puls: '<path d="M3 9.5h4l2-4 4 9 2-5h6"/>',
    wolke: '<path d="M7 18.5h10.5a4 4 0 0 0 .4-7.98A6 6 0 0 0 6.2 9.6a4.45 4.45 0 0 0 .8 8.9z"/>',
    flamme: '<path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2.2 1.2-3.6 2.5-4.8.3 1.8 1.2 2.8 2.3 3.1C11.2 9 11 6 12 3z"/>',
    kalender: '<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M9 3v4M15 3v4"/>',
    blitz: '<path d="M13 3 5 13h6l-1 8 8-10h-6z"/>',
    stern: '<path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-2.9-5.4 2.9 1.1-6L3.2 9.4l6.1-.8z"/>',
    haken: '<path d="M5 12.5l4.5 4.5L19 7.5"/>'
  };

  // Das Symbol eines Abzeichens im Look Korund: nach Gruppe, offene höhere Stufen mit Stern statt Pokal
  function abzeichenSymbol(a) {
    const kat = abzeichenKategorie(a);
    if (kat === "konstanz") {
      return a.gruppe === "workouts" ? "kalender" : "flamme";
    }
    if (kat === "volumen") {
      return "hantel";
    }
    if (kat === "rekorde") {
      return a.stufe === 3 ? "stern" : "pokal";
    }
    if (kat === "kraft") {
      return a.erreicht ? "blitz" : "schloss";
    }
    return "haken";
  }

  // Die Zeichnung eines Icons als SVG-Text
  function iconSvg(name) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[name] + "</svg>";
  }

  // Setzt in jedes Element mit data-icon die passende Zeichnung
  function iconsEinsetzen() {
    const stellen = document.querySelectorAll("[data-icon]");
    for (let i = 0; i < stellen.length; i++) {
      stellen[i].innerHTML = iconSvg(stellen[i].getAttribute("data-icon"));
    }
  }

  // ---------- Design: Dunkel, Hell oder System ----------

  const DESIGN_AUSWAHL = [
    { id: "system", schluessel: "design.system" },
    { id: "dunkel", schluessel: "design.dunkel" },
    { id: "hell", schluessel: "design.hell" }
  ];

  // Das gewählte Design: "dunkel", "hell" oder "system" (die App folgt dem Gerät)
  function design() {
    if (einstellungen.design === "dunkel" || einstellungen.design === "hell") {
      return einstellungen.design;
    }
    return "system";
  }

  // Stellt die Farben auf das gewählte Design. Das Attribut data-design am <html> wertet die style.css aus.
  // Bei "System" fehlt es, dann entscheidet das Gerät. Dazu passt die Farbe der Browser- und Statusleiste.
  function designAnwenden() {
    const wahl = design();
    if (wahl === "system") {
      document.documentElement.removeAttribute("data-design");
    } else {
      document.documentElement.setAttribute("data-design", wahl);
    }

    // Es gibt zwei Angaben: eine für ein helles Gerät, eine für ein dunkles. Ist ein Design fest gewählt,
    // bekommen beide dessen Farbe.
    let beiHell = "#F2F2F7";
    let beiDunkel = "#000000";
    if (wahl === "dunkel") {
      beiHell = beiDunkel;
    }
    if (wahl === "hell") {
      beiDunkel = beiHell;
    }
    document.getElementById("farbe-hell").setAttribute("content", beiHell);
    document.getElementById("farbe-dunkel").setAttribute("content", beiDunkel);
  }

  // Einstellungen: der Umschalter für das Design
  function designAnzeigen() {
    umschalterBauen(document.getElementById("design-auswahl"), DESIGN_AUSWAHL, design(), designSetzen);
  }

  function designSetzen(neu) {
    if (neu === "dunkel" || neu === "hell") {
      einstellungen.design = neu;
    } else {
      delete einstellungen.design;
    }
    einstellungenSpeichern();
    designAnwenden();
    designAnzeigen();
  }

  // ---------- Stil: Klassisch oder Glass ----------

  const STIL_AUSWAHL = [
    { id: "klassisch", schluessel: "stil.klassisch" },
    { id: "glass", schluessel: "stil.glass" }
  ];

  // Der gewählte Stil: "klassisch" oder "glass". Gespeichert werden beide Werte, ohne Eintrag gilt "glass".
  function stil() {
    if (einstellungen.stil === "klassisch") {
      return "klassisch";
    }
    return "glass";
  }

  // Schaltet den Glass-Look ein oder aus. Das Attribut data-stil am <html> wertet die glass.css aus.
  function stilAnwenden() {
    if (stil() === "glass") {
      document.documentElement.setAttribute("data-stil", "glass");
    } else {
      document.documentElement.removeAttribute("data-stil");
    }
  }

  // Einstellungen: der Umschalter für den Stil
  function stilAnzeigen() {
    umschalterBauen(document.getElementById("stil-auswahl"), STIL_AUSWAHL, stil(), stilSetzen);
  }

  function stilSetzen(neu) {
    if (neu === "klassisch") {
      einstellungen.stil = "klassisch";
    } else {
      einstellungen.stil = "glass";
    }
    einstellungenSpeichern();
    stilAnwenden();
    stilAnzeigen();
    paletteAnzeigen();
    farbweltAnzeigen();
  }

  // ---------- Akzentfarbe ----------

  // Die wählbaren Akzentfarben. "farbe" ist der Ton des Punkts in der Auswahl, er ist in jedem Design gleich.
  const AKZENT_AUSWAHL = [
    { id: "blau", schluessel: "akzent.blau", farbe: "#4DA3FF" },
    { id: "limette", schluessel: "akzent.limette", farbe: "#C6F135" },
    { id: "rot", schluessel: "akzent.rot", farbe: "#FF7070" },
    { id: "pink", schluessel: "akzent.pink", farbe: "#FF5FA8" },
    { id: "lila", schluessel: "akzent.lila", farbe: "#A98BFF" }
  ];

  // Die gewählte Akzentfarbe. Ohne Eintrag oder bei einem unbekannten Wert gilt "blau" (seit Version 121, vorher "limette").
  function akzent() {
    for (let i = 0; i < AKZENT_AUSWAHL.length; i++) {
      if (AKZENT_AUSWAHL[i].id === einstellungen.akzent) {
        return einstellungen.akzent;
      }
    }
    return "blau";
  }

  // Seit Version 121 ist Blau der Standard. Wer die App schon vorher hatte und nie eine Farbe gewählt hat, behält Limette:
  // Beim ersten Start mit Version 121 wird dafür einmal akzent: "limette" gespeichert. Neue Installationen bekommen "blau".
  // Danach steht immer ein Wert da und nichts ändert sich mehr. Nur die Einstellungen, an den Trainingsdaten nichts.
  function akzentUebernehmen() {
    if (einstellungen.akzent === undefined) {
      einstellungen.akzent = tourAppNeu ? "blau" : "limette";
      einstellungenSpeichern();
    }
  }

  // Färbt die App. Das Attribut data-akzent am <html> wertet die style.css aus, bei Blau fehlt es.
  function akzentAnwenden() {
    if (akzent() === "blau") {
      document.documentElement.removeAttribute("data-akzent");
    } else {
      document.documentElement.setAttribute("data-akzent", akzent());
    }
  }

  // Einstellungen: die Reihe aus Farbpunkten, der gewählte hat einen Ring
  function akzentAnzeigen() {
    const behaelter = document.getElementById("akzent-auswahl");
    behaelter.innerHTML = "";
    for (let i = 0; i < AKZENT_AUSWAHL.length; i++) {
      const btn = element("button", "akzent-punkt");
      btn.style.setProperty("--punkt", AKZENT_AUSWAHL[i].farbe);
      btn.setAttribute("aria-label", txt(AKZENT_AUSWAHL[i].schluessel));
      btn.setAttribute("aria-pressed", String(AKZENT_AUSWAHL[i].id === akzent()));
      btn.onclick = function () {
        akzentSetzen(AKZENT_AUSWAHL[i].id);
      };
      behaelter.appendChild(btn);
    }
  }

  function akzentSetzen(neu) {
    einstellungen.akzent = neu;
    einstellungenSpeichern();
    akzentAnwenden();
    akzentAnzeigen();
  }

  // ---------- Look: Korund, Schwarz, Graphit oder Mockup ----------

  // "korund" ist seit Version 141 der Standard. Die alten Looks bleiben wählbar (das Design bis Version 140 ist "Schwarz").
  const PALETTE_AUSWAHL = [
    { id: "korund", schluessel: "palette.korund" },
    { id: "schwarz", schluessel: "palette.schwarz" },
    { id: "graphit", schluessel: "palette.graphit" },
    { id: "mockup", schluessel: "palette.mockup" }
  ];

  // Der gewählte Look. Ohne Eintrag gilt seit Version 141 "korund", bei einem unbekannten Wert "schwarz".
  function palette() {
    if (einstellungen.palette === undefined || einstellungen.palette === "korund") {
      return "korund";
    }
    if (einstellungen.palette === "graphit" || einstellungen.palette === "mockup") {
      return einstellungen.palette;
    }
    return "schwarz";
  }

  // Das Attribut data-palette am <html> wertet die glass.css aus, bei Schwarz fehlt es
  function paletteAnwenden() {
    if (palette() === "schwarz") {
      document.documentElement.removeAttribute("data-palette");
    } else {
      document.documentElement.setAttribute("data-palette", palette());
    }
  }

  // Einstellungen: der Umschalter für den Look. In Klassisch wirkt er nicht und ist deshalb gesperrt.
  function paletteAnzeigen() {
    const behaelter = document.getElementById("palette-auswahl");
    umschalterBauen(behaelter, PALETTE_AUSWAHL, palette(), paletteSetzen);
    behaelter.querySelectorAll("button").forEach(function (btn) {
      btn.disabled = stil() === "klassisch";
    });
  }

  function paletteSetzen(neu) {
    einstellungen.palette = neu;
    einstellungenSpeichern();
    paletteAnwenden();
    paletteAnzeigen();
    farbweltAnzeigen();
  }

  // ---------- Farbwelt (seit Version 141, nur im Look Korund) ----------

  // Die fünf Farbwelten. "farben" sind die drei Töne des K (Volumen, Workouts, Wdh.) für die Punkte in der Auswahl.
  // "rang" ist der Kraft-Rang (1 Starter bis 6 Legende), ab dem die Farbwelt frei ist, wenn FARBWELTEN_PER_RANG an ist.
  const FARBWELT_AUSWAHL = [
    { id: "blau", schluessel: "farbwelt.blau", farben: ["#71B5FF", "#6FD8E0", "#8E9BFF"], rang: 0 },
    { id: "volt", schluessel: "farbwelt.volt", farben: ["#C6F135", "#45E09A", "#F2E04A"], rang: 2 },
    { id: "puls", schluessel: "farbwelt.puls", farben: ["#FF4D5E", "#FF7A45", "#FF5FA8"], rang: 3 },
    { id: "aurora", schluessel: "farbwelt.aurora", farben: ["#5B8CFF", "#8F7CFF", "#B57BFF"], rang: 4 },
    { id: "gold", schluessel: "farbwelt.gold", farben: ["#E3B866", "#D99A5B", "#E6D3AE"], rang: 5 }
  ];

  // Schalter: Schaltet der Kraft-Rang die Farbwelten frei? Aus (false) sind alle fünf sofort wählbar.
  // An (true) zählt der höchste je erreichte Gesamt-Kraftrang (hoechsterGesamtRP im Merker der Ränge): Einmal frei bleibt frei.
  const FARBWELTEN_PER_RANG = false;

  // Ist eine Farbwelt wählbar?
  function farbweltFrei(welt) {
    if (!FARBWELTEN_PER_RANG || welt.rang <= 1) {
      return true;
    }
    const hoechster = rangMerkerBereinigen(einstellungen.rangMerker).hoechsterGesamtRP;
    return Math.floor(hoechster / RP_JE_RANG) + 1 >= welt.rang;
  }

  // Die gewählte Farbwelt. Ohne Eintrag, bei einem unbekannten Wert oder einer (noch) gesperrten gilt "blau".
  function farbwelt() {
    for (let i = 0; i < FARBWELT_AUSWAHL.length; i++) {
      if (FARBWELT_AUSWAHL[i].id === einstellungen.farbwelt && farbweltFrei(FARBWELT_AUSWAHL[i])) {
        return einstellungen.farbwelt;
      }
    }
    return "blau";
  }

  // Das Attribut data-farbwelt am <html> wertet die korund.css aus. Es steht immer da, wirkt aber nur im Look Korund.
  function farbweltAnwenden() {
    document.documentElement.setAttribute("data-farbwelt", farbwelt());
  }

  // Einstellungen: je Farbwelt eine Zeile mit kleinem K, Name und drei Farbpunkten. Gesperrt, wenn der Look nicht Korund ist.
  function farbweltAnzeigen() {
    const behaelter = document.getElementById("farbwelt-auswahl");
    behaelter.innerHTML = "";
    const aus = stil() === "klassisch" || palette() !== "korund";
    for (let i = 0; i < FARBWELT_AUSWAHL.length; i++) {
      const welt = FARBWELT_AUSWAHL[i];
      const zeile = element("button", "einst-zeile farbwelt-zeile");
      zeile.setAttribute("data-farbwelt-zeile", welt.id);
      zeile.setAttribute("aria-pressed", String(welt.id === farbwelt()));
      const frei = farbweltFrei(welt);
      zeile.disabled = aus || !frei;
      const k = element("span", "farbwelt-k");
      k.innerHTML = kSvg({ stamm: 1, oben: 1, unten: 1 }, welt.farben);
      zeile.appendChild(k);
      const name = element("span", "einst-titel", txt(welt.schluessel));
      if (!frei) {
        name.appendChild(element("small", "farbwelt-sperre", txt("farbwelt.abRang", { rang: txt("rang.name." + welt.rang) })));
      }
      zeile.appendChild(name);
      const punkte = element("span", "farbwelt-punkte");
      for (let j = 0; j < 3; j++) {
        const punkt = element("i", "");
        punkt.style.background = welt.farben[j];
        punkte.appendChild(punkt);
      }
      zeile.appendChild(punkte);
      zeile.onclick = function () {
        farbweltSetzen(welt.id);
      };
      behaelter.appendChild(zeile);
    }
  }

  function farbweltSetzen(neu) {
    einstellungen.farbwelt = neu;
    einstellungenSpeichern();
    farbweltAnwenden();
    farbweltAnzeigen();
  }

  // ---------- Das Korund-K als Fortschritt (seit Version 141) ----------

  // Die drei Teile des Logos (viewBox 0 0 130 131, wie icons/korund-mark-mono-weiss.svg). Jeder Teil füllt sich entlang
  // seiner Achse von a nach b: der Stamm (Volumen) von unten nach oben, die Arme (Workouts oben, Wdh. unten) vom Stamm nach außen.
  const K_TEILE = [
    { art: "stamm", d: "M0 3L32 3L32 97L0 129Z", a: [16, 131], b: [16, 2] },
    { art: "oben", d: "M90 0L130 0L41 89L41 49Z", a: [38, 72], b: [118, -8] },
    { art: "unten", d: "M77.62 69.38L130 131L91 131L56.54 90.46Z", a: [60, 72], b: [118, 140] }
  ];
  let kZaehler = 0;

  // Die Ecken des Bands, das einen Teil bis zum Anteil (0 bis 1) füllt: ein breites Rechteck quer zur Achse von a nach b
  function kBand(t, anteil) {
    const dx = t.b[0] - t.a[0];
    const dy = t.b[1] - t.a[1];
    const laenge = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / laenge;
    const uy = dy / laenge;
    const weit = 300;
    const px = t.a[0] + dx * anteil;
    const py = t.a[1] + dy * anteil;
    const sx = t.a[0] - ux * weit;
    const sy = t.a[1] - uy * weit;
    return [[sx - uy * weit, sy + ux * weit], [px - uy * weit, py + ux * weit], [px + uy * weit, py - ux * weit], [sx + uy * weit, sy - ux * weit]].map(function (p) {
      return p[0].toFixed(1) + "," + p[1].toFixed(1);
    }).join(" ");
  }

  // Baut das K als SVG. anteile: { stamm, oben, unten } je 0 bis 1. farben: optional drei feste Töne (für die Auswahl),
  // sonst nehmen die Teile die Farben der Farbwelt aus der korund.css (Klassen k-stamm, k-oben, k-unten).
  // Jedes Band trägt seinen Ziel-Anteil in data-anteil, damit kFuellen es von 0 aus füllen kann.
  function kSvg(anteile, farben) {
    const id = "k" + (++kZaehler);
    let svg = '<svg class="korund-k" viewBox="-4 -4 138 139" aria-hidden="true"><defs>';
    let flaechen = "";
    let spuren = "";
    for (let i = 0; i < K_TEILE.length; i++) {
      const t = K_TEILE[i];
      const anteil = Math.max(0, Math.min(1, anteile[t.art] || 0));
      svg += '<clipPath id="' + id + t.art + '"><polygon data-teil="' + i + '" data-anteil="' + anteil + '" points="' + kBand(t, anteil) + '"/></clipPath>';
      const fuellung = farben ? ' style="fill:' + farben[i] + '"' : "";
      spuren += '<path class="k-spur" d="' + t.d + '"/>';
      flaechen += '<g clip-path="url(#' + id + t.art + ')"><path class="k-teil k-' + t.art + '" d="' + t.d + '"' + fuellung + '/></g>';
    }
    return svg + "</defs>" + spuren + flaechen + "</svg>";
  }

  // Lässt die Teile eines K in 0,8 s von leer auf ihren Anteil wachsen (ease-out). Mit "Bewegung reduzieren" sofort.
  function kFuellen(behaelter) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const baender = behaelter.querySelectorAll("polygon[data-anteil]");
    const start = performance.now();
    function schritt(jetzt) {
      const zeit = Math.min(1, (jetzt - start) / 800);
      const weg = 1 - Math.pow(1 - zeit, 3);
      baender.forEach(function (band) {
        band.setAttribute("points", kBand(K_TEILE[Number(band.getAttribute("data-teil"))], Number(band.getAttribute("data-anteil")) * weg));
      });
      if (zeit < 1) {
        requestAnimationFrame(schritt);
      }
    }
    baender.forEach(function (band) {
      band.setAttribute("points", kBand(K_TEILE[Number(band.getAttribute("data-teil"))], 0));
    });
    requestAnimationFrame(schritt);
  }

  // ---------- Profil: Name und Benutzername ----------

  // Macht aus einer Eingabe einen Benutzernamen: ohne Leerzeichen am Rand, ohne @ davor, kleingeschrieben
  function benutzerLesen(text) {
    return String(text).trim().replace(/^@/, "").toLowerCase();
  }

  // Die Länge eines Textes in Zeichen. Ein Emoji zählt als eins.
  function zeichenAnzahl(text) {
    return Array.from(text).length;
  }

  // Prüft einen Namen. Gibt die Fehlermeldung zurück, ohne Fehler einen leeren Text.
  function nameFehler(name) {
    if (zeichenAnzahl(name) > NAME_MAX) {
      return txt("profil.nameZuLang", { max: NAME_MAX });
    }
    return "";
  }

  // Dasselbe für einen Benutzernamen. Leer ist erlaubt, dann zeigt das Profil keinen.
  function benutzerFehler(benutzername) {
    if (benutzername === "") {
      return "";
    }
    if (!/^[a-z0-9._]+$/.test(benutzername)) {
      return txt("profil.benutzerZeichen");
    }
    if (benutzername.length < BENUTZER_MIN || benutzername.length > BENUTZER_MAX) {
      return txt("profil.benutzerLaenge", { min: BENUTZER_MIN, max: BENUTZER_MAX });
    }
    return "";
  }

  // Ist das ein gültiger Geburtstag? Er steht als "JJJJ-MM-TT" da, ist ein echter Kalendertag
  // und liegt zwischen GEBURTSTAG_MIN und heute.
  function geburtstagGueltig(text) {
    if (typeof text !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(text)) {
      return false;
    }
    const teile = text.split("-").map(Number);
    const datum = new Date(teile[0], teile[1] - 1, teile[2]);
    // Aus dem 30. Februar macht der Browser den 2. März: Dann stimmt der Text nicht mehr
    if (datumFeldText(datum) !== text) {
      return false;
    }
    return text >= GEBURTSTAG_MIN && text <= datumFeldText(new Date());
  }

  // Das Alter in ganzen Jahren an einem Tag (heute, wenn keiner angegeben ist). Am Geburtstag selbst zählt
  // das neue Jahr schon. Wer am 29. Februar geboren ist, wird in Jahren ohne Schalttag am 1. März älter.
  // Ohne gültigen Geburtstag: null.
  function alterAus(geburtstag, am) {
    if (!geburtstagGueltig(geburtstag)) {
      return null;
    }
    const heute = am || new Date();
    const teile = geburtstag.split("-").map(Number);
    let jahre = heute.getFullYear() - teile[0];
    const monat = heute.getMonth() + 1;
    if (monat < teile[1] || (monat === teile[1] && heute.getDate() < teile[2])) {
      jahre--;
    }
    return jahre;
  }

  // Die Angaben zur Person für den Coach und das Rang-System, alle von einer Stelle:
  // geschlecht: "m", "w", "d" oder "" (keine Angabe)
  // alter:      in ganzen Jahren, aus dem Geburtstag berechnet, null ohne Geburtstag
  // aktivitaet: 1 bis AKTIVITAET_STUFEN, 0 heißt: nicht gesetzt
  function profilDaten() {
    return { geschlecht: profil.geschlecht, alter: alterAus(profil.geburtstag), aktivitaet: profil.aktivitaet };
  }

  // Macht aus gespeicherten oder importierten Daten ein sauberes Profil. Was fehlt oder ungültig ist, bleibt leer.
  function profilBereinigen(p) {
    const sauber = { name: "", benutzername: "", geschlecht: "", geburtstag: "", aktivitaet: 0 };
    if (!p || typeof p !== "object") {
      return sauber;
    }
    if (GESCHLECHTER.indexOf(p.geschlecht) !== -1) {
      sauber.geschlecht = p.geschlecht;
    }
    if (geburtstagGueltig(p.geburtstag)) {
      sauber.geburtstag = p.geburtstag;
    }
    if (Number.isInteger(p.aktivitaet) && p.aktivitaet >= 1 && p.aktivitaet <= AKTIVITAET_STUFEN) {
      sauber.aktivitaet = p.aktivitaet;
    }
    if (typeof p.name === "string" && nameFehler(nameSaeubern(p.name)) === "") {
      sauber.name = nameSaeubern(p.name);
    }
    if (typeof p.benutzername === "string" && benutzerFehler(benutzerLesen(p.benutzername)) === "") {
      sauber.benutzername = benutzerLesen(p.benutzername);
    }
    return sauber;
  }

  function profilSichern() {
    sicherSpeichern("profil", profil);
  }

  // Übernimmt das Profil aus einem Backup. Beim Ersetzen gilt, was im Backup steht.
  // Beim Ergänzen füllt das Backup nur, was hier noch leer ist. Ein leeres Feld im Backup ändert nie etwas.
  // Geschlecht, Geburtstag und Aktivitätsniveau gibt es erst ab Backup-Version 10.
  function profilUebernehmen(neu, art) {
    const felder = ["name", "benutzername", "geschlecht", "geburtstag", "aktivitaet"];
    for (let i = 0; i < felder.length; i++) {
      if (neu[felder[i]] && (art === "ersetzen" || !profil[felder[i]])) {
        profil[felder[i]] = neu[felder[i]];
      }
    }
    profilSichern();
  }

  // Füllt ein Auswahlfeld: zuerst die leere Möglichkeit, dann die übrigen als { wert, text }
  function auswahlFuellen(feld, leerText, liste, gewaehlt) {
    feld.innerHTML = "";
    const leer = element("option", "", leerText);
    leer.value = "";
    feld.appendChild(leer);
    for (let i = 0; i < liste.length; i++) {
      const option = element("option", "", liste[i].text);
      option.value = liste[i].wert;
      feld.appendChild(option);
    }
    feld.value = gewaehlt;
  }

  // Einstellungen: füllt die Felder von "Profil bearbeiten" mit dem gespeicherten Profil
  function profilFormFuellen() {
    document.getElementById("profil-feld-name").value = profil.name;
    document.getElementById("profil-feld-benutzer").value = profil.benutzername;

    auswahlFuellen(document.getElementById("profil-feld-geschlecht"), txt("profil.keineAngabe"), GESCHLECHTER.map(function (g) {
      return { wert: g, text: txt("profil.geschlecht." + g) };
    }), profil.geschlecht);

    const geburt = document.getElementById("profil-feld-geburt");
    geburt.min = GEBURTSTAG_MIN;
    geburt.max = datumFeldText(new Date());
    geburt.value = profil.geburtstag;

    const stufen = [];
    for (let i = 1; i <= AKTIVITAET_STUFEN; i++) {
      stufen.push({ wert: String(i), text: txt("profil.aktivitaet." + i) });
    }
    auswahlFuellen(document.getElementById("profil-feld-aktivitaet"), txt("profil.nichtGesetzt"), stufen, profil.aktivitaet ? String(profil.aktivitaet) : "");

    profilFelderGeaendert();
  }

  // Beim Tippen und Wählen verschwinden die Fehlermeldungen wieder. Unter dem Geburtstag steht das Alter,
  // unter dem Aktivitätsniveau die Erklärung der gewählten Stufe.
  function profilFelderGeaendert() {
    document.getElementById("profil-name-meldung").textContent = "";
    document.getElementById("profil-benutzer-meldung").textContent = "";
    document.getElementById("profil-geburt-meldung").textContent = "";

    const geburt = document.getElementById("profil-feld-geburt").value;
    const alter = alterAus(geburt);
    let alterText = "";
    if (alter !== null) {
      alterText = txtAnzahl("anzahl.jahre", alter);
    }
    document.getElementById("profil-alter").textContent = alterText;
    document.getElementById("profil-geburt-zeile").classList.toggle("versteckt", geburt === "");

    const stufe = document.getElementById("profil-feld-aktivitaet").value;
    let erklaerung = "";
    if (stufe !== "") {
      erklaerung = txt("profil.aktivitaetText." + stufe);
    }
    document.getElementById("profil-aktivitaet-text").textContent = erklaerung;
  }

  // Der Knopf "Löschen" unter dem Geburtstag leert das Feld wieder
  function profilGeburtLeeren() {
    document.getElementById("profil-feld-geburt").value = "";
    profilFelderGeaendert();
  }

  // Prüft die Felder und speichert das Profil. Bei einem Fehler steht die Meldung unter dem Feld.
  function profilSpeichern() {
    const name = nameSaeubern(document.getElementById("profil-feld-name").value);
    const benutzername = benutzerLesen(document.getElementById("profil-feld-benutzer").value);
    const geburtFeld = document.getElementById("profil-feld-geburt");
    const geburtstag = geburtFeld.value;
    // Ein halb ausgefülltes Datum liefert einen leeren Wert, gilt für den Browser aber als ungültig
    let geburtFehler = "";
    if ((geburtstag !== "" && !geburtstagGueltig(geburtstag)) || (geburtFeld.validity && geburtFeld.validity.badInput)) {
      geburtFehler = txt("profil.geburtFehler", { jahr: GEBURTSTAG_MIN.slice(0, 4) });
    }
    document.getElementById("profil-name-meldung").textContent = nameFehler(name);
    document.getElementById("profil-benutzer-meldung").textContent = benutzerFehler(benutzername);
    document.getElementById("profil-geburt-meldung").textContent = geburtFehler;
    if (nameFehler(name) !== "" || benutzerFehler(benutzername) !== "" || geburtFehler !== "") {
      return;
    }

    profil = profilBereinigen({
      name: name,
      benutzername: benutzername,
      geschlecht: document.getElementById("profil-feld-geschlecht").value,
      geburtstag: geburtstag,
      aktivitaet: Number(document.getElementById("profil-feld-aktivitaet").value)
    });
    profilSichern();
    einstLinks();
  }

  // ---------- Profil: Trainingstage ----------

  // Die Trainingstage, die das Profil gerade zeigt (Schlüssel wie bei tagSchluessel)
  let profilTage = {};

  // Alle Trainingstage: zu jedem Kalendertag sein Datum, seine Einträge und die Summen
  // der Sätze, der Wiederholungen und des bewegten Gewichts in kg
  function trainingstage() {
    const tage = {};
    for (let i = 0; i < eintraege.length; i++) {
      const e = eintraege[i];
      if (!hatDatum(e)) {
        continue;
      }
      const datum = new Date(e.datum);
      const schluessel = tagSchluessel(datum);
      if (!tage[schluessel]) {
        tage[schluessel] = {
          schluessel: schluessel,
          datum: new Date(datum.getFullYear(), datum.getMonth(), datum.getDate()),
          eintraege: [],
          saetze: 0,
          wdh: 0,
          volumen: 0
        };
      }
      const tag = tage[schluessel];
      const saetze = arbeitsSaetzeVon(e);
      tag.eintraege.push(e);
      tag.saetze += saetze.length;
      for (let j = 0; j < saetze.length; j++) {
        tag.wdh += saetze[j].wdh;
      }
      tag.volumen += eintragVolumen(e, 0);
    }
    return tage;
  }

  // Die Zahlen einer Woche (Montag bis Sonntag) aus den Trainingstagen: Workouts, Wiederholungen und
  // bewegtes Gewicht in kg. Home und Profil > Statistik rechnen beide hier, damit überall dasselbe steht.
  function wochenZahlen(tage, montag) {
    const von = tagSchluessel(montag);
    const bis = tagSchluessel(new Date(montag.getFullYear(), montag.getMonth(), montag.getDate() + 6));
    const zahlen = { workouts: 0, wdh: 0, volumen: 0 };
    Object.keys(tage).forEach(function (schluessel) {
      if (Number(schluessel) >= von && Number(schluessel) <= bis) {
        zahlen.workouts++;
        zahlen.wdh += tage[schluessel].wdh;
        zahlen.volumen += tage[schluessel].volumen;
      }
    });
    return zahlen;
  }

  // Die Zahlen einer Woche zum Anzeigen: Workouts und Wiederholungen nebeneinander, das Volumen darunter
  function wochenZahlenFeld(zahlen) {
    const feld = element("div", "home-zahlen profil-zahlen ohne-abstand");
    feld.appendChild(homeZahl(zahlen.workouts, txt("profil.workouts")));
    feld.appendChild(homeZahl(zahlen.wdh.toLocaleString(gebiet()), txt("wiederholungen")));
    const volumen = homeZahl(volumenText(zahlen.volumen), txt("verlauf.volumen"));
    volumen.classList.add("breit");
    feld.appendChild(volumen);
    return feld;
  }

  // Ein Ring: die Spur und darüber der Fortschritt, der oben beginnt und im Uhrzeigersinn läuft. anteil wird bei 1 gekappt.
  // Er zeichnet in 100 × 100 Einheiten, seine Größe kommt aus der style.css. So ist ein großer Ring derselbe Ring wie
  // ein kleiner, nur größer (seit Version 138), und beim Tausch gleitet er nur. Beim Zeigen füllt er sich von 0 auf den Wert
  // (Animation ring-fuellen in der style.css, ab --ring-leer).
  function ringSvg(anteil, art) {
    const staerke = 11;
    const r = (100 - staerke) / 2;
    const umfang = 2 * Math.PI * r;
    const kreis = '<circle cx="50" cy="50" r="' + r + '" stroke-width="' + staerke + '"';
    let svg = '<svg class="wochen-ring" viewBox="0 0 100 100" aria-hidden="true">' + kreis + ' class="ring-spur"/>';
    if (anteil > 0) {
      svg += kreis + ' class="ring-wert ' + art + '" transform="rotate(-90 50 50)" style="stroke-dasharray: ' + umfang + "px; stroke-dashoffset: "
        + umfang * (1 - Math.min(1, anteil)) + "px; --ring-leer: " + umfang + 'px"/>';
    }
    return svg + "</svg>";
  }

  // Welcher Ring auf Home groß ist (Stelle 0) und in welcher Reihenfolge die zwei kleinen stehen (seit Version 138).
  // Nur für diese Sitzung, nie im Speicher: Beim Start ist das Volumen groß. Der Wochenwechsel behält die Wahl.
  let wochenReihe = ["volumen", "workouts", "wdh"];
  // Läuft gerade ein Tausch? Solange zählt kein weiterer Tipp.
  let wochenTauschLaeuft = false;

  // Tauscht den großen Ring (Stelle 0) mit dem kleinen an der Stelle index (1 oder 2). Gibt eine neue Reihe zurück.
  function wochenReiheTauschen(reihe, index) {
    const neu = reihe.slice();
    neu[0] = reihe[index];
    neu[index] = reihe[0];
    return neu;
  }

  // Alles, was die drei Ringe zeigen: Wert und Ziel in der gewählten Einheit, Texte, Name und Icon.
  // Das Volumen ist gerundet wie in volumenText, sein Ziel steht in kg und wird in lbs auf volle 1.000 gerundet.
  function wochenRingDaten(zahlen) {
    const lbs = einheit() === "lbs";
    const daten = {
      volumen: {
        wert: lbs ? Math.round(ausKg(zahlen.volumen)) : zahlen.volumen,
        ziel: lbs ? Math.round(ausKg(WOCHEN_ZIELE.volumen) / 1000) * 1000 : WOCHEN_ZIELE.volumen,
        name: txt("verlauf.volumen"), langName: txt("verlauf.volumen"), einheit: einheit(), icon: "gewicht"
      },
      workouts: { wert: zahlen.workouts, ziel: WOCHEN_ZIELE.workouts, name: txt("profil.workouts"), langName: txt("profil.workouts"), einheit: txt("profil.workouts"), icon: "person" },
      wdh: { wert: zahlen.wdh, ziel: WOCHEN_ZIELE.wdh, name: txt("wdh"), langName: txt("wiederholungen"), einheit: txt("wdh"), icon: "hantel" }
    };
    Object.keys(daten).forEach(function (art) {
      const d = daten[art];
      d.art = art;
      d.erreicht = d.wert >= d.ziel;
      d.wertText = d.wert.toLocaleString(gebiet());
      // Unter dem Wert im Ring: "von 5" oder "Ziel erreicht"
      d.von = d.erreicht ? txt("home.zielErreicht") : txt("home.zielVon", { n: d.ziel.toLocaleString(gebiet()) });
      // Die zwei Zeilen rechts oben, wenn dieser Ring groß ist: "Ziel 15.000 kg" und "noch 3.245 kg" oder "erreicht"
      d.zielZeile = txt("home.ziel", { n: d.ziel.toLocaleString(gebiet()) + " " + d.einheit });
      d.restZeile = txt("home.zielErreichtKurz");
      if (!d.erreicht) {
        d.restZeile = txt("home.zielNoch", { n: (d.ziel - d.wert).toLocaleString(gebiet()) + (art === "volumen" ? " " + d.einheit : "") });
      }
    });
    return daten;
  }

  // Der Kreis eines Rings mit der Schrift in seiner Mitte. Groß: Name, Wert und Einheit bzw. "von 5". Klein: Wert und "von 5".
  function wochenKreis(d, gross) {
    const kreis = element("div", "wochen-kreis");
    kreis.innerHTML = ringSvg(d.wert / d.ziel, d.art);
    const innen = element("div", "wochen-ring-innen");
    if (gross) {
      innen.appendChild(element("div", "wochen-ring-titel", d.name));
      const wert = element("div", "wochen-ring-wert", d.wertText);
      // Lange Zahlen (ab "123.456") etwas kleiner, damit sie in den Ring passen
      wert.classList.toggle("lang", d.wertText.length > 6);
      innen.appendChild(wert);
      innen.appendChild(element("div", "wochen-ring-unter", d.art === "volumen" ? d.einheit : d.von));
    } else {
      const wert = element("div", "wochen-ring-zahl", d.wertText);
      wert.classList.toggle("lang", d.wertText.length > 3);
      wert.classList.toggle("sehr-lang", d.wertText.length > 5);
      innen.appendChild(wert);
      const von = element("div", "wochen-ring-von", d.von);
      von.classList.toggle("lang", d.von.length > 8);
      innen.appendChild(von);
    }
    kreis.appendChild(innen);
    return kreis;
  }

  // Home (seit Version 137, Aufbau seit Version 138): die Zahlen der gezeigten Woche als Ringe, gemessen an WOCHEN_ZIELE.
  // Kopf mit Symbol, Titel der Wochenleiste und Pfeil zur Statistik. Links der große Ring, rechts sein Ziel und die zwei kleinen.
  // Ein Tipp auf einen kleinen Ring tauscht ihn mit dem großen (wochenTauschen). Das Profil zeigt die Woche weiter mit wochenZahlenFeld.
  function wochenRingeFeld(zahlen, titel) {
    const daten = wochenRingDaten(zahlen);
    const feld = element("div", "wochen-ringe");

    const kopf = element("div", "wochen-karte-kopf");
    const symbol = element("span", "wochen-symbol icon");
    symbol.innerHTML = iconSvg("balken");
    kopf.appendChild(symbol);
    kopf.appendChild(element("div", "wochen-ringe-titel", titel));
    const pfeil = element("button", "wochen-pfeil icon");
    pfeil.innerHTML = iconSvg("weiter");
    pfeil.setAttribute("aria-label", txt("home.zurStatistik"));
    pfeil.onclick = function () {
      seiteZeigen("fortschritt");
    };
    kopf.appendChild(pfeil);
    feld.appendChild(kopf);

    const inhalt = element("div", "wochen-inhalt");
    const gross = daten[wochenReihe[0]];
    const links = element("div", "wochen-ring-gross");
    links.setAttribute("data-ring", gross.art);
    links.appendChild(wochenKreis(gross, true));
    inhalt.appendChild(links);

    const rechts = element("div", "wochen-rechts");
    const ziel = element("div", "wochen-ziel");
    ziel.appendChild(element("div", "", gross.zielZeile));
    ziel.appendChild(element("div", "", gross.restZeile));
    rechts.appendChild(ziel);
    rechts.appendChild(element("div", "wochen-ringe-linie"));
    const klein = element("div", "wochen-ringe-klein");
    for (let i = 1; i <= 2; i++) {
      const d = daten[wochenReihe[i]];
      const knopf = element("button", "wochen-ring-klein");
      knopf.setAttribute("data-ring", d.art);
      knopf.setAttribute("aria-label", txt("home.ringGross", { name: d.langName }));
      knopf.appendChild(wochenKreis(d, false));
      const name = element("div", "wochen-ring-name");
      name.innerHTML = iconSvg(d.icon);
      name.appendChild(element("span", "", d.name));
      knopf.appendChild(name);
      knopf.onclick = function () {
        wochenTauschen(feld, i, zahlen, titel);
      };
      klein.appendChild(knopf);
    }
    rechts.appendChild(klein);
    inhalt.appendChild(rechts);
    feld.appendChild(inhalt);
    feld.appendChild(wochenKFeld(daten));
    return feld;
  }

  // Look Korund (seit Version 141): statt der Ringe das Korund-K. Der Stamm zeigt das Volumen, der obere Arm die Workouts,
  // der untere Arm die Wiederholungen. Rechts die drei Zahlen, je mit einem kleinen K, in dem nur der passende Teil leuchtet.
  // Die korund.css zeigt diesen Teil nur im Look Korund und blendet dort die Ringe aus.
  function wochenKFeld(daten) {
    const feld = element("div", "wochen-k");
    const gross = element("div", "wochen-k-bild");
    gross.innerHTML = kSvg({ stamm: daten.volumen.wert / daten.volumen.ziel, oben: daten.workouts.wert / daten.workouts.ziel, unten: daten.wdh.wert / daten.wdh.ziel });
    feld.appendChild(gross);
    const liste = element("div", "wochen-k-zahlen");
    const teile = { volumen: "stamm", workouts: "oben", wdh: "unten" };
    ["volumen", "workouts", "wdh"].forEach(function (art) {
      const d = daten[art];
      const zeile = element("div", "wochen-k-zeile");
      const name = element("div", "wochen-k-name");
      const klein = element("span", "wochen-k-mini");
      const nur = {};
      nur[teile[art]] = 1;
      klein.innerHTML = kSvg(nur);
      name.appendChild(klein);
      name.appendChild(element("span", "", d.langName));
      zeile.appendChild(name);
      const wert = element("div", "wochen-k-wert", d.wertText);
      const ziel = element("small", "", " / " + d.ziel.toLocaleString(gebiet()) + (art === "volumen" ? " " + d.einheit : ""));
      wert.appendChild(ziel);
      zeile.appendChild(wert);
      liste.appendChild(zeile);
    });
    feld.appendChild(liste);
    requestAnimationFrame(function () {
      kFuellen(gross);
    });
    return feld;
  }

  // Ein Tipp auf den kleinen Ring an der Stelle index: Er tauscht den Platz mit dem großen. Die Karte wird neu gebaut,
  // ohne dass sich die Ringe neu füllen (Klasse "getauscht"), die Texte blenden ein. Dann gleiten die zwei Ringe von
  // ihrem alten Platz an den neuen und ändern dabei ihre Größe (FLIP: transform von alt nach neu, die style.css läuft zurück).
  // Mit "Bewegung reduzieren" kein Gleiten, nur das Einblenden.
  function wochenTauschen(feld, index, zahlen, titel) {
    if (wochenTauschLaeuft || !feld.parentNode) {
      return;
    }
    const arten = [wochenReihe[0], wochenReihe[index]];
    const vorher = arten.map(function (art) {
      return feld.querySelector('[data-ring="' + art + '"] .wochen-kreis').getBoundingClientRect();
    });
    wochenReihe = wochenReiheTauschen(wochenReihe, index);
    const neu = wochenRingeFeld(zahlen, titel);
    neu.classList.add("getauscht");
    feld.parentNode.replaceChild(neu, feld);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    wochenTauschLaeuft = true;
    const kreise = arten.map(function (art, i) {
      const kreis = neu.querySelector('[data-ring="' + art + '"] .wochen-kreis');
      const jetzt = kreis.getBoundingClientRect();
      kreis.style.transition = "none";
      kreis.style.transform = "translate(" + (vorher[i].left - jetzt.left) + "px, " + (vorher[i].top - jetzt.top) + "px) scale(" + vorher[i].width / jetzt.width + ")";
      return kreis;
    });
    // Erst zeichnen lassen, wo die Ringe vorher waren, dann gleiten sie an ihren Platz
    neu.getBoundingClientRect();
    kreise.forEach(function (kreis) {
      kreis.style.transition = "";
      kreis.style.transform = "";
    });
    setTimeout(function () {
      wochenTauschLaeuft = false;
    }, 450);
  }

  // Die Namen der Übungen eines Trainingstags, jede einmal
  function tagUebungen(tag) {
    const namen = [];
    for (let i = 0; i < tag.eintraege.length; i++) {
      const name = anzeigeName(tag.eintraege[i].uebung, tag.eintraege[i].uebungId);
      if (namen.indexOf(name) === -1) {
        namen.push(name);
      }
    }
    return namen;
  }

  // Die Namen der Routinen, aus denen die Einträge eines Trainingstags stammen, jede einmal
  function tagRoutinen(tag) {
    const namen = [];
    for (let i = 0; i < tag.eintraege.length; i++) {
      const name = tag.eintraege[i].routineName;
      if (name && namen.indexOf(name) === -1) {
        namen.push(name);
      }
    }
    return namen;
  }

  // Was an einem Tag trainiert wurde: die Routine, ohne Routine die ersten Übungen ("Bankdrücken, Rudern +3")
  function tagName(tag) {
    const routinen = tagRoutinen(tag);
    if (routinen.length > 0) {
      return routinen.join(" + ");
    }

    const uebungen = tagUebungen(tag);
    if (uebungen.length > 2) {
      return uebungen.slice(0, 2).join(", ") + " +" + (uebungen.length - 2);
    }
    return uebungen.join(", ");
  }

  // Wie viele Kalendertage ein gespeicherter Zeitpunkt her ist: 0 = heute, 1 = gestern.
  // Fehlt er oder ist er ungültig, kommt null zurück.
  function tageSeit(zeitpunkt) {
    if (!zeitpunkt || isNaN(new Date(zeitpunkt))) {
      return null;
    }
    const damals = new Date(zeitpunkt);
    const heute = new Date();
    const tagDamals = new Date(damals.getFullYear(), damals.getMonth(), damals.getDate());
    const tagHeute = new Date(heute.getFullYear(), heute.getMonth(), heute.getDate());
    return Math.max(0, Math.round((tagHeute - tagDamals) / 86400000));
  }

  // ---------- Profil: Seite ----------

  // Die drei Reiter unter der Profil-Karte
  const PROFIL_REITER = [
    { id: "verlauf", schluessel: "profil.reiter.verlauf" },
    { id: "statistik", schluessel: "fortschritt.statistik" },
    { id: "abzeichen", schluessel: "profil.reiter.abzeichen" }
  ];

  // Der gewählte Reiter und wie viele Trainingstage der Verlauf gerade zeigt
  let profilReiter = "verlauf";
  let verlaufGezeigt = VERLAUF_ANZAHL;

  // Baut die ganze Profil-Seite neu auf
  function profilAnzeigen() {
    profilTage = trainingstage();
    profilKarteAnzeigen();
    backupHinweisAnzeigen();
    rasterAnzeigen();
    profilReiterAnzeigen();
  }

  // Oben in der Karte: Avatar, Name, Benutzername und die drei Kennzahlen
  function profilKarteAnzeigen() {
    // Der Avatar zeigt den ersten Buchstaben des Namens, sonst des Benutzernamens. Ohne beides ein Symbol.
    const avatar = document.getElementById("profil-avatar");
    const anfang = Array.from(profil.name || profil.benutzername)[0];
    if (anfang) {
      avatar.textContent = anfang.toUpperCase();
    } else {
      avatar.innerHTML = iconSvg("person");
    }

    const name = document.getElementById("profil-name");
    name.textContent = profil.name || txt("profil.ohneName");
    name.classList.toggle("leise", profil.name === "");

    // Unter dem Namen: der Benutzername und, wenn der Geburtstag gesetzt ist, das Alter
    const angaben = [];
    if (profil.benutzername) {
      angaben.push("@" + profil.benutzername);
    }
    const alter = profilDaten().alter;
    if (alter !== null) {
      angaben.push(txtAnzahl("anzahl.jahre", alter));
    }
    document.getElementById("profil-benutzer").textContent = angaben.join(" · ");

    const zahlen = gesamtZahlen();
    const bereich = document.getElementById("profil-zahlen");
    bereich.innerHTML = "";
    // Look Korund: zwei Karten statt einer (die Klasse "karte" wandert an die Hüllen), sonst wie bisher eine
    const korund = lookKorund();
    document.getElementById("profil-karte").classList.toggle("karte", !korund);
    document.getElementById("profil-oben").classList.toggle("karte", korund);
    document.getElementById("profil-aktivitaet").classList.toggle("karte", korund);
    if (korund) {
      profilKarteKorund(zahlen, bereich);
      return;
    }
    bereich.appendChild(homeZahl(zahlen.workouts, txt("profil.workouts")));
    bereich.appendChild(homeZahl(zahlen.serie, txt("profil.serie")));
    const volumen = homeZahl(volumenText(zahlen.gewicht), txt("verlauf.volumen"));
    volumen.classList.add("breit");
    bereich.appendChild(volumen);
  }

  // ---------- Profil im Look Korund (seit Version 143): Rang und Serie unter dem Namen, Level, drei Zahlen ----------

  // XP: je Trainingstag 100, je Rekord 50, je bewegter Tonne 10. Nichts davon wird gespeichert, alles kommt aus den Einträgen.
  const XP_JE_TRAINING = 100;
  const XP_JE_REKORD = 50;
  const XP_JE_TONNE = 10;
  // Level L beginnt bei LEVEL_XP × L × (L − 1) / 2 XP: Level 2 bei 500, Level 3 bei 1.500, Level 4 bei 3.000 …
  const LEVEL_XP = 500;

  // Level und Fortschritt zu einer Zahl XP: { level, xp, von, bis }
  function levelStand(xp) {
    let level = 1;
    while (LEVEL_XP * (level + 1) * level / 2 <= xp) {
      level++;
    }
    return { level: level, xp: xp, von: LEVEL_XP * level * (level - 1) / 2, bis: LEVEL_XP * (level + 1) * level / 2 };
  }

  function profilKarteKorund(zahlen, bereich) {
    const stand = rangStand();
    const anzahlRekorde = rekorde(stand.uebungen.map(function (u) {
      return u.punkte;
    })).length;

    // Unter dem Namen: der Gesamt-Rang (lila) und die Serie (orange), nur was es gibt
    const namen = document.querySelector("#seite-profil .profil-namen");
    let info = namen.querySelector(".profil-korund-info");
    if (!info) {
      info = element("div", "profil-korund-info");
      namen.appendChild(info);
    }
    info.innerHTML = "";
    if (stand.kraft.gesamt !== null) {
      info.appendChild(element("span", "profil-rang", rangName(stand.kraft.gesamt)));
    }
    if (zahlen.serie > 0) {
      const serie = element("button", "profil-serie", txt("profil.serieKurz", { n: zahlen.serie }));
      serie.type = "button";
      serie.onclick = serieSeiteOeffnen;
      info.appendChild(serie);
    }

    // Level mit dünnem Balken
    const xp = zahlen.workouts * XP_JE_TRAINING + anzahlRekorde * XP_JE_REKORD + Math.floor(zahlen.gewicht / 1000) * XP_JE_TONNE;
    const l = levelStand(xp);
    let level = document.getElementById("profil-level");
    if (!level) {
      level = element("div", "profil-level");
      level.id = "profil-level";
      bereich.parentNode.insertBefore(level, bereich);
    }
    level.innerHTML = "";
    const kopf = element("div", "profil-level-kopf");
    kopf.appendChild(element("span", "", txt("profil.level", { n: l.level })));
    kopf.appendChild(element("span", "", txt("profil.xp", { xp: l.xp.toLocaleString(gebiet()), bis: l.bis.toLocaleString(gebiet()) })));
    level.appendChild(kopf);
    level.appendChild(rangBalken((l.xp - l.von) / (l.bis - l.von)));

    bereich.appendChild(homeZahl(zahlen.workouts, txt("profil.workouts")));
    bereich.appendChild(homeZahl(einheit() === "kg" ? (Math.round(zahlen.gewicht / 100) / 10).toLocaleString(gebiet()) + " t" : volumenText(zahlen.gewicht), txt("home.bewegt")));
    bereich.appendChild(homeZahl(anzahlRekorde, txt("statistik.rekorde")));
  }

  // ---------- Profil: Erinnerung ans Backup ----------

  // Zeigt über der Profil-Karte einen Hinweis, wenn es schon Trainings gibt und das letzte Backup zu lange her ist
  // (oder es noch keins gab). Wer ihn wegklickt, hat genauso lange Ruhe, wie ein Backup vorhält.
  function backupHinweisAnzeigen() {
    const bereich = document.getElementById("backup-hinweis");
    bereich.innerHTML = "";
    if (eintraege.length === 0) {
      return;
    }
    const seitBackup = tageSeit(gespeichertLesen("letztesBackup", null));
    if (seitBackup !== null && seitBackup <= BACKUP_ERINNERUNG_TAGE) {
      return;
    }
    const seitWeg = tageSeit(gespeichertLesen("backupHinweisWeg", null));
    if (seitWeg !== null && seitWeg <= BACKUP_ERINNERUNG_TAGE) {
      return;
    }

    const karte = element("div", "karte erinnerung");
    const icon = element("span", "icon einst-icon");
    icon.innerHTML = iconSvg("export");
    karte.appendChild(icon);

    const mitte = element("div", "erinnerung-text");
    mitte.appendChild(element("div", "erinnerung-titel", txt("erinnerung.titel")));
    let text = txt("erinnerung.nie");
    if (seitBackup !== null) {
      text = txt("erinnerung.alt", { n: seitBackup });
    }
    mitte.appendChild(element("div", "routine-info", text));
    const hin = element("button", "text-btn", txt("erinnerung.knopf"));
    hin.onclick = function () {
      einstOeffnen("daten");
    };
    mitte.appendChild(hin);
    karte.appendChild(mitte);

    const weg = element("button", "erinnerung-zu", "✕");
    weg.setAttribute("aria-label", txt("erinnerung.zu"));
    weg.onclick = function () {
      sicherSpeichern("backupHinweisWeg", new Date().toISOString());
      backupHinweisAnzeigen();
    };
    karte.appendChild(weg);
    bereich.appendChild(karte);
  }

  // Der Text unter "Backup exportieren": wann zuletzt exportiert wurde
  function backupZuletztText() {
    const tage = tageSeit(gespeichertLesen("letztesBackup", null));
    if (tage === null) {
      return txt("backup.nie");
    }
    if (tage === 0) {
      return txt("backup.zuletzt.heute");
    }
    if (tage === 1) {
      return txt("backup.zuletzt.gestern");
    }
    return txt("backup.zuletzt.tage", { n: tage });
  }

  // ---------- Profil: Aktivitäts-Raster ----------

  // Zu jedem Feld des Rasters (Schlüssel wie bei tagSchluessel) sein Element und sein Datum
  let rasterFelder = {};

  // Der angetippte Tag als Schlüssel (null = keiner)
  let rasterTag = null;

  // Die Grenzen der Farbstufen als Sätze pro Tag, berechnet aus den Trainingstagen im Raster.
  // werte sind deren Sätze, aufsteigend sortiert.
  function rasterGrenzen(werte) {
    const grenzen = [];
    for (let i = 0; i < RASTER_GRENZEN.length; i++) {
      grenzen.push(werte[Math.ceil(RASTER_GRENZEN[i] * (werte.length - 1))]);
    }
    return grenzen;
  }

  // Die Farbstufe eines Trainingstags: 1 (hell) bis 4 (kräftig)
  function rasterStufe(saetze, grenzen) {
    let stufe = 1;
    for (let i = 0; i < grenzen.length; i++) {
      if (saetze >= grenzen[i]) {
        stufe++;
      }
    }
    return stufe;
  }

  // Der Text zu einem Tag: Datum und was trainiert wurde, z. B. "Mi, 7.10.2026 · Push-Tag · 14 Sätze"
  function rasterTagText(datum, tag) {
    if (!tag) {
      return tagTextMitJahr(datum) + " · " + txt("raster.keinTraining");
    }
    return tagTextMitJahr(datum) + " · " + tagName(tag) + " · " + txtAnzahl("anzahl.saetze", tag.saetze);
  }

  // Baut das Raster: eine Spalte pro Woche, die aktuelle ganz rechts, in jeder Spalte Montag oben
  function rasterAnzeigen() {
    const heute = new Date();
    const start = montagDerWoche(heute);
    start.setDate(start.getDate() - 7 * (RASTER_WOCHEN - 1));

    // Links stehen die Wochentage, beschriftet ist jeder zweite: Mo, Mi, Fr
    const tageSpalte = document.getElementById("raster-tage");
    tageSpalte.innerHTML = "";
    for (let t = 0; t < 7; t++) {
      let name = "";
      if (t === 0 || t === 2 || t === 4) {
        name = wochentag(t);
      }
      tageSpalte.appendChild(element("span", "", name));
    }

    // Die Farbstufen richten sich nach den Trainingstagen, die im Raster liegen
    const werte = [];
    Object.keys(profilTage).forEach(function (schluessel) {
      if (Number(schluessel) >= tagSchluessel(start)) {
        werte.push(profilTage[schluessel].saetze);
      }
    });
    werte.sort(function (a, b) {
      return a - b;
    });
    const grenzen = rasterGrenzen(werte);

    const felder = document.getElementById("raster-felder");
    felder.innerHTML = "";
    rasterFelder = {};
    const marken = [];
    let monat = -1;
    for (let w = 0; w < RASTER_WOCHEN; w++) {
      for (let t = 0; t < 7; t++) {
        const datum = new Date(start.getFullYear(), start.getMonth(), start.getDate() + w * 7 + t);
        // Die Tage nach heute gibt es noch nicht, die aktuelle Woche endet also bei heute
        if (datum > heute) {
          break;
        }

        // Beginnt mit dieser Woche ein neuer Monat, bekommt die Spalte seinen Namen
        if (t === 0 && datum.getMonth() !== monat) {
          monat = datum.getMonth();
          marken.push({ spalte: w, name: datum.toLocaleDateString(gebiet(), { month: "long" }) });
        }

        const schluessel = tagSchluessel(datum);
        const tag = profilTage[schluessel];
        const feld = element("button", "raster-feld");
        if (tag) {
          feld.classList.add("stufe-" + rasterStufe(tag.saetze, grenzen));
        }
        feld.setAttribute("aria-label", rasterTagText(datum, tag));
        feld.onclick = function () {
          rasterTagWaehlen(schluessel);
        };
        felder.appendChild(feld);
        rasterFelder[schluessel] = { feld: feld, datum: datum };
      }
    }

    // Monatsnamen: Ein ausgeschriebener Name braucht mehrere Spalten Platz. Deshalb fällt der erste weg,
    // wenn gleich danach der nächste Monat beginnt, und der letzte, solange er am rechten Rand nicht hineinpasst.
    if (marken.length > 1 && marken[1].spalte < RASTER_MONAT_SPALTEN) {
      marken.shift();
    }
    if (marken.length > 0 && marken[marken.length - 1].spalte > RASTER_WOCHEN - RASTER_MONAT_SPALTEN) {
      marken.pop();
    }
    const monate = document.getElementById("raster-monate");
    monate.innerHTML = "";
    for (let i = 0; i < marken.length; i++) {
      const marke = element("span", "", marken[i].name);
      marke.style.left = marken[i].spalte * RASTER_SPALTE + "px";
      monate.appendChild(marke);
    }

    document.getElementById("raster-anzahl").textContent = txtAnzahl("anzahl.trainings", werte.length);

    // Der vorher gewählte Tag bleibt gewählt, solange es sein Feld noch gibt
    if (!rasterFelder[rasterTag]) {
      rasterTag = null;
    }
    rasterInfoAnzeigen();

    // Beim Öffnen steht das Raster ganz rechts bei der aktuellen Woche
    const rollen = document.getElementById("raster-rollen");
    rollen.scrollLeft = rollen.scrollWidth;
  }

  // Tippen auf ein Feld wählt den Tag, nochmal Tippen hebt die Auswahl auf
  function rasterTagWaehlen(schluessel) {
    if (rasterTag === schluessel) {
      rasterTag = null;
    } else {
      rasterTag = schluessel;
    }
    rasterInfoAnzeigen();
  }

  // Markiert das gewählte Feld und zeigt unter dem Raster, was an dem Tag trainiert wurde.
  // An einem Trainingstag führt die Zeile weiter zu den Details.
  function rasterInfoAnzeigen() {
    Object.keys(rasterFelder).forEach(function (schluessel) {
      rasterFelder[schluessel].feld.classList.toggle("gewaehlt", schluessel === String(rasterTag));
    });

    const info = document.getElementById("raster-info");
    const tag = profilTage[rasterTag];
    info.disabled = !tag;
    info.classList.toggle("mit-pfeil", Boolean(tag));
    if (rasterTag === null) {
      info.textContent = txt("raster.tippen");
      return;
    }
    info.textContent = rasterTagText(rasterFelder[rasterTag].datum, tag);
  }

  // Öffnet die Details des im Raster gewählten Tags
  function rasterTagOeffnen() {
    tagSheetOeffnen(rasterTag);
  }

  // ---------- Profil: Reiter Verlauf, Statistik und Abzeichen ----------

  function profilReiterAnzeigen() {
    umschalterBauen(document.getElementById("profil-reiter"), PROFIL_REITER, profilReiter, function (neu) {
      profilReiter = neu;
      verlaufGezeigt = VERLAUF_ANZAHL;
      profilReiterAnzeigen();
    });

    const inhalt = document.getElementById("profil-reiter-inhalt");
    inhalt.innerHTML = "";
    if (profilReiter === "verlauf") {
      profilVerlaufAnzeigen(inhalt);
    } else if (profilReiter === "statistik") {
      profilStatistikAnzeigen(inhalt);
    } else {
      profilAbzeichenAnzeigen(inhalt);
    }
  }

  // Verlauf: die Trainingstage, der neueste zuerst. Tippen öffnet die Details.
  function profilVerlaufAnzeigen(inhalt) {
    const schluessel = Object.keys(profilTage).sort(function (a, b) {
      return b - a;
    });
    if (schluessel.length === 0) {
      inhalt.appendChild(element("div", "karte kommt-bald", txt("profil.verlaufLeer")));
      return;
    }

    // Look Korund (seit Version 143): Datum ohne Jahr, dazu die Dauer und die Zahl der Rekorde des Tages
    const korund = lookKorund();
    const rekordeJeTag = {};
    const minutenJeTag = {};
    if (korund) {
      rekorde(rangStand().uebungen.map(function (u) {
        return u.punkte;
      })).forEach(function (r) {
        const s = tagSchluessel(new Date(r.zeit));
        rekordeJeTag[s] = (rekordeJeTag[s] || 0) + 1;
      });
      for (let i = 0; i < trainings.length; i++) {
        const t = trainings[i];
        const dauer = t ? Math.round((new Date(t.ende) - new Date(t.start)) / 60000) : NaN;
        if (!isNaN(dauer) && dauer > 0 && dauer < 24 * 60) {
          const s = tagSchluessel(new Date(t.start));
          minutenJeTag[s] = (minutenJeTag[s] || 0) + dauer;
        }
      }
    }

    for (let i = 0; i < schluessel.length && i < verlaufGezeigt; i++) {
      const tag = profilTage[schluessel[i]];
      const zeile = element("button", "verlauf-zeile");
      const links = element("span", "verlauf-text");
      links.appendChild(element("span", "verlauf-name", tagName(tag)));
      let info = tagTextMitJahr(tag.datum) + " · " + txtAnzahl("anzahl.saetze", tag.saetze);
      if (korund) {
        info = tagText(tag.datum) + " · " + txtAnzahl("anzahl.saetze", tag.saetze);
        if (minutenJeTag[tag.schluessel]) {
          info += " · " + dauerText(minutenJeTag[tag.schluessel]);
        }
      }
      links.appendChild(element("span", "verlauf-info", info));
      zeile.appendChild(links);
      const rechts = element("span", "verlauf-volumen", volumenText(tag.volumen));
      if (korund && rekordeJeTag[tag.schluessel]) {
        rechts.appendChild(element("span", "verlauf-rekord", txtAnzahl("verlauf.rekorde", rekordeJeTag[tag.schluessel])));
      }
      zeile.appendChild(rechts);
      zeile.onclick = function () {
        tagSheetOeffnen(tag.schluessel);
      };
      inhalt.appendChild(zeile);
    }

    if (schluessel.length > verlaufGezeigt) {
      const mehr = element("button", "zweit-btn", txt("profil.mehr"));
      mehr.onclick = function () {
        verlaufGezeigt += VERLAUF_ANZAHL;
        profilReiterAnzeigen();
      };
      inhalt.appendChild(mehr);
    }
  }

  // Der Tag, dessen Details gerade offen sind (Schlüssel wie bei tagSchluessel)
  let tagSheetSchluessel = "";

  // Das Datum zu einem Schlüssel aus tagSchluessel, z. B. 20261005
  function schluesselDatum(schluessel) {
    const zahl = Number(schluessel);
    return new Date(Math.floor(zahl / 10000), Math.floor(zahl / 100) % 100 - 1, zahl % 100);
  }

  // Die Details eines Tags, von Home und vom Profil aus: das Training mit jeder Übung und ihren Sätzen,
  // an einem Tag ohne Training "Kein Training", heute und in der Zukunft das, was geplant ist
  function tagSheetOeffnen(schluessel) {
    if (!schluessel) {
      return;
    }
    tagSheetFuellen(schluessel);
    document.getElementById("tag-sheet-inhalt").scrollTop = 0;
    zusatzSheetOeffnen("tag-sheet");
  }

  // Teilt die Einträge eines Trainingstags in Blöcke: jede gespeicherte Trainingseinheit, dann alles,
  // was zu keiner Einheit gehört, und am Ende das laufende Training.
  // Jeder Block: { name, minuten (null ohne bekannte Dauer), eintraege, einheit (oder null), laeuft }.
  function tagBloecke(tag) {
    const offen = tag.eintraege.slice();

    // Holt die Einträge heraus, auf die gehoert zutrifft. Jeder Eintrag landet so in genau einem Block.
    function nehmen(gehoert) {
      const liste = [];
      for (let i = offen.length - 1; i >= 0; i--) {
        if (gehoert(offen[i])) {
          liste.unshift(offen[i]);
          offen.splice(i, 1);
        }
      }
      return liste;
    }

    let laufend = null;
    if (laufendesTraining) {
      const seine = trainingStand().eintraege;
      const liste = nehmen(function (e) {
        return seine.indexOf(e) !== -1;
      });
      if (liste.length > 0) {
        laufend = { name: laufendesTraining.routineName || txt("freiesTraining"), minuten: null, eintraege: liste, einheit: null, laeuft: true };
      }
    }

    const bloecke = [];
    for (let i = 0; i < trainings.length; i++) {
      const t = trainings[i];
      if (!t || !Array.isArray(t.eintragIds)) {
        continue;
      }
      const liste = nehmen(function (e) {
        return Boolean(e.id) && t.eintragIds.indexOf(e.id) !== -1;
      });
      if (liste.length === 0) {
        continue;
      }
      // Die Dauer wie bei "Letztes Training". Ohne gültige Zeiten bleibt sie weg.
      const minuten = einheitMinuten(t);
      let start = 0;
      if (minuten !== null) {
        start = new Date(t.start).getTime();
      }
      bloecke.push({ name: t.routineName || txt("freiesTraining"), minuten: minuten, eintraege: liste, einheit: t, laeuft: false, start: start });
    }
    // Das frühere Training steht oben
    bloecke.sort(function (a, b) {
      return a.start - b.start;
    });

    // Ohne Einheit (frei eingetragen oder aus der Zeit, bevor es Einheiten gab):
    // Der Name kommt von den Routinen, aus denen die Einträge stammen
    if (offen.length > 0) {
      const namen = tagRoutinen({ eintraege: offen });
      bloecke.push({ name: namen.join(" + ") || txt("freiesTraining"), minuten: null, eintraege: offen, einheit: null, laeuft: false });
    }
    if (laufend) {
      bloecke.push(laufend);
    }
    return bloecke;
  }

  // Die Zeile über einem Block: der Name der Routine, mit bekannter Dauer "Push A · 58 Min."
  function tagBlockKopf(block) {
    const kopf = element("div", "tag-block-kopf", block.name);
    if (block.minuten !== null) {
      kopf.appendChild(element("span", "tag-block-dauer", " · " + dauerText(block.minuten)));
    }
    return kopf;
  }

  // Baut den Inhalt des Sheets: Kopf, die drei Zahlen des Tags, je Übung eine Karte mit ihren Sätzen
  // und unter jedem Training "Training löschen". Jeder Satz ist eine Reihe, Antippen öffnet das Bearbeiten.
  function tagSheetFuellen(schluessel) {
    const datum = schluesselDatum(schluessel);
    const tag = trainingstage()[schluessel];
    const heute = tagSchluessel(new Date());
    tagSheetSchluessel = schluessel;
    document.getElementById("tag-sheet-titel").textContent = tagTextMitJahr(datum);

    const inhalt = document.getElementById("tag-sheet-inhalt");
    inhalt.innerHTML = "";

    if (tag) {
      const bloecke = tagBloecke(tag);
      // Bei einem einzigen Training steht sein Name im Kopf, bei mehreren über jedem Block
      if (bloecke.length === 1) {
        inhalt.appendChild(tagBlockKopf(bloecke[0]));
      }

      const zahlen = element("div", "home-zahlen tag-zahlen");
      zahlen.appendChild(homeZahl(tagUebungen(tag).length, txt("uebungen")));
      zahlen.appendChild(homeZahl(tag.saetze, txt("saetze")));
      zahlen.appendChild(homeVolumenZahl(tag.volumen, txt("verlauf.volumen")));
      inhalt.appendChild(zahlen);

      for (let b = 0; b < bloecke.length; b++) {
        const block = bloecke[b];
        const bereich = element("div", "tag-block");
        if (bloecke.length > 1) {
          bereich.appendChild(tagBlockKopf(block));
        }

        for (let i = 0; i < block.eintraege.length; i++) {
          const e = block.eintraege[i];
          const karte = element("div", "karte tag-karte");
          karte.appendChild(element("div", "tag-eintrag-name", anzeigeName(e.uebung, e.uebungId)));
          const gruppe = anzeigeGruppe(e.muskelgruppe, e.uebungId);
          if (gruppe && typeof gruppe === "string") {
            karte.appendChild(element("div", "routine-info", gruppe));
          }
          // Einträge, bei denen keine Zahlen stehen, haben keine einzelnen Sätze: Sie zeigen nur ihren Text
          if (saetzeVon(e).length === 0) {
            karte.appendChild(element("div", "routine-info", saetzeText(e)));
          } else {
            satzZeilenBauen(karte, e);
          }
          bereich.appendChild(karte);
        }

        // Das laufende Training lässt sich hier nicht löschen, dafür gibt es "Verwerfen"
        if (block.laeuft) {
          bereich.appendChild(element("p", "tag-laeuft", txt("home.laeuft")));
        } else {
          const loeschen = element("button", "zweit-btn gefahr", txt("tag.loeschen"));
          loeschen.onclick = function () {
            tagTrainingLoeschenFragen(block, datum);
          };
          bereich.appendChild(loeschen);
        }
        inhalt.appendChild(bereich);
      }
    }

    if (Number(schluessel) >= heute) {
      tagPlanBauen(inhalt, datum, tag, Number(schluessel) === heute);
    } else if (!tag) {
      inhalt.appendChild(element("div", "karte tag-karte kommt-bald", txt("tag.keinTraining")));
    }

    // Heute und an vergangenen Tagen führt ein Knopf zum Eintragen für diesen Tag
    if (Number(schluessel) <= heute) {
      const eintragen = element("button", "knopf heute-knopf", txt("log.titel"));
      eintragen.onclick = function () {
        zusatzSheetsSchliessen();
        if (aktiveSeite !== "home") {
          seiteZeigen("home");
        }
        logFuerTagZeigen(datum);
      };
      inhalt.appendChild(eintragen);
    }
  }

  // Heute und in der Zukunft: was laut Wochenplan an dem Tag dran ist. Eine Routine zeigt ihre Übungen,
  // starten lässt sie sich nur heute. Wurde schon trainiert (tag), fallen "Ruhetag" und "Nichts geplant" weg.
  function tagPlanBauen(inhalt, datum, tag, istHeute) {
    const karte = element("div", "karte tag-karte");

    // Läuft heute ein Training, steht es hier wie in der Heute-Karte auf Home
    if (istHeute && laufendesTraining) {
      karte.appendChild(element("div", "heute-label", txt("home.laeuft")));
      karte.appendChild(element("div", "routine-name", laufendesTraining.routineName));
      karte.appendChild(element("div", "routine-info", txt("uebung.xVonY", { x: laufendesTraining.index + 1, y: laufendesTraining.uebungen.length })));
      const weiter = element("button", "speichern-btn", txt("training.fortsetzen"));
      weiter.onclick = function () {
        zusatzSheetsSchliessen();
        trainingFortsetzen();
      };
      karte.appendChild(weiter);
      inhalt.appendChild(karte);
      return;
    }

    const plan = wochenplan[(datum.getDay() + 6) % 7];
    const routine = routineFinden(plan);
    if (!routine) {
      if (tag) {
        return;
      }
      karte.classList.add("kommt-bald");
      if (plan === "ruhe") {
        karte.textContent = txt("ruhetag");
      } else {
        karte.textContent = txt("home.nichtsGeplant");
      }
      inhalt.appendChild(karte);
      return;
    }

    // Schon erledigt ist die Routine, wenn es an dem Tag einen Eintrag aus ihr gibt
    let erledigt = false;
    if (tag) {
      for (let i = 0; i < tag.eintraege.length; i++) {
        if (tag.eintraege[i].routineId === routine.id) {
          erledigt = true;
        }
      }
    }

    let label = txt("tag.geplant");
    if (erledigt) {
      label = txt("home.erledigt");
    } else if (istHeute) {
      label = txt("home.geplant");
    }
    karte.appendChild(element("div", "heute-label", label));
    karte.appendChild(element("div", "routine-name", routine.name));
    karte.appendChild(element("div", "routine-info", routineInfo(routine)));

    const liste = element("ol", "tag-plan-liste");
    for (let i = 0; i < routine.uebungen.length; i++) {
      liste.appendChild(element("li", "", anzeigeName(routine.uebungen[i].name, routine.uebungen[i].uebungId)));
    }
    karte.appendChild(liste);

    if (istHeute) {
      let start;
      if (erledigt) {
        start = element("button", "knopf heute-knopf", txt("home.nochmal"));
      } else {
        start = element("button", "speichern-btn", txt("home.starten"));
      }
      start.onclick = function () {
        zusatzSheetsSchliessen();
        routineStarten(routine);
      };
      karte.appendChild(start);
    }
    inhalt.appendChild(karte);
  }

  // ---------- Trainingstag: Training löschen ----------

  // Das zuletzt gelöschte Training für "Rückgängig" (null = keins): seine Einträge und seine Trainingseinheit,
  // jeweils mit dem Platz, an dem sie standen. Es gilt nur, solange der Hinweis zu sehen ist.
  let geloeschtesTraining = null;

  // Die Uhr, die den Hinweis "Training gelöscht" wieder ausblendet
  let geloeschtUhr = null;

  // Fragt nach, bevor ein Training (ein Block aus tagBloecke) gelöscht wird
  function tagTrainingLoeschenFragen(block, datum) {
    let saetze = 0;
    for (let i = 0; i < block.eintraege.length; i++) {
      saetze += saetzeVon(block.eintraege[i]).length;
    }
    const text = txt("tag.loeschenText", {
      name: block.name,
      datum: tagTextMitJahr(datum),
      stand: txtAnzahl("anzahl.uebungen", block.eintraege.length) + " · " + txtAnzahl("anzahl.saetze", saetze)
    });
    frageZeigen(txt("tag.loeschenFrage"), text, [
      {
        text: txt("loeschen"),
        art: "gefahr",
        aktion: function () {
          tagTrainingLoeschen(block);
        }
      },
      { text: txt("abbrechen"), art: "leise" }
    ]);
  }

  // Löscht ein Training: Seine Einträge verschwinden aus dem Log, alle anderen bleiben unberührt.
  // Hat seine Trainingseinheit danach keinen Eintrag mehr, geht sie mit. Danach lässt es sich kurz zurückholen.
  function tagTrainingLoeschen(block) {
    const geloescht = [];
    for (let i = 0; i < block.eintraege.length; i++) {
      const platz = eintraege.indexOf(block.eintraege[i]);
      if (platz !== -1) {
        geloescht.push({ platz: platz, eintrag: block.eintraege[i] });
      }
    }
    geloescht.sort(function (a, b) {
      return a.platz - b.platz;
    });
    // Von hinten nach vorn, damit die Plätze davor stimmen
    for (let i = geloescht.length - 1; i >= 0; i--) {
      eintraege.splice(geloescht[i].platz, 1);
    }
    sicherSpeichern("eintraege", eintraege);

    let einheit = null;
    const platz = trainings.indexOf(block.einheit);
    if (platz !== -1 && !einheitHatEintraege(block.einheit, eintragIdsVorhanden())) {
      trainings.splice(platz, 1);
      sicherSpeichern("trainings", trainings);
      einheit = { platz: platz, einheit: block.einheit };
    }

    // Der Hinweis liegt unter dem Sheet, deshalb schließt es sich
    zusatzSheetsSchliessen();
    nachTrainingAnzeigen();

    // Die Hinweise stehen an derselben Stelle: Es ist immer nur einer zu sehen
    verworfenHinweisSchliessen();
    routineHinweisSchliessen();
    geloeschtesTraining = { eintraege: geloescht, einheit: einheit };
    document.getElementById("geloescht-hinweis").classList.add("sichtbar");
    clearTimeout(geloeschtUhr);
    geloeschtUhr = setTimeout(geloeschtHinweisSchliessen, VERWORFEN_ANZEIGE);
  }

  // Blendet den Hinweis aus. Damit ist auch "Rückgängig" vorbei.
  function geloeschtHinweisSchliessen() {
    clearTimeout(geloeschtUhr);
    geloeschtUhr = null;
    geloeschtesTraining = null;
    document.getElementById("geloescht-hinweis").classList.remove("sichtbar");
  }

  // "Rückgängig": Die gelöschten Einträge und die Trainingseinheit kommen an ihren Platz zurück
  function tagLoeschenRueckgaengig() {
    const g = geloeschtesTraining;
    geloeschtHinweisSchliessen();
    if (!g) {
      return;
    }

    // Von vorn nach hinten, so landet jeder Eintrag wieder an seinem alten Platz
    for (let i = 0; i < g.eintraege.length; i++) {
      eintraege.splice(Math.min(g.eintraege[i].platz, eintraege.length), 0, g.eintraege[i].eintrag);
    }
    sicherSpeichern("eintraege", eintraege);
    if (g.einheit) {
      trainings.splice(Math.min(g.einheit.platz, trainings.length), 0, g.einheit.einheit);
      sicherSpeichern("trainings", trainings);
    }
    nachTrainingAnzeigen();
  }

  // Statistik: die Serie und die Zahlen der laufenden Woche, alles in der gewählten Einheit
  function profilStatistikAnzeigen(inhalt) {
    const serie = element("div", "karte");
    serie.appendChild(element("div", "routine-name", txtAnzahl("profil.serieText", gesamtZahlen().serie)));
    serie.appendChild(element("div", "routine-info", txt("fortschritt.serie", { n: SERIE_TAGE_PRO_WOCHE })));
    inhalt.appendChild(serie);

    // Diese Woche: dieselben Zahlen wie auf Home
    inhalt.appendChild(element("h2", "abschnitt", txt("home.dieseWoche")));
    const woche = element("div", "karte");
    woche.appendChild(wochenZahlenFeld(wochenZahlen(profilTage, montagDerWoche(new Date()))));
    inhalt.appendChild(woche);
  }

  // Abzeichen: der Gesamt-Kraftrang, der Konstanz-Rang, die sechs Bewegungsmuster und die Abzeichen.
  // Gerechnet wird in der raenge.js, hier wird nur gesammelt und angezeigt.
  function profilAbzeichenAnzeigen(inhalt) {
    // Wer die Ränge hier sieht, braucht dazu keine Meldung mehr
    const daten = rangPruefen(false);
    const stand = daten.stand;
    if (lookKorund()) {
      profilAbzeichenKorund(inhalt, daten, stand);
      return;
    }

    // Die Einführung erklärt Rang, "Teilen" und Abzeichen an der Karte des Gesamt-Rangs, ihrem Knopf und dem ersten Abzeichen (einfuehrung.js)
    const gesamt = gesamtRangKarte(stand);
    gesamt.setAttribute("data-tour", "profil-rang");
    gesamt.querySelector(".teilen-knopf").setAttribute("data-tour", "profil-teilen");
    inhalt.appendChild(gesamt);
    inhalt.appendChild(konstanzKarte(stand));

    inhalt.appendChild(element("h2", "abschnitt", txt("rang.muster")));
    const muster = element("div", "muster-raster");
    for (let i = 0; i < MUSTER.length; i++) {
      muster.appendChild(musterKarte(MUSTER[i], stand.kraft.muster[MUSTER[i]], stand.gruende[MUSTER[i]]));
    }
    inhalt.appendChild(muster);
    // Look Korund (seit Version 143): dieselben Muster als Netz und kurze Liste. Sonst ausgeblendet, dort stehen die Kacheln.
    inhalt.appendChild(musterKorund(stand));

    // Look Korund: das Abzeichen, das am nächsten dran ist. Sonst ausgeblendet.
    const naechstes = naechstesAbzeichen(daten.abzeichen);
    if (naechstes) {
      inhalt.appendChild(naechstesAbzeichenKarte(naechstes, stand));
    }

    inhalt.appendChild(element("h2", "abschnitt", txt("profil.reiter.abzeichen")));
    const raster = element("div", "abzeichen-raster");
    for (let i = 0; i < daten.abzeichen.length; i++) {
      // Geheime Abzeichen erscheinen erst, wenn sie erreicht sind
      if (daten.abzeichen[i].geheim && !daten.abzeichen[i].erreicht) {
        continue;
      }
      raster.appendChild(abzeichenKachel(daten.abzeichen[i], stand));
    }
    if (raster.firstElementChild) {
      raster.firstElementChild.setAttribute("data-tour", "profil-abzeichen");
    }
    inhalt.appendChild(raster);

    inhalt.appendChild(element("p", "meldung rang-fussnote", txt("rang.hinweis")));
  }

  // ---------- Ränge: Daten sammeln ----------

  const ROEMISCH = ["I", "II", "III"];

  // Der Name zu Rangpunkten, z. B. "Stark I". Die Rangnamen stehen in der texte.js.
  function rangName(rp) {
    const r = rpZuRang(rp);
    return txt("rang.name." + r.rang) + " " + ROEMISCH[r.stufe - 1];
  }

  // Eine Steigerung als Text, z. B. "+25 %"
  function prozentText(anteil) {
    const prozent = Math.round(anteil * 100);
    if (prozent < 0) {
      return "−" + (-prozent) + " %";
    }
    return "+" + prozent + " %";
  }

  // Sammelt alles, was die Ränge brauchen, und lässt die raenge.js rechnen:
  // uebungen:   alle trainierten Übungen mit ihren 1RM-Werten je Trainingstag (nur gültige Sätze)
  // kraft:      die Kraft-Ränge der Muster und der Gesamt-Kraftrang
  // schritt:    das Muster, das seiner nächsten Stufe am nächsten ist (oder null)
  // zahlen:     Workouts, Volumen und Serie wie überall in der App
  // konstanzRp: die Rangpunkte der Serie
  // messungen:  die Zahl der Körpergewicht-Messungen
  // gruende:    zu jedem Muster ohne Wert, warum es leer ist (siehe musterGruende)
  // ohne ist freiwillig eine Liste von Eintrag-ids, die nicht mitzählen (für den Bericht nach dem Training).
  function rangStand(ohne) {
    const jetzt = Date.now();
    const messungen = gewichtMessungen();
    const liste = trainierteUebungen();
    const uebungen = [];
    for (let i = 0; i < liste.length; i++) {
      const fest = UEBUNG_NACH_ID[liste[i].id];
      let rang = null;
      if (fest && fest.rang) {
        rang = fest.rang;
      }
      uebungen.push({ id: liste[i].id, name: liste[i].name, rang: rang, punkte: verlaufPunkte(liste[i].name, liste[i].id, "rang", ohne) });
    }
    const kraft = kraftRaenge(uebungen, function (zeit) {
      return rangKoerpergewicht(messungen, zeit, schnittAm);
    }, jetzt);
    const zahlen = gesamtZahlen();
    return {
      uebungen: uebungen,
      kraft: kraft,
      gruende: musterGruende(uebungen, kraft, messungen.length, jetzt),
      schritt: naechsterSchritt(kraft),
      zahlen: zahlen,
      konstanzRp: rpAusSchwellen(zahlen.serie, KONSTANZ_SCHWELLEN),
      messungen: messungen.length
    };
  }

  // Was eine Übung in den letzten BESTWERT_TAGE Tagen an Sätzen hat, ohne auf die Last zu schauen:
  // saetze = es gibt Sätze, wdhPasst = mindestens einer hat 1 bis 10 Wiederholungen.
  function rangSaetzeZuletzt(name, id, jetzt) {
    const stand = { saetze: false, wdhPasst: false };
    for (let i = 0; i < eintraege.length; i++) {
      const e = eintraege[i];
      if (!hatDatum(e) || typeof e.uebung !== "string" || !gleicheUebung(e, name, id)) {
        continue;
      }
      // Der Tag zählt wie in verlaufPunkte ab Mitternacht
      const datum = new Date(e.datum);
      const zeit = new Date(datum.getFullYear(), datum.getMonth(), datum.getDate()).getTime();
      if (zeit <= jetzt - BESTWERT_TAGE * TAG_MS || zeit > jetzt) {
        continue;
      }
      const saetze = arbeitsSaetzeVon(e);
      for (let j = 0; j < saetze.length; j++) {
        stand.saetze = true;
        if (saetze[j].wdh >= RANG_WDH_MIN && saetze[j].wdh <= RANG_WDH_MAX) {
          stand.wdhPasst = true;
        }
      }
    }
    return stand;
  }

  // Warum ein Muster keinen Wert hat, obwohl eine Übung dafür trainiert wurde. Zu jedem leeren Muster
  // kommt null (nichts Passendes trainiert) oder { art, uebungId }:
  // art "koerper": eine Eigengewicht-Übung mit passenden Sätzen, aber es gibt keine Körpergewicht-Messung.
  //                Ohne Messung ist ihre Last 0, deshalb fehlt sie in der Rechnung.
  // art "wdh":     eine Übung des Musters ist eingetragen, aber kein Satz hat 1 bis 10 Wiederholungen.
  // uebungen und kraft kommen aus rangStand, messungen ist die Zahl der Körpergewicht-Messungen.
  function musterGruende(uebungen, kraft, messungen, jetzt) {
    const gruende = {};
    for (let i = 0; i < MUSTER.length; i++) {
      gruende[MUSTER[i]] = null;
    }
    for (let i = 0; i < uebungen.length; i++) {
      const u = uebungen[i];
      if (!u.rang || kraft.muster[u.rang.muster] !== null) {
        continue;
      }
      const stand = rangSaetzeZuletzt(u.name, u.id, jetzt);
      const bisher = gruende[u.rang.muster];
      if (stand.wdhPasst && messungen === 0 && istEigengewicht(u.id)) {
        // Das fehlende Körpergewicht geht vor: Mit einer Messung hätte das Muster sofort einen Wert
        if (!bisher || bisher.art !== "koerper") {
          gruende[u.rang.muster] = { art: "koerper", uebungId: u.id };
        }
      } else if (stand.saetze && !stand.wdhPasst && !bisher) {
        gruende[u.rang.muster] = { art: "wdh", uebungId: u.id };
      }
    }
    return gruende;
  }

  // Alle Abzeichen mit ihrem Stand. Jedes hat: id, erreicht, datum (ISO-Text, "" = unbekannt),
  // bei Abzeichen mit Stufen dazu gruppe, stufe (1 bis 3), ziel und wert, bei geheimen geheim: true.
  // Das Datum wird so weit wie möglich aus den Daten berechnet. Was der Merker schon kennt, bleibt erreicht.
  function abzeichenListe(stand, merker) {
    const liste = [];

    // Die Trainingstage, der älteste zuerst: je Tag ein Workout und sein Volumen
    const tage = trainingstage();
    const workoutPunkte = [];
    const volumenPunkte = [];
    Object.keys(tage).sort(function (a, b) {
      return a - b;
    }).forEach(function (schluessel) {
      workoutPunkte.push({ zeit: tage[schluessel].datum.getTime(), wert: 1 });
      volumenPunkte.push({ zeit: tage[schluessel].datum.getTime(), wert: tage[schluessel].volumen });
    });
    const punkteListen = [];
    for (let i = 0; i < stand.uebungen.length; i++) {
      punkteListen.push(stand.uebungen[i].punkte);
    }
    const rekordPunkte = rekorde(punkteListen);

    // Trägt die drei Stufen eines Abzeichens ein. zeitFuer liefert zu einem Ziel den Zeitpunkt, an dem es erreicht war.
    function stufen(gruppe, wert, zeitFuer) {
      for (let i = 0; i < ABZEICHEN_STUFEN[gruppe].length; i++) {
        const ziel = ABZEICHEN_STUFEN[gruppe][i];
        let zeit = null;
        if (wert >= ziel) {
          zeit = zeitFuer(ziel);
        }
        liste.push({ id: gruppe + "-" + (i + 1), gruppe: gruppe, stufe: i + 1, ziel: ziel, wert: wert, erreicht: wert >= ziel, zeit: zeit });
      }
    }
    stufen("workouts", stand.zahlen.workouts, function (ziel) {
      return summeErreichtAm(workoutPunkte, ziel);
    });
    stufen("volumen", stand.zahlen.gewicht, function (ziel) {
      return summeErreichtAm(volumenPunkte, ziel);
    });
    stufen("serie", stand.zahlen.laengsteSerie, function (ziel) {
      return stand.zahlen.serieErreichtAm[ziel] || null;
    });
    // Wann ein Gesamt-Rang zum ersten Mal erreicht war, lässt sich nicht berechnen: Das Datum kommt aus dem Merker
    stufen("gesamtRang", Math.max(merker.hoechsterGesamtRP, stand.kraft.gesamt || 0), function () {
      return null;
    });
    stufen("rekorde", rekordPunkte.length, function (ziel) {
      return summeErreichtAm(rekordPunkte, ziel);
    });

    function einmalig(id, erreicht, zeit) {
      liste.push({ id: id, erreicht: erreicht, zeit: zeit || null, geheim: ABZEICHEN_GEHEIM.indexOf(id) !== -1 });
    }
    einmalig("erstesTraining", workoutPunkte.length > 0, workoutPunkte.length > 0 && workoutPunkte[0].zeit);
    const messungen = gewichtMessungen();
    einmalig("koerpergewicht", messungen.length > 0, messungen.length > 0 && messungen[0].zeit);
    einmalig("ersteRoutine", routinen.length > 0);
    einmalig("erstesBackup", Boolean(gespeichertLesen("letztesBackup", null)));
    let allrounder = true;
    for (let i = 0; i < MUSTER.length; i++) {
      const m = stand.kraft.muster[MUSTER[i]];
      if (!m || m.rp === null || m.rp < ALLROUNDER_RP) {
        allrounder = false;
      }
    }
    einmalig("allrounder", allrounder);

    // Frühaufsteher: das früheste Training im Trainingsmodus, das vor 7 Uhr begonnen hat.
    // Es zählen nur Einheiten, von denen es noch Einträge gibt.
    let frueh = null;
    const vorhanden = eintragIdsVorhanden();
    for (let i = 0; i < trainings.length; i++) {
      if (!einheitHatEintraege(trainings[i], vorhanden)) {
        continue;
      }
      const start = new Date(trainings[i].start);
      if (!isNaN(start) && start.getHours() < FRUEH_STUNDE && (frueh === null || start.getTime() < frueh)) {
        frueh = start.getTime();
      }
    }
    einmalig("fruehaufsteher", frueh !== null, frueh);

    for (let i = 0; i < liste.length; i++) {
      const a = liste[i];
      const gemerkt = merker.abzeichenGesehen[a.id];
      a.datum = "";
      if (gemerkt) {
        a.datum = gemerkt;
      } else if (a.zeit) {
        a.datum = new Date(a.zeit).toISOString();
      }
      a.erreicht = a.erreicht || gemerkt !== undefined;
    }
    return liste;
  }

  // Rechnet Ränge und Abzeichen und hält im Merker fest, was neu erreicht ist (einstellungen.rangMerker).
  // melden = true zeigt für neue Stufen und Abzeichen einmal eine Meldung.
  // Beim allerersten Mal (noch kein Merker, z. B. direkt nach dem Update) wird alles still als gesehen gemerkt.
  // Zurück kommen der Stand und die Abzeichen für die Anzeige.
  function rangPruefen(melden) {
    const stand = rangStand();
    const erstesMal = !einstellungen.rangMerker;
    const merker = rangMerkerBereinigen(einstellungen.rangMerker);
    const vorher = JSON.stringify(merker);

    // Die heutigen RP. Ohne Serie gibt es noch keinen Konstanz-Rang.
    const aktuell = { gesamt: stand.kraft.gesamt, konstanz: null };
    if (stand.zahlen.serie > 0) {
      aktuell.konstanz = stand.konstanzRp;
    }
    for (let i = 0; i < MUSTER.length; i++) {
      const m = stand.kraft.muster[MUSTER[i]];
      aktuell[MUSTER[i]] = null;
      if (m) {
        aktuell[MUSTER[i]] = m.rp;
      }
    }

    // Gemerkt wird nur nach oben: Fällt ein Rang und steigt wieder, kommt keine zweite Meldung
    const aufstiege = neueStufen(merker.gesehen, aktuell);
    for (let i = 0; i < aufstiege.length; i++) {
      merker.gesehen[aufstiege[i].schluessel] = aufstiege[i].rp;
    }
    merker.hoechsterGesamtRP = Math.max(merker.hoechsterGesamtRP, stand.kraft.gesamt || 0);

    // Neu erreichte Abzeichen bekommen ihr berechnetes Datum. Lässt es sich nicht berechnen, gilt heute,
    // beim allerersten Mal bleibt es offen.
    const abzeichen = abzeichenListe(stand, merker);
    const neueAbzeichen = [];
    for (let i = 0; i < abzeichen.length; i++) {
      const a = abzeichen[i];
      if (a.erreicht && merker.abzeichenGesehen[a.id] === undefined) {
        if (a.datum === "" && !erstesMal) {
          a.datum = new Date().toISOString();
        }
        merker.abzeichenGesehen[a.id] = a.datum;
        neueAbzeichen.push(a);
      }
    }

    // Zeigt die Einführung den Reiter "Abzeichen", bleibt der Merker, wie er ist: Der Rundgang speichert nichts.
    // Was neu erreicht ist, wird beim nächsten Mal ohne Rundgang gemerkt und gemeldet.
    if ((erstesMal || JSON.stringify(merker) !== vorher) && !einfuehrungLaeuft()) {
      einstellungen.rangMerker = merker;
      einstellungenSpeichern();
    }
    if (melden && !erstesMal && aufstiege.length + neueAbzeichen.length > 0) {
      rangMeldungZeigen(aufstiege, neueAbzeichen);
    }
    return { stand: stand, abzeichen: abzeichen };
  }

  // ---------- Ränge: Meldung ----------

  // So viele Ränge oder Abzeichen nennt eine Meldung höchstens einzeln, der Rest steht als "+2" dahinter
  const RANG_MELDUNG_ANZAHL = 3;
  // So lange steht die Meldung da, dann blendet sie sich selbst aus (seit Version 148)
  const RANG_MELDUNG_SEKUNDEN = 5;

  // Im Trainingsmodus und im Bericht danach kommt keine Meldung (seit Version 148). Was dort neu erreicht wird,
  // wartet hier und erscheint, sobald der Bericht mit „Fertig“ verlassen ist (oder eine andere Seite offen ist).
  // Nur im Speicher der Seite, nach dem Neuladen ist es weg.
  let rangMeldungWartet = null;
  let rangMeldungUhr = null;

  // Fasst Namen für die Meldung zusammen: "A, B, C +2"
  function meldungNamen(namen) {
    let text = namen.slice(0, RANG_MELDUNG_ANZAHL).join(", ");
    if (namen.length > RANG_MELDUNG_ANZAHL) {
      text += " +" + (namen.length - RANG_MELDUNG_ANZAHL);
    }
    return text;
  }

  function rangMeldungGesperrt() {
    return aktiveSeite === "training" && (trainingAnsicht === "modus" || trainingAnsicht === "fertig");
  }

  // Zeigt oben unter der Statusleiste eine Meldung für alle neuen Stufen und Abzeichen zusammen,
  // z. B. "Neuer Rang: Stark I · Drücken horizontal". Sie geht nach RANG_MELDUNG_SEKUNDEN von selbst weg.
  function rangMeldungZeigen(aufstiege, abzeichen) {
    if (rangMeldungGesperrt()) {
      rangMeldungWartet = rangMeldungWartet ? {
        aufstiege: rangMeldungWartet.aufstiege.concat(aufstiege),
        abzeichen: rangMeldungWartet.abzeichen.concat(abzeichen)
      } : { aufstiege: aufstiege, abzeichen: abzeichen };
      return;
    }
    const zeilen = [];
    if (aufstiege.length > 0) {
      const namen = [];
      for (let i = 0; i < aufstiege.length; i++) {
        namen.push(rangName(aufstiege[i].rp) + " · " + txt("muster." + aufstiege[i].schluessel));
      }
      zeilen.push(txtAnzahl("rang.neu", aufstiege.length, { text: meldungNamen(namen) }));
    }
    if (abzeichen.length > 0) {
      const namen = [];
      for (let i = 0; i < abzeichen.length; i++) {
        namen.push(abzeichenTitel(abzeichen[i]));
      }
      zeilen.push(txtAnzahl("abzeichen.neu", abzeichen.length, { text: meldungNamen(namen) }));
    }
    document.getElementById("rang-hinweis-text").textContent = zeilen.join("\n");
    document.getElementById("rang-hinweis").classList.add("sichtbar");
    clearTimeout(rangMeldungUhr);
    rangMeldungUhr = setTimeout(rangMeldungSchliessen, RANG_MELDUNG_SEKUNDEN * 1000);
  }

  function rangMeldungSchliessen() {
    clearTimeout(rangMeldungUhr);
    document.getElementById("rang-hinweis").classList.remove("sichtbar");
  }

  // Nach jedem Wechsel der Seite oder der Ansicht im Training: Im Trainingsmodus und im Bericht geht eine sichtbare
  // Meldung weg, sonst erscheint eine wartende
  function rangMeldungAnsicht() {
    if (rangMeldungGesperrt()) {
      rangMeldungSchliessen();
    } else if (rangMeldungWartet) {
      const wartet = rangMeldungWartet;
      rangMeldungWartet = null;
      rangMeldungZeigen(wartet.aufstiege, wartet.abzeichen);
    }
  }

  // Tippen auf die Meldung: das Profil mit dem Reiter "Abzeichen" öffnen
  function rangMeldungOeffnen() {
    rangMeldungSchliessen();
    zusatzSheetsSchliessen();
    profilReiter = "abzeichen";
    seiteZeigen("profil");
  }

  // ---------- Ränge: Anzeige ----------

  // Das Rang-Abzeichen als SVG: ein Sechseck mit der Nummer des Rangs (1 bis 6), darunter ein Winkel je Unterstufe.
  // Die Farbe wächst mit dem Rang: 1 und 2 grau, 3 und 4 mit grüner Linie, 5 und 6 grün gefüllt.
  // rp = null zeichnet ein leeres, gestricheltes Sechseck (noch kein Rang).
  function rangSvg(rp) {
    let klasse = "rang-svg leer";
    let innen = "";
    if (rp !== null) {
      const r = rpZuRang(rp);
      klasse = "rang-svg farbe-" + Math.ceil(r.rang / 2);
      innen = '<text x="24" y="25" text-anchor="middle">' + r.rang + "</text>";
      for (let i = 0; i < r.stufe; i++) {
        innen += '<path class="winkel" d="M18 ' + (30 + i * 4) + 'l6 3 6-3"/>';
      }
    }
    return '<svg class="' + klasse + '" viewBox="0 0 48 52" aria-hidden="true">'
      + '<path class="form" d="M24 2l20 11.5v25L24 50 4 38.5v-25z"/>' + innen + "</svg>";
  }

  // Eine Medaille als SVG: ein Kreis am Band. Bei Abzeichen mit Stufen zeigt sie ein bis drei Punkte
  // (Bronze, Silber, Gold), sonst einen Haken. Die Farbe kommt aus dem CSS (erreicht oder offen).
  function medailleSvg(stufe) {
    let innen = '<path class="zeichen" d="M18.5 30l4 4 7.5-8"/>';
    if (stufe) {
      innen = "";
      for (let i = 0; i < stufe; i++) {
        innen += '<circle class="punkt" cx="' + (24 + (i - (stufe - 1) / 2) * 7) + '" cy="30" r="2.4"/>';
      }
    }
    return '<svg class="medaille" viewBox="0 0 48 48" aria-hidden="true">'
      + '<path class="band" d="M17 4l4.5 13M31 4l-4.5 13"/><circle class="form" cx="24" cy="30" r="13"/>' + innen + "</svg>";
  }

  // Ein Balken, der zu einem Anteil (0 bis 1) gefüllt ist
  function rangBalken(anteil) {
    const balken = element("div", "rang-balken");
    const fuellung = element("div", "");
    fuellung.style.width = Math.max(0, Math.min(1, anteil)) * 100 + "%";
    balken.appendChild(fuellung);
    return balken;
  }

  // Der Kopf einer Rang-Karte: links das Rang-Abzeichen, rechts die kleine Überschrift und der Name des Rangs
  function rangKopf(rp, titel, name) {
    const kopf = element("div", "rang-kopf");
    const bild = element("span", "rang-bild");
    bild.innerHTML = rangSvg(rp);
    kopf.appendChild(bild);
    const text = element("div", "rang-kopf-text");
    text.appendChild(element("div", "kachel-titel", titel));
    text.appendChild(element("div", "rang-name", name));
    kopf.appendChild(text);
    return kopf;
  }

  // Der Balken einer Stufe mit dem Text darunter, was bis zur nächsten fehlt
  function rangFortschritt(karte, rp, fehltText) {
    const r = rpZuRang(rp);
    karte.appendChild(rangBalken(r.rpInStufe / RP_JE_STUFE));
    if (r.rpBisNaechste > 0) {
      karte.appendChild(element("div", "routine-info", fehltText(rangName(rp + r.rpBisNaechste), r.rpBisNaechste)));
    } else {
      karte.appendChild(element("div", "routine-info", txt("rang.maximum")));
    }
  }

  // "Noch ca. 4,3 kg (geschätztes 1RM) bis Stark II · Drücken horizontal, mit Bankdrücken (Langhantel)."
  // Bei Kurzhantel-Übungen steht "pro Hantel" dabei.
  function schrittText(schritt) {
    let schluessel = "rang.schritt";
    if (proHantel(schritt.uebungId)) {
      schluessel = "rang.schrittHantel";
    }
    return txt(schluessel, {
      gewicht: kgText(schritt.fehltKg),
      rang: rangName(schritt.zielRp),
      muster: txt("muster." + schritt.muster),
      uebung: uebungName(schritt.uebungId)
    });
  }

  // Was zum Gesamt-Kraftrang noch fehlt: Einträge, eine Körpergewicht-Messung oder weitere Muster.
  // Das Profil und der Bericht nach dem Training zeigen denselben Satz.
  function rangFehltText(stand) {
    if (eintraege.length === 0) {
      return txt("rang.leerEintraege");
    }
    if (stand.messungen === 0) {
      return txt("rang.leerKoerper");
    }
    return txtAnzahl("rang.fehlen", stand.kraft.fehlen);
  }

  // Oben: der Gesamt-Kraftrang groß. Solange es ihn nicht gibt, steht da, was fehlt.
  function gesamtRangKarte(stand) {
    const karte = element("div", "karte rang-karte gross");
    const gesamt = stand.kraft.gesamt;

    if (gesamt === null) {
      karte.appendChild(rangKopf(null, txt("rang.gesamt"), txt("rang.keiner")));
      karte.appendChild(element("div", "routine-info", rangFehltText(stand)));
      if (eintraege.length > 0 && stand.messungen === 0) {
        const knopf = element("button", "knopf rang-knopf", txt("rang.koerperEintragen"));
        knopf.onclick = gewichtSheetOeffnen;
        karte.appendChild(knopf);
      }
      // Ohne Gesamt-Rang gibt es nichts zu teilen. Der Text darüber sagt, was noch fehlt.
      karte.appendChild(teilenKnopf(false));
      return karte;
    }

    karte.appendChild(rangKopf(gesamt, txt("rang.gesamt"), rangName(gesamt)));
    rangFortschritt(karte, gesamt, function (name, rp) {
      return txt("rang.nochRp", { rp: rp, rang: name });
    });
    if (stand.schritt) {
      karte.appendChild(element("div", "rang-schritt", schrittText(stand.schritt)));
    }
    karte.appendChild(teilenKnopf(true));
    return karte;
  }

  // ---------- Ränge: Teilen-Karte ----------

  // Die Karte ist ein Bild im Hochformat 9:16, so groß wie eine Instagram-Story.
  // Oben und unten bleiben je rund 250 px frei, dort liegen in einer Story die Leisten von Instagram.
  const KARTE_BREITE = 1080;
  const KARTE_HOEHE = 1920;
  const KARTE_RAND = 72;

  // Die Karte ist immer dunkel, egal welches Design in der App gewählt ist.
  // Es sind die Farben des dunklen Designs aus der style.css.
  const KARTE_FARBEN = {
    grund: "#000000",
    feld: "#1C1C1E",
    text: "#FFFFFF",
    leise: "#98989F",
    aus: "rgba(255, 255, 255, 0.3)",
    akzent: "#C6F135",
    akzentLeicht: "rgba(198, 241, 53, 0.15)",
    fuellung: "rgba(255, 255, 255, 0.09)",
    aufAkzent: "#000000"
  };

  const KARTE_SCHRIFT = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", sans-serif';

  // Die Farben des Rang-Abzeichens für die Karte. Es sind dieselben Regeln wie bei .rang-svg in der style.css,
  // nur mit festen Farben: Ein SVG, das als Bild gezeichnet wird, kennt die Farben der Seite nicht.
  const KARTE_SVG_STIL = ".form{fill:" + KARTE_FARBEN.fuellung + ";stroke:" + KARTE_FARBEN.leise + ";stroke-width:2.5;stroke-linejoin:round}"
    + "text{fill:" + KARTE_FARBEN.leise + ";font-family:" + KARTE_SCHRIFT.replace(/"/g, "'") + ";font-size:15px;font-weight:800}"
    + ".winkel{fill:none;stroke:" + KARTE_FARBEN.leise + ";stroke-width:2;stroke-linecap:round;stroke-linejoin:round}"
    + ".farbe-2 .form{fill:" + KARTE_FARBEN.akzentLeicht + ";stroke:" + KARTE_FARBEN.akzent + "}"
    + ".farbe-2 text{fill:" + KARTE_FARBEN.akzent + "}.farbe-2 .winkel{stroke:" + KARTE_FARBEN.akzent + "}"
    + ".farbe-3 .form{fill:" + KARTE_FARBEN.akzent + ";stroke:" + KARTE_FARBEN.akzent + "}"
    + ".farbe-3 text{fill:" + KARTE_FARBEN.aufAkzent + "}.farbe-3 .winkel{stroke:" + KARTE_FARBEN.aufAkzent + "}"
    + ".leer .form{fill:none;stroke:" + KARTE_FARBEN.aus + ";stroke-dasharray:4 4}";

  // Der Knopf "Teilen" in der Karte des Gesamt-Kraftrangs. Ohne Gesamt-Rang ist er ausgegraut.
  function teilenKnopf(aktiv) {
    const knopf = element("button", "knopf rang-knopf teilen-knopf", txt("teilen"));
    knopf.disabled = !aktiv;
    knopf.onclick = teilenOeffnen;
    return knopf;
  }

  // Lädt das Rang-Abzeichen aus rangSvg als Bild, damit es sich auf das Canvas zeichnen lässt.
  // rp = null ergibt das leere, gestrichelte Sechseck.
  function rangBildLaden(rp) {
    return new Promise(function (fertig, fehler) {
      // Als eigenständiges Bild braucht das SVG seinen Namensraum, eine Größe und die Farben im Bild selbst
      const svg = rangSvg(rp)
        .replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="520" ')
        .replace('aria-hidden="true">', 'aria-hidden="true"><style>' + KARTE_SVG_STIL + "</style>");
      const bild = new Image();
      bild.onload = function () {
        fertig(bild);
      };
      bild.onerror = fehler;
      bild.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    });
  }

  // Schreibt eine Zeile Text auf das Canvas. Ist sie breiter als maxBreite, wird die Schrift kleiner,
  // höchstens bis auf 70 %. Passt sie dann immer noch nicht (oder soll sie gleich gekürzt werden),
  // endet sie mit "…". Gibt die Breite des geschriebenen Textes zurück.
  function karteText(ctx, text, x, y, maxBreite, stil) {
    let groesse = stil.groesse;
    const schrift = function () {
      ctx.font = stil.gewicht + " " + groesse + "px " + KARTE_SCHRIFT;
    };
    schrift();
    if (!stil.kuerzen) {
      while (ctx.measureText(text).width > maxBreite && groesse > stil.groesse * 0.7) {
        groesse -= 1;
        schrift();
      }
    }
    let zeile = text;
    if (ctx.measureText(zeile).width > maxBreite) {
      const zeichen = Array.from(text);
      while (zeichen.length > 1 && ctx.measureText(zeichen.join("") + "…").width > maxBreite) {
        zeichen.pop();
      }
      zeile = zeichen.join("") + "…";
    }
    ctx.fillStyle = stil.farbe;
    ctx.textAlign = stil.ausrichtung || "left";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(zeile, x, y);
    return ctx.measureText(zeile).width;
  }

  // Ein Rechteck mit runden Ecken als Fläche
  function karteFeld(ctx, x, y, breite, hoehe, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + breite, y, x + breite, y + hoehe, radius);
    ctx.arcTo(x + breite, y + hoehe, x, y + hoehe, radius);
    ctx.arcTo(x, y + hoehe, x, y, radius);
    ctx.arcTo(x, y, x + breite, y, radius);
    ctx.closePath();
    ctx.fillStyle = KARTE_FARBEN.feld;
    ctx.fill();
  }

  // Zeichnet die Karte aus dem Stand der Ränge (von rangStand) und gibt das Canvas zurück, sobald es fertig ist.
  // Auf der Karte stehen nur Ränge, die Serie, der Benutzername und der Name der App:
  // kein Körpergewicht, keine Gewichte, kein Datum.
  function teilenKarteZeichnen(stand) {
    const gesamt = stand.kraft.gesamt;
    const serie = stand.zahlen.serie;
    let konstanzRp = null;
    if (serie > 0) {
      konstanzRp = stand.konstanzRp;
    }

    // Erst alle Abzeichen laden: das große, eins je Muster und das der Konstanz
    const rps = [gesamt];
    for (let i = 0; i < MUSTER.length; i++) {
      const m = stand.kraft.muster[MUSTER[i]];
      if (m && m.rp !== null) {
        rps.push(m.rp);
      } else {
        rps.push(null);
      }
    }
    rps.push(konstanzRp);

    return Promise.all(rps.map(rangBildLaden)).then(function (bilder) {
      const canvas = document.createElement("canvas");
      canvas.width = KARTE_BREITE;
      canvas.height = KARTE_HOEHE;
      const ctx = canvas.getContext("2d");
      const innen = KARTE_BREITE - 2 * KARTE_RAND;
      const mitte = KARTE_BREITE / 2;

      // Hintergrund: schwarz, hinter dem großen Abzeichen ein schwacher grüner Schein
      ctx.fillStyle = KARTE_FARBEN.grund;
      ctx.fillRect(0, 0, KARTE_BREITE, KARTE_HOEHE);
      const schein = ctx.createRadialGradient(mitte, 420, 0, mitte, 420, 620);
      schein.addColorStop(0, "rgba(198, 241, 53, 0.22)");
      schein.addColorStop(1, "rgba(198, 241, 53, 0)");
      ctx.fillStyle = schein;
      ctx.fillRect(0, 0, KARTE_BREITE, 1100);

      // Gesamt-Kraftrang: das Abzeichen (300 px hoch, das SVG ist 48 zu 52), darunter Name und Unterstufe
      const abzeichenHoehe = 300;
      const abzeichenBreite = abzeichenHoehe * 48 / 52;
      ctx.drawImage(bilder[0], mitte - abzeichenBreite / 2, 270, abzeichenBreite, abzeichenHoehe);
      karteText(ctx, rangName(gesamt), mitte, 700, innen, { groesse: 120, gewicht: 800, farbe: KARTE_FARBEN.text, ausrichtung: "center" });
      karteText(ctx, txt("rang.gesamt"), mitte, 765, innen, { groesse: 40, gewicht: 500, farbe: KARTE_FARBEN.leise, ausrichtung: "center" });

      // Die sechs Bewegungsmuster: zwei Spalten, drei Zeilen. Ohne Wert steht ein Strich da.
      const abstandX = 28;
      const abstandY = 20;
      const feldBreite = (innen - abstandX) / 2;
      const feldHoehe = 150;
      const kleinHoehe = 84;
      const kleinBreite = kleinHoehe * 48 / 52;
      for (let i = 0; i < MUSTER.length; i++) {
        const x = KARTE_RAND + (i % 2) * (feldBreite + abstandX);
        const y = 840 + Math.floor(i / 2) * (feldHoehe + abstandY);
        const rp = rps[i + 1];
        karteFeld(ctx, x, y, feldBreite, feldHoehe, 32);
        ctx.drawImage(bilder[i + 1], x + 24, y + (feldHoehe - kleinHoehe) / 2, kleinBreite, kleinHoehe);
        const textX = x + 24 + kleinBreite + 20;
        const textBreite = feldBreite - (textX - x) - 24;
        karteText(ctx, txt("muster." + MUSTER[i]), textX, y + 62, textBreite, { groesse: 34, gewicht: 500, farbe: KARTE_FARBEN.leise });
        if (rp === null) {
          karteText(ctx, "–", textX, y + 116, textBreite, { groesse: 46, gewicht: 700, farbe: KARTE_FARBEN.aus });
        } else {
          karteText(ctx, rangName(rp), textX, y + 116, textBreite, { groesse: 46, gewicht: 700, farbe: KARTE_FARBEN.text });
        }
      }

      // Konstanz: ein Feld über die ganze Breite. Links die Serie in Wochen, rechts der Rang.
      const konstanzY = 1360;
      const konstanzHoehe = 120;
      const serieHoehe = 72;
      const serieBreite = serieHoehe * 48 / 52;
      karteFeld(ctx, KARTE_RAND, konstanzY, innen, konstanzHoehe, 32);
      ctx.drawImage(bilder[bilder.length - 1], KARTE_RAND + 24, konstanzY + (konstanzHoehe - serieHoehe) / 2, serieBreite, serieHoehe);
      const rechts = KARTE_RAND + innen - 28;
      const links = KARTE_RAND + 24 + serieBreite + 20;
      let rangBreite = 0;
      if (konstanzRp === null) {
        rangBreite = karteText(ctx, "–", rechts, konstanzY + 74, 300, { groesse: 40, gewicht: 700, farbe: KARTE_FARBEN.aus, ausrichtung: "right" });
        karteText(ctx, txt("rang.konstanz"), links, konstanzY + 74, rechts - rangBreite - 24 - links, { groesse: 40, gewicht: 500, farbe: KARTE_FARBEN.leise });
      } else {
        rangBreite = karteText(ctx, rangName(konstanzRp), rechts, konstanzY + 74, 320, { groesse: 40, gewicht: 700, farbe: KARTE_FARBEN.akzent, ausrichtung: "right" });
        karteText(ctx, txtAnzahl("profil.serieText", serie), links, konstanzY + 74, rechts - rangBreite - 24 - links, { groesse: 40, gewicht: 700, farbe: KARTE_FARBEN.text });
      }

      // Unten: links der Benutzername (ein zu langer wird gekürzt), rechts der Name der App.
      // Ohne Benutzername steht der Name der App in der Mitte.
      const fussY = 1590;
      if (profil.benutzername) {
        const appBreite = karteText(ctx, APP_NAME, KARTE_RAND + innen, fussY, innen / 2, { groesse: 38, gewicht: 800, farbe: KARTE_FARBEN.akzent, ausrichtung: "right" });
        karteText(ctx, "@" + profil.benutzername, KARTE_RAND, fussY, innen - appBreite - 40, { groesse: 38, gewicht: 500, farbe: KARTE_FARBEN.leise, kuerzen: true });
      } else {
        karteText(ctx, APP_NAME, mitte, fussY, innen, { groesse: 38, gewicht: 800, farbe: KARTE_FARBEN.akzent, ausrichtung: "center" });
      }
      return canvas;
    });
  }

  // Das fertige Bild der Karte als Datei (null = keins), solange die Vorschau offen ist
  let teilenDatei = null;

  // "Teilen" in der Rang-Karte: zeichnet die Karte und zeigt sie als Vorschau.
  // Das Bild ist fertig, bevor in der Vorschau "Teilen" angetippt wird. Das Teilen-Menü des Handys
  // öffnet sich nur direkt nach einem Tipp, nicht erst nach dem Zeichnen.
  function teilenOeffnen() {
    const stand = rangStand();
    if (stand.kraft.gesamt === null) {
      return;
    }
    teilenDatei = null;
    const bild = document.getElementById("teilen-bild");
    const meldung = document.getElementById("teilen-meldung");
    const knopf = document.getElementById("teilen-ausfuehren");
    bild.alt = txt("teilen.alt");
    meldung.textContent = "";

    teilenKarteZeichnen(stand).then(function (canvas) {
      return new Promise(function (fertig) {
        canvas.toBlob(fertig, "image/png");
      });
    }).then(function (blob) {
      if (!blob) {
        throw new Error("kein Bild");
      }
      teilenDatei = new File([blob], APP_NAME.toLowerCase() + "-rang.png", { type: "image/png" });
      if (bild.src) {
        URL.revokeObjectURL(bild.src);
      }
      bild.src = URL.createObjectURL(blob);
      bild.classList.remove("versteckt");
      knopf.disabled = false;
      zusatzSheetOeffnen("teilen-sheet");
    }).catch(function () {
      bild.classList.add("versteckt");
      knopf.disabled = true;
      meldung.textContent = txt("teilen.fehler");
      zusatzSheetOeffnen("teilen-sheet");
    });
  }

  // "Teilen" in der Vorschau: das Teilen-Menü des Handys mit dem Bild als Datei.
  // Kann das Gerät keine Dateien teilen oder schlägt es fehl, wird das Bild heruntergeladen.
  // Ein geschlossenes Teilen-Menü ist kein Fehler, die Vorschau bleibt dann einfach offen.
  function teilenAusfuehren() {
    const datei = teilenDatei;
    if (!datei) {
      return;
    }
    if (navigator.canShare && navigator.canShare({ files: [datei] })) {
      navigator.share({ files: [datei] }).then(zusatzSheetsSchliessen).catch(function (fehler) {
        if (fehler.name !== "AbortError") {
          dateiSpeichern(datei);
          zusatzSheetsSchliessen();
        }
      });
      return;
    }
    dateiSpeichern(datei);
    zusatzSheetsSchliessen();
  }

  // Der Konstanz-Rang: die Serie in Wochen und die angesparten Pausenwochen als kleine Symbole
  function konstanzKarte(stand) {
    const karte = element("div", "karte rang-karte");
    const serie = stand.zahlen.serie;

    if (serie === 0) {
      karte.appendChild(rangKopf(null, txt("rang.konstanz"), txt("rang.keineSerie")));
      karte.appendChild(element("div", "routine-info", txt("rang.konstanzLeer", { n: SERIE_TAGE_PRO_WOCHE })));
      return karte;
    }

    const kopf = rangKopf(stand.konstanzRp, txt("rang.konstanz"), rangName(stand.konstanzRp));
    const pausen = element("div", "rang-pausen");
    pausen.setAttribute("role", "img");
    pausen.setAttribute("aria-label", txtAnzahl("rang.pausen", stand.zahlen.pausen));
    pausen.title = txtAnzahl("rang.pausen", stand.zahlen.pausen);
    for (let i = 0; i < SERIE_PAUSEN_MAX; i++) {
      const symbol = element("span", "rang-pause");
      symbol.classList.toggle("voll", i < stand.zahlen.pausen);
      symbol.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="6"/><path d="M9.5 8.5v7M14.5 8.5v7"/></svg>';
      pausen.appendChild(symbol);
    }
    kopf.appendChild(pausen);
    karte.appendChild(kopf);

    karte.appendChild(element("div", "rang-serie", txtAnzahl("profil.serieText", serie) + " · " + txtAnzahl("rang.pausen", stand.zahlen.pausen)));
    rangFortschritt(karte, stand.konstanzRp, function (name, rp) {
      // Aus den fehlenden RP die fehlenden Wochen machen, aufgerundet auf ganze Wochen
      const wochen = Math.max(1, Math.ceil(wertFuerRP(stand.konstanzRp + rp, KONSTANZ_SCHWELLEN) - serie - 1e-9));
      return txtAnzahl("rang.nochWochen", wochen, { rang: name });
    });
    return karte;
  }

  // Die Karte eines Bewegungsmusters: Rang, Balken und die Übung, aus der der Wert stammt.
  // Antippen öffnet den Verlauf dieser Übung. Ohne Wert steht da, warum er fehlt (grund aus musterGruende)
  // oder womit sich das Muster füllen lässt. Antippen öffnet dann die Liste der Übungen, die zählen.
  function musterKarte(id, m, grund) {
    if (!m) {
      const leer = element("button", "karte muster-karte leer");
      leer.appendChild(element("div", "kachel-titel", txt("muster." + id)));
      if (grund && grund.art === "koerper") {
        leer.appendChild(element("div", "muster-rang", "–"));
        leer.appendChild(element("div", "muster-aus", txt("muster.ohneKoerper")));
        leer.appendChild(element("div", "muster-aus", txt("muster.aus", { uebung: uebungName(grund.uebungId) })));
      } else if (grund && grund.art === "wdh") {
        leer.appendChild(element("div", "muster-rang", txt("muster.leer")));
        leer.appendChild(element("div", "muster-aus", txt("muster.nurWdh", { von: RANG_WDH_MIN, bis: RANG_WDH_MAX })));
      } else {
        leer.appendChild(element("div", "muster-rang", txt("muster.leer")));
        leer.appendChild(element("div", "muster-aus", txt("muster.beispiel", { uebung: uebungName(MUSTER_REFERENZ[id]) })));
      }
      leer.onclick = function () {
        musterListeOeffnen(id);
      };
      return leer;
    }

    const karte = element("button", "karte muster-karte");
    karte.appendChild(element("div", "kachel-titel", txt("muster." + id)));
    if (m.rp === null) {
      karte.appendChild(element("div", "muster-rang", "–"));
      karte.appendChild(element("div", "muster-aus", txt("muster.ohneKoerper")));
    } else {
      karte.appendChild(element("div", "muster-rang", rangName(m.rp)));
      karte.appendChild(rangBalken(rpZuRang(m.rp).rpInStufe / RP_JE_STUFE));
    }
    karte.appendChild(element("div", "muster-aus", txt("muster.aus", { uebung: uebungName(m.uebungId) })));
    karte.onclick = function () {
      verlaufOeffnen(uebungName(m.uebungId), m.uebungId);
    };
    return karte;
  }

  // Öffnet die Liste "Diese Übungen zählen" für ein Muster. Sie entsteht aus den rang-Feldern der uebungen.js,
  // die Referenz-Übung steht oben, die anderen folgen nach dem Alphabet.
  function musterListeOeffnen(id) {
    const namen = [];
    for (let i = 0; i < UEBUNGEN.length; i++) {
      if (UEBUNGEN[i].rang && UEBUNGEN[i].rang.muster === id && UEBUNGEN[i].id !== MUSTER_REFERENZ[id]) {
        namen.push(UEBUNGEN[i][sprache]);
      }
    }
    namen.sort(function (a, b) {
      return a.localeCompare(b, sprache);
    });
    namen.unshift(uebungName(MUSTER_REFERENZ[id]));

    document.getElementById("muster-sheet-titel").textContent = txt("muster." + id);
    const liste = document.getElementById("muster-sheet-liste");
    liste.innerHTML = "";
    liste.appendChild(element("p", "meldung", txt("muster.listeText", { von: RANG_WDH_MIN, bis: RANG_WDH_MAX })));
    for (let i = 0; i < namen.length; i++) {
      liste.appendChild(element("div", "sheet-zeile", namen[i]));
    }
    zusatzSheetOeffnen("muster-sheet");
  }

  // Der Name eines Abzeichens, z. B. "50 Workouts", "100 t bewegt" oder "Allrounder"
  function abzeichenTitel(a) {
    if (a.gruppe === "volumen") {
      // In kg stehen runde Tonnen da, in lbs das umgerechnete Gewicht
      let gewicht = (a.ziel / 1000).toLocaleString(gebiet()) + " t";
      if (einheit() === "lbs") {
        gewicht = volumenText(a.ziel);
      }
      return txt("abzeichen.volumen", { gewicht: gewicht });
    }
    if (a.gruppe === "gesamtRang") {
      return txt("abzeichen.gesamtRang", { rang: txt("rang.name." + rpZuRang(a.ziel).rang) });
    }
    if (a.gruppe) {
      return txt("abzeichen." + a.gruppe, { n: a.ziel });
    }
    return txt("abzeichen." + a.id);
  }

  // Die Zeile unter dem Namen: bei erreichten das Datum, bei offenen der Fortschritt oder was noch fehlt
  function abzeichenInfo(a, stand) {
    if (a.erreicht) {
      if (a.datum) {
        return datumMitJahr(new Date(a.datum));
      }
      return txt("abzeichen.erreicht");
    }
    if (a.gruppe === "volumen") {
      if (einheit() === "lbs") {
        return volumenText(a.wert) + " / " + volumenText(a.ziel);
      }
      return zahlKurz(a.wert / 1000) + " / " + (a.ziel / 1000).toLocaleString(gebiet()) + " t";
    }
    if (a.gruppe === "gesamtRang") {
      if (stand.kraft.gesamt === null) {
        return txt("rang.keiner");
      }
      return txt("abzeichen.jetzt", { rang: rangName(stand.kraft.gesamt) });
    }
    if (a.gruppe) {
      return a.wert.toLocaleString(gebiet()) + " / " + a.ziel.toLocaleString(gebiet());
    }
    if (a.id === "allrounder") {
      return txt("abzeichen.allrounder.info", { rang: txt("rang.name." + rpZuRang(ALLROUNDER_RP).rang) });
    }
    return txt("abzeichen." + a.id + ".info");
  }

  // Ein Abzeichen im Raster: erreichte farbig mit Datum, offene grau mit Fortschritt
  function abzeichenKachel(a, stand) {
    const kachel = element("div", "abzeichen");
    kachel.classList.toggle("erreicht", a.erreicht);
    // Die Farbgruppe für den Look Korund (seit Version 143). In den anderen Looks ändert die Klasse nichts.
    kachel.classList.add("kat-" + abzeichenKategorie(a));
    const bild = element("span", "abzeichen-bild");
    bild.innerHTML = medailleSvg(a.stufe);
    // Look Korund: ein Symbol im Kreis statt der Medaille
    if (lookKorund()) {
      bild.classList.add("abzeichen-symbol");
      bild.innerHTML = iconSvg(abzeichenSymbol(a));
    }
    kachel.appendChild(bild);
    kachel.appendChild(element("div", "abzeichen-titel", abzeichenTitel(a)));
    kachel.appendChild(element("div", "abzeichen-info", abzeichenInfo(a, stand)));
    return kachel;
  }

  // Look Korund (seit Version 143): Ist die Seite "Kraftrang" im Reiter Abzeichen offen? Wird nie gespeichert.
  let profilKraftrang = false;

  // Die Reihenfolge und Namen der Farbgruppen im Reiter Abzeichen
  const ABZEICHEN_KATEGORIEN = ["konstanz", "volumen", "rekorde", "kraft", "meilenstein"];

  // Der Reiter Abzeichen im Look Korund: oben "Als Nächstes", dann eine Zeile "Kraftrang ›", dann die Abzeichen nach Farbgruppen
  // mit "2 von 3". Die Zeile öffnet die Seite Kraftrang mit Gesamt-Rang, Konstanz-Rang und Bewegungsmustern.
  function profilAbzeichenKorund(inhalt, daten, stand) {
    if (profilKraftrang) {
      const kopf = element("div", "rang-ansicht-kopf");
      const zurueck = element("button", "rang-zurueck", "‹");
      zurueck.setAttribute("aria-label", txt("zurueck"));
      zurueck.onclick = function () {
        profilKraftrang = false;
        profilReiterAnzeigen();
      };
      kopf.appendChild(zurueck);
      kopf.appendChild(element("span", "rang-ansicht-titel", txt("rang.seite")));
      inhalt.appendChild(kopf);
      const gesamt = stand.kraft.gesamt === null ? gesamtRangKarte(stand) : rangHeldKarte(stand);
      gesamt.setAttribute("data-tour", "profil-rang");
      gesamt.querySelector(".teilen-knopf").setAttribute("data-tour", "profil-teilen");
      inhalt.appendChild(gesamt);
      inhalt.appendChild(konstanzKarte(stand));
      inhalt.appendChild(element("h2", "abschnitt", txt("rang.muster")));
      inhalt.appendChild(musterKorund(stand));
      inhalt.appendChild(element("p", "meldung rang-fussnote", txt("rang.hinweis")));
      return;
    }

    const naechstes = naechstesAbzeichen(daten.abzeichen);
    if (naechstes) {
      inhalt.appendChild(naechstesAbzeichenKarte(naechstes, stand));
    }

    const zeile = element("button", "karte kraftrang-zeile");
    zeile.type = "button";
    const bild = element("span", "rang-bild");
    bild.innerHTML = rangSvg(stand.kraft.gesamt);
    zeile.appendChild(bild);
    const text = element("span", "kraftrang-text");
    text.appendChild(element("span", "kraftrang-label", txt("rang.seite")));
    text.appendChild(element("span", "kraftrang-name", stand.kraft.gesamt === null ? txt("rang.keiner") : rangName(stand.kraft.gesamt)));
    zeile.appendChild(text);
    zeile.appendChild(element("span", "einst-pfeil", "›"));
    zeile.onclick = function () {
      profilKraftrang = true;
      profilReiterAnzeigen();
      window.scrollTo(0, document.getElementById("profil-reiter").offsetTop - 60);
    };
    inhalt.appendChild(zeile);

    let erstes = true;
    for (let k = 0; k < ABZEICHEN_KATEGORIEN.length; k++) {
      const kat = ABZEICHEN_KATEGORIEN[k];
      const liste = daten.abzeichen.filter(function (a) {
        return abzeichenKategorie(a) === kat && !(a.geheim && !a.erreicht);
      });
      if (liste.length === 0) {
        continue;
      }
      const erreicht = liste.filter(function (a) {
        return a.erreicht;
      }).length;
      const kopf = element("div", "abzeichen-gruppe-kopf");
      kopf.appendChild(element("span", "", txt("abzeichen.kat." + kat)));
      kopf.appendChild(element("span", "abzeichen-gruppe-zahl", txt("abzeichen.vonN", { n: erreicht, von: liste.length })));
      inhalt.appendChild(kopf);
      const raster = element("div", "abzeichen-raster");
      for (let i = 0; i < liste.length; i++) {
        const kachel = abzeichenKachel(liste[i], stand);
        if (erstes) {
          kachel.setAttribute("data-tour", "profil-abzeichen");
          erstes = false;
        }
        raster.appendChild(kachel);
      }
      inhalt.appendChild(raster);
    }
    inhalt.appendChild(element("p", "meldung rang-fussnote", txt("rang.hinweis")));
  }

  // Die große Karte des Gesamt-Rangs auf der Seite Kraftrang (Look Korund): Sechseck mit der Stufe, Name,
  // die Leiter der sechs Ränge mit dem jetzigen hervorgehoben, darunter was bis zum nächsten fehlt und "Teilen"
  function rangHeldKarte(stand) {
    const gesamt = stand.kraft.gesamt;
    const r = rpZuRang(gesamt);
    const karte = element("div", "karte rang-held");
    const sechseck = element("span", "rang-held-bild");
    const ecken = [];
    for (let i = 0; i < 6; i++) {
      const winkel = Math.PI / 180 * (60 * i - 90);
      ecken.push((42 + 38 * Math.cos(winkel)).toFixed(1) + "," + (42 + 38 * Math.sin(winkel)).toFixed(1));
    }
    sechseck.innerHTML = '<svg viewBox="0 0 84 84" aria-hidden="true"><polygon points="' + ecken.join(" ") + '"/><text x="42" y="51" text-anchor="middle">' + r.stufe + "</text></svg>";
    karte.appendChild(sechseck);
    karte.appendChild(element("div", "rang-held-label", txt("rang.gesamt")));
    karte.appendChild(element("div", "rang-held-name", txt("rang.name." + r.rang)));
    const leiter = element("div", "rang-leiter");
    for (let i = 1; i <= RANG_ANZAHL; i++) {
      const stufe = element("span", i < r.rang ? "ok" : i === r.rang ? "jetzt" : "");
      stufe.appendChild(element("i", ""));
      stufe.appendChild(document.createTextNode(txt("rang.name." + i)));
      leiter.appendChild(stufe);
    }
    leiter.style.setProperty("--leiter", ((r.rang - 1) / (RANG_ANZAHL - 1) * 100).toFixed(1) + "%");
    karte.appendChild(leiter);
    if (r.rpBisNaechste > 0) {
      karte.appendChild(element("div", "rang-held-info", txt("rang.nochRp", { rp: r.rpBisNaechste, rang: rangName(gesamt + r.rpBisNaechste) })));
    } else {
      karte.appendChild(element("div", "rang-held-info", txt("rang.maximum")));
    }
    karte.appendChild(teilenKnopf(true));
    return karte;
  }

  // Für die Einführung: Rang und "Teilen" liegen im Look Korund auf der Seite Kraftrang, das erste Abzeichen in der Übersicht
  function profilKraftrangFuer(ziel) {
    const offen = lookKorund() && (ziel === "profil-rang" || ziel === "profil-teilen");
    if (offen !== profilKraftrang) {
      profilKraftrang = offen;
      profilReiterAnzeigen();
    }
  }

  // Die Farbgruppe eines Abzeichens im Look Korund: Konstanz orange, Volumen blau, Rekorde gold, Kraft lila, sonst grün
  function abzeichenKategorie(a) {
    if (a.gruppe === "workouts" || a.gruppe === "serie") {
      return "konstanz";
    }
    if (a.gruppe === "volumen") {
      return "volumen";
    }
    if (a.gruppe === "rekorde") {
      return "rekorde";
    }
    if (a.gruppe === "gesamtRang" || a.id === "allrounder") {
      return "kraft";
    }
    return "meilenstein";
  }

  // Das offene Abzeichen mit Stufen, das seinem Ziel am nächsten ist (größter Anteil), oder null
  function naechstesAbzeichen(liste) {
    let bestes = null;
    let anteil = -1;
    for (let i = 0; i < liste.length; i++) {
      const a = liste[i];
      if (a.erreicht || !a.gruppe || a.gruppe === "gesamtRang" || !(a.ziel > 0)) {
        continue;
      }
      const jetzt = a.wert / a.ziel;
      if (jetzt > anteil) {
        bestes = a;
        anteil = jetzt;
      }
    }
    return bestes;
  }

  // Die Karte "Als Nächstes" mit Ring, Name und Stand (nur im Look Korund zu sehen)
  function naechstesAbzeichenKarte(a, stand) {
    const karte = element("div", "karte naechstes-abzeichen");
    const ring = element("span", "naechstes-ring");
    const anteil = Math.max(0, Math.min(1, a.wert / a.ziel));
    const umfang = 2 * Math.PI * 27;
    ring.innerHTML = '<svg viewBox="0 0 64 64" aria-hidden="true"><circle class="spur" cx="32" cy="32" r="27"/><circle class="wert" cx="32" cy="32" r="27" stroke-dasharray="' + (umfang * anteil).toFixed(1) + " " + umfang.toFixed(1) + '"/></svg>';
    ring.appendChild(element("span", "naechstes-prozent", Math.round(anteil * 100) + " %"));
    karte.appendChild(ring);
    const text = element("div", "naechstes-text");
    text.appendChild(element("div", "naechstes-label", txt("abzeichen.naechstes")));
    text.appendChild(element("div", "naechstes-titel", abzeichenTitel(a)));
    text.appendChild(element("div", "naechstes-info", abzeichenInfo(a, stand)));
    karte.appendChild(text);
    return karte;
  }

  // Die Bewegungsmuster im Look Korund: ein Netz mit sechs Ecken (je weiter außen, desto höher der Rang)
  // und darunter je Muster eine Zeile mit Rang oder "Noch kein Wert". Ein Tipp tut dasselbe wie die Kachel.
  function musterKorund(stand) {
    const karte = element("div", "karte muster-korund");
    const cx = 150;
    const cy = 112;
    const radius = 80;
    const punkt = function (i, r) {
      const winkel = Math.PI / 180 * (60 * i - 90);
      return [cx + radius * r * Math.cos(winkel), cy + radius * r * Math.sin(winkel)];
    };
    const sechseck = function (r) {
      const ecken = [];
      for (let i = 0; i < 6; i++) {
        ecken.push(punkt(i, r).map(function (n) {
          return n.toFixed(1);
        }).join(","));
      }
      return ecken.join(" ");
    };
    let svg = '<svg class="muster-netz" viewBox="0 0 300 224" role="img" aria-label="' + txt("rang.muster") + '">';
    svg += '<polygon class="netz-aussen" points="' + sechseck(1) + '"/><polygon class="netz-innen" points="' + sechseck(0.5) + '"/>';
    const werte = [];
    for (let i = 0; i < MUSTER.length; i++) {
      const m = stand.kraft.muster[MUSTER[i]];
      const wert = m && m.rp !== null ? Math.max(0.06, Math.min(1, m.rp / RP_MAX)) : 0.04;
      werte.push(punkt(i, wert).map(function (n) {
        return n.toFixed(1);
      }).join(","));
      const beschriftung = punkt(i, 1.24);
      svg += '<text class="' + (m && m.rp !== null ? "an" : "") + '" x="' + beschriftung[0].toFixed(1) + '" y="' + (beschriftung[1] + 4).toFixed(1) + '" text-anchor="middle">' + txt("muster.kurz." + MUSTER[i]) + "</text>";
    }
    svg += '<polygon class="netz-wert" points="' + werte.join(" ") + '"/></svg>';
    karte.insertAdjacentHTML("beforeend", svg);

    for (let i = 0; i < MUSTER.length; i++) {
      const m = stand.kraft.muster[MUSTER[i]];
      const vorlage = musterKarte(MUSTER[i], m, stand.gruende[MUSTER[i]]);
      const zeile = element("button", "muster-zeile");
      zeile.type = "button";
      zeile.appendChild(element("span", "", txt("muster." + MUSTER[i])));
      let wert = txt("muster.leer");
      if (m) {
        wert = m.rp === null ? "–" : rangName(m.rp);
      }
      zeile.appendChild(element("span", "muster-zeile-wert" + (m && m.rp !== null ? " an" : ""), wert));
      zeile.onclick = vorlage.onclick;
      karte.appendChild(zeile);
    }
    return karte;
  }

  // Der Fortschritts-Rang einer Übung als Karte für den Verlauf. Ohne Rang steht da, was fehlt.
  function fortschrittRangAnzeigen(bereich, name, id) {
    bereich.innerHTML = "";
    const punkte = verlaufPunkte(name, id, "rang");
    const f = fortschrittRang(punkte, Date.now());
    const karte = element("div", "karte rang-karte");
    if (!f) {
      karte.appendChild(rangKopf(null, txt("rang.fortschritt"), txt("rang.keiner")));
      karte.appendChild(element("div", "routine-info", txt("rang.fortschrittLeer", { n: FORTSCHRITT_MIN_TAGE, tage: BESTWERT_TAGE })));
    } else {
      karte.appendChild(rangKopf(f.rp, txt("rang.fortschritt"), rangName(f.rp)));
      karte.appendChild(rangBalken(rpZuRang(f.rp).rpInStufe / RP_JE_STUFE));
      karte.appendChild(element("div", "routine-info", txt("rang.fortschrittText", {
        start: kraftText(ausKg(f.start)),
        bestwert: kraftText(ausKg(f.bestwert)),
        prozent: prozentText(f.steigerung)
      })));
    }
    // Zählt die Übung für einen Kraft-Rang? Übungen ohne rang-Feld, eigene Übungen und Einträge ohne ID zählen nicht.
    const fest = UEBUNG_NACH_ID[id];
    if (fest && fest.rang) {
      karte.appendChild(element("div", "routine-info", txt("rang.zaehltFuer", { muster: txt("muster." + fest.rang.muster) })));
    } else {
      karte.appendChild(element("div", "routine-info", txt("rang.zaehltNicht")));
    }
    bereich.appendChild(karte);
  }

  // ---------- Look Korund, Runde 2 (seit Version 144): eigene Seiten über der App ----------
  // Serie, Vorschlag von Korund, Geräte, Einschränkungen, Dein Vorschlag und Rückblick sind Seiten in #korund-seite
  // (index.html, nur in der korund.css zu sehen). Sie liegen über dem Tab, ‹ geht eine Seite zurück.
  // Jede Seite ist { titel, rechts(), schliessen, bauen(inhalt, unten) }. Keine Seite legt von selbst etwas an,
  // gespeichert wird nur, was auf den Seiten Geräte und Einschränkungen gewählt wird, und mit „Übernehmen“ im Rückblick.
  let korundSeiten = [];

  function korundSeiteOeffnen(seite) {
    korundSeiten.push(seite);
    korundSeiteZeichnen();
  }

  function korundSeiteZurueck() {
    korundSeiten.pop();
    korundSeiteZeichnen();
  }

  function korundSeitenSchliessen() {
    korundSeiten = [];
    korundSeiteZeichnen();
  }

  // Zeichnet die oberste Seite neu (auch nach einer Wahl auf ihr, dann ohne nach oben zu springen). Ohne Seite ist die Ebene zu.
  function korundSeiteZeichnen() {
    const ebene = document.getElementById("korund-seite");
    const offen = korundSeiten.length > 0;
    ebene.classList.toggle("offen", offen);
    document.body.classList.toggle("korund-seite-offen", offen);
    if (!offen) {
      return;
    }
    const seite = korundSeiten[korundSeiten.length - 1];
    const zurueck = document.getElementById("korund-seite-zurueck");
    zurueck.textContent = seite.schliessen ? "✕" : "‹";
    zurueck.setAttribute("aria-label", txt(seite.schliessen ? "schliessen" : "zurueck"));
    zurueck.onclick = seite.schliessen ? korundSeitenSchliessen : korundSeiteZurueck;
    document.getElementById("korund-seite-titel").textContent = seite.titel;
    document.getElementById("korund-seite-rechts").textContent = seite.rechts ? seite.rechts() : "";
    const inhalt = document.getElementById("korund-seite-inhalt");
    const unten = document.getElementById("korund-seite-unten");
    const scroll = ebene.scrollTop;
    inhalt.innerHTML = "";
    unten.innerHTML = "";
    seite.bauen(inhalt, unten);
    ebene.classList.toggle("mit-unten", unten.childElementCount > 0);
    ebene.scrollTop = seite.gezeichnet ? scroll : 0;
    seite.gezeichnet = true;
  }

  // Bausteine der Seiten
  function seitenUmschalter(auswahl, aktiv, beimWechsel) {
    const schalter = element("div", "seiten-umschalter");
    umschalterBauen(schalter, auswahl, aktiv, beimWechsel);
    return schalter;
  }

  function seitenLabel(text, rechts) {
    const label = element("div", "seiten-label");
    label.appendChild(element("span", "", text));
    if (rechts) {
      label.appendChild(rechts);
    }
    return label;
  }

  // Eine Zeile einer Liste: links Symbol und Text, rechts Wert und Pfeil (mit beimTipp ein Knopf)
  function seitenZeile(text, wert, beimTipp, optionen) {
    const o = optionen || {};
    const zeile = element(beimTipp ? "button" : "div", "seiten-zeile" + (o.klasse ? " " + o.klasse : ""));
    if (beimTipp) {
      zeile.type = "button";
      zeile.onclick = beimTipp;
    }
    if (o.icon) {
      const symbol = element("span", "seiten-zeile-icon");
      symbol.innerHTML = iconSvg(o.icon);
      zeile.appendChild(symbol);
    }
    zeile.appendChild(element("span", "seiten-zeile-text", text));
    if (wert !== undefined && wert !== "") {
      zeile.appendChild(element("span", "seiten-zeile-wert" + (o.leise ? " leise" : ""), wert));
    }
    if (beimTipp) {
      zeile.appendChild(element("span", "seiten-pfeil", "›"));
    }
    return zeile;
  }

  function seitenKnopf(text, haupt, beimTipp) {
    const knopf = element("button", haupt ? "speichern-btn" : "zweit-btn", text);
    knopf.type = "button";
    knopf.onclick = beimTipp;
    return knopf;
  }

  function seitenFigur(gruppeId) {
    const figur = element("span", "seiten-figur");
    figur.innerHTML = koerperSvg(GRUPPE_NACH_ID[gruppeId] || { id: "", ansicht: "vorn" });
    return figur;
  }

  // ---------- Serie ----------

  // So viele Wochen zeigt die Liste „Letzte Wochen“, je Woche so viele Striche
  const SERIE_LISTE_WOCHEN = 7;
  const SERIE_STRICHE = 5;

  function serieSeiteOeffnen() {
    if (!lookKorund()) {
      return;
    }
    korundSeiteOeffnen({ titel: txt("serie.titel"), bauen: serieSeiteBauen });
  }

  // Krank oder Urlaub in der Woche ab montag, sonst ""
  function auszeitArtInWoche(montag) {
    const von = montag.getTime();
    const bis = new Date(montag.getFullYear(), montag.getMonth(), montag.getDate() + 7).getTime();
    const liste = auszeiten();
    for (let i = 0; i < liste.length; i++) {
      const ende = liste[i].bis === null ? Date.now() : liste[i].bis;
      if (liste[i].von < bis && ende >= von) {
        return liste[i].art;
      }
    }
    return "";
  }

  function serieSeiteBauen(inhalt) {
    const zahlen = gesamtZahlen();
    const montag = montagDerWoche(new Date());
    const tage = trainingstage();
    const jeWoche = {};
    Object.keys(tage).forEach(function (s) {
      const m = montagDerWoche(tage[s].datum).getTime();
      jeWoche[m] = (jeWoche[m] || 0) + 1;
    });

    const karte = element("div", "karte seiten-karte serie-held");
    const kopf = element("div", "seiten-kopfzeile");
    const symbol = element("span", "serie-symbol");
    symbol.innerHTML = iconSvg("flamme");
    kopf.appendChild(symbol);
    kopf.appendChild(element("span", "seiten-klein-label", txt("serie.aktuell")));
    karte.appendChild(kopf);
    const zahl = element("div", "serie-zahl");
    zahl.appendChild(document.createTextNode(String(zahlen.serie)));
    zahl.appendChild(element("small", "", txt(zahlen.serie === 1 ? "serie.woche" : "serie.wochen")));
    karte.appendChild(zahl);
    const diese = jeWoche[montag.getTime()] || 0;
    const fehlt = SERIE_TAGE_PRO_WOCHE - diese;
    karte.appendChild(element("div", "seiten-klein", txt("serie.regel", { n: SERIE_TAGE_PRO_WOCHE }) + " " + (fehlt > 0 ? txtAnzahl("serie.fehlt", fehlt) : txt("serie.geschafft"))));
    karte.appendChild(element("div", "seiten-trenn"));
    const fuss = element("div", "seiten-kopfzeile seiten-klein");
    const links = element("span", "");
    links.appendChild(document.createTextNode(txt("serie.laengste") + " "));
    links.appendChild(element("b", "", txtAnzahl("serie.anzahl", zahlen.laengsteSerie)));
    fuss.appendChild(links);
    const rechts = element("span", "seiten-rechts");
    rechts.appendChild(document.createTextNode(txt("serie.pausen") + " "));
    rechts.appendChild(element("b", "", String(zahlen.pausen)));
    fuss.appendChild(rechts);
    karte.appendChild(fuss);
    inhalt.appendChild(karte);

    inhalt.appendChild(seitenLabel(txt("serie.letzte")));
    const liste = element("div", "karte seiten-liste");
    for (let w = 0; w < SERIE_LISTE_WOCHEN; w++) {
      const m = new Date(montag.getFullYear(), montag.getMonth(), montag.getDate() - 7 * w);
      const anzahl = jeWoche[m.getTime()] || 0;
      const auszeit = anzahl < SERIE_TAGE_PRO_WOCHE ? auszeitArtInWoche(m) : "";
      const zeile = element("div", "serie-woche");
      zeile.appendChild(element("span", "serie-kw", txt("serie.kw", { n: kalenderwoche(m) })));
      const striche = element("span", "serie-striche");
      for (let i = 0; i < SERIE_STRICHE; i++) {
        striche.appendChild(element("i", i < anzahl ? (auszeit ? "frei" : "an") : ""));
      }
      zeile.appendChild(striche);
      let ende = anzahl >= SERIE_TAGE_PRO_WOCHE ? "✓" : "–";
      if (w === 0) {
        ende = txt("serie.laeuft");
      } else if (auszeit) {
        ende = txt("status." + auszeit);
      }
      zeile.appendChild(element("span", "serie-ende", ende));
      liste.appendChild(zeile);
    }
    inhalt.appendChild(liste);
  }

  // ---------- Geräte ----------

  // Die Geräte für „Vorschlag von Korund“. Erkannt wird eine Übung an ihrem Namen (Deutsch und Englisch),
  // eine Übung kann mehrere brauchen (Bankdrücken: Langhantel und Flachbank). Maschinen ohne eigenes Gerät
  // brauchen „Andere Maschinen“ (Bereich „maschine“). Übungen ohne Gerät (Eigengewicht) gehen immer.
  const GERAETE = [
    { id: "langhantel", gruppe: "frei", muster: /langhantel|barbell|sz-|\bsz\b|ez-bar|ez bar/ },
    { id: "kurzhantel", gruppe: "frei", muster: /kurzhantel|dumbbell/ },
    { id: "kettlebell", gruppe: "frei", muster: /kettlebell|turkish get-up/ },
    { id: "bank", gruppe: "frei", muster: /bankdrücken|bench|schrägbank|negativbank|flachbank|incline|decline/ },
    { id: "kabel", gruppe: "kabel", muster: /kabel|cable|seilzug|latzug|pulldown|face pull/ },
    { id: "klimmzug", gruppe: "kabel", muster: /klimmz|pull-up|chin-up|hängendes|hanging/ },
    { id: "dip", gruppe: "kabel", muster: /\bdips?\b|dip-/ },
    { id: "beinpresse", gruppe: "maschine", muster: /beinpresse|leg press/ },
    { id: "multipresse", gruppe: "maschine", muster: /multipresse|smith/ },
    { id: "maschine", gruppe: "maschine", muster: null }
  ];
  const GERAETE_GRUPPEN = ["frei", "kabel", "maschine"];
  const GERAETE_ORTE = ["gym", "zuhause", "unterwegs"];
  // Ohne Wahl: im Gym alles, zuhause Kurzhanteln und Bank, unterwegs nichts
  const GERAETE_START = { zuhause: ["kurzhantel", "bank"], unterwegs: [] };

  // Freie Übungen, deren Name kein Gerät nennt (Stand Version 144: 61 Übungen). Die Kurzhantel-Liste wird zuerst geprüft,
  // so ist der Goblet Squat eine Kurzhantel-Übung und die Kniebeuge eine Langhantel-Übung.
  const FREI_KURZHANTEL = /goblet|split squat|cossack|sumo-kniebeuge|sumo squat|hammer|konzentration|concentration|zottman|kickback|seitheben|lateral raise|frontheben|front raise|arnold|reverse fl|farmer|suitcase|ausfallschritt|lunge|step-up|überkopf-trizeps|overhead triceps|handgelenkcurl|wrist curl|mit gewicht|weighted|schulterdrücken|shoulder press|seal row/;
  const FREI_LANGHANTEL = /meadows|pendlay|landmine|t-bar|kreuzheben|deadlift|good morning|rack pull|trap bar|high pull|military|z-press|bradford|kniebeuge|squat|hip thrust|scott|preacher|drag curl|french press|skull|plate pinch/;

  // Die Geräte, die eine Übung braucht (Liste von ids, leer ohne Gerät). Eigene Übungen kennt der Vorschlag nicht.
  function uebungGeraete(u) {
    const name = ((u.de || "") + " " + (u.en || "")).toLowerCase();
    const liste = [];
    for (let i = 0; i < GERAETE.length; i++) {
      if (GERAETE[i].muster && GERAETE[i].muster.test(name)) {
        liste.push(GERAETE[i].id);
      }
    }
    const nurBank = liste.every(function (id) {
      return id === "bank";
    });
    // Eine Maschine, die keines der Geräte oben ist (Brustpresse, Butterfly …)
    if (u.bereich === "maschine" && nurBank) {
      liste.push("maschine");
    }
    // Freie Gewichte ohne Gerät im Namen: zuerst die typischen Kurzhantel-Übungen, sonst die mit Langhantel
    if (u.bereich === "frei" && nurBank) {
      if (FREI_KURZHANTEL.test(name)) {
        liste.push("kurzhantel");
      } else if (FREI_LANGHANTEL.test(name)) {
        liste.push("langhantel");
      }
    }
    return liste;
  }

  // Gespeichert in einstellungen.geraete: { ort, gym, zuhause, unterwegs } mit den Listen der vorhandenen Geräte
  function geraeteStand() {
    const roh = einstellungen.geraete && typeof einstellungen.geraete === "object" ? einstellungen.geraete : {};
    const alle = GERAETE.map(function (g) {
      return g.id;
    });
    const stand = { ort: GERAETE_ORTE.indexOf(roh.ort) !== -1 ? roh.ort : "gym" };
    GERAETE_ORTE.forEach(function (ort) {
      stand[ort] = Array.isArray(roh[ort]) ? roh[ort].filter(function (id) {
        return alle.indexOf(id) !== -1;
      }) : (GERAETE_START[ort] || alle).slice();
    });
    return stand;
  }

  function geraeteSpeichern(stand) {
    einstellungen.geraete = stand;
    einstellungenSpeichern();
  }

  function geraeteVorhanden() {
    const stand = geraeteStand();
    return stand[stand.ort];
  }

  function geraeteSeiteOeffnen() {
    korundSeiteOeffnen({
      titel: txt("geraete.titel"),
      rechts: function () {
        return txt("geraete.anzahl", { n: geraeteVorhanden().length, von: GERAETE.length });
      },
      bauen: geraeteSeiteBauen
    });
  }

  function geraeteSeiteBauen(inhalt, unten) {
    const stand = geraeteStand();
    const vorhanden = stand[stand.ort];
    const aendern = function () {
      geraeteSpeichern(stand);
      korundSeiteZeichnen();
    };
    inhalt.appendChild(seitenUmschalter(GERAETE_ORTE.map(function (o) {
      return { id: o, text: txt("geraete.ort." + o) };
    }), stand.ort, function (ort) {
      stand.ort = ort;
      aendern();
    }));
    GERAETE_GRUPPEN.forEach(function (gruppeId) {
      const gruppe = GERAETE.filter(function (g) {
        return g.gruppe === gruppeId;
      });
      const alle = gruppe.every(function (g) {
        return vorhanden.indexOf(g.id) !== -1;
      });
      const umschalten = element("button", "seiten-label-knopf", txt(alle ? "geraete.keine" : "geraete.alle"));
      umschalten.type = "button";
      umschalten.onclick = function () {
        gruppe.forEach(function (g) {
          const platz = vorhanden.indexOf(g.id);
          if (alle && platz !== -1) {
            vorhanden.splice(platz, 1);
          } else if (!alle && platz === -1) {
            vorhanden.push(g.id);
          }
        });
        aendern();
      };
      inhalt.appendChild(seitenLabel(txt("geraete.gruppe." + gruppeId), umschalten));
      const liste = element("div", "karte seiten-liste");
      gruppe.forEach(function (g) {
        const an = vorhanden.indexOf(g.id) !== -1;
        const zeile = element("button", "seiten-zeile" + (an ? "" : " aus"));
        zeile.type = "button";
        zeile.setAttribute("role", "checkbox");
        zeile.setAttribute("aria-checked", an ? "true" : "false");
        zeile.appendChild(element("span", "seiten-zeile-text", txt("geraet." + g.id)));
        const haken = element("span", "seiten-haken");
        if (an) {
          haken.innerHTML = iconSvg("haken");
        }
        zeile.appendChild(haken);
        zeile.onclick = function () {
          const platz = vorhanden.indexOf(g.id);
          if (platz === -1) {
            vorhanden.push(g.id);
          } else {
            vorhanden.splice(platz, 1);
          }
          aendern();
        };
        liste.appendChild(zeile);
      });
      inhalt.appendChild(liste);
    });
    unten.appendChild(seitenKnopf(txt("speichern"), true, korundSeiteZurueck));
  }

  // ---------- Einschränkungen ----------

  // Die Stellen und welche Übungen sie weglassen: „leicht“ nur die stärksten Belastungen, ab „mittel“ mehr.
  // Geprüft wird der Name der Übung (Deutsch und Englisch). Kein Ersatz für ärztlichen Rat, das steht auf der Seite.
  const EINSCHRAENKUNGEN = [
    { id: "schulter", leicht: /überkopf|overhead|military|schulterdrücken|shoulder press|nackendrücken|aufrechtes rudern|upright row|arnold|z-press|bradford|pike/, mittel: /dips?\b|bankdrücken|bench press|brustpresse|chest press|seitheben|lateral raise|frontheben|front raise|klimmz|pull-up|schrägbank|incline/ },
    { id: "ellbogen", leicht: /skull|french|stirndrücken|overhead triceps/, mittel: /trizeps|triceps|curl|dips?\b/ },
    { id: "handgelenk", leicht: /frontkniebeuge|front squat|liegestütz|push-up/, mittel: /langhantel|barbell|curl|handgelenk|wrist/ },
    { id: "ruecken", leicht: /kreuzheben|deadlift|good morning/, mittel: /vorgebeugt|bent.?over|rudern|row|kniebeuge|squat|hyperextension|rückenstrecker/ },
    { id: "huefte", leicht: /ausfallschritt|lunge|split squat|sumo/, mittel: /kniebeuge|squat|kreuzheben|deadlift|hip thrust|adduktor|adductor|abduktor|abductor/ },
    { id: "knie", leicht: /kniebeuge|squat|ausfallschritt|lunge|sprung|jump|step-up/, mittel: /beinstrecker|leg extension|beinpresse|leg press|hackenschmidt|hack/ },
    { id: "sprunggelenk", leicht: /sprung|jump|seilspringen/, mittel: /ausfallschritt|lunge|kniebeuge|squat|wadenheben|calf raise/ }
  ];
  const EINSCHRAENKUNG_SEITEN = ["links", "rechts", "beide"];
  const EINSCHRAENKUNG_STUFEN = ["leicht", "mittel", "stark"];

  function einschraenkungRegel(stelle) {
    for (let i = 0; i < EINSCHRAENKUNGEN.length; i++) {
      if (EINSCHRAENKUNGEN[i].id === stelle) {
        return EINSCHRAENKUNGEN[i];
      }
    }
    return null;
  }

  // Gespeichert in einstellungen.einschraenkungen: Liste von { stelle, seite, stufe }. Ungültige Einträge zählen nicht.
  function einschraenkungen() {
    if (!Array.isArray(einstellungen.einschraenkungen)) {
      return [];
    }
    return einstellungen.einschraenkungen.filter(function (e) {
      return e && einschraenkungRegel(e.stelle) && EINSCHRAENKUNG_SEITEN.indexOf(e.seite) !== -1 && EINSCHRAENKUNG_STUFEN.indexOf(e.stufe) !== -1;
    });
  }

  function einschraenkungVon(stelle) {
    return einschraenkungen().filter(function (e) {
      return e.stelle === stelle;
    })[0] || null;
  }

  function einschraenkungSetzen(stelle, wert) {
    const liste = einschraenkungen().filter(function (e) {
      return e.stelle !== stelle;
    });
    if (wert) {
      liste.push({ stelle: stelle, seite: wert.seite, stufe: wert.stufe });
    }
    einstellungen.einschraenkungen = liste;
    einstellungenSpeichern();
  }

  // Lässt eine Übung (aus UEBUNG_NACH_ID) wegen einer Einschränkung weg? Gibt die Stelle zurück oder "".
  function uebungEingeschraenkt(u) {
    if (!u) {
      return "";
    }
    const name = ((u.de || "") + " " + (u.en || "")).toLowerCase();
    const liste = einschraenkungen();
    for (let i = 0; i < liste.length; i++) {
      const regel = einschraenkungRegel(liste[i].stelle);
      if (regel.leicht.test(name) || (liste[i].stufe !== "leicht" && regel.mittel.test(name))) {
        return liste[i].stelle;
      }
    }
    return "";
  }

  // Für die Zeile im Vorschlag: „keine“, „Knie links“ oder „2 Stellen“
  function einschraenkungKurz() {
    const liste = einschraenkungen();
    if (liste.length === 0) {
      return txt("einschraenkung.keine");
    }
    if (liste.length > 1) {
      return txt("einschraenkung.mehrere", { n: liste.length });
    }
    return txt("stelle." + liste[0].stelle) + (liste[0].seite === "beide" ? "" : " " + txt("einschraenkung.seiteKurz." + liste[0].seite));
  }

  // Die Stelle, die auf der Seite gerade offen ist ("" = keine)
  let einschraenkungOffen = "";

  function einschraenkungenSeiteOeffnen() {
    einschraenkungOffen = "";
    korundSeiteOeffnen({ titel: txt("einschraenkung.titel"), bauen: einschraenkungenSeiteBauen });
  }

  function einschraenkungenSeiteBauen(inhalt) {
    inhalt.appendChild(element("p", "seiten-text", txt("einschraenkung.text")));
    if (einschraenkungOffen) {
      const stelle = einschraenkungOffen;
      // Eine neu geöffnete Stelle gilt sofort als „links, leicht“, so wie die Auswahl es zeigt
      if (!einschraenkungVon(stelle)) {
        einschraenkungSetzen(stelle, { seite: "links", stufe: "leicht" });
      }
      const jetzt = einschraenkungVon(stelle);
      const karte = element("div", "karte seiten-karte einschraenkung-offen");
      const kopf = element("div", "seiten-kopfzeile");
      kopf.appendChild(element("span", "seiten-titel", txt("stelle." + stelle)));
      const fertig = element("button", "seiten-link seiten-rechts", txt("fertig"));
      fertig.type = "button";
      fertig.onclick = function () {
        einschraenkungOffen = "";
        korundSeiteZeichnen();
      };
      kopf.appendChild(fertig);
      karte.appendChild(kopf);
      karte.appendChild(element("div", "seiten-klein-label einschraenkung-frage", txt("einschraenkung.seite")));
      karte.appendChild(seitenUmschalter(EINSCHRAENKUNG_SEITEN.map(function (s) {
        return { id: s, text: txt("einschraenkung.seite." + s) };
      }), jetzt.seite, function (s) {
        einschraenkungSetzen(stelle, { seite: s, stufe: jetzt.stufe });
        korundSeiteZeichnen();
      }));
      karte.appendChild(element("div", "seiten-klein-label einschraenkung-frage", txt("einschraenkung.wieStark")));
      karte.appendChild(seitenUmschalter(EINSCHRAENKUNG_STUFEN.map(function (s) {
        return { id: s, text: txt("einschraenkung.stufe." + s) };
      }), jetzt.stufe, function (s) {
        einschraenkungSetzen(stelle, { seite: jetzt.seite, stufe: s });
        korundSeiteZeichnen();
      }));
      const fuss = element("div", "seiten-kopfzeile einschraenkung-fuss");
      fuss.appendChild(element("span", "seiten-klein", txt("einschraenkung.ohne." + stelle + (jetzt.stufe === "leicht" ? ".leicht" : ".mehr"))));
      const weg = element("button", "seiten-link leise seiten-rechts", txt("einschraenkung.entfernen"));
      weg.type = "button";
      weg.onclick = function () {
        einschraenkungSetzen(stelle, null);
        einschraenkungOffen = "";
        korundSeiteZeichnen();
      };
      fuss.appendChild(weg);
      karte.appendChild(fuss);
      inhalt.appendChild(karte);
    }
    const liste = element("div", "karte seiten-liste");
    EINSCHRAENKUNGEN.forEach(function (regel) {
      if (regel.id === einschraenkungOffen) {
        return;
      }
      const e = einschraenkungVon(regel.id);
      const wert = e ? txt("einschraenkung.seite." + e.seite) + " · " + txt("einschraenkung.stufe." + e.stufe) : txt("einschraenkung.keine");
      liste.appendChild(seitenZeile(txt("stelle." + regel.id), wert, function () {
        einschraenkungOffen = regel.id;
        korundSeiteZeichnen();
      }, { leise: !e }));
    });
    inhalt.appendChild(liste);
    inhalt.appendChild(element("p", "seiten-fuss", txt("einschraenkung.hinweis")));
  }

  // ---------- Zusatz-Training ----------

  let zusatzWahl = "vorschlag";

  function zusatzTrainingOeffnen() {
    zusatzWahl = "vorschlag";
    zusatzTrainingFuellen();
    zusatzSheetOeffnen("zusatztraining-sheet");
  }

  // Drei Karten wie im Status-Sheet: Name, kurze Erklärung, rechts der Kreis der Auswahl
  function zusatzTrainingFuellen() {
    const liste = document.getElementById("zusatztraining-liste");
    liste.innerHTML = "";
    ["vorschlag", "routine", "leer"].forEach(function (art) {
      const karte = element("button", "status-karte zusatz-karte");
      karte.type = "button";
      karte.setAttribute("role", "radio");
      karte.setAttribute("aria-checked", art === zusatzWahl ? "true" : "false");
      const text = element("span", "status-karte-text");
      text.appendChild(element("span", "status-karte-name", txt("zusatz." + art)));
      text.appendChild(element("span", "status-karte-info", txt("zusatz." + art + ".info")));
      karte.appendChild(text);
      karte.appendChild(element("span", "status-kreis"));
      karte.onclick = function () {
        zusatzWahl = art;
        zusatzTrainingFuellen();
      };
      liste.appendChild(karte);
    });
  }

  function zusatzTrainingWeiter() {
    zusatzSheetsSchliessen();
    if (zusatzWahl === "vorschlag") {
      generatorSeiteOeffnen();
    } else if (zusatzWahl === "routine") {
      korundSeiteOeffnen({ titel: txt("zusatz.routine"), bauen: zusatzRoutinenBauen });
    } else {
      // „Leer starten“: die Übungen selbst wählen im Editor einer neuen Routine, wie „+ Neue Routine“
      routineNeu();
    }
  }

  function zusatzRoutinenBauen(inhalt) {
    const liste = element("div", "karte seiten-liste");
    routinen.forEach(function (r) {
      if (r.uebungen.length === 0) {
        return;
      }
      const zeile = seitenZeile(r.name, uebungenText(r.uebungen.length), function () {
        korundSeitenSchliessen();
        routineStarten(r);
      }, { leise: true });
      zeile.insertBefore(seitenFigur(routineGruppenIds(r, 1)[0]), zeile.firstChild);
      liste.appendChild(zeile);
    });
    if (liste.childElementCount === 0) {
      liste.appendChild(seitenZeile(txt("zusatz.keineRoutine"), undefined, null, { klasse: "leise" }));
    }
    inhalt.appendChild(liste);
  }

  // ---------- Vorschlag von Korund ----------

  // Der Fokus: Figur, Partien für „erholt“ und je Platz eine Muskelgruppe. Die Plätze werden der Reihe nach gefüllt.
  const FOKUS = [
    { id: "ganzkoerper", figur: "ganzkoerper", partien: ["brust", "ruecken", "beine", "schultern", "arme"], plaetze: ["lat", "brust", "quadrizeps", "schulter-seite", "bauch", "beinbeuger", "ruecken-oben", "trizeps"] },
    { id: "oberkoerper", figur: "brust", partien: ["brust", "ruecken", "schultern", "arme"], plaetze: ["brust", "lat", "schulter-vorn", "ruecken-oben", "schulter-seite", "trizeps", "bizeps", "schulter-hinten"] },
    { id: "beine", figur: "quadrizeps", partien: ["beine"], plaetze: ["quadrizeps", "beinbeuger", "po", "quadrizeps", "waden", "adduktoren", "beinbeuger", "abduktoren"] },
    { id: "ruecken", figur: "lat", partien: ["ruecken"], plaetze: ["lat", "ruecken-oben", "lat", "schulter-hinten", "bizeps", "ruecken-unten", "trapez", "bizeps"] },
    { id: "schultern", figur: "schulter-seite", partien: ["schultern"], plaetze: ["schulter-vorn", "schulter-seite", "schulter-hinten", "schulter-seite", "trapez", "schulter-hinten", "trizeps", "bizeps"] },
    { id: "bauch", figur: "bauch", partien: [], plaetze: ["bauch", "bauch-schraeg", "bauch", "ruecken-unten", "bauch-schraeg", "bauch"] }
  ];
  const GENERATOR_ZEITEN = [30, 45, 60, 75];
  // So viele Minuten braucht eine Übung mit drei Sätzen und Pausen ungefähr
  const MINUTEN_JE_UEBUNG = 9;
  // Unter so vielen passenden Übungen je Platz wird gewürfelt
  const VORSCHLAG_AUSWAHL = 4;
  // Wdh. je Platz: die ersten zwei schwer, dann mittel, dann leichter
  const VORSCHLAG_WDH = [[8, 12], [8, 12], [10, 12], [12, 15]];

  // Nur für diese Sitzung, nie im Speicher
  let generator = { minuten: 45, fokus: "ganzkoerper", uebungen: [], wurf: 0 };

  function generatorSeiteOeffnen() {
    korundSeiteOeffnen({ titel: txt("generator.titel"), bauen: generatorSeiteBauen });
  }

  // Ein Fokus ist erholt, wenn mindestens eine seiner Partien in den letzten zwei Wochen trainiert wurde
  // und keine davon zu frisch ist (ERHOLUNG_TAGE wie bei der Karte Erholung auf Home)
  function fokusErholt(fokus, tage) {
    const bekannt = fokus.partien.filter(function (p) {
      return tage[p] !== undefined;
    });
    return bekannt.length > 0 && bekannt.every(function (p) {
      return tage[p] >= ERHOLUNG_TAGE;
    });
  }

  function generatorSeiteBauen(inhalt, unten) {
    const tage = erholungTage(eintraege, new Date());
    inhalt.appendChild(seitenLabel(txt("generator.zeit")));
    inhalt.appendChild(seitenUmschalter(GENERATOR_ZEITEN.map(function (m) {
      return { id: m, text: txt("generator.minuten", { m: m }) };
    }), generator.minuten, function (m) {
      generator.minuten = m;
      korundSeiteZeichnen();
    }));
    const legende = element("span", "seiten-klein");
    legende.appendChild(element("span", "seiten-punkt"));
    legende.appendChild(document.createTextNode(txt("generator.erholt")));
    inhalt.appendChild(seitenLabel(txt("generator.fokus"), legende));
    const raster = element("div", "generator-fokus");
    FOKUS.forEach(function (f) {
      const kachel = element("button", "generator-kachel");
      kachel.type = "button";
      kachel.setAttribute("aria-pressed", f.id === generator.fokus ? "true" : "false");
      kachel.appendChild(seitenFigur(f.figur));
      const name = element("span", "generator-name");
      if (fokusErholt(f, tage)) {
        name.appendChild(element("span", "seiten-punkt"));
      }
      name.appendChild(document.createTextNode(txt("fokus." + f.id)));
      kachel.appendChild(name);
      kachel.onclick = function () {
        generator.fokus = f.id;
        korundSeiteZeichnen();
      };
      raster.appendChild(kachel);
    });
    inhalt.appendChild(raster);
    const stand = geraeteStand();
    const liste = element("div", "karte seiten-liste generator-details");
    liste.appendChild(seitenZeile(txt("geraete.titel"), txt("geraete.ort." + stand.ort) + " · " + stand[stand.ort].length, geraeteSeiteOeffnen, { klasse: "beschriftet" }));
    liste.appendChild(seitenZeile(txt("einschraenkung.titel"), einschraenkungKurz(), einschraenkungenSeiteOeffnen, { klasse: "beschriftet" }));
    inhalt.appendChild(liste);
    unten.appendChild(seitenKnopf(txt("generator.erstellen"), true, function () {
      generator.wurf++;
      generator.uebungen = vorschlagBauen();
      korundSeiteOeffnen({ titel: txt("vorschlag.titel"), bauen: vorschlagSeiteBauen });
    }));
  }

  // Die Übungen, die für eine Muskelgruppe in Frage kommen: passend zu Geräten und Einschränkungen und noch nicht
  // im Vorschlag. Schon trainierte zuerst (für sie gibt es ein Gewicht vom letzten Mal), sonst wie in der Bibliothek.
  function vorschlagKandidaten(gruppeId, schonDa) {
    const listen = UEBUNGSLISTEN[gruppeId];
    if (!listen) {
      return [];
    }
    const vorhanden = geraeteVorhanden();
    const ids = (listen.frei || []).concat(listen.maschine || [], listen.eigen || []);
    const trainiert = {};
    trainierteUebungen().forEach(function (u) {
      trainiert[u.id] = true;
    });
    const passend = [];
    ids.forEach(function (id) {
      const u = UEBUNG_NACH_ID[id];
      if (!u || u.selbst || schonDa.indexOf(u.id) !== -1 || passend.indexOf(u) !== -1 || uebungEingeschraenkt(u)) {
        return;
      }
      if (uebungGeraete(u).every(function (g) {
        return vorhanden.indexOf(g) !== -1;
      })) {
        passend.push(u);
      }
    });
    // Stabil sortieren: trainierte nach vorn, sonst bleibt die Reihenfolge
    return passend.map(function (u, i) {
      return { u: u, i: i };
    }).sort(function (a, b) {
      return (trainiert[b.u.id] ? 1 : 0) - (trainiert[a.u.id] ? 1 : 0) || a.i - b.i;
    }).map(function (x) {
      return x.u;
    });
  }

  // Eine Zahl von 0 bis unter 1, die bei gleichem Wurf gleich bleibt. So würfelt „Neu würfeln“ neu, das Zeichnen nicht.
  function vorschlagZufall(platz) {
    const x = Math.sin((generator.wurf + 1) * 9301 + platz * 49297) * 233280;
    return x - Math.floor(x);
  }

  function vorschlagWaehlen(kandidaten, platz) {
    const auswahl = kandidaten.slice(0, VORSCHLAG_AUSWAHL);
    return auswahl[Math.floor(vorschlagZufall(platz) * auswahl.length)];
  }

  // So viele Übungen, wie in die Zeit passen (mindestens zwei), je Platz des Fokus eine
  function vorschlagBauen() {
    const fokus = FOKUS.filter(function (f) {
      return f.id === generator.fokus;
    })[0];
    const anzahl = Math.max(2, Math.round(generator.minuten / MINUTEN_JE_UEBUNG));
    const liste = [];
    const schonDa = [];
    for (let i = 0; i < fokus.plaetze.length && liste.length < anzahl; i++) {
      const kandidaten = vorschlagKandidaten(fokus.plaetze[i], schonDa);
      if (kandidaten.length > 0) {
        const u = vorschlagWaehlen(kandidaten, i);
        const wdh = VORSCHLAG_WDH[Math.min(liste.length, VORSCHLAG_WDH.length - 1)];
        schonDa.push(u.id);
        liste.push({ id: u.id, gruppe: fokus.plaetze[i], platz: i, wdh: wdh[0], wdhMax: wdh[1] });
      }
    }
    return liste;
  }

  // Der Vorschlag als Routine für trainingBeginnen: 3 Sätze, Wdh. wie gezeigt, Standard-Pause. Er wird nicht gespeichert.
  function vorschlagRoutine() {
    return {
      id: "",
      name: txt("fokus." + generator.fokus),
      uebungen: generator.uebungen.map(function (v) {
        const u = UEBUNG_NACH_ID[v.id];
        return { name: anzeigeName(u.de, u.id), uebungId: u.id, muskelgruppe: GRUPPE_NACH_ID[uebungGruppe(u)][sprache], zielSaetze: 3, zielWdh: v.wdh, zielWdhMax: v.wdhMax, pause: null };
      })
    };
  }

  function vorschlagSeiteBauen(inhalt, unten) {
    inhalt.appendChild(element("div", "seiten-gross", txt("fokus." + generator.fokus)));
    const stand = geraeteStand();
    const teile = [txt("generator.minuten", { m: generator.minuten }), uebungenText(generator.uebungen.length), txt("geraete.ort." + stand.ort)];
    const liste = einschraenkungen();
    if (liste.length === 1) {
      teile.push(txt("stelle." + liste[0].stelle + ".schonend"));
    } else if (liste.length > 1) {
      teile.push(txt("vorschlag.schonend"));
    }
    inhalt.appendChild(element("p", "seiten-text", teile.join(" · ")));
    const karte = element("div", "karte seiten-liste vorschlag-liste");
    generator.uebungen.forEach(function (v) {
      const u = UEBUNG_NACH_ID[v.id];
      const zeile = element("div", "vorschlag-zeile");
      zeile.appendChild(seitenFigur(uebungGruppe(u)));
      const text = element("span", "vorschlag-text");
      text.appendChild(element("span", "vorschlag-name", anzeigeName(u.de, u.id)));
      const info = element("span", "seiten-klein", txt("vorschlag.ziel", { s: 3, von: v.wdh, bis: v.wdhMax }));
      const punkte = verlaufPunkte(u.de, u.id, "schwer");
      if (punkte.length > 0 && punkte[punkte.length - 1].wert > 0) {
        info.appendChild(document.createTextNode(" · " + kgText(punkte[punkte.length - 1].wert)));
      } else if (uebungGeraete(u).length > 0) {
        info.appendChild(document.createTextNode(" · "));
        info.appendChild(element("span", "vorschlag-neu", txt("vorschlag.startgewicht")));
      }
      text.appendChild(info);
      zeile.appendChild(text);
      const tausch = element("button", "vorschlag-tausch");
      tausch.type = "button";
      tausch.setAttribute("aria-label", txt("vorschlag.tauschen", { name: anzeigeName(u.de, u.id) }));
      tausch.innerHTML = iconSvg("wechsel");
      const kandidaten = vorschlagKandidaten(v.gruppe, generator.uebungen.map(function (x) {
        return x.id;
      }));
      tausch.disabled = kandidaten.length === 0;
      tausch.onclick = function () {
        generator.wurf++;
        v.id = vorschlagWaehlen(kandidaten, v.platz).id;
        korundSeiteZeichnen();
      };
      zeile.appendChild(tausch);
      karte.appendChild(zeile);
    });
    if (generator.uebungen.length === 0) {
      karte.appendChild(seitenZeile(txt("vorschlag.leer"), undefined, null, { klasse: "leise" }));
    }
    inhalt.appendChild(karte);
    unten.appendChild(seitenKnopf(txt("vorschlag.neu"), false, function () {
      generator.wurf++;
      generator.uebungen = vorschlagBauen();
      korundSeiteZeichnen();
    }));
    if (generator.uebungen.length > 0) {
      unten.appendChild(seitenKnopf("▶ " + txt("routine.starten"), true, function () {
        const routine = vorschlagRoutine();
        korundSeitenSchliessen();
        routineStarten(routine);
      }));
    }
  }

  // ---------- Ruhetag im Training-Tab ----------

  // Die nächste geplante Routine nach heute (bis zu sechs Tage weiter) als { routine, tag } oder null
  function naechsteGeplante() {
    const heute = (new Date().getDay() + 6) % 7;
    for (let i = 1; i < 7; i++) {
      const routine = routineFinden(wochenplan[(heute + i) % 7]);
      if (routine && routine.uebungen.length > 0) {
        return { routine: routine, tag: i === 1 ? txt("ruhetag.morgen") : wochentag((heute + i) % 7) };
      }
    }
    return null;
  }

  // Heute ist nichts geplant oder Ruhetag: Karte „Heute“ und die Liste mit Zusatz-Training und Verschieben
  function trainingRuhetagAnzeigen(bereich) {
    const ruhe = wochenplan[(new Date().getDay() + 6) % 7] === "ruhe";
    const karte = element("div", "karte seiten-karte ruhetag-karte");
    karte.appendChild(element("div", "seiten-klein-label", txt("heute")));
    karte.appendChild(element("div", "seiten-gross", txt(ruhe ? "ruhetag" : "home.nichtsGeplant")));
    karte.appendChild(element("div", "seiten-klein", txt(ruhe ? "ruhetag.text" : "ruhetag.textLeer")));
    const naechste = naechsteGeplante();
    if (naechste) {
      karte.appendChild(element("div", "seiten-trenn"));
      const zeile = element("div", "seiten-kopfzeile");
      zeile.appendChild(seitenFigur(routineGruppenIds(naechste.routine, 1)[0]));
      const text = element("span", "seiten-stapel");
      text.appendChild(element("span", "seiten-klein-label", naechste.tag));
      text.appendChild(element("span", "seiten-titel", naechste.routine.name));
      zeile.appendChild(text);
      zeile.appendChild(element("span", "seiten-klein seiten-rechts", uebungenText(naechste.routine.uebungen.length) + " · " + txt("generator.minuten", { m: routineDauerMinuten(naechste.routine) })));
      karte.appendChild(zeile);
    }
    bereich.appendChild(karte);
    const liste = element("div", "karte seiten-liste ruhetag-liste");
    liste.appendChild(seitenZeile(txt("zusatz.titel"), undefined, zusatzTrainingOeffnen, { icon: "plus", klasse: "signal" }));
    // Ohne geplante Routine in der Woche gibt es nichts zu verschieben, dann heißt die Zeile „Woche planen“
    const geplant = wochenplan.some(function (id) {
      return routineFinden(id);
    });
    liste.appendChild(seitenZeile(txt(geplant ? "ruhetag.verschieben" : "ruhetag.planen"), undefined, function () {
      document.getElementById("wochenplan").scrollIntoView({ behavior: "smooth", block: "center" });
    }, { icon: "kalender" }));
    bereich.appendChild(liste);
  }

  // ---------- Rückblick nach 6 Wochen ----------

  // Nach so vielen Tagen im Block und mindestens so vielen Trainingstagen darin bietet Korund den Rückblick an
  const RUECKBLICK_TAGE = 42;
  const RUECKBLICK_MIN_TRAININGS = 6;

  // Ab wann der Block zählt: der letzte Rückblick (einstellungen.rueckblickAm), sonst der erste Eintrag
  function rueckblickStart() {
    if (typeof einstellungen.rueckblickAm === "number" && isFinite(einstellungen.rueckblickAm)) {
      return einstellungen.rueckblickAm;
    }
    let erster = Infinity;
    eintraege.forEach(function (e) {
      if (hatDatum(e)) {
        erster = Math.min(erster, new Date(e.datum).getTime());
      }
    });
    return erster;
  }

  // Die Trainingstage im Block (ein Tag zählt, wenn er nach dem Start endet)
  function rueckblickTrainings(start) {
    const tage = trainingstage();
    return Object.keys(tage).filter(function (s) {
      return tage[s].datum.getTime() + 86400000 > start;
    }).length;
  }

  function rueckblickFaellig() {
    const start = rueckblickStart();
    return isFinite(start) && Date.now() - start >= RUECKBLICK_TAGE * 86400000 && rueckblickTrainings(start) >= RUECKBLICK_MIN_TRAININGS;
  }

  // Die Karte oben im Training-Tab, wenn ein Rückblick fällig ist
  function rueckblickKarteAnzeigen(bereich) {
    if (!rueckblickFaellig()) {
      return;
    }
    const karte = element("button", "karte seiten-karte rueckblick-karte");
    karte.type = "button";
    const symbol = element("span", "rueckblick-symbol");
    symbol.innerHTML = iconSvg("kalender");
    karte.appendChild(symbol);
    const text = element("span", "seiten-stapel");
    text.appendChild(element("span", "seiten-titel", txt("rueckblick.karte")));
    text.appendChild(element("span", "seiten-klein", txt("rueckblick.karteText")));
    karte.appendChild(text);
    karte.appendChild(element("span", "seiten-pfeil", "›"));
    karte.onclick = rueckblickOeffnen;
    bereich.appendChild(karte);
  }

  // Antworten und Vorschläge, nur für diese Sitzung
  let rueckblick = { schlaf: "gut", energie: "normal", menge: "passt", aenderungen: [] };

  function rueckblickOeffnen() {
    rueckblick = { schlaf: "gut", energie: "normal", menge: "passt", aenderungen: [] };
    korundSeiteOeffnen({
      titel: txt("rueckblick.titel"),
      schliessen: true,
      rechts: function () {
        return txt("rueckblick.schritt", { n: 1 });
      },
      bauen: rueckblickFragenBauen
    });
  }

  // Die Veränderung des geschätzten 1RM im Block, gemittelt über die Übungen mit mindestens zwei Tagen darin, oder null
  function rueckblickKraft(start) {
    const anteile = [];
    trainierteUebungen().forEach(function (u) {
      const punkte = verlaufPunkte(u.name, u.id, "1rm").filter(function (p) {
        return p.zeit + 86400000 > start && p.wert > 0;
      });
      if (punkte.length >= 2) {
        anteile.push(punkte[punkte.length - 1].wert / punkte[0].wert - 1);
      }
    });
    if (anteile.length === 0) {
      return null;
    }
    return anteile.reduce(function (a, b) {
      return a + b;
    }, 0) / anteile.length;
  }

  const RUECKBLICK_FRAGEN = [
    { id: "schlaf", werte: ["schlecht", "okay", "gut"] },
    { id: "energie", werte: ["muede", "normal", "stark"] },
    { id: "menge", werte: ["wenig", "passt", "viel"] }
  ];

  function rueckblickFragenBauen(inhalt, unten) {
    const start = rueckblickStart();
    const wochen = Math.max(1, Math.round((Date.now() - start) / (7 * 86400000)));
    inhalt.appendChild(element("div", "seiten-gross", txtAnzahl("rueckblick.geschafft", wochen)));
    inhalt.appendChild(element("p", "seiten-text", txt("rueckblick.text")));
    const kacheln = element("div", "rueckblick-kacheln");
    const kachel = function (wert, titel, klasse) {
      const k = element("div", "karte rueckblick-kachel");
      k.appendChild(element("b", klasse, wert));
      k.appendChild(element("span", "seiten-klein", titel));
      kacheln.appendChild(k);
    };
    const kraft = rueckblickKraft(start);
    kachel(kraft === null ? "–" : prozentText(kraft), txt("rueckblick.kraft"), kraft !== null && kraft > 0 ? "plus" : "metall");
    kachel(String(rueckblickTrainings(start)), txt("rueckblick.trainings"), "metall");
    kachel(String(gesamtZahlen().serie), txt("statistik.serie"), "serie");
    inhalt.appendChild(kacheln);
    RUECKBLICK_FRAGEN.forEach(function (f) {
      inhalt.appendChild(element("div", "seiten-titel rueckblick-frage", txt("rueckblick.frage." + f.id)));
      inhalt.appendChild(seitenUmschalter(f.werte.map(function (w) {
        return { id: w, text: txt("rueckblick." + f.id + "." + w) };
      }), rueckblick[f.id], function (w) {
        rueckblick[f.id] = w;
        korundSeiteZeichnen();
      }));
    });
    unten.appendChild(seitenKnopf(txt("rueckblick.weiter"), true, function () {
      rueckblick.aenderungen = rueckblickVorschlaege(start);
      korundSeiteOeffnen({
        titel: txt("rueckblick.titel"),
        rechts: function () {
          return txt("rueckblick.schritt", { n: 2 });
        },
        bauen: rueckblickBlockBauen
      });
    }));
  }

  // Die Arbeitssätze je Körperpartie seit dem Start des Blocks
  function rueckblickSaetze(start) {
    const saetze = {};
    eintraege.forEach(function (e) {
      if (!hatDatum(e) || new Date(e.datum).getTime() < start) {
        return;
      }
      const partie = erholungPartie(gruppeIdVon(e.uebungId, e.muskelgruppe));
      if (partie) {
        saetze[partie] = (saetze[partie] || 0) + arbeitsSaetzeVon(e).length;
      }
    });
    return saetze;
  }

  // Die Vorschläge für den nächsten Block, je einer: { art, text, info, an, routineId, platz, wert }.
  // Sie ändern erst mit „Übernehmen“ etwas, und auch dann nur neue Kopien der Routinen. Höchstens einer je Übung.
  function rueckblickVorschlaege(start) {
    const liste = [];
    const vergeben = {};
    const dazu = function (art, r, platz, text, info, wert) {
      const schluessel = r.id + ":" + platz;
      if (vergeben[schluessel]) {
        return;
      }
      vergeben[schluessel] = true;
      liste.push({ art: art, text: text, info: info, an: true, routineId: r.id, platz: platz, wert: wert });
    };
    const saetze = rueckblickSaetze(start);
    const partieVon = function (u) {
      return erholungPartie(gruppeIdVon(u.uebungId, u.muskelgruppe));
    };
    // 1. Einschränkungen: eine passende andere Übung derselben Muskelgruppe
    routinen.forEach(function (r) {
      r.uebungen.forEach(function (u, platz) {
        const fest = UEBUNG_NACH_ID[u.uebungId];
        const stelle = uebungEingeschraenkt(fest);
        if (!stelle) {
          return;
        }
        const andere = vorschlagKandidaten(uebungGruppe(fest), r.uebungen.map(function (x) {
          return x.uebungId;
        }));
        if (andere.length > 0) {
          const neu = andere[0];
          const name = anzeigeName(neu.de, neu.id);
          dazu("tausch", r, platz, txt("rueckblick.tausch", { neu: name, alt: u.name }), txt("rueckblick.tauschInfo." + stelle), { name: name, uebungId: neu.id, muskelgruppe: GRUPPE_NACH_ID[uebungGruppe(neu)][sprache] });
        }
      });
    });
    // 2. Der Rücken hinkt der Brust hinterher: ein Satz mehr bei der ersten Rücken-Übung jeder Routine
    if ((saetze.brust || 0) > 0 && (saetze.ruecken || 0) < saetze.brust * 0.8) {
      routinen.forEach(function (r) {
        const platz = r.uebungen.findIndex(function (u) {
          return partieVon(u) === "ruecken";
        });
        if (platz !== -1 && r.uebungen[platz].zielSaetze > 0 && r.uebungen[platz].zielSaetze < 10) {
          dazu("plus", r, platz, txt("rueckblick.mehrRuecken", { name: r.uebungen[platz].name }), txt("rueckblick.mehrRueckenInfo"), { zielSaetze: r.uebungen[platz].zielSaetze + 1 });
        }
      });
    }
    // 3. Kein Plus im Block bei mindestens vier Tagen und Ziel ab 10 Wdh.: 6–10 Wdh., dafür mehr Gewicht
    routinen.forEach(function (r) {
      r.uebungen.forEach(function (u, platz) {
        const punkte = verlaufPunkte(u.name, u.uebungId, "1rm").filter(function (p) {
          return p.zeit + 86400000 > start && p.wert > 0;
        });
        if (punkte.length >= 4 && punkte[punkte.length - 1].wert <= punkte[0].wert * 1.01 && (u.zielWdhMax || u.zielWdh || 0) >= 10) {
          dazu("hoch", r, platz, txt("rueckblick.wdh", { name: u.name }), txt("rueckblick.wdhInfo"), { zielWdh: 6, zielWdhMax: 10 });
        }
      });
    });
    // 4. Die Antworten: zu viel (oder müde nach schlechtem Schlaf) heißt einen Satz weniger ab vier Sätzen,
    //    zu wenig ohne Müdigkeit einen Satz mehr bei der ersten Übung jeder Routine
    const weniger = rueckblick.menge === "viel" || (rueckblick.schlaf === "schlecht" && rueckblick.energie === "muede");
    routinen.forEach(function (r) {
      if (weniger) {
        r.uebungen.forEach(function (u, platz) {
          if (u.zielSaetze >= 4) {
            dazu("minus", r, platz, txt("rueckblick.weniger", { name: u.name }), txt("rueckblick.wenigerInfo"), { zielSaetze: u.zielSaetze - 1 });
          }
        });
      } else if (rueckblick.menge === "wenig" && rueckblick.energie !== "muede" && r.uebungen.length > 0 && r.uebungen[0].zielSaetze > 0 && r.uebungen[0].zielSaetze < 10) {
        dazu("plus", r, 0, txt("rueckblick.mehr", { name: r.uebungen[0].name }), txt("rueckblick.mehrInfo"), { zielSaetze: r.uebungen[0].zielSaetze + 1 });
      }
    });
    return liste;
  }

  function rueckblickBlockBauen(inhalt, unten) {
    inhalt.appendChild(element("div", "seiten-gross", txt("rueckblick.block")));
    const liste = rueckblick.aenderungen;
    inhalt.appendChild(element("p", "seiten-text", txt(liste.length > 0 ? "rueckblick.blockText" : "rueckblick.allesGut")));
    if (liste.length > 0) {
      const karte = element("div", "karte seiten-liste");
      const zeichen = { plus: "+", minus: "−", tausch: "↔", hoch: "↑" };
      liste.forEach(function (a) {
        const zeile = element("button", "rueckblick-aenderung" + (a.an ? "" : " aus"));
        zeile.type = "button";
        zeile.setAttribute("aria-pressed", a.an ? "true" : "false");
        zeile.appendChild(element("span", "rueckblick-marke " + a.art, zeichen[a.art]));
        const text = element("span", "vorschlag-text");
        text.appendChild(element("span", "vorschlag-name", a.text));
        text.appendChild(element("span", "seiten-klein", a.info));
        zeile.appendChild(text);
        zeile.onclick = function () {
          a.an = !a.an;
          korundSeiteZeichnen();
        };
        karte.appendChild(zeile);
      });
      inhalt.appendChild(karte);
      inhalt.appendChild(element("p", "seiten-fuss", txt("rueckblick.antippen")));
    }
    inhalt.appendChild(seitenLabel(txt("rueckblick.woche")));
    const woche = element("div", "rueckblick-woche");
    for (let i = 0; i < 7; i++) {
      const routine = routineFinden(wochenplan[i]);
      const tag = element("div", routine ? "an" : "");
      tag.appendChild(element("small", "", wochentag(i)));
      tag.appendChild(element("b", "", routine ? routine.name.trim().charAt(0).toUpperCase() : "–"));
      woche.appendChild(tag);
    }
    inhalt.appendChild(woche);
    unten.appendChild(seitenKnopf(txt("rueckblick.anpassen"), false, korundSeiteZurueck));
    unten.appendChild(seitenKnopf(txt("rueckblick.uebernehmen"), true, rueckblickUebernehmen));
  }

  // Legt für jede Routine mit gewählten Änderungen eine Kopie „Name (Block N)“ an und trägt die Änderungen nur dort ein.
  // Die alten Routinen und der Wochenplan bleiben unverändert. Danach beginnt der neue Block (rueckblickAm, rueckblickAnzahl).
  function rueckblickUebernehmen() {
    const nummer = (typeof einstellungen.rueckblickAnzahl === "number" ? einstellungen.rueckblickAnzahl : 0) + 2;
    const kopien = {};
    const neu = [];
    rueckblick.aenderungen.forEach(function (a) {
      const alt = routineFinden(a.routineId);
      if (!a.an || !alt || !alt.uebungen[a.platz]) {
        return;
      }
      if (!kopien[a.routineId]) {
        kopien[a.routineId] = { id: neueId(), name: alt.name.replace(/ \(Block \d+\)$/, "") + " " + txt("rueckblick.blockName", { n: nummer }), uebungen: uebungenKopieren(alt.uebungen) };
        neu.push(kopien[a.routineId]);
      }
      const u = kopien[a.routineId].uebungen[a.platz];
      Object.keys(a.wert).forEach(function (feld) {
        u[feld] = a.wert[feld];
      });
    });
    neu.forEach(function (r) {
      routinen.push(r);
    });
    if (neu.length > 0) {
      routinenSpeichern();
    }
    einstellungen.rueckblickAm = Date.now();
    einstellungen.rueckblickAnzahl = nummer - 1;
    einstellungenSpeichern();
    korundSeitenSchliessen();
    trainingAnzeigen();
    frageZeigen(txt("rueckblick.fertigTitel"), neu.length > 0 ? txtAnzahl("rueckblick.fertigText", neu.length, {
      namen: neu.map(function (r) {
        return r.name;
      }).join(", ")
    }) : txt("rueckblick.fertigOhne"), [{ text: txt("ok"), art: "haupt" }]);
  }

  // ---------- Cloud-Backup (seit Version 146) ----------
  // Mit Anmeldung sichert Korund das Backup (genau das von „Backup exportieren“, backupText) bei Supabase:
  // je Nutzer ein Datensatz in der Tabelle backups (SQL in supabase/tabelle-backups.sql). Ohne Anmeldung bleibt alles nur auf dem Gerät.
  // Angemeldet wird mit E-Mail und Passwort (seit Version 147). Ein Link aus einer E-Mail meldet auf dem iPhone nur Safari an
  // (Safari und die App auf dem Homescreen haben getrennte Speicher). Seit Version 148 ist in Supabase „Confirm email“ an:
  // Der Link aus der Bestätigungsmail öffnet nur die App-Adresse, angemeldet wird danach wie gewohnt in der App.
  // „Passwort vergessen“ (seit Version 148): Der Link aus der Mail öffnet die App (auf dem iPhone in Safari), dort setzt man
  // das neue Passwort und meldet sich danach in der App an. Dafür braucht es den Ablauf „implicit“ (Standard von supabase-js):
  // Bei „pkce“ läge ein Schlüssel im Speicher der App, und Safari könnte den Link nicht einlösen.
  // Adresse und öffentlicher Schlüssel (publishable) dürfen in der App stehen. Der geheime Schlüssel (sb_secret_…) nie.
  const SUPABASE_URL = "https://saoewdpehahljrmydpan.supabase.co";
  const SUPABASE_KEY = "sb_publishable_auNxZiJoalFlRRbkiooKfw_gthv4_vs";
  // Unter diesem Schlüssel merkt sich supabase-js die Anmeldung. Die Zeit der letzten Sicherung steht unter "cloudZuletzt".
  // Beide stehen nicht im Backup.
  const CLOUD_SPEICHER = "korundCloud";
  // So lang muss ein Passwort mindestens sein (Supabase verlangt 6, die App 8)
  const CLOUD_PASSWORT_MIN = 8;

  let cloudVerbindung = null;
  // Läuft gerade eine Anfrage? Dann zählt kein weiterer Tipp.
  let cloudLaeuft = false;
  // Hat die automatische Sicherung zuletzt nicht gesichert, weil in der Cloud mehr Einträge liegen?
  let cloudUebersprungen = false;
  // Kam die App über den Link „Passwort vergessen“? null: nein. "warten": Der Link wird noch geprüft, das Feld ist gesperrt.
  // true: Supabase hat den Link angenommen (Ereignis PASSWORD_RECOVERY), das neue Passwort kann gesetzt werden.
  let cloudNeuesPasswort = null;

  // Die Verbindung zu Supabase, erst beim ersten Gebrauch gebaut. Ohne die Bibliothek (supabase-2.117.2.js) null.
  // Aus der Adresse liest supabase-js nur den Link „Passwort vergessen“ (type=recovery), nie einen anderen.
  function cloudClient() {
    if (!cloudVerbindung && window.supabase) {
      cloudVerbindung = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: { storageKey: CLOUD_SPEICHER, persistSession: true, autoRefreshToken: true, detectSessionInUrl: function (adresse, werte) {
          return werte.type === "recovery";
        } }
      });
      cloudVerbindung.auth.onAuthStateChange(function (ereignis) {
        if (ereignis === "PASSWORD_RECOVERY") {
          cloudNeuesPasswort = true;
          cloudAnzeigen();
        }
      });
    }
    return cloudVerbindung;
  }

  // Die Adresse der App, dorthin führen die Links aus den Mails. Sie muss in Supabase unter
  // Authentication → URL Configuration eingetragen sein (https://maxusoxodus.github.io/hybridslife/).
  function cloudAdresse() {
    return location.origin + location.pathname;
  }

  // Angemeldet heißt: Die Anmeldung liegt im Speicher. So stimmt die Anzeige auch ohne Netz.
  function cloudAngemeldet() {
    return localStorage.getItem(CLOUD_SPEICHER) !== null;
  }

  function cloudEmailAngemeldet() {
    const sitzung = gespeichertLesen(CLOUD_SPEICHER, null);
    return sitzung && sitzung.user && typeof sitzung.user.email === "string" ? sitzung.user.email : "";
  }

  // „Gesichert: heute, 18:04“, „Gesichert: gestern, 18:04“, „Gesichert: vor 3 Tagen“ oder „Noch nicht gesichert“
  function cloudStandText() {
    const zuletzt = gespeichertLesen("cloudZuletzt", null);
    const tage = tageSeit(zuletzt);
    if (tage === null) {
      return txt("cloud.stand.nie");
    }
    if (tage <= 1) {
      return txt(tage === 0 ? "cloud.stand.heute" : "cloud.stand.gestern", { zeit: uhrzeitText(new Date(zuletzt)) });
    }
    return txt("cloud.stand.tage", { n: tage });
  }

  // Zeigt den passenden Teil der Unterseite: Anmelden (E-Mail und Passwort), neues Passwort setzen oder angemeldet.
  // Während des Links „Passwort vergessen“ liegt auch eine Anmeldung im Speicher, deshalb zählt der Link zuerst.
  function cloudAnzeigen() {
    const neu = cloudNeuesPasswort !== null;
    const an = !neu && cloudAngemeldet();
    document.getElementById("cloud-abgemeldet").classList.toggle("versteckt", an || neu);
    document.getElementById("cloud-neu").classList.toggle("versteckt", !neu);
    document.getElementById("cloud-angemeldet").classList.toggle("versteckt", !an);
    document.getElementById("cloud-setzen").disabled = cloudLaeuft || cloudNeuesPasswort !== true;
    document.getElementById("cloud-vergessen").disabled = cloudLaeuft;
    document.getElementById("cloud-loeschen").disabled = cloudLaeuft;
    document.getElementById("cloud-konto").textContent = cloudEmailAngemeldet();
    document.getElementById("cloud-stand").textContent = cloudStandText();
    document.getElementById("cloud-sichern").disabled = cloudLaeuft;
    document.getElementById("cloud-holen").disabled = cloudLaeuft;
    document.getElementById("cloud-anmelden").disabled = cloudLaeuft;
    document.getElementById("cloud-registrieren").disabled = cloudLaeuft;
  }

  function cloudMeldung(text) {
    document.getElementById("cloud-meldung").textContent = text;
  }

  function cloudBeschaeftigt(an) {
    cloudLaeuft = an;
    cloudAnzeigen();
  }

  // Ein Fehler von Supabase oder vom Netz als kurzer Satz
  function cloudFehlerText(fehler) {
    // Der Code steht je nach Antwort des Servers in code oder fehlt, dann hilft der englische Text der Meldung
    const nachricht = (fehler && fehler.message) || "";
    let code = (fehler && fehler.code) || "";
    if (!code && /invalid login credentials/i.test(nachricht)) {
      code = "invalid_credentials";
    } else if (!code && /already (registered|exists)/i.test(nachricht)) {
      code = "user_already_exists";
    } else if (!code && /email not confirmed/i.test(nachricht)) {
      code = "email_not_confirmed";
    }
    const status = fehler && fehler.status;
    if (!navigator.onLine || (fehler && (fehler.name === "AuthRetryableFetchError" || /fetch|network|load failed/i.test(fehler.message || "")))) {
      return txt("cloud.keinNetz");
    }
    if (code === "invalid_credentials") {
      return txt("cloud.falsch");
    }
    if (code === "user_already_exists" || code === "email_exists") {
      return txt("cloud.gibtEsSchon");
    }
    if (code === "weak_password") {
      return txt("cloud.passwortKurz");
    }
    if (code === "email_not_confirmed") {
      return txt("cloud.nichtBestaetigt");
    }
    if (/rate_limit/.test(code) || status === 429) {
      return txt("cloud.zuOft");
    }
    return txt("cloud.fehler", { grund: (fehler && fehler.message) || "?" });
  }

  // Meldet an (neu: false) oder legt ein neues Konto an (neu: true). Beides mit E-Mail und Passwort aus den Feldern.
  function cloudAnmelden(neu) {
    if (cloudLaeuft) {
      return;
    }
    const email = document.getElementById("cloud-feld-email").value.trim();
    const passwort = document.getElementById("cloud-feld-passwort").value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      cloudMeldung(txt("cloud.emailFalsch"));
      return;
    }
    if (passwort.length < CLOUD_PASSWORT_MIN) {
      cloudMeldung(txt("cloud.passwortKurz"));
      return;
    }
    const verbindung = cloudClient();
    if (!verbindung) {
      cloudMeldung(txt("cloud.keinNetz"));
      return;
    }
    cloudMeldung("");
    cloudBeschaeftigt(true);
    const anfrage = neu ? verbindung.auth.signUp({ email: email, password: passwort, options: { emailRedirectTo: cloudAdresse() } }) : verbindung.auth.signInWithPassword({ email: email, password: passwort });
    anfrage.then(function (antwort) {
      cloudBeschaeftigt(false);
      if (antwort.error) {
        cloudMeldung(cloudFehlerText(antwort.error));
        return;
      }
      // Gibt es die E-Mail schon, meldet Supabase bei „Confirm email“ keinen Fehler (sonst ließe sich erraten, wer ein Konto hat),
      // sondern einen Nutzer ohne Identitäten. Eine Mail kommt dann nicht.
      const nutzer = antwort.data && antwort.data.user;
      if (neu && nutzer && Array.isArray(nutzer.identities) && nutzer.identities.length === 0) {
        cloudMeldung(txt("cloud.gibtEsSchon"));
        return;
      }
      // Ohne Sitzung verlangt Supabase erst die Bestätigung per E-Mail („Confirm email“ ist an)
      if (!antwort.data || !antwort.data.session) {
        cloudMeldung(txt(neu ? "cloud.mailGeschickt" : "cloud.nichtBestaetigt"));
        return;
      }
      document.getElementById("cloud-feld-passwort").value = "";
      cloudAnzeigen();
      einstWerteAnzeigen();
      // Gleich nach der Anmeldung: Liegt schon ein Backup in der Cloud (anderes Gerät), fragen, ob es geholt werden soll.
      // Sonst sofort sichern.
      cloudSichern(true, true);
    }).catch(function (fehler) {
      cloudBeschaeftigt(false);
      cloudMeldung(cloudFehlerText(fehler));
    });
  }

  // Sichert das Backup in der Cloud. manuell: Antippen von „Jetzt sichern“ (oder direkt nach der Anmeldung).
  // Liegen in der Cloud mehr Einträge als hier, sichert die automatische Sicherung nicht (sonst könnte ein neues Gerät
  // mit wenigen Daten das Backup eines anderen Geräts überschreiben). Von Hand fragt die App dann nach.
  // nachAnmeldung: direkt nach der Anmeldung, dann ist „Aus der Cloud holen“ die erste Wahl.
  function cloudSichern(manuell, nachAnmeldung) {
    const verbindung = cloudClient();
    if (!verbindung || !cloudAngemeldet() || cloudLaeuft) {
      return;
    }
    cloudBeschaeftigt(true);
    verbindung.auth.getSession().then(function (antwort) {
      const sitzung = antwort.data && antwort.data.session;
      if (!sitzung) {
        throw new Error(txt("cloud.abgelaufen"));
      }
      return verbindung.from("backups").select("eintraege, aktualisiert").maybeSingle().then(function (alt) {
        if (alt.error) {
          throw alt.error;
        }
        if (alt.data && alt.data.eintraege > eintraege.length) {
          cloudBeschaeftigt(false);
          if (!manuell) {
            cloudUebersprungen = true;
            return;
          }
          cloudUeberschreibenFragen(alt.data, sitzung.user.id, nachAnmeldung);
          return;
        }
        return cloudHochladen(sitzung.user.id, manuell);
      });
    }).catch(function (fehler) {
      cloudBeschaeftigt(false);
      if (manuell) {
        cloudMeldung(cloudFehlerText(fehler));
      }
    });
  }

  function cloudUeberschreibenFragen(alt, nutzer, nachAnmeldung) {
    const text = txt("cloud.mehrInCloud", { n: alt.eintraege, datum: datumMitJahr(new Date(alt.aktualisiert)), hier: eintraege.length });
    const holen = { text: txt("cloud.holen"), art: "haupt", aktion: cloudHolen };
    const ueberschreiben = { text: txt("cloud.ueberschreiben"), art: "gefahr", aktion: function () {
      cloudBeschaeftigt(true);
      cloudHochladen(nutzer, true).catch(function (fehler) {
        cloudBeschaeftigt(false);
        cloudMeldung(cloudFehlerText(fehler));
      });
    } };
    frageZeigen(txt("cloud.mehrTitel"), text, [holen, ueberschreiben, { text: txt(nachAnmeldung ? "spaeter" : "abbrechen"), art: "leise" }]);
  }

  function cloudHochladen(nutzer, manuell) {
    const jetzt = new Date().toISOString();
    return cloudClient().from("backups").upsert({ user_id: nutzer, daten: JSON.parse(backupText()), eintraege: eintraege.length, aktualisiert: jetzt }).then(function (antwort) {
      if (antwort.error) {
        throw antwort.error;
      }
      sicherSpeichern("cloudZuletzt", jetzt);
      cloudUebersprungen = false;
      cloudBeschaeftigt(false);
      einstWerteAnzeigen();
      if (manuell) {
        cloudMeldung(txt("cloud.gesichert", { n: eintraege.length }));
      }
    });
  }

  // Nach jedem Training: still sichern, wenn angemeldet. Fehler (z. B. kein Netz) zeigt die App nicht, das nächste Training versucht es wieder.
  function cloudAutomatisch() {
    if (cloudAngemeldet()) {
      cloudSichern(false, false);
    }
  }

  // Holt das Backup aus der Cloud und öffnet damit den normalen Import (Ergänzen oder Ersetzen, backupLesen)
  function cloudHolen() {
    const verbindung = cloudClient();
    if (!verbindung || cloudLaeuft) {
      return;
    }
    cloudMeldung("");
    cloudBeschaeftigt(true);
    verbindung.from("backups").select("daten").maybeSingle().then(function (antwort) {
      cloudBeschaeftigt(false);
      if (antwort.error) {
        cloudMeldung(cloudFehlerText(antwort.error));
        return;
      }
      if (!antwort.data) {
        cloudMeldung(txt("cloud.leer"));
        return;
      }
      // Die Meldungen des Imports stehen unter „Daten“ auf der Übersicht
      einstZeigen("haupt");
      backupLesen(JSON.stringify(antwort.data.daten));
    }).catch(function (fehler) {
      cloudBeschaeftigt(false);
      cloudMeldung(cloudFehlerText(fehler));
    });
  }

  // „Passwort vergessen?“: Supabase schickt eine Mail mit einem Link an die E-Mail im Feld. Ob es das Konto gibt, sagt
  // Supabase nicht, deshalb sagt es die App auch nicht. Der Mail-Versand von Supabase hat ein kleines Limit (429, cloud.zuOft).
  function cloudPasswortVergessen() {
    if (cloudLaeuft) {
      return;
    }
    const email = document.getElementById("cloud-feld-email").value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      cloudMeldung(txt("cloud.vergessenEmail"));
      document.getElementById("cloud-feld-email").focus();
      return;
    }
    const verbindung = cloudClient();
    if (!verbindung) {
      cloudMeldung(txt("cloud.keinNetz"));
      return;
    }
    cloudMeldung("");
    cloudBeschaeftigt(true);
    verbindung.auth.resetPasswordForEmail(email, { redirectTo: cloudAdresse() }).then(function (antwort) {
      cloudBeschaeftigt(false);
      cloudMeldung(antwort.error ? cloudFehlerText(antwort.error) : txt("cloud.vergessenGeschickt"));
    }).catch(function (fehler) {
      cloudBeschaeftigt(false);
      cloudMeldung(cloudFehlerText(fehler));
    });
  }

  // Beim Start: Kam die App über einen Link aus einer Mail? Beim Link „Passwort vergessen“ liest supabase-js ihn
  // (cloudClient) und die Einstellungen zeigen das Feld für das neue Passwort. Ein abgelaufener Link meldet das.
  // Andere Links (Bestätigung der E-Mail) verschwinden nur aus der Adresse. Gibt true zurück, wenn die Einstellungen aufgehen.
  function cloudLinkPruefen() {
    const werte = new URLSearchParams(location.hash.slice(1));
    if (werte.get("type") === "recovery" && werte.get("access_token")) {
      const verbindung = cloudClient();
      if (!verbindung) {
        return false;
      }
      cloudNeuesPasswort = "warten";
      einstOeffnen("cloud");
      einstZeigen("cloud");
      // Nimmt Supabase den Link nicht an, kommt kein PASSWORD_RECOVERY, sondern hier ein Fehler
      verbindung.auth.initialize().then(function (antwort) {
        if (antwort && antwort.error && cloudNeuesPasswort === "warten") {
          cloudNeuesPasswort = null;
          cloudAnzeigen();
          cloudMeldung(txt("cloud.linkAbgelaufen"));
        }
      });
      return true;
    }
    if (!werte.get("access_token") && !werte.get("error_code")) {
      return false;
    }
    history.replaceState(null, "", location.pathname + location.search);
    if (!werte.get("error_code")) {
      return false;
    }
    einstOeffnen("cloud");
    einstZeigen("cloud");
    cloudMeldung(txt("cloud.linkAbgelaufen"));
    return true;
  }

  // Setzt nach dem Link „Passwort vergessen“ das neue Passwort. Danach ist dieser Browser wieder abgemeldet:
  // Auf dem iPhone ist das Safari, angemeldet wird in der App auf dem Homescreen.
  function cloudPasswortSetzen() {
    if (cloudLaeuft || cloudNeuesPasswort !== true) {
      return;
    }
    const feld = document.getElementById("cloud-feld-neu");
    if (feld.value.length < CLOUD_PASSWORT_MIN) {
      cloudMeldung(txt("cloud.passwortKurz"));
      return;
    }
    cloudMeldung("");
    cloudBeschaeftigt(true);
    cloudClient().auth.updateUser({ password: feld.value }).then(function (antwort) {
      cloudBeschaeftigt(false);
      if (antwort.error) {
        cloudMeldung(cloudFehlerText(antwort.error));
        return;
      }
      feld.value = "";
      cloudNeuesPasswort = null;
      cloudLokalAbmelden(txt("cloud.passwortGesetzt"));
    }).catch(function (fehler) {
      cloudBeschaeftigt(false);
      cloudMeldung(cloudFehlerText(fehler));
    });
  }

  function cloudAbmeldenFragen() {
    frageZeigen(txt("cloud.abmeldenTitel"), txt("cloud.abmeldenText"), [
      { text: txt("cloud.abmelden"), art: "gefahr", aktion: cloudAbmelden },
      { text: txt("abbrechen"), art: "leise" }
    ]);
  }

  function cloudLoeschenFragen() {
    frageZeigen(txt("cloud.loeschenTitel"), txt("cloud.loeschenText"), [
      { text: txt("cloud.loeschenJa"), art: "gefahr", aktion: cloudLoeschen },
      { text: txt("abbrechen"), art: "leise" }
    ]);
  }

  // Löscht das Konto und damit das Backup in der Cloud (SQL-Funktion konto_loeschen in supabase/konto-loeschen.sql).
  // Die Daten auf dem Gerät bleiben unverändert, danach ist das Gerät abgemeldet.
  function cloudLoeschen() {
    const verbindung = cloudClient();
    if (!verbindung || !cloudAngemeldet() || cloudLaeuft) {
      return;
    }
    cloudMeldung("");
    cloudBeschaeftigt(true);
    verbindung.auth.getSession().then(function (antwort) {
      if (!antwort.data || !antwort.data.session) {
        throw new Error(txt("cloud.abgelaufen"));
      }
      return verbindung.rpc("konto_loeschen");
    }).then(function (antwort) {
      if (antwort.error) {
        throw antwort.error;
      }
      cloudBeschaeftigt(false);
      cloudLokalAbmelden(txt("cloud.geloescht"));
    }).catch(function (fehler) {
      cloudBeschaeftigt(false);
      cloudMeldung(cloudFehlerText(fehler));
    });
  }

  // Meldet nur dieses Gerät ab. Die Daten auf dem Gerät und das Backup in der Cloud bleiben.
  function cloudAbmelden() {
    cloudLokalAbmelden(txt("cloud.abgemeldet"));
  }

  // Vergisst die Anmeldung auf diesem Gerät und zeigt danach text. Die Daten auf dem Gerät bleiben.
  function cloudLokalAbmelden(text) {
    const fertig = function () {
      localStorage.removeItem(CLOUD_SPEICHER);
      localStorage.removeItem("cloudZuletzt");
      cloudUebersprungen = false;
      cloudMeldung(text);
      cloudAnzeigen();
      einstWerteAnzeigen();
    };
    const verbindung = cloudClient();
    if (!verbindung) {
      fertig();
      return;
    }
    verbindung.auth.signOut({ scope: "local" }).then(fertig, fertig);
  }

  // ---------- Einstellungen ----------

  // Die Ansichten der Einstellungen und der Schlüssel ihres Titels: die Übersicht ("haupt") und die Unterseiten
  const EINST_TITEL = {
    haupt: "einst.titel",
    profil: "profil.bearbeiten",
    einheiten: "profil.einheiten",
    design: "design",
    sprache: "profil.sprache",
    faq: "einst.faq",
    anleitung: "tour.titel",
    ueber: "einst.ueber",
    cloud: "cloud.titel"
  };

  // Die sichtbare Ansicht. einstDirekt ist true, wenn die Einstellungen gleich mit einer Unterseite geöffnet wurden
  // ("Profil bearbeiten"): Dann schließt der Knopf oben links, statt zur Übersicht zu führen.
  let einstAnsicht = "haupt";
  let einstDirekt = false;

  // Wie weit die Übersicht gescrollt war, bevor eine Unterseite aufging
  let einstScroll = 0;

  // Öffnet die Einstellungen. ziel ist leer (Übersicht), "profil" (gleich Name und Benutzername bearbeiten)
  // oder "daten" (Übersicht, gescrollt zu den Backup-Zeilen).
  function einstOeffnen(ziel) {
    einstDirekt = ziel === "profil";
    einstScroll = 0;
    if (einstDirekt) {
      einstZeigen("profil");
    } else {
      einstZeigen("haupt");
    }
    document.getElementById("einst-sheet").classList.add("offen");
    document.body.classList.add("sheet-offen");

    // Beim ersten Öffnen der Übersicht bietet die Einführung an, die Einstellungen kurz zu zeigen (einfuehrung.js).
    // Nicht bei "Profil bearbeiten" (öffnet direkt die Unterseite) und nicht bei "Zum Backup" (markiert die Karte "Daten").
    if (!ziel) {
      einfuehrungAnbieten("einstellungen");
    }

    if (ziel === "daten") {
      const karte = document.getElementById("einst-daten-karte");
      document.getElementById("einst-inhalt").scrollTop = karte.offsetTop - 120;
      karte.classList.add("markiert");
      setTimeout(function () {
        karte.classList.remove("markiert");
      }, 2000);
    }
  }

  // Schließt die Einstellungen. Das Profil dahinter wird neu aufgebaut, weil sich Name, Sprache,
  // Einheit oder die Daten selbst (Import) geändert haben können.
  function einstSchliessen() {
    document.getElementById("einst-sheet").classList.remove("offen");
    document.body.classList.remove("sheet-offen");
    document.getElementById("bald-hinweis").textContent = "";
    datenMeldung("");
    profilAnzeigen();
  }

  // "Einträge ansehen": schließt die Einstellungen und zeigt auf Home die Liste aller Einträge
  function eintraegeAnsehen() {
    einstSchliessen();
    gewaehlterTag = null;
    wochenleisteAnzeigen();
    speichernButtonAktualisieren();
    anzeigen();
    seiteZeigen("home");
    logZeigen(true);
  }

  // Zeigt eine Ansicht der Einstellungen: "haupt" oder eine der Unterseiten
  function einstZeigen(name) {
    const inhalt = document.getElementById("einst-inhalt");
    if (einstAnsicht === "haupt" && name !== "haupt") {
      einstScroll = inhalt.scrollTop;
    }
    const ansichten = document.querySelectorAll(".einst-ansicht");
    for (let i = 0; i < ansichten.length; i++) {
      ansichten[i].classList.toggle("versteckt", ansichten[i].id !== "einst-ansicht-" + name);
    }
    einstAnsicht = name;
    einstTitelAnzeigen();

    if (name === "haupt") {
      einstWerteAnzeigen();
      inhalt.scrollTop = einstScroll;
      return;
    }
    inhalt.scrollTop = 0;
    if (name === "profil") {
      profilFormFuellen();
    }
    if (name === "faq") {
      faqAnzeigen();
    }
    // Haken und gesperrter Trainingsmodus kommen bei jedem Öffnen frisch aus dem Merker der Einführung (einfuehrung.js)
    if (name === "anleitung") {
      einfuehrungAnleitungAnzeigen();
    }
    if (name === "ueber") {
      document.getElementById("ueber-version").textContent = appVersion() + einfuehrungDiagnoseText();
    }
    if (name === "cloud") {
      cloudMeldung(cloudUebersprungen ? txt("cloud.uebersprungen") : "");
      cloudAnzeigen();
    }
  }

  // Der Titel der sichtbaren Ansicht und der Knopf oben links: ✕ schließt, ‹ führt zurück zur Übersicht
  function einstTitelAnzeigen() {
    document.getElementById("einst-titel").textContent = txt(EINST_TITEL[einstAnsicht]);
    const links = document.getElementById("einst-links");
    if (einstAnsicht === "haupt" || einstDirekt) {
      links.textContent = "✕";
      links.setAttribute("aria-label", txt("schliessen"));
    } else {
      links.textContent = "‹";
      links.setAttribute("aria-label", txt("zurueck"));
    }
  }

  // Der Knopf oben links
  function einstLinks() {
    if (einstAnsicht === "haupt" || einstDirekt) {
      einstSchliessen();
    } else {
      einstZeigen("haupt");
    }
  }

  // Die Übersicht: rechts in den Zeilen die gewählten Werte, das Datum des letzten Backups und die Zeilen von "Folge uns"
  function einstWerteAnzeigen() {
    let laenge = "cm";
    if (laengeEinheit() === "ftin") {
      laenge = "ft-in";
    }
    document.getElementById("einst-wert-einheiten").textContent = einheit() + " · " + laenge;
    document.getElementById("einst-wert-design").textContent = txt("design." + design());
    document.getElementById("einst-wert-sprache").textContent = spracheDaten().name;
    document.getElementById("backup-zuletzt").textContent = backupZuletztText();
    // Cloud-Backup (seit Version 146): Stand der letzten Sicherung, und der Satz unter „Daten“ stimmt auch mit Anmeldung
    document.getElementById("cloud-zuletzt").textContent = cloudAngemeldet() ? cloudStandText() : txt("cloud.aus");
    document.getElementById("backup-nur-hier").textContent = txt(cloudAngemeldet() ? "cloud.nurHierAn" : "backup.nurHier");

    folgenZeile("folgen-instagram", INSTAGRAM_URL);
    folgenZeile("folgen-tiktok", TIKTOK_URL);
    folgenZeile("folgen-youtube", YOUTUBE_URL);
    document.getElementById("einst-folgen").classList.toggle("versteckt", INSTAGRAM_URL === "" && TIKTOK_URL === "" && YOUTUBE_URL === "");
  }

  // Eine Zeile von "Folge uns": sichtbar nur, wenn ihre Adresse eingetragen ist
  function folgenZeile(id, adresse) {
    const zeile = document.getElementById(id);
    zeile.classList.toggle("versteckt", adresse === "");
    if (adresse !== "") {
      zeile.href = adresse;
    }
  }

  // Blendet alle Platzhalter aus, solange SHOW_PLATZHALTER auf false steht
  function platzhalterAnwenden() {
    const platzhalter = document.querySelectorAll("[data-platzhalter]");
    for (let i = 0; i < platzhalter.length; i++) {
      platzhalter[i].classList.toggle("versteckt", !SHOW_PLATZHALTER);
    }
  }

  // Konto, Abo und blockierte Nutzer gibt es noch nicht: Tippen zeigt unter der Karte, warum
  function baldHinweis(name) {
    document.getElementById("bald-hinweis").textContent = txt("einst." + name + ".hinweis");
  }

  // FAQ: jede Frage zum Aufklappen
  function faqAnzeigen() {
    const liste = document.getElementById("faq-liste");
    liste.innerHTML = "";
    for (let i = 1; i <= FAQ_ANZAHL; i++) {
      const frage = element("details", "karte faq");
      frage.appendChild(element("summary", "", txt("faq." + i + ".frage")));
      frage.appendChild(element("p", "", txt("faq." + i + ".antwort", { n: SERIE_TAGE_PRO_WOCHE })));
      liste.appendChild(frage);
    }
  }

  // Die Versionsnummer der App. Sie steht in der index.html an der Adresse dieser Datei ("app.js?v=21").
  function appVersion() {
    const skript = document.querySelector('script[src^="app.js"]');
    const treffer = /v=(\d+)/.exec(skript ? skript.getAttribute("src") : "");
    if (treffer) {
      return treffer[1];
    }
    return "";
  }


// Die Zahlenfelder im Log: Gewicht 0 bis 400 kg oder 0 bis 880 lbs, Wiederholungen 1 bis 100, Sätze 1 bis 10
feldBauen("feld-gewicht", 0, GEWICHT_EINHEITEN[einheit()].max, true, GEWICHT_EINHEITEN[einheit()].start);
feldBauen("feld-wdh", 1, 100, false, START_WDH);
feldBauen("feld-saetze", 1, 10, false, START_SAETZE);

// Die zwei Zahlenfelder des Trainingsmodus
feldBauen("t-feld-gewicht", 0, GEWICHT_EINHEITEN[einheit()].max, true, GEWICHT_EINHEITEN[einheit()].start);
feldBauen("t-feld-wdh", 1, 100, false, START_WDH);

// Die zwei Zahlenfelder im Sheet "Satz bearbeiten", mit denselben Grenzen
feldBauen("s-feld-gewicht", 0, GEWICHT_EINHEITEN[einheit()].max, true, GEWICHT_EINHEITEN[einheit()].start);
feldBauen("s-feld-wdh", 1, 100, false, START_WDH);

// Die festen Texte der Seite in der eingestellten Sprache
texteEinsetzen();
iconsEinsetzen();
spracheAnzeigen();

// Gym-Tab, Konto, Abo und Blockierte Nutzer: nur zu sehen, wenn SHOW_PLATZHALTER auf true steht
platzhalterAnwenden();

// Wischgesten: Die Sheets lassen sich nach unten wischen
sheetsWischbarMachen();
modusWischbarMachen();
trainingWischbarMachen();
navWischbarMachen();

// Das gewählte Design (Dunkel, Hell oder System) und sein Umschalter
designAnwenden();
designAnzeigen();

// Der gewählte Stil (Klassisch oder Glass) und sein Umschalter
stilAnwenden();
stilAnzeigen();

// Die gewählte Akzentfarbe und ihre Auswahl (vorher einmal: Limette für alle, die die App schon hatten)
akzentUebernehmen();
akzentAnwenden();
akzentAnzeigen();

// Der gewählte Look und sein Umschalter, dazu die Farbwelt des Looks Korund
paletteAnwenden();
paletteAnzeigen();
farbweltAnwenden();
farbweltAnzeigen();

// Der Status (Aktiv, Krank, Urlaub) im Training-Tab
statusAnzeigen();

// Beschriftungen und Schnellbuttons in der gewählten Einheit, dazu das Rad für das Körpergewicht
// (30 bis 200 kg oder 66 bis 440 lbs)
einheitenAnwenden();
einheitenAnzeigen();
felderVoreinstellen();

wochenleisteAnzeigen();
anzeigen();
homeAnzeigen();
trainingAnzeigen();
pauseStandardAnzeigen();
steigernAnzeigen();

// Lief beim Schließen der App noch eine Pause, geht sie mit der richtigen Restzeit weiter
if (pause) {
  pauseTaktStarten();
}
trainingBeimStartPruefen();

// Neue Ränge und Abzeichen seit dem letzten Öffnen melden. Beim allerersten Mal wird nur gemerkt, was schon erreicht ist.
rangPruefen(true);

// Der Start ist durch: Jetzt erscheinen die Meldungen zu kaputten Einträgen und zu fehlgeschlagenem Speichern
startFertig = true;
startMeldungenZeigen();

// Neuen Nutzern bietet die Einführung beim Start den Rundgang über Home an (einfuehrung.js). Läuft noch ein Training,
// fragt die App zuerst danach: Dann entfällt das Angebot für diesen Start und zählt nicht mit.
// Kam die App über einen Link aus einer Mail (seit Version 148), stehen die Einstellungen offen, dann entfällt es auch.
if (!cloudLinkPruefen() && !laufendesTraining) {
  einfuehrungAnbieten("home");
}

// ---------- Offline und Updates ----------

// Die Anmeldung des Service Workers (sw.js). Darüber erreicht die App eine wartende neue Version.
let swAnmeldung = null;

// true, sobald auf den Hinweis getippt wurde. Nur dann lädt die Seite neu.
let updateGewuenscht = false;

function updateHinweisZeigen() {
  document.getElementById("update-hinweis").classList.add("sichtbar");
}

// Tippen auf den Hinweis: Die wartende Version übernimmt, danach lädt die Seite neu
function updateLaden() {
  if (!swAnmeldung || !swAnmeldung.waiting) {
    location.reload();
    return;
  }
  updateGewuenscht = true;
  swAnmeldung.waiting.postMessage("aktualisieren");
}

// Service Worker gibt es nur über https (oder localhost), nicht bei einer lokal geöffneten Datei
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("sw.js").then(function (anmeldung) {
    swAnmeldung = anmeldung;

    // Eine neue Version wurde schon früher geladen und wartet noch
    if (anmeldung.waiting && navigator.serviceWorker.controller) {
      updateHinweisZeigen();
    }

    // Gerade wird eine neue Version geladen: Hinweis zeigen, sobald sie fertig ist.
    // Ohne "controller" ist es die allererste Installation, dann gibt es nichts zu melden.
    anmeldung.addEventListener("updatefound", function () {
      const neu = anmeldung.installing;
      neu.addEventListener("statechange", function () {
        if (neu.state === "installed" && navigator.serviceWorker.controller) {
          updateHinweisZeigen();
        }
      });
    });
  }).catch(function () {
    // Ohne Service Worker läuft die App normal weiter, nur nicht offline
  });

  // Die neue Version hat übernommen: einmal neu laden, aber nur nach dem Tippen auf den Hinweis
  navigator.serviceWorker.addEventListener("controllerchange", function () {
    if (updateGewuenscht) {
      location.reload();
    }
  });

  // Die Homescreen-App bleibt oft lange offen. Beim Zurückkehren nach einer neuen Version fragen.
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && swAnmeldung) {
      swAnmeldung.update().catch(function () {});
    }
  });
}


