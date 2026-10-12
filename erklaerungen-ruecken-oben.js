// Die Erklärungen der Muskelgruppe Oberer Rücken. Sie kommen zu den Einträgen aus der erklaerungen.js dazu,
// deshalb muss diese Datei in der index.html nach der erklaerungen.js stehen. Aufbau wie dort:
// Schlüssel ist die Übungs-ID, pro Übung schritte (2 bis 3) und optional fehler, sicherheit, tipp, alle in de und en.
// Die Datei hat in der index.html und in der sw.js kein ?v=N: Der Service Worker holt sie bei jeder neuen VERSION frisch.
Object.assign(ERKLAERUNGEN, {
  "chest-supported-overhand-grip-t-bar-row": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Leg die Scheiben auf. Stell dich auf die Fußplatte und leg die Brust so auf das Polster, dass seine Oberkante unter dem Schlüsselbein sitzt. Greif die waagerechten Griffe von oben." },
        { titel: "Rudern", text: "Heb das Gewicht aus der Ablage und zieh die Griffe zur Brust. Atme dabei aus. Die Ellbogen gehen schräg nach außen, die Schulterblätter ziehen zusammen." },
        { titel: "Absenken", text: "Lass das Gewicht langsam ab, bis die Arme gestreckt sind, und atme ein. Die Brust bleibt am Polster." }
      ],
      en: [
        { titel: "Set up", text: "Load the plates. Step onto the footplate and rest your chest on the pad so its top edge sits below your collarbone. Grip the horizontal handles from above." },
        { titel: "Row", text: "Lift the weight off the rest and pull the handles to your chest. Breathe out. Your elbows travel diagonally out and your shoulder blades squeeze together." },
        { titel: "Lower", text: "Lower the weight slowly until your arms are straight and breathe in. Your chest stays on the pad." }
      ]
    },
    fehler: { de: "Die Brust löst sich vom Polster, und du holst Schwung aus dem unteren Rücken.", en: "Your chest comes off the pad and you use momentum from your lower back." }
  },
  "chest-supported-neutral-grip-t-bar-row": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Leg die Scheiben auf, stell dich auf die Fußplatte und leg die Brust auf das Polster. Greif die Griffe, die nach vorn zeigen. Die Handflächen zeigen zueinander." },
        { titel: "Rudern", text: "Heb das Gewicht aus der Ablage und zieh die Ellbogen eng am Körper nach hinten. Atme dabei aus." },
        { titel: "Absenken", text: "Lass das Gewicht langsam ab, bis die Arme gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Load the plates, step onto the footplate and rest your chest on the pad. Grip the handles that point forward. Your palms face each other." },
        { titel: "Row", text: "Lift the weight off the rest and pull your elbows back, close to your body. Breathe out." },
        { titel: "Lower", text: "Lower the weight slowly until your arms are straight and breathe in." }
      ]
    },
    fehler: { de: "Die Schultern ziehen zu den Ohren hoch.", en: "Your shoulders shrug up toward your ears." }
  },
  "chest-supported-semi-neutral-grip-t-bar-row": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Leg die Scheiben auf, stell dich auf die Fußplatte und leg die Brust auf das Polster. Greif die schrägen Griffe." },
        { titel: "Rudern", text: "Heb das Gewicht aus der Ablage und zieh die Griffe zum unteren Brustkorb. Atme dabei aus. Die Ellbogen gehen schräg nach hinten." },
        { titel: "Absenken", text: "Lass das Gewicht langsam ab, bis die Arme gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Load the plates, step onto the footplate and rest your chest on the pad. Grip the angled handles." },
        { titel: "Row", text: "Lift the weight off the rest and pull the handles to your lower rib cage. Breathe out. Your elbows travel diagonally back." },
        { titel: "Lower", text: "Lower the weight slowly until your arms are straight and breathe in." }
      ]
    },
    fehler: { de: "Du ziehst nur mit den Armen, und die Schulterblätter bewegen sich nicht.", en: "You pull only with your arms and your shoulder blades do not move." }
  },
  "chest-supported-wide-grip-t-bar-row": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Leg die Scheiben auf, stell dich auf die Fußplatte und leg die Brust auf das Polster. Greif die äußeren Griffe von oben, deutlich breiter als schulterbreit." },
        { titel: "Rudern", text: "Heb das Gewicht aus der Ablage und zieh die Ellbogen nach außen oben, bis die Hände neben der Brust sind. Atme dabei aus." },
        { titel: "Absenken", text: "Lass das Gewicht langsam ab, bis die Arme gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Load the plates, step onto the footplate and rest your chest on the pad. Grip the outer handles from above, clearly wider than shoulder width." },
        { titel: "Row", text: "Lift the weight off the rest and pull your elbows up and out until your hands are beside your chest. Breathe out." },
        { titel: "Lower", text: "Lower the weight slowly until your arms are straight and breathe in." }
      ]
    },
    fehler: { de: "Der Kopf geht in den Nacken. Der Blick bleibt nach unten.", en: "Your head tips back. Keep looking down." },
    tipp: { de: "Nimm weniger Gewicht als mit engem Griff.", en: "Use less weight than with a close grip." }
  },
  "t-bar-rudern": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Steck ein Ende der Stange in die Halterung oder in eine Ecke und belade das andere. Stell dich über die Stange und häng einen engen Griff darunter. Beug dich aus der Hüfte vor, der Rücken ist gerade, die Knie sind leicht gebeugt." },
        { titel: "Rudern", text: "Zieh die Stange zum Bauch und atme aus. Die Ellbogen bleiben eng, die Schulterblätter ziehen zusammen." },
        { titel: "Absenken", text: "Lass die Stange ab, bis die Arme gestreckt sind, und atme ein. Die Scheiben setzen nicht auf." }
      ],
      en: [
        { titel: "Set up", text: "Put one end of the bar into the attachment or into a corner and load the other. Stand over the bar and hook a close-grip handle under it. Hinge forward at the hips, back straight, knees slightly bent." },
        { titel: "Row", text: "Pull the bar to your belly and breathe out. Your elbows stay close and your shoulder blades squeeze together." },
        { titel: "Lower", text: "Lower the bar until your arms are straight and breathe in. The plates do not touch down." }
      ]
    },
    fehler: { de: "Du richtest dich bei jedem Zug auf.", en: "You straighten up with every pull." },
    sicherheit: { de: "Der Rücken bleibt gerade. Wird er rund, ist das Gewicht zu schwer.", en: "Your back stays straight. If it rounds, the weight is too heavy." }
  },
  "bent-over-neutral-grip-t-bar-row": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg die Scheiben auf und stell dich auf die Fußplatte. Beug dich mit geradem Rücken aus der Hüfte vor, etwa 45°, die Knie sind leicht gebeugt. Greif die Griffe, bei denen die Handflächen zueinander zeigen." },
        { titel: "Rudern", text: "Heb das Gewicht an und zieh die Ellbogen eng am Körper nach hinten. Atme dabei aus." },
        { titel: "Absenken", text: "Lass das Gewicht langsam ab, bis die Arme gestreckt sind, und atme ein. Der Oberkörper bleibt, wo er ist." }
      ],
      en: [
        { titel: "Setup", text: "Load the plates and step onto the footplate. Hinge forward at the hips with a straight back, about 45°, knees slightly bent. Grip the handles that have your palms facing each other." },
        { titel: "Row", text: "Lift the weight and pull your elbows back, close to your body. Breathe out." },
        { titel: "Lower", text: "Lower the weight slowly until your arms are straight and breathe in. Your torso stays where it is." }
      ]
    },
    fehler: { de: "Du richtest dich bei jedem Zug auf und holst Schwung.", en: "You straighten up with every pull and use momentum." },
    sicherheit: { de: "Der Rücken bleibt gerade. Wird er rund, ist das Gewicht zu schwer.", en: "Your back stays straight. If it rounds, the weight is too heavy." }
  },
  "bent-over-underhand-grip-t-bar-row": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell dich auf die Fußplatte und beug dich mit geradem Rücken vor, etwa 45°. Greif die waagerechten Griffe von unten, etwa schulterbreit." },
        { titel: "Rudern", text: "Heb das Gewicht an und zieh die Griffe zum Bauch. Atme dabei aus. Die Ellbogen streifen den Körper." },
        { titel: "Absenken", text: "Lass das Gewicht langsam ab, bis die Arme gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Step onto the footplate and hinge forward with a straight back, about 45°. Grip the horizontal handles from below at about shoulder width." },
        { titel: "Row", text: "Lift the weight and pull the handles to your belly. Breathe out. Your elbows brush your body." },
        { titel: "Lower", text: "Lower the weight slowly until your arms are straight and breathe in." }
      ]
    },
    fehler: { de: "Du reißt das Gewicht mit den Armen an.", en: "You jerk the weight up with your arms." },
    sicherheit: { de: "Halt den Rücken gerade. Im Untergriff liegt viel Last auf dem Bizeps, steigere das Gewicht langsam.", en: "Keep your back straight. The underhand grip puts a lot of load on the biceps, so increase the weight slowly." }
  },
  "bent-over-semi-neutral-grip-t-bar-row": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell dich auf die Fußplatte und beug dich mit geradem Rücken vor, etwa 45°. Greif die schrägen Griffe." },
        { titel: "Rudern", text: "Heb das Gewicht an und zieh die Griffe zum unteren Brustkorb. Atme dabei aus. Die Schulterblätter ziehen zusammen." },
        { titel: "Absenken", text: "Lass das Gewicht langsam ab, bis die Arme gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Step onto the footplate and hinge forward with a straight back, about 45°. Grip the angled handles." },
        { titel: "Row", text: "Lift the weight and pull the handles to your lower rib cage. Breathe out. Your shoulder blades squeeze together." },
        { titel: "Lower", text: "Lower the weight slowly until your arms are straight and breathe in." }
      ]
    },
    fehler: { de: "Der Oberkörper wippt bei jeder Wiederholung mit.", en: "Your torso bobs up and down with every rep." },
    sicherheit: { de: "Der Rücken bleibt gerade. Wird er rund, ist das Gewicht zu schwer.", en: "Your back stays straight. If it rounds, the weight is too heavy." }
  },
  "bent-over-wide-grip-t-bar-row": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell dich auf die Fußplatte und beug dich mit geradem Rücken vor, etwa 45°. Greif die äußeren Griffe von oben, deutlich breiter als schulterbreit." },
        { titel: "Rudern", text: "Heb das Gewicht an und zieh die Ellbogen nach außen oben, bis die Griffe an der Brust sind. Atme dabei aus." },
        { titel: "Absenken", text: "Lass das Gewicht langsam ab, bis die Arme gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Step onto the footplate and hinge forward with a straight back, about 45°. Grip the outer handles from above, clearly wider than shoulder width." },
        { titel: "Row", text: "Lift the weight and pull your elbows up and out until the handles are at your chest. Breathe out." },
        { titel: "Lower", text: "Lower the weight slowly until your arms are straight and breathe in." }
      ]
    },
    fehler: { de: "Du richtest dich auf, damit die Griffe die Brust erreichen.", en: "You straighten up so the handles reach your chest." },
    sicherheit: { de: "Der Rücken bleibt gerade. Nimm weniger Gewicht als mit engem Griff.", en: "Your back stays straight. Use less weight than with a close grip." }
  },
  "wide-grip-cable-row": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng eine breite Stange ein. Setz dich, die Füße stehen auf der Fußplatte, die Knie sind leicht gebeugt. Greif die Stange von oben, deutlich breiter als schulterbreit. Der Oberkörper ist aufrecht." },
        { titel: "Rudern", text: "Zieh die Stange zum unteren Brustkorb und atme aus. Die Ellbogen gehen nach außen hinten, die Schulterblätter ziehen zusammen." },
        { titel: "Zurück", text: "Lass die Arme langsam nach vorn, bis sie gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Attach a wide bar. Sit down with your feet on the footplate and your knees slightly bent. Grip the bar from above, clearly wider than shoulder width. Your torso is upright." },
        { titel: "Row", text: "Pull the bar to your lower rib cage and breathe out. Your elbows travel out and back and your shoulder blades squeeze together." },
        { titel: "Return", text: "Let your arms move forward slowly until they are straight and breathe in." }
      ]
    },
    fehler: { de: "Du lehnst dich bei jedem Zug weit zurück.", en: "You lean far back with every pull." }
  },
  "neutral-wide-grip-cable-row": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng den breiten Griff mit den parallelen Griffstücken ein. Setz dich, die Füße stehen auf der Fußplatte. Greif so, dass die Handflächen zueinander zeigen." },
        { titel: "Rudern", text: "Zieh den Griff zum oberen Bauch und atme aus. Die Ellbogen gehen schräg nach hinten, die Schulterblätter ziehen zusammen." },
        { titel: "Zurück", text: "Lass die Arme langsam nach vorn, bis du eine Dehnung zwischen den Schulterblättern spürst, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Attach the wide handle with the parallel grips. Sit down with your feet on the footplate. Grip so your palms face each other." },
        { titel: "Row", text: "Pull the handle to your upper belly and breathe out. Your elbows travel diagonally back and your shoulder blades squeeze together." },
        { titel: "Return", text: "Let your arms move forward slowly until you feel a stretch between your shoulder blades and breathe in." }
      ]
    },
    fehler: { de: "Die Schultern rollen am Ende des Zugs nach vorn.", en: "Your shoulders roll forward at the end of the pull." }
  },
  "underhand-grip-cable-row": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng eine gerade Stange ein und setz dich. Greif sie von unten etwa schulterbreit. Der Oberkörper ist aufrecht, die Knie sind leicht gebeugt." },
        { titel: "Rudern", text: "Zieh die Stange zum Bauch und atme aus. Die Ellbogen streifen den Körper." },
        { titel: "Zurück", text: "Lass die Arme langsam nach vorn, bis sie gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Attach a straight bar and sit down. Grip it from below at about shoulder width. Your torso is upright and your knees are slightly bent." },
        { titel: "Row", text: "Pull the bar to your belly and breathe out. Your elbows brush your body." },
        { titel: "Return", text: "Let your arms move forward slowly until they are straight and breathe in." }
      ]
    },
    fehler: { de: "Die Handgelenke knicken ein, und du ziehst mit den Unterarmen.", en: "Your wrists bend and you pull with your forearms." }
  },
  "standing-single-arm-cable-row": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle etwa auf Bauchhöhe und häng einen einzelnen Griff ein. Greif ihn und geh zwei Schritte zurück. Stell dich in eine leichte Schrittstellung, das Bein der ziehenden Seite ist hinten." },
        { titel: "Rudern", text: "Zieh den Ellbogen eng am Körper nach hinten, bis die Hand an den Rippen ist. Atme dabei aus. Die Schultern bleiben gerade nach vorn gerichtet." },
        { titel: "Zurück", text: "Lass den Arm langsam nach vorn und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley to about belly height and attach a single handle. Grip it and take two steps back. Stand in a slight staggered stance with the leg on the pulling side behind." },
        { titel: "Row", text: "Pull your elbow back, close to your body, until your hand is at your ribs. Breathe out. Your shoulders stay square to the front." },
        { titel: "Return", text: "Let your arm move forward slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du drehst den Oberkörper mit dem Zug nach hinten auf.", en: "You rotate your torso open with the pull." }
  },
  "seated-single-arm-cable-row": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng einen einzelnen Griff ein und setz dich, die Füße stehen auf der Fußplatte. Greif den Griff mit einer Hand, die andere liegt auf dem Oberschenkel." },
        { titel: "Rudern", text: "Zieh den Ellbogen eng am Körper nach hinten und atme aus. Das Schulterblatt zieht zur Wirbelsäule." },
        { titel: "Zurück", text: "Lass den Arm langsam nach vorn, bis die Schulter leicht mit nach vorn geht, und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Attach a single handle and sit down with your feet on the footplate. Grip the handle with one hand, the other rests on your thigh." },
        { titel: "Row", text: "Pull your elbow back, close to your body, and breathe out. Your shoulder blade pulls toward your spine." },
        { titel: "Return", text: "Let your arm move forward slowly until your shoulder moves forward slightly with it, and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Der Oberkörper dreht sich weit mit. Eine kleine Drehung ist in Ordnung.", en: "Your torso rotates a long way with the pull. A small rotation is fine." }
  },
  "cable-rope-high-row": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle über Kopfhöhe und häng das Seil ein. Greif beide Enden und geh zwei Schritte zurück oder knie dich hin. Die Arme zeigen gestreckt schräg nach oben." },
        { titel: "Rudern", text: "Zieh das Seil zur oberen Brust und atme aus. Die Ellbogen gehen nach außen hinten, die Seilenden gehen auseinander." },
        { titel: "Zurück", text: "Lass die Arme langsam wieder lang werden und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley above head height and attach the rope. Grip both ends and take two steps back or kneel down. Your arms point straight and diagonally up." },
        { titel: "Row", text: "Pull the rope to your upper chest and breathe out. Your elbows travel out and back and the rope ends move apart." },
        { titel: "Return", text: "Let your arms lengthen slowly again and breathe in." }
      ]
    },
    fehler: { de: "Du lehnst dich weit zurück, und es wird ein Latzug.", en: "You lean far back and it becomes a lat pulldown." }
  },
  "pin-loaded-row-machine": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Steck den Stift. Stell den Sitz so ein, dass die Griffe etwa auf Höhe der unteren Brust sind. Stell das Brustpolster so ein, dass du die Griffe mit gestreckten Armen gerade erreichst." },
        { titel: "Rudern", text: "Zieh die Griffe nach hinten, bis die Hände neben dem Brustkorb sind, und atme aus. Die Schulterblätter ziehen zusammen, die Brust bleibt am Polster." },
        { titel: "Zurück", text: "Lass die Griffe langsam nach vorn und atme ein. Die Gewichtsplatten setzen nicht auf." }
      ],
      en: [
        { titel: "Set up", text: "Set the pin. Adjust the seat so the handles are at about lower chest height. Adjust the chest pad so you can just reach the handles with your arms straight." },
        { titel: "Row", text: "Pull the handles back until your hands are beside your rib cage and breathe out. Your shoulder blades squeeze together and your chest stays on the pad." },
        { titel: "Return", text: "Let the handles move forward slowly and breathe in. The weight plates do not touch down." }
      ]
    },
    fehler: { de: "Die Brust löst sich vom Polster, und du lehnst dich zurück.", en: "Your chest comes off the pad and you lean back." }
  },
  "neutral-grip-machine-row": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Stell Sitz und Brustpolster ein und wähl das Gewicht. Greif die senkrechten Griffe, die Handflächen zeigen zueinander." },
        { titel: "Rudern", text: "Zieh die Ellbogen eng am Körper nach hinten und atme aus." },
        { titel: "Zurück", text: "Lass die Griffe langsam nach vorn, bis die Arme gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Adjust the seat and chest pad and select the weight. Grip the vertical handles, palms facing each other." },
        { titel: "Row", text: "Pull your elbows back, close to your body, and breathe out." },
        { titel: "Return", text: "Let the handles move forward slowly until your arms are straight and breathe in." }
      ]
    },
    fehler: { de: "Die Schultern ziehen hoch, und der Nacken verspannt sich.", en: "Your shoulders shrug up and your neck tenses." }
  },
  "neutral-grip-plate-loaded-machine-row": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Leg auf beide Seiten gleich viel Gewicht. Stell den Sitz so ein, dass die Brust fest am Polster liegt und du die Griffe mit gestreckten Armen erreichst. Greif die senkrechten Griffe." },
        { titel: "Rudern", text: "Zieh beide Ellbogen eng am Körper nach hinten und atme aus. Beide Seiten laufen gleich schnell." },
        { titel: "Zurück", text: "Lass die Griffe langsam nach vorn und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Load the same weight on both sides. Adjust the seat so your chest rests firmly on the pad and you can reach the handles with your arms straight. Grip the vertical handles." },
        { titel: "Row", text: "Pull both elbows back, close to your body, and breathe out. Both sides move at the same speed." },
        { titel: "Return", text: "Let the handles move forward slowly and breathe in." }
      ]
    },
    fehler: { de: "Ein Arm zieht schneller oder weiter als der andere.", en: "One arm pulls faster or further than the other." }
  },
  "wide-grip-plate-loaded-machine-row": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Leg auf beide Seiten gleich viel Gewicht und stell den Sitz ein. Greif die breiten Griffe von oben." },
        { titel: "Rudern", text: "Zieh die Ellbogen nach außen hinten, bis die Hände neben der Brust sind. Atme dabei aus. Die Schulterblätter ziehen zusammen." },
        { titel: "Zurück", text: "Lass die Griffe langsam nach vorn, bis die Arme gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Load the same weight on both sides and adjust the seat. Grip the wide handles from above." },
        { titel: "Row", text: "Pull your elbows out and back until your hands are beside your chest. Breathe out. Your shoulder blades squeeze together." },
        { titel: "Return", text: "Let the handles move forward slowly until your arms are straight and breathe in." }
      ]
    },
    fehler: { de: "Die Ellbogen sinken zum Körper ab. Dann ist es der enge Griff.", en: "Your elbows drop toward your body. Then it is the close grip." }
  },
  "smith-machine-row": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng die Stange etwa auf Kniehöhe ein. Stell dich hüftbreit dicht an die Stange und beug dich mit geradem Rücken vor. Greif sie im Obergriff etwas breiter als schulterbreit und dreh sie aus den Haken." },
        { titel: "Rudern", text: "Zieh die Stange zum Bauch und atme aus. Die Ellbogen gehen nach hinten." },
        { titel: "Absenken", text: "Lass die Stange langsam ab, bis die Arme gestreckt sind, und atme ein. Am Ende drehst du sie zurück in die Haken." }
      ],
      en: [
        { titel: "Setup", text: "Set the bar at about knee height. Stand hip width apart close to the bar and hinge forward with a straight back. Grip it overhand, a little wider than shoulder width, and rotate it out of the hooks." },
        { titel: "Row", text: "Pull the bar to your belly and breathe out. Your elbows travel back." },
        { titel: "Lower", text: "Lower the bar slowly until your arms are straight and breathe in. At the end, rotate it back into the hooks." }
      ]
    },
    fehler: { de: "Du stehst zu weit hinter der Stange. Dann kommt sie an der Brust an statt am Bauch.", en: "You stand too far behind the bar. Then it meets your chest instead of your belly." },
    sicherheit: { de: "Der Rücken bleibt gerade. Wird er rund, ist das Gewicht zu schwer.", en: "Your back stays straight. If it rounds, the weight is too heavy." }
  },
  "smith-machine-deficit-row": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell einen Stepper oder eine flache Kiste unter die Stange und stell dich darauf. Beug dich mit geradem Rücken vor, greif die Stange im Obergriff und dreh sie aus den Haken." },
        { titel: "Rudern", text: "Zieh die Stange zum Bauch und atme aus." },
        { titel: "Absenken", text: "Lass die Stange tiefer ab als sonst, bis die Arme ganz lang sind und die Schulterblätter auseinandergehen. Atme dabei ein. Der Rücken bleibt gerade." }
      ],
      en: [
        { titel: "Setup", text: "Place a stepper or a low box under the bar and stand on it. Hinge forward with a straight back, grip the bar overhand and rotate it out of the hooks." },
        { titel: "Row", text: "Pull the bar to your belly and breathe out." },
        { titel: "Lower", text: "Lower the bar deeper than usual, until your arms are fully long and your shoulder blades move apart. Breathe in. Your back stays straight." }
      ]
    },
    fehler: { de: "Der Rücken rundet sich unten, um noch tiefer zu kommen.", en: "Your back rounds at the bottom to get even deeper." },
    sicherheit: { de: "Die Erhöhung muss fest und rutschfest stehen.", en: "The platform must stand firmly and must not slip." }
  },
  "smith-machine-pendlay-row": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Stopper so tief, dass die Stange etwa auf Höhe der Schienbeinmitte aufliegt. Stell dich dicht an die Stange und beug dich vor, bis der Oberkörper etwa waagerecht ist. Greif im Obergriff etwas breiter als schulterbreit." },
        { titel: "Rudern", text: "Spann den Rumpf an und zieh die Stange zügig zum unteren Brustkorb. Atme dabei aus." },
        { titel: "Ablegen", text: "Senk die Stange kontrolliert zurück auf die Stopper und lass sie kurz ganz liegen. Atme ein und spann neu an." }
      ],
      en: [
        { titel: "Set up", text: "Set the safety stops low enough that the bar rests at about mid-shin height. Stand close to the bar and hinge forward until your torso is about horizontal. Grip overhand, a little wider than shoulder width." },
        { titel: "Row", text: "Brace your core and pull the bar briskly to your lower rib cage. Breathe out." },
        { titel: "Set down", text: "Lower the bar under control back onto the stops and let it rest there completely for a moment. Breathe in and brace again." }
      ]
    },
    fehler: { de: "Du richtest den Oberkörper bei jedem Zug auf.", en: "You raise your torso with every pull." },
    sicherheit: { de: "Der Rücken bleibt die ganze Zeit gerade.", en: "Your back stays straight the whole time." }
  },
  "wide-grip-barbell-row": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Greif die Stange im Obergriff deutlich breiter als schulterbreit und heb sie mit geradem Rücken an. Beug dich aus der Hüfte vor, 45° bis fast waagerecht, die Knie sind leicht gebeugt." },
        { titel: "Rudern", text: "Zieh die Stange zum unteren Brustkorb und atme aus. Die Ellbogen gehen nach außen oben, die Schulterblätter ziehen zusammen." },
        { titel: "Absenken", text: "Lass die Stange langsam ab, bis die Arme gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Grip the bar overhand, clearly wider than shoulder width, and lift it with a straight back. Hinge forward at the hips, 45° to almost horizontal, knees slightly bent." },
        { titel: "Row", text: "Pull the bar to your lower rib cage and breathe out. Your elbows travel up and out and your shoulder blades squeeze together." },
        { titel: "Lower", text: "Lower the bar slowly until your arms are straight and breathe in." }
      ]
    },
    fehler: { de: "Du richtest dich auf, damit die Stange die Brust erreicht.", en: "You straighten up so the bar reaches your chest." },
    sicherheit: { de: "Der Rücken bleibt gerade. Nimm weniger Gewicht als beim normalen Langhantelrudern.", en: "Your back stays straight. Use less weight than for the regular barbell row." }
  },
  "dumbbell-rear-delt-row": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Nimm in jede Hand eine Hantel. Beug dich mit geradem Rücken vor, bis der Oberkörper fast waagerecht ist. Die Arme hängen, die Handrücken zeigen nach vorn." },
        { titel: "Rudern", text: "Zieh die Ellbogen seitlich nach oben, bis die Oberarme auf Schulterhöhe sind. Atme dabei aus. Die Hanteln sind dann neben der Brust." },
        { titel: "Absenken", text: "Lass die Hanteln langsam ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Take a dumbbell in each hand. Hinge forward with a straight back until your torso is almost horizontal. Your arms hang down, the backs of your hands facing forward." },
        { titel: "Row", text: "Pull your elbows up and out to the sides until your upper arms are at shoulder height. Breathe out. The dumbbells are then beside your chest." },
        { titel: "Lower", text: "Lower the dumbbells slowly and breathe in." }
      ]
    },
    fehler: { de: "Die Ellbogen sinken zum Körper. Dann übernimmt der Latissimus.", en: "Your elbows drop toward your body. Then the lats take over." },
    tipp: { de: "Nimm deutlich leichtere Hanteln als beim normalen Rudern.", en: "Use clearly lighter dumbbells than for the regular row." }
  },
  "wide-grip-inverted-row": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg eine Stange im Rack auf Hüfthöhe fest ein. Leg dich darunter und greif sie im Obergriff deutlich breiter als schulterbreit. Die Fersen stehen am Boden, der Körper bildet eine gerade Linie." },
        { titel: "Hochziehen", text: "Zieh die Brust zur Stange und atme aus. Die Ellbogen gehen nach außen, die Schulterblätter ziehen zusammen." },
        { titel: "Absenken", text: "Lass dich langsam ab, bis die Arme gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Fix a bar in the rack at hip height. Lie under it and grip it overhand, clearly wider than shoulder width. Your heels are on the floor and your body forms a straight line." },
        { titel: "Pull up", text: "Pull your chest to the bar and breathe out. Your elbows travel out and your shoulder blades squeeze together." },
        { titel: "Lower", text: "Lower yourself slowly until your arms are straight and breathe in." }
      ]
    },
    fehler: { de: "Die Hüfte hängt durch, oder das Kinn schiebt zur Stange vor.", en: "Your hips sag, or your chin pokes forward toward the bar." },
    sicherheit: { de: "Die Stange muss so liegen, dass sie beim Ziehen nicht aus den Haken rollen kann.", en: "The bar must sit so that it cannot roll out of the hooks as you pull." }
  },
  "scapular-pull-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng im Obergriff etwas breiter als schulterbreit an der Stange. Die Arme sind gestreckt, die Schultern sind locker oben bei den Ohren." },
        { titel: "Schulterblätter senken", text: "Zieh die Schulterblätter nach unten und zusammen, ohne die Ellbogen zu beugen. Der Körper hebt sich ein kleines Stück. Atme dabei aus." },
        { titel: "Zurück", text: "Lass dich langsam wieder in den lockeren Hang und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Hang from the bar overhand, a little wider than shoulder width. Your arms are straight and your shoulders are relaxed up by your ears." },
        { titel: "Lower your shoulder blades", text: "Pull your shoulder blades down and together without bending your elbows. Your body rises a little. Breathe out." },
        { titel: "Return", text: "Let yourself sink slowly back into the relaxed hang and breathe in." }
      ]
    },
    fehler: { de: "Die Ellbogen beugen sich, und es wird ein kleiner Klimmzug.", en: "Your elbows bend and it becomes a small pull-up." },
    tipp: { de: "So übst du den Anfang jedes Klimmzugs.", en: "This is how you practice the start of every pull-up." }
  },
  "scapular-push-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Geh in die Liegestützposition, die Hände unter den Schultern, die Arme gestreckt. Der Körper bildet eine gerade Linie." },
        { titel: "Zusammenziehen", text: "Lass die Brust zwischen den Schultern nach unten sinken, die Schulterblätter gehen zusammen. Die Ellbogen bleiben gestreckt. Atme dabei ein." },
        { titel: "Auseinanderschieben", text: "Drück den Boden weg, bis der obere Rücken leicht rund ist und die Schulterblätter weit auseinander sind. Atme dabei aus." }
      ],
      en: [
        { titel: "Setup", text: "Get into the push-up position, hands under your shoulders, arms straight. Your body forms a straight line." },
        { titel: "Squeeze together", text: "Let your chest sink down between your shoulders so your shoulder blades come together. Your elbows stay straight. Breathe in." },
        { titel: "Push apart", text: "Push the floor away until your upper back is slightly rounded and your shoulder blades are far apart. Breathe out." }
      ]
    },
    fehler: { de: "Die Ellbogen beugen sich, oder die Hüfte sackt durch.", en: "Your elbows bend, or your hips sag." }
  },
  "prone-y-raise": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf den Bauch, die Stirn liegt am Boden. Streck die Arme schräg nach vorn, sodass Körper und Arme ein Y bilden. Die Daumen zeigen nach oben." },
        { titel: "Heben", text: "Zieh die Schulterblätter nach unten und heb beide Arme ein paar Zentimeter vom Boden. Atme dabei aus und halt kurz." },
        { titel: "Senken", text: "Leg die Arme langsam ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Lie face down with your forehead on the floor. Stretch your arms diagonally forward so your body and arms form a Y. Your thumbs point up." },
        { titel: "Raise", text: "Pull your shoulder blades down and lift both arms a few centimeters off the floor. Breathe out and hold briefly." },
        { titel: "Lower", text: "Lower your arms slowly and breathe in." }
      ]
    },
    fehler: { de: "Du hebst den Oberkörper aus dem unteren Rücken, statt nur die Arme zu heben.", en: "You lift your torso from your lower back instead of lifting only your arms." },
    tipp: { de: "Das Gewicht der Arme reicht am Anfang.", en: "The weight of your arms is enough at first." }
  },
  "prone-t-raise": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf den Bauch, die Stirn liegt am Boden. Streck die Arme gerade zur Seite, die Daumen zeigen nach oben." },
        { titel: "Heben", text: "Zieh die Schulterblätter zusammen und heb beide Arme ein paar Zentimeter vom Boden. Atme dabei aus und halt kurz." },
        { titel: "Senken", text: "Leg die Arme langsam ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Lie face down with your forehead on the floor. Stretch your arms straight out to the sides, thumbs pointing up." },
        { titel: "Raise", text: "Squeeze your shoulder blades together and lift both arms a few centimeters off the floor. Breathe out and hold briefly." },
        { titel: "Lower", text: "Lower your arms slowly and breathe in." }
      ]
    },
    fehler: { de: "Die Schultern ziehen zu den Ohren hoch.", en: "Your shoulders shrug up toward your ears." }
  },
  "reverse-snow-angel": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf den Bauch und streck die Arme nach vorn über den Kopf. Heb Arme und Brust leicht vom Boden, der Blick geht nach unten." },
        { titel: "Bogen nach hinten", text: "Führ die gestreckten Arme in einem weiten Bogen über die Seite bis zur Hüfte. Atme dabei aus. Die Hände berühren den Boden nicht." },
        { titel: "Zurück", text: "Führ die Arme im selben Bogen wieder nach vorn und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Lie face down and stretch your arms forward above your head. Lift your arms and chest slightly off the floor, looking down." },
        { titel: "Arc back", text: "Move your straight arms in a wide arc out to the sides and down to your hips. Breathe out. Your hands do not touch the floor." },
        { titel: "Return", text: "Move your arms forward again along the same arc and breathe in." }
      ]
    },
    fehler: { de: "Die Arme sinken unterwegs auf den Boden, oder du machst die Bewegung mit Schwung.", en: "Your arms sink to the floor on the way, or you do the movement with momentum." }
  }
});
