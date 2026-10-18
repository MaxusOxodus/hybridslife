// Übungsvideos (3D-Figur in Blender gerendert, seit Version 162). Nicht zu verwechseln mit den Animationen der Oberfläche (Version 157).
// Je Übung gibt es drei Videos, eins pro Figur: Mann, Frau und Roboter (für "divers").
// Die Dateien liegen im Ordner videos/ und heißen <id>-<figur>.mp4 (dazu .webm und ein Standbild .webp).
// Die app.js liest das nur, über UEBUNGSVIDEOS und videoFigur().
const UEBUNGSVIDEOS = [
  "kniebeuge",
  "bankdruecken-lh",
  "kreuzheben",
  "rumaenisches-kreuzheben",
  "langhantelrudern",
  "schulterdruecken",
  "kurzhantelcurls",
  "seitheben",
  "hip-thrust",
  "liegestuetze"
];

// Welche Figur zeigt das Video? Nach dem Geschlecht im Profil: "m" Mann, "w" Frau, "d" Roboter.
// Ohne Angabe ("") ebenfalls der Roboter, er ist neutral.
function videoFigur(geschlecht) {
  if (geschlecht === "m") {
    return "mann";
  }
  if (geschlecht === "w") {
    return "frau";
  }
  return "roboter";
}
