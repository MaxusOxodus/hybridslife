// Die Erklärungen der Muskelgruppe Trizeps. Sie kommen zu den Einträgen aus der erklaerungen.js dazu,
// deshalb muss diese Datei in der index.html nach der erklaerungen.js stehen. Aufbau wie dort:
// Schlüssel ist die Übungs-ID, pro Übung schritte (2 bis 3) und optional fehler, sicherheit, tipp, alle in de und en.
// Die Datei hat in der index.html und in der sw.js kein ?v=N: Der Service Worker holt sie bei jeder neuen VERSION frisch.
Object.assign(ERKLAERUNGEN, {
  "enges-bankdruecken-multi": {
    schritte: {
      de: [
        { titel: "Bank ausrichten", text: "Schieb die Bank so unter die Stange, dass diese an der unteren Brust ankommt, und stell die Stopper ein. Greif die Stange etwa schulterbreit." },
        { titel: "Absenken", text: "Dreh die Stange aus den Haken und senk sie kontrolliert. Atme dabei ein. Die Ellbogen bleiben eng am Körper." },
        { titel: "Drücken", text: "Drück die Stange nach oben, streck die Arme oben fast ganz und atme aus. Dreh sie am Ende zurück in die Haken." }
      ],
      en: [
        { titel: "Position the bench", text: "Slide the bench under the bar so the bar meets your lower chest, and set the safety stops. Grip the bar at about shoulder width." },
        { titel: "Lower", text: "Rotate the bar out of the hooks and lower it under control. Breathe in. Your elbows stay close to your body." },
        { titel: "Press", text: "Press the bar up, straighten your arms almost fully at the top and breathe out. At the end, rotate it back into the hooks." }
      ]
    },
    fehler: { de: "Die Ellbogen gehen nach außen, und die Brust übernimmt die Arbeit.", en: "Your elbows flare out and the chest takes over the work." },
    sicherheit: { de: "Stell die Stopper so ein, dass sie die Stange knapp unter deinem tiefsten Punkt auffangen.", en: "Set the safety stops so they catch the bar just below your lowest point." }
  },
  "enges-negativbank-lh": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Hak die Füße fest ein und leg dich langsam zurück. Greif die Stange etwa schulterbreit." },
        { titel: "Absenken", text: "Heb die Stange aus dem Ständer und bring sie über die untere Brust. Senk sie dorthin und atme ein. Die Ellbogen bleiben eng am Körper." },
        { titel: "Drücken", text: "Drück die Stange nach oben, bis die Arme fast gestreckt sind, und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Hook your feet in firmly and lie back slowly. Grip the bar at about shoulder width." },
        { titel: "Lower", text: "Lift the bar out of the rack and bring it over your lower chest. Lower it there and breathe in. Your elbows stay close to your body." },
        { titel: "Press", text: "Press the bar up until your arms are almost straight and breathe out." }
      ]
    },
    fehler: { de: "Die Stange kippt zur Seite, weil die Hände eng stehen. Halt sie waagerecht.", en: "The bar tilts to one side because your hands are close together. Keep it level." },
    sicherheit: { de: "Trainiere mit einem Trainingspartner oder im Rack mit Sicherheitsbügeln. Setz dich erst auf, wenn die Stange im Ständer liegt, und komm langsam hoch.", en: "Train with a spotter or in a rack with safety bars. Only sit up once the bar is back in the rack, and come up slowly." }
  },
  "jm-press-lh": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf die Bank und greif die Stange etwa schulterbreit. Heb sie aus dem Ständer und halt sie mit gestreckten Armen über der oberen Brust." },
        { titel: "Absenken", text: "Beug die Ellbogen, sie bleiben dabei oben. Senk die Stange zum oberen Brustbein oder bis knapp über das Kinn, nicht tiefer. Die Ellbogen zeigen nach vorn, die Unterarme stehen etwa senkrecht. Atme dabei ein." },
        { titel: "Drücken", text: "Drück die Stange auf demselben Weg gerade nach oben und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Lie on the bench and grip the bar at about shoulder width. Lift it out of the rack and hold it over your upper chest with your arms straight." },
        { titel: "Lower", text: "Bend your elbows while keeping them up. Lower the bar to your upper breastbone or to just above your chin, no lower. Your elbows point forward and your forearms are about vertical. Breathe in." },
        { titel: "Press", text: "Press the bar straight up along the same path and breathe out." }
      ]
    },
    fehler: { de: "Die Ellbogen sinken zum Körper ab. Dann ist es ein enges Bankdrücken.", en: "Your elbows drop toward your body. Then it is a close-grip bench press." },
    sicherheit: { de: "Die Stange hält über Hals und Kinn an. Nimm ein leichtes Gewicht und trainiere im Rack mit Sicherheitsbügeln oder mit einem Trainingspartner.", en: "The bar stops above your neck and chin. Use a light weight and train in a rack with safety bars or with a spotter." }
  },
  "jm-press-multi": {
    schritte: {
      de: [
        { titel: "Bank ausrichten", text: "Schieb die Bank so unter die Stange, dass diese über dem oberen Brustbein herunterkommt. Stell die Stopper so ein, dass die Stange nicht bis zum Hals sinken kann. Greif etwa schulterbreit." },
        { titel: "Absenken", text: "Dreh die Stange aus den Haken. Senk die Stange zum oberen Brustbein oder bis knapp über das Kinn, nicht tiefer. Die Ellbogen zeigen nach vorn, die Unterarme stehen etwa senkrecht. Atme dabei ein." },
        { titel: "Drücken", text: "Drück die Stange nach oben, atme aus und dreh sie am Ende zurück in die Haken." }
      ],
      en: [
        { titel: "Position the bench", text: "Slide the bench under the bar so the bar comes down over your upper breastbone. Set the safety stops so the bar cannot sink to your neck. Grip at about shoulder width." },
        { titel: "Lower", text: "Rotate the bar out of the hooks. Lower the bar to your upper breastbone or to just above your chin, no lower. Your elbows point forward and your forearms are about vertical. Breathe in." },
        { titel: "Press", text: "Press the bar up, breathe out and rotate it back into the hooks at the end." }
      ]
    },
    fehler: { de: "Die Ellbogen fallen nach außen wie beim Bankdrücken.", en: "Your elbows flare out as in a bench press." },
    sicherheit: { de: "Prüf Bankposition und Stopper mit der leeren Stange, bevor du Gewicht auflegst.", en: "Check the bench position and the safety stops with the empty bar before you load it." }
  },
  "lockout-bank-lh": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Sicherheitsbügel im Rack so hoch, dass die Stange darauf in der oberen Hälfte deines Wegs liegt. Leg dich darunter und greif die Stange etwa schulterbreit." },
        { titel: "Drücken", text: "Spann den Körper an. Drück die Stange von den Bügeln nach oben, bis die Arme gestreckt sind, und atme aus." },
        { titel: "Ablegen", text: "Senk die Stange kontrolliert zurück auf die Bügel und lass sie kurz ganz liegen. Atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Set the safety bars in the rack high enough that the bar rests on them in the upper half of your range. Lie under it and grip the bar at about shoulder width." },
        { titel: "Press", text: "Tighten your body. Press the bar up off the safety bars until your arms are straight and breathe out." },
        { titel: "Set down", text: "Lower the bar under control back onto the safety bars and let it rest there completely for a moment. Breathe in." }
      ]
    },
    fehler: { de: "Du lässt die Stange auf die Bügel fallen und prallst von dort ab.", en: "You drop the bar onto the safety bars and bounce off them." },
    tipp: { de: "Der kurze Weg erlaubt mehr Gewicht als beim normalen Bankdrücken. Steigere trotzdem langsam.", en: "The short range allows more weight than the regular bench press. Still, increase slowly." }
  },
  "trizeps-dips": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stütz dich mit gestreckten Armen auf den Barren. Der Oberkörper ist aufrecht, die Schultern sind unten." },
        { titel: "Absenken", text: "Beug die Ellbogen eng am Körper nach hinten. Senk dich, bis die Oberarme etwa waagerecht sind, und atme ein." },
        { titel: "Hochdrücken", text: "Drück dich nach oben, bis die Arme gestreckt sind, und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Support yourself on the parallel bars with your arms straight. Your torso is upright and your shoulders are down." },
        { titel: "Lower", text: "Bend your elbows back, close to your body. Lower yourself until your upper arms are about horizontal and breathe in." },
        { titel: "Push up", text: "Push yourself up until your arms are straight and breathe out." }
      ]
    },
    fehler: { de: "Du beugst dich vor, und die Ellbogen gehen nach außen. Dann arbeitet die Brust stärker.", en: "You lean forward and your elbows flare out. Then the chest works harder." },
    sicherheit: { de: "Wenn es in der Schulter schmerzt, geh weniger tief oder nimm die Unterstützungsmaschine.", en: "If your shoulder hurts, go less deep or use the assisted machine." }
  },
  "trizeps-dips-assistiert": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Mehr gestecktes Gewicht heißt mehr Hilfe. Greif die Holme, knie dich auf das Polster und richte den Oberkörper auf." },
        { titel: "Absenken", text: "Senk dich gerade nach unten, die Ellbogen gehen eng nach hinten. Atme ein, bis die Oberarme etwa waagerecht sind." },
        { titel: "Hochdrücken", text: "Drück dich nach oben, streck die Arme ganz und atme aus." }
      ],
      en: [
        { titel: "Set up", text: "More selected weight means more help. Grip the bars, kneel on the pad and bring your torso upright." },
        { titel: "Lower", text: "Lower yourself straight down with your elbows travelling back, close to your body. Breathe in until your upper arms are about horizontal." },
        { titel: "Push up", text: "Push yourself up, straighten your arms fully and breathe out." }
      ]
    },
    fehler: { de: "Der Oberkörper kippt beim Absenken nach vorn.", en: "Your torso tips forward as you lower." },
    sicherheit: { de: "Steig am Ende kontrolliert ab und halt dich dabei fest. Das Polster kommt sonst schnell nach oben.", en: "At the end, get off under control and hold on while you do. Otherwise the pad comes up fast." }
  },
  "pause-machine-assisted-dip": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Steck etwas mehr Gewicht als ohne Pause, also mehr Hilfe. Greif die Holme und knie dich auf das Polster." },
        { titel: "Senken und halten", text: "Senk dich, bis die Oberarme etwa waagerecht sind, und atme ein. Halt dort ein bis zwei Sekunden. Die Schultern bleiben unten." },
        { titel: "Hochdrücken", text: "Drück dich aus dem Stillstand nach oben und atme aus." }
      ],
      en: [
        { titel: "Set up", text: "Select a little more weight than without the pause, which means more help. Grip the bars and kneel on the pad." },
        { titel: "Lower and hold", text: "Lower yourself until your upper arms are about horizontal and breathe in. Hold there for one to two seconds. Your shoulders stay down." },
        { titel: "Push up", text: "Push yourself up from a dead stop and breathe out." }
      ]
    },
    fehler: { de: "In der Pause sackst du in die Schultern.", en: "You sink into your shoulders during the pause." }
  },
  "dip-maschine-trizeps": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Setz dich und steck den Stift ins gewünschte Gewicht. Hat das Gerät ein Polster oder einen Gurt für die Oberschenkel, stell es fest ein. Greif die Griffe neben dem Körper." },
        { titel: "Drücken", text: "Der Oberkörper bleibt aufrecht, die Ellbogen zeigen nach hinten. Drück die Griffe nach unten, bis die Arme gestreckt sind, und atme aus." },
        { titel: "Zurück", text: "Lass die Griffe langsam hochkommen, bis die Ellbogen etwa rechtwinklig sind, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Sit down and put the pin into the weight you want. If the machine has a pad or a belt for your thighs, set it firmly. Grip the handles beside your body." },
        { titel: "Press", text: "Your torso stays upright and your elbows point back. Press the handles down until your arms are straight and breathe out." },
        { titel: "Return", text: "Let the handles come up slowly until your elbows are at about a right angle and breathe in." }
      ]
    },
    fehler: { de: "Du lehnst dich über die Griffe und drückst mit dem Körpergewicht.", en: "You lean over the handles and press with your body weight." }
  },
  "trizeps-dips-gewicht": {
    schritte: {
      de: [
        { titel: "Gewicht anlegen", text: "Häng die Scheibe an einen Dip-Gürtel. Steig über die Tritte in den Stütz und spring nicht hoch." },
        { titel: "Absenken", text: "Bleib aufrecht und halt die Ellbogen eng. Senk dich langsam, bis die Oberarme etwa waagerecht sind, und atme ein." },
        { titel: "Hochdrücken", text: "Drück dich nach oben und atme aus. Steig am Ende über die Tritte ab." }
      ],
      en: [
        { titel: "Add the weight", text: "Hang the plate from a dip belt. Step up into the support position using the footrests, do not jump up." },
        { titel: "Lower", text: "Stay upright and keep your elbows close. Lower yourself slowly until your upper arms are about horizontal and breathe in." },
        { titel: "Push up", text: "Push yourself up and breathe out. At the end, get off via the footrests." }
      ]
    },
    fehler: { de: "Das Gewicht pendelt und zieht dich aus der aufrechten Haltung.", en: "The weight swings and pulls you out of the upright position." },
    sicherheit: { de: "Nimm Zusatzgewicht erst, wenn Dips mit dem Körpergewicht sauber klappen, und steigere in kleinen Schritten.", en: "Only add weight once bodyweight dips are clean, and increase in small steps." }
  },
  "bench-parallel-bar-dip": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "An der Bank setzt du die Hände neben der Hüfte auf die Kante, die Finger zeigen nach vorn. Schieb den Po vor die Bank, die Füße stehen am Boden. Am Barren stützt du dich mit gestreckten Armen." },
        { titel: "Senken und drücken", text: "Beug die Ellbogen nach hinten und senk dich, bis die Oberarme etwa waagerecht sind. Atme dabei ein. Drück dich nach oben und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "On a bench, place your hands on the edge beside your hips, fingers pointing forward. Slide your hips in front of the bench with your feet on the floor. On parallel bars, support yourself with your arms straight." },
        { titel: "Lower and push", text: "Bend your elbows back and lower yourself until your upper arms are about horizontal. Breathe in. Push yourself up and breathe out." }
      ]
    },
    fehler: { de: "An der Bank wandert der Po weit von der Kante weg. Der Rücken bleibt nah an der Bank.", en: "On the bench, your hips drift far away from the edge. Your back stays close to the bench." },
    sicherheit: { de: "Geh an der Bank nicht tiefer, als bis die Oberarme waagerecht sind. Die Schultern sind dort weit nach hinten gestreckt.", en: "On the bench, go no deeper than upper arms horizontal. Your shoulders are extended far back in that position." },
    tipp: { de: "Die Bank ist die leichtere Form, der Barren die schwerere.", en: "The bench is the easier version, the parallel bars the harder one." }
  },
  "ring-dip": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stütz dich mit gestreckten Armen in die Ringe. Die Ringe liegen dicht an den Hüften, die Schultern sind unten." },
        { titel: "Absenken", text: "Senk dich langsam, bis die Oberarme etwa waagerecht sind, und atme ein. Die Ringe bleiben nah am Körper." },
        { titel: "Hochdrücken", text: "Drück dich nach oben, streck die Arme oben ganz und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Support yourself on the rings with your arms straight. The rings are close to your hips and your shoulders are down." },
        { titel: "Lower", text: "Lower yourself slowly until your upper arms are about horizontal and breathe in. The rings stay close to your body." },
        { titel: "Push up", text: "Push yourself up, straighten your arms fully at the top and breathe out." }
      ]
    },
    fehler: { de: "Die Ringe wandern beim Absenken nach außen.", en: "The rings drift outward as you lower." },
    sicherheit: { de: "Mach die Übung erst, wenn Dips am Barren sauber klappen und du den Stütz an den Ringen ruhig halten kannst.", en: "Only do this exercise once dips on parallel bars are clean and you can hold the support position on the rings steadily." }
  },
  "cable-straight-bar-triceps-pushdown": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng die gerade Stange an die obere Rolle. Greif sie schulterbreit im Obergriff und geh einen kleinen Schritt zurück. Die Oberarme liegen am Körper." },
        { titel: "Drücken", text: "Drück die Stange nach unten, bis die Arme gestreckt sind, und atme aus. Die Handgelenke bleiben gerade." },
        { titel: "Zurück", text: "Lass die Stange langsam nach oben, bis die Unterarme etwas über der Waagerechten sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Attach the straight bar to the high pulley. Grip it overhand at shoulder width and take a small step back. Your upper arms rest against your body." },
        { titel: "Push down", text: "Push the bar down until your arms are straight and breathe out. Your wrists stay straight." },
        { titel: "Return", text: "Let the bar rise slowly until your forearms are a little above horizontal and breathe in." }
      ]
    },
    fehler: { de: "Die Schultern rollen nach vorn über die Stange.", en: "Your shoulders roll forward over the bar." }
  },
  "cable-v-bar-triceps-pushdown": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng den V-Griff an die obere Rolle. Greif beide Schenkel von oben, die Hände stehen schräg zueinander. Die Oberarme liegen am Körper." },
        { titel: "Drücken", text: "Drück den Griff nach unten, bis die Arme gestreckt sind, und atme aus." },
        { titel: "Zurück", text: "Lass den Griff langsam nach oben, bis die Unterarme etwa waagerecht sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Attach the V-bar to the high pulley. Grip both sides from above, your hands angled toward each other. Your upper arms rest against your body." },
        { titel: "Push down", text: "Push the handle down until your arms are straight and breathe out." },
        { titel: "Return", text: "Let the handle rise slowly until your forearms are about horizontal and breathe in." }
      ]
    },
    fehler: { de: "Die Ellbogen spreizen sich beim Drücken vom Körper ab.", en: "Your elbows flare away from your body as you push." }
  },
  "underhand-grip-cable-triceps-pushdown": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng die gerade Stange an die obere Rolle. Greif sie von unten etwa schulterbreit, die Handflächen zeigen nach oben. Die Oberarme liegen am Körper." },
        { titel: "Drücken", text: "Streck die Arme nach unten und atme aus." },
        { titel: "Zurück", text: "Lass die Stange langsam nach oben, bis die Unterarme etwa waagerecht sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Attach the straight bar to the high pulley. Grip it from below at about shoulder width, palms facing up. Your upper arms rest against your body." },
        { titel: "Push down", text: "Straighten your arms downward and breathe out." },
        { titel: "Return", text: "Let the bar rise slowly until your forearms are about horizontal and breathe in." }
      ]
    },
    fehler: { de: "Die Handgelenke knicken ein, sobald das Gewicht zu schwer ist.", en: "Your wrists bend as soon as the weight is too heavy." },
    tipp: { de: "Rechne mit weniger Gewicht als im Obergriff.", en: "Expect to use less weight than with the overhand grip." }
  },
  "single-arm-neutral-grip-cable-triceps-pushdown": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng einen einzelnen Griff oder ein Seil an die obere Rolle. Greif so, dass der Daumen nach oben zeigt. Der Oberarm liegt am Körper, die freie Hand an der Hüfte." },
        { titel: "Drücken", text: "Streck den Arm nach unten neben den Oberschenkel und atme aus." },
        { titel: "Zurück", text: "Lass die Hand langsam hochkommen, bis der Unterarm etwa waagerecht ist, und atme ein. Mach alle Wiederholungen, dann wechsle die Seite." }
      ],
      en: [
        { titel: "Setup", text: "Attach a single handle or a rope to the high pulley. Grip it so your thumb points up. Your upper arm rests against your body, your free hand on your hip." },
        { titel: "Push down", text: "Straighten your arm down beside your thigh and breathe out." },
        { titel: "Return", text: "Let your hand come up slowly until your forearm is about horizontal and breathe in. Do all reps, then switch sides." }
      ]
    },
    fehler: { de: "Die Schulter rollt nach vorn, und der Oberkörper lehnt sich über den Griff.", en: "Your shoulder rolls forward and your torso leans over the handle." }
  },
  "cable-dual-rope-diverging-triceps": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng zwei Seile in denselben Karabiner an der oberen Rolle. Nimm in jede Hand ein Seil. Die Oberarme liegen am Körper." },
        { titel: "Drücken", text: "Drück die Hände nach unten und führ sie unten nach außen neben die Oberschenkel. Atme dabei aus." },
        { titel: "Zurück", text: "Lass die Hände langsam hochkommen und wieder zusammenlaufen. Atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Attach two ropes to the same carabiner on the high pulley. Take one rope in each hand. Your upper arms rest against your body." },
        { titel: "Push down", text: "Push your hands down and, at the bottom, move them out beside your thighs. Breathe out." },
        { titel: "Return", text: "Let your hands come up slowly and back together. Breathe in." }
      ]
    },
    fehler: { de: "Die Ellbogen gehen mit den Händen nach außen. Nur die Unterarme bewegen sich.", en: "Your elbows move out along with your hands. Only your forearms move." }
  },
  "single-arm-cable-overhead-triceps-extension": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle nach unten und häng einen einzelnen Griff ein. Greif ihn, dreh der Rolle den Rücken zu und bring den Ellbogen neben den Kopf. Die Hand ist hinter dem Kopf." },
        { titel: "Strecken", text: "Streck den Arm nach oben und atme aus. Der Oberarm bleibt am Kopf." },
        { titel: "Senken", text: "Lass die Hand langsam hinter den Kopf sinken und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley to the bottom and attach a single handle. Grip it, turn your back to the pulley and bring your elbow beside your head. Your hand is behind your head." },
        { titel: "Extend", text: "Straighten your arm upward and breathe out. Your upper arm stays by your head." },
        { titel: "Lower", text: "Let your hand sink slowly behind your head and breathe in." }
      ]
    },
    fehler: { de: "Der Ellbogen wandert nach außen oder nach vorn.", en: "Your elbow drifts out or forward." },
    tipp: { de: "Die freie Hand kann den Oberarm von vorn stützen.", en: "Your free hand can support the upper arm from the front." }
  },
  "cable-v-bar-overhead-triceps-extension": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle nach unten und häng den V-Griff ein. Greif ihn mit beiden Händen, dreh dich mit dem Rücken zur Rolle und bring den Griff hinter den Kopf. Stell einen Fuß vor den anderen." },
        { titel: "Strecken", text: "Streck die Arme nach oben und atme aus. Die Ellbogen zeigen nach vorn und bleiben nah am Kopf." },
        { titel: "Senken", text: "Lass den Griff langsam hinter den Kopf sinken und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley to the bottom and attach the V-bar. Grip it with both hands, turn your back to the pulley and bring the handle behind your head. Place one foot in front of the other." },
        { titel: "Extend", text: "Straighten your arms upward and breathe out. Your elbows point forward and stay close to your head." },
        { titel: "Lower", text: "Let the handle sink slowly behind your head and breathe in." }
      ]
    },
    fehler: { de: "Der Rücken geht ins Hohlkreuz.", en: "Your lower back arches." },
    sicherheit: { de: "Bring den Griff kontrolliert über den Kopf und wieder herunter. Er steht die ganze Zeit unter Zug.", en: "Bring the handle over your head and back down under control. It is under tension the whole time." }
  },
  "high-pulley-cable-straight-bar-overhead-triceps-extension": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle auf Kopfhöhe oder höher und häng die gerade Stange ein. Greif sie im Obergriff und dreh dich von der Rolle weg. Stell einen Fuß vor den anderen und beug den Oberkörper vor. Die Ellbogen sind neben dem Kopf, die Stange ist hinter dem Kopf." },
        { titel: "Strecken", text: "Streck die Arme nach vorn, in Verlängerung des Oberkörpers, und atme aus." },
        { titel: "Zurück", text: "Lass die Stange langsam hinter den Kopf zurück und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley to head height or higher and attach the straight bar. Grip it overhand and turn away from the pulley. Place one foot in front of the other and lean your torso forward. Your elbows are beside your head and the bar is behind your head." },
        { titel: "Extend", text: "Straighten your arms forward, in line with your torso, and breathe out." },
        { titel: "Return", text: "Let the bar come back slowly behind your head and breathe in." }
      ]
    },
    fehler: { de: "Die Oberarme heben und senken sich mit. Nur die Unterarme bewegen sich.", en: "Your upper arms rise and fall with the movement. Only your forearms move." }
  },
  "cable-skull-crusher": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell eine Bank mit dem Kopfende zur unteren Rolle und häng eine Stange ein. Leg dich hin, greif die Stange über dem Kopf und bring sie mit gestreckten Armen über die Brust." },
        { titel: "Absenken", text: "Beug nur die Ellbogen und lass die Stange zur Stirn sinken. Atme dabei ein." },
        { titel: "Strecken", text: "Streck die Arme wieder und atme aus." }
      ],
      en: [
        { titel: "Set up", text: "Place a bench with its head end toward the low pulley and attach a bar. Lie down, grip the bar above your head and bring it over your chest with your arms straight." },
        { titel: "Lower", text: "Bend only your elbows and let the bar sink toward your forehead. Breathe in." },
        { titel: "Extend", text: "Straighten your arms again and breathe out." }
      ]
    },
    fehler: { de: "Die Ellbogen fallen nach außen.", en: "Your elbows flare out." },
    sicherheit: { de: "Die Stange bewegt sich dicht am Kopf. Nimm ein Gewicht, das du sicher kontrollierst.", en: "The bar moves close to your head. Use a weight you can control safely." }
  },
  "neutral-grip-cable-triceps-kickback": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle nach unten. Greif den Griff oder das Kabelende so, dass die Handfläche nach innen zeigt. Beug dich mit geradem Rücken aus der Hüfte vor, die freie Hand stützt sich ab. Der Oberarm liegt am Körper." },
        { titel: "Strecken", text: "Streck den Arm nach hinten, bis er gerade ist, und atme aus." },
        { titel: "Zurück", text: "Beug den Arm langsam, bis der Ellbogen etwa rechtwinklig ist, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley to the bottom. Grip the handle or the end of the cable so your palm faces inward. Hinge forward at the hips with a straight back and support yourself with your free hand. Your upper arm rests against your body." },
        { titel: "Extend", text: "Straighten your arm backward until it is straight and breathe out." },
        { titel: "Return", text: "Bend your arm slowly until your elbow is at about a right angle and breathe in." }
      ]
    },
    fehler: { de: "Der Oberarm schwingt mit. Er bleibt am Körper.", en: "Your upper arm swings along. It stays against your body." }
  },
  "machine-triceps-extension": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Stell den Sitz so ein, dass die Oberarme flach auf dem Polster liegen und die Ellbogen auf Höhe der Drehachse sind. Steck den Stift und greif die Griffe." },
        { titel: "Strecken", text: "Streck die Arme, bis sie fast gerade sind, und atme aus." },
        { titel: "Zurück", text: "Lass die Griffe langsam zurückkommen und atme ein. Die Gewichtsplatten setzen nicht auf." }
      ],
      en: [
        { titel: "Set up", text: "Adjust the seat so your upper arms lie flat on the pad and your elbows are level with the pivot point. Set the pin and grip the handles." },
        { titel: "Extend", text: "Straighten your arms until they are almost straight and breathe out." },
        { titel: "Return", text: "Let the handles come back slowly and breathe in. The weight plates do not touch down." }
      ]
    },
    fehler: { de: "Die Ellbogen heben vom Polster ab.", en: "Your elbows lift off the pad." }
  },
  "kickbacks": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stütz eine Hand und das gleiche Knie auf eine Bank, der Rücken ist gerade. Halt die Hantel in der anderen Hand. Der Oberarm liegt am Körper und ist etwa waagerecht, der Ellbogen ist gebeugt." },
        { titel: "Strecken", text: "Streck den Arm nach hinten, bis er gerade ist, und atme aus. Halt kurz." },
        { titel: "Zurück", text: "Beug den Arm langsam wieder und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Support one hand and the knee on the same side on a bench, back straight. Hold the dumbbell in the other hand. Your upper arm rests against your body and is about horizontal, your elbow is bent." },
        { titel: "Extend", text: "Straighten your arm backward until it is straight and breathe out. Hold briefly." },
        { titel: "Return", text: "Bend your arm slowly again and breathe in." }
      ]
    },
    fehler: { de: "Du schwingst die Hantel, und der Oberarm pendelt mit.", en: "You swing the dumbbell and your upper arm swings along." },
    tipp: { de: "Nimm eine leichte Hantel. Die Übung ist mit wenig Gewicht schon schwer.", en: "Use a light dumbbell. This exercise is hard even with little weight." }
  },
  "dumbbell-overhead-triceps-extension": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz dich aufrecht hin, eine Bank mit Lehne hilft. Fass die Hantel mit beiden Händen unter der oberen Scheibe und heb sie über den Kopf. Die Arme sind gestreckt." },
        { titel: "Absenken", text: "Senk die Hantel hinter den Kopf und atme ein. Die Ellbogen zeigen nach vorn oben." },
        { titel: "Strecken", text: "Streck die Arme wieder nach oben und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Sit upright, a bench with a backrest helps. Hold the dumbbell with both hands under the upper plate and lift it over your head. Your arms are straight." },
        { titel: "Lower", text: "Lower the dumbbell behind your head and breathe in. Your elbows point forward and up." },
        { titel: "Extend", text: "Straighten your arms upward again and breathe out." }
      ]
    },
    fehler: { de: "Die Ellbogen gehen weit nach außen.", en: "Your elbows flare far out." },
    sicherheit: { de: "Die Hantel bewegt sich hinter deinem Kopf. Greif sie fest und lass dir eine schwere Hantel reichen.", en: "The dumbbell moves behind your head. Grip it firmly and have someone hand you a heavy dumbbell." }
  },
  "single-arm-dumbbell-overhead-extension": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Sitz oder steh aufrecht. Halt die Hantel in einer Hand mit gestrecktem Arm über dem Kopf. Die freie Hand stützt den Oberarm." },
        { titel: "Absenken", text: "Senk die Hantel hinter den Kopf und atme ein. Der Oberarm bleibt senkrecht." },
        { titel: "Strecken", text: "Streck den Arm wieder und atme aus. Mach alle Wiederholungen, dann wechsle die Seite." }
      ],
      en: [
        { titel: "Setup", text: "Sit or stand upright. Hold the dumbbell in one hand with your arm straight above your head. Your free hand supports the upper arm." },
        { titel: "Lower", text: "Lower the dumbbell behind your head and breathe in. Your upper arm stays vertical." },
        { titel: "Extend", text: "Straighten your arm again and breathe out. Do all reps, then switch sides." }
      ]
    },
    fehler: { de: "Der Oberkörper neigt sich zur Seite weg.", en: "Your torso leans away to the side." },
    sicherheit: { de: "Nimm ein leichtes Gewicht, das du hinter dem Kopf sicher kontrollierst.", en: "Use a light weight you can control safely behind your head." }
  },
  "ez-bar-skull-crusher": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf eine Bank. Greif die SZ-Stange im Obergriff an den inneren schrägen Griffstellen und halt sie mit gestreckten Armen über der Brust." },
        { titel: "Absenken", text: "Beug nur die Ellbogen und senk die Stange zur Stirn oder knapp dahinter. Atme dabei ein." },
        { titel: "Strecken", text: "Streck die Arme wieder, bis sie fast gerade sind, und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Lie on a bench. Grip the EZ bar overhand on the inner angled sections and hold it over your chest with your arms straight." },
        { titel: "Lower", text: "Bend only your elbows and lower the bar to your forehead or just behind it. Breathe in." },
        { titel: "Extend", text: "Straighten your arms again until they are almost straight and breathe out." }
      ]
    },
    fehler: { de: "Die Oberarme pendeln vor und zurück. Dann wird daraus ein Überzug.", en: "Your upper arms swing back and forth. Then it turns into a pullover." },
    sicherheit: { de: "Die Stange bewegt sich dicht am Kopf. Nimm ein Gewicht, das du sicher kontrollierst, und trainiere möglichst mit Trainingspartner.", en: "The bar moves close to your head. Use a weight you can control safely and train with a spotter if possible." }
  },
  "dumbbell-skull-crusher": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich mit zwei Kurzhanteln auf eine Bank. Die Arme sind gestreckt über der Brust, die Handflächen zeigen zueinander." },
        { titel: "Absenken", text: "Beug nur die Ellbogen und senk die Hanteln links und rechts neben den Kopf. Atme dabei ein." },
        { titel: "Strecken", text: "Streck die Arme wieder und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Lie on a bench with two dumbbells. Your arms are straight over your chest, palms facing each other." },
        { titel: "Lower", text: "Bend only your elbows and lower the dumbbells to the left and right of your head. Breathe in." },
        { titel: "Extend", text: "Straighten your arms again and breathe out." }
      ]
    },
    fehler: { de: "Ein Arm arbeitet schneller als der andere.", en: "One arm works faster than the other." },
    sicherheit: { de: "Die Hanteln bewegen sich neben deinem Gesicht. Nimm ein leichtes Gewicht.", en: "The dumbbells move beside your face. Use a light weight." }
  },
  "dumbbell-tate-press": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich mit zwei Kurzhanteln auf eine Bank, die Arme gestreckt über der Brust. Die Handflächen zeigen zu den Füßen, die Hanteln berühren sich fast." },
        { titel: "Absenken", text: "Beug die Ellbogen nach außen und senk die inneren Enden der Hanteln zur Brustmitte. Atme dabei ein. Die Ellbogen zeigen weiter zur Seite." },
        { titel: "Strecken", text: "Streck die Arme wieder und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Lie on a bench with two dumbbells, arms straight over your chest. Your palms face your feet and the dumbbells almost touch." },
        { titel: "Lower", text: "Bend your elbows outward and lower the inner ends of the dumbbells to the middle of your chest. Breathe in. Your elbows keep pointing out to the sides." },
        { titel: "Extend", text: "Straighten your arms again and breathe out." }
      ]
    },
    fehler: { de: "Die Ellbogen sinken zum Körper ab. Dann wird daraus ein Drücken.", en: "Your elbows drop toward your body. Then it turns into a press." },
    tipp: { de: "Fang mit leichten Hanteln an.", en: "Start with light dumbbells." }
  },
  "enge-liegestuetze": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Geh in die Liegestützposition und setz die Hände unter die Schultern, schulterbreit oder etwas enger. Der Körper bildet eine gerade Linie." },
        { titel: "Absenken", text: "Senk die Brust Richtung Boden und atme ein. Die Ellbogen gehen eng am Körper nach hinten." },
        { titel: "Hochdrücken", text: "Drück dich nach oben und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Get into the push-up position and place your hands under your shoulders, shoulder width or a little closer. Your body forms a straight line." },
        { titel: "Lower", text: "Lower your chest toward the floor and breathe in. Your elbows travel back, close to your body." },
        { titel: "Push up", text: "Push yourself up and breathe out." }
      ]
    },
    fehler: { de: "Die Ellbogen klappen nach außen.", en: "Your elbows flare out." }
  },
  "diamant-liegestuetze": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz die Hände unter der Brust zusammen, sodass Daumen und Zeigefinger eine Raute bilden. Der Körper bildet eine gerade Linie." },
        { titel: "Absenken", text: "Senk die Brust zu den Händen und atme ein. Die Ellbogen gehen nah am Körper schräg nach hinten." },
        { titel: "Hochdrücken", text: "Drück dich hoch, bis die Arme fast gestreckt sind, und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Place your hands together under your chest so your thumbs and index fingers form a diamond. Your body forms a straight line." },
        { titel: "Lower", text: "Lower your chest to your hands and breathe in. Your elbows travel diagonally back, close to your body." },
        { titel: "Push up", text: "Push yourself up until your arms are almost straight and breathe out." }
      ]
    },
    fehler: { de: "Der Po ragt nach oben, weil die Übung schwer ist.", en: "Your hips stick up because the exercise is hard." },
    tipp: { de: "Zieht es in den Handgelenken, setz die Hände etwas auseinander.", en: "If you feel a pull in your wrists, move your hands slightly apart." }
  },
  "enge-liegestuetze-knie": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Knie dich hin und setz die Hände schulterbreit unter die Schultern. Schieb die Hüfte nach vorn, bis Kopf, Hüfte und Knie eine Linie bilden." },
        { titel: "Absenken", text: "Senk die Brust kontrolliert ab und atme ein. Die Ellbogen streifen den Körper." },
        { titel: "Hochdrücken", text: "Drück dich nach oben und atme aus. Die Hüfte bleibt in der Linie." }
      ],
      en: [
        { titel: "Setup", text: "Kneel down and place your hands shoulder width apart under your shoulders. Push your hips forward until your head, hips and knees form a line." },
        { titel: "Lower", text: "Lower your chest under control and breathe in. Your elbows brush your body." },
        { titel: "Push up", text: "Push yourself up and breathe out. Your hips stay in line." }
      ]
    },
    fehler: { de: "Die Hände stehen zu weit vorn. Setz sie unter die Schultern.", en: "Your hands are too far forward. Place them under your shoulders." }
  },
  "bodyweight-triceps-extension": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg eine Stange im Rack auf Hüfthöhe fest ein. Greif sie schulterbreit im Obergriff und geh mit den Füßen zurück, bis der Körper eine gerade Linie bildet. Die Arme sind gestreckt." },
        { titel: "Absenken", text: "Beug nur die Ellbogen und lass die Stirn zur Stange sinken. Atme dabei ein. Die Ellbogen zeigen zum Boden." },
        { titel: "Strecken", text: "Streck die Arme wieder und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Fix a bar in the rack at hip height. Grip it overhand at shoulder width and walk your feet back until your body forms a straight line. Your arms are straight." },
        { titel: "Lower", text: "Bend only your elbows and let your forehead sink toward the bar. Breathe in. Your elbows point to the floor." },
        { titel: "Extend", text: "Straighten your arms again and breathe out." }
      ]
    },
    fehler: { de: "Die Hüfte knickt ein, oder die Ellbogen gehen nach außen.", en: "Your hips bend, or your elbows flare out." },
    sicherheit: { de: "Die Stange muss so liegen, dass sie unter Druck nicht wegrollen kann.", en: "The bar must sit so that it cannot roll away under pressure." },
    tipp: { de: "Je weiter die Füße zurückstehen, desto schwerer wird es.", en: "The further back your feet are, the harder it gets." }
  },
  "ring-triceps-extension": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng die Ringe etwa auf Hüfthöhe. Greif sie mit gestreckten Armen und lehn dich mit geradem Körper nach vorn in die Ringe." },
        { titel: "Absenken", text: "Beug nur die Ellbogen, bis die Hände neben der Stirn sind, und atme ein." },
        { titel: "Strecken", text: "Streck die Arme wieder und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Hang the rings at about hip height. Grip them with your arms straight and lean forward into the rings with your body straight." },
        { titel: "Lower", text: "Bend only your elbows until your hands are beside your forehead and breathe in." },
        { titel: "Extend", text: "Straighten your arms again and breathe out." }
      ]
    },
    fehler: { de: "Die Ringe gehen auseinander, und die Ellbogen folgen nach außen.", en: "The rings move apart and your elbows follow them outward." },
    tipp: { de: "Je aufrechter du stehst, desto leichter wird es.", en: "The more upright you stand, the easier it gets." }
  }
});
