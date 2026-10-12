// Die Erklärungen der Muskelgruppe Vordere Schulter. Sie kommen zu den Einträgen aus der erklaerungen.js dazu,
// deshalb muss diese Datei in der index.html nach der erklaerungen.js stehen. Aufbau wie dort:
// Schlüssel ist die Übungs-ID, pro Übung schritte (2 bis 3) und optional fehler, sicherheit, tipp, alle in de und en.
// Die Datei hat in der index.html und in der sw.js kein ?v=N: Der Service Worker holt sie bei jeder neuen VERSION frisch.
Object.assign(ERKLAERUNGEN, {
  "plate-loaded-machine-shoulder-press": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Leg auf beide Seiten gleich viel Gewicht. Stell den Sitz so ein, dass die Griffe am Start etwa auf Schulterhöhe sind. Der Rücken liegt an der Lehne, die Füße stehen fest." },
        { titel: "Drücken", text: "Drück die Griffe nach oben, bis die Arme fast gestreckt sind, und atme aus. Beide Seiten laufen gleich schnell." },
        { titel: "Senken", text: "Lass die Griffe langsam zurück auf Schulterhöhe und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Load the same weight on both sides. Adjust the seat so the handles are at about shoulder height at the start. Your back rests against the backrest and your feet are planted." },
        { titel: "Press", text: "Press the handles up until your arms are almost straight and breathe out. Both sides move at the same speed." },
        { titel: "Lower", text: "Let the handles return slowly to shoulder height and breathe in." }
      ]
    },
    fehler: { de: "Der untere Rücken löst sich von der Lehne und geht ins Hohlkreuz.", en: "Your lower back comes off the backrest and arches." }
  },
  "neutral-grip-machine-shoulder-press": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Wähl das Gewicht und stell den Sitz so ein, dass die Griffe am Start auf Schulterhöhe sind. Greif die Griffe, bei denen die Handflächen zueinander zeigen." },
        { titel: "Drücken", text: "Drück die Griffe nach oben, bis die Arme fast gestreckt sind, und atme aus. Die Ellbogen bleiben vor dem Körper." },
        { titel: "Senken", text: "Lass die Griffe langsam zurück und atme ein. Die Gewichtsplatten setzen nicht auf." }
      ],
      en: [
        { titel: "Set up", text: "Select the weight and adjust the seat so the handles are at shoulder height at the start. Grip the handles that have your palms facing each other." },
        { titel: "Press", text: "Press the handles up until your arms are almost straight and breathe out. Your elbows stay in front of your body." },
        { titel: "Lower", text: "Let the handles return slowly and breathe in. The weight plates do not touch down." }
      ]
    },
    fehler: { de: "Die Ellbogen wandern nach außen, und die Handgelenke knicken ab.", en: "Your elbows drift out and your wrists bend." }
  },
  "neutral-grip-plate-loaded-machine-shoulder-press": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Leg auf beide Seiten gleich viel Gewicht und stell den Sitz ein. Greif die Griffe, bei denen die Handflächen zueinander zeigen. Der Rücken liegt an der Lehne." },
        { titel: "Drücken", text: "Drück beide Griffe gleichmäßig nach oben und atme aus. Die Ellbogen bleiben vor dem Körper." },
        { titel: "Senken", text: "Lass die Griffe langsam zurück auf Schulterhöhe und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Load the same weight on both sides and adjust the seat. Grip the handles that have your palms facing each other. Your back rests against the backrest." },
        { titel: "Press", text: "Press both handles up evenly and breathe out. Your elbows stay in front of your body." },
        { titel: "Lower", text: "Let the handles return slowly to shoulder height and breathe in." }
      ]
    },
    fehler: { de: "Ein Arm drückt schneller als der andere.", en: "One arm presses faster than the other." }
  },
  "smith-machine-overhead-press": {
    schritte: {
      de: [
        { titel: "Bank ausrichten", text: "Stell eine Bank mit steiler Lehne so unter die Stange, dass diese dicht vor dem Gesicht bis zum Schlüsselbein laufen kann. Prüf das mit der leeren Stange. Greif etwas breiter als schulterbreit." },
        { titel: "Drücken", text: "Dreh die Stange aus den Haken. Drück sie nach oben, bis die Arme fast gestreckt sind, und atme aus." },
        { titel: "Senken", text: "Senk die Stange kontrolliert bis etwa auf Kinnhöhe oder zum Schlüsselbein und atme ein. Am Ende drehst du sie zurück in die Haken." }
      ],
      en: [
        { titel: "Position the bench", text: "Place a bench with a steep backrest under the bar so the bar can travel close in front of your face down to your collarbone. Check this with the empty bar. Grip a little wider than shoulder width." },
        { titel: "Press", text: "Rotate the bar out of the hooks. Press it up until your arms are almost straight and breathe out." },
        { titel: "Lower", text: "Lower the bar under control to about chin height or to your collarbone and breathe in. At the end, rotate it back into the hooks." }
      ]
    },
    fehler: { de: "Die Bank steht zu weit vorn. Dann läuft die Stange hinter dem Kopf herunter.", en: "The bench is too far forward. Then the bar comes down behind your head." },
    sicherheit: { de: "Stell die Stopper so ein, dass sie die Stange knapp unter deinem tiefsten Punkt auffangen.", en: "Set the safety stops so they catch the bar just below your lowest point." }
  },
  "cable-shoulder-press": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell beide Rollen ganz nach unten und häng je einen Griff ein. Nimm die Griffe, dreh dem Gerät den Rücken zu und geh einen Schritt nach vorn. Bring die Hände neben die Schultern, die Ellbogen zeigen nach unten." },
        { titel: "Drücken", text: "Spann Bauch und Po an. Drück beide Hände nach oben, bis die Arme fast gestreckt sind, und atme aus." },
        { titel: "Senken", text: "Lass die Hände langsam zurück neben die Schultern und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Set both pulleys all the way down and attach a handle to each. Take the handles, turn your back to the machine and take a step forward. Bring your hands beside your shoulders with your elbows pointing down." },
        { titel: "Press", text: "Tighten your abs and glutes. Press both hands up until your arms are almost straight and breathe out." },
        { titel: "Lower", text: "Let your hands return slowly beside your shoulders and breathe in." }
      ]
    },
    fehler: { de: "Du fällst ins Hohlkreuz, weil die Kabel nach hinten ziehen.", en: "You arch your lower back because the cables pull backward." },
    tipp: { de: "Eine leichte Schrittstellung gibt mehr Halt. Die Übung geht auch im Sitzen auf einer Bank mit Lehne.", en: "A slight staggered stance gives you more stability. The exercise also works seated on a bench with a backrest." }
  },
  "cable-front-raise": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle ganz nach unten und häng eine gerade Stange oder das Seil ein. Dreh der Rolle den Rücken zu und stell dich über das Kabel, es läuft zwischen den Beinen durch. Greif im Obergriff, die Arme hängen vor den Oberschenkeln." },
        { titel: "Heben", text: "Heb die Arme mit leicht gebeugten Ellbogen nach vorn bis auf Schulterhöhe. Atme dabei aus." },
        { titel: "Senken", text: "Lass die Arme langsam ab und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley all the way down and attach a straight bar or the rope. Turn your back to the pulley and stand over the cable so it runs between your legs. Grip overhand with your arms hanging in front of your thighs." },
        { titel: "Raise", text: "Lift your arms forward to shoulder height with your elbows slightly bent. Breathe out." },
        { titel: "Lower", text: "Lower your arms slowly and breathe in." }
      ]
    },
    fehler: { de: "Du lehnst dich zurück und schwingst das Gewicht hoch.", en: "You lean back and swing the weight up." }
  },
  "single-arm-cable-front-raise": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle ganz nach unten und häng einen einzelnen Griff ein. Dreh der Rolle den Rücken zu und greif den Griff im Obergriff. Das Kabel läuft neben dem Bein, der Arm hängt neben dem Oberschenkel." },
        { titel: "Heben", text: "Heb den Arm mit leicht gebeugtem Ellbogen nach vorn bis auf Schulterhöhe. Atme dabei aus." },
        { titel: "Senken", text: "Lass den Arm langsam ab und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley all the way down and attach a single handle. Turn your back to the pulley and grip the handle overhand. The cable runs beside your leg and your arm hangs beside your thigh." },
        { titel: "Raise", text: "Lift your arm forward to shoulder height with your elbow slightly bent. Breathe out." },
        { titel: "Lower", text: "Lower your arm slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Der Oberkörper dreht sich zur arbeitenden Seite.", en: "Your torso rotates toward the working side." }
  },
  "barbell-overhead-press": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg die Stange im Rack auf Brusthöhe. Greif sie etwas breiter als schulterbreit, leg sie vorn auf die Schultern und geh einen Schritt zurück. Die Füße stehen hüftbreit, die Unterarme senkrecht." },
        { titel: "Drücken", text: "Spann Bauch und Po an. Drück die Stange dicht am Gesicht vorbei nach oben und atme aus. Oben schiebst du den Kopf unter die Stange, die Arme sind gestreckt." },
        { titel: "Senken", text: "Senk die Stange kontrolliert zurück auf die Schultern und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Set the bar in the rack at chest height. Grip it a little wider than shoulder width, rest it on the front of your shoulders and take a step back. Your feet are hip width apart and your forearms are vertical." },
        { titel: "Press", text: "Tighten your abs and glutes. Press the bar up close past your face and breathe out. At the top, move your head under the bar with your arms straight." },
        { titel: "Lower", text: "Lower the bar under control back to your shoulders and breathe in." }
      ]
    },
    fehler: { de: "Du lehnst dich zurück und drückst aus dem Hohlkreuz.", en: "You lean back and press from an arched lower back." },
    sicherheit: { de: "Nimm die Stange aus dem Rack und leg sie dort wieder ab, statt sie vom Boden hochzureißen.", en: "Take the bar from the rack and put it back there instead of yanking it up from the floor." }
  },
  "dumbbell-overhead-press": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh hüftbreit. Bring die Hanteln neben die Schultern, die Unterarme stehen senkrecht." },
        { titel: "Drücken", text: "Spann Bauch und Po an. Drück die Hanteln nach oben, bis die Arme fast gestreckt sind, und atme aus." },
        { titel: "Senken", text: "Senk die Hanteln langsam zurück neben die Schultern und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Stand with your feet hip width apart. Bring the dumbbells beside your shoulders with your forearms vertical." },
        { titel: "Press", text: "Tighten your abs and glutes. Press the dumbbells up until your arms are almost straight and breathe out." },
        { titel: "Lower", text: "Lower the dumbbells slowly back beside your shoulders and breathe in." }
      ]
    },
    fehler: { de: "Du holst Schwung aus den Knien, oder der untere Rücken geht ins Hohlkreuz.", en: "You use momentum from your knees, or your lower back arches." }
  },
  "seated-dumbbell-shoulder-press": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Lehne fast senkrecht. Setz dich, stell die Hanteln auf die Oberschenkel und bring sie nacheinander mit etwas Schwung aus den Knien neben die Schultern. Der Rücken liegt an der Lehne." },
        { titel: "Drücken", text: "Drück die Hanteln nach oben, bis die Arme fast gestreckt sind, und atme aus." },
        { titel: "Senken", text: "Senk die Hanteln langsam, bis die Hände etwa auf Ohrhöhe sind, und atme ein. Am Ende legst du sie wieder auf den Oberschenkeln ab." }
      ],
      en: [
        { titel: "Setup", text: "Set the backrest almost vertical. Sit down, stand the dumbbells on your thighs and bring them beside your shoulders one after the other with a little kick from your knees. Your back rests against the backrest." },
        { titel: "Press", text: "Press the dumbbells up until your arms are almost straight and breathe out." },
        { titel: "Lower", text: "Lower the dumbbells slowly until your hands are at about ear height and breathe in. At the end, rest them on your thighs again." }
      ]
    },
    fehler: { de: "Du rutschst im Sitz nach vorn, und es wird ein steiles Schrägbankdrücken.", en: "You slide forward in the seat and it becomes a steep incline press." }
  },
  "arnold-press": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Sitz oder steh aufrecht. Halt die Hanteln vor den Schultern, die Handflächen zeigen zu dir, die Ellbogen zeigen nach vorn." },
        { titel: "Drehen und drücken", text: "Führ die Ellbogen zur Seite und drück die Hanteln nach oben. Dreh die Hände dabei, bis die Handflächen oben nach vorn zeigen. Atme dabei aus." },
        { titel: "Senken", text: "Senk die Hanteln auf demselben Weg, dreh die Hände zurück und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Sit or stand upright. Hold the dumbbells in front of your shoulders, palms facing you, elbows pointing forward." },
        { titel: "Rotate and press", text: "Move your elbows out to the sides and press the dumbbells up. Rotate your hands as you do, until your palms face forward at the top. Breathe out." },
        { titel: "Lower", text: "Lower the dumbbells along the same path, rotate your hands back and breathe in." }
      ]
    },
    fehler: { de: "Du drehst erst und drückst dann. Beides läuft in einer Bewegung.", en: "You rotate first and press afterward. Both happen in one movement." },
    tipp: { de: "Nimm etwas weniger Gewicht als beim normalen Schulterdrücken.", en: "Use a little less weight than for the regular shoulder press." }
  },
  "z-press": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz dich auf den Boden, die Beine sind gestreckt und leicht geöffnet. Sitz aufrecht. Halt die Stange auf den Schultern oder die Hanteln neben den Schultern." },
        { titel: "Drücken", text: "Spann den Bauch an und drück das Gewicht gerade nach oben. Atme dabei aus. Der Oberkörper bleibt senkrecht." },
        { titel: "Senken", text: "Senk das Gewicht kontrolliert zurück zu den Schultern und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Sit on the floor with your legs straight and slightly apart. Sit upright. Hold the bar on your shoulders or the dumbbells beside your shoulders." },
        { titel: "Press", text: "Tighten your abs and press the weight straight up. Breathe out. Your torso stays vertical." },
        { titel: "Lower", text: "Lower the weight under control back to your shoulders and breathe in." }
      ]
    },
    fehler: { de: "Der untere Rücken wird rund, und du kippst nach hinten.", en: "Your lower back rounds and you tip backward." },
    tipp: { de: "Mit der Langhantel nimmst du die Stange aus einem Rack mit tief eingestellten Haken. Fang mit wenig Gewicht an.", en: "With a barbell, take the bar from a rack with the hooks set low. Start with little weight." }
  },
  "bradford-press": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Sitz oder steh aufrecht. Die Stange liegt vorn auf den Schultern, der Griff ist etwas breiter als schulterbreit." },
        { titel: "Nach hinten", text: "Drück die Stange so weit hoch, dass sie knapp über den Kopf passt, und führ sie hinter den Kopf. Senk sie dort bis etwa auf Ohrhöhe. Atme dabei aus." },
        { titel: "Nach vorn", text: "Drück sie wieder knapp über den Kopf und senk sie vorn zu den Schultern. Atme dabei ein. Das ist eine Wiederholung." }
      ],
      en: [
        { titel: "Setup", text: "Sit or stand upright. The bar rests on the front of your shoulders, with your grip a little wider than shoulder width." },
        { titel: "To the back", text: "Press the bar up just high enough to clear your head and move it behind your head. Lower it there to about ear height. Breathe out." },
        { titel: "To the front", text: "Press it up again just over your head and lower it in front to your shoulders. Breathe in. That is one rep." }
      ]
    },
    fehler: { de: "Du schiebst den Kopf weit nach vorn, statt die Stange darüber zu führen.", en: "You push your head far forward instead of moving the bar over it." },
    sicherheit: { de: "Die Position hinter dem Kopf belastet die Schulter. Nimm ein leichtes Gewicht und lass die Übung weg, wenn es dort schmerzt.", en: "The position behind the head stresses the shoulder. Use a light weight and skip the exercise if it hurts there." }
  },
  "single-arm-dumbbell-press": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh hüftbreit und bring eine Hantel neben die Schulter. Die freie Hand liegt an der Hüfte oder ist zur Seite gestreckt." },
        { titel: "Drücken", text: "Spann Bauch und Po an. Drück die Hantel gerade nach oben und atme aus. Der Oberkörper bleibt aufrecht." },
        { titel: "Senken", text: "Senk die Hantel langsam zurück zur Schulter und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Stand with your feet hip width apart and bring one dumbbell beside your shoulder. Your free hand rests on your hip or is stretched out to the side." },
        { titel: "Press", text: "Tighten your abs and glutes. Press the dumbbell straight up and breathe out. Your torso stays upright." },
        { titel: "Lower", text: "Lower the dumbbell slowly back to your shoulder and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du neigst dich zur freien Seite weg.", en: "You lean away toward the free side." }
  },
  "landmine-press": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Steck ein Ende der Stange in die Landmine-Halterung und belade das andere. Heb das beladene Ende mit beiden Händen an die Schulter und halt es dann mit einer Hand. Stell dich in eine leichte Schrittstellung oder knie dich mit einem Bein hin." },
        { titel: "Drücken", text: "Drück die Stange schräg nach vorn oben, bis der Arm gestreckt ist, und atme aus. Der Oberkörper lehnt sich leicht in die Stange." },
        { titel: "Senken", text: "Senk die Stange langsam zurück zur Schulter und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Put one end of the bar into the landmine attachment and load the other. Lift the loaded end to your shoulder with both hands, then hold it with one hand. Stand in a slight staggered stance or kneel on one leg." },
        { titel: "Press", text: "Press the bar diagonally forward and up until your arm is straight and breathe out. Your torso leans slightly into the bar." },
        { titel: "Lower", text: "Lower the bar slowly back to your shoulder and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Der Oberkörper dreht sich mit, oder du fällst ins Hohlkreuz.", en: "Your torso rotates with the press, or you arch your lower back." },
    tipp: { de: "Der schräge Weg ist oft angenehmer, wenn das Drücken senkrecht über den Kopf in der Schulter zieht.", en: "The diagonal path is often more comfortable if pressing straight overhead bothers your shoulder." }
  },
  "dumbbell-front-raise": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh aufrecht, die Hanteln hängen vor den Oberschenkeln, die Handflächen zeigen zu dir. Die Ellbogen sind leicht gebeugt." },
        { titel: "Heben", text: "Heb beide Arme nach vorn bis auf Schulterhöhe und atme aus." },
        { titel: "Senken", text: "Lass die Arme langsam ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Stand upright with the dumbbells hanging in front of your thighs, palms facing you. Your elbows are slightly bent." },
        { titel: "Raise", text: "Lift both arms forward to shoulder height and breathe out." },
        { titel: "Lower", text: "Lower your arms slowly and breathe in." }
      ]
    },
    fehler: { de: "Du schwingst die Hanteln hoch und lehnst dich zurück.", en: "You swing the dumbbells up and lean back." },
    tipp: { de: "Nimm leichte Hanteln. Wenn du schwingen musst, sind sie zu schwer.", en: "Use light dumbbells. If you have to swing, they are too heavy." }
  },
  "plate-front-raise": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh aufrecht und halt eine Hantelscheibe mit beiden Händen links und rechts am Rand. Sie hängt vor den Oberschenkeln, die Ellbogen sind leicht gebeugt." },
        { titel: "Heben", text: "Heb die Scheibe nach vorn bis auf Schulterhöhe und atme aus." },
        { titel: "Senken", text: "Lass die Scheibe langsam ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Stand upright and hold a weight plate with both hands at the left and right edge. It hangs in front of your thighs and your elbows are slightly bent." },
        { titel: "Raise", text: "Lift the plate forward to shoulder height and breathe out." },
        { titel: "Lower", text: "Lower the plate slowly and breathe in." }
      ]
    },
    fehler: { de: "Die Schultern ziehen zu den Ohren, und der Rücken geht ins Hohlkreuz.", en: "Your shoulders shrug up toward your ears and your back arches." }
  },
  "pike-push-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Geh in die Liegestützposition und lauf mit den Füßen nach vorn, bis die Hüfte hoch ist. Die Hände stehen etwas breiter als schulterbreit, die Arme sind gestreckt." },
        { titel: "Absenken", text: "Beug die Ellbogen und senk den Kopf nach vorn unten, bis er knapp vor den Händen fast den Boden berührt. Atme dabei ein." },
        { titel: "Hochdrücken", text: "Drück dich zurück, bis die Arme gestreckt sind, und atme aus. Die Hüfte bleibt oben." }
      ],
      en: [
        { titel: "Setup", text: "Get into the push-up position and walk your feet forward until your hips are high. Your hands are a little wider than shoulder width and your arms are straight." },
        { titel: "Lower", text: "Bend your elbows and lower your head forward and down until it almost touches the floor just in front of your hands. Breathe in." },
        { titel: "Push up", text: "Push yourself back until your arms are straight and breathe out. Your hips stay high." }
      ]
    },
    fehler: { de: "Die Hüfte sinkt ab, und es wird eine normale Liegestütze.", en: "Your hips drop and it becomes a regular push-up." }
  },
  "elevated-pike-push-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Füße auf eine Bank und die Hände auf den Boden. Lauf mit den Händen zurück, bis die Hüfte über den Schultern ist und der Oberkörper fast senkrecht steht." },
        { titel: "Absenken", text: "Beug die Ellbogen und senk den Kopf knapp vor den Händen zum Boden. Atme dabei ein." },
        { titel: "Hochdrücken", text: "Drück dich nach oben, bis die Arme gestreckt sind, und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Place your feet on a bench and your hands on the floor. Walk your hands back until your hips are above your shoulders and your torso is almost vertical." },
        { titel: "Lower", text: "Bend your elbows and lower your head to the floor just in front of your hands. Breathe in." },
        { titel: "Push up", text: "Push yourself up until your arms are straight and breathe out." }
      ]
    },
    fehler: { de: "Die Ellbogen gehen weit nach außen. Sie zeigen schräg nach hinten.", en: "Your elbows flare far out. They point diagonally back." },
    sicherheit: { de: "Die Bank muss fest stehen. Leg etwas Weiches unter den Kopf, solange du die Bewegung lernst.", en: "The bench must stand firmly. Put something soft under your head while you are learning the movement." }
  },
  "handstand-push-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Geh in den Handstand, an der Wand oder frei. Die Hände stehen etwas breiter als schulterbreit, der Körper ist gespannt." },
        { titel: "Absenken", text: "Beug die Ellbogen und senk dich langsam, bis der Kopf den Boden leicht berührt. Atme dabei ein. Der Kopf kommt knapp vor den Händen auf." },
        { titel: "Hochdrücken", text: "Drück dich nach oben, bis die Arme gestreckt sind, und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Get into a handstand, against the wall or freestanding. Your hands are a little wider than shoulder width and your body is tight." },
        { titel: "Lower", text: "Bend your elbows and lower yourself slowly until your head lightly touches the floor. Breathe in. Your head comes down just in front of your hands." },
        { titel: "Push up", text: "Push yourself up until your arms are straight and breathe out." }
      ]
    },
    fehler: { de: "Du lässt dich auf den Kopf fallen, statt kontrolliert abzusenken.", en: "You drop onto your head instead of lowering under control." },
    sicherheit: { de: "Voraussetzung sind saubere Pike-Liegestütze mit erhöhten Füßen und ein sicherer Handstand an der Wand. Leg eine Matte unter den Kopf.", en: "You need clean elevated pike push-ups and a secure wall handstand first. Put a mat under your head." },
    tipp: { de: "Für die Wand und für den freien Handstand gibt es eigene Einträge.", en: "The wall version and the freestanding version each have their own entry." }
  },
  "wall-handstand-push-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Hände etwa eine Handlänge vor die Wand und schwing dich in den Handstand. Die Fersen lehnen an der Wand, Bauch und Po sind angespannt." },
        { titel: "Absenken", text: "Beug die Ellbogen und senk dich langsam, bis der Kopf die Matte leicht berührt. Atme dabei ein." },
        { titel: "Hochdrücken", text: "Drück dich nach oben, bis die Arme gestreckt sind, und atme aus. Die Fersen gleiten an der Wand mit." }
      ],
      en: [
        { titel: "Setup", text: "Place your hands about a hand's length in front of the wall and kick up into a handstand. Your heels rest against the wall and your abs and glutes are tight." },
        { titel: "Lower", text: "Bend your elbows and lower yourself slowly until your head lightly touches the mat. Breathe in." },
        { titel: "Push up", text: "Push yourself up until your arms are straight and breathe out. Your heels slide along the wall." }
      ]
    },
    fehler: { de: "Du fällst ins Hohlkreuz, weil die Hände zu weit von der Wand stehen.", en: "You arch your lower back because your hands are too far from the wall." },
    sicherheit: { de: "Leg eine Matte unter den Kopf. Hör auf, bevor die Kraft ganz weg ist, damit du noch sicher aus dem Handstand kommst.", en: "Put a mat under your head. Stop before your strength is completely gone so you can still come out of the handstand safely." },
    tipp: { de: "Bauch zur Wand ist anspruchsvoller.", en: "Chest to the wall is more demanding." }
  },
  "freestanding-handstand-push-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Geh in den freien Handstand. Die Hände stehen etwas breiter als schulterbreit, der Körper ist von den Händen bis zu den Füßen gespannt." },
        { titel: "Absenken", text: "Beug die Ellbogen und senk dich langsam. Der Kopf geht nach vorn, die Beine gleichen nach hinten aus. Atme dabei ein." },
        { titel: "Hochdrücken", text: "Drück dich nach oben und bring den Körper wieder in eine Linie. Atme dabei aus." }
      ],
      en: [
        { titel: "Setup", text: "Get into a freestanding handstand. Your hands are a little wider than shoulder width and your body is tight from hands to feet." },
        { titel: "Lower", text: "Bend your elbows and lower yourself slowly. Your head moves forward and your legs counterbalance to the back. Breathe in." },
        { titel: "Push up", text: "Push yourself up and bring your body back into one line. Breathe out." }
      ]
    },
    fehler: { de: "Du verlierst unten die Körperspannung und kippst über.", en: "You lose body tension at the bottom and tip over." },
    sicherheit: { de: "Mach die Übung erst, wenn Handstand-Liegestütze an der Wand sauber klappen und du sicher aus dem Handstand abrollen oder abdrehen kannst. Üb auf einer Matte mit freiem Platz um dich herum.", en: "Only do this exercise once wall handstand push-ups are clean and you can safely roll or twist out of a handstand. Practice on a mat with free space around you." }
  },
  "handstand-shoulder-tap": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Geh in den Handstand an der Wand. Die Hände stehen schulterbreit, der Körper ist gespannt." },
        { titel: "Gewicht verlagern", text: "Schieb das Gewicht auf eine Hand, bis die andere leicht wird. Atme ruhig weiter." },
        { titel: "Tippen", text: "Heb die freie Hand kurz an und tipp an die Schulter derselben Seite. Setz sie wieder ab und wechsle die Seite." }
      ],
      en: [
        { titel: "Setup", text: "Get into a handstand against the wall. Your hands are shoulder width apart and your body is tight." },
        { titel: "Shift your weight", text: "Shift your weight onto one hand until the other feels light. Keep breathing steadily." },
        { titel: "Tap", text: "Lift the free hand briefly and tap the shoulder on the same side. Put it back down and switch sides." }
      ]
    },
    fehler: { de: "Du hebst die Hand, bevor das Gewicht verlagert ist, und kippst zur Seite.", en: "You lift your hand before your weight has shifted and you tip sideways." },
    sicherheit: { de: "Voraussetzung ist ein ruhiger Handstand an der Wand über mindestens 30 Sekunden.", en: "You need a steady wall handstand for at least 30 seconds first." },
    tipp: { de: "Heb die Hand am Anfang nur ein paar Zentimeter vom Boden.", en: "At first, lift your hand only a few centimeters off the floor." }
  }
});
