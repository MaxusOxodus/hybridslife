// Die Erklärungen der Muskelgruppe Schräger Bauch / Core. Sie kommen zu den Einträgen aus der erklaerungen.js dazu,
// deshalb muss diese Datei in der index.html nach der erklaerungen.js stehen. Aufbau wie dort:
// Schlüssel ist die Übungs-ID, pro Übung schritte (2 bis 3) und optional fehler, sicherheit, tipp, alle in de und en.
// Die Datei hat in der index.html und in der sw.js kein ?v=N: Der Service Worker holt sie bei jeder neuen VERSION frisch.
Object.assign(ERKLAERUNGEN, {
  "cable-pallof-press": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle auf Brusthöhe und häng einen einzelnen Griff ein. Stell dich seitlich zur Rolle, greif den Griff mit beiden Händen und geh einen Schritt zur Seite weg. Die Hände sind vor dem Brustbein, die Füße schulterbreit." },
        { titel: "Drücken", text: "Spann Bauch und Po an. Drück die Hände gerade nach vorn, bis die Arme gestreckt sind, und atme aus. Halt kurz." },
        { titel: "Zurück", text: "Hol die Hände langsam zurück zum Brustbein und atme ein. Mach erst alle Wiederholungen einer Seite, dann dreh dich um." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley to chest height and attach a single handle. Stand side-on to the pulley, grip the handle with both hands and take a step sideways away from it. Your hands are in front of your breastbone and your feet are shoulder width apart." },
        { titel: "Press", text: "Tighten your abs and glutes. Press your hands straight forward until your arms are straight and breathe out. Hold briefly." },
        { titel: "Return", text: "Bring your hands back slowly to your breastbone and breathe in. Do all reps on one side first, then turn around." }
      ]
    },
    fehler: { de: "Der Oberkörper dreht sich zur Rolle, oder die Hände wandern zur Seite.", en: "Your torso rotates toward the pulley, or your hands drift to the side." },
    tipp: { de: "Je weiter du von der Rolle weggehst und je länger du vorn hältst, desto schwerer wird es.", en: "The further you step away from the pulley and the longer you hold out front, the harder it gets." }
  },
  "half-kneeling-cable-pallof-press": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle etwa auf Brusthöhe im Knien. Knie dich seitlich zur Rolle hin, das Knie der Rollenseite ist am Boden, das andere Bein steht vorn. Halt den Griff mit beiden Händen vor dem Brustbein." },
        { titel: "Drücken", text: "Spann Bauch und Po an. Drück die Hände gerade nach vorn und atme aus. Halt kurz." },
        { titel: "Zurück", text: "Hol die Hände langsam zurück und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle Seite und Knie." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley to about chest height for kneeling. Kneel side-on to the pulley, with the knee on the pulley side on the floor and the other foot in front. Hold the handle with both hands in front of your breastbone." },
        { titel: "Press", text: "Tighten your abs and glutes. Press your hands straight forward and breathe out. Hold briefly." },
        { titel: "Return", text: "Bring your hands back slowly and breathe in. Do all reps on one side first, then switch sides and knees." }
      ]
    },
    fehler: { de: "Die Hüfte kippt zur Seite, oder du fällst ins Hohlkreuz.", en: "Your hips tilt to the side, or you arch your lower back." },
    tipp: { de: "Leg etwas Weiches unter das Knie.", en: "Put something soft under your knee." }
  },
  "cable-side-bend": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle ganz nach unten und häng einen einzelnen Griff ein. Stell dich seitlich zur Rolle und greif den Griff mit der Hand, die der Rolle näher ist. Die Füße stehen hüftbreit, die freie Hand liegt an der Hüfte." },
        { titel: "Zur Seite aufrichten", text: "Neig den Oberkörper gerade zur Seite von der Rolle weg und atme aus. Der Arm bleibt lang." },
        { titel: "Zurück", text: "Lass dich langsam zur Rolle hin sinken, bis du eine Dehnung in der Flanke spürst, und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley all the way down and attach a single handle. Stand side-on to the pulley and grip the handle with the hand closer to it. Your feet are hip width apart and your free hand rests on your hip." },
        { titel: "Bend away", text: "Lean your torso straight to the side, away from the pulley, and breathe out. Your arm stays long." },
        { titel: "Return", text: "Let yourself sink slowly toward the pulley until you feel a stretch in your side and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du beugst dich nach vorn oder drehst die Hüfte mit. Die Bewegung geht nur zur Seite.", en: "You bend forward or rotate your hips. The movement goes only to the side." }
  },
  "machine-upper-torso-rotation": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Wähl ein leichtes Gewicht und stell den Startwinkel so ein, dass du am Start nur leicht zur Seite gedreht bist. Setz dich, klemm die Knie an die Polster und leg Brust oder Arme an das obere Polster." },
        { titel: "Drehen", text: "Dreh den Oberkörper langsam zur anderen Seite und atme aus. Die Hüfte bleibt, wo sie ist." },
        { titel: "Zurück", text: "Dreh dich langsam zurück und atme ein. Mach erst alle Wiederholungen einer Seite, dann stell die Maschine um." }
      ],
      en: [
        { titel: "Set up", text: "Select a light weight and set the start angle so you are only slightly rotated at the start. Sit down, clamp your knees against the pads and rest your chest or arms against the upper pad." },
        { titel: "Rotate", text: "Rotate your torso slowly to the other side and breathe out. Your hips stay where they are." },
        { titel: "Return", text: "Rotate back slowly and breathe in. Do all reps on one side first, then reset the machine." }
      ]
    },
    fehler: { de: "Du drehst mit Schwung oder ziehst mit den Armen.", en: "You rotate with momentum or pull with your arms." },
    sicherheit: { de: "Stell den Startwinkel nicht zu weit ein und nimm wenig Gewicht. Die Lendenwirbelsäule verträgt Drehung unter Last schlecht.", en: "Do not set the start angle too far and use little weight. The lower spine does not tolerate rotation under load well." }
  },
  "horizontal-cable-chop": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle auf Brusthöhe und häng einen Griff oder das Seil ein. Stell dich seitlich zur Rolle, die Füße etwas breiter als schulterbreit. Greif mit beiden Händen, die Arme sind fast gestreckt und zeigen zur Rolle." },
        { titel: "Drehen", text: "Zieh die Hände in einem waagerechten Bogen vor dem Körper zur anderen Seite und atme aus. Oberkörper und Hüfte drehen mit, der hintere Fuß dreht auf dem Ballen." },
        { titel: "Zurück", text: "Führ die Hände langsam zurück und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley to chest height and attach a handle or the rope. Stand side-on to the pulley, feet a little wider than shoulder width. Grip with both hands, arms almost straight and pointing toward the pulley." },
        { titel: "Rotate", text: "Pull your hands in a horizontal arc in front of your body to the other side and breathe out. Your torso and hips rotate with it and your back foot pivots on the ball." },
        { titel: "Return", text: "Move your hands back slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du ziehst mit gebeugten Armen, und der Rumpf dreht kaum.", en: "You pull with bent arms and your core hardly rotates." }
  },
  "low-to-high-cable-chop": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle ganz nach unten. Stell dich seitlich zur Rolle, die Füße etwas breiter als schulterbreit. Greif den Griff mit beiden Händen neben dem Knie der Rollenseite, die Knie sind gebeugt." },
        { titel: "Hochziehen", text: "Streck die Beine und zieh die Hände schräg vor dem Körper nach oben, bis sie über der anderen Schulter sind. Atme dabei aus. Die Arme bleiben fast gestreckt, der hintere Fuß dreht mit." },
        { titel: "Zurück", text: "Führ die Hände auf demselben Weg langsam zurück und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley all the way down. Stand side-on to the pulley, feet a little wider than shoulder width. Grip the handle with both hands beside the knee on the pulley side, knees bent." },
        { titel: "Pull up", text: "Straighten your legs and pull your hands diagonally up in front of your body until they are above the opposite shoulder. Breathe out. Your arms stay almost straight and your back foot pivots." },
        { titel: "Return", text: "Move your hands back slowly along the same path and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Der Rücken wird unten rund. Die Bewegung nach unten kommt aus den Knien.", en: "Your back rounds at the bottom. The way down comes from your knees." }
  },
  "high-to-low-cable-chop": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle über Kopfhöhe. Stell dich seitlich zur Rolle, die Füße etwas breiter als schulterbreit. Greif den Griff mit beiden Händen über der Schulter der Rollenseite." },
        { titel: "Herunterziehen", text: "Zieh die Hände schräg vor dem Körper nach unten bis neben das Knie der anderen Seite. Atme dabei aus. Die Arme bleiben fast gestreckt, die Knie beugen sich leicht." },
        { titel: "Zurück", text: "Führ die Hände langsam auf demselben Weg nach oben und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley above head height. Stand side-on to the pulley, feet a little wider than shoulder width. Grip the handle with both hands above the shoulder on the pulley side." },
        { titel: "Pull down", text: "Pull your hands diagonally down in front of your body to beside the opposite knee. Breathe out. Your arms stay almost straight and your knees bend slightly." },
        { titel: "Return", text: "Move your hands slowly back up along the same path and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du beugst dich mit rundem Rücken nach vorn, statt zu drehen.", en: "You bend forward with a rounded back instead of rotating." }
  },
  "dumbbell-side-bend": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh hüftbreit mit einer Hantel in einer Hand, der Arm hängt lang. Die freie Hand liegt an der Hüfte oder am Hinterkopf." },
        { titel: "Senken", text: "Neig den Oberkörper gerade zur Seite der Hantel und atme ein. Die Hantel gleitet am Bein nach unten." },
        { titel: "Aufrichten", text: "Richte dich mit der Flanke der anderen Seite wieder auf und atme aus. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Stand with your feet hip width apart and a dumbbell in one hand, arm hanging long. Your free hand rests on your hip or behind your head." },
        { titel: "Lower", text: "Lean your torso straight to the dumbbell side and breathe in. The dumbbell glides down your leg." },
        { titel: "Straighten", text: "Straighten up again using the opposite side of your waist and breathe out. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du nimmst in jede Hand eine Hantel. Dann heben sich die Gewichte gegenseitig auf.", en: "You take a dumbbell in each hand. Then the weights cancel each other out." }
  },
  "weighted-russian-twist": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz dich auf den Boden, die Knie sind gebeugt, die Fersen stehen am Boden. Halt eine Scheibe, Hantel oder Kettlebell mit beiden Händen vor der Brust. Lehn dich mit geradem Rücken zurück, bis der Bauch anspannt." },
        { titel: "Drehen", text: "Dreh den Oberkörper zu einer Seite und führ das Gewicht neben die Hüfte. Atme dabei aus." },
        { titel: "Zur anderen Seite", text: "Dreh durch die Mitte zur anderen Seite. Atme in der Mitte ein. Die Schultern drehen mit, der Blick folgt dem Gewicht." }
      ],
      en: [
        { titel: "Setup", text: "Sit on the floor with your knees bent and your heels on the floor. Hold a plate, dumbbell or kettlebell with both hands in front of your chest. Lean back with a straight back until your abs tighten." },
        { titel: "Rotate", text: "Rotate your torso to one side and move the weight beside your hip. Breathe out." },
        { titel: "To the other side", text: "Rotate through the middle to the other side. Breathe in at the middle. Your shoulders rotate with it and your eyes follow the weight." }
      ]
    },
    fehler: { de: "Nur die Arme schwingen hin und her, und der Rücken wird rund.", en: "Only your arms swing back and forth and your back rounds." },
    tipp: { de: "Heb die Füße erst vom Boden, wenn es mit aufgestellten Fersen sauber klappt.", en: "Only lift your feet off the floor once it works cleanly with your heels down." }
  },
  "suitcase-carry": {
    schritte: {
      de: [
        { titel: "Aufnehmen", text: "Stell eine Hantel oder Kettlebell neben einen Fuß. Geh mit geradem Rücken in die Knie, greif sie und steh auf." },
        { titel: "Gehen", text: "Geh mit kleinen, ruhigen Schritten. Die Schultern sind auf gleicher Höhe, der Oberkörper ist aufrecht. Atme ruhig weiter." },
        { titel: "Wechseln", text: "Stell das Gewicht nach der Strecke kontrolliert ab und trag es mit der anderen Hand zurück." }
      ],
      en: [
        { titel: "Pick up", text: "Place a dumbbell or kettlebell beside one foot. Bend your knees with a straight back, grip it and stand up." },
        { titel: "Walk", text: "Walk with small, steady steps. Your shoulders are level and your torso is upright. Keep breathing steadily." },
        { titel: "Switch", text: "After the distance, set the weight down under control and carry it back with the other hand." }
      ]
    },
    fehler: { de: "Du lehnst dich vom Gewicht weg, oder die Schulter der Tragseite hängt nach unten.", en: "You lean away from the weight, or the shoulder on the carrying side hangs down." },
    tipp: { de: "Die freie Hand kannst du zur Seite strecken oder an die Hüfte legen.", en: "You can stretch your free hand out to the side or rest it on your hip." }
  },
  "turkish-get-up": {
    schritte: {
      de: [
        { titel: "Auf den Ellbogen", text: "Leg dich auf den Rücken und drück eine Kettlebell mit einem Arm senkrecht nach oben. Das Bein dieser Seite ist aufgestellt, der andere Arm liegt schräg zur Seite. Roll dich auf den freien Ellbogen und dann auf die Hand. Der Blick bleibt am Gewicht." },
        { titel: "In den Stand", text: "Heb die Hüfte und zieh das gestreckte Bein unter dir durch auf das Knie. Richte den Oberkörper auf und steh aus dem Ausfallschritt auf. Atme bei jedem Teilschritt aus." },
        { titel: "Zurück", text: "Geh denselben Weg rückwärts: Knie ablegen, Hand aufsetzen, Bein durchschieben, auf den Ellbogen und auf den Rücken. Wechsle dann die Seite." }
      ],
      en: [
        { titel: "To the elbow", text: "Lie on your back and press a kettlebell straight up with one arm. The leg on that side is bent with the foot on the floor, the other arm lies out to the side at an angle. Roll onto your free elbow and then onto your hand. Keep your eyes on the weight." },
        { titel: "To standing", text: "Lift your hips and sweep the straight leg under you onto the knee. Bring your torso upright and stand up from the lunge. Breathe out on each part." },
        { titel: "Return", text: "Go back the same way in reverse: knee down, hand down, leg through, onto the elbow and onto your back. Then switch sides." }
      ]
    },
    fehler: { de: "Der Arm mit dem Gewicht beugt sich, oder du schaust vom Gewicht weg.", en: "The arm holding the weight bends, or you look away from the weight." },
    sicherheit: { de: "Lass dir die Bewegung am Anfang von einem Trainer zeigen.", en: "Have a trainer show you the movement at first." },
    tipp: { de: "Mach jeden Teilschritt einzeln und halt nach jedem kurz an.", en: "Do each part separately and pause briefly after each one." }
  },
  "landmine-rotation": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Steck ein Ende der Stange in die Landmine-Halterung. Heb das andere Ende mit beiden Händen vor das Gesicht, die Arme sind fast gestreckt. Die Füße stehen etwas breiter als schulterbreit." },
        { titel: "Drehen", text: "Führ das Stangenende in einem Bogen zu einer Hüfte. Oberkörper und Hüfte drehen mit, der hintere Fuß dreht auf dem Ballen. Atme ruhig und gleichmäßig weiter." },
        { titel: "Zur anderen Seite", text: "Führ die Stange im Bogen über die Mitte zur anderen Hüfte." }
      ],
      en: [
        { titel: "Set up", text: "Put one end of the bar into the landmine attachment. Lift the other end with both hands in front of your face, arms almost straight. Your feet are a little wider than shoulder width." },
        { titel: "Rotate", text: "Move the end of the bar in an arc to one hip. Your torso and hips rotate with it and your back foot pivots on the ball. Keep breathing calmly and evenly." },
        { titel: "To the other side", text: "Move the bar in an arc over the middle to the other hip." }
      ]
    },
    fehler: { de: "Die Arme beugen sich, und die Stange wird nur mit den Schultern geschoben.", en: "Your arms bend and the bar is only pushed with your shoulders." },
    sicherheit: { de: "Fang mit der leeren Stange an und achte auf freien Platz um dich herum.", en: "Start with the empty bar and make sure you have free space around you." }
  },
  "landmine-anti-rotation": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Steck ein Ende der Stange in die Landmine-Halterung. Halt das andere Ende mit beiden Händen und fast gestreckten Armen vor der Brust. Die Füße stehen schulterbreit." },
        { titel: "Zur Seite", text: "Spann Bauch und Po an. Führ das Stangenende langsam ein Stück zur Seite, etwa bis vor die Schulter. Hüfte und Brust zeigen weiter nach vorn. Atme ruhig weiter." },
        { titel: "Zur anderen Seite", text: "Führ die Stange langsam über die Mitte zur anderen Seite." }
      ],
      en: [
        { titel: "Set up", text: "Put one end of the bar into the landmine attachment. Hold the other end with both hands and almost straight arms in front of your chest. Your feet are shoulder width apart." },
        { titel: "To the side", text: "Tighten your abs and glutes. Move the end of the bar slowly a little to the side, to about in front of your shoulder. Your hips and chest keep facing forward. Keep breathing steadily." },
        { titel: "To the other side", text: "Move the bar slowly over the middle to the other side." }
      ]
    },
    fehler: { de: "Die Hüfte dreht mit. Dann ist es die Landmine Rotation.", en: "Your hips rotate with it. Then it is the landmine rotation." }
  },
  "russian-twist": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz dich auf den Boden, die Knie sind gebeugt, die Fersen stehen am Boden. Leg die Hände vor der Brust zusammen und lehn dich mit geradem Rücken zurück, bis der Bauch anspannt." },
        { titel: "Drehen", text: "Dreh den Oberkörper zu einer Seite und führ die Hände neben die Hüfte. Atme dabei aus." },
        { titel: "Zur anderen Seite", text: "Dreh durch die Mitte zur anderen Seite. Die Schultern drehen mit, nicht nur die Arme." }
      ],
      en: [
        { titel: "Setup", text: "Sit on the floor with your knees bent and your heels on the floor. Bring your hands together in front of your chest and lean back with a straight back until your abs tighten." },
        { titel: "Rotate", text: "Rotate your torso to one side and move your hands beside your hip. Breathe out." },
        { titel: "To the other side", text: "Rotate through the middle to the other side. Your shoulders rotate with it, not only your arms." }
      ]
    },
    fehler: { de: "Der Rücken wird rund, und du sackst nach hinten.", en: "Your back rounds and you slump backward." }
  },
  "windshield-wipers-eigen": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf den Rücken und streck die Arme zur Seite aus, die Handflächen liegen am Boden. Heb die Beine senkrecht nach oben." },
        { titel: "Zur Seite senken", text: "Senk beide Beine langsam zu einer Seite, bis sie knapp über dem Boden sind. Atme dabei ein. Beide Schultern bleiben am Boden." },
        { titel: "Zurück und wechseln", text: "Heb die Beine zurück zur Mitte, atme aus und senk sie zur anderen Seite." }
      ],
      en: [
        { titel: "Setup", text: "Lie on your back and stretch your arms out to the sides, palms on the floor. Lift your legs straight up." },
        { titel: "Lower to the side", text: "Lower both legs slowly to one side until they are just above the floor. Breathe in. Both shoulders stay on the floor." },
        { titel: "Return and switch", text: "Lift your legs back to the middle, breathe out and lower them to the other side." }
      ]
    },
    fehler: { de: "Die gegenüberliegende Schulter hebt vom Boden ab, oder die Beine fallen zur Seite.", en: "The opposite shoulder lifts off the floor, or your legs drop to the side." },
    tipp: { de: "Mit gebeugten Knien ist es deutlich leichter.", en: "It is much easier with bent knees." }
  },
  "side-plank": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf die Seite und stütz dich auf den Unterarm. Der Ellbogen ist unter der Schulter, die Füße liegen aufeinander." },
        { titel: "Hüfte heben", text: "Heb die Hüfte, bis Kopf, Hüfte und Füße eine gerade Linie bilden. Spann Bauch und Po an." },
        { titel: "Halten", text: "Halt die Position und atme ruhig weiter. Wechsle danach die Seite." }
      ],
      en: [
        { titel: "Setup", text: "Lie on your side and prop yourself on your forearm. Your elbow is under your shoulder and your feet are stacked." },
        { titel: "Lift your hips", text: "Lift your hips until your head, hips and feet form a straight line. Tighten your abs and glutes." },
        { titel: "Hold", text: "Hold the position and keep breathing steadily. Then switch sides." }
      ]
    },
    fehler: { de: "Die Hüfte sinkt ab, oder sie schiebt nach hinten.", en: "Your hips sink, or they push back." },
    tipp: { de: "Fang mit 20 Sekunden pro Seite an. Mit den Knien am Boden ist es leichter.", en: "Start with 20 seconds per side. It is easier with your knees on the floor." }
  },
  "side-plank-hip-raise": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Geh in den Seitstütz auf dem Unterarm. Der Körper bildet eine gerade Linie." },
        { titel: "Senken", text: "Senk die Hüfte langsam, bis sie den Boden fast berührt, und atme ein." },
        { titel: "Heben", text: "Heb die Hüfte wieder, bis sie knapp über der geraden Linie ist, und atme aus. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Get into the side plank on your forearm. Your body forms a straight line." },
        { titel: "Lower", text: "Lower your hips slowly until they almost touch the floor and breathe in." },
        { titel: "Raise", text: "Lift your hips again until they are just above the straight line and breathe out. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Die Hüfte dreht nach vorn oder hinten, statt gerade nach oben und unten zu gehen.", en: "Your hips rotate forward or back instead of moving straight up and down." }
  },
  "rkc-plank": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Geh in den Unterarmstütz. Die Ellbogen stehen etwas vor den Schultern, die Hände sind zu Fäusten geballt. Der Körper bildet eine gerade Linie." },
        { titel: "Alles anspannen", text: "Spann Po, Oberschenkel und Bauch so fest an, wie du kannst. Zieh die Ellbogen in Richtung Füße und die Zehen in Richtung Ellbogen, ohne dass sich etwas bewegt." },
        { titel: "Halten", text: "Halt 10 bis 20 Sekunden und atme dabei kurz und flach weiter. Lös dann die Spannung." }
      ],
      en: [
        { titel: "Setup", text: "Get into the forearm plank. Your elbows are a little in front of your shoulders and your hands are clenched into fists. Your body forms a straight line." },
        { titel: "Tighten everything", text: "Tighten your glutes, thighs and abs as hard as you can. Pull your elbows toward your feet and your toes toward your elbows without anything moving." },
        { titel: "Hold", text: "Hold for 10 to 20 seconds and keep taking short, shallow breaths. Then release the tension." }
      ]
    },
    fehler: { de: "Du hältst lange mit wenig Spannung. Hier zählt die Spannung, nicht die Zeit.", en: "You hold for a long time with little tension. Here the tension counts, not the time." }
  },
  "hanging-oblique-knee-raise": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng im Obergriff schulterbreit an der Stange. Die Schultern sind aktiv, die Beine hängen ruhig." },
        { titel: "Schräg anheben", text: "Zieh beide Knie nach oben und zu einer Seite, in Richtung Ellbogen. Atme dabei aus. Das Becken rollt mit ein." },
        { titel: "Senken und wechseln", text: "Lass die Beine langsam ab und atme ein. Die nächste Wiederholung geht zur anderen Seite." }
      ],
      en: [
        { titel: "Setup", text: "Hang from the bar overhand at shoulder width. Your shoulders are active and your legs hang still." },
        { titel: "Raise diagonally", text: "Pull both knees up and to one side, toward your elbow. Breathe out. Your pelvis curls up with it." },
        { titel: "Lower and switch", text: "Lower your legs slowly and breathe in. The next rep goes to the other side." }
      ]
    },
    fehler: { de: "Du schwingst mit dem ganzen Körper.", en: "You swing with your whole body." }
  },
  "hanging-windshield-wipers": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng an der Stange und heb die gestreckten Beine, bis die Füße an der Stange sind. Der Rücken ist etwa waagerecht, die Arme sind gestreckt." },
        { titel: "Zur Seite", text: "Dreh die Beine langsam zu einer Seite, bis sie etwa waagerecht sind. Atme ruhig weiter." },
        { titel: "Zur anderen Seite", text: "Führ die Beine über die Mitte zur anderen Seite. Die Hüfte bleibt oben." }
      ],
      en: [
        { titel: "Setup", text: "Hang from the bar and lift your straight legs until your feet are at the bar. Your back is about horizontal and your arms are straight." },
        { titel: "To the side", text: "Rotate your legs slowly to one side until they are about horizontal. Keep breathing steadily." },
        { titel: "To the other side", text: "Move your legs over the middle to the other side. Your hips stay up." }
      ]
    },
    fehler: { de: "Die Hüfte sinkt ab, und die Beine fallen von Seite zu Seite.", en: "Your hips sink and your legs drop from side to side." },
    sicherheit: { de: "Mach die Übung erst, wenn du die gestreckten Beine im Hang sauber bis zur Stange heben kannst und Windshield Wipers am Boden sicher beherrschst.", en: "Only do this exercise once you can lift your straight legs cleanly to the bar while hanging and you have mastered windshield wipers on the floor." }
  },
  "l-sit": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stütz dich mit gestreckten Armen auf Barren, zwei Griffe oder den Boden. Drück die Schultern nach unten, weg von den Ohren." },
        { titel: "Beine heben", text: "Heb die gestreckten Beine nach vorn, bis sie waagerecht sind. Die Knie sind durchgedrückt, die Zehen zeigen nach vorn." },
        { titel: "Halten", text: "Halt die Position und atme ruhig weiter." }
      ],
      en: [
        { titel: "Setup", text: "Support yourself with straight arms on parallel bars, two handles or the floor. Push your shoulders down, away from your ears." },
        { titel: "Lift your legs", text: "Lift your straight legs forward until they are horizontal. Your knees are locked and your toes point forward." },
        { titel: "Hold", text: "Hold the position and keep breathing steadily." }
      ]
    },
    fehler: { de: "Die Schultern sacken zu den Ohren, oder die Knie beugen sich.", en: "Your shoulders sink toward your ears, or your knees bend." },
    tipp: { de: "Fang mit 5 bis 10 Sekunden an. Leichter wird es mit angezogenen Knien oder wenn du erst nur ein Bein streckst.", en: "Start with 5 to 10 seconds. It gets easier with your knees tucked or if you straighten only one leg at first." }
  },
  "v-sit": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stütz dich mit gestreckten Armen auf Barren, zwei Griffe oder den Boden und geh in den L-Sit." },
        { titel: "Beine höher", text: "Heb die gestreckten Beine weiter nach oben und schieb die Hüfte nach vorn zwischen die Hände. Der Oberkörper lehnt sich leicht zurück." },
        { titel: "Halten", text: "Halt die Position und atme ruhig weiter." }
      ],
      en: [
        { titel: "Setup", text: "Support yourself with straight arms on parallel bars, two handles or the floor and get into the L-sit." },
        { titel: "Legs higher", text: "Lift your straight legs further up and push your hips forward between your hands. Your torso leans back slightly." },
        { titel: "Hold", text: "Hold the position and keep breathing steadily." }
      ]
    },
    fehler: { de: "Die Beine beugen sich, oder die Arme knicken ein.", en: "Your legs bend, or your arms buckle." },
    sicherheit: { de: "Mach die Übung erst, wenn du den L-Sit ruhig halten kannst.", en: "Only do this exercise once you can hold the L-sit steadily." }
  }
});
