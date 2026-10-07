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

  // Füllt ein Rad mit Werten
  function radBauen(id, werte) {
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
      // Nur auf der Log-Seite: Ausgeblendete Räder melden eine falsche Stellung
      if (aktiveSeite === "log") {
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

  function sheetOeffnen() {
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
        const anzeige = document.getElementById("letztesMal");
        anzeige.textContent = "";

        const e = letzterEintrag(gewaehlteUebung);
        if (!e) {
          return;
        }

        let datumText = "";
        if (e.datum) {
          datumText = " (" + new Date(e.datum).toLocaleDateString("de-DE") + ")";
        }
        anzeige.textContent = "Letztes Mal" + datumText + ": " + e.saetze + " Sätze × " + e.wdh + " Wdh. à " + zahlText(e.gewicht) + " kg";
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

  // ---------- Backup ----------

  // Einträge aus der gewählten Datei, die auf die Entscheidung "ergänzen oder ersetzen" warten
  let importEintraege = [];

  // Zeigt eine Meldung unter den Backup-Buttons
  function datenMeldung(text) {
    document.getElementById("daten-meldung").textContent = text;
  }

  // Der Inhalt der Backup-Datei als JSON-Text
  function backupText() {
    const backup = {
      app: "hybridslife",
      version: 1,
      exportiert: new Date().toISOString(),
      eintraege: eintraege
    };
    return JSON.stringify(backup, null, 2);
  }

  // Speichert alle Einträge als Datei, z. B. hybridslife-backup-2026-10-07.json
  function backupExportieren() {
    const heute = new Date();
    const dateiname = "hybridslife-backup-" + heute.getFullYear()
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
    if (importEintraege.length === 0) {
      datenMeldung("Das Backup enthält keine Einträge.");
      return;
    }

    document.getElementById("dialog-text").textContent = "Das Backup enthält " + importEintraege.length
      + " Einträge. Auf diesem Gerät sind " + eintraege.length + " Einträge gespeichert.";
    document.getElementById("dialog-hintergrund").classList.add("offen");
  }

  // Woran zwei gleiche Einträge erkannt werden: Übung, Werte und Zeitpunkt stimmen überein
  function eintragSchluessel(e) {
    return JSON.stringify([e.uebung, String(e.gewicht), String(e.wdh), String(e.saetze), e.datum || ""]);
  }

  // Übernimmt die Einträge aus dem Backup. art ist "ergaenzen" oder "ersetzen".
  function importAusfuehren(art) {
    if (art === "ersetzen") {
      eintraege = importEintraege;
      datenMeldung(eintraege.length + " Einträge aus dem Backup wiederhergestellt. Die vorherigen wurden ersetzt.");
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
      datenMeldung(hinzugefuegt + " Einträge hinzugefügt, " + uebersprungen + " waren schon vorhanden.");
    }

    localStorage.setItem("eintraege", JSON.stringify(eintraege));
    importEintraege = [];
    document.getElementById("dialog-hintergrund").classList.remove("offen");
    anzeigen();
    letztesMalAnzeigen();
  }

  function importAbbrechen() {
    importEintraege = [];
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

radBauen("rad-gewicht", gewichte);
radBauen("rad-wdh", wiederholungen);
radBauen("rad-saetze", saetze);
raederVoreinstellen();

wochenleisteAnzeigen();
anzeigen();


