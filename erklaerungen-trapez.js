// Die Erklärungen der Muskelgruppe Trapez. Sie kommen zu den Einträgen aus der erklaerungen.js dazu,
// deshalb muss diese Datei in der index.html nach der erklaerungen.js stehen. Aufbau wie dort:
// Schlüssel ist die Übungs-ID, pro Übung schritte (2 bis 3) und optional fehler, sicherheit, tipp, alle in de und en.
// Die Datei hat in der index.html und in der sw.js kein ?v=N: Der Service Worker holt sie bei jeder neuen VERSION frisch.
Object.assign(ERKLAERUNGEN, {
  "smith-machine-shrug": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng die Stange etwa auf Höhe der Oberschenkelmitte ein. Stell dich dicht davor, greif sie im Obergriff etwas breiter als schulterbreit und dreh sie aus den Haken. Die Arme sind gestreckt." },
        { titel: "Heben", text: "Zieh die Schultern gerade nach oben in Richtung Ohren und atme aus. Halt oben kurz. Die Arme bleiben gestreckt." },
        { titel: "Senken", text: "Lass die Schultern langsam ganz nach unten sinken und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Set the bar at about mid-thigh height. Stand close in front of it, grip it overhand, a little wider than shoulder width, and rotate it out of the hooks. Your arms are straight." },
        { titel: "Raise", text: "Pull your shoulders straight up toward your ears and breathe out. Hold briefly at the top. Your arms stay straight." },
        { titel: "Lower", text: "Let your shoulders sink slowly all the way down and breathe in." }
      ]
    },
    fehler: { de: "Du kreist mit den Schultern. Die Bewegung geht nur nach oben und unten.", en: "You roll your shoulders. The movement goes only up and down." }
  },
  "standing-machine-shrug": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg die Scheiben auf oder steck den Stift. Stell dich mittig zwischen die Griffe, geh leicht in die Knie und greif sie. Steh auf, die Arme sind gestreckt." },
        { titel: "Heben", text: "Zieh die Schultern gerade nach oben und atme aus. Halt oben kurz." },
        { titel: "Senken", text: "Lass die Schultern langsam ganz nach unten sinken und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Load the plates or set the pin. Stand centered between the handles, bend your knees slightly and grip them. Stand up with your arms straight." },
        { titel: "Raise", text: "Pull your shoulders straight up and breathe out. Hold briefly at the top." },
        { titel: "Lower", text: "Let your shoulders sink slowly all the way down and breathe in." }
      ]
    },
    fehler: { de: "Die Ellbogen beugen sich, und die Arme ziehen mit.", en: "Your elbows bend and your arms help pull." }
  },
  "cable-shrug": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle ganz nach unten und häng eine gerade Stange ein. Greif sie im Obergriff etwa schulterbreit, steh auf und geh einen kleinen Schritt zurück. Die Arme sind gestreckt." },
        { titel: "Heben", text: "Zieh die Schultern nach oben und leicht nach hinten und atme aus. Halt oben kurz." },
        { titel: "Senken", text: "Lass die Schultern langsam sinken und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley all the way down and attach a straight bar. Grip it overhand at about shoulder width, stand up and take a small step back. Your arms are straight." },
        { titel: "Raise", text: "Pull your shoulders up and slightly back and breathe out. Hold briefly at the top." },
        { titel: "Lower", text: "Let your shoulders sink slowly and breathe in." }
      ]
    },
    fehler: { de: "Du lehnst dich zurück und ziehst mit dem ganzen Körper.", en: "You lean back and pull with your whole body." }
  },
  "single-arm-cable-shrug": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle ganz nach unten und häng einen einzelnen Griff ein. Stell dich seitlich zur Rolle und greif ihn mit der Hand, die der Rolle näher ist. Geh einen kleinen Schritt zur Seite weg, der Arm ist gestreckt." },
        { titel: "Heben", text: "Zieh die Schulter nach oben in Richtung Ohr und atme aus. Halt oben kurz." },
        { titel: "Senken", text: "Lass die Schulter langsam sinken und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley all the way down and attach a single handle. Stand side-on to the pulley and grip it with the hand closer to the pulley. Take a small step sideways away from it with your arm straight." },
        { titel: "Raise", text: "Pull your shoulder up toward your ear and breathe out. Hold briefly at the top." },
        { titel: "Lower", text: "Let your shoulder sink slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du neigst den Kopf oder den Oberkörper zur Seite, statt die Schulter zu heben.", en: "You tilt your head or your torso to the side instead of raising your shoulder." }
  },
  "machine-cheat-shrug": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell dich zwischen die Griffe der Shrug-Maschine und greif sie. Steh aufrecht, die Arme sind gestreckt, die Knie sind leicht gebeugt." },
        { titel: "Mit Schwung heben", text: "Streck die Knie kurz und kräftig und zieh im selben Moment die Schultern nach oben. Atme dabei aus." },
        { titel: "Langsam senken", text: "Lass die Schultern über zwei bis drei Sekunden nach unten sinken und atme ein. Beug die Knie wieder leicht." }
      ],
      en: [
        { titel: "Setup", text: "Stand between the handles of the shrug machine and grip them. Stand upright with your arms straight and your knees slightly bent." },
        { titel: "Raise with momentum", text: "Straighten your knees briefly and forcefully and pull your shoulders up at the same moment. Breathe out." },
        { titel: "Lower slowly", text: "Let your shoulders sink over two to three seconds and breathe in. Bend your knees slightly again." }
      ]
    },
    fehler: { de: "Du lässt das Gewicht nach dem Schwung fallen. Der langsame Weg nach unten ist der Sinn der Übung.", en: "You let the weight drop after the drive. The slow way down is the point of the exercise." },
    sicherheit: { de: "Der Schwung kommt nur aus den Knien. Der Rücken bleibt gerade und ruhig.", en: "The momentum comes only from your knees. Your back stays straight and still." }
  },
  "smith-machine-cheat-shrug": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng die Stange etwa auf Höhe der Oberschenkelmitte ein. Greif sie im Obergriff etwas breiter als schulterbreit und dreh sie aus den Haken. Die Knie sind leicht gebeugt." },
        { titel: "Mit Schwung heben", text: "Streck die Knie kurz und kräftig und zieh im selben Moment die Schultern nach oben. Atme dabei aus." },
        { titel: "Langsam senken", text: "Lass die Schultern über zwei bis drei Sekunden sinken und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Set the bar at about mid-thigh height. Grip it overhand, a little wider than shoulder width, and rotate it out of the hooks. Your knees are slightly bent." },
        { titel: "Raise with momentum", text: "Straighten your knees briefly and forcefully and pull your shoulders up at the same moment. Breathe out." },
        { titel: "Lower slowly", text: "Let your shoulders sink over two to three seconds and breathe in." }
      ]
    },
    fehler: { de: "Die Ellbogen beugen sich, und es wird ein aufrechtes Rudern.", en: "Your elbows bend and it becomes an upright row." },
    sicherheit: { de: "Der Rücken bleibt gerade. Steigere das Gewicht in kleinen Schritten.", en: "Your back stays straight. Increase the weight in small steps." }
  },
  "pin-loaded-row-machine-kelso-shrug": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Stell Sitz und Brustpolster wie zum Rudern ein und steck den Stift. Greif die Griffe, die Arme sind gestreckt, die Brust liegt am Polster." },
        { titel: "Zusammenziehen", text: "Zieh die Schulterblätter nach hinten zusammen, ohne die Ellbogen zu beugen. Atme dabei aus und halt kurz." },
        { titel: "Zurück", text: "Lass die Schulterblätter langsam auseinandergehen, bis die Schultern nach vorn gezogen werden. Atme dabei ein." }
      ],
      en: [
        { titel: "Set up", text: "Adjust the seat and chest pad as for rowing and set the pin. Grip the handles with your arms straight and your chest on the pad." },
        { titel: "Squeeze together", text: "Pull your shoulder blades back and together without bending your elbows. Breathe out and hold briefly." },
        { titel: "Return", text: "Let your shoulder blades move apart slowly until your shoulders are pulled forward. Breathe in." }
      ]
    },
    fehler: { de: "Die Ellbogen beugen sich, und es wird ein kurzes Rudern.", en: "Your elbows bend and it becomes a short row." }
  },
  "t-bar-kelso-shrug": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Leg die Scheiben auf, stell dich auf die Fußplatte und leg die Brust auf das Polster. Greif die Griffe und heb das Gewicht aus der Ablage. Die Arme sind gestreckt." },
        { titel: "Zusammenziehen", text: "Zieh die Schulterblätter zusammen und leicht nach oben, ohne die Ellbogen zu beugen. Atme dabei aus und halt kurz." },
        { titel: "Zurück", text: "Lass die Schulterblätter langsam auseinandergehen und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Load the plates, step onto the footplate and rest your chest on the pad. Grip the handles and lift the weight off the rest. Your arms are straight." },
        { titel: "Squeeze together", text: "Pull your shoulder blades together and slightly up without bending your elbows. Breathe out and hold briefly." },
        { titel: "Return", text: "Let your shoulder blades move apart slowly and breathe in." }
      ]
    },
    fehler: { de: "Die Brust löst sich vom Polster.", en: "Your chest comes off the pad." }
  },
  "seated-cable-kelso-shrug": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz dich an den Ruderzug, die Füße stehen auf der Fußplatte, die Knie sind leicht gebeugt. Greif den Griff mit gestreckten Armen und sitz aufrecht." },
        { titel: "Zusammenziehen", text: "Zieh die Schulterblätter nach hinten zusammen, ohne die Ellbogen zu beugen. Atme dabei aus und halt kurz." },
        { titel: "Zurück", text: "Lass die Schultern langsam nach vorn ziehen und atme ein. Der Oberkörper bleibt ruhig." }
      ],
      en: [
        { titel: "Setup", text: "Sit at the cable row with your feet on the footplate and your knees slightly bent. Grip the handle with your arms straight and sit upright." },
        { titel: "Squeeze together", text: "Pull your shoulder blades back and together without bending your elbows. Breathe out and hold briefly." },
        { titel: "Return", text: "Let your shoulders be pulled forward slowly and breathe in. Your torso stays still." }
      ]
    },
    fehler: { de: "Du lehnst dich zurück, statt nur die Schulterblätter zu bewegen.", en: "You lean back instead of moving only your shoulder blades." }
  },
  "barbell-shrug": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Nimm die Stange aus dem Rack auf Höhe der Oberschenkelmitte. Greif sie im Obergriff etwas breiter als schulterbreit und steh aufrecht. Die Arme sind gestreckt." },
        { titel: "Heben", text: "Zieh die Schultern gerade nach oben in Richtung Ohren und atme aus. Halt oben kurz." },
        { titel: "Senken", text: "Lass die Schultern langsam ganz nach unten sinken und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Take the bar from the rack at mid-thigh height. Grip it overhand, a little wider than shoulder width, and stand upright. Your arms are straight." },
        { titel: "Raise", text: "Pull your shoulders straight up toward your ears and breathe out. Hold briefly at the top." },
        { titel: "Lower", text: "Let your shoulders sink slowly all the way down and breathe in." }
      ]
    },
    fehler: { de: "Der Kopf schiebt nach vorn, oder du kreist mit den Schultern.", en: "Your head pokes forward, or you roll your shoulders." },
    tipp: { de: "Wenn der Griff vor dem Trapez nachgibt, helfen Zughilfen.", en: "If your grip gives out before your traps do, lifting straps help." }
  },
  "dumbbell-shrug": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh aufrecht mit einer Hantel in jeder Hand. Die Arme hängen seitlich, die Handflächen zeigen zum Körper." },
        { titel: "Heben", text: "Zieh die Schultern gerade nach oben und atme aus. Halt oben kurz." },
        { titel: "Senken", text: "Lass die Schultern langsam ganz nach unten sinken und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Stand upright with a dumbbell in each hand. Your arms hang at your sides, palms facing your body." },
        { titel: "Raise", text: "Pull your shoulders straight up and breathe out. Hold briefly at the top." },
        { titel: "Lower", text: "Let your shoulders sink slowly all the way down and breathe in." }
      ]
    },
    fehler: { de: "Die Ellbogen beugen sich, und der Bizeps hilft mit.", en: "Your elbows bend and the biceps help." }
  },
  "behind-the-back-barbell-shrug": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg die Stange im Rack etwa auf Höhe der Gesäßfalte ab. Stell dich mit dem Rücken davor und greif sie hinter dem Körper im Obergriff etwa schulterbreit. Heb sie heraus und steh aufrecht." },
        { titel: "Heben", text: "Zieh die Schultern nach oben und leicht nach hinten und atme aus. Die Stange gleitet am Gesäß entlang." },
        { titel: "Senken", text: "Lass die Schultern langsam sinken und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Set the bar in the rack at about the height of the crease below your glutes. Stand with your back to it and grip it behind your body overhand at about shoulder width. Lift it out and stand upright." },
        { titel: "Raise", text: "Pull your shoulders up and slightly back and breathe out. The bar glides along your glutes." },
        { titel: "Lower", text: "Let your shoulders sink slowly and breathe in." }
      ]
    },
    fehler: { de: "Du beugst dich nach vorn, damit die Stange am Gesäß vorbeikommt.", en: "You lean forward so the bar clears your glutes." },
    tipp: { de: "An der Multipresse geht die Übung leichter, weil die Stange geführt ist.", en: "The exercise is easier on the Smith machine because the bar is guided." }
  },
  "incline-dumbbell-shrug": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Bank auf etwa 30 bis 45°. Leg dich bäuchlings darauf, die Brust liegt am Polster, die Füße stehen am Boden. Die Arme hängen mit den Hanteln gerade nach unten." },
        { titel: "Heben", text: "Zieh die Schultern in Richtung Ohren und die Schulterblätter zusammen. Atme dabei aus und halt kurz. Die Arme bleiben gestreckt." },
        { titel: "Senken", text: "Lass die Schultern langsam sinken und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Set the bench to about 30 to 45°. Lie face down on it with your chest on the pad and your feet on the floor. Your arms hang straight down with the dumbbells." },
        { titel: "Raise", text: "Pull your shoulders toward your ears and your shoulder blades together. Breathe out and hold briefly. Your arms stay straight." },
        { titel: "Lower", text: "Let your shoulders sink slowly and breathe in." }
      ]
    },
    fehler: { de: "Der Kopf geht in den Nacken, und die Brust löst sich vom Polster.", en: "Your head tips back and your chest comes off the pad." }
  },
  "farmers-walk": {
    schritte: {
      de: [
        { titel: "Aufnehmen", text: "Stell zwei Hanteln oder Kettlebells neben die Füße. Geh mit geradem Rücken in die Knie, greif sie und steh auf." },
        { titel: "Gehen", text: "Geh mit kleinen, zügigen Schritten. Die Schultern sind hinten unten, der Blick geht nach vorn. Atme ruhig weiter." },
        { titel: "Abstellen", text: "Stell die Gewichte nach der Strecke mit geradem Rücken kontrolliert ab." }
      ],
      en: [
        { titel: "Pick up", text: "Place two dumbbells or kettlebells beside your feet. Bend your knees with a straight back, grip them and stand up." },
        { titel: "Walk", text: "Walk with small, brisk steps. Your shoulders are back and down and you look ahead. Keep breathing steadily." },
        { titel: "Set down", text: "After the distance, set the weights down under control with a straight back." }
      ]
    },
    fehler: { de: "Die Schultern fallen nach vorn, und der obere Rücken wird rund.", en: "Your shoulders fall forward and your upper back rounds." },
    sicherheit: { de: "Achte auf einen freien Weg. Stell die Gewichte ab, bevor der Griff ganz aufgeht.", en: "Make sure your path is clear. Set the weights down before your grip opens completely." }
  },
  "trap-bar-carry": {
    schritte: {
      de: [
        { titel: "Aufnehmen", text: "Stell dich in die beladene Trap Bar. Geh mit geradem Rücken in die Knie, greif die Griffe und steh auf." },
        { titel: "Gehen", text: "Geh mit kleinen, ruhigen Schritten. Der Oberkörper ist aufrecht, die Schultern sind hinten unten. Atme ruhig weiter." },
        { titel: "Abstellen", text: "Bleib stehen, bis die Stange nicht mehr schwingt, und setz sie mit geradem Rücken ab." }
      ],
      en: [
        { titel: "Pick up", text: "Step into the loaded trap bar. Bend your knees with a straight back, grip the handles and stand up." },
        { titel: "Walk", text: "Walk with small, steady steps. Your torso is upright and your shoulders are back and down. Keep breathing steadily." },
        { titel: "Set down", text: "Stand still until the bar stops swinging and set it down with a straight back." }
      ]
    },
    fehler: { de: "Die Stange schaukelt vor und zurück, weil die Schritte zu groß sind.", en: "The bar rocks back and forth because your steps are too long." },
    sicherheit: { de: "Achte auf einen freien Weg und stell rechtzeitig ab.", en: "Make sure your path is clear and set the bar down in time." }
  },
  "high-pull": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh hüftbreit und greif die Stange im Obergriff etwas breiter als schulterbreit. Beug Knie und Hüfte leicht, die Stange hängt knapp über den Knien. Der Rücken ist gerade." },
        { titel: "Ziehen", text: "Streck Knie und Hüfte explosiv und zieh die Schultern hoch. Führ die Ellbogen nach oben außen, bis die Stange etwa auf Brusthöhe ist. Atme dabei aus." },
        { titel: "Absenken", text: "Lass die Stange kontrolliert zurück in die Ausgangsposition und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Stand with your feet hip width apart and grip the bar overhand, a little wider than shoulder width. Bend your knees and hips slightly so the bar hangs just above your knees. Your back is straight." },
        { titel: "Pull", text: "Extend your knees and hips explosively and shrug your shoulders up. Drive your elbows up and out until the bar is at about chest height. Breathe out." },
        { titel: "Lower", text: "Let the bar return under control to the starting position and breathe in." }
      ]
    },
    fehler: { de: "Du ziehst nur mit den Armen. Der Schwung kommt aus Beinen und Hüfte.", en: "You pull only with your arms. The drive comes from your legs and hips." },
    sicherheit: { de: "Lern die Bewegung mit der leeren Stange. Die Stange bleibt nah am Körper.", en: "Learn the movement with the empty bar. The bar stays close to your body." }
  },
  "barbell-upright-row": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh aufrecht und greif die Stange im Obergriff etwa schulterbreit. Sie hängt vor den Oberschenkeln." },
        { titel: "Hochziehen", text: "Zieh die Ellbogen nach oben außen und die Stange dicht am Körper bis etwa zur unteren Brust. Atme dabei aus. Die Ellbogen sind höher als die Hände." },
        { titel: "Absenken", text: "Lass die Stange langsam ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Stand upright and grip the bar overhand at about shoulder width. It hangs in front of your thighs." },
        { titel: "Pull up", text: "Pull your elbows up and out and the bar close along your body to about your lower chest. Breathe out. Your elbows are higher than your hands." },
        { titel: "Lower", text: "Lower the bar slowly and breathe in." }
      ]
    },
    fehler: { de: "Du greifst sehr eng und ziehst die Stange bis zum Kinn.", en: "You grip very close and pull the bar up to your chin." },
    sicherheit: { de: "Zieh die Ellbogen nicht über Schulterhöhe. Wenn es in der Schulter zwickt, greif breiter oder lass die Übung weg.", en: "Do not pull your elbows above shoulder height. If you feel a pinch in your shoulder, grip wider or skip the exercise." }
  },
  "dumbbell-upright-row": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh aufrecht mit einer Hantel in jeder Hand vor den Oberschenkeln. Die Handrücken zeigen nach vorn." },
        { titel: "Hochziehen", text: "Zieh die Ellbogen nach oben außen, bis sie etwa auf Schulterhöhe sind. Atme dabei aus. Die Hanteln bleiben nah am Körper." },
        { titel: "Absenken", text: "Lass die Hanteln langsam ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Stand upright with a dumbbell in each hand in front of your thighs. The backs of your hands face forward." },
        { titel: "Pull up", text: "Pull your elbows up and out until they are at about shoulder height. Breathe out. The dumbbells stay close to your body." },
        { titel: "Lower", text: "Lower the dumbbells slowly and breathe in." }
      ]
    },
    fehler: { de: "Du schwingst die Hanteln hoch und lehnst dich zurück.", en: "You swing the dumbbells up and lean back." },
    sicherheit: { de: "Zieh die Ellbogen nicht über Schulterhöhe.", en: "Do not pull your elbows above shoulder height." }
  }
});
