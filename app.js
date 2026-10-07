  // Übungsliste: Zum Erweitern einfach hier eine Übung oder Muskelgruppe ergänzen
  const UEBUNGEN = {
    "Brust": ["Bankdrücken", "Schrägbankdrücken", "Kurzhantel-Flys", "Butterfly/Pec Deck", "Dips", "Liegestütze"],
    "Rücken": ["Klimmzüge", "Latzug", "Langhantelrudern", "Kurzhantelrudern", "Rudern am Kabelzug", "Kreuzheben", "T-Bar-Rudern"],
    "Schultern": ["Schulterdrücken", "Military Press", "Seitheben", "Frontheben", "Reverse Flys", "Face Pulls", "Arnold Press"],
    "Bizeps": ["Langhantelcurls", "Kurzhantelcurls", "Hammercurls", "Scottcurls", "Konzentrationscurls", "Kabelcurls"],
    "Trizeps": ["Trizepsdrücken am Kabel", "French Press", "Enges Bankdrücken", "Trizeps-Dips", "Kickbacks", "Überkopf-Trizepsstrecken"],
    "Beine": ["Kniebeuge", "Beinpresse", "Ausfallschritte", "Beinstrecker", "Beinbeuger", "Rumänisches Kreuzheben", "Wadenheben", "Bulgarian Split Squats"],
    "Po": ["Hip Thrust", "Glute Bridge", "Kickbacks am Kabel", "Abduktorenmaschine", "Sumo-Kniebeuge", "Step-ups"],
    "Bauch": ["Crunches", "Plank", "Beinheben", "Russian Twist", "Sit-ups", "Cable Crunches", "Mountain Climbers"]
  };

  // Vorlagen für Trainingssplits: Zum Anpassen einfach hier Übungen, Sätze oder Wiederholungen ändern.
  // Die Übungsnamen müssen genau so in der Übungsliste oben stehen, damit die Muskelgruppe gefunden wird.
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

  // Die gerade gewählte Übung und ihre Muskelgruppe ("" = nichts gewählt)
  let gewaehlteUebung = "";
  let gewaehlteGruppe = "";

  // Im Sheet geöffnete Muskelgruppe ("" = Übersicht der Muskelgruppen)
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

    const letzter = letzterEintrag(gewaehlteUebung);
    if (letzter) {
      radSetzen("rad-gewicht", letzter.gewicht);
      radSetzen("rad-wdh", letzter.wdh);
      radSetzen("rad-saetze", letzter.saetze);
    }
  }

  // ---------- Bottom Sheet für die Übungsauswahl ----------

  // ziel ist "log" oder "routine". Ohne Angabe gilt "log".
  function sheetOeffnen(ziel) {
    sheetZiel = ziel || "log";
    sheetGruppenZeigen();
    document.getElementById("eigene-uebung").value = "";
    document.getElementById("sheet").classList.add("offen");
    document.getElementById("sheet-hintergrund").classList.add("offen");
    document.body.classList.add("sheet-offen");
  }

  function sheetSchliessen() {
    document.getElementById("eigene-uebung").blur();
    document.getElementById("sheet").classList.remove("offen");
    document.getElementById("sheet-hintergrund").classList.remove("offen");
    document.body.classList.remove("sheet-offen");
  }

  // Schritt 1: alle Muskelgruppen
  function sheetGruppenZeigen() {
    sheetGruppe = "";
    document.getElementById("sheet-titel").textContent = "Muskelgruppe";
    document.getElementById("sheet-zurueck").classList.add("versteckt");

    const inhalt = document.getElementById("sheet-inhalt");
    inhalt.innerHTML = "";
    const gruppen = Object.keys(UEBUNGEN);

    for (let i = 0; i < gruppen.length; i++) {
      const btn = document.createElement("button");
      btn.className = "sheet-zeile";
      btn.textContent = gruppen[i];
      btn.onclick = function () {
        sheetUebungenZeigen(gruppen[i]);
      };
      inhalt.appendChild(btn);
    }
    inhalt.scrollTop = 0;
  }

  // Schritt 2: die Übungen einer Muskelgruppe
  function sheetUebungenZeigen(gruppe) {
    sheetGruppe = gruppe;
    document.getElementById("sheet-titel").textContent = gruppe;
    document.getElementById("sheet-zurueck").classList.remove("versteckt");

    const inhalt = document.getElementById("sheet-inhalt");
    inhalt.innerHTML = "";
    const uebungen = UEBUNGEN[gruppe];

    for (let i = 0; i < uebungen.length; i++) {
      const btn = document.createElement("button");
      btn.className = "sheet-zeile";
      btn.textContent = uebungen[i];
      btn.onclick = function () {
        uebungWaehlen(uebungen[i], gruppe);
      };
      inhalt.appendChild(btn);
    }
    inhalt.scrollTop = 0;
  }

  // Übernimmt die eingetippte eigene Übung
  function eigeneUebungUebernehmen() {
    const name = document.getElementById("eigene-uebung").value.trim();
    if (name === "") {
      return;
    }

    // Steht die Übung in der Liste, gilt deren Muskelgruppe, sonst die gerade geöffnete
    let gruppe = muskelgruppeFinden(name);
    if (gruppe === "") {
      gruppe = sheetGruppe;
    }
    uebungWaehlen(name, gruppe);
  }

  // Merkt sich die gewählte Übung, schließt das Sheet und stellt die Räder ein
  function uebungWaehlen(name, gruppe) {
    // Aus dem Routinen-Editor geöffnet: Die Übung kommt in die Routine, nicht in den neuen Eintrag
    if (sheetZiel === "routine") {
      sheetSchliessen();
      routineUebungHinzufuegen(name, gruppe);
      return;
    }

    gewaehlteUebung = name;
    gewaehlteGruppe = gruppe;
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
      feld.textContent = gewaehlteUebung;
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

  // Sucht die Muskelgruppe zu einem Übungsnamen. Eigene Übungen bekommen "".
  function muskelgruppeFinden(name) {
    const gesucht = name.trim().toLowerCase();
    const gruppen = Object.keys(UEBUNGEN);

    for (let i = 0; i < gruppen.length; i++) {
      const uebungen = UEBUNGEN[gruppen[i]];
      for (let j = 0; j < uebungen.length; j++) {
        if (uebungen[j].toLowerCase() === gesucht) {
          return gruppen[i];
        }
      }
    }
    return "";
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
    li.textContent = datumText + e.uebung + ": " + e.saetze + " Sätze × " + e.wdh + " Wdh. à " + zahlText(e.gewicht) + " kg";
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
      function letzterEintrag(name) {
        const gesucht = name.trim().toLowerCase();
        if (gesucht === "") {
          return null;
        }

        // Der Eintrag mit dem spätesten Datum gewinnt. Einträge ohne Datum gelten als die ältesten.
        let neuester = null;
        let neuesteZeit = 0;

        for (let i = 0; i < eintraege.length; i++) {
          const e = eintraege[i];
          if (e.uebung.trim().toLowerCase() === gesucht) {
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
        document.getElementById("letztesMal").textContent = letztesMalText(gewaehlteUebung);
      }

      // Der Text "Letztes Mal ..." zu einer Übung. Ohne früheren Eintrag ist er leer.
      function letztesMalText(name) {
        const e = letzterEintrag(name);
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
    const uebungen = {};         // jeder Übungsname einmal
    let anzahlTage = 0;
    let anzahlUebungen = 0;
    let gesamtgewicht = 0;

    for (let i = 0; i < eintraege.length; i++) {
      const e = eintraege[i];

      const name = e.uebung.trim().toLowerCase();
      if (name !== "" && !uebungen[name]) {
        uebungen[name] = true;
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
      const gruppe = routine.uebungen[i].muskelgruppe;
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
        kopie.uebungen.push({
          name: u.name,
          muskelgruppe: muskelgruppeFinden(u.name),
          zielSaetze: zielLesen(u.saetze, 10),
          zielWdh: zielLesen(u.wdh, 30)
        });
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
        bearbeiteteRoutine.uebungen.push({ name: u.name, muskelgruppe: u.muskelgruppe, zielSaetze: u.zielSaetze, zielWdh: u.zielWdh });
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
      mitte.appendChild(element("div", "uebung-name", u.name));
      if (u.muskelgruppe) {
        mitte.appendChild(element("div", "uebung-gruppe", u.muskelgruppe));
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
  function routineUebungHinzufuegen(name, gruppe) {
    bearbeiteteRoutine.uebungen.push({ name: name, muskelgruppe: gruppe, zielSaetze: null, zielWdh: null });
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
      laufendesTraining.uebungen.push({ name: u.name, muskelgruppe: u.muskelgruppe || "", zielSaetze: u.zielSaetze, zielWdh: u.zielWdh });
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
    document.getElementById("modus-uebung").textContent = u.name;
    document.getElementById("modus-ziel").textContent = zielText(u);
    document.getElementById("modus-letztesMal").textContent = letztesMalText(u.name) || "Letztes Mal: noch kein Eintrag";

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
    const letzter = letzterEintrag(u.name);
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
        sauber.uebungen.push({ name: u.name, muskelgruppe: gruppe, zielSaetze: zielLesen(u.zielSaetze, 10), zielWdh: zielLesen(u.zielWdh, 30) });
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


