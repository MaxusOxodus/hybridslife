// Die Erklärungen der Muskelgruppe Adduktoren. Sie kommen zu den Einträgen aus der erklaerungen.js dazu,
// deshalb muss diese Datei in der index.html nach der erklaerungen.js stehen. Aufbau wie dort:
// Schlüssel ist die Übungs-ID, pro Übung schritte (2 bis 3) und optional fehler, sicherheit, tipp, alle in de und en.
// Die Datei hat in der index.html und in der sw.js kein ?v=N: Der Service Worker holt sie bei jeder neuen VERSION frisch.
Object.assign(ERKLAERUNGEN, {
  "reclined-machine-hip-adduction": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Steck den Stift und stell die Lehne nach hinten. Stell die Startweite so ein, dass du innen am Oberschenkel eine leichte Dehnung spürst. Setz dich, lehn dich an und leg die Knie von innen an die Polster. Die Füße stehen auf den Stützen." },
        { titel: "Schließen", text: "Drück die Beine zusammen, bis die Polster sich fast berühren. Atme dabei aus." },
        { titel: "Zurück", text: "Lass die Beine langsam wieder auseinander und atme ein. Die Gewichtsplatten setzen nicht auf." }
      ],
      en: [
        { titel: "Set up", text: "Set the pin and set the backrest back. Adjust the starting width so you feel a slight stretch on your inner thighs. Sit down, lean back and place your knees against the pads from the inside. Your feet are on the footrests." },
        { titel: "Close", text: "Squeeze your legs together until the pads almost touch. Breathe out." },
        { titel: "Return", text: "Let your legs open again slowly and breathe in. The weight plates do not touch down." }
      ]
    },
    fehler: { de: "Du lässt die Beine aufschnellen und fängst das Gewicht in der Dehnung ab.", en: "You let your legs spring open and catch the weight in the stretch." },
    sicherheit: { de: "Stell die Startweite nicht zu weit ein und steigere das Gewicht langsam. Die Leiste ist empfindlich.", en: "Do not set the starting width too wide, and increase the weight slowly. The groin is sensitive." }
  },
  "cable-hip-adduction": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle ganz nach unten und leg die Fußmanschette um den Knöchel, der näher an der Rolle ist. Stell dich seitlich zur Rolle, geh einen Schritt weg und halt dich fest. Das Arbeitsbein ist zur Rolle hin abgespreizt." },
        { titel: "Heranziehen", text: "Zieh das gestreckte Bein zum Standbein und knapp davor vorbei. Atme dabei aus. Der Oberkörper bleibt aufrecht." },
        { titel: "Zurück", text: "Lass das Bein langsam wieder zur Rolle und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley all the way down and fasten the ankle cuff around the ankle that is closer to the pulley. Stand sideways to the pulley, take a step away and hold on. Your working leg is out to the side toward the pulley." },
        { titel: "Pull in", text: "Pull your straight leg toward your standing leg and just past it in front. Breathe out. Your torso stays upright." },
        { titel: "Return", text: "Let your leg return slowly toward the pulley and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Die Hüfte dreht sich mit, und das Bein schwingt nach vorn.", en: "Your hips rotate along and your leg swings forward." }
  },
  "wide-stance-romanian-deadlift": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Füße deutlich breiter als schulterbreit, die Zehen zeigen leicht nach außen. Greif die Stange im Obergriff schulterbreit, die Stange hängt vor dem Körper, die Arme sind gestreckt. Die Knie sind leicht gebeugt." },
        { titel: "Hüfte nach hinten", text: "Schieb die Hüfte nach hinten und lass die Stange eng am Körper nach unten gleiten. Atme dabei ein. Geh so tief, wie der Rücken gerade bleibt. Die Knie zeigen in Richtung der Zehen." },
        { titel: "Aufrichten", text: "Schieb die Hüfte nach vorn, richte dich auf und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Place your feet clearly wider than shoulder width, toes pointing slightly out. Grip the bar overhand at shoulder width. The bar hangs in front of your body and your arms are straight. Your knees are slightly bent." },
        { titel: "Hips back", text: "Push your hips back and let the bar slide down close to your body. Breathe in. Go as low as your back stays straight. Your knees point in the direction of your toes." },
        { titel: "Stand up", text: "Drive your hips forward, stand up tall and breathe out." }
      ]
    },
    fehler: { de: "Die Knie beugen sich immer weiter, und es wird eine Kniebeuge.", en: "Your knees keep bending more and it turns into a squat." },
    sicherheit: { de: "Der Rücken bleibt gerade. Hör auf, bevor er sich rundet.", en: "Your back stays straight. Stop before it rounds." }
  },
  "wide-stance-squat-eigen": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Füße deutlich breiter als schulterbreit, die Zehen zeigen etwa 30 bis 45° nach außen. Halt die Hände vor der Brust." },
        { titel: "Senken", text: "Beug die Knie und senk dich gerade nach unten, bis die Oberschenkel etwa waagerecht sind. Atme dabei ein. Die Knie zeigen in Richtung der Zehen." },
        { titel: "Hoch", text: "Drück dich durch den ganzen Fuß nach oben und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Place your feet clearly wider than shoulder width, toes pointing about 30 to 45° out. Hold your hands in front of your chest." },
        { titel: "Lower", text: "Bend your knees and lower yourself straight down until your thighs are about horizontal. Breathe in. Your knees point in the direction of your toes." },
        { titel: "Up", text: "Push up through your whole foot and breathe out." }
      ]
    },
    fehler: { de: "Die Knie fallen nach innen.", en: "Your knees cave in." }
  },
  "cossack-squat-eigen": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Füße sehr breit, etwa doppelt schulterbreit. Die Zehen zeigen leicht nach außen. Halt die Hände vor der Brust." },
        { titel: "Zur Seite senken", text: "Verlagere das Gewicht auf ein Bein und beug es, so tief du kannst. Atme dabei ein. Die Ferse bleibt am Boden. Das andere Bein bleibt gestreckt, die Zehen dürfen sich nach oben drehen." },
        { titel: "Hoch", text: "Drück dich über das gebeugte Bein zurück in die Mitte und atme aus. Wechsle dann die Seite." }
      ],
      en: [
        { titel: "Setup", text: "Place your feet very wide, about twice shoulder width. Your toes point slightly out. Hold your hands in front of your chest." },
        { titel: "Lower to the side", text: "Shift your weight onto one leg and bend it as deep as you can. Breathe in. Your heel stays on the floor. The other leg stays straight, and its toes may turn up." },
        { titel: "Up", text: "Push back to the middle through your bent leg and breathe out. Then switch sides." }
      ]
    },
    fehler: { de: "Die Ferse des gebeugten Beins hebt ab, oder das Knie fällt nach innen.", en: "The heel of your bent leg lifts, or your knee caves in." },
    sicherheit: { de: "Geh nur so tief, wie es an der Innenseite des gestreckten Beins angenehm dehnt. Kein Wippen in der tiefen Position.", en: "Go only as deep as the stretch on the inside of your straight leg feels comfortable. No bouncing at the bottom." }
  },
  "lateral-lunge-eigen": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh aufrecht, die Füße hüftbreit. Halt die Hände vor der Brust." },
        { titel: "Schritt zur Seite", text: "Mach einen großen Schritt zur Seite, schieb die Hüfte nach hinten und beug das Knie dieses Beins. Atme dabei ein. Das andere Bein bleibt gestreckt, beide Füße stehen flach und zeigen nach vorn." },
        { titel: "Zurück", text: "Drück dich mit dem gebeugten Bein kräftig ab, zurück in den Stand, und atme aus. Wechsle die Seite oder mach erst alle Wiederholungen einer Seite." }
      ],
      en: [
        { titel: "Setup", text: "Stand upright with your feet hip width apart. Hold your hands in front of your chest." },
        { titel: "Step to the side", text: "Take a big step to the side, push your hips back and bend the knee of that leg. Breathe in. The other leg stays straight, and both feet are flat and point forward." },
        { titel: "Return", text: "Push off hard with your bent leg back to standing and breathe out. Switch sides, or do all reps on one side first." }
      ]
    },
    fehler: { de: "Das Knie fällt nach innen, oder der Oberkörper rundet sich nach vorn.", en: "Your knee caves in, or your torso rounds forward." }
  },
  "copenhagen-plank": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich seitlich neben eine Bank und stütz dich auf den Unterarm, der Ellbogen ist unter der Schulter. Leg das obere Bein mit der Innenseite auf die Bank. Das untere Bein ist unter der Bank." },
        { titel: "Hüfte heben", text: "Drück das obere Bein in die Bank und heb die Hüfte, bis der Körper eine gerade Linie bildet. Zieh das untere Bein an das obere heran." },
        { titel: "Halten", text: "Halt die Position und atme ruhig weiter. Wechsle danach die Seite." }
      ],
      en: [
        { titel: "Setup", text: "Lie on your side next to a bench and prop yourself on your forearm, with your elbow under your shoulder. Place the inside of your top leg on the bench. Your bottom leg is under the bench." },
        { titel: "Lift your hips", text: "Press your top leg into the bench and lift your hips until your body forms a straight line. Bring your bottom leg up to the top one." },
        { titel: "Hold", text: "Hold the position and keep breathing calmly. Then switch sides." }
      ]
    },
    fehler: { de: "Die Hüfte hängt durch oder dreht sich nach vorn.", en: "Your hips sag or rotate forward." },
    sicherheit: { de: "Die Übung belastet die Leiste stark. Fang mit dem Knie auf der Bank an und halt nur kurz. Liegt nur der Knöchel auf, ist es deutlich schwerer.", en: "This exercise puts a lot of load on the groin. Start with your knee on the bench and hold only briefly. With only your ankle on the bench it is much harder." }
  }
});
