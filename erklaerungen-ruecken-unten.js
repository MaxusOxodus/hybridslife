// Die Erklärungen der Muskelgruppe Unterer Rücken. Sie kommen zu den Einträgen aus der erklaerungen.js dazu,
// deshalb muss diese Datei in der index.html nach der erklaerungen.js stehen. Aufbau wie dort:
// Schlüssel ist die Übungs-ID, pro Übung schritte (2 bis 3) und optional fehler, sicherheit, tipp, alle in de und en.
// Die Datei hat in der index.html und in der sw.js kein ?v=N: Der Service Worker holt sie bei jeder neuen VERSION frisch.
Object.assign(ERKLAERUNGEN, {
  "machine-back-extension": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Wähl ein leichtes Gewicht. Setz dich so, dass die Hüfte auf Höhe der Drehachse ist und das Polster am oberen Rücken liegt. Stell die Füße fest auf die Fußplatte und schnall dich an, falls es einen Gurt gibt." },
        { titel: "Strecken", text: "Drück den Oberkörper mit geradem Rücken nach hinten, bis er mit den Oberschenkeln etwa eine Linie bildet. Atme dabei aus." },
        { titel: "Zurück", text: "Komm langsam wieder nach vorn und atme ein. Die Gewichtsplatten setzen nicht auf." }
      ],
      en: [
        { titel: "Set up", text: "Select a light weight. Sit so your hips are level with the pivot point and the pad rests against your upper back. Plant your feet firmly on the footplate and buckle up if there is a belt." },
        { titel: "Extend", text: "Push your torso back with a straight back until it is roughly in line with your thighs. Breathe out." },
        { titel: "Return", text: "Come forward again slowly and breathe in. The weight plates do not touch down." }
      ]
    },
    fehler: { de: "Du wirfst dich mit Schwung nach hinten und überstreckst den Rücken.", en: "You throw yourself back with momentum and overextend your back." },
    sicherheit: { de: "Bleib am Ende gerade und lehn dich nicht ins Hohlkreuz. Steigere das Gewicht langsam.", en: "Stay straight at the end and do not lean into an arched lower back. Increase the weight slowly." }
  },
  "smith-machine-good-morning": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Stopper knapp unter deinen tiefsten Punkt. Leg die Stange auf den oberen Rücken, die Füße stehen hüftbreit unter der Stange. Dreh die Stange aus den Haken." },
        { titel: "Vorbeugen", text: "Beug die Knie leicht und schieb die Hüfte nach hinten. Der Oberkörper neigt sich mit geradem Rücken vor, bis du eine Dehnung hinten in den Oberschenkeln spürst. Atme dabei ein." },
        { titel: "Aufrichten", text: "Schieb die Hüfte nach vorn und richte dich auf. Atme dabei aus. Am Ende drehst du die Stange zurück in die Haken." }
      ],
      en: [
        { titel: "Set up", text: "Set the safety stops just below your lowest point. Rest the bar on your upper back with your feet hip width apart under the bar. Rotate the bar out of the hooks." },
        { titel: "Hinge forward", text: "Bend your knees slightly and push your hips back. Your torso leans forward with a straight back until you feel a stretch in the back of your thighs. Breathe in." },
        { titel: "Straighten up", text: "Push your hips forward and straighten up. Breathe out. At the end, rotate the bar back into the hooks." }
      ]
    },
    fehler: { de: "Der Rücken wird rund, oder die Knie beugen sich immer weiter, bis es eine Kniebeuge ist.", en: "Your back rounds, or your knees bend more and more until it is a squat." },
    sicherheit: { de: "Fang mit der leeren Stange an. Der Rücken bleibt die ganze Zeit gerade.", en: "Start with the empty bar. Your back stays straight the whole time." }
  },
  "wide-stance-smith-machine-good-morning": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Stopper ein und leg die Stange auf den oberen Rücken. Stell die Füße deutlich breiter als schulterbreit, die Zehen zeigen leicht nach außen. Dreh die Stange aus den Haken." },
        { titel: "Vorbeugen", text: "Schieb die Hüfte nach hinten und neig den Oberkörper mit geradem Rücken vor. Atme dabei ein. Die Knie sind leicht gebeugt und zeigen in Richtung der Zehen." },
        { titel: "Aufrichten", text: "Schieb die Hüfte nach vorn, richte dich auf und atme aus." }
      ],
      en: [
        { titel: "Set up", text: "Set the safety stops and rest the bar on your upper back. Place your feet clearly wider than shoulder width, toes pointing slightly out. Rotate the bar out of the hooks." },
        { titel: "Hinge forward", text: "Push your hips back and lean your torso forward with a straight back. Breathe in. Your knees are slightly bent and point in the direction of your toes." },
        { titel: "Straighten up", text: "Push your hips forward, straighten up and breathe out." }
      ]
    },
    fehler: { de: "Die Knie fallen nach innen.", en: "Your knees cave in." },
    sicherheit: { de: "Fang mit der leeren Stange an. Der Rücken bleibt die ganze Zeit gerade.", en: "Start with the empty bar. Your back stays straight the whole time." }
  },
  "smith-machine-deficit-romanian-deadlift": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell einen Stepper oder eine flache Kiste unter die Stange und stell dich darauf, die Füße hüftbreit. Greif die Stange im Obergriff etwa schulterbreit, dreh sie aus den Haken und steh auf." },
        { titel: "Absenken", text: "Schieb die Hüfte nach hinten, die Knie sind leicht gebeugt. Senk die Stange dicht an den Beinen, bis du eine starke Dehnung hinten in den Oberschenkeln spürst. Atme dabei ein." },
        { titel: "Aufrichten", text: "Schieb die Hüfte nach vorn und richte dich auf. Atme dabei aus." }
      ],
      en: [
        { titel: "Set up", text: "Place a stepper or a low box under the bar and stand on it, feet hip width apart. Grip the bar overhand at about shoulder width, rotate it out of the hooks and stand up." },
        { titel: "Lower", text: "Push your hips back with your knees slightly bent. Lower the bar close to your legs until you feel a strong stretch in the back of your thighs. Breathe in." },
        { titel: "Straighten up", text: "Push your hips forward and straighten up. Breathe out." }
      ]
    },
    fehler: { de: "Du nutzt die Erhöhung, um mit rundem Rücken noch tiefer zu kommen.", en: "You use the platform to get even deeper with a rounded back." },
    sicherheit: { de: "Der Rücken bleibt gerade, hör auf, bevor er sich rundet. Die Erhöhung muss fest und rutschfest stehen.", en: "Your back stays straight, stop before it rounds. The platform must stand firmly and must not slip." }
  },
  "cable-romanian-deadlift": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Rolle ganz nach unten und häng eine gerade Stange oder das Seil ein. Greif im Obergriff, steh auf und geh einen bis zwei Schritte zurück. Die Füße stehen hüftbreit, die Knie sind leicht gebeugt." },
        { titel: "Vorbeugen", text: "Schieb die Hüfte nach hinten und neig den Oberkörper mit geradem Rücken vor. Die Arme bleiben lang und folgen dem Kabel. Atme dabei ein." },
        { titel: "Aufrichten", text: "Schieb die Hüfte nach vorn und richte dich auf. Atme dabei aus und spann oben das Gesäß an." }
      ],
      en: [
        { titel: "Set up", text: "Set the pulley all the way down and attach a straight bar or the rope. Grip overhand, stand up and take one or two steps back. Your feet are hip width apart and your knees are slightly bent." },
        { titel: "Hinge forward", text: "Push your hips back and lean your torso forward with a straight back. Your arms stay long and follow the cable. Breathe in." },
        { titel: "Straighten up", text: "Push your hips forward and straighten up. Breathe out and tighten your glutes at the top." }
      ]
    },
    fehler: { de: "Du ziehst das Kabel mit den Armen heran, statt die Hüfte zu strecken.", en: "You pull the cable in with your arms instead of extending your hips." },
    tipp: { de: "Steh so weit weg, dass das Gewicht auch am tiefsten Punkt nicht aufsetzt.", en: "Stand far enough away that the weight does not touch down even at the lowest point." }
  },
  "shrug-machine-deadlift": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg die Scheiben auf und stell dich mittig zwischen die Griffe, die Füße hüftbreit. Geh mit geradem Rücken in die Knie und greif die Griffe. Die Brust ist oben, die Arme sind gestreckt." },
        { titel: "Anheben", text: "Atme ein und spann den Rumpf an. Drück die Füße in den Boden und steh auf, bis Knie und Hüfte gestreckt sind. Atme oben aus." },
        { titel: "Absenken", text: "Schieb die Hüfte nach hinten, beug die Knie und senk das Gewicht kontrolliert ab." }
      ],
      en: [
        { titel: "Setup", text: "Load the plates and stand centered between the handles, feet hip width apart. Bend your knees with a straight back and grip the handles. Your chest is up and your arms are straight." },
        { titel: "Lift", text: "Breathe in and brace your core. Push your feet into the floor and stand up until your knees and hips are straight. Breathe out at the top." },
        { titel: "Lower", text: "Push your hips back, bend your knees and lower the weight under control." }
      ]
    },
    fehler: { de: "Der Rücken wird rund, oder du ziehst oben die Schultern hoch.", en: "Your back rounds, or you shrug your shoulders up at the top." },
    sicherheit: { de: "Der Rücken bleibt gerade. Stell die Griffe, wenn möglich, so hoch ein, dass du sie mit geradem Rücken erreichst.", en: "Your back stays straight. If possible, set the handles high enough that you can reach them with a straight back." }
  },
  "dumbbell-romanian-deadlift": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh hüftbreit mit einer Hantel in jeder Hand vor den Oberschenkeln. Die Knie sind leicht gebeugt und bleiben es." },
        { titel: "Absenken", text: "Schieb die Hüfte nach hinten und lass die Hanteln dicht an den Beinen nach unten gleiten. Atme dabei ein. Geh so weit, bis du eine Dehnung hinten in den Oberschenkeln spürst." },
        { titel: "Aufrichten", text: "Schieb die Hüfte nach vorn und richte dich auf. Atme dabei aus und spann oben das Gesäß an." }
      ],
      en: [
        { titel: "Setup", text: "Stand with your feet hip width apart and a dumbbell in each hand in front of your thighs. Your knees are slightly bent and stay that way." },
        { titel: "Lower", text: "Push your hips back and let the dumbbells glide down close to your legs. Breathe in. Go until you feel a stretch in the back of your thighs." },
        { titel: "Straighten up", text: "Push your hips forward and straighten up. Breathe out and tighten your glutes at the top." }
      ]
    },
    fehler: { de: "Die Hanteln wandern nach vorn weg, und der Rücken wird rund.", en: "The dumbbells drift forward and your back rounds." },
    sicherheit: { de: "Der Rücken bleibt gerade. Hör auf, bevor er sich rundet.", en: "Your back stays straight. Stop before it rounds." }
  },
  "sumo-deadlift": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell dich breit an die Stange, die Zehen zeigen deutlich nach außen, die Schienbeine sind nah an der Stange. Greif sie etwa schulterbreit zwischen den Knien. Senk die Hüfte, heb die Brust und drück die Knie nach außen." },
        { titel: "Anheben", text: "Atme tief ein und spann den Rumpf an. Drück die Füße in den Boden und nach außen. Die Stange steigt dicht am Körper, bis du aufrecht stehst. Atme oben aus." },
        { titel: "Ablegen", text: "Schieb die Hüfte nach hinten und senk die Stange kontrolliert zum Boden." }
      ],
      en: [
        { titel: "Setup", text: "Take a wide stance at the bar, toes pointing clearly out, shins close to the bar. Grip it at about shoulder width between your knees. Lower your hips, lift your chest and push your knees out." },
        { titel: "Lift", text: "Take a deep breath in and brace your core. Push your feet into the floor and outward. The bar rises close to your body until you stand upright. Breathe out at the top." },
        { titel: "Set down", text: "Push your hips back and lower the bar under control to the floor." }
      ]
    },
    fehler: { de: "Die Knie fallen nach innen, oder die Hüfte steigt vor der Stange.", en: "Your knees cave in, or your hips rise before the bar." },
    sicherheit: { de: "Der Rücken bleibt gerade. Steigere das Gewicht langsam, die Hüfte braucht Zeit für den breiten Stand.", en: "Your back stays straight. Increase the weight slowly, your hips need time to get used to the wide stance." }
  },
  "stiff-leg-deadlift": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell dich hüftbreit an die Stange. Beug dich mit geradem Rücken aus der Hüfte vor und greif sie im Obergriff etwa schulterbreit. Die Knie sind nur ganz leicht gebeugt." },
        { titel: "Anheben", text: "Atme ein und spann den Rumpf an. Richte dich aus der Hüfte auf, die Stange bleibt nah am Körper. Atme oben aus." },
        { titel: "Absenken", text: "Schieb die Hüfte nach hinten und senk die Stange kontrolliert. Die Knie bleiben fast gestreckt." }
      ],
      en: [
        { titel: "Setup", text: "Stand at the bar with your feet hip width apart. Hinge forward at the hips with a straight back and grip the bar overhand at about shoulder width. Your knees are only very slightly bent." },
        { titel: "Lift", text: "Breathe in and brace your core. Straighten up from the hips with the bar close to your body. Breathe out at the top." },
        { titel: "Lower", text: "Push your hips back and lower the bar under control. Your knees stay almost straight." }
      ]
    },
    fehler: { de: "Der Rücken wird rund, weil die Beweglichkeit nicht bis zum Boden reicht.", en: "Your back rounds because your mobility does not reach the floor." },
    sicherheit: { de: "Geh nur so tief, wie der Rücken gerade bleibt, auch wenn die Stange den Boden nicht erreicht. Nimm deutlich weniger Gewicht als beim normalen Kreuzheben.", en: "Go only as deep as your back stays straight, even if the bar does not reach the floor. Use clearly less weight than for the regular deadlift." }
  },
  "deficit-deadlift": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell dich auf eine Scheibe oder ein Podest von etwa 3 bis 8 cm Höhe, die Stange liegt über der Fußmitte. Greif sie etwa schulterbreit. Senk die Hüfte etwas tiefer als sonst, die Brust ist oben, der Rücken gerade." },
        { titel: "Anheben", text: "Atme tief ein und spann den Rumpf an. Drück die Füße in die Erhöhung und heb die Stange dicht am Körper, bis du aufrecht stehst. Atme oben aus." },
        { titel: "Ablegen", text: "Schieb die Hüfte nach hinten und setz die Stange kontrolliert ab." }
      ],
      en: [
        { titel: "Setup", text: "Stand on a plate or platform about 3 to 8 cm high, with the bar over the middle of your feet. Grip it at about shoulder width. Lower your hips a little more than usual, chest up, back straight." },
        { titel: "Lift", text: "Take a deep breath in and brace your core. Push your feet into the platform and lift the bar close to your body until you stand upright. Breathe out at the top." },
        { titel: "Set down", text: "Push your hips back and set the bar down under control." }
      ]
    },
    fehler: { de: "Der untere Rücken rundet sich am Start, weil die Stange tiefer liegt.", en: "Your lower back rounds at the start because the bar is lower." },
    sicherheit: { de: "Die Erhöhung muss fest und rutschfest sein. Nimm weniger Gewicht als beim normalen Kreuzheben.", en: "The platform must be firm and must not slip. Use less weight than for the regular deadlift." }
  },
  "rack-pull": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Sicherheitsbügel im Rack so ein, dass die Stange etwa auf Kniehöhe liegt. Stell dich hüftbreit an die Stange und greif sie etwa schulterbreit. Der Rücken ist gerade, die Schultern sind über der Stange." },
        { titel: "Anheben", text: "Atme ein und spann den Rumpf an. Schieb die Hüfte nach vorn und richte dich auf, die Stange bleibt am Körper. Atme oben aus." },
        { titel: "Ablegen", text: "Senk die Stange kontrolliert zurück auf die Bügel und lass sie kurz ganz liegen." }
      ],
      en: [
        { titel: "Set up", text: "Set the safety bars in the rack so the bar rests at about knee height. Stand at the bar with your feet hip width apart and grip it at about shoulder width. Your back is straight and your shoulders are over the bar." },
        { titel: "Lift", text: "Breathe in and brace your core. Push your hips forward and straighten up with the bar against your body. Breathe out at the top." },
        { titel: "Set down", text: "Lower the bar under control back onto the safety bars and let it rest there completely for a moment." }
      ]
    },
    fehler: { de: "Du lehnst dich oben weit nach hinten.", en: "You lean far back at the top." },
    sicherheit: { de: "Der kurze Weg erlaubt viel Gewicht. Steigere trotzdem langsam und halt den Rücken gerade.", en: "The short range allows a lot of weight. Still, increase slowly and keep your back straight." }
  },
  "jefferson-deadlift": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell dich breitbeinig über die Stange, ein Fuß steht vor ihr, einer dahinter. Geh mit geradem Rücken in die Knie. Greif die Stange mit einer Hand vor dem Körper und mit der anderen dahinter." },
        { titel: "Anheben", text: "Atme ein und spann den Rumpf an. Drück die Füße in den Boden und steh gerade auf. Die Stange steigt zwischen den Beinen. Atme oben aus." },
        { titel: "Ablegen", text: "Beug Knie und Hüfte und setz die Stange kontrolliert ab. Wechsle nach dem Satz, welcher Fuß und welche Hand vorn sind." }
      ],
      en: [
        { titel: "Setup", text: "Straddle the bar with one foot in front of it and one behind. Bend your knees with a straight back. Grip the bar with one hand in front of your body and the other behind." },
        { titel: "Lift", text: "Breathe in and brace your core. Push your feet into the floor and stand straight up. The bar rises between your legs. Breathe out at the top." },
        { titel: "Set down", text: "Bend your knees and hips and set the bar down under control. After the set, switch which foot and which hand are in front." }
      ]
    },
    fehler: { de: "Der Oberkörper dreht sich mit der Stange zur Seite.", en: "Your torso rotates to the side with the bar." },
    sicherheit: { de: "Fang mit wenig Gewicht an, die Haltung ist ungewohnt. Der Rücken bleibt gerade.", en: "Start with little weight, the position is unfamiliar. Your back stays straight." }
  },
  "good-morning": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg die Stange im Rack auf den oberen Rücken, heb sie heraus und geh einen Schritt zurück. Die Füße stehen hüftbreit, die Knie sind leicht gebeugt." },
        { titel: "Vorbeugen", text: "Atme ein und spann den Rumpf an. Schieb die Hüfte nach hinten und neig den Oberkörper mit geradem Rücken vor, bis du eine Dehnung hinten in den Oberschenkeln spürst." },
        { titel: "Aufrichten", text: "Schieb die Hüfte nach vorn und richte dich auf. Atme dabei aus." }
      ],
      en: [
        { titel: "Setup", text: "Rest the bar on your upper back in the rack, lift it out and take a step back. Your feet are hip width apart and your knees are slightly bent." },
        { titel: "Hinge forward", text: "Breathe in and brace your core. Push your hips back and lean your torso forward with a straight back until you feel a stretch in the back of your thighs." },
        { titel: "Straighten up", text: "Push your hips forward and straighten up. Breathe out." }
      ]
    },
    fehler: { de: "Der Rücken wird rund, oder der Kopf geht weit in den Nacken.", en: "Your back rounds, or your head tips far back." },
    sicherheit: { de: "Fang mit der leeren Stange an und stell die Sicherheitsbügel im Rack ein. Der Hebel am unteren Rücken ist lang.", en: "Start with the empty bar and set the safety bars in the rack. The lever on your lower back is long." }
  },
  "dumbbell-good-morning": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Halt eine Kurzhantel mit beiden Händen dicht vor der oberen Brust. Die Füße stehen hüftbreit, die Knie sind leicht gebeugt." },
        { titel: "Vorbeugen", text: "Schieb die Hüfte nach hinten und neig den Oberkörper mit geradem Rücken vor. Atme dabei ein. Die Hantel bleibt an der Brust." },
        { titel: "Aufrichten", text: "Schieb die Hüfte nach vorn und richte dich auf. Atme dabei aus." }
      ],
      en: [
        { titel: "Setup", text: "Hold a dumbbell with both hands close in front of your upper chest. Your feet are hip width apart and your knees are slightly bent." },
        { titel: "Hinge forward", text: "Push your hips back and lean your torso forward with a straight back. Breathe in. The dumbbell stays at your chest." },
        { titel: "Straighten up", text: "Push your hips forward and straighten up. Breathe out." }
      ]
    },
    fehler: { de: "Die Hantel sinkt von der Brust weg, und der obere Rücken wird rund.", en: "The dumbbell sinks away from your chest and your upper back rounds." }
  },
  "bodyweight-good-morning": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh hüftbreit, die Knie sind leicht gebeugt. Leg die Hände an den Hinterkopf, die Ellbogen zeigen zur Seite." },
        { titel: "Vorbeugen", text: "Schieb die Hüfte nach hinten und neig den Oberkörper mit geradem Rücken vor, bis er fast waagerecht ist. Atme dabei ein." },
        { titel: "Aufrichten", text: "Schieb die Hüfte nach vorn und richte dich auf. Atme dabei aus." }
      ],
      en: [
        { titel: "Setup", text: "Stand with your feet hip width apart and your knees slightly bent. Place your hands behind your head with your elbows pointing out to the sides." },
        { titel: "Hinge forward", text: "Push your hips back and lean your torso forward with a straight back until it is almost horizontal. Breathe in." },
        { titel: "Straighten up", text: "Push your hips forward and straighten up. Breathe out." }
      ]
    },
    fehler: { de: "Du beugst die Knie stark, statt die Hüfte nach hinten zu schieben.", en: "You bend your knees a lot instead of pushing your hips back." }
  },
  "single-leg-romanian-deadlift-eigen": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh auf einem Bein, das Knie ist leicht gebeugt. Die Arme hängen vor dem Körper oder sind zur Seite gestreckt." },
        { titel: "Vorbeugen", text: "Neig den Oberkörper mit geradem Rücken vor und heb das freie Bein gestreckt nach hinten. Atme dabei ein. Oberkörper und Bein bilden eine Linie, die Hüfte bleibt gerade zum Boden gerichtet." },
        { titel: "Aufrichten", text: "Richte dich über das Standbein wieder auf und atme aus. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Setup", text: "Stand on one leg with the knee slightly bent. Your arms hang in front of your body or are stretched out to the sides." },
        { titel: "Hinge forward", text: "Lean your torso forward with a straight back and lift your free leg straight back. Breathe in. Your torso and leg form one line and your hips stay square to the floor." },
        { titel: "Straighten up", text: "Straighten up again over your standing leg and breathe out. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Die Hüfte dreht auf der Seite des freien Beins nach oben auf.", en: "Your hip rotates open on the side of the free leg." },
    tipp: { de: "Wenn du schwankst, halt dich mit einer Hand leicht an etwas Festem.", en: "If you wobble, hold on lightly to something solid with one hand." }
  }
});
