// Übungsdaten: Muskelgruppen, Bereiche, Muskeln und alle Übungen, jeweils auf Deutsch ("de") und Englisch ("en").
// Die app.js liest diese Listen nur. Eine neue Übung braucht zwei Einträge:
// eine Zeile in UEBUNGEN und ihre ID in UEBUNGSLISTEN bei jeder Muskelgruppe, in der sie erscheinen soll.

// Die Kacheln der Übungsauswahl. "ansicht" legt fest, ob die Körper-Grafik von vorn oder von hinten gezeigt wird.
const MUSKELGRUPPEN = [
  { id: "brust", de: "Brust", en: "Chest", ansicht: "vorn" },
  { id: "lat", de: "Latissimus", en: "Lats", ansicht: "hinten" },
  { id: "ruecken-oben", de: "Oberer Rücken", en: "Upper Back", ansicht: "hinten" },
  { id: "ruecken-unten", de: "Unterer Rücken", en: "Lower Back", ansicht: "hinten" },
  { id: "trapez", de: "Trapez", en: "Traps", ansicht: "hinten" },
  { id: "schulter-hinten", de: "Hintere Schulter", en: "Rear Delts", ansicht: "hinten" },
  { id: "schulter-vorn", de: "Vordere Schulter", en: "Front Delts", ansicht: "vorn" },
  { id: "schulter-seite", de: "Seitliche Schulter", en: "Side Delts", ansicht: "vorn" },
  { id: "bizeps", de: "Bizeps", en: "Biceps", ansicht: "vorn" },
  { id: "trizeps", de: "Trizeps", en: "Triceps", ansicht: "hinten" },
  { id: "quadrizeps", de: "Quadrizeps", en: "Quads", ansicht: "vorn" },
  { id: "beinbeuger", de: "Beinbeuger", en: "Hamstrings", ansicht: "hinten" },
  { id: "po", de: "Po", en: "Glutes", ansicht: "hinten" },
  { id: "adduktoren", de: "Adduktoren", en: "Adductors", ansicht: "vorn" },
  { id: "abduktoren", de: "Abduktoren", en: "Abductors", ansicht: "hinten" },
  { id: "waden", de: "Waden", en: "Calves", ansicht: "hinten" },
  { id: "bauch", de: "Bauch", en: "Abs", ansicht: "vorn" },
  { id: "bauch-schraeg", de: "Schräger Bauch / Core", en: "Obliques / Core", ansicht: "vorn" },
  { id: "unterarme", de: "Unterarme", en: "Forearms", ansicht: "vorn" },
  { id: "ganzkoerper", de: "Ganzkörper", en: "Full Body", ansicht: "vorn" }
];

// Die drei Bereiche, in die die Übungen einer Muskelgruppe sortiert werden
const BEREICHE = [
  { id: "maschine", de: "Maschine", en: "Machine" },
  { id: "frei", de: "Freie Gewichte", en: "Free Weights" },
  { id: "eigen", de: "Eigengewicht", en: "Bodyweight" }
];

// Die einzelnen Muskeln für Haupt- und Hilfsmuskeln. "gruppe" ist die Kachel, zu der der Muskel gehört.
const MUSKELN = {
  "brust": { de: "Brust", en: "Chest", gruppe: "brust" },
  "brust-oben": { de: "Brust (oben)", en: "Upper Chest", gruppe: "brust" },
  "brust-unten": { de: "Brust (unten)", en: "Lower Chest", gruppe: "brust" },
  "lat": { de: "Latissimus", en: "Lats", gruppe: "lat" },
  "ruecken-oben": { de: "Oberer Rücken", en: "Upper Back", gruppe: "ruecken-oben" },
  "ruecken-unten": { de: "Unterer Rücken", en: "Lower Back", gruppe: "ruecken-unten" },
  "trapez": { de: "Trapez", en: "Traps", gruppe: "trapez" },
  "schulter-hinten": { de: "Hintere Schulter", en: "Rear Delts", gruppe: "schulter-hinten" },
  "schulter-vorn": { de: "Vordere Schulter", en: "Front Delts", gruppe: "schulter-vorn" },
  "schulter-seite": { de: "Seitliche Schulter", en: "Side Delts", gruppe: "schulter-seite" },
  "schulter-rotatoren": { de: "Rotatorenmanschette", en: "Rotator Cuff", gruppe: "schulter-hinten" },
  "bizeps": { de: "Bizeps", en: "Biceps", gruppe: "bizeps" },
  "trizeps": { de: "Trizeps", en: "Triceps", gruppe: "trizeps" },
  "quadrizeps": { de: "Quadrizeps", en: "Quads", gruppe: "quadrizeps" },
  "beinbeuger": { de: "Beinbeuger", en: "Hamstrings", gruppe: "beinbeuger" },
  "po": { de: "Po", en: "Glutes", gruppe: "po" },
  "adduktoren": { de: "Adduktoren", en: "Adductors", gruppe: "adduktoren" },
  "abduktoren": { de: "Abduktoren", en: "Abductors", gruppe: "abduktoren" },
  "waden": { de: "Waden", en: "Calves", gruppe: "waden" },
  "bauch": { de: "Bauch", en: "Abs", gruppe: "bauch" },
  "bauch-schraeg": { de: "Schräge Bauchmuskeln", en: "Obliques", gruppe: "bauch-schraeg" },
  "unterarme": { de: "Unterarme", en: "Forearms", gruppe: "unterarme" },
  "ganzkoerper": { de: "Ganzkörper", en: "Full Body", gruppe: "ganzkoerper" }
};

// Alle Übungen. Jede Übung steht hier genau einmal, auch wenn sie bei mehreren Muskelgruppen erscheint.
// id:      feste Kennung. Sie wird in Einträgen und Routinen gespeichert und darf sich nie ändern.
// bereich: "maschine", "frei" oder "eigen". Bei "eigen" zählen meist nur die Wiederholungen,
//          Zusatzgewicht ist möglich. Sonst wird das Gewicht eingetragen.
// haupt:   der Hauptmuskel (aus MUSKELN). Seine Muskelgruppe wird z. B. in der Suche neben der Übung genannt.
// hilfs:   die Hilfsmuskeln (aus MUSKELN)
// auch:    Muskelgruppen, bei denen die Übung zusätzlich unter "Trainiert auch" erscheint
// alias:   weitere Namen, unter denen die Suche die Übung findet (nur wenn es welche gibt)
const UEBUNGEN = [

  // ---------- Brust: Maschine ----------
  { id: "brustpresse-steck", de: "Brustpresse (Steckgewicht)", en: "Pin-Loaded Machine Chest Press", bereich: "maschine", haupt: "brust", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "butterfly", de: "Butterfly (Pec Deck)", en: "Pec Deck Fly", bereich: "maschine", haupt: "brust", hilfs: ["schulter-vorn"], auch: [] },
  { id: "bankdruecken-multi", de: "Bankdrücken an der Multipresse", en: "Smith Machine Bench Press", bereich: "maschine", haupt: "brust", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "schraegbank-45-multi", de: "Schrägbankdrücken 45° an der Multipresse", en: "45° Incline Smith Machine Press", bereich: "maschine", haupt: "brust-oben", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "kabelfly-hoch-tief", de: "Kabelfly von oben nach unten", en: "High to Low Cable Fly", bereich: "maschine", haupt: "brust-unten", hilfs: ["schulter-vorn"], auch: [] },
  { id: "kabelfly-tief-hoch", de: "Kabelfly von unten nach oben", en: "Low to High Cable Fly", bereich: "maschine", haupt: "brust-oben", hilfs: ["schulter-vorn"], auch: [] },
  { id: "schraegpresse-scheibe", de: "Schrägbankpresse sitzend (Scheibengewicht)", en: "Seated Plate-Loaded Machine Incline Press", bereich: "maschine", haupt: "brust-oben", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "butterfly-obergriff", de: "Butterfly mit Obergriff (Pec Deck)", en: "Overhand Grip Pec Deck Fly", bereich: "maschine", haupt: "brust", hilfs: ["schulter-vorn"], auch: [] },
  { id: "brustpresse-steck-neutral", de: "Brustpresse, Neutralgriff (Steckgewicht)", en: "Neutral Grip Pin-Loaded Machine Chest Press", bereich: "maschine", haupt: "brust", hilfs: ["trizeps", "schulter-vorn"], auch: [] },
  { id: "brustpresse-scheibe", de: "Brustpresse sitzend (Scheibengewicht)", en: "Seated Plate-Loaded Machine Chest Press", bereich: "maschine", haupt: "brust", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "brustpresse-scheibe-neutral", de: "Brustpresse sitzend, Neutralgriff (Scheibengewicht)", en: "Seated Neutral Grip Plate-Loaded Machine Chest Press", bereich: "maschine", haupt: "brust", hilfs: ["trizeps", "schulter-vorn"], auch: [] },
  { id: "schraegpresse-scheibe-einarmig", de: "Schrägbankpresse sitzend, einarmig (Scheibengewicht)", en: "Seated Single Arm Plate-Loaded Machine Incline Press", bereich: "maschine", haupt: "brust-oben", hilfs: ["schulter-vorn", "trizeps", "bauch"], auch: [] },
  { id: "bankdruecken-multi-breit", de: "Breites Bankdrücken an der Multipresse", en: "Wide Grip Smith Machine Bench Press", bereich: "maschine", haupt: "brust", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "schraegbank-steil-multi", de: "Steiles Schrägbankdrücken an der Multipresse", en: "High Incline Smith Machine Press", bereich: "maschine", haupt: "brust-oben", hilfs: ["schulter-vorn", "trizeps"], auch: ["schulter-vorn"] },
  { id: "schraegbank-flach-multi", de: "Flaches Schrägbankdrücken an der Multipresse", en: "Low Incline Smith Machine Press", bereich: "maschine", haupt: "brust-oben", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "negativbank-multi", de: "Negativ-Bankdrücken an der Multipresse", en: "Decline Smith Machine Press", bereich: "maschine", haupt: "brust-unten", hilfs: ["trizeps", "schulter-vorn"], auch: [] },
  { id: "kabelfly-sitzend", de: "Kabelfly sitzend", en: "Seated Cable Fly", bereich: "maschine", haupt: "brust", hilfs: ["schulter-vorn"], auch: [] },
  { id: "kabelfly-horizontal", de: "Kabelfly horizontal", en: "Horizontal Cable Fly", bereich: "maschine", haupt: "brust", hilfs: ["schulter-vorn"], auch: [] },
  { id: "kabelfly-horizontal-einarmig", de: "Kabelfly horizontal, einarmig", en: "Single Arm Horizontal Cable Fly", bereich: "maschine", haupt: "brust", hilfs: ["schulter-vorn", "bauch"], auch: [] },
  { id: "kabel-crossover", de: "Kabel-Crossover horizontal", en: "Horizontal Cable Crossover", bereich: "maschine", haupt: "brust", hilfs: ["schulter-vorn"], auch: [] },
  { id: "kabelfly-tief-hoch-einarmig", de: "Kabelfly von unten nach oben, einarmig", en: "Single Arm Low to High Cable Fly", bereich: "maschine", haupt: "brust-oben", hilfs: ["schulter-vorn", "bauch"], auch: [], alias: ["Single Arm Low-To-High Cable Fly"] },
  { id: "kabelfly-hoch-tief-einarmig", de: "Kabelfly von oben nach unten, einarmig", en: "Single Arm High to Low Cable Fly", bereich: "maschine", haupt: "brust-unten", hilfs: ["schulter-vorn", "bauch"], auch: [], alias: ["Single Arm High-To-Low Cable Fly"] },
  { id: "kabelfly-vorgebeugt", de: "Kabelfly vorgebeugt", en: "Bent Over Cable Fly", bereich: "maschine", haupt: "brust-unten", hilfs: ["schulter-vorn"], auch: [] },
  { id: "brustpresse-kabel", de: "Brustpresse am Kabelzug", en: "Cable Chest Press", bereich: "maschine", haupt: "brust", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "brustpresse-kabel-einarmig", de: "Brustpresse am Kabelzug, einarmig", en: "Single Arm Cable Chest Press", bereich: "maschine", haupt: "brust", hilfs: ["schulter-vorn", "trizeps", "bauch"], auch: [] },
  { id: "brust-dips-assistiert", de: "Brust-Dips an der Unterstützungsmaschine", en: "Machine Assisted Chest Dip", bereich: "maschine", haupt: "brust-unten", hilfs: ["trizeps", "schulter-vorn"], auch: ["trizeps"], alias: ["Machine-Assisted Chest Dip"] },
  { id: "dip-maschine-brust", de: "Dip-Maschine sitzend, Brust (Steckgewicht)", en: "Seated Pin-Loaded Machine Chest Dip", bereich: "maschine", haupt: "brust-unten", hilfs: ["trizeps", "schulter-vorn"], auch: ["trizeps"] },
  { id: "machine-incline-press", de: "Schrägbankpresse (Maschine)", en: "Machine Incline Press", bereich: "maschine", haupt: "brust", hilfs: [], auch: [] },
  { id: "pause-smith-machine-bench-press", de: "Bankdrücken mit Pause an der Multipresse", en: "Pause Smith Machine Bench Press", bereich: "maschine", haupt: "brust", hilfs: [], auch: [] },
  { id: "machine-assisted-dip", de: "Dips an der Unterstützungsmaschine", en: "Machine-Assisted Dip", bereich: "maschine", haupt: "brust", hilfs: [], auch: [] },

  // ---------- Brust: Freie Gewichte ----------
  { id: "bankdruecken-lh", de: "Bankdrücken (Langhantel)", en: "Barbell Bench Press", bereich: "frei", haupt: "brust", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "bankdruecken-kh", de: "Bankdrücken (Kurzhantel)", en: "Dumbbell Bench Press", bereich: "frei", haupt: "brust", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "schraegbank-45-kh", de: "Schrägbankdrücken 45° (Kurzhantel)", en: "45° Incline Dumbbell Press", bereich: "frei", haupt: "brust-oben", hilfs: ["schulter-vorn", "trizeps"], auch: [], alias: ["Incline Dumbbell Bench Press"] },
  { id: "schraegbank-45-lh", de: "Schrägbankdrücken 45° (Langhantel)", en: "45° Incline Barbell Press", bereich: "frei", haupt: "brust-oben", hilfs: ["schulter-vorn", "trizeps"], auch: [], alias: ["Incline Barbell Bench Press"] },
  { id: "fliegende-kh", de: "Fliegende (Kurzhantel)", en: "Dumbbell Fly", bereich: "frei", haupt: "brust", hilfs: ["schulter-vorn"], auch: [] },
  { id: "fliegende-45-kh", de: "Schräge Fliegende 45° (Kurzhantel)", en: "45° Incline Dumbbell Fly", bereich: "frei", haupt: "brust-oben", hilfs: ["schulter-vorn"], auch: [], alias: ["Incline Dumbbell Fly"] },
  { id: "negativbank-lh", de: "Negativ-Bankdrücken (Langhantel)", en: "Decline Barbell Press", bereich: "frei", haupt: "brust-unten", hilfs: ["trizeps", "schulter-vorn"], auch: [], alias: ["Decline Barbell Bench Press"] },
  { id: "bankdruecken-kh-neutral", de: "Bankdrücken, Neutralgriff (Kurzhantel)", en: "Neutral Grip Dumbbell Bench Press", bereich: "frei", haupt: "brust", hilfs: ["trizeps", "schulter-vorn"], auch: [] },
  { id: "bankdruecken-kh-einarmig", de: "Bankdrücken einarmig (Kurzhantel)", en: "Single Arm Dumbbell Bench Press", bereich: "frei", haupt: "brust", hilfs: ["schulter-vorn", "trizeps", "bauch"], auch: [] },
  { id: "bankdruecken-kb", de: "Bankdrücken (Kettlebell)", en: "Kettlebell Bench Press", bereich: "frei", haupt: "brust", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "bankdruecken-lh-breit", de: "Breites Bankdrücken (Langhantel)", en: "Wide Grip Bench Press", bereich: "frei", haupt: "brust", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "schraegbank-45-lh-pause", de: "Schrägbankdrücken 45° mit Pause (Langhantel)", en: "45° Incline Paused Barbell Press", bereich: "frei", haupt: "brust-oben", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "schraegbank-45-kh-neutral", de: "Schrägbankdrücken 45°, Neutralgriff (Kurzhantel)", en: "45° Incline Neutral Grip Dumbbell Press", bereich: "frei", haupt: "brust-oben", hilfs: ["trizeps", "schulter-vorn"], auch: [] },
  { id: "schraegbank-45-lh-eng", de: "Enges Schrägbankdrücken 45° (Langhantel)", en: "45° Incline Close Grip Press", bereich: "frei", haupt: "brust-oben", hilfs: ["trizeps", "schulter-vorn"], auch: ["trizeps"] },
  { id: "schraegbank-steil-lh", de: "Steiles Schrägbankdrücken (Langhantel)", en: "High Incline Barbell Press", bereich: "frei", haupt: "brust-oben", hilfs: ["schulter-vorn", "trizeps"], auch: ["schulter-vorn"] },
  { id: "schraegbank-steil-kh", de: "Steiles Schrägbankdrücken (Kurzhantel)", en: "High Incline Dumbbell Press", bereich: "frei", haupt: "brust-oben", hilfs: ["schulter-vorn", "trizeps"], auch: ["schulter-vorn"] },
  { id: "schraegbank-flach-lh", de: "Flaches Schrägbankdrücken (Langhantel)", en: "Low Incline Barbell Press", bereich: "frei", haupt: "brust-oben", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "schraegbank-flach-kh", de: "Flaches Schrägbankdrücken (Kurzhantel)", en: "Low Incline Dumbbell Press", bereich: "frei", haupt: "brust-oben", hilfs: ["schulter-vorn", "trizeps"], auch: [], alias: ["Low-Incline Dumbbell Press"] },
  { id: "negativbank-kh", de: "Negativ-Bankdrücken (Kurzhantel)", en: "Decline Dumbbell Press", bereich: "frei", haupt: "brust-unten", hilfs: ["trizeps", "schulter-vorn"], auch: [], alias: ["Decline Dumbbell Bench Press"] },
  { id: "negativbank-lh-breit", de: "Breites Negativ-Bankdrücken (Langhantel)", en: "Decline Wide Grip Press", bereich: "frei", haupt: "brust-unten", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "fliegende-flach-kh", de: "Flache schräge Fliegende (Kurzhantel)", en: "Low Incline Dumbbell Fly", bereich: "frei", haupt: "brust-oben", hilfs: ["schulter-vorn"], auch: [] },
  { id: "floor-press-lh", de: "Floor Press (Langhantel)", en: "Barbell Floor Press", bereich: "frei", haupt: "brust", hilfs: ["trizeps", "schulter-vorn"], auch: ["trizeps"] },
  { id: "floor-press-kh", de: "Floor Press (Kurzhantel)", en: "Dumbbell Floor Press", bereich: "frei", haupt: "brust", hilfs: ["trizeps", "schulter-vorn"], auch: ["trizeps"] },
  { id: "floor-press-kb", de: "Floor Press (Kettlebell)", en: "Kettlebell Floor Press", bereich: "frei", haupt: "brust", hilfs: ["trizeps", "schulter-vorn"], auch: ["trizeps"] },
  { id: "reverse-grip-barbell-bench-press", de: "Bankdrücken im Untergriff (Langhantel)", en: "Reverse-Grip Barbell Bench Press", bereich: "frei", haupt: "brust", hilfs: [], auch: [] },
  { id: "incline-dumbbell-squeeze-press", de: "Schräge Squeeze Press (Kurzhantel)", en: "Incline Dumbbell Squeeze Press", bereich: "frei", haupt: "brust", hilfs: [], auch: [] },
  { id: "dumbbell-squeeze-press", de: "Squeeze Press (Kurzhantel)", en: "Dumbbell Squeeze Press", bereich: "frei", haupt: "brust", hilfs: [], auch: [] },
  { id: "close-grip-dumbbell-press", de: "Enges Bankdrücken (Kurzhantel)", en: "Close-Grip Dumbbell Press", bereich: "frei", haupt: "brust", hilfs: ["trizeps"], auch: [], alias: ["Dumbbell Close-Grip Press", "Enges Kurzhanteldrücken"] },
  { id: "decline-dumbbell-fly", de: "Negativ-Fliegende (Kurzhantel)", en: "Decline Dumbbell Fly", bereich: "frei", haupt: "brust", hilfs: [], auch: [] },

  // ---------- Brust: Eigengewicht ----------
  { id: "liegestuetze", de: "Liegestütze", en: "Push-Up", bereich: "eigen", haupt: "brust", hilfs: ["schulter-vorn", "trizeps", "bauch"], auch: [] },
  { id: "brust-dips", de: "Brust-Dips", en: "Chest Dip", bereich: "eigen", haupt: "brust-unten", hilfs: ["trizeps", "schulter-vorn"], auch: ["trizeps"], alias: ["Chest-Leaning Dips"] },
  { id: "liegestuetze-fuesse-hoch", de: "Liegestütze mit erhöhten Füßen", en: "Decline Push-Up", bereich: "eigen", haupt: "brust-oben", hilfs: ["schulter-vorn", "trizeps", "bauch"], auch: [] },
  { id: "liegestuetze-haende-hoch", de: "Liegestütze mit erhöhten Händen", en: "Incline Push-Up", bereich: "eigen", haupt: "brust-unten", hilfs: ["schulter-vorn", "trizeps", "bauch"], auch: [] },
  { id: "liegestuetze-breit", de: "Breite Liegestütze", en: "Wide Grip Push-Up", bereich: "eigen", haupt: "brust", hilfs: ["schulter-vorn", "trizeps", "bauch"], auch: [], alias: ["Wide-Grip Push-Up"] },
  { id: "liegestuetze-knie", de: "Liegestütze auf den Knien", en: "Kneeling Push-Up", bereich: "eigen", haupt: "brust", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "liegestuetze-gewicht", de: "Liegestütze mit Zusatzgewicht", en: "Weighted Push-Up", bereich: "eigen", haupt: "brust", hilfs: ["schulter-vorn", "trizeps", "bauch"], auch: [] },
  { id: "liegestuetze-defizit", de: "Defizit-Liegestütze", en: "Deficit Push-Up", bereich: "eigen", haupt: "brust", hilfs: ["schulter-vorn", "trizeps", "bauch"], auch: [] },
  { id: "liegestuetze-einarmig", de: "Einarmige Liegestütze", en: "Single Arm Push-Up", bereich: "eigen", haupt: "brust", hilfs: ["trizeps", "schulter-vorn", "bauch"], auch: [], alias: ["One-Arm Push-Up"] },
  { id: "brust-dips-gewicht", de: "Brust-Dips mit Zusatzgewicht", en: "Weighted Chest Dip", bereich: "eigen", haupt: "brust-unten", hilfs: ["trizeps", "schulter-vorn"], auch: ["trizeps"] },
  { id: "archer-push-up", de: "Archer-Liegestütze", en: "Archer Push-Up", bereich: "eigen", haupt: "brust", hilfs: [], auch: [] },
  { id: "pseudo-planche-push-up", de: "Pseudo-Planche-Liegestütze", en: "Pseudo Planche Push-Up", bereich: "eigen", haupt: "brust", hilfs: ["trizeps"], auch: [] },
  { id: "ring-push-up", de: "Liegestütze an den Ringen", en: "Ring Push-Up", bereich: "eigen", haupt: "brust", hilfs: [], auch: [] },
  { id: "ring-chest-fly", de: "Fliegende an den Ringen", en: "Ring Chest Fly", bereich: "eigen", haupt: "brust", hilfs: [], auch: [] },
  { id: "dips", de: "Dip", en: "Dip", bereich: "eigen", haupt: "brust", hilfs: [], auch: [], alias: ["Dips"] },
  { id: "explosive-push-up", de: "Explosive Liegestütze", en: "Explosive Push-Up", bereich: "eigen", haupt: "brust", hilfs: [], auch: [] },
  { id: "clap-push-up", de: "Liegestütze mit Klatschen", en: "Clap Push-Up", bereich: "eigen", haupt: "brust", hilfs: [], auch: [] },

  // ---------- Latissimus: Maschine ----------
  { id: "latzug", de: "Latzug", en: "Lat Pulldown", bereich: "maschine", haupt: "lat", hilfs: ["bizeps", "ruecken-oben"], auch: [] },
  { id: "wide-grip-cable-lat-pulldown", de: "Latzug breit am Kabelzug", en: "Wide Grip Cable Lat Pulldown", bereich: "maschine", haupt: "lat", hilfs: [], auch: [] },
  { id: "overhand-grip-cable-lat-pulldown", de: "Latzug im Obergriff am Kabelzug", en: "Overhand Grip Cable Lat Pulldown", bereich: "maschine", haupt: "lat", hilfs: [], auch: [] },
  { id: "machine-lat-pulldown", de: "Latzug-Maschine", en: "Machine Lat Pulldown", bereich: "maschine", haupt: "lat", hilfs: [], auch: [] },
  { id: "cable-lat-pulldown", de: "Latzug am Kabelzug", en: "Cable Lat Pulldown", bereich: "maschine", haupt: "lat", hilfs: [], auch: [] },
  { id: "neutral-close-grip-cable-lat-pulldown", de: "Latzug eng im Neutralgriff am Kabelzug", en: "Neutral Close Grip Cable Lat Pulldown", bereich: "maschine", haupt: "lat", hilfs: [], auch: [] },
  { id: "underhand-wide-grip-cable-lat-pulldown", de: "Latzug breit im Untergriff am Kabelzug", en: "Underhand Wide Grip Cable Lat Pulldown", bereich: "maschine", haupt: "lat", hilfs: [], auch: [] },
  { id: "underhand-close-grip-cable-lat-pulldown", de: "Latzug eng im Untergriff am Kabelzug", en: "Underhand Close Grip Cable Lat Pulldown", bereich: "maschine", haupt: "lat", hilfs: [], auch: [] },
  { id: "half-kneeling-single-arm-elbow-lat-pulldown", de: "Latzug einarmig am Kabelzug, halbkniend", en: "Half-Kneeling Single Arm Lat Pulldown", bereich: "maschine", haupt: "lat", hilfs: [], auch: [], alias: ["Half-Kneeling Single Arm Elbow-Lat Pulldown"] },
  { id: "single-arm-cable-lat-pulldown", de: "Latzug einarmig am Kabelzug", en: "Single Arm Cable Lat Pulldown", bereich: "maschine", haupt: "lat", hilfs: [], auch: [] },
  { id: "kneeling-cable-straight-arm-lat-pulldown", de: "Latzug mit gestreckten Armen am Kabelzug, kniend", en: "Kneeling Cable Straight Arm Lat Pulldown", bereich: "maschine", haupt: "lat", hilfs: [], auch: [] },
  { id: "cable-rope-straight-arm-lat-pulldown", de: "Latzug mit gestreckten Armen am Kabelzug (Seil)", en: "Cable Rope Straight Arm Lat Pulldown", bereich: "maschine", haupt: "lat", hilfs: [], auch: [] },
  { id: "cross-body-cable-lat-pull-around", de: "Lat Pull-Around am Kabelzug", en: "Cross-Body Cable Lat Pull-Around", bereich: "maschine", haupt: "lat", hilfs: [], auch: [] },
  { id: "scapular-pulldown", de: "Scapular Pulldown", en: "Scapular Pulldown", bereich: "maschine", haupt: "lat", hilfs: [], auch: [] },
  { id: "machine-assisted-pull-up", de: "Klimmzüge an der Unterstützungsmaschine", en: "Machine-Assisted Pull-Up", bereich: "maschine", haupt: "lat", hilfs: [], auch: [] },
  { id: "machine-assisted-chin-up", de: "Klimmzüge im Untergriff an der Unterstützungsmaschine", en: "Machine-Assisted Chin-Up", bereich: "maschine", haupt: "lat", hilfs: [], auch: [] },

  // ---------- Latissimus: Freie Gewichte ----------
  { id: "kurzhantelrudern", de: "Kurzhantelrudern", en: "Dumbbell Row", bereich: "frei", haupt: "lat", hilfs: ["ruecken-oben", "bizeps"], auch: [] },
  { id: "dumbbell-pullover", de: "Überzüge (Kurzhantel)", en: "Dumbbell Pullover", bereich: "frei", haupt: "lat", hilfs: [], auch: [] },
  { id: "barbell-pullover", de: "Überzüge (Langhantel)", en: "Barbell Pullover", bereich: "frei", haupt: "lat", hilfs: [], auch: [] },
  { id: "one-arm-dumbbell-row", de: "Kurzhantelrudern einarmig", en: "One-Arm Dumbbell Row", bereich: "frei", haupt: "lat", hilfs: ["ruecken-oben"], auch: [] },
  { id: "meadows-row", de: "Meadows Row", en: "Meadows Row", bereich: "frei", haupt: "lat", hilfs: ["ruecken-oben"], auch: [] },
  { id: "pendlay-row", de: "Pendlay Row", en: "Pendlay Row", bereich: "frei", haupt: "lat", hilfs: ["ruecken-oben"], auch: [] },
  { id: "underhand-barbell-row", de: "Langhantelrudern im Untergriff", en: "Underhand Barbell Row", bereich: "frei", haupt: "lat", hilfs: [], auch: [] },
  { id: "landmine-row", de: "Landmine Row", en: "Landmine Row", bereich: "frei", haupt: "lat", hilfs: ["ruecken-oben"], auch: [] },
  { id: "seal-row", de: "Seal Row", en: "Seal Row", bereich: "frei", haupt: "lat", hilfs: ["ruecken-oben"], auch: [], alias: ["Dumbbell Seal Row", "Seal Row (Kurzhantel)"] },
  { id: "chest-supported-dumbbell-row", de: "Kurzhantelrudern mit Brustauflage", en: "Chest-Supported Dumbbell Row", bereich: "frei", haupt: "lat", hilfs: ["ruecken-oben"], auch: [] },

  // ---------- Latissimus: Eigengewicht ----------
  { id: "klimmzuege", de: "Klimmzüge", en: "Pull-Up", bereich: "eigen", haupt: "lat", hilfs: ["bizeps", "ruecken-oben"], auch: [] },
  { id: "wide-grip-pull-up", de: "Breite Klimmzüge", en: "Wide-Grip Pull-Up", bereich: "eigen", haupt: "lat", hilfs: [], auch: [] },
  { id: "neutral-grip-pull-up", de: "Klimmzüge im Neutralgriff", en: "Neutral-Grip Pull-Up", bereich: "eigen", haupt: "lat", hilfs: [], auch: [] },
  { id: "chin-up", de: "Klimmzüge im Untergriff", en: "Chin-Up", bereich: "eigen", haupt: "lat", hilfs: ["bizeps"], auch: [] },
  { id: "close-grip-chin-up", de: "Enge Klimmzüge im Untergriff", en: "Close-Grip Chin-Up", bereich: "eigen", haupt: "lat", hilfs: ["bizeps"], auch: [] },
  { id: "commando-pull-up", de: "Commando-Klimmzüge", en: "Commando Pull-Up", bereich: "eigen", haupt: "lat", hilfs: [], auch: [] },
  { id: "archer-pull-up", de: "Archer-Klimmzüge", en: "Archer Pull-Up", bereich: "eigen", haupt: "lat", hilfs: [], auch: [] },
  { id: "typewriter-pull-up", de: "Typewriter-Klimmzüge", en: "Typewriter Pull-Up", bereich: "eigen", haupt: "lat", hilfs: [], auch: [] },
  { id: "muscle-up", de: "Muscle-Up", en: "Muscle-Up", bereich: "eigen", haupt: "lat", hilfs: [], auch: [] },
  { id: "australian-pull-up", de: "Australian Pull-Up", en: "Australian Pull-Up", bereich: "eigen", haupt: "lat", hilfs: ["ruecken-oben"], auch: [], alias: ["Inverted Row"] },
  { id: "ring-row", de: "Rudern an den Ringen", en: "Ring Row", bereich: "eigen", haupt: "lat", hilfs: ["ruecken-oben"], auch: [] },
  { id: "feet-elevated-inverted-row", de: "Inverted Row mit erhöhten Füßen", en: "Feet-Elevated Inverted Row", bereich: "eigen", haupt: "lat", hilfs: [], auch: [] },
  { id: "towel-pull-up", de: "Klimmzüge am Handtuch", en: "Towel Pull-Up", bereich: "eigen", haupt: "lat", hilfs: [], auch: [] },

  // ---------- Oberer Rücken: Maschine ----------
  { id: "kabelrudern", de: "Rudern am Kabelzug", en: "Seated Cable Row", bereich: "maschine", haupt: "ruecken-oben", hilfs: ["lat", "bizeps"], auch: [] },
  { id: "chest-supported-overhand-grip-t-bar-row", de: "T-Bar-Rudern mit Brustauflage, Obergriff", en: "Chest-Supported Overhand Grip T-Bar Row", bereich: "maschine", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "chest-supported-neutral-grip-t-bar-row", de: "T-Bar-Rudern mit Brustauflage, Neutralgriff", en: "Chest-Supported Neutral Grip T-Bar Row", bereich: "maschine", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "chest-supported-semi-neutral-grip-t-bar-row", de: "T-Bar-Rudern mit Brustauflage, halbneutraler Griff", en: "Chest-Supported Semi-Neutral Grip T-Bar Row", bereich: "maschine", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "chest-supported-wide-grip-t-bar-row", de: "T-Bar-Rudern mit Brustauflage, breit", en: "Chest-Supported Wide Grip T-Bar Row", bereich: "maschine", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "neutral-wide-grip-cable-row", de: "Rudern am Kabelzug, breit im Neutralgriff", en: "Neutral Wide Grip Cable Row", bereich: "maschine", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "wide-grip-cable-row", de: "Rudern am Kabelzug, breit", en: "Wide Grip Cable Row", bereich: "maschine", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "underhand-grip-cable-row", de: "Rudern am Kabelzug, Untergriff", en: "Underhand Grip Cable Row", bereich: "maschine", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "neutral-grip-machine-row", de: "Rudermaschine, Neutralgriff", en: "Neutral Grip Machine Row", bereich: "maschine", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "standing-single-arm-cable-row", de: "Rudern am Kabelzug, einarmig stehend", en: "Standing Single Arm Cable Row", bereich: "maschine", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "seated-single-arm-cable-row", de: "Rudern am Kabelzug, einarmig sitzend", en: "Seated Single Arm Cable Row", bereich: "maschine", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "cable-rope-high-row", de: "High Row am Kabelzug (Seil)", en: "Cable Rope High Row", bereich: "maschine", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "neutral-grip-plate-loaded-machine-row", de: "Rudermaschine, Neutralgriff (Scheibengewicht)", en: "Neutral Grip Plate-Loaded Machine Row", bereich: "maschine", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "wide-grip-plate-loaded-machine-row", de: "Rudermaschine, breit (Scheibengewicht)", en: "Wide Grip Plate-Loaded Machine Row", bereich: "maschine", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "smith-machine-row", de: "Rudern an der Multipresse", en: "Smith Machine Row", bereich: "maschine", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "smith-machine-deficit-row", de: "Defizit-Rudern an der Multipresse", en: "Smith Machine Deficit Row", bereich: "maschine", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "smith-machine-pendlay-row", de: "Pendlay Row an der Multipresse", en: "Smith Machine Pendlay Row", bereich: "maschine", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "bent-over-neutral-grip-t-bar-row", de: "T-Bar-Rudern vorgebeugt, Neutralgriff", en: "Bent-Over Neutral Grip T-Bar Row", bereich: "maschine", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "bent-over-underhand-grip-t-bar-row", de: "T-Bar-Rudern vorgebeugt, Untergriff", en: "Bent-Over Underhand Grip T-Bar Row", bereich: "maschine", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "bent-over-semi-neutral-grip-t-bar-row", de: "T-Bar-Rudern vorgebeugt, halbneutraler Griff", en: "Bent-Over Semi-Neutral Grip T-Bar Row", bereich: "maschine", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "bent-over-wide-grip-t-bar-row", de: "T-Bar-Rudern vorgebeugt, breit", en: "Bent-Over Wide Grip T-Bar Row", bereich: "maschine", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "pin-loaded-row-machine", de: "Rudermaschine (Steckgewicht)", en: "Pin-Loaded Machine Row", bereich: "maschine", haupt: "ruecken-oben", hilfs: [], auch: [], alias: ["Pin-Loaded Row Machine"] },
  { id: "moto-cable-row", de: "Moto Row am Kabelzug", en: "Moto Cable Row", bereich: "maschine", haupt: "ruecken-oben", hilfs: [], auch: [] },

  // ---------- Oberer Rücken: Freie Gewichte ----------
  { id: "langhantelrudern", de: "Langhantelrudern", en: "Barbell Row", bereich: "frei", haupt: "ruecken-oben", hilfs: ["lat", "bizeps", "ruecken-unten"], auch: [] },
  { id: "t-bar-rudern", de: "T-Bar-Rudern", en: "T-Bar Row", bereich: "frei", haupt: "ruecken-oben", hilfs: ["lat", "bizeps"], auch: [] },
  { id: "wide-grip-barbell-row", de: "Breites Langhantelrudern", en: "Wide-Grip Barbell Row", bereich: "frei", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "dumbbell-rear-delt-row", de: "Rear Delt Row (Kurzhantel)", en: "Dumbbell Rear Delt Row", bereich: "frei", haupt: "ruecken-oben", hilfs: ["schulter-hinten"], auch: [] },

  // ---------- Oberer Rücken: Eigengewicht ----------
  { id: "wide-grip-inverted-row", de: "Inverted Row breit", en: "Wide-Grip Inverted Row", bereich: "eigen", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "scapular-pull-up", de: "Scapular Pull-Up", en: "Scapular Pull-Up", bereich: "eigen", haupt: "ruecken-oben", hilfs: ["trapez"], auch: [] },
  { id: "scapular-push-up", de: "Scapular Push-Up", en: "Scapular Push-Up", bereich: "eigen", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "prone-y-raise", de: "Y-Raise in Bauchlage", en: "Prone Y-Raise", bereich: "eigen", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "prone-t-raise", de: "T-Raise in Bauchlage", en: "Prone T-Raise", bereich: "eigen", haupt: "ruecken-oben", hilfs: [], auch: [] },
  { id: "reverse-snow-angel", de: "Reverse Snow Angel", en: "Reverse Snow Angel", bereich: "eigen", haupt: "ruecken-oben", hilfs: ["trapez", "schulter-hinten"], auch: [] },

  // ---------- Unterer Rücken: Maschine ----------
  { id: "machine-back-extension", de: "Rückenstrecker-Maschine", en: "Machine Back Extension", bereich: "maschine", haupt: "ruecken-unten", hilfs: [], auch: [] },
  { id: "smith-machine-good-morning", de: "Good Morning an der Multipresse", en: "Smith Machine Good Morning", bereich: "maschine", haupt: "ruecken-unten", hilfs: ["beinbeuger"], auch: [] },
  { id: "wide-stance-smith-machine-good-morning", de: "Good Morning an der Multipresse, breiter Stand", en: "Wide Stance Smith Machine Good Morning", bereich: "maschine", haupt: "ruecken-unten", hilfs: [], auch: [] },
  { id: "smith-machine-deficit-romanian-deadlift", de: "Rumänisches Defizit-Kreuzheben an der Multipresse", en: "Smith Machine Deficit Romanian Deadlift", bereich: "maschine", haupt: "ruecken-unten", hilfs: ["beinbeuger"], auch: [] },
  { id: "cable-romanian-deadlift", de: "Rumänisches Kreuzheben am Kabelzug", en: "Cable Romanian Deadlift", bereich: "maschine", haupt: "ruecken-unten", hilfs: ["beinbeuger"], auch: [] },
  { id: "seated-cable-romanian-deadlift", de: "Rumänisches Kreuzheben am Kabelzug, sitzend", en: "Seated Cable Romanian Deadlift", bereich: "maschine", haupt: "ruecken-unten", hilfs: [], auch: [] },
  { id: "seated-single-leg-cable-romanian-deadlift", de: "Rumänisches Kreuzheben am Kabelzug, sitzend einbeinig", en: "Seated Single Leg Cable Romanian Deadlift", bereich: "maschine", haupt: "ruecken-unten", hilfs: [], auch: [] },
  { id: "seated-cable-deadlift", de: "Kreuzheben am Kabelzug, sitzend", en: "Seated Cable Deadlift", bereich: "maschine", haupt: "ruecken-unten", hilfs: [], auch: [] },
  { id: "shrug-machine-deadlift", de: "Kreuzheben an der Shrug-Maschine", en: "Shrug Machine Deadlift", bereich: "maschine", haupt: "ruecken-unten", hilfs: [], auch: [] },

  // ---------- Unterer Rücken: Freie Gewichte ----------
  { id: "kreuzheben", de: "Kreuzheben", en: "Deadlift", bereich: "frei", haupt: "ruecken-unten", hilfs: ["po", "beinbeuger", "ruecken-oben", "unterarme"], auch: ["po", "beinbeuger"], alias: ["Conventional Deadlift"] },
  { id: "dumbbell-romanian-deadlift", de: "Rumänisches Kreuzheben (Kurzhantel)", en: "Dumbbell Romanian Deadlift", bereich: "frei", haupt: "ruecken-unten", hilfs: ["beinbeuger"], auch: [] },
  { id: "sumo-deadlift", de: "Sumo-Kreuzheben", en: "Sumo Deadlift", bereich: "frei", haupt: "ruecken-unten", hilfs: ["beinbeuger", "po", "adduktoren"], auch: [] },
  { id: "stiff-leg-deadlift", de: "Kreuzheben mit gestreckten Beinen", en: "Stiff-Leg Deadlift", bereich: "frei", haupt: "ruecken-unten", hilfs: ["beinbeuger"], auch: [] },
  { id: "good-morning", de: "Good Morning", en: "Good Morning", bereich: "frei", haupt: "ruecken-unten", hilfs: ["beinbeuger"], auch: [] },
  { id: "deficit-deadlift", de: "Defizit-Kreuzheben", en: "Deficit Deadlift", bereich: "frei", haupt: "ruecken-unten", hilfs: [], auch: [] },
  { id: "rack-pull", de: "Rack Pull", en: "Rack Pull", bereich: "frei", haupt: "ruecken-unten", hilfs: [], auch: [] },
  { id: "jefferson-deadlift", de: "Jefferson-Kreuzheben", en: "Jefferson Deadlift", bereich: "frei", haupt: "ruecken-unten", hilfs: [], auch: [] },
  { id: "dumbbell-good-morning", de: "Good Morning (Kurzhantel)", en: "Dumbbell Good Morning", bereich: "frei", haupt: "ruecken-unten", hilfs: [], auch: [] },

  // ---------- Unterer Rücken: Eigengewicht ----------
  { id: "bodyweight-good-morning", de: "Good Morning ohne Gewicht", en: "Bodyweight Good Morning", bereich: "eigen", haupt: "ruecken-unten", hilfs: ["beinbeuger"], auch: [] },
  { id: "single-leg-romanian-deadlift-eigen", de: "Einbeiniges rumänisches Kreuzheben", en: "Single-Leg Romanian Deadlift", bereich: "eigen", haupt: "ruecken-unten", hilfs: ["beinbeuger", "po"], auch: [], alias: ["Single-Leg Romanian Deadlift ohne Gewicht", "Einbeiniges rumänisches Kreuzheben ohne Gewicht"] },

  // ---------- Trapez: Maschine ----------
  { id: "smith-machine-shrug", de: "Shrugs an der Multipresse", en: "Smith Machine Shrug", bereich: "maschine", haupt: "trapez", hilfs: [], auch: [] },
  { id: "standing-machine-shrug", de: "Shrug-Maschine stehend", en: "Standing Machine Shrug", bereich: "maschine", haupt: "trapez", hilfs: [], auch: [] },
  { id: "cable-shrug", de: "Shrugs am Kabelzug", en: "Cable Shrug", bereich: "maschine", haupt: "trapez", hilfs: [], auch: [] },
  { id: "single-arm-cable-shrug", de: "Shrugs am Kabelzug, einarmig", en: "Single Arm Cable Shrug", bereich: "maschine", haupt: "trapez", hilfs: [], auch: [] },
  { id: "machine-cheat-shrug", de: "Cheat Shrugs an der Maschine", en: "Machine Cheat Shrug", bereich: "maschine", haupt: "trapez", hilfs: [], auch: [] },
  { id: "smith-machine-cheat-shrug", de: "Cheat Shrugs an der Multipresse", en: "Smith Machine Cheat Shrug", bereich: "maschine", haupt: "trapez", hilfs: [], auch: [] },
  { id: "pin-loaded-row-machine-kelso-shrug", de: "Kelso Shrugs an der Rudermaschine (Steckgewicht)", en: "Pin-Loaded Row Machine Kelso Shrug", bereich: "maschine", haupt: "trapez", hilfs: [], auch: [] },
  { id: "t-bar-kelso-shrug", de: "Kelso Shrugs an der T-Bar", en: "T-Bar Kelso Shrug", bereich: "maschine", haupt: "trapez", hilfs: [], auch: [] },
  { id: "seated-cable-kelso-shrug", de: "Kelso Shrugs am Kabelzug, sitzend", en: "Seated Cable Kelso Shrug", bereich: "maschine", haupt: "trapez", hilfs: [], auch: [] },
  { id: "pause-cable-shrug-in", de: "Shrug-In am Kabelzug mit Pause", en: "Pause Cable Shrug-In", bereich: "maschine", haupt: "trapez", hilfs: [], auch: [] },
  { id: "cable-shrug-in", de: "Shrug-In am Kabelzug", en: "Cable Shrug-In", bereich: "maschine", haupt: "trapez", hilfs: [], auch: [] },

  // ---------- Trapez: Freie Gewichte ----------
  { id: "barbell-shrug", de: "Shrugs (Langhantel)", en: "Barbell Shrug", bereich: "frei", haupt: "trapez", hilfs: [], auch: [] },
  { id: "dumbbell-shrug", de: "Shrugs (Kurzhantel)", en: "Dumbbell Shrug", bereich: "frei", haupt: "trapez", hilfs: [], auch: [] },
  { id: "behind-the-back-barbell-shrug", de: "Shrugs hinter dem Rücken (Langhantel)", en: "Behind-the-Back Barbell Shrug", bereich: "frei", haupt: "trapez", hilfs: [], auch: [] },
  { id: "incline-dumbbell-shrug", de: "Shrugs auf der Schrägbank (Kurzhantel)", en: "Incline Dumbbell Shrug", bereich: "frei", haupt: "trapez", hilfs: [], auch: [] },
  { id: "farmers-walk", de: "Farmer's Walk", en: "Farmer's Walk", bereich: "frei", haupt: "trapez", hilfs: ["bauch-schraeg", "unterarme"], auch: [], alias: ["Farmer's Carry"] },
  { id: "trap-bar-carry", de: "Trap Bar Carry", en: "Trap Bar Carry", bereich: "frei", haupt: "trapez", hilfs: [], auch: [] },
  { id: "high-pull", de: "High Pull", en: "High Pull", bereich: "frei", haupt: "trapez", hilfs: [], auch: [] },
  { id: "barbell-upright-row", de: "Aufrechtes Rudern (Langhantel)", en: "Barbell Upright Row", bereich: "frei", haupt: "trapez", hilfs: ["schulter-seite"], auch: [] },
  { id: "dumbbell-upright-row", de: "Aufrechtes Rudern (Kurzhantel)", en: "Dumbbell Upright Row", bereich: "frei", haupt: "trapez", hilfs: ["schulter-seite"], auch: [] },

  // ---------- Hintere Schulter: Maschine ----------
  { id: "face-pulls", de: "Face Pulls", en: "Face Pull", bereich: "maschine", haupt: "schulter-hinten", hilfs: ["ruecken-oben"], auch: [], alias: ["Cable Face Pull"] },
  { id: "innenrotation-kabel", de: "Innenrotation am Kabel mit erhobenem Arm", en: "Cable Shoulder Internal Rotation with Arm Elevated", bereich: "maschine", haupt: "schulter-rotatoren", hilfs: ["brust", "lat"], auch: [] },
  { id: "neutral-grip-machine-rear-delt-fly", de: "Reverse Butterfly, Neutralgriff", en: "Neutral Grip Machine Rear Delt Fly", bereich: "maschine", haupt: "schulter-hinten", hilfs: [], auch: [] },
  { id: "overhand-grip-machine-rear-delt-fly", de: "Reverse Butterfly, Obergriff", en: "Overhand Grip Machine Rear Delt Fly", bereich: "maschine", haupt: "schulter-hinten", hilfs: [], auch: [] },
  { id: "sideways-single-arm-machine-rear-delt-fly", de: "Reverse Butterfly, einarmig seitlich", en: "Sideways Single Arm Machine Rear Delt Fly", bereich: "maschine", haupt: "schulter-hinten", hilfs: [], auch: [] },
  { id: "overhand-grip-cable-rear-delt-fly", de: "Reverse Flys am Kabelzug, Obergriff", en: "Overhand Grip Cable Rear Delt Fly", bereich: "maschine", haupt: "schulter-hinten", hilfs: [], auch: [] },
  { id: "single-arm-45-cable-rear-delt-fly", de: "Reverse Flys 45° am Kabelzug, einarmig", en: "Single Arm 45° Cable Rear Delt Fly", bereich: "maschine", haupt: "schulter-hinten", hilfs: [], auch: [] },
  { id: "45-cable-rear-delt-fly", de: "Reverse Flys 45° am Kabelzug", en: "45° Cable Rear Delt Fly", bereich: "maschine", haupt: "schulter-hinten", hilfs: [], auch: [] },
  { id: "single-arm-cable-face-pull", de: "Face Pulls einarmig", en: "Single Arm Cable Face Pull", bereich: "maschine", haupt: "schulter-hinten", hilfs: [], auch: [] },
  { id: "high-pulley-cable-face-pull", de: "Face Pulls von oben", en: "High Pulley Cable Face Pull", bereich: "maschine", haupt: "schulter-hinten", hilfs: [], auch: [] },
  { id: "lying-pause-cable-face-pull", de: "Face Pulls liegend mit Pause", en: "Lying Pause Cable Face Pull", bereich: "maschine", haupt: "schulter-hinten", hilfs: [], auch: [] },

  // ---------- Hintere Schulter: Freie Gewichte ----------
  { id: "reverse-flys", de: "Reverse Flys", en: "Reverse Fly", bereich: "frei", haupt: "schulter-hinten", hilfs: ["ruecken-oben"], auch: [] },
  { id: "dumbbell-rear-delt-fly", de: "Reverse Flys (Kurzhantel)", en: "Dumbbell Rear Delt Fly", bereich: "frei", haupt: "schulter-hinten", hilfs: [], auch: [], alias: ["Bent-Over Dumbbell Reverse Fly", "Reverse Flys vorgebeugt (Kurzhantel)"] },
  { id: "incline-dumbbell-rear-delt-fly", de: "Reverse Flys auf der Schrägbank (Kurzhantel)", en: "Incline Dumbbell Rear Delt Fly", bereich: "frei", haupt: "schulter-hinten", hilfs: [], auch: [] },
  { id: "chest-supported-dumbbell-rear-delt-fly", de: "Reverse Flys mit Brustauflage (Kurzhantel)", en: "Chest-Supported Dumbbell Rear Delt Fly", bereich: "frei", haupt: "schulter-hinten", hilfs: [], auch: [] },
  { id: "barbell-rear-delt-row", de: "Rear Delt Row (Langhantel)", en: "Barbell Rear Delt Row", bereich: "frei", haupt: "schulter-hinten", hilfs: [], auch: [] },

  // ---------- Hintere Schulter: Eigengewicht ----------
  { id: "ring-face-pull", de: "Face Pulls an den Ringen", en: "Ring Face Pull", bereich: "eigen", haupt: "schulter-hinten", hilfs: [], auch: [] },
  { id: "prone-y-t-w-raises", de: "Y-T-W-Raises in Bauchlage", en: "Prone Y-T-W Raise", bereich: "eigen", haupt: "schulter-hinten", hilfs: [], auch: [], alias: ["Prone Y-T-W Raises"] },

  // ---------- Vordere Schulter: Maschine ----------
  { id: "plate-loaded-machine-shoulder-press", de: "Schulterpresse (Scheibengewicht)", en: "Plate-Loaded Machine Shoulder Press", bereich: "maschine", haupt: "schulter-vorn", hilfs: [], auch: [] },
  { id: "neutral-grip-machine-shoulder-press", de: "Schulterpresse, Neutralgriff", en: "Neutral Grip Machine Shoulder Press", bereich: "maschine", haupt: "schulter-vorn", hilfs: [], auch: [] },
  { id: "neutral-grip-plate-loaded-machine-shoulder-press", de: "Schulterpresse, Neutralgriff (Scheibengewicht)", en: "Neutral Grip Plate-Loaded Machine Shoulder Press", bereich: "maschine", haupt: "schulter-vorn", hilfs: [], auch: [] },
  { id: "smith-machine-overhead-press", de: "Schulterdrücken an der Multipresse", en: "Smith Machine Overhead Press", bereich: "maschine", haupt: "schulter-vorn", hilfs: [], auch: [] },
  { id: "cable-shoulder-press", de: "Schulterdrücken am Kabelzug", en: "Cable Shoulder Press", bereich: "maschine", haupt: "schulter-vorn", hilfs: [], auch: [] },
  { id: "cable-front-raise", de: "Frontheben am Kabelzug", en: "Cable Front Raise", bereich: "maschine", haupt: "schulter-vorn", hilfs: [], auch: [] },
  { id: "single-arm-cable-front-raise", de: "Frontheben am Kabelzug, einarmig", en: "Single Arm Cable Front Raise", bereich: "maschine", haupt: "schulter-vorn", hilfs: [], auch: [] },

  // ---------- Vordere Schulter: Freie Gewichte ----------
  { id: "schulterdruecken", de: "Schulterdrücken", en: "Shoulder Press", bereich: "frei", haupt: "schulter-vorn", hilfs: ["schulter-seite", "trizeps"], auch: [] },
  { id: "military-press", de: "Military Press", en: "Military Press", bereich: "frei", haupt: "schulter-vorn", hilfs: ["schulter-seite", "trizeps"], auch: [] },
  { id: "frontheben", de: "Frontheben", en: "Front Raise", bereich: "frei", haupt: "schulter-vorn", hilfs: [], auch: [] },
  { id: "arnold-press", de: "Arnold Press", en: "Arnold Press", bereich: "frei", haupt: "schulter-vorn", hilfs: ["schulter-seite", "trizeps"], auch: [] },
  { id: "barbell-overhead-press", de: "Überkopfdrücken (Langhantel)", en: "Barbell Overhead Press", bereich: "frei", haupt: "schulter-vorn", hilfs: [], auch: [] },
  { id: "dumbbell-overhead-press", de: "Überkopfdrücken (Kurzhantel)", en: "Dumbbell Overhead Press", bereich: "frei", haupt: "schulter-vorn", hilfs: [], auch: [] },
  { id: "seated-dumbbell-shoulder-press", de: "Schulterdrücken sitzend (Kurzhantel)", en: "Seated Dumbbell Shoulder Press", bereich: "frei", haupt: "schulter-vorn", hilfs: [], auch: [] },
  { id: "z-press", de: "Z-Press", en: "Z-Press", bereich: "frei", haupt: "schulter-vorn", hilfs: [], auch: [] },
  { id: "bradford-press", de: "Bradford Press", en: "Bradford Press", bereich: "frei", haupt: "schulter-vorn", hilfs: [], auch: [] },
  { id: "single-arm-dumbbell-press", de: "Schulterdrücken einarmig (Kurzhantel)", en: "Single-Arm Dumbbell Press", bereich: "frei", haupt: "schulter-vorn", hilfs: [], auch: [] },
  { id: "landmine-press", de: "Landmine Press", en: "Landmine Press", bereich: "frei", haupt: "schulter-vorn", hilfs: [], auch: [] },
  { id: "dumbbell-front-raise", de: "Frontheben (Kurzhantel)", en: "Dumbbell Front Raise", bereich: "frei", haupt: "schulter-vorn", hilfs: [], auch: [] },
  { id: "plate-front-raise", de: "Frontheben (Hantelscheibe)", en: "Plate Front Raise", bereich: "frei", haupt: "schulter-vorn", hilfs: [], auch: [] },

  // ---------- Vordere Schulter: Eigengewicht ----------
  { id: "pike-push-up", de: "Pike-Liegestütze", en: "Pike Push-Up", bereich: "eigen", haupt: "schulter-vorn", hilfs: [], auch: [] },
  { id: "elevated-pike-push-up", de: "Pike-Liegestütze mit erhöhten Füßen", en: "Elevated Pike Push-Up", bereich: "eigen", haupt: "schulter-vorn", hilfs: [], auch: [] },
  { id: "handstand-push-up", de: "Handstand-Liegestütze", en: "Handstand Push-Up", bereich: "eigen", haupt: "schulter-vorn", hilfs: ["trizeps"], auch: [] },
  { id: "wall-handstand-push-up", de: "Handstand-Liegestütze an der Wand", en: "Wall Handstand Push-Up", bereich: "eigen", haupt: "schulter-vorn", hilfs: [], auch: [] },
  { id: "freestanding-handstand-push-up", de: "Freie Handstand-Liegestütze", en: "Freestanding Handstand Push-Up", bereich: "eigen", haupt: "schulter-vorn", hilfs: [], auch: [] },
  { id: "handstand-shoulder-tap", de: "Handstand Shoulder Tap", en: "Handstand Shoulder Tap", bereich: "eigen", haupt: "schulter-vorn", hilfs: [], auch: [] },

  // ---------- Seitliche Schulter: Maschine ----------
  { id: "single-arm-high-cable-lateral-raise", de: "Seitheben am hohen Kabelzug, einarmig", en: "Single Arm High Cable Lateral Raise", bereich: "maschine", haupt: "schulter-seite", hilfs: [], auch: [] },
  { id: "single-arm-cable-lateral-raise", de: "Seitheben am Kabelzug, einarmig", en: "Single Arm Cable Lateral Raise", bereich: "maschine", haupt: "schulter-seite", hilfs: [], auch: [] },
  { id: "dual-cable-lateral-raise", de: "Seitheben am Doppelkabelzug", en: "Dual Cable Lateral Raise", bereich: "maschine", haupt: "schulter-seite", hilfs: [], auch: [] },
  { id: "behind-the-back-cable-lateral-raise", de: "Seitheben am Kabelzug hinter dem Rücken", en: "Behind-The-Back Cable Lateral Raise", bereich: "maschine", haupt: "schulter-seite", hilfs: [], auch: [] },
  { id: "leaning-cable-lateral-raise", de: "Seitheben am Kabelzug, seitlich gelehnt", en: "Leaning Cable Lateral Raise", bereich: "maschine", haupt: "schulter-seite", hilfs: [], auch: [] },
  { id: "single-arm-cable-cuffed-lateral-raise", de: "Seitheben am Kabelzug mit Manschette, einarmig", en: "Single Arm Cable Cuffed Lateral Raise", bereich: "maschine", haupt: "schulter-seite", hilfs: [], auch: [] },
  { id: "seated-machine-lateral-raise", de: "Seithebe-Maschine sitzend", en: "Seated Machine Lateral Raise", bereich: "maschine", haupt: "schulter-seite", hilfs: [], auch: [] },
  { id: "cable-upright-row", de: "Aufrechtes Rudern am Kabelzug", en: "Cable Upright Row", bereich: "maschine", haupt: "schulter-seite", hilfs: [], auch: [] },
  { id: "smith-machine-upright-row", de: "Aufrechtes Rudern an der Multipresse", en: "Smith Machine Upright Row", bereich: "maschine", haupt: "schulter-seite", hilfs: [], auch: [] },

  // ---------- Seitliche Schulter: Freie Gewichte ----------
  { id: "seitheben", de: "Seitheben", en: "Lateral Raise", bereich: "frei", haupt: "schulter-seite", hilfs: [], auch: [], alias: ["Dumbbell Lateral Raise"] },
  { id: "seated-dumbbell-lateral-raise", de: "Seitheben sitzend (Kurzhantel)", en: "Seated Dumbbell Lateral Raise", bereich: "frei", haupt: "schulter-seite", hilfs: [], auch: [] },
  { id: "leaning-dumbbell-lateral-raise", de: "Seitheben seitlich gelehnt (Kurzhantel)", en: "Leaning Dumbbell Lateral Raise", bereich: "frei", haupt: "schulter-seite", hilfs: [], auch: [] },
  { id: "incline-dumbbell-lateral-raise", de: "Seitheben auf der Schrägbank (Kurzhantel)", en: "Incline Dumbbell Lateral Raise", bereich: "frei", haupt: "schulter-seite", hilfs: [], auch: [] },

  // ---------- Bizeps: Maschine ----------
  { id: "kabelcurls", de: "Kabelcurls", en: "Cable Curl", bereich: "maschine", haupt: "bizeps", hilfs: ["unterarme"], auch: [] },
  { id: "cable-rope-hammer-curl", de: "Hammercurls am Kabelzug (Seil)", en: "Cable Rope Hammer Curl", bereich: "maschine", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "single-arm-pin-loaded-machine-preacher-curl", de: "Scottcurl-Maschine, einarmig (Steckgewicht)", en: "Single Arm Pin-Loaded Machine Preacher Curl", bereich: "maschine", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "pin-loaded-machine-preacher-curl", de: "Scottcurl-Maschine (Steckgewicht)", en: "Pin-Loaded Machine Preacher Curl", bereich: "maschine", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "cable-straight-bar-biceps-curl", de: "Bizepscurls am Kabelzug (gerade Stange)", en: "Cable Straight Bar Biceps Curl", bereich: "maschine", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "cable-ez-bar-biceps-curl", de: "Bizepscurls am Kabelzug (SZ-Stange)", en: "Cable EZ Bar Biceps Curl", bereich: "maschine", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "machine-biceps-curl-with-arms-at-sides", de: "Bizepsmaschine mit Armen am Körper", en: "Machine Biceps Curl With Arms At Sides", bereich: "maschine", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "single-arm-bayesian-curl", de: "Bayesian Curl einarmig", en: "Single Arm Bayesian Curl", bereich: "maschine", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "single-arm-cable-biceps-curl", de: "Bizepscurls am Kabelzug, einarmig", en: "Single Arm Cable Biceps Curl", bereich: "maschine", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "dual-cable-bayesian-curl", de: "Bayesian Curl am Doppelkabelzug", en: "Dual Cable Bayesian Curl", bereich: "maschine", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "cable-concentration-curl", de: "Konzentrationscurls am Kabelzug", en: "Cable Concentration Curl", bereich: "maschine", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "low-pulley-dual-cable-biceps-curl", de: "Bizepscurls am Doppelkabelzug von unten", en: "Low Pulley Dual Cable Biceps Curl", bereich: "maschine", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "single-arm-elbow-out-cable-biceps-curl", de: "Bizepscurls am Kabelzug, einarmig, Ellbogen außen", en: "Single Arm Elbow-Out Cable Biceps Curl", bereich: "maschine", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "single-arm-crucifix-curl", de: "Crucifix Curl einarmig", en: "Single Arm Crucifix Curl", bereich: "maschine", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "seated-crucifix-curl", de: "Crucifix Curl sitzend", en: "Seated Crucifix Curl", bereich: "maschine", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "seated-dual-cable-bayesian-curl", de: "Bayesian Curl am Doppelkabelzug, sitzend", en: "Seated Dual Cable Bayesian Curl", bereich: "maschine", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "cable-reverse-curl", de: "Reverse Curls am Kabelzug", en: "Cable Reverse Curl", bereich: "maschine", haupt: "bizeps", hilfs: ["unterarme"], auch: [] },

  // ---------- Bizeps: Freie Gewichte ----------
  { id: "langhantelcurls", de: "Langhantelcurls", en: "Barbell Curl", bereich: "frei", haupt: "bizeps", hilfs: ["unterarme"], auch: [] },
  { id: "kurzhantelcurls", de: "Kurzhantelcurls", en: "Dumbbell Curl", bereich: "frei", haupt: "bizeps", hilfs: ["unterarme"], auch: [], alias: ["Standing Dumbbell Curl", "Kurzhantelcurls stehend"] },
  { id: "hammercurls", de: "Hammercurls", en: "Hammer Curl", bereich: "frei", haupt: "bizeps", hilfs: ["unterarme"], auch: ["unterarme"] },
  { id: "scottcurls", de: "Scottcurls", en: "Preacher Curl", bereich: "frei", haupt: "bizeps", hilfs: ["unterarme"], auch: [] },
  { id: "konzentrationscurls", de: "Konzentrationscurls", en: "Concentration Curl", bereich: "frei", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "ez-bar-curl", de: "SZ-Curls", en: "EZ-Bar Curl", bereich: "frei", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "alternating-dumbbell-curl", de: "Kurzhantelcurls im Wechsel", en: "Alternating Dumbbell Curl", bereich: "frei", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "seated-dumbbell-curl", de: "Kurzhantelcurls sitzend", en: "Seated Dumbbell Curl", bereich: "frei", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "cross-body-hammer-curl", de: "Cross-Body-Hammercurls", en: "Cross-Body Hammer Curl", bereich: "frei", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "reverse-barbell-curl", de: "Reverse Curls (Langhantel)", en: "Reverse Barbell Curl", bereich: "frei", haupt: "bizeps", hilfs: ["unterarme"], auch: [] },
  { id: "reverse-dumbbell-curl", de: "Reverse Curls (Kurzhantel)", en: "Reverse Dumbbell Curl", bereich: "frei", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "zottman-curl", de: "Zottman Curls", en: "Zottman Curl", bereich: "frei", haupt: "bizeps", hilfs: ["unterarme"], auch: [] },
  { id: "incline-dumbbell-curl", de: "Kurzhantelcurls auf der Schrägbank", en: "Incline Dumbbell Curl", bereich: "frei", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "drag-curl", de: "Drag Curls", en: "Drag Curl", bereich: "frei", haupt: "bizeps", hilfs: [], auch: [] },

  // ---------- Bizeps: Eigengewicht ----------
  { id: "commando-chin-up", de: "Commando Chin-Up", en: "Commando Chin-Up", bereich: "eigen", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "towel-chin-up", de: "Klimmzüge im Untergriff am Handtuch", en: "Towel Chin-Up", bereich: "eigen", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "archer-chin-up", de: "Archer Chin-Up", en: "Archer Chin-Up", bereich: "eigen", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "ring-chin-up", de: "Klimmzüge im Untergriff an den Ringen", en: "Ring Chin-Up", bereich: "eigen", haupt: "bizeps", hilfs: [], auch: [] },
  { id: "inverted-row-mit-supiniertem-griff", de: "Inverted Row im Untergriff", en: "Underhand Inverted Row", bereich: "eigen", haupt: "bizeps", hilfs: [], auch: [], alias: ["Inverted Row mit supiniertem Griff"] },

  // ---------- Trizeps: Maschine ----------
  { id: "trizepsdruecken-kabel", de: "Trizepsdrücken am Kabel", en: "Cable Triceps Pushdown", bereich: "maschine", haupt: "trizeps", hilfs: [], auch: [] },
  { id: "enges-bankdruecken-multi", de: "Enges Bankdrücken an der Multipresse", en: "Close Grip Smith Machine Bench Press", bereich: "maschine", haupt: "trizeps", hilfs: ["brust", "schulter-vorn"], auch: ["brust"] },
  { id: "trizeps-dips-assistiert", de: "Trizeps-Dips an der Unterstützungsmaschine", en: "Machine Assisted Triceps Dip", bereich: "maschine", haupt: "trizeps", hilfs: ["brust", "schulter-vorn"], auch: ["brust"], alias: ["Machine-Assisted Triceps Dip"] },
  { id: "dip-maschine-trizeps", de: "Dip-Maschine sitzend, Trizeps (Steckgewicht)", en: "Seated Pin-Loaded Machine Triceps Dip", bereich: "maschine", haupt: "trizeps", hilfs: ["brust", "schulter-vorn"], auch: ["brust"] },
  { id: "jm-press-multi", de: "JM Press an der Multipresse", en: "Smith Machine JM Press", bereich: "maschine", haupt: "trizeps", hilfs: ["schulter-vorn", "brust"], auch: [] },
  { id: "single-arm-cable-overhead-triceps-extension", de: "Überkopf-Trizepsstrecken am Kabelzug, einarmig", en: "Single Arm Cable Overhead Triceps Extension", bereich: "maschine", haupt: "trizeps", hilfs: [], auch: [] },
  { id: "single-arm-neutral-grip-cable-triceps-pushdown", de: "Trizepsdrücken am Kabelzug, einarmig im Neutralgriff", en: "Single Arm Neutral Grip Cable Triceps Pushdown", bereich: "maschine", haupt: "trizeps", hilfs: [], auch: [] },
  { id: "cable-v-bar-triceps-pushdown", de: "Trizepsdrücken am Kabelzug (V-Griff)", en: "Cable V-Bar Triceps Pushdown", bereich: "maschine", haupt: "trizeps", hilfs: [], auch: [] },
  { id: "cable-straight-bar-triceps-pushdown", de: "Trizepsdrücken am Kabelzug (gerade Stange)", en: "Cable Straight Bar Triceps Pushdown", bereich: "maschine", haupt: "trizeps", hilfs: [], auch: [] },
  { id: "cable-v-bar-overhead-triceps-extension", de: "Überkopf-Trizepsstrecken am Kabelzug (V-Griff)", en: "Cable V-Bar Overhead Triceps Extension", bereich: "maschine", haupt: "trizeps", hilfs: [], auch: [] },
  { id: "high-pulley-cable-straight-bar-overhead-triceps-extension", de: "Überkopf-Trizepsstrecken am Kabelzug von oben (gerade Stange)", en: "High Pulley Cable Straight Bar Overhead Triceps Extension", bereich: "maschine", haupt: "trizeps", hilfs: [], auch: [] },
  { id: "machine-triceps-extension", de: "Trizepsmaschine", en: "Machine Triceps Extension", bereich: "maschine", haupt: "trizeps", hilfs: [], auch: [] },
  { id: "neutral-grip-cable-triceps-kickback", de: "Trizeps-Kickbacks am Kabelzug, Neutralgriff", en: "Neutral Grip Cable Triceps Kickback", bereich: "maschine", haupt: "trizeps", hilfs: [], auch: [] },
  { id: "underhand-grip-cable-triceps-pushdown", de: "Trizepsdrücken am Kabelzug, Untergriff", en: "Underhand Grip Cable Triceps Pushdown", bereich: "maschine", haupt: "trizeps", hilfs: [], auch: [] },
  { id: "cable-dual-rope-diverging-triceps", de: "Trizepsdrücken am Kabelzug mit zwei Seilen", en: "Dual Rope Cable Triceps Pushdown", bereich: "maschine", haupt: "trizeps", hilfs: [], auch: [], alias: ["Cable Dual Rope Diverging Triceps"] },
  { id: "dual-cable-triceps-press", de: "Trizepsdrücken am Doppelkabelzug", en: "Dual Cable Triceps Press", bereich: "maschine", haupt: "trizeps", hilfs: [], auch: [] },
  { id: "cable-skull-crusher", de: "French Press am Kabelzug", en: "Cable Skull Crusher", bereich: "maschine", haupt: "trizeps", hilfs: [], auch: [] },
  { id: "pause-machine-assisted-dip", de: "Dips an der Unterstützungsmaschine mit Pause", en: "Pause Machine-Assisted Dip", bereich: "maschine", haupt: "trizeps", hilfs: [], auch: [] },

  // ---------- Trizeps: Freie Gewichte ----------
  { id: "enges-bankdruecken-lh", de: "Enges Bankdrücken (Langhantel)", en: "Close Grip Bench Press", bereich: "frei", haupt: "trizeps", hilfs: ["brust", "schulter-vorn"], auch: ["brust"], alias: ["Close-Grip Bench Press"] },
  { id: "french-press", de: "French Press", en: "Skull Crusher", bereich: "frei", haupt: "trizeps", hilfs: [], auch: [] },
  { id: "ueberkopf-trizepsstrecken", de: "Überkopf-Trizepsstrecken", en: "Overhead Triceps Extension", bereich: "frei", haupt: "trizeps", hilfs: [], auch: [] },
  { id: "kickbacks", de: "Kickbacks", en: "Triceps Kickback", bereich: "frei", haupt: "trizeps", hilfs: ["schulter-hinten"], auch: [], alias: ["Dumbbell Kickback"] },
  { id: "enges-negativbank-lh", de: "Enges Negativ-Bankdrücken (Langhantel)", en: "Decline Close Grip Press", bereich: "frei", haupt: "trizeps", hilfs: ["brust", "schulter-vorn"], auch: ["brust"] },
  { id: "jm-press-lh", de: "JM Press (Langhantel)", en: "Barbell JM Press", bereich: "frei", haupt: "trizeps", hilfs: ["schulter-vorn", "brust"], auch: [], alias: ["JM Press"] },
  { id: "lockout-bank-lh", de: "Lockout-Bankdrücken aus den Pins (Langhantel)", en: "Lockout Pin Bench Press", bereich: "frei", haupt: "trizeps", hilfs: ["schulter-vorn", "brust"], auch: [] },
  { id: "dumbbell-overhead-triceps-extension", de: "Überkopf-Trizepsstrecken (Kurzhantel)", en: "Dumbbell Overhead Triceps Extension", bereich: "frei", haupt: "trizeps", hilfs: [], auch: [], alias: ["Two-Arm Dumbbell Overhead Extension", "Überkopf-Trizepsstrecken beidarmig (Kurzhantel)"] },
  { id: "single-arm-dumbbell-overhead-extension", de: "Überkopf-Trizepsstrecken einarmig (Kurzhantel)", en: "Single-Arm Dumbbell Overhead Extension", bereich: "frei", haupt: "trizeps", hilfs: [], auch: [] },
  { id: "ez-bar-skull-crusher", de: "French Press (SZ-Stange)", en: "EZ-Bar Skull Crusher", bereich: "frei", haupt: "trizeps", hilfs: [], auch: [] },
  { id: "dumbbell-skull-crusher", de: "French Press (Kurzhantel)", en: "Dumbbell Skull Crusher", bereich: "frei", haupt: "trizeps", hilfs: [], auch: [] },
  { id: "dumbbell-tate-press", de: "Tate Press (Kurzhantel)", en: "Dumbbell Tate Press", bereich: "frei", haupt: "trizeps", hilfs: [], auch: [] },

  // ---------- Trizeps: Eigengewicht ----------
  { id: "trizeps-dips", de: "Trizeps-Dips", en: "Triceps Dip", bereich: "eigen", haupt: "trizeps", hilfs: ["brust", "schulter-vorn"], auch: ["brust"] },
  { id: "enge-liegestuetze", de: "Enge Liegestütze", en: "Close Grip Push-Up", bereich: "eigen", haupt: "trizeps", hilfs: ["brust", "schulter-vorn", "bauch"], auch: ["brust"], alias: ["Close-Grip Push-Up"] },
  { id: "diamant-liegestuetze", de: "Diamant-Liegestütze", en: "Diamond Push-Up", bereich: "eigen", haupt: "trizeps", hilfs: ["brust", "schulter-vorn", "bauch"], auch: ["brust"] },
  { id: "enge-liegestuetze-knie", de: "Enge Liegestütze auf den Knien", en: "Kneeling Close Grip Push-Up", bereich: "eigen", haupt: "trizeps", hilfs: ["brust", "schulter-vorn"], auch: ["brust"] },
  { id: "trizeps-dips-gewicht", de: "Trizeps-Dips mit Zusatzgewicht", en: "Weighted Triceps Dip", bereich: "eigen", haupt: "trizeps", hilfs: ["brust", "schulter-vorn"], auch: ["brust"] },
  { id: "bench-parallel-bar-dip", de: "Dips an Bank oder Barren", en: "Bench/Parallel-Bar Dip", bereich: "eigen", haupt: "trizeps", hilfs: [], auch: [] },
  { id: "ring-dip", de: "Dips an den Ringen", en: "Ring Dip", bereich: "eigen", haupt: "trizeps", hilfs: [], auch: [] },
  { id: "korean-dip", de: "Korean Dips", en: "Korean Dip", bereich: "eigen", haupt: "trizeps", hilfs: [], auch: [] },
  { id: "bodyweight-triceps-extension", de: "Trizepsstrecken mit Eigengewicht", en: "Bodyweight Triceps Extension", bereich: "eigen", haupt: "trizeps", hilfs: [], auch: [] },
  { id: "ring-triceps-extension", de: "Trizepsstrecken an den Ringen", en: "Ring Triceps Extension", bereich: "eigen", haupt: "trizeps", hilfs: [], auch: [] },

  // ---------- Quadrizeps: Maschine ----------
  { id: "beinpresse", de: "Beinpresse", en: "Leg Press", bereich: "maschine", haupt: "quadrizeps", hilfs: ["po"], auch: [] },
  { id: "beinstrecker", de: "Beinstrecker", en: "Leg Extension", bereich: "maschine", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "45-leg-press", de: "Beinpresse 45°", en: "45° Leg Press", bereich: "maschine", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "pin-loaded-leg-press", de: "Beinpresse (Steckgewicht)", en: "Pin-Loaded Leg Press", bereich: "maschine", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "single-leg-45-leg-press", de: "Beinpresse 45°, einbeinig", en: "Single Leg 45° Leg Press", bereich: "maschine", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "single-leg-pin-loaded-leg-press", de: "Beinpresse einbeinig (Steckgewicht)", en: "Single Leg Pin-Loaded Leg Press", bereich: "maschine", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "hack-squat", de: "Hack Squat", en: "Hack Squat", bereich: "maschine", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "pause-hack-squat", de: "Hack Squat mit Pause", en: "Pause Hack Squat", bereich: "maschine", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "pin-loaded-quad-biased-leg-press", de: "Beinpresse, Fokus Quadrizeps (Steckgewicht)", en: "Pin-Loaded Quad-Biased Leg Press", bereich: "maschine", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "smith-machine-back-squat", de: "Kniebeuge an der Multipresse", en: "Smith Machine Back Squat", bereich: "maschine", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "smith-machine-lunge", de: "Ausfallschritte an der Multipresse", en: "Smith Machine Lunge", bereich: "maschine", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "smith-machine-split-squat", de: "Split Squats an der Multipresse", en: "Smith Machine Split Squat", bereich: "maschine", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "smith-machine-bulgarian-split-squat", de: "Bulgarian Split Squats an der Multipresse", en: "Smith Machine Bulgarian Split Squat", bereich: "maschine", haupt: "quadrizeps", hilfs: ["po"], auch: [] },
  { id: "smith-machine-front-foot-elevated-split-squat", de: "Split Squats an der Multipresse, vorderer Fuß erhöht", en: "Smith Machine Front Foot Elevated Split Squat", bereich: "maschine", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "cable-belt-squat", de: "Belt Squat am Kabelzug", en: "Cable Belt Squat", bereich: "maschine", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "single-leg-leg-extension", de: "Beinstrecker einbeinig", en: "Single Leg Leg Extension", bereich: "maschine", haupt: "quadrizeps", hilfs: [], auch: [] },

  // ---------- Quadrizeps: Freie Gewichte ----------
  { id: "kniebeuge", de: "Kniebeuge", en: "Squat", bereich: "frei", haupt: "quadrizeps", hilfs: ["po", "ruecken-unten"], auch: ["po"], alias: ["Barbell Back Squat"] },
  { id: "ausfallschritte", de: "Ausfallschritte", en: "Lunge", bereich: "frei", haupt: "quadrizeps", hilfs: ["po"], auch: ["po"] },
  { id: "bulgarian-split-squats", de: "Bulgarian Split Squats", en: "Bulgarian Split Squat", bereich: "frei", haupt: "quadrizeps", hilfs: ["po"], auch: ["po"] },
  { id: "high-bar-back-squat", de: "High-Bar-Kniebeuge", en: "High-Bar Back Squat", bereich: "frei", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "low-bar-back-squat", de: "Low-Bar-Kniebeuge", en: "Low-Bar Back Squat", bereich: "frei", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "front-squat", de: "Frontkniebeuge", en: "Front Squat", bereich: "frei", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "goblet-squat", de: "Goblet Squat", en: "Goblet Squat", bereich: "frei", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "dumbbell-split-squat", de: "Split Squats (Kurzhantel)", en: "Dumbbell Split Squat", bereich: "frei", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "walking-dumbbell-lunge", de: "Ausfallschritte im Gehen (Kurzhantel)", en: "Walking Dumbbell Lunge", bereich: "frei", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "reverse-dumbbell-lunge", de: "Ausfallschritte rückwärts (Kurzhantel)", en: "Reverse Dumbbell Lunge", bereich: "frei", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "forward-dumbbell-lunge", de: "Ausfallschritte vorwärts (Kurzhantel)", en: "Forward Dumbbell Lunge", bereich: "frei", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "barbell-lunge", de: "Ausfallschritte (Langhantel)", en: "Barbell Lunge", bereich: "frei", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "dumbbell-step-up", de: "Step-ups (Kurzhantel)", en: "Dumbbell Step-Up", bereich: "frei", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "zercher-squat", de: "Zercher-Kniebeuge", en: "Zercher Squat", bereich: "frei", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "hack-squat-mit-langhantel", de: "Hack Squat (Langhantel)", en: "Barbell Hack Squat", bereich: "frei", haupt: "quadrizeps", hilfs: [], auch: [], alias: ["Hack Squat mit Langhantel"] },
  { id: "heel-elevated-goblet-squat", de: "Goblet Squat mit erhöhten Fersen", en: "Heel-Elevated Goblet Squat", bereich: "frei", haupt: "quadrizeps", hilfs: [], auch: [] },

  // ---------- Quadrizeps: Eigengewicht ----------
  { id: "sissy-squat-eigen", de: "Sissy Squat", en: "Sissy Squat", bereich: "eigen", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "bodyweight-squat", de: "Kniebeuge ohne Gewicht", en: "Bodyweight Squat", bereich: "eigen", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "tempo-squat", de: "Tempo-Kniebeuge", en: "Tempo Squat", bereich: "eigen", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "pause-squat", de: "Kniebeuge mit Pause", en: "Pause Squat", bereich: "eigen", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "bulgarian-split-squat-eigen", de: "Bulgarian Split Squats ohne Gewicht", en: "Bodyweight Bulgarian Split Squat", bereich: "eigen", haupt: "quadrizeps", hilfs: ["po"], auch: [] },
  { id: "walking-lunge-eigen", de: "Ausfallschritte im Gehen", en: "Walking Lunge", bereich: "eigen", haupt: "quadrizeps", hilfs: ["po"], auch: [] },
  { id: "reverse-lunge-eigen", de: "Ausfallschritte rückwärts", en: "Reverse Lunge", bereich: "eigen", haupt: "quadrizeps", hilfs: ["po"], auch: [] },
  { id: "forward-lunge", de: "Ausfallschritte vorwärts", en: "Forward Lunge", bereich: "eigen", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "jump-squat", de: "Sprungkniebeuge", en: "Jump Squat", bereich: "eigen", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "split-squat", de: "Split Squats", en: "Split Squat", bereich: "eigen", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "shrimp-squat", de: "Shrimp Squat", en: "Shrimp Squat", bereich: "eigen", haupt: "quadrizeps", hilfs: ["po"], auch: [] },
  { id: "pistol-squat", de: "Pistol Squat", en: "Pistol Squat", bereich: "eigen", haupt: "quadrizeps", hilfs: ["po"], auch: [] },
  { id: "assisted-pistol-squat", de: "Pistol Squat mit Unterstützung", en: "Assisted Pistol Squat", bereich: "eigen", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "cyclist-squat", de: "Cyclist Squat", en: "Cyclist Squat", bereich: "eigen", haupt: "quadrizeps", hilfs: [], auch: [] },

  // ---------- Beinbeuger: Maschine ----------
  { id: "beinbeuger-maschine", de: "Beinbeuger", en: "Leg Curl", bereich: "maschine", haupt: "beinbeuger", hilfs: [], auch: [] },
  { id: "lying-hamstring-curl", de: "Beinbeuger liegend", en: "Lying Hamstring Curl", bereich: "maschine", haupt: "beinbeuger", hilfs: [], auch: [] },
  { id: "seated-hamstring-curl", de: "Beinbeuger sitzend", en: "Seated Hamstring Curl", bereich: "maschine", haupt: "beinbeuger", hilfs: [], auch: [] },
  { id: "seated-single-leg-hamstring-curl", de: "Beinbeuger sitzend, einbeinig", en: "Seated Single Leg Hamstring Curl", bereich: "maschine", haupt: "beinbeuger", hilfs: [], auch: [] },
  { id: "seated-accentuated-eccentric-hamstring-curl", de: "Beinbeuger sitzend, betont exzentrisch", en: "Seated Accentuated Eccentric Hamstring Curl", bereich: "maschine", haupt: "beinbeuger", hilfs: [], auch: [] },
  { id: "standing-cable-leg-curl", de: "Beinbeuger stehend am Kabelzug", en: "Standing Cable Leg Curl", bereich: "maschine", haupt: "beinbeuger", hilfs: [], auch: [] },

  // ---------- Beinbeuger: Freie Gewichte ----------
  { id: "rumaenisches-kreuzheben", de: "Rumänisches Kreuzheben", en: "Romanian Deadlift", bereich: "frei", haupt: "beinbeuger", hilfs: ["po", "ruecken-unten"], auch: ["po"], alias: ["Barbell Romanian Deadlift"] },
  { id: "dumbbell-leg-curl", de: "Beinbeuger mit Kurzhantel", en: "Dumbbell Leg Curl", bereich: "frei", haupt: "beinbeuger", hilfs: [], auch: [] },

  // ---------- Beinbeuger: Eigengewicht ----------
  { id: "nordic-hamstring-curl", de: "Nordic Hamstring Curl", en: "Nordic Hamstring Curl", bereich: "eigen", haupt: "beinbeuger", hilfs: [], auch: [], alias: ["Nordic Curl"] },
  { id: "glute-ham-raise-eigen", de: "Glute-Ham Raise", en: "Glute-Ham Raise", bereich: "eigen", haupt: "beinbeuger", hilfs: [], auch: [] },
  { id: "sliding-leg-curl-eigen", de: "Sliding Leg Curl", en: "Sliding Leg Curl", bereich: "eigen", haupt: "beinbeuger", hilfs: [], auch: [] },
  { id: "razor-curl-eigen", de: "Razor Curl", en: "Razor Curl", bereich: "eigen", haupt: "beinbeuger", hilfs: [], auch: [] },
  { id: "assisted-nordic-curl", de: "Nordic Curl mit Unterstützung", en: "Assisted Nordic Curl", bereich: "eigen", haupt: "beinbeuger", hilfs: [], auch: [] },
  { id: "single-leg-sliding-leg-curl", de: "Sliding Leg Curl einbeinig", en: "Single-Leg Sliding Leg Curl", bereich: "eigen", haupt: "beinbeuger", hilfs: [], auch: [] },

  // ---------- Po: Maschine ----------
  { id: "kickbacks-kabel", de: "Kickbacks am Kabel", en: "Cable Glute Kickback", bereich: "maschine", haupt: "po", hilfs: ["beinbeuger"], auch: [] },
  { id: "plate-loaded-machine-hip-thrust", de: "Hip-Thrust-Maschine (Scheibengewicht)", en: "Plate-Loaded Machine Hip Thrust", bereich: "maschine", haupt: "po", hilfs: [], auch: [] },
  { id: "smith-machine-hip-thrust", de: "Hip Thrust an der Multipresse", en: "Smith Machine Hip Thrust", bereich: "maschine", haupt: "po", hilfs: [], auch: [] },
  { id: "single-leg-smith-machine-hip-thrust", de: "Hip Thrust an der Multipresse, einbeinig", en: "Single Leg Smith Machine Hip Thrust", bereich: "maschine", haupt: "po", hilfs: [], auch: [] },
  { id: "single-leg-plate-loaded-machine-hip-thrust", de: "Hip-Thrust-Maschine, einbeinig (Scheibengewicht)", en: "Single Leg Plate-Loaded Machine Hip Thrust", bereich: "maschine", haupt: "po", hilfs: [], auch: [] },
  { id: "standing-pin-loaded-machine-glute-kickback", de: "Kickback-Maschine stehend (Steckgewicht)", en: "Standing Pin-Loaded Machine Glute Kickback", bereich: "maschine", haupt: "po", hilfs: [], auch: [] },
  { id: "cable-pull-through", de: "Pull-Through am Kabelzug", en: "Cable Pull-Through", bereich: "maschine", haupt: "po", hilfs: [], auch: [] },
  { id: "45-glute-biased-leg-press", de: "Beinpresse 45°, Fokus Po", en: "45° Glute-Biased Leg Press", bereich: "maschine", haupt: "po", hilfs: [], auch: [] },

  // ---------- Po: Freie Gewichte ----------
  { id: "hip-thrust", de: "Hip Thrust", en: "Hip Thrust", bereich: "frei", haupt: "po", hilfs: ["beinbeuger"], auch: [], alias: ["Barbell Hip Thrust"] },
  { id: "sumo-kniebeuge", de: "Sumo-Kniebeuge", en: "Sumo Squat", bereich: "frei", haupt: "po", hilfs: ["quadrizeps"], auch: ["quadrizeps"] },
  { id: "dumbbell-hip-thrust", de: "Hip Thrust (Kurzhantel)", en: "Dumbbell Hip Thrust", bereich: "frei", haupt: "po", hilfs: [], auch: [] },
  { id: "barbell-glute-bridge", de: "Glute Bridge (Langhantel)", en: "Barbell Glute Bridge", bereich: "frei", haupt: "po", hilfs: [], auch: [] },
  { id: "dumbbell-glute-bridge", de: "Glute Bridge (Kurzhantel)", en: "Dumbbell Glute Bridge", bereich: "frei", haupt: "po", hilfs: [], auch: [] },
  { id: "high-step-up", de: "Hohe Step-ups", en: "High Step-Up", bereich: "frei", haupt: "po", hilfs: [], auch: [] },
  { id: "deficit-reverse-lunge", de: "Defizit-Ausfallschritte rückwärts", en: "Deficit Reverse Lunge", bereich: "frei", haupt: "po", hilfs: [], auch: [] },

  // ---------- Po: Eigengewicht ----------
  { id: "glute-bridge", de: "Glute Bridge", en: "Glute Bridge", bereich: "eigen", haupt: "po", hilfs: ["beinbeuger"], auch: [] },
  { id: "step-ups", de: "Step-ups", en: "Step-Up", bereich: "eigen", haupt: "po", hilfs: ["quadrizeps"], auch: ["quadrizeps"] },
  { id: "curtsy-lunge-eigen", de: "Curtsy Lunge", en: "Curtsy Lunge", bereich: "eigen", haupt: "po", hilfs: ["abduktoren"], auch: [] },
  { id: "single-leg-glute-bridge", de: "Glute Bridge einbeinig", en: "Single-Leg Glute Bridge", bereich: "eigen", haupt: "po", hilfs: [], auch: [] },
  { id: "hip-thrust-eigen", de: "Hip Thrust", en: "Hip Thrust", bereich: "eigen", haupt: "po", hilfs: [], auch: [] },
  { id: "single-leg-hip-thrust", de: "Hip Thrust einbeinig", en: "Single-Leg Hip Thrust", bereich: "eigen", haupt: "po", hilfs: [], auch: [] },

  // ---------- Adduktoren: Maschine ----------
  { id: "reclined-machine-hip-adduction", de: "Adduktorenmaschine, zurückgelehnt", en: "Reclined Machine Hip Adduction", bereich: "maschine", haupt: "adduktoren", hilfs: [], auch: [] },
  { id: "cable-hip-adduction", de: "Adduktion am Kabelzug", en: "Cable Hip Adduction", bereich: "maschine", haupt: "adduktoren", hilfs: [], auch: [] },

  // ---------- Adduktoren: Freie Gewichte ----------
  { id: "deficit-cossack-squat", de: "Defizit-Cossack-Squat", en: "Deficit Cossack Squat", bereich: "frei", haupt: "adduktoren", hilfs: [], auch: [] },
  { id: "wide-stance-romanian-deadlift", de: "Rumänisches Kreuzheben im breiten Stand", en: "Wide-Stance Romanian Deadlift", bereich: "frei", haupt: "adduktoren", hilfs: [], auch: [] },

  // ---------- Adduktoren: Eigengewicht ----------
  { id: "wide-stance-squat-eigen", de: "Kniebeuge im breiten Stand", en: "Wide-Stance Squat", bereich: "eigen", haupt: "adduktoren", hilfs: [], auch: [] },
  { id: "cossack-squat-eigen", de: "Cossack Squat", en: "Cossack Squat", bereich: "eigen", haupt: "adduktoren", hilfs: [], auch: [] },
  { id: "lateral-lunge-eigen", de: "Seitliche Ausfallschritte", en: "Lateral Lunge", bereich: "eigen", haupt: "adduktoren", hilfs: [], auch: [] },
  { id: "copenhagen-plank", de: "Copenhagen Plank", en: "Copenhagen Plank", bereich: "eigen", haupt: "adduktoren", hilfs: ["bauch-schraeg"], auch: [] },

  // ---------- Abduktoren: Maschine ----------
  { id: "abduktorenmaschine", de: "Abduktorenmaschine", en: "Hip Abduction Machine", bereich: "maschine", haupt: "abduktoren", hilfs: ["po"], auch: [] },
  { id: "cable-hip-abduction-leg-behind-body", de: "Abduktion am Kabelzug, Bein hinter dem Körper", en: "Cable Hip Abduction – Leg Behind Body", bereich: "maschine", haupt: "abduktoren", hilfs: [], auch: [] },
  { id: "cable-hip-abduction-leg-in-front-of-body", de: "Abduktion am Kabelzug, Bein vor dem Körper", en: "Cable Hip Abduction – Leg In Front of Body", bereich: "maschine", haupt: "abduktoren", hilfs: [], auch: [] },
  { id: "leaning-forward-machine-hip-abduction", de: "Abduktorenmaschine, vorgebeugt", en: "Leaning Forward Machine Hip Abduction", bereich: "maschine", haupt: "abduktoren", hilfs: [], auch: [] },

  // ---------- Abduktoren: Eigengewicht ----------
  { id: "side-lying-leg-raise-eigen", de: "Beinheben in Seitlage", en: "Side-Lying Leg Raise", bereich: "eigen", haupt: "abduktoren", hilfs: [], auch: [] },
  { id: "standing-hip-abduction", de: "Abduktion im Stehen", en: "Standing Hip Abduction", bereich: "eigen", haupt: "abduktoren", hilfs: [], auch: [] },
  { id: "banded-lateral-walk", de: "Seitwärtsgehen mit Band", en: "Banded Lateral Walk", bereich: "eigen", haupt: "abduktoren", hilfs: [], auch: [] },
  { id: "banded-monster-walk", de: "Monster Walk mit Band", en: "Banded Monster Walk", bereich: "eigen", haupt: "abduktoren", hilfs: [], auch: [] },
  { id: "single-leg-squat-eigen", de: "Einbeinige Kniebeuge", en: "Single-Leg Squat", bereich: "eigen", haupt: "abduktoren", hilfs: [], auch: [] },
  { id: "lateral-step-up-eigen", de: "Seitliche Step-ups", en: "Lateral Step-Up", bereich: "eigen", haupt: "abduktoren", hilfs: [], auch: [] },
  { id: "skater-squat", de: "Skater Squat", en: "Skater Squat", bereich: "eigen", haupt: "abduktoren", hilfs: [], auch: [] },

  // ---------- Waden: Maschine ----------
  { id: "wadenheben", de: "Wadenheben", en: "Calf Raise", bereich: "maschine", haupt: "waden", hilfs: [], auch: [], alias: ["Standing Machine Calf Raise", "Wadenheben stehend (Maschine)", "Machine Calf Raise"] },
  { id: "45-leg-press-calf-raise", de: "Wadenheben an der Beinpresse 45°", en: "45° Leg Press Calf Raise", bereich: "maschine", haupt: "waden", hilfs: [], auch: [] },
  { id: "pin-loaded-leg-press-calf-jump", de: "Wadensprünge an der Beinpresse (Steckgewicht)", en: "Pin-Loaded Leg Press Calf Jump", bereich: "maschine", haupt: "waden", hilfs: [], auch: [] },
  { id: "standing-smith-machine-calf-raise", de: "Wadenheben stehend an der Multipresse", en: "Standing Smith Machine Calf Raise", bereich: "maschine", haupt: "waden", hilfs: [], auch: [] },
  { id: "single-leg-45-leg-press-calf-raise", de: "Wadenheben an der Beinpresse 45°, einbeinig", en: "Single Leg 45° Leg Press Calf Raise", bereich: "maschine", haupt: "waden", hilfs: [], auch: [] },
  { id: "45-leg-press-calf-jump", de: "Wadensprünge an der Beinpresse 45°", en: "45° Leg Press Calf Jump", bereich: "maschine", haupt: "waden", hilfs: [], auch: [] },
  { id: "seated-calf-raise", de: "Wadenheben sitzend", en: "Seated Calf Raise", bereich: "maschine", haupt: "waden", hilfs: [], auch: [] },

  // ---------- Waden: Freie Gewichte ----------
  { id: "dumbbell-standing-calf-raise", de: "Wadenheben stehend (Kurzhantel)", en: "Dumbbell Standing Calf Raise", bereich: "frei", haupt: "waden", hilfs: [], auch: [] },
  { id: "barbell-standing-calf-raise", de: "Wadenheben stehend (Langhantel)", en: "Barbell Standing Calf Raise", bereich: "frei", haupt: "waden", hilfs: [], auch: [] },
  { id: "dumbbell-seated-calf-raise", de: "Wadenheben sitzend (Kurzhantel)", en: "Dumbbell Seated Calf Raise", bereich: "frei", haupt: "waden", hilfs: [], auch: [] },
  { id: "barbell-seated-calf-raise", de: "Wadenheben sitzend (Langhantel)", en: "Barbell Seated Calf Raise", bereich: "frei", haupt: "waden", hilfs: [], auch: [] },

  // ---------- Waden: Eigengewicht ----------
  { id: "standing-calf-raise", de: "Wadenheben stehend", en: "Standing Calf Raise", bereich: "eigen", haupt: "waden", hilfs: [], auch: [] },
  { id: "single-leg-standing-calf-raise", de: "Wadenheben stehend, einbeinig", en: "Single-Leg Standing Calf Raise", bereich: "eigen", haupt: "waden", hilfs: [], auch: [] },
  { id: "donkey-calf-raise", de: "Donkey Calf Raise", en: "Donkey Calf Raise", bereich: "eigen", haupt: "waden", hilfs: [], auch: [] },
  { id: "single-leg-calf-raise", de: "Wadenheben einbeinig", en: "Single-Leg Calf Raise", bereich: "eigen", haupt: "waden", hilfs: [], auch: [] },
  { id: "deficit-calf-raise", de: "Defizit-Wadenheben", en: "Deficit Calf Raise", bereich: "eigen", haupt: "waden", hilfs: [], auch: [] },
  { id: "bent-knee-calf-raise", de: "Wadenheben mit gebeugten Knien", en: "Bent-Knee Calf Raise", bereich: "eigen", haupt: "waden", hilfs: [], auch: [] },
  { id: "jumping-calf-raise", de: "Wadenheben mit Sprung", en: "Jumping Calf Raise", bereich: "eigen", haupt: "waden", hilfs: [], auch: [] },
  { id: "pogo-jumps", de: "Pogo Jump", en: "Pogo Jump", bereich: "eigen", haupt: "waden", hilfs: [], auch: [], alias: ["Pogo Jumps"] },

  // ---------- Bauch: Maschine ----------
  { id: "cable-crunches", de: "Cable Crunches", en: "Cable Crunch", bereich: "maschine", haupt: "bauch", hilfs: [], auch: [] },
  { id: "kneeling-cable-crunch", de: "Cable Crunches kniend", en: "Kneeling Cable Crunch", bereich: "maschine", haupt: "bauch", hilfs: [], auch: [] },
  { id: "standing-cable-crunch", de: "Cable Crunches stehend", en: "Standing Cable Crunch", bereich: "maschine", haupt: "bauch", hilfs: [], auch: [] },
  { id: "machine-crunch", de: "Crunch-Maschine", en: "Machine Crunch", bereich: "maschine", haupt: "bauch", hilfs: [], auch: [] },

  // ---------- Bauch: Freie Gewichte ----------
  { id: "weighted-crunch", de: "Crunches mit Gewicht", en: "Weighted Crunch", bereich: "frei", haupt: "bauch", hilfs: [], auch: [] },
  { id: "dumbbell-crunch", de: "Crunches (Kurzhantel)", en: "Dumbbell Crunch", bereich: "frei", haupt: "bauch", hilfs: [], auch: [] },
  { id: "weighted-sit-up", de: "Sit-ups mit Gewicht", en: "Weighted Sit-Up", bereich: "frei", haupt: "bauch", hilfs: [], auch: [] },

  // ---------- Bauch: Eigengewicht ----------
  { id: "crunches", de: "Crunches", en: "Crunch", bereich: "eigen", haupt: "bauch", hilfs: [], auch: [] },
  { id: "plank", de: "Plank", en: "Plank", bereich: "eigen", haupt: "bauch", hilfs: ["bauch-schraeg", "ruecken-unten"], auch: [] },
  { id: "beinheben", de: "Beinheben", en: "Leg Raise", bereich: "eigen", haupt: "bauch", hilfs: [], auch: [] },
  { id: "sit-ups", de: "Sit-ups", en: "Sit-Up", bereich: "eigen", haupt: "bauch", hilfs: [], auch: [] },
  { id: "mountain-climbers", de: "Mountain Climbers", en: "Mountain Climber", bereich: "eigen", haupt: "bauch", hilfs: ["schulter-vorn", "quadrizeps"], auch: [] },
  { id: "decline-sit-up-eigen", de: "Sit-ups auf der Negativbank", en: "Decline Sit-Up", bereich: "eigen", haupt: "bauch", hilfs: [], auch: [] },
  { id: "hanging-knee-raise-eigen", de: "Knieheben im Hang", en: "Hanging Knee Raise", bereich: "eigen", haupt: "bauch", hilfs: [], auch: [] },
  { id: "hanging-leg-raise-eigen", de: "Beinheben im Hang", en: "Hanging Leg Raise", bereich: "eigen", haupt: "bauch", hilfs: [], auch: [] },
  { id: "lying-leg-raise-eigen", de: "Beinheben im Liegen", en: "Lying Leg Raise", bereich: "eigen", haupt: "bauch", hilfs: [], auch: [] },
  { id: "reverse-crunch-eigen", de: "Reverse Crunches", en: "Reverse Crunch", bereich: "eigen", haupt: "bauch", hilfs: [], auch: [] },
  { id: "dragon-flag-eigen", de: "Dragon Flag", en: "Dragon Flag", bereich: "eigen", haupt: "bauch", hilfs: ["bauch-schraeg"], auch: [] },
  { id: "ab-wheel-rollout-eigen", de: "Ab Wheel Rollout", en: "Ab Wheel Rollout", bereich: "eigen", haupt: "bauch", hilfs: [], auch: [] },
  { id: "toes-to-bar", de: "Toes-to-Bar", en: "Toes-to-Bar", bereich: "eigen", haupt: "bauch", hilfs: [], auch: [] },
  { id: "v-up", de: "V-Ups", en: "V-Up", bereich: "eigen", haupt: "bauch", hilfs: [], auch: [] },
  { id: "hollow-body-hold", de: "Hollow Body Hold", en: "Hollow Body Hold", bereich: "eigen", haupt: "bauch", hilfs: ["bauch-schraeg"], auch: [] },

  // ---------- Schräger Bauch / Core: Maschine ----------
  { id: "cable-pallof-press", de: "Pallof Press am Kabelzug", en: "Cable Pallof Press", bereich: "maschine", haupt: "bauch-schraeg", hilfs: [], auch: [] },
  { id: "half-kneeling-cable-pallof-press", de: "Pallof Press am Kabelzug, halbkniend", en: "Half-Kneeling Cable Pallof Press", bereich: "maschine", haupt: "bauch-schraeg", hilfs: [], auch: [] },
  { id: "cable-side-bend", de: "Seitbeugen am Kabelzug", en: "Cable Side Bend", bereich: "maschine", haupt: "bauch-schraeg", hilfs: [], auch: [] },
  { id: "machine-upper-torso-rotation", de: "Rumpfrotations-Maschine", en: "Machine Upper Torso Rotation", bereich: "maschine", haupt: "bauch-schraeg", hilfs: [], auch: [] },
  { id: "horizontal-cable-chop", de: "Cable Chop horizontal", en: "Horizontal Cable Chop", bereich: "maschine", haupt: "bauch-schraeg", hilfs: [], auch: [] },
  { id: "low-to-high-cable-chop", de: "Cable Chop von unten nach oben", en: "Low-To-High Cable Chop", bereich: "maschine", haupt: "bauch-schraeg", hilfs: [], auch: [] },
  { id: "high-to-low-cable-chop", de: "Cable Chop von oben nach unten", en: "High-To-Low Cable Chop", bereich: "maschine", haupt: "bauch-schraeg", hilfs: [], auch: [] },

  // ---------- Schräger Bauch / Core: Freie Gewichte ----------
  { id: "dumbbell-side-bend", de: "Seitbeugen (Kurzhantel)", en: "Dumbbell Side Bend", bereich: "frei", haupt: "bauch-schraeg", hilfs: [], auch: [] },
  { id: "weighted-russian-twist", de: "Russian Twist mit Gewicht", en: "Weighted Russian Twist", bereich: "frei", haupt: "bauch-schraeg", hilfs: [], auch: [] },
  { id: "suitcase-carry", de: "Suitcase Carry", en: "Suitcase Carry", bereich: "frei", haupt: "bauch-schraeg", hilfs: ["unterarme"], auch: [] },
  { id: "turkish-get-up", de: "Turkish Get-Up", en: "Turkish Get-Up", bereich: "frei", haupt: "bauch-schraeg", hilfs: [], auch: [] },
  { id: "landmine-rotation", de: "Landmine Rotation", en: "Landmine Rotation", bereich: "frei", haupt: "bauch-schraeg", hilfs: [], auch: [] },
  { id: "landmine-anti-rotation", de: "Landmine Anti-Rotation", en: "Landmine Anti-Rotation", bereich: "frei", haupt: "bauch-schraeg", hilfs: [], auch: [] },

  // ---------- Schräger Bauch / Core: Eigengewicht ----------
  { id: "russian-twist", de: "Russian Twist", en: "Russian Twist", bereich: "eigen", haupt: "bauch-schraeg", hilfs: ["bauch"], auch: [] },
  { id: "windshield-wipers-eigen", de: "Windshield Wipers", en: "Windshield Wipers", bereich: "eigen", haupt: "bauch-schraeg", hilfs: [], auch: [] },
  { id: "side-plank", de: "Seitstütz", en: "Side Plank", bereich: "eigen", haupt: "bauch-schraeg", hilfs: [], auch: [] },
  { id: "side-plank-hip-raise", de: "Seitstütz mit Hüftheben", en: "Side Plank Hip Raise", bereich: "eigen", haupt: "bauch-schraeg", hilfs: [], auch: [] },
  { id: "hanging-oblique-knee-raise", de: "Schräges Knieheben im Hang", en: "Hanging Oblique Knee Raise", bereich: "eigen", haupt: "bauch-schraeg", hilfs: [], auch: [] },
  { id: "hanging-windshield-wipers", de: "Windshield Wipers im Hang", en: "Hanging Windshield Wipers", bereich: "eigen", haupt: "bauch-schraeg", hilfs: [], auch: [] },
  { id: "rkc-plank", de: "RKC Plank", en: "RKC Plank", bereich: "eigen", haupt: "bauch-schraeg", hilfs: [], auch: [] },
  { id: "l-sit", de: "L-Sit", en: "L-Sit", bereich: "eigen", haupt: "bauch-schraeg", hilfs: [], auch: [] },
  { id: "v-sit", de: "V-Sit", en: "V-Sit", bereich: "eigen", haupt: "bauch-schraeg", hilfs: [], auch: [] },

  // ---------- Unterarme: Maschine ----------
  { id: "seated-cable-wrist-curl", de: "Handgelenkcurls am Kabelzug, sitzend", en: "Seated Cable Wrist Curl", bereich: "maschine", haupt: "unterarme", hilfs: [], auch: [] },
  { id: "single-arm-cable-wrist-curl", de: "Handgelenkcurls am Kabelzug, einarmig", en: "Single Arm Cable Wrist Curl", bereich: "maschine", haupt: "unterarme", hilfs: [], auch: [] },
  { id: "standing-cable-wrist-curl", de: "Handgelenkcurls am Kabelzug, stehend", en: "Standing Cable Wrist Curl", bereich: "maschine", haupt: "unterarme", hilfs: [], auch: [] },
  { id: "seated-cable-wrist-extension", de: "Handgelenkstrecken am Kabelzug, sitzend", en: "Seated Cable Wrist Extension", bereich: "maschine", haupt: "unterarme", hilfs: [], auch: [] },
  { id: "standing-cable-wrist-extension", de: "Handgelenkstrecken am Kabelzug, stehend", en: "Standing Cable Wrist Extension", bereich: "maschine", haupt: "unterarme", hilfs: [], auch: [] },

  // ---------- Unterarme: Freie Gewichte ----------
  { id: "farmers-hold", de: "Farmer's Hold", en: "Farmer's Hold", bereich: "frei", haupt: "unterarme", hilfs: [], auch: [] },
  { id: "barbell-hold", de: "Langhantel halten", en: "Barbell Hold", bereich: "frei", haupt: "unterarme", hilfs: [], auch: [] },
  { id: "plate-pinch", de: "Plate Pinch", en: "Plate Pinch", bereich: "frei", haupt: "unterarme", hilfs: [], auch: [] },
  { id: "dumbbell-hold", de: "Kurzhanteln halten", en: "Dumbbell Hold", bereich: "frei", haupt: "unterarme", hilfs: [], auch: [] },
  { id: "wrist-curl", de: "Handgelenkcurls", en: "Wrist Curl", bereich: "frei", haupt: "unterarme", hilfs: [], auch: [], alias: ["Barbell Wrist Curl", "Handgelenkcurls (Langhantel)"] },
  { id: "reverse-wrist-curl", de: "Reverse Handgelenkcurls", en: "Reverse Wrist Curl", bereich: "frei", haupt: "unterarme", hilfs: [], auch: [] },
  { id: "dumbbell-wrist-curl", de: "Handgelenkcurls (Kurzhantel)", en: "Dumbbell Wrist Curl", bereich: "frei", haupt: "unterarme", hilfs: [], auch: [] },

  // ---------- Unterarme: Eigengewicht ----------
  { id: "dead-hang", de: "Dead Hang", en: "Dead Hang", bereich: "eigen", haupt: "unterarme", hilfs: [], auch: [] },
  { id: "towel-hang", de: "Hängen am Handtuch", en: "Towel Hang", bereich: "eigen", haupt: "unterarme", hilfs: [], auch: [] },
  { id: "fingertip-hold", de: "Fingertip Hold", en: "Fingertip Hold", bereich: "eigen", haupt: "unterarme", hilfs: [], auch: [] },
  { id: "push-up-auf-fingerspitzen", de: "Liegestütze auf den Fingerspitzen", en: "Fingertip Push-Up", bereich: "eigen", haupt: "unterarme", hilfs: [], auch: [], alias: ["Push-Up auf Fingerspitzen"] },

  // ---------- Ganzkörper: Eigengewicht ----------
  { id: "burpee", de: "Burpee", en: "Burpee", bereich: "eigen", haupt: "ganzkoerper", hilfs: ["quadrizeps", "brust", "schulter-vorn", "bauch"], auch: [] }
];

// Welche Übungen eine Muskelgruppe in welchem Bereich zeigt, als IDs aus UEBUNGEN.
// Die Reihenfolge zählt: Die ersten 7 Übungen eines Bereichs sind sofort sichtbar, der Rest hinter "Mehr anzeigen".
// Oben stehen die Übungen, die es schon vor der großen Liste gab, dahinter die übrigen.
// Eine Übung darf bei mehreren Muskelgruppen stehen.
const UEBUNGSLISTEN = {
  "brust": {
    maschine: [
      "brustpresse-steck", "butterfly", "bankdruecken-multi", "schraegbank-45-multi", "kabelfly-hoch-tief",
      "kabelfly-tief-hoch", "schraegpresse-scheibe", "butterfly-obergriff", "brustpresse-steck-neutral",
      "brustpresse-scheibe", "brustpresse-scheibe-neutral", "schraegpresse-scheibe-einarmig",
      "bankdruecken-multi-breit", "schraegbank-steil-multi", "schraegbank-flach-multi", "negativbank-multi",
      "kabelfly-sitzend", "kabelfly-horizontal", "kabelfly-horizontal-einarmig", "kabel-crossover",
      "kabelfly-tief-hoch-einarmig", "kabelfly-hoch-tief-einarmig", "kabelfly-vorgebeugt",
      "brustpresse-kabel", "brustpresse-kabel-einarmig", "brust-dips-assistiert", "dip-maschine-brust",
      "machine-incline-press", "pause-smith-machine-bench-press", "machine-assisted-dip"
    ],
    frei: [
      "bankdruecken-lh", "bankdruecken-kh", "schraegbank-45-kh", "schraegbank-45-lh", "fliegende-kh",
      "fliegende-45-kh", "negativbank-lh", "bankdruecken-kh-neutral", "bankdruecken-kh-einarmig",
      "bankdruecken-kb", "bankdruecken-lh-breit", "schraegbank-45-lh-pause", "schraegbank-45-kh-neutral",
      "schraegbank-45-lh-eng", "schraegbank-steil-lh", "schraegbank-steil-kh", "schraegbank-flach-lh",
      "schraegbank-flach-kh", "negativbank-kh", "negativbank-lh-breit", "fliegende-flach-kh",
      "floor-press-lh", "floor-press-kh", "floor-press-kb", "reverse-grip-barbell-bench-press",
      "incline-dumbbell-squeeze-press", "dumbbell-squeeze-press", "close-grip-dumbbell-press",
      "decline-dumbbell-fly"
    ],
    eigen: [
      "liegestuetze", "brust-dips", "liegestuetze-fuesse-hoch", "liegestuetze-haende-hoch",
      "liegestuetze-breit", "liegestuetze-knie", "liegestuetze-gewicht", "liegestuetze-defizit",
      "liegestuetze-einarmig", "brust-dips-gewicht", "enge-liegestuetze", "diamant-liegestuetze",
      "archer-push-up", "pseudo-planche-push-up", "ring-push-up", "ring-chest-fly", "dips",
      "explosive-push-up", "clap-push-up"
    ]
  },
  "lat": {
    maschine: [
      "latzug", "wide-grip-cable-lat-pulldown", "overhand-grip-cable-lat-pulldown", "machine-lat-pulldown",
      "cable-lat-pulldown", "neutral-close-grip-cable-lat-pulldown", "underhand-wide-grip-cable-lat-pulldown",
      "underhand-close-grip-cable-lat-pulldown", "half-kneeling-single-arm-elbow-lat-pulldown",
      "single-arm-cable-lat-pulldown", "kneeling-cable-straight-arm-lat-pulldown",
      "cable-rope-straight-arm-lat-pulldown", "cross-body-cable-lat-pull-around", "scapular-pulldown",
      "machine-assisted-pull-up", "machine-assisted-chin-up"
    ],
    frei: [
      "langhantelrudern", "kurzhantelrudern", "t-bar-rudern", "dumbbell-pullover", "barbell-pullover",
      "one-arm-dumbbell-row", "meadows-row", "pendlay-row", "underhand-barbell-row", "landmine-row",
      "seal-row", "chest-supported-dumbbell-row"
    ],
    eigen: [
      "klimmzuege", "wide-grip-pull-up", "neutral-grip-pull-up", "chin-up", "close-grip-chin-up",
      "commando-pull-up", "archer-pull-up", "typewriter-pull-up", "muscle-up", "australian-pull-up",
      "ring-row", "feet-elevated-inverted-row", "towel-pull-up"
    ]
  },
  "ruecken-oben": {
    maschine: [
      "kabelrudern", "chest-supported-overhand-grip-t-bar-row", "chest-supported-neutral-grip-t-bar-row",
      "chest-supported-semi-neutral-grip-t-bar-row", "chest-supported-wide-grip-t-bar-row",
      "neutral-wide-grip-cable-row", "wide-grip-cable-row", "underhand-grip-cable-row",
      "neutral-grip-machine-row", "standing-single-arm-cable-row", "seated-single-arm-cable-row",
      "cable-rope-high-row", "neutral-grip-plate-loaded-machine-row", "wide-grip-plate-loaded-machine-row",
      "smith-machine-row", "smith-machine-deficit-row", "smith-machine-pendlay-row",
      "bent-over-neutral-grip-t-bar-row", "bent-over-underhand-grip-t-bar-row",
      "bent-over-semi-neutral-grip-t-bar-row", "bent-over-wide-grip-t-bar-row", "pin-loaded-row-machine",
      "moto-cable-row"
    ],
    frei: [
      "langhantelrudern", "kurzhantelrudern", "t-bar-rudern", "pendlay-row", "chest-supported-dumbbell-row",
      "one-arm-dumbbell-row", "seal-row", "wide-grip-barbell-row", "landmine-row", "meadows-row",
      "dumbbell-rear-delt-row"
    ],
    eigen: [
      "australian-pull-up", "wide-grip-inverted-row", "scapular-pull-up", "scapular-push-up", "prone-y-raise",
      "prone-t-raise", "reverse-snow-angel", "ring-row"
    ]
  },
  "ruecken-unten": {
    maschine: [
      "machine-back-extension", "smith-machine-good-morning", "wide-stance-smith-machine-good-morning",
      "smith-machine-deficit-romanian-deadlift", "cable-romanian-deadlift", "seated-cable-romanian-deadlift",
      "seated-single-leg-cable-romanian-deadlift", "seated-cable-deadlift", "shrug-machine-deadlift"
    ],
    frei: [
      "kreuzheben", "rumaenisches-kreuzheben", "dumbbell-romanian-deadlift", "sumo-deadlift",
      "stiff-leg-deadlift", "good-morning", "deficit-deadlift", "rack-pull", "jefferson-deadlift",
      "dumbbell-good-morning"
    ],
    eigen: [
      "bodyweight-good-morning", "single-leg-romanian-deadlift-eigen"
    ]
  },
  "trapez": {
    maschine: [
      "smith-machine-shrug", "standing-machine-shrug", "cable-shrug", "single-arm-cable-shrug",
      "machine-cheat-shrug", "smith-machine-cheat-shrug", "pin-loaded-row-machine-kelso-shrug",
      "t-bar-kelso-shrug", "seated-cable-kelso-shrug", "pause-cable-shrug-in", "cable-shrug-in"
    ],
    frei: [
      "barbell-shrug", "dumbbell-shrug", "behind-the-back-barbell-shrug", "incline-dumbbell-shrug",
      "farmers-walk", "trap-bar-carry", "high-pull", "barbell-upright-row", "dumbbell-upright-row"
    ],
    eigen: [
      "scapular-pull-up", "reverse-snow-angel"
    ]
  },
  "schulter-hinten": {
    maschine: [
      "face-pulls", "innenrotation-kabel", "neutral-grip-machine-rear-delt-fly",
      "overhand-grip-machine-rear-delt-fly", "sideways-single-arm-machine-rear-delt-fly",
      "overhand-grip-cable-rear-delt-fly", "single-arm-45-cable-rear-delt-fly", "45-cable-rear-delt-fly",
      "single-arm-cable-face-pull", "high-pulley-cable-face-pull", "lying-pause-cable-face-pull"
    ],
    frei: [
      "reverse-flys", "dumbbell-rear-delt-fly", "incline-dumbbell-rear-delt-fly",
      "chest-supported-dumbbell-rear-delt-fly", "dumbbell-rear-delt-row", "barbell-rear-delt-row"
    ],
    eigen: [
      "ring-face-pull", "prone-y-t-w-raises", "reverse-snow-angel"
    ]
  },
  "schulter-vorn": {
    maschine: [
      "plate-loaded-machine-shoulder-press", "neutral-grip-machine-shoulder-press",
      "neutral-grip-plate-loaded-machine-shoulder-press", "smith-machine-overhead-press",
      "cable-shoulder-press", "cable-front-raise", "single-arm-cable-front-raise"
    ],
    frei: [
      "schulterdruecken", "military-press", "frontheben", "arnold-press", "barbell-overhead-press",
      "dumbbell-overhead-press", "seated-dumbbell-shoulder-press", "z-press", "bradford-press",
      "single-arm-dumbbell-press", "landmine-press", "dumbbell-front-raise", "plate-front-raise"
    ],
    eigen: [
      "pike-push-up", "elevated-pike-push-up", "handstand-push-up", "wall-handstand-push-up",
      "freestanding-handstand-push-up", "handstand-shoulder-tap"
    ]
  },
  "schulter-seite": {
    maschine: [
      "single-arm-high-cable-lateral-raise", "single-arm-cable-lateral-raise", "dual-cable-lateral-raise",
      "behind-the-back-cable-lateral-raise", "leaning-cable-lateral-raise",
      "single-arm-cable-cuffed-lateral-raise", "seated-machine-lateral-raise", "cable-upright-row",
      "smith-machine-upright-row"
    ],
    frei: [
      "seitheben", "seated-dumbbell-lateral-raise", "leaning-dumbbell-lateral-raise",
      "incline-dumbbell-lateral-raise", "dumbbell-upright-row", "barbell-upright-row"
    ],
    eigen: []
  },
  "bizeps": {
    maschine: [
      "kabelcurls", "cable-rope-hammer-curl", "single-arm-pin-loaded-machine-preacher-curl",
      "pin-loaded-machine-preacher-curl", "cable-straight-bar-biceps-curl", "cable-ez-bar-biceps-curl",
      "machine-biceps-curl-with-arms-at-sides", "single-arm-bayesian-curl", "single-arm-cable-biceps-curl",
      "dual-cable-bayesian-curl", "cable-concentration-curl", "low-pulley-dual-cable-biceps-curl",
      "single-arm-elbow-out-cable-biceps-curl", "single-arm-crucifix-curl", "seated-crucifix-curl",
      "seated-dual-cable-bayesian-curl", "cable-reverse-curl"
    ],
    frei: [
      "langhantelcurls", "kurzhantelcurls", "hammercurls", "scottcurls", "konzentrationscurls", "ez-bar-curl",
      "alternating-dumbbell-curl", "seated-dumbbell-curl", "cross-body-hammer-curl", "reverse-barbell-curl",
      "reverse-dumbbell-curl", "zottman-curl", "incline-dumbbell-curl", "drag-curl"
    ],
    eigen: [
      "chin-up", "close-grip-chin-up", "commando-chin-up", "towel-chin-up", "archer-chin-up", "ring-chin-up",
      "inverted-row-mit-supiniertem-griff"
    ]
  },
  "trizeps": {
    maschine: [
      "trizepsdruecken-kabel", "enges-bankdruecken-multi", "trizeps-dips-assistiert", "dip-maschine-trizeps",
      "jm-press-multi", "single-arm-cable-overhead-triceps-extension",
      "single-arm-neutral-grip-cable-triceps-pushdown", "cable-v-bar-triceps-pushdown",
      "cable-straight-bar-triceps-pushdown", "cable-v-bar-overhead-triceps-extension",
      "high-pulley-cable-straight-bar-overhead-triceps-extension", "machine-triceps-extension",
      "neutral-grip-cable-triceps-kickback", "underhand-grip-cable-triceps-pushdown",
      "cable-dual-rope-diverging-triceps", "dual-cable-triceps-press", "cable-skull-crusher",
      "pause-machine-assisted-dip"
    ],
    frei: [
      "enges-bankdruecken-lh", "french-press", "ueberkopf-trizepsstrecken", "kickbacks",
      "enges-negativbank-lh", "jm-press-lh", "lockout-bank-lh", "close-grip-dumbbell-press",
      "dumbbell-overhead-triceps-extension", "single-arm-dumbbell-overhead-extension", "ez-bar-skull-crusher",
      "dumbbell-skull-crusher", "dumbbell-tate-press"
    ],
    eigen: [
      "trizeps-dips", "enge-liegestuetze", "diamant-liegestuetze", "enge-liegestuetze-knie",
      "trizeps-dips-gewicht", "bench-parallel-bar-dip", "ring-dip", "korean-dip",
      "bodyweight-triceps-extension", "ring-triceps-extension", "pseudo-planche-push-up", "handstand-push-up"
    ]
  },
  "quadrizeps": {
    maschine: [
      "beinpresse", "beinstrecker", "45-leg-press", "pin-loaded-leg-press", "single-leg-45-leg-press",
      "single-leg-pin-loaded-leg-press", "hack-squat", "pause-hack-squat", "pin-loaded-quad-biased-leg-press",
      "smith-machine-back-squat", "smith-machine-lunge", "smith-machine-split-squat",
      "smith-machine-bulgarian-split-squat", "smith-machine-front-foot-elevated-split-squat",
      "cable-belt-squat", "single-leg-leg-extension"
    ],
    frei: [
      "kniebeuge", "ausfallschritte", "bulgarian-split-squats", "high-bar-back-squat", "low-bar-back-squat",
      "front-squat", "goblet-squat", "dumbbell-split-squat", "walking-dumbbell-lunge",
      "reverse-dumbbell-lunge", "forward-dumbbell-lunge", "barbell-lunge", "dumbbell-step-up",
      "zercher-squat", "hack-squat-mit-langhantel", "heel-elevated-goblet-squat"
    ],
    eigen: [
      "step-ups", "bodyweight-squat", "tempo-squat", "pause-squat", "bulgarian-split-squat-eigen",
      "walking-lunge-eigen", "reverse-lunge-eigen", "forward-lunge", "jump-squat", "split-squat",
      "shrimp-squat", "pistol-squat", "assisted-pistol-squat", "sissy-squat-eigen", "cyclist-squat"
    ]
  },
  "beinbeuger": {
    maschine: [
      "beinbeuger-maschine", "lying-hamstring-curl", "seated-hamstring-curl",
      "seated-single-leg-hamstring-curl", "seated-accentuated-eccentric-hamstring-curl",
      "standing-cable-leg-curl", "cable-romanian-deadlift", "smith-machine-good-morning",
      "smith-machine-deficit-romanian-deadlift"
    ],
    frei: [
      "kreuzheben", "rumaenisches-kreuzheben", "stiff-leg-deadlift", "sumo-deadlift",
      "dumbbell-romanian-deadlift", "good-morning", "dumbbell-leg-curl"
    ],
    eigen: [
      "nordic-hamstring-curl", "assisted-nordic-curl", "glute-ham-raise-eigen", "sliding-leg-curl-eigen",
      "single-leg-sliding-leg-curl", "razor-curl-eigen", "bodyweight-good-morning",
      "single-leg-romanian-deadlift-eigen"
    ]
  },
  "po": {
    maschine: [
      "kickbacks-kabel", "plate-loaded-machine-hip-thrust", "smith-machine-hip-thrust",
      "single-leg-smith-machine-hip-thrust", "single-leg-plate-loaded-machine-hip-thrust",
      "standing-pin-loaded-machine-glute-kickback", "cable-pull-through", "45-glute-biased-leg-press",
      "smith-machine-bulgarian-split-squat"
    ],
    frei: [
      "hip-thrust", "sumo-kniebeuge", "bulgarian-split-squats", "rumaenisches-kreuzheben",
      "dumbbell-hip-thrust", "barbell-glute-bridge", "dumbbell-glute-bridge", "high-step-up", "sumo-deadlift",
      "deficit-reverse-lunge"
    ],
    eigen: [
      "glute-bridge", "step-ups", "single-leg-glute-bridge", "hip-thrust-eigen", "single-leg-hip-thrust",
      "bulgarian-split-squat-eigen", "reverse-lunge-eigen", "walking-lunge-eigen",
      "single-leg-romanian-deadlift-eigen", "shrimp-squat", "pistol-squat", "curtsy-lunge-eigen"
    ]
  },
  "adduktoren": {
    maschine: [
      "reclined-machine-hip-adduction", "cable-hip-adduction"
    ],
    frei: [
      "sumo-kniebeuge", "sumo-deadlift", "deficit-cossack-squat", "wide-stance-romanian-deadlift"
    ],
    eigen: [
      "cossack-squat-eigen", "lateral-lunge-eigen", "copenhagen-plank", "wide-stance-squat-eigen"
    ]
  },
  "abduktoren": {
    maschine: [
      "abduktorenmaschine", "cable-hip-abduction-leg-behind-body", "cable-hip-abduction-leg-in-front-of-body",
      "leaning-forward-machine-hip-abduction"
    ],
    frei: [],
    eigen: [
      "standing-hip-abduction", "banded-lateral-walk", "banded-monster-walk", "side-lying-leg-raise-eigen",
      "single-leg-squat-eigen", "skater-squat", "lateral-step-up-eigen", "curtsy-lunge-eigen"
    ]
  },
  "waden": {
    maschine: [
      "wadenheben", "45-leg-press-calf-raise", "pin-loaded-leg-press-calf-jump",
      "standing-smith-machine-calf-raise", "single-leg-45-leg-press-calf-raise", "45-leg-press-calf-jump",
      "seated-calf-raise"
    ],
    frei: [
      "dumbbell-standing-calf-raise", "barbell-standing-calf-raise", "dumbbell-seated-calf-raise",
      "barbell-seated-calf-raise"
    ],
    eigen: [
      "standing-calf-raise", "single-leg-standing-calf-raise", "donkey-calf-raise", "single-leg-calf-raise",
      "deficit-calf-raise", "bent-knee-calf-raise", "jumping-calf-raise", "pogo-jumps"
    ]
  },
  "bauch": {
    maschine: [
      "cable-crunches", "kneeling-cable-crunch", "standing-cable-crunch", "machine-crunch"
    ],
    frei: [
      "weighted-crunch", "dumbbell-crunch", "weighted-sit-up"
    ],
    eigen: [
      "crunches", "plank", "beinheben", "sit-ups", "mountain-climbers", "decline-sit-up-eigen",
      "reverse-crunch-eigen", "hanging-knee-raise-eigen", "hanging-leg-raise-eigen", "toes-to-bar",
      "lying-leg-raise-eigen", "v-up", "hollow-body-hold", "dragon-flag-eigen", "ab-wheel-rollout-eigen"
    ]
  },
  "bauch-schraeg": {
    maschine: [
      "cable-pallof-press", "half-kneeling-cable-pallof-press", "cable-side-bend",
      "machine-upper-torso-rotation", "horizontal-cable-chop", "low-to-high-cable-chop",
      "high-to-low-cable-chop"
    ],
    frei: [
      "dumbbell-side-bend", "weighted-russian-twist", "suitcase-carry", "farmers-walk", "turkish-get-up",
      "landmine-rotation", "landmine-anti-rotation"
    ],
    eigen: [
      "plank", "russian-twist", "side-plank", "side-plank-hip-raise", "copenhagen-plank",
      "windshield-wipers-eigen", "hanging-oblique-knee-raise", "hanging-windshield-wipers", "rkc-plank",
      "hollow-body-hold", "l-sit", "v-sit", "dragon-flag-eigen"
    ]
  },
  "unterarme": {
    maschine: [
      "seated-cable-wrist-curl", "single-arm-cable-wrist-curl", "standing-cable-wrist-curl",
      "seated-cable-wrist-extension", "standing-cable-wrist-extension", "cable-reverse-curl"
    ],
    frei: [
      "farmers-walk", "farmers-hold", "suitcase-carry", "barbell-hold", "plate-pinch", "dumbbell-hold",
      "wrist-curl", "reverse-wrist-curl", "dumbbell-wrist-curl", "reverse-barbell-curl", "zottman-curl"
    ],
    eigen: [
      "dead-hang", "towel-hang", "fingertip-hold", "push-up-auf-fingerspitzen"
    ]
  },
  "ganzkoerper": {
    maschine: [],
    frei: [],
    eigen: [
      "burpee"
    ]
  }
};

// Frühere Übungsnamen (kleingeschrieben) und die ID der Übung, die heute dafür steht.
// Damit finden alte Einträge und Routinen ihre Übung wieder. Wird eine Übung umbenannt,
// kommt ihr alter Name hier dazu.
const ALTE_NAMEN = {
  "bankdrücken": "bankdruecken-lh",
  "schrägbankdrücken": "schraegbank-45-lh",
  "kurzhantel-flys": "fliegende-kh",
  "butterfly/pec deck": "butterfly",
  "dips": "brust-dips",
  "enges bankdrücken": "enges-bankdruecken-lh",

  // Namen, die es in zwei Bereichen gibt (z. B. mit Gewicht und als Eigengewicht):
  // Einträge ohne ID gehören zu der Übung, die es schon vorher gab.
  "hip thrust": "hip-thrust"
};

// Frühere IDs und die ID der Übung, die heute dafür steht. Hier landen Übungen, die mit einer anderen
// zusammengelegt wurden. Einträge und Routinen mit einer alten ID werden beim Start umgestellt.
const ALTE_IDS = {
  "dumbbell-seal-row": "seal-row",
  "inverted-row": "australian-pull-up",
  "single-leg-romanian-deadlift-ohne-gewicht": "single-leg-romanian-deadlift-eigen",
  "bent-over-dumbbell-reverse-fly": "dumbbell-rear-delt-fly",
  "standing-dumbbell-curl": "kurzhantelcurls",
  "dumbbell-close-grip-press": "close-grip-dumbbell-press",
  "jm-press": "jm-press-lh",
  "two-arm-dumbbell-overhead-extension": "dumbbell-overhead-triceps-extension",
  "step-up-frei": "step-ups",
  "sissy-squat-frei": "sissy-squat-eigen",
  "single-leg-romanian-deadlift-frei": "single-leg-romanian-deadlift-eigen",
  "glute-ham-raise-frei": "glute-ham-raise-eigen",
  "sliding-leg-curl-frei": "sliding-leg-curl-eigen",
  "razor-curl-frei": "razor-curl-eigen",
  "nordic-curl": "nordic-hamstring-curl",
  "reverse-lunge-frei": "reverse-lunge-eigen",
  "walking-lunge-frei": "walking-lunge-eigen",
  "curtsy-lunge-frei": "curtsy-lunge-eigen",
  "wide-stance-squat-frei": "wide-stance-squat-eigen",
  "cossack-squat-frei": "cossack-squat-eigen",
  "lateral-lunge-frei": "lateral-lunge-eigen",
  "side-lying-leg-raise-frei": "side-lying-leg-raise-eigen",
  "single-leg-squat-frei": "single-leg-squat-eigen",
  "lateral-step-up-frei": "lateral-step-up-eigen",
  "standing-machine-calf-raise": "wadenheben",
  "decline-sit-up-frei": "decline-sit-up-eigen",
  "hanging-knee-raise-frei": "hanging-knee-raise-eigen",
  "hanging-leg-raise-frei": "hanging-leg-raise-eigen",
  "lying-leg-raise-frei": "lying-leg-raise-eigen",
  "reverse-crunch-frei": "reverse-crunch-eigen",
  "dragon-flag-frei": "dragon-flag-eigen",
  "ab-wheel-rollout-frei": "ab-wheel-rollout-eigen",
  "russian-twist-frei": "russian-twist",
  "windshield-wipers-frei": "windshield-wipers-eigen",
  "farmers-carry": "farmers-walk",
  "barbell-wrist-curl": "wrist-curl"
};
