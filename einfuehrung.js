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
// für den Fortschritt fortschrittGruppe und fortschrittUebungenAnzeigen, für das Profil profilReiter und profilReiterAnzeigen, für die Einstellungen einstOeffnen, einstZeigen und einstAnsicht, für das Angebot frageZeigen, gespeichertLesen und sicherSpeichern. Alles erst, wenn ein Rundgang startet oder angeboten wird.
// Nur die Erkennung, ob die App neu ist (tourAppNeu), läuft schon beim Laden und liest dafür direkt den Speicher.
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
// Nur bei Schritten auf der Seite "profil":
//   reiter:  "abzeichen". Rang, "Teilen" und Abzeichen liegen im dritten Reiter, für diese Schritte schaltet der Rundgang dorthin.
//            Am Ende steht wieder der Reiter von vorher. Darf fehlen: Dann bleibt der Reiter, wie er ist.
// Nur bei Schritten in den Einstellungen:
//   ort:     "einstellungen". Die Einstellungen sind keine Seite, sondern ein fester Bereich über dem Profil (#einst-sheet) mit eigenem
//            Scrollbereich. Für diese Schritte öffnet der Rundgang sie und zeigt die Übersicht, am Ende bleiben sie offen.
// Bei allen Schritten:
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
      de: "Hier zählt die App, wie viel du diese Woche trainiert hast: Volumen, Workouts und Wiederholungen, gemessen an deinem Wochenziel.",
      en: "Here the app counts how much you trained this week: volume, workouts and reps, measured against your weekly goal."
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
      de: "Trag hier Gewicht und Wiederholungen ein, die Knöpfe darunter machen es schneller. Kennt die App die Übung schon, steht hier ein Vorschlag.",
      en: "Enter your weight and reps here, the buttons below make it faster. Once the app knows the exercise, you'll see a suggestion here."
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
  },
  {
    bereich: "fortschritt",
    seite: "fortschritt",
    ziel: "fortschritt-statistik",
    pose: "winken",
    titel: {
      de: "Dein Fortschritt",
      en: "Your progress"
    },
    text: {
      de: "Hier zählt die App alles zusammen, was du bisher trainiert hast.",
      en: "Here the app adds up everything you have trained so far."
    }
  },
  {
    bereich: "fortschritt",
    seite: "fortschritt",
    ziel: "fortschritt-gewicht",
    pose: "zeigen",
    titel: {
      de: "Körpergewicht",
      en: "Body weight"
    },
    text: {
      de: "Diese Karte zeigt, wie sich dein Gewicht mit der Zeit verändert.",
      en: "This card shows how your weight changes over time."
    }
  },
  {
    bereich: "fortschritt",
    seite: "fortschritt",
    ziel: "fortschritt-eintragen",
    pose: "zeigen",
    titel: {
      de: "Gewicht eintragen",
      en: "Log weight"
    },
    text: {
      de: "Tippe hier, um dein Gewicht einzutragen. Weiter unten geht dasselbe für dein Körperfett.",
      en: "Tap here to log your weight. Further down you can do the same for your body fat."
    }
  },
  {
    bereich: "fortschritt",
    seite: "fortschritt",
    ziel: "fortschritt-veraenderung",
    braucht: "veraenderung",
    pose: "zeigen",
    titel: {
      de: "Veränderung",
      en: "Change"
    },
    text: {
      de: "Diese Kacheln zeigen, ob dein Gewicht in den letzten Tagen gestiegen oder gefallen ist.",
      en: "These tiles show whether your weight went up or down over the last days."
    }
  },
  {
    // Das Ziel setzt die app.js: ohne Einträge der Hinweis, mit Einträgen die erste Muskelgruppe (fortschrittUebungenAnzeigen)
    bereich: "fortschritt",
    seite: "fortschritt",
    ziel: "fortschritt-kraft",
    pose: "jubeln",
    titel: {
      de: "Deine Kraft",
      en: "Your strength"
    },
    text: {
      de: "Hier siehst du, bei welchen Übungen du stärker wirst. Trag dafür einfach dein Training ein.",
      en: "Here you see in which exercises you get stronger. Just log your workouts for that."
    }
  },
  {
    bereich: "profil",
    seite: "profil",
    ziel: "profil-person",
    pose: "winken",
    titel: {
      de: "Dein Profil",
      en: "Your profile"
    },
    text: {
      de: "Das bist du. Über „Profil bearbeiten“ trägst du deinen Namen ein.",
      en: "This is you. Use “Edit profile” to enter your name."
    }
  },
  {
    bereich: "profil",
    seite: "profil",
    ziel: "profil-zahnrad",
    pose: "zeigen",
    titel: {
      de: "Einstellungen",
      en: "Settings"
    },
    text: {
      de: "Hinter dem Zahnrad findest du Sprache, Design und dein Backup.",
      en: "Behind the gear you find language, design and your backup."
    }
  },
  {
    bereich: "profil",
    seite: "profil",
    ziel: "profil-raster",
    pose: "zeigen",
    titel: {
      de: "Aktivität",
      en: "Activity"
    },
    text: {
      de: "Jedes Feld ist ein Tag. Je kräftiger die Farbe, desto mehr hast du trainiert.",
      en: "Each square is a day. The stronger the colour, the more you trained."
    }
  },
  {
    bereich: "profil",
    seite: "profil",
    ziel: "profil-reiter",
    pose: "zeigen",
    titel: {
      de: "Drei Ansichten",
      en: "Three views"
    },
    text: {
      de: "Hier wechselst du zwischen Verlauf, Statistik und Abzeichen.",
      en: "Switch here between history, stats and badges."
    }
  },
  {
    bereich: "profil",
    seite: "profil",
    reiter: "abzeichen",
    ziel: "profil-rang",
    pose: "zeigen",
    titel: {
      de: "Dein Rang",
      en: "Your rank"
    },
    text: {
      de: "Der Rang vergleicht deine Kraft mit deinem Körpergewicht. Er steigt, wenn du stärker wirst.",
      en: "Your rank compares your strength to your body weight. It rises as you get stronger."
    }
  },
  {
    bereich: "profil",
    seite: "profil",
    reiter: "abzeichen",
    ziel: "profil-teilen",
    pose: "zeigen",
    titel: {
      de: "Teilen",
      en: "Share"
    },
    text: {
      de: "Mit „Teilen“ wird aus deinem Rang ein Bild zum Verschicken. Das geht, sobald du einen Rang hast.",
      en: "“Share” turns your rank into a picture to send. It works once you have a rank."
    }
  },
  {
    bereich: "profil",
    seite: "profil",
    reiter: "abzeichen",
    ziel: "profil-abzeichen",
    pose: "jubeln",
    titel: {
      de: "Abzeichen",
      en: "Badges"
    },
    text: {
      de: "Abzeichen bekommst du für besondere Erfolge. Graue Abzeichen fehlen dir noch.",
      en: "You earn badges for special achievements. Grey badges are still missing."
    }
  },
  {
    bereich: "einstellungen",
    seite: "profil",
    ort: "einstellungen",
    ziel: "einst-konto",
    pose: "winken",
    titel: {
      de: "Einstellungen",
      en: "Settings"
    },
    text: {
      de: "Hier stellst du die App ein. Unter „Profil“ stehen dein Name und deine Angaben.",
      en: "Here you set up the app. “Profile” holds your name and details."
    }
  },
  {
    bereich: "einstellungen",
    seite: "profil",
    ort: "einstellungen",
    ziel: "einst-allgemein",
    pose: "zeigen",
    titel: {
      de: "App anpassen",
      en: "Customize"
    },
    text: {
      de: "Hier wählst du Einheiten, Design und Sprache der App.",
      en: "Choose units, design and language of the app here."
    }
  },
  {
    bereich: "einstellungen",
    seite: "profil",
    ort: "einstellungen",
    ziel: "einst-pause",
    pose: "zeigen",
    titel: {
      de: "Standard-Pause",
      en: "Default rest"
    },
    text: {
      de: "So lang ist die Pause nach einem Satz, wenn du bei der Übung nichts anderes einstellst.",
      en: "This is how long you rest after a set unless the exercise says otherwise."
    }
  },
  {
    bereich: "einstellungen",
    seite: "profil",
    ort: "einstellungen",
    ziel: "einst-daten",
    pose: "zeigen",
    titel: {
      de: "Deine Daten",
      en: "Your data"
    },
    text: {
      de: "Deine Daten liegen nur auf diesem Gerät. Ein Backup sichert sie als Datei.",
      en: "Your data lives only on this device. A backup saves it as a file."
    }
  },
  {
    bereich: "einstellungen",
    seite: "profil",
    ort: "einstellungen",
    ziel: "einst-support",
    pose: "jubeln",
    titel: {
      de: "Hilfe",
      en: "Help"
    },
    text: {
      de: "Hier findest du Antworten auf häufige Fragen. Unter „Anleitung“ zeige ich dir jeden Bereich noch einmal.",
      en: "Here you find answers to common questions. Under “Guide” I show you every part again."
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

// Um so viele Pixel hat die Absicherung die letzte Platzierung nach unten gerückt (einfuehrungAbweichung). Sonst 0.
let tourSchub = 0;

// Für die Diagnose-Anzeige: der Schritt, zu dem "vorher" gehört, und wie die Seite vor dem Wechsel zu ihm stand
let tourDiagnoseIndex = -1;
let tourDiagnoseVorher = null;
// Die Zeitpunkte der letzten Tipps auf die Version (einfuehrungDiagnoseTipp)
let tourDiagnoseTipps = [];

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
  },
  // Die Kacheln "Veränderung": Der Look Korund (seit Version 141, nur Glass im dunklen Design) blendet sie aus,
  // solange es kein Körpergewicht gibt. In allen anderen Looks sind sie immer da.
  veraenderung: function () {
    const html = document.documentElement;
    const dunkel = html.getAttribute("data-design") === "dunkel"
      || (html.getAttribute("data-design") !== "hell" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const korund = html.getAttribute("data-stil") === "glass" && html.getAttribute("data-palette") === "korund" && dunkel;
    // Seit Version 143 stehen dort im Look Korund statt der Kacheln Körperfett und Magermasse, der Schritt entfällt
    return !korund;
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
  const einst = document.getElementById("einst-sheet");
  const inEinst = schritt.ort === "einstellungen";
  if (!inEinst && einst.classList.contains("offen")) {
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
  // Der Rundgang über den Fortschritt erklärt die Liste der Muskelgruppen: Ist gerade eine Gruppe geöffnet, geht es zurück zur Liste.
  // Das ändert nur die Ansicht, gespeichert wird die geöffnete Gruppe nie.
  if (schritt.seite === "fortschritt" && fortschrittGruppe !== "") {
    fortschrittGruppe = "";
    fortschrittUebungenAnzeigen();
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
  // Ein Schritt in den Einstellungen: Sie gehen auf und zeigen die Übersicht. Das Einfahren (0,45 Sekunden) wird dafür ausgelassen,
  // sonst wanderte der Rahmen mit. Das ändert nur die Ansicht, gespeichert wird dabei nichts.
  if (inEinst) {
    if (!einst.classList.contains("offen")) {
      einst.style.transition = "none";
      einstOeffnen();
      void einst.offsetWidth;
      einst.style.transition = "";
    }
    if (einstAnsicht !== "haupt") {
      einstZeigen("haupt");
    }
  }
  // Rang, "Teilen" und Abzeichen liegen im Profil im dritten Reiter. Das ändert nur die Ansicht, der Reiter wird nie gespeichert.
  if (schritt.seite === "profil" && schritt.reiter && profilReiter !== schritt.reiter) {
    profilReiter = schritt.reiter;
    profilReiterAnzeigen();
  }
  // Im Look Korund liegen Rang und "Teilen" auf der eigenen Seite Kraftrang (seit Version 143)
  if (schritt.seite === "profil" && typeof profilKraftrangFuer === "function") {
    profilKraftrangFuer(schritt.ziel);
  }
  // Im Look Korund sind die Vorlagen eingeklappt (seit Version 142): Der Schritt dazu klappt sie auf, danach klappt einfuehrungAufraeumen sie wieder zu
  if (schritt.ziel === "training-vorlagen") {
    document.getElementById("reiter-plaene").classList.add("vorlagen-offen");
  }
  // Im Look Korund hat der Fortschritt Reiter (seit Version 142): Der Rundgang stellt den Reiter ein, in dem das Ziel steht
  if (schritt.seite === "fortschritt" && typeof fortschrittReiterFuer === "function") {
    fortschrittReiterFuer(schritt.ziel);
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
    // Es läuft keine Pause: Als Zeit steht die Pausenlänge der aktuellen Übung da, sie läuft nicht herunter.
    // Hat die Übung "Keine Pause", steht die Standard-Pause da statt 0:00.
    document.getElementById("modus-countdown").textContent = pauseText(pauseDauer(laufendesTraining.uebungen[laufendesTraining.index]) || pauseStandard());
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
  tourVorher = { ansicht: trainingAnsicht, reiter: trainingReiter, profilReiter: profilReiter, einstOffen: document.getElementById("einst-sheet").classList.contains("offen"), vorlagenOffen: document.getElementById("reiter-plaene").classList.contains("vorlagen-offen") };
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
  tourDiagnoseIndex = -1;
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
  einfuehrungEbene(null);
  document.body.classList.remove("tour-offen");
  document.removeEventListener("keydown", einfuehrungTaste, true);
  if (tourTeile.kontrolle) {
    tourTeile.kontrolle.style.display = "none";
  }
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
  // Nach dem Rundgang durch die Einstellungen bleiben sie offen. Hat nur die Prüfung sie geöffnet, gehen sie wieder zu.
  if (tourBereich !== "einstellungen" && tourVorher && !tourVorher.einstOffen && document.getElementById("einst-sheet").classList.contains("offen")) {
    einstSchliessen();
  }
  // Die Vorlagen sind wieder zu, wenn sie vorher zu waren (seit Version 145, sonst stand „Vorlagen“ im Look Korund doppelt da)
  if (tourVorher && !tourVorher.vorlagenOffen) {
    document.getElementById("reiter-plaene").classList.remove("vorlagen-offen");
  }
  // Im Look Korund ist danach die Seite Kraftrang wieder zu (seit Version 143)
  if (typeof profilKraftrangFuer === "function") {
    profilKraftrangFuer("");
  }
  // Im Profil steht wieder der Reiter von vorher
  if (tourVorher && profilReiter !== tourVorher.profilReiter) {
    profilReiter = tourVorher.profilReiter;
    if (aktiveSeite === "profil") {
      profilReiterAnzeigen();
    }
  }
  tourBereich = "";
  tourVorher = null;
}

// Läuft gerade ein Rundgang, oder blättert die Einführung selbst durch die Seiten (beim Start und in der Prüfung)?
// Die app.js fragt das, bevor sie beim Anzeigen etwas speichern würde (der Merker der Ränge im Reiter "Abzeichen").
function einfuehrungLaeuft() {
  return Boolean(tourSchritte) || tourLeise;
}

// ---------- Angebot und Anleitung ----------

// Die Schlüssel, die die App im Speicher anlegt. Liegt keiner davon im Speicher, ist die App neu.
// Gezählt wird nicht localStorage.length: Auf GitHub Pages teilen sich alle Projekte unter einer Adresse einen Speicher.
const EINFUEHRUNG_APP_SCHLUESSEL = ["eintraege", "eintraegeKaputt", "eintraegeKaputt2", "routinen", "wochenplan", "laufendesTraining",
  "einstellungen", "profil", "pause", "trainings", "koerpergewicht", "eigeneUebungen", "geloeschteEigengewicht", "letztesBackup",
  "backupHinweisWeg", "einfuehrungGesehen", "einfuehrungDiagnose", "einfuehrungVariante", "notizen"];

// Ist die App neu (allererster Start, noch nichts im Speicher)? Einmal beim Laden festgehalten, denn die einfuehrung.js
// lädt vor der app.js, und deren Start schreibt sofort etwas in den Speicher (z. B. den Merker der Ränge).
// Lässt sich der Speicher nicht lesen, gilt die App als nicht neu: Dann kommt kein Angebot.
const tourAppNeu = (function () {
  try {
    for (let i = 0; i < EINFUEHRUNG_APP_SCHLUESSEL.length; i++) {
      if (localStorage.getItem(EINFUEHRUNG_APP_SCHLUESSEL[i]) !== null) {
        return false;
      }
    }
    return true;
  } catch (fehler) {
    return false;
  }
})();

// Die Rundgänge "training", "fortschritt", "profil", "einstellungen" und "modus" bietet die App von selbst an: beim ersten Öffnen
// des Training-Tabs, des Fortschritt-Tabs, des Profil-Tabs und der Einstellungen (nur ihrer Übersicht) und beim ersten gestarteten Training. Was schon war, steht im Speicher unter "einfuehrungGesehen", je Bereich
// { gesehen: true } oder { angeboten: 1 }. Der Merker steht absichtlich nicht in den Einstellungen:
// Die gehen ganz ins Backup, der Merker gehört nicht hinein.
// "home" bietet die App nur beim Start an und nur neuen Nutzern: wenn die App neu ist (tourAppNeu) oder es schon einen Eintrag "home"
// gibt (nach "Später" oder nach "Alle zurücksetzen"). Bestandsnutzer bekommen nie von selbst einen Eintrag "home".
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
// Schalter: Bietet die App den Rundgang durch den Trainingsmodus nach dem Start eines Trainings von selbst an?
// In Version 107 und 108 war es aus (false), bis der Rahmen auf dem iPhone sicher stimmte. Seit Version 109 ist es wieder an (true).
// Über Einstellungen → Support → "Anleitung" lässt sich der Rundgang mit laufendem Training immer starten.
const TOUR_MODUS_ANBIETEN = true;

// Die app.js ruft das auf, am Ende des Starts ohne laufendes Training ("home"), wenn der Training-Tab aufgeht ("training"), wenn der Fortschritt-Tab aufgeht ("fortschritt"),
// wenn der Profil-Tab aufgeht ("profil"), wenn die Übersicht der Einstellungen aufgeht ("einstellungen") und wenn ein Training neu startet ("modus").
// Gefragt wird erst, wenn die App damit fertig ist: Beim Start eines Trainings von Home aus geht erst der Tab auf
// und dann der Trainingsmodus, die Frage soll zu dem passen, was am Ende zu sehen ist.
function einfuehrungAnbieten(bereich) {
  if (tourSchritte || tourLeise || tourGefragt[bereich] || (bereich === "modus" && !TOUR_MODUS_ANBIETEN)) {
    return;
  }
  setTimeout(function () {
    einfuehrungFragen(bereich);
  }, 0);
}

// Fragt "Kurz zeigen?", wenn der Bereich wirklich zu sehen ist und der Rundgang noch nicht gesehen und
// noch keine zweimal angeboten wurde. "Ja, zeigen" startet ihn, "Später" schließt nur den Dialog.
function einfuehrungFragen(bereich) {
  if (tourSchritte || tourGefragt[bereich] || !startFertig) {
    return;
  }
  if (bereich === "einstellungen") {
    // Die Einstellungen sind keine Seite: Gefragt wird nur, solange sie offen sind und ihre Übersicht zeigen
    if (!document.getElementById("einst-sheet").classList.contains("offen") || einstAnsicht !== "haupt") {
      return;
    }
  } else if (aktiveSeite !== (bereich === "modus" ? "training" : bereich)) {
    // Die Seite des Bereichs: "modus" liegt auf der Seite "training", sonst heißt die Seite wie der Bereich
    return;
  }
  if (bereich === "home" && homeAnsicht !== "home") {
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
  // Home nur für neue Nutzer: Ohne Eintrag "home" fragt die App nur, wenn sie neu ist
  if (bereich === "home" && !tourAppNeu && !merker.home) {
    return;
  }
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

// Die Unterseite "Anleitung" in den Einstellungen (einstZeigen ruft das beim Öffnen auf): Haken für jeden gesehenen Rundgang.
// "Trainingsmodus" steht immer da. Läuft kein Training, ist die Zeile gesperrt und ausgegraut (wie die Zeilen "Bald verfügbar"),
// darunter steht der Hinweis, warum.
function einfuehrungAnleitungAnzeigen() {
  const merker = einfuehrungMerker();
  const haken = document.querySelectorAll("[data-tour-haken]");
  for (let i = 0; i < haken.length; i++) {
    const stand = merker[haken[i].getAttribute("data-tour-haken")];
    haken[i].classList.toggle("versteckt", !(stand && stand.gesehen));
  }
  const modus = document.getElementById("anleitung-modus");
  modus.disabled = !laufendesTraining;
  modus.classList.toggle("bald", !laufendesTraining);
  document.getElementById("anleitung-modus-hinweis").classList.toggle("versteckt", Boolean(laufendesTraining));
}

// "Alle zurücksetzen": fragt nach und löscht dann den Merker. Home bekommt dabei { angeboten: 0 }, damit es wie bei einem
// neuen Nutzer beim nächsten Start wieder angeboten wird. In dieser Sitzung fragt die App nichts mehr von selbst, erst ab dem nächsten Start.
function einfuehrungZuruecksetzenFragen() {
  frageZeigen(txt("tour.titel"), txt("tour.zuruecksetzenFrage"), [
    {
      text: txt("tour.zuruecksetzen"),
      art: "haupt",
      aktion: function () {
        sicherSpeichern("einfuehrungGesehen", { home: { angeboten: 0 } });
        const haken = document.querySelectorAll("[data-tour-haken]");
        for (let i = 0; i < haken.length; i++) {
          tourGefragt[haken[i].getAttribute("data-tour-haken")] = true;
        }
        einfuehrungAnleitungAnzeigen();
      }
    },
    { text: txt("abbrechen"), art: "leise" }
  ]);
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
  // Für die Diagnose-Anzeige: wie die Seite stand, bevor der Rundgang zu diesem Schritt gewechselt hat
  if (tourDiagnoseIndex !== tourIndex) {
    tourDiagnoseIndex = tourIndex;
    tourDiagnoseVorher = { scrollY: window.scrollY, hoehe: document.documentElement.scrollHeight, klassen: document.body.className };
  }
  einfuehrungVorbereiten(schritt);
  einfuehrungEbene(schritt);
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
  return [platz.left, platz.top, platz.width, platz.height, flaeche.left, flaeche.top, flaeche.width, flaeche.height, tourTeile.box.offsetHeight].join(" ");
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

// Hängt das Overlay in der Seite an die Stelle, die gerade zu sehen ist: top und left sind der Scrollstand.
// #tour ist nicht am Bildschirm fest (position: fixed), sondern steht in der Seite wie der Kontroll-Rahmen der Diagnose.
// Erst geht es ganz nach oben: Dort macht es die Seite nie höher, und ein Scrollstand hinter dem Seitenende
// (die Seite ist seit der letzten Platzierung kürzer geworden) rutscht zurück. Tiefer als das Seitenende kommt es nie.
function einfuehrungAnkern() {
  const tour = tourTeile.tour;
  tour.style.top = "0px";
  tour.style.left = "0px";
  // Variante B: #tour hängt in den Einstellungen und deckt sie ganz ab. Die scrollen nur in ihrem Inneren, es bleibt bei 0/0.
  if (tour.parentElement !== document.body) {
    return;
  }
  const seite = document.documentElement;
  tour.style.top = Math.max(Math.min(window.scrollY, seite.scrollHeight - seite.clientHeight), 0) + "px";
  tour.style.left = window.scrollX + "px";
}

// ---------- Probe in Version 111: zwei Varianten für Schritte in den Einstellungen ----------

// Die Einstellungen sind ein fester Bereich (#einst-sheet, position: fixed). In Version 106 hat Safari auf dem iPhone eine feste Ebene
// verschoben gezeichnet, deshalb hängt #tour seit Version 107 in der Seite. Bei einem Ziel in den Einstellungen liegen Ziel (feste Ebene)
// und #tour (Seite) damit wieder in zwei verschiedenen Ebenen. Ob das auf dem iPhone stimmt, zeigt nur das iPhone. Darum gibt es zwei Varianten:
//   A (Standard): #tour hängt in der Seite, wie bei allen anderen Schritten.
//   B:            #tour hängt für diese Schritte in #einst-sheet selbst. Rahmen und Ziel liegen dann in derselben Ebene.
// Umgestellt wird mit den fünf Tipps auf "Version" (einfuehrungDiagnoseTipp). Der Merker steht im Speicher unter dem eigenen
// Schlüssel "einfuehrungVariante" ("b" oder nichts) und nicht im Backup. Nach der Probe bleibt eine Variante, die andere fliegt raus.
function einfuehrungVarianteB() {
  return gespeichertLesen("einfuehrungVariante", "") === "b";
}

// Hängt #tour in die Ebene, in der der Schritt gezeichnet wird: in die Seite (body) oder, in Variante B bei einem Schritt
// in den Einstellungen, in #einst-sheet. schritt = null hängt es zurück in die Seite (am Ende des Rundgangs).
function einfuehrungEbene(schritt) {
  let ebene = document.body;
  if (schritt && schritt.ort === "einstellungen" && einfuehrungVarianteB()) {
    ebene = document.getElementById("einst-sheet");
  }
  if (tourTeile.tour.parentElement !== ebene) {
    ebene.appendChild(tourTeile.tour);
  }
}

// Der Maßstab des Overlays: so viele Pixel des Bildschirms ist ein Pixel in #tour breit (x) und hoch (y). Normal ist das 1.
// Auf zwei Stellen gerundet, weil offsetWidth nur ganze Pixel kennt.
function einfuehrungMassstab() {
  const tour = tourTeile.tour;
  const flaeche = tour.getBoundingClientRect();
  return {
    x: Math.round(flaeche.width / tour.offsetWidth * 100) / 100 || 1,
    y: Math.round(flaeche.height / tour.offsetHeight * 100) / 100 || 1
  };
}

// Das Rechteck eines Elements in den Koordinaten des Overlays: Pixel ab der linken oberen Ecke von #tour, in seinem Maßstab.
// Der Browser misst jedes Element ab der Ecke des Fensters. Liegt #tour einmal nicht genau dort, stimmt die Zeichnung trotzdem,
// weil hier die Stelle von #tour abgezogen wird.
function einfuehrungRechteck(element) {
  const flaeche = tourTeile.tour.getBoundingClientRect();
  const platz = element.getBoundingClientRect();
  const m = einfuehrungMassstab();
  const links = (platz.left - flaeche.left) / m.x;
  const oben = (platz.top - flaeche.top) / m.y;
  return { left: links, top: oben, right: links + platz.width / m.x, bottom: oben + platz.height / m.y, width: platz.width / m.x, height: platz.height / m.y };
}

// Absicherung: Liegt an der gemessenen Stelle wirklich das Element (oder ein Teil von ihm)? Geprüft werden zwei Punkte
// auf der senkrechten Mittellinie, je 2 px innerhalb der oberen und der unteren Kante: So fällt auch ein kleiner Versatz
// bei einem hohen Element auf. Liegt an beiden das Element, kommt 0 zurück. Wenn nicht, sucht die Funktion es auf dieser Linie,
// alle 2 px über die ganze Höhe des Fensters. Findet sie es dort gleich hoch wie gemessen, kommt zurück, um wie viele Pixel
// es tiefer (plus) oder höher (minus) liegt. Findet sie es nicht oder nur ein Stück davon (z. B. weil etwas darüber liegt),
// kommt 0 zurück: Dann bleibt die Messung gültig.
function einfuehrungAbweichung(ziel) {
  const platz = ziel.getBoundingClientRect();
  const oben = Math.max(platz.top, 0);
  const unten = Math.min(platz.bottom, window.innerHeight);
  const x = (Math.max(platz.left, 0) + Math.min(platz.right, window.innerWidth)) / 2;
  if (unten <= oben) {
    return 0;
  }
  // Für die Probe lässt #tour die Punkte durch, sonst läge immer #tour selbst an der Stelle
  tourTeile.tour.style.pointerEvents = "none";
  const trifft = function (y) {
    const gefunden = document.elementFromPoint(x, y);
    return Boolean(gefunden) && (gefunden === ziel || ziel.contains(gefunden));
  };
  let abweichung = 0;
  if (!trifft(Math.min(oben + 2, (oben + unten) / 2)) || !trifft(Math.max(unten - 2, (oben + unten) / 2))) {
    let erster = -1;
    let letzter = -1;
    for (let y = 0; y < window.innerHeight; y += 2) {
      if (trifft(y)) {
        if (erster === -1) {
          erster = y;
        }
        letzter = y;
      }
    }
    if (erster !== -1 && Math.abs((letzter - erster) - (unten - oben)) <= 8) {
      abweichung = Math.round((erster + letzter) / 2 - (oben + unten) / 2);
    }
  }
  tourTeile.tour.style.pointerEvents = "";
  return abweichung;
}

// Rechnet aus, wo Aussparung, Rahmen, Linie und Box stehen. Alle Werte sind Pixel ab der linken oberen Ecke des Overlays (#tour),
// nicht des Fensters: einfuehrungRechteck rechnet die Messwerte um. schub kommt nur von der Absicherung am Ende:
// Um so viele Pixel wird das gemessene Rechteck nach unten gerückt.
function einfuehrungPlatzieren(ziel, schub) {
  einfuehrungAnkern();
  const flaeche = tourTeile.tour.getBoundingClientRect();
  const massstab = einfuehrungMassstab();
  const breite = flaeche.width / massstab.x;
  const hoehe = flaeche.height / massstab.y;

  // Notch und Home-Balken: Die style.css legt sie als Innenabstand an #tour, hier werden sie in Pixeln gelesen
  const stil = getComputedStyle(tourTeile.tour);
  const frei = {
    oben: parseFloat(stil.paddingTop) || 0,
    rechts: parseFloat(stil.paddingRight) || 0,
    unten: parseFloat(stil.paddingBottom) || 0,
    links: parseFloat(stil.paddingLeft) || 0
  };

  // Die Box: so breit wie der Inhalt der Seite, mit 16 px Rand
  const seite = einfuehrungRechteck(document.body);
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
  let platz = einfuehrungRechteck(ziel);
  const gesamt = platz.height + 2 * TOUR_LUFT + TOUR_ABSTAND + boxHoehe;
  // In den Einstellungen rückt ihr eigener Scrollbereich, und frei bleibt der Platz ihrer Kopfzeile: Der Scrollbereich beginnt erst darunter
  const roller = ziel.closest("#einst-inhalt");
  const kopfzeile = roller ? Math.max(einfuehrungRechteck(roller).top - obereGrenze, 0) : TOUR_KOPFZEILE;
  const raum = untereGrenze - obereGrenze - kopfzeile;
  if (schub === undefined && gesamt <= raum
    && platz.bottom + TOUR_LUFT + TOUR_ABSTAND + boxHoehe > untereGrenze
    && platz.top - TOUR_LUFT - TOUR_ABSTAND - boxHoehe < obereGrenze) {
    (roller || window).scrollBy(0, (platz.top - TOUR_LUFT - (obereGrenze + kopfzeile + (raum - gesamt) / 2)) * massstab.y);
    einfuehrungAnkern();
    platz = einfuehrungRechteck(ziel);
  }
  if (schub) {
    platz = { left: platz.left, right: platz.right, top: platz.top + schub / massstab.y, bottom: platz.bottom + schub / massstab.y };
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
  tourSchub = schub || 0;

  // Absicherung, nur beim ersten Durchgang: Liegt das Element nicht dort, wo es gemessen wurde, noch einmal mit der Abweichung zeichnen
  if (schub === undefined) {
    const abweichung = einfuehrungAbweichung(ziel);
    if (abweichung !== 0) {
      einfuehrungPlatzieren(ziel, abweichung);
      return;
    }
  }
  einfuehrungDiagnoseZeigen(ziel, frei, boxOben + boxHoehe / 2 > hoehe / 2);
}

// ---------- Diagnose-Anzeige (nur für die Fehlersuche) ----------

// Ist die Diagnose-Anzeige eingeschaltet? Der Merker steht im Speicher unter dem eigenen Schlüssel "einfuehrungDiagnose",
// nicht in den Einstellungen: So kommt er nicht ins Backup. Ohne Eintrag ist sie aus.
function einfuehrungDiagnoseAn() {
  return gespeichertLesen("einfuehrungDiagnose", false) === true;
}

// Der Zusatz hinter der Versionsnummer in Einstellungen → Über, solange die Diagnose-Anzeige an ist
function einfuehrungDiagnoseText() {
  if (!einfuehrungDiagnoseAn()) {
    return "";
  }
  return einfuehrungVarianteB() ? " · Diagnose B" : " · Diagnose";
}

// Ein Tipp auf die Zeile "Version" in Einstellungen → Über. Fünf Tipps innerhalb von drei Sekunden schalten weiter:
// aus → Diagnose (Variante A) → Diagnose B (Variante B, siehe einfuehrungVarianteB) → aus. Ohne Diagnose gilt immer Variante A.
function einfuehrungDiagnoseTipp() {
  const jetzt = Date.now();
  tourDiagnoseTipps.push(jetzt);
  tourDiagnoseTipps = tourDiagnoseTipps.filter(function (zeit) {
    return jetzt - zeit < 3000;
  });
  if (tourDiagnoseTipps.length < 5) {
    return;
  }
  tourDiagnoseTipps = [];
  if (!einfuehrungDiagnoseAn()) {
    sicherSpeichern("einfuehrungDiagnose", true);
    sicherSpeichern("einfuehrungVariante", "");
  } else if (!einfuehrungVarianteB()) {
    sicherSpeichern("einfuehrungVariante", "b");
  } else {
    sicherSpeichern("einfuehrungDiagnose", false);
    sicherSpeichern("einfuehrungVariante", "");
  }
  document.getElementById("ueber-version").textContent = appVersion() + einfuehrungDiagnoseText();
}

// Schreibt die Diagnose-Anzeige: ein kleiner Text im Overlay mit allen Maßen, die den Sitz des Rahmens bestimmen,
// und ein gestrichelter Kontroll-Rahmen. Der Kontroll-Rahmen hängt für sich in der Seite,
// an der gemessenen Stelle des Elements (seit Version 107 hängt auch #tour in der Seite, die Zeile "anker" zeigt wo). Liegt er auf einem Screenshot auf dem Element und der grüne Rahmen daneben,
// stimmt die Messung und der Browser zeichnet #tour verschoben. Liegen beide zusammen daneben, stimmt die Messung nicht.
// frei: Notch und Home-Balken in Pixeln. oben: true stellt den Text an den oberen Rand (die Box steht dann unten).
function einfuehrungDiagnoseZeigen(ziel, frei, oben) {
  if (!einfuehrungDiagnoseAn()) {
    if (tourTeile.diagnose) {
      tourTeile.diagnose.style.display = "none";
      tourTeile.kontrolle.style.display = "none";
    }
    return;
  }
  if (!tourTeile.diagnose) {
    tourTeile.diagnose = document.createElement("pre");
    tourTeile.diagnose.className = "tour-diagnose";
    tourTeile.tour.appendChild(tourTeile.diagnose);
    tourTeile.kontrolle = document.createElement("div");
    tourTeile.kontrolle.className = "tour-kontrolle";
    document.body.appendChild(tourTeile.kontrolle);
  }
  const rund = function (wert) {
    return Math.round(wert * 10) / 10;
  };
  const rechteck = function (r) {
    return rund(r.left) + "," + rund(r.top) + " " + rund(r.width) + "x" + rund(r.height);
  };
  // Ein Element kurz benannt: Tag mit id oder erster Klasse
  const kurz = function (element) {
    let text = element.tagName.toLowerCase();
    if (element.id) {
      text += "#" + element.id;
    } else if (element.classList.length > 0) {
      text += "." + element.classList[0];
    }
    return text;
  };

  // Alle Vorfahren des Elements, die scrollen können oder gescrollt sind
  const scroller = [];
  for (let e = ziel.parentElement; e; e = e.parentElement) {
    const kann = e.scrollHeight > e.clientHeight + 1 && /auto|scroll/.test(getComputedStyle(e).overflowY);
    if (kann || e.scrollTop !== 0) {
      scroller.push(kurz(e) + ":" + rund(e.scrollTop));
    }
  }

  // Was liegt in der Mitte des gemessenen Rechtecks, wenn man durch #tour hindurchschaut?
  // Genannt wird der Name aus data-tour, sonst Tag mit id oder Klasse.
  const platz = ziel.getBoundingClientRect();
  tourTeile.tour.style.pointerEvents = "none";
  const gefunden = document.elementFromPoint(platz.left + platz.width / 2, platz.top + platz.height / 2);
  tourTeile.tour.style.pointerEvents = "";
  const trifft = Boolean(gefunden) && (gefunden === ziel || ziel.contains(gefunden));
  let punkt = "nichts";
  if (gefunden) {
    const mitNamen = gefunden.closest("[data-tour]");
    punkt = mitNamen ? mitNamen.getAttribute("data-tour") : kurz(gefunden);
  }

  const schritt = tourSchritte[tourIndex];
  const vorher = tourDiagnoseVorher || { scrollY: 0, hoehe: 0, klassen: "" };
  const sicht = window.visualViewport;
  const zeilen = [
    // Am Ende der Zeile: die Variante (A = #tour in der Seite, B = #tour in den Einstellungen) und die Ebene, in der #tour gerade hängt
    "v" + appVersion() + " " + tourBereich + " " + (tourIndex + 1) + "/" + tourSchritte.length + " " + schritt.ziel
      + " var " + (einfuehrungVarianteB() ? "B" : "A") + " in " + kurz(tourTeile.tour.parentElement),
    "fenster " + window.innerWidth + "x" + window.innerHeight + " doc " + document.documentElement.clientWidth + "x" + document.documentElement.clientHeight,
    sicht ? "vv " + rund(sicht.width) + "x" + rund(sicht.height) + " oT " + rund(sicht.offsetTop) + " oL " + rund(sicht.offsetLeft)
      + " pT " + rund(sicht.pageTop) + " z " + rund(sicht.scale) : "vv fehlt",
    "scrollY " + rund(window.scrollY) + " vorher " + rund(vorher.scrollY),
    "seitenhoehe " + document.documentElement.scrollHeight + " vorher " + vorher.hoehe,
    "body [" + document.body.className + "]",
    "vorher [" + vorher.klassen + "]",
    "scroller " + (scroller.join(" ") || "keine"),
    "safe oben " + rund(frei.oben) + " unten " + rund(frei.unten),
    "tour " + rechteck(tourTeile.tour.getBoundingClientRect()),
    // Der Anker von #tour in der Seite: Art der Position, gesetzte Stelle (left/top), Scrollstand (x/y),
    // Stelle und Größe in der Seite und das Bezugs-Element ("-" heißt: die Seite selbst)
    "anker " + getComputedStyle(tourTeile.tour).position + " " + rund(parseFloat(tourTeile.tour.style.left)) + "/" + rund(parseFloat(tourTeile.tour.style.top))
      // scr: Scrollstand der Seite (x/y). Liegt das Ziel in den Einstellungen, steht dahinter der Scrollstand ihres Scrollbereichs und wie weit er höchstens geht
      + " scr " + rund(window.scrollX) + "/" + rund(window.scrollY)
      + (ziel.closest("#einst-inhalt") ? " e" + rund(ziel.closest("#einst-inhalt").scrollTop) + "/" + (ziel.closest("#einst-inhalt").scrollHeight - ziel.closest("#einst-inhalt").clientHeight) : "")
      + " off " + tourTeile.tour.offsetLeft + "/" + tourTeile.tour.offsetTop + " " + tourTeile.tour.offsetWidth + "x" + tourTeile.tour.offsetHeight
      + " " + (tourTeile.tour.offsetParent ? kurz(tourTeile.tour.offsetParent) : "-"),
    "ziel " + rechteck(platz),
    "rahmen " + rechteck(tourTeile.rahmen.getBoundingClientRect()),
    "punkt " + punkt + (trifft ? " = ziel" : " NICHT ZIEL") + " schub " + tourSchub
  ];
  const feld = tourTeile.diagnose;
  feld.textContent = zeilen.join("\n");
  feld.style.display = "";
  feld.style.top = oben ? (frei.oben + 2) + "px" : "";
  feld.style.bottom = oben ? "" : (frei.unten + 2) + "px";

  // Der Kontroll-Rahmen in der Seite: gemessene Stelle plus Scrollstand
  const kontrolle = tourTeile.kontrolle;
  kontrolle.style.display = "";
  kontrolle.style.left = (platz.left + window.scrollX) + "px";
  kontrolle.style.top = (platz.top + window.scrollY) + "px";
  kontrolle.style.width = platz.width + "px";
  kontrolle.style.height = platz.height + "px";
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
  tourVorher = { ansicht: trainingAnsicht, reiter: trainingReiter, profilReiter: profilReiter, einstOffen: document.getElementById("einst-sheet").classList.contains("offen"), vorlagenOffen: document.getElementById("reiter-plaene").classList.contains("vorlagen-offen") };
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
    } else if (!document.getElementById("seite-" + schritt.seite)) {
      probleme.push("Seite \"" + schritt.seite + "\" gibt es nicht");
    } else {
      // Erst die Seite zeigen: Manche Elemente baut die app.js erst, wenn ihre Seite aufgeht (z. B. die Kraftentwicklung im Fortschritt)
      einfuehrungVorbereiten(schritt);
      if (!document.querySelector('[data-tour="' + schritt.ziel + '"]')) {
        probleme.push("kein Element mit data-tour=\"" + schritt.ziel + "\"");
      } else if (!einfuehrungZiel(schritt)) {
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
