  // Die Übungsdaten stehen in der uebungen.js: MUSKELGRUPPEN, BEREICHE, MUSKELN, UEBUNGEN und ALTE_NAMEN.

  // Sprache der Übungs- und Muskelgruppennamen: "de" oder "en".
  // Der Umschalter kommt mit der Übersetzung der restlichen App.
  let sprache = "de";

  // So viele Übungen zeigt ein Bereich im Sheet sofort, der Rest steckt hinter "Mehr anzeigen"
  const TOP_ANZAHL = 7;

  // Nachschlagen ohne Suchen: Übung über ihre ID, Muskelgruppe über ihre ID,
  // und Übungs-ID über einen Namen (deutsch, englisch oder früherer Name, kleingeschrieben)
  const UEBUNG_NACH_ID = {};
  const GRUPPE_NACH_ID = {};
  const ID_NACH_NAME = {};

  for (let i = 0; i < MUSKELGRUPPEN.length; i++) {
    GRUPPE_NACH_ID[MUSKELGRUPPEN[i].id] = MUSKELGRUPPEN[i];
  }
  for (let i = 0; i < UEBUNGEN.length; i++) {
    const u = UEBUNGEN[i];
    UEBUNG_NACH_ID[u.id] = u;
    ID_NACH_NAME[u.en.toLowerCase()] = u.id;
    ID_NACH_NAME[u.de.toLowerCase()] = u.id;
  }
  Object.keys(ALTE_NAMEN).forEach(function (name) {
    ID_NACH_NAME[name] = ALTE_NAMEN[name];
  });

  // Vorlagen für Trainingssplits: Zum Anpassen einfach hier Übungen, Sätze oder Wiederholungen ändern.
  // Die Übungsnamen müssen in der uebungen.js stehen (als Name oder unter ALTE_NAMEN), damit die Übung gefunden wird.
  // "wochenplan" hat sieben Plätze für Montag bis Sonntag: Die Zahl zeigt auf eine Routine
  // der Vorlage (0 = die erste), null ist ein Ruhetag.
  const VORLAGEN = [
    {
      name: "Ganzkörper",
      fuerWen: "Einsteiger und alle mit wenig Zeit. Jeder Muskel ist in jeder Einheit dran.",
      wieOft: "3× pro Woche, immer mit einem Ruhetag dazwischen",
      wochenplan: [0, null, 1, null, 0, null, null],
      routinen: [
        {
          name: "Ganzkörper A",
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
          name: "Ganzkörper B",
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
      name: "Oberkörper/Unterkörper",
      fuerWen: "Wer die Grundübungen kennt und jeden Muskel zweimal pro Woche trainieren will.",
      wieOft: "4× pro Woche",
      wochenplan: [0, 1, null, 0, 1, null, null],
      routinen: [
        {
          name: "Oberkörper",
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
          name: "Unterkörper",
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
      name: "Push/Pull/Legs",
      fuerWen: "Fortgeschrittene, die oft trainieren und pro Einheit mehr Übungen je Muskel wollen.",
      wieOft: "6× pro Woche (oder 3× mit je einem Ruhetag dazwischen)",
      wochenplan: [0, 1, 2, 0, 1, 2, null],
      routinen: [
        {
          name: "Push",
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
          name: "Pull",
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
          name: "Legs",
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
      name: "Bro Split",
      fuerWen: "Erfahrene, die pro Einheit eine Muskelgruppe mit vielen Sätzen voll auslasten wollen.",
      wieOft: "5× pro Woche",
      wochenplan: [0, 1, 2, 3, 4, null, null],
      routinen: [
        {
          name: "Brust",
          uebungen: [
            { name: "Bankdrücken", saetze: 4, wdh: 8 },
            { name: "Schrägbankdrücken", saetze: 4, wdh: 10 },
            { name: "Kurzhantel-Flys", saetze: 3, wdh: 12 },
            { name: "Butterfly/Pec Deck", saetze: 3, wdh: 12 },
            { name: "Dips", saetze: 3, wdh: 10 }
          ]
        },
        {
          name: "Rücken",
          uebungen: [
            { name: "Kreuzheben", saetze: 3, wdh: 5 },
            { name: "Klimmzüge", saetze: 4, wdh: 8 },
            { name: "Langhantelrudern", saetze: 4, wdh: 8 },
            { name: "Latzug", saetze: 3, wdh: 10 },
            { name: "Rudern am Kabelzug", saetze: 3, wdh: 12 }
          ]
        },
        {
          name: "Schultern",
          uebungen: [
            { name: "Military Press", saetze: 4, wdh: 8 },
            { name: "Seitheben", saetze: 4, wdh: 15 },
            { name: "Reverse Flys", saetze: 3, wdh: 15 },
            { name: "Face Pulls", saetze: 3, wdh: 15 },
            { name: "Frontheben", saetze: 3, wdh: 12 }
          ]
        },
        {
          name: "Arme",
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
          name: "Beine",
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

  // Startwerte der Räder bei einer neuen Übung
  const START_GEWICHT = 20;
  const START_WDH = 10;
  const START_SAETZE = 3;

  // Höhe eines Wertes im Rad in Pixeln. Muss zur Höhe von .rad-wert im CSS passen.
  const RAD_HOEHE = 44;

  // So viele Trainingstage braucht eine Woche, damit sie für die Serie zählt
  const SERIE_TAGE_PRO_WOCHE = 3;

  const WOCHENTAGE = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

  // Merkt sich zu jedem Rad seine Werte und welcher gerade markiert ist
  const raeder = {};

  // Die gerade sichtbare Seite
  let aktiveSeite = "log";

  // Die gerade gewählte Übung und ihre Muskelgruppe ("" = nichts gewählt).
  // Die ID gibt es nur bei Übungen aus der Übungsliste, bei eigenen Übungen bleibt sie "".
  let gewaehlteUebung = "";
  let gewaehlteGruppe = "";
  let gewaehlteUebungId = "";

  // Im Sheet geöffnete Muskelgruppe als ID ("" = Übersicht der Muskelgruppen)
  let sheetGruppe = "";

  // Wochenleiste: Montag der angezeigten Woche und der angetippte Tag (null = kein Tag gewählt)
  let angezeigterMontag = montagDerWoche(new Date());
  let gewaehlterTag = null;

  let eintraege = JSON.parse(localStorage.getItem("eintraege")) || [];

  // Wofür das Sheet gerade geöffnet ist: "log" (neuer Eintrag) oder "routine" (Übung zur Routine hinzufügen)
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

  // Gespeicherte Daten aus älteren Versionen kennen nur Übungsnamen: einmal die feste ID ergänzen
  gespeicherteDatenZuordnen();

  // Die sichtbare Ansicht im Training-Tab: "uebersicht", "bearbeiten", "modus" oder "fertig"
  let trainingAnsicht = "uebersicht";

  // Arbeitskopie der Routine, die gerade bearbeitet wird. Erst "Routine speichern" übernimmt sie.
  let bearbeiteteRoutine = null;

  // Stellung der Räder im Trainingsmodus, solange die Training-Seite ausgeblendet ist
  let gemerkteTrainingRadWerte = null;

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

  // Der Name zum Anzeigen. Bei Übungen aus der Übungsliste kommt er über die ID in der
  // eingestellten Sprache, bei eigenen Übungen (ohne ID) gilt der gespeicherte Name.
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
  function idErgaenzen(objekt, name) {
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

  // Geht beim Start einmal durch Einträge, Routinen und das laufende Training.
  // Gespeichert wird nur, wenn wirklich etwas ergänzt wurde.
  function gespeicherteDatenZuordnen() {
    if (listeZuordnen(eintraege, "uebung")) {
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

    if (laufendesTraining && listeZuordnen(laufendesTraining.uebungen, "name")) {
      localStorage.setItem("laufendesTraining", JSON.stringify(laufendesTraining));
    }
  }

  // Passt ein Eintrag zu einer Übung? Mit ID zählt die ID, sonst der Name.
  function gleicheUebung(eintrag, name, id) {
    if (id && eintrag.uebungId) {
      return eintrag.uebungId === id;
    }
    return eintrag.uebung.trim().toLowerCase() === name.trim().toLowerCase();
  }

  // Macht aus einer Zahl deutschen Text: 82.5 wird "82,5"
  function zahlText(wert) {
    return String(wert).replace(".", ",");
  }

  // ---------- Seiten und Navigation ----------

  // Zeigt eine Seite und markiert ihren Tab
  function seiteZeigen(name) {
    // Ausgeblendete Räder verlieren ihre Stellung, deshalb vorher merken
    let radWerte = null;
    if (aktiveSeite === "log") {
      radWerte = [radWert("rad-gewicht"), radWert("rad-wdh"), radWert("rad-saetze")];
    }
    if (aktiveSeite === "training" && trainingAnsicht === "modus") {
      gemerkteTrainingRadWerte = [radWert("t-rad-gewicht"), radWert("t-rad-wdh"), radWert("t-rad-saetze")];
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

    if (name === "log") {
      if (radWerte === null) {
        radWerte = gemerkteRadWerte;
      }
      radSetzen("rad-gewicht", radWerte[0]);
      radSetzen("rad-wdh", radWerte[1]);
      radSetzen("rad-saetze", radWerte[2]);
    } else if (radWerte !== null) {
      gemerkteRadWerte = radWerte;
    }

    if (name === "fortschritt") {
      fortschrittAnzeigen();
    }

    if (name === "training") {
      trainingAnzeigen();
      if (trainingAnsicht === "modus" && gemerkteTrainingRadWerte) {
        radSetzen("t-rad-gewicht", gemerkteTrainingRadWerte[0]);
        radSetzen("t-rad-wdh", gemerkteTrainingRadWerte[1]);
        radSetzen("t-rad-saetze", gemerkteTrainingRadWerte[2]);
      }
    }
  }

  // Blendet die Kopfzeile ein, sobald der große Titel nach oben weggescrollt ist
  function kopfzeileAktualisieren() {
    document.getElementById("kopfzeile").classList.toggle("sichtbar", window.scrollY > 52);
  }

  window.addEventListener("scroll", kopfzeileAktualisieren);

  // Stellung der Räder, solange die Log-Seite ausgeblendet ist
  let gemerkteRadWerte = [START_GEWICHT, START_WDH, START_SAETZE];

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

  // Überschrift einer Woche, z. B. "KW 41 · 5.10. – 11.10.2026"
  function wochenTitel(montag) {
    const sonntag = new Date(montag.getFullYear(), montag.getMonth(), montag.getDate() + 6);
    return "KW " + kalenderwoche(montag) + " · "
      + montag.getDate() + "." + (montag.getMonth() + 1) + ". – "
      + sonntag.getDate() + "." + (sonntag.getMonth() + 1) + "." + sonntag.getFullYear();
  }

  // Eine Zahl pro Kalendertag, z. B. 20261005. Damit lassen sich Tage vergleichen.
  function tagSchluessel(datum) {
    return datum.getFullYear() * 10000 + (datum.getMonth() + 1) * 100 + datum.getDate();
  }

  // Kurzer Text für einen Tag, z. B. "Mo, 5.10."
  function tagText(datum) {
    return WOCHENTAGE[(datum.getDay() + 6) % 7] + ", " + datum.getDate() + "." + (datum.getMonth() + 1) + ".";
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
      name.textContent = WOCHENTAGE[i];
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
  function radBauen(id, werte, seite) {
    const rad = document.getElementById(id);
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
      // Nur auf der eigenen Seite: Ausgeblendete Räder melden eine falsche Stellung
      if (aktiveSeite === seite) {
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

  // Stellt die Räder auf die Startwerte oder, falls es die Übung schon gab, auf die Werte vom letzten Mal
  function raederVoreinstellen() {
    radSetzen("rad-gewicht", START_GEWICHT);
    radSetzen("rad-wdh", START_WDH);
    radSetzen("rad-saetze", START_SAETZE);

    const letzter = letzterEintrag(gewaehlteUebung, gewaehlteUebungId);
    if (letzter) {
      radSetzen("rad-gewicht", letzter.gewicht);
      radSetzen("rad-wdh", letzter.wdh);
      radSetzen("rad-saetze", letzter.saetze);
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

  const KOERPER_MUSKELN = {
    vorn: {
      schultern: KOERPER_SCHULTERN,
      brust: '<path d="M20 25h9v10q-5 3-9-1z"/><path d="M40 25h-9v10q5 3 9-1z"/>',
      bizeps: KOERPER_ARME_OBEN,
      unterarme: KOERPER_ARME_UNTEN,
      bauch: '<rect x="24" y="38" width="12" height="21" rx="3"/>',
      quadrizeps: '<path class="linie" stroke-width="8" d="M24 67 23.2 86M36 67l.8 19"/>'
    },
    hinten: {
      schultern: KOERPER_SCHULTERN,
      ruecken: '<path d="M19 24h22l-2 22-5 12h-8l-5-12z"/>',
      trizeps: KOERPER_ARME_OBEN,
      unterarme: KOERPER_ARME_UNTEN,
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

  // ziel ist "log" oder "routine". Ohne Angabe gilt "log".
  function sheetOeffnen(ziel) {
    sheetZiel = ziel || "log";
    sheetGruppenZeigen();
    document.getElementById("sheet").classList.add("offen");
    document.getElementById("sheet-hintergrund").classList.add("offen");
    document.body.classList.add("sheet-offen");
  }

  function sheetSchliessen() {
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

  // Schritt 1: alle Muskelgruppen als Kacheln mit Körper-Grafik
  function sheetGruppenZeigen() {
    sheetGruppe = "";
    document.getElementById("sheet-suche").value = "";
    const inhalt = sheetLeeren("Muskelgruppe", false);
    const raster = element("div", "muskel-raster");

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

  // Schritt 2: die Übungen einer Muskelgruppe, sortiert nach Maschine, Freie Gewichte und Eigengewicht.
  // Darunter "Trainiert auch": Übungen anderer Gruppen, bei denen diese Gruppe stark mitarbeitet.
  function sheetUebungenZeigen(gruppeId) {
    sheetGruppe = gruppeId;
    const inhalt = sheetLeeren(GRUPPE_NACH_ID[gruppeId][sprache], true);
    let anzahl = 0;

    for (let i = 0; i < BEREICHE.length; i++) {
      const bereich = BEREICHE[i];
      const liste = UEBUNGEN.filter(function (u) {
        return uebungGruppe(u) === gruppeId && u.bereich === bereich.id;
      });
      sheetAbschnitt(inhalt, bereich[sprache], liste, false);
      anzahl += liste.length;
    }

    const auch = UEBUNGEN.filter(function (u) {
      return u.auch.indexOf(gruppeId) !== -1;
    });
    sheetAbschnitt(inhalt, "Trainiert auch", auch, true);

    if (anzahl === 0) {
      inhalt.insertBefore(element("p", "leer-hinweis", "Für diese Muskelgruppe kommen die Übungen noch. Bis dahin kannst du oben eine eigene eintippen."), inhalt.firstChild);
    }
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
      const mehr = element("button", "sheet-mehr", "Mehr anzeigen (+" + (liste.length - TOP_ANZAHL) + ")");
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

  // Eine Übung als Zeile: oben der Name, darunter klein der Name in der anderen Sprache.
  // mitGruppe hängt die Muskelgruppe an, z. B. in der Suche und bei "Trainiert auch".
  function uebungZeile(u, mitGruppe) {
    const gruppe = GRUPPE_NACH_ID[uebungGruppe(u)];
    const btn = element("button", "sheet-zeile");
    btn.appendChild(element("span", "sheet-zeile-name", u[sprache]));

    let zweit = u.en;
    if (sprache === "en") {
      zweit = u.de;
    }
    if (mitGruppe) {
      zweit += " · " + gruppe[sprache];
    }
    btn.appendChild(element("span", "sheet-zeile-zweit", zweit));

    // Gespeichert wird neben der ID immer der deutsche Name, als Reserve
    btn.onclick = function () {
      uebungWaehlen(u.de, gruppe.de, u.id);
    };
    return btn;
  }

  // Wird bei jeder Eingabe im Suchfeld aufgerufen. Gesucht wird in allen Übungen, auf Deutsch und Englisch.
  // Jedes eingetippte Wort muss im Namen vorkommen, die Reihenfolge ist egal.
  function sheetSucheGeaendert() {
    const eingabe = document.getElementById("sheet-suche").value.trim();

    // Leeres Feld: zurück zur vorherigen Ansicht
    if (eingabe === "") {
      if (sheetGruppe === "") {
        sheetGruppenZeigen();
      } else {
        sheetUebungenZeigen(sheetGruppe);
      }
      return;
    }

    const woerter = eingabe.toLowerCase().split(/\s+/);
    const treffer = UEBUNGEN.filter(function (u) {
      const namen = (u.de + " " + u.en).toLowerCase();
      return woerter.every(function (wort) {
        return namen.indexOf(wort) !== -1;
      });
    });

    const inhalt = sheetLeeren("Suche", true);
    for (let i = 0; i < treffer.length; i++) {
      inhalt.appendChild(uebungZeile(treffer[i], true));
    }
    if (treffer.length === 0) {
      inhalt.appendChild(element("p", "leer-hinweis", "Keine Übung gefunden."));
    }

    // Eigene Übung anbieten, außer es gibt genau diese Übung schon in der Liste
    if (!ID_NACH_NAME[eingabe.toLowerCase()]) {
      const eigene = element("button", "sheet-zeile eigene", "„" + eingabe + "“ als eigene Übung übernehmen");
      eigene.onclick = eigeneUebungUebernehmen;
      inhalt.appendChild(eigene);
    }
  }

  // Übernimmt den Text aus dem Suchfeld als eigene Übung. Sie hat keine ID und bekommt
  // die Muskelgruppe, die vor der Suche geöffnet war.
  function eigeneUebungUebernehmen() {
    const name = document.getElementById("sheet-suche").value.trim();
    if (name === "") {
      return;
    }

    let gruppe = "";
    if (sheetGruppe !== "") {
      gruppe = GRUPPE_NACH_ID[sheetGruppe].de;
    }
    uebungWaehlen(name, gruppe, "");
  }

  // Merkt sich die gewählte Übung, schließt das Sheet und stellt die Räder ein
  function uebungWaehlen(name, gruppe, id) {
    // Aus dem Routinen-Editor geöffnet: Die Übung kommt in die Routine, nicht in den neuen Eintrag
    if (sheetZiel === "routine") {
      sheetSchliessen();
      routineUebungHinzufuegen(name, gruppe, id);
      return;
    }

    gewaehlteUebung = name;
    gewaehlteGruppe = gruppe;
    gewaehlteUebungId = id;
    uebungFeldAktualisieren();
    sheetSchliessen();
    letztesMalAnzeigen();
    raederVoreinstellen();
  }

  // Zeigt die gewählte Übung im Feld
  function uebungFeldAktualisieren() {
    const feld = document.getElementById("uebung");
    const leer = gewaehlteUebung === "";

    if (leer) {
      feld.textContent = "Übung wählen";
    } else {
      feld.textContent = anzeigeName(gewaehlteUebung, gewaehlteUebungId);
    }
    feld.classList.toggle("leer", leer);
    speichernButtonAktualisieren();
  }

  // Beschriftet den Speichern-Button mit dem gewählten Tag. Ohne Übung ist er gesperrt.
  function speichernButtonAktualisieren() {
    const btn = document.getElementById("speichern");

    if (gewaehlterTag) {
      btn.textContent = "Speichern für " + tagText(gewaehlterTag);
    } else {
      btn.textContent = "Speichern";
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
      gruppeAnzeigen("Ohne Datum", ohneDatum);
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

      gruppeAnzeigen(tagText(gewaehlterTag) + gewaehlterTag.getFullYear(), gruppe);

      if (gruppe.length === 0) {
        const hinweis = document.createElement("p");
        hinweis.className = "leer-hinweis";
        hinweis.textContent = "Keine Einträge an diesem Tag.";
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
      datumText = new Date(e.datum).toLocaleDateString("de-DE") + " – ";
    }
    li.textContent = datumText + anzeigeName(e.uebung, e.uebungId) + ": " + e.saetze + " Sätze × " + e.wdh + " Wdh. à " + zahlText(e.gewicht) + " kg";
    const btn = document.createElement("button");
    btn.textContent = "Löschen";
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
        uebung: gewaehlteUebung,
        uebungId: gewaehlteUebungId,
        muskelgruppe: gewaehlteGruppe,
        gewicht: radWert("rad-gewicht"),
        wdh: radWert("rad-wdh"),
        saetze: radWert("rad-saetze"),
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
      raederVoreinstellen();

}

      function loeschen(index) {
        eintraege.splice(index, 1);
        localStorage.setItem("eintraege", JSON.stringify(eintraege));
        anzeigen();
        letztesMalAnzeigen();
      }

      // Sucht den neuesten Eintrag zu einer Übung. Gibt null zurück, wenn es keinen gibt.
      // Verglichen wird über die ID, bei eigenen Übungen (ohne ID) über den Namen.
      function letzterEintrag(name, id) {
        if (name.trim() === "") {
          return null;
        }

        // Der Eintrag mit dem spätesten Datum gewinnt. Einträge ohne Datum gelten als die ältesten.
        let neuester = null;
        let neuesteZeit = 0;

        for (let i = 0; i < eintraege.length; i++) {
          const e = eintraege[i];
          if (gleicheUebung(e, name, id)) {
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
      function letztesMalText(name, id) {
        const e = letzterEintrag(name, id);
        if (!e) {
          return "";
        }

        let datumText = "";
        if (e.datum) {
          datumText = " (" + new Date(e.datum).toLocaleDateString("de-DE") + ")";
        }
        return "Letztes Mal" + datumText + ": " + e.saetze + " Sätze × " + e.wdh + " Wdh. à " + zahlText(e.gewicht) + " kg";
      }

  // ---------- Fortschritt ----------

  // Berechnet die vier Kacheln aus den gespeicherten Einträgen
  function fortschrittAnzeigen() {
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
      const bewegt = Number(e.saetze) * Number(e.wdh) * Number(String(e.gewicht).replace(",", "."));
      if (!isNaN(bewegt)) {
        gesamtgewicht += bewegt;
      }

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

    // Serie: Wochen in Folge mit genug Trainingstagen, rückwärts gezählt.
    // Die aktuelle Woche zählt erst, wenn sie genug Tage hat. Bis dahin unterbricht sie die Serie aber nicht.
    let montag = montagDerWoche(new Date());
    let serie = 0;
    if ((tageProWoche[montag.getTime()] || 0) < SERIE_TAGE_PRO_WOCHE) {
      montag = new Date(montag.getFullYear(), montag.getMonth(), montag.getDate() - 7);
    }
    while ((tageProWoche[montag.getTime()] || 0) >= SERIE_TAGE_PRO_WOCHE) {
      serie++;
      montag = new Date(montag.getFullYear(), montag.getMonth(), montag.getDate() - 7);
    }

    document.getElementById("stat-workouts").textContent = anzahlTage;
    document.getElementById("stat-gewicht").textContent = gesamtgewicht.toLocaleString("de-DE") + " kg";
    document.getElementById("stat-uebungen").textContent = anzahlUebungen;
    document.getElementById("stat-serie").textContent = serie;
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

  // Eine neue, eindeutige id für eine Routine
  function neueId() {
    return "r" + Date.now() + "-" + Math.floor(Math.random() * 1000000);
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

  // Der Text zum Ziel einer Übung, z. B. "Ziel: 3 Sätze × 10 Wdh.". Ohne Ziel ist er leer.
  function zielText(uebung) {
    if (uebung.zielSaetze && uebung.zielWdh) {
      return "Ziel: " + uebung.zielSaetze + " Sätze × " + uebung.zielWdh + " Wdh.";
    }
    if (uebung.zielSaetze) {
      return "Ziel: " + uebung.zielSaetze + " Sätze";
    }
    if (uebung.zielWdh) {
      return "Ziel: " + uebung.zielWdh + " Wdh.";
    }
    return "";
  }

  // "1 Übung" oder "5 Übungen"
  function uebungenText(anzahl) {
    if (anzahl === 1) {
      return "1 Übung";
    }
    return anzahl + " Übungen";
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
  }

  // ---------- Training: Rückfrage-Dialog ----------

  // Zeigt eine Frage mit beliebigen Buttons. Jeder Knopf hat einen Text, optional eine Art
  // ("haupt" oder "leise") und optional eine Aktion, die nach dem Antippen läuft.
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
    karte.appendChild(element("div", "routine-name", "Training fortsetzen?"));
    karte.appendChild(element("div", "routine-info", laufendesTraining.routineName + " · Übung "
      + (laufendesTraining.index + 1) + " von " + laufendesTraining.uebungen.length));

    const knoepfe = element("div", "karten-knoepfe");
    const weiter = element("button", "knopf haupt", "Fortsetzen");
    weiter.onclick = trainingFortsetzen;
    knoepfe.appendChild(weiter);
    const weg = element("button", "knopf leise", "Verwerfen");
    weg.onclick = trainingVerwerfen;
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
      zeile.appendChild(element("span", "plan-tag", WOCHENTAGE[i]));

      const auswahl = document.createElement("select");
      auswahl.appendChild(new Option("Nicht geplant", ""));
      auswahl.appendChild(new Option("Ruhetag", "ruhe"));
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
      liste.appendChild(element("p", "leer-hinweis", "Noch keine Routinen. Leg eine eigene an oder übernimm unten eine Vorlage."));
      return;
    }

    for (let i = 0; i < routinen.length; i++) {
      const routine = routinen[i];
      const karte = element("div", "karte routine-karte");
      karte.appendChild(element("div", "routine-name", routine.name));
      karte.appendChild(element("div", "routine-info", routineInfo(routine)));

      const knoepfe = element("div", "karten-knoepfe");
      const start = element("button", "knopf haupt", "Starten");
      start.onclick = function () {
        routineStarten(routine);
      };
      knoepfe.appendChild(start);
      const aendern = element("button", "knopf", "Bearbeiten");
      aendern.onclick = function () {
        routineBearbeiten(routine);
      };
      knoepfe.appendChild(aendern);
      const weg = element("button", "knopf leise", "Löschen");
      weg.onclick = function () {
        routineLoeschenFragen(routine);
      };
      knoepfe.appendChild(weg);
      karte.appendChild(knoepfe);
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
        namen.push(vorlage.routinen[j].name);
      }

      const karte = element("div", "karte routine-karte");
      karte.appendChild(element("div", "routine-name", vorlage.name));
      karte.appendChild(element("div", "vorlage-oft", vorlage.wieOft));
      karte.appendChild(element("div", "routine-info", vorlage.fuerWen));
      karte.appendChild(element("div", "routine-info", "Routinen: " + namen.join(" · ")));

      const knoepfe = element("div", "karten-knoepfe");
      const nehmen = element("button", "knopf", "Vorlage übernehmen");
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
      const kopie = { id: neueId(), name: vorlage.routinen[i].name, uebungen: [] };
      for (let j = 0; j < vorlage.routinen[i].uebungen.length; j++) {
        const u = vorlage.routinen[i].uebungen[j];
        const neu = {
          name: u.name,
          uebungId: "",
          muskelgruppe: "",
          zielSaetze: zielLesen(u.saetze, 10),
          zielWdh: zielLesen(u.wdh, 30)
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
        zeilen.push(WOCHENTAGE[i] + ": Ruhetag");
      } else {
        vorschlag.push(ids[platz]);
        zeilen.push(WOCHENTAGE[i] + ": " + vorlage.routinen[platz].name);
      }
      if (wochenplan[i] !== "") {
        hattePlan = true;
      }
    }

    routinenSpeichern();
    trainingAnzeigen();

    let text = vorlage.routinen.length + " Routinen wurden angelegt. Vorschlag für deine Woche:\n\n" + zeilen.join("\n");
    if (hattePlan) {
      text += "\n\nDein bisheriger Wochenplan wird dabei ersetzt.";
    }
    frageZeigen("Wochenplan übernehmen?", text, [
      {
        text: "Wochenplan übernehmen",
        art: "haupt",
        aktion: function () {
          wochenplan = vorschlag;
          routinenSpeichern();
          trainingAnzeigen();
        }
      },
      { text: "Wochenplan nicht ändern", art: "leise" }
    ]);
  }

  function routineLoeschenFragen(routine) {
    frageZeigen("Routine löschen?", "„" + routine.name + "“ wird gelöscht und aus dem Wochenplan entfernt. Deine Einträge im Log bleiben erhalten.", [
      {
        text: "Löschen",
        art: "haupt",
        aktion: function () {
          routinen.splice(routinen.indexOf(routine), 1);
          wochenplanBereinigen();
          routinenSpeichern();
          trainingAnzeigen();
        }
      },
      { text: "Abbrechen", art: "leise" }
    ]);
  }

  // ---------- Training: Routine erstellen und bearbeiten ----------

  function routineNeu() {
    routineBearbeiten(null);
  }

  // Öffnet den Editor mit einer Kopie der Routine. Ohne Routine startet er leer.
  function routineBearbeiten(routine) {
    bearbeiteteRoutine = { id: "", name: "", uebungen: [] };
    if (routine) {
      bearbeiteteRoutine.id = routine.id;
      bearbeiteteRoutine.name = routine.name;
      for (let i = 0; i < routine.uebungen.length; i++) {
        const u = routine.uebungen[i];
        bearbeiteteRoutine.uebungen.push({ name: u.name, uebungId: u.uebungId || "", muskelgruppe: u.muskelgruppe, zielSaetze: u.zielSaetze, zielWdh: u.zielWdh });
      }
    }

    if (routine) {
      document.getElementById("bearbeiten-titel").textContent = "Routine bearbeiten";
    } else {
      document.getElementById("bearbeiten-titel").textContent = "Neue Routine";
    }
    document.getElementById("routine-name").value = bearbeiteteRoutine.name;
    document.getElementById("routine-meldung").textContent = "";
    routineUebungenAnzeigen();
    trainingAnsichtZeigen("bearbeiten");
  }

  // Die Übungen der bearbeiteten Routine: Pfeile zum Umsortieren, Ziel-Felder und Entfernen
  function routineUebungenAnzeigen() {
    const liste = document.getElementById("routine-uebungen");
    liste.innerHTML = "";
    const uebungen = bearbeiteteRoutine.uebungen;

    if (uebungen.length === 0) {
      liste.appendChild(element("p", "leer-hinweis", "Noch keine Übungen."));
      return;
    }

    for (let i = 0; i < uebungen.length; i++) {
      const u = uebungen[i];
      const zeile = element("div", "karte uebung-zeile");

      const pfeile = element("div", "pfeile");
      const hoch = element("button", "", "↑");
      hoch.setAttribute("aria-label", "Nach oben");
      hoch.disabled = i === 0;
      hoch.onclick = function () {
        routineUebungVerschieben(i, -1);
      };
      pfeile.appendChild(hoch);
      const runter = element("button", "", "↓");
      runter.setAttribute("aria-label", "Nach unten");
      runter.disabled = i === uebungen.length - 1;
      runter.onclick = function () {
        routineUebungVerschieben(i, 1);
      };
      pfeile.appendChild(runter);
      zeile.appendChild(pfeile);

      const mitte = element("div", "uebung-mitte");
      mitte.appendChild(element("div", "uebung-name", anzeigeName(u.name, u.uebungId)));
      const gruppe = anzeigeGruppe(u.muskelgruppe, u.uebungId);
      if (gruppe) {
        mitte.appendChild(element("div", "uebung-gruppe", gruppe));
      }
      const ziele = element("div", "ziele");
      ziele.appendChild(zielFeld("Sätze", u, "zielSaetze", 10));
      ziele.appendChild(zielFeld("Wdh.", u, "zielWdh", 30));
      mitte.appendChild(ziele);
      zeile.appendChild(mitte);

      const weg = element("button", "entfernen", "✕");
      weg.setAttribute("aria-label", "Übung entfernen");
      weg.onclick = function () {
        uebungen.splice(i, 1);
        routineUebungenAnzeigen();
      };
      zeile.appendChild(weg);

      liste.appendChild(zeile);
    }
  }

  // Ein kleines Zahlenfeld für ein Ziel. Leer heißt: kein Ziel.
  function zielFeld(titel, uebung, feldName, hoechstwert) {
    const rahmen = element("label", "ziel");
    rahmen.appendChild(element("span", "", titel));

    const feld = document.createElement("input");
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
    bearbeiteteRoutine.uebungen.push({ name: name, uebungId: id, muskelgruppe: gruppe, zielSaetze: null, zielWdh: null });
    document.getElementById("routine-meldung").textContent = "";
    routineUebungenAnzeigen();
  }

  // Übernimmt die Arbeitskopie: als neue Routine oder anstelle der bisherigen
  function routineSpeichern() {
    const name = document.getElementById("routine-name").value.trim();
    if (name === "") {
      document.getElementById("routine-meldung").textContent = "Gib der Routine einen Namen.";
      return;
    }
    if (bearbeiteteRoutine.uebungen.length === 0) {
      document.getElementById("routine-meldung").textContent = "Füge mindestens eine Übung hinzu.";
      return;
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

  // Startet eine Routine. Läuft schon ein Training, wird erst gefragt.
  function routineStarten(routine) {
    if (routine.uebungen.length === 0) {
      return;
    }
    if (!laufendesTraining) {
      trainingBeginnen(routine);
      return;
    }

    frageZeigen("Es läuft noch ein Training", "„" + laufendesTraining.routineName + "“ ist noch nicht abgeschlossen. Schon gespeicherte Übungen bleiben in jedem Fall im Log.", [
      { text: "Laufendes Training fortsetzen", art: "haupt", aktion: trainingFortsetzen },
      {
        text: "„" + routine.name + "“ neu starten",
        aktion: function () {
          trainingBeginnen(routine);
        }
      },
      { text: "Abbrechen", art: "leise" }
    ]);
  }

  // Legt das laufende Training an. Die Übungen werden kopiert, damit spätere Änderungen
  // an der Routine ein laufendes Training nicht durcheinanderbringen.
  function trainingBeginnen(routine) {
    laufendesTraining = {
      routineId: routine.id,
      routineName: routine.name,
      uebungen: [],
      index: 0,
      erledigt: [],
      uebersprungen: 0,
      gestartet: new Date().toISOString()
    };
    for (let i = 0; i < routine.uebungen.length; i++) {
      const u = routine.uebungen[i];
      laufendesTraining.uebungen.push({ name: u.name, uebungId: u.uebungId || "", muskelgruppe: u.muskelgruppe || "", zielSaetze: u.zielSaetze, zielWdh: u.zielWdh });
    }
    trainingMerken();
    trainingFortsetzen();
  }

  // Öffnet den Trainingsmodus an der Stelle, an der das Training steht
  function trainingFortsetzen() {
    if (aktiveSeite !== "training") {
      seiteZeigen("training");
    }
    trainingAnsichtZeigen("modus");
    modusAnzeigen();
  }

  // Verwirft das laufende Training. Was schon gespeichert wurde, bleibt im Log.
  function trainingVerwerfen() {
    laufendesTraining = null;
    trainingMerken();
    trainingAnzeigen();
  }

  // Zeigt die aktuelle Übung und stellt die Räder ein
  function modusAnzeigen() {
    const t = laufendesTraining;
    const u = t.uebungen[t.index];
    const letzteUebung = t.index === t.uebungen.length - 1;

    document.getElementById("modus-routine").textContent = t.routineName;
    document.getElementById("modus-schritt").textContent = "Übung " + (t.index + 1) + " von " + t.uebungen.length;
    document.getElementById("modus-fortschritt").style.width = (t.index / t.uebungen.length * 100) + "%";
    document.getElementById("modus-uebung").textContent = anzeigeName(u.name, u.uebungId);
    document.getElementById("modus-ziel").textContent = zielText(u);
    document.getElementById("modus-letztesMal").textContent = letztesMalText(u.name, u.uebungId) || "Letztes Mal: noch kein Eintrag";

    if (letzteUebung) {
      document.getElementById("modus-speichern").textContent = "Speichern & abschließen";
    } else {
      document.getElementById("modus-speichern").textContent = "Speichern & weiter";
    }

    // Räder: erst die Startwerte, dann die Ziele der Routine, und das letzte Mal gewinnt
    radSetzen("t-rad-gewicht", START_GEWICHT);
    radSetzen("t-rad-wdh", START_WDH);
    radSetzen("t-rad-saetze", START_SAETZE);
    if (u.zielWdh) {
      radSetzen("t-rad-wdh", u.zielWdh);
    }
    if (u.zielSaetze) {
      radSetzen("t-rad-saetze", u.zielSaetze);
    }
    const letzter = letzterEintrag(u.name, u.uebungId);
    if (letzter) {
      radSetzen("t-rad-gewicht", letzter.gewicht);
      radSetzen("t-rad-wdh", letzter.wdh);
      radSetzen("t-rad-saetze", letzter.saetze);
    }
  }

  // Speichert die aktuelle Übung als normalen Eintrag im Log und geht zur nächsten.
  // routineId und routineName halten fest, aus welcher Routine der Eintrag stammt.
  function trainingSpeichern() {
    const t = laufendesTraining;
    const u = t.uebungen[t.index];

    const eintrag = {
      uebung: u.name,
      uebungId: u.uebungId || "",
      muskelgruppe: u.muskelgruppe,
      gewicht: radWert("t-rad-gewicht"),
      wdh: radWert("t-rad-wdh"),
      saetze: radWert("t-rad-saetze"),
      datum: new Date().toISOString(),
      routineId: t.routineId,
      routineName: t.routineName
    };

    eintraege.push(eintrag);
    localStorage.setItem("eintraege", JSON.stringify(eintraege));
    anzeigen();
    letztesMalAnzeigen();

    t.erledigt.push({ uebung: eintrag.uebung, gewicht: eintrag.gewicht, wdh: eintrag.wdh, saetze: eintrag.saetze });
    trainingWeiter();
  }

  function trainingUeberspringen() {
    laufendesTraining.uebersprungen++;
    trainingWeiter();
  }

  // Nächste Übung, oder nach der letzten die Zusammenfassung
  function trainingWeiter() {
    laufendesTraining.index++;
    if (laufendesTraining.index >= laufendesTraining.uebungen.length) {
      trainingAbschliessen();
      return;
    }
    trainingMerken();
    modusAnzeigen();
    window.scrollTo(0, 0);
  }

  function trainingBeendenFragen() {
    frageZeigen("Training beenden?", "Die restlichen Übungen entfallen. Schon gespeicherte Übungen bleiben im Log.", [
      { text: "Training beenden", art: "haupt", aktion: trainingAbschliessen },
      { text: "Weiter trainieren", art: "leise" }
    ]);
  }

  // Beendet das Training und zeigt die Zusammenfassung: Übungen, Sätze, bewegtes Gewicht
  function trainingAbschliessen() {
    const t = laufendesTraining;
    let anzahlSaetze = 0;
    let bewegt = 0;
    for (let i = 0; i < t.erledigt.length; i++) {
      anzahlSaetze += t.erledigt[i].saetze;
      bewegt += t.erledigt[i].saetze * t.erledigt[i].wdh * t.erledigt[i].gewicht;
    }

    let text = t.routineName + " · " + t.erledigt.length + " von " + uebungenText(t.uebungen.length) + " gespeichert";
    if (t.uebersprungen > 0) {
      text += ", " + t.uebersprungen + " übersprungen";
    }
    document.getElementById("fertig-text").textContent = text;
    document.getElementById("fertig-uebungen").textContent = t.erledigt.length;
    document.getElementById("fertig-saetze").textContent = anzahlSaetze;
    document.getElementById("fertig-gewicht").textContent = bewegt.toLocaleString("de-DE") + " kg";

    laufendesTraining = null;
    gemerkteTrainingRadWerte = null;
    trainingMerken();
    trainingAnzeigen();
    trainingAnsichtZeigen("fertig");
  }

  // Beim Öffnen der App: Wartet noch ein Training, wird gefragt, ob es weitergehen soll
  function trainingBeimStartPruefen() {
    if (!laufendesTraining) {
      return;
    }
    frageZeigen("Training fortsetzen?", "„" + laufendesTraining.routineName + "“ ist noch nicht abgeschlossen: Übung "
      + (laufendesTraining.index + 1) + " von " + laufendesTraining.uebungen.length + ".", [
      { text: "Fortsetzen", art: "haupt", aktion: trainingFortsetzen },
      { text: "Verwerfen", aktion: trainingVerwerfen },
      { text: "Später", art: "leise" }
    ]);
  }

  // ---------- Backup ----------

  // Einträge aus der gewählten Datei, die auf die Entscheidung "ergänzen oder ersetzen" warten
  let importEintraege = [];

  // Routinen und Wochenplan aus der Datei. null heißt: Das Backup enthält keine (z. B. ein älteres Backup).
  let importRoutinen = null;
  let importWochenplan = null;

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
        const neu = { name: u.name, uebungId: id, muskelgruppe: gruppe, zielSaetze: zielLesen(u.zielSaetze, 10), zielWdh: zielLesen(u.zielWdh, 30) };
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
      text = " " + routinen.length + " Routinen und der Wochenplan wurden wiederhergestellt.";
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
      text = " " + hinzugefuegt + " Routinen hinzugefügt.";
    }

    wochenplanBereinigen();
    routinenSpeichern();
    trainingAnzeigen();
    return text;
  }

  // Zeigt eine Meldung unter den Backup-Buttons
  function datenMeldung(text) {
    document.getElementById("daten-meldung").textContent = text;
  }

  // Der Inhalt der Backup-Datei als JSON-Text
  function backupText() {
    const backup = {
      app: "gymstead",
      version: 2,
      exportiert: new Date().toISOString(),
      eintraege: eintraege,
      routinen: routinen,
      wochenplan: wochenplan
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
        datenMeldung("Backup mit " + eintraege.length + " Einträgen exportiert.");
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

  // Normaler Download über einen unsichtbaren Link
  function dateiHerunterladen(datei) {
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
    datenMeldung("Backup mit " + eintraege.length + " Einträgen exportiert.");
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
      datenMeldung("Die Datei konnte nicht gelesen werden.");
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
      datenMeldung("Das ist keine gültige Backup-Datei.");
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
      datenMeldung("Das ist keine gültige Backup-Datei.");
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
      datenMeldung("Das Backup enthält keine Einträge.");
      return;
    }

    let dialogText = "Das Backup enthält " + importEintraege.length
      + " Einträge. Auf diesem Gerät sind " + eintraege.length + " Einträge gespeichert.";
    if (importRoutinen !== null) {
      dialogText += " Außerdem enthält es " + importRoutinen.length + " Routinen und den Wochenplan, hier sind "
        + routinen.length + " Routinen gespeichert.";
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
    let meldung;
    if (art === "ersetzen") {
      eintraege = importEintraege;
      meldung = eintraege.length + " Einträge aus dem Backup wiederhergestellt. Die vorherigen wurden ersetzt.";
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
      meldung = hinzugefuegt + " Einträge hinzugefügt, " + uebersprungen + " waren schon vorhanden.";
    }
    datenMeldung(meldung + routinenImportieren(art));

    localStorage.setItem("eintraege", JSON.stringify(eintraege));
    importEintraege = [];
    importRoutinen = null;
    importWochenplan = null;
    document.getElementById("dialog-hintergrund").classList.remove("offen");
    anzeigen();
    letztesMalAnzeigen();
  }

  function importAbbrechen() {
    importEintraege = [];
    importRoutinen = null;
    importWochenplan = null;
    document.getElementById("dialog-hintergrund").classList.remove("offen");
  }

// Gewicht: 0 bis 400 kg in 0,5-kg-Schritten
const gewichte = [];
for (let i = 0; i <= 800; i++) {
  gewichte.push(i / 2);
}

// Wiederholungen: 1 bis 30
const wiederholungen = [];
for (let i = 1; i <= 30; i++) {
  wiederholungen.push(i);
}

// Sätze: 1 bis 10
const saetze = [];
for (let i = 1; i <= 10; i++) {
  saetze.push(i);
}

radBauen("rad-gewicht", gewichte, "log");
radBauen("rad-wdh", wiederholungen, "log");
radBauen("rad-saetze", saetze, "log");
raederVoreinstellen();

// Die drei Räder des Trainingsmodus
radBauen("t-rad-gewicht", gewichte, "training");
radBauen("t-rad-wdh", wiederholungen, "training");
radBauen("t-rad-saetze", saetze, "training");

wochenleisteAnzeigen();
anzeigen();
trainingAnzeigen();
trainingBeimStartPruefen();

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


