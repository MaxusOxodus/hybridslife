// BACKUP: die Körper-Figuren der Muskelgruppen im Stand von Version 79 (Git-Tag "figuren-v1").
// Diese Datei wird NICHT geladen: Sie steht weder in der index.html noch in der Liste DATEIEN der sw.js.
// Alles unter dieser Erklärung ist Zeichen für Zeichen der Block aus der app.js von Version 79,
// auch die zwei Leerzeichen am Zeilenanfang.
//
// Zurückwechseln auf diese Figuren, zwei Zeilen und die Versionsnummer:
//   index.html:  <script src="figuren.js?v=N">  wird zu  <script src="figuren-v1.js?v=N">
//   sw.js:       "figuren.js?v=" + VERSION      wird zu  "figuren-v1.js?v=" + VERSION
//   danach die Versionsnummer an allen elf Stellen um 1 erhöhen
// Die Farben und Größen dieser Figuren stehen weiter in der style.css (".koerper" ohne ".nah").
// Der Stern der Kachel "Eigene" steht unverändert in der app.js (kachelSelbst).

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
