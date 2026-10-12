// Die Erklärungen der Muskelgruppe Bizeps. Sie kommen zu den Einträgen aus der erklaerungen.js dazu,
// deshalb muss diese Datei in der index.html nach der erklaerungen.js stehen. Aufbau wie dort:
// Schlüssel ist die Übungs-ID, pro Übung schritte (2 bis 3) und optional fehler, sicherheit, tipp, alle in de und en.
// Die Datei hat in der index.html und in der sw.js kein ?v=N: Der Service Worker holt sie bei jeder neuen VERSION frisch.
Object.assign(ERKLAERUNGEN, {
  "kabelcurls": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle ganz nach unten und häng die Stange oder den Griff ein, den du nutzen willst. Greif im Untergriff und stell dich einen kleinen Schritt vor die Rolle. Die Ellbogen liegen am Körper." },
        { titel: "Curlen", text: "Beug die Ellbogen und zieh den Griff nach oben in Richtung Schultern. Atme dabei aus. Die Oberarme bleiben ruhig." },
        { titel: "Absenken", text: "Lass den Griff langsam ab, bis die Arme fast gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley all the way down and attach the bar or handle you want to use. Grip it underhand and stand a small step in front of the pulley. Your elbows rest against your body." },
        { titel: "Curl", text: "Bend your elbows and pull the handle up toward your shoulders. Breathe out. Your upper arms stay still." },
        { titel: "Lower", text: "Lower the handle slowly until your arms are almost straight and breathe in." }
      ]
    },
    fehler: { de: "Du lehnst dich zurück und holst Schwung aus dem Oberkörper.", en: "You lean back and use momentum from your torso." },
    tipp: { de: "Für gerade Stange, SZ-Stange, Seil und einzelne Griffe gibt es eigene Einträge.", en: "Straight bar, EZ bar, rope and single handles each have their own entry." }
  },
  "cable-straight-bar-biceps-curl": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Häng die gerade Stange an die untere Rolle. Greif sie im Untergriff etwa schulterbreit und stell dich einen kleinen Schritt zurück. Die Ellbogen liegen am Körper." },
        { titel: "Curlen", text: "Zieh die Stange in einem Bogen nach oben, bis sie vor den Schultern ist, und atme aus. Die Handgelenke bleiben gerade." },
        { titel: "Absenken", text: "Lass die Stange langsam ab, bis die Arme fast gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Attach the straight bar to the low pulley. Grip it underhand at about shoulder width and take a small step back. Your elbows rest against your body." },
        { titel: "Curl", text: "Pull the bar up in an arc until it is in front of your shoulders and breathe out. Your wrists stay straight." },
        { titel: "Lower", text: "Lower the bar slowly until your arms are almost straight and breathe in." }
      ]
    },
    fehler: { de: "Die Ellbogen wandern beim Curlen nach vorn.", en: "Your elbows drift forward as you curl." },
    tipp: { de: "Zieht es in den Handgelenken, nimm die SZ-Stange.", en: "If you feel a pull in your wrists, use the EZ bar." }
  },
  "cable-ez-bar-biceps-curl": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Häng die SZ-Stange an die untere Rolle. Greif sie von unten an den schrägen Griffstellen, die Daumen sind etwas höher als die kleinen Finger. Die Ellbogen liegen am Körper." },
        { titel: "Curlen", text: "Zieh die Stange nach oben, bis sie vor den Schultern ist, und atme aus." },
        { titel: "Absenken", text: "Lass die Stange langsam ab, bis die Arme fast gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Attach the EZ bar to the low pulley. Grip it from below on the angled sections, thumbs a little higher than your little fingers. Your elbows rest against your body." },
        { titel: "Curl", text: "Pull the bar up until it is in front of your shoulders and breathe out." },
        { titel: "Lower", text: "Lower the bar slowly until your arms are almost straight and breathe in." }
      ]
    },
    fehler: { de: "Die Schultern ziehen nach oben, sobald es schwer wird.", en: "Your shoulders shrug up as soon as it gets heavy." }
  },
  "cable-rope-hammer-curl": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Häng das Seil an die untere Rolle. Greif beide Enden so, dass die Daumen nach oben zeigen. Stell dich einen kleinen Schritt zurück, die Ellbogen liegen am Körper." },
        { titel: "Curlen", text: "Zieh das Seil nach oben, bis die Hände vor den Schultern sind, und atme aus. Die Handflächen zeigen die ganze Zeit zueinander." },
        { titel: "Absenken", text: "Lass das Seil langsam ab, bis die Arme fast gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Attach the rope to the low pulley. Grip both ends so your thumbs point up. Take a small step back, elbows against your body." },
        { titel: "Curl", text: "Pull the rope up until your hands are in front of your shoulders and breathe out. Your palms face each other the whole time." },
        { titel: "Lower", text: "Lower the rope slowly until your arms are almost straight and breathe in." }
      ]
    },
    fehler: { de: "Die Hände drehen sich oben ein, und es wird ein normaler Curl.", en: "Your hands rotate inward at the top and it becomes a regular curl." }
  },
  "cable-reverse-curl": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Häng eine gerade Stange oder die SZ-Stange an die untere Rolle. Greif sie von oben etwa schulterbreit. Die Ellbogen liegen am Körper." },
        { titel: "Curlen", text: "Zieh die Stange nach oben, bis die Unterarme fast senkrecht stehen, und atme aus. Die Handgelenke bleiben gerade." },
        { titel: "Absenken", text: "Lass die Stange langsam ab und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Attach a straight bar or the EZ bar to the low pulley. Grip it from above at about shoulder width. Your elbows rest against your body." },
        { titel: "Curl", text: "Pull the bar up until your forearms are almost vertical and breathe out. Your wrists stay straight." },
        { titel: "Lower", text: "Lower the bar slowly and breathe in." }
      ]
    },
    fehler: { de: "Die Handgelenke knicken nach unten ab.", en: "Your wrists bend downward." },
    tipp: { de: "Rechne mit deutlich weniger Gewicht als im Untergriff.", en: "Expect to use clearly less weight than with the underhand grip." }
  },
  "single-arm-cable-biceps-curl": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Häng einen einzelnen Griff an die untere Rolle. Greif ihn im Untergriff und stell dich einen Schritt zurück, mit dem Gesicht zur Rolle. Der Ellbogen liegt am Körper, die freie Hand an der Hüfte." },
        { titel: "Curlen", text: "Zieh die Hand nach oben zur Schulter und atme aus. Der Oberarm bleibt ruhig." },
        { titel: "Absenken", text: "Lass die Hand langsam ab, bis der Arm fast gestreckt ist, und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Attach a single handle to the low pulley. Grip it underhand and take a step back, facing the pulley. Your elbow rests against your body, your free hand on your hip." },
        { titel: "Curl", text: "Pull your hand up to your shoulder and breathe out. Your upper arm stays still." },
        { titel: "Lower", text: "Lower your hand slowly until your arm is almost straight and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du drehst den Oberkörper zur Seite, um mehr Gewicht zu ziehen.", en: "You rotate your torso to the side to pull more weight." }
  },
  "single-arm-bayesian-curl": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Häng einen einzelnen Griff an die untere Rolle. Greif ihn im Untergriff, dreh der Rolle den Rücken zu und geh einen bis zwei Schritte nach vorn. Der Arm ist gestreckt und zeigt schräg nach hinten unten." },
        { titel: "Curlen", text: "Beug den Ellbogen und zieh die Hand nach vorn oben zur Schulter. Atme dabei aus. Der Ellbogen bleibt hinter dem Körper." },
        { titel: "Absenken", text: "Lass die Hand langsam zurück, bis der Arm gestreckt hinter dir ist, und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Attach a single handle to the low pulley. Grip it underhand, turn your back to the pulley and take one or two steps forward. Your arm is straight and points diagonally down and back." },
        { titel: "Curl", text: "Bend your elbow and pull your hand forward and up to your shoulder. Breathe out. Your elbow stays behind your body." },
        { titel: "Lower", text: "Let your hand return slowly until your arm is straight behind you and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Der Ellbogen kommt beim Curlen nach vorn. Dann geht die Dehnung verloren.", en: "Your elbow comes forward as you curl. Then the stretch is lost." },
    tipp: { de: "Eine leichte Schrittstellung hilft gegen den Zug nach hinten.", en: "A slight staggered stance helps against the pull backward." }
  },
  "dual-cable-bayesian-curl": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell beide Rollen ganz nach unten und häng je einen Griff ein. Nimm in jede Hand einen Griff, dreh dem Gerät den Rücken zu und geh einen bis zwei Schritte nach vorn. Beide Arme sind gestreckt hinter dem Körper." },
        { titel: "Curlen", text: "Beug beide Ellbogen und zieh die Hände nach vorn oben. Atme dabei aus. Die Ellbogen bleiben hinter dem Körper." },
        { titel: "Absenken", text: "Lass die Hände langsam zurück, bis die Arme gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Set both pulleys all the way down and attach a handle to each. Take one handle in each hand, turn your back to the machine and take one or two steps forward. Both arms are straight behind your body." },
        { titel: "Curl", text: "Bend both elbows and pull your hands forward and up. Breathe out. Your elbows stay behind your body." },
        { titel: "Lower", text: "Let your hands return slowly until your arms are straight and breathe in." }
      ]
    },
    fehler: { de: "Du beugst dich nach vorn, und die Schultern rollen ein. Die Brust bleibt oben.", en: "You lean forward and your shoulders roll in. Your chest stays up." }
  },
  "seated-dual-cable-bayesian-curl": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell eine Bank mit steiler Lehne mittig vor den Doppelkabelzug, die Lehne zeigt zum Gerät. Stell beide Rollen nach unten. Nimm die Griffe und setz dich, die Arme hängen gestreckt nach hinten unten." },
        { titel: "Curlen", text: "Beug beide Ellbogen und zieh die Hände nach oben zu den Schultern. Atme dabei aus. Rücken und Kopf bleiben an der Lehne." },
        { titel: "Absenken", text: "Lass die Hände langsam zurück, bis die Arme gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Place a bench with a steep backrest centered in front of the dual cable machine, with the backrest toward the machine. Set both pulleys to the bottom. Take the handles and sit down, your arms hanging straight down and back." },
        { titel: "Curl", text: "Bend both elbows and pull your hands up to your shoulders. Breathe out. Your back and head stay against the backrest." },
        { titel: "Lower", text: "Let your hands return slowly until your arms are straight and breathe in." }
      ]
    },
    fehler: { de: "Die Ellbogen kommen nach vorn neben den Körper.", en: "Your elbows come forward beside your body." }
  },
  "low-pulley-dual-cable-biceps-curl": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell beide Rollen ganz nach unten und häng je einen Griff ein. Nimm in jede Hand einen Griff im Untergriff und stell dich mittig zwischen die Rollen. Die Arme hängen leicht nach außen." },
        { titel: "Curlen", text: "Beug beide Ellbogen und zieh die Hände nach oben zu den Schultern. Atme dabei aus. Die Oberarme bleiben ruhig." },
        { titel: "Absenken", text: "Lass die Hände langsam ab, bis die Arme fast gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Set both pulleys all the way down and attach a handle to each. Take one handle in each hand underhand and stand centered between the pulleys. Your arms hang slightly out to the sides." },
        { titel: "Curl", text: "Bend both elbows and pull your hands up to your shoulders. Breathe out. Your upper arms stay still." },
        { titel: "Lower", text: "Lower your hands slowly until your arms are almost straight and breathe in." }
      ]
    },
    fehler: { de: "Die Ellbogen heben sich zur Seite, und die Schultern helfen mit.", en: "Your elbows lift out to the sides and your shoulders help." }
  },
  "cable-concentration-curl": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell eine Bank vor die untere Rolle und häng einen einzelnen Griff ein. Setz dich mit breiten Beinen, greif den Griff im Untergriff und leg den Ellbogen innen an den Oberschenkel. Der Arm ist fast gestreckt." },
        { titel: "Curlen", text: "Zieh die Hand nach oben zur Schulter und atme aus. Der Ellbogen bleibt am Oberschenkel." },
        { titel: "Absenken", text: "Lass die Hand langsam ab und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Place a bench in front of the low pulley and attach a single handle. Sit with your legs wide, grip the handle underhand and rest your elbow against the inside of your thigh. Your arm is almost straight." },
        { titel: "Curl", text: "Pull your hand up to your shoulder and breathe out. Your elbow stays on your thigh." },
        { titel: "Lower", text: "Lower your hand slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du richtest den Oberkörper bei jeder Wiederholung auf und ziehst so mit.", en: "You straighten your torso on every rep and pull with it." }
  },
  "single-arm-crucifix-curl": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle etwas über Schulterhöhe und häng einen einzelnen Griff ein. Stell dich seitlich zur Rolle und greif ihn im Untergriff. Geh so weit weg, dass der Arm gestreckt zur Seite zeigt und das Gewicht angehoben ist." },
        { titel: "Curlen", text: "Beug den Ellbogen und zieh die Hand zum Ohr. Atme dabei aus. Der Oberarm bleibt waagerecht." },
        { titel: "Zurück", text: "Streck den Arm langsam wieder zur Seite und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley a little above shoulder height and attach a single handle. Stand side-on to the pulley and grip it underhand. Step away far enough that your arm points straight out to the side and the weight is lifted." },
        { titel: "Curl", text: "Bend your elbow and pull your hand to your ear. Breathe out. Your upper arm stays horizontal." },
        { titel: "Return", text: "Straighten your arm slowly back out to the side and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Der Ellbogen sinkt beim Curlen nach unten.", en: "Your elbow drops as you curl." }
  },
  "seated-crucifix-curl": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell beide Rollen etwas über Schulterhöhe und häng je einen Griff ein. Stell eine Bank mittig dazwischen. Nimm beide Griffe im Untergriff und setz dich. Die Arme zeigen gestreckt zur Seite." },
        { titel: "Curlen", text: "Beug beide Ellbogen und zieh die Hände zu den Ohren. Atme dabei aus. Die Oberarme bleiben waagerecht." },
        { titel: "Zurück", text: "Streck die Arme langsam wieder zur Seite und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Set both pulleys a little above shoulder height and attach a handle to each. Place a bench centered between them. Take both handles underhand and sit down. Your arms point straight out to the sides." },
        { titel: "Curl", text: "Bend both elbows and pull your hands to your ears. Breathe out. Your upper arms stay horizontal." },
        { titel: "Return", text: "Straighten your arms slowly back out to the sides and breathe in." }
      ]
    },
    fehler: { de: "Die Ellbogen sinken, oder die Schultern ziehen zu den Ohren.", en: "Your elbows drop, or your shoulders shrug up to your ears." }
  },
  "pin-loaded-machine-preacher-curl": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Stell den Sitz so ein, dass die Oberarme flach auf dem Polster liegen und die Ellbogen auf Höhe der Drehachse sind. Steck den Stift und greif die Griffe im Untergriff." },
        { titel: "Curlen", text: "Beug die Ellbogen und zieh die Griffe nach oben. Atme dabei aus. Die Oberarme bleiben auf dem Polster." },
        { titel: "Absenken", text: "Lass die Griffe langsam ab, bis die Arme fast gestreckt sind, und atme ein. Die Gewichtsplatten setzen nicht auf." }
      ],
      en: [
        { titel: "Set up", text: "Adjust the seat so your upper arms lie flat on the pad and your elbows are level with the pivot point. Set the pin and grip the handles underhand." },
        { titel: "Curl", text: "Bend your elbows and pull the handles up. Breathe out. Your upper arms stay on the pad." },
        { titel: "Lower", text: "Lower the handles slowly until your arms are almost straight and breathe in. The weight plates do not touch down." }
      ]
    },
    fehler: { de: "Das Gesäß hebt vom Sitz ab, oder die Ellbogen lösen sich vom Polster.", en: "Your glutes lift off the seat, or your elbows come off the pad." },
    sicherheit: { de: "Streck die Ellbogen unten nicht ruckartig durch.", en: "Do not snap your elbows straight at the bottom." }
  },
  "single-arm-pin-loaded-machine-preacher-curl": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Stell den Sitz wie für beide Arme ein und steck weniger als die Hälfte des Gewichts. Leg einen Oberarm flach auf das Polster und greif den Griff. Die freie Hand hält sich am Polster fest." },
        { titel: "Curlen", text: "Beug den Ellbogen und zieh den Griff nach oben. Atme dabei aus." },
        { titel: "Absenken", text: "Lass den Griff langsam ab, bis der Arm fast gestreckt ist, und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Adjust the seat as for both arms and select less than half the weight. Lay one upper arm flat on the pad and grip the handle. Your free hand holds on to the pad." },
        { titel: "Curl", text: "Bend your elbow and pull the handle up. Breathe out." },
        { titel: "Lower", text: "Lower the handle slowly until your arm is almost straight and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du drehst die Schulter nach vorn über das Polster.", en: "You roll your shoulder forward over the pad." },
    sicherheit: { de: "Streck den Ellbogen unten nicht ruckartig durch.", en: "Do not snap your elbow straight at the bottom." }
  },
  "ez-bar-curl": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh aufrecht, die Füße hüftbreit. Greif die SZ-Stange von unten an den äußeren schrägen Griffstellen. Die Ellbogen liegen am Körper." },
        { titel: "Curlen", text: "Zieh die Stange in einem Bogen nach oben, bis sie vor den Schultern ist, und atme aus. Die Oberarme bleiben ruhig." },
        { titel: "Absenken", text: "Lass die Stange langsam ab, bis die Arme fast gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Stand upright, feet hip width apart. Grip the EZ bar from below on the outer angled sections. Your elbows rest against your body." },
        { titel: "Curl", text: "Pull the bar up in an arc until it is in front of your shoulders and breathe out. Your upper arms stay still." },
        { titel: "Lower", text: "Lower the bar slowly until your arms are almost straight and breathe in." }
      ]
    },
    fehler: { de: "Du schwingst die Stange mit der Hüfte hoch.", en: "You swing the bar up with your hips." }
  },
  "alternating-dumbbell-curl": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh aufrecht mit einer Hantel in jeder Hand. Die Arme hängen seitlich, die Handflächen zeigen zum Körper." },
        { titel: "Curlen", text: "Zieh eine Hantel nach oben zur Schulter und dreh die Handfläche dabei nach oben. Atme dabei aus. Der andere Arm bleibt unten." },
        { titel: "Absenken und wechseln", text: "Lass die Hantel langsam ab und atme ein. Erst wenn sie unten ist, startet der andere Arm." }
      ],
      en: [
        { titel: "Setup", text: "Stand upright with a dumbbell in each hand. Your arms hang at your sides, palms facing your body." },
        { titel: "Curl", text: "Pull one dumbbell up to your shoulder and turn your palm up as you do. Breathe out. The other arm stays down." },
        { titel: "Lower and switch", text: "Lower the dumbbell slowly and breathe in. Only when it is down does the other arm start." }
      ]
    },
    fehler: { de: "Du neigst den Oberkörper bei jeder Wiederholung zur Gegenseite.", en: "You lean your torso to the opposite side on every rep." }
  },
  "seated-dumbbell-curl": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz dich aufrecht auf eine Bank, am besten mit steiler Lehne. Die Arme hängen mit den Hanteln seitlich neben der Bank." },
        { titel: "Curlen", text: "Zieh beide Hanteln nach oben zu den Schultern und dreh die Handflächen dabei nach oben. Atme dabei aus." },
        { titel: "Absenken", text: "Lass die Hanteln langsam ab, bis die Arme fast gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Sit upright on a bench, ideally with a steep backrest. Your arms hang with the dumbbells at your sides beside the bench." },
        { titel: "Curl", text: "Pull both dumbbells up to your shoulders and turn your palms up as you do. Breathe out." },
        { titel: "Lower", text: "Lower the dumbbells slowly until your arms are almost straight and breathe in." }
      ]
    },
    fehler: { de: "Du lehnst dich zurück und drückst den Rücken ins Hohlkreuz.", en: "You lean back and arch your lower back." }
  },
  "incline-dumbbell-curl": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Lehne auf etwa 45 bis 60°. Setz dich und lehn Rücken und Kopf an. Die Arme hängen mit den Hanteln gerade nach unten, die Handflächen zeigen nach vorn." },
        { titel: "Curlen", text: "Beug die Ellbogen und zieh die Hanteln nach oben. Atme dabei aus. Die Ellbogen bleiben hinten und zeigen zum Boden." },
        { titel: "Absenken", text: "Lass die Hanteln langsam ab, bis die Arme ganz lang sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Set the backrest to about 45 to 60°. Sit down and lean your back and head against it. Your arms hang straight down with the dumbbells, palms facing forward." },
        { titel: "Curl", text: "Bend your elbows and pull the dumbbells up. Breathe out. Your elbows stay back and point to the floor." },
        { titel: "Lower", text: "Lower the dumbbells slowly until your arms are fully long and breathe in." }
      ]
    },
    fehler: { de: "Die Ellbogen kommen beim Curlen nach vorn, oder die Schultern lösen sich von der Lehne.", en: "Your elbows come forward as you curl, or your shoulders come off the backrest." },
    tipp: { de: "Nimm leichtere Hanteln als im Stehen.", en: "Use lighter dumbbells than when standing." }
  },
  "konzentrationscurls": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz dich mit breiten Beinen auf eine Bank und beug dich leicht vor. Halt die Hantel in einer Hand und leg den Ellbogen innen an den Oberschenkel. Der Arm hängt fast gestreckt." },
        { titel: "Curlen", text: "Zieh die Hantel nach oben zur Schulter und atme aus. Der Oberarm bewegt sich nicht." },
        { titel: "Absenken", text: "Lass die Hantel langsam ab und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Sit on a bench with your legs wide and lean forward slightly. Hold the dumbbell in one hand and rest your elbow against the inside of your thigh. Your arm hangs almost straight." },
        { titel: "Curl", text: "Pull the dumbbell up to your shoulder and breathe out. Your upper arm does not move." },
        { titel: "Lower", text: "Lower the dumbbell slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du hilfst mit dem Oberkörper oder drückst den Ellbogen mit dem Bein hoch.", en: "You help with your torso or push your elbow up with your leg." }
  },
  "cross-body-hammer-curl": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh aufrecht mit einer Hantel in jeder Hand. Die Handflächen zeigen zum Körper." },
        { titel: "Curlen", text: "Zieh eine Hantel quer vor der Brust nach oben in Richtung der anderen Schulter. Atme dabei aus. Der Daumen bleibt oben, der Ellbogen bleibt am Körper." },
        { titel: "Absenken und wechseln", text: "Lass die Hantel langsam ab und atme ein. Dann ist der andere Arm dran." }
      ],
      en: [
        { titel: "Setup", text: "Stand upright with a dumbbell in each hand. Your palms face your body." },
        { titel: "Curl", text: "Pull one dumbbell up across your chest toward the opposite shoulder. Breathe out. Your thumb stays on top and your elbow stays against your body." },
        { titel: "Lower and switch", text: "Lower the dumbbell slowly and breathe in. Then it is the other arm's turn." }
      ]
    },
    fehler: { de: "Du drehst den Oberkörper mit, statt nur den Unterarm zu bewegen.", en: "You rotate your torso along instead of moving only your forearm." }
  },
  "reverse-barbell-curl": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh aufrecht und greif die Stange von oben etwa schulterbreit. Die Daumen liegen um die Stange, die Ellbogen am Körper." },
        { titel: "Curlen", text: "Zieh die Stange nach oben, bis die Unterarme fast senkrecht stehen, und atme aus. Die Handgelenke bleiben gerade." },
        { titel: "Absenken", text: "Lass die Stange langsam ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Stand upright and grip the bar from above at about shoulder width. Your thumbs are wrapped around the bar and your elbows rest against your body." },
        { titel: "Curl", text: "Pull the bar up until your forearms are almost vertical and breathe out. Your wrists stay straight." },
        { titel: "Lower", text: "Lower the bar slowly and breathe in." }
      ]
    },
    fehler: { de: "Die Handgelenke knicken nach unten ab, oder die Ellbogen gehen nach außen.", en: "Your wrists bend downward, or your elbows flare out." },
    tipp: { de: "Nimm deutlich weniger Gewicht als bei normalen Curls. Eine SZ-Stange ist für die Handgelenke oft angenehmer.", en: "Use clearly less weight than for regular curls. An EZ bar is often easier on the wrists." }
  },
  "reverse-dumbbell-curl": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh aufrecht mit einer Hantel in jeder Hand. Die Handrücken zeigen nach vorn, die Ellbogen liegen am Körper." },
        { titel: "Curlen", text: "Zieh beide Hanteln nach oben, die Handrücken zeigen dabei nach oben. Atme dabei aus." },
        { titel: "Absenken", text: "Lass die Hanteln langsam ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Stand upright with a dumbbell in each hand. The backs of your hands face forward and your elbows rest against your body." },
        { titel: "Curl", text: "Pull both dumbbells up, with the backs of your hands facing up. Breathe out." },
        { titel: "Lower", text: "Lower the dumbbells slowly and breathe in." }
      ]
    },
    fehler: { de: "Die Hände drehen sich beim Curlen in den Hammergriff.", en: "Your hands rotate into the hammer grip as you curl." }
  },
  "zottman-curl": {
    schritte: {
      de: [
        { titel: "Curlen", text: "Steh aufrecht mit einer Hantel in jeder Hand, die Handflächen zeigen nach vorn. Zieh die Hanteln nach oben zu den Schultern und atme aus." },
        { titel: "Drehen", text: "Dreh oben beide Hände, bis die Handflächen nach unten zeigen." },
        { titel: "Absenken", text: "Lass die Hanteln im Obergriff langsam ab und atme ein. Dreh die Hände unten wieder zurück." }
      ],
      en: [
        { titel: "Curl", text: "Stand upright with a dumbbell in each hand, palms facing forward. Pull the dumbbells up to your shoulders and breathe out." },
        { titel: "Rotate", text: "At the top, rotate both hands until your palms face down." },
        { titel: "Lower", text: "Lower the dumbbells slowly in the overhand grip and breathe in. Rotate your hands back at the bottom." }
      ]
    },
    fehler: { de: "Du lässt die Hanteln nach dem Drehen schnell fallen. Der langsame Weg nach unten ist der wichtigste Teil.", en: "You let the dumbbells drop quickly after rotating. The slow way down is the most important part." },
    tipp: { de: "Wähl das Gewicht nach dem Weg nach unten. Im Obergriff bist du schwächer.", en: "Choose the weight for the way down. You are weaker in the overhand grip." }
  },
  "drag-curl": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh aufrecht und greif die Stange im Untergriff etwa schulterbreit. Sie liegt an den Oberschenkeln." },
        { titel: "Hochziehen", text: "Zieh die Ellbogen nach hinten und die Stange dicht am Körper nach oben, bis sie am unteren Brustkorb ist. Atme dabei aus." },
        { titel: "Absenken", text: "Lass die Stange am Körper entlang langsam ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Stand upright and grip the bar underhand at about shoulder width. It rests against your thighs." },
        { titel: "Pull up", text: "Pull your elbows back and the bar up close along your body until it is at your lower rib cage. Breathe out." },
        { titel: "Lower", text: "Lower the bar slowly along your body and breathe in." }
      ]
    },
    fehler: { de: "Die Stange löst sich vom Körper, und es wird ein normaler Curl. Oder die Schultern ziehen hoch.", en: "The bar comes away from your body and it becomes a regular curl. Or your shoulders shrug up." }
  },
  "commando-chin-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell dich so unter die Stange, dass sie über dir von vorn nach hinten verläuft. Greif mit beiden Händen dicht hintereinander, die Handflächen zeigen zueinander. Häng mit gestreckten Armen." },
        { titel: "Hochziehen", text: "Zieh dich hoch und führ den Kopf an einer Seite der Stange vorbei, bis die Schulter die Stange fast berührt. Atme dabei aus." },
        { titel: "Absenken", text: "Lass dich langsam ab und atme ein. Bei der nächsten Wiederholung geht der Kopf auf die andere Seite. Tausch nach dem Satz, welche Hand vorn greift." }
      ],
      en: [
        { titel: "Setup", text: "Stand under the bar so that it runs from front to back above you. Grip it with both hands close together, one in front of the other, palms facing each other. Hang with your arms straight." },
        { titel: "Pull up", text: "Pull yourself up and bring your head past one side of the bar until your shoulder almost touches the bar. Breathe out." },
        { titel: "Lower", text: "Lower yourself slowly and breathe in. On the next rep, your head goes to the other side. After the set, switch which hand is in front." }
      ]
    },
    fehler: { de: "Du schwingst mit den Beinen, um am Kopf vorbeizukommen.", en: "You swing your legs to get past the bar with your head." }
  },
  "towel-chin-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg ein stabiles Handtuch über die Stange und greif mit jeder Hand ein Ende. Die Hände sind dicht beieinander, die Handflächen zeigen zueinander. Häng mit gestreckten Armen." },
        { titel: "Hochziehen", text: "Zieh dich hoch, bis die Hände auf Höhe der Brust sind, und atme aus. Die Ellbogen bleiben eng am Körper." },
        { titel: "Absenken", text: "Lass dich langsam ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Hang one sturdy towel over the bar and grip one end with each hand. Your hands are close together, palms facing each other. Hang with your arms straight." },
        { titel: "Pull up", text: "Pull yourself up until your hands are level with your chest and breathe out. Your elbows stay close to your body." },
        { titel: "Lower", text: "Lower yourself slowly and breathe in." }
      ]
    },
    fehler: { de: "Der Griff rutscht nach, und du greifst mitten in der Wiederholung um. Beende den Satz vorher.", en: "Your grip slips and you regrip in the middle of a rep. End the set before that happens." },
    sicherheit: { de: "Nimm nur ein festes, trockenes Handtuch. Zieh einmal kräftig daran, bevor du dich hineinhängst.", en: "Only use a strong, dry towel. Give it one hard pull before you hang from it." }
  },
  "archer-chin-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Greif die Stange sehr breit. Die Hand des ziehenden Arms greift von unten, die andere liegt von oben auf der Stange. Häng mit gestreckten Armen." },
        { titel: "Zur Seite ziehen", text: "Zieh dich zur Hand im Untergriff hoch, bis das Kinn über dieser Hand ist. Atme dabei aus. Der andere Arm streckt sich über der Stange zur Seite." },
        { titel: "Absenken", text: "Lass dich langsam zur Mitte ab und atme ein. Mach alle Wiederholungen einer Seite, dann wechsle den Griff." }
      ],
      en: [
        { titel: "Setup", text: "Grip the bar very wide. The hand of the pulling arm grips from below, the other rests on top of the bar. Hang with your arms straight." },
        { titel: "Pull to one side", text: "Pull yourself up toward the underhand hand until your chin is above that hand. Breathe out. The other arm straightens out to the side above the bar." },
        { titel: "Lower", text: "Lower yourself slowly to the middle and breathe in. Do all reps on one side, then switch your grip." }
      ]
    },
    fehler: { de: "Der gestreckte Arm beugt sich und zieht mit.", en: "The straight arm bends and helps pull." },
    sicherheit: { de: "Mach die Übung erst, wenn Klimmzüge im Untergriff sauber klappen. Auf dem ziehenden Bizeps liegt viel Last.", en: "Only do this exercise once chin-ups are clean. There is a lot of load on the pulling biceps." }
  },
  "ring-chin-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng die Ringe schulterbreit auf. Häng mit gestreckten Armen in den Ringen, die Handflächen zeigen zueinander oder nach vorn." },
        { titel: "Hochziehen", text: "Zieh dich hoch und dreh die Hände dabei, bis die Handflächen zu dir zeigen. Atme dabei aus. Oben ist das Kinn über den Händen." },
        { titel: "Absenken", text: "Lass dich langsam ab, dreh die Hände zurück und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Hang the rings shoulder width apart. Hang from the rings with your arms straight, palms facing each other or forward." },
        { titel: "Pull up", text: "Pull yourself up and rotate your hands as you do, until your palms face you. Breathe out. At the top, your chin is above your hands." },
        { titel: "Lower", text: "Lower yourself slowly, rotate your hands back and breathe in." }
      ]
    },
    fehler: { de: "Die Ringe pendeln, weil du mit Schwung ziehst.", en: "The rings swing because you pull with momentum." }
  },
  "inverted-row-mit-supiniertem-griff": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg eine Stange im Rack auf Hüfthöhe fest ein. Leg dich darunter und greif sie von unten etwa schulterbreit. Die Fersen stehen am Boden, der Körper bildet eine gerade Linie." },
        { titel: "Hochziehen", text: "Zieh die Brust zur Stange und atme aus. Die Ellbogen bleiben eng am Körper." },
        { titel: "Absenken", text: "Lass dich langsam ab, bis die Arme gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Fix a bar in the rack at hip height. Lie under it and grip it from below at about shoulder width. Your heels are on the floor and your body forms a straight line." },
        { titel: "Pull up", text: "Pull your chest to the bar and breathe out. Your elbows stay close to your body." },
        { titel: "Lower", text: "Lower yourself slowly until your arms are straight and breathe in." }
      ]
    },
    fehler: { de: "Die Hüfte hängt durch.", en: "Your hips sag." },
    sicherheit: { de: "Die Stange muss so liegen, dass sie beim Ziehen nicht aus den Haken rollen kann.", en: "The bar must sit so that it cannot roll out of the hooks as you pull." }
  }
});
