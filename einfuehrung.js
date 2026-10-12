// Die Einführung: ein Rundgang, der die App Schritt für Schritt erklärt.
// Der Bildschirm wird abgedunkelt, das erklärte Element bleibt hell und bekommt einen Rahmen.
// Eine Linie führt vom Rahmen zu einer Box mit der Figur und einem kurzen Text.
//
// Bedienung: Ein Tipp auf das linke Drittel des Bildschirms geht einen Schritt zurück, ein Tipp auf den Rest
// geht weiter. In der Box stehen dazu "Zurück", der Stand ("1 von 2") und "Überspringen".
// Solange der Rundgang läuft, liegt er über allem und fängt jeden Tipp ab. Die App darunter lässt sich nicht bedienen.
//
// Die Datei steht in der index.html vor der app.js. Sie benutzt von dort txt, sprache, aktiveSeite, homeAnsicht,
// seiteZeigen, homeZeigen und einstSchliessen, aber erst, wenn ein Rundgang startet.
// Die Farben und Größen stehen in der style.css (".tour-..."), der Glas-Look der Box in der glass.css.

// ---------- Die Schritte ----------

// Jeder Schritt erklärt genau ein Element:
//   bereich: zu welchem Rundgang der Schritt gehört. einfuehrungStarten("test") zeigt alle Schritte mit bereich "test".
//   seite:   die Seite, auf der das Element liegt ("home", "training", "fortschritt" oder "profil")
//   ziel:    der Name des Elements. In der index.html trägt es das Merkmal data-tour="...".
//   pose:    wie die Figur dasteht: "winken", "zeigen" oder "jubeln"
//   text:    ein bis zwei kurze Sätze in jeder Sprache
// Fehlt das Element oder ist es nicht zu sehen, wird der Schritt ausgelassen.
const EINFUEHRUNG_SCHRITTE = [
  {
    bereich: "test",
    seite: "home",
    ziel: "home-heute",
    pose: "zeigen",
    text: {
      de: "Hier siehst du dein Training für heute.",
      en: "Here you see your workout for today."
    }
  },
  {
    bereich: "test",
    seite: "home",
    ziel: "navigation",
    pose: "jubeln",
    text: {
      de: "Hier unten wechselst du den Bereich.",
      en: "Down here you switch between areas."
    }
  }
];

// ---------- Die Figur ----------

// Ein selbst gezeichnetes Strichmännchen mit eckiger Brille (SVG, 48 × 64 Einheiten).
// Kopf, Brille, Mund, Körper und Beine sind immer gleich, nur die Arme wechseln je Pose.
// Die Linien nehmen die Textfarbe (currentColor), so passen sie zum hellen und zum dunklen Design.
const EINFUEHRUNG_KOERPER = '<circle cx="24" cy="13" r="10"/>'
  + '<path class="tour-brille" d="M15.5 10h7v5.5h-7zM25.5 10h7v5.5h-7zM22.5 12h3"/>'
  + '<path d="M20.5 18.5q3.5 2 7 0"/>'
  + '<path d="M24 23v19M24 42l-7 18M24 42l7 18"/>';

const EINFUEHRUNG_POSEN = {
  // Ein Arm hängt, der andere winkt nach oben
  winken: '<path d="M24 29l-9 10M24 29l10-3 5-13"/>',
  // Ein Arm hängt, der andere zeigt zur Seite auf den Text
  zeigen: '<path d="M24 29l-9 10M24 29l17-5"/>',
  // Beide Arme nach oben, neben dem Kopf
  jubeln: '<path d="M24 29l-11-3-4-12M24 29l11-3 4-12"/>'
};

// Die Figur in einer Pose als SVG-Text. Sie ist nur Schmuck, deshalb aria-hidden.
function einfuehrungFigur(pose) {
  return '<svg viewBox="0 0 48 64" aria-hidden="true">' + EINFUEHRUNG_KOERPER + (EINFUEHRUNG_POSEN[pose] || EINFUEHRUNG_POSEN.zeigen) + "</svg>";
}

// ---------- Der Motor ----------

// Der Abstand zwischen Rahmen und Box. So lang ist auch die Linie.
const TOUR_ABSTAND = 18;
// So viel Luft bleibt zwischen Element und Rahmen
const TOUR_LUFT = 6;
// So nah darf der Rahmen an den Bildschirmrand, und so nah die Box an den oberen und unteren Rand
const TOUR_RAND = 4;
const TOUR_BOX_RAND = 12;
// So hoch bleibt der Rahmen mindestens, wenn er gekappt werden muss
const TOUR_MINDESTENS = 56;

// Die Schritte des laufenden Rundgangs (nur die mit sichtbarem Element) und der Schritt, der gerade zu sehen ist.
// Ohne laufenden Rundgang ist tourSchritte null.
let tourSchritte = null;
let tourIndex = 0;

// Die Teile des Rundgangs im Dokument. Sie werden beim ersten Start gebaut.
let tourTeile = null;

// Das Element eines Schritts. Zurück kommt null, wenn es fehlt oder gerade nicht zu sehen ist.
function einfuehrungZiel(schritt) {
  const ziel = document.querySelector('[data-tour="' + schritt.ziel + '"]');
  if (!ziel) {
    return null;
  }
  const platz = ziel.getBoundingClientRect();
  if (platz.width === 0 || platz.height === 0) {
    return null;
  }
  return ziel;
}

// Bringt die App an die Stelle, an der das Element eines Schritts liegt
function einfuehrungVorbereiten(schritt) {
  if (document.getElementById("einst-sheet").classList.contains("offen")) {
    einstSchliessen();
  }
  if (aktiveSeite !== schritt.seite) {
    seiteZeigen(schritt.seite);
  }
  if (schritt.seite === "home" && homeAnsicht !== "home") {
    homeZeigen();
  }
  // Eine frisch gewechselte Seite und ihre Ansicht blenden 0,3 Sekunden lang ein und stehen dabei noch je 8 px zu tief.
  // Das Einblenden wird hier sofort beendet, sonst säße der Rahmen daneben.
  const seite = document.getElementById("seite-" + schritt.seite);
  if (seite.getAnimations) {
    seite.getAnimations({ subtree: true }).forEach(function (animation) {
      try {
        animation.finish();
      } catch (fehler) {}
    });
  }
}

// Baut die Teile des Rundgangs: die dunkle Fläche mit Aussparung, den Rahmen, die Linie und die Box
function einfuehrungBauen() {
  const tour = document.createElement("div");
  tour.id = "tour";
  tour.setAttribute("role", "dialog");
  tour.setAttribute("aria-modal", "true");
  tour.innerHTML = '<svg class="tour-bild" aria-hidden="true">'
    + '<path class="tour-dunkel" fill-rule="evenodd"/>'
    + '<rect class="tour-rahmen"/>'
    + '<line class="tour-linie"/>'
    + "</svg>"
    + '<div class="tour-box" tabindex="-1">'
    + '<div class="tour-inhalt"><div class="tour-figur"></div><p class="tour-text" aria-live="polite"></p></div>'
    + '<div class="tour-leiste">'
    + '<button class="tour-knopf tour-zurueck"></button>'
    + '<span class="tour-stand"></span>'
    + '<button class="tour-knopf tour-ende"></button>'
    + "</div>"
    + "</div>";
  document.body.appendChild(tour);

  tourTeile = {
    tour: tour,
    dunkel: tour.querySelector(".tour-dunkel"),
    rahmen: tour.querySelector(".tour-rahmen"),
    linie: tour.querySelector(".tour-linie"),
    box: tour.querySelector(".tour-box"),
    figur: tour.querySelector(".tour-figur"),
    text: tour.querySelector(".tour-text"),
    zurueck: tour.querySelector(".tour-zurueck"),
    stand: tour.querySelector(".tour-stand"),
    ende: tour.querySelector(".tour-ende")
  };

  tourTeile.zurueck.onclick = einfuehrungZurueck;
  tourTeile.ende.onclick = einfuehrungBeenden;
  tour.addEventListener("click", einfuehrungTipp);
  // Wischen verschiebt die Seite dahinter nicht. Nur Figur und Text dürfen scrollen, falls die Box einmal nicht ganz in den Bildschirm passt.
  tour.addEventListener("touchmove", function (ereignis) {
    if (!ereignis.target.closest(".tour-inhalt")) {
      ereignis.preventDefault();
    }
  }, { passive: false });
}

// Startet den Rundgang eines Bereichs. Zurück kommt false, wenn kein Schritt ein sichtbares Element hat.
function einfuehrungStarten(bereich) {
  if (tourSchritte) {
    return false;
  }
  // Nur Schritte mit sichtbarem Element zählen, damit "1 von 2" stimmt
  const schritte = [];
  for (let i = 0; i < EINFUEHRUNG_SCHRITTE.length; i++) {
    const schritt = EINFUEHRUNG_SCHRITTE[i];
    if (schritt.bereich !== bereich) {
      continue;
    }
    einfuehrungVorbereiten(schritt);
    if (einfuehrungZiel(schritt)) {
      schritte.push(schritt);
    }
  }
  if (schritte.length === 0) {
    return false;
  }

  if (!tourTeile) {
    einfuehrungBauen();
  }
  // Ein Feld mit Cursor verlassen, damit die Tastatur zugeht
  if (document.activeElement && document.activeElement.blur) {
    document.activeElement.blur();
  }
  tourSchritte = schritte;
  tourIndex = 0;
  tourTeile.tour.classList.add("offen");
  document.body.classList.add("tour-offen");
  document.addEventListener("keydown", einfuehrungTaste, true);
  window.addEventListener("resize", einfuehrungAnzeigen);
  window.addEventListener("orientationchange", einfuehrungAnzeigen);
  document.addEventListener("visibilitychange", einfuehrungAnzeigen);
  einfuehrungAnzeigen();
  tourTeile.box.focus({ preventScroll: true });
  return true;
}

// Beendet den Rundgang: nach dem letzten Schritt, über "Überspringen" oder mit der Taste Esc
function einfuehrungBeenden() {
  if (!tourSchritte) {
    return;
  }
  tourSchritte = null;
  tourTeile.tour.classList.remove("offen");
  document.body.classList.remove("tour-offen");
  document.removeEventListener("keydown", einfuehrungTaste, true);
  window.removeEventListener("resize", einfuehrungAnzeigen);
  window.removeEventListener("orientationchange", einfuehrungAnzeigen);
  document.removeEventListener("visibilitychange", einfuehrungAnzeigen);
}

// Einen Schritt weiter. Nach dem letzten Schritt ist der Rundgang vorbei.
function einfuehrungWeiter() {
  if (tourIndex >= tourSchritte.length - 1) {
    einfuehrungBeenden();
    return;
  }
  tourIndex = tourIndex + 1;
  einfuehrungAnzeigen();
}

// Einen Schritt zurück. Beim ersten Schritt passiert nichts.
function einfuehrungZurueck() {
  if (tourIndex === 0) {
    return;
  }
  tourIndex = tourIndex - 1;
  einfuehrungAnzeigen();
}

// Ein Tipp irgendwo auf den Bildschirm: linkes Drittel zurück, sonst weiter.
// Die zwei Knöpfe in der Box haben ihre eigene Aufgabe und zählen hier nicht.
function einfuehrungTipp(ereignis) {
  ereignis.preventDefault();
  ereignis.stopPropagation();
  if (!tourSchritte || ereignis.target.closest("button")) {
    return;
  }
  const flaeche = tourTeile.tour.getBoundingClientRect();
  if (ereignis.clientX < flaeche.left + flaeche.width / 3) {
    einfuehrungZurueck();
  } else {
    einfuehrungWeiter();
  }
}

// Tastatur am Computer: Pfeil rechts, Enter oder Leertaste geht weiter, Pfeil links zurück, Esc beendet.
// Tab wechselt nur zwischen den zwei Knöpfen der Box. Keine Taste erreicht die App darunter.
function einfuehrungTaste(ereignis) {
  const aufKnopf = ereignis.target.closest && ereignis.target.closest(".tour-knopf");
  if (ereignis.key === "Escape") {
    einfuehrungBeenden();
  } else if (ereignis.key === "ArrowLeft") {
    einfuehrungZurueck();
  } else if (ereignis.key === "ArrowRight") {
    einfuehrungWeiter();
  } else if (ereignis.key === "Tab") {
    if (document.activeElement === tourTeile.ende && !tourTeile.zurueck.disabled) {
      tourTeile.zurueck.focus();
    } else {
      tourTeile.ende.focus();
    }
  } else if (ereignis.key === "Enter" || ereignis.key === " ") {
    // Auf einem der zwei Knöpfe drückt die Taste den Knopf
    if (aufKnopf) {
      return;
    }
    einfuehrungWeiter();
  }
  ereignis.preventDefault();
  ereignis.stopPropagation();
}

// Zeigt den aktuellen Schritt: Text, Figur und Stand einsetzen, das Element in den Bildschirm holen
// und Aussparung, Rahmen, Linie und Box neu platzieren. Läuft auch nach dem Drehen des Geräts.
function einfuehrungAnzeigen() {
  if (!tourSchritte) {
    return;
  }
  const schritt = tourSchritte[tourIndex];
  einfuehrungVorbereiten(schritt);
  const ziel = einfuehrungZiel(schritt);

  // Das Element ist inzwischen verschwunden: Der Schritt fällt weg
  if (!ziel) {
    tourSchritte.splice(tourIndex, 1);
    if (tourSchritte.length === 0) {
      einfuehrungBeenden();
      return;
    }
    tourIndex = Math.min(tourIndex, tourSchritte.length - 1);
    einfuehrungAnzeigen();
    return;
  }

  // Die Texte kommen bei jedem Schritt frisch in der aktuellen Sprache
  const letzter = tourIndex === tourSchritte.length - 1;
  tourTeile.tour.setAttribute("aria-label", txt("tour.titel"));
  tourTeile.figur.innerHTML = einfuehrungFigur(schritt.pose);
  tourTeile.text.textContent = schritt.text[sprache] || schritt.text.de;
  tourTeile.stand.textContent = txt("tour.xVonY", { x: tourIndex + 1, y: tourSchritte.length });
  tourTeile.zurueck.textContent = txt("zurueck");
  tourTeile.zurueck.disabled = tourIndex === 0;
  tourTeile.ende.textContent = letzter ? txt("tour.fertig") : txt("ueberspringen");

  ziel.scrollIntoView({ block: "center" });
  einfuehrungPlatzieren(ziel);
}

// Rechnet aus, wo Aussparung, Rahmen, Linie und Box stehen. Alle Werte sind Pixel ab der linken oberen Ecke des Bildschirms.
function einfuehrungPlatzieren(ziel) {
  const flaeche = tourTeile.tour.getBoundingClientRect();
  const breite = flaeche.width;
  const hoehe = flaeche.height;

  // Notch und Home-Balken: Die style.css legt sie als Innenabstand an #tour, hier werden sie in Pixeln gelesen
  const stil = getComputedStyle(tourTeile.tour);
  const frei = {
    oben: parseFloat(stil.paddingTop) || 0,
    rechts: parseFloat(stil.paddingRight) || 0,
    unten: parseFloat(stil.paddingBottom) || 0,
    links: parseFloat(stil.paddingLeft) || 0
  };

  // Die Box: so breit wie der Inhalt der Seite, mit 16 px Rand
  const seite = document.body.getBoundingClientRect();
  const box = tourTeile.box;
  const boxLinks = Math.max(seite.left, frei.links) + 16;
  const boxRechts = Math.min(seite.right, breite - frei.rechts) - 16;
  box.style.maxHeight = "";
  box.style.left = boxLinks + "px";
  box.style.width = (boxRechts - boxLinks) + "px";
  let boxHoehe = box.offsetHeight;

  // Der Rahmen um das Element, mit etwas Luft. Er bleibt im Bildschirm.
  const platz = ziel.getBoundingClientRect();
  const links = Math.max(platz.left - TOUR_LUFT, TOUR_RAND);
  const rechts = Math.min(platz.right + TOUR_LUFT, breite - TOUR_RAND);
  let oben = Math.max(platz.top - TOUR_LUFT, TOUR_RAND);
  let unten = Math.min(platz.bottom + TOUR_LUFT, hoehe - TOUR_RAND);

  // Auf einem sehr niedrigen Bildschirm wird die Box nur so hoch wie der Bildschirm, der Text scrollt dann in ihr
  const obereGrenze = frei.oben + TOUR_BOX_RAND;
  const untereGrenze = hoehe - frei.unten - TOUR_BOX_RAND;
  if (boxHoehe > untereGrenze - obereGrenze - TOUR_ABSTAND - TOUR_MINDESTENS) {
    boxHoehe = Math.max(untereGrenze - obereGrenze - TOUR_ABSTAND - TOUR_MINDESTENS, 0);
    box.style.maxHeight = boxHoehe + "px";
  }

  // Die Box steht unter dem Element, wenn sie dort hinpasst, sonst darüber.
  // Passt sie nirgends (hohes Element oder niedriger Bildschirm), geht sie an den unteren Rand und der Rahmen
  // wird unten gekappt. Bliebe dann vom Element zu wenig übrig, geht sie an den oberen Rand und der Rahmen wird oben gekappt.
  let boxUnten = true;
  let boxOben = unten + TOUR_ABSTAND;
  if (boxOben + boxHoehe > untereGrenze) {
    if (oben - TOUR_ABSTAND - boxHoehe >= obereGrenze) {
      boxUnten = false;
      boxOben = oben - TOUR_ABSTAND - boxHoehe;
    } else if (untereGrenze - boxHoehe - TOUR_ABSTAND - oben >= TOUR_MINDESTENS) {
      boxOben = untereGrenze - boxHoehe;
      unten = boxOben - TOUR_ABSTAND;
    } else {
      boxUnten = false;
      boxOben = obereGrenze;
      oben = boxOben + boxHoehe + TOUR_ABSTAND;
      unten = Math.max(unten, oben + TOUR_MINDESTENS);
    }
  }
  box.style.top = boxOben + "px";

  // Die dunkle Fläche: der ganze Bildschirm, darin das Rechteck des Rahmens mit runden Ecken als Loch
  const b = rechts - links;
  const h = unten - oben;
  const r = Math.min(20, b / 2, h / 2);
  tourTeile.dunkel.setAttribute("d",
    "M0 0H" + breite + "V" + hoehe + "H0Z"
    + "M" + (links + r) + " " + oben
    + "h" + (b - 2 * r) + "a" + r + " " + r + " 0 0 1 " + r + " " + r
    + "v" + (h - 2 * r) + "a" + r + " " + r + " 0 0 1 " + (-r) + " " + r
    + "h" + (2 * r - b) + "a" + r + " " + r + " 0 0 1 " + (-r) + " " + (-r)
    + "v" + (2 * r - h) + "a" + r + " " + r + " 0 0 1 " + r + " " + (-r) + "Z");

  const rahmen = tourTeile.rahmen;
  rahmen.setAttribute("x", links);
  rahmen.setAttribute("y", oben);
  rahmen.setAttribute("width", b);
  rahmen.setAttribute("height", h);
  rahmen.setAttribute("rx", r);

  // Die Linie: senkrecht von der Kante des Rahmens zur Kante der Box, möglichst unter der Mitte des Elements
  let x = (links + rechts) / 2;
  x = Math.max(boxLinks + 28, Math.min(x, boxRechts - 28));
  x = Math.max(links + r, Math.min(x, rechts - r));
  const linie = tourTeile.linie;
  linie.setAttribute("x1", x);
  linie.setAttribute("x2", x);
  linie.setAttribute("y1", boxUnten ? unten : oben);
  linie.setAttribute("y2", boxUnten ? boxOben : boxOben + boxHoehe);
}

// ---------- Prüfung ----------

// Prüft alle Schritte und nennt die, bei denen etwas nicht stimmt: kein Element mit dem Namen, Element nicht zu sehen,
// unbekannte Pose oder fehlender Text. Gedacht für die Konsole des Browsers: einfuehrungPruefen()
// Die Prüfung wechselt dabei durch die Seiten der App und kehrt am Ende zur Seite von vorher zurück.
// Zurück kommt die Liste der Fehler. Sie ist leer, wenn alles stimmt.
function einfuehrungPruefen() {
  const seiteVorher = aktiveSeite;
  const fehler = [];
  for (let i = 0; i < EINFUEHRUNG_SCHRITTE.length; i++) {
    const schritt = EINFUEHRUNG_SCHRITTE[i];
    const probleme = [];
    if (!document.querySelector('[data-tour="' + schritt.ziel + '"]')) {
      probleme.push("kein Element mit data-tour=\"" + schritt.ziel + "\"");
    } else if (!document.getElementById("seite-" + schritt.seite)) {
      probleme.push("Seite \"" + schritt.seite + "\" gibt es nicht");
    } else {
      einfuehrungVorbereiten(schritt);
      if (!einfuehrungZiel(schritt)) {
        probleme.push("Element ist gerade nicht zu sehen");
      }
    }
    if (!EINFUEHRUNG_POSEN[schritt.pose]) {
      probleme.push("Pose \"" + schritt.pose + "\" gibt es nicht");
    }
    for (let s = 0; s < SPRACHEN.length; s++) {
      if (!schritt.text || !schritt.text[SPRACHEN[s].id]) {
        probleme.push("Text fehlt: " + SPRACHEN[s].id);
      }
    }
    if (probleme.length > 0) {
      fehler.push({ nummer: i + 1, bereich: schritt.bereich, ziel: schritt.ziel, problem: probleme.join(", ") });
    }
  }
  if (aktiveSeite !== seiteVorher) {
    seiteZeigen(seiteVorher);
  }
  if (fehler.length === 0) {
    console.log("Einführung: alle " + EINFUEHRUNG_SCHRITTE.length + " Schritte in Ordnung");
  } else {
    console.table(fehler);
  }
  return fehler;
}
