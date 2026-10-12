// Die Erklärungen der Muskelgruppe Abduktoren. Sie kommen zu den Einträgen aus der erklaerungen.js dazu,
// deshalb muss diese Datei in der index.html nach der erklaerungen.js stehen. Aufbau wie dort:
// Schlüssel ist die Übungs-ID, pro Übung schritte (2 bis 3) und optional fehler, sicherheit, tipp, alle in de und en.
// Die Datei hat in der index.html und in der sw.js kein ?v=N: Der Service Worker holt sie bei jeder neuen VERSION frisch.
Object.assign(ERKLAERUNGEN, {
  "abduktorenmaschine": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Steck den Stift und setz dich mit dem Rücken an die Lehne. Die Polster liegen außen an den Oberschenkeln knapp über den Knien, die Füße stehen auf den Stützen. Die Beine sind am Start geschlossen." },
        { titel: "Öffnen", text: "Drück die Knie so weit nach außen, wie es ohne Ausweichen geht. Atme dabei aus." },
        { titel: "Zurück", text: "Lass die Beine langsam wieder zusammen und atme ein. Die Gewichtsplatten setzen nicht auf." }
      ],
      en: [
        { titel: "Set up", text: "Set the pin and sit with your back against the backrest. The pads rest on the outside of your thighs just above your knees, and your feet are on the footrests. Your legs are together at the start." },
        { titel: "Open", text: "Push your knees out as far as you can without compensating. Breathe out." },
        { titel: "Return", text: "Let your legs come back together slowly and breathe in. The weight plates do not touch down." }
      ]
    },
    fehler: { de: "Du lässt die Beine zurückschnellen und holst für die nächste Wiederholung Schwung.", en: "You let your legs snap back and use the rebound for the next rep." }
  },
  "leaning-forward-machine-hip-abduction": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Steck den Stift und setz dich in die Maschine. Die Polster liegen außen an den Oberschenkeln. Beug dich mit geradem Rücken aus der Hüfte vor und halt dich vorn an der Maschine fest." },
        { titel: "Öffnen", text: "Drück die Knie nach außen und atme aus. Der Oberkörper bleibt vorgebeugt und ruhig." },
        { titel: "Zurück", text: "Lass die Beine langsam zusammen und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Set the pin and sit in the machine. The pads rest on the outside of your thighs. Hinge forward at the hips with a straight back and hold on to the front of the machine." },
        { titel: "Open", text: "Push your knees out and breathe out. Your torso stays leaned forward and still." },
        { titel: "Return", text: "Let your legs come together slowly and breathe in." }
      ]
    },
    fehler: { de: "Du richtest dich bei jeder Wiederholung auf und wippst mit dem Oberkörper.", en: "You straighten up on every rep and rock your torso." }
  },
  "side-lying-leg-raise-eigen": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf die Seite, der Kopf liegt auf dem unteren Arm. Das untere Bein ist leicht gebeugt, das obere ist gestreckt. Hüfte und Schultern liegen senkrecht übereinander." },
        { titel: "Heben", text: "Heb das obere Bein gestreckt nach oben, so weit es ohne Ausweichen geht. Atme dabei aus. Die Zehen zeigen nach vorn." },
        { titel: "Senken", text: "Senk das Bein langsam, ohne es ganz abzulegen, und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Lie on your side with your head resting on your bottom arm. Your bottom leg is slightly bent and your top leg is straight. Your hips and shoulders are stacked vertically." },
        { titel: "Raise", text: "Lift your top leg straight up as far as you can without compensating. Breathe out. Your toes point forward." },
        { titel: "Lower", text: "Lower your leg slowly without resting it completely and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Die Hüfte rollt nach hinten, und die Zehen drehen nach oben.", en: "Your hips roll back and your toes turn up." }
  },
  "standing-hip-abduction": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell dich aufrecht neben eine Wand oder einen Stuhl und halt dich mit einer Hand fest. Das Gewicht ist auf dem Bein, das näher an der Wand ist." },
        { titel: "Abspreizen", text: "Heb das äußere Bein gestreckt zur Seite und atme aus. Die Zehen zeigen nach vorn, der Oberkörper bleibt aufrecht." },
        { titel: "Zurück", text: "Senk das Bein langsam, ohne den Fuß ganz abzusetzen, und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Stand upright next to a wall or a chair and hold on with one hand. Your weight is on the leg closer to the wall." },
        { titel: "Raise", text: "Lift your outer leg straight out to the side and breathe out. Your toes point forward and your torso stays upright." },
        { titel: "Return", text: "Lower your leg slowly without setting your foot down completely and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Der Oberkörper neigt sich zur Gegenseite, damit das Bein höher kommt.", en: "Your torso leans to the opposite side so the leg gets higher." },
    tipp: { de: "Mit einem Miniband über den Knien oder um die Knöchel wird es schwerer.", en: "A mini band above your knees or around your ankles makes it harder." }
  },
  "banded-lateral-walk": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg ein Miniband über die Knie oder um die Knöchel. Stell die Füße hüftbreit, beug Knie und Hüfte leicht und halt den Oberkörper aufrecht." },
        { titel: "Seitschritt", text: "Mach mit einem Fuß einen Schritt zur Seite. Die Knie bleiben über den Füßen. Atme gleichmäßig weiter." },
        { titel: "Nachsetzen", text: "Setz den anderen Fuß langsam nach, nur bis die Füße wieder hüftbreit stehen. Geh erst alle Schritte in eine Richtung, dann zurück." }
      ],
      en: [
        { titel: "Setup", text: "Place a mini band above your knees or around your ankles. Stand with your feet hip width apart, bend your knees and hips slightly and keep your torso upright." },
        { titel: "Side step", text: "Take a step to the side with one foot. Your knees stay over your feet. Keep breathing steadily." },
        { titel: "Follow", text: "Bring the other foot after it slowly, only until your feet are hip width apart again. Take all your steps in one direction first, then go back." }
      ]
    },
    fehler: { de: "Die Füße kommen ganz zusammen, und das Band wird locker. Oder die Knie fallen nach innen.", en: "Your feet come all the way together and the band goes slack. Or your knees cave in." },
    tipp: { de: "Um die Knöchel ist es schwerer als über den Knien.", en: "Around the ankles is harder than above the knees." }
  },
  "banded-monster-walk": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg ein Miniband über die Knie oder um die Knöchel. Stell die Füße etwas breiter als hüftbreit, sodass das Band gespannt ist, und beug Knie und Hüfte leicht." },
        { titel: "Schritt", text: "Mach einen Schritt schräg nach vorn außen. Das Knie bleibt über dem Fuß. Atme gleichmäßig weiter." },
        { titel: "Weitergehen", text: "Setz den anderen Fuß genauso schräg nach vorn. Die Füße bleiben breit. Geh die Strecke danach rückwärts zurück." }
      ],
      en: [
        { titel: "Setup", text: "Place a mini band above your knees or around your ankles. Stand with your feet slightly wider than hip width so the band is taut, and bend your knees and hips slightly." },
        { titel: "Step", text: "Take a step diagonally forward and out. Your knee stays over your foot. Keep breathing steadily." },
        { titel: "Keep walking", text: "Step the other foot diagonally forward in the same way. Your feet stay wide. Then walk the distance back in reverse." }
      ]
    },
    fehler: { de: "Die Schritte werden schmal, und die Knie fallen nach innen.", en: "Your steps get narrow and your knees cave in." }
  },
  "single-leg-squat-eigen": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh auf einem Bein. Heb den anderen Fuß leicht nach vorn vom Boden und streck die Arme nach vorn." },
        { titel: "Senken", text: "Schieb die Hüfte nach hinten und beug das Standbein, so tief du die Kontrolle behältst. Atme dabei ein. Das Knie zeigt in Richtung der Zehen, die Ferse bleibt am Boden." },
        { titel: "Hoch", text: "Drück dich durch den ganzen Fuß nach oben und atme aus. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Stand on one leg. Lift the other foot slightly off the floor in front of you and stretch your arms out in front." },
        { titel: "Lower", text: "Push your hips back and bend your standing leg as deep as you can stay in control. Breathe in. Your knee points in the direction of your toes and your heel stays on the floor." },
        { titel: "Up", text: "Push up through your whole foot and breathe out. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Das Knie fällt nach innen, oder die Hüfte sinkt auf der freien Seite ab.", en: "Your knee caves in, or your hip drops on the free side." },
    tipp: { de: "Stell eine Bank hinter dich und setz dich bei jeder Wiederholung kurz ab.", en: "Place a bench behind you and sit down briefly on every rep." }
  },
  "lateral-step-up-eigen": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell dich seitlich neben eine Kiste, die höchstens kniehoch ist. Setz den Fuß, der näher an der Kiste ist, ganz darauf." },
        { titel: "Hochsteigen", text: "Drück dich mit dem oberen Bein hoch, bis es gestreckt ist, und atme aus. Der andere Fuß hängt neben der Kiste. Die Hüfte bleibt gerade." },
        { titel: "Absteigen", text: "Senk dich langsam mit demselben Bein, bis der andere Fuß den Boden leicht berührt, und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Stand sideways next to a box that is no higher than knee height. Place the whole foot that is closer to the box on it." },
        { titel: "Step up", text: "Push up with your top leg until it is straight and breathe out. Your other foot hangs beside the box. Your hips stay level." },
        { titel: "Step down", text: "Lower yourself slowly with the same leg until your other foot lightly touches the floor, and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du stößt dich mit dem unteren Fuß vom Boden ab.", en: "You push off the floor with your bottom foot." }
  },
  "skater-squat": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh auf einem Bein. Beug das andere Knie und heb den Fuß hinter dir vom Boden. Leg ein Polster hinter den Standfuß." },
        { titel: "Senken", text: "Beug das Standbein und neig den Oberkörper mit geradem Rücken nach vorn, bis das hintere Knie das Polster leicht berührt. Atme dabei ein. Streck die Arme nach vorn, das hilft beim Gleichgewicht." },
        { titel: "Hoch", text: "Drück dich durch den ganzen Fuß nach oben und atme aus. Der hintere Fuß bleibt in der Luft. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Stand on one leg. Bend the other knee and lift that foot off the floor behind you. Place a pad behind your standing foot." },
        { titel: "Lower", text: "Bend your standing leg and lean your torso forward with a straight back until your back knee lightly touches the pad. Breathe in. Reach your arms forward to help your balance." },
        { titel: "Up", text: "Push up through your whole foot and breathe out. Your back foot stays off the floor. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du setzt den hinteren Fuß auf und stößt dich damit ab.", en: "You put your back foot down and push off with it." },
    tipp: { de: "Je höher das Polster, desto leichter wird es.", en: "The higher the pad, the easier it gets." }
  }
});
