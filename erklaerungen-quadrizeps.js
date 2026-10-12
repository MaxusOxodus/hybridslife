// Die Erklärungen der Muskelgruppe Quadrizeps. Sie kommen zu den Einträgen aus der erklaerungen.js dazu,
// deshalb muss diese Datei in der index.html nach der erklaerungen.js stehen. Aufbau wie dort:
// Schlüssel ist die Übungs-ID, pro Übung schritte (2 bis 3) und optional fehler, sicherheit, tipp, alle in de und en.
// Die Datei hat in der index.html und in der sw.js kein ?v=N: Der Service Worker holt sie bei jeder neuen VERSION frisch.
Object.assign(ERKLAERUNGEN, {
  "45-leg-press": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Setz dich so, dass Rücken und Gesäß fest am Polster liegen. Stell die Füße etwa schulterbreit und mittig auf die Platte. Drück den Schlitten ein Stück hoch und dreh die Sicherungshebel zur Seite." },
        { titel: "Senken", text: "Senk den Schlitten kontrolliert und atme ein. Die Knie zeigen in Richtung der Zehen. Geh nur so tief, dass das Gesäß am Polster bleibt." },
        { titel: "Drücken", text: "Drück den Schlitten nach oben und atme aus. Streck die Knie oben nicht ganz durch. Nach der letzten Wiederholung drehst du die Sicherungshebel zurück." }
      ],
      en: [
        { titel: "Set up", text: "Sit so your back and glutes rest firmly against the pad. Place your feet about shoulder width apart in the middle of the platform. Push the sled up a little and turn the safety handles out." },
        { titel: "Lower", text: "Lower the sled under control and breathe in. Your knees point in the direction of your toes. Go only as deep as your glutes stay on the pad." },
        { titel: "Press", text: "Press the sled up and breathe out. Do not lock your knees at the top. After the last rep, turn the safety handles back in." }
      ]
    },
    fehler: { de: "Das Gesäß hebt unten ab, und der untere Rücken rundet sich. Dann bist du zu tief.", en: "Your glutes lift off at the bottom and your lower back rounds. Then you are too deep." },
    sicherheit: { de: "Hat das Gerät verstellbare Stopper, stell sie knapp unter deinen tiefsten Punkt. Lass den Schlitten erst los, wenn die Sicherung eingehängt ist.", en: "If the machine has adjustable stops, set them just below your lowest point. Only let go of the sled once the safety is engaged." }
  },
  "pin-loaded-leg-press": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Steck den Stift ins gewünschte Gewicht. Stell den Sitz so ein, dass die Knie am Start etwa rechtwinklig sind. Die Füße stehen etwa schulterbreit und mittig auf der Platte." },
        { titel: "Drücken", text: "Drück die Platte weg, bis die Beine fast gestreckt sind, und atme aus. Rücken und Gesäß bleiben am Polster." },
        { titel: "Zurück", text: "Lass das Gewicht langsam zurückkommen und atme ein. Die Gewichtsplatten setzen zwischen den Wiederholungen nicht auf." }
      ],
      en: [
        { titel: "Set up", text: "Put the pin into the weight you want. Adjust the seat so your knees are at about a right angle at the start. Your feet are about shoulder width apart in the middle of the platform." },
        { titel: "Press", text: "Press the platform away until your legs are almost straight and breathe out. Your back and glutes stay on the pad." },
        { titel: "Return", text: "Let the weight come back slowly and breathe in. The weight plates do not touch down between reps." }
      ]
    },
    fehler: { de: "Der Sitz steht zu nah an der Platte. Dann rundet sich der untere Rücken schon am Start.", en: "The seat is too close to the platform. Then your lower back rounds right at the start." }
  },
  "single-leg-45-leg-press": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Leg deutlich weniger als die Hälfte deines Gewichts für beide Beine auf. Stell einen Fuß mittig auf die Platte, etwa in der Linie deiner Hüfte. Der andere Fuß steht am Boden. Drück den Schlitten hoch und lös die Sicherung." },
        { titel: "Senken", text: "Senk den Schlitten langsam und atme ein. Das Knie zeigt in Richtung der Zehen, beide Seiten des Gesäßes bleiben am Polster." },
        { titel: "Drücken", text: "Drück den Schlitten nach oben und atme aus. Mach erst alle Wiederholungen einer Seite und häng die Sicherung ein, bevor du wechselst." }
      ],
      en: [
        { titel: "Set up", text: "Load clearly less than half the weight you use with both legs. Place one foot in the middle of the platform, roughly in line with your hip. The other foot is on the floor. Push the sled up and release the safety." },
        { titel: "Lower", text: "Lower the sled slowly and breathe in. Your knee points in the direction of your toes and both sides of your glutes stay on the pad." },
        { titel: "Press", text: "Press the sled up and breathe out. Do all reps on one side first and engage the safety before you switch." }
      ]
    },
    fehler: { de: "Das Knie fällt nach innen, oder die Hüfte dreht sich vom Polster weg.", en: "Your knee caves in, or your hip rotates away from the pad." },
    sicherheit: { de: "Stell die Stopper ein, falls das Gerät welche hat. Mit einem Bein kannst du ein zu schweres Gewicht schlechter abfangen.", en: "Set the stops if the machine has them. With one leg it is harder to catch a weight that is too heavy." }
  },
  "single-leg-pin-loaded-leg-press": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Steck weniger als die Hälfte deines Gewichts für beide Beine. Stell einen Fuß mittig auf die Platte, der andere steht am Boden oder ruht neben der Platte." },
        { titel: "Drücken", text: "Drück die Platte weg, bis das Bein fast gestreckt ist, und atme aus. Die Hüfte bleibt gerade im Sitz." },
        { titel: "Zurück", text: "Lass das Gewicht langsam zurückkommen und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Select less than half the weight you use with both legs. Place one foot in the middle of the platform. The other is on the floor or rests beside the platform." },
        { titel: "Press", text: "Press the platform away until your leg is almost straight and breathe out. Your hips stay square in the seat." },
        { titel: "Return", text: "Let the weight come back slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du drehst dich im Sitz zur Seite, um mit dem Bein besser drücken zu können.", en: "You twist sideways in the seat to push better with the leg." },
    tipp: { de: "Fang mit dem schwächeren Bein an und mach mit dem stärkeren gleich viele Wiederholungen.", en: "Start with your weaker leg and do the same number of reps with the stronger one." }
  },
  "pin-loaded-quad-biased-leg-press": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Steck den Stift und stell den Sitz ein. Setz die Füße in die untere Hälfte der Platte, etwa hüftbreit. Die ganze Fußsohle hat Kontakt." },
        { titel: "Drücken", text: "Drück die Platte weg, bis die Beine fast gestreckt sind, und atme aus." },
        { titel: "Zurück", text: "Lass das Gewicht langsam zurückkommen und atme ein. Die Knie schieben dabei weit nach vorn über die Zehen, die Fersen bleiben auf der Platte." }
      ],
      en: [
        { titel: "Set up", text: "Set the pin and adjust the seat. Place your feet in the lower half of the platform, about hip width apart. The whole sole of each foot is in contact." },
        { titel: "Press", text: "Press the platform away until your legs are almost straight and breathe out." },
        { titel: "Return", text: "Let the weight come back slowly and breathe in. Your knees travel far forward over your toes and your heels stay on the platform." }
      ]
    },
    fehler: { de: "Die Fersen heben von der Platte ab. Setz die Füße dann etwas höher.", en: "Your heels lift off the platform. Then place your feet a little higher." },
    sicherheit: { de: "Geh nur so tief, dass Gesäß und unterer Rücken am Polster bleiben. Bei Kniebeschwerden nur so weit, wie es sich gut anfühlt.", en: "Go only as deep as your glutes and lower back stay on the pad. With knee trouble, go only as far as feels good." },
    tipp: { de: "Nimm weniger Gewicht als mit den Füßen in der Mitte der Platte.", en: "Use less weight than with your feet in the middle of the platform." }
  },
  "hack-squat": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Stell dich auf die Platte, die Füße etwa schulterbreit und mittig. Lehn den Rücken ans Polster, die Schultern sind unter den Schulterpolstern. Streck die Beine und lös die Sicherungshebel." },
        { titel: "Senken", text: "Beug die Knie und senk dich kontrolliert, bis die Oberschenkel mindestens waagerecht sind. Atme dabei ein. Die Knie zeigen in Richtung der Zehen." },
        { titel: "Drücken", text: "Drück dich durch den ganzen Fuß nach oben und atme aus. Streck die Knie oben nicht ganz durch. Am Ende hängst du die Sicherung wieder ein." }
      ],
      en: [
        { titel: "Set up", text: "Step onto the platform with your feet about shoulder width apart and centered. Lean your back against the pad with your shoulders under the shoulder pads. Straighten your legs and release the safety handles." },
        { titel: "Lower", text: "Bend your knees and lower yourself under control until your thighs are at least horizontal. Breathe in. Your knees point in the direction of your toes." },
        { titel: "Press", text: "Push up through your whole foot and breathe out. Do not lock your knees at the top. At the end, engage the safety again." }
      ]
    },
    fehler: { de: "Die Fersen heben ab, oder das Gesäß löst sich unten vom Polster.", en: "Your heels lift, or your glutes come off the pad at the bottom." },
    sicherheit: { de: "Steig erst aus, wenn die Sicherung eingehängt ist. Hat das Gerät Stopper, stell sie knapp unter deinen tiefsten Punkt.", en: "Only step out once the safety is engaged. If the machine has stops, set them just below your lowest point." }
  },
  "pause-hack-squat": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Nimm weniger Gewicht als ohne Pause. Stell dich wie beim Hack Squat in das Gerät und lös die Sicherung." },
        { titel: "Senken und halten", text: "Senk dich kontrolliert und atme ein. Halt am tiefsten Punkt ein bis zwei Sekunden. Beine und Rumpf bleiben angespannt." },
        { titel: "Drücken", text: "Drück dich aus dem Stillstand nach oben und atme aus." }
      ],
      en: [
        { titel: "Set up", text: "Use less weight than without the pause. Get into the machine as for the hack squat and release the safety." },
        { titel: "Lower and hold", text: "Lower yourself under control and breathe in. Hold at the lowest point for one to two seconds. Keep your legs and core tight." },
        { titel: "Press", text: "Push up from a dead stop and breathe out." }
      ]
    },
    fehler: { de: "Du lässt in der Pause locker und sackst noch ein Stück tiefer.", en: "You relax during the pause and sink a little deeper." },
    sicherheit: { de: "Stell die Stopper ein, falls das Gerät welche hat. Aus dem Stillstand ist der Weg nach oben am schwersten.", en: "Set the stops if the machine has them. From a dead stop, the way up is at its hardest." }
  },
  "cable-belt-squat": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle ganz nach unten und leg einen Dip-Gürtel um die Hüfte. Häng ihn am Kabel ein. Stell dich nah an die Rolle, am besten erhöht auf zwei Stepper oder Scheiben. Halt dich am Gerät fest." },
        { titel: "Senken", text: "Beug Hüfte und Knie und senk dich, bis die Oberschenkel mindestens waagerecht sind. Atme dabei ein. Der Oberkörper bleibt aufrecht." },
        { titel: "Hoch", text: "Drück dich durch den ganzen Fuß nach oben und atme aus." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley all the way down and put a dip belt around your hips. Clip it to the cable. Stand close to the pulley, ideally raised on two steppers or plates. Hold on to the machine." },
        { titel: "Lower", text: "Bend your hips and knees and lower yourself until your thighs are at least horizontal. Breathe in. Your torso stays upright." },
        { titel: "Up", text: "Push up through your whole foot and breathe out." }
      ]
    },
    fehler: { de: "Du stehst zu weit von der Rolle weg. Dann zieht dich das Kabel nach vorn.", en: "You stand too far from the pulley. Then the cable pulls you forward." },
    tipp: { de: "Die Hände halten nur das Gleichgewicht. Zieh dich nicht mit den Armen hoch. Der Gürtel muss fest sitzen, und das Kabel darf nicht schlaff werden.", en: "Your hands only keep your balance. Do not pull yourself up with your arms. The belt must sit firmly and the cable must not go slack." }
  },
  "single-leg-leg-extension": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Stell die Maschine so ein, dass das Knie auf Höhe der Drehachse ist und das Polster am unteren Schienbein sitzt. Steck weniger als die Hälfte deines Gewichts für beide Beine. Das freie Bein bleibt locker hinter dem Polster." },
        { titel: "Strecken", text: "Streck das Bein, bis es fast gerade ist, und atme aus. Halt oben kurz." },
        { titel: "Senken", text: "Lass das Gewicht langsam zurück und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Adjust the machine so your knee is level with the pivot point and the pad sits on your lower shin. Select less than half the weight you use with both legs. Your free leg stays relaxed behind the pad." },
        { titel: "Extend", text: "Straighten your leg until it is almost straight and breathe out. Hold briefly at the top." },
        { titel: "Lower", text: "Let the weight come back slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Das Gesäß hebt vom Sitz ab, und du holst Schwung aus der Hüfte. Halt dich an den Griffen fest.", en: "Your glutes lift off the seat and you use momentum from your hips. Hold on to the handles." }
  },
  "smith-machine-back-squat": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Stopper knapp unter deinen tiefsten Punkt. Geh unter die Stange und leg sie auf den oberen Rücken. Stell die Füße etwa schulterbreit und eine halbe Fußlänge vor die Stange. Dreh die Stange aus den Haken." },
        { titel: "Senken", text: "Beug Hüfte und Knie und senk dich, bis die Oberschenkel mindestens waagerecht sind. Atme dabei ein. Die Knie zeigen in Richtung der Zehen." },
        { titel: "Hoch", text: "Drück dich durch den ganzen Fuß nach oben und atme aus. Am Ende drehst du die Stange zurück in die Haken." }
      ],
      en: [
        { titel: "Set up", text: "Set the safety stops just below your lowest point. Step under the bar and rest it on your upper back. Place your feet about shoulder width apart and half a foot length in front of the bar. Rotate the bar out of the hooks." },
        { titel: "Lower", text: "Bend your hips and knees and lower yourself until your thighs are at least horizontal. Breathe in. Your knees point in the direction of your toes." },
        { titel: "Up", text: "Push up through your whole foot and breathe out. At the end, rotate the bar back into the hooks." }
      ]
    },
    fehler: { de: "Die Füße stehen direkt unter der Stange. Dann heben unten die Fersen ab.", en: "Your feet are directly under the bar. Then your heels lift at the bottom." },
    sicherheit: { de: "Prüf die Stopper mit der leeren Stange, bevor du Gewicht auflegst.", en: "Check the safety stops with the empty bar before you load it." },
    tipp: { de: "Willst du mehr Quadrizeps, dürfen die Füße weiter vorn stehen, solange die Fersen unten bleiben.", en: "If you want more quads, your feet may be further forward as long as your heels stay down." }
  },
  "smith-machine-lunge": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Leg die Stange auf den oberen Rücken und dreh sie aus den Haken. Die Füße stehen hüftbreit, knapp vor der Stange." },
        { titel: "Schritt und senken", text: "Mach den Schritt nach hinten, bevor du absenkst, und geh senkrecht nach unten. Die Stange läuft nicht mit nach hinten. Senk dich, bis das hintere Knie fast den Boden berührt, und atme ein. Das vordere Knie zeigt in Richtung der Zehen." },
        { titel: "Zurück", text: "Drück dich mit dem vorderen Fuß nach oben, stell das hintere Bein wieder vor und atme aus. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Rest the bar on your upper back and rotate it out of the hooks. Your feet are hip width apart, just in front of the bar." },
        { titel: "Step and lower", text: "Take the step back before you lower, and go straight down. The bar does not travel back with you. Lower yourself until your back knee almost touches the floor and breathe in. Your front knee points in the direction of your toes." },
        { titel: "Return", text: "Push up with your front foot, bring your back leg forward again and breathe out. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du stößt dich mit dem hinteren Fuß ab. Das vordere Bein macht die Arbeit.", en: "You push off with your back foot. The front leg does the work." },
    sicherheit: { de: "Stell die Stopper so ein, dass sie die Stange knapp unter deinem tiefsten Punkt auffangen.", en: "Set the safety stops so they catch the bar just below your lowest point." }
  },
  "smith-machine-split-squat": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Leg die Stange auf den oberen Rücken. Stell einen Fuß ein Stück vor die Stange und den anderen eine große Schrittlänge dahinter, die hintere Ferse ist oben. Dreh die Stange aus den Haken." },
        { titel: "Senken", text: "Beug beide Knie und senk dich gerade nach unten, bis das hintere Knie fast den Boden berührt. Atme dabei ein." },
        { titel: "Hoch", text: "Drück dich mit dem vorderen Fuß nach oben und atme aus. Die Füße bleiben stehen. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Rest the bar on your upper back. Place one foot a little in front of the bar and the other a long stride behind it, back heel raised. Rotate the bar out of the hooks." },
        { titel: "Lower", text: "Bend both knees and lower yourself straight down until your back knee almost touches the floor. Breathe in." },
        { titel: "Up", text: "Push up with your front foot and breathe out. Your feet stay where they are. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Die Füße stehen auf einer Linie hintereinander. Stell sie hüftbreit auseinander, dann stehst du ruhiger.", en: "Your feet are on one line, one behind the other. Place them hip width apart and you will stand more steadily." },
    sicherheit: { de: "Stell die Stopper ein, bevor du Gewicht auflegst.", en: "Set the safety stops before you load the bar." }
  },
  "smith-machine-bulgarian-split-squat": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell eine Bank etwa eine große Schrittlänge hinter die Stange. Leg die Stange auf den oberen Rücken und dreh sie aus den Haken. Leg den Spann eines Fußes hinten auf die Bank, der vordere Fuß steht knapp vor der Stange." },
        { titel: "Senken", text: "Beug das vordere Knie und senk dich gerade nach unten. Atme dabei ein. Das Knie zeigt in Richtung der Zehen." },
        { titel: "Hoch", text: "Drück dich mit dem vorderen Fuß nach oben und atme aus. Mach erst alle Wiederholungen einer Seite und häng die Stange ein, bevor du wechselst." }
      ],
      en: [
        { titel: "Set up", text: "Place a bench about a long stride behind the bar. Rest the bar on your upper back and rotate it out of the hooks. Put the top of one foot on the bench behind you, with your front foot just in front of the bar." },
        { titel: "Lower", text: "Bend your front knee and lower yourself straight down. Breathe in. Your knee points in the direction of your toes." },
        { titel: "Up", text: "Push up with your front foot and breathe out. Do all reps on one side first and rack the bar before you switch." }
      ]
    },
    fehler: { de: "Der vordere Fuß steht zu nah an der Bank. Dann hebt die Ferse ab.", en: "Your front foot is too close to the bench. Then your heel lifts." },
    sicherheit: { de: "Stell die Stopper ein und probier die Position zuerst mit der leeren Stange.", en: "Set the safety stops and try the position with the empty bar first." }
  },
  "smith-machine-front-foot-elevated-split-squat": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Leg eine Scheibe oder einen Stepper von etwa 5 bis 15 cm Höhe knapp vor die Stange und stell den vorderen Fuß ganz darauf. Der hintere Fuß steht eine große Schrittlänge dahinter. Leg die Stange auf den oberen Rücken und dreh sie aus den Haken." },
        { titel: "Senken", text: "Senk dich gerade nach unten und atme ein. Das vordere Knie schiebt weit nach vorn, die Ferse bleibt auf der Erhöhung." },
        { titel: "Hoch", text: "Drück dich mit dem vorderen Fuß nach oben und atme aus. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Put a plate or stepper about 5 to 15 cm high just in front of the bar and place your whole front foot on it. Your back foot is a long stride behind. Rest the bar on your upper back and rotate it out of the hooks." },
        { titel: "Lower", text: "Lower yourself straight down and breathe in. Your front knee travels far forward and your heel stays on the platform." },
        { titel: "Up", text: "Push up with your front foot and breathe out. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du gehst nicht tiefer als ohne Erhöhung. Dann bringt sie nichts.", en: "You go no deeper than without the elevation. Then it does nothing for you." },
    sicherheit: { de: "Die Erhöhung muss flach und rutschfest liegen. Stell die Stopper ein.", en: "The elevation must lie flat and must not slip. Set the safety stops." }
  },
  "high-bar-back-squat": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg die Stange oben auf den Trapezmuskel, unterhalb des Nackenwirbels. Greif sie etwas breiter als schulterbreit. Heb sie aus dem Rack, geh zwei Schritte zurück und stell die Füße etwa schulterbreit." },
        { titel: "Senken", text: "Atme tief ein und spann den Rumpf an. Beug Knie und Hüfte gleichzeitig und senk dich, bis die Oberschenkel mindestens waagerecht sind. Der Oberkörper bleibt aufrecht." },
        { titel: "Hoch", text: "Drück dich durch den ganzen Fuß nach oben und atme oben aus." }
      ],
      en: [
        { titel: "Setup", text: "Rest the bar high on your trapezius muscle, below the bony bump at the base of your neck. Grip it a little wider than shoulder width. Lift it out of the rack, take two steps back and place your feet about shoulder width apart." },
        { titel: "Lower", text: "Take a deep breath in and brace your core. Bend your knees and hips at the same time and lower yourself until your thighs are at least horizontal. Your torso stays upright." },
        { titel: "Up", text: "Push up through your whole foot and breathe out at the top." }
      ]
    },
    fehler: { de: "Die Stange liegt auf dem Nackenwirbel statt auf dem Muskel.", en: "The bar rests on the neck bone instead of on the muscle." },
    sicherheit: { de: "Stell die Sicherheitsbügel im Rack knapp unter deinen tiefsten Punkt.", en: "Set the safety bars in the rack just below your lowest point." }
  },
  "low-bar-back-squat": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg die Stange quer über die hinteren Schultern, etwa zwei bis drei Fingerbreit tiefer als bei der High-Bar-Kniebeuge. Zieh die Schulterblätter zusammen, damit die Stange fest liegt. Heb sie aus dem Rack und stell die Füße etwas breiter als schulterbreit." },
        { titel: "Senken", text: "Atme tief ein und spann den Rumpf an. Schieb die Hüfte nach hinten und beug die Knie, bis die Oberschenkel mindestens waagerecht sind. Der Oberkörper neigt sich mit geradem Rücken vor." },
        { titel: "Hoch", text: "Drück dich nach oben, Hüfte und Schultern steigen gleichzeitig. Atme oben aus." }
      ],
      en: [
        { titel: "Setup", text: "Rest the bar across the back of your shoulders, about two to three finger widths lower than for the high-bar squat. Pull your shoulder blades together so the bar sits firmly. Lift it out of the rack and place your feet a little wider than shoulder width." },
        { titel: "Lower", text: "Take a deep breath in and brace your core. Push your hips back and bend your knees until your thighs are at least horizontal. Your torso leans forward with a straight back." },
        { titel: "Up", text: "Push up, with your hips and shoulders rising at the same time. Breathe out at the top." }
      ]
    },
    fehler: { de: "Die Hüfte steigt zuerst, und der Oberkörper kippt nach vorn.", en: "Your hips rise first and your torso tips forward." },
    sicherheit: { de: "Stell die Sicherheitsbügel im Rack passend ein. Zieht es in Handgelenken oder Schultern, greif breiter.", en: "Set the safety bars in the rack to the right height. If you feel a pull in your wrists or shoulders, grip wider." }
  },
  "front-squat": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg die Stange vorn auf die Schultern, dicht am Hals. Die Fingerspitzen liegen unter der Stange, die Ellbogen zeigen hoch nach vorn. Heb die Stange aus dem Rack und stell die Füße etwa schulterbreit." },
        { titel: "Senken", text: "Atme tief ein und spann den Rumpf an. Senk dich gerade nach unten, bis die Oberschenkel mindestens waagerecht sind. Die Ellbogen bleiben oben." },
        { titel: "Hoch", text: "Drück dich nach oben und führ dabei die Ellbogen nach oben. Atme oben aus." }
      ],
      en: [
        { titel: "Setup", text: "Rest the bar on the front of your shoulders, close to your neck. Your fingertips are under the bar and your elbows point high and forward. Lift the bar out of the rack and place your feet about shoulder width apart." },
        { titel: "Lower", text: "Take a deep breath in and brace your core. Lower yourself straight down until your thighs are at least horizontal. Your elbows stay up." },
        { titel: "Up", text: "Push up and drive your elbows up as you do. Breathe out at the top." }
      ]
    },
    fehler: { de: "Die Ellbogen sinken, der obere Rücken wird rund, und die Stange rollt nach vorn.", en: "Your elbows drop, your upper back rounds and the bar rolls forward." },
    sicherheit: { de: "Stell die Sicherheitsbügel im Rack passend ein. Verlierst du das Gleichgewicht, lass die Stange nach vorn fallen und tritt zurück. Das Rack mit Sicherheitsbügeln fängt sie auf.", en: "Set the safety bars in the rack to the right height. If you lose your balance, let the bar drop forward and step back. The rack with safety bars will catch it." },
    tipp: { de: "Fehlt die Beweglichkeit in den Handgelenken, kreuz die Arme vor der Brust und leg die Hände von oben auf die Stange.", en: "If your wrists are not mobile enough, cross your arms in front of your chest and place your hands on top of the bar." }
  },
  "zercher-squat": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg die Stange im Rack etwa auf Bauchhöhe ab. Schieb die Armbeugen unter die Stange, die Hände zeigen nach oben und sind zu Fäusten geschlossen. Heb die Stange heraus und stell die Füße etwa schulterbreit." },
        { titel: "Senken", text: "Atme ein und spann den Rumpf an. Senk dich, bis die Ellbogen zwischen den Knien oder knapp über den Oberschenkeln sind. Die Stange bleibt dicht am Körper." },
        { titel: "Hoch", text: "Drück dich nach oben und atme oben aus. Der obere Rücken bleibt gerade." }
      ],
      en: [
        { titel: "Setup", text: "Set the bar in the rack at about belly height. Slide the crooks of your elbows under the bar, hands pointing up and closed into fists. Lift the bar out and place your feet about shoulder width apart." },
        { titel: "Lower", text: "Breathe in and brace your core. Lower yourself until your elbows are between your knees or just above your thighs. The bar stays close to your body." },
        { titel: "Up", text: "Push up and breathe out at the top. Your upper back stays straight." }
      ]
    },
    fehler: { de: "Der obere Rücken wird rund, und die Stange wandert vom Körper weg.", en: "Your upper back rounds and the bar drifts away from your body." },
    tipp: { de: "Die Stange drückt in den Armbeugen. Ein Polster oder ein Handtuch um die Stange hilft.", en: "The bar presses into the crooks of your elbows. A pad or a towel around the bar helps." }
  },
  "hack-squat-mit-langhantel": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell dich mit dem Rücken zur Stange, die Füße etwa schulterbreit. Geh in die Hocke und greif die Stange hinter den Beinen im Obergriff, die Hände neben den Beinen. Der Rücken ist gerade, die Brust oben." },
        { titel: "Hoch", text: "Atme ein und spann den Rumpf an. Streck Knie und Hüfte und steh auf. Die Stange gleitet an der Rückseite der Beine nach oben. Atme oben aus." },
        { titel: "Senken", text: "Beug die Knie und senk die Stange kontrolliert an den Beinen entlang zurück zum Boden." }
      ],
      en: [
        { titel: "Setup", text: "Stand with your back to the bar, feet about shoulder width apart. Squat down and grip the bar behind your legs overhand, hands beside your legs. Your back is straight and your chest is up." },
        { titel: "Up", text: "Breathe in and brace your core. Straighten your knees and hips and stand up. The bar glides up the back of your legs. Breathe out at the top." },
        { titel: "Lower", text: "Bend your knees and lower the bar under control along your legs back to the floor." }
      ]
    },
    fehler: { de: "Die Hüfte schießt zuerst hoch, und der Rücken wird rund.", en: "Your hips shoot up first and your back rounds." },
    sicherheit: { de: "Der Rücken bleibt gerade. Nimm am Anfang wenig Gewicht, die Übung belastet den unteren Rücken.", en: "Your back stays straight. Use little weight at first, the exercise loads the lower back." },
    tipp: { de: "Kleine Scheiben unter den Fersen machen es leichter, aufrecht zu bleiben.", en: "Small plates under your heels make it easier to stay upright." }
  },
  "goblet-squat": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Halt eine Kurzhantel senkrecht vor der Brust, beide Hände unter der oberen Scheibe. Die Ellbogen zeigen nach unten. Stell die Füße etwa schulterbreit, die Zehen leicht nach außen." },
        { titel: "Senken", text: "Senk dich zwischen die Knie und atme ein. Die Ellbogen gehen innen an den Knien vorbei, die Brust bleibt oben." },
        { titel: "Hoch", text: "Drück dich durch den ganzen Fuß nach oben und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Hold a dumbbell vertically in front of your chest, both hands under the upper plate. Your elbows point down. Place your feet about shoulder width apart, toes slightly out." },
        { titel: "Lower", text: "Lower yourself between your knees and breathe in. Your elbows pass inside your knees and your chest stays up." },
        { titel: "Up", text: "Push up through your whole foot and breathe out." }
      ]
    },
    fehler: { de: "Die Hantel wandert von der Brust weg, und der Oberkörper kippt nach vorn.", en: "The dumbbell drifts away from your chest and your torso tips forward." }
  },
  "heel-elevated-goblet-squat": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Fersen auf einen Keil oder auf zwei Scheiben, die Fußballen stehen am Boden. Die Füße sind etwa hüftbreit. Halt die Hantel senkrecht vor der Brust." },
        { titel: "Senken", text: "Senk dich gerade nach unten und atme ein. Die Knie schieben weit nach vorn über die Zehen, der Oberkörper bleibt aufrecht." },
        { titel: "Hoch", text: "Drück dich nach oben und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Place your heels on a wedge or on two plates, with the balls of your feet on the floor. Your feet are about hip width apart. Hold the dumbbell vertically in front of your chest." },
        { titel: "Lower", text: "Lower yourself straight down and breathe in. Your knees travel far forward over your toes and your torso stays upright." },
        { titel: "Up", text: "Push up and breathe out." }
      ]
    },
    fehler: { de: "Du schiebst die Hüfte nach hinten wie bei der normalen Kniebeuge. Die Knie gehen nach vorn.", en: "You push your hips back as in a regular squat. The knees go forward." },
    sicherheit: { de: "Die Erhöhung muss rutschfest liegen und für beide Fersen gleich hoch sein.", en: "The elevation must not slip and must be the same height for both heels." }
  },
  "dumbbell-split-squat": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Nimm in jede Hand eine Hantel. Stell einen Fuß eine große Schrittlänge vor den anderen, die Füße sind hüftbreit auseinander. Die hintere Ferse ist oben." },
        { titel: "Senken", text: "Beug beide Knie und senk dich gerade nach unten, bis das hintere Knie fast den Boden berührt. Atme dabei ein." },
        { titel: "Hoch", text: "Drück dich mit dem vorderen Fuß nach oben und atme aus. Die Füße bleiben stehen. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Take a dumbbell in each hand. Place one foot a long stride in front of the other, feet hip width apart. Your back heel is raised." },
        { titel: "Lower", text: "Bend both knees and lower yourself straight down until your back knee almost touches the floor. Breathe in." },
        { titel: "Up", text: "Push up with your front foot and breathe out. Your feet stay where they are. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du schiebst dich nach vorn statt nach unten, und die vordere Ferse hebt ab.", en: "You shift forward instead of down and your front heel lifts." }
  },
  "walking-dumbbell-lunge": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Nimm in jede Hand eine Hantel und steh aufrecht. Vor dir ist eine freie Strecke." },
        { titel: "Schritt und senken", text: "Mach einen großen Schritt nach vorn. Senk dich, bis das hintere Knie fast den Boden berührt, und atme ein." },
        { titel: "Weitergehen", text: "Drück dich mit dem vorderen Fuß hoch und atme aus. Bring das hintere Bein nach vorn in den nächsten Schritt." }
      ],
      en: [
        { titel: "Setup", text: "Take a dumbbell in each hand and stand upright. You have a clear stretch of floor in front of you." },
        { titel: "Step and lower", text: "Take a long step forward. Lower yourself until your back knee almost touches the floor and breathe in." },
        { titel: "Keep walking", text: "Push up with your front foot and breathe out. Bring your back leg forward into the next step." }
      ]
    },
    fehler: { de: "Die Schritte werden kurz, und der Oberkörper fällt nach vorn.", en: "Your steps get short and your torso falls forward." },
    tipp: { de: "Wenn das Gleichgewicht fehlt, stell die Füße zwischen zwei Schritten kurz nebeneinander.", en: "If you lack balance, bring your feet together briefly between two steps." }
  },
  "reverse-dumbbell-lunge": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Nimm in jede Hand eine Hantel und steh aufrecht, die Füße hüftbreit." },
        { titel: "Schritt und senken", text: "Mach mit einem Bein einen großen Schritt nach hinten und setz den Fußballen auf. Senk dich, bis das hintere Knie fast den Boden berührt, und atme ein." },
        { titel: "Zurück", text: "Drück dich mit dem vorderen Fuß hoch, stell das hintere Bein wieder nach vorn und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Take a dumbbell in each hand and stand upright, feet hip width apart." },
        { titel: "Step and lower", text: "Take a long step back with one leg and set down the ball of your foot. Lower yourself until your back knee almost touches the floor and breathe in." },
        { titel: "Return", text: "Push up with your front foot, bring your back leg forward again and breathe out." }
      ]
    },
    fehler: { de: "Du stößt dich mit dem hinteren Fuß ab. Das vordere Bein macht die Arbeit.", en: "You push off with your back foot. The front leg does the work." }
  },
  "forward-dumbbell-lunge": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Nimm in jede Hand eine Hantel und steh aufrecht, die Füße hüftbreit." },
        { titel: "Schritt und senken", text: "Mach einen großen Schritt nach vorn und setz den Fuß flach auf. Senk dich, bis das hintere Knie fast den Boden berührt, und atme ein." },
        { titel: "Zurück", text: "Drück dich mit dem vorderen Fuß kräftig zurück in den Stand und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Take a dumbbell in each hand and stand upright, feet hip width apart." },
        { titel: "Step and lower", text: "Take a long step forward and set your foot down flat. Lower yourself until your back knee almost touches the floor and breathe in." },
        { titel: "Return", text: "Push back hard with your front foot to the standing position and breathe out." }
      ]
    },
    fehler: { de: "Der Schritt ist zu kurz, und das vordere Knie fällt nach innen.", en: "The step is too short and your front knee caves in." }
  },
  "barbell-lunge": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg die Stange im Rack auf den oberen Rücken, heb sie heraus und geh zwei Schritte zurück. Die Füße stehen hüftbreit." },
        { titel: "Schritt und senken", text: "Mach einen großen Schritt nach vorn oder nach hinten. Senk dich, bis das hintere Knie fast den Boden berührt, und atme ein. Der Oberkörper bleibt aufrecht." },
        { titel: "Zurück", text: "Drück dich mit dem vorderen Fuß zurück in den Stand und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Rest the bar on your upper back in the rack, lift it out and take two steps back. Your feet are hip width apart." },
        { titel: "Step and lower", text: "Take a long step forward or back. Lower yourself until your back knee almost touches the floor and breathe in. Your torso stays upright." },
        { titel: "Return", text: "Push back with your front foot to the standing position and breathe out." }
      ]
    },
    fehler: { de: "Die Füße stehen auf einer Linie, und du schwankst zur Seite.", en: "Your feet are on one line and you sway to the side." },
    sicherheit: { de: "Fang mit wenig Gewicht an. Wenn du das Gleichgewicht verlierst, lässt sich die Stange schlecht ablegen.", en: "Start with little weight. If you lose your balance, the bar is hard to put down." },
    tipp: { de: "Rückwärts ist stabiler und für den Einstieg die bessere Wahl.", en: "Stepping back is more stable and the better choice to start with." }
  },
  "dumbbell-step-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell dich mit einer Hantel in jeder Hand vor eine Kiste, die etwa kniehoch ist. Setz einen Fuß ganz auf die Kiste." },
        { titel: "Hochsteigen", text: "Drück dich mit dem oberen Bein hoch, bis es gestreckt ist, und atme aus. Der Oberkörper bleibt aufrecht." },
        { titel: "Absteigen", text: "Senk dich langsam mit demselben Bein, bis der andere Fuß den Boden berührt, und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Stand in front of a box about knee height with a dumbbell in each hand. Place one whole foot on the box." },
        { titel: "Step up", text: "Push up with the top leg until it is straight and breathe out. Your torso stays upright." },
        { titel: "Step down", text: "Lower yourself slowly with the same leg until the other foot touches the floor and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du stößt dich mit dem unteren Fuß vom Boden ab.", en: "You push off the floor with your bottom foot." },
    sicherheit: { de: "Die Kiste muss fest stehen und darf nicht rutschen.", en: "The box must stand firmly and must not slip." }
  },
  "bodyweight-squat": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Füße etwa schulterbreit, die Zehen zeigen leicht nach außen. Streck die Arme nach vorn oder verschränk sie vor der Brust." },
        { titel: "Senken", text: "Beug Hüfte und Knie gleichzeitig und senk dich, bis die Oberschenkel mindestens waagerecht sind. Atme dabei ein. Die Knie zeigen in Richtung der Zehen." },
        { titel: "Hoch", text: "Drück dich durch den ganzen Fuß nach oben und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Place your feet about shoulder width apart, toes pointing slightly out. Stretch your arms forward or cross them in front of your chest." },
        { titel: "Lower", text: "Bend your hips and knees at the same time and lower yourself until your thighs are at least horizontal. Breathe in. Your knees point in the direction of your toes." },
        { titel: "Up", text: "Push up through your whole foot and breathe out." }
      ]
    },
    fehler: { de: "Die Fersen heben ab, oder die Knie fallen nach innen.", en: "Your heels lift, or your knees cave in." }
  },
  "tempo-squat": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Füße etwa schulterbreit, die Zehen zeigen leicht nach außen." },
        { titel: "Langsam senken", text: "Senk dich gleichmäßig über drei bis vier Sekunden, bis die Oberschenkel mindestens waagerecht sind. Atme dabei ein." },
        { titel: "Hoch", text: "Drück dich in normalem Tempo nach oben und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Place your feet about shoulder width apart, toes pointing slightly out." },
        { titel: "Lower slowly", text: "Lower yourself evenly over three to four seconds until your thighs are at least horizontal. Breathe in." },
        { titel: "Up", text: "Push up at normal speed and breathe out." }
      ]
    },
    fehler: { de: "Du zählst zu schnell, oder die letzten Zentimeter fallen plötzlich.", en: "You count too fast, or you drop through the last few centimeters." },
    tipp: { de: "Zähl still mit, zum Beispiel „einundzwanzig, zweiundzwanzig, dreiundzwanzig“.", en: "Count silently, for example \"one thousand one, one thousand two, one thousand three\"." }
  },
  "pause-squat": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Füße etwa schulterbreit, die Zehen zeigen leicht nach außen." },
        { titel: "Senken und halten", text: "Senk dich kontrolliert und atme ein. Halt am tiefsten Punkt ein bis zwei Sekunden. Der Rumpf bleibt angespannt, die Brust oben." },
        { titel: "Hoch", text: "Drück dich aus dem Stillstand nach oben und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Place your feet about shoulder width apart, toes pointing slightly out." },
        { titel: "Lower and hold", text: "Lower yourself under control and breathe in. Hold at the lowest point for one to two seconds. Your core stays tight and your chest stays up." },
        { titel: "Up", text: "Push up from a dead stop and breathe out." }
      ]
    },
    fehler: { de: "Du lässt in der Pause locker, und der untere Rücken wird rund.", en: "You relax during the pause and your lower back rounds." }
  },
  "jump-squat": {
    schritte: {
      de: [
        { titel: "Senken", text: "Stell die Füße etwa schulterbreit. Geh zügig in die Kniebeuge, etwa bis die Oberschenkel waagerecht sind, und atme ein." },
        { titel: "Springen", text: "Drück dich explosiv ab und spring gerade nach oben. Atme dabei aus." },
        { titel: "Landen", text: "Lande weich auf dem Vorfuß, roll auf den ganzen Fuß ab und geh direkt in die nächste Kniebeuge." }
      ],
      en: [
        { titel: "Lower", text: "Place your feet about shoulder width apart. Drop quickly into the squat, to about thighs horizontal, and breathe in." },
        { titel: "Jump", text: "Push off explosively and jump straight up. Breathe out." },
        { titel: "Land", text: "Land softly on the balls of your feet, roll onto your whole foot and go straight into the next squat." }
      ]
    },
    fehler: { de: "Du landest hart mit fast gestreckten Knien, oder die Knie fallen bei der Landung nach innen.", en: "You land hard with your knees almost straight, or your knees cave in on landing." },
    sicherheit: { de: "Spring auf einem festen, rutschfesten Boden. Hör auf, wenn die Landungen unsauber werden.", en: "Jump on a firm, non-slip floor. Stop when your landings get sloppy." }
  },
  "cyclist-squat": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Fersen auf einen Keil oder eine dicke Scheibe. Die Füße sind nur etwa eine Handbreit auseinander. Steh aufrecht." },
        { titel: "Senken", text: "Senk dich gerade nach unten, so tief es sauber geht, und atme ein. Die Knie schieben weit über die Zehen, der Oberkörper bleibt aufrecht." },
        { titel: "Hoch", text: "Drück dich nach oben und atme aus. Streck die Knie oben nicht ganz durch." }
      ],
      en: [
        { titel: "Setup", text: "Place your heels on a wedge or a thick plate. Your feet are only about a hand's width apart. Stand upright." },
        { titel: "Lower", text: "Lower yourself straight down, as deep as you can with good form, and breathe in. Your knees travel far over your toes and your torso stays upright." },
        { titel: "Up", text: "Push up and breathe out. Do not lock your knees at the top." }
      ]
    },
    fehler: { de: "Die Hüfte geht nach hinten, und der Oberkörper neigt sich vor.", en: "Your hips go back and your torso leans forward." },
    sicherheit: { de: "Die Erhöhung muss rutschfest liegen. Steigere Tiefe und Wiederholungen langsam, die Knie werden stark gebeugt.", en: "The elevation must not slip. Increase depth and reps slowly, your knees bend a long way." }
  },
  "sissy-squat-eigen": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Füße hüftbreit und halt dich mit einer Hand an etwas Festem fest. Geh auf die Fußballen." },
        { titel: "Senken", text: "Schieb die Knie nach vorn in Richtung Boden und lehn den Oberkörper zurück. Knie, Hüfte und Schultern bleiben auf einer Linie. Atme dabei ein." },
        { titel: "Hoch", text: "Drück dich über die Fußballen zurück nach oben und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Place your feet hip width apart and hold on to something solid with one hand. Rise onto the balls of your feet." },
        { titel: "Lower", text: "Push your knees forward toward the floor and lean your torso back. Your knees, hips and shoulders stay in one line. Breathe in." },
        { titel: "Up", text: "Push back up through the balls of your feet and breathe out." }
      ]
    },
    fehler: { de: "Die Hüfte knickt ein, und es wird eine normale Kniebeuge.", en: "Your hips bend and it becomes a regular squat." },
    sicherheit: { de: "Die Knie werden stark belastet. Geh am Anfang nur ein kleines Stück nach unten und hör bei Schmerzen im Knie auf.", en: "This puts a lot of load on the knees. Go down only a little at first and stop if your knee hurts." }
  },
  "split-squat": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell einen Fuß eine große Schrittlänge vor den anderen, die Füße sind hüftbreit auseinander. Die hintere Ferse ist oben, die Hände sind an der Hüfte." },
        { titel: "Senken", text: "Beug beide Knie und senk dich gerade nach unten, bis das hintere Knie fast den Boden berührt. Atme dabei ein." },
        { titel: "Hoch", text: "Drück dich mit dem vorderen Fuß nach oben und atme aus. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Place one foot a long stride in front of the other, feet hip width apart. Your back heel is raised and your hands are on your hips." },
        { titel: "Lower", text: "Bend both knees and lower yourself straight down until your back knee almost touches the floor. Breathe in." },
        { titel: "Up", text: "Push up with your front foot and breathe out. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Der Oberkörper fällt nach vorn, und die vordere Ferse hebt ab.", en: "Your torso falls forward and your front heel lifts." }
  },
  "bulgarian-split-squat-eigen": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell dich etwa eine große Schrittlänge vor eine Bank und leg den Spann eines Fußes hinten auf die Bank. Die Hände sind an der Hüfte." },
        { titel: "Senken", text: "Beug das vordere Knie und senk dich gerade nach unten. Atme dabei ein. Das Knie zeigt in Richtung der Zehen." },
        { titel: "Hoch", text: "Drück dich mit dem vorderen Fuß nach oben, bis das Bein fast gestreckt ist, und atme aus. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Stand about a long stride in front of a bench and put the top of one foot on the bench behind you. Your hands are on your hips." },
        { titel: "Lower", text: "Bend your front knee and lower yourself straight down. Breathe in. Your knee points in the direction of your toes." },
        { titel: "Up", text: "Push up with your front foot until your leg is almost straight and breathe out. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du drückst dich mit dem hinteren Bein von der Bank ab.", en: "You push off the bench with your back leg." },
    tipp: { de: "Wenn du schwankst, halt dich mit einer Hand leicht an etwas Festem.", en: "If you wobble, hold on lightly to something solid with one hand." }
  },
  "walking-lunge-eigen": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh aufrecht, die Hände an der Hüfte. Vor dir ist eine freie Strecke." },
        { titel: "Schritt und senken", text: "Mach einen großen Schritt nach vorn. Senk dich, bis das hintere Knie fast den Boden berührt, und atme ein." },
        { titel: "Weitergehen", text: "Drück dich mit dem vorderen Fuß hoch und atme aus. Bring das hintere Bein nach vorn in den nächsten Schritt." }
      ],
      en: [
        { titel: "Setup", text: "Stand upright with your hands on your hips. You have a clear stretch of floor in front of you." },
        { titel: "Step and lower", text: "Take a long step forward. Lower yourself until your back knee almost touches the floor and breathe in." },
        { titel: "Keep walking", text: "Push up with your front foot and breathe out. Bring your back leg forward into the next step." }
      ]
    },
    fehler: { de: "Du setzt die Füße wie auf einem Seil voreinander und schwankst.", en: "You place your feet one in front of the other as if on a tightrope and you sway." }
  },
  "reverse-lunge-eigen": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh aufrecht, die Füße hüftbreit, die Hände an der Hüfte." },
        { titel: "Schritt und senken", text: "Mach mit einem Bein einen großen Schritt nach hinten und setz den Fußballen auf. Senk dich, bis das hintere Knie fast den Boden berührt, und atme ein." },
        { titel: "Zurück", text: "Drück dich mit dem vorderen Fuß hoch, stell das hintere Bein wieder nach vorn und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Stand upright, feet hip width apart, hands on your hips." },
        { titel: "Step and lower", text: "Take a long step back with one leg and set down the ball of your foot. Lower yourself until your back knee almost touches the floor and breathe in." },
        { titel: "Return", text: "Push up with your front foot, bring your back leg forward again and breathe out." }
      ]
    },
    fehler: { de: "Der Schritt nach hinten ist zu kurz. Dann hebt die vordere Ferse ab.", en: "The step back is too short. Then your front heel lifts." }
  },
  "forward-lunge": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh aufrecht, die Füße hüftbreit, die Hände an der Hüfte." },
        { titel: "Schritt und senken", text: "Mach einen großen Schritt nach vorn und setz den Fuß flach auf. Senk dich, bis das hintere Knie fast den Boden berührt, und atme ein." },
        { titel: "Zurück", text: "Drück dich mit dem vorderen Fuß kräftig zurück in den Stand und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Stand upright, feet hip width apart, hands on your hips." },
        { titel: "Step and lower", text: "Take a long step forward and set your foot down flat. Lower yourself until your back knee almost touches the floor and breathe in." },
        { titel: "Return", text: "Push back hard with your front foot to the standing position and breathe out." }
      ]
    },
    fehler: { de: "Das vordere Knie fällt nach innen, oder der Oberkörper kippt nach vorn.", en: "Your front knee caves in, or your torso tips forward." }
  },
  "assisted-pistol-squat": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Halt dich mit beiden Händen an einem Pfosten, an Ringen oder an einem Schlingentrainer. Steh auf einem Bein, das andere ist gestreckt nach vorn gehoben." },
        { titel: "Senken", text: "Senk dich langsam auf dem Standbein, so tief du kannst, und atme ein. Die Ferse bleibt am Boden." },
        { titel: "Hoch", text: "Drück dich mit dem Standbein nach oben und atme aus. Die Arme helfen nur so viel wie nötig. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Hold on with both hands to a post, rings or a suspension trainer. Stand on one leg with the other lifted straight out in front." },
        { titel: "Lower", text: "Lower yourself slowly on your standing leg, as deep as you can, and breathe in. Your heel stays on the floor." },
        { titel: "Up", text: "Push up with your standing leg and breathe out. Your arms help only as much as needed. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du ziehst dich mit den Armen hoch, und das Bein arbeitet kaum.", en: "You pull yourself up with your arms and the leg hardly works." },
    tipp: { de: "Nimm von Woche zu Woche weniger Hilfe aus den Armen.", en: "Use less help from your arms from week to week." }
  },
  "pistol-squat": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh auf einem Bein. Streck das andere Bein und beide Arme nach vorn." },
        { titel: "Senken", text: "Senk dich langsam auf dem Standbein, bis die Hüfte unter Kniehöhe ist. Atme dabei ein. Die Ferse bleibt am Boden, das freie Bein berührt den Boden nicht." },
        { titel: "Hoch", text: "Drück dich durch den ganzen Fuß nach oben und atme aus. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Stand on one leg. Stretch the other leg and both arms out in front." },
        { titel: "Lower", text: "Lower yourself slowly on your standing leg until your hips are below knee height. Breathe in. Your heel stays on the floor and the free leg does not touch the floor." },
        { titel: "Up", text: "Push up through your whole foot and breathe out. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Die Ferse hebt ab, oder das Knie fällt nach innen.", en: "Your heel lifts, or your knee caves in." },
    sicherheit: { de: "Mach die Übung erst, wenn die Variante mit Unterstützung sauber klappt.", en: "Only do this exercise once the assisted version is clean." }
  },
  "shrimp-squat": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh auf einem Bein. Beug das andere Bein nach hinten und halt den Fuß mit der Hand derselben Seite am Gesäß. Streck den freien Arm nach vorn." },
        { titel: "Senken", text: "Senk dich langsam und neig den Oberkörper vor, bis das hintere Knie den Boden leicht berührt. Atme dabei ein." },
        { titel: "Hoch", text: "Drück dich mit dem Standbein nach oben und atme aus. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Stand on one leg. Bend the other leg back and hold the foot against your glutes with the hand on the same side. Stretch your free arm forward." },
        { titel: "Lower", text: "Lower yourself slowly and lean your torso forward until your back knee lightly touches the floor. Breathe in." },
        { titel: "Up", text: "Push up with your standing leg and breathe out. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Das hintere Knie fällt auf den Boden, statt ihn nur zu berühren.", en: "Your back knee drops onto the floor instead of just touching it." },
    sicherheit: { de: "Leg etwas Weiches unter das hintere Knie.", en: "Put something soft under your back knee." }
  }
});
