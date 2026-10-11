// Die Erklärungen der Muskelgruppe Brust. Sie kommen zu den Einträgen aus der erklaerungen.js dazu,
// deshalb muss diese Datei in der index.html nach der erklaerungen.js stehen. Aufbau wie dort:
// Schlüssel ist die Übungs-ID, pro Übung schritte (2 bis 3) und optional fehler, sicherheit, tipp, alle in de und en.
// Die Datei hat in der index.html und in der sw.js kein ?v=N: Der Service Worker holt sie bei jeder neuen VERSION frisch.
Object.assign(ERKLAERUNGEN, {
  "bankdruecken-multi": {
    schritte: {
      de: [
        { titel: "Bank ausrichten", text: "Schieb die Bank so unter die Stange, dass sie beim Absenken auf der unteren Brust ankommt. Prüf das mit der leeren Stange, denn sie läuft auf einer festen Bahn und lässt sich unterwegs nicht korrigieren." },
        { titel: "Aushängen", text: "Zieh die Schulterblätter zusammen und nach unten, die Füße stehen fest. Greif etwas breiter als schulterbreit, drück die Stange leicht an und dreh sie aus den Haken." },
        { titel: "Senken und drücken", text: "Senk die Stange kontrolliert zur unteren Brust und atme dabei ein. Drück sie nach oben, bis die Arme fast gestreckt sind, und atme aus. Nach der letzten Wiederholung drehst du die Stange zurück in die Haken." }
      ],
      en: [
        { titel: "Position the bench", text: "Slide the bench under the bar so the bar meets your lower chest when you lower it. Check this with the empty bar, because it runs on a fixed track and cannot be corrected on the way." },
        { titel: "Unrack", text: "Pull your shoulder blades together and down, feet planted. Grip a little wider than shoulder width, push the bar up slightly and rotate it out of the hooks." },
        { titel: "Lower and press", text: "Lower the bar under control to your lower chest and breathe in. Press it up until your arms are almost straight and breathe out. After the last rep, rotate the bar back into the hooks." }
      ]
    },
    fehler: { de: "Die Bank steht zu weit vorn oder hinten. Dann kommt die Stange am Hals oder am Bauch an statt auf der Brust.", en: "The bench is too far forward or back. Then the bar lands at your neck or your belly instead of your chest." },
    sicherheit: { de: "Stell die Stopper so ein, dass sie die Stange knapp unter deinem tiefsten Punkt auffangen.", en: "Set the safety stops so they catch the bar just below your lowest point." }
  },
  "bankdruecken-multi-breit": {
    schritte: {
      de: [
        { titel: "Griff finden", text: "Richte die Bank so aus, dass die Stange auf der Brust ankommt. Setz jede Hand etwa eine Handbreit weiter nach außen als beim normalen Griff. Beide Hände sind gleich weit von der Mitte entfernt." },
        { titel: "Absenken", text: "Dreh die Stange aus den Haken und senk sie kontrolliert zur Brust. Atme dabei ein. Die Ellbogen gehen weiter nach außen als sonst, zeigen aber immer noch leicht schräg nach unten." },
        { titel: "Drücken", text: "Drück die Stange nach oben und atme aus. Der Weg ist kürzer als mit normalem Griff." }
      ],
      en: [
        { titel: "Find your grip", text: "Position the bench so the bar meets your chest. Place each hand about a hand's width further out than with your normal grip. Both hands are the same distance from the center." },
        { titel: "Lower", text: "Rotate the bar out of the hooks and lower it under control to your chest. Breathe in. Your elbows travel further out than usual but still point slightly down." },
        { titel: "Press", text: "Press the bar up and breathe out. The path is shorter than with a normal grip." }
      ]
    },
    fehler: { de: "Du greifst so breit, dass es vorn in der Schulter zieht. Rück die Hände dann wieder ein Stück nach innen.", en: "Your grip is so wide that you feel a pull in the front of your shoulder. Move your hands back in a little." },
    sicherheit: { de: "Stell die Stopper ein, bevor du Gewicht auflegst.", en: "Set the safety stops before you load the bar." },
    tipp: { de: "Fang mit weniger Gewicht an als mit normalem Griff, bis sich der breite Griff sicher anfühlt.", en: "Start with less weight than with your normal grip until the wide grip feels secure." }
  },
  "pause-smith-machine-bench-press": {
    schritte: {
      de: [
        { titel: "Vorbereiten", text: "Richte die Bank so aus, dass die Stange auf der unteren Brust ankommt, und stell die Stopper ein. Nimm weniger Gewicht als ohne Pause." },
        { titel: "Absenken und halten", text: "Senk die Stange kontrolliert und atme ein. Lass sie die Brust nur leicht berühren und halt sie dort ein bis zwei Sekunden. Brust, Rücken und Beine bleiben angespannt." },
        { titel: "Drücken", text: "Drück die Stange aus dem Stillstand nach oben, ohne Schwung zu holen, und atme aus." }
      ],
      en: [
        { titel: "Prepare", text: "Position the bench so the bar meets your lower chest and set the safety stops. Use less weight than without the pause." },
        { titel: "Lower and hold", text: "Lower the bar under control and breathe in. Let it touch your chest only lightly and hold it there for one to two seconds. Keep chest, back and legs tight." },
        { titel: "Press", text: "Press the bar up from a dead stop, without any bounce, and breathe out." }
      ]
    },
    fehler: { de: "In der Pause lässt du die Spannung los, und die Stange sackt auf den Brustkorb.", en: "You relax during the pause and the bar sinks onto your rib cage." },
    sicherheit: { de: "Stell die Stopper so ein, dass sie die Stange auffangen, wenn die Pause zu lang wird oder die Kraft nachlässt.", en: "Set the safety stops so they catch the bar if the pause gets too long or your strength gives out." },
    tipp: { de: "Zähl die Pause still mit, zum Beispiel „einundzwanzig, zweiundzwanzig“. So wird sie nicht von Satz zu Satz kürzer.", en: "Count the pause silently, for example \"one thousand one, one thousand two\". That keeps it from getting shorter from set to set." }
  },
  "bankdruecken-kh-neutral": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz dich auf die Bank und leg die Hanteln auf den Oberschenkeln ab. Leg dich zurück und heb sie über die Brust. Dreh die Hände so, dass die Handflächen zueinander zeigen. Die Hanteln stehen parallel wie zwei Schienen." },
        { titel: "Absenken", text: "Senk die Hanteln neben den Brustkorb und atme ein. Die Ellbogen gleiten dabei nah am Körper entlang." },
        { titel: "Drücken", text: "Drück die Hanteln gerade nach oben und atme aus. Die Handflächen zeigen die ganze Zeit zueinander. Am Ende führst du die Hanteln zur Brust, setzt dich auf und legst sie wieder auf den Oberschenkeln ab." }
      ],
      en: [
        { titel: "Setup", text: "Sit on the bench and rest the dumbbells on your thighs. Lie back and lift them over your chest. Turn your hands so your palms face each other. The dumbbells are parallel, like two rails." },
        { titel: "Lower", text: "Lower the dumbbells beside your rib cage and breathe in. Your elbows glide close along your body." },
        { titel: "Press", text: "Press the dumbbells straight up and breathe out. Your palms face each other the whole time. At the end, bring the dumbbells to your chest, sit up and rest them on your thighs again." }
      ]
    },
    fehler: { de: "Die Hände drehen sich beim Drücken nach vorn, und die Ellbogen wandern zur Seite. Dann ist es wieder das normale Bankdrücken.", en: "Your hands rotate forward as you press and your elbows drift out to the side. Then it is the regular bench press again." }
  },
  "bankdruecken-kh-einarmig": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz dich auf die Bank und stell die Hantel auf einem Oberschenkel ab. Halt sie mit beiden Händen, leg dich zurück und heb sie über die Brust. Stell die Füße etwas breiter als sonst. Die freie Hand liegt danach auf dem Bauch." },
        { titel: "Rumpf anspannen", text: "Spann Bauch und Po an, bevor du absenkst. Beide Schultern und die Hüfte bleiben flach auf der Bank." },
        { titel: "Senken und drücken", text: "Senk die Hantel neben die Brust und atme ein. Drück sie nach oben und atme aus. Mach erst alle Wiederholungen einer Seite, dann wechsle. Am Ende nimmst du die Hantel mit beiden Händen an die Brust, setzt dich auf und legst sie auf dem Oberschenkel ab." }
      ],
      en: [
        { titel: "Setup", text: "Sit on the bench and stand the dumbbell on one thigh. Hold it with both hands, lie back and lift it over your chest. Place your feet a little wider than usual. Your free hand then rests on your belly." },
        { titel: "Brace", text: "Tighten your abs and glutes before you lower. Both shoulders and your hips stay flat on the bench." },
        { titel: "Lower and press", text: "Lower the dumbbell beside your chest and breathe in. Press it up and breathe out. Do all reps on one side first, then switch. At the end, take the dumbbell to your chest with both hands, sit up and rest it on your thigh." }
      ]
    },
    fehler: { de: "Der Körper rollt zur Seite der Hantel, oder die Hüfte dreht sich mit.", en: "Your body rolls toward the dumbbell side, or your hips twist with it." },
    tipp: { de: "Starte mit einer leichteren Hantel als beim Drücken mit zwei Hanteln.", en: "Start with a lighter dumbbell than you use for pressing with two." }
  },
  "bankdruecken-kb": {
    schritte: {
      de: [
        { titel: "Griff", text: "Greif den Henkel so, dass die Kugel auf der Rückseite des Unterarms aufliegt. Der Henkel liegt schräg in der Handfläche, das Handgelenk ist gerade." },
        { titel: "Ausgangsposition", text: "Setz dich auf die Bank, halt die Kettlebells nah an der Brust und leg dich zurück. Die Füße stehen fest, die Schulterblätter sind zusammen und unten." },
        { titel: "Senken und drücken", text: "Senk die Ellbogen schräg nach unten, bis die Hände neben der Brust sind, und atme ein. Drück die Kettlebells nach oben, bis die Arme fast gestreckt sind, und atme aus." }
      ],
      en: [
        { titel: "Grip", text: "Grip the handle so the bell rests on the back of your forearm. The handle sits diagonally in your palm and your wrist is straight." },
        { titel: "Setup", text: "Sit on the bench, hold the kettlebells close to your chest and lie back. Your feet are planted, your shoulder blades together and down." },
        { titel: "Lower and press", text: "Lower your elbows at an angle until your hands are beside your chest, and breathe in. Press the kettlebells up until your arms are almost straight and breathe out." }
      ]
    },
    fehler: { de: "Das Handgelenk knickt nach hinten ab, weil die Kugel am Unterarm zieht.", en: "Your wrist bends back because the bell pulls on your forearm." },
    sicherheit: { de: "Bring die Kettlebells am Ende zurück an die Brust, setz dich auf und stell sie dann ab. Bei viel Gewicht hilft ein Partner.", en: "At the end, bring the kettlebells back to your chest, sit up and then set them down. With heavy weight, a partner helps." }
  },
  "bankdruecken-lh-breit": {
    schritte: {
      de: [
        { titel: "Griff", text: "Leg dich so hin, dass die Augen unter der Stange liegen. Setz jede Hand etwa eine Handbreit weiter nach außen als beim normalen Bankdrücken. Die Markierungen auf der Stange helfen dir, beide Hände gleich weit zu setzen." },
        { titel: "Ausheben", text: "Zieh die Schulterblätter zusammen und nach unten. Heb die Stange aus dem Ständer und bring sie über die Brust. Mit breitem Griff ist das schwerer als sonst, lass dir bei viel Gewicht dabei helfen." },
        { titel: "Senken und drücken", text: "Senk die Stange kontrolliert zur Brust und atme ein. Drück sie nach oben, bis die Arme fast gestreckt sind, und atme aus." }
      ],
      en: [
        { titel: "Grip", text: "Lie down with your eyes under the bar. Place each hand about a hand's width further out than for the regular bench press. The markings on the bar help you place both hands evenly." },
        { titel: "Unrack", text: "Pull your shoulder blades together and down. Lift the bar out of the rack and bring it over your chest. This is harder with a wide grip, so get help with it when the weight is heavy." },
        { titel: "Lower and press", text: "Lower the bar under control to your chest and breathe in. Press it up until your arms are almost straight and breathe out." }
      ]
    },
    fehler: { de: "Die Ellbogen stehen im rechten Winkel zur Seite ab. Lass sie auch mit breitem Griff leicht schräg nach unten zeigen.", en: "Your elbows flare straight out to the side at a right angle. Even with a wide grip, let them point slightly down." },
    sicherheit: { de: "Trainiere mit einem Trainingspartner oder im Rack mit Sicherheitsbügeln. Die Daumen liegen um die Stange.", en: "Train with a spotter or in a rack with safety bars. Wrap your thumbs around the bar." }
  },
  "reverse-grip-barbell-bench-press": {
    schritte: {
      de: [
        { titel: "Griff", text: "Leg dich hin und greif die Stange von unten: Die Handflächen zeigen zu deinem Gesicht, die Daumen nach außen. Greif etwas breiter als schulterbreit und leg die Daumen um die Stange." },
        { titel: "Ausheben", text: "Lass dir die Stange aus dem Ständer heben, im Untergriff ist das allein schwierig. Bring sie über die untere Brust." },
        { titel: "Senken und drücken", text: "Senk die Stange etwas tiefer als beim normalen Bankdrücken, etwa zum unteren Rand der Brust, und atme ein. Die Ellbogen bleiben nah am Körper. Drück die Stange nach oben und atme aus." }
      ],
      en: [
        { titel: "Grip", text: "Lie down and grip the bar from below: your palms face your face and your thumbs point outward. Grip a little wider than shoulder width and wrap your thumbs around the bar." },
        { titel: "Unrack", text: "Have someone lift the bar out of the rack for you, because doing it alone with a reverse grip is difficult. Bring it over your lower chest." },
        { titel: "Lower and press", text: "Lower the bar a little lower than in the regular bench press, to about the bottom edge of your chest, and breathe in. Keep your elbows close to your body. Press the bar up and breathe out." }
      ]
    },
    fehler: { de: "Du startest mit dem Gewicht vom normalen Bankdrücken.", en: "You start with your regular bench press weight." },
    sicherheit: { de: "Nur mit Trainingspartner oder im Rack mit Sicherheitsbügeln. Im Untergriff kann die Stange leichter aus der Hand rutschen. Er belastet außerdem Handgelenke und Ellbogen stärker, beginne deshalb deutlich leichter.", en: "Only with a spotter or in a rack with safety bars. With a reverse grip the bar can slip out of your hands more easily. It also puts more stress on wrists and elbows, so start much lighter." }
  },
  "dumbbell-squeeze-press": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich mit zwei Kurzhanteln auf die Bank und bring sie über die Brust. Die Handflächen zeigen zueinander. Press die Hanteln fest aneinander." },
        { titel: "Absenken", text: "Senk die Hanteln zur Mitte der Brust und atme ein. Der Druck gegeneinander bleibt." },
        { titel: "Drücken", text: "Drück die Hanteln nach oben und atme aus. Press sie dabei weiter zusammen." }
      ],
      en: [
        { titel: "Setup", text: "Lie on the bench with two dumbbells and bring them over your chest. Your palms face each other. Press the dumbbells firmly together." },
        { titel: "Lower", text: "Lower the dumbbells to the middle of your chest and breathe in. Keep pressing them against each other." },
        { titel: "Press", text: "Press the dumbbells up and breathe out. Keep squeezing them together as you go." }
      ]
    },
    fehler: { de: "Der Druck lässt nach, und die Hanteln lösen sich voneinander. Dann fehlt genau das, was die Übung ausmacht.", en: "The pressure fades and the dumbbells come apart. Then the very thing that defines the exercise is missing." },
    tipp: { de: "Nimm deutlich leichtere Hanteln als beim normalen Bankdrücken. Sechseckige Hanteln liegen stabiler aneinander als runde.", en: "Use much lighter dumbbells than for the regular bench press. Hex dumbbells sit against each other more securely than round ones." }
  },
  "close-grip-dumbbell-press": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich mit zwei Kurzhanteln auf die Bank. Halt sie mit den Handflächen zueinander dicht nebeneinander über der Brust. Sie dürfen sich berühren, du presst sie aber nicht zusammen." },
        { titel: "Absenken", text: "Senk die Hanteln zur unteren Brust und atme ein. Die Ellbogen bleiben eng am Körper." },
        { titel: "Drücken", text: "Streck die Arme nach oben und atme aus. Die Arbeit kommt hier stärker aus dem Trizeps." }
      ],
      en: [
        { titel: "Setup", text: "Lie on the bench with two dumbbells. Hold them close together over your chest with your palms facing each other. They may touch, but you do not squeeze them together." },
        { titel: "Lower", text: "Lower the dumbbells to your lower chest and breathe in. Keep your elbows tight to your body." },
        { titel: "Press", text: "Straighten your arms upward and breathe out. Here more of the work comes from the triceps." }
      ]
    },
    fehler: { de: "Die Ellbogen gehen nach außen auf. Dann wird daraus das normale Bankdrücken mit Kurzhanteln.", en: "Your elbows open out to the sides. Then it turns into the regular dumbbell bench press." }
  },
  "schraegbank-45-kh": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Bank auf etwa 45°. Setz dich hin und leg die Hanteln auf den Oberschenkeln ab. Lehn dich zurück und bring sie nacheinander mit einem Stoß der Knie auf Schulterhöhe." },
        { titel: "Absenken", text: "Zieh die Schulterblätter zusammen und nach unten. Senk die Hanteln neben die obere Brust und atme ein. Die Unterarme stehen senkrecht." },
        { titel: "Drücken", text: "Drück die Hanteln senkrecht nach oben, bis die Arme fast gestreckt sind, und atme aus. Leg sie am Ende wieder auf den Oberschenkeln ab." }
      ],
      en: [
        { titel: "Setup", text: "Set the bench to about 45°. Sit down and rest the dumbbells on your thighs. Lean back and bring them up to shoulder height one at a time with a kick of your knees." },
        { titel: "Lower", text: "Pull your shoulder blades together and down. Lower the dumbbells beside your upper chest and breathe in. Your forearms are vertical." },
        { titel: "Press", text: "Press the dumbbells straight up until your arms are almost straight and breathe out. At the end, rest them on your thighs again." }
      ]
    },
    fehler: { de: "Die Hanteln wandern nach vorn oder nach außen, statt gerade nach oben zu gehen.", en: "The dumbbells drift forward or outward instead of going straight up." }
  },
  "schraegbank-45-multi": {
    schritte: {
      de: [
        { titel: "Bank ausrichten", text: "Stell die Bank auf etwa 45° und schieb sie so unter die Stange, dass diese auf der oberen Brust ankommt, knapp unter dem Schlüsselbein. Prüf den Weg mit der leeren Stange." },
        { titel: "Aushängen", text: "Lehn Kopf und Rücken an, zieh die Schulterblätter zusammen und nach unten. Greif etwas breiter als schulterbreit und dreh die Stange aus den Haken." },
        { titel: "Senken und drücken", text: "Senk die Stange kontrolliert zur oberen Brust und atme ein. Drück sie nach oben und atme aus. Dreh sie am Ende zurück in die Haken." }
      ],
      en: [
        { titel: "Position the bench", text: "Set the bench to about 45° and slide it under the bar so the bar meets your upper chest, just below the collarbone. Check the path with the empty bar." },
        { titel: "Unrack", text: "Rest your head and back against the bench and pull your shoulder blades together and down. Grip a little wider than shoulder width and rotate the bar out of the hooks." },
        { titel: "Lower and press", text: "Lower the bar under control to your upper chest and breathe in. Press it up and breathe out. At the end, rotate it back into the hooks." }
      ]
    },
    fehler: { de: "Die Bank steht falsch. Dann kommt die Stange am Kinn oder am Bauch an statt auf der oberen Brust.", en: "The bench is in the wrong spot. Then the bar lands at your chin or your belly instead of your upper chest." },
    sicherheit: { de: "Stell die Stopper so ein, dass die Stange nicht bis zum Hals durchsacken kann.", en: "Set the safety stops so the bar cannot sink down to your neck." }
  },
  "schraegbank-45-lh-pause": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Bank auf etwa 45°. Die Augen liegen unter der Stange, die Schulterblätter sind zusammen und unten. Greif etwas breiter als schulterbreit und nimm weniger Gewicht als ohne Pause." },
        { titel: "Absenken und halten", text: "Senk die Stange zur oberen Brust und atme ein. Halt sie dort ein bis zwei Sekunden, sie berührt die Brust nur leicht. Die Unterarme bleiben senkrecht unter der Stange." },
        { titel: "Drücken", text: "Drück die Stange aus dem Stillstand gerade nach oben und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Set the bench to about 45°. Your eyes are under the bar, your shoulder blades together and down. Grip a little wider than shoulder width and use less weight than without the pause." },
        { titel: "Lower and hold", text: "Lower the bar to your upper chest and breathe in. Hold it there for one to two seconds, touching your chest only lightly. Your forearms stay vertical under the bar." },
        { titel: "Press", text: "Press the bar straight up from a dead stop and breathe out." }
      ]
    },
    fehler: { de: "In der Pause wandert die Stange aus ihrer Position. Halt sie ruhig über den Ellbogen.", en: "The bar drifts out of position during the pause. Hold it steady over your elbows." },
    sicherheit: { de: "Trainiere mit einem Trainingspartner oder im Rack mit Sicherheitsbügeln. Mit Pause fehlt am Ende des Satzes schneller die Kraft.", en: "Train with a spotter or in a rack with safety bars. With a pause, your strength runs out sooner at the end of the set." }
  },
  "schraegbank-45-kh-neutral": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Bank auf etwa 45°. Bring die Hanteln von den Oberschenkeln auf Schulterhöhe und dreh die Handflächen zueinander." },
        { titel: "Absenken", text: "Senk die Hanteln neben die obere Brust und atme ein. Die Ellbogen bleiben nah am Oberkörper." },
        { titel: "Drücken", text: "Drück die Hanteln parallel nach oben und atme aus. Sie berühren sich oben nicht. Leg sie am Ende auf den Oberschenkeln ab." }
      ],
      en: [
        { titel: "Setup", text: "Set the bench to about 45°. Bring the dumbbells from your thighs up to shoulder height and turn your palms to face each other." },
        { titel: "Lower", text: "Lower the dumbbells beside your upper chest and breathe in. Keep your elbows close to your torso." },
        { titel: "Press", text: "Press the dumbbells up in parallel and breathe out. They do not touch at the top. At the end, rest them on your thighs." }
      ]
    },
    fehler: { de: "Du drehst die Hanteln unterwegs quer. Dann gehen die Ellbogen nach außen.", en: "You turn the dumbbells sideways on the way. Then your elbows move outward." }
  },
  "schraegbank-45-lh-eng": {
    schritte: {
      de: [
        { titel: "Griff", text: "Stell die Bank auf etwa 45°. Greif die Stange etwa schulterbreit. Die Handgelenke stehen gerade über den Ellbogen." },
        { titel: "Absenken", text: "Heb die Stange aus dem Ständer und senk sie zur oberen Brust. Atme dabei ein. Die Ellbogen streifen fast die Rippen." },
        { titel: "Drücken", text: "Drück die Stange nach oben, bis die Arme fast gestreckt sind, und atme aus." }
      ],
      en: [
        { titel: "Grip", text: "Set the bench to about 45°. Grip the bar at about shoulder width. Your wrists are straight above your elbows." },
        { titel: "Lower", text: "Lift the bar out of the rack and lower it to your upper chest. Breathe in. Your elbows almost brush your ribs." },
        { titel: "Press", text: "Press the bar up until your arms are almost straight and breathe out." }
      ]
    },
    fehler: { de: "Sobald es schwer wird, klappen die Ellbogen nach außen. Dann ist es wieder das normale Schrägbankdrücken.", en: "As soon as it gets heavy, your elbows flare out. Then it is the regular incline press again." },
    sicherheit: { de: "Trainiere im Rack mit Sicherheitsbügeln oder mit einem Trainingspartner.", en: "Train in a rack with safety bars or with a spotter." }
  },
  "schraegbank-steil-lh": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Stell die Bank auf etwa 60°. Lehn Kopf und Rücken an, die Füße stehen fest. Greif etwas breiter als schulterbreit." },
        { titel: "Absenken", text: "Heb die Stange aus dem Ständer. Senk sie nah am Kinn vorbei bis zum Schlüsselbein und atme ein." },
        { titel: "Drücken", text: "Drück die Stange nach oben, bis sie über den Schultern steht, und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Set the bench to about 60°. Rest your head and back against it, feet planted. Grip a little wider than shoulder width." },
        { titel: "Lower", text: "Lift the bar out of the rack. Lower it close past your chin to your collarbone and breathe in." },
        { titel: "Press", text: "Press the bar up until it is above your shoulders and breathe out." }
      ]
    },
    fehler: { de: "Du rutschst mit dem Po nach vorn und machst ein Hohlkreuz. Damit wird die Bank heimlich flacher.", en: "You slide your hips forward and arch your lower back. That quietly makes the bench flatter." },
    sicherheit: { de: "Trainiere mit einem Trainingspartner oder im Rack mit Sicherheitsbügeln. Die Stange läuft nah am Gesicht vorbei.", en: "Train with a spotter or in a rack with safety bars. The bar travels close to your face." },
    tipp: { de: "Nimm weniger Gewicht als bei 45°. Je steiler die Bank, desto mehr arbeiten die Schultern.", en: "Use less weight than at 45°. The steeper the bench, the more your shoulders work." }
  },
  "schraegbank-steil-kh": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Bank auf etwa 60°. Stell die Hanteln aufrecht auf die Oberschenkel, lehn dich an und heb sie nacheinander neben die Schultern." },
        { titel: "Drücken", text: "Zieh die Schulterblätter nach unten. Drück die Hanteln nach oben, bis sie über den Schultern stehen, und atme aus." },
        { titel: "Absenken", text: "Senk sie langsam zurück neben die Schultern, etwa auf Höhe des Schlüsselbeins, und atme ein. Stell sie am Ende wieder auf den Oberschenkeln ab." }
      ],
      en: [
        { titel: "Setup", text: "Set the bench to about 60°. Stand the dumbbells upright on your thighs, lean back and lift them beside your shoulders one at a time." },
        { titel: "Press", text: "Pull your shoulder blades down. Press the dumbbells up until they are above your shoulders and breathe out." },
        { titel: "Lower", text: "Lower them slowly back beside your shoulders, to about collarbone height, and breathe in. At the end, stand them on your thighs again." }
      ]
    },
    fehler: { de: "Die Schultern ziehen beim Drücken zu den Ohren hoch.", en: "Your shoulders shrug up toward your ears as you press." },
    tipp: { de: "Nimm etwas leichtere Hanteln als bei 45°.", en: "Use slightly lighter dumbbells than at 45°." }
  },
  "schraegbank-steil-multi": {
    schritte: {
      de: [
        { titel: "Bank ausrichten", text: "Stell die Bank auf etwa 60° und so unter die Stange, dass diese knapp am Gesicht vorbeiläuft und nahe am Schlüsselbein ankommt. Prüf das mit der leeren Stange." },
        { titel: "Aushängen", text: "Kopf und Rücken liegen an. Greif etwas breiter als schulterbreit und dreh die Stange aus den Haken." },
        { titel: "Senken und drücken", text: "Senk die Stange bis zum Schlüsselbein und atme ein. Drück sie nach oben, atme aus und dreh sie am Ende zurück in die Haken." }
      ],
      en: [
        { titel: "Position the bench", text: "Set the bench to about 60° and place it under the bar so the bar passes just in front of your face and arrives close to your collarbone. Check this with the empty bar." },
        { titel: "Unrack", text: "Your head and back rest against the bench. Grip a little wider than shoulder width and rotate the bar out of the hooks." },
        { titel: "Lower and press", text: "Lower the bar to your collarbone and breathe in. Press it up, breathe out and rotate it back into the hooks at the end." }
      ]
    },
    fehler: { de: "Du streckst den Kopf nach vorn oder zur Seite, um der Stange auszuweichen. Stell lieber die Bank ein Stück um.", en: "You push your head forward or to the side to dodge the bar. Move the bench a little instead." },
    sicherheit: { de: "Stell die Stopper so ein, dass die Stange nicht auf Hals oder Gesicht sinken kann.", en: "Set the safety stops so the bar cannot sink onto your neck or face." }
  },
  "schraegbank-flach-lh": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Stell die Bank nur leicht schräg, etwa 15 bis 30°. Die Augen liegen unter der Stange, die Füße stehen fest. Zieh die Schulterblätter zusammen und nach unten." },
        { titel: "Absenken", text: "Heb die Stange aus dem Ständer und senk sie auf die Brust, etwas höher als beim flachen Bankdrücken. Atme dabei ein. Die Ellbogen zeigen schräg nach unten." },
        { titel: "Drücken", text: "Drück die Stange nach oben, bis die Arme fast gestreckt sind, und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Set the bench to a slight incline only, about 15 to 30°. Your eyes are under the bar, feet planted. Pull your shoulder blades together and down." },
        { titel: "Lower", text: "Lift the bar out of the rack and lower it to your chest, a little higher than in the flat bench press. Breathe in. Your elbows point down at an angle." },
        { titel: "Press", text: "Press the bar up until your arms are almost straight and breathe out." }
      ]
    },
    fehler: { de: "Du senkst die Stange aus Gewohnheit zur unteren Brust wie auf der flachen Bank.", en: "Out of habit, you lower the bar to your lower chest as on the flat bench." },
    sicherheit: { de: "Bei schweren Gewichten trainiere mit einem Trainingspartner oder im Rack mit Sicherheitsbügeln.", en: "With heavy weight, train with a spotter or in a rack with safety bars." }
  },
  "schraegbank-flach-kh": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Bank leicht schräg, etwa 15 bis 30°. Setz dich hin, leg die Hanteln auf den Oberschenkeln ab, leg dich zurück und bring sie über die obere Brust." },
        { titel: "Absenken", text: "Senk die Hanteln neben die Brust, bis du eine leichte Dehnung spürst, und atme ein. Die Handgelenke stehen gerade über den Ellbogen." },
        { titel: "Drücken", text: "Drück die Hanteln nach oben und atme aus. Sie nähern sich oben leicht an. Leg sie am Ende auf den Oberschenkeln ab." }
      ],
      en: [
        { titel: "Setup", text: "Set the bench to a slight incline, about 15 to 30°. Sit down, rest the dumbbells on your thighs, lie back and bring them over your upper chest." },
        { titel: "Lower", text: "Lower the dumbbells beside your chest until you feel a light stretch, and breathe in. Your wrists are straight above your elbows." },
        { titel: "Press", text: "Press the dumbbells up and breathe out. They move slightly toward each other at the top. At the end, rest them on your thighs." }
      ]
    },
    fehler: { de: "Die Bank ist so steil eingestellt, dass daraus das normale Schrägbankdrücken wird. Eine oder zwei Stufen über flach reichen.", en: "The bench is set so steep that it turns into the regular incline press. One or two notches above flat are enough." }
  },
  "schraegbank-flach-multi": {
    schritte: {
      de: [
        { titel: "Bank ausrichten", text: "Stell die Bank leicht schräg, etwa 15 bis 30°. Schieb sie so unter die Stange, dass diese etwas oberhalb der Brustmitte ankommt. Teste den Weg einmal ohne Gewicht." },
        { titel: "Aushängen", text: "Zieh die Schulterblätter zusammen und nach unten. Greif etwas breiter als schulterbreit und dreh die Stange aus den Haken." },
        { titel: "Senken und drücken", text: "Senk die Stange kontrolliert zur Brust und atme ein. Drück sie nach oben, atme aus und dreh sie am Ende zurück in die Haken." }
      ],
      en: [
        { titel: "Position the bench", text: "Set the bench to a slight incline, about 15 to 30°. Slide it under the bar so the bar arrives a little above the middle of your chest. Test the path once without weight." },
        { titel: "Unrack", text: "Pull your shoulder blades together and down. Grip a little wider than shoulder width and rotate the bar out of the hooks." },
        { titel: "Lower and press", text: "Lower the bar under control to your chest and breathe in. Press it up, breathe out and rotate it back into the hooks at the end." }
      ]
    },
    fehler: { de: "Du lässt die Bank dort stehen, wo sie für das flache Bankdrücken stand. Mit der Neigung passt die Position nicht mehr.", en: "You leave the bench where it stood for the flat bench press. With the incline, that position no longer fits." },
    sicherheit: { de: "Stell die Stopper ein, bevor du Gewicht auflegst.", en: "Set the safety stops before you load the bar." }
  },
  "incline-dumbbell-squeeze-press": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Bank schräg, etwa 30 bis 45°. Bring die Hanteln von den Oberschenkeln über die obere Brust. Die Handflächen zeigen zueinander, press die Hanteln aneinander." },
        { titel: "Absenken", text: "Senk die Hanteln zur oberen Brust und atme ein. Sie bleiben die ganze Zeit in Kontakt." },
        { titel: "Drücken", text: "Drück sie senkrecht nach oben und atme aus. Press sie dabei weiter zusammen." }
      ],
      en: [
        { titel: "Setup", text: "Set the bench to an incline, about 30 to 45°. Bring the dumbbells from your thighs over your upper chest. Your palms face each other, and you press the dumbbells together." },
        { titel: "Lower", text: "Lower the dumbbells to your upper chest and breathe in. They stay in contact the whole time." },
        { titel: "Press", text: "Press them straight up and breathe out. Keep squeezing them together." }
      ]
    },
    fehler: { de: "Die Hanteln rutschen beim Absenken zu tief und weg von der oberen Brust.", en: "The dumbbells slide too low as you lower them, away from your upper chest." },
    tipp: { de: "Fang mit leichten Hanteln an. Der Druck gegeneinander kostet zusätzlich Kraft.", en: "Start with light dumbbells. Pressing them against each other takes extra strength." }
  },
  "negativbank-lh": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Hak die Füße fest unter die Polster, bevor du dich zurücklegst. Die Augen liegen unter der Stange. Greif etwas breiter als schulterbreit." },
        { titel: "Ausheben", text: "Zieh die Schulterblätter zusammen und nach unten. Heb die Stange aus dem Ständer und bring sie über die untere Brust." },
        { titel: "Senken und drücken", text: "Senk die Stange kontrolliert zur unteren Brust und atme ein. Drück sie gerade nach oben und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Hook your feet firmly under the pads before you lie back. Your eyes are under the bar. Grip a little wider than shoulder width." },
        { titel: "Unrack", text: "Pull your shoulder blades together and down. Lift the bar out of the rack and bring it over your lower chest." },
        { titel: "Lower and press", text: "Lower the bar under control to your lower chest and breathe in. Press it straight up and breathe out." }
      ]
    },
    fehler: { de: "Die Stange wandert beim Absenken Richtung Hals. Führ sie bewusst zur unteren Brust.", en: "The bar drifts toward your neck as you lower it. Guide it deliberately to your lower chest." },
    sicherheit: { de: "Trainiere mit einem Trainingspartner oder im Rack mit Sicherheitsbügeln. Mit eingehakten Füßen und dem Kopf nach unten kannst du dich nicht selbst befreien. Leg dich langsam hin und setz dich erst wieder auf, wenn die Stange im Ständer liegt.", en: "Train with a spotter or in a rack with safety bars. With your feet hooked in and your head down, you cannot free yourself. Lie down slowly and only sit up again once the bar is in the rack." }
  },
  "negativbank-kh": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz dich hin, leg die Hanteln auf den Oberschenkeln ab und hak die Füße ein. Halt die Hanteln nah an der Brust und leg dich langsam zurück." },
        { titel: "Hochdrücken und senken", text: "Drück die Hanteln über die untere Brust. Senk sie dann seitlich neben die untere Brust und atme ein." },
        { titel: "Drücken", text: "Drück die Hanteln nach oben und atme aus. Am Ende führst du sie zurück an die Brust." }
      ],
      en: [
        { titel: "Setup", text: "Sit down, rest the dumbbells on your thighs and hook your feet in. Hold the dumbbells close to your chest and lie back slowly." },
        { titel: "Press up and lower", text: "Press the dumbbells over your lower chest. Then lower them out to the sides of your lower chest and breathe in." },
        { titel: "Press", text: "Press the dumbbells up and breathe out. At the end, bring them back to your chest." }
      ]
    },
    fehler: { de: "Du lässt die Hanteln am Satzende seitlich fallen, weil das Ablegen schwerfällt.", en: "You let the dumbbells drop to the sides at the end of the set because setting them down is hard." },
    sicherheit: { de: "Leg dich langsam zurück, der Kopf liegt am Ende tiefer als die Hüfte. Setz die Hanteln am Ende erst ab oder gib sie einem Partner, und setz dich dann langsam auf.", en: "Lie back slowly, your head ends up lower than your hips. At the end, set the dumbbells down first or hand them to a partner, then sit up slowly." }
  },
  "negativbank-lh-breit": {
    schritte: {
      de: [
        { titel: "Griff", text: "Hak die Füße ein und leg dich zurück. Setz jede Hand etwa eine Handbreit weiter nach außen als beim normalen Griff. Die Markierungen auf der Stange helfen beim gleichmäßigen Greifen." },
        { titel: "Ausheben", text: "Lass dir die Stange aus dem Ständer reichen. Bring sie über die untere Brust." },
        { titel: "Senken und drücken", text: "Senk die Stange langsam zur unteren Brust und atme ein. Die Ellbogen gehen weiter nach außen als mit normalem Griff. Drück die Stange nach oben, bis die Arme fast gestreckt sind, und atme aus." }
      ],
      en: [
        { titel: "Grip", text: "Hook your feet in and lie back. Place each hand about a hand's width further out than with your normal grip. The markings on the bar help you grip evenly." },
        { titel: "Unrack", text: "Have someone hand you the bar out of the rack. Bring it over your lower chest." },
        { titel: "Lower and press", text: "Lower the bar slowly to your lower chest and breathe in. Your elbows travel further out than with a normal grip. Press the bar up until your arms are almost straight and breathe out." }
      ]
    },
    fehler: { de: "Du nutzt den kurzen Weg für zu viel Gewicht und lässt die Stange auf der Brust abprallen.", en: "You use the short path to load too much weight and bounce the bar off your chest." },
    sicherheit: { de: "Trainiere mit einem Trainingspartner oder im Rack mit Sicherheitsbügeln. Mit breitem Griff und dem Kopf nach unten ist das Ausheben und Ablegen allein schwierig. Komm erst hoch, wenn die Stange im Ständer liegt, und dann langsam.", en: "Train with a spotter or in a rack with safety bars. With a wide grip and your head down, unracking and racking alone is difficult. Only come up once the bar is in the rack, and do it slowly." }
  },
  "negativbank-multi": {
    schritte: {
      de: [
        { titel: "Bank ausrichten", text: "Schieb die Negativbank so unter die Stange, dass diese auf der unteren Brust ankommt. Prüf den Weg mit der leeren Stange." },
        { titel: "Aushängen", text: "Hak die Füße ein und leg dich zurück. Zieh die Schulterblätter zusammen, greif etwas breiter als schulterbreit und dreh die Stange aus den Haken." },
        { titel: "Senken und drücken", text: "Senk die Stange zur unteren Brust und atme ein. Drück sie nach oben und atme aus. Dreh sie zurück in die Haken, bevor du die Füße löst." }
      ],
      en: [
        { titel: "Position the bench", text: "Slide the decline bench under the bar so the bar meets your lower chest. Check the path with the empty bar." },
        { titel: "Unrack", text: "Hook your feet in and lie back. Pull your shoulder blades together, grip a little wider than shoulder width and rotate the bar out of the hooks." },
        { titel: "Lower and press", text: "Lower the bar to your lower chest and breathe in. Press it up and breathe out. Rotate it back into the hooks before you release your feet." }
      ]
    },
    fehler: { de: "Die Bank steht so, dass die Stange Richtung Hals läuft. Stell sie um, bevor du Gewicht auflegst.", en: "The bench is placed so that the bar runs toward your neck. Move it before you load any weight." },
    sicherheit: { de: "Stell die Stopper so ein, dass die Stange nicht bis zum Hals sinken kann. Leg dich langsam hin, häng die Stange am Ende zuerst ein und richte dich danach langsam auf.", en: "Set the safety stops so the bar cannot sink down to your neck. Lie down slowly, hook the bar in first at the end and then sit up slowly." }
  },
  "floor-press-lh": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng die Stange im Rack so niedrig ein, dass du sie im Liegen mit fast gestreckten Armen erreichst. Leg dich darunter, die Augen unter der Stange. Die Knie sind gebeugt, die Füße stehen auf dem Boden." },
        { titel: "Absenken", text: "Heb die Stange aus und senk sie kontrolliert. Atme dabei ein. Setz die Oberarme sanft auf dem Boden auf und bleib kurz still." },
        { titel: "Drücken", text: "Drück die Stange aus dem Stillstand nach oben und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Set the bar in the rack low enough that you can reach it lying down with your arms almost straight. Lie under it with your eyes under the bar. Your knees are bent and your feet are flat on the floor." },
        { titel: "Lower", text: "Unrack the bar and lower it under control. Breathe in. Set your upper arms down gently on the floor and stay still for a moment." },
        { titel: "Press", text: "Press the bar up from a dead stop and breathe out." }
      ]
    },
    fehler: { de: "Die Ellbogen schlagen auf dem Boden auf, oder du holst dort Schwung.", en: "Your elbows slam into the floor, or you bounce off it." },
    sicherheit: { de: "Trainiere im Rack mit niedrig eingestellten Sicherheitsbügeln oder mit einem Trainingspartner.", en: "Train in a rack with the safety bars set low, or with a spotter." }
  },
  "floor-press-kh": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz dich auf den Boden und stell die Hanteln aufrecht auf die Oberschenkel. Roll dich langsam zurück und halt die Hanteln dabei nah an der Brust. Die Knie sind gebeugt, die Füße stehen auf." },
        { titel: "Absenken", text: "Drück die Hanteln über die Brust. Senk sie, bis die Oberarme sanft am Boden aufsetzen, und atme ein. Die Ellbogen liegen etwa 45° vom Körper entfernt." },
        { titel: "Drücken", text: "Bleib kurz still, drück die Hanteln nach oben und atme aus. Am Ende führst du sie zur Brust und setzt sie neben dir ab." }
      ],
      en: [
        { titel: "Setup", text: "Sit on the floor and stand the dumbbells upright on your thighs. Roll back slowly, keeping the dumbbells close to your chest. Your knees are bent and your feet are flat." },
        { titel: "Lower", text: "Press the dumbbells over your chest. Lower them until your upper arms touch down gently on the floor, and breathe in. Your elbows are about 45° away from your body." },
        { titel: "Press", text: "Stay still for a moment, press the dumbbells up and breathe out. At the end, bring them to your chest and set them down beside you." }
      ]
    },
    fehler: { de: "Die Unterarme kippen nach innen oder außen, sobald die Oberarme aufliegen. Halt sie senkrecht.", en: "Your forearms tip inward or outward once your upper arms are on the floor. Keep them vertical." }
  },
  "floor-press-kb": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz dich auf den Boden und nimm die Kettlebells an die Brust. Die Kugeln liegen auf der Rückseite der Unterarme. Roll dich langsam zurück, die Knie sind gebeugt." },
        { titel: "Absenken", text: "Drück die Kettlebells über die Brust. Senk sie, bis die Oberarme am Boden aufsetzen, und atme ein. Die Handgelenke bleiben gerade." },
        { titel: "Drücken", text: "Drück gleichmäßig nach oben und atme aus. Die Kugeln bleiben ruhig auf den Unterarmen liegen." }
      ],
      en: [
        { titel: "Setup", text: "Sit on the floor and bring the kettlebells to your chest. The bells rest on the backs of your forearms. Roll back slowly with your knees bent." },
        { titel: "Lower", text: "Press the kettlebells over your chest. Lower them until your upper arms touch the floor, and breathe in. Keep your wrists straight." },
        { titel: "Press", text: "Press up smoothly and breathe out. The bells stay resting calmly on your forearms." }
      ]
    },
    fehler: { de: "Du drückst ruckartig, und die Kugel schlägt gegen den Unterarm.", en: "You press with a jerk and the bell bangs against your forearm." },
    sicherheit: { de: "Bring die Kettlebells am Ende zurück an die Brust, setz dich auf und stell sie dann ab.", en: "At the end, bring the kettlebells back to your chest, sit up and then set them down." }
  },
  "brustpresse-steck": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Stell den Sitz so ein, dass die Griffe auf Höhe der mittleren Brust liegen. Steck den Stift ins gewünschte Gewicht. Rücken und Kopf liegen am Polster." },
        { titel: "Drücken", text: "Zieh die Schulterblätter zusammen. Drück die Griffe nach vorn, bis die Arme fast gestreckt sind, und atme aus. Hat das Gerät ein Fußpedal, bring die Griffe damit in die Startposition." },
        { titel: "Zurück", text: "Lass die Griffe langsam zurückkommen, bis du eine Dehnung in der Brust spürst, und atme ein. Die Gewichtsplatten setzen zwischen den Wiederholungen nicht auf." }
      ],
      en: [
        { titel: "Setup", text: "Adjust the seat so the handles are level with the middle of your chest. Put the pin in the weight you want. Your back and head rest against the pad." },
        { titel: "Press", text: "Pull your shoulder blades together. Push the handles forward until your arms are almost straight and breathe out. If the machine has a foot pedal, use it to bring the handles into the start position." },
        { titel: "Return", text: "Let the handles come back slowly until you feel a stretch in your chest, and breathe in. The weight plates do not touch down between reps." }
      ]
    },
    fehler: { de: "Der Sitz ist zu tief. Dann liegen die Griffe auf Schulterhöhe und die Ellbogen stehen zu hoch.", en: "The seat is too low. Then the handles are at shoulder height and your elbows are too high." }
  },
  "brustpresse-steck-neutral": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Stell den Sitz so ein, dass die senkrechten Griffe auf Brusthöhe liegen, und steck den Stift. Greif so, dass die Handflächen zueinander zeigen." },
        { titel: "Drücken", text: "Der Rücken liegt am Polster. Drück die Griffe nach vorn und atme aus. Die Ellbogen bleiben unter Schulterhöhe und nah am Körper." },
        { titel: "Zurück", text: "Lass die Griffe langsam zurückkommen, bis die Hände neben der Brust sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Adjust the seat so the vertical handles are at chest height, and set the pin. Grip so your palms face each other." },
        { titel: "Press", text: "Your back rests against the pad. Push the handles forward and breathe out. Your elbows stay below shoulder height and close to your body." },
        { titel: "Return", text: "Let the handles come back slowly until your hands are beside your chest, and breathe in." }
      ]
    },
    fehler: { de: "Die Handgelenke knicken ab. Sie bleiben in einer Linie mit den Unterarmen.", en: "Your wrists bend. Keep them in line with your forearms." }
  },
  "brustpresse-scheibe": {
    schritte: {
      de: [
        { titel: "Beladen", text: "Leg auf beide Seiten gleich viele Scheiben. Stell den Sitz so ein, dass die Griffe auf Höhe der mittleren Brust liegen." },
        { titel: "Drücken", text: "Rücken und Kopf liegen am Polster, die Schulterblätter sind zusammen. Drück beide Griffe gleichzeitig nach vorn und atme aus." },
        { titel: "Zurück", text: "Lass die Griffe langsam zurückkommen und atme ein. Bewegen sich die Arme des Geräts einzeln, achte darauf, dass beide Seiten gleich schnell laufen." }
      ],
      en: [
        { titel: "Load", text: "Put the same number of plates on both sides. Adjust the seat so the handles are level with the middle of your chest." },
        { titel: "Press", text: "Your back and head rest against the pad, shoulder blades together. Push both handles forward at the same time and breathe out." },
        { titel: "Return", text: "Let the handles come back slowly and breathe in. If the machine's arms move independently, make sure both sides travel at the same speed." }
      ]
    },
    fehler: { de: "Eine Seite drückt voraus, die andere hängt nach, und der Oberkörper dreht sich mit.", en: "One side pushes ahead, the other lags behind, and your torso twists with it." }
  },
  "brustpresse-scheibe-neutral": {
    schritte: {
      de: [
        { titel: "Beladen und einstellen", text: "Belade beide Seiten gleich. Stell den Sitz so ein, dass die Griffe auf Brusthöhe liegen. Greif die senkrechten Griffe, die Handflächen zeigen zueinander." },
        { titel: "Drücken", text: "Die Schulterblätter bleiben am Polster. Drück die Griffe nach vorn und atme aus. Die Ellbogen laufen eng am Körper entlang." },
        { titel: "Zurück", text: "Lass die Griffe langsam zurück, bis die Hände neben den Rippen sind, und atme ein." }
      ],
      en: [
        { titel: "Load and set up", text: "Load both sides equally. Adjust the seat so the handles are at chest height. Grip the vertical handles with your palms facing each other." },
        { titel: "Press", text: "Your shoulder blades stay on the pad. Push the handles forward and breathe out. Your elbows travel close along your body." },
        { titel: "Return", text: "Let the handles come back slowly until your hands are beside your ribs, and breathe in." }
      ]
    },
    fehler: { de: "Am Ende der Bewegung schiebst du die Schultern vom Polster nach vorn, um weiter zu kommen.", en: "At the end of the movement you push your shoulders forward off the pad to reach further." }
  },
  "schraegpresse-scheibe": {
    schritte: {
      de: [
        { titel: "Beladen und einstellen", text: "Belade beide Seiten gleich. Stell den Sitz so ein, dass die Griffe in der Startposition auf Höhe der oberen Brust liegen, knapp unter den Schultern." },
        { titel: "Drücken", text: "Rücken und Kopf liegen am Polster. Drück die Griffe schräg nach oben, bis die Arme fast gestreckt sind, und atme aus." },
        { titel: "Zurück", text: "Lass die Griffe langsam zurück, bis die Hände neben der oberen Brust sind, und atme ein." }
      ],
      en: [
        { titel: "Load and set up", text: "Load both sides equally. Adjust the seat so that in the start position the handles are level with your upper chest, just below your shoulders." },
        { titel: "Press", text: "Your back and head rest against the pad. Push the handles up at an angle until your arms are almost straight and breathe out." },
        { titel: "Return", text: "Let the handles come back slowly until your hands are beside your upper chest, and breathe in." }
      ]
    },
    fehler: { de: "Du löst den unteren Rücken vom Polster und drückst dich ins Hohlkreuz.", en: "You lift your lower back off the pad and push yourself into an arch." }
  },
  "schraegpresse-scheibe-einarmig": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Das geht an Geräten, deren Arme sich einzeln bewegen. Belade die Seite, mit der du drückst, und stell den Sitz ein wie beim Drücken mit beiden Armen. Die freie Hand hält sich am Sitz fest." },
        { titel: "Drücken", text: "Spann den Bauch an. Drück den Griff schräg nach oben und atme aus. Beide Schultern bleiben am Polster." },
        { titel: "Zurück", text: "Lass den Griff langsam zurück und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "This works on machines whose arms move independently. Load the side you press with and adjust the seat as you would for pressing with both arms. Your free hand holds on to the seat." },
        { titel: "Press", text: "Tighten your abs. Push the handle up at an angle and breathe out. Both shoulders stay on the pad." },
        { titel: "Return", text: "Let the handle come back slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Der Oberkörper dreht sich vom Polster weg, um dem Arm zu helfen.", en: "Your torso twists away from the pad to help the arm." },
    tipp: { de: "Fang mit der schwächeren Seite an und mach mit der stärkeren gleich viele Wiederholungen.", en: "Start with your weaker side and do the same number of reps with the stronger one." }
  },
  "machine-incline-press": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Wähl das Gewicht, je nach Gerät mit dem Stift oder mit Scheiben. Stell den Sitz so ein, dass die Griffe zu Beginn auf Höhe der oberen Brust liegen." },
        { titel: "Drücken und zurück", text: "Der Rücken liegt am Polster. Drück die Griffe schräg nach oben und atme aus. Lass sie langsam zurückkommen und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Choose the weight, with the pin or with plates depending on the machine. Adjust the seat so the handles start level with your upper chest." },
        { titel: "Press and return", text: "Your back rests against the pad. Push the handles up at an angle and breathe out. Let them come back slowly and breathe in." }
      ]
    },
    fehler: { de: "Der Sitz ist zu hoch. Dann starten die Griffe unterhalb der Brust.", en: "The seat is too high. Then the handles start below your chest." },
    tipp: { de: "Die Geräte unterscheiden sich in Griff und Winkel. Gemeinsam ist der Weg schräg nach oben, der die obere Brust betont.", en: "Machines differ in grip and angle. What they share is the path up at an angle, which emphasizes the upper chest." }
  },
  "brustpresse-kabel": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell beide Rollen auf Brusthöhe. Greif die Griffe, geh einen Schritt nach vorn und stell einen Fuß vor den anderen. Die Hände sind neben der Brust, die Ellbogen zeigen nach hinten." },
        { titel: "Drücken", text: "Spann den Bauch an. Drück beide Hände nach vorn und leicht zueinander und atme aus." },
        { titel: "Zurück", text: "Lass die Hände langsam zurück neben die Brust und atme ein. Der Oberkörper bleibt ruhig." }
      ],
      en: [
        { titel: "Setup", text: "Set both pulleys to chest height. Grab the handles, take a step forward and place one foot in front of the other. Your hands are beside your chest and your elbows point back." },
        { titel: "Press", text: "Tighten your abs. Push both hands forward and slightly toward each other and breathe out." },
        { titel: "Return", text: "Let your hands come back slowly beside your chest and breathe in. Your torso stays still." }
      ]
    },
    fehler: { de: "Die Kabel ziehen dich ins Hohlkreuz, oder du lehnst dich weit nach vorn und drückst mit dem Körpergewicht.", en: "The cables pull you into an arched back, or you lean far forward and press with your body weight." }
  },
  "brustpresse-kabel-einarmig": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle auf Brusthöhe. Greif den Griff, dreh dem Turm den Rücken zu und geh einen Schritt nach vorn. Das Bein der anderen Seite steht vorn, die Hand ist neben der Brust." },
        { titel: "Drücken", text: "Spann Bauch und Po an. Drück die Hand gerade nach vorn und atme aus. Schultern und Hüfte zeigen weiter nach vorn." },
        { titel: "Zurück", text: "Lass die Hand langsam zurück und atme ein. Mach alle Wiederholungen, dann wechsle die Seite." }
      ],
      en: [
        { titel: "Setup", text: "Set the pulley to chest height. Grab the handle, turn your back to the tower and take a step forward. The leg on the opposite side is in front, and your hand is beside your chest." },
        { titel: "Press", text: "Tighten your abs and glutes. Push your hand straight forward and breathe out. Your shoulders and hips keep facing forward." },
        { titel: "Return", text: "Let your hand come back slowly and breathe in. Do all your reps, then switch sides." }
      ]
    },
    fehler: { de: "Du drehst den Oberkörper mit dem Arm nach vorn. Dann kommt die Bewegung aus der Drehung.", en: "You rotate your torso forward with the arm. Then the movement comes from the twist." }
  },
  "kabelfly-hoch-tief": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell beide Rollen über Kopfhöhe. Greif die Griffe, geh einen Schritt nach vorn und stell einen Fuß vor den anderen. Der Oberkörper ist leicht vorgeneigt, die Ellbogen sind leicht gebeugt." },
        { titel: "Zusammenführen", text: "Führ die Hände in einem Bogen nach unten und vorn, bis sie sich vor der Hüfte treffen. Atme dabei aus." },
        { titel: "Öffnen", text: "Lass die Arme langsam im selben Bogen zurück, bis du eine leichte Dehnung in der Brust spürst, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Set both pulleys above head height. Grab the handles, take a step forward and place one foot in front of the other. Lean your torso slightly forward with your elbows slightly bent." },
        { titel: "Bring together", text: "Sweep your hands down and forward in an arc until they meet in front of your hips. Breathe out." },
        { titel: "Open", text: "Let your arms return slowly along the same arc until you feel a light stretch in your chest, and breathe in." }
      ]
    },
    fehler: { de: "Die Ellbogen beugen sich stark, und du drückst die Griffe nach unten. Der Winkel im Ellbogen bleibt gleich.", en: "Your elbows bend a lot and you push the handles down. Keep the angle at your elbows the same." }
  },
  "kabelfly-tief-hoch": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell beide Rollen ganz nach unten. Greif die Griffe, die Handflächen zeigen nach vorn, und geh einen Schritt nach vorn. Die Hände sind neben den Hüften." },
        { titel: "Hochführen", text: "Führ die Hände in einem Bogen nach vorn oben, bis sie sich etwa auf Kinnhöhe treffen. Atme dabei aus. Die Ellbogen bleiben leicht gebeugt." },
        { titel: "Senken", text: "Lass die Hände langsam zurück neben die Hüften und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Set both pulleys all the way down. Grab the handles with your palms facing forward and take a step forward. Your hands are beside your hips." },
        { titel: "Raise", text: "Sweep your hands forward and up in an arc until they meet at about chin height. Breathe out. Keep your elbows slightly bent." },
        { titel: "Lower", text: "Let your hands return slowly beside your hips and breathe in." }
      ]
    },
    fehler: { de: "Du lehnst dich nach hinten und holst Schwung aus dem Rücken.", en: "You lean back and use momentum from your back." },
    tipp: { de: "Nimm wenig Gewicht. Der Hebel ist bei dieser Richtung lang.", en: "Use light weight. The lever is long in this direction." }
  },
  "kabelfly-sitzend": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell eine Bank mit aufrechter Lehne mittig zwischen die beiden Türme. Die Rollen stehen im Sitzen etwa auf Schulterhöhe. Nimm einen Griff nach dem anderen und setz dich." },
        { titel: "Zusammenführen", text: "Der Rücken liegt an der Lehne, die Ellbogen sind leicht gebeugt. Führ die Hände vor der Brust zusammen und atme aus." },
        { titel: "Öffnen", text: "Lass die Arme langsam zurück, bis du eine Dehnung in der Brust spürst, und atme ein. Die Hände gehen nicht hinter die Schultern." }
      ],
      en: [
        { titel: "Setup", text: "Place a bench with an upright backrest centered between the two towers. When you are seated, the pulleys are at about shoulder height. Take one handle after the other and sit down." },
        { titel: "Bring together", text: "Your back rests against the backrest and your elbows are slightly bent. Bring your hands together in front of your chest and breathe out." },
        { titel: "Open", text: "Let your arms return slowly until you feel a stretch in your chest, and breathe in. Your hands do not go behind your shoulders." }
      ]
    },
    fehler: { de: "Die Bank steht nicht mittig. Dann zieht eine Seite stärker als die andere.", en: "The bench is not centered. Then one side pulls harder than the other." }
  },
  "kabelfly-horizontal": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell beide Rollen auf Brusthöhe. Greif die Griffe und geh einen Schritt nach vorn, der Oberkörper bleibt aufrecht. Die Arme sind seitlich geöffnet, die Ellbogen leicht gebeugt." },
        { titel: "Zusammenführen", text: "Führ die Hände auf einer waagerechten Bahn vor der Brust zusammen und atme aus. Spann die Brust kurz an." },
        { titel: "Öffnen", text: "Lass die Arme langsam zurück, bis du eine Dehnung in der Brust spürst, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Set both pulleys to chest height. Grab the handles and take a step forward, keeping your torso upright. Your arms are open to the sides with your elbows slightly bent." },
        { titel: "Bring together", text: "Bring your hands together in front of your chest along a horizontal path and breathe out. Squeeze your chest briefly." },
        { titel: "Open", text: "Let your arms return slowly until you feel a stretch in your chest, and breathe in." }
      ]
    },
    fehler: { de: "Die Hände sinken beim Zusammenführen ab. Halt sie auf Brusthöhe.", en: "Your hands drop as you bring them together. Keep them at chest height." }
  },
  "kabelfly-horizontal-einarmig": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle auf Brusthöhe. Stell dich seitlich zum Turm und greif mit der Hand, die ihm näher ist. Geh einen Schritt zur Seite weg, bis Zug auf dem Kabel ist. Die freie Hand liegt an der Hüfte." },
        { titel: "Zusammenführen", text: "Führ die Hand waagerecht vor die Brust, bis zur Körpermitte oder ein Stück darüber hinaus. Atme dabei aus." },
        { titel: "Öffnen", text: "Lass den Arm langsam zurück und atme ein. Schultern und Hüfte zeigen die ganze Zeit nach vorn." }
      ],
      en: [
        { titel: "Setup", text: "Set the pulley to chest height. Stand side-on to the tower and grab the handle with the hand nearer to it. Step away to the side until there is tension on the cable. Your free hand rests on your hip." },
        { titel: "Bring across", text: "Move your hand horizontally in front of your chest, to the midline of your body or a little beyond. Breathe out." },
        { titel: "Open", text: "Let your arm return slowly and breathe in. Your shoulders and hips face forward the whole time." }
      ]
    },
    fehler: { de: "Der Oberkörper dreht sich mit dem Arm mit.", en: "Your torso rotates along with the arm." }
  },
  "kabel-crossover": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell beide Rollen auf Brusthöhe. Greif die Griffe und geh einen Schritt nach vorn. Die Ellbogen sind leicht gebeugt." },
        { titel: "Kreuzen", text: "Führ die Hände vor der Brust zusammen und weiter, bis sich die Handgelenke kreuzen. Atme dabei aus." },
        { titel: "Öffnen", text: "Lass die Arme langsam zurück und atme ein. Wechsle bei jeder Wiederholung, welche Hand oben liegt." }
      ],
      en: [
        { titel: "Setup", text: "Set both pulleys to chest height. Grab the handles and take a step forward. Your elbows are slightly bent." },
        { titel: "Cross", text: "Bring your hands together in front of your chest and continue until your wrists cross. Breathe out." },
        { titel: "Open", text: "Let your arms return slowly and breathe in. Switch which hand is on top with every rep." }
      ]
    },
    fehler: { de: "Du kreuzt, indem du die Schultern nach vorn rollst. Die Brust bleibt oben, nur die Arme gehen weiter.", en: "You cross by rolling your shoulders forward. Keep your chest up and let only your arms travel further." }
  },
  "kabelfly-tief-hoch-einarmig": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle ganz nach unten. Stell dich seitlich zum Turm und greif mit der näheren Hand, die Handfläche zeigt nach vorn. Geh einen Schritt nach vorn, die Hand ist neben der Hüfte." },
        { titel: "Hochführen", text: "Führ die Hand in einem Bogen nach vorn oben, bis sie vor der Körpermitte auf Kinnhöhe ist. Atme dabei aus." },
        { titel: "Senken", text: "Lass die Hand langsam zurück und atme ein. Der Rumpf ist angespannt und dreht sich nicht." }
      ],
      en: [
        { titel: "Setup", text: "Set the pulley all the way down. Stand side-on to the tower and grab the handle with the nearer hand, palm facing forward. Take a step forward so your hand is beside your hip." },
        { titel: "Raise", text: "Sweep your hand forward and up in an arc until it is in front of your midline at chin height. Breathe out." },
        { titel: "Lower", text: "Let your hand return slowly and breathe in. Your trunk is tight and does not rotate." }
      ]
    },
    fehler: { de: "Du beugst den Ellbogen immer weiter, bis aus dem Bogen ein Curl wird.", en: "You bend your elbow more and more until the arc turns into a curl." }
  },
  "kabelfly-hoch-tief-einarmig": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle über Kopfhöhe. Stell dich seitlich zum Turm, greif mit der näheren Hand und geh einen Schritt nach vorn. Der Oberkörper ist leicht vorgeneigt." },
        { titel: "Herunterführen", text: "Führ die Hand in einem Bogen nach unten vor den Körper, bis sie vor der gegenüberliegenden Hüfte ist. Atme dabei aus." },
        { titel: "Öffnen", text: "Lass den Arm langsam zurück, bis du eine Dehnung in der Brust spürst, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Set the pulley above head height. Stand side-on to the tower, grab the handle with the nearer hand and take a step forward. Lean your torso slightly forward." },
        { titel: "Bring down", text: "Sweep your hand down in an arc in front of your body until it is in front of the opposite hip. Breathe out." },
        { titel: "Open", text: "Let your arm return slowly until you feel a stretch in your chest, and breathe in." }
      ]
    },
    fehler: { de: "Du knickst seitlich in der Taille ein und ziehst mit dem Oberkörper nach.", en: "You bend sideways at the waist and pull with your torso." }
  },
  "fliegende-45-kh": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Bank auf etwa 45°. Bring die Hanteln über die obere Brust, die Handflächen zeigen zueinander. Beug die Ellbogen leicht." },
        { titel: "Öffnen", text: "Senk die Arme in einem weiten Bogen zur Seite und atme ein, bis du eine Dehnung in der oberen Brust spürst. Die Hände gehen nicht tiefer als bis auf Schulterhöhe." },
        { titel: "Schließen", text: "Führ die Hanteln im selben Bogen zurück über die obere Brust und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Set the bench to about 45°. Bring the dumbbells over your upper chest with your palms facing each other. Bend your elbows slightly." },
        { titel: "Open", text: "Lower your arms out to the sides in a wide arc and breathe in until you feel a stretch in your upper chest. Your hands go no lower than shoulder height." },
        { titel: "Close", text: "Bring the dumbbells back along the same arc over your upper chest and breathe out." }
      ]
    },
    fehler: { de: "Du nimmst die Hanteln vom Schrägbankdrücken. Für Fliegende sind sie viel zu schwer.", en: "You pick up the dumbbells you use for the incline press. They are far too heavy for flyes." },
    sicherheit: { de: "Nimm ein leichtes Gewicht. Die Schultern stehen unten unter Dehnung.", en: "Use light weight. At the bottom your shoulders are under stretch." }
  },
  "fliegende-flach-kh": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Bank leicht schräg, etwa 15 bis 30°. Leg dich zurück und bring die Hanteln über die Brust, die Handflächen zeigen zueinander. Beug die Ellbogen leicht." },
        { titel: "Öffnen", text: "Senk die Arme in einem weiten Bogen zur Seite, bis die Hände etwa auf Höhe der Brust sind, und atme ein." },
        { titel: "Schließen", text: "Führ die Hanteln im selben Bogen zurück und atme aus. Stopp kurz, bevor sie sich berühren." }
      ],
      en: [
        { titel: "Setup", text: "Set the bench to a slight incline, about 15 to 30°. Lie back and bring the dumbbells over your chest with your palms facing each other. Bend your elbows slightly." },
        { titel: "Open", text: "Lower your arms out to the sides in a wide arc until your hands are at about chest height, and breathe in." },
        { titel: "Close", text: "Bring the dumbbells back along the same arc and breathe out. Stop just before they touch." }
      ]
    },
    fehler: { de: "Die Hanteln schlagen oben aneinander, und die Spannung geht verloren.", en: "The dumbbells clank together at the top and the tension is lost." },
    sicherheit: { de: "Nimm ein leichtes Gewicht und geh nur so tief, wie es sich in den Schultern gut anfühlt.", en: "Use light weight and go only as deep as feels good in your shoulders." }
  },
  "decline-dumbbell-fly": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Hak die Füße ein, halt die Hanteln an der Brust und leg dich langsam zurück. Drück sie über die untere Brust, die Handflächen zeigen zueinander, die Ellbogen sind leicht gebeugt." },
        { titel: "Öffnen", text: "Senk die Arme in einem weiten Bogen zur Seite und atme ein. Stopp, sobald die Hände auf Schulterhöhe sind." },
        { titel: "Schließen", text: "Führ die Hanteln im selben Bogen zurück und atme aus. Am Ende nimmst du sie an die Brust." }
      ],
      en: [
        { titel: "Setup", text: "Hook your feet in, hold the dumbbells at your chest and lie back slowly. Press them over your lower chest with your palms facing each other and your elbows slightly bent." },
        { titel: "Open", text: "Lower your arms out to the sides in a wide arc and breathe in. Stop as soon as your hands are at shoulder height." },
        { titel: "Close", text: "Bring the dumbbells back along the same arc and breathe out. At the end, bring them to your chest." }
      ]
    },
    fehler: { de: "Mit dem Kopf nach unten lässt du die Arme zu weit fallen.", en: "With your head down, you let your arms drop too far." },
    sicherheit: { de: "Nimm leichte Hanteln und leg dich langsam zurück. Setz die Hanteln am Ende erst ab oder gib sie einem Partner, dann setz dich langsam auf.", en: "Use light dumbbells and lie back slowly. At the end, set the dumbbells down first or hand them to a partner, then sit up slowly." }
  },
  "ring-chest-fly": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng die Ringe etwa auf Hüfthöhe. Stütz dich mit gestreckten Armen darauf, die Füße stehen hinten am Boden, der Körper bildet eine gerade Linie. Je aufrechter du stehst, desto leichter wird es." },
        { titel: "Öffnen", text: "Lass die Arme langsam zur Seite auseinandergehen und atme ein. Die Ellbogen sind leicht gebeugt, die Brust sinkt zwischen die Ringe." },
        { titel: "Schließen", text: "Zieh die Ringe im selben Bogen wieder vor der Brust zusammen und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Hang the rings at about hip height. Support yourself on them with straight arms, your feet on the floor behind you and your body in a straight line. The more upright you stand, the easier it gets." },
        { titel: "Open", text: "Let your arms move slowly apart to the sides and breathe in. Your elbows are slightly bent and your chest sinks between the rings." },
        { titel: "Close", text: "Pull the rings back together in front of your chest along the same arc and breathe out." }
      ]
    },
    fehler: { de: "Die Hüfte hängt durch, oder du öffnest weiter, als du halten kannst.", en: "Your hips sag, or you open further than you can hold." },
    sicherheit: { de: "Fang sehr aufrecht an und häng die Ringe erst tiefer, wenn die Schultern es gut mitmachen. Wenn die Kraft ausgeht, geben die Ringe nach, und die Schultern stehen weit geöffnet unter Last.", en: "Start very upright and only hang the rings lower once your shoulders handle it well. When your strength runs out, the rings give way and your shoulders are wide open under load." }
  },
  "liegestuetze-fuesse-hoch": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Füße auf eine Bank oder Stufe. Die Hände stehen etwas breiter als schulterbreit am Boden. Der Körper bildet eine gerade Linie." },
        { titel: "Absenken", text: "Spann Bauch und Gesäß an. Senk die Brust kontrolliert Richtung Boden und atme ein. Der Blick geht zum Boden." },
        { titel: "Hochdrücken", text: "Drück dich nach oben, bis die Arme fast gestreckt sind, und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Place your feet on a bench or step. Your hands are on the floor, a little wider than shoulder width. Your body forms a straight line." },
        { titel: "Lower", text: "Tighten your abs and glutes. Lower your chest under control toward the floor and breathe in. Look at the floor." },
        { titel: "Push up", text: "Push yourself up until your arms are almost straight and breathe out." }
      ]
    },
    fehler: { de: "Die Hüfte hängt durch. Mit erhöhten Füßen passiert das schneller.", en: "Your hips sag. That happens sooner with your feet raised." },
    tipp: { de: "Je höher die Füße, desto schwerer. Fang mit einer niedrigen Stufe an.", en: "The higher your feet, the harder it gets. Start with a low step." }
  },
  "liegestuetze-haende-hoch": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stütz die Hände auf eine feste Bank, etwas breiter als schulterbreit. Geh mit den Füßen so weit zurück, dass der Körper eine gerade Linie bildet." },
        { titel: "Absenken", text: "Senk die Brust zur Kante der Bank und atme ein. Die Ellbogen zeigen schräg nach hinten." },
        { titel: "Hochdrücken", text: "Drück dich zurück nach oben und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Place your hands on a sturdy bench, a little wider than shoulder width. Walk your feet back until your body forms a straight line." },
        { titel: "Lower", text: "Lower your chest to the edge of the bench and breathe in. Your elbows point back at an angle." },
        { titel: "Push up", text: "Push yourself back up and breathe out." }
      ]
    },
    fehler: { de: "Du stehst zu nah an der Bank und knickst in der Hüfte ab.", en: "You stand too close to the bench and bend at the hips." },
    tipp: { de: "Je höher die Auflage, desto leichter. Geh mit der Zeit tiefer.", en: "The higher the support, the easier it gets. Go lower over time." }
  },
  "liegestuetze-breit": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Hände etwa eineinhalb Schulterbreiten auseinander. Die Finger zeigen nach vorn oder leicht nach außen. Der Körper bildet eine gerade Linie." },
        { titel: "Absenken", text: "Senk die Brust zwischen die Hände und atme ein. Die Ellbogen gehen weiter nach außen als bei der normalen Liegestütze." },
        { titel: "Hochdrücken", text: "Drück dich nach oben und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Place your hands about one and a half shoulder widths apart. Your fingers point forward or slightly outward. Your body forms a straight line." },
        { titel: "Lower", text: "Lower your chest between your hands and breathe in. Your elbows travel further out than in a regular push-up." },
        { titel: "Push up", text: "Push yourself up and breathe out." }
      ]
    },
    fehler: { de: "Die Hände stehen vor den Schultern statt daneben. Setz sie auf Höhe der Brust auf.", en: "Your hands are in front of your shoulders instead of beside them. Place them level with your chest." }
  },
  "liegestuetze-knie": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Knie dich hin und stütz die Hände etwas breiter als schulterbreit auf. Schieb die Hüfte nach vorn, bis Kopf, Hüfte und Knie eine Linie bilden. Leg bei hartem Boden etwas Weiches unter die Knie." },
        { titel: "Absenken", text: "Senk die Brust kontrolliert Richtung Boden und atme ein. Die Ellbogen zeigen schräg nach hinten." },
        { titel: "Hochdrücken", text: "Drück dich nach oben und atme aus. Die Hüfte bleibt in der Linie." }
      ],
      en: [
        { titel: "Setup", text: "Kneel down and place your hands a little wider than shoulder width. Shift your hips forward until your head, hips and knees form a line. On a hard floor, put something soft under your knees." },
        { titel: "Lower", text: "Lower your chest under control toward the floor and breathe in. Your elbows point back at an angle." },
        { titel: "Push up", text: "Push yourself up and breathe out. Your hips stay in line." }
      ]
    },
    fehler: { de: "Der Po bleibt hinten oben, und nur der Oberkörper nickt nach unten.", en: "Your hips stay up and back, and only your upper body dips down." }
  },
  "liegestuetze-gewicht": {
    schritte: {
      de: [
        { titel: "Gewicht", text: "Am besten trägst du eine Gewichtsweste. Eine Scheibe auf dem oberen Rücken, zwischen den Schulterblättern, geht nur mit einem Partner, der sie auflegt." },
        { titel: "Absenken", text: "Geh in die Liegestützposition und spann den Rumpf fest an. Senk dich langsam, damit das Gewicht nicht verrutscht, und atme ein." },
        { titel: "Hochdrücken", text: "Drück dich gleichmäßig nach oben und atme aus." }
      ],
      en: [
        { titel: "Weight", text: "A weight vest is the best option. A plate on your upper back, between the shoulder blades, only works with a partner who places it there." },
        { titel: "Lower", text: "Get into the push-up position and brace your trunk hard. Lower yourself slowly so the weight does not shift, and breathe in." },
        { titel: "Push up", text: "Push yourself up evenly and breathe out." }
      ]
    },
    fehler: { de: "Die Scheibe liegt zu weit unten und drückt die Hüfte ins Hohlkreuz.", en: "The plate sits too low and pushes your hips into an arch." },
    sicherheit: { de: "Eine Scheibe legt dir immer ein Partner auf und nimmt sie wieder ab.", en: "A plate is always placed and removed by a partner." }
  },
  "liegestuetze-defizit": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stütz die Hände auf zwei gleich hohe, feste Liegestützgriffe oder Blöcke, die auf rutschfestem Untergrund stehen. Dazwischen ist Platz für die Brust." },
        { titel: "Absenken", text: "Senk die Brust kontrolliert zwischen die Hände und atme ein. Geh tiefer als die Hände, aber nur so weit, wie es sich in den Schultern gut anfühlt." },
        { titel: "Hochdrücken", text: "Drück dich ohne Schwung nach oben und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Place your hands on two sturdy push-up handles or blocks of equal height that stand on a non-slip surface. Leave room for your chest between them." },
        { titel: "Lower", text: "Lower your chest under control between your hands and breathe in. Go lower than your hands, but only as far as feels good in your shoulders." },
        { titel: "Push up", text: "Push yourself up without momentum and breathe out." }
      ]
    },
    fehler: { de: "Du lässt dich in die tiefe Position fallen, statt sie langsam anzusteuern.", en: "You drop into the deep position instead of easing into it slowly." }
  },
  "liegestuetze-einarmig": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Füße deutlich breiter als schulterbreit. Setz die Stützhand unter die Schulter, die andere Hand liegt auf dem Rücken." },
        { titel: "Absenken", text: "Spann den ganzen Körper an. Senk dich langsam und atme ein. Der Ellbogen bleibt nah am Körper." },
        { titel: "Hochdrücken", text: "Drück dich nach oben und atme aus. Die Schultern bleiben möglichst parallel zum Boden." }
      ],
      en: [
        { titel: "Setup", text: "Place your feet clearly wider than shoulder width. Put your supporting hand under your shoulder and rest the other hand on your back." },
        { titel: "Lower", text: "Tighten your whole body. Lower yourself slowly and breathe in. Your elbow stays close to your body." },
        { titel: "Push up", text: "Push yourself up and breathe out. Keep your shoulders as parallel to the floor as you can." }
      ]
    },
    fehler: { de: "Die freie Schulter dreht nach oben auf, und die Hüfte kippt zur Seite.", en: "Your free shoulder rotates upward and your hips tip to the side." },
    tipp: { de: "Üb zuerst mit der Hand auf einer Bank.", en: "Practice first with your hand on a bench." }
  },
  "archer-push-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Hände sehr breit auf, etwa doppelt schulterbreit. Die Finger zeigen leicht nach außen." },
        { titel: "Zur Seite senken", text: "Beug einen Arm und senk die Brust zu dieser Hand. Atme dabei ein. Der andere Arm bleibt gestreckt und stützt nur leicht." },
        { titel: "Hoch und wechseln", text: "Drück dich über den gebeugten Arm zurück zur Mitte und atme aus. Dann geht es zur anderen Seite." }
      ],
      en: [
        { titel: "Setup", text: "Place your hands very wide, about twice shoulder width. Your fingers point slightly outward." },
        { titel: "Lower to one side", text: "Bend one arm and lower your chest toward that hand. Breathe in. The other arm stays straight and supports only lightly." },
        { titel: "Up and switch", text: "Push back to the center over the bent arm and breathe out. Then go to the other side." }
      ]
    },
    fehler: { de: "Der gestreckte Arm beugt sich mit und hilft. Dann ist es eine breite Liegestütze.", en: "The straight arm bends too and helps. Then it is a wide push-up." }
  },
  "pseudo-planche-push-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Geh in die Liegestützposition und setz die Hände neben die Taille. Die Finger zeigen zur Seite oder nach hinten. Lehn dich vor, bis die Schultern deutlich vor den Händen sind." },
        { titel: "Absenken", text: "Halt die Vorlage und senk dich. Atme dabei ein. Die Ellbogen bleiben eng am Körper." },
        { titel: "Hochdrücken", text: "Drück dich nach oben und atme aus, ohne nach hinten zu rutschen." }
      ],
      en: [
        { titel: "Setup", text: "Get into the push-up position and place your hands beside your waist. Your fingers point to the side or backward. Lean forward until your shoulders are clearly in front of your hands." },
        { titel: "Lower", text: "Hold the forward lean and lower yourself. Breathe in. Your elbows stay tight to your body." },
        { titel: "Push up", text: "Push yourself up and breathe out without sliding backward." }
      ]
    },
    fehler: { de: "Beim Hochdrücken schiebst du dich zurück, bis die Schultern wieder über den Händen sind.", en: "As you push up, you shift back until your shoulders are over your hands again." },
    sicherheit: { de: "Wärm die Handgelenke vorher auf. Die Vorlage belastet sie stark.", en: "Warm up your wrists first. The forward lean puts a lot of stress on them." }
  },
  "ring-push-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng die Ringe schulterbreit und knapp über den Boden. Stütz dich mit gestreckten Armen darauf, der Körper bildet eine gerade Linie." },
        { titel: "Absenken", text: "Halt die Ringe nah am Körper. Senk die Brust zwischen die Ringe und atme ein." },
        { titel: "Hochdrücken", text: "Drück dich nach oben und atme aus. Die Ringe bleiben ruhig." }
      ],
      en: [
        { titel: "Setup", text: "Hang the rings shoulder width apart, just above the floor. Support yourself on them with straight arms and your body in a straight line." },
        { titel: "Lower", text: "Keep the rings close to your body. Lower your chest between the rings and breathe in." },
        { titel: "Push up", text: "Push yourself up and breathe out. The rings stay steady." }
      ]
    },
    fehler: { de: "Die Ringe wandern beim Absenken nach außen weg.", en: "The rings drift outward as you lower." },
    tipp: { de: "Höher gehängte Ringe machen die Übung leichter.", en: "Hanging the rings higher makes the exercise easier." }
  },
  "explosive-push-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Geh in die normale Liegestützposition, die Hände etwas breiter als schulterbreit." },
        { titel: "Absenken", text: "Senk dich zügig, aber kontrolliert, und atme ein." },
        { titel: "Abdrücken und landen", text: "Drück dich so kräftig hoch, dass die Hände kurz den Boden verlassen, und atme aus. Lande mit leicht gebeugten Ellbogen." }
      ],
      en: [
        { titel: "Setup", text: "Get into the regular push-up position with your hands a little wider than shoulder width." },
        { titel: "Lower", text: "Lower yourself quickly but under control, and breathe in." },
        { titel: "Push off and land", text: "Push up so hard that your hands briefly leave the floor, and breathe out. Land with your elbows slightly bent." }
      ]
    },
    fehler: { de: "Du landest auf gestreckten Armen.", en: "You land on straight arms." },
    sicherheit: { de: "Mach die Übung erst, wenn normale Liegestütze sauber klappen. Hör auf, sobald die Hände kaum noch abheben.", en: "Only do this once regular push-ups are clean. Stop as soon as your hands barely leave the floor." }
  },
  "clap-push-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Geh auf festem, rutschfestem Boden in die Liegestützposition, die Hände etwas breiter als schulterbreit." },
        { titel: "Abdrücken", text: "Senk dich, atme ein und drück dich so explosiv ab, dass der Oberkörper nach oben fliegt. Atme dabei aus." },
        { titel: "Klatschen und landen", text: "Klatsch einmal schnell vor der Brust. Bring die Hände sofort zurück auf Schulterbreite und fang dich mit gebeugten Ellbogen ab." }
      ],
      en: [
        { titel: "Setup", text: "On a firm, non-slip floor, get into the push-up position with your hands a little wider than shoulder width." },
        { titel: "Push off", text: "Lower yourself, breathe in and push off so explosively that your upper body flies upward. Breathe out as you do." },
        { titel: "Clap and land", text: "Clap once quickly in front of your chest. Bring your hands straight back to shoulder width and catch yourself with bent elbows." }
      ]
    },
    fehler: { de: "Du klatschst zu spät, und die Hände sind nicht rechtzeitig zurück am Boden.", en: "You clap too late and your hands are not back on the floor in time." },
    sicherheit: { de: "Üb zuerst explosive Liegestütze ohne Klatschen.", en: "Practice explosive push-ups without the clap first." }
  },
  "brust-dips-assistiert": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Je mehr Gewicht du steckst, desto mehr hilft dir die Maschine. Greif die Holme und steig mit den Knien auf das Polster. Die Arme sind gestreckt." },
        { titel: "Absenken", text: "Beug den Oberkörper leicht nach vorn. Senk dich, bis die Oberarme etwa waagerecht sind, und atme ein. Die Ellbogen zeigen leicht nach außen." },
        { titel: "Hochdrücken", text: "Drück dich nach oben, bis die Arme fast gestreckt sind, und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "The more weight you select, the more the machine helps you. Grab the bars and kneel onto the pad. Your arms are straight." },
        { titel: "Lower", text: "Lean your torso slightly forward. Lower yourself until your upper arms are about horizontal, and breathe in. Your elbows point slightly outward." },
        { titel: "Push up", text: "Push yourself up until your arms are almost straight and breathe out." }
      ]
    },
    fehler: { de: "Du lässt dich vom Polster nach oben schieben, statt selbst zu drücken.", en: "You let the pad push you up instead of pressing yourself." },
    sicherheit: { de: "Steig am Ende kontrolliert ab und halt dich dabei fest. Das Polster kommt sonst schnell nach oben.", en: "At the end, step off under control and hold on while you do. Otherwise the pad comes up fast." }
  },
  "dip-maschine-brust": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Setz dich und steck den Stift ins gewünschte Gewicht. Hat das Gerät ein Polster oder einen Gurt für die Oberschenkel, stell es fest ein. Greif die Griffe neben dem Körper." },
        { titel: "Drücken", text: "Beug den Oberkörper leicht nach vorn, die Ellbogen zeigen leicht nach außen. Drück die Griffe nach unten, bis die Arme fast gestreckt sind, und atme aus." },
        { titel: "Zurück", text: "Lass die Griffe langsam hochkommen, bis die Oberarme etwa waagerecht sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Sit down and put the pin in the weight you want. If the machine has a pad or belt for your thighs, set it firmly. Grip the handles beside your body." },
        { titel: "Press", text: "Lean your torso slightly forward with your elbows pointing slightly outward. Push the handles down until your arms are almost straight and breathe out." },
        { titel: "Return", text: "Let the handles come up slowly until your upper arms are about horizontal, and breathe in." }
      ]
    },
    fehler: { de: "Beim Zurücklassen ziehen die Schultern zu den Ohren hoch.", en: "Your shoulders shrug up toward your ears on the way back." }
  },
  "brust-dips-gewicht": {
    schritte: {
      de: [
        { titel: "Gewicht anlegen", text: "Häng die Scheibe an einen Dip-Gürtel, sie hängt zwischen den Beinen. Steig über die Tritte in den Stütz und spring nicht hoch." },
        { titel: "Absenken", text: "Beug den Oberkörper leicht nach vorn. Senk dich langsam, bis die Oberarme etwa waagerecht sind, und atme ein. Das Gewicht pendelt nicht." },
        { titel: "Hochdrücken", text: "Drück dich nach oben und atme aus. Steig am Ende wieder über die Tritte ab." }
      ],
      en: [
        { titel: "Add the weight", text: "Hang the plate from a dip belt so it hangs between your legs. Use the steps to get into the support position and do not jump up." },
        { titel: "Lower", text: "Lean your torso slightly forward. Lower yourself slowly until your upper arms are about horizontal, and breathe in. The weight does not swing." },
        { titel: "Push up", text: "Push yourself up and breathe out. At the end, step down using the steps again." }
      ]
    },
    fehler: { de: "Das Zusatzgewicht zieht dich tiefer als sonst, und die Schultern rollen nach vorn.", en: "The added weight pulls you deeper than usual and your shoulders roll forward." },
    sicherheit: { de: "Nimm Zusatzgewicht erst, wenn Dips mit dem Körpergewicht sauber klappen, und steigere in kleinen Schritten.", en: "Only add weight once bodyweight dips are clean, and increase in small steps." }
  },
  "machine-assisted-dip": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Mehr gestecktes Gewicht heißt mehr Hilfe. Greif die Holme, knie dich auf das Polster und streck die Arme." },
        { titel: "Senken und drücken", text: "Senk dich, bis die Oberarme etwa waagerecht sind, und atme ein. Drück dich wieder nach oben und atme aus." },
        { titel: "Haltung wählen", text: "Bleibst du aufrecht und hältst die Ellbogen eng, arbeitet der Trizeps stärker. Beugst du dich vor und lässt die Ellbogen leicht nach außen, arbeitet die Brust stärker." }
      ],
      en: [
        { titel: "Setup", text: "More selected weight means more help. Grab the bars, kneel on the pad and straighten your arms." },
        { titel: "Lower and press", text: "Lower yourself until your upper arms are about horizontal, and breathe in. Push yourself back up and breathe out." },
        { titel: "Choose your posture", text: "If you stay upright and keep your elbows tucked, your triceps work harder. If you lean forward and let your elbows move slightly outward, your chest works harder." }
      ]
    },
    fehler: { de: "Die Haltung wechselt von Wiederholung zu Wiederholung. Entscheide dich vor dem Satz für eine.", en: "Your posture changes from rep to rep. Decide on one before the set." }
  },
  "dips": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stütz dich mit gestreckten Armen auf den Barren. Die Schultern sind unten, weg von den Ohren." },
        { titel: "Senken und drücken", text: "Beug die Ellbogen und senk dich kontrolliert, bis die Oberarme etwa waagerecht sind. Atme dabei ein. Drück dich nach oben, bis die Arme fast gestreckt sind, und atme aus." },
        { titel: "Oberkörper", text: "Ein aufrechter Oberkörper mit engen Ellbogen legt die Arbeit stärker auf den Trizeps. Ein vorgebeugter Oberkörper legt sie stärker auf die Brust." }
      ],
      en: [
        { titel: "Setup", text: "Support yourself on the parallel bars with straight arms. Your shoulders are down, away from your ears." },
        { titel: "Lower and press", text: "Bend your elbows and lower yourself under control until your upper arms are about horizontal. Breathe in. Push yourself up until your arms are almost straight and breathe out." },
        { titel: "Torso", text: "An upright torso with tucked elbows shifts more of the work to the triceps. A forward-leaning torso shifts more of it to the chest." }
      ]
    },
    fehler: { de: "Unten sacken die Schultern zu den Ohren hoch.", en: "At the bottom, your shoulders shrug up toward your ears." },
    sicherheit: { de: "Geh nur so tief, wie es sich in den Schultern gut anfühlt.", en: "Go only as deep as feels good in your shoulders." }
  }
});
