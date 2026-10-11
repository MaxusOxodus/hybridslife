// Körper-Figuren für die Muskelgruppen: die Kacheln in der Übungsauswahl und in der Bibliothek
// und die kleinen Figuren in der Fortschritt-Liste. Die app.js benutzt davon nur koerperSvg(gruppe)
// und für die Kachel "Eigene" den KOERPER_UMRISS.
//
// Es gibt drei Arten von Figuren:
//   den großen Oberkörper von Kopf bis Hüfte für alle Muskeln, die im Oberkörper liegen
//   den großen Unterkörper von der Hüfte bis zum Fuß für alle Muskeln, die im Unterkörper liegen
//   die ganze Figur (60 × 118 Einheiten) für "Ganzkörper" und die Kachel "Eigene"
// Auf der ganzen Figur waren die einzelnen Muskeln zu klein und kaum zu unterscheiden.
// Die Farben und Größen stehen in der style.css (".koerper" und ".koerper.nah").
//
// Ältere Stände liegen unverändert als Backup daneben und werden nicht geladen:
//   figuren-v1.js: Version 79, alle Kacheln mit der ganzen Figur
//   figuren-v2.js: Version 80, großer Oberkörper nur bei Schultern, Bizeps, Trizeps und Unterarmen
// Wie man zurückwechselt, steht in der CLAUDE.md.

// ---------- Die ganze Figur ----------

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

// ---------- Der große Oberkörper ----------

// Zeichnet die linke Seite und spiegelt sie an der Körpermitte (x = 30) auf die rechte
function beideSeiten(links) {
  return links + '<g transform="translate(60 0) scale(-1 1)">' + links + '</g>';
}

// Kopf, Hals, Rumpf und der Ansatz der Beine, dieselben Formen wie bei der ganzen Figur.
// Der Ausschnitt (viewBox) endet an der Hüfte, deshalb sind die Beine abgeschnitten.
const NAH_UMRISS = '<circle cx="30" cy="10" r="7"/>'
  + '<path d="M27 15h6v8h-6z"/>'
  + '<path d="M19 22h22q4 0 4 4l-2 24-2 13H19l-2-13-2-24q0-4 4-4z"/>'
  + '<path class="linie" stroke-width="10" d="M24 65 23 88M36 65l1 23"/>';

// Die Arme: hängend oder leicht seitlich angehoben (nur bei der seitlichen Schulter)
const NAH_ARME = {
  unten: '<path class="linie" stroke-width="7" d="M12 27 10 44 7 62M48 27l2 17 3 18"/>',
  seitlich: '<path class="linie" stroke-width="7" d="M12 27 6.5 43.1 6.6 61M48 27l5.5 16.1-.1 17.9"/>'
};

// Woran man vorn und hinten erkennt: vorn Augen, Brustlinie und Nabel, hinten Wirbelsäule und Schulterblätter
const NAH_ZEICHEN = {
  vorn: '<circle class="punkt" cx="27.4" cy="9.6" r="0.9"/><circle class="punkt" cx="32.6" cy="9.6" r="0.9"/>'
    + '<path d="M21 34.5q4.5 3 9 .3q4.5 2.7 9-.3"/><circle class="punkt" cx="30" cy="52" r="0.8"/>',
  hinten: '<path d="M30 25v35M23.5 29q3.5 4.5.5 9.5M36.5 29q-3.5 4.5-.5 9.5"/>'
};

const NAH_UNTERARM = beideSeiten('<path d="M6.9 46.5q2.8-2.2 5.6 0L9.3 59q-1.7 1-3.3 0z"/>');

// Die Muskelflächen je Ansicht, wie bei der ganzen Figur
const NAH_MUSKELN = {
  // von vorn, die Arme hängen
  vorn: {
    // außen: die Kappe der Schulter
    "schulter-seite": beideSeiten('<path d="M13.5 22.6C9.5 22.6 7.6 25.5 7.8 29c.2 3 1.7 6 3.7 7.5 1.1-3.5 2-8.5 2-13.9z"/>'),
    // innen: der Teil zur Brust hin
    "schulter-vorn": beideSeiten('<path d="M14.3 22.6h4.2c1.5 3.4 1 7.9-1.5 10.9-1.5 1.5-3.5 2.5-4.7 3 1.3-4 2-8.5 2-13.9z"/>'),
    // die Wölbung vorn auf dem Oberarm
    bizeps: beideSeiten('<ellipse cx="11.1" cy="36.5" rx="2.7" ry="5.4" transform="rotate(6.7 11.1 36.5)"/>'),
    unterarme: NAH_UNTERARM
  },
  // von vorn, die Arme leicht seitlich angehoben: Die äußere Kappe steht frei vom Körper ab
  "vorn-arm": {
    "schulter-seite": beideSeiten('<path d="M14 22.4C9.5 21.8 6 24.5 5.6 28.5c-.3 3 0 5.5 1 8.1C9 33.5 12 28.5 14 22.4z"/>'),
    "schulter-vorn": beideSeiten('<path d="M14.9 22.6h3.6c1.5 3.4 1 7.9-1.5 10.9-1 1-2.6 1.4-3.9.4 1.2-3.5 1.8-7 1.8-11.3z"/>'),
    bizeps: beideSeiten('<ellipse cx="8.9" cy="36.6" rx="2.6" ry="5" transform="rotate(18.9 8.9 36.6)"/>'),
    unterarme: beideSeiten('<path d="M3.9 46.5q2.7-2.2 5.4 0L8.2 58.5q-1.6 1-3.2 0z"/>')
  },
  // von hinten, die Arme hängen
  hinten: {
    // die ganze Kappe der Schulter von hinten
    "schulter-hinten": beideSeiten('<path d="M18.5 22.6h-5C9.5 22.6 7.6 25.5 7.8 29c.2 3 1.7 6 3.7 7.5 2.5-.5 4.5-1.5 5.5-3 2.5-3 3-7.5 1.5-10.9z"/>'),
    // das Hufeisen hinten auf dem Oberarm
    trizeps: beideSeiten('<path class="linie" stroke-width="2.4" d="M8.7 42 9.5 34q2.1-5.6 3.7 0L12.3 42"/>'),
    unterarme: NAH_UNTERARM
  }
};

// Welche Muskelgruppen an Schultern und Armen den großen Oberkörper zeigen und in welcher Ansicht (aus NAH_MUSKELN)
const NAH_ANSICHT = {
  "schulter-vorn": "vorn",
  "schulter-seite": "vorn-arm",
  "schulter-hinten": "hinten",
  bizeps: "vorn",
  trizeps: "hinten",
  unterarme: "vorn"
};

// ---------- Der Rumpf: derselbe große Oberkörper, andere Muskeln ----------

// Rumpf von vorn: Brust, Bauch und schräger Bauch
const RUMPF_VORN = {
  brust: beideSeiten('<path d="M29.3 24.6h-7.8q-2 .4-2.2 3.4v4.4q.4 3.6 5 4 3.2.2 5-1.6z"/>'),
  // drei Reihen wie ein Sixpack
  bauch: beideSeiten('<rect x="24.6" y="38.5" width="4.8" height="5.5" rx="1.5"/><rect x="24.6" y="45" width="4.8" height="5.5" rx="1.5"/><rect x="24.6" y="51.5" width="4.8" height="5.5" rx="1.5"/>'),
  // die Streifen an den Flanken
  "bauch-schraeg": beideSeiten('<path d="M16.9 38.5h5.6q.9 10 .6 19.5h-4.4q-1.3-9.5-1.8-19.5z"/>')
};

// Rumpf von hinten: Trapez, oberer Rücken, Latissimus, unterer Rücken
const RUMPF_HINTEN = {
  trapez: '<path d="M30 17l2.8 4.5 7.7 1.8-2.5 3.7L30 41l-8-14-2.5-3.7 7.7-1.8z"/>',
  "ruecken-oben": beideSeiten('<path d="M16.6 27.5h4.6l6 10.5q-5 1.2-9.8-.2z"/>'),
  lat: beideSeiten('<path d="M17.2 40q5.5 1.6 11.7 1.2V53q-7.5-1.5-10.4-6.5z"/>'),
  "ruecken-unten": beideSeiten('<rect x="23.2" y="54.4" width="6" height="8" rx="2"/>')
};

// Beim Rumpf von vorn zeichnen Brust und Bauch selbst die Linien, deshalb nur Augen und Nabel
const RUMPF_ZEICHEN_VORN = '<circle class="punkt" cx="27.4" cy="9.6" r="0.9"/><circle class="punkt" cx="32.6" cy="9.6" r="0.9"/>'
  + '<circle class="punkt" cx="30" cy="52" r="0.8"/>';

// ---------- Der große Unterkörper ----------

// Der Unterkörper von der Hüfte bis zum Fuß. Die Beine sind hier als Flächen gezeichnet und etwas kräftiger
// als bei der ganzen Figur, damit die Muskeln Platz haben. Oben schaut der Rumpf ins Bild, die Arme fehlen.
const BEIN_UMRISS = '<path d="M19 22h22q4 0 4 4l-2 24-2 13H19l-2-13-2-24q0-4 4-4z"/>'
  + '<path d="M28 60h4v7.2q-2 1-4 0z"/>'
  + beideSeiten('<path d="M18.6 61C17 65 16.6 70 16.9 74c.4 6 1.4 10 1.9 14-1.4 4-1.8 9-1 13 .8 4 1.8 7 2.1 10.5l-.5 2.7q-.1 1.8 1.8 1.8h2.8q1.6 0 1.2-1.8l-1-2.7c.6-4.5 2-10.5 1.8-15.5-.1-3-.4-5.5-.2-8 .8-6 2.6-13 3.6-20.5V61z"/>');

// Woran man beim Unterkörper vorn und hinten erkennt:
// vorn Nabel, Leistenlinie und Kniescheiben, hinten Wirbelsäule, Gesäßfalten und Kniekehlen
const BEIN_ZEICHEN = {
  vorn: '<circle class="punkt" cx="30" cy="52" r="0.8"/><path d="M19.6 58.5q5.6 6.4 10.4 8.2 4.8-1.8 10.4-8.2"/>'
    + beideSeiten('<ellipse cx="22.3" cy="88.7" rx="2.2" ry="2.5"/>'),
  hinten: '<path d="M30 49.5v9.5M30 61.5v6"/>' + beideSeiten('<path d="M20.4 70.8q4.4 1.8 8.6.2M20.3 88.4h4"/>')
};

// Beine von vorn: Quadrizeps und Adduktoren
const BEIN_VORN = {
  // die große Fläche vorn und außen bis zum Knie
  quadrizeps: beideSeiten('<path d="M18 67.2q2.2-1 4.6-.4l3.6 15.4q-.2 2.2-1 3.7h-5.6q-1.6-4.6-1.9-9.7-.2-5 .3-9z"/>'),
  // der Keil innen oben an der Leiste
  adduktoren: beideSeiten('<path d="M24 67.3l4.8-.1q-.5 7-1.9 13.4z"/>')
};

// Für die Kachel "Abduktoren": der Streifen außen an Hüfte und Oberschenkel, als Gegenstück der Keil innen
const BEIN_AUSSEN = {
  abduktoren: beideSeiten('<path d="M18.2 54q2.4-.8 4.8.4.4 9-1.2 17-1 5.6-3.3 10.4-1-4-1-8 0-6 1.4-12.6z"/>'),
  adduktoren: BEIN_VORN.adduktoren
};

// Beine von hinten: Po, Beinbeuger und Waden
const BEIN_HINTEN = {
  // außen oben an der Hüfte, über dem Gesäß (hier immer grau, die Kachel "Abduktoren" zeigt die Ansicht von vorn)
  abduktoren: beideSeiten('<path d="M17.9 52.2q4-1 8.1 0l-.9 6.3q-3.6.2-6.1 4.3l-.1-2.8z"/>'),
  po: beideSeiten('<path d="M29.3 60q-4-1-6.6.4-2.6 1.2-3.6 3.4-.9 3-.4 5.4 5 2.4 10.6.4z"/>'),
  // schmal, direkt unter der Gesäßfalte, läuft zur Kniekehle spitz aus
  beinbeuger: beideSeiten('<path d="M19.9 71.4q2.9 1 5.8 0 .2 6-1 10.6-.8 3.2-2.1 6-1.5-2.8-2.3-6.2-1.1-4.8-.4-10.4z"/>'),
  waden: beideSeiten('<path d="M18.9 90.5q3.4 1.2 6.6 0 .5 5-.6 9.5-.9 3-2.3 4.5-1.6-1.4-2.6-4.3-1.6-5-1.1-9.7z"/>')
};

// Welche Muskelgruppe an Rumpf und Beinen welchen Ausschnitt zeigt:
// teil ist "oben" (Oberkörper) oder "unten" (Unterkörper), zeichen ist "vorn" oder "hinten".
const AUSSCHNITT = {
  brust: { teil: "oben", zeichen: "vorn", muskeln: RUMPF_VORN },
  bauch: { teil: "oben", zeichen: "vorn", muskeln: RUMPF_VORN },
  "bauch-schraeg": { teil: "oben", zeichen: "vorn", muskeln: RUMPF_VORN },
  trapez: { teil: "oben", zeichen: "hinten", muskeln: RUMPF_HINTEN },
  "ruecken-oben": { teil: "oben", zeichen: "hinten", muskeln: RUMPF_HINTEN },
  lat: { teil: "oben", zeichen: "hinten", muskeln: RUMPF_HINTEN },
  "ruecken-unten": { teil: "oben", zeichen: "hinten", muskeln: RUMPF_HINTEN },
  quadrizeps: { teil: "unten", zeichen: "vorn", muskeln: BEIN_VORN },
  adduktoren: { teil: "unten", zeichen: "vorn", muskeln: BEIN_VORN },
  abduktoren: { teil: "unten", zeichen: "vorn", muskeln: BEIN_AUSSEN },
  po: { teil: "unten", zeichen: "hinten", muskeln: BEIN_HINTEN },
  beinbeuger: { teil: "unten", zeichen: "hinten", muskeln: BEIN_HINTEN },
  waden: { teil: "unten", zeichen: "hinten", muskeln: BEIN_HINTEN }
};

// ---------- Die Figur einer Muskelgruppe ----------

// Hängt die Muskelflächen an eine Figur. Die Fläche der Muskelgruppe bekommt die Klasse "aktiv"
// und wird im CSS limettengrün. Bei "Ganzkörper" leuchten alle Flächen.
function koerperFlaechen(muskeln, gruppe) {
  const namen = Object.keys(muskeln);
  let svg = "";

  for (let i = 0; i < namen.length; i++) {
    let klasse = "muskel";
    if (namen[i] === gruppe.id || gruppe.id === "ganzkoerper") {
      klasse += " aktiv";
    }
    svg += '<g class="' + klasse + '">' + muskeln[namen[i]] + '</g>';
  }
  return svg;
}

// Der große Unterkörper oder der Rumpf für eine Gruppe aus AUSSCHNITT
function ausschnittSvg(a, gruppe) {
  if (a.teil === "unten") {
    return '<svg class="koerper nah" viewBox="1.5 49.5 57 67" aria-hidden="true"><g class="umriss">' + BEIN_UMRISS + '</g>'
      + '<g class="zeichen">' + BEIN_ZEICHEN[a.zeichen] + '</g>'
      + koerperFlaechen(a.muskeln, gruppe) + '</svg>';
  }
  let zeichen = NAH_ZEICHEN.hinten;
  if (a.zeichen === "vorn") {
    zeichen = RUMPF_ZEICHEN_VORN;
  }
  return '<svg class="koerper nah" viewBox="3 1.5 54 63.5" aria-hidden="true"><g class="umriss">' + NAH_UMRISS + NAH_ARME.unten + '</g>'
    + '<g class="zeichen">' + zeichen + '</g>'
    + koerperFlaechen(a.muskeln, gruppe) + '</svg>';
}

// Baut die Figur für eine Muskelgruppe: Rumpf oder Unterkörper, wenn die Gruppe in AUSSCHNITT steht,
// den Oberkörper mit Schultern und Armen, wenn sie in NAH_ANSICHT steht,
// sonst die ganze Figur von vorn oder von hinten (gruppe.ansicht).
function koerperSvg(gruppe) {
  if (AUSSCHNITT[gruppe.id]) {
    return ausschnittSvg(AUSSCHNITT[gruppe.id], gruppe);
  }
  const nah = NAH_ANSICHT[gruppe.id];
  if (nah) {
    let arme = NAH_ARME.unten;
    let zeichen = NAH_ZEICHEN.vorn;
    if (nah === "vorn-arm") {
      arme = NAH_ARME.seitlich;
    }
    if (nah === "hinten") {
      zeichen = NAH_ZEICHEN.hinten;
    }
    return '<svg class="koerper nah" viewBox="3 1.5 54 63.5" aria-hidden="true"><g class="umriss">' + NAH_UMRISS + arme + '</g>'
      + '<g class="zeichen">' + zeichen + '</g>'
      + koerperFlaechen(NAH_MUSKELN[nah], gruppe) + '</svg>';
  }
  return '<svg class="koerper" viewBox="0 0 60 118" aria-hidden="true"><g class="umriss">' + KOERPER_UMRISS + '</g>'
    + koerperFlaechen(KOERPER_MUSKELN[gruppe.ansicht], gruppe) + '</svg>';
}
