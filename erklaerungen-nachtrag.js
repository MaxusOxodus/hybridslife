// Nachträge zu Muskelgruppen, deren Datei schon geladen ist: Übungen, die erst später beschrieben wurden.
// Die Einträge kommen zu denen aus der erklaerungen.js dazu,
// deshalb muss diese Datei in der index.html nach der erklaerungen.js stehen. Aufbau wie dort:
// Schlüssel ist die Übungs-ID, pro Übung schritte (2 bis 3) und optional fehler, sicherheit, tipp, alle in de und en.
// Die Datei hat in der index.html und in der sw.js kein ?v=N: Der Service Worker holt sie bei jeder neuen VERSION frisch.
Object.assign(ERKLAERUNGEN, {
  "single-arm-high-cable-lateral-raise": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle etwa auf Hüfthöhe und häng einen einzelnen Griff ein. Stell dich seitlich zur Rolle und greif den Griff mit einer Hand. Der Arm hängt nach unten." },
        { titel: "Heben", text: "Heb den Arm von unten nach außen und atme aus." },
        { titel: "Senken", text: "Lass den Arm langsam ab und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley to about hip height and attach a single handle. Stand sideways to the pulley and grip the handle with one hand. Your arm hangs down." },
        { titel: "Raise", text: "Lift your arm from below out to the side and breathe out." },
        { titel: "Lower", text: "Lower your arm slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Die Schulter zieht zum Ohr hoch, und der Trapezmuskel übernimmt.", en: "Your shoulder shrugs up toward your ear and your traps take over." }
  },
  "incline-dumbbell-lateral-raise": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich seitlich auf die Schrägbank. Halt eine Hantel in der oberen Hand, der Arm hängt nach unten." },
        { titel: "Heben", text: "Heb den Arm seitlich nach oben und atme aus." },
        { titel: "Senken", text: "Lass die Hantel langsam ab und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Lie on your side on the incline bench. Hold a dumbbell in your top hand with your arm hanging down." },
        { titel: "Raise", text: "Lift your arm up and out to the side and breathe out." },
        { titel: "Lower", text: "Lower the dumbbell slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du holst Schwung, weil die Hantel zu schwer ist.", en: "You use momentum because the dumbbell is too heavy." },
    tipp: { de: "Fang mit einer leichten Hantel an.", en: "Start with a light dumbbell." }
  },
  "butterfly-obergriff": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Stell den Sitz ein und setz dich. Rücken und Kopf lehnen am Polster. Greif die Griffe im Obergriff." },
        { titel: "Zusammenführen", text: "Führ die Arme vor der Brust zusammen und atme aus." },
        { titel: "Zurück", text: "Lass die Arme langsam zurück, bis du eine Dehnung in der Brust spürst, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Adjust the seat and sit down. Your back and head rest against the pad. Grip the handles with an overhand grip." },
        { titel: "Bring together", text: "Bring your arms together in front of your chest and breathe out." },
        { titel: "Return", text: "Let your arms return slowly until you feel a stretch in your chest, and breathe in." }
      ]
    },
    fehler: { de: "Die Schultern ziehen nach vorn oder oben. Halt sie unten und den Rücken am Polster.", en: "Your shoulders roll forward or shrug up. Keep them down and your back against the pad." }
  },
  "kabelfly-vorgebeugt": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Nimm in jede Hand einen Griff und stell dich mittig zwischen die Rollen. Beug den Oberkörper mit geradem Rücken vor. Die Arme sind offen." },
        { titel: "Zusammenführen", text: "Führ die Griffe vor dem Körper zusammen und atme aus." },
        { titel: "Zurück", text: "Lass die Arme langsam wieder auseinander und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Take a handle in each hand and stand centered between the pulleys. Lean your torso forward with a straight back. Your arms are open." },
        { titel: "Bring together", text: "Bring the handles together in front of your body and breathe out." },
        { titel: "Return", text: "Let your arms open again slowly and breathe in." }
      ]
    },
    fehler: { de: "Du richtest dich bei jeder Wiederholung auf und holst Schwung.", en: "You straighten up on every rep and use momentum." }
  },
  "dual-cable-triceps-press": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell beide Rollen nach oben und stell dich mittig dazwischen. Nimm in jede Hand einen Griff." },
        { titel: "Drücken", text: "Drück beide Griffe nach unten, bis die Arme gestreckt sind. Atme dabei aus." },
        { titel: "Zurück", text: "Lass die Griffe langsam wieder hoch und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Set both pulleys high and stand centered between them. Take a handle in each hand." },
        { titel: "Press", text: "Push both handles down until your arms are straight. Breathe out." },
        { titel: "Return", text: "Let the handles rise again slowly and breathe in." }
      ]
    },
    fehler: { de: "Du beugst dich vor und drückst mit dem Körpergewicht statt mit den Armen.", en: "You lean forward and push with your body weight instead of your arms." }
  },
  "seated-accentuated-eccentric-hamstring-curl": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Steck den Stift. Stell die Lehne so ein, dass die Knie auf Höhe der Drehachse sind. Die Rolle liegt unter den Waden knapp über den Fersen. Senk das obere Polster fest auf die Oberschenkel knapp über den Knien." },
        { titel: "Beugen", text: "Zieh die Fersen nach unten hinten unter den Sitz und atme aus." },
        { titel: "Langsam zurück", text: "Lass die Beine langsam und kontrolliert wieder hoch, bis sie fast gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Set the pin. Adjust the backrest so your knees line up with the pivot. The roller sits under your calves just above your heels. Lower the top pad firmly onto your thighs just above your knees." },
        { titel: "Curl", text: "Pull your heels down and back under the seat and breathe out." },
        { titel: "Slow return", text: "Let your legs rise again slowly and under control until they are almost straight, and breathe in." }
      ]
    },
    fehler: { de: "Die letzten Zentimeter gehen schnell, und das Gewicht fällt zurück.", en: "The last few centimeters go fast and the weight drops back." }
  }
});
