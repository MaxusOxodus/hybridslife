// Die Erklärungen der Muskelgruppe Waden. Sie kommen zu den Einträgen aus der erklaerungen.js dazu,
// deshalb muss diese Datei in der index.html nach der erklaerungen.js stehen. Aufbau wie dort:
// Schlüssel ist die Übungs-ID, pro Übung schritte (2 bis 3) und optional fehler, sicherheit, tipp, alle in de und en.
// Die Datei hat in der index.html und in der sw.js kein ?v=N: Der Service Worker holt sie bei jeder neuen VERSION frisch.
Object.assign(ERKLAERUNGEN, {
  "45-leg-press-calf-raise": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Setz dich in die Beinpresse und stell die Fußballen hüftbreit auf die Unterkante der Platte. Die Fersen ragen frei über die Kante. Drück den Schlitten hoch, die Knie sind fast gestreckt." },
        { titel: "Drücken", text: "Drück die Platte mit den Fußballen weg, so weit die Fußgelenke strecken, und atme aus. Halt kurz." },
        { titel: "Senken", text: "Lass die Fersen langsam zurücksinken, bis du eine Dehnung in den Waden spürst, und atme ein. Die Knie bleiben fast gestreckt." }
      ],
      en: [
        { titel: "Set up", text: "Sit in the leg press and place the balls of your feet hip width apart on the bottom edge of the platform. Your heels hang free over the edge. Push the sled up with your knees almost straight." },
        { titel: "Press", text: "Press the platform away with the balls of your feet, as far as your ankles extend, and breathe out. Hold briefly." },
        { titel: "Lower", text: "Let your heels sink back slowly until you feel a stretch in your calves and breathe in. Your knees stay almost straight." }
      ]
    },
    fehler: { de: "Die Knie beugen und strecken mit, und die Oberschenkel übernehmen.", en: "Your knees bend and straighten along and the thighs take over." },
    sicherheit: { de: "Stell die Sicherheitsstopper so ein, dass der Schlitten nicht auf dich fallen kann, falls die Füße abrutschen.", en: "Set the safety stops so the sled cannot fall onto you if your feet slip." }
  },
  "single-leg-45-leg-press-calf-raise": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Leg weniger als die Hälfte deines Gewichts für beide Beine auf. Stell einen Fußballen auf die Unterkante der Platte, der andere Fuß steht am Boden. Das Knie ist fast gestreckt." },
        { titel: "Drücken", text: "Drück die Platte mit dem Fußballen weg und atme aus. Halt kurz." },
        { titel: "Senken", text: "Lass die Ferse langsam zurücksinken, bis die Wade gedehnt ist, und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Load less than half the weight you use with both legs. Place the ball of one foot on the bottom edge of the platform, the other foot is on the floor. Your knee is almost straight." },
        { titel: "Press", text: "Press the platform away with the ball of your foot and breathe out. Hold briefly." },
        { titel: "Lower", text: "Let your heel sink back slowly until your calf is stretched and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Der Fuß kippt nach außen, und der Druck liegt auf den kleinen Zehen.", en: "Your foot rolls outward and the pressure is on your little toes." },
    sicherheit: { de: "Stell die Sicherheitsstopper so ein, dass der Schlitten nicht auf dich fallen kann, falls die Füße abrutschen.", en: "Set the safety stops so the sled cannot fall onto you if your feet slip." }
  },
  "45-leg-press-calf-jump": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Nimm ein leichtes Gewicht. Setz dich in die Beinpresse, stell die Fußballen auf die untere Hälfte der Platte und drück den Schlitten hoch. Die Knie sind fast gestreckt." },
        { titel: "Abstoßen", text: "Lass die Fersen kurz sinken und stoß die Platte nur aus den Fußgelenken explosiv weg. Atme dabei aus. Die Platte löst sich einen Moment von den Füßen." },
        { titel: "Abfangen", text: "Fang die Platte mit den Fußballen weich ab, lass die Fersen nachgeben und stoß direkt wieder ab." }
      ],
      en: [
        { titel: "Set up", text: "Use a light weight. Sit in the leg press, place the balls of your feet on the lower half of the platform and push the sled up. Your knees are almost straight." },
        { titel: "Push off", text: "Let your heels sink briefly and push the platform away explosively from your ankles only. Breathe out. The platform leaves your feet for a moment." },
        { titel: "Catch", text: "Catch the platform softly with the balls of your feet, let your heels give and push off again right away." }
      ]
    },
    fehler: { de: "Du stößt aus den Knien ab. Die Knie bleiben fast gestreckt.", en: "You push off from your knees. Your knees stay almost straight." },
    sicherheit: { de: "Stell die Stopper so ein, dass sie den Schlitten knapp unter dem Landepunkt auffangen. Fang mit sehr wenig Gewicht an. Die Knie rasten bei der Landung nicht durchgedrückt ein.", en: "Set the safety stops so they catch the sled just below the landing point. Start with very little weight. Your knees do not lock out on landing." }
  },
  "pin-loaded-leg-press-calf-jump": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Steck ein leichtes Gewicht. Stell die Fußballen hüftbreit auf die Platte und drück dich weg, bis die Knie fast gestreckt sind." },
        { titel: "Abstoßen", text: "Lass die Fersen kurz sinken und stoß dich nur aus den Fußgelenken explosiv ab. Atme dabei aus. Die Füße lösen sich einen Moment von der Platte." },
        { titel: "Abfangen", text: "Lande weich auf den Fußballen, lass die Fersen nachgeben und stoß direkt wieder ab." }
      ],
      en: [
        { titel: "Set up", text: "Select a light weight. Place the balls of your feet hip width apart on the platform and push yourself away until your knees are almost straight." },
        { titel: "Push off", text: "Let your heels sink briefly and push off explosively from your ankles only. Breathe out. Your feet leave the platform for a moment." },
        { titel: "Catch", text: "Land softly on the balls of your feet, let your heels give and push off again right away." }
      ]
    },
    fehler: { de: "Du landest hart auf dem ganzen Fuß, oder die Knie beugen sich bei der Landung stark.", en: "You land hard on your whole foot, or your knees bend a lot on landing." },
    sicherheit: { de: "Fang mit sehr wenig Gewicht an und steigere langsam. Hör auf, wenn die Landungen unsauber werden. Die Knie rasten bei der Landung nicht durchgedrückt ein.", en: "Start with very little weight and increase slowly. Stop when your landings get sloppy. Your knees do not lock out on landing." }
  },
  "standing-smith-machine-calf-raise": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Leg eine Scheibe oder einen Stepper unter die Stange. Leg die Stange auf den oberen Rücken und stell die Fußballen auf die Kante, die Fersen hängen frei. Dreh die Stange aus den Haken." },
        { titel: "Hochdrücken", text: "Drück dich auf die Zehenspitzen, so hoch es geht, und atme aus. Halt kurz. Die Knie bleiben fast gestreckt." },
        { titel: "Senken", text: "Senk die Fersen langsam unter die Kante, bis du eine Dehnung in den Waden spürst, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Place a plate or stepper under the bar. Rest the bar on your upper back and place the balls of your feet on the edge with your heels hanging free. Rotate the bar out of the hooks." },
        { titel: "Push up", text: "Push up onto your toes as high as you can and breathe out. Hold briefly. Your knees stay almost straight." },
        { titel: "Lower", text: "Lower your heels slowly below the edge until you feel a stretch in your calves and breathe in." }
      ]
    },
    fehler: { de: "Du federst unten ab und nutzt nur den halben Weg.", en: "You bounce at the bottom and use only half the range." },
    sicherheit: { de: "Die Erhöhung muss rutschfest liegen. Stell die Stopper ein.", en: "The platform must not slip. Set the safety stops." }
  },
  "seated-calf-raise": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Leg die Scheiben auf. Setz dich und stell die Fußballen auf die Trittkante. Stell das Polster so ein, dass es fest knapp über den Knien auf den Oberschenkeln liegt. Heb die Fersen an und lös die Sicherung." },
        { titel: "Hochdrücken", text: "Drück die Fersen so hoch wie möglich und atme aus. Halt kurz." },
        { titel: "Senken", text: "Senk die Fersen langsam, bis du eine Dehnung in den Waden spürst, und atme ein. Am Ende hängst du die Sicherung wieder ein." }
      ],
      en: [
        { titel: "Set up", text: "Load the plates. Sit down and place the balls of your feet on the foot bar. Adjust the pad so it rests firmly on your thighs just above your knees. Lift your heels and release the safety." },
        { titel: "Push up", text: "Push your heels as high as possible and breathe out. Hold briefly." },
        { titel: "Lower", text: "Lower your heels slowly until you feel a stretch in your calves and breathe in. At the end, engage the safety again." }
      ]
    },
    fehler: { de: "Du wippst schnell und kurz. Mach den ganzen Weg und halt oben und unten kurz an.", en: "You bounce fast and short. Use the full range and pause briefly at the top and bottom." }
  },
  "dumbbell-standing-calf-raise": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell dich mit den Fußballen auf eine Stufe oder eine Scheibe, die Fersen hängen frei. Halt eine Hantel in jeder Hand, oder nur eine und halt dich mit der anderen Hand fest." },
        { titel: "Hochdrücken", text: "Drück dich auf die Zehenspitzen, so hoch es geht, und atme aus. Halt kurz." },
        { titel: "Senken", text: "Senk die Fersen langsam unter die Kante, bis du eine Dehnung in den Waden spürst, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Stand with the balls of your feet on a step or a plate, heels hanging free. Hold a dumbbell in each hand, or only one and hold on with the other hand." },
        { titel: "Push up", text: "Push up onto your toes as high as you can and breathe out. Hold briefly." },
        { titel: "Lower", text: "Lower your heels slowly below the edge until you feel a stretch in your calves and breathe in." }
      ]
    },
    fehler: { de: "Du schwankst nach vorn und hinten, weil das Gleichgewicht fehlt. Halt dich dann mit einer Hand fest.", en: "You sway forward and back because you lack balance. Then hold on with one hand." }
  },
  "barbell-standing-calf-raise": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg die Stange im Rack auf den oberen Rücken und heb sie heraus. Die Füße stehen hüftbreit, die Knie sind fast gestreckt." },
        { titel: "Hochdrücken", text: "Drück dich langsam auf die Zehenspitzen und atme aus. Halt kurz. Der Körper bleibt in einer Linie." },
        { titel: "Senken", text: "Senk die Fersen langsam ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Rest the bar on your upper back in the rack and lift it out. Your feet are hip width apart and your knees are almost straight." },
        { titel: "Push up", text: "Push up slowly onto your toes and breathe out. Hold briefly. Your body stays in one line." },
        { titel: "Lower", text: "Lower your heels slowly and breathe in." }
      ]
    },
    fehler: { de: "Du kippst auf den Zehenspitzen nach vorn.", en: "You tip forward on your toes." },
    sicherheit: { de: "Bleib im Rack und stell die Sicherheitsbügel ein. Mach die Übung auf dem flachen Boden, bis du das Gleichgewicht sicher hältst.", en: "Stay in the rack and set the safety bars. Do the exercise on the flat floor until you can hold your balance securely." }
  },
  "dumbbell-seated-calf-raise": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz dich auf eine Bank und stell die Fußballen auf eine Scheibe oder einen Stepper. Stell eine Hantel senkrecht auf jeden Oberschenkel, knapp über dem Knie, und halt sie fest." },
        { titel: "Hochdrücken", text: "Drück die Fersen so hoch wie möglich und atme aus. Halt kurz." },
        { titel: "Senken", text: "Senk die Fersen langsam, bis du eine Dehnung in den Waden spürst, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Sit on a bench and place the balls of your feet on a plate or stepper. Stand a dumbbell upright on each thigh, just above the knee, and hold it in place." },
        { titel: "Push up", text: "Push your heels as high as possible and breathe out. Hold briefly." },
        { titel: "Lower", text: "Lower your heels slowly until you feel a stretch in your calves and breathe in." }
      ]
    },
    fehler: { de: "Die Hanteln stehen zu weit hinten Richtung Hüfte. Dann kommt kaum Gewicht auf die Waden.", en: "The dumbbells sit too far back toward your hips. Then hardly any weight reaches your calves." }
  },
  "barbell-seated-calf-raise": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz dich auf eine Bank und stell die Fußballen auf eine Scheibe oder einen Stepper. Leg die Stange mit einem Polster quer über die Oberschenkel, knapp über den Knien, und halt sie mit beiden Händen fest." },
        { titel: "Hochdrücken", text: "Drück die Fersen so hoch wie möglich und atme aus. Halt kurz." },
        { titel: "Senken", text: "Senk die Fersen langsam, bis du eine Dehnung in den Waden spürst, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Sit on a bench and place the balls of your feet on a plate or stepper. Lay the bar, with a pad, across your thighs just above your knees and hold it with both hands." },
        { titel: "Push up", text: "Push your heels as high as possible and breathe out. Hold briefly." },
        { titel: "Lower", text: "Lower your heels slowly until you feel a stretch in your calves and breathe in." }
      ]
    },
    fehler: { de: "Die Stange rollt in Richtung Hüfte.", en: "The bar rolls toward your hips." },
    tipp: { de: "Ein Polster oder Handtuch unter der Stange macht den Druck auf die Oberschenkel angenehmer.", en: "A pad or towel under the bar makes the pressure on your thighs more comfortable." }
  },
  "standing-calf-raise": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh hüftbreit, am besten mit den Fußballen auf einer Stufe. Halt dich leicht an einer Wand oder einem Geländer." },
        { titel: "Hochdrücken", text: "Drück dich auf die Zehenspitzen, so hoch es geht, und atme aus. Halt kurz." },
        { titel: "Senken", text: "Senk die Fersen langsam ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Stand with your feet hip width apart, ideally with the balls of your feet on a step. Hold on lightly to a wall or a railing." },
        { titel: "Push up", text: "Push up onto your toes as high as you can and breathe out. Hold briefly." },
        { titel: "Lower", text: "Lower your heels slowly and breathe in." }
      ]
    },
    fehler: { de: "Die Füße kippen nach außen. Der Druck bleibt auf dem Großzehenballen.", en: "Your feet roll outward. The pressure stays on the ball of your big toe." }
  },
  "single-leg-standing-calf-raise": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell dich mit einem Fußballen auf eine Stufe, die Ferse hängt frei. Das andere Bein ist angewinkelt. Halt dich leicht fest." },
        { titel: "Hochdrücken", text: "Drück dich auf die Zehenspitze, so hoch es geht, und atme aus. Halt kurz." },
        { titel: "Senken", text: "Senk die Ferse langsam unter die Kante und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Stand with the ball of one foot on a step, heel hanging free. The other leg is bent. Hold on lightly." },
        { titel: "Push up", text: "Push up onto your toes as high as you can and breathe out. Hold briefly." },
        { titel: "Lower", text: "Lower your heel slowly below the edge and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du ziehst dich mit der Hand hoch. Sie hält nur das Gleichgewicht.", en: "You pull yourself up with your hand. It only keeps your balance." }
  },
  "single-leg-calf-raise": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh auf einem Bein, das andere ist angewinkelt. Halt dich leicht an einer Wand fest. Das Knie des Standbeins ist fast gestreckt." },
        { titel: "Hochdrücken", text: "Drück dich auf die Zehenspitze und atme aus. Halt kurz." },
        { titel: "Senken", text: "Senk die Ferse langsam ab und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Stand on one leg with the other bent. Hold on lightly to a wall. The knee of your standing leg is almost straight." },
        { titel: "Push up", text: "Push up onto your toes and breathe out. Hold briefly." },
        { titel: "Lower", text: "Lower your heel slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Das Knie beugt sich, und du federst hoch.", en: "Your knee bends and you bounce up." },
    tipp: { de: "Auf einer Stufe wird der Weg länger und die Übung schwerer.", en: "On a step, the range gets longer and the exercise harder." }
  },
  "donkey-calf-raise": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Fußballen auf eine Stufe. Beug dich aus der Hüfte vor, bis der Oberkörper etwa waagerecht ist, und stütz die Hände auf eine Bank oder ein Geländer. Die Knie sind fast gestreckt." },
        { titel: "Hochdrücken", text: "Drück dich auf die Zehenspitzen, so hoch es geht, und atme aus. Halt kurz." },
        { titel: "Senken", text: "Senk die Fersen langsam unter die Kante, bis die Waden gedehnt sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Place the balls of your feet on a step. Hinge forward at the hips until your torso is about horizontal and rest your hands on a bench or a railing. Your knees are almost straight." },
        { titel: "Push up", text: "Push up onto your toes as high as you can and breathe out. Hold briefly." },
        { titel: "Lower", text: "Lower your heels slowly below the edge until your calves are stretched and breathe in." }
      ]
    },
    fehler: { de: "Die Knie beugen sich, und die Hüfte wippt mit.", en: "Your knees bend and your hips bob along." }
  },
  "deficit-calf-raise": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Fußballen auf eine Stufe oder Kante, die so hoch ist, dass die Fersen den Boden unten nicht berühren. Halt dich leicht fest." },
        { titel: "Senken", text: "Senk die Fersen langsam so tief wie möglich und atme ein. Halt die Dehnung ein bis zwei Sekunden." },
        { titel: "Hochdrücken", text: "Drück dich aus der Dehnung auf die Zehenspitzen und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Place the balls of your feet on a step or edge high enough that your heels do not touch the floor at the bottom. Hold on lightly." },
        { titel: "Lower", text: "Lower your heels slowly as deep as possible and breathe in. Hold the stretch for one to two seconds." },
        { titel: "Push up", text: "Push up from the stretch onto your toes and breathe out." }
      ]
    },
    fehler: { de: "Du federst aus der Dehnung hoch, statt sie kurz zu halten.", en: "You bounce out of the stretch instead of holding it briefly." },
    sicherheit: { de: "Steigere langsam. Die Achillessehne wird in der tiefen Position stark belastet.", en: "Increase slowly. The Achilles tendon is under heavy load in the deep position." }
  },
  "bent-knee-calf-raise": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh hüftbreit und beug die Knie leicht, etwa wie in einer flachen Kniebeuge. Halt dich leicht fest." },
        { titel: "Hochdrücken", text: "Drück dich auf die Zehenspitzen und atme aus. Der Winkel in den Knien bleibt gleich." },
        { titel: "Senken", text: "Senk die Fersen langsam ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Stand with your feet hip width apart and bend your knees slightly, about as in a shallow squat. Hold on lightly." },
        { titel: "Push up", text: "Push up onto your toes and breathe out. The angle in your knees stays the same." },
        { titel: "Lower", text: "Lower your heels slowly and breathe in." }
      ]
    },
    fehler: { de: "Die Knie strecken sich beim Hochdrücken. Dann ist es das normale Wadenheben.", en: "Your knees straighten as you push up. Then it is the regular calf raise." }
  },
  "jumping-calf-raise": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh hüftbreit auf dem flachen Boden, die Knie sind fast gestreckt." },
        { titel: "Abspringen", text: "Drück dich schnell auf die Zehenspitzen und spring ein paar Zentimeter ab. Atme dabei aus." },
        { titel: "Landen", text: "Lande weich auf den Fußballen, lass die Fersen kurz zum Boden sinken und drück dich wieder ab." }
      ],
      en: [
        { titel: "Setup", text: "Stand with your feet hip width apart on the flat floor, knees almost straight." },
        { titel: "Jump", text: "Push up quickly onto your toes and jump a few centimeters off the floor. Breathe out." },
        { titel: "Land", text: "Land softly on the balls of your feet, let your heels sink briefly to the floor and push off again." }
      ]
    },
    fehler: { de: "Du holst Schwung aus den Knien wie bei einer Sprungkniebeuge.", en: "You use momentum from your knees as in a jump squat." },
    sicherheit: { de: "Spring auf festem, ebenem Boden. Hör auf, wenn es in der Achillessehne zieht.", en: "Jump on a firm, level floor. Stop if you feel a pull in your Achilles tendon." }
  },
  "pogo-jumps": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh hüftbreit, die Knie sind fast gestreckt. Die Arme sind angewinkelt." },
        { titel: "Springen", text: "Spring aus den Fußgelenken ab und lande auf den Fußballen. Atme ruhig weiter." },
        { titel: "Federn", text: "Spring sofort wieder ab, als wäre der Boden heiß. Die Fersen bleiben oben, die Knie fast gestreckt." }
      ],
      en: [
        { titel: "Setup", text: "Stand with your feet hip width apart, knees almost straight. Your arms are bent." },
        { titel: "Jump", text: "Jump off from your ankles and land on the balls of your feet. Keep breathing steadily." },
        { titel: "Bounce", text: "Jump off again immediately, as if the floor were hot. Your heels stay up and your knees almost straight." }
      ]
    },
    fehler: { de: "Die Fersen setzen auf, oder die Knie beugen sich bei jeder Landung tief.", en: "Your heels touch down, or your knees bend deeply on every landing." },
    sicherheit: { de: "Fang mit wenigen Sprüngen an und steigere langsam. Spring auf festem, ebenem Boden.", en: "Start with a few jumps and increase slowly. Jump on a firm, level floor." }
  }
});
