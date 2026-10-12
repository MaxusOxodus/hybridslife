// Die Erklärungen der Muskelgruppe Latissimus. Sie kommen zu den Einträgen aus der erklaerungen.js dazu,
// deshalb muss diese Datei in der index.html nach der erklaerungen.js stehen. Aufbau wie dort:
// Schlüssel ist die Übungs-ID, pro Übung schritte (2 bis 3) und optional fehler, sicherheit, tipp, alle in de und en.
// Die Datei hat in der index.html und in der sw.js kein ?v=N: Der Service Worker holt sie bei jeder neuen VERSION frisch.
Object.assign(ERKLAERUNGEN, {
  "cable-lat-pulldown": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Häng die Stange oder den Griff ein, den du nutzen willst. Stell das Kniepolster so ein, dass die Oberschenkel fest anliegen. Greif im Stehen und setz dich dann." },
        { titel: "Ziehen", text: "Zieh zuerst die Schulterblätter nach unten, dann die Ellbogen. Der Griff kommt zur oberen Brust. Atme dabei aus." },
        { titel: "Zurück", text: "Lass den Griff langsam nach oben, bis die Arme fast gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Attach the bar or handle you want to use. Adjust the knee pad so your thighs are held firmly. Take your grip while standing, then sit down." },
        { titel: "Pull", text: "Pull your shoulder blades down first, then your elbows. The handle comes to your upper chest. Breathe out." },
        { titel: "Return", text: "Let the handle rise slowly until your arms are almost straight and breathe in." }
      ]
    },
    fehler: { de: "Die Schultern ziehen beim Hochlassen zu den Ohren und bleiben beim nächsten Zug dort.", en: "Your shoulders shrug up to your ears on the way up and stay there for the next pull." },
    tipp: { de: "Griffart und Griffbreite verändern die Übung. Für Obergriff, Untergriff, eng und breit gibt es eigene Einträge.", en: "Grip type and grip width change the exercise. Overhand, underhand, close and wide each have their own entry." }
  },
  "overhand-grip-cable-lat-pulldown": {
    schritte: {
      de: [
        { titel: "Griff", text: "Greif die Stange von oben, die Handflächen zeigen von dir weg. Die Hände sind etwas breiter als schulterbreit. Setz dich und klemm die Oberschenkel unter das Polster." },
        { titel: "Ziehen", text: "Lehn dich leicht zurück, die Brust zeigt nach oben. Zieh die Stange zur oberen Brust und atme aus. Die Ellbogen zeigen schräg nach unten." },
        { titel: "Zurück", text: "Lass die Stange langsam nach oben, bis die Arme fast gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Grip", text: "Grip the bar from above, palms facing away from you. Your hands are a little wider than shoulder width. Sit down and lock your thighs under the pad." },
        { titel: "Pull", text: "Lean back slightly, chest up. Pull the bar to your upper chest and breathe out. Your elbows point diagonally down." },
        { titel: "Return", text: "Let the bar rise slowly until your arms are almost straight and breathe in." }
      ]
    },
    fehler: { de: "Du ziehst mit den Händen statt mit den Ellbogen. Denk daran, die Ellbogen nach unten zu führen, die Hände halten nur fest.", en: "You pull with your hands instead of your elbows. Think of driving your elbows down, your hands only hold on." }
  },
  "wide-grip-cable-lat-pulldown": {
    schritte: {
      de: [
        { titel: "Griff", text: "Greif die Stange im Obergriff deutlich breiter als schulterbreit, etwa dort, wo die Stange abknickt. Setz dich und klemm die Oberschenkel unter das Polster." },
        { titel: "Ziehen", text: "Zieh die Ellbogen seitlich nach unten in Richtung Rippen. Die Stange kommt bis zum Kinn oder zur oberen Brust. Atme dabei aus." },
        { titel: "Zurück", text: "Lass die Stange langsam nach oben, bis die Arme fast gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Grip", text: "Grip the bar overhand, clearly wider than shoulder width, about where the bar bends. Sit down and lock your thighs under the pad." },
        { titel: "Pull", text: "Pull your elbows down and out to the sides toward your ribs. The bar comes to your chin or upper chest. Breathe out." },
        { titel: "Return", text: "Let the bar rise slowly until your arms are almost straight and breathe in." }
      ]
    },
    fehler: { de: "Du greifst so breit, dass du die Stange kaum noch bis zum Kinn bekommst. Rück die Hände dann etwas nach innen.", en: "Your grip is so wide that you can barely get the bar to your chin. Move your hands in a little." }
  },
  "machine-lat-pulldown": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Wähl das Gewicht, je nach Gerät mit dem Stift oder mit Scheiben. Stell den Sitz so ein, dass du die Griffe mit fast gestreckten Armen gerade erreichst. Das Kniepolster liegt fest auf den Oberschenkeln." },
        { titel: "Ziehen", text: "Zieh die Griffe nach unten, bis die Hände etwa auf Schulterhöhe sind, und atme aus. Die Ellbogen gehen in Richtung Hüfte." },
        { titel: "Zurück", text: "Lass die Griffe langsam nach oben und atme ein. Beide Seiten laufen gleich schnell." }
      ],
      en: [
        { titel: "Set up", text: "Select the weight, with the pin or with plates depending on the machine. Adjust the seat so you can just reach the handles with your arms almost straight. The knee pad sits firmly on your thighs." },
        { titel: "Pull", text: "Pull the handles down until your hands are at about shoulder height and breathe out. Your elbows travel toward your hips." },
        { titel: "Return", text: "Let the handles rise slowly and breathe in. Both sides move at the same speed." }
      ]
    },
    fehler: { de: "Du hebst beim Ziehen vom Sitz ab. Dann sitzt das Polster zu locker oder das Gewicht ist zu schwer.", en: "You lift off the seat as you pull. Then the pad is too loose or the weight is too heavy." }
  },
  "neutral-close-grip-cable-lat-pulldown": {
    schritte: {
      de: [
        { titel: "Griff", text: "Häng den engen Griff ein, bei dem die Handflächen zueinander zeigen. Greif ihn, setz dich und klemm die Oberschenkel unter das Polster." },
        { titel: "Ziehen", text: "Lehn dich leicht zurück. Zieh den Griff zur oberen Brust und atme aus. Die Ellbogen laufen eng am Körper nach unten und hinten." },
        { titel: "Zurück", text: "Lass die Arme lang werden, bis du eine Dehnung seitlich am Rücken spürst, und atme ein." }
      ],
      en: [
        { titel: "Grip", text: "Attach the close-grip handle that has your palms facing each other. Grip it, sit down and lock your thighs under the pad." },
        { titel: "Pull", text: "Lean back slightly. Pull the handle to your upper chest and breathe out. Your elbows travel down and back, close to your body." },
        { titel: "Return", text: "Let your arms lengthen until you feel a stretch along the sides of your back and breathe in." }
      ]
    },
    fehler: { de: "Du lehnst dich immer weiter zurück, bis aus dem Latzug ein Rudern wird.", en: "You lean back further and further until the pulldown turns into a row." }
  },
  "underhand-wide-grip-cable-lat-pulldown": {
    schritte: {
      de: [
        { titel: "Griff", text: "Greif die Stange von unten, die Handflächen zeigen zu dir. Die Hände sind etwas breiter als schulterbreit. Setz dich so, dass das Polster die Oberschenkel hält." },
        { titel: "Ziehen", text: "Zieh die Stange zur oberen Brust und atme aus. Die Ellbogen gehen schräg nach unten vor den Körper." },
        { titel: "Zurück", text: "Führ die Stange langsam zurück nach oben und atme ein. Die Arme werden fast gerade." }
      ],
      en: [
        { titel: "Grip", text: "Grip the bar from below, palms facing you. Your hands are a little wider than shoulder width. Sit so the pad holds your thighs." },
        { titel: "Pull", text: "Pull the bar to your upper chest and breathe out. Your elbows travel diagonally down in front of your body." },
        { titel: "Return", text: "Guide the bar slowly back up and breathe in. Your arms become almost straight." }
      ]
    },
    fehler: { de: "Du greifst so breit, dass die Handgelenke schräg stehen. Rück die Hände nach innen, bis sie gerade sind.", en: "Your grip is so wide that your wrists are bent sideways. Move your hands in until they are straight." },
    tipp: { de: "An einer geraden Stange ist dieser Griff für viele unbequem. Zieht es im Handgelenk, nimm den engen Untergriff.", en: "On a straight bar this grip is uncomfortable for many people. If you feel a pull in your wrists, use the close underhand grip." }
  },
  "underhand-close-grip-cable-lat-pulldown": {
    schritte: {
      de: [
        { titel: "Griff", text: "Greif die Stange von unten, schulterbreit oder etwas enger. Setz dich und klemm die Oberschenkel unter das Polster." },
        { titel: "Ziehen", text: "Zieh die Ellbogen vor dem Körper nach unten, bis die Stange an der oberen Brust ist. Atme dabei aus." },
        { titel: "Zurück", text: "Streck die Arme oben fast ganz und atme ein." }
      ],
      en: [
        { titel: "Grip", text: "Grip the bar from below, shoulder width or a little closer. Sit down and lock your thighs under the pad." },
        { titel: "Pull", text: "Pull your elbows down in front of your body until the bar is at your upper chest. Breathe out." },
        { titel: "Return", text: "Straighten your arms almost fully at the top and breathe in." }
      ]
    },
    fehler: { de: "Du ziehst nur aus den Armen, und die Schultern bleiben oben. Zieh zuerst die Schulterblätter nach unten.", en: "You pull only with your arms and your shoulders stay up. Pull your shoulder blades down first." }
  },
  "single-arm-cable-lat-pulldown": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Häng einen einzelnen Griff an die obere Rolle. Greif ihn mit einer Hand, setz dich und klemm die Oberschenkel unter das Polster. Die freie Hand liegt auf dem Polster." },
        { titel: "Ziehen", text: "Zieh den Ellbogen seitlich nach unten zur Hüfte und atme aus. Die Hand kommt bis neben die Schulter." },
        { titel: "Zurück", text: "Lass den Arm langsam lang werden und atme ein. Mach erst alle Wiederholungen einer Seite, dann wechsle." }
      ],
      en: [
        { titel: "Set up", text: "Attach a single handle to the high pulley. Grip it with one hand, sit down and lock your thighs under the pad. Your free hand rests on the pad." },
        { titel: "Pull", text: "Pull your elbow down and out toward your hip and breathe out. Your hand comes down beside your shoulder." },
        { titel: "Return", text: "Let your arm lengthen slowly and breathe in. Do all reps on one side first, then switch." }
      ]
    },
    fehler: { de: "Du kippst den Oberkörper zur ziehenden Seite, um mehr Gewicht zu bewegen.", en: "You tilt your torso toward the pulling side to move more weight." }
  },
  "half-kneeling-single-arm-elbow-lat-pulldown": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Häng einen einzelnen Griff an die obere Rolle. Greif ihn, geh ein Stück zurück und knie dich mit einem Bein hin, das andere steht vorn. Leg etwas Weiches unter das Knie. Der Arm zeigt gestreckt schräg nach oben zur Rolle." },
        { titel: "Ziehen", text: "Spann Bauch und Po an. Zieh den Ellbogen nach unten zur Hüfte und atme aus." },
        { titel: "Zurück", text: "Lass den Arm langsam lang werden und atme ein. Der Oberkörper bleibt aufrecht." }
      ],
      en: [
        { titel: "Set up", text: "Attach a single handle to the high pulley. Grip it, step back a little and kneel on one leg with the other foot in front. Put something soft under your knee. Your arm points straight and diagonally up toward the pulley." },
        { titel: "Pull", text: "Tighten your abs and glutes. Pull your elbow down toward your hip and breathe out." },
        { titel: "Return", text: "Let your arm lengthen slowly and breathe in. Your torso stays upright." }
      ]
    },
    fehler: { de: "Du fällst beim Ziehen ins Hohlkreuz oder drehst den Oberkörper auf.", en: "You arch your lower back as you pull, or you rotate your torso open." }
  },
  "kneeling-cable-straight-arm-lat-pulldown": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Häng eine gerade Stange an die obere Rolle. Knie dich mit etwas Abstand davor und greif schulterbreit im Obergriff. Die Arme sind fast gestreckt und zeigen schräg nach oben." },
        { titel: "Herunterziehen", text: "Zieh die Stange in einem Bogen nach unten bis zu den Oberschenkeln und atme aus. Der Winkel im Ellbogen bleibt gleich." },
        { titel: "Zurück", text: "Lass die Stange im selben Bogen nach oben, bis du eine Dehnung seitlich am Rücken spürst, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Attach a straight bar to the high pulley. Kneel a short distance in front of it and grip the bar overhand at shoulder width. Your arms are almost straight and point diagonally up." },
        { titel: "Pull down", text: "Pull the bar down in an arc to your thighs and breathe out. The angle in your elbows stays the same." },
        { titel: "Return", text: "Let the bar rise along the same arc until you feel a stretch along the sides of your back and breathe in." }
      ]
    },
    fehler: { de: "Die Ellbogen beugen sich, und der Trizeps übernimmt. Dann ist das Gewicht zu schwer.", en: "Your elbows bend and the triceps take over. Then the weight is too heavy." }
  },
  "cable-rope-straight-arm-lat-pulldown": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Häng das Seil an die obere Rolle. Greif es, geh einen Schritt zurück und beug dich aus der Hüfte leicht vor. Die Knie sind leicht gebeugt, die Arme fast gestreckt." },
        { titel: "Herunterziehen", text: "Zieh das Seil in einem Bogen zu den Hüften und atme aus. Unten ziehst du die Seilenden links und rechts an den Hüften vorbei." },
        { titel: "Zurück", text: "Lass das Seil langsam nach oben und atme ein. Der Rücken bleibt gerade." }
      ],
      en: [
        { titel: "Set up", text: "Attach the rope to the high pulley. Grip it, take a step back and hinge forward slightly at the hips. Your knees are slightly bent, your arms almost straight." },
        { titel: "Pull down", text: "Pull the rope in an arc to your hips and breathe out. At the bottom, pull the rope ends past your hips on the left and right." },
        { titel: "Return", text: "Let the rope rise slowly and breathe in. Your back stays straight." }
      ]
    },
    fehler: { de: "Du richtest dich bei jeder Wiederholung auf und holst Schwung aus dem Oberkörper.", en: "You straighten up on every rep and use momentum from your torso." }
  },
  "scapular-pulldown": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Setz dich an den Latzug wie für den normalen Latzug. Greif die Stange im Obergriff etwas breiter als schulterbreit, die Arme sind gestreckt." },
        { titel: "Schulterblätter senken", text: "Zieh die Schulterblätter nach unten, ohne die Ellbogen zu beugen. Die Stange bewegt sich nur wenige Zentimeter. Atme dabei aus." },
        { titel: "Zurück", text: "Lass die Schultern langsam wieder nach oben steigen und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Sit at the lat pulldown as you would for the regular pulldown. Grip the bar overhand, a little wider than shoulder width, arms straight." },
        { titel: "Lower your shoulder blades", text: "Pull your shoulder blades down without bending your elbows. The bar moves only a few centimeters. Breathe out." },
        { titel: "Return", text: "Let your shoulders rise slowly again and breathe in." }
      ]
    },
    fehler: { de: "Die Ellbogen beugen sich, und es wird ein kleiner Latzug.", en: "Your elbows bend and it turns into a small pulldown." },
    tipp: { de: "So übst du den Anfang jedes Latzugs und jedes Klimmzugs.", en: "This is how you practice the start of every pulldown and every pull-up." }
  },
  "machine-assisted-pull-up": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Je mehr Gewicht du steckst, desto mehr hilft dir die Maschine. Steig auf die Tritte, greif die Griffe im Obergriff etwas breiter als schulterbreit und knie dich auf das Polster." },
        { titel: "Hochziehen", text: "Zieh die Schulterblätter nach unten und zieh dich hoch, bis das Kinn über den Griffen ist. Atme dabei aus." },
        { titel: "Absenken", text: "Lass dich langsam ab, bis die Arme fast gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "The more weight you select, the more the machine helps you. Step onto the footrests, grip the handles overhand, a little wider than shoulder width, and kneel on the pad." },
        { titel: "Pull up", text: "Pull your shoulder blades down and pull yourself up until your chin is above the handles. Breathe out." },
        { titel: "Lower", text: "Lower yourself slowly until your arms are almost straight and breathe in." }
      ]
    },
    fehler: { de: "Du lässt dich unten vom Polster nach oben federn.", en: "You let the pad bounce you back up at the bottom." },
    sicherheit: { de: "Steig am Ende zuerst auf die Tritte und lass das Polster kontrolliert hochkommen.", en: "At the end, step onto the footrests first and let the pad come up under control." }
  },
  "machine-assisted-chin-up": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Steck das Gewicht, mehr Gewicht heißt mehr Hilfe. Greif die Griffe von unten, die Handflächen zeigen zu dir, etwa schulterbreit. Knie dich auf das Polster." },
        { titel: "Hochziehen", text: "Zieh die Ellbogen vor dem Körper nach unten, bis das Kinn über den Händen ist. Atme dabei aus." },
        { titel: "Absenken", text: "Lass dich langsam ab, bis die Arme fast gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Select the weight, more weight means more help. Grip the handles from below, palms facing you, at about shoulder width. Kneel on the pad." },
        { titel: "Pull up", text: "Pull your elbows down in front of your body until your chin is above your hands. Breathe out." },
        { titel: "Lower", text: "Lower yourself slowly until your arms are almost straight and breathe in." }
      ]
    },
    fehler: { de: "Du streckst die Arme unten nie ganz und machst nur die obere Hälfte.", en: "You never fully straighten your arms at the bottom and only do the top half." },
    sicherheit: { de: "Steig am Ende über die Tritte ab und halt dich dabei fest. Das Polster kommt sonst schnell nach oben.", en: "At the end, get off via the footrests and hold on while you do. Otherwise the pad comes up fast." }
  },
  "dumbbell-pullover": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich längs auf eine Bank, der Kopf liegt am Ende, die Füße stehen fest. Halt eine Kurzhantel mit beiden Händen an der oberen Scheibe und bring sie über die Brust. Die Ellbogen sind leicht gebeugt." },
        { titel: "Absenken", text: "Senk die Hantel in einem Bogen hinter den Kopf und atme ein, bis du eine Dehnung spürst. Der Winkel im Ellbogen bleibt gleich." },
        { titel: "Zurück", text: "Zieh die Hantel im selben Bogen zurück über die Brust und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Lie lengthwise on a bench, your head at the end, feet planted. Hold one dumbbell with both hands at the upper plate and bring it over your chest. Your elbows are slightly bent." },
        { titel: "Lower", text: "Lower the dumbbell in an arc behind your head and breathe in, until you feel a stretch. The angle in your elbows stays the same." },
        { titel: "Return", text: "Pull the dumbbell back over your chest along the same arc and breathe out." }
      ]
    },
    fehler: { de: "Der untere Rücken hebt von der Bank ab, damit die Hantel weiter nach hinten kommt.", en: "Your lower back lifts off the bench so the dumbbell can travel further back." },
    sicherheit: { de: "Die Hantel bewegt sich über deinem Gesicht. Greif sie sicher und nimm ein leichtes Gewicht.", en: "The dumbbell moves above your face. Grip it securely and use a light weight." },
    tipp: { de: "Viele machen die Übung quer auf der Bank, nur mit dem oberen Rücken aufliegend. Das dehnt mehr, ist aber anspruchsvoller.", en: "Many people do the exercise lying across the bench, with only the upper back resting on it. That gives a bigger stretch but is more demanding." }
  },
  "barbell-pullover": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich längs auf eine Bank. Nimm die Stange im Obergriff etwa schulterbreit und bring sie mit fast gestreckten Armen über die Brust." },
        { titel: "Absenken", text: "Senk die Stange in einem Bogen hinter den Kopf und atme ein. Geh nur so weit, wie es sich in den Schultern gut anfühlt." },
        { titel: "Zurück", text: "Zieh die Stange im selben Bogen zurück über die Brust und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Lie lengthwise on a bench. Take the bar overhand at about shoulder width and bring it over your chest with your arms almost straight." },
        { titel: "Lower", text: "Lower the bar in an arc behind your head and breathe in. Go only as far as feels good in your shoulders." },
        { titel: "Return", text: "Pull the bar back over your chest along the same arc and breathe out." }
      ]
    },
    fehler: { de: "Die Ellbogen beugen sich beim Absenken stark. Dann wird aus dem Überzug ein French Press.", en: "Your elbows bend a lot as you lower. Then the pullover turns into a skull crusher." },
    sicherheit: { de: "Die Stange läuft über Gesicht und Hals. Leg die Daumen um die Stange und nimm ein leichtes Gewicht.", en: "The bar travels over your face and neck. Wrap your thumbs around the bar and use a light weight." },
    tipp: { de: "Viele machen die Übung quer auf der Bank, nur mit dem oberen Rücken aufliegend. Das dehnt mehr, ist aber anspruchsvoller. Eine SZ-Stange ist für die Handgelenke oft angenehmer als eine gerade.", en: "Many people do the exercise lying across the bench, with only the upper back resting on it. That gives a bigger stretch but is more demanding. An EZ bar is often easier on the wrists than a straight one." }
  },
  "pendlay-row": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell dich hüftbreit über die Stange. Beug dich aus der Hüfte vor, bis der Oberkörper etwa waagerecht ist, der Rücken ist gerade. Greif die Stange im Obergriff etwas breiter als schulterbreit." },
        { titel: "Rudern", text: "Spann den Rumpf an und zieh die Stange zügig zum unteren Brustkorb. Atme dabei aus. Der Oberkörper bleibt, wo er ist." },
        { titel: "Ablegen", text: "Senk die Stange kontrolliert zurück auf den Boden und lass sie kurz ganz liegen. Atme ein und spann neu an." }
      ],
      en: [
        { titel: "Setup", text: "Stand over the bar with your feet hip-width apart. Hinge forward at the hips until your torso is about horizontal, back straight. Grip the bar overhand, a little wider than shoulder width." },
        { titel: "Row", text: "Brace your core and pull the bar briskly to your lower rib cage. Breathe out. Your torso stays where it is." },
        { titel: "Set down", text: "Lower the bar under control back to the floor and let it rest there completely for a moment. Breathe in and brace again." }
      ]
    },
    fehler: { de: "Du richtest den Oberkörper bei jedem Zug auf.", en: "You raise your torso with every pull." },
    sicherheit: { de: "Der Rücken bleibt die ganze Zeit gerade. Wird er rund, ist das Gewicht zu schwer.", en: "Your back stays straight the whole time. If it rounds, the weight is too heavy." }
  },
  "underhand-barbell-row": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Greif die Stange im Untergriff etwa schulterbreit und heb sie mit geradem Rücken an. Beug die Knie leicht und beug dich aus der Hüfte vor, etwa 45°." },
        { titel: "Rudern", text: "Zieh die Stange zum Bauchnabel und atme aus. Die Ellbogen streifen dabei den Körper." },
        { titel: "Absenken", text: "Lass die Stange langsam ab, bis die Arme gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Grip the bar underhand at about shoulder width and lift it with a straight back. Bend your knees slightly and hinge forward at the hips, about 45°." },
        { titel: "Row", text: "Pull the bar to your belly button and breathe out. Your elbows brush your body." },
        { titel: "Lower", text: "Lower the bar slowly until your arms are straight and breathe in." }
      ]
    },
    fehler: { de: "Du richtest dich mit jedem Zug weiter auf, bis du fast stehst.", en: "You straighten up a little more with every pull until you are almost standing." },
    sicherheit: { de: "Halt den Rücken gerade und den Rumpf fest. Im Untergriff liegt viel Last auf dem Bizeps, steigere das Gewicht langsam.", en: "Keep your back straight and your core tight. The underhand grip puts a lot of load on the biceps, so increase the weight slowly." }
  },
  "landmine-row": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Steck ein Ende der Stange in die Landmine-Halterung und belade das andere. Stell dich über die Stange, das beladene Ende liegt vor dir. Häng einen engen Griff unter die Stange oder fass sie mit beiden Händen." },
        { titel: "Rudern", text: "Beug dich aus der Hüfte vor, der Rücken ist gerade, die Knie sind leicht gebeugt. Zieh die Stange zum Bauch und atme aus. Die Ellbogen bleiben eng." },
        { titel: "Absenken", text: "Lass die Stange ab, bis die Arme gestreckt sind, und atme ein. Die Scheiben setzen nicht auf." }
      ],
      en: [
        { titel: "Set up", text: "Put one end of the bar into the landmine attachment and load the other. Stand over the bar with the loaded end in front of you. Hook a close-grip handle under the bar or hold the bar with both hands." },
        { titel: "Row", text: "Hinge forward at the hips, back straight, knees slightly bent. Pull the bar to your belly and breathe out. Your elbows stay close." },
        { titel: "Lower", text: "Lower the bar until your arms are straight and breathe in. The plates do not touch down." }
      ]
    },
    fehler: { de: "Du holst Schwung aus Beinen und Hüfte.", en: "You use momentum from your legs and hips." },
    sicherheit: { de: "Der Rücken bleibt gerade. Wird er rund, ist das Gewicht zu schwer.", en: "Your back stays straight. If it rounds, the weight is too heavy." },
    tipp: { de: "Mehrere kleine Scheiben lassen mehr Weg als eine große, die früh an die Brust stößt.", en: "Several small plates allow more range than one big plate, which hits your chest early." }
  },
  "meadows-row": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Steck ein Ende der Stange in die Landmine-Halterung und belade das andere. Stell dich in Schrittstellung quer zur Stange an das beladene Ende. Beug dich mit geradem Rücken vor und greif das dicke Ende von oben mit einer Hand. Der freie Unterarm stützt sich auf dem vorderen Oberschenkel ab." },
        { titel: "Rudern", text: "Zieh den Ellbogen nach oben und leicht nach außen und atme aus." },
        { titel: "Absenken", text: "Lass den Arm langsam lang werden, bis du eine leichte Dehnung spürst, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Put one end of the bar into the landmine attachment and load the other. Stand in a staggered stance at the loaded end, at a right angle to the bar. Hinge forward with a straight back and grip the thick end from above with one hand. Your free forearm rests on your front thigh." },
        { titel: "Row", text: "Pull your elbow up and slightly out and breathe out." },
        { titel: "Lower", text: "Let your arm lengthen slowly until you feel a slight stretch and breathe in." }
      ]
    },
    fehler: { de: "Du drehst den Oberkörper beim Ziehen mit auf.", en: "You rotate your torso open as you pull." },
    tipp: { de: "Das Ende der Stange ist dick. Zughilfen helfen, wenn der Griff vor dem Rücken nachgibt.", en: "The end of the bar is thick. Lifting straps help if your grip gives out before your back does." }
  },
  "seal-row": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Leg dich bäuchlings auf eine flache Bank, die so hoch steht, dass die Arme gestreckt nach unten hängen können. Greif die Langhantel oder zwei Kurzhanteln unter der Bank." },
        { titel: "Rudern", text: "Zieh das Gewicht nach oben, bis es fast die Bank berührt, und atme aus. Brust und Hüfte bleiben auf der Bank." },
        { titel: "Absenken", text: "Lass das Gewicht ab, bis die Arme ganz gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Lie face down on a flat bench that is raised high enough for your arms to hang straight down. Grip the barbell or two dumbbells under the bench." },
        { titel: "Row", text: "Pull the weight up until it almost touches the bench and breathe out. Your chest and hips stay on the bench." },
        { titel: "Lower", text: "Lower the weight until your arms are fully straight and breathe in." }
      ]
    },
    fehler: { de: "Du hebst die Brust von der Bank, um das Gewicht höher zu bekommen.", en: "You lift your chest off the bench to get the weight higher." },
    sicherheit: { de: "Die Bank muss fest und sicher erhöht stehen, bevor du dich darauflegst.", en: "The bench must be raised firmly and securely before you lie on it." }
  },
  "chest-supported-dumbbell-row": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Stell die Bank auf etwa 30 bis 45°. Leg dich bäuchlings darauf, die Brust liegt am oberen Ende des Polsters, die Füße stehen am Boden. Die Hanteln hängen an gestreckten Armen." },
        { titel: "Rudern", text: "Zieh beide Ellbogen nach hinten oben und die Hanteln zur Hüfte. Atme dabei aus und zieh die Schulterblätter zusammen." },
        { titel: "Absenken", text: "Lass die Hanteln langsam ab, bis die Arme lang sind, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Set the bench to about 30 to 45°. Lie face down on it with your chest at the top end of the pad and your feet on the floor. The dumbbells hang from straight arms." },
        { titel: "Row", text: "Pull both elbows up and back and the dumbbells toward your hips. Breathe out and squeeze your shoulder blades together." },
        { titel: "Lower", text: "Lower the dumbbells slowly until your arms are long and breathe in." }
      ]
    },
    fehler: { de: "Der Kopf geht in den Nacken, und die Brust löst sich vom Polster.", en: "Your head tips back and your chest comes off the pad." }
  },
  "wide-grip-pull-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Greif die Stange im Obergriff deutlich breiter als schulterbreit. Häng frei, die Arme sind gestreckt." },
        { titel: "Hochziehen", text: "Zieh die Ellbogen seitlich nach unten, bis das Kinn über der Stange ist. Atme dabei aus." },
        { titel: "Absenken", text: "Lass dich kontrolliert ab, bis du wieder im Hang bist, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Grip the bar overhand, clearly wider than shoulder width. Hang freely with your arms straight." },
        { titel: "Pull up", text: "Pull your elbows down and out to the sides until your chin is above the bar. Breathe out." },
        { titel: "Lower", text: "Lower yourself under control until you are hanging again and breathe in." }
      ]
    },
    fehler: { de: "Du greifst so breit, dass das Kinn die Stange nicht mehr erreicht.", en: "Your grip is so wide that your chin no longer reaches the bar." }
  },
  "neutral-grip-pull-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Greif die parallelen Griffe, die Handflächen zeigen zueinander. Häng mit gestreckten Armen, die Schultern sind aktiv." },
        { titel: "Hochziehen", text: "Zieh die Ellbogen nach unten neben die Rippen, bis das Kinn über den Händen ist. Atme dabei aus." },
        { titel: "Absenken", text: "Senk dich langsam, bis die Arme lang sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Grip the parallel handles, palms facing each other. Hang with your arms straight and your shoulders active." },
        { titel: "Pull up", text: "Pull your elbows down beside your ribs until your chin is above your hands. Breathe out." },
        { titel: "Lower", text: "Lower yourself slowly until your arms are long and breathe in." }
      ]
    },
    fehler: { de: "Du ziehst die Knie hoch und holst damit Schwung.", en: "You pull your knees up to gain momentum." }
  },
  "chin-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Greif die Stange von unten, die Handflächen zeigen zu dir, etwa schulterbreit. Häng mit gestreckten Armen, die Schultern sind aktiv." },
        { titel: "Hochziehen", text: "Zieh die Ellbogen vor dem Körper nach unten und die Brust zur Stange, bis das Kinn darüber ist. Atme dabei aus." },
        { titel: "Absenken", text: "Lass dich langsam ab, bis die Arme gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Grip the bar from below, palms facing you, at about shoulder width. Hang with your arms straight and your shoulders active." },
        { titel: "Pull up", text: "Pull your elbows down in front of your body and your chest toward the bar until your chin is above it. Breathe out." },
        { titel: "Lower", text: "Lower yourself slowly until your arms are straight and breathe in." }
      ]
    },
    fehler: { de: "Unten bleibst du mit gebeugten Armen hängen und sparst dir den schwersten Teil.", en: "You stop at the bottom with your arms still bent and skip the hardest part." }
  },
  "close-grip-chin-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Greif die Stange von unten, die Hände sind etwa eine Handbreit auseinander. Häng mit gestreckten Armen." },
        { titel: "Hochziehen", text: "Zieh dich hoch, bis das Kinn über der Stange ist, und atme aus. Die Ellbogen bleiben eng vor dem Körper." },
        { titel: "Absenken", text: "Lass dich langsam ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Grip the bar from below with your hands about a hand's width apart. Hang with your arms straight." },
        { titel: "Pull up", text: "Pull yourself up until your chin is above the bar and breathe out. Your elbows stay close in front of your body." },
        { titel: "Lower", text: "Lower yourself slowly and breathe in." }
      ]
    },
    fehler: { de: "Die Ellbogen driften beim Hochziehen nach außen.", en: "Your elbows drift out as you pull up." },
    tipp: { de: "Zieht es im Handgelenk oder Unterarm, greif wieder etwas weiter.", en: "If you feel a pull in your wrists or forearms, widen your grip a little again." }
  },
  "commando-pull-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell dich so unter die Stange, dass sie über dir von vorn nach hinten verläuft. Greif mit beiden Händen dicht hintereinander, die Handflächen zeigen zueinander." },
        { titel: "Hochziehen", text: "Zieh dich hoch und führ den Kopf an einer Seite der Stange vorbei, bis die Schulter die Stange fast berührt. Atme dabei aus." },
        { titel: "Absenken", text: "Lass dich langsam ab und atme ein. Bei der nächsten Wiederholung geht der Kopf auf die andere Seite. Tausch nach dem Satz, welche Hand vorn greift." }
      ],
      en: [
        { titel: "Setup", text: "Stand under the bar so that it runs from front to back above you. Grip it with both hands close together, one in front of the other, palms facing each other." },
        { titel: "Pull up", text: "Pull yourself up and bring your head past one side of the bar until your shoulder almost touches the bar. Breathe out." },
        { titel: "Lower", text: "Lower yourself slowly and breathe in. On the next rep, your head goes to the other side. After the set, switch which hand is in front." }
      ]
    },
    fehler: { de: "Der Körper dreht sich im Hang hin und her.", en: "Your body twists back and forth while you hang." }
  },
  "archer-pull-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Greif die Stange im Obergriff sehr breit. Häng mit gestreckten Armen." },
        { titel: "Zur Seite ziehen", text: "Zieh dich zu einer Hand hoch, bis das Kinn über dieser Hand ist. Atme dabei aus. Der andere Arm streckt sich über der Stange zur Seite." },
        { titel: "Absenken und wechseln", text: "Lass dich langsam zur Mitte ab und atme ein. Dann geht es zur anderen Seite." }
      ],
      en: [
        { titel: "Setup", text: "Grip the bar overhand, very wide. Hang with your arms straight." },
        { titel: "Pull to one side", text: "Pull yourself up toward one hand until your chin is above that hand. Breathe out. The other arm straightens out to the side above the bar." },
        { titel: "Lower and switch", text: "Lower yourself slowly to the middle and breathe in. Then go to the other side." }
      ]
    },
    fehler: { de: "Der gestreckte Arm beugt sich und zieht mit. Dann ist es ein breiter Klimmzug.", en: "The straight arm bends and helps pull. Then it is a wide-grip pull-up." },
    sicherheit: { de: "Mach die Übung erst, wenn normale Klimmzüge sauber klappen.", en: "Only do this exercise once regular pull-ups are clean." }
  },
  "typewriter-pull-up": {
    schritte: {
      de: [
        { titel: "Hochziehen", text: "Greif die Stange im Obergriff sehr breit. Zieh dich hoch, bis das Kinn über der Stange ist, und atme aus." },
        { titel: "Wandern", text: "Bleib oben und schieb dich seitlich zu einer Hand, der andere Arm streckt sich. Dann geht es zur anderen Seite. Atme ruhig weiter." },
        { titel: "Absenken", text: "Komm zurück zur Mitte, lass dich langsam ab und atme ein." }
      ],
      en: [
        { titel: "Pull up", text: "Grip the bar overhand, very wide. Pull yourself up until your chin is above the bar and breathe out." },
        { titel: "Travel", text: "Stay at the top and shift sideways toward one hand while the other arm straightens. Then go to the other side. Keep breathing steadily." },
        { titel: "Lower", text: "Come back to the middle, lower yourself slowly and breathe in." }
      ]
    },
    fehler: { de: "Du sinkst beim Wandern ab, und das Kinn rutscht unter die Stange.", en: "You sink as you travel and your chin drops below the bar." },
    tipp: { de: "Üb zuerst Archer-Klimmzüge.", en: "Practice archer pull-ups first." }
  },
  "muscle-up": {
    schritte: {
      de: [
        { titel: "Ziehen", text: "Greif die Stange im Obergriff etwa schulterbreit. Zieh dich explosiv so hoch, dass die Stange auf Höhe der unteren Brust ist. Atme dabei aus." },
        { titel: "Übergang", text: "Kipp den Oberkörper zügig über die Stange nach vorn. Die Handgelenke drehen mit über die Stange, die Ellbogen kommen nach oben." },
        { titel: "Stütz", text: "Drück dich hoch, bis die Arme gestreckt sind. Lass dich danach kontrolliert zurück in den Hang und atme ein." }
      ],
      en: [
        { titel: "Pull", text: "Grip the bar overhand at about shoulder width. Pull yourself up explosively, high enough that the bar is level with your lower chest. Breathe out." },
        { titel: "Transition", text: "Tip your torso forward over the bar quickly. Your wrists rotate over the bar with you and your elbows come up." },
        { titel: "Support", text: "Press yourself up until your arms are straight. Then lower yourself under control back into the hang and breathe in." }
      ]
    },
    fehler: { de: "Ein Ellbogen kommt vor dem anderen über die Stange.", en: "One elbow comes over the bar before the other." },
    sicherheit: { de: "Voraussetzung sind saubere Klimmzüge und Dips. Schultern und Ellbogen werden stark belastet, wärm dich gründlich auf.", en: "You need clean pull-ups and dips first. Shoulders and elbows are under heavy load, so warm up thoroughly." }
  },
  "towel-pull-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg zwei stabile Handtücher über die Stange und greif in jede Hand beide Enden eines Handtuchs. Häng mit gestreckten Armen." },
        { titel: "Hochziehen", text: "Zieh dich hoch, bis die Hände auf Höhe der Brust sind, und atme aus." },
        { titel: "Absenken", text: "Lass dich langsam ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Hang two sturdy towels over the bar and grip both ends of one towel in each hand. Hang with your arms straight." },
        { titel: "Pull up", text: "Pull yourself up until your hands are level with your chest and breathe out." },
        { titel: "Lower", text: "Lower yourself slowly and breathe in." }
      ]
    },
    fehler: { de: "Der Griff rutscht nach, und du greifst mitten in der Wiederholung um. Beende den Satz vorher.", en: "Your grip slips and you regrip in the middle of a rep. End the set before that happens." },
    sicherheit: { de: "Nimm nur feste, trockene Handtücher. Zieh einmal kräftig daran, bevor du dich hineinhängst.", en: "Only use strong, dry towels. Give them one hard pull before you hang from them." }
  },
  "australian-pull-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg eine Stange im Rack auf Hüfthöhe fest ein. Leg dich darunter und greif sie im Obergriff etwas breiter als schulterbreit. Die Fersen stehen am Boden, der Körper bildet eine gerade Linie, die Arme sind gestreckt." },
        { titel: "Hochziehen", text: "Zieh die Brust zur Stange und atme aus. Die Schulterblätter gehen zusammen, die Hüfte bleibt in der Linie." },
        { titel: "Absenken", text: "Lass dich langsam ab, bis die Arme gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Fix a bar in the rack at hip height. Lie under it and grip it overhand, a little wider than shoulder width. Your heels are on the floor, your body forms a straight line, your arms are straight." },
        { titel: "Pull up", text: "Pull your chest to the bar and breathe out. Your shoulder blades come together and your hips stay in line." },
        { titel: "Lower", text: "Lower yourself slowly until your arms are straight and breathe in." }
      ]
    },
    fehler: { de: "Die Hüfte hängt durch.", en: "Your hips sag." },
    tipp: { de: "Je höher die Stange, desto leichter. Mit angewinkelten Knien wird es ebenfalls leichter.", en: "The higher the bar, the easier it gets. Bending your knees also makes it easier." }
  },
  "ring-row": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng die Ringe etwa auf Hüfthöhe. Greif sie und lehn dich mit gestreckten Armen zurück, der Körper bildet eine gerade Linie. Je weiter die Füße vorn stehen, desto schwerer wird es." },
        { titel: "Hochziehen", text: "Zieh die Ringe neben die Rippen und atme aus. Die Hände dürfen sich dabei drehen, bis die Handflächen zueinander zeigen." },
        { titel: "Absenken", text: "Lass dich langsam ab, bis die Arme gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Hang the rings at about hip height. Grip them and lean back with your arms straight, your body in a straight line. The further forward your feet are, the harder it gets." },
        { titel: "Pull up", text: "Pull the rings beside your ribs and breathe out. Your hands may rotate until your palms face each other." },
        { titel: "Lower", text: "Lower yourself slowly until your arms are straight and breathe in." }
      ]
    },
    fehler: { de: "Du knickst in der Hüfte ein und ziehst nur den Oberkörper hoch.", en: "You bend at the hips and only pull your upper body up." }
  },
  "feet-elevated-inverted-row": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg eine Stange im Rack auf Hüfthöhe fest ein und stell eine Bank davor. Greif die Stange im Obergriff und leg die Fersen auf die Bank. Der Körper ist waagerecht und gerade." },
        { titel: "Hochziehen", text: "Zieh die Brust zur Stange und atme aus." },
        { titel: "Absenken", text: "Lass dich langsam ab, bis die Arme gestreckt sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Fix a bar in the rack at hip height and place a bench in front of it. Grip the bar overhand and put your heels on the bench. Your body is horizontal and straight." },
        { titel: "Pull up", text: "Pull your chest to the bar and breathe out." },
        { titel: "Lower", text: "Lower yourself slowly until your arms are straight and breathe in." }
      ]
    },
    fehler: { de: "Der Po sackt zwischen Stange und Bank durch.", en: "Your hips sag between the bar and the bench." },
    sicherheit: { de: "Die Stange muss so liegen, dass sie beim Ziehen nicht aus den Haken rollen kann.", en: "The bar must sit so that it cannot roll out of the hooks as you pull." }
  }
});
