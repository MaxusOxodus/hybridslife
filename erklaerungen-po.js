// Die Erklärungen der Muskelgruppe Po. Sie kommen zu den Einträgen aus der erklaerungen.js dazu,
// deshalb muss diese Datei in der index.html nach der erklaerungen.js stehen. Aufbau wie dort:
// Schlüssel ist die Übungs-ID, pro Übung schritte (2 bis 3) und optional fehler, sicherheit, tipp, alle in de und en.
// Die Datei hat in der index.html und in der sw.js kein ?v=N: Der Service Worker holt sie bei jeder neuen VERSION frisch.
Object.assign(ERKLAERUNGEN, {
  "plate-loaded-machine-hip-thrust": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Leg die Scheiben auf. Setz dich, lehn den oberen Rücken ans Polster und zieh den Gurt fest über die Hüftbeuge. Stell die Füße hüftbreit auf die Platte, sodass die Schienbeine oben etwa senkrecht stehen. Lös die Sicherung." },
        { titel: "Hochdrücken", text: "Drück durch die Fersen und heb die Hüfte, bis Oberkörper und Oberschenkel eine Linie bilden. Atme dabei aus und spann das Gesäß fest an." },
        { titel: "Absenken", text: "Senk die Hüfte kontrolliert und atme ein. Am Ende hängst du die Sicherung wieder ein." }
      ],
      en: [
        { titel: "Set up", text: "Load the plates. Sit down, lean your upper back against the pad and pull the belt tight across the crease of your hips. Place your feet hip width apart on the platform so your shins are about vertical at the top. Release the safety." },
        { titel: "Push up", text: "Push through your heels and lift your hips until your torso and thighs form one line. Breathe out and squeeze your glutes hard." },
        { titel: "Lower", text: "Lower your hips under control and breathe in. At the end, engage the safety again." }
      ]
    },
    fehler: { de: "Du drückst oben ins Hohlkreuz, statt die Hüfte zu strecken. Zieh das Kinn leicht zur Brust.", en: "You arch your lower back at the top instead of extending your hips. Tuck your chin slightly toward your chest." }
  },
  "single-leg-plate-loaded-machine-hip-thrust": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Leg deutlich weniger als die Hälfte deines Gewichts für beide Beine auf. Schnall dich an und stell einen Fuß mittig auf die Platte. Das andere Bein ist angehoben." },
        { titel: "Hochdrücken", text: "Drück durch die Ferse und heb die Hüfte, bis sie gestreckt ist. Atme dabei aus. Beide Hüftseiten bleiben auf gleicher Höhe." },
        { titel: "Absenken", text: "Senk die Hüfte langsam und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Load clearly less than half the weight you use with both legs. Buckle up and place one foot in the middle of the platform. The other leg is lifted." },
        { titel: "Push up", text: "Push through your heel and lift your hips until they are extended. Breathe out. Both sides of your hips stay level." },
        { titel: "Lower", text: "Lower your hips slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Die Hüfte kippt zur freien Seite ab.", en: "Your hips tilt down toward the free side." }
  },
  "smith-machine-hip-thrust": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell eine Bank quer vor die Multipresse und häng die Stange tief ein. Setz dich davor, der obere Rücken lehnt an der Bankkante, die Stange liegt mit einem Polster über der Hüftbeuge. Die Füße stehen hüftbreit." },
        { titel: "Hochdrücken", text: "Dreh die Stange aus den Haken. Drück durch die Fersen und heb die Hüfte, bis Oberkörper und Oberschenkel eine Linie bilden. Atme dabei aus und spann das Gesäß an." },
        { titel: "Absenken", text: "Senk die Hüfte kontrolliert und atme ein. Am Ende drehst du die Stange zurück in die Haken." }
      ],
      en: [
        { titel: "Set up", text: "Place a bench crosswise in front of the Smith machine and set the bar low. Sit in front of it with your upper back against the edge of the bench and the bar, with a pad, across the crease of your hips. Your feet are hip width apart." },
        { titel: "Push up", text: "Rotate the bar out of the hooks. Push through your heels and lift your hips until your torso and thighs form one line. Breathe out and squeeze your glutes." },
        { titel: "Lower", text: "Lower your hips under control and breathe in. At the end, rotate the bar back into the hooks." }
      ]
    },
    fehler: { de: "Die Bank steht falsch, und die Stange drückt auf den Bauch oder die Oberschenkel. Prüf die Position mit der leeren Stange.", en: "The bench is in the wrong place and the bar presses on your belly or your thighs. Check the position with the empty bar." },
    sicherheit: { de: "Die Bank darf nicht wegrutschen. Stell sie gegen eine Wand oder sichere sie mit Scheiben.", en: "The bench must not slide away. Put it against a wall or secure it with plates." }
  },
  "single-leg-smith-machine-hip-thrust": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Bau die Übung wie mit beiden Beinen auf und nimm deutlich weniger Gewicht. Dreh die Stange aus den Haken und heb ein Bein an. Der Standfuß steht mittig vor dem Körper." },
        { titel: "Hochdrücken", text: "Drück durch die Ferse und heb die Hüfte, bis sie gestreckt ist. Atme dabei aus. Die Stange bleibt waagerecht." },
        { titel: "Absenken", text: "Senk die Hüfte langsam und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Set up as for both legs and use clearly less weight. Rotate the bar out of the hooks and lift one leg. Your standing foot is centered in front of your body." },
        { titel: "Push up", text: "Push through your heel and lift your hips until they are extended. Breathe out. The bar stays level." },
        { titel: "Lower", text: "Lower your hips slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Die Hüfte dreht sich zur freien Seite, und die Stange liegt schief.", en: "Your hips rotate toward the free side and the bar sits crooked." },
    sicherheit: { de: "Sichere die Bank gegen Wegrutschen.", en: "Secure the bench so it cannot slide away." }
  },
  "kickbacks-kabel": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle ganz nach unten und leg die Fußschlaufe um einen Knöchel. Stell dich mit dem Gesicht zum Gerät, halt dich fest und beug den Oberkörper leicht vor. Das Standbein ist leicht gebeugt." },
        { titel: "Strecken", text: "Führ das Bein mit fast gestrecktem Knie nach hinten, bis das Gesäß fest anspannt. Atme dabei aus." },
        { titel: "Zurück", text: "Lass das Bein langsam nach vorn und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley all the way down and put the ankle strap around one ankle. Face the machine, hold on and lean your torso forward slightly. Your standing leg is slightly bent." },
        { titel: "Extend", text: "Move your leg back with the knee almost straight until your glutes tighten hard. Breathe out." },
        { titel: "Return", text: "Let your leg move forward slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du schwingst das Bein hoch und gehst ins Hohlkreuz. Der Weg ist kurz.", en: "You swing your leg up and arch your lower back. The range is short." }
  },
  "standing-pin-loaded-machine-glute-kickback": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Steck den Stift. Stell dich in die Maschine, stütz Unterarme oder Brust auf die Polster und halt die Griffe. Setz einen Fuß an die Trittplatte oder die Rolle." },
        { titel: "Strecken", text: "Drück das Bein nach hinten, bis die Hüfte gestreckt ist, und atme aus. Das Gesäß spannt fest an." },
        { titel: "Zurück", text: "Lass das Bein langsam nach vorn und atme ein. Die Gewichtsplatten setzen nicht auf. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Set the pin. Step into the machine, rest your forearms or chest on the pads and hold the handles. Place one foot against the footplate or the roller." },
        { titel: "Extend", text: "Push your leg back until your hip is extended and breathe out. Your glutes tighten hard." },
        { titel: "Return", text: "Let your leg move forward slowly and breathe in. The weight plates do not touch down. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Der untere Rücken biegt sich durch, damit das Bein höher kommt.", en: "Your lower back arches so your leg gets higher." }
  },
  "cable-pull-through": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle ganz nach unten und häng das Seil ein. Stell dich mit dem Rücken zur Rolle über das Kabel, greif das Seil zwischen den Beinen und geh zwei Schritte nach vorn. Die Füße stehen etwas breiter als hüftbreit." },
        { titel: "Vorbeugen", text: "Schieb die Hüfte nach hinten und lass die Hände zwischen den Beinen nach hinten ziehen. Atme dabei ein. Der Rücken bleibt gerade, die Knie sind leicht gebeugt." },
        { titel: "Aufrichten", text: "Schieb die Hüfte nach vorn, bis du aufrecht stehst, und atme aus. Spann das Gesäß an. Die Arme bleiben lang." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley all the way down and attach the rope. Stand over the cable with your back to the pulley, grip the rope between your legs and take two steps forward. Your feet are a little wider than hip width." },
        { titel: "Hinge forward", text: "Push your hips back and let your hands be pulled back between your legs. Breathe in. Your back stays straight and your knees are slightly bent." },
        { titel: "Straighten up", text: "Push your hips forward until you stand upright and breathe out. Squeeze your glutes. Your arms stay long." }
      ]
    },
    fehler: { de: "Du ziehst das Seil mit den Armen nach vorn, statt die Hüfte zu strecken.", en: "You pull the rope forward with your arms instead of extending your hips." }
  },
  "45-glute-biased-leg-press": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Setz dich so, dass Rücken und Gesäß fest am Polster liegen. Stell die Füße in die obere Hälfte der Platte, etwas breiter als schulterbreit. Drück den Schlitten hoch und lös die Sicherung." },
        { titel: "Senken", text: "Senk den Schlitten langsam und atme ein. Die Knie gehen in Richtung Achseln und zeigen wie die Zehen leicht nach außen." },
        { titel: "Drücken", text: "Drück den Schlitten über die Fersen nach oben und atme aus. Streck die Knie oben nicht ganz durch." }
      ],
      en: [
        { titel: "Set up", text: "Sit so your back and glutes rest firmly against the pad. Place your feet in the upper half of the platform, a little wider than shoulder width. Push the sled up and release the safety." },
        { titel: "Lower", text: "Lower the sled slowly and breathe in. Your knees travel toward your armpits and, like your toes, point slightly out." },
        { titel: "Press", text: "Press the sled up through your heels and breathe out. Do not lock your knees at the top." }
      ]
    },
    fehler: { de: "Das Gesäß rollt unten vom Polster ab, und der untere Rücken rundet sich.", en: "Your glutes roll off the pad at the bottom and your lower back rounds." },
    sicherheit: { de: "Geh nur so tief, dass Gesäß und unterer Rücken am Polster bleiben. Häng am Ende die Sicherung ein.", en: "Go only as deep as your glutes and lower back stay on the pad. At the end, engage the safety." }
  },
  "sumo-kniebeuge": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell die Füße deutlich breiter als schulterbreit, die Zehen zeigen etwa 45° nach außen. Halt eine Kurzhantel oder Kettlebell mit beiden Händen vor dem Körper, die Arme hängen lang." },
        { titel: "Senken", text: "Beug die Knie und senk dich gerade nach unten, bis die Oberschenkel etwa waagerecht sind. Atme dabei ein. Die Knie zeigen in Richtung der Zehen, der Oberkörper bleibt aufrecht." },
        { titel: "Hoch", text: "Drück dich über die Fersen nach oben und atme aus. Spann oben das Gesäß an." }
      ],
      en: [
        { titel: "Setup", text: "Place your feet clearly wider than shoulder width, toes pointing about 45° out. Hold a dumbbell or kettlebell with both hands in front of your body, arms hanging long." },
        { titel: "Lower", text: "Bend your knees and lower yourself straight down until your thighs are about horizontal. Breathe in. Your knees point in the direction of your toes and your torso stays upright." },
        { titel: "Up", text: "Push up through your heels and breathe out. Squeeze your glutes at the top." }
      ]
    },
    fehler: { de: "Die Knie fallen nach innen.", en: "Your knees cave in." }
  },
  "dumbbell-hip-thrust": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz dich vor eine Bank, der obere Rücken lehnt an der Kante. Leg eine Kurzhantel quer über die Hüftbeuge und halt sie mit beiden Händen fest. Die Füße stehen hüftbreit, die Knie sind gebeugt." },
        { titel: "Hochdrücken", text: "Drück durch die Fersen und heb die Hüfte, bis Oberkörper und Oberschenkel eine Linie bilden. Atme dabei aus und spann das Gesäß an." },
        { titel: "Absenken", text: "Senk die Hüfte kontrolliert und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Sit in front of a bench with your upper back against the edge. Lay a dumbbell across the crease of your hips and hold it with both hands. Your feet are hip width apart and your knees are bent." },
        { titel: "Push up", text: "Push through your heels and lift your hips until your torso and thighs form one line. Breathe out and squeeze your glutes." },
        { titel: "Lower", text: "Lower your hips under control and breathe in." }
      ]
    },
    fehler: { de: "Die Füße stehen zu weit vorn. Dann arbeiten die Oberschenkelrückseiten statt des Gesäßes.", en: "Your feet are too far forward. Then the hamstrings work instead of the glutes." },
    tipp: { de: "Ein Handtuch unter der Hantel macht den Druck auf die Hüfte angenehmer.", en: "A towel under the dumbbell makes the pressure on your hips more comfortable." }
  },
  "barbell-glute-bridge": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf den Rücken und roll die Stange mit einem Polster über die Hüftbeuge. Stell die Füße hüftbreit auf, die Fersen nah am Gesäß. Halt die Stange mit beiden Händen." },
        { titel: "Hochdrücken", text: "Drück durch die Fersen und heb die Hüfte, bis Knie, Hüfte und Schultern eine Linie bilden. Atme dabei aus und spann das Gesäß an." },
        { titel: "Absenken", text: "Senk die Hüfte kontrolliert, bis die Scheiben fast den Boden berühren, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Lie on your back and roll the bar, with a pad, over the crease of your hips. Place your feet hip width apart with your heels close to your glutes. Hold the bar with both hands." },
        { titel: "Push up", text: "Push through your heels and lift your hips until your knees, hips and shoulders form one line. Breathe out and squeeze your glutes." },
        { titel: "Lower", text: "Lower your hips under control until the plates almost touch the floor and breathe in." }
      ]
    },
    fehler: { de: "Du drückst dich ins Hohlkreuz hoch.", en: "You push up into an arched lower back." }
  },
  "dumbbell-glute-bridge": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf den Rücken und stell die Füße hüftbreit auf. Leg eine Kurzhantel quer über die Hüftbeuge und halt sie mit beiden Händen fest." },
        { titel: "Hochdrücken", text: "Drück durch die Fersen und heb die Hüfte, bis Knie, Hüfte und Schultern eine Linie bilden. Atme dabei aus und halt kurz." },
        { titel: "Absenken", text: "Senk die Hüfte langsam, bis das Gesäß den Boden fast berührt, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Lie on your back and place your feet hip width apart. Lay a dumbbell across the crease of your hips and hold it with both hands." },
        { titel: "Push up", text: "Push through your heels and lift your hips until your knees, hips and shoulders form one line. Breathe out and hold briefly." },
        { titel: "Lower", text: "Lower your hips slowly until your glutes almost touch the floor and breathe in." }
      ]
    },
    fehler: { de: "Du stößt dich mit Schwung vom Boden ab.", en: "You bounce off the floor with momentum." }
  },
  "high-step-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell dich mit einer Hantel in jeder Hand vor eine Kiste oder Bank, die mindestens kniehoch ist. Setz einen Fuß ganz darauf und lehn den Oberkörper leicht vor." },
        { titel: "Hochsteigen", text: "Drück dich mit dem oberen Bein hoch, bis Knie und Hüfte gestreckt sind. Atme dabei aus." },
        { titel: "Absteigen", text: "Senk dich langsam mit demselben Bein, bis der andere Fuß den Boden berührt, und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Stand with a dumbbell in each hand in front of a box or bench that is at least knee height. Place one whole foot on it and lean your torso forward slightly." },
        { titel: "Step up", text: "Push up with the top leg until your knee and hip are straight. Breathe out." },
        { titel: "Step down", text: "Lower yourself slowly with the same leg until the other foot touches the floor and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du stößt dich mit dem unteren Fuß kräftig vom Boden ab.", en: "You push off the floor hard with your bottom foot." },
    sicherheit: { de: "Die Kiste muss fest stehen. Fang ohne Gewicht an, bis die Höhe sicher klappt.", en: "The box must stand firmly. Start without weight until you are secure at that height." }
  },
  "deficit-reverse-lunge": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell dich mit einer Hantel in jeder Hand auf eine Scheibe oder einen Stepper von etwa 5 bis 15 cm Höhe." },
        { titel: "Schritt und senken", text: "Mach mit einem Bein einen großen Schritt nach hinten auf den Boden. Senk dich, bis das hintere Knie fast den Boden berührt, und atme ein. Der Oberkörper ist leicht vorgeneigt." },
        { titel: "Zurück", text: "Drück dich mit dem vorderen Fuß hoch, stell das hintere Bein wieder auf die Erhöhung und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Stand with a dumbbell in each hand on a plate or stepper about 5 to 15 cm high." },
        { titel: "Step and lower", text: "Take a long step back onto the floor with one leg. Lower yourself until your back knee almost touches the floor and breathe in. Your torso leans forward slightly." },
        { titel: "Return", text: "Push up with your front foot, bring your back leg back onto the platform and breathe out." }
      ]
    },
    fehler: { de: "Du stößt dich mit dem hinteren Fuß ab.", en: "You push off with your back foot." },
    sicherheit: { de: "Die Erhöhung muss flach und rutschfest liegen.", en: "The platform must lie flat and must not slip." }
  },
  "glute-bridge": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf den Rücken und stell die Füße hüftbreit auf, die Fersen nah am Gesäß. Die Arme liegen neben dem Körper." },
        { titel: "Hochdrücken", text: "Drück durch die Fersen und heb die Hüfte, bis Knie, Hüfte und Schultern eine Linie bilden. Atme dabei aus und spann das Gesäß an." },
        { titel: "Absenken", text: "Senk die Hüfte langsam, bis das Gesäß den Boden fast berührt, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Lie on your back and place your feet hip width apart with your heels close to your glutes. Your arms lie beside your body." },
        { titel: "Push up", text: "Push through your heels and lift your hips until your knees, hips and shoulders form one line. Breathe out and squeeze your glutes." },
        { titel: "Lower", text: "Lower your hips slowly until your glutes almost touch the floor and breathe in." }
      ]
    },
    fehler: { de: "Du hebst die Hüfte zu hoch und landest im Hohlkreuz.", en: "You lift your hips too high and end up with an arched lower back." }
  },
  "single-leg-glute-bridge": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf den Rücken und stell einen Fuß auf. Heb das andere Bein an, das Knie ist gebeugt oder gestreckt." },
        { titel: "Hochdrücken", text: "Drück durch die Ferse und heb die Hüfte, bis Knie, Hüfte und Schulter eine Linie bilden. Atme dabei aus." },
        { titel: "Absenken", text: "Senk die Hüfte langsam und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Lie on your back and place one foot on the floor. Lift the other leg, with the knee bent or straight." },
        { titel: "Push up", text: "Push through your heel and lift your hips until your knee, hip and shoulder form one line. Breathe out." },
        { titel: "Lower", text: "Lower your hips slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Die Hüfte sinkt auf der Seite des freien Beins ab.", en: "Your hips sink on the side of the free leg." }
  },
  "hip-thrust-eigen": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz dich vor eine Bank, der obere Rücken lehnt unter den Schulterblättern an der Kante. Die Füße stehen hüftbreit, die Knie sind gebeugt. Verschränk die Arme vor der Brust." },
        { titel: "Hochdrücken", text: "Drück durch die Fersen und heb die Hüfte, bis Oberkörper und Oberschenkel eine Linie bilden. Atme dabei aus und spann das Gesäß fest an." },
        { titel: "Absenken", text: "Senk die Hüfte kontrolliert und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Sit in front of a bench with your upper back against the edge, just below your shoulder blades. Your feet are hip width apart and your knees are bent. Cross your arms in front of your chest." },
        { titel: "Push up", text: "Push through your heels and lift your hips until your torso and thighs form one line. Breathe out and squeeze your glutes hard." },
        { titel: "Lower", text: "Lower your hips under control and breathe in." }
      ]
    },
    fehler: { de: "Der Kopf fällt in den Nacken, und der Rücken geht ins Hohlkreuz. Zieh das Kinn leicht zur Brust.", en: "Your head drops back and your lower back arches. Tuck your chin slightly toward your chest." },
    sicherheit: { de: "Die Bank darf nicht wegrutschen.", en: "The bench must not slide away." }
  },
  "single-leg-hip-thrust": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Lehn den oberen Rücken an die Bankkante und stell einen Fuß mittig vor den Körper. Heb das andere Bein an." },
        { titel: "Hochdrücken", text: "Drück durch die Ferse und heb die Hüfte, bis sie gestreckt ist. Atme dabei aus. Beide Hüftseiten bleiben auf gleicher Höhe." },
        { titel: "Absenken", text: "Senk die Hüfte langsam und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Lean your upper back against the edge of the bench and place one foot centered in front of your body. Lift the other leg." },
        { titel: "Push up", text: "Push through your heel and lift your hips until they are extended. Breathe out. Both sides of your hips stay level." },
        { titel: "Lower", text: "Lower your hips slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Die Hüfte dreht sich zur freien Seite auf oder ab.", en: "Your hips rotate up or down toward the free side." },
    sicherheit: { de: "Die Bank darf nicht wegrutschen.", en: "The bench must not slide away." }
  },
  "step-ups": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell dich vor eine Kiste, die etwa kniehoch ist, und setz einen Fuß ganz darauf." },
        { titel: "Hochsteigen", text: "Drück dich mit dem oberen Bein hoch, bis es gestreckt ist, und atme aus. Der Oberkörper bleibt aufrecht." },
        { titel: "Absteigen", text: "Senk dich langsam mit demselben Bein, bis der andere Fuß den Boden berührt, und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Stand in front of a box about knee height and place one whole foot on it." },
        { titel: "Step up", text: "Push up with the top leg until it is straight and breathe out. Your torso stays upright." },
        { titel: "Step down", text: "Lower yourself slowly with the same leg until the other foot touches the floor and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du stößt dich mit dem unteren Fuß ab, oder das obere Knie fällt nach innen.", en: "You push off with your bottom foot, or your top knee caves in." },
    sicherheit: { de: "Die Kiste muss fest stehen und darf nicht rutschen.", en: "The box must stand firmly and must not slip." }
  },
  "curtsy-lunge-eigen": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh aufrecht, die Füße hüftbreit, die Hände an der Hüfte." },
        { titel: "Schritt und senken", text: "Mach mit einem Bein einen Schritt schräg nach hinten, hinter das andere Bein. Senk dich, bis das hintere Knie fast den Boden berührt, und atme ein. Hüfte und Brust zeigen weiter nach vorn." },
        { titel: "Zurück", text: "Drück dich mit dem vorderen Fuß hoch, stell das Bein zurück und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Stand upright, feet hip width apart, hands on your hips." },
        { titel: "Step and lower", text: "Take a step diagonally back with one leg, behind the other leg. Lower yourself until your back knee almost touches the floor and breathe in. Your hips and chest keep facing forward." },
        { titel: "Return", text: "Push up with your front foot, bring your leg back and breathe out." }
      ]
    },
    fehler: { de: "Die Hüfte dreht sich mit zur Seite, oder das vordere Knie fällt nach innen.", en: "Your hips rotate to the side with the step, or your front knee caves in." },
    sicherheit: { de: "Wenn es im vorderen Knie zieht, mach den Schritt weniger weit zur Seite.", en: "If you feel a pull in your front knee, step less far to the side." }
  }
});
