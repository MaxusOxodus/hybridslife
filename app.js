  // Die Übungsdaten stehen in der uebungen.js: MUSKELGRUPPEN, BEREICHE, MUSKELN, UEBUNGEN, UEBUNGSLISTEN, ALTE_NAMEN und ALTE_IDS.
  // Die Texte der Oberfläche stehen in der texte.js: SPRACHEN und TEXTE.

  // "Folge uns" in den Einstellungen: Hier trägst du die Adressen ein, z. B. "https://www.instagram.com/deinname".
  // Solange eine Adresse leer ist, bleibt ihre Zeile ausgeblendet.
  const INSTAGRAM_URL = "";
  const TIKTOK_URL = "";

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

  // Vorlagen für Trainingssplits: Zum Anpassen einfach hier Übungen, Sätze oder Wiederholungen ändern.
  // Name, Beschreibung und die Namen der Routinen sind Schlüssel der Tabelle TEXTE in der texte.js.
  // Die Übungsnamen müssen in der uebungen.js stehen (als Name oder unter ALTE_NAMEN), damit die Übung gefunden wird.
  // "wochenplan" hat sieben Plätze für Montag bis Sonntag: Die Zahl zeigt auf eine Routine
  // der Vorlage (0 = die erste), null ist ein Ruhetag.
  const VORLAGEN = [
    {
      name: "vorlage.ganzkoerper.name",
      fuerWen: "vorlage.ganzkoerper.fuerWen",
      wieOft: "vorlage.ganzkoerper.wieOft",
      wochenplan: [0, null, 1, null, 0, null, null],
      routinen: [
        {
          name: "vorlage.routine.ganzkoerperA",
          uebungen: [
            { name: "Kniebeuge", saetze: 3, wdh: 8 },
            { name: "Bankdrücken", saetze: 3, wdh: 8 },
            { name: "Langhantelrudern", saetze: 3, wdh: 10 },
            { name: "Schulterdrücken", saetze: 3, wdh: 10 },
            { name: "Langhantelcurls", saetze: 2, wdh: 12 },
            { name: "Crunches", saetze: 3, wdh: 15 }
          ]
        },
        {
          name: "vorlage.routine.ganzkoerperB",
          uebungen: [
            { name: "Kreuzheben", saetze: 3, wdh: 6 },
            { name: "Schrägbankdrücken", saetze: 3, wdh: 10 },
            { name: "Latzug", saetze: 3, wdh: 10 },
            { name: "Ausfallschritte", saetze: 3, wdh: 10 },
            { name: "Trizepsdrücken am Kabel", saetze: 2, wdh: 12 },
            { name: "Beinheben", saetze: 3, wdh: 12 }
          ]
        }
      ]
    },
    {
      name: "vorlage.obenUnten.name",
      fuerWen: "vorlage.obenUnten.fuerWen",
      wieOft: "vorlage.obenUnten.wieOft",
      wochenplan: [0, 1, null, 0, 1, null, null],
      routinen: [
        {
          name: "vorlage.routine.oberkoerper",
          uebungen: [
            { name: "Bankdrücken", saetze: 4, wdh: 8 },
            { name: "Langhantelrudern", saetze: 4, wdh: 8 },
            { name: "Schulterdrücken", saetze: 3, wdh: 10 },
            { name: "Latzug", saetze: 3, wdh: 10 },
            { name: "Kurzhantelcurls", saetze: 3, wdh: 12 },
            { name: "Trizepsdrücken am Kabel", saetze: 3, wdh: 12 }
          ]
        },
        {
          name: "vorlage.routine.unterkoerper",
          uebungen: [
            { name: "Kniebeuge", saetze: 4, wdh: 8 },
            { name: "Rumänisches Kreuzheben", saetze: 3, wdh: 10 },
            { name: "Beinpresse", saetze: 3, wdh: 12 },
            { name: "Beinbeuger", saetze: 3, wdh: 12 },
            { name: "Wadenheben", saetze: 4, wdh: 15 },
            { name: "Cable Crunches", saetze: 3, wdh: 15 }
          ]
        }
      ]
    },
    {
      name: "vorlage.ppl.name",
      fuerWen: "vorlage.ppl.fuerWen",
      wieOft: "vorlage.ppl.wieOft",
      wochenplan: [0, 1, 2, 0, 1, 2, null],
      routinen: [
        {
          name: "vorlage.routine.push",
          uebungen: [
            { name: "Bankdrücken", saetze: 4, wdh: 8 },
            { name: "Schrägbankdrücken", saetze: 3, wdh: 10 },
            { name: "Schulterdrücken", saetze: 3, wdh: 10 },
            { name: "Seitheben", saetze: 3, wdh: 15 },
            { name: "Trizepsdrücken am Kabel", saetze: 3, wdh: 12 },
            { name: "Überkopf-Trizepsstrecken", saetze: 3, wdh: 12 }
          ]
        },
        {
          name: "vorlage.routine.pull",
          uebungen: [
            { name: "Kreuzheben", saetze: 3, wdh: 5 },
            { name: "Klimmzüge", saetze: 3, wdh: 8 },
            { name: "Langhantelrudern", saetze: 3, wdh: 10 },
            { name: "Face Pulls", saetze: 3, wdh: 15 },
            { name: "Langhantelcurls", saetze: 3, wdh: 10 },
            { name: "Hammercurls", saetze: 3, wdh: 12 }
          ]
        },
        {
          name: "vorlage.routine.legs",
          uebungen: [
            { name: "Kniebeuge", saetze: 4, wdh: 8 },
            { name: "Rumänisches Kreuzheben", saetze: 3, wdh: 10 },
            { name: "Beinpresse", saetze: 3, wdh: 12 },
            { name: "Beinstrecker", saetze: 3, wdh: 15 },
            { name: "Beinbeuger", saetze: 3, wdh: 12 },
            { name: "Wadenheben", saetze: 4, wdh: 15 }
          ]
        }
      ]
    },
    {
      name: "vorlage.bro.name",
      fuerWen: "vorlage.bro.fuerWen",
      wieOft: "vorlage.bro.wieOft",
      wochenplan: [0, 1, 2, 3, 4, null, null],
      routinen: [
        {
          name: "vorlage.routine.brust",
          uebungen: [
            { name: "Bankdrücken", saetze: 4, wdh: 8 },
            { name: "Schrägbankdrücken", saetze: 4, wdh: 10 },
            { name: "Kurzhantel-Flys", saetze: 3, wdh: 12 },
            { name: "Butterfly/Pec Deck", saetze: 3, wdh: 12 },
            { name: "Dips", saetze: 3, wdh: 10 }
          ]
        },
        {
          name: "vorlage.routine.ruecken",
          uebungen: [
            { name: "Kreuzheben", saetze: 3, wdh: 5 },
            { name: "Klimmzüge", saetze: 4, wdh: 8 },
            { name: "Langhantelrudern", saetze: 4, wdh: 8 },
            { name: "Latzug", saetze: 3, wdh: 10 },
            { name: "Rudern am Kabelzug", saetze: 3, wdh: 12 }
          ]
        },
        {
          name: "vorlage.routine.schultern",
          uebungen: [
            { name: "Military Press", saetze: 4, wdh: 8 },
            { name: "Seitheben", saetze: 4, wdh: 15 },
            { name: "Reverse Flys", saetze: 3, wdh: 15 },
            { name: "Face Pulls", saetze: 3, wdh: 15 },
            { name: "Frontheben", saetze: 3, wdh: 12 }
          ]
        },
        {
          name: "vorlage.routine.arme",
          uebungen: [
            { name: "Langhantelcurls", saetze: 4, wdh: 10 },
            { name: "Hammercurls", saetze: 3, wdh: 12 },
            { name: "Scottcurls", saetze: 3, wdh: 12 },
            { name: "Enges Bankdrücken", saetze: 4, wdh: 8 },
            { name: "French Press", saetze: 3, wdh: 10 },
            { name: "Trizepsdrücken am Kabel", saetze: 3, wdh: 12 }
          ]
        },
        {
          name: "vorlage.routine.beine",
          uebungen: [
            { name: "Kniebeuge", saetze: 4, wdh: 8 },
            { name: "Beinpresse", saetze: 4, wdh: 10 },
            { name: "Rumänisches Kreuzheben", saetze: 3, wdh: 10 },
            { name: "Beinstrecker", saetze: 3, wdh: 15 },
            { name: "Beinbeuger", saetze: 3, wdh: 12 },
            { name: "Wadenheben", saetze: 4, wdh: 15 }
          ]
        }
      ]
    }
  ];

  // Startwerte der Zahlenfelder bei einer neuen Übung. Der für das Gewicht steht bei den Einheiten.
  const START_WDH = 10;
  const START_SAETZE = 3;

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

  let eintraege = JSON.parse(localStorage.getItem("eintraege")) || [];

  // Wofür das Sheet gerade geöffnet ist: "log" (neuer Eintrag), "routine" (Übung zur Routine hinzufügen)
  // oder "tausch" (im Trainingsmodus die Übung tauschen)
  let sheetZiel = "log";

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
  // die Sprache (sprache: "de" oder "en"), das Design (design: "dunkel" oder "hell")
  // und die für die Kraft-Karte gewählte Übung (kraftUebung: { name, uebungId }).
  // Fehlt die Sprache, gilt die des Geräts. Fehlt das Design, folgt die App dem Gerät.
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

  // Gespeicherte Daten aus älteren Versionen kennen nur Übungsnamen: einmal die feste ID ergänzen
  gespeicherteDatenZuordnen();

  // Die sichtbare Ansicht im Training-Tab: "uebersicht", "bearbeiten", "modus" oder "fertig"
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
    localStorage.setItem("eigeneUebungen", JSON.stringify(eigeneUebungen));
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
    localStorage.setItem("eintraege", JSON.stringify(eintraege));
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
      localStorage.setItem("eintraege", JSON.stringify(eintraege));
    }

    let routinenGeaendert = false;
    for (let i = 0; i < routinen.length; i++) {
      if (routinen[i] && Array.isArray(routinen[i].uebungen) && listeZuordnen(routinen[i].uebungen, "name")) {
        routinenGeaendert = true;
      }
    }
    if (routinenGeaendert) {
      localStorage.setItem("routinen", JSON.stringify(routinen));
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
        localStorage.setItem("laufendesTraining", JSON.stringify(laufendesTraining));
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
    localStorage.setItem("einstellungen", JSON.stringify(einstellungen));
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
    }

    if (name === "profil") {
      profilAnzeigen();
    }

    if (name === "training") {
      trainingAnzeigen();
      if (trainingAnsicht === "modus" && laufendesTraining) {
        modusAnzeigen();
      }
    }

    // Die Pausen-Leiste ist überall zu sehen außer im Trainingsmodus, das Display bleibt nur dort an
    pauseAnzeigen();
    wachSperreAktualisieren();
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

  // ---------- Körper-Grafik für die Muskelgruppen-Kacheln ----------

  // Die Figur ist selbst gezeichnet (SVG, 60 × 118 Einheiten). Der Umriss ist vorn und hinten gleich.
  // Elemente mit der Klasse "linie" sind dicke Striche mit runden Enden (Arme und Beine).
  const KOERPER_UMRISS = '<circle cx="30" cy="10" r="7"/>'
    + '<path d="M27 15h6v8h-6z"/>'
    + '<path d="M19 22h22q4 0 4 4l-2 24-2 13H19l-2-13-2-24q0-4 4-4z"/>'
    + '<path class="linie" stroke-width="7" d="M12 27 10 44 7 62M48 27l2 17 3 18"/>'
    + '<path class="linie" stroke-width="10" d="M24 65 23 88M36 65l1 23"/>'
    + '<path class="linie" stroke-width="8" d="M23 88v24M37 88v24"/>';

  // Die Muskelflächen je Ansicht. Der Name ist die ID der Muskelgruppe, die diese Fläche hervorhebt.
  const KOERPER_ARME_OBEN = '<path class="linie" stroke-width="5" d="M11.6 31 10.4 42M48.4 31l1.2 11"/>';
  const KOERPER_ARME_UNTEN = '<path class="linie" stroke-width="4.5" d="M9.4 48 7.6 60M50.6 48l1.8 12"/>';
  const KOERPER_SCHULTERN = '<ellipse cx="14" cy="26" rx="4.5" ry="5"/><ellipse cx="46" cy="26" rx="4.5" ry="5"/>';

  // Die Flächen einer Ansicht liegen nebeneinander und überlappen sich nicht,
  // sonst wären die grauen Stellen an der Überlappung dunkler.
  const KOERPER_MUSKELN = {
    vorn: {
      "schulter-seite": '<ellipse cx="11.5" cy="26.5" rx="2.6" ry="4.8"/><ellipse cx="48.5" cy="26.5" rx="2.6" ry="4.8"/>',
      "schulter-vorn": '<ellipse cx="16.6" cy="26" rx="2.4" ry="4.2"/><ellipse cx="43.4" cy="26" rx="2.4" ry="4.2"/>',
      brust: '<path d="M20 25h9v10q-5 3-9-1z"/><path d="M40 25h-9v10q5 3 9-1z"/>',
      bizeps: KOERPER_ARME_OBEN,
      unterarme: KOERPER_ARME_UNTEN,
      bauch: '<rect x="24" y="38" width="12" height="21" rx="3"/>',
      "bauch-schraeg": '<rect x="19" y="39" width="3.6" height="18" rx="1.8"/><rect x="37.4" y="39" width="3.6" height="18" rx="1.8"/>',
      quadrizeps: '<path class="linie" stroke-width="6" d="M22.8 67 22.4 86M37.2 67l.4 19"/>',
      adduktoren: '<path class="linie" stroke-width="2.6" d="M27.9 67.5 27.2 80M32.1 67.5l.7 12.5"/>'
    },
    hinten: {
      "schulter-hinten": KOERPER_SCHULTERN,
      trapez: '<path d="M30 22l7 3-7 13-7-13z"/>',
      "ruecken-oben": '<path d="M19.2 26.5h3.3l6 11.5h-8.3z"/><path d="M40.8 26.5h-3.3l-6 11.5h8.3z"/>',
      lat: '<path d="M19.6 39.5h8.9v11l-6.3-4z"/><path d="M40.4 39.5h-8.9v11l6.3-4z"/>',
      "ruecken-unten": '<rect x="25" y="51.5" width="10" height="5" rx="2"/>',
      trizeps: KOERPER_ARME_OBEN,
      unterarme: KOERPER_ARME_UNTEN,
      abduktoren: '<ellipse cx="19.3" cy="56" rx="1.6" ry="3"/><ellipse cx="40.7" cy="56" rx="1.6" ry="3"/>',
      po: '<ellipse cx="24.5" cy="62" rx="5" ry="5"/><ellipse cx="35.5" cy="62" rx="5" ry="5"/>',
      beinbeuger: '<path class="linie" stroke-width="8" d="M24 71 23.2 86M36 71l.8 15"/>',
      waden: '<path class="linie" stroke-width="6.5" d="M23 93v13M37 93v13"/>'
    }
  };

  // Baut die Figur für eine Muskelgruppe. Deren Fläche bekommt die Klasse "aktiv" und wird im CSS
  // limettengrün. Bei "Ganzkörper" leuchten alle Flächen.
  function koerperSvg(gruppe) {
    const muskeln = KOERPER_MUSKELN[gruppe.ansicht];
    const namen = Object.keys(muskeln);
    let svg = '<svg class="koerper" viewBox="0 0 60 118" aria-hidden="true"><g class="umriss">' + KOERPER_UMRISS + '</g>';

    for (let i = 0; i < namen.length; i++) {
      let klasse = "muskel";
      if (namen[i] === gruppe.id || gruppe.id === "ganzkoerper") {
        klasse += " aktiv";
      }
      svg += '<g class="' + klasse + '">' + muskeln[namen[i]] + '</g>';
    }
    return svg + '</svg>';
  }

  // ---------- Bottom Sheet für die Übungsauswahl ----------

  // ziel ist "log", "routine" oder "tausch". Ohne Angabe gilt "log".
  function sheetOeffnen(ziel) {
    sheetZiel = ziel || "log";
    // Der Schalter "Auch in der Routine ändern" gehört nur zum Tauschen und ist bei jedem Öffnen aus
    tauschSchalterSetzen(false);
    document.getElementById("tausch-schalter").classList.toggle("versteckt", sheetZiel !== "tausch" || !tauschRoutineStelle());
    if (sheetZiel === "tausch") {
      sheetTauschZeigen();
    } else {
      sheetGruppenZeigen();
    }
    document.getElementById("sheet").classList.add("offen");
    document.getElementById("sheet-hintergrund").classList.add("offen");
    document.body.classList.add("sheet-offen");
  }

  function sheetSchliessen() {
    selbstFormSchliessen();
    document.getElementById("sheet-suche").blur();
    document.getElementById("sheet").classList.remove("offen");
    document.getElementById("sheet-hintergrund").classList.remove("offen");
    document.body.classList.remove("sheet-offen");
  }

  // Setzt Titel und Zurück-Pfeil und gibt den geleerten Inhaltsbereich zurück
  function sheetLeeren(titel, mitZurueck) {
    document.getElementById("sheet-titel").textContent = titel;
    document.getElementById("sheet-zurueck").classList.toggle("versteckt", !mitZurueck);

    const inhalt = document.getElementById("sheet-inhalt");
    inhalt.innerHTML = "";
    inhalt.scrollTop = 0;
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
    if (sheetZiel !== "tausch") {
      sheetGruppenZeigen();
      return;
    }
    const suche = document.getElementById("sheet-suche");
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

  // Die Kachel "Eigene": dieselbe Figur wie bei den Muskelgruppen, mit einem Stern statt eines Muskels
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
    document.getElementById("sheet-suche").value = "";
    // Beim Tauschen führt der Pfeil von hier zurück zu den Vorschlägen
    const inhalt = sheetLeeren(txt("sheet.muskelgruppe"), sheetZiel === "tausch");
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
    document.getElementById("sheet-suche").value = "";
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
    if (sheetZiel === "tausch" && tauschVergeben(u.de, u.id)) {
      btn.disabled = true;
      btn.appendChild(element("span", "sheet-zeile-zweit", txt("tausch.vergeben")));
    }

    // Gespeichert wird neben der ID immer der deutsche Name, als Reserve
    btn.onclick = function () {
      uebungWaehlen(u.de, gruppe.de, u.id);
    };
    return btn;
  }

  // Wird bei jeder Eingabe im Suchfeld aufgerufen. Gesucht wird in allen Übungen, auf Deutsch und Englisch
  // und in den Aliasen, die eigenen Übungen stehen vorn. Jedes eingetippte Wort muss im Namen vorkommen,
  // die Reihenfolge ist egal.
  function sheetSucheGeaendert() {
    const eingabe = document.getElementById("sheet-suche").value.trim();

    // Leeres Feld: zurück zur vorherigen Ansicht
    if (eingabe === "") {
      sheetAnsichtZeigen();
      return;
    }

    const woerter = eingabe.toLowerCase().split(/\s+/);
    const treffer = selbstListe.concat(UEBUNGEN).filter(function (u) {
      const namen = (u.de + " " + u.en + " " + (u.alias || []).join(" ")).toLowerCase();
      return woerter.every(function (wort) {
        return namen.indexOf(wort) !== -1;
      });
    });

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
    document.getElementById("sheet-suche").blur();
    document.getElementById("selbst-sheet").classList.add("offen");
  }

  function selbstFormSchliessen() {
    document.getElementById("selbst-name").blur();
    document.getElementById("selbst-sheet").classList.remove("offen");
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
    // Aus dem Routinen-Editor geöffnet: Die Übung kommt in die Routine, nicht in den neuen Eintrag
    if (sheetZiel === "routine") {
      sheetSchliessen();
      routineUebungHinzufuegen(name, gruppe, id);
      return;
    }
    // Aus dem Trainingsmodus geöffnet: Die Übung ersetzt die aktuelle Übung des Trainings
    if (sheetZiel === "tausch") {
      uebungTauschen(name, gruppe, id);
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

    function anzeigen() {
    const liste = document.getElementById("liste");
    liste.innerHTML = "";

    // Ist ein Tag angetippt, zeigt die Liste nur dessen Einträge
    if (gewaehlterTag) {
      tagesListeAnzeigen();
      return;
    }

    // Einträge auf Wochen verteilen. Der Index wird mitgemerkt, damit Löschen den richtigen Eintrag trifft.
    const wochen = {};
    const ohneDatum = [];

    for (let i = 0; i < eintraege.length; i++) {
      const e = eintraege[i];
      if (!e.datum || isNaN(new Date(e.datum))) {
        ohneDatum.push({ eintrag: e, index: i });
      } else {
        const schluessel = montagDerWoche(new Date(e.datum)).getTime();
        if (!wochen[schluessel]) {
          wochen[schluessel] = [];
        }
        wochen[schluessel].push({ eintrag: e, index: i });
      }
    }

    // Wochen sortieren, neueste zuerst
    const montage = Object.keys(wochen).map(Number).sort(function (a, b) {
      return b - a;
    });

    for (let w = 0; w < montage.length; w++) {
      const titel = wochenTitel(new Date(montage[w]));

      // Einträge der Woche sortieren, neueste zuerst
      const gruppe = wochen[montage[w]];
      gruppe.sort(function (a, b) {
        return new Date(b.eintrag.datum) - new Date(a.eintrag.datum);
      });

      gruppeAnzeigen(titel, gruppe);
    }

    if (ohneDatum.length > 0) {
      gruppeAnzeigen(txt("log.ohneDatum"), ohneDatum);
    }
}

    // Zeigt nur die Einträge des angetippten Tages
    function tagesListeAnzeigen() {
      const gruppe = [];

      for (let i = 0; i < eintraege.length; i++) {
        const e = eintraege[i];
        if (e.datum && !isNaN(new Date(e.datum)) && tagSchluessel(new Date(e.datum)) === tagSchluessel(gewaehlterTag)) {
          gruppe.push({ eintrag: e, index: i });
        }
      }

      gruppe.sort(function (a, b) {
        return new Date(b.eintrag.datum) - new Date(a.eintrag.datum);
      });

      gruppeAnzeigen(tagTextMitJahr(gewaehlterTag), gruppe);

      if (gruppe.length === 0) {
        const hinweis = document.createElement("p");
        hinweis.className = "leer-hinweis";
        hinweis.textContent = txt("log.tagLeer");
        document.getElementById("liste").appendChild(hinweis);
      }
    }

    // Eine Überschrift und darunter die Einträge der Gruppe
    function gruppeAnzeigen(titel, gruppe) {
    const liste = document.getElementById("liste");
    const h2 = document.createElement("h2");
    h2.textContent = titel;
    liste.appendChild(h2);
    const ul = document.createElement("ul");
    liste.appendChild(ul);

    for (let j = 0; j < gruppe.length; j++) {
    const e = gruppe[j].eintrag;
    const index = gruppe[j].index;
    const li = document.createElement("li");
    let datumText = "";
    if (e.datum) {
      datumText = datumMitJahr(new Date(e.datum)) + " – ";
    }
    li.textContent = datumText + anzeigeName(e.uebung, e.uebungId) + ": " + saetzeText(e);
    const btn = document.createElement("button");
    btn.textContent = txt("loeschen");
    btn.onclick = function () {
      loeschen(index);
    };
    li.appendChild(btn);

    ul.appendChild(li);
  }
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
      localStorage.setItem("eintraege", JSON.stringify(eintraege));
      anzeigen();

      gewaehlteUebung = "";
      gewaehlteGruppe = "";
      gewaehlteUebungId = "";
      uebungFeldAktualisieren();
      letztesMalAnzeigen();
      felderVoreinstellen();
      bestwertPruefen(eintrag, 0);

}

      function loeschen(index) {
        eintraege.splice(index, 1);
        localStorage.setItem("eintraege", JSON.stringify(eintraege));
        anzeigen();
        letztesMalAnzeigen();
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
  function saetzeVon(e) {
    const liste = [];
    if (Array.isArray(e.einzelsaetze) && e.einzelsaetze.length > 0) {
      for (let i = 0; i < e.einzelsaetze.length; i++) {
        const s = e.einzelsaetze[i];
        if (s) {
          const gewicht = Number(String(s.gewicht).replace(",", "."));
          const wdh = Number(s.wdh);
          if (!isNaN(gewicht) && !isNaN(wdh)) {
            liste.push({ gewicht: gewicht, wdh: wdh, rir: rirLesen(s.rir) });
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
  function eintragVolumen(e, zusatz) {
    const saetze = saetzeVon(e);
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
    const serie = serieBerechnen(tageProWoche, montagDerWoche(new Date()).getTime(), SERIE_TAGE_PRO_WOCHE);

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

    koerpergewichtAnzeigen();
    fortschrittUebungenAnzeigen();
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
    localStorage.setItem("routinen", JSON.stringify(routinen));
    localStorage.setItem("wochenplan", JSON.stringify(wochenplan));
  }

  // Speichert das laufende Training oder entfernt es, wenn keins mehr läuft
  function trainingMerken() {
    if (laufendesTraining) {
      localStorage.setItem("laufendesTraining", JSON.stringify(laufendesTraining));
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
  // Ohne Ziel ist er leer.
  function zielText(uebung) {
    let wdh = uebung.zielWdh;
    if (wdhBis(uebung)) {
      wdh += "–" + wdhBis(uebung);
    }
    if (uebung.zielSaetze && uebung.zielWdh) {
      return txt("ziel.beides", { saetze: uebung.zielSaetze, wdh: wdh });
    }
    if (uebung.zielSaetze) {
      return txt("ziel.saetze", { saetze: uebung.zielSaetze });
    }
    if (uebung.zielWdh) {
      return txt("ziel.wdh", { wdh: wdh });
    }
    return "";
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
    const ansichten = ["uebersicht", "bearbeiten", "modus", "fertig"];
    for (let i = 0; i < ansichten.length; i++) {
      document.getElementById("ansicht-" + ansichten[i]).classList.toggle("versteckt", ansichten[i] !== name);
    }
    trainingAnsicht = name;
    window.scrollTo(0, 0);
    kopfzeileAktualisieren();
    pauseAnzeigen();
    wachSperreAktualisieren();
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
    routinenAnzeigen();
    vorlagenAnzeigen();
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

      const auswahl = document.createElement("select");
      auswahl.appendChild(new Option(txt("plan.nichtGeplant"), ""));
      auswahl.appendChild(new Option(txt("ruhetag"), "ruhe"));
      for (let j = 0; j < routinen.length; j++) {
        auswahl.appendChild(new Option(routinen[j].name, routinen[j].id));
      }
      auswahl.value = wochenplan[i];
      auswahl.onchange = function () {
        wochenplan[i] = auswahl.value;
        routinenSpeichern();
      };
      zeile.appendChild(auswahl);
      plan.appendChild(zeile);
    }
  }

  // Alle eigenen Routinen als Karten
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
      karte.appendChild(element("div", "routine-name", routine.name));
      karte.appendChild(element("div", "routine-info", routineInfo(routine)));

      const knoepfe = element("div", "karten-knoepfe");
      const start = element("button", "knopf haupt", txt("routine.starten"));
      start.onclick = function () {
        routineStarten(routine);
      };
      knoepfe.appendChild(start);
      const aendern = element("button", "knopf", txt("routine.bearbeiten"));
      aendern.onclick = function () {
        routineBearbeiten(routine);
      };
      knoepfe.appendChild(aendern);
      karte.appendChild(knoepfe);

      // Zweite Reihe: Vier Knöpfe nebeneinander passen auf schmalen Bildschirmen nicht
      const weitere = element("div", "karten-knoepfe weitere");
      const doppelt = element("button", "knopf leise", txt("routine.duplizieren"));
      doppelt.onclick = function () {
        routineDuplizieren(routine, routine.name, routine.uebungen);
      };
      weitere.appendChild(doppelt);
      const weg = element("button", "knopf leise", txt("loeschen"));
      weg.onclick = function () {
        routineLoeschenFragen(routine);
      };
      weitere.appendChild(weg);
      karte.appendChild(weitere);
      liste.appendChild(karte);
    }
  }

  // Die fertigen Trainingssplits aus VORLAGEN als Karten
  function vorlagenAnzeigen() {
    const liste = document.getElementById("vorlagen-liste");
    liste.innerHTML = "";

    for (let i = 0; i < VORLAGEN.length; i++) {
      const vorlage = VORLAGEN[i];
      const namen = [];
      for (let j = 0; j < vorlage.routinen.length; j++) {
        namen.push(txt(vorlage.routinen[j].name));
      }

      const karte = element("div", "karte routine-karte");
      karte.appendChild(element("div", "routine-name", txt(vorlage.name)));
      karte.appendChild(element("div", "vorlage-oft", txt(vorlage.wieOft)));
      karte.appendChild(element("div", "routine-info", txt(vorlage.fuerWen)));
      karte.appendChild(element("div", "routine-info", txt("vorlage.routinen", { namen: namen.join(" · ") })));

      const knoepfe = element("div", "karten-knoepfe");
      const nehmen = element("button", "knopf", txt("vorlage.uebernehmen"));
      nehmen.onclick = function () {
        vorlageUebernehmen(vorlage);
      };
      knoepfe.appendChild(nehmen);
      karte.appendChild(knoepfe);
      liste.appendChild(karte);
    }
  }

  // Legt von jeder Routine der Vorlage eine eigene, bearbeitbare Kopie an
  // und schlägt danach den passenden Wochenplan vor. Die Vorlage selbst bleibt, wie sie ist.
  function vorlageUebernehmen(vorlage) {
    const ids = [];
    for (let i = 0; i < vorlage.routinen.length; i++) {
      const kopie = { id: neueId(), name: txt(vorlage.routinen[i].name), uebungen: [] };
      for (let j = 0; j < vorlage.routinen[i].uebungen.length; j++) {
        const u = vorlage.routinen[i].uebungen[j];
        const neu = {
          name: u.name,
          uebungId: "",
          muskelgruppe: "",
          zielSaetze: zielLesen(u.saetze, 10),
          zielWdh: zielLesen(u.wdh, 30),
          pause: null
        };
        // Die Übung über ihren Namen in der Übungsliste finden, daraus ergibt sich die Muskelgruppe
        idErgaenzen(neu, u.name);
        const bekannt = UEBUNG_NACH_ID[neu.uebungId];
        if (bekannt) {
          neu.muskelgruppe = GRUPPE_NACH_ID[uebungGruppe(bekannt)].de;
        }
        kopie.uebungen.push(neu);
      }
      routinen.push(kopie);
      ids.push(kopie.id);
    }

    // Der Vorschlag für die Woche, einmal als Daten und einmal als Text für die Frage
    const vorschlag = [];
    const zeilen = [];
    let hattePlan = false;
    for (let i = 0; i < 7; i++) {
      const platz = vorlage.wochenplan[i];
      if (platz === null) {
        vorschlag.push("ruhe");
        zeilen.push(wochentag(i) + ": " + txt("ruhetag"));
      } else {
        vorschlag.push(ids[platz]);
        zeilen.push(wochentag(i) + ": " + txt(vorlage.routinen[platz].name));
      }
      if (wochenplan[i] !== "") {
        hattePlan = true;
      }
    }

    routinenSpeichern();
    trainingAnzeigen();

    let text = txt("vorlage.angelegt", { n: vorlage.routinen.length, plan: zeilen.join("\n") });
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
      kopie.push({ name: u.name, uebungId: u.uebungId || "", muskelgruppe: u.muskelgruppe, zielSaetze: u.zielSaetze, zielWdh: u.zielWdh, zielWdhMax: wdhBis(u), pause: pauseLesen(u.pause) });
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

  // Die Vorgaben für den Wiederholungsbereich im Routinen-Editor
  const WDH_BEREICHE = [[5, 9], [6, 8], [6, 10], [8, 12]];

  // Das Wdh.-Ziel einer Übung: eine feste Zahl, einer der vorgegebenen Bereiche oder ein eigener Bereich.
  // Die Auswahl bestimmt, welche Zahlenfelder rechts neben ihr zu sehen sind.
  function wdhZielFeld(uebung) {
    const rahmen = element("div", "ziel");
    rahmen.appendChild(element("span", "", txt("wdh")));
    const spalte = element("div", "wdh-spalte");
    rahmen.appendChild(spalte);

    const auswahl = document.createElement("select");
    auswahl.className = "ziel-haupt";
    auswahl.setAttribute("aria-label", txt("editor.wdhArt"));
    auswahl.appendChild(new Option(txt("editor.festeZahl"), "fest"));
    for (let i = 0; i < WDH_BEREICHE.length; i++) {
      auswahl.appendChild(new Option(WDH_BEREICHE[i][0] + "–" + WDH_BEREICHE[i][1], String(i)));
    }
    auswahl.appendChild(new Option(txt("editor.eigenerBereich"), "eigen"));
    spalte.appendChild(auswahl);

    // Die Zahlenfelder stehen in derselben Zeile und teilen sich den Platz rechts von der Auswahl
    const felderZeile = element("div", "wdh-felder");
    const von = wdhZahlFeld(uebung, "zielWdh", txt("wiederholungen"));
    const strich = element("span", "", "–");
    const bis = wdhZahlFeld(uebung, "zielWdhMax", txt("editor.wdhBis"));
    felderZeile.appendChild(von);
    felderZeile.appendChild(strich);
    felderZeile.appendChild(bis);
    spalte.appendChild(felderZeile);

    // Was beim Öffnen gewählt ist, ergibt sich aus den gespeicherten Zahlen
    let art = "fest";
    if (wdhBis(uebung)) {
      art = "eigen";
      for (let i = 0; i < WDH_BEREICHE.length; i++) {
        if (WDH_BEREICHE[i][0] === uebung.zielWdh && WDH_BEREICHE[i][1] === uebung.zielWdhMax) {
          art = String(i);
        }
      }
    }
    auswahl.value = art;

    // Feste Zahl: ein Feld. Eigener Bereich: zwei Felder. Vorgabe: keins, die Zahlen stehen schon in der Auswahl.
    function felderZeigen() {
      von.value = uebung.zielWdh || "";
      bis.value = uebung.zielWdhMax || "";
      felderZeile.classList.toggle("versteckt", art !== "fest" && art !== "eigen");
      strich.classList.toggle("versteckt", art !== "eigen");
      bis.classList.toggle("versteckt", art !== "eigen");
    }
    felderZeigen();

    auswahl.onchange = function () {
      art = auswahl.value;
      if (art === "fest") {
        uebung.zielWdhMax = null;
      } else if (art !== "eigen") {
        uebung.zielWdh = WDH_BEREICHE[Number(art)][0];
        uebung.zielWdhMax = WDH_BEREICHE[Number(art)][1];
      }
      felderZeigen();
    };
    return rahmen;
  }

  // Ein Zahlenfeld für das untere oder obere Ende des Wdh.-Ziels. Leer heißt: keine Angabe.
  function wdhZahlFeld(uebung, feldName, beschriftung) {
    const feld = document.createElement("input");
    feld.type = "number";
    feld.inputMode = "numeric";
    feld.min = 1;
    feld.max = 30;
    feld.placeholder = "–";
    feld.setAttribute("aria-label", beschriftung);
    feld.oninput = function () {
      uebung[feldName] = zielLesen(feld.value, 30);
    };
    feld.onchange = function () {
      feld.value = uebung[feldName] || "";
    };
    return feld;
  }

  // Auswahlfeld für die Pause nach jedem Satz dieser Übung. Der erste Eintrag (Wert "") heißt: die Zeit
  // aus dem Profil. Er zeigt diese Zeit an, gespeichert wird aber weiter "keine eigene Pause" (null).
  // So zieht die Übung mit, wenn die Standard-Pause später geändert wird.
  function pauseFeld(uebung) {
    const rahmen = element("label", "ziel");
    rahmen.appendChild(element("span", "", txt("pause")));

    const auswahl = document.createElement("select");
    auswahl.className = "ziel-haupt";
    // Zwei Überschriften in der aufgeklappten Liste, damit dieselbe Zeit nicht zweimal ohne Erklärung dasteht
    const standard = document.createElement("optgroup");
    standard.label = txt("profil.standardPause");
    standard.appendChild(new Option(pauseText(pauseStandard()), ""));
    auswahl.appendChild(standard);
    const eigene = document.createElement("optgroup");
    eigene.label = txt("editor.pauseEigene");
    for (let sekunden = PAUSE_SCHRITT; sekunden <= PAUSE_MAX; sekunden += PAUSE_SCHRITT) {
      eigene.appendChild(new Option(pauseText(sekunden), sekunden));
    }
    auswahl.appendChild(eigene);
    if (uebung.pause) {
      auswahl.value = uebung.pause;
    }
    // Eine übernommene Standard-Zeit steht dezenter da als eine selbst gewählte
    auswahl.classList.toggle("uebernommen", !uebung.pause);
    auswahl.onchange = function () {
      uebung.pause = pauseLesen(auswahl.value);
      auswahl.classList.toggle("uebernommen", !uebung.pause);
    };
    rahmen.appendChild(auswahl);
    return rahmen;
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
        pause: pauseLesen(u.pause),
        // Jede Übung merkt sich ihre Sätze und die id des Eintrags, in dem sie gespeichert sind.
        // So bleibt alles erhalten, wenn man zwischen den Übungen wechselt.
        saetze: [],
        eintragId: "",
        extraSatz: false,
        // Nach einem Tausch: die Übungen, die an diesem Platz schon Sätze haben (siehe uebungTauschen)
        getauscht: []
      });
    }
    gemerkteTrainingWerte = null;
    trainingMerken();
    trainingFortsetzen();
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
    localStorage.setItem("laufendesTraining", JSON.stringify(t));
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
      stand.saetze += saetzeVon(eintrag).length;
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
    localStorage.setItem("eintraege", JSON.stringify(eintraege));

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
    localStorage.setItem("eintraege", JSON.stringify(eintraege));

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
    gewichtTitelSetzen("t-feld-gewicht", u.uebungId);
    document.getElementById("modus-ziel").textContent = zielText(u);
    document.getElementById("modus-hinweis").textContent = gewichtErhoehenText(u);

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

  // Im Trainingsmodus: das letzte Training der gezeigten Übung als kleine Tabelle, eine Zeile je Satz.
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

    let titel = txt("letztes.titel");
    if (daten.datum) {
      titel += " · " + datumMitJahr(daten.datum);
    }
    bereich.appendChild(element("h2", "abschnitt", titel));

    const karte = element("div", "karte satz-liste");
    for (let i = 0; i < daten.saetze.length; i++) {
      const zeile = element("div", "letztes-zeile");
      zeile.appendChild(element("span", "satz-nummer", i + 1));
      zeile.appendChild(element("span", "satz-werte", satzText(daten.saetze[i])));
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

  // Der Hinweis "Gewicht erhöhen": Die Übung hat einen Wiederholungsbereich, und beim letzten Mal
  // wurde in allen Sätzen das obere Ende erreicht. Sonst ist der Text leer.
  function gewichtErhoehenText(u) {
    const bis = wdhBis(u);
    if (!bis) {
      return "";
    }
    const letzter = letzterEintrag(u.name, u.uebungId, u.eintragId);
    if (!letzter) {
      return "";
    }
    const saetze = saetzeVon(letzter);
    if (saetze.length === 0) {
      return "";
    }
    for (let i = 0; i < saetze.length; i++) {
      if (saetze[i].wdh < bis) {
        return "";
      }
    }
    return txt("modus.erhoehen", { wdh: bis });
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
    const ziel = u.zielSaetze || 0;
    const gemacht = u.saetze.length;
    const letzteUebung = t.index === t.uebungen.length - 1;
    const pauseLaeuft = pauseRest() > 0;
    const zielErreicht = ziel > 0 && gemacht >= ziel && !u.extraSatz;

    // "Satz 2 von 4". Ohne Ziel und bei einem zusätzlichen Satz nur "Satz 5".
    let satzText = txt("modus.satz", { n: gemacht + 1 });
    if (zielErreicht && gemacht === ziel) {
      satzText = txt("modus.zielGeschafft", { n: gemacht, ziel: ziel });
    } else if (zielErreicht) {
      satzText = txt("modus.geschafft", { n: gemacht });
    } else if (gemacht < ziel) {
      satzText = txt("modus.satzVon", { n: gemacht + 1, ziel: ziel });
    }
    document.getElementById("modus-satz").textContent = satzText;

    let weiterText = txt("modus.naechste");
    if (letzteUebung) {
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
    let danach = txt("modus.alsNaechstes", { text: satzText });
    if (zielErreicht && letzteUebung) {
      danach = txt("modus.letzteUebung");
    } else if (zielErreicht) {
      const naechste = t.uebungen[t.index + 1];
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
  }

  // Die Werte, mit denen die Zahlenfelder für den nächsten Satz starten: die des Satzes davor,
  // beim ersten Satz die vom letzten Mal, sonst die Startwerte und das Wdh.-Ziel der Routine
  function modusStartWerte() {
    const t = laufendesTraining;
    const u = t.uebungen[t.index];
    if (u.saetze.length > 0) {
      const davor = u.saetze[u.saetze.length - 1];
      return [davor.gewicht, davor.wdh];
    }

    const werte = [startGewicht(), u.zielWdh || START_WDH];
    const letzter = letzterEintrag(u.name, u.uebungId, u.eintragId);
    if (letzter) {
      const saetze = saetzeVon(letzter);
      if (saetze.length > 0) {
        werte[0] = saetze[0].gewicht;
        werte[1] = saetze[0].wdh;
      }
    }
    return werte;
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

    // rir steht nur im Satz, wenn es angegeben wurde
    const satz = { gewicht: gewichtFeldWert("t-feld-gewicht"), wdh: feldWert("t-feld-wdh") };
    if (gewaehlterRir !== null) {
      satz.rir = gewaehlterRir;
    }
    u.saetze.push(satz);
    u.extraSatz = false;

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

    localStorage.setItem("eintraege", JSON.stringify(eintraege));
    anzeigen();
    letztesMalAnzeigen();

    gemerkteTrainingWerte = null;
    trainingMerken();
    pauseStarten(pauseDauer(u));
    modusFortschrittAnzeigen();
    modusZustandAnzeigen(false);
    modusSaetzeAnzeigen();
    window.scrollTo(0, 0);
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
    if (!satz || !hatDatum(eintrag)) {
      return;
    }
    const datum = new Date(eintrag.datum);
    const koerper = koerperZusatz(eintrag.uebungId, datum);
    if (!rangSatzGueltig(satz.gewicht + koerper, satz.wdh)) {
      return;
    }
    const neu = epley1RM(satz.gewicht + koerper, satz.wdh);
    for (let i = 0; i < index; i++) {
      if (epley1RM(saetze[i].gewicht + koerper, saetze[i].wdh) >= neu) {
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

  // "80 kg × 10", mit Reps in Reserve "80 kg × 10 · RIR 2"
  function satzText(satz) {
    let text = gewichtText(satz.gewicht) + " × " + satz.wdh;
    if (rirLesen(satz.rir) !== null) {
      text += " · " + rirText(satz.rir);
    }
    return text;
  }

  // Baut zu einem Eintrag eine Zeile je Satz. Antippen öffnet das Bearbeiten.
  function satzZeilenBauen(behaelter, eintrag) {
    const saetze = saetzeVon(eintrag);
    for (let i = 0; i < saetze.length; i++) {
      const zeile = element("button", "satz-zeile");
      zeile.appendChild(element("span", "satz-nummer", i + 1));
      zeile.appendChild(element("span", "satz-werte", satzText(saetze[i])));
      const pfeil = element("span", "einst-pfeil", "›");
      pfeil.setAttribute("aria-hidden", "true");
      zeile.appendChild(pfeil);
      zeile.setAttribute("aria-label", txt("satz.bearbeiten", { n: i + 1 }) + ": " + satzText(saetze[i]));
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

    // Nach dem letzten Ziel-Satz gibt es keinen aktuellen Satz, bis "+ Satz" einen weiteren startet
    const ziel = u.zielSaetze || 0;
    const zielErreicht = ziel > 0 && saetze.length >= ziel && !u.extraSatz;
    let zeilen = Math.max(saetze.length, ziel);
    if (!zielErreicht) {
      zeilen = Math.max(saetze.length + 1, ziel);
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
    kopf.appendChild(element("span", "", txt("gewicht")));
    kopf.appendChild(element("span", "", txt("wdh")));
    kopf.appendChild(element("span", ""));
    karte.appendChild(kopf);

    for (let i = 0; i < zeilen; i++) {
      let zeile;
      if (i < saetze.length) {
        const satz = saetze[i];
        zeile = element("button", "satz-reihe erledigt");
        zeile.appendChild(element("span", "satz-nummer", i + 1));
        zeile.appendChild(element("span", "", gewichtText(satz.gewicht)));
        const wdh = element("span", "", satz.wdh);
        if (rirLesen(satz.rir) !== null) {
          wdh.appendChild(element("span", "satz-rir", rirText(satz.rir)));
        }
        zeile.appendChild(wdh);
        const haken = element("span", "satz-haken", "✓");
        haken.setAttribute("aria-hidden", "true");
        zeile.appendChild(haken);
        zeile.setAttribute("aria-label", txt("satz.bearbeiten", { n: i + 1 }) + ": " + satzText(satz));
        zeile.onclick = function () {
          satzSheetOeffnen(eintrag.id, i);
        };
      } else {
        zeile = element("div", "satz-reihe offen");
        if (i === saetze.length && !zielErreicht) {
          zeile.className = "satz-reihe aktuell";
        }
        zeile.appendChild(element("span", "satz-nummer", i + 1));
        zeile.appendChild(element("span", "", "–"));
        zeile.appendChild(element("span", "", zielWdh));
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

    document.getElementById("satz-sheet-titel").textContent = txt("satz.bearbeiten", { n: index + 1 });
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
      n: satzIndex + 1,
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
    localStorage.setItem("eintraege", JSON.stringify(eintraege));

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
    }

    // Das Profil mit dem offenen Trainingstag. Hat der Tag keinen Eintrag mehr, schließt sich sein Sheet.
    if (aktiveSeite === "profil") {
      profilAnzeigen();
      if (document.getElementById("tag-sheet").classList.contains("offen")) {
        if (profilTage[tagSheetSchluessel]) {
          tagSheetFuellen(tagSheetSchluessel);
        } else {
          zusatzSheetsSchliessen();
        }
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
  }

  // "Nächste Übung" oder "Übung überspringen": weiter zur nächsten Übung der Routine.
  // Nach der letzten Übung endet das Training, vorher kommt die Auswahl zum Speichern oder Verwerfen.
  function uebungBeenden() {
    const t = laufendesTraining;
    if (t.index < t.uebungen.length - 1) {
      uebungZeigen(t.index + 1);
      return;
    }
    trainingBeendenFragen(true);
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

    const vorschlaege = tauschVorschlaege();
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
    const gemacht = u.saetze.length;
    if (gemacht === 0) {
      return txt("stand.offen");
    }
    const saetze = txtAnzahl("anzahl.saetze", gemacht);
    if (!u.zielSaetze) {
      return saetze;
    }
    if (gemacht >= u.zielSaetze) {
      return txt("stand.fertig", { saetze: saetze });
    }
    return txt("stand.xVonY", { x: gemacht, y: u.zielSaetze });
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
      zeile.onclick = function () {
        zusatzSheetsSchliessen();
        uebungZeigen(i);
      };
      liste.appendChild(zeile);
    }
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
      anzahlSaetze += saetzeVon(eintrag).length;
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

    trainingseinheitSpeichern(t);

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
    localStorage.setItem("trainings", JSON.stringify(trainings));
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

  // Öffnet das Log mit einem Tag der aktuellen Woche, so als wäre er dort angetippt worden
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
    document.getElementById("home-datum").textContent = new Date().toLocaleDateString(gebiet(), { weekday: "long", day: "numeric", month: "long" });
    homeHeuteAnzeigen();
    homeWocheAnzeigen();
    homeLetztesAnzeigen();
    homeGewichtAnzeigen();
    homeKraftAnzeigen();
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
      }
      karte.appendChild(element("div", "ansicht-titel", routine.name));
      karte.appendChild(element("div", "routine-info", routineInfo(routine)));

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
      karte.appendChild(element("div", "heute-label", txt("heute")));
      karte.appendChild(element("div", "ansicht-titel", txt("ruhetag")));
      karte.appendChild(element("div", "routine-info", txt("home.ruheText")));
      return;
    }

    karte.appendChild(element("div", "heute-label", txt("heute")));
    karte.appendChild(element("div", "ansicht-titel", txt("home.nichtsGeplant")));
    karte.appendChild(element("div", "routine-info", txt("home.nichtsText")));
    const zumPlan = element("button", "knopf heute-knopf", txt("home.zumPlan"));
    zumPlan.onclick = function () {
      seiteZeigen("training");
    };
    karte.appendChild(zumPlan);
  }

  // Die sieben Tage der aktuellen Woche: geplante Routine und ein grüner Punkt, wenn trainiert wurde
  function homeWocheAnzeigen() {
    const heute = new Date();
    const montag = montagDerWoche(heute);

    // Jeder Tag mit mindestens einem Eintrag gilt als trainiert
    const trainiert = {};
    for (let i = 0; i < eintraege.length; i++) {
      if (hatDatum(eintraege[i])) {
        trainiert[tagSchluessel(new Date(eintraege[i].datum))] = true;
      }
    }

    const leiste = document.getElementById("home-woche");
    leiste.innerHTML = "";

    for (let i = 0; i < 7; i++) {
      const tag = new Date(montag.getFullYear(), montag.getMonth(), montag.getDate() + i);
      const btn = element("button", "home-tag");
      btn.appendChild(element("span", "tag-name", wochentag(i)));
      btn.appendChild(element("span", "tag-zahl", tag.getDate()));

      let plan = "–";
      let ansage = txt("home.tag.nichts");
      const routine = routineFinden(wochenplan[i]);
      if (routine) {
        plan = routine.name;
        ansage = routine.name;
      } else if (wochenplan[i] === "ruhe") {
        plan = txt("home.tag.ruhe");
        ansage = txt("ruhetag");
      }
      btn.appendChild(element("span", "tag-plan", plan));

      const punkt = element("span", "tag-punkt");
      if (trainiert[tagSchluessel(tag)]) {
        punkt.classList.add("trainiert");
        ansage += ", " + txt("home.tag.trainiert");
      }
      btn.appendChild(punkt);
      btn.setAttribute("aria-label", tagText(tag) + " " + ansage);

      if (tagSchluessel(tag) === tagSchluessel(heute)) {
        btn.classList.add("heute");
      }
      // Tage in der Zukunft lassen sich nicht antippen
      btn.disabled = tagSchluessel(tag) > tagSchluessel(heute);
      btn.onclick = function () {
        logFuerTagZeigen(tag);
      };
      leiste.appendChild(btn);
    }
  }

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
      anzahlSaetze += saetzeVon(e).length;
      bewegt += eintragVolumen(e, 0);
    }

    let info = tagTextMitJahr(training.datum);
    if (training.minuten !== null) {
      info += " · " + dauerText(training.minuten);
    }
    karte.appendChild(element("div", "routine-name", training.name));
    karte.appendChild(element("div", "routine-info", info));

    const zahlen = element("div", "home-zahlen");
    zahlen.appendChild(homeZahl(anzahlUebungen, txt("uebungen")));
    zahlen.appendChild(homeZahl(anzahlSaetze, txt("saetze")));
    zahlen.appendChild(homeZahl(volumenText(bewegt), txt("home.bewegt")));
    karte.appendChild(zahlen);
  }

  // Eine Zahl mit Beschriftung darunter
  function homeZahl(zahl, titel) {
    const feld = element("div", "");
    feld.appendChild(element("div", "home-zahl", zahl));
    feld.appendChild(element("div", "kachel-titel", titel));
    return feld;
  }

  // Die App bleibt oft tagelang offen: beim Zurückkehren stimmt "heute" sonst nicht mehr
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && aktiveSeite === "home") {
      homeAnzeigen();
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

  // Die Pause für eine Übung: ihre eigene aus der Routine, sonst die Standard-Pause
  function pauseDauer(uebung) {
    return pauseLesen(uebung.pause) || pauseStandard();
  }

  // Einstellungen: zeigt die Standard-Pause
  function pauseStandardAnzeigen() {
    document.getElementById("pause-standard").textContent = pauseText(pauseStandard());
  }

  // Einstellungen: macht die Standard-Pause um 15 Sekunden kürzer oder länger
  function pauseStandardAendern(sekunden) {
    einstellungen.pauseSekunden = Math.max(PAUSE_SCHRITT, Math.min(PAUSE_MAX, pauseStandard() + sekunden));
    localStorage.setItem("einstellungen", JSON.stringify(einstellungen));
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
      localStorage.setItem("pause", JSON.stringify(pause));
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

  // Beim Zurückkehren zur App: Restzeit der Pause neu berechnen und das Display wieder anlassen
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
      pauseTick();
    }
    wachSperreAktualisieren();
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
  function diagrammZeichnen(behaelter, reihen, ablesen, von, bis) {
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
        svg += '<path class="linie-' + reihen[r].art + '" d="' + weg + '"/>';
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

    // Am Anfang ist der neueste Wert gewählt
    punktZeigen(taster.punkte.length - 1);
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
    document.getElementById("muster-sheet").classList.remove("offen");
    document.getElementById("teilen-sheet").classList.remove("offen");
    document.getElementById("zusatz-hintergrund").classList.remove("offen");
    document.body.classList.remove("sheet-offen");
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
  function istEigengewicht(id) {
    const u = UEBUNG_NACH_ID[id];
    return Boolean(u) && u.bereich === "eigen";
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
  // ohneEintragId lässt einen Eintrag aus (für die Nachfrage "Stimmt der Wert?").
  function verlaufPunkte(name, id, art, ohneEintragId) {
    const tage = {};

    for (let i = 0; i < eintraege.length; i++) {
      const e = eintraege[i];
      if (!hatDatum(e) || typeof e.uebung !== "string" || !gleicheUebung(e, name, id)) {
        continue;
      }
      if (ohneEintragId && e.id === ohneEintragId) {
        continue;
      }
      const saetze = saetzeVon(e);
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
  // ihre ID ("" bei Übungen ohne ID), den Zeitpunkt des letzten Eintrags (zeit, 0 ohne Datum)
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
        gefunden[schluessel] = { name: e.uebung, id: e.uebungId || "", zeit: zeit, tage: {}, tageZuletzt: 0 };
        liste.push(gefunden[schluessel]);
      } else if (zeit > gefunden[schluessel].zeit) {
        gefunden[schluessel].zeit = zeit;
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

  // Fortschritt-Tab: alle Übungen, zu denen es Einträge gibt, die zuletzt trainierte oben.
  // Unter dem Namen steht der Fortschritts-Rang der Übung, sobald es einen gibt.
  function fortschrittUebungenAnzeigen() {
    const bereich = document.getElementById("fortschritt-uebungen");
    bereich.innerHTML = "";
    const liste = trainierteUebungen();

    if (liste.length === 0) {
      bereich.appendChild(element("p", "leer-hinweis", txt("fortschritt.kraftLeer")));
      return;
    }

    for (let i = 0; i < liste.length; i++) {
      const u = liste[i];
      const zeile = element("button", "listen-zeile");
      const links = element("span", "listen-text");
      links.appendChild(element("span", "", anzeigeName(u.name, u.id)));
      const f = fortschrittRang(verlaufPunkte(u.name, u.id, "rang"), Date.now());
      if (f) {
        links.appendChild(element("span", "rang-zeile", txt("rang.fortschrittKurz", { rang: rangName(f.rp), prozent: prozentText(f.steigerung) })));
      }
      zeile.appendChild(links);
      if (u.zeit > 0) {
        zeile.appendChild(element("span", "routine-info", datumMitJahr(new Date(u.zeit))));
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
    if (unterschied > 0) {
      return { text: "↑ " + kraftText(unterschied), art: "hoch" };
    }
    if (unterschied < 0) {
      return { text: "↓ " + kraftText(-unterschied), art: "runter" };
    }
    return { text: "–", art: "gleich" };
  }

  // Die Punkte für das kleine Diagramm: die der letzten KRAFT_DIAGRAMM_TAGE Tage.
  // Liegt dort keiner, sind es alle. punkte: [{ zeit, wert }], der älteste zuerst.
  function miniZeitraum(punkte) {
    const von = Date.now() - KRAFT_DIAGRAMM_TAGE * 86400000;
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
  function miniDiagramm(flaeche, reihen) {
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

  // So viele Messungen zeigt die Liste unter dem Diagramm
  const MESSUNGEN_ANZAHL = 7;

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

  // Der gewählte Zeitraum in Tagen, für jedes der zwei Diagramme einzeln
  let kgZeitraum = 30;
  let fettZeitraum = 30;

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
    localStorage.setItem("koerpergewicht", JSON.stringify(koerpergewicht));
  }

  // Alle gültigen Messungen als { zeit, wert, fett, index }, die älteste zuerst.
  // fett ist das Körperfett in Prozent oder null, wenn es nicht angegeben wurde.
  // index ist die Stelle in der gespeicherten Liste, damit Löschen die richtige Messung trifft.
  function gewichtMessungen() {
    const liste = [];
    for (let i = 0; i < koerpergewicht.length; i++) {
      const m = koerpergewicht[i];
      if (hatDatum(m) && typeof m.gewicht === "number" && !isNaN(m.gewicht)) {
        liste.push({ zeit: new Date(m.datum).getTime(), wert: m.gewicht, fett: koerperfettVon(m), index: i });
      }
    }
    liste.sort(function (a, b) {
      return a.zeit - b.zeit;
    });
    return liste;
  }

  // Nur die Messungen mit Körperfett als { zeit, wert }, die älteste zuerst. wert ist hier das Körperfett.
  function fettMessungen() {
    const alle = gewichtMessungen();
    const liste = [];
    for (let i = 0; i < alle.length; i++) {
      if (alle[i].fett !== null) {
        liste.push({ zeit: alle[i].zeit, wert: alle[i].fett });
      }
    }
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

  // Der Text zu einer solchen Veränderung: Pfeil und Betrag, z. B. "↓ 0,4 kg"
  function schnittAenderungText(unterschied) {
    let pfeil = "→";
    if (unterschied > 0) {
      pfeil = "↑";
    } else if (unterschied < 0) {
      pfeil = "↓";
    }
    return pfeil + " " + einheitText(Math.abs(unterschied));
  }

  // Öffnet das Eintragen. Das Rad steht auf dem letzten Gewicht.
  // Das Körperfett-Feld ist leer, außer für heute wurde schon eins eingetragen.
  function gewichtSheetOeffnen() {
    const liste = gewichtMessungen();
    let start = START_KOERPERGEWICHT;
    let fett = null;
    if (liste.length > 0) {
      const letzte = liste[liste.length - 1];
      start = letzte.wert;
      if (tagSchluessel(new Date(letzte.zeit)) === tagSchluessel(new Date())) {
        fett = letzte.fett;
      }
    }
    koerperfettFeldSetzen(fett);
    // Das Rad zeigt die gewählte Einheit und kennt nur Werte innerhalb seiner Grenzen
    const grenzen = GEWICHT_EINHEITEN[einheit()];
    const wert = Math.round(ausKg(start) * 10) / 10;
    zusatzSheetOeffnen("gewicht-sheet");
    radSetzen("rad-koerpergewicht", Math.max(grenzen.koerperMin, Math.min(wert, grenzen.koerperMax)));
  }

  // Speichert das Gewicht vom Rad für heute, dazu das Körperfett, wenn eins im Feld steht.
  // Eine frühere Messung von heute wird ersetzt.
  function gewichtSpeichern() {
    const jetzt = new Date();
    koerpergewicht = koerpergewicht.filter(function (m) {
      return !hatDatum(m) || tagSchluessel(new Date(m.datum)) !== tagSchluessel(jetzt);
    });
    const messung = { datum: jetzt.toISOString(), gewicht: zuKg(radWert("rad-koerpergewicht")) };
    const fett = koerperfettLesen(document.getElementById("feld-koerperfett").value);
    if (fett !== null) {
      messung.koerperfett = fett;
    }
    koerpergewicht.push(messung);
    gewichteSpeichern();

    zusatzSheetsSchliessen();
    homeGewichtAnzeigen();
    koerpergewichtAnzeigen();
    if (aktiveSeite === "profil") {
      profilAnzeigen();
    }
  }

  function gewichtLoeschen(index) {
    koerpergewicht.splice(index, 1);
    gewichteSpeichern();
    homeGewichtAnzeigen();
    koerpergewichtAnzeigen();
  }

  // Zeichnet Messungen mit ihrem 7-Tage-Schnitt: die Messungen dünn und grau, darüber kräftig der Schnitt.
  // kennung ist "kg" oder "fett" und steht vorn an den ids von Diagramm und Legende.
  // zeitraum ist die Zahl der Tage (0 = alles). umrechnen macht aus einem gespeicherten Wert den gezeigten,
  // text macht aus einem gezeigten Wert den Text mit Einheit. leerText steht da, solange es keine Messung gibt.
  function messungenZeichnen(kennung, liste, zeitraum, umrechnen, text, leerText) {
    const diagramm = document.getElementById(kennung + "-diagramm");
    const jetzt = Date.now();
    let von;
    let bis;
    if (zeitraum > 0) {
      von = jetzt - zeitraum * 86400000;
      bis = jetzt;
    }
    const messungen = [];
    const schnitt = [];
    for (let i = 0; i < liste.length; i++) {
      if (von === undefined || liste[i].zeit >= von) {
        const mittel = umrechnen(schnittAm(liste, new Date(liste[i].zeit)));
        messungen.push({ zeit: liste[i].zeit, wert: umrechnen(liste[i].wert), zusatz: txt("messung.schnitt", { wert: text(mittel) }) });
        schnitt.push({ zeit: liste[i].zeit, wert: mittel });
      }
    }

    document.getElementById(kennung + "-legende").classList.toggle("versteckt", messungen.length === 0);
    if (messungen.length === 0) {
      diagramm.innerHTML = "";
      let hinweis = txt("messung.zeitraumLeer");
      if (liste.length === 0) {
        hinweis = leerText;
      }
      diagramm.appendChild(element("p", "meldung", hinweis));
    } else {
      diagrammZeichnen(diagramm, [
        { punkte: messungen, art: "neben", mitPunkten: true, tasten: true },
        { punkte: schnitt, art: "haupt", mitPunkten: false }
      ], function (p) {
        return text(p.wert);
      }, von, bis);
    }
  }

  // Fortschritt-Tab: das Diagramm für das Körperfett, mit denselben Zeiträumen wie beim Gewicht
  function koerperfettAnzeigen() {
    umschalterBauen(document.getElementById("fett-zeitraum"), KG_ZEITRAEUME, fettZeitraum, function (tage) {
      fettZeitraum = tage;
      koerperfettAnzeigen();
    });
    messungenZeichnen("fett", fettMessungen(), fettZeitraum, function (wert) {
      return wert;
    }, fettText, txt("messung.fettLeer"));
  }

  // Fortschritt-Tab: Diagramm, Kacheln und die Liste der letzten Messungen
  function koerpergewichtAnzeigen() {
    const liste = gewichtMessungen();

    umschalterBauen(document.getElementById("kg-zeitraum"), KG_ZEITRAEUME, kgZeitraum, function (tage) {
      kgZeitraum = tage;
      koerpergewichtAnzeigen();
    });
    messungenZeichnen("kg", liste, kgZeitraum, ausKg, einheitText, txt("messung.gewichtLeer"));
    koerperfettAnzeigen();

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

    // Die letzten Messungen, die neueste zuerst, jede mit Löschen
    const bereich = document.getElementById("kg-liste");
    bereich.innerHTML = "";
    if (liste.length === 0) {
      bereich.appendChild(element("p", "leer-hinweis", txt("fortschritt.keineMessungen")));
    }
    for (let i = liste.length - 1; i >= 0 && i >= liste.length - MESSUNGEN_ANZAHL; i--) {
      const m = liste[i];
      const zeile = element("div", "listen-zeile");
      // Unter dem Datum steht das Körperfett, wenn es angegeben wurde
      zeile.appendChild(element("span", "", kgText(m.wert)));
      const datum = element("span", "messung-datum", tagTextMitJahr(new Date(m.zeit)));
      if (m.fett !== null) {
        datum.appendChild(element("div", "", txt("messung.fett", { wert: fettText(m.fett) })));
      }
      zeile.appendChild(datum);
      const weg = element("button", "", txt("loeschen"));
      weg.onclick = function () {
        gewichtLoeschen(m.index);
      };
      zeile.appendChild(weg);
      bereich.appendChild(zeile);
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
        const neu = { name: u.name, uebungId: id, muskelgruppe: gruppe, zielSaetze: zielLesen(u.zielSaetze, 10), zielWdh: u.zielWdh, zielWdhMax: u.zielWdhMax, pause: pauseLesen(u.pause) };
        wdhZielBereinigen(neu);
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

    localStorage.setItem("trainings", JSON.stringify(trainings));
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
      app: "gymstead",
      version: 8,
      exportiert: new Date().toISOString(),
      profil: profil,
      eintraege: eintraege,
      eigeneUebungen: eigeneUebungen,
      routinen: routinen,
      wochenplan: wochenplan,
      trainings: trainings,
      koerpergewicht: koerpergewicht,
      einstellungen: einstellungen
    };
    return JSON.stringify(backup, null, 2);
  }

  // Speichert alle Einträge als Datei, z. B. gymstead-backup-2026-10-07.json
  function backupExportieren() {
    const heute = new Date();
    const dateiname = "gymstead-backup-" + heute.getFullYear()
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
    localStorage.setItem("letztesBackup", JSON.stringify(new Date().toISOString()));
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
    // mit der Kennung "hybridslife" weiter importieren.
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

    // Einstellungen gibt es erst in neueren Backups
    importEinstellungen = null;
    if (daten && !Array.isArray(daten) && daten.einstellungen && typeof daten.einstellungen === "object") {
      importEinstellungen = einstellungenBereinigen(daten.einstellungen);
    }

    // Name und Benutzername gibt es erst ab Backup-Version 7. Ältere Backups lassen das Profil, wie es ist.
    importProfil = null;
    if (daten && !Array.isArray(daten) && daten.profil && typeof daten.profil === "object") {
      importProfil = profilBereinigen(daten.profil);
    }

    // Das Körpergewicht gibt es erst in neueren Backups. Übernommen wird nur, was Datum und Gewicht hat,
    // dazu das Körperfett, wenn es angegeben und gültig ist.
    importGewichte = null;
    if (daten && !Array.isArray(daten) && Array.isArray(daten.koerpergewicht)) {
      importGewichte = [];
      for (let i = 0; i < daten.koerpergewicht.length; i++) {
        const m = daten.koerpergewicht[i];
        if (hatDatum(m) && typeof m.gewicht === "number" && !isNaN(m.gewicht)) {
          const messung = { datum: m.datum, gewicht: m.gewicht };
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

    localStorage.setItem("eintraege", JSON.stringify(eintraege));

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
    abzeichen: '<circle cx="12" cy="14.5" r="5"/><path d="M9.3 10.2L6 3h4l2 4 2-4h4l-3.3 7.2"/>'
  };

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

  // Macht aus gespeicherten oder importierten Daten ein sauberes Profil. Was fehlt oder ungültig ist, bleibt leer.
  function profilBereinigen(p) {
    const sauber = { name: "", benutzername: "" };
    if (!p || typeof p !== "object") {
      return sauber;
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
    localStorage.setItem("profil", JSON.stringify(profil));
  }

  // Übernimmt Name und Benutzername aus einem Backup. Beim Ersetzen gilt, was im Backup steht.
  // Beim Ergänzen füllt das Backup nur, was hier noch leer ist. Ein leeres Feld im Backup ändert nie etwas.
  function profilUebernehmen(neu, art) {
    if (neu.name && (art === "ersetzen" || !profil.name)) {
      profil.name = neu.name;
    }
    if (neu.benutzername && (art === "ersetzen" || !profil.benutzername)) {
      profil.benutzername = neu.benutzername;
    }
    profilSichern();
  }

  // Einstellungen: füllt die Felder "Name" und "Benutzername" mit dem gespeicherten Profil
  function profilFormFuellen() {
    document.getElementById("profil-feld-name").value = profil.name;
    document.getElementById("profil-feld-benutzer").value = profil.benutzername;
    profilFelderGeaendert();
  }

  // Beim Tippen verschwinden die Fehlermeldungen wieder
  function profilFelderGeaendert() {
    document.getElementById("profil-name-meldung").textContent = "";
    document.getElementById("profil-benutzer-meldung").textContent = "";
  }

  // Prüft die beiden Felder und speichert das Profil. Bei einem Fehler steht die Meldung unter dem Feld.
  function profilSpeichern() {
    const name = nameSaeubern(document.getElementById("profil-feld-name").value);
    const benutzername = benutzerLesen(document.getElementById("profil-feld-benutzer").value);
    document.getElementById("profil-name-meldung").textContent = nameFehler(name);
    document.getElementById("profil-benutzer-meldung").textContent = benutzerFehler(benutzername);
    if (nameFehler(name) !== "" || benutzerFehler(benutzername) !== "") {
      return;
    }

    profil = { name: name, benutzername: benutzername };
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
      const saetze = saetzeVon(e);
      tag.eintraege.push(e);
      tag.saetze += saetze.length;
      for (let j = 0; j < saetze.length; j++) {
        tag.wdh += saetze[j].wdh;
      }
      tag.volumen += eintragVolumen(e, 0);
    }
    return tage;
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

    let benutzer = "";
    if (profil.benutzername) {
      benutzer = "@" + profil.benutzername;
    }
    document.getElementById("profil-benutzer").textContent = benutzer;

    const zahlen = gesamtZahlen();
    const bereich = document.getElementById("profil-zahlen");
    bereich.innerHTML = "";
    bereich.appendChild(homeZahl(zahlen.workouts, txt("profil.workouts")));
    bereich.appendChild(homeZahl(zahlen.serie, txt("profil.serie")));
    const volumen = homeZahl(volumenText(zahlen.gewicht), txt("verlauf.volumen"));
    volumen.classList.add("breit");
    bereich.appendChild(volumen);
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
      localStorage.setItem("backupHinweisWeg", JSON.stringify(new Date().toISOString()));
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

    for (let i = 0; i < schluessel.length && i < verlaufGezeigt; i++) {
      const tag = profilTage[schluessel[i]];
      const zeile = element("button", "verlauf-zeile");
      const links = element("span", "verlauf-text");
      links.appendChild(element("span", "verlauf-name", tagName(tag)));
      links.appendChild(element("span", "verlauf-info", tagTextMitJahr(tag.datum) + " · " + txtAnzahl("anzahl.saetze", tag.saetze)));
      zeile.appendChild(links);
      zeile.appendChild(element("span", "verlauf-volumen", volumenText(tag.volumen)));
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

  // Der Trainingstag, dessen Details gerade offen sind
  let tagSheetSchluessel = "";

  // Die Details eines Trainingstags: jede Übung mit ihren Sätzen
  function tagSheetOeffnen(schluessel) {
    if (!profilTage[schluessel]) {
      return;
    }
    tagSheetFuellen(schluessel);
    document.getElementById("tag-sheet-inhalt").scrollTop = 0;
    zusatzSheetOeffnen("tag-sheet");
  }

  // Baut den Inhalt des Sheets. Jeder Satz ist eine Zeile, Antippen öffnet das Bearbeiten.
  function tagSheetFuellen(schluessel) {
    const tag = profilTage[schluessel];
    tagSheetSchluessel = schluessel;
    document.getElementById("tag-sheet-titel").textContent = tagTextMitJahr(tag.datum);

    const inhalt = document.getElementById("tag-sheet-inhalt");
    inhalt.innerHTML = "";
    const uebungen = tagUebungen(tag);
    const teile = [txtAnzahl("anzahl.uebungen", uebungen.length), txtAnzahl("anzahl.saetze", tag.saetze), volumenText(tag.volumen)];
    // Gab es eine Routine, steht ihr Name vorn
    if (tagRoutinen(tag).length > 0) {
      teile.unshift(tagName(tag));
    }
    inhalt.appendChild(element("p", "tag-zusammenfassung", teile.join(" · ")));

    for (let i = 0; i < tag.eintraege.length; i++) {
      const e = tag.eintraege[i];
      const zeile = element("div", "tag-eintrag");
      zeile.appendChild(element("div", "tag-eintrag-name", anzeigeName(e.uebung, e.uebungId)));
      // Einträge, bei denen keine Zahlen stehen, haben keine einzelnen Sätze: Sie zeigen nur ihren Text
      if (saetzeVon(e).length === 0) {
        zeile.appendChild(element("div", "routine-info", saetzeText(e)));
      } else {
        satzZeilenBauen(zeile, e);
      }
      inhalt.appendChild(zeile);
    }
  }

  // Statistik: die Serie und die Zahlen der laufenden Woche, alles in der gewählten Einheit
  function profilStatistikAnzeigen(inhalt) {
    const serie = element("div", "karte");
    serie.appendChild(element("div", "routine-name", txtAnzahl("profil.serieText", gesamtZahlen().serie)));
    serie.appendChild(element("div", "routine-info", txt("fortschritt.serie", { n: SERIE_TAGE_PRO_WOCHE })));
    inhalt.appendChild(serie);

    // Diese Woche: alle Trainingstage ab Montag
    const montag = tagSchluessel(montagDerWoche(new Date()));
    let workouts = 0;
    let volumen = 0;
    let wdh = 0;
    Object.keys(profilTage).forEach(function (schluessel) {
      if (Number(schluessel) >= montag) {
        workouts++;
        volumen += profilTage[schluessel].volumen;
        wdh += profilTage[schluessel].wdh;
      }
    });

    inhalt.appendChild(element("h2", "abschnitt", txt("home.dieseWoche")));
    const woche = element("div", "karte");
    const zahlen = element("div", "home-zahlen profil-zahlen ohne-abstand");
    zahlen.appendChild(homeZahl(workouts, txt("profil.workouts")));
    zahlen.appendChild(homeZahl(wdh.toLocaleString(gebiet()), txt("wiederholungen")));
    const feld = homeZahl(volumenText(volumen), txt("verlauf.volumen"));
    feld.classList.add("breit");
    zahlen.appendChild(feld);
    woche.appendChild(zahlen);
    inhalt.appendChild(woche);
  }

  // Abzeichen: der Gesamt-Kraftrang, der Konstanz-Rang, die sechs Bewegungsmuster und die Abzeichen.
  // Gerechnet wird in der raenge.js, hier wird nur gesammelt und angezeigt.
  function profilAbzeichenAnzeigen(inhalt) {
    // Wer die Ränge hier sieht, braucht dazu keine Meldung mehr
    const daten = rangPruefen(false);
    const stand = daten.stand;

    inhalt.appendChild(gesamtRangKarte(stand));
    inhalt.appendChild(konstanzKarte(stand));

    inhalt.appendChild(element("h2", "abschnitt", txt("rang.muster")));
    const muster = element("div", "muster-raster");
    for (let i = 0; i < MUSTER.length; i++) {
      muster.appendChild(musterKarte(MUSTER[i], stand.kraft.muster[MUSTER[i]], stand.gruende[MUSTER[i]]));
    }
    inhalt.appendChild(muster);

    inhalt.appendChild(element("h2", "abschnitt", txt("profil.reiter.abzeichen")));
    const raster = element("div", "abzeichen-raster");
    for (let i = 0; i < daten.abzeichen.length; i++) {
      // Geheime Abzeichen erscheinen erst, wenn sie erreicht sind
      if (daten.abzeichen[i].geheim && !daten.abzeichen[i].erreicht) {
        continue;
      }
      raster.appendChild(abzeichenKachel(daten.abzeichen[i], stand));
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
  function rangStand() {
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
      uebungen.push({ id: liste[i].id, name: liste[i].name, rang: rang, punkte: verlaufPunkte(liste[i].name, liste[i].id, "rang") });
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
      const saetze = saetzeVon(e);
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

    // Frühaufsteher: das früheste Training im Trainingsmodus, das vor 7 Uhr begonnen hat
    let frueh = null;
    for (let i = 0; i < trainings.length; i++) {
      const start = new Date(trainings[i] && trainings[i].start);
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

    if (erstesMal || JSON.stringify(merker) !== vorher) {
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

  // Fasst Namen für die Meldung zusammen: "A, B, C +2"
  function meldungNamen(namen) {
    let text = namen.slice(0, RANG_MELDUNG_ANZAHL).join(", ");
    if (namen.length > RANG_MELDUNG_ANZAHL) {
      text += " +" + (namen.length - RANG_MELDUNG_ANZAHL);
    }
    return text;
  }

  // Zeigt über der Navigationsleiste eine Meldung für alle neuen Stufen und Abzeichen zusammen,
  // z. B. "Neuer Rang: Stark I · Drücken horizontal". Sie bleibt, bis sie angetippt oder geschlossen wird.
  function rangMeldungZeigen(aufstiege, abzeichen) {
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
  }

  function rangMeldungSchliessen() {
    document.getElementById("rang-hinweis").classList.remove("sichtbar");
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

  // Oben: der Gesamt-Kraftrang groß. Solange es ihn nicht gibt, steht da, was fehlt.
  function gesamtRangKarte(stand) {
    const karte = element("div", "karte rang-karte gross");
    const gesamt = stand.kraft.gesamt;

    if (gesamt === null) {
      karte.appendChild(rangKopf(null, txt("rang.gesamt"), txt("rang.keiner")));
      if (eintraege.length === 0) {
        karte.appendChild(element("div", "routine-info", txt("rang.leerEintraege")));
      } else if (stand.messungen === 0) {
        karte.appendChild(element("div", "routine-info", txt("rang.leerKoerper")));
        const knopf = element("button", "knopf rang-knopf", txt("rang.koerperEintragen"));
        knopf.onclick = gewichtSheetOeffnen;
        karte.appendChild(knopf);
      } else {
        karte.appendChild(element("div", "routine-info", txtAnzahl("rang.fehlen", stand.kraft.fehlen)));
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
    const bild = element("span", "abzeichen-bild");
    bild.innerHTML = medailleSvg(a.stufe);
    kachel.appendChild(bild);
    kachel.appendChild(element("div", "abzeichen-titel", abzeichenTitel(a)));
    kachel.appendChild(element("div", "abzeichen-info", abzeichenInfo(a, stand)));
    return kachel;
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

  // ---------- Einstellungen ----------

  // Die Ansichten der Einstellungen und der Schlüssel ihres Titels: die Übersicht ("haupt") und die Unterseiten
  const EINST_TITEL = {
    haupt: "einst.titel",
    profil: "profil.bearbeiten",
    einheiten: "profil.einheiten",
    design: "design",
    sprache: "profil.sprache",
    faq: "einst.faq",
    ueber: "einst.ueber"
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
    if (name === "ueber") {
      document.getElementById("ueber-version").textContent = appVersion();
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

    folgenZeile("folgen-instagram", INSTAGRAM_URL);
    folgenZeile("folgen-tiktok", TIKTOK_URL);
    document.getElementById("einst-folgen").classList.toggle("versteckt", INSTAGRAM_URL === "" && TIKTOK_URL === "");
  }

  // Eine Zeile von "Folge uns": sichtbar nur, wenn ihre Adresse eingetragen ist
  function folgenZeile(id, adresse) {
    const zeile = document.getElementById(id);
    zeile.classList.toggle("versteckt", adresse === "");
    if (adresse !== "") {
      zeile.href = adresse;
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

// Das gewählte Design (Dunkel, Hell oder System) und sein Umschalter
designAnwenden();
designAnzeigen();

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

// Lief beim Schließen der App noch eine Pause, geht sie mit der richtigen Restzeit weiter
if (pause) {
  pauseTaktStarten();
}
trainingBeimStartPruefen();

// Neue Ränge und Abzeichen seit dem letzten Öffnen melden. Beim allerersten Mal wird nur gemerkt, was schon erreicht ist.
rangPruefen(true);

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


