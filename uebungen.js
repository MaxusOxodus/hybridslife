// Übungsdaten: Muskelgruppen, Bereiche, Muskeln und alle Übungen, jeweils auf Deutsch ("de") und Englisch ("en").
// Die app.js liest diese Listen nur. Zum Erweitern einfach hier eine Zeile ergänzen.

// Die Kacheln der Übungsauswahl. "ansicht" legt fest, ob die Körper-Grafik von vorn oder von hinten gezeigt wird.
const MUSKELGRUPPEN = [
  { id: "brust", de: "Brust", en: "Chest", ansicht: "vorn" },
  { id: "ruecken", de: "Rücken", en: "Back", ansicht: "hinten" },
  { id: "schultern", de: "Schultern", en: "Shoulders", ansicht: "vorn" },
  { id: "bizeps", de: "Bizeps", en: "Biceps", ansicht: "vorn" },
  { id: "trizeps", de: "Trizeps", en: "Triceps", ansicht: "hinten" },
  { id: "unterarme", de: "Unterarme", en: "Forearms", ansicht: "vorn" },
  { id: "bauch", de: "Bauch", en: "Abs", ansicht: "vorn" },
  { id: "po", de: "Po", en: "Glutes", ansicht: "hinten" },
  { id: "quadrizeps", de: "Quadrizeps", en: "Quads", ansicht: "vorn" },
  { id: "beinbeuger", de: "Beinbeuger", en: "Hamstrings", ansicht: "hinten" },
  { id: "waden", de: "Waden", en: "Calves", ansicht: "hinten" },
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
  "lat": { de: "Latissimus", en: "Lats", gruppe: "ruecken" },
  "ruecken-oben": { de: "Oberer Rücken", en: "Upper Back", gruppe: "ruecken" },
  "ruecken-unten": { de: "Unterer Rücken", en: "Lower Back", gruppe: "ruecken" },
  "schulter-vorn": { de: "Vordere Schulter", en: "Front Delts", gruppe: "schultern" },
  "schulter-seite": { de: "Seitliche Schulter", en: "Side Delts", gruppe: "schultern" },
  "schulter-hinten": { de: "Hintere Schulter", en: "Rear Delts", gruppe: "schultern" },
  "schulter-rotatoren": { de: "Rotatorenmanschette", en: "Rotator Cuff", gruppe: "schultern" },
  "bizeps": { de: "Bizeps", en: "Biceps", gruppe: "bizeps" },
  "trizeps": { de: "Trizeps", en: "Triceps", gruppe: "trizeps" },
  "unterarme": { de: "Unterarme", en: "Forearms", gruppe: "unterarme" },
  "bauch": { de: "Bauch", en: "Abs", gruppe: "bauch" },
  "bauch-schraeg": { de: "Schräge Bauchmuskeln", en: "Obliques", gruppe: "bauch" },
  "po": { de: "Po", en: "Glutes", gruppe: "po" },
  "abduktoren": { de: "Abduktoren", en: "Abductors", gruppe: "po" },
  "quadrizeps": { de: "Quadrizeps", en: "Quads", gruppe: "quadrizeps" },
  "beinbeuger": { de: "Beinbeuger", en: "Hamstrings", gruppe: "beinbeuger" },
  "waden": { de: "Waden", en: "Calves", gruppe: "waden" },
  "ganzkoerper": { de: "Ganzkörper", en: "Full Body", gruppe: "ganzkoerper" }
};

// Alle Übungen.
// id:      feste Kennung. Sie wird in Einträgen und Routinen gespeichert und darf sich nie ändern.
// bereich: "maschine", "frei" oder "eigen"
// haupt:   der Hauptmuskel (aus MUSKELN). Er bestimmt, bei welcher Muskelgruppe die Übung steht.
// hilfs:   die Hilfsmuskeln (aus MUSKELN)
// auch:    Muskelgruppen, bei denen die Übung zusätzlich unter "Trainiert auch" erscheint
// Die Reihenfolge zählt: Die ersten 7 Übungen eines Bereichs sind sofort sichtbar, der Rest hinter "Mehr anzeigen".
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
  { id: "schraegbank-steil-multi", de: "Steiles Schrägbankdrücken an der Multipresse", en: "High Incline Smith Machine Press", bereich: "maschine", haupt: "brust-oben", hilfs: ["schulter-vorn", "trizeps"], auch: ["schultern"] },
  { id: "schraegbank-flach-multi", de: "Flaches Schrägbankdrücken an der Multipresse", en: "Low Incline Smith Machine Press", bereich: "maschine", haupt: "brust-oben", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "negativbank-multi", de: "Negativ-Bankdrücken an der Multipresse", en: "Decline Smith Machine Press", bereich: "maschine", haupt: "brust-unten", hilfs: ["trizeps", "schulter-vorn"], auch: [] },
  { id: "kabelfly-sitzend", de: "Kabelfly sitzend", en: "Seated Cable Fly", bereich: "maschine", haupt: "brust", hilfs: ["schulter-vorn"], auch: [] },
  { id: "kabelfly-horizontal", de: "Kabelfly horizontal", en: "Horizontal Cable Fly", bereich: "maschine", haupt: "brust", hilfs: ["schulter-vorn"], auch: [] },
  { id: "kabelfly-horizontal-einarmig", de: "Kabelfly horizontal, einarmig", en: "Single Arm Horizontal Cable Fly", bereich: "maschine", haupt: "brust", hilfs: ["schulter-vorn", "bauch"], auch: [] },
  { id: "kabel-crossover", de: "Kabel-Crossover horizontal", en: "Horizontal Cable Crossover", bereich: "maschine", haupt: "brust", hilfs: ["schulter-vorn"], auch: [] },
  { id: "kabelfly-tief-hoch-einarmig", de: "Kabelfly von unten nach oben, einarmig", en: "Single Arm Low to High Cable Fly", bereich: "maschine", haupt: "brust-oben", hilfs: ["schulter-vorn", "bauch"], auch: [] },
  { id: "kabelfly-hoch-tief-einarmig", de: "Kabelfly von oben nach unten, einarmig", en: "Single Arm High to Low Cable Fly", bereich: "maschine", haupt: "brust-unten", hilfs: ["schulter-vorn", "bauch"], auch: [] },
  { id: "kabelfly-vorgebeugt", de: "Kabelfly vorgebeugt", en: "Bent Over Cable Fly", bereich: "maschine", haupt: "brust-unten", hilfs: ["schulter-vorn"], auch: [] },
  { id: "brustpresse-kabel", de: "Brustpresse am Kabelzug", en: "Cable Chest Press", bereich: "maschine", haupt: "brust", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "brustpresse-kabel-einarmig", de: "Brustpresse am Kabelzug, einarmig", en: "Single Arm Cable Chest Press", bereich: "maschine", haupt: "brust", hilfs: ["schulter-vorn", "trizeps", "bauch"], auch: [] },
  { id: "brust-dips-assistiert", de: "Brust-Dips an der Unterstützungsmaschine", en: "Machine Assisted Chest Dip", bereich: "maschine", haupt: "brust-unten", hilfs: ["trizeps", "schulter-vorn"], auch: ["trizeps"] },
  { id: "dip-maschine-brust", de: "Dip-Maschine sitzend, Brust (Steckgewicht)", en: "Seated Pin-Loaded Machine Chest Dip", bereich: "maschine", haupt: "brust-unten", hilfs: ["trizeps", "schulter-vorn"], auch: ["trizeps"] },

  // ---------- Brust: Freie Gewichte ----------
  { id: "bankdruecken-lh", de: "Bankdrücken (Langhantel)", en: "Barbell Bench Press", bereich: "frei", haupt: "brust", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "bankdruecken-kh", de: "Bankdrücken (Kurzhantel)", en: "Dumbbell Bench Press", bereich: "frei", haupt: "brust", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "schraegbank-45-kh", de: "Schrägbankdrücken 45° (Kurzhantel)", en: "45° Incline Dumbbell Press", bereich: "frei", haupt: "brust-oben", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "schraegbank-45-lh", de: "Schrägbankdrücken 45° (Langhantel)", en: "45° Incline Barbell Press", bereich: "frei", haupt: "brust-oben", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "fliegende-kh", de: "Fliegende (Kurzhantel)", en: "Dumbbell Fly", bereich: "frei", haupt: "brust", hilfs: ["schulter-vorn"], auch: [] },
  { id: "fliegende-45-kh", de: "Schräge Fliegende 45° (Kurzhantel)", en: "45° Incline Dumbbell Fly", bereich: "frei", haupt: "brust-oben", hilfs: ["schulter-vorn"], auch: [] },
  { id: "negativbank-lh", de: "Negativ-Bankdrücken (Langhantel)", en: "Decline Barbell Press", bereich: "frei", haupt: "brust-unten", hilfs: ["trizeps", "schulter-vorn"], auch: [] },
  { id: "bankdruecken-kh-neutral", de: "Bankdrücken, Neutralgriff (Kurzhantel)", en: "Neutral Grip Dumbbell Bench Press", bereich: "frei", haupt: "brust", hilfs: ["trizeps", "schulter-vorn"], auch: [] },
  { id: "bankdruecken-kh-einarmig", de: "Bankdrücken einarmig (Kurzhantel)", en: "Single Arm Dumbbell Bench Press", bereich: "frei", haupt: "brust", hilfs: ["schulter-vorn", "trizeps", "bauch"], auch: [] },
  { id: "bankdruecken-kb", de: "Bankdrücken (Kettlebell)", en: "Kettlebell Bench Press", bereich: "frei", haupt: "brust", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "bankdruecken-lh-breit", de: "Breites Bankdrücken (Langhantel)", en: "Wide Grip Bench Press", bereich: "frei", haupt: "brust", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "schraegbank-45-lh-pause", de: "Schrägbankdrücken 45° mit Pause (Langhantel)", en: "45° Incline Paused Barbell Press", bereich: "frei", haupt: "brust-oben", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "schraegbank-45-kh-neutral", de: "Schrägbankdrücken 45°, Neutralgriff (Kurzhantel)", en: "45° Incline Neutral Grip Dumbbell Press", bereich: "frei", haupt: "brust-oben", hilfs: ["trizeps", "schulter-vorn"], auch: [] },
  { id: "schraegbank-45-lh-eng", de: "Enges Schrägbankdrücken 45° (Langhantel)", en: "45° Incline Close Grip Press", bereich: "frei", haupt: "brust-oben", hilfs: ["trizeps", "schulter-vorn"], auch: ["trizeps"] },
  { id: "schraegbank-steil-lh", de: "Steiles Schrägbankdrücken (Langhantel)", en: "High Incline Barbell Press", bereich: "frei", haupt: "brust-oben", hilfs: ["schulter-vorn", "trizeps"], auch: ["schultern"] },
  { id: "schraegbank-steil-kh", de: "Steiles Schrägbankdrücken (Kurzhantel)", en: "High Incline Dumbbell Press", bereich: "frei", haupt: "brust-oben", hilfs: ["schulter-vorn", "trizeps"], auch: ["schultern"] },
  { id: "schraegbank-flach-lh", de: "Flaches Schrägbankdrücken (Langhantel)", en: "Low Incline Barbell Press", bereich: "frei", haupt: "brust-oben", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "schraegbank-flach-kh", de: "Flaches Schrägbankdrücken (Kurzhantel)", en: "Low Incline Dumbbell Press", bereich: "frei", haupt: "brust-oben", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "negativbank-kh", de: "Negativ-Bankdrücken (Kurzhantel)", en: "Decline Dumbbell Press", bereich: "frei", haupt: "brust-unten", hilfs: ["trizeps", "schulter-vorn"], auch: [] },
  { id: "negativbank-lh-breit", de: "Breites Negativ-Bankdrücken (Langhantel)", en: "Decline Wide Grip Press", bereich: "frei", haupt: "brust-unten", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "fliegende-flach-kh", de: "Flache schräge Fliegende (Kurzhantel)", en: "Low Incline Dumbbell Fly", bereich: "frei", haupt: "brust-oben", hilfs: ["schulter-vorn"], auch: [] },
  { id: "floor-press-lh", de: "Floor Press (Langhantel)", en: "Barbell Floor Press", bereich: "frei", haupt: "brust", hilfs: ["trizeps", "schulter-vorn"], auch: ["trizeps"] },
  { id: "floor-press-kh", de: "Floor Press (Kurzhantel)", en: "Dumbbell Floor Press", bereich: "frei", haupt: "brust", hilfs: ["trizeps", "schulter-vorn"], auch: ["trizeps"] },
  { id: "floor-press-kb", de: "Floor Press (Kettlebell)", en: "Kettlebell Floor Press", bereich: "frei", haupt: "brust", hilfs: ["trizeps", "schulter-vorn"], auch: ["trizeps"] },

  // ---------- Brust: Eigengewicht ----------
  { id: "liegestuetze", de: "Liegestütze", en: "Push-Up", bereich: "eigen", haupt: "brust", hilfs: ["schulter-vorn", "trizeps", "bauch"], auch: [] },
  { id: "brust-dips", de: "Brust-Dips", en: "Chest Dip", bereich: "eigen", haupt: "brust-unten", hilfs: ["trizeps", "schulter-vorn"], auch: ["trizeps"] },
  { id: "liegestuetze-fuesse-hoch", de: "Liegestütze mit erhöhten Füßen", en: "Decline Push-Up", bereich: "eigen", haupt: "brust-oben", hilfs: ["schulter-vorn", "trizeps", "bauch"], auch: [] },
  { id: "liegestuetze-haende-hoch", de: "Liegestütze mit erhöhten Händen", en: "Incline Push-Up", bereich: "eigen", haupt: "brust-unten", hilfs: ["schulter-vorn", "trizeps", "bauch"], auch: [] },
  { id: "liegestuetze-breit", de: "Breite Liegestütze", en: "Wide Grip Push-Up", bereich: "eigen", haupt: "brust", hilfs: ["schulter-vorn", "trizeps", "bauch"], auch: [] },
  { id: "liegestuetze-knie", de: "Liegestütze auf den Knien", en: "Kneeling Push-Up", bereich: "eigen", haupt: "brust", hilfs: ["schulter-vorn", "trizeps"], auch: [] },
  { id: "liegestuetze-gewicht", de: "Liegestütze mit Zusatzgewicht", en: "Weighted Push-Up", bereich: "eigen", haupt: "brust", hilfs: ["schulter-vorn", "trizeps", "bauch"], auch: [] },
  { id: "liegestuetze-defizit", de: "Defizit-Liegestütze", en: "Deficit Push-Up", bereich: "eigen", haupt: "brust", hilfs: ["schulter-vorn", "trizeps", "bauch"], auch: [] },
  { id: "liegestuetze-einarmig", de: "Einarmige Liegestütze", en: "Single Arm Push-Up", bereich: "eigen", haupt: "brust", hilfs: ["trizeps", "schulter-vorn", "bauch"], auch: [] },
  { id: "brust-dips-gewicht", de: "Brust-Dips mit Zusatzgewicht", en: "Weighted Chest Dip", bereich: "eigen", haupt: "brust-unten", hilfs: ["trizeps", "schulter-vorn"], auch: ["trizeps"] },

  // ---------- Trizeps ----------
  { id: "trizepsdruecken-kabel", de: "Trizepsdrücken am Kabel", en: "Cable Triceps Pushdown", bereich: "maschine", haupt: "trizeps", hilfs: [], auch: [] },
  { id: "enges-bankdruecken-multi", de: "Enges Bankdrücken an der Multipresse", en: "Close Grip Smith Machine Bench Press", bereich: "maschine", haupt: "trizeps", hilfs: ["brust", "schulter-vorn"], auch: ["brust"] },
  { id: "trizeps-dips-assistiert", de: "Trizeps-Dips an der Unterstützungsmaschine", en: "Machine Assisted Triceps Dip", bereich: "maschine", haupt: "trizeps", hilfs: ["brust", "schulter-vorn"], auch: ["brust"] },
  { id: "dip-maschine-trizeps", de: "Dip-Maschine sitzend, Trizeps (Steckgewicht)", en: "Seated Pin-Loaded Machine Triceps Dip", bereich: "maschine", haupt: "trizeps", hilfs: ["brust", "schulter-vorn"], auch: ["brust"] },
  { id: "jm-press-multi", de: "JM Press an der Multipresse", en: "Smith Machine JM Press", bereich: "maschine", haupt: "trizeps", hilfs: ["schulter-vorn", "brust"], auch: [] },
  { id: "enges-bankdruecken-lh", de: "Enges Bankdrücken (Langhantel)", en: "Close Grip Bench Press", bereich: "frei", haupt: "trizeps", hilfs: ["brust", "schulter-vorn"], auch: ["brust"] },
  { id: "french-press", de: "French Press", en: "Skull Crusher", bereich: "frei", haupt: "trizeps", hilfs: [], auch: [] },
  { id: "ueberkopf-trizepsstrecken", de: "Überkopf-Trizepsstrecken", en: "Overhead Triceps Extension", bereich: "frei", haupt: "trizeps", hilfs: [], auch: [] },
  { id: "kickbacks", de: "Kickbacks", en: "Triceps Kickback", bereich: "frei", haupt: "trizeps", hilfs: ["schulter-hinten"], auch: [] },
  { id: "enges-negativbank-lh", de: "Enges Negativ-Bankdrücken (Langhantel)", en: "Decline Close Grip Press", bereich: "frei", haupt: "trizeps", hilfs: ["brust", "schulter-vorn"], auch: ["brust"] },
  { id: "jm-press-lh", de: "JM Press (Langhantel)", en: "Barbell JM Press", bereich: "frei", haupt: "trizeps", hilfs: ["schulter-vorn", "brust"], auch: [] },
  { id: "lockout-bank-lh", de: "Lockout-Bankdrücken aus den Pins (Langhantel)", en: "Lockout Pin Bench Press", bereich: "frei", haupt: "trizeps", hilfs: ["schulter-vorn", "brust"], auch: [] },
  { id: "trizeps-dips", de: "Trizeps-Dips", en: "Triceps Dip", bereich: "eigen", haupt: "trizeps", hilfs: ["brust", "schulter-vorn"], auch: ["brust"] },
  { id: "enge-liegestuetze", de: "Enge Liegestütze", en: "Close Grip Push-Up", bereich: "eigen", haupt: "trizeps", hilfs: ["brust", "schulter-vorn", "bauch"], auch: ["brust"] },
  { id: "diamant-liegestuetze", de: "Diamant-Liegestütze", en: "Diamond Push-Up", bereich: "eigen", haupt: "trizeps", hilfs: ["brust", "schulter-vorn", "bauch"], auch: ["brust"] },
  { id: "enge-liegestuetze-knie", de: "Enge Liegestütze auf den Knien", en: "Kneeling Close Grip Push-Up", bereich: "eigen", haupt: "trizeps", hilfs: ["brust", "schulter-vorn"], auch: ["brust"] },
  { id: "trizeps-dips-gewicht", de: "Trizeps-Dips mit Zusatzgewicht", en: "Weighted Triceps Dip", bereich: "eigen", haupt: "trizeps", hilfs: ["brust", "schulter-vorn"], auch: ["brust"] },

  // Ab hier stehen vorerst die bisherigen Übungen der App. Die ausführlichen Listen folgen in Etappe 2.

  // ---------- Rücken ----------
  { id: "latzug", de: "Latzug", en: "Lat Pulldown", bereich: "maschine", haupt: "lat", hilfs: ["bizeps", "ruecken-oben"], auch: [] },
  { id: "kabelrudern", de: "Rudern am Kabelzug", en: "Seated Cable Row", bereich: "maschine", haupt: "ruecken-oben", hilfs: ["lat", "bizeps"], auch: [] },
  { id: "langhantelrudern", de: "Langhantelrudern", en: "Barbell Row", bereich: "frei", haupt: "ruecken-oben", hilfs: ["lat", "bizeps", "ruecken-unten"], auch: [] },
  { id: "kurzhantelrudern", de: "Kurzhantelrudern", en: "Dumbbell Row", bereich: "frei", haupt: "lat", hilfs: ["ruecken-oben", "bizeps"], auch: [] },
  { id: "kreuzheben", de: "Kreuzheben", en: "Deadlift", bereich: "frei", haupt: "ruecken-unten", hilfs: ["po", "beinbeuger", "ruecken-oben", "unterarme"], auch: ["po", "beinbeuger"] },
  { id: "t-bar-rudern", de: "T-Bar-Rudern", en: "T-Bar Row", bereich: "frei", haupt: "ruecken-oben", hilfs: ["lat", "bizeps"], auch: [] },
  { id: "klimmzuege", de: "Klimmzüge", en: "Pull-Up", bereich: "eigen", haupt: "lat", hilfs: ["bizeps", "ruecken-oben"], auch: [] },

  // ---------- Schultern ----------
  { id: "face-pulls", de: "Face Pulls", en: "Face Pull", bereich: "maschine", haupt: "schulter-hinten", hilfs: ["ruecken-oben"], auch: [] },
  { id: "innenrotation-kabel", de: "Innenrotation am Kabel mit erhobenem Arm", en: "Cable Shoulder Internal Rotation with Arm Elevated", bereich: "maschine", haupt: "schulter-rotatoren", hilfs: ["brust", "lat"], auch: [] },
  { id: "schulterdruecken", de: "Schulterdrücken", en: "Shoulder Press", bereich: "frei", haupt: "schulter-vorn", hilfs: ["schulter-seite", "trizeps"], auch: [] },
  { id: "military-press", de: "Military Press", en: "Military Press", bereich: "frei", haupt: "schulter-vorn", hilfs: ["schulter-seite", "trizeps"], auch: [] },
  { id: "seitheben", de: "Seitheben", en: "Lateral Raise", bereich: "frei", haupt: "schulter-seite", hilfs: [], auch: [] },
  { id: "frontheben", de: "Frontheben", en: "Front Raise", bereich: "frei", haupt: "schulter-vorn", hilfs: [], auch: [] },
  { id: "reverse-flys", de: "Reverse Flys", en: "Reverse Fly", bereich: "frei", haupt: "schulter-hinten", hilfs: ["ruecken-oben"], auch: [] },
  { id: "arnold-press", de: "Arnold Press", en: "Arnold Press", bereich: "frei", haupt: "schulter-vorn", hilfs: ["schulter-seite", "trizeps"], auch: [] },

  // ---------- Bizeps ----------
  { id: "kabelcurls", de: "Kabelcurls", en: "Cable Curl", bereich: "maschine", haupt: "bizeps", hilfs: ["unterarme"], auch: [] },
  { id: "langhantelcurls", de: "Langhantelcurls", en: "Barbell Curl", bereich: "frei", haupt: "bizeps", hilfs: ["unterarme"], auch: [] },
  { id: "kurzhantelcurls", de: "Kurzhantelcurls", en: "Dumbbell Curl", bereich: "frei", haupt: "bizeps", hilfs: ["unterarme"], auch: [] },
  { id: "hammercurls", de: "Hammercurls", en: "Hammer Curl", bereich: "frei", haupt: "bizeps", hilfs: ["unterarme"], auch: ["unterarme"] },
  { id: "scottcurls", de: "Scottcurls", en: "Preacher Curl", bereich: "frei", haupt: "bizeps", hilfs: ["unterarme"], auch: [] },
  { id: "konzentrationscurls", de: "Konzentrationscurls", en: "Concentration Curl", bereich: "frei", haupt: "bizeps", hilfs: [], auch: [] },

  // ---------- Bauch ----------
  { id: "cable-crunches", de: "Cable Crunches", en: "Cable Crunch", bereich: "maschine", haupt: "bauch", hilfs: [], auch: [] },
  { id: "crunches", de: "Crunches", en: "Crunch", bereich: "eigen", haupt: "bauch", hilfs: [], auch: [] },
  { id: "plank", de: "Plank", en: "Plank", bereich: "eigen", haupt: "bauch", hilfs: ["bauch-schraeg", "ruecken-unten"], auch: [] },
  { id: "beinheben", de: "Beinheben", en: "Leg Raise", bereich: "eigen", haupt: "bauch", hilfs: [], auch: [] },
  { id: "russian-twist", de: "Russian Twist", en: "Russian Twist", bereich: "eigen", haupt: "bauch-schraeg", hilfs: ["bauch"], auch: [] },
  { id: "sit-ups", de: "Sit-ups", en: "Sit-Up", bereich: "eigen", haupt: "bauch", hilfs: [], auch: [] },
  { id: "mountain-climbers", de: "Mountain Climbers", en: "Mountain Climber", bereich: "eigen", haupt: "bauch", hilfs: ["schulter-vorn", "quadrizeps"], auch: [] },

  // ---------- Po ----------
  { id: "kickbacks-kabel", de: "Kickbacks am Kabel", en: "Cable Glute Kickback", bereich: "maschine", haupt: "po", hilfs: ["beinbeuger"], auch: [] },
  { id: "abduktorenmaschine", de: "Abduktorenmaschine", en: "Hip Abduction Machine", bereich: "maschine", haupt: "abduktoren", hilfs: ["po"], auch: [] },
  { id: "hip-thrust", de: "Hip Thrust", en: "Hip Thrust", bereich: "frei", haupt: "po", hilfs: ["beinbeuger"], auch: [] },
  { id: "sumo-kniebeuge", de: "Sumo-Kniebeuge", en: "Sumo Squat", bereich: "frei", haupt: "po", hilfs: ["quadrizeps"], auch: ["quadrizeps"] },
  { id: "glute-bridge", de: "Glute Bridge", en: "Glute Bridge", bereich: "eigen", haupt: "po", hilfs: ["beinbeuger"], auch: [] },
  { id: "step-ups", de: "Step-ups", en: "Step-Up", bereich: "eigen", haupt: "po", hilfs: ["quadrizeps"], auch: ["quadrizeps"] },

  // ---------- Quadrizeps ----------
  { id: "beinpresse", de: "Beinpresse", en: "Leg Press", bereich: "maschine", haupt: "quadrizeps", hilfs: ["po"], auch: [] },
  { id: "beinstrecker", de: "Beinstrecker", en: "Leg Extension", bereich: "maschine", haupt: "quadrizeps", hilfs: [], auch: [] },
  { id: "kniebeuge", de: "Kniebeuge", en: "Squat", bereich: "frei", haupt: "quadrizeps", hilfs: ["po", "ruecken-unten"], auch: ["po"] },
  { id: "ausfallschritte", de: "Ausfallschritte", en: "Lunge", bereich: "frei", haupt: "quadrizeps", hilfs: ["po"], auch: ["po"] },
  { id: "bulgarian-split-squats", de: "Bulgarian Split Squats", en: "Bulgarian Split Squat", bereich: "frei", haupt: "quadrizeps", hilfs: ["po"], auch: ["po"] },

  // ---------- Beinbeuger ----------
  { id: "beinbeuger-maschine", de: "Beinbeuger", en: "Leg Curl", bereich: "maschine", haupt: "beinbeuger", hilfs: [], auch: [] },
  { id: "rumaenisches-kreuzheben", de: "Rumänisches Kreuzheben", en: "Romanian Deadlift", bereich: "frei", haupt: "beinbeuger", hilfs: ["po", "ruecken-unten"], auch: ["po"] },

  // ---------- Waden ----------
  { id: "wadenheben", de: "Wadenheben", en: "Calf Raise", bereich: "maschine", haupt: "waden", hilfs: [], auch: [] },

  // ---------- Ganzkörper ----------
  { id: "burpee", de: "Burpee", en: "Burpee", bereich: "eigen", haupt: "ganzkoerper", hilfs: ["quadrizeps", "brust", "schulter-vorn", "bauch"], auch: [] }
];

// Frühere Übungsnamen (kleingeschrieben) und die ID der Übung, die heute dafür steht.
// Damit finden alte Einträge und Routinen ihre Übung wieder. Wird eine Übung umbenannt,
// kommt ihr alter Name hier dazu.
const ALTE_NAMEN = {
  "bankdrücken": "bankdruecken-lh",
  "schrägbankdrücken": "schraegbank-45-lh",
  "kurzhantel-flys": "fliegende-kh",
  "butterfly/pec deck": "butterfly",
  "dips": "brust-dips",
  "enges bankdrücken": "enges-bankdruecken-lh"
};
