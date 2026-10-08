// Alle Texte der App-Oberfläche in jeder Sprache. Die app.js holt sie über txt("schluessel").
// Die Namen der Übungen und Muskelgruppen stehen in der uebungen.js.
//
// Eine weitere Sprache kommt so dazu:
// 1. Unten in SPRACHEN eine Zeile ergänzen.
// 2. In TEXTE bei jedem Text die Übersetzung unter dem neuen Kürzel eintragen.
//    Fehlt eine Übersetzung, zeigt die App an der Stelle den deutschen Text.
// 3. In der uebungen.js die Namen unter demselben Kürzel ergänzen.

// Die Sprachen, die sich im Profil wählen lassen.
// "gebiet" legt fest, wie Zahlen und Datum geschrieben werden, wenn das Gerät auf eine andere Sprache eingestellt ist.
// "monat" ist die Schreibweise des Monats in kurzen Datumsangaben: "numeric" (5.10.) oder "short" (5 Oct).
const SPRACHEN = [
  { id: "de", name: "Deutsch", gebiet: "de-DE", monat: "numeric" },
  { id: "en", name: "English", gebiet: "en-GB", monat: "short" }
];

// Platzhalter in geschweiften Klammern füllt die app.js, z. B. wird aus "Satz {n}" der Text "Satz 2".
// Texte, die es in Einzahl und Mehrzahl gibt, enden auf ".eins" und ".viele".
const TEXTE = {
  // ---------- Navigation und Seitentitel ----------
  "nav.home": { de: "Home", en: "Home" },
  "nav.training": { de: "Training", en: "Training" },
  "nav.fortschritt": { de: "Fortschritt", en: "Progress" },
  "nav.gym": { de: "Gym", en: "Gym" },
  "nav.profil": { de: "Profil", en: "Profile" },

  // ---------- Allgemein ----------
  "speichern": { de: "Speichern", en: "Save" },
  "loeschen": { de: "Löschen", en: "Delete" },
  "abbrechen": { de: "Abbrechen", en: "Cancel" },
  "zurueck": { de: "Zurück", en: "Back" },
  "zurueck.pfeil": { de: "‹ Zurück", en: "‹ Back" },
  "abbrechen.pfeil": { de: "‹ Abbrechen", en: "‹ Cancel" },
  "schliessen": { de: "Schließen", en: "Close" },
  "kommtBald": { de: "Kommt bald", en: "Coming soon" },
  "uebungen": { de: "Übungen", en: "Exercises" },
  "saetze": { de: "Sätze", en: "Sets" },
  "wdh": { de: "Wdh.", en: "Reps" },
  "wiederholungen": { de: "Wiederholungen", en: "Repetitions" },
  "pause": { de: "Pause", en: "Rest" },
  "pause.vorbei": { de: "Pause vorbei", en: "Rest over" },
  "pause.beenden": { de: "Pause beenden", en: "End rest" },
  "ueberspringen": { de: "Überspringen", en: "Skip" },
  "ruhetag": { de: "Ruhetag", en: "Rest day" },
  "heute": { de: "Heute", en: "Today" },
  "koerpergewicht": { de: "Körpergewicht", en: "Body Weight" },
  "koerperfett": { de: "Körperfett", en: "Body Fat" },
  "wochenplan": { de: "Wochenplan", en: "Weekly Plan" },
  "update": { de: "Neue Version verfügbar – tippen zum Aktualisieren", en: "New version available – tap to update" },
  "anzahl.uebungen.eins": { de: "1 Übung", en: "1 exercise" },
  "anzahl.uebungen.viele": { de: "{n} Übungen", en: "{n} exercises" },
  "anzahl.saetze.eins": { de: "1 Satz", en: "1 set" },
  "anzahl.saetze.viele": { de: "{n} Sätze", en: "{n} sets" },
  "uebung.xVonY": { de: "Übung {x} von {y}", en: "Exercise {x} of {y}" },
  "woche.kw": { de: "KW {nr}", en: "Week {nr}" },
  "dauer.minuten": { de: "{m} Min.", en: "{m} min" },
  "dauer.stunden": { de: "{h} Std. {m} Min.", en: "{h} h {m} min" },

  // ---------- Gewicht und Zahlenfelder ----------
  "gewicht": { de: "Gewicht", en: "Weight" },
  "gewicht.titel": { de: "Gewicht ({einheit})", en: "Weight ({einheit})" },
  "gewicht.in": { de: "Gewicht in {einheit}", en: "Weight in {einheit}" },
  "gewicht.weniger": { de: "{schritt} {einheit} weniger", en: "{schritt} {einheit} less" },
  "gewicht.mehr": { de: "{schritt} {einheit} mehr", en: "{schritt} {einheit} more" },
  "wdh.weniger": { de: "Eine Wiederholung weniger", en: "One rep less" },
  "wdh.mehr": { de: "Eine Wiederholung mehr", en: "One rep more" },
  "satz.weniger": { de: "Ein Satz weniger", en: "One set less" },
  "satz.mehr": { de: "Ein Satz mehr", en: "One set more" },

  // ---------- Home ----------
  "home.dieseWoche": { de: "Diese Woche", en: "This Week" },
  "home.letztesTraining": { de: "Letztes Training", en: "Last Workout" },
  "home.log": { de: "Log", en: "Log" },
  "home.einzeln": { de: "Einzelne Übung eintragen", en: "Log a single exercise" },
  "home.alleEintraege": { de: "Alle Einträge", en: "All entries" },
  "home.tippen": { de: "Tippen zum Eintragen", en: "Tap to log" },
  "home.laeuft": { de: "Läuft gerade", en: "In progress" },
  "home.erledigt": { de: "Heute erledigt", en: "Done today" },
  "home.geplant": { de: "Heute geplant", en: "Planned today" },
  "home.nochmal": { de: "Nochmal starten", en: "Start again" },
  "home.starten": { de: "Training starten", en: "Start workout" },
  "home.ruheText": { de: "Heute ist Pause. Erhol dich gut.", en: "Rest day today. Recover well." },
  "home.nichtsGeplant": { de: "Nichts geplant", en: "Nothing planned" },
  "home.nichtsText": { de: "Für heute steht nichts im Wochenplan.", en: "Nothing in your weekly plan for today." },
  "home.zumPlan": { de: "Zum Wochenplan", en: "Go to weekly plan" },
  "home.tag.nichts": { de: "nichts geplant", en: "nothing planned" },
  "home.tag.ruhe": { de: "Ruhe", en: "Rest" },
  "home.tag.trainiert": { de: "trainiert", en: "trained" },
  "home.keinTraining": { de: "Noch kein Training eingetragen", en: "No workout logged yet" },
  "home.bewegt": { de: "Bewegt", en: "Moved" },
  "freiesTraining": { de: "Freies Training", en: "Free workout" },

  // ---------- Log ----------
  "log.unterzeile": { de: "Trag dein Training ein", en: "Log your workout" },
  "log.wocheZurueck": { de: "Woche zurück", en: "Previous week" },
  "log.wocheVor": { de: "Woche vor", en: "Next week" },
  "log.neuerEintrag": { de: "Neuer Eintrag", en: "New Entry" },
  "log.uebungWaehlen": { de: "Übung wählen", en: "Choose exercise" },
  "log.speichernFuer": { de: "Speichern für {tag}", en: "Save for {tag}" },
  "log.pauseStarten": { de: "Pause starten", en: "Start rest timer" },
  "log.ohneDatum": { de: "Ohne Datum", en: "No date" },
  "log.tagLeer": { de: "Keine Einträge an diesem Tag.", en: "No entries on this day." },
  "letztesMal": { de: "Letztes Mal{datum}: {saetze}", en: "Last time{datum}: {saetze}" },
  "letztesMal.leer": { de: "Letztes Mal: noch kein Eintrag", en: "Last time: no entry yet" },
  "eintrag.gleich.eins": { de: "1 Satz × {wdh} Wdh. à {gewicht}", en: "1 set × {wdh} reps at {gewicht}" },
  "eintrag.gleich.viele": { de: "{n} Sätze × {wdh} Wdh. à {gewicht}", en: "{n} sets × {wdh} reps at {gewicht}" },

  // ---------- Übungsauswahl ----------
  "sheet.muskelgruppe": { de: "Muskelgruppe", en: "Muscle Group" },
  "sheet.suche": { de: "Suche", en: "Search" },
  "sheet.suchfeld": { de: "Übung suchen oder eigene anlegen", en: "Search exercises or create your own" },
  "sheet.trainiertAuch": { de: "Trainiert auch", en: "Also trains" },
  "sheet.gruppeLeer": {
    de: "Für diese Muskelgruppe kommen die Übungen noch. Bis dahin kannst du eine eigene anlegen.",
    en: "Exercises for this muscle group are still to come. Until then you can create your own."
  },
  "sheet.mehr": { de: "Mehr anzeigen (+{n})", en: "Show more (+{n})" },
  "sheet.keinTreffer": { de: "Keine Übung gefunden.", en: "No exercise found." },
  "sheet.eigene": { de: "„{name}“ als eigene Übung anlegen", en: "Create “{name}” as your own exercise" },

  // ---------- Eigene Übungen ----------
  "selbst.kachel": { de: "Eigene", en: "My Own" },
  "selbst.zeichen": { de: "Eigene", en: "Own" },
  "selbst.neu": { de: "+ Eigene Übung hinzufügen", en: "+ Add your own exercise" },
  "selbst.leer": {
    de: "Du hast noch keine eigene Übung angelegt.",
    en: "You have not created an exercise of your own yet."
  },
  "selbst.bearbeitenAnsage": { de: "{name} bearbeiten", en: "Edit {name}" },
  "selbst.titelNeu": { de: "Eigene Übung", en: "Your Own Exercise" },
  "selbst.titelBearbeiten": { de: "Übung bearbeiten", en: "Edit Exercise" },
  "selbst.name": { de: "Name", en: "Name" },
  "selbst.namePlatzhalter": { de: "z. B. Landmine Press", en: "e.g. Landmine Press" },
  "selbst.haupt": { de: "Hauptmuskelgruppe", en: "Main muscle group" },
  "selbst.bitteWaehlen": { de: "Bitte wählen", en: "Please choose" },
  "selbst.hilfs": { de: "Hilfsmuskeln (optional)", en: "Supporting muscles (optional)" },
  "selbst.art": { de: "Art", en: "Type" },
  "selbst.artEigengewicht": {
    de: "Eigengewicht: Es zählen die Wiederholungen, Zusatzgewicht ist möglich.",
    en: "Bodyweight: reps count, added weight is optional."
  },
  "selbst.loeschen": { de: "Übung löschen", en: "Delete exercise" },
  "selbst.gibtEs": { de: "Gibt es schon. Tippe die Übung an, um sie zu nehmen:", en: "Already exists. Tap the exercise to use it:" },
  "selbst.nameFehlt": { de: "Bitte gib einen Namen ein.", en: "Please enter a name." },
  "selbst.nameZuLang": { de: "Der Name darf höchstens {n} Zeichen haben.", en: "The name can have at most {n} characters." },
  "selbst.hauptFehlt": { de: "Bitte wähle eine Hauptmuskelgruppe.", en: "Please choose a main muscle group." },
  "selbst.verknuepfenFrage": { de: "Alte Einträge verknüpfen?", en: "Link old entries?" },
  "selbst.alteEintraege.eins": { de: "1 alter Eintrag mit diesem Namen gefunden.", en: "Found 1 old entry with this name." },
  "selbst.alteEintraege.viele": { de: "{n} alte Einträge mit diesem Namen gefunden.", en: "Found {n} old entries with this name." },
  "selbst.alteRoutinen.eins": { de: "1 Übung in deinen Routinen trägt diesen Namen.", en: "1 exercise in your routines has this name." },
  "selbst.alteRoutinen.viele": { de: "{n} Übungen in deinen Routinen tragen diesen Namen.", en: "{n} exercises in your routines have this name." },
  "selbst.verknuepfenText": {
    de: "Mit „{name}“ verknüpfen? Dann gehören sie zu dieser Übung und erscheinen in ihrem Diagramm.",
    en: "Link them to “{name}”? They will then belong to this exercise and show up in its chart."
  },
  "selbst.verknuepfen": { de: "Verknüpfen", en: "Link" },
  "selbst.nichtVerknuepfen": { de: "Nicht verknüpfen", en: "Don't link" },
  "selbst.loeschenFrage": { de: "Übung löschen?", en: "Delete exercise?" },
  "selbst.loeschenTextLeer": {
    de: "„{name}“ verschwindet aus der Übungsauswahl.",
    en: "“{name}” will be removed from the exercise picker."
  },
  "selbst.loeschenText.eins": {
    de: "„{name}“ verschwindet aus der Übungsauswahl. Der 1 Trainingseintrag dazu bleibt erhalten und zeigt weiter diesen Namen.",
    en: "“{name}” will be removed from the exercise picker. Its 1 workout entry is kept and still shows this name."
  },
  "selbst.loeschenText.viele": {
    de: "„{name}“ verschwindet aus der Übungsauswahl. Die {n} Trainingseinträge dazu bleiben erhalten und zeigen weiter diesen Namen.",
    en: "“{name}” will be removed from the exercise picker. Its {n} workout entries are kept and still show this name."
  },

  // ---------- Training: Übersicht ----------
  "training.unterzeile": { de: "Deine Trainingspläne", en: "Your training plans" },
  "training.meineRoutinen": { de: "Meine Routinen", en: "My Routines" },
  "training.vorlagen": { de: "Vorlagen", en: "Templates" },
  "training.fortsetzenFrage": { de: "Training fortsetzen?", en: "Resume workout?" },
  "training.fortsetzen": { de: "Training fortsetzen", en: "Resume workout" },
  "fortsetzen": { de: "Fortsetzen", en: "Resume" },
  "verwerfen": { de: "Verwerfen", en: "Discard" },
  "spaeter": { de: "Später", en: "Later" },
  "plan.nichtGeplant": { de: "Nicht geplant", en: "Not planned" },
  "routinen.leer": {
    de: "Noch keine Routinen. Leg eine eigene an oder übernimm unten eine Vorlage.",
    en: "No routines yet. Create your own or use a template below."
  },
  "routine.starten": { de: "Starten", en: "Start" },
  "routine.bearbeiten": { de: "Bearbeiten", en: "Edit" },
  "routine.loeschenFrage": { de: "Routine löschen?", en: "Delete routine?" },
  "routine.loeschenText": {
    de: "„{name}“ wird gelöscht und aus dem Wochenplan entfernt. Deine Einträge im Log bleiben erhalten.",
    en: "“{name}” will be deleted and removed from the weekly plan. Your log entries are kept."
  },
  "vorlage.routinen": { de: "Routinen: {namen}", en: "Routines: {namen}" },
  "vorlage.uebernehmen": { de: "Vorlage übernehmen", en: "Use template" },
  "vorlage.angelegt": {
    de: "{n} Routinen wurden angelegt. Vorschlag für deine Woche:\n\n{plan}",
    en: "{n} routines were created. Suggested week:\n\n{plan}"
  },
  "vorlage.planErsetzt": { de: "Dein bisheriger Wochenplan wird dabei ersetzt.", en: "This replaces your current weekly plan." },
  "vorlage.planFrage": { de: "Wochenplan übernehmen?", en: "Apply weekly plan?" },
  "vorlage.planJa": { de: "Wochenplan übernehmen", en: "Apply weekly plan" },
  "vorlage.planNein": { de: "Wochenplan nicht ändern", en: "Keep my weekly plan" },

  // ---------- Training: Vorlagen ----------
  "vorlage.ganzkoerper.name": { de: "Ganzkörper", en: "Full Body" },
  "vorlage.ganzkoerper.fuerWen": {
    de: "Einsteiger und alle mit wenig Zeit. Jeder Muskel ist in jeder Einheit dran.",
    en: "Beginners and anyone short on time. Every muscle is trained in every session."
  },
  "vorlage.ganzkoerper.wieOft": { de: "3× pro Woche, immer mit einem Ruhetag dazwischen", en: "3× per week, always with a rest day in between" },
  "vorlage.obenUnten.name": { de: "Oberkörper/Unterkörper", en: "Upper/Lower" },
  "vorlage.obenUnten.fuerWen": {
    de: "Wer die Grundübungen kennt und jeden Muskel zweimal pro Woche trainieren will.",
    en: "For those who know the basic lifts and want to train every muscle twice a week."
  },
  "vorlage.obenUnten.wieOft": { de: "4× pro Woche", en: "4× per week" },
  "vorlage.ppl.name": { de: "Push/Pull/Legs", en: "Push/Pull/Legs" },
  "vorlage.ppl.fuerWen": {
    de: "Fortgeschrittene, die oft trainieren und pro Einheit mehr Übungen je Muskel wollen.",
    en: "Advanced lifters who train often and want more exercises per muscle in each session."
  },
  "vorlage.ppl.wieOft": { de: "6× pro Woche (oder 3× mit je einem Ruhetag dazwischen)", en: "6× per week (or 3× with a rest day in between)" },
  "vorlage.bro.name": { de: "Bro Split", en: "Bro Split" },
  "vorlage.bro.fuerWen": {
    de: "Erfahrene, die pro Einheit eine Muskelgruppe mit vielen Sätzen voll auslasten wollen.",
    en: "Experienced lifters who want to fully work one muscle group with many sets per session."
  },
  "vorlage.bro.wieOft": { de: "5× pro Woche", en: "5× per week" },
  "vorlage.routine.ganzkoerperA": { de: "Ganzkörper A", en: "Full Body A" },
  "vorlage.routine.ganzkoerperB": { de: "Ganzkörper B", en: "Full Body B" },
  "vorlage.routine.oberkoerper": { de: "Oberkörper", en: "Upper Body" },
  "vorlage.routine.unterkoerper": { de: "Unterkörper", en: "Lower Body" },
  "vorlage.routine.push": { de: "Push", en: "Push" },
  "vorlage.routine.pull": { de: "Pull", en: "Pull" },
  "vorlage.routine.legs": { de: "Legs", en: "Legs" },
  "vorlage.routine.brust": { de: "Brust", en: "Chest" },
  "vorlage.routine.ruecken": { de: "Rücken", en: "Back" },
  "vorlage.routine.schultern": { de: "Schultern", en: "Shoulders" },
  "vorlage.routine.arme": { de: "Arme", en: "Arms" },
  "vorlage.routine.beine": { de: "Beine", en: "Legs" },

  // ---------- Training: Routinen-Editor ----------
  "editor.neu": { de: "Neue Routine", en: "New routine" },
  "editor.bearbeiten": { de: "Routine bearbeiten", en: "Edit routine" },
  "editor.name": { de: "Name, z. B. Push-Tag", en: "Name, e.g. Push Day" },
  "editor.hinzufuegen": { de: "Übung hinzufügen", en: "Add exercise" },
  "editor.speichern": { de: "Routine speichern", en: "Save routine" },
  "editor.leer": { de: "Noch keine Übungen.", en: "No exercises yet." },
  "editor.hoch": { de: "Nach oben", en: "Move up" },
  "editor.runter": { de: "Nach unten", en: "Move down" },
  "editor.entfernen": { de: "Übung entfernen", en: "Remove exercise" },
  "editor.wdhArt": { de: "Art des Wiederholungsziels", en: "Type of rep target" },
  "editor.festeZahl": { de: "Feste Zahl", en: "Fixed number" },
  "editor.eigenerBereich": { de: "Eigener Bereich", en: "Custom range" },
  "editor.wdhBis": { de: "Wiederholungen bis", en: "Repetitions up to" },
  "editor.pauseStandard": { de: "Standard", en: "Default" },
  "editor.ohneName": { de: "Gib der Routine einen Namen.", en: "Give the routine a name." },
  "editor.ohneUebung": { de: "Füge mindestens eine Übung hinzu.", en: "Add at least one exercise." },
  "ziel.beides": { de: "Ziel: {saetze} Sätze × {wdh} Wdh.", en: "Target: {saetze} × {wdh} reps" },
  "ziel.saetze": { de: "Ziel: {saetze} Sätze", en: "Target sets: {saetze}" },
  "ziel.wdh": { de: "Ziel: {wdh} Wdh.", en: "Target: {wdh} reps" },

  // ---------- Training: Trainingsmodus ----------
  "modus.beenden": { de: "Beenden", en: "Finish" },
  "modus.vorherige": { de: "Vorherige Übung", en: "Previous exercise" },
  "modus.naechste": { de: "Nächste Übung", en: "Next exercise" },
  "modus.rir": { de: "Reps in Reserve (optional)", en: "Reps in Reserve (optional)" },
  "modus.satzFertig": { de: "Satz fertig", en: "Set done" },
  "modus.extraSatz": { de: "+ Satz", en: "+ Set" },
  "modus.uebungUeberspringen": { de: "Übung überspringen", en: "Skip exercise" },
  "modus.abschliessen": { de: "Training abschließen", en: "Finish workout" },
  "modus.satz": { de: "Satz {n}", en: "Set {n}" },
  "modus.satzVon": { de: "Satz {n} von {ziel}", en: "Set {n} of {ziel}" },
  "modus.zielGeschafft": { de: "{n} von {ziel} Sätzen geschafft", en: "{n} of {ziel} sets done" },
  "modus.geschafft": { de: "{n} Sätze geschafft", en: "{n} sets done" },
  "modus.alsNaechstes": { de: "Als Nächstes: {text}", en: "Up next: {text}" },
  "modus.letzteUebung": { de: "Das war die letzte Übung.", en: "That was the last exercise." },
  "modus.danach": { de: "Danach: {name}", en: "Then: {name}" },
  "modus.erhoehen": {
    de: "Gewicht erhöhen: Letztes Mal hast du in allen Sätzen {wdh} Wdh. erreicht.",
    en: "Increase the weight: last time you hit {wdh} reps in every set."
  },
  "modus.laeuftNoch": { de: "Es läuft noch ein Training", en: "A workout is still running" },
  "modus.laeuftNochText": {
    de: "„{name}“ ist noch nicht abgeschlossen. Schon gespeicherte Übungen bleiben in jedem Fall im Log.",
    en: "“{name}” isn't finished yet. Exercises you already saved stay in the log either way."
  },
  "modus.laufendesFortsetzen": { de: "Laufendes Training fortsetzen", en: "Resume current workout" },
  "modus.neuStarten": { de: "„{name}“ neu starten", en: "Start “{name}” from scratch" },
  "modus.nichtFertig": { de: "„{name}“ ist noch nicht abgeschlossen: {stand}.", en: "“{name}” isn't finished yet: {stand}." },
  "modus.abschliessenFrage": { de: "Training abschließen?", en: "Finish workout?" },
  "modus.bleibtImLog": { de: "Schon gespeicherte Übungen bleiben im Log.", en: "Exercises you already saved stay in the log." },
  "modus.entfallen": { de: "Sie entfallen.", en: "They will be dropped." },
  "modus.zurOffenen": { de: "Zur offenen Übung", en: "Go to open exercise" },
  "modus.weiterTrainieren": { de: "Weiter trainieren", en: "Keep training" },
  "modus.beendenFrage": { de: "Training beenden?", en: "End workout?" },
  "modus.trainingBeenden": { de: "Training beenden", en: "End workout" },
  "modus.offen.eins": { de: "1 Übung ist noch offen: {namen}.", en: "1 exercise is still open: {namen}." },
  "modus.offen.viele": { de: "{n} Übungen sind noch offen: {namen}.", en: "{n} exercises are still open: {namen}." },
  "stand.offen": { de: "offen", en: "open" },
  "stand.fertig": { de: "fertig · {saetze}", en: "done · {saetze}" },
  "stand.xVonY": { de: "{x} von {y} Sätzen", en: "{x} of {y} sets" },

  // ---------- Training: Zusammenfassung ----------
  "fertig.titel": { de: "Geschafft!", en: "Done!" },
  "fertig.bewegt": { de: "Bewegtes Gewicht", en: "Weight moved" },
  "fertig.knopf": { de: "Fertig", en: "Done" },
  "fertig.gespeichert": { de: "{x} von {uebungen} gespeichert", en: "{x} of {uebungen} saved" },
  "fertig.uebersprungen": { de: "{n} übersprungen", en: "{n} skipped" },

  // ---------- Fortschritt ----------
  "fortschritt.unterzeile": { de: "Deine Zahlen auf einen Blick", en: "Your numbers at a glance" },
  "fortschritt.statistik": { de: "Statistik", en: "Stats" },
  "fortschritt.workouts": { de: "Workouts gesamt", en: "Total workouts" },
  "fortschritt.gesamtgewicht": { de: "Bewegtes Gesamtgewicht", en: "Total weight moved" },
  "fortschritt.verschiedene": { de: "Verschiedene Übungen", en: "Different exercises" },
  "fortschritt.serie": { de: "Wochen in Folge mit mind. 3 Trainingstagen", en: "Weeks in a row with at least 3 training days" },
  "fortschritt.schnitt": { de: "7-Tage-Schnitt", en: "7-day average" },
  "fortschritt.messung": { de: "Messung", en: "Measurement" },
  "fortschritt.gewichtEintragen": { de: "Gewicht eintragen", en: "Log weight" },
  "fortschritt.veraenderung": { de: "Veränderung im 7-Tage-Schnitt", en: "Change in 7-Day Average" },
  "fortschritt.letzteMessungen": { de: "Letzte Messungen", en: "Recent Measurements" },
  "fortschritt.kraft": { de: "Kraftentwicklung", en: "Strength Progress" },
  "fortschritt.kraftLeer": {
    de: "Sobald du Übungen eingetragen hast, findest du hier ihren Verlauf.",
    en: "Once you've logged exercises, you'll find their history here."
  },
  "fortschritt.tage": { de: "{n} Tage", en: "{n} days" },
  "fortschritt.keineMessungen": { de: "Noch keine Messungen.", en: "No measurements yet." },
  "messung.schnitt": { de: "Schnitt {wert}", en: "Avg {wert}" },
  "messung.zeitraumLeer": { de: "In diesem Zeitraum gibt es keine Messung.", en: "No measurement in this period." },
  "messung.gewichtLeer": { de: "Noch kein Gewicht eingetragen.", en: "No weight logged yet." },
  "messung.fettLeer": {
    de: "Noch kein Körperfett eingetragen. Du kannst es beim Körpergewicht mit angeben.",
    en: "No body fat logged yet. You can add it when you log your body weight."
  },
  "messung.fett": { de: "Körperfett {wert}", en: "Body fat {wert}" },
  "messung.fettFeld": { de: "Körperfett in % (optional)", en: "Body fat in % (optional)" },
  "zeitraum.jahr": { de: "1J", en: "1Y" },
  "zeitraum.alle": { de: "Alle", en: "All" },
  "diagramm": { de: "Liniendiagramm", en: "Line chart" },
  "verlauf.volumen": { de: "Volumen", en: "Volume" },
  "verlauf.leer": { de: "Zu dieser Übung gibt es noch keine Einträge.", en: "There are no entries for this exercise yet." },
  "verlauf.1rm": {
    de: "Geschätztes Maximalgewicht für eine Wiederholung (Epley-Formel), der beste Satz je Trainingstag.",
    en: "Estimated one-rep max (Epley formula), best set per training day."
  },
  "verlauf.schwer": { de: "Das schwerste eingetragene Gewicht je Trainingstag.", en: "The heaviest weight logged per training day." },
  "verlauf.volumenText": { de: "Sätze × Wdh. × Gewicht, zusammengezählt je Trainingstag.", en: "Sets × reps × weight, added up per training day." },
  "verlauf.mitKoerper": { de: "Gerechnet mit deinem Körpergewicht plus Zusatzgewicht.", en: "Calculated with your body weight plus added weight." },
  "verlauf.ohneKoerper": {
    de: "Trag dein Körpergewicht ein, dann wird es bei dieser Übung mitgerechnet.",
    en: "Log your body weight and it will be included for this exercise."
  },
  "verlauf.einPunkt": { de: "Ab dem zweiten Trainingstag entsteht eine Linie.", en: "A line appears from the second training day." },

  // ---------- Gym ----------
  "gym.unterzeile": { de: "Bau dir dein eigenes Gym", en: "Build your own gym" },

  // ---------- Profil ----------
  "profil.unterzeile": { de: "Deine Einstellungen", en: "Your settings" },
  "profil.konto": { de: "Konto", en: "Account" },
  "profil.login": { de: "Login und Cloud-Speicher", en: "Login and cloud storage" },
  "profil.abo": { de: "Abo", en: "Subscription" },
  "profil.integrationen": { de: "Integrationen", en: "Integrations" },
  "profil.health": { de: "Apple Health kommt mit der App-Store-Version.", en: "Apple Health arrives with the App Store version." },
  "profil.standardPause": { de: "Standard-Pause", en: "Default rest" },
  "profil.pauseKuerzer": { de: "15 Sekunden kürzer", en: "15 seconds shorter" },
  "profil.pauseLaenger": { de: "15 Sekunden länger", en: "15 seconds longer" },
  "profil.pauseHinweis": {
    de: "Gilt, wenn bei der Übung in der Routine nichts anderes eingestellt ist.",
    en: "Applies when the exercise has no rest time of its own in the routine."
  },
  "profil.einheiten": { de: "Einheiten", en: "Units" },
  "profil.laenge": { de: "Länge", en: "Length" },
  "profil.einheitenHinweis": {
    de: "Deine Daten bleiben beim Umschalten unverändert, nur Anzeige und Eingabe werden umgerechnet. Die Länge gilt für spätere Körpermaße.",
    en: "Switching leaves your data unchanged, only display and input are converted. Length applies to body measurements coming later."
  },
  "profil.sprache": { de: "Sprache", en: "Language" },
  "profil.daten": { de: "Daten", en: "Data" },
  "backup.exportieren": { de: "Backup exportieren", en: "Export backup" },
  "backup.importieren": { de: "Backup importieren", en: "Import backup" },

  // ---------- Backup ----------
  "backup.ergaenzen": { de: "Ergänzen (vorhandene behalten)", en: "Merge (keep existing)" },
  "backup.ersetzen": { de: "Ersetzen (vorhandene löschen)", en: "Replace (delete existing)" },
  "backup.exportiert": { de: "Backup mit {n} Einträgen exportiert.", en: "Backup with {n} entries exported." },
  "backup.nichtLesbar": { de: "Die Datei konnte nicht gelesen werden.", en: "The file could not be read." },
  "backup.ungueltig": { de: "Das ist keine gültige Backup-Datei.", en: "This is not a valid backup file." },
  "backup.leer": { de: "Das Backup enthält keine Einträge.", en: "The backup contains no entries." },
  "backup.frage": {
    de: "Das Backup enthält {neu} Einträge. Auf diesem Gerät sind {hier} Einträge gespeichert.",
    en: "The backup contains {neu} entries. This device has {hier} entries saved."
  },
  "backup.frageRoutinen": {
    de: "Außerdem enthält es {neu} Routinen und den Wochenplan, hier sind {hier} Routinen gespeichert.",
    en: "It also contains {neu} routines and the weekly plan; {hier} routines are saved here."
  },
  "backup.ersetzt": {
    de: "{n} Einträge aus dem Backup wiederhergestellt. Die vorherigen wurden ersetzt.",
    en: "{n} entries restored from the backup. The previous ones were replaced."
  },
  "backup.ergaenzt": { de: "{neu} Einträge hinzugefügt, {alt} waren schon vorhanden.", en: "{neu} entries added, {alt} already existed." },
  "backup.routinenErsetzt": { de: "{n} Routinen und der Wochenplan wurden wiederhergestellt.", en: "{n} routines and the weekly plan were restored." },
  "backup.routinenErgaenzt": { de: "{n} Routinen hinzugefügt.", en: "{n} routines added." },
  "backup.trainingsErsetzt": { de: "{n} Trainingseinheiten wurden wiederhergestellt.", en: "{n} workouts were restored." },
  "backup.trainingsErgaenzt": { de: "{n} Trainingseinheiten hinzugefügt.", en: "{n} workouts added." },
  "backup.gewichteErsetzt": { de: "{n} Messungen des Körpergewichts wurden wiederhergestellt.", en: "{n} body weight measurements were restored." },
  "backup.gewichteErgaenzt": { de: "{n} Messungen des Körpergewichts hinzugefügt.", en: "{n} body weight measurements added." },
  "backup.eigeneErsetzt": { de: "{n} eigene Übungen wurden wiederhergestellt.", en: "{n} exercises of your own were restored." },
  "backup.eigeneErgaenzt": { de: "{n} eigene Übungen hinzugefügt.", en: "{n} exercises of your own added." }
};
