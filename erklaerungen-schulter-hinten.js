// Die Erklärungen der Muskelgruppe Hintere Schulter. Sie kommen zu den Einträgen aus der erklaerungen.js dazu,
// deshalb muss diese Datei in der index.html nach der erklaerungen.js stehen. Aufbau wie dort:
// Schlüssel ist die Übungs-ID, pro Übung schritte (2 bis 3) und optional fehler, sicherheit, tipp, alle in de und en.
// Die Datei hat in der index.html und in der sw.js kein ?v=N: Der Service Worker holt sie bei jeder neuen VERSION frisch.
Object.assign(ERKLAERUNGEN, {
  "neutral-grip-machine-rear-delt-fly": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Stell die Hebelarme ganz nach hinten und wähl ein leichtes Gewicht. Setz dich mit der Brust ans Polster. Der Sitz ist so hoch, dass die Griffe auf Schulterhöhe sind. Greif die senkrechten Griffe, die Arme sind fast gestreckt." },
        { titel: "Öffnen", text: "Führ die Arme in einem weiten Bogen nach außen hinten, bis sie etwa in einer Linie mit den Schultern sind. Atme dabei aus." },
        { titel: "Zurück", text: "Lass die Arme langsam wieder nach vorn und atme ein. Die Gewichtsplatten setzen nicht auf." }
      ],
      en: [
        { titel: "Set up", text: "Set the lever arms all the way back and select a light weight. Sit with your chest against the pad. The seat is high enough that the handles are at shoulder height. Grip the vertical handles with your arms almost straight." },
        { titel: "Open", text: "Move your arms in a wide arc out and back until they are roughly in line with your shoulders. Breathe out." },
        { titel: "Return", text: "Let your arms move forward again slowly and breathe in. The weight plates do not touch down." }
      ]
    },
    fehler: { de: "Die Schultern ziehen zu den Ohren, und der Nacken übernimmt.", en: "Your shoulders shrug up toward your ears and your neck takes over." }
  },
  "overhand-grip-machine-rear-delt-fly": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Stell die Hebelarme ganz nach hinten und setz dich mit der Brust ans Polster. Greif die waagerechten Griffe von oben, die Arme sind auf Schulterhöhe und fast gestreckt." },
        { titel: "Öffnen", text: "Führ die Arme nach außen hinten, die Ellbogen zeigen dabei zur Seite. Atme dabei aus." },
        { titel: "Zurück", text: "Lass die Arme langsam wieder nach vorn und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Set the lever arms all the way back and sit with your chest against the pad. Grip the horizontal handles from above, arms at shoulder height and almost straight." },
        { titel: "Open", text: "Move your arms out and back with your elbows pointing out to the sides. Breathe out." },
        { titel: "Return", text: "Let your arms move forward again slowly and breathe in." }
      ]
    },
    fehler: { de: "Die Ellbogen beugen sich stark, und es wird ein Rudern.", en: "Your elbows bend a lot and it becomes a row." }
  },
  "sideways-single-arm-machine-rear-delt-fly": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Stell den Hebelarm ganz nach hinten. Setz dich seitlich auf den Sitz, die Schulter des freien Arms lehnt am Polster. Greif mit dem äußeren Arm quer vor dem Körper den Griff, der weiter weg ist." },
        { titel: "Öffnen", text: "Führ den fast gestreckten Arm in einem weiten Bogen vom Körper weg nach außen. Atme dabei aus. Der Oberkörper bleibt ruhig." },
        { titel: "Zurück", text: "Lass den Arm langsam zurück vor die Brust und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Set the lever arm all the way back. Sit sideways on the seat with the shoulder of your free arm against the pad. Reach across your body with your outer arm and grip the handle that is further away." },
        { titel: "Open", text: "Move your almost straight arm in a wide arc away from your body and out. Breathe out. Your torso stays still." },
        { titel: "Return", text: "Let your arm return slowly in front of your chest and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du drehst den Oberkörper mit, statt nur den Arm zu bewegen.", en: "You rotate your torso along instead of moving only your arm." }
  },
  "overhand-grip-cable-rear-delt-fly": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell beide Rollen etwa auf Schulterhöhe. Greif mit der rechten Hand das linke Kabel und mit der linken das rechte, am Griff oder direkt am Kabelende. Geh einen Schritt zurück, die Arme sind vor der Brust gekreuzt." },
        { titel: "Öffnen", text: "Zieh die Arme mit leicht gebeugten Ellbogen nach außen hinten, bis sie in einer Linie mit den Schultern sind. Atme dabei aus. Die Handrücken zeigen nach oben." },
        { titel: "Zurück", text: "Lass die Arme langsam wieder nach vorn und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Set both pulleys to about shoulder height. Grip the left cable with your right hand and the right cable with your left, by the handle or directly at the end of the cable. Take a step back with your arms crossed in front of your chest." },
        { titel: "Open", text: "Pull your arms out and back with your elbows slightly bent until they are in line with your shoulders. Breathe out. The backs of your hands face up." },
        { titel: "Return", text: "Let your arms move forward again slowly and breathe in." }
      ]
    },
    fehler: { de: "Du lehnst dich zurück und ziehst mit dem ganzen Körper.", en: "You lean back and pull with your whole body." }
  },
  "single-arm-cable-face-pull": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle auf Augenhöhe und häng einen einzelnen Griff oder das Seil ein. Greif mit einer Hand und geh einen Schritt zurück. Stell dich in eine leichte Schrittstellung." },
        { titel: "Ziehen", text: "Zieh die Hand neben das Gesicht in Richtung Ohr. Der Ellbogen ist hoch und geht nach hinten. Atme dabei aus." },
        { titel: "Zurück", text: "Lass den Arm langsam nach vorn und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley to eye height and attach a single handle or the rope. Grip with one hand and take a step back. Stand in a slight staggered stance." },
        { titel: "Pull", text: "Pull your hand beside your face toward your ear. Your elbow is high and travels back. Breathe out." },
        { titel: "Return", text: "Let your arm move forward slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Der Oberkörper dreht sich mit dem Zug auf.", en: "Your torso rotates open with the pull." }
  },
  "high-pulley-cable-face-pull": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle ganz nach oben und häng das Seil ein. Greif beide Enden, geh zwei Schritte zurück und lehn dich leicht nach hinten. Die Arme zeigen gestreckt schräg nach oben." },
        { titel: "Ziehen", text: "Zieh das Seil zur Stirn und atme aus. Die Ellbogen bleiben hoch und gehen nach hinten, die Seilenden gehen auseinander." },
        { titel: "Zurück", text: "Lass das Seil langsam wieder nach oben und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley all the way up and attach the rope. Grip both ends, take two steps back and lean back slightly. Your arms point straight and diagonally up." },
        { titel: "Pull", text: "Pull the rope to your forehead and breathe out. Your elbows stay high and travel back, and the rope ends move apart." },
        { titel: "Return", text: "Let the rope rise again slowly and breathe in." }
      ]
    },
    fehler: { de: "Die Ellbogen sinken ab, und es wird ein Latzug.", en: "Your elbows drop and it becomes a lat pulldown." }
  },
  "ring-face-pull": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng die Ringe etwa auf Brusthöhe. Greif sie im Obergriff und lehn dich mit gestreckten Armen zurück. Der Körper bildet eine gerade Linie." },
        { titel: "Ziehen", text: "Zieh die Hände links und rechts neben den Kopf, die Ellbogen sind hoch und gehen nach außen hinten. Atme dabei aus." },
        { titel: "Zurück", text: "Lass dich langsam zurück, bis die Arme gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Hang the rings at about chest height. Grip them overhand and lean back with your arms straight. Your body forms a straight line." },
        { titel: "Pull", text: "Pull your hands to the left and right of your head, with your elbows high and travelling out and back. Breathe out." },
        { titel: "Return", text: "Let yourself back slowly until your arms are straight and breathe in." }
      ]
    },
    fehler: { de: "Die Hüfte knickt ein, oder die Ellbogen sinken zum Körper.", en: "Your hips bend, or your elbows drop toward your body." },
    tipp: { de: "Je aufrechter du stehst, desto leichter wird es.", en: "The more upright you stand, the easier it gets." }
  },
  "dumbbell-rear-delt-fly": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Nimm in jede Hand eine leichte Hantel. Beug dich mit geradem Rücken aus der Hüfte vor, bis der Oberkörper fast waagerecht ist. Die Hanteln hängen unter der Brust, die Ellbogen sind leicht gebeugt." },
        { titel: "Heben", text: "Heb die Arme seitlich nach oben, bis sie etwa auf Schulterhöhe sind. Atme dabei aus." },
        { titel: "Senken", text: "Lass die Arme langsam wieder ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Take a light dumbbell in each hand. Hinge forward at the hips with a straight back until your torso is almost horizontal. The dumbbells hang below your chest and your elbows are slightly bent." },
        { titel: "Raise", text: "Lift your arms out to the sides until they are at about shoulder height. Breathe out." },
        { titel: "Lower", text: "Lower your arms again slowly and breathe in." }
      ]
    },
    fehler: { de: "Du richtest dich bei jeder Wiederholung auf und holst Schwung.", en: "You straighten up on every rep and use momentum." },
    tipp: { de: "Nimm sehr leichte Hanteln. Die hintere Schulter ist ein kleiner Muskel.", en: "Use very light dumbbells. The rear delt is a small muscle." }
  },
  "incline-dumbbell-rear-delt-fly": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Bank auf etwa 30 bis 45°. Leg dich bäuchlings darauf, die Brust liegt am oberen Ende des Polsters, die Füße stehen am Boden. Die Hanteln hängen an fast gestreckten Armen." },
        { titel: "Heben", text: "Heb die Arme seitlich nach oben, bis sie auf Schulterhöhe sind. Atme dabei aus." },
        { titel: "Senken", text: "Lass die Arme langsam ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Set the bench to about 30 to 45°. Lie face down on it with your chest at the top end of the pad and your feet on the floor. The dumbbells hang from almost straight arms." },
        { titel: "Raise", text: "Lift your arms out to the sides until they are at shoulder height. Breathe out." },
        { titel: "Lower", text: "Lower your arms slowly and breathe in." }
      ]
    },
    fehler: { de: "Der Kopf geht in den Nacken, und die Brust löst sich vom Polster.", en: "Your head tips back and your chest comes off the pad." }
  },
  "chest-supported-dumbbell-rear-delt-fly": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Lehne steil ein. Setz dich verkehrt herum auf die Bank und lehn die Brust an die Lehne. Die Hanteln hängen neben der Bank." },
        { titel: "Heben", text: "Heb die Arme mit leicht gebeugten Ellbogen nach außen hinten, bis sie auf Schulterhöhe sind. Atme dabei aus." },
        { titel: "Senken", text: "Lass die Arme langsam ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Set the backrest steep. Sit backward on the bench and lean your chest against the backrest. The dumbbells hang beside the bench." },
        { titel: "Raise", text: "Lift your arms out and back with your elbows slightly bent until they are at shoulder height. Breathe out." },
        { titel: "Lower", text: "Lower your arms slowly and breathe in." }
      ]
    },
    fehler: { de: "Die Schultern ziehen zu den Ohren.", en: "Your shoulders shrug up toward your ears." }
  },
  "barbell-rear-delt-row": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Greif die Stange im Obergriff deutlich breiter als schulterbreit. Beug dich mit geradem Rücken vor, bis der Oberkörper fast waagerecht ist. Die Arme hängen gestreckt." },
        { titel: "Rudern", text: "Zieh die Ellbogen seitlich nach oben und die Stange zur oberen Brust. Atme dabei aus. Die Oberarme stehen etwa im rechten Winkel zum Körper." },
        { titel: "Absenken", text: "Lass die Stange langsam ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Grip the bar overhand, clearly wider than shoulder width. Hinge forward with a straight back until your torso is almost horizontal. Your arms hang straight." },
        { titel: "Row", text: "Pull your elbows up and out to the sides and the bar to your upper chest. Breathe out. Your upper arms are at about a right angle to your body." },
        { titel: "Lower", text: "Lower the bar slowly and breathe in." }
      ]
    },
    fehler: { de: "Die Ellbogen sinken zum Körper, und der Latissimus übernimmt.", en: "Your elbows drop toward your body and the lats take over." },
    sicherheit: { de: "Der Rücken bleibt gerade. Nimm deutlich weniger Gewicht als beim normalen Langhantelrudern.", en: "Your back stays straight. Use clearly less weight than for the regular barbell row." }
  },
  "prone-y-t-w-raises": {
    schritte: {
      de: [
        { titel: "Y", text: "Leg dich auf den Bauch, die Stirn liegt am Boden. Streck die Arme schräg nach vorn, die Daumen zeigen nach oben. Heb sie ein paar Zentimeter, atme aus und leg sie wieder ab." },
        { titel: "T", text: "Streck die Arme gerade zur Seite. Zieh die Schulterblätter zusammen, heb die Arme, atme aus und leg sie wieder ab." },
        { titel: "W", text: "Beug die Ellbogen und zieh sie neben die Rippen, die Hände sind neben den Schultern. Heb Ellbogen und Hände, atme aus und leg sie ab. Das ist eine Wiederholung." }
      ],
      en: [
        { titel: "Y", text: "Lie face down with your forehead on the floor. Stretch your arms diagonally forward, thumbs pointing up. Lift them a few centimeters, breathe out and lower them again." },
        { titel: "T", text: "Stretch your arms straight out to the sides. Squeeze your shoulder blades together, lift your arms, breathe out and lower them again." },
        { titel: "W", text: "Bend your elbows and pull them beside your ribs, hands beside your shoulders. Lift your elbows and hands, breathe out and lower them. That is one rep." }
      ]
    },
    fehler: { de: "Du hebst den Oberkörper aus dem unteren Rücken, statt nur die Arme zu heben.", en: "You lift your torso from your lower back instead of lifting only your arms." },
    tipp: { de: "Das Gewicht der Arme reicht am Anfang.", en: "The weight of your arms is enough at first." }
  },
  "innenrotation-kabel": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle etwa auf Kopfhöhe und häng einen einzelnen Griff ein. Dreh der Rolle den Rücken zu und greif den Griff. Heb den Oberarm zur Seite auf Schulterhöhe, der Ellbogen ist rechtwinklig, der Unterarm zeigt nach oben." },
        { titel: "Nach vorn drehen", text: "Dreh den Unterarm nach vorn, bis er etwa waagerecht ist. Atme dabei aus. Der Oberarm bleibt, wo er ist." },
        { titel: "Zurück", text: "Lass den Unterarm langsam wieder nach oben und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley to about head height and attach a single handle. Turn your back to the pulley and grip the handle. Lift your upper arm out to the side to shoulder height, with your elbow at a right angle and your forearm pointing up." },
        { titel: "Rotate forward", text: "Rotate your forearm forward until it is about horizontal. Breathe out. Your upper arm stays where it is." },
        { titel: "Return", text: "Let your forearm rise again slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Der Ellbogen sinkt ab oder wandert nach vorn.", en: "Your elbow drops or drifts forward." },
    sicherheit: { de: "Nimm ein sehr leichtes Gewicht und beweg dich langsam. Hör auf, wenn es in der Schulter schmerzt.", en: "Use a very light weight and move slowly. Stop if your shoulder hurts." }
  }
});
