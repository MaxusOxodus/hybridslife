// Die Erklärungen der Muskelgruppe Beinbeuger. Sie kommen zu den Einträgen aus der erklaerungen.js dazu,
// deshalb muss diese Datei in der index.html nach der erklaerungen.js stehen. Aufbau wie dort:
// Schlüssel ist die Übungs-ID, pro Übung schritte (2 bis 3) und optional fehler, sicherheit, tipp, alle in de und en.
// Die Datei hat in der index.html und in der sw.js kein ?v=N: Der Service Worker holt sie bei jeder neuen VERSION frisch.
Object.assign(ERKLAERUNGEN, {
  "lying-hamstring-curl": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Steck den Stift. Leg dich auf den Bauch, die Knie liegen knapp hinter der Polsterkante auf Höhe der Drehachse. Die Rolle liegt knapp über den Fersen. Halt dich an den Griffen fest." },
        { titel: "Beugen", text: "Zieh die Fersen in Richtung Gesäß und atme aus. Die Hüfte bleibt am Polster." },
        { titel: "Zurück", text: "Lass die Beine langsam zurück, bis sie fast gestreckt sind, und atme ein. Die Gewichtsplatten setzen nicht auf." }
      ],
      en: [
        { titel: "Set up", text: "Set the pin. Lie face down with your knees just past the edge of the pad, in line with the pivot. The roller sits just above your heels. Hold on to the handles." },
        { titel: "Curl", text: "Pull your heels toward your glutes and breathe out. Your hips stay on the pad." },
        { titel: "Return", text: "Let your legs return slowly until they are almost straight, and breathe in. The weight plates do not touch down." }
      ]
    },
    fehler: { de: "Die Hüfte hebt vom Polster ab, und der untere Rücken hilft mit.", en: "Your hips lift off the pad and your lower back helps out." }
  },
  "seated-hamstring-curl": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Steck den Stift. Stell die Lehne so ein, dass die Knie auf Höhe der Drehachse sind. Die Rolle liegt unter den Waden knapp über den Fersen. Senk das obere Polster fest auf die Oberschenkel knapp über den Knien." },
        { titel: "Beugen", text: "Zieh die Fersen nach unten hinten unter den Sitz und atme aus. Der Rücken bleibt an der Lehne." },
        { titel: "Zurück", text: "Lass die Beine langsam hoch, bis sie fast gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Set the pin. Adjust the backrest so your knees line up with the pivot. The roller sits under your calves just above your heels. Lower the top pad firmly onto your thighs just above your knees." },
        { titel: "Curl", text: "Pull your heels down and back under the seat and breathe out. Your back stays against the backrest." },
        { titel: "Return", text: "Let your legs rise slowly until they are almost straight, and breathe in." }
      ]
    },
    fehler: { de: "Das Gesäß rutscht nach vorn, und der Rücken löst sich von der Lehne.", en: "Your glutes slide forward and your back comes off the backrest." }
  },
  "seated-single-leg-hamstring-curl": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Stell die Maschine ein wie beim Beinbeuger sitzend und wähl weniger als die Hälfte deines Gewichts für beide Beine. Ein Bein liegt auf der Rolle. Das andere nimmst du von der Rolle und hältst es ruhig." },
        { titel: "Beugen", text: "Zieh die Ferse nach unten hinten unter den Sitz und atme aus. Das Becken bleibt gerade." },
        { titel: "Zurück", text: "Lass das Bein langsam hoch und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Set the machine up as for the seated hamstring curl and select less than half the weight you use with both legs. One leg rests on the roller. Take the other leg off the roller and keep it still." },
        { titel: "Curl", text: "Pull your heel down and back under the seat and breathe out. Your pelvis stays square." },
        { titel: "Return", text: "Let your leg rise slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Das Becken dreht sich zur Seite, damit das Bein mehr Kraft bekommt.", en: "Your pelvis twists to the side to give the leg more power." },
    tipp: { de: "Fang mit der schwächeren Seite an und mach mit der stärkeren gleich viele Wiederholungen.", en: "Start with your weaker side and do the same number of reps with your stronger side." }
  },
  "standing-cable-leg-curl": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle ganz nach unten und leg die Fußmanschette um einen Knöchel. Stell dich mit dem Gesicht zum Gerät, halt dich fest und geh einen Schritt zurück, bis das Kabel gespannt ist." },
        { titel: "Beugen", text: "Zieh die Ferse in Richtung Gesäß und atme aus. Der Oberschenkel bleibt senkrecht, das Knie bleibt neben dem Standbein." },
        { titel: "Zurück", text: "Lass den Fuß langsam ab und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley all the way down and fasten the ankle cuff around one ankle. Face the machine, hold on and take a step back until the cable is taut." },
        { titel: "Curl", text: "Pull your heel toward your glutes and breathe out. Your thigh stays vertical and your knee stays next to your standing leg." },
        { titel: "Return", text: "Lower your foot slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Der Oberschenkel schwingt nach vorn und hinten, und die Hüfte macht die Arbeit.", en: "Your thigh swings forward and back and your hip does the work." }
  },
  "dumbbell-leg-curl": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell eine leichte Kurzhantel aufrecht ans Fußende der Bank. Leg dich auf den Bauch, die Knie liegen knapp hinter der Bankkante. Klemm den Hantelgriff zwischen die Fußsohlen, die obere Scheibe liegt auf den Sohlen. Halt dich vorn an der Bank fest." },
        { titel: "Beugen", text: "Zieh die Fersen in Richtung Gesäß, bis die Unterschenkel fast senkrecht stehen. Atme dabei aus." },
        { titel: "Zurück", text: "Lass die Beine langsam ab, bis sie fast gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Stand a light dumbbell upright at the foot end of the bench. Lie face down with your knees just past the edge of the bench. Clamp the dumbbell handle between the soles of your feet, with the top plate resting on your soles. Hold on to the front of the bench." },
        { titel: "Curl", text: "Pull your heels toward your glutes until your lower legs are almost vertical. Breathe out." },
        { titel: "Return", text: "Lower your legs slowly until they are almost straight, and breathe in." }
      ]
    },
    fehler: { de: "Die Füße lassen locker, und die Hantel rutscht.", en: "Your feet relax and the dumbbell slips." },
    sicherheit: { de: "Beug nicht über die Senkrechte hinaus, sonst kann die Hantel auf dich fallen. Nimm ein leichtes Gewicht und lass dir die Hantel am Anfang von jemandem zwischen die Füße setzen.", en: "Do not curl past vertical, or the dumbbell can fall on you. Use a light weight and have someone place the dumbbell between your feet at first." }
  },
  "nordic-hamstring-curl": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Knie dich auf eine weiche Unterlage. Die Fersen sind fest, unter einem Polster oder von jemandem gehalten. Der Körper ist von den Knien bis zum Kopf gerade, die Hände sind vor der Brust." },
        { titel: "Absenken", text: "Lass dich so langsam wie möglich nach vorn sinken und atme ein. Die Hüfte bleibt gestreckt. Fang dich unten mit den Händen ab." },
        { titel: "Zurück", text: "Drück dich mit den Händen leicht ab, zieh dich mit den Beinbeugern zurück in den Kniestand und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Kneel on a soft surface. Your heels are anchored, under a pad or held by someone. Your body is straight from your knees to your head, with your hands in front of your chest." },
        { titel: "Lower", text: "Let yourself sink forward as slowly as you can and breathe in. Your hips stay extended. Catch yourself with your hands at the bottom." },
        { titel: "Return", text: "Push off lightly with your hands, pull yourself back to kneeling with your hamstrings and breathe out." }
      ]
    },
    fehler: { de: "Die Hüfte knickt ein, und der Po geht nach hinten.", en: "Your hips bend and your butt moves back." },
    sicherheit: { de: "Die Übung belastet die Beinbeuger sehr stark. Wärm dich auf und fang mit wenigen Wiederholungen an. Die Fersen müssen sicher halten.", en: "This exercise loads the hamstrings very heavily. Warm up and start with just a few reps. Your heels must be held securely." }
  },
  "assisted-nordic-curl": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Befestig ein Widerstandsband hinter dir über Kopfhöhe und leg es um die Brust unter die Achseln. Knie dich auf eine weiche Unterlage, die Fersen sind fest." },
        { titel: "Absenken", text: "Lass dich mit geradem Körper langsam nach vorn sinken und atme ein. Das Band bremst mit." },
        { titel: "Zurück", text: "Zieh dich mit den Beinbeugern zurück in den Kniestand und atme aus." }
      ],
      en: [
        { titel: "Set up", text: "Anchor a resistance band behind you above head height and loop it around your chest under your armpits. Kneel on a soft surface with your heels anchored." },
        { titel: "Lower", text: "Let yourself sink forward slowly with a straight body and breathe in. The band helps slow you down." },
        { titel: "Return", text: "Pull yourself back to kneeling with your hamstrings and breathe out." }
      ]
    },
    fehler: { de: "Die Hüfte knickt ein, und der Po geht nach hinten.", en: "Your hips bend and your butt moves back." },
    tipp: { de: "Je dünner das Band, desto schwerer wird es.", en: "The thinner the band, the harder it gets." }
  },
  "glute-ham-raise-eigen": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Stell das Gerät so ein, dass die Füße zwischen den Rollen an der Platte stehen und die Oberschenkel knapp über den Knien auf dem Polster liegen. Richte dich auf, bis der Körper von den Knien bis zum Kopf gerade ist." },
        { titel: "Absenken", text: "Streck die Knie und senk den geraden Körper langsam nach vorn, bis er etwa waagerecht ist. Atme dabei ein." },
        { titel: "Zurück", text: "Drück die Fußballen gegen die Platte, beug die Knie und zieh dich zurück nach oben. Atme dabei aus." }
      ],
      en: [
        { titel: "Set up", text: "Adjust the machine so your feet sit between the rollers against the footplate and your thighs rest on the pad just above your knees. Straighten up until your body is straight from your knees to your head." },
        { titel: "Lower", text: "Extend your knees and lower your straight body forward slowly until it is about horizontal. Breathe in." },
        { titel: "Return", text: "Press the balls of your feet into the footplate, bend your knees and pull yourself back up. Breathe out." }
      ]
    },
    fehler: { de: "Du knickst in der Hüfte ab und richtest dich aus dem Rücken auf.", en: "You bend at the hips and come up using your back." },
    sicherheit: { de: "Prüf vor dem ersten Satz, dass die Füße fest zwischen den Rollen sitzen.", en: "Before your first set, check that your feet are locked in firmly between the rollers." }
  },
  "sliding-leg-curl-eigen": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf den Rücken, die Arme liegen neben dem Körper. Die Fersen stehen auf zwei Gleitern oder einem Handtuch auf glattem Boden, die Knie sind gebeugt. Heb die Hüfte, bis Schultern, Hüfte und Knie eine Linie bilden." },
        { titel: "Ausstrecken", text: "Schieb die Fersen langsam nach vorn, bis die Beine fast gestreckt sind. Atme dabei ein. Die Hüfte bleibt oben." },
        { titel: "Heranziehen", text: "Zieh die Fersen zurück in Richtung Gesäß und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Lie on your back with your arms beside your body. Your heels are on two sliders or a towel on a smooth floor, and your knees are bent. Lift your hips until your shoulders, hips and knees form one line." },
        { titel: "Extend", text: "Slide your heels forward slowly until your legs are almost straight. Breathe in. Your hips stay up." },
        { titel: "Curl in", text: "Pull your heels back toward your glutes and breathe out." }
      ]
    },
    fehler: { de: "Die Hüfte sackt beim Heranziehen ab.", en: "Your hips drop as you pull your heels in." },
    tipp: { de: "Leichter wird es, wenn du nur langsam ausstreckst, die Hüfte ablegst und neu startest.", en: "It gets easier if you only slide out slowly, set your hips down and start again." }
  },
  "single-leg-sliding-leg-curl": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf den Rücken, eine Ferse steht auf dem Gleiter. Heb das andere Bein an und heb die Hüfte, bis Schultern, Hüfte und Knie eine Linie bilden." },
        { titel: "Ausstrecken", text: "Schieb die Ferse langsam nach vorn, bis das Bein fast gestreckt ist. Atme dabei ein. Die Hüfte bleibt oben und gerade." },
        { titel: "Heranziehen", text: "Zieh die Ferse zurück in Richtung Gesäß und atme aus. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Lie on your back with one heel on the slider. Lift the other leg and raise your hips until your shoulders, hips and knee form one line." },
        { titel: "Extend", text: "Slide your heel forward slowly until your leg is almost straight. Breathe in. Your hips stay up and level." },
        { titel: "Curl in", text: "Pull your heel back toward your glutes and breathe out. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Die Hüfte kippt zur freien Seite ab.", en: "Your hips tilt down toward the free side." },
    tipp: { de: "Mach die Übung erst, wenn der Sliding Leg Curl mit beiden Beinen sauber klappt.", en: "Only do this exercise once the sliding leg curl with both legs is clean." }
  }
});
