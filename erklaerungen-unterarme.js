// Die Erklärungen der Muskelgruppe Unterarme. Sie kommen zu den Einträgen aus der erklaerungen.js dazu,
// deshalb muss diese Datei in der index.html nach der erklaerungen.js stehen. Aufbau wie dort:
// Schlüssel ist die Übungs-ID, pro Übung schritte (2 bis 3) und optional fehler, sicherheit, tipp, alle in de und en.
// Die Datei hat in der index.html und in der sw.js kein ?v=N: Der Service Worker holt sie bei jeder neuen VERSION frisch.
Object.assign(ERKLAERUNGEN, {
  "seated-cable-wrist-curl": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell eine Bank vor die untere Rolle und häng eine gerade Stange ein. Setz dich, greif die Stange im Untergriff und leg die Unterarme auf die Oberschenkel. Die Hände ragen über die Knie hinaus." },
        { titel: "Beugen", text: "Roll die Hände nach oben ein, so weit es geht, und atme aus. Die Unterarme bleiben liegen." },
        { titel: "Senken", text: "Lass die Hände langsam nach unten sinken und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Place a bench in front of the low pulley and attach a straight bar. Sit down, grip the bar underhand and rest your forearms on your thighs. Your hands extend past your knees." },
        { titel: "Curl", text: "Curl your hands up as far as you can and breathe out. Your forearms stay down." },
        { titel: "Lower", text: "Let your hands sink slowly and breathe in." }
      ]
    },
    fehler: { de: "Die Unterarme heben von den Oberschenkeln ab, und der Bizeps hilft mit.", en: "Your forearms lift off your thighs and the biceps help." }
  },
  "single-arm-cable-wrist-curl": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Häng einen einzelnen Griff an die untere Rolle und setz dich auf eine Bank davor. Greif ihn im Untergriff und leg den Unterarm auf den Oberschenkel. Die freie Hand hält den Unterarm fest." },
        { titel: "Beugen", text: "Roll die Hand nach oben ein und atme aus." },
        { titel: "Senken", text: "Lass die Hand langsam sinken und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Attach a single handle to the low pulley and sit on a bench in front of it. Grip it underhand and rest your forearm on your thigh. Your free hand holds the forearm in place." },
        { titel: "Curl", text: "Curl your hand up and breathe out." },
        { titel: "Lower", text: "Let your hand sink slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du ziehst mit dem ganzen Arm, statt nur das Handgelenk zu bewegen.", en: "You pull with your whole arm instead of moving only your wrist." }
  },
  "standing-cable-wrist-curl": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Häng eine gerade Stange an die untere Rolle. Greif sie im Untergriff, steh auf und geh einen kleinen Schritt zurück. Die Arme hängen gestreckt vor den Oberschenkeln." },
        { titel: "Beugen", text: "Roll die Hände nach oben ein, ohne die Ellbogen zu beugen, und atme aus." },
        { titel: "Senken", text: "Lass die Hände langsam sinken und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Attach a straight bar to the low pulley. Grip it underhand, stand up and take a small step back. Your arms hang straight in front of your thighs." },
        { titel: "Curl", text: "Curl your hands up without bending your elbows and breathe out." },
        { titel: "Lower", text: "Let your hands sink slowly and breathe in." }
      ]
    },
    fehler: { de: "Die Ellbogen beugen sich, und es wird ein kleiner Bizepscurl.", en: "Your elbows bend and it becomes a small biceps curl." }
  },
  "seated-cable-wrist-extension": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell eine Bank vor die untere Rolle und häng eine gerade Stange ein. Setz dich, greif die Stange im Obergriff und leg die Unterarme auf die Oberschenkel. Die Hände ragen über die Knie hinaus." },
        { titel: "Strecken", text: "Heb die Handrücken nach oben, so weit es geht, und atme aus. Die Unterarme bleiben liegen." },
        { titel: "Senken", text: "Lass die Hände langsam nach unten sinken und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Place a bench in front of the low pulley and attach a straight bar. Sit down, grip the bar overhand and rest your forearms on your thighs. Your hands extend past your knees." },
        { titel: "Extend", text: "Lift the backs of your hands as far as you can and breathe out. Your forearms stay down." },
        { titel: "Lower", text: "Let your hands sink slowly and breathe in." }
      ]
    },
    fehler: { de: "Du nimmst so viel Gewicht wie bei den Handgelenkcurls. Die Strecker sind deutlich schwächer.", en: "You use as much weight as for wrist curls. The extensors are clearly weaker." }
  },
  "standing-cable-wrist-extension": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Häng eine gerade Stange an die untere Rolle. Greif sie im Obergriff, steh auf und geh einen kleinen Schritt zurück. Die Arme hängen gestreckt vor den Oberschenkeln." },
        { titel: "Strecken", text: "Heb die Handrücken nach oben, ohne die Ellbogen zu beugen, und atme aus." },
        { titel: "Senken", text: "Lass die Hände langsam sinken und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Attach a straight bar to the low pulley. Grip it overhand, stand up and take a small step back. Your arms hang straight in front of your thighs." },
        { titel: "Extend", text: "Lift the backs of your hands without bending your elbows and breathe out." },
        { titel: "Lower", text: "Let your hands sink slowly and breathe in." }
      ]
    },
    fehler: { de: "Die Schultern ziehen hoch, und die Ellbogen beugen sich.", en: "Your shoulders shrug up and your elbows bend." }
  },
  "wrist-curl": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz dich auf eine Bank und greif die Stange im Untergriff etwa schulterbreit. Leg die Unterarme auf die Oberschenkel, die Hände ragen über die Knie hinaus." },
        { titel: "Beugen", text: "Roll die Hände nach oben ein, so weit es geht, und atme aus." },
        { titel: "Senken", text: "Lass die Stange langsam sinken, bis die Handgelenke gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Sit on a bench and grip the bar underhand at about shoulder width. Rest your forearms on your thighs with your hands extending past your knees." },
        { titel: "Curl", text: "Curl your hands up as far as you can and breathe out." },
        { titel: "Lower", text: "Let the bar sink slowly until your wrists are extended and breathe in." }
      ]
    },
    fehler: { de: "Die Unterarme heben ab, und du wippst mit dem Oberkörper.", en: "Your forearms lift off and you rock with your torso." },
    tipp: { de: "Wer mag, lässt die Stange unten bis in die Finger abrollen und greift dann wieder zu.", en: "If you like, let the bar roll down into your fingers at the bottom and then close your grip again." }
  },
  "reverse-wrist-curl": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz dich auf eine Bank und greif die Stange im Obergriff etwa schulterbreit. Leg die Unterarme auf die Oberschenkel, die Hände ragen über die Knie hinaus." },
        { titel: "Strecken", text: "Heb die Handrücken nach oben, so weit es geht, und atme aus." },
        { titel: "Senken", text: "Lass die Stange langsam sinken und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Sit on a bench and grip the bar overhand at about shoulder width. Rest your forearms on your thighs with your hands extending past your knees." },
        { titel: "Extend", text: "Lift the backs of your hands as far as you can and breathe out." },
        { titel: "Lower", text: "Let the bar sink slowly and breathe in." }
      ]
    },
    fehler: { de: "Das Gewicht ist zu schwer, und der Weg wird winzig.", en: "The weight is too heavy and the range becomes tiny." },
    tipp: { de: "Fang mit der leeren Stange oder einer leichten SZ-Stange an.", en: "Start with the empty bar or a light EZ bar." }
  },
  "dumbbell-wrist-curl": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz dich auf eine Bank mit einer Hantel in jeder Hand, die Handflächen zeigen nach oben. Leg die Unterarme auf die Oberschenkel, die Hände ragen über die Knie hinaus." },
        { titel: "Beugen", text: "Roll die Hände nach oben ein und atme aus." },
        { titel: "Senken", text: "Lass die Hanteln langsam sinken und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Sit on a bench with a dumbbell in each hand, palms facing up. Rest your forearms on your thighs with your hands extending past your knees." },
        { titel: "Curl", text: "Curl your hands up and breathe out." },
        { titel: "Lower", text: "Let the dumbbells sink slowly and breathe in." }
      ]
    },
    fehler: { de: "Eine Hand arbeitet schneller oder weiter als die andere.", en: "One hand works faster or further than the other." }
  },
  "farmers-hold": {
    schritte: {
      de: [
        { titel: "Aufnehmen", text: "Stell zwei schwere Hanteln oder Kettlebells neben die Füße. Geh mit geradem Rücken in die Knie, greif sie und steh auf." },
        { titel: "Halten", text: "Steh aufrecht, die Schultern sind hinten unten, die Arme hängen lang. Drück die Griffe fest und atme ruhig weiter." },
        { titel: "Abstellen", text: "Stell die Gewichte mit geradem Rücken ab, bevor sich die Finger öffnen." }
      ],
      en: [
        { titel: "Pick up", text: "Place two heavy dumbbells or kettlebells beside your feet. Bend your knees with a straight back, grip them and stand up." },
        { titel: "Hold", text: "Stand upright with your shoulders back and down and your arms hanging long. Squeeze the handles hard and keep breathing steadily." },
        { titel: "Set down", text: "Set the weights down with a straight back before your fingers open." }
      ]
    },
    fehler: { de: "Du hältst, bis die Gewichte aus den Händen fallen.", en: "You hold until the weights fall out of your hands." },
    sicherheit: { de: "Achte darauf, dass die Füße nicht unter den Gewichten stehen.", en: "Make sure your feet are not under the weights." }
  },
  "barbell-hold": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Leg die Stange im Rack auf Höhe der Oberschenkelmitte ab. Greif sie im Obergriff etwa schulterbreit und heb sie heraus." },
        { titel: "Halten", text: "Steh aufrecht, die Arme sind gestreckt. Drück die Stange so fest du kannst und atme ruhig weiter." },
        { titel: "Ablegen", text: "Leg die Stange zurück ins Rack, bevor sich die Finger öffnen." }
      ],
      en: [
        { titel: "Set up", text: "Set the bar in the rack at mid-thigh height. Grip it overhand at about shoulder width and lift it out." },
        { titel: "Hold", text: "Stand upright with your arms straight. Squeeze the bar as hard as you can and keep breathing steadily." },
        { titel: "Rack", text: "Put the bar back in the rack before your fingers open." }
      ]
    },
    fehler: { de: "Du greifst im Wechselgriff. Dann ist es für den Griff zu leicht.", en: "You use a mixed grip. Then it is too easy for your grip." },
    sicherheit: { de: "Halt die Stange knapp über den Ablagen oder den Sicherheitsbügeln, damit sie nicht weit fällt.", en: "Hold the bar just above the hooks or the safety bars so it cannot fall far." }
  },
  "dumbbell-hold": {
    schritte: {
      de: [
        { titel: "Aufnehmen", text: "Nimm zwei schwere Kurzhanteln von der Ablage oder vom Boden, mit geradem Rücken." },
        { titel: "Halten", text: "Steh aufrecht, die Arme hängen seitlich. Drück die Griffe fest und atme ruhig weiter." },
        { titel: "Ablegen", text: "Leg die Hanteln kontrolliert ab, bevor sich die Finger öffnen." }
      ],
      en: [
        { titel: "Pick up", text: "Take two heavy dumbbells from the rack or the floor with a straight back." },
        { titel: "Hold", text: "Stand upright with your arms hanging at your sides. Squeeze the handles hard and keep breathing steadily." },
        { titel: "Set down", text: "Set the dumbbells down under control before your fingers open." }
      ]
    },
    fehler: { de: "Die Schultern sacken nach vorn, und der obere Rücken wird rund.", en: "Your shoulders slump forward and your upper back rounds." }
  },
  "plate-pinch": {
    schritte: {
      de: [
        { titel: "Aufnehmen", text: "Stell zwei gleiche Scheiben mit den glatten Seiten nach außen aneinander. Klemm sie von oben zwischen Daumen und gestreckten Fingern und heb sie an." },
        { titel: "Halten", text: "Steh aufrecht, der Arm hängt lang. Drück die Scheiben zusammen und atme ruhig weiter." },
        { titel: "Abstellen", text: "Stell die Scheiben ab, bevor sie rutschen. Wechsle dann die Hand." }
      ],
      en: [
        { titel: "Pick up", text: "Stand two identical plates together with the smooth sides facing out. Pinch them from above between your thumb and straight fingers and lift them." },
        { titel: "Hold", text: "Stand upright with your arm hanging long. Squeeze the plates together and keep breathing steadily." },
        { titel: "Set down", text: "Set the plates down before they slip. Then switch hands." }
      ]
    },
    fehler: { de: "Die Finger greifen unter den Rand der Scheiben. Dann ist es kein Klemmen mehr.", en: "Your fingers hook under the rim of the plates. Then it is no longer a pinch." },
    sicherheit: { de: "Halt die Scheiben nicht über den Füßen und fang mit kleinen Scheiben an.", en: "Do not hold the plates above your feet, and start with small plates." }
  },
  "dead-hang": {
    schritte: {
      de: [
        { titel: "Greifen", text: "Greif die Stange im Obergriff etwa schulterbreit, die Daumen liegen um die Stange." },
        { titel: "Hängen", text: "Lass dich in den Hang, die Arme sind gestreckt. Zieh die Schultern leicht von den Ohren weg und atme ruhig weiter." },
        { titel: "Absteigen", text: "Steig kontrolliert ab, bevor sich die Finger öffnen." }
      ],
      en: [
        { titel: "Grip", text: "Grip the bar overhand at about shoulder width with your thumbs wrapped around the bar." },
        { titel: "Hang", text: "Lower yourself into the hang with your arms straight. Pull your shoulders slightly away from your ears and keep breathing steadily." },
        { titel: "Come down", text: "Step down under control before your fingers open." }
      ]
    },
    fehler: { de: "Du schaukelst, oder die Schultern hängen ganz ohne Spannung an den Ohren.", en: "You swing, or your shoulders hang by your ears with no tension at all." },
    tipp: { de: "Fang mit 20 bis 30 Sekunden an.", en: "Start with 20 to 30 seconds." }
  },
  "towel-hang": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Leg zwei stabile Handtücher über die Stange und greif in jede Hand beide Enden eines Handtuchs." },
        { titel: "Hängen", text: "Lass dich in den Hang, die Arme sind gestreckt. Drück die Handtücher fest und atme ruhig weiter." },
        { titel: "Absteigen", text: "Steig ab, bevor der Griff rutscht." }
      ],
      en: [
        { titel: "Set up", text: "Hang two sturdy towels over the bar and grip both ends of one towel in each hand." },
        { titel: "Hang", text: "Lower yourself into the hang with your arms straight. Squeeze the towels hard and keep breathing steadily." },
        { titel: "Come down", text: "Step down before your grip slips." }
      ]
    },
    fehler: { de: "Du hältst, bis die Hände abrutschen, und fällst unkontrolliert.", en: "You hold until your hands slip off and you fall out of control." },
    sicherheit: { de: "Nimm nur feste, trockene Handtücher. Zieh einmal kräftig daran, bevor du dich hineinhängst.", en: "Only use strong, dry towels. Give them one hard pull before you hang from them." }
  },
  "push-up-auf-fingerspitzen": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Geh in die Liegestützposition und stell die Hände auf die gespreizten Fingerspitzen, etwas breiter als schulterbreit. Der Körper bildet eine gerade Linie." },
        { titel: "Absenken", text: "Senk die Brust kontrolliert Richtung Boden und atme ein. Die Finger bleiben fest." },
        { titel: "Hochdrücken", text: "Drück dich nach oben und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Get into the push-up position and place your hands on your spread fingertips, a little wider than shoulder width. Your body forms a straight line." },
        { titel: "Lower", text: "Lower your chest under control toward the floor and breathe in. Your fingers stay firm." },
        { titel: "Push up", text: "Push yourself up and breathe out." }
      ]
    },
    fehler: { de: "Die Finger geben nach, und die Handflächen sinken auf den Boden.", en: "Your fingers give way and your palms sink to the floor." },
    sicherheit: { de: "Fang auf den Knien an.", en: "Start on your knees." }
  }
});
