// Übungsbilder: selbst gezeichnete Strichbilder (Motive) und die Tabelle, welche Übung welches Motiv zeigt.
// Die app.js liest das nur, über die Funktion uebungsBild(id) ganz unten.
//
// Jedes Motiv ist das Innere eines SVG mit der Zeichenfläche 64 x 64. Die Linien haben die Textfarbe
// (currentColor), nichts ist gefüllt. Zwei Klassen setzen Akzente, ihre Farben stehen in der style.css:
//   class="g": das Gerät (Bank, Turm, Seil), blasser gezeichnet als die Figur
//   class="a": das Gewicht (Scheibe, Hantel, Griff), in Akzentgrün
// Ein neues Motiv braucht zwei Schritte: hier in BILDER zeichnen und unten in BILD_ZU_UEBUNG zuordnen.

const BILDER = {
  // Platzhalter für alle Übungen ohne eigenes Motiv: eine Kurzhantel
  "hantel": '<path d="M22 32h20"/><rect class="a" x="14" y="22" width="8" height="20" rx="2.5"/><rect class="a" x="42" y="22" width="8" height="20" rx="2.5"/><path class="a" d="M10 27v10M54 27v10"/>',

  // Flachbank von der Seite: die Figur liegt, die Stange ist über der Brust (die Scheibe sieht man von vorn)
  "bankdruecken": '<path class="g" d="M12 43h40M19 43v13M45 43v13"/><circle cx="17" cy="37" r="4"/><path d="M22 39h18l10 1 2 16M26 38V24"/><circle class="a" cx="26" cy="18" r="6"/><path class="a" d="M26 18h.01"/>',

  // Schrägbank von der Seite: Lehne schräg, die Figur drückt die Stange nach oben
  "schraegbank": '<path class="g" d="M17 26l18 20h14M24 34v22M45 46v10"/><circle cx="18.5" cy="20.5" r="4"/><path d="M21 26l16 18 12-2 3 14M24 29l2-15"/><circle class="a" cx="26" cy="11" r="5.5"/><path class="a" d="M26 11h.01"/>',

  // Dasselbe an der Multipresse: Die Stange läuft an einer senkrechten Schiene
  "schraegbank-multi": '<path class="g" d="M26 3v54M19 57h14M17 26l18 20h14M45 46v10"/><circle cx="18.5" cy="20.5" r="4"/><path d="M21 26l16 18 12-2 3 14M23.5 29l2.5-15"/><circle class="a" cx="26" cy="11" r="5.5"/><path class="a" d="M26 11h.01"/>',

  // Brustpresse sitzend: Die Figur drückt den Griff nach vorn, rechts der Turm mit dem Gewicht
  "brustpresse": '<path class="g" d="M17 20v24h14M23 44v12M12 56h42M50 8v48M50 8h-6l-3 14"/><circle cx="23" cy="15" r="4"/><path d="M22 21l1 21h13l1 13M23 27h17"/><path class="a" d="M41 22v10"/><rect class="a" x="46" y="32" width="8" height="16" rx="2"/>',

  // Butterfly von vorn: Arme seitlich angewinkelt an den Polstern
  "butterfly": '<path class="g" d="M15 7h34M15 7v5M49 7v5M24 45h16"/><circle cx="32" cy="16" r="4"/><path d="M32 21v21M32 42l-7 4-1 11M32 42l7 4 1 11M32 25l-11 2V15M32 25l11 2V15"/><rect class="a" x="13" y="12" width="5" height="17" rx="2.5"/><rect class="a" x="46" y="12" width="5" height="17" rx="2.5"/>',

  // Latzug von vorn: breite Stange am Seil, die Figur sitzt und zieht sie herunter
  "latzug": '<path class="g" d="M26 4h12M32 4v10M24 49h16"/><circle cx="32" cy="26" r="4"/><path d="M32 31v15M32 46l-7 4v8M32 46l7 4v8M32 33L19 14M32 33l13-19"/><path class="a" d="M9 17l3-3h40l3 3"/>',

  // Rudern am Kabelzug von der Seite: sitzend, Füße an der Platte, Griff zum Bauch
  "rudern": '<path class="g" d="M16 48h24M21 48v8M36 48v8M49 39v13M57 8v48M30 36l27 2"/><circle cx="23" cy="21" r="4"/><path d="M24 26l2 18 12-3 10 5M24 30l-7 7 13-1"/><path class="a" d="M30 32v8"/><rect class="a" x="53" y="14" width="8" height="14" rx="2"/>',

  // Klimmzug von vorn: Kinn über der Stange
  "klimmzug": '<path class="g" d="M10 10V5M54 10V5"/><path class="a" d="M8 10h48"/><circle cx="32" cy="18" r="4"/><path d="M22 10l-3 14h26l-3-14M32 24v18M32 42l-4 15M32 42l4 15"/>',

  // Schulterdrücken von vorn: sitzend, die Stange über dem Kopf
  "schulterdruecken": '<path class="g" d="M24 47h16"/><circle cx="32" cy="21" r="4"/><path d="M32 26v18M32 44l-7 4v9M32 44l7 4v9M26 28h12M26 28l-6-3V11M38 28l6-3V11"/><path class="a" d="M12 10h40"/><rect class="a" x="7" y="4" width="5" height="12" rx="2"/><rect class="a" x="52" y="4" width="5" height="12" rx="2"/>',

  // Seitheben von vorn: stehend, beide Arme seitlich angehoben
  "seitheben": '<circle cx="32" cy="12" r="4"/><path d="M32 17v21M32 38l-5 19M32 38l5 19M32 20l-17 4M32 20l17 4"/><rect class="a" x="9" y="20" width="5" height="9" rx="2.5"/><rect class="a" x="50" y="20" width="5" height="9" rx="2.5"/>',

  // Bizeps-Curl von der Seite: stehend, der Unterarm ist angewinkelt
  "bizeps-curl": '<circle cx="29" cy="10" r="4"/><path d="M29 15v21M29 36l-3 21M29 36l4 21M29 18l2 13 10-8"/><circle class="a" cx="44" cy="20" r="5"/><path class="a" d="M44 20h.01"/>',

  // Trizepsdrücken am Kabel von der Seite: stehend vor dem Turm, der Griff wird nach unten gedrückt
  "trizepsdruecken": '<path class="g" d="M55 6v51M55 6H44M44 8l-4 27"/><circle cx="25" cy="12" r="4"/><path d="M26 17l2 20M28 37l-3 20M28 37l4 20M27 20l2 11 10 5"/><path class="a" d="M36 36h8"/><rect class="a" x="51" y="30" width="8" height="14" rx="2"/>',

  // Kniebeuge von der Seite: tief in der Hocke, die Stange auf dem Rücken
  "kniebeuge": '<path class="g" d="M12 57h40"/><circle cx="41" cy="16" r="4"/><path d="M37 22L26 40l16 2-8 14h7"/><circle class="a" cx="30" cy="22" r="6"/><path class="a" d="M30 22h.01"/>',

  // Beinpresse 45° von der Seite: zurückgelehnt, die Füße drücken den Schlitten schräg nach oben
  "beinpresse": '<path class="g" d="M9 35l11 18h9M30 57l28-28"/><circle cx="13" cy="29" r="4"/><path d="M15 35l9 14 7-15 12-5"/><path class="a" d="M40 24l8 8"/><circle class="a" cx="52" cy="21" r="5"/>',

  // Kreuzheben von der Seite: vorgebeugt, die Arme gestreckt an der Stange am Boden
  "kreuzheben": '<path class="g" d="M10 57h44"/><circle cx="44" cy="19" r="4"/><path d="M38 24L22 36l15 8-4 12h6M38 24l2 25"/><circle class="a" cx="40" cy="49" r="7"/><path class="a" d="M40 49h.01"/>'
};

// Welche Übung (ID aus der uebungen.js) welches Motiv zeigt. Ähnliche Übungen teilen sich ein Motiv.
// Übungen, die hier fehlen, zeigen den Platzhalter "hantel".
const BILD_ZU_UEBUNG = {
  // Brust
  "bankdruecken-lh": "bankdruecken",
  "bankdruecken-kh": "bankdruecken",
  "bankdruecken-multi": "bankdruecken",
  "bankdruecken-multi-breit": "bankdruecken",
  "bankdruecken-kh-neutral": "bankdruecken",
  "bankdruecken-kh-einarmig": "bankdruecken",
  "bankdruecken-kb": "bankdruecken",
  "bankdruecken-lh-breit": "bankdruecken",
  "pause-smith-machine-bench-press": "bankdruecken",
  "reverse-grip-barbell-bench-press": "bankdruecken",
  "dumbbell-squeeze-press": "bankdruecken",
  "close-grip-dumbbell-press": "bankdruecken",
  "enges-bankdruecken-multi": "bankdruecken",
  "enges-bankdruecken-lh": "bankdruecken",
  "schraegbank-45-multi": "schraegbank-multi",
  "schraegbank-steil-multi": "schraegbank-multi",
  "schraegbank-flach-multi": "schraegbank-multi",
  "schraegbank-45-kh": "schraegbank",
  "schraegbank-45-lh": "schraegbank",
  "schraegbank-45-lh-pause": "schraegbank",
  "schraegbank-45-kh-neutral": "schraegbank",
  "schraegbank-45-lh-eng": "schraegbank",
  "schraegbank-steil-lh": "schraegbank",
  "schraegbank-steil-kh": "schraegbank",
  "schraegbank-flach-lh": "schraegbank",
  "schraegbank-flach-kh": "schraegbank",
  "incline-dumbbell-squeeze-press": "schraegbank",
  "brustpresse-steck": "brustpresse",
  "brustpresse-steck-neutral": "brustpresse",
  "brustpresse-scheibe": "brustpresse",
  "brustpresse-scheibe-neutral": "brustpresse",
  "schraegpresse-scheibe": "brustpresse",
  "schraegpresse-scheibe-einarmig": "brustpresse",
  "machine-incline-press": "brustpresse",
  "butterfly": "butterfly",
  "butterfly-obergriff": "butterfly",

  // Rücken
  "latzug": "latzug",
  "wide-grip-cable-lat-pulldown": "latzug",
  "overhand-grip-cable-lat-pulldown": "latzug",
  "machine-lat-pulldown": "latzug",
  "cable-lat-pulldown": "latzug",
  "neutral-close-grip-cable-lat-pulldown": "latzug",
  "underhand-wide-grip-cable-lat-pulldown": "latzug",
  "underhand-close-grip-cable-lat-pulldown": "latzug",
  "single-arm-cable-lat-pulldown": "latzug",
  "kabelrudern": "rudern",
  "neutral-wide-grip-cable-row": "rudern",
  "wide-grip-cable-row": "rudern",
  "underhand-grip-cable-row": "rudern",
  "seated-single-arm-cable-row": "rudern",
  "neutral-grip-machine-row": "rudern",
  "neutral-grip-plate-loaded-machine-row": "rudern",
  "wide-grip-plate-loaded-machine-row": "rudern",
  "pin-loaded-row-machine": "rudern",
  "klimmzuege": "klimmzug",
  "wide-grip-pull-up": "klimmzug",
  "neutral-grip-pull-up": "klimmzug",
  "chin-up": "klimmzug",
  "close-grip-chin-up": "klimmzug",
  "commando-pull-up": "klimmzug",
  "towel-pull-up": "klimmzug",
  "commando-chin-up": "klimmzug",
  "towel-chin-up": "klimmzug",
  "kreuzheben": "kreuzheben",
  "deficit-deadlift": "kreuzheben",

  // Schultern
  "schulterdruecken": "schulterdruecken",
  "military-press": "schulterdruecken",
  "arnold-press": "schulterdruecken",
  "barbell-overhead-press": "schulterdruecken",
  "dumbbell-overhead-press": "schulterdruecken",
  "seated-dumbbell-shoulder-press": "schulterdruecken",
  "bradford-press": "schulterdruecken",
  "smith-machine-overhead-press": "schulterdruecken",
  "seitheben": "seitheben",
  "seated-dumbbell-lateral-raise": "seitheben",

  // Arme
  "langhantelcurls": "bizeps-curl",
  "kurzhantelcurls": "bizeps-curl",
  "hammercurls": "bizeps-curl",
  "ez-bar-curl": "bizeps-curl",
  "alternating-dumbbell-curl": "bizeps-curl",
  "cross-body-hammer-curl": "bizeps-curl",
  "reverse-barbell-curl": "bizeps-curl",
  "reverse-dumbbell-curl": "bizeps-curl",
  "zottman-curl": "bizeps-curl",
  "drag-curl": "bizeps-curl",
  "trizepsdruecken-kabel": "trizepsdruecken",
  "single-arm-neutral-grip-cable-triceps-pushdown": "trizepsdruecken",
  "cable-v-bar-triceps-pushdown": "trizepsdruecken",
  "cable-straight-bar-triceps-pushdown": "trizepsdruecken",
  "underhand-grip-cable-triceps-pushdown": "trizepsdruecken",
  "cable-dual-rope-diverging-triceps": "trizepsdruecken",

  // Beine
  "kniebeuge": "kniebeuge",
  "high-bar-back-squat": "kniebeuge",
  "low-bar-back-squat": "kniebeuge",
  "tempo-squat": "kniebeuge",
  "pause-squat": "kniebeuge",
  "smith-machine-back-squat": "kniebeuge",
  "beinpresse": "beinpresse",
  "45-leg-press": "beinpresse",
  "pin-loaded-leg-press": "beinpresse",
  "single-leg-45-leg-press": "beinpresse",
  "single-leg-pin-loaded-leg-press": "beinpresse",
  "pin-loaded-quad-biased-leg-press": "beinpresse",
  "45-glute-biased-leg-press": "beinpresse"
};

// Das Bild einer Übung als fertiges SVG. Ohne Zuordnung (auch bei eigenen Übungen) kommt der Platzhalter.
function uebungsBild(id) {
  let motiv = "hantel";
  if (Object.prototype.hasOwnProperty.call(BILD_ZU_UEBUNG, id)) {
    motiv = BILD_ZU_UEBUNG[id];
  }
  return '<svg class="uebungsbild" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5"'
    + ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (BILDER[motiv] || BILDER.hantel) + '</svg>';
}
