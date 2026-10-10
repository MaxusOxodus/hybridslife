// Die Erklärungen der Übungen: Schlüssel ist die Übungs-ID aus der uebungen.js.
// Pro Übung: schritte (3 bis 4, je { titel, text }) und optional fehler, sicherheit, tipp, alle in de und en.
// Die UI-Texte dazu (Button, Überschriften) stehen in der texte.js.
const ERKLAERUNGEN = {
  "kniebeuge": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg die Stange auf den oberen Rücken, nicht auf den Nacken. Greif sie etwas breiter als schulterbreit, die Ellbogen zeigen nach unten. Stell die Füße etwa schulterbreit hin, die Zehen zeigen leicht nach außen." },
        { titel: "Spannung aufbauen", text: "Atme tief in den Bauch ein und spann Bauch und Rumpf fest an. Die Brust ist oben, der Rücken bleibt gerade." },
        { titel: "Nach unten", text: "Beuge Hüfte und Knie gleichzeitig. Die Knie folgen der Richtung der Zehen. Geh kontrolliert nach unten, bis die Oberschenkel mindestens waagerecht sind, oder nur so tief, wie du die Haltung sauber halten kannst." },
        { titel: "Nach oben", text: "Drück durch den ganzen Fuß nach oben. Hüfte und Schultern steigen gleichzeitig. Atme oben aus." }
      ],
      en: [
        { titel: "Setup", text: "Place the bar on your upper back, not on your neck. Grip it a little wider than shoulder width with your elbows pointing down. Stand with feet about shoulder width apart, toes turned slightly out." },
        { titel: "Brace", text: "Take a deep breath into your belly and tighten your abs and trunk. Keep your chest up and your back straight." },
        { titel: "Down", text: "Bend your hips and knees together. Your knees follow the direction of your toes. Lower under control until your thighs are at least parallel to the floor, or only as deep as you can keep good posture." },
        { titel: "Up", text: "Push through your whole foot. Hips and shoulders rise together. Breathe out at the top." }
      ]
    },
    fehler: { de: "Die Knie fallen nach innen oder der untere Rücken rundet sich am tiefsten Punkt.", en: "Knees cave inward, or the lower back rounds at the bottom." },
    sicherheit: { de: "Bei schweren Gewichten stell die Sicherheitsbügel im Rack passend ein.", en: "With heavy weight, set the safety pins in the rack." }
  },
  "beinpresse": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Setz dich so, dass Rücken und Gesäß fest am Polster liegen. Stell die Füße etwa schulterbreit und mittig auf die Platte." },
        { titel: "Nach unten", text: "Löse die Sicherung und senk das Gewicht kontrolliert. Die Knie zeigen in Richtung der Zehen. Geh nur so weit, dass das Gesäß am Polster bleibt." },
        { titel: "Drücken", text: "Drück die Platte kraftvoll weg. Streck die Knie oben nicht ganz durch." }
      ],
      en: [
        { titel: "Setup", text: "Sit with your back and glutes flat against the pad. Place your feet about shoulder width apart in the middle of the platform." },
        { titel: "Lower", text: "Release the safety and lower the weight under control. Your knees track in line with your toes. Go only as deep as your glutes stay on the pad." },
        { titel: "Press", text: "Push the platform away with force. Do not lock your knees out fully at the top." }
      ]
    },
    fehler: { de: "Das Gesäß hebt unten ab und der untere Rücken rundet sich. Dann bist du zu tief.", en: "Your hips lift off the pad and your lower back rounds. That means you went too deep." }
  },
  "beinstrecker": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Stell die Maschine so ein, dass dein Kniegelenk auf Höhe der Drehachse liegt. Das Polster sitzt knapp über den Füßen am unteren Schienbein." },
        { titel: "Strecken", text: "Streck die Beine, bis sie fast gerade sind. Spann die Oberschenkel oben kurz an." },
        { titel: "Senken", text: "Lass das Gewicht langsam und kontrolliert zurück, ohne es abzulegen." }
      ],
      en: [
        { titel: "Setup", text: "Adjust the machine so your knee joint lines up with the pivot. The pad sits just above your feet on the lower shin." },
        { titel: "Extend", text: "Straighten your legs until they are almost fully extended. Squeeze your thighs briefly at the top." },
        { titel: "Lower", text: "Let the weight come back slowly and under control, without resting it." }
      ]
    },
    fehler: { de: "Du holst Schwung mit dem Oberkörper, statt die Oberschenkel arbeiten zu lassen.", en: "Swinging your upper body to build momentum instead of letting your thighs do the work." }
  },
  "beinbeuger-maschine": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Stell die Maschine so ein, dass dein Kniegelenk auf Höhe der Drehachse liegt. Das Polster liegt knapp über den Fersen an der Wade." },
        { titel: "Beugen", text: "Zieh die Fersen kontrolliert zum Gesäß. Halt das Becken ruhig, die Hüfte bleibt am Polster." },
        { titel: "Zurück", text: "Lass das Gewicht langsam zurückgehen, bis die Beine fast gestreckt sind." }
      ],
      en: [
        { titel: "Setup", text: "Adjust the machine so your knee joint lines up with the pivot. The pad rests just above your heels on your calves." },
        { titel: "Curl", text: "Pull your heels toward your glutes under control. Keep your pelvis still and your hips on the pad." },
        { titel: "Return", text: "Let the weight come back slowly until your legs are almost straight." }
      ]
    },
    fehler: { de: "Die Hüfte hebt ab oder du reißt das Gewicht mit Schwung hoch.", en: "Your hips lift off the pad, or you yank the weight up with momentum." }
  },
  "rumaenisches-kreuzheben": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh aufrecht, die Stange hängt vor den Oberschenkeln. Greif sie etwa schulterbreit im Obergriff. Die Knie sind leicht gebeugt und bleiben es die ganze Übung über." },
        { titel: "Hüfte nach hinten", text: "Schieb die Hüfte nach hinten, als wolltest du eine Wand hinter dir berühren. Halt die Stange eng am Körper, die Arme bleiben gestreckt und locker." },
        { titel: "Tiefster Punkt", text: "Geh nach unten, bis du die Dehnung in den Oberschenkelrückseiten spürst. Der Rücken muss gerade bleiben. Hör auf, bevor er sich rundet. Die Stange ist etwa auf Höhe der Knie bis Schienbeine." },
        { titel: "Aufrichten", text: "Schieb die Hüfte nach vorn und richte dich auf. Spann das Gesäß oben an." }
      ],
      en: [
        { titel: "Setup", text: "Stand tall with the bar hanging in front of your thighs. Grip it about shoulder width, overhand. Keep a slight bend in your knees and hold it through the whole lift." },
        { titel: "Hips back", text: "Push your hips back as if reaching for a wall behind you. Keep the bar close to your body and your arms straight and relaxed." },
        { titel: "Bottom", text: "Lower until you feel a stretch in the back of your thighs. Your back must stay straight. Stop before it rounds. The bar is around knee to shin height." },
        { titel: "Stand up", text: "Drive your hips forward and stand tall. Squeeze your glutes at the top." }
      ]
    },
    fehler: { de: "Die Stange wandert weg vom Körper oder der Rücken rundet sich, weil du zu tief gehst.", en: "The bar drifts away from your body, or your back rounds because you go too deep." },
    sicherheit: { de: "Geh nur so tief, wie du den Rücken gerade halten kannst.", en: "Only go as low as you can keep your back straight." }
  },
  "ausfallschritte": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh aufrecht, die Füße hüftbreit. Halt Hanteln seitlich oder die Stange auf dem oberen Rücken." },
        { titel: "Schritt", text: "Mach mit einem Bein einen großen Schritt nach vorn. Setz den Fuß flach auf." },
        { titel: "Absenken", text: "Beug beide Knie, bis das hintere Knie fast den Boden berührt. Der Oberkörper bleibt aufrecht, das vordere Knie zeigt in Richtung der Zehen." },
        { titel: "Zurück", text: "Drück dich mit dem vorderen Fuß kräftig zurück in den Stand. Wechsle dann das Bein oder mach alle Wiederholungen auf einer Seite." }
      ],
      en: [
        { titel: "Setup", text: "Stand tall with feet hip width apart. Hold dumbbells at your sides or the bar on your upper back." },
        { titel: "Step", text: "Take a big step forward with one leg and plant the foot flat." },
        { titel: "Lower", text: "Bend both knees until your back knee almost touches the floor. Keep your torso upright and your front knee tracking over your toes." },
        { titel: "Return", text: "Push back to standing with your front foot. Switch legs or do all reps on one side." }
      ]
    },
    fehler: { de: "Der Schritt ist zu kurz, die Ferse hebt ab, oder das vordere Knie fällt nach innen.", en: "The step is too short, your heel lifts, or your front knee caves in." }
  },
  "wadenheben": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell dich mit den Fußballen auf die Kante der Plattform oder Maschine. Die Fersen hängen frei. Halt dich ggf. fest." },
        { titel: "Hochdrücken", text: "Drück dich auf die Zehenspitzen, so hoch wie möglich. Halt oben kurz an." },
        { titel: "Absenken", text: "Senk die Fersen langsam unter die Plattform, bis du die Dehnung in der Wade spürst." }
      ],
      en: [
        { titel: "Setup", text: "Stand with the balls of your feet on the edge of the platform or machine. Your heels hang free. Hold on if needed." },
        { titel: "Rise", text: "Press up onto your toes as high as you can. Pause briefly at the top." },
        { titel: "Lower", text: "Lower your heels slowly below the platform until you feel a stretch in your calves." }
      ]
    },
    fehler: { de: "Du wippst mit Schwung und nutzt den Bewegungsspielraum nicht voll.", en: "Bouncing with momentum and not using the full range of motion." }
  },
  "hip-thrust": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz dich auf den Boden, der obere Rücken (unter den Schulterblättern) lehnt an einer Bank. Roll die Stange über die Hüftbeugen, mit Polster. Die Füße stehen hüftbreit, die Knie sind gebeugt." },
        { titel: "Hochdrücken", text: "Drück durch die Fersen und heb die Hüfte, bis Oberkörper und Oberschenkel eine gerade Linie bilden. Die Schienbeine stehen oben etwa senkrecht." },
        { titel: "Oben anspannen", text: "Zieh das Kinn leicht zur Brust und kipp das Becken leicht nach hinten. Spann das Gesäß fest an. Überstreck den unteren Rücken nicht." },
        { titel: "Absenken", text: "Senk die Hüfte kontrolliert, ohne die Stange abzulegen." }
      ],
      en: [
        { titel: "Setup", text: "Sit on the floor with your upper back (below the shoulder blades) against a bench. Roll the bar over your hip crease, using a pad. Feet hip width apart, knees bent." },
        { titel: "Drive", text: "Push through your heels and lift your hips until your torso and thighs form a straight line. Your shins are roughly vertical at the top." },
        { titel: "Squeeze", text: "Tuck your chin slightly and tilt your pelvis back a little. Squeeze your glutes hard. Do not over-arch your lower back." },
        { titel: "Lower", text: "Lower your hips under control without resting the bar." }
      ]
    },
    fehler: { de: "Du überstreckst die Lendenwirbelsäule am oberen Punkt, statt das Gesäß zu nutzen.", en: "Over-arching your lower back at the top instead of using your glutes." }
  },
  "bulgarian-split-squats": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell dich etwa eine große Schrittlänge vor eine Bank und leg den Spann eines Fußes hinten auf die Bank. Halt Hanteln seitlich, wenn du Gewicht nutzt." },
        { titel: "Absenken", text: "Beug das vordere Knie und senk dich gerade nach unten. Der Oberkörper bleibt aufrecht oder leicht nach vorn geneigt. Das vordere Knie zeigt in Richtung der Zehen." },
        { titel: "Hochdrücken", text: "Drück dich mit dem vorderen Fuß wieder nach oben, bis das Bein fast gestreckt ist." }
      ],
      en: [
        { titel: "Setup", text: "Stand about one long stride in front of a bench and rest the top of one foot on it behind you. Hold dumbbells at your sides if you use weight." },
        { titel: "Lower", text: "Bend your front knee and lower straight down. Keep your torso upright or leaning slightly forward. Your front knee tracks over your toes." },
        { titel: "Press", text: "Push up through your front foot until your leg is almost straight." }
      ]
    },
    fehler: { de: "Der vordere Fuß steht zu nah an der Bank, dann schiebt das Knie weit über die Zehen. Geh in dem Fall einen Schritt weiter nach vorn.", en: "The front foot is too close to the bench, so the knee travels far over the toes. Step further forward." }
  },
  "bankdruecken-lh": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich so auf die Bank, dass die Augen unter der Stange liegen. Die Füße stehen fest am Boden. Greif die Stange etwas breiter als schulterbreit." },
        { titel: "Schultern fixieren", text: "Zieh die Schulterblätter zusammen und nach unten, als würdest du sie in die Bank drücken. Das schützt die Schultern. Der obere Rücken bleibt die ganze Übung über fest auf der Bank." },
        { titel: "Absenken", text: "Heb die Stange aus dem Ständer und senk sie kontrolliert zur Brust, etwa auf Höhe der unteren Brust. Die Ellbogen zeigen schräg nach unten, nicht im rechten Winkel zur Seite." },
        { titel: "Drücken", text: "Drück die Stange kraftvoll nach oben, bis die Arme fast gestreckt sind." }
      ],
      en: [
        { titel: "Setup", text: "Lie on the bench with your eyes under the bar. Plant your feet firmly. Grip the bar a little wider than shoulder width." },
        { titel: "Set your shoulders", text: "Pull your shoulder blades together and down, as if pressing them into the bench. This protects your shoulders. Keep your upper back on the bench throughout." },
        { titel: "Lower", text: "Unrack the bar and lower it under control to your lower chest. Your elbows point diagonally down, not straight out to the sides." },
        { titel: "Press", text: "Push the bar up with force until your arms are almost straight." }
      ]
    },
    fehler: { de: "Die Stange wird auf der Brust abgeprallt oder der Po hebt von der Bank ab.", en: "Bouncing the bar off your chest, or your butt lifting off the bench." },
    sicherheit: { de: "Bei schweren Gewichten trainiere mit einem Trainingspartner (Spotter) oder im Rack mit Sicherheitsbügeln.", en: "With heavy weight, train with a spotter or in a rack with safety pins." }
  },
  "schraegbank-45-lh": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Stell die Bank auf etwa 45°. Leg dich hin, die Augen liegen unter der Stange, die Füße stehen fest." },
        { titel: "Schultern fixieren", text: "Zieh die Schulterblätter zusammen und nach unten. Greif die Stange etwas breiter als schulterbreit." },
        { titel: "Absenken", text: "Senk die Stange kontrolliert zur oberen Brust, in Höhe des Schlüsselbeins bis zur oberen Brust. Die Ellbogen zeigen schräg nach unten." },
        { titel: "Drücken", text: "Drück die Stange gerade nach oben, bis die Arme fast gestreckt sind." }
      ],
      en: [
        { titel: "Setup", text: "Set the bench to about 45°. Lie back with your eyes under the bar and your feet planted." },
        { titel: "Set your shoulders", text: "Pull your shoulder blades together and down. Grip the bar a little wider than shoulder width." },
        { titel: "Lower", text: "Lower the bar under control to your upper chest. Your elbows point diagonally down." },
        { titel: "Press", text: "Press the bar straight up until your arms are almost straight." }
      ]
    },
    fehler: { de: "Die Bank ist zu steil eingestellt. Dann übernehmen die Schultern mehr Arbeit als die obere Brust.", en: "The bench is too steep. Then your shoulders do more of the work than your upper chest." }
  },
  "bankdruecken-kh": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz dich mit den Hanteln auf die Oberschenkel, leg dich zurück und bring die Hanteln mit Schwung der Knie nach oben über die Brust. Die Füße stehen fest am Boden." },
        { titel: "Schultern fixieren", text: "Zieh die Schulterblätter zusammen und nach unten. Die Handgelenke bleiben gerade." },
        { titel: "Absenken", text: "Senk die Hanteln kontrolliert seitlich neben die Brust. Die Ellbogen zeigen schräg nach unten." },
        { titel: "Drücken", text: "Drück die Hanteln nach oben, bis die Arme fast gestreckt sind. Sie nähern sich oben leicht an." }
      ],
      en: [
        { titel: "Setup", text: "Sit with the dumbbells on your thighs, lie back and bring them up over your chest, using a small knee kick. Plant your feet." },
        { titel: "Set your shoulders", text: "Pull your shoulder blades together and down. Keep your wrists straight." },
        { titel: "Lower", text: "Lower the dumbbells under control to the sides of your chest. Your elbows point diagonally down." },
        { titel: "Press", text: "Press the dumbbells up until your arms are almost straight. They move slightly closer at the top." }
      ]
    },
    fehler: { de: "Die Hanteln gehen zu tief, die Schultern rollen nach vorn.", en: "The dumbbells go too deep and your shoulders roll forward." },
    sicherheit: { de: "Leg die Hanteln am Ende kontrolliert auf den Oberschenkeln ab, nicht fallen lassen.", en: "Return the dumbbells to your thighs under control. Do not drop them." }
  },
  "fliegende-kh": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf die flache Bank, die Hanteln über der Brust, die Handflächen zeigen zueinander. Beug die Ellbogen leicht und halt sie so die ganze Übung über." },
        { titel: "Öffnen", text: "Senk die Arme in einem weiten Bogen zur Seite, bis du eine Dehnung in der Brust spürst. Geh nicht tiefer als bis auf Schulterhöhe." },
        { titel: "Schließen", text: "Führ die Hanteln im selben Bogen zurück, als würdest du einen Baum umarmen. Spann die Brust oben an." }
      ],
      en: [
        { titel: "Setup", text: "Lie on a flat bench with the dumbbells over your chest, palms facing each other. Keep a slight bend in your elbows and hold it throughout." },
        { titel: "Open", text: "Lower your arms in a wide arc to the sides until you feel a stretch in your chest. Do not go lower than shoulder height." },
        { titel: "Close", text: "Bring the dumbbells back along the same arc, as if hugging a tree. Squeeze your chest at the top." }
      ]
    },
    fehler: { de: "Die Ellbogen strecken oder beugen sich während der Bewegung, dann wird daraus ein Drücken.", en: "Your elbows bend and straighten during the movement, which turns it into a press." },
    sicherheit: { de: "Nimm ein leichtes Gewicht. Die Schultern stehen unten unter Dehnung.", en: "Use a light weight. Your shoulders are under stretch at the bottom." }
  },
  "butterfly": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Stell den Sitz so ein, dass die Griffe auf Brusthöhe liegen. Rücken und Kopf lehnen am Polster." },
        { titel: "Zusammenführen", text: "Greif die Griffe, die Ellbogen leicht gebeugt. Führ die Arme vor der Brust zusammen und spann die Brust an." },
        { titel: "Zurück", text: "Lass die Arme langsam in die Ausgangsposition zurückgehen, bis du eine Dehnung in der Brust spürst. Zieh die Arme nicht hinter den Körper." }
      ],
      en: [
        { titel: "Setup", text: "Adjust the seat so the handles are at chest height. Keep your back and head against the pad." },
        { titel: "Bring together", text: "Grip the handles with a slight bend in your elbows. Bring your arms together in front of your chest and squeeze." },
        { titel: "Return", text: "Let your arms go back slowly until you feel a stretch in your chest. Do not pull your arms behind your body." }
      ]
    },
    fehler: { de: "Die Schultern ziehen nach vorn oder oben. Halt sie unten und den Rücken am Polster.", en: "Your shoulders creep forward or up. Keep them down and your back against the pad." }
  },
  "brust-dips": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stütz dich auf den Barren, die Arme gestreckt. Beug den Oberkörper leicht nach vorn und kreuz die Beine hinter dir." },
        { titel: "Absenken", text: "Beug die Ellbogen und senk dich kontrolliert, bis die Oberarme etwa waagerecht sind. Die Ellbogen zeigen leicht nach außen." },
        { titel: "Hochdrücken", text: "Drück dich kräftig zurück nach oben, bis die Arme fast gestreckt sind." }
      ],
      en: [
        { titel: "Setup", text: "Support yourself on the bars with your arms straight. Lean your torso slightly forward and cross your legs behind you." },
        { titel: "Lower", text: "Bend your elbows and lower under control until your upper arms are about parallel to the floor. Your elbows flare out slightly." },
        { titel: "Press", text: "Push back up forcefully until your arms are almost straight." }
      ]
    },
    fehler: { de: "Du sackst zu tief ab und die Schultern rollen nach vorn. Dann belastest du das Schultergelenk unnötig.", en: "You sink too deep and your shoulders roll forward, which loads the shoulder joint needlessly." },
    sicherheit: { de: "Wenn du dabei Schulterschmerzen hast, geh weniger tief oder nimm die Unterstützungsmaschine.", en: "If you feel shoulder pain, go less deep or use the assisted dip machine." }
  },
  "liegestuetze": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stütz dich auf die Hände, etwas breiter als schulterbreit, die Füße hüftbreit. Körper, Hüfte und Beine bilden eine gerade Linie." },
        { titel: "Spannung", text: "Spann Bauch und Gesäß an. Die Hüfte hängt nicht durch." },
        { titel: "Absenken", text: "Beug die Ellbogen und senk die Brust kontrolliert Richtung Boden. Die Ellbogen zeigen schräg nach hinten, etwa 45° zum Körper." },
        { titel: "Hochdrücken", text: "Drück dich kraftvoll nach oben, bis die Arme fast gestreckt sind." }
      ],
      en: [
        { titel: "Setup", text: "Support yourself on your hands, slightly wider than shoulder width, with feet hip width apart. Your body, hips and legs form a straight line." },
        { titel: "Brace", text: "Tighten your abs and glutes. Do not let your hips sag." },
        { titel: "Lower", text: "Bend your elbows and lower your chest toward the floor under control. Your elbows angle back about 45° from your body." },
        { titel: "Press", text: "Push up with force until your arms are almost straight." }
      ]
    },
    fehler: { de: "Die Hüfte hängt durch oder ragt nach oben, oder die Ellbogen gehen im rechten Winkel zur Seite.", en: "Your hips sag or pike up, or your elbows flare straight out to the sides." },
    tipp: { de: "Zu schwer? Stütz die Hände auf eine Bank oder die Knie auf den Boden.", en: "Too hard? Place your hands on a bench or your knees on the floor." }
  },
  "kreuzheben": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Tritt so an die Stange, dass sie über der Mitte deiner Füße liegt. Die Füße stehen hüftbreit. Beug dich nach unten und greif die Stange etwa schulterbreit, die Arme außerhalb der Knie." },
        { titel: "Spannung aufbauen", text: "Zieh die Schienbeine an die Stange. Heb die Brust, der Rücken bleibt gerade. Spann die Latissimus-Muskeln an (stell dir vor, du klemmst Orangen unter die Achseln). Atme tief in den Bauch ein und spann den Rumpf fest an." },
        { titel: "Anheben", text: "Drück die Füße in den Boden, als wolltest du ihn wegdrücken. Die Stange bleibt eng am Körper und bewegt sich gerade nach oben. Hüfte und Schultern steigen gleichzeitig." },
        { titel: "Oben und ab", text: "Steh oben aufrecht, die Hüfte gestreckt, ohne dich nach hinten zu lehnen. Setz die Stange kontrolliert wieder ab, die Hüfte geht zuerst nach hinten." }
      ],
      en: [
        { titel: "Setup", text: "Step up so the bar is over the middle of your feet. Feet hip width apart. Bend down and grip the bar about shoulder width, arms outside your knees." },
        { titel: "Build tension", text: "Bring your shins to the bar. Lift your chest and keep your back straight. Tighten your lats (imagine squeezing oranges under your armpits). Take a deep breath into your belly and brace your trunk." },
        { titel: "Lift", text: "Push your feet into the floor as if pushing it away. Keep the bar close to your body, moving straight up. Hips and shoulders rise together." },
        { titel: "Top and down", text: "Stand tall at the top with hips extended, without leaning back. Lower the bar under control, hips go back first." }
      ]
    },
    fehler: { de: "Der Rücken rundet sich, oder die Stange driftet vom Körper weg.", en: "Your back rounds, or the bar drifts away from your body." },
    sicherheit: { de: "Lieber ein leichteres Gewicht mit sauberer Haltung. Wenn sich der Rücken rundet, ist das Gewicht zu schwer.", en: "Lighter weight with clean form beats heavy weight. If your back rounds, the weight is too heavy." }
  },
  "klimmzuege": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Greif die Stange im Obergriff, etwas breiter als schulterbreit. Häng frei mit gestreckten Armen. Die Schultern sind aktiv, du hängst nicht schlaff in den Gelenken." },
        { titel: "Hochziehen", text: "Zieh die Schulterblätter nach unten und die Ellbogen zu den Hüften. Zieh dich hoch, bis das Kinn über der Stange ist." },
        { titel: "Absenken", text: "Lass dich kontrolliert und langsam bis zum Hang mit gestreckten Armen ab." }
      ],
      en: [
        { titel: "Setup", text: "Grip the bar overhand, a bit wider than shoulder width. Hang with straight arms. Keep your shoulders engaged, do not hang limp in your joints." },
        { titel: "Pull up", text: "Pull your shoulder blades down and your elbows toward your hips. Pull until your chin is above the bar." },
        { titel: "Lower", text: "Lower yourself slowly and under control to a hang with straight arms." }
      ]
    },
    fehler: { de: "Du schwingst mit den Beinen oder der ganze Körper pendelt.", en: "Swinging your legs or letting your whole body pendulum." },
    tipp: { de: "Noch zu schwer? Nimm die Unterstützungsmaschine oder ein Band.", en: "Still too hard? Use the assisted machine or a band." }
  },
  "latzug": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Stell das Kniepolster so ein, dass deine Oberschenkel fest anliegen. Greif die Stange im Obergriff, etwas breiter als schulterbreit." },
        { titel: "Ziehen", text: "Lehn den Oberkörper leicht nach hinten. Zieh die Stange zur oberen Brust. Die Ellbogen gehen nach unten und leicht hinten, die Schulterblätter sinken." },
        { titel: "Zurück", text: "Lass die Stange langsam nach oben, bis die Arme fast gestreckt sind. Spür die Dehnung im Rücken." }
      ],
      en: [
        { titel: "Setup", text: "Adjust the knee pad so your thighs are held firmly. Grip the bar overhand, slightly wider than shoulder width." },
        { titel: "Pull", text: "Lean your torso back slightly. Pull the bar to your upper chest. Your elbows go down and slightly back, your shoulder blades move down." },
        { titel: "Return", text: "Let the bar rise slowly until your arms are almost straight. Feel the stretch in your back." }
      ]
    },
    fehler: { de: "Du lehnst dich weit zurück und ziehst mit Schwung. Das Gewicht ist dann zu schwer.", en: "Leaning far back and pulling with momentum. The weight is too heavy." },
    tipp: { de: "Studien finden beim Obergriff meist mehr Aktivität im Latissimus als im Untergriff. Zur Griffbreite sind sie uneinheitlich, ein mittlerer Griff ist ein guter Start.", en: "Studies mostly find more lat activity with an overhand grip than underhand. Results on grip width are mixed, a medium grip is a good start." }
  },
  "langhantelrudern": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh hüftbreit, die Stange hängt vor dir. Beug die Hüfte nach hinten und den Oberkörper nach vorn, die Knie sind leicht gebeugt. Der Rücken bleibt gerade, der Oberkörper etwa 45° bis waagerecht. Greif die Stange etwas breiter als schulterbreit." },
        { titel: "Rudern", text: "Zieh die Stange zum Bauchnabel. Die Ellbogen gehen nach hinten und nah am Körper. Die Schulterblätter ziehen oben zusammen." },
        { titel: "Absenken", text: "Lass die Stange kontrolliert wieder ab, bis die Arme gestreckt sind. Die Haltung des Oberkörpers ändert sich nicht." }
      ],
      en: [
        { titel: "Setup", text: "Stand hip width apart with the bar in front of you. Push your hips back and lean forward, knees slightly bent. Keep your back straight, torso about 45° to parallel. Grip the bar a little wider than shoulder width." },
        { titel: "Row", text: "Pull the bar toward your navel. Elbows go back and stay close to your body. Your shoulder blades squeeze together at the top." },
        { titel: "Lower", text: "Lower the bar under control until your arms are straight. Your torso angle does not change." }
      ]
    },
    fehler: { de: "Du richtest dich beim Ziehen auf und holst Schwung aus dem Rücken.", en: "Standing up as you pull and using momentum from your back." },
    sicherheit: { de: "Der Rücken darf sich nicht runden. Nimm im Zweifel weniger Gewicht.", en: "Your back must not round. When in doubt, use less weight." }
  },
  "kabelrudern": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz dich, die Füße stehen fest auf der Fußplatte, die Knie sind leicht gebeugt. Greif den Griff, der Rücken ist gerade, der Oberkörper aufrecht." },
        { titel: "Rudern", text: "Zieh den Griff zum Bauch. Die Ellbogen gehen nah am Körper nach hinten, die Schulterblätter ziehen zusammen." },
        { titel: "Zurück", text: "Lass die Arme langsam wieder nach vorn, bis du eine Dehnung zwischen den Schulterblättern spürst. Der Oberkörper bleibt ruhig." }
      ],
      en: [
        { titel: "Setup", text: "Sit with your feet firmly on the platform, knees slightly bent. Grab the handle, back straight, torso upright." },
        { titel: "Row", text: "Pull the handle to your stomach. Your elbows go back close to your body, shoulder blades squeeze together." },
        { titel: "Return", text: "Let your arms go forward slowly until you feel a stretch between your shoulder blades. Your torso stays still." }
      ]
    },
    fehler: { de: "Du lehnst dich beim Ziehen weit zurück und beim Zurückgehen weit nach vorn.", en: "Leaning far back as you pull and far forward as you return." }
  },
  "kurzhantelrudern": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stütz eine Hand und das gleiche Knie auf eine Bank. Der Rücken ist gerade und etwa waagerecht. Die andere Hand hält die Hantel mit gestrecktem Arm." },
        { titel: "Rudern", text: "Zieh die Hantel zur Hüfte. Der Ellbogen geht nah am Körper nach hinten und oben." },
        { titel: "Absenken", text: "Lass die Hantel kontrolliert wieder ab, bis der Arm gestreckt ist. Der Oberkörper dreht sich nicht mit." }
      ],
      en: [
        { titel: "Setup", text: "Place one hand and the same-side knee on a bench. Keep your back straight and about parallel to the floor. Your other hand holds the dumbbell with a straight arm." },
        { titel: "Row", text: "Pull the dumbbell toward your hip. Your elbow goes back and up close to your body." },
        { titel: "Lower", text: "Lower the dumbbell under control until your arm is straight. Your torso does not twist." }
      ]
    },
    fehler: { de: "Du drehst den Oberkörper mit und ziehst mit Schwung.", en: "Twisting your torso and using momentum." }
  },
  "face-pulls": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Stell das Seil am Kabelzug auf Augenhöhe oder etwas höher. Greif beide Seilenden, geh einen Schritt zurück, bis das Seil gespannt ist." },
        { titel: "Ziehen", text: "Zieh das Seil zum Gesicht, Richtung Stirn oder Augen. Die Ellbogen sind hoch und gehen nach hinten. Zieh am Ende die Seilenden auseinander, die Hände bewegen sich nach hinten." },
        { titel: "Zurück", text: "Lass das Seil kontrolliert wieder nach vorn gehen." }
      ],
      en: [
        { titel: "Setup", text: "Set the rope on the cable machine at eye level or slightly higher. Grab both ends and step back until the rope is tight." },
        { titel: "Pull", text: "Pull the rope toward your face, toward your forehead or eyes. Elbows are high and move back. At the end, pull the rope ends apart so your hands move back." },
        { titel: "Return", text: "Let the rope move forward under control." }
      ]
    },
    fehler: { de: "Das Gewicht ist zu schwer, du lehnst dich zurück oder streckst den Kopf nach vorn.", en: "Too much weight, leaning back, or pushing your head forward." },
    tipp: { de: "Wähle ein leichtes Gewicht und viele saubere Wiederholungen.", en: "Use a light weight and many clean reps." }
  },
  "schulterdruecken": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh oder sitz aufrecht. Die Stange liegt vorn auf den Schultern, die Hände etwas breiter als schulterbreit, die Unterarme senkrecht." },
        { titel: "Spannung", text: "Spann Bauch und Gesäß an. Der untere Rücken bleibt neutral, kein Hohlkreuz." },
        { titel: "Drücken", text: "Drück die Stange nach oben, bis die Arme fast gestreckt sind. Beweg den Kopf kurz nach hinten, damit die Stange gerade nach oben läuft, und schieb ihn dann unter die Stange." },
        { titel: "Absenken", text: "Senk die Stange kontrolliert zurück auf die Schultern." }
      ],
      en: [
        { titel: "Setup", text: "Stand or sit upright. The bar rests on your front shoulders, hands a bit wider than shoulder width, forearms vertical." },
        { titel: "Brace", text: "Tighten your abs and glutes. Keep your lower back neutral, no arch." },
        { titel: "Press", text: "Press the bar up until your arms are almost straight. Move your head back briefly so the bar travels straight up, then push your head under the bar." },
        { titel: "Lower", text: "Lower the bar back to your shoulders under control." }
      ]
    },
    fehler: { de: "Du lehnst dich zurück und machst ein Hohlkreuz.", en: "Leaning back and arching your lower back." },
    sicherheit: { de: "Bei Schulterschmerzen nimm Kurzhanteln und einen etwas schmaleren Griff.", en: "With shoulder pain, use dumbbells and a slightly narrower grip." }
  },
  "military-press": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh aufrecht, die Füße hüftbreit, die Beine gestreckt. Die Stange liegt auf den Schultern, die Hände etwas breiter als schulterbreit." },
        { titel: "Spannung", text: "Spann Gesäß und Bauch fest an. Die Beine schwingen nicht mit, der Rücken bleibt gerade." },
        { titel: "Drücken", text: "Drück die Stange gerade nach oben, bis die Arme gestreckt sind. Der Kopf geht kurz zurück, dann wieder unter die Stange." },
        { titel: "Absenken", text: "Senk die Stange kontrolliert zurück." }
      ],
      en: [
        { titel: "Setup", text: "Stand tall, feet hip width, legs straight. The bar rests on your shoulders, hands a bit wider than shoulder width." },
        { titel: "Brace", text: "Tighten your glutes and abs hard. No leg drive, keep your back straight." },
        { titel: "Press", text: "Press the bar straight up until your arms are straight. Move your head back briefly, then back under the bar." },
        { titel: "Lower", text: "Lower the bar under control." }
      ]
    },
    fehler: { de: "Du holst Schwung aus den Knien oder lehnst dich zurück. Das ist keine Military Press mehr, sondern ein Push Press.", en: "Using momentum from your knees or leaning back. That is a push press, not a military press." }
  },
  "seitheben": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh aufrecht, je eine Hantel seitlich neben den Oberschenkeln. Beug die Ellbogen leicht." },
        { titel: "Heben", text: "Heb die Arme seitlich bis auf Schulterhöhe. Der Ellbogen führt, die Hand ist etwa auf gleicher Höhe oder leicht darunter." },
        { titel: "Senken", text: "Lass die Hanteln langsam zurückgehen." }
      ],
      en: [
        { titel: "Setup", text: "Stand tall with a dumbbell at each side of your thighs. Bend your elbows slightly." },
        { titel: "Raise", text: "Raise your arms to the sides up to shoulder height. Your elbow leads, your hand is at about the same height or slightly below." },
        { titel: "Lower", text: "Let the dumbbells come down slowly." }
      ]
    },
    fehler: { de: "Du holst Schwung aus dem Oberkörper oder hebst die Schultern zu den Ohren.", en: "Using momentum from your torso, or shrugging your shoulders toward your ears." },
    tipp: { de: "Nimm ein leichtes Gewicht. Die seitliche Schulter ist ein kleiner Muskel.", en: "Use a light weight. The side delt is a small muscle." }
  },
  "frontheben": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh aufrecht, je eine Hantel vor den Oberschenkeln, die Handflächen zeigen zu dir. Die Ellbogen sind leicht gebeugt." },
        { titel: "Heben", text: "Heb einen Arm gerade nach vorn bis auf Schulterhöhe." },
        { titel: "Senken", text: "Lass ihn langsam zurückgehen. Wechsle die Seite oder heb beide abwechselnd." }
      ],
      en: [
        { titel: "Setup", text: "Stand tall with a dumbbell in front of each thigh, palms facing you. Elbows slightly bent." },
        { titel: "Raise", text: "Raise one arm straight forward to shoulder height." },
        { titel: "Lower", text: "Lower it slowly. Switch sides or alternate both arms." }
      ]
    },
    fehler: { de: "Du holst Schwung mit dem Rücken oder hebst über Schulterhöhe.", en: "Swinging with your back, or raising above shoulder height." }
  },
  "reverse-flys": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Beug dich mit geradem Rücken nach vorn, der Oberkörper etwa waagerecht. Die Hanteln hängen unter der Brust, die Ellbogen sind leicht gebeugt. Alternativ nimm die Maschine (Butterfly umgekehrt)." },
        { titel: "Heben", text: "Heb die Arme seitlich nach oben, bis sie etwa auf Schulterhöhe sind. Zieh die Schulterblätter am Ende leicht zusammen." },
        { titel: "Senken", text: "Lass die Arme kontrolliert wieder ab." }
      ],
      en: [
        { titel: "Setup", text: "Bend forward with a straight back, torso about parallel to the floor. Dumbbells hang below your chest, elbows slightly bent. Or use the machine (reverse pec deck)." },
        { titel: "Raise", text: "Raise your arms out to the sides to about shoulder height. Squeeze your shoulder blades together slightly at the end." },
        { titel: "Lower", text: "Lower your arms under control." }
      ]
    },
    fehler: { de: "Du holst Schwung oder ziehst mit dem Trapez nach oben. Das Gewicht ist zu schwer.", en: "Using momentum or pulling up with your traps. The weight is too heavy." }
  },
  "langhantelcurls": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh aufrecht, die Füße hüftbreit. Greif die Stange im Untergriff, etwa schulterbreit. Die Arme hängen gestreckt, die Ellbogen am Körper." },
        { titel: "Curlen", text: "Beug die Ellbogen und zieh die Stange nach oben zu den Schultern. Die Ellbogen bleiben seitlich am Körper." },
        { titel: "Absenken", text: "Lass die Stange langsam und kontrolliert wieder ab, bis die Arme gestreckt sind." }
      ],
      en: [
        { titel: "Setup", text: "Stand tall, feet hip width apart. Grip the bar underhand, about shoulder width. Arms hang straight, elbows at your sides." },
        { titel: "Curl", text: "Bend your elbows and curl the bar up toward your shoulders. Your elbows stay at your sides." },
        { titel: "Lower", text: "Lower the bar slowly and under control until your arms are straight." }
      ]
    },
    fehler: { de: "Du lehnst dich nach hinten und holst Schwung aus dem Rücken. Dann ist das Gewicht zu schwer.", en: "Leaning back and using momentum from your back. The weight is too heavy." }
  },
  "kurzhantelcurls": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh oder sitz aufrecht, je eine Hantel in den Händen, die Handflächen zeigen nach vorn. Die Ellbogen sind am Körper." },
        { titel: "Curlen", text: "Beug einen Arm und zieh die Hantel nach oben zur Schulter. Dreh die Hand dabei leicht nach außen. Die Ellbogen bleiben am Körper." },
        { titel: "Absenken", text: "Lass die Hantel langsam wieder ab. Wechsle die Seite oder curle beide abwechselnd." }
      ],
      en: [
        { titel: "Setup", text: "Stand or sit tall with a dumbbell in each hand, palms facing forward. Elbows at your sides." },
        { titel: "Curl", text: "Bend one arm and curl the dumbbell up toward your shoulder. Turn your hand slightly outward as you go. Elbows stay at your sides." },
        { titel: "Lower", text: "Lower the dumbbell slowly. Switch sides or alternate arms." }
      ]
    },
    fehler: { de: "Der Ellbogen wandert nach vorn oder du schwingst mit dem Oberkörper.", en: "Your elbow drifts forward or you swing your torso." }
  },
  "hammercurls": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh aufrecht, je eine Hantel seitlich, die Handflächen zeigen zueinander (Hammergriff)." },
        { titel: "Curlen", text: "Zieh eine Hantel nach oben zur Schulter. Die Hand behält den Hammergriff, die Ellbogen bleiben am Körper." },
        { titel: "Absenken", text: "Lass sie langsam wieder ab. Wechsle die Seite." }
      ],
      en: [
        { titel: "Setup", text: "Stand tall with a dumbbell at each side, palms facing each other (hammer grip)." },
        { titel: "Curl", text: "Curl one dumbbell up toward your shoulder. Your hand keeps the hammer grip, elbows stay at your sides." },
        { titel: "Lower", text: "Lower it slowly. Switch sides." }
      ]
    },
    fehler: { de: "Du schwingst mit dem Oberkörper oder die Ellbogen wandern nach vorn.", en: "Swinging your torso or letting your elbows drift forward." }
  },
  "scottcurls": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Setz dich an die Scottbank, die Oberarme liegen flach auf dem Polster. Greif die Stange im Untergriff." },
        { titel: "Curlen", text: "Beug die Ellbogen und zieh die Stange nach oben. Die Oberarme bleiben auf dem Polster." },
        { titel: "Absenken", text: "Lass die Stange langsam ab, bis die Arme fast gestreckt sind. Streck sie nicht ruckartig durch, das belastet den Ellbogen." }
      ],
      en: [
        { titel: "Setup", text: "Sit at the preacher bench with your upper arms flat on the pad. Grip the bar underhand." },
        { titel: "Curl", text: "Bend your elbows and curl the bar up. Your upper arms stay on the pad." },
        { titel: "Lower", text: "Lower the bar slowly until your arms are almost straight. Do not snap them straight, that stresses the elbow." }
      ]
    },
    fehler: { de: "Du lässt die Stange unten fallen, oder die Schultern heben vom Polster ab.", en: "Dropping the bar at the bottom, or your shoulders lifting off the pad." },
    sicherheit: { de: "Streck die Ellbogen unten nicht ruckartig durch.", en: "Do not snap your elbows straight at the bottom." }
  },
  "trizepsdruecken-kabel": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stell dich vor den Kabelzug, der Griff oder das Seil hängt oben. Greif ihn mit gebeugten Ellbogen, die Oberarme sind am Körper." },
        { titel: "Drücken", text: "Drück den Griff nach unten, bis die Arme gestreckt sind. Spann den Trizeps unten kurz an." },
        { titel: "Zurück", text: "Lass den Griff langsam nach oben gehen, bis die Unterarme etwa waagerecht sind. Die Ellbogen bleiben am Körper." }
      ],
      en: [
        { titel: "Setup", text: "Stand in front of the cable machine with the handle or rope at the top. Grab it with your elbows bent and your upper arms at your sides." },
        { titel: "Press down", text: "Press the handle down until your arms are straight. Squeeze your triceps briefly at the bottom." },
        { titel: "Return", text: "Let the handle rise slowly until your forearms are about parallel to the floor. Your elbows stay at your sides." }
      ]
    },
    fehler: { de: "Die Ellbogen wandern nach vorn oder du lehnst dich auf den Griff.", en: "Your elbows drift forward or you lean over the handle." }
  },
  "ueberkopf-trizepsstrecken": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Steh oder sitz aufrecht und halt eine Hantel oder ein Seil mit beiden Händen über dem Kopf. Die Arme sind gestreckt, die Ellbogen zeigen nach vorn." },
        { titel: "Absenken", text: "Beug die Ellbogen und senk das Gewicht hinter den Kopf. Die Oberarme bleiben nah am Kopf." },
        { titel: "Strecken", text: "Streck die Arme wieder nach oben. Spann den Trizeps oben an." }
      ],
      en: [
        { titel: "Setup", text: "Stand or sit tall and hold a dumbbell or rope overhead with both hands. Arms are straight, elbows point forward." },
        { titel: "Lower", text: "Bend your elbows and lower the weight behind your head. Your upper arms stay close to your head." },
        { titel: "Extend", text: "Straighten your arms back up. Squeeze your triceps at the top." }
      ]
    },
    fehler: { de: "Die Ellbogen fallen nach außen oder der Rücken wird zum Hohlkreuz.", en: "Your elbows flare out or your back arches." },
    sicherheit: { de: "Wähle ein Gewicht, das du kontrolliert hinter dem Kopf bewegen kannst.", en: "Choose a weight you can move behind your head under control." }
  },
  "french-press": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf eine Bank, die Stange hältst du mit gestreckten Armen über der Brust. Greif sie etwa schulterbreit im Obergriff." },
        { titel: "Absenken", text: "Beug nur die Ellbogen und senk die Stange kontrolliert zur Stirn oder knapp dahinter. Die Oberarme bleiben fast senkrecht." },
        { titel: "Strecken", text: "Streck die Arme wieder, bis sie fast gerade sind." }
      ],
      en: [
        { titel: "Setup", text: "Lie on a bench and hold the bar over your chest with straight arms. Grip it overhand, about shoulder width." },
        { titel: "Lower", text: "Bend only your elbows and lower the bar under control toward your forehead or just behind it. Your upper arms stay almost vertical." },
        { titel: "Extend", text: "Straighten your arms until they are almost straight." }
      ]
    },
    fehler: { de: "Die Ellbogen fallen nach außen oder die Stange wandert zu weit nach hinten.", en: "Your elbows flare out or the bar drifts too far back." },
    sicherheit: { de: "Die Stange bewegt sich dicht am Kopf. Nimm deshalb ein Gewicht, das du sicher kontrollierst, und trainiere möglichst mit Trainingspartner.", en: "Use a weight you can control, the bar is close to your head. Train with a spotter if possible." }
  },
  "enges-bankdruecken-lh": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich wie beim Bankdrücken hin. Greif die Stange etwa schulterbreit, nicht enger. Die Handgelenke bleiben gerade." },
        { titel: "Absenken", text: "Senk die Stange kontrolliert zur unteren Brust. Die Ellbogen bleiben nah am Körper." },
        { titel: "Drücken", text: "Drück die Stange nach oben, bis die Arme fast gestreckt sind." }
      ],
      en: [
        { titel: "Setup", text: "Lie down as for bench press. Grip the bar about shoulder width, not narrower. Keep your wrists straight." },
        { titel: "Lower", text: "Lower the bar under control to your lower chest. Your elbows stay close to your body." },
        { titel: "Press", text: "Press the bar up until your arms are almost straight." }
      ]
    },
    fehler: { de: "Du greifst zu eng. Das belastet die Handgelenke. Schulterbreit reicht.", en: "Gripping too narrow. That stresses your wrists. Shoulder width is enough." },
    sicherheit: { de: "Wie beim Bankdrücken: Rack mit Sicherheitsbügeln oder Trainingspartner.", en: "As with bench press: use a rack with safety pins or a spotter." }
  },
  "crunches": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf den Rücken, die Knie sind gebeugt, die Füße stehen am Boden. Die Hände liegen seitlich am Kopf oder auf der Brust." },
        { titel: "Aufrollen", text: "Roll den Oberkörper ein kleines Stück nach oben, bis sich die Schulterblätter vom Boden lösen. Der Blick geht zur Decke, der Hals bleibt locker." },
        { titel: "Zurück", text: "Roll langsam wieder ab, bis du fast am Boden bist." }
      ],
      en: [
        { titel: "Setup", text: "Lie on your back with knees bent and feet on the floor. Hands at the sides of your head or across your chest." },
        { titel: "Curl up", text: "Roll your upper body up a short distance until your shoulder blades leave the floor. Look at the ceiling and keep your neck relaxed." },
        { titel: "Return", text: "Roll back down slowly until you are almost on the floor." }
      ]
    },
    fehler: { de: "Du ziehst mit den Händen am Kopf oder richtest dich ganz auf. Die Bewegung kommt aus dem Bauch.", en: "Pulling on your head with your hands, or sitting all the way up. The movement comes from your abs." }
  },
  "cable-crunches": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Knie dich vor den Kabelzug, das Seil hängt oben. Halt das Seil mit beiden Händen neben dem Kopf." },
        { titel: "Beugen", text: "Roll den Oberkörper nach unten, indem du den Bauch zusammenziehst. Die Hüfte bleibt ruhig, die Ellbogen gehen Richtung Knie." },
        { titel: "Zurück", text: "Roll langsam wieder nach oben, bis der Rücken wieder gerade ist." }
      ],
      en: [
        { titel: "Setup", text: "Kneel in front of the cable machine with the rope at the top. Hold the rope beside your head with both hands." },
        { titel: "Crunch", text: "Curl your torso down by contracting your abs. Your hips stay still, your elbows move toward your knees." },
        { titel: "Return", text: "Roll back up slowly until your back is straight again." }
      ]
    },
    fehler: { de: "Du beugst nur aus der Hüfte und ziehst mit den Armen. Der Bauch soll die Bewegung machen.", en: "Bending only from the hips and pulling with your arms. Your abs should drive the movement." },
    sicherheit: { de: "Nimm ein Gewicht, bei dem du den Rücken rund und kontrolliert bewegen kannst.", en: "Use a weight at which you can curl your back under control." }
  },
  "beinheben": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf den Rücken, die Beine sind gestreckt, die Hände liegen unter dem Gesäß oder seitlich. Drück den unteren Rücken in den Boden." },
        { titel: "Heben", text: "Heb die gestreckten Beine nach oben, bis sie senkrecht zum Boden stehen." },
        { titel: "Senken", text: "Senk sie langsam wieder ab, kurz vor dem Boden stoppst du. Der untere Rücken bleibt am Boden." }
      ],
      en: [
        { titel: "Setup", text: "Lie on your back with straight legs, hands under your glutes or at your sides. Press your lower back into the floor." },
        { titel: "Raise", text: "Raise your straight legs until they are perpendicular to the floor." },
        { titel: "Lower", text: "Lower them slowly and stop just before the floor. Your lower back stays on the floor." }
      ]
    },
    fehler: { de: "Der untere Rücken wölbt sich vom Boden ab. Beug dann die Knie leicht oder senk die Beine weniger tief.", en: "Your lower back arches off the floor. Bend your knees slightly or lower your legs less far." }
  },
  "plank": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Stütz dich auf die Unterarme, die Ellbogen stehen unter den Schultern. Die Beine sind gestreckt, die Füße hüftbreit." },
        { titel: "Spannung", text: "Spann Bauch und Gesäß fest an. Körper, Hüfte und Beine bilden eine gerade Linie. Der Blick geht zum Boden." },
        { titel: "Halten", text: "Halt die Position und atme ruhig weiter." }
      ],
      en: [
        { titel: "Setup", text: "Support yourself on your forearms with your elbows under your shoulders. Legs straight, feet hip width apart." },
        { titel: "Brace", text: "Tighten your abs and glutes. Your body, hips and legs form a straight line. Look at the floor." },
        { titel: "Hold", text: "Hold the position and keep breathing calmly." }
      ]
    },
    fehler: { de: "Die Hüfte hängt durch oder ragt hoch. Beende die Übung, wenn du die gerade Linie nicht mehr halten kannst.", en: "Your hips sag or rise. End the set when you can no longer hold the straight line." }
  }
};
