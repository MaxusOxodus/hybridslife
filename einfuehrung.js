// Die Einführung: ein Rundgang, der die App Schritt für Schritt erklärt.
// Der Bildschirm wird abgedunkelt, das erklärte Element bleibt hell und bekommt einen Rahmen.
// Eine Linie führt vom Rahmen zu einer Box mit der Figur und einem kurzen Text.
//
// Bedienung: Ein Tipp auf das linke Drittel des Bildschirms geht einen Schritt zurück, ein Tipp auf den Rest
// geht weiter. In der Box stehen dazu "Zurück", der Stand (Punkte oder Strich und "1 von 2") und "Überspringen".
// Solange der Rundgang läuft, liegt er über allem und fängt jeden Tipp ab. Die App darunter lässt sich nicht bedienen.
//
// Die Datei steht in der index.html vor der app.js. Sie benutzt von dort txt, sprache, aktiveSeite, homeAnsicht,
// seiteZeigen, homeZeigen, homeWocheHeute und einstSchliessen, für das Training trainingAnsicht, trainingReiter,
// laufendesTraining, trainingAnsichtZeigen, trainingReiterAnzeigen, trainingFortsetzen und modusZustandAnzeigen,
// für das Angebot frageZeigen, gespeichertLesen und sicherSpeichern. Alles erst, wenn ein Rundgang startet oder angeboten wird.
// Die Farben und Größen stehen in der style.css (".tour-..."), der Glas-Look der Box in der glass.css.

// ---------- Die Schritte ----------

// Jeder Schritt erklärt genau ein Element:
//   bereich: zu welchem Rundgang der Schritt gehört. einfuehrungStarten("home") zeigt alle Schritte mit bereich "home".
//   seite:   die Seite, auf der das Element liegt ("home", "training", "fortschritt" oder "profil")
//   ziel:    der Name des Elements. In der index.html trägt es das Merkmal data-tour="...".
//   pose:    wie die Figur dasteht: "winken", "zeigen" oder "jubeln"
//   titel:   eine kurze Überschrift in jeder Sprache (ein bis drei Wörter, sie passt in eine Zeile). Sie darf fehlen.
//   text:    ein bis zwei kurze Sätze in jeder Sprache, nie mehr
// Nur bei Schritten auf der Seite "training":
//   ansicht: "uebersicht" (die Übersicht mit dem Reiter "Pläne") oder "modus" (der Trainingsmodus, nur mit laufendem Training)
//   zeigt:   "eingabe" oder "pause". Der Trainingsmodus zeigt immer nur eins von beiden. Für diesen Schritt ist es zu sehen,
//            egal, was gerade dran ist (siehe einfuehrungZeigtSetzen). Darf fehlen.
//   braucht: was da sein muss, damit es das Element überhaupt gibt (ein Name aus EINFUEHRUNG_BRAUCHT). Darf fehlen.
//            Fehlt es, lässt der Rundgang den Schritt aus, und einfuehrungPruefen() meldet das nicht als Fehler.
// Fehlt das Element oder ist es nicht zu sehen, wird der Schritt ausgelassen.
// Die Texte müssen auch stimmen, wenn Home noch leer ist: Sie nennen den Platz, nicht den Inhalt.
const EINFUEHRUNG_SCHRITTE = [
  {
    bereich: "home",
    seite: "home",
    ziel: "home-heute",
    pose: "winken",
    titel: {
      de: "Willkommen",
      en: "Welcome"
    },
    text: {
      de: "Hier siehst du dein Training für heute.",
      en: "Here you see your workout for today."
    }
  },
  {
    bereich: "home",
    seite: "home",
    ziel: "home-woche",
    pose: "zeigen",
    titel: {
      de: "Deine Woche",
      en: "Your week"
    },
    text: {
      de: "Das sind die Tage dieser Woche. Tippe auf einen Tag, um das Training zu sehen.",
      en: "These are the days of this week. Tap a day to see the workout."
    }
  },
  {
    bereich: "home",
    seite: "home",
    ziel: "home-wochenzahlen",
    pose: "zeigen",
    titel: {
      de: "Deine Woche in Zahlen",
      en: "Your week in numbers"
    },
    text: {
      de: "Hier zählt die App, wie viel du diese Woche trainiert hast.",
      en: "Here the app counts how much you trained this week."
    }
  },
  {
    bereich: "home",
    seite: "home",
    ziel: "home-letztes",
    pose: "zeigen",
    titel: {
      de: "Letztes Training",
      en: "Last workout"
    },
    text: {
      de: "Hier siehst du dein letztes Training auf einen Blick.",
      en: "Here you see your last workout at a glance."
    }
  },
  {
    bereich: "home",
    seite: "home",
    ziel: "home-kraft",
    pose: "zeigen",
    titel: {
      de: "Deine Zahlen",
      en: "Your numbers"
    },
    text: {
      de: "Hier stehen deine Kraft und dein Körpergewicht. Tippe auf eine Kachel für mehr.",
      en: "Here are your strength and body weight. Tap a tile for more."
    }
  },
  {
    bereich: "home",
    seite: "home",
    ziel: "navigation",
    pose: "jubeln",
    titel: {
      de: "Die Leiste",
      en: "The tab bar"
    },
    text: {
      de: "Mit der Leiste unten wechselst du zwischen den Bereichen der App.",
      en: "Use the bar at the bottom to switch between the parts of the app."
    }
  },
  {
    bereich: "training",
    seite: "training",
    ansicht: "uebersicht",
    ziel: "training-reiter",
    pose: "winken",
    titel: {
      de: "Dein Training",
      en: "Your training"
    },
    text: {
      de: "Hier planst du dein Training. Unter „Übungen“ findest du alle Übungen.",
      en: "Here you plan your training. Under “Exercises” you find every exercise."
    }
  },
  {
    bereich: "training",
    seite: "training",
    ansicht: "uebersicht",
    ziel: "training-wochenplan",
    pose: "zeigen",
    titel: {
      de: "Wochenplan",
      en: "Weekly plan"
    },
    text: {
      de: "Hier legst du fest, was du an welchem Tag trainierst. Home zeigt dir dann jeden Tag dein Training.",
      en: "Here you choose what you train on which day. Home then shows your workout each day."
    }
  },
  {
    bereich: "training",
    seite: "training",
    ansicht: "uebersicht",
    ziel: "training-neu",
    pose: "zeigen",
    titel: {
      de: "Routinen",
      en: "Routines"
    },
    text: {
      de: "Eine Routine ist eine Liste von Übungen für ein Training. Mit „Neue Routine“ baust du deine eigene.",
      en: "A routine is a list of exercises for one workout. Build your own with “New routine”."
    }
  },
  {
    bereich: "training",
    seite: "training",
    ansicht: "uebersicht",
    ziel: "training-vorlagen",
    pose: "zeigen",
    titel: {
      de: "Vorlagen",
      en: "Templates"
    },
    text: {
      de: "Wähle, wie oft du pro Woche trainierst. Dann kannst du einen fertigen Plan übernehmen.",
      en: "Choose how often you train per week. Then you can take over a ready-made plan."
    }
  },
  {
    bereich: "training",
    seite: "training",
    ansicht: "uebersicht",
    ziel: "training-start",
    pose: "jubeln",
    braucht: "routine",
    titel: {
      de: "Training starten",
      en: "Start workout"
    },
    text: {
      de: "Tippe bei einer Routine auf „Starten“. Die App führt dich dann Satz für Satz durch.",
      en: "Tap “Start” on a routine. The app then guides you set by set."
    }
  },
  {
    bereich: "modus",
    seite: "training",
    ansicht: "modus",
    ziel: "modus-eingabe",
    pose: "winken",
    zeigt: "eingabe",
    braucht: "training",
    titel: {
      de: "Dein Satz",
      en: "Your set"
    },
    text: {
      de: "Trag hier dein Gewicht und deine Wiederholungen ein. Mit den Knöpfen darunter geht es schneller.",
      en: "Enter your weight and your reps here. The buttons below make it faster."
    }
  },
  {
    bereich: "modus",
    seite: "training",
    ansicht: "modus",
    ziel: "modus-rir",
    pose: "zeigen",
    zeigt: "eingabe",
    braucht: "training",
    titel: {
      de: "Reps in Reserve",
      en: "Reps in Reserve"
    },
    text: {
      de: "Wie viele Wiederholungen hättest du noch geschafft? Die Angabe ist freiwillig.",
      en: "How many more reps could you have done? This is optional."
    }
  },
  {
    bereich: "modus",
    seite: "training",
    ansicht: "modus",
    ziel: "modus-satz-fertig",
    pose: "zeigen",
    zeigt: "eingabe",
    braucht: "training",
    titel: {
      de: "Satz fertig",
      en: "Set done"
    },
    text: {
      de: "Nach jedem Satz tippst du auf „Satz fertig“. Die App speichert ihn sofort.",
      en: "After each set, tap “Set done”. The app saves it right away."
    }
  },
  {
    bereich: "modus",
    seite: "training",
    ansicht: "modus",
    ziel: "modus-pause",
    pose: "zeigen",
    zeigt: "pause",
    braucht: "training",
    titel: {
      de: "Pause",
      en: "Rest"
    },
    text: {
      de: "Nach jedem Satz läuft die Pause von selbst. Du kannst sie kürzen, verlängern oder überspringen.",
      en: "After each set the rest timer starts by itself. You can shorten, extend or skip it."
    }
  },
  {
    bereich: "modus",
    seite: "training",
    ansicht: "modus",
    ziel: "modus-erklaerung",
    pose: "zeigen",
    braucht: "erklaerung",
    titel: {
      de: "Erklärung",
      en: "How to"
    },
    text: {
      de: "Das „i“ zeigt dir, wie die Übung geht.",
      en: "The “i” shows you how to do the exercise."
    }
  },
  {
    bereich: "modus",
    seite: "training",
    ansicht: "modus",
    ziel: "modus-wechsel",
    pose: "zeigen",
    braucht: "training",
    titel: {
      de: "Übung wechseln",
      en: "Switch exercise"
    },
    text: {
      de: "Mit den Pfeilen gehst du zur vorherigen oder nächsten Übung. Die Mitte zeigt alle Übungen.",
      en: "Use the arrows for the previous or next exercise. The middle shows all exercises."
    }
  },
  {
    bereich: "modus",
    seite: "training",
    ansicht: "modus",
    ziel: "modus-beenden",
    pose: "jubeln",
    braucht: "training",
    titel: {
      de: "Training beenden",
      en: "Finish workout"
    },
    text: {
      de: "Bist du fertig, tippe auf „Beenden“. Die App fragt nach und speichert dein Training.",
      en: "When you are done, tap “Finish”. The app asks first and saves your workout."
    }
  }
];

// ---------- Die Figur ----------

// Ein selbst gezeichnetes Strichmännchen mit eckiger Brille (SVG, 48 × 64 Einheiten).
// Kopf, Brille, Mund, Körper und Beine sind immer gleich. Ein Arm drückt in jeder Pose ein Buch an den Körper,
// nur der andere Arm wechselt je Pose.
// Die Linien nehmen die Textfarbe (currentColor), so passen sie zum hellen und zum dunklen Design.
const EINFUEHRUNG_KOERPER = '<circle cx="24" cy="13" r="10"/>'
  + '<path class="tour-brille" d="M15.5 10h7v5.5h-7zM25.5 10h7v5.5h-7zM22.5 12h3"/>'
  + '<path d="M20.5 18.5q3.5 2 7 0"/>'
  + '<path d="M24 23v19M24 42l-7 18M24 42l7 18"/>';

// Das Buch: ein leicht gekipptes Rechteck mit Buchrücken und einem kurzen Strich als Titel, ohne Zeichen oder Logo.
// Der Arm liegt oben und außen um das Buch und drückt es an den Körper, die Hand greift unten um die Ecke.
const EINFUEHRUNG_BUCH = '<g class="tour-buch" transform="rotate(-6 16.5 39)">'
  + '<rect x="11.5" y="33" width="10" height="12" rx="1.5"/>'
  + '<path d="M14.3 33v12M16.8 36.5h2.2"/>'
  + "</g>"
  + '<path d="M24 29l-15.5 2.5-.5 10 3 1.5"/>';

const EINFUEHRUNG_POSEN = {
  // Der freie Arm winkt neben dem Kopf, zwei kleine Bögen zeigen die Bewegung
  winken: '<path d="M24 29l9-2 6-12"/><path class="tour-schwung" d="M42.5 10.5q2.5 3 1.5 6.5M35 8.5q2-2 5-1.5"/>',
  // Der freie Arm zeigt zur Seite auf den Text
  zeigen: '<path d="M24 29l17-5"/>',
  // Der freie Arm ist hoch in die Luft gestreckt, darüber drei kurze Striche. Das Buch bleibt fest unter dem anderen Arm.
  jubeln: '<path d="M24 29l11-6 4-15"/><path class="tour-schwung" d="M39 3.5v-2M43 5.5l1.5-1.5M44.5 9.5h2"/>'
};

// Die Figur in einer Pose als SVG-Text. Sie ist nur Schmuck, deshalb aria-hidden.
function einfuehrungFigur(pose) {
  return '<svg viewBox="0 0 48 64" aria-hidden="true">' + EINFUEHRUNG_KOERPER + EINFUEHRUNG_BUCH + (EINFUEHRUNG_POSEN[pose] || EINFUEHRUNG_POSEN.zeigen) + "</svg>";
}

// ---------- Der Motor ----------

// Der Abstand zwischen Rahmen und Box. So lang ist auch die Linie.
const TOUR_ABSTAND = 18;
// So viel Luft bleibt zwischen Element und Rahmen
const TOUR_LUFT = 6;
// So nah darf der Rahmen an den Bildschirmrand, und so nah die Box an den oberen und unteren Rand
const TOUR_RAND = 4;
const TOUR_BOX_RAND = 12;
// So viel Platz bleibt oben für die schmale Kopfzeile der App, wenn die Seite für ein hohes Element gerückt wird
const TOUR_KOPFZEILE = 44;
// So hoch bleibt der Rahmen mindestens, wenn er gekappt werden muss
const TOUR_MINDESTENS = 56;
// Bis zu so vielen Schritten zeigt der Stand je Schritt einen Punkt, bei mehr einen durchgehenden Strich
const TOUR_PUNKTE_HOECHSTENS = 10;

// Die Schritte des laufenden Rundgangs (nur die mit sichtbarem Element) und der Schritt, der gerade zu sehen ist.
// Ohne laufenden Rundgang ist tourSchritte null.
let tourSchritte = null;
let tourIndex = 0;

// Die Teile des Rundgangs im Dokument. Sie werden beim ersten Start gebaut.
let tourTeile = null;

// Der Bereich des laufenden Rundgangs und was im Training vor dem Start zu sehen war (Ansicht und Reiter).
// Der Rundgang "training" stellt beides am Ende wieder her.
let tourBereich = "";
let tourVorher = null;

// true, solange der Rundgang selbst durch die Seiten blättert (beim Start und in der Prüfung): Dann wird nichts angeboten.
let tourLeise = false;

// Steht im Trainingsmodus gerade eine Pausenzeit, die nur der Rundgang hingeschrieben hat?
let tourPauseGestellt = false;

// Wo Element, Bildschirm und Box bei der letzten Platzierung standen, und die Nummer des bestellten nächsten Vergleichs (einfuehrungFolgen)
let tourStand = "";
let tourFolgt = 0;

// Was da sein muss, damit es das Element eines Schritts gibt (Feld "braucht")
const EINFUEHRUNG_BRAUCHT = {
  // mindestens eine Routine: Nur dann gibt es eine Karte mit "Starten"
  routine: function () {
    return routinen.length > 0;
  },
  // ein laufendes Training: Nur dann gibt es den Trainingsmodus
  training: function () {
    return Boolean(laufendesTraining);
  },
  // ein laufendes Training, dessen aktuelle Übung eine Erklärung hat: Nur dann gibt es das "i"
  erklaerung: function () {
    if (!laufendesTraining) {
      return false;
    }
    const uebung = laufendesTraining.uebungen[laufendesTraining.index];
    return erklaerungId(uebung.uebungId, uebung.name) !== "";
  }
};

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
  // Ohne laufendes Training gibt es den Trainingsmodus nicht: Die App bleibt, wo sie ist, der Schritt fällt weg
  if (schritt.ansicht === "modus" && !laufendesTraining) {
    einfuehrungZeigtSetzen("");
    return;
  }
  if (aktiveSeite !== schritt.seite) {
    seiteZeigen(schritt.seite);
  }
  if (schritt.seite === "home" && homeAnsicht !== "home") {
    homeZeigen();
  }
  if (schritt.seite === "training") {
    if (schritt.ansicht === "modus") {
      if (trainingAnsicht !== "modus") {
        trainingFortsetzen();
      }
    } else {
      if (trainingAnsicht !== "uebersicht") {
        trainingAnsichtZeigen("uebersicht");
      }
      if (trainingReiter !== "plaene") {
        trainingReiter = "plaene";
        trainingReiterAnzeigen();
      }
    }
  }
  einfuehrungZeigtSetzen(schritt.zeigt || "");
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

// Der Trainingsmodus zeigt immer nur eins: die Eingabe für den nächsten Satz, die Pause oder (nach dem letzten Satz) die Wahl
// "Nächste Übung / + Satz". Für einen Schritt stellt der Rundgang das Gewünschte hin: was = "eingabe", "pause" oder "" (nichts stellen).
// Das geht nur über eine Klasse am body, die Regeln dazu stehen in der style.css. Am Training selbst ändert sich nichts:
// Es startet keine Pause, es entsteht kein Satz, und ohne die Klasse ist alles wieder, wie es war.
function einfuehrungZeigtSetzen(was) {
  document.body.classList.toggle("tour-zeigt-eingabe", was === "eingabe");
  document.body.classList.toggle("tour-zeigt-pause", was === "pause");
  if (!laufendesTraining || trainingAnsicht !== "modus") {
    tourPauseGestellt = false;
    return;
  }
  if (was === "pause" && pauseRest() === 0) {
    // Es läuft keine Pause: Als Zeit steht die Pausenlänge der aktuellen Übung da, sie läuft nicht herunter
    document.getElementById("modus-countdown").textContent = pauseText(pauseDauer(laufendesTraining.uebungen[laufendesTraining.index]));
    tourPauseGestellt = true;
  } else if (tourPauseGestellt) {
    // Die hingeschriebene Zeit wieder durch den echten Stand ersetzen
    tourPauseGestellt = false;
    modusZustandAnzeigen(false);
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
    + '<div class="tour-inhalt"><div class="tour-figur"></div>'
    + '<div class="tour-worte" aria-live="polite"><p class="tour-titel"></p><p class="tour-text"></p></div></div>'
    + '<div class="tour-leiste">'
    + '<button class="tour-knopf tour-zurueck"></button>'
    + '<span class="tour-stand"><span class="tour-punkte" aria-hidden="true"></span><span class="tour-zahl"></span></span>'
    + '<button class="tour-knopf tour-ende"></button>'
    + "</div>"
    + '<p class="tour-hinweis"></p>'
    + "</div>";
  document.body.appendChild(tour);

  tourTeile = {
    tour: tour,
    dunkel: tour.querySelector(".tour-dunkel"),
    rahmen: tour.querySelector(".tour-rahmen"),
    linie: tour.querySelector(".tour-linie"),
    box: tour.querySelector(".tour-box"),
    figur: tour.querySelector(".tour-figur"),
    titel: tour.querySelector(".tour-titel"),
    text: tour.querySelector(".tour-text"),
    zurueck: tour.querySelector(".tour-zurueck"),
    punkte: tour.querySelector(".tour-punkte"),
    zahl: tour.querySelector(".tour-zahl"),
    ende: tour.querySelector(".tour-ende"),
    hinweis: tour.querySelector(".tour-hinweis")
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
  // Der Rundgang über Home erklärt "diese Woche": Zeigt die Leiste gerade eine andere Woche, springt sie zurück zur aktuellen
  if (bereich === "home") {
    homeWocheHeute();
  }
  tourBereich = bereich;
  tourVorher = { ansicht: trainingAnsicht, reiter: trainingReiter };
  // Nur Schritte mit sichtbarem Element zählen, damit "1 von 2" stimmt
  const schritte = [];
  tourLeise = true;
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
  tourLeise = false;
  if (schritte.length === 0) {
    einfuehrungAufraeumen();
    return false;
  }
  // Wer den Rundgang startet, hat ihn gesehen: Er wird danach nicht mehr von selbst angeboten
  einfuehrungGesehenMerken(bereich);

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
  einfuehrungEinblenden();
  tourTeile.box.focus({ preventScroll: true });
  cancelAnimationFrame(tourFolgt);
  tourFolgt = requestAnimationFrame(einfuehrungFolgen);
  return true;
}

// Beendet den Rundgang: nach dem letzten Schritt, über "Überspringen" oder mit der Taste Esc
function einfuehrungBeenden() {
  if (!tourSchritte) {
    return;
  }
  tourSchritte = null;
  cancelAnimationFrame(tourFolgt);
  tourTeile.tour.classList.remove("offen");
  document.body.classList.remove("tour-offen");
  document.removeEventListener("keydown", einfuehrungTaste, true);
  window.removeEventListener("resize", einfuehrungAnzeigen);
  window.removeEventListener("orientationchange", einfuehrungAnzeigen);
  document.removeEventListener("visibilitychange", einfuehrungAnzeigen);
  einfuehrungAufraeumen();
}

// Bringt die App nach einem Rundgang oder nach der Prüfung zurück: Im Trainingsmodus steht wieder der echte Stand,
// und nach dem Rundgang "training" sind Ansicht und Reiter wieder die von vorher (z. B. der Trainingsmodus,
// der Reiter "Übungen" oder eine angefangene Routine im Editor, ihre Eingaben sind noch da).
function einfuehrungAufraeumen() {
  einfuehrungZeigtSetzen("");
  if (tourBereich === "training" && tourVorher && aktiveSeite === "training") {
    if (trainingReiter !== tourVorher.reiter) {
      trainingReiter = tourVorher.reiter;
      trainingReiterAnzeigen();
    }
    if (trainingAnsicht !== tourVorher.ansicht && (tourVorher.ansicht !== "modus" || laufendesTraining)) {
      trainingAnsichtZeigen(tourVorher.ansicht);
    }
  }
  tourBereich = "";
  tourVorher = null;
}

// ---------- Angebot und Auswahl ----------

// Die Rundgänge "training" und "modus" bietet die App von selbst an: beim ersten Öffnen des Training-Tabs und
// beim ersten gestarteten Training. Was schon war, steht im Speicher unter "einfuehrungGesehen", je Bereich
// { gesehen: true } oder { angeboten: 1 }. Der Merker steht absichtlich nicht in den Einstellungen:
// Die gehen ganz ins Backup, der Merker gehört nicht hinein.
function einfuehrungMerker() {
  const merker = gespeichertLesen("einfuehrungGesehen", {});
  if (!merker || typeof merker !== "object" || Array.isArray(merker)) {
    return {};
  }
  return merker;
}

function einfuehrungGesehenMerken(bereich) {
  const merker = einfuehrungMerker();
  if (merker[bereich] && merker[bereich].gesehen) {
    return;
  }
  merker[bereich] = { gesehen: true };
  sicherSpeichern("einfuehrungGesehen", merker);
}

// In dieser Sitzung schon gefragt? Bereich → true. Nach "Später" kommt die Frage erst beim nächsten Start der App wieder.
const tourGefragt = {};
// So oft bietet die App einen Rundgang höchstens an
const TOUR_ANGEBOTE = 2;

// Die app.js ruft das auf, wenn der Training-Tab aufgeht ("training") und wenn ein Training neu startet ("modus").
// Gefragt wird erst, wenn die App damit fertig ist: Beim Start eines Trainings von Home aus geht erst der Tab auf
// und dann der Trainingsmodus, die Frage soll zu dem passen, was am Ende zu sehen ist.
function einfuehrungAnbieten(bereich) {
  if (tourSchritte || tourLeise || tourGefragt[bereich]) {
    return;
  }
  setTimeout(function () {
    einfuehrungFragen(bereich);
  }, 0);
}

// Fragt "Kurz zeigen?", wenn der Bereich wirklich zu sehen ist und der Rundgang noch nicht gesehen und
// noch keine zweimal angeboten wurde. "Ja, zeigen" startet ihn, "Später" schließt nur den Dialog.
function einfuehrungFragen(bereich) {
  if (tourSchritte || tourGefragt[bereich] || !startFertig || aktiveSeite !== "training") {
    return;
  }
  if (bereich === "training" && trainingAnsicht !== "uebersicht") {
    return;
  }
  if (bereich === "modus" && (trainingAnsicht !== "modus" || !laufendesTraining)) {
    return;
  }
  // Ist schon ein Dialog offen, wartet die Frage bis zum nächsten Mal
  if (document.getElementById("frage-hintergrund").classList.contains("offen")) {
    return;
  }
  const merker = einfuehrungMerker();
  const stand = merker[bereich] || {};
  const angeboten = Number(stand.angeboten) || 0;
  if (stand.gesehen || angeboten >= TOUR_ANGEBOTE) {
    return;
  }
  tourGefragt[bereich] = true;
  merker[bereich] = { angeboten: angeboten + 1 };
  sicherSpeichern("einfuehrungGesehen", merker);
  frageZeigen(txt("tour.frage"), txt("tour.frage." + bereich), [
    {
      text: txt("tour.ja"),
      art: "haupt",
      aktion: function () {
        einfuehrungStarten(bereich);
      }
    },
    { text: txt("spaeter") }
  ]);
}

// Die Zeile "Anleitung (Test)" in den Einstellungen: fragt, welcher Bereich gezeigt werden soll.
// "Trainingsmodus" steht immer da. Läuft kein Training, ist der Knopf gesperrt und ein Hinweis im Text sagt, warum.
function einfuehrungWaehlen() {
  const knoepfe = [];
  const wahl = function (text, bereich, aus) {
    knoepfe.push({
      text: text,
      aus: aus,
      aktion: function () {
        einfuehrungStarten(bereich);
      }
    });
  };
  wahl(txt("nav.home"), "home");
  wahl(txt("nav.training"), "training");
  wahl(txt("tour.modus"), "modus", !laufendesTraining);
  knoepfe.push({ text: txt("abbrechen"), art: "leise" });
  frageZeigen(txt("tour.titel"), txt("tour.wahl") + (laufendesTraining ? "" : "\n" + txt("tour.modusHinweis")), knoepfe);
}

// Einen Schritt weiter. Nach dem letzten Schritt ist der Rundgang vorbei.
function einfuehrungWeiter() {
  if (tourIndex >= tourSchritte.length - 1) {
    einfuehrungBeenden();
    return;
  }
  tourIndex = tourIndex + 1;
  einfuehrungAnzeigen();
  einfuehrungEinblenden();
}

// Einen Schritt zurück. Beim ersten Schritt passiert nichts.
function einfuehrungZurueck() {
  if (tourIndex === 0) {
    return;
  }
  tourIndex = tourIndex - 1;
  einfuehrungAnzeigen();
  einfuehrungEinblenden();
}

// Blendet die Box beim Start und bei jedem Schrittwechsel kurz ein. Die Bewegung selbst steht in der style.css (".tour-box.frisch").
// Die Klasse wird weggenommen und neu gesetzt. Dazwischen liest offsetWidth die Box einmal aus, sonst startet das Einblenden nicht neu.
function einfuehrungEinblenden() {
  if (!tourSchritte) {
    return;
  }
  tourTeile.box.classList.remove("frisch");
  void tourTeile.box.offsetWidth;
  tourTeile.box.classList.add("frisch");
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

// Zeigt den aktuellen Schritt: Überschrift, Text, Figur und Stand einsetzen, das Element in den Bildschirm holen
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
  // Die Überschrift ist freiwillig. Ohne sie bleibt die Zeile weg.
  const titel = schritt.titel ? (schritt.titel[sprache] || schritt.titel.de || "") : "";
  tourTeile.titel.textContent = titel;
  tourTeile.titel.classList.toggle("versteckt", titel === "");
  tourTeile.text.textContent = schritt.text[sprache] || schritt.text.de;
  // Der Stand: je Schritt ein Punkt, der aktuelle ist hervorgehoben, darunter "1 von 2".
  // Bei mehr als zehn Schritten steht statt der Punkte ein Strich, dessen gefüllter Teil so breit ist wie der Fortschritt.
  const alsStrich = tourSchritte.length > TOUR_PUNKTE_HOECHSTENS;
  let punkte = "";
  if (alsStrich) {
    punkte = '<span class="aktiv" style="width: ' + ((tourIndex + 1) / tourSchritte.length * 100) + '%"></span>';
  } else {
    for (let i = 0; i < tourSchritte.length; i++) {
      punkte += i === tourIndex ? '<span class="aktiv"></span>' : "<span></span>";
    }
  }
  tourTeile.punkte.classList.toggle("strich", alsStrich);
  tourTeile.punkte.innerHTML = punkte;
  tourTeile.zahl.textContent = txt("tour.xVonY", { x: tourIndex + 1, y: tourSchritte.length });
  tourTeile.zurueck.textContent = txt("zurueck");
  tourTeile.zurueck.disabled = tourIndex === 0;
  tourTeile.ende.textContent = letzter ? txt("tour.fertig") : txt("ueberspringen");
  tourTeile.ende.classList.toggle("tour-fertig", letzter);
  // Der Hinweis zur Bedienung steht nur im ersten Schritt
  tourTeile.hinweis.textContent = txt("tour.hinweis");
  tourTeile.hinweis.classList.toggle("versteckt", tourIndex !== 0);

  ziel.scrollIntoView({ block: "center" });
  einfuehrungPlatzieren(ziel);
}

// Die Stelle, an der das Element gerade steht, dazu die Größe des Bildschirms und die Höhe der Box, als ein Text zum Vergleichen
function einfuehrungStand(ziel) {
  const platz = ziel.getBoundingClientRect();
  const flaeche = tourTeile.tour.getBoundingClientRect();
  return [platz.left, platz.top, platz.width, platz.height, flaeche.width, flaeche.height, tourTeile.box.offsetHeight].join(" ");
}

// Der Rahmen folgt dem Element. Solange der Rundgang läuft, vergleicht jedes neu gezeichnete Bild die Stelle des Elements
// mit der zuletzt gemessenen. Hat sich etwas bewegt (die Seite ist gerückt, ein Text bricht anders um, die Schrift ist jetzt geladen,
// eine Einblendung läuft noch, die Tastatur geht zu), kommt das Element wieder in den Bildschirm und alles wird neu platziert.
function einfuehrungFolgen() {
  if (!tourSchritte) {
    return;
  }
  const ziel = einfuehrungZiel(tourSchritte[tourIndex]);
  if (ziel && einfuehrungStand(ziel) !== tourStand) {
    ziel.scrollIntoView({ block: "center" });
    einfuehrungPlatzieren(ziel);
  }
  tourFolgt = requestAnimationFrame(einfuehrungFolgen);
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
  const obereGrenze = frei.oben + TOUR_BOX_RAND;
  const untereGrenze = hoehe - frei.unten - TOUR_BOX_RAND;

  // Ein hohes Element (z. B. der Wochenplan) steht nach dem Hereinholen in der Mitte, die Box passt dann weder darunter
  // noch darüber. Haben Element und Box zusammen Platz, rückt die Seite so weit, dass das Element oben und die Box darunter steht.
  // Oben bleibt dabei der Platz der schmalen Kopfzeile frei, sonst läge sie über dem Element.
  let platz = ziel.getBoundingClientRect();
  const gesamt = platz.height + 2 * TOUR_LUFT + TOUR_ABSTAND + boxHoehe;
  const raum = untereGrenze - obereGrenze - TOUR_KOPFZEILE;
  if (gesamt <= raum
    && platz.bottom + TOUR_LUFT + TOUR_ABSTAND + boxHoehe > untereGrenze
    && platz.top - TOUR_LUFT - TOUR_ABSTAND - boxHoehe < obereGrenze) {
    window.scrollBy(0, platz.top - TOUR_LUFT - (obereGrenze + TOUR_KOPFZEILE + (raum - gesamt) / 2));
    platz = ziel.getBoundingClientRect();
  }

  // Der Rahmen um das Element, mit etwas Luft. Er bleibt im Bildschirm.
  const links = Math.max(platz.left - TOUR_LUFT, TOUR_RAND);
  const rechts = Math.min(platz.right + TOUR_LUFT, breite - TOUR_RAND);
  let oben = Math.max(platz.top - TOUR_LUFT, TOUR_RAND);
  let unten = Math.min(platz.bottom + TOUR_LUFT, hoehe - TOUR_RAND);

  // Auf einem sehr niedrigen Bildschirm wird die Box nur so hoch wie der Bildschirm, der Text scrollt dann in ihr
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
  tourStand = einfuehrungStand(ziel);
}

// ---------- Prüfung ----------

// Prüft alle Schritte und nennt die, bei denen etwas nicht stimmt: kein Element mit dem Namen, Element nicht zu sehen,
// unbekannte Pose, fehlender Text oder eine Überschrift, die nicht in jeder Sprache da ist. Gedacht für die Konsole des Browsers: einfuehrungPruefen()
// Die Prüfung wechselt dabei durch die Seiten der App und kehrt am Ende zur Seite von vorher zurück.
// Schritte, deren Element es gerade zu Recht nicht gibt (Feld "braucht": keine Routine, kein laufendes Training, keine Erklärung),
// stehen als Hinweis in der Konsole und sind kein Fehler. Wer alles prüfen will, ruft die Funktion im laufenden Training auf.
// Zurück kommt die Liste der Fehler. Sie ist leer, wenn alles stimmt.
function einfuehrungPruefen() {
  const seiteVorher = aktiveSeite;
  const fehler = [];
  // Schritte, die gerade zu Recht fehlen (keine Routine, kein Training, keine Erklärung): nur ein Hinweis, kein Fehler
  const hinweise = [];
  tourBereich = "training";
  tourVorher = { ansicht: trainingAnsicht, reiter: trainingReiter };
  tourLeise = true;
  for (let i = 0; i < EINFUEHRUNG_SCHRITTE.length; i++) {
    const schritt = EINFUEHRUNG_SCHRITTE[i];
    const probleme = [];
    let fehlt = false;
    if (schritt.braucht && !EINFUEHRUNG_BRAUCHT[schritt.braucht]) {
      probleme.push("braucht \"" + schritt.braucht + "\" gibt es nicht");
    } else if (schritt.braucht && !EINFUEHRUNG_BRAUCHT[schritt.braucht]()) {
      fehlt = true;
      hinweise.push({ nummer: i + 1, bereich: schritt.bereich, ziel: schritt.ziel, hinweis: "gerade nicht prüfbar, braucht: " + schritt.braucht });
    }
    if (fehlt || probleme.length > 0) {
      // Das Element gibt es in diesem Zustand nicht, geprüft werden nur Pose und Texte
    } else if (!document.querySelector('[data-tour="' + schritt.ziel + '"]')) {
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
      // Die Überschrift darf fehlen. Gibt es sie, dann in jeder Sprache.
      if (schritt.titel && !schritt.titel[SPRACHEN[s].id]) {
        probleme.push("Überschrift fehlt: " + SPRACHEN[s].id);
      }
    }
    if (probleme.length > 0) {
      fehler.push({ nummer: i + 1, bereich: schritt.bereich, ziel: schritt.ziel, problem: probleme.join(", ") });
    }
  }
  // Im Training wieder Ansicht und Reiter von vorher, dann die Seite von vorher
  if (aktiveSeite !== "training") {
    seiteZeigen("training");
  }
  einfuehrungAufraeumen();
  if (aktiveSeite !== seiteVorher) {
    seiteZeigen(seiteVorher);
  }
  tourLeise = false;
  if (hinweise.length > 0) {
    console.log("Einführung: " + hinweise.length + " Schritte sind in diesem Zustand nicht prüfbar");
    console.table(hinweise);
  }
  if (fehler.length === 0) {
    console.log("Einführung: " + (EINFUEHRUNG_SCHRITTE.length - hinweise.length) + " von " + EINFUEHRUNG_SCHRITTE.length + " Schritten geprüft, alle in Ordnung");
  } else {
    console.table(fehler);
  }
  return fehler;
}
