// Die Erklärungen der Muskelgruppe Seitliche Schulter. Sie kommen zu den Einträgen aus der erklaerungen.js dazu,
// deshalb muss diese Datei in der index.html nach der erklaerungen.js stehen. Aufbau wie dort:
// Schlüssel ist die Übungs-ID, pro Übung schritte (2 bis 3) und optional fehler, sicherheit, tipp, alle in de und en.
// Die Datei hat in der index.html und in der sw.js kein ?v=N: Der Service Worker holt sie bei jeder neuen VERSION frisch.
Object.assign(ERKLAERUNGEN, {
  "single-arm-cable-lateral-raise": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle ganz nach unten und häng einen einzelnen Griff ein. Stell dich seitlich zur Rolle und greif den Griff mit der Hand, die weiter weg ist. Das Kabel läuft vor dem Körper, die freie Hand hält sich am Gerät." },
        { titel: "Heben", text: "Heb den Arm mit leicht gebeugtem Ellbogen zur Seite bis auf Schulterhöhe. Atme dabei aus. Der Ellbogen führt." },
        { titel: "Senken", text: "Lass den Arm langsam ab, bis die Hand vor dem Oberschenkel ist, und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley all the way down and attach a single handle. Stand sideways to the pulley and grip the handle with the hand that is further away. The cable runs in front of your body and your free hand holds on to the machine." },
        { titel: "Raise", text: "Lift your arm out to the side to shoulder height with your elbow slightly bent. Breathe out. Your elbow leads." },
        { titel: "Lower", text: "Lower your arm slowly until your hand is in front of your thigh and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Die Schulter zieht zum Ohr hoch, und der Trapezmuskel übernimmt.", en: "Your shoulder shrugs up toward your ear and your traps take over." }
  },
  "dual-cable-lateral-raise": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell beide Rollen ganz nach unten und häng je einen Griff ein. Stell dich mittig dazwischen. Greif mit der rechten Hand das linke Kabel und mit der linken das rechte. Die Hände sind vor den Oberschenkeln gekreuzt." },
        { titel: "Heben", text: "Heb beide Arme mit leicht gebeugten Ellbogen zur Seite bis auf Schulterhöhe. Atme dabei aus." },
        { titel: "Senken", text: "Lass die Arme langsam ab, bis die Hände sich vor dem Körper wieder kreuzen, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Set both pulleys all the way down and attach a handle to each. Stand centered between them. Grip the left cable with your right hand and the right cable with your left. Your hands are crossed in front of your thighs." },
        { titel: "Raise", text: "Lift both arms out to the sides to shoulder height with your elbows slightly bent. Breathe out." },
        { titel: "Lower", text: "Lower your arms slowly until your hands cross in front of your body again and breathe in." }
      ]
    },
    fehler: { de: "Du lehnst dich zurück und schwingst die Arme hoch.", en: "You lean back and swing your arms up." }
  },
  "behind-the-back-cable-lateral-raise": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle ganz nach unten und häng einen einzelnen Griff ein. Stell dich seitlich zur Rolle und greif den Griff hinter dem Rücken mit der Hand, die weiter weg ist. Die freie Hand hält sich am Gerät." },
        { titel: "Heben", text: "Heb den Arm mit leicht gebeugtem Ellbogen zur Seite bis auf Schulterhöhe. Atme dabei aus." },
        { titel: "Senken", text: "Lass den Arm langsam ab, bis die Hand hinter der Hüfte ist, und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley all the way down and attach a single handle. Stand sideways to the pulley and grip the handle behind your back with the hand that is further away. Your free hand holds on to the machine." },
        { titel: "Raise", text: "Lift your arm out to the side to shoulder height with your elbow slightly bent. Breathe out." },
        { titel: "Lower", text: "Lower your arm slowly until your hand is behind your hip and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du beugst dich nach vorn, damit das Kabel am Gesäß vorbeikommt. Geh lieber einen halben Schritt nach vorn.", en: "You bend forward so the cable clears your glutes. Take half a step forward instead." }
  },
  "leaning-cable-lateral-raise": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle ganz nach unten und häng einen einzelnen Griff ein. Stell dich seitlich dicht an das Gerät und halt dich mit der näheren Hand am Pfosten fest. Greif den Griff mit der anderen Hand und lehn dich mit geradem Körper zur Seite weg." },
        { titel: "Heben", text: "Heb den Arm mit leicht gebeugtem Ellbogen zur Seite, bis er etwa waagerecht ist. Atme dabei aus." },
        { titel: "Senken", text: "Lass den Arm langsam ab und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley all the way down and attach a single handle. Stand sideways close to the machine and hold on to the upright with your near hand. Grip the handle with your other hand and lean away to the side with your body straight." },
        { titel: "Raise", text: "Lift your arm out to the side with your elbow slightly bent until it is about horizontal. Breathe out." },
        { titel: "Lower", text: "Lower your arm slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du knickst in der Hüfte zur Seite ab, statt dich mit geradem Körper zu lehnen.", en: "You bend sideways at the hips instead of leaning with a straight body." },
    sicherheit: { de: "Die Füße müssen rutschfest stehen, und die Hand am Pfosten hält sicher.", en: "Your feet must not be able to slip, and your hand on the upright holds securely." }
  },
  "single-arm-cable-cuffed-lateral-raise": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle ganz nach unten und leg die Manschette knapp über dem Handgelenk an. Stell dich seitlich zur Rolle, der Arm mit der Manschette ist weiter weg. Das Kabel läuft vor dem Körper." },
        { titel: "Heben", text: "Heb den Arm mit leicht gebeugtem Ellbogen zur Seite bis auf Schulterhöhe. Atme dabei aus. Die Hand bleibt offen und locker." },
        { titel: "Senken", text: "Lass den Arm langsam ab und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley all the way down and fasten the cuff just above your wrist. Stand sideways to the pulley with the cuffed arm further away. The cable runs in front of your body." },
        { titel: "Raise", text: "Lift your arm out to the side to shoulder height with your elbow slightly bent. Breathe out. Your hand stays open and relaxed." },
        { titel: "Lower", text: "Lower your arm slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du ballst die Faust und ziehst aus dem Unterarm.", en: "You make a fist and pull from your forearm." },
    tipp: { de: "Nimm etwas weniger Gewicht als mit Griff, bis sich die Manschette gewohnt anfühlt.", en: "Use a little less weight than with a handle until the cuff feels familiar." }
  },
  "seated-machine-lateral-raise": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Steck den Stift. Stell den Sitz so ein, dass die Schultern auf Höhe der Drehachsen sind. Leg die Arme von innen an die Polster und greif die Griffe. Brust oder Rücken liegt am Polster." },
        { titel: "Heben", text: "Drück die Arme zur Seite nach oben, bis die Ellbogen auf Schulterhöhe sind. Atme dabei aus." },
        { titel: "Senken", text: "Lass die Arme langsam zurück und atme ein. Die Gewichtsplatten setzen nicht auf." }
      ],
      en: [
        { titel: "Set up", text: "Set the pin. Adjust the seat so your shoulders are level with the pivot points. Place your arms against the pads from the inside and grip the handles. Your chest or back rests against the pad." },
        { titel: "Raise", text: "Push your arms out and up until your elbows are at shoulder height. Breathe out." },
        { titel: "Lower", text: "Let your arms return slowly and breathe in. The weight plates do not touch down." }
      ]
    },
    fehler: { de: "Du drückst mit den Händen an den Griffen. Die Kraft kommt über die Ellbogen ans Polster.", en: "You push with your hands on the handles. The force goes through your elbows into the pads." }
  },
  "cable-upright-row": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle ganz nach unten und häng eine gerade Stange oder das Seil ein. Greif im Obergriff etwa schulterbreit und stell dich dicht vor die Rolle. Die Arme hängen gestreckt." },
        { titel: "Hochziehen", text: "Zieh die Ellbogen nach oben außen, bis sie etwa auf Schulterhöhe sind. Atme dabei aus. Die Hände bleiben nah am Körper." },
        { titel: "Absenken", text: "Lass die Arme langsam ab und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley all the way down and attach a straight bar or the rope. Grip overhand at about shoulder width and stand close to the pulley. Your arms hang straight." },
        { titel: "Pull up", text: "Pull your elbows up and out until they are at about shoulder height. Breathe out. Your hands stay close to your body." },
        { titel: "Lower", text: "Lower your arms slowly and breathe in." }
      ]
    },
    fehler: { de: "Du lehnst dich zurück und ziehst das Gewicht mit dem Oberkörper hoch.", en: "You lean back and heave the weight up with your torso." },
    sicherheit: { de: "Zieh die Ellbogen nicht über Schulterhöhe. Wenn es in der Schulter zwickt, greif breiter oder lass die Übung weg.", en: "Do not pull your elbows above shoulder height. If you feel a pinch in your shoulder, take a wider grip or skip the exercise." }
  },
  "smith-machine-upright-row": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng die Stange etwa auf Höhe der Oberschenkelmitte ein. Stell dich dicht davor, greif sie im Obergriff etwas breiter als schulterbreit und dreh sie aus den Haken." },
        { titel: "Hochziehen", text: "Zieh die Ellbogen nach oben außen, bis sie etwa auf Schulterhöhe sind. Atme dabei aus." },
        { titel: "Absenken", text: "Lass die Stange langsam ab und atme ein. Am Ende drehst du sie zurück in die Haken." }
      ],
      en: [
        { titel: "Setup", text: "Set the bar at about mid-thigh height. Stand close to it, grip it overhand slightly wider than shoulder width and rotate it out of the hooks." },
        { titel: "Pull up", text: "Pull your elbows up and out until they are at about shoulder height. Breathe out." },
        { titel: "Lower", text: "Lower the bar slowly and breathe in. At the end, rotate it back into the hooks." }
      ]
    },
    fehler: { de: "Du greifst zu eng. Dann drehen die Schultern stark nach innen.", en: "Your grip is too narrow. Then your shoulders rotate inward a lot." },
    sicherheit: { de: "Zieh die Ellbogen nicht über Schulterhöhe.", en: "Do not pull your elbows above shoulder height." }
  },
  "seated-dumbbell-lateral-raise": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz dich aufrecht auf das Ende einer Bank, die Füße stehen fest. Die Hanteln hängen seitlich neben der Bank, die Ellbogen sind leicht gebeugt." },
        { titel: "Heben", text: "Heb die Arme seitlich bis auf Schulterhöhe und atme aus. Der Ellbogen führt." },
        { titel: "Senken", text: "Lass die Hanteln langsam ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Sit upright on the end of a bench with your feet planted. The dumbbells hang at your sides next to the bench and your elbows are slightly bent." },
        { titel: "Raise", text: "Lift your arms out to the sides to shoulder height and breathe out. Your elbows lead." },
        { titel: "Lower", text: "Lower the dumbbells slowly and breathe in." }
      ]
    },
    fehler: { de: "Du lehnst dich bei jeder Wiederholung zurück.", en: "You lean back on every rep." }
  },
  "leaning-dumbbell-lateral-raise": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Halt dich mit einer Hand an einem Pfosten oder Rack fest und stell die Füße dicht daneben. Lehn dich mit geradem Körper zur Seite weg. Die Hantel hängt in der freien Hand senkrecht nach unten." },
        { titel: "Heben", text: "Heb den Arm mit leicht gebeugtem Ellbogen zur Seite, bis er etwa waagerecht ist. Atme dabei aus." },
        { titel: "Senken", text: "Lass die Hantel langsam ab und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Hold on to an upright or a rack with one hand and place your feet close to it. Lean away to the side with your body straight. The dumbbell hangs straight down in your free hand." },
        { titel: "Raise", text: "Lift your arm out to the side with your elbow slightly bent until it is about horizontal. Breathe out." },
        { titel: "Lower", text: "Lower the dumbbell slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du schwingst die Hantel hoch, weil sie zu schwer ist.", en: "You swing the dumbbell up because it is too heavy." },
    sicherheit: { de: "Die Füße müssen rutschfest stehen, und die Hand am Pfosten hält sicher.", en: "Your feet must not be able to slip, and your hand on the upright holds securely." }
  }
});
