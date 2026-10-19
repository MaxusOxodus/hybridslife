// Übungsvideos (3D-Figur in Blender gerendert, seit Version 162). Nicht zu verwechseln mit den Animationen der Oberfläche (Version 157).
// Je Übung ein Video pro Figur: Mann, Frau und Roboter (für "divers"). Seit Version 163 dürfen Figuren fehlen,
// dann zeigt die App das Video vom Mann (UEBUNGSVIDEO_FIGUREN listet, welche es gibt).
// Die Dateien liegen im Ordner videos/ und heißen <id>-<figur>.mp4 (dazu .webm und ein Standbild .webp).
// Die app.js liest das nur, über UEBUNGSVIDEOS, videoFigur() und videoDatei().
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
  "liegestuetze",
  "klimmzuege",
  "brust-dips",
  "kurzhantelrudern",
  "french-press",
  "fliegende-kh",
  "reverse-flys",
  "crunches",
  "beinheben",
  "bulgarian-split-squats",
  "glute-bridge",
  "military-press",
  "enges-bankdruecken-lh",
  "bankdruecken-kh",
  "schraegbank-45-lh",
  "langhantelcurls",
  "hammercurls",
  "frontheben",
  "ausfallschritte",
  "wadenheben",
  "plank"
];

// Übungen, bei denen nicht alle drei Figuren fertig sind: welche es gibt. Alle anderen haben Mann, Frau und Roboter.
const UEBUNGSVIDEO_FIGUREN = {
  "kurzhantelrudern": ["mann"],
  "french-press": ["mann"],
  "fliegende-kh": ["mann"],
  "reverse-flys": ["mann"],
  "bulgarian-split-squats": ["mann"],
  "glute-bridge": ["mann"],
  "military-press": ["mann"],
  "enges-bankdruecken-lh": ["mann"],
  "bankdruecken-kh": ["mann"],
  "schraegbank-45-lh": ["mann"],
  "langhantelcurls": ["mann"],
  "hammercurls": ["mann"],
  "frontheben": ["mann"],
  "ausfallschritte": ["mann"],
  "wadenheben": ["mann"],
  "plank": ["mann"]
};

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

// Dateiname ohne Endung für eine Übung: die Figur aus dem Profil, gibt es sie noch nicht, der Mann.
function videoDatei(eid, geschlecht) {
  let figur = videoFigur(geschlecht);
  const da = UEBUNGSVIDEO_FIGUREN[eid];
  if (da && da.indexOf(figur) === -1) {
    figur = "mann";
  }
  return "videos/" + eid + "-" + figur;
}
