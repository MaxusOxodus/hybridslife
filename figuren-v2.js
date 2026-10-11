// Körper-Figuren für die Muskelgruppen: die Kacheln in der Übungsauswahl und in der Bibliothek
// und die kleinen Figuren in der Fortschritt-Liste. Die app.js benutzt davon nur koerperSvg(gruppe)
// und für die Kachel "Eigene" den KOERPER_UMRISS.
//
// Es gibt zwei Arten von Figuren:
//   die ganze Figur (60 × 118 Einheiten) für die meisten Muskelgruppen
//   den großen Oberkörper von Kopf bis Hüfte für Schultern, Bizeps, Trizeps und Unterarme,
//   weil diese Muskeln auf der ganzen Figur zu klein und kaum zu unterscheiden waren
// Die Farben und Größen stehen in der style.css (".koerper" und ".koerper.nah").
//
// Die Figuren von Version 79 liegen unverändert in der figuren-v1.js. Dort steht auch, wie man zurückwechselt.

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

// Welche Muskelgruppen den großen Oberkörper zeigen und in welcher Ansicht (aus NAH_MUSKELN)
const NAH_ANSICHT = {
  "schulter-vorn": "vorn",
  "schulter-seite": "vorn-arm",
  "schulter-hinten": "hinten",
  bizeps: "vorn",
  trizeps: "hinten",
  unterarme: "vorn"
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

// Baut die Figur für eine Muskelgruppe: den großen Oberkörper, wenn die Gruppe in NAH_ANSICHT steht,
// sonst die ganze Figur von vorn oder von hinten (gruppe.ansicht).
function koerperSvg(gruppe) {
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
