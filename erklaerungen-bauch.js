// Die Erklärungen der Muskelgruppe Bauch. Sie kommen zu den Einträgen aus der erklaerungen.js dazu,
// deshalb muss diese Datei in der index.html nach der erklaerungen.js stehen. Aufbau wie dort:
// Schlüssel ist die Übungs-ID, pro Übung schritte (2 bis 3) und optional fehler, sicherheit, tipp, alle in de und en.
// Die Datei hat in der index.html und in der sw.js kein ?v=N: Der Service Worker holt sie bei jeder neuen VERSION frisch.
Object.assign(ERKLAERUNGEN, {
  "kneeling-cable-crunch": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Häng das Seil an die obere Rolle. Knie dich davor und halt die Seilenden links und rechts neben dem Kopf. Die Hüfte ist über den Knien, der Rücken ist am Start gerade." },
        { titel: "Einrollen", text: "Roll den Oberkörper ein und zieh die Ellbogen in Richtung Knie. Atme dabei aus. Die Hüfte bleibt, wo sie ist." },
        { titel: "Zurück", text: "Richte dich langsam wieder auf, bis der Bauch gedehnt ist, und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Attach the rope to the high pulley. Kneel in front of it and hold the rope ends on either side of your head. Your hips are above your knees and your back is straight at the start." },
        { titel: "Crunch", text: "Curl your torso down and pull your elbows toward your knees. Breathe out. Your hips stay where they are." },
        { titel: "Return", text: "Come back up slowly until your abs are stretched and breathe in." }
      ]
    },
    fehler: { de: "Du setzt dich auf die Fersen zurück und ziehst mit Hüfte und Armen statt mit dem Bauch.", en: "You sit back onto your heels and pull with your hips and arms instead of your abs." },
    tipp: { de: "Leg etwas Weiches unter die Knie.", en: "Put something soft under your knees." }
  },
  "standing-cable-crunch": {
    schritte: {
      de: [
        { titel: "Aufbauen", text: "Häng das Seil an die obere Rolle. Dreh der Rolle den Rücken zu, halt die Seilenden neben dem Kopf oder vor der oberen Brust und geh einen Schritt nach vorn. Die Knie sind leicht gebeugt." },
        { titel: "Einrollen", text: "Roll den Oberkörper nach vorn unten ein, die Rippen gehen in Richtung Becken. Atme dabei aus." },
        { titel: "Zurück", text: "Richte dich langsam wieder auf und atme ein." }
      ],
      en: [
        { titel: "Set up", text: "Attach the rope to the high pulley. Turn your back to the pulley, hold the rope ends beside your head or in front of your upper chest and take a step forward. Your knees are slightly bent." },
        { titel: "Crunch", text: "Curl your torso forward and down, with your ribs moving toward your pelvis. Breathe out." },
        { titel: "Return", text: "Come back up slowly and breathe in." }
      ]
    },
    fehler: { de: "Du knickst in der Hüfte ab und verbeugst dich mit geradem Rücken. Der Rücken muss sich einrollen.", en: "You hinge at the hips and bow with a straight back. Your back has to round." }
  },
  "machine-crunch": {
    schritte: {
      de: [
        { titel: "Einstellen", text: "Steck den Stift und stell den Sitz so ein, dass das Polster oder die Griffe auf Höhe der oberen Brust sind. Hak die Füße unter die Rolle, falls es eine gibt." },
        { titel: "Einrollen", text: "Roll den Oberkörper nach vorn ein und atme aus. Die Rippen gehen in Richtung Becken." },
        { titel: "Zurück", text: "Lass dich langsam zurück und atme ein. Die Gewichtsplatten setzen nicht auf." }
      ],
      en: [
        { titel: "Set up", text: "Set the pin and adjust the seat so the pad or the handles are level with your upper chest. Hook your feet under the roller if there is one." },
        { titel: "Crunch", text: "Curl your torso forward and breathe out. Your ribs move toward your pelvis." },
        { titel: "Return", text: "Ease back slowly and breathe in. The weight plates do not touch down." }
      ]
    },
    fehler: { de: "Du ziehst mit den Armen an den Griffen, statt den Bauch arbeiten zu lassen.", en: "You pull on the handles with your arms instead of letting your abs do the work." }
  },
  "weighted-crunch": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf den Rücken, die Knie sind gebeugt, die Füße stehen am Boden. Halt eine Scheibe mit gekreuzten Armen auf der oberen Brust." },
        { titel: "Aufrollen", text: "Roll den Oberkörper ein, bis sich die Schulterblätter vom Boden lösen. Atme dabei aus." },
        { titel: "Zurück", text: "Roll langsam wieder ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Lie on your back with your knees bent and your feet on the floor. Hold a plate on your upper chest with your arms crossed." },
        { titel: "Curl up", text: "Curl your torso up until your shoulder blades come off the floor. Breathe out." },
        { titel: "Return", text: "Roll back down slowly and breathe in." }
      ]
    },
    fehler: { de: "Du holst Schwung, weil das Gewicht zu schwer ist.", en: "You use momentum because the weight is too heavy." },
    tipp: { de: "Hinter dem Kopf gehalten wird dasselbe Gewicht deutlich schwerer.", en: "Held behind your head, the same weight feels much heavier." }
  },
  "dumbbell-crunch": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf den Rücken, die Knie sind gebeugt, die Füße stehen am Boden. Halt eine Kurzhantel mit beiden Händen quer auf der oberen Brust." },
        { titel: "Aufrollen", text: "Roll den Oberkörper ein, bis sich die Schulterblätter vom Boden lösen. Atme dabei aus. Die Hantel bleibt an der Brust." },
        { titel: "Zurück", text: "Roll langsam wieder ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Lie on your back with your knees bent and your feet on the floor. Hold a dumbbell crosswise on your upper chest with both hands." },
        { titel: "Curl up", text: "Curl your torso up until your shoulder blades come off the floor. Breathe out. The dumbbell stays on your chest." },
        { titel: "Return", text: "Roll back down slowly and breathe in." }
      ]
    },
    fehler: { de: "Das Kinn drückt auf die Brust, und der Nacken verspannt sich.", en: "Your chin presses into your chest and your neck tenses up." }
  },
  "weighted-sit-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf den Rücken, die Knie sind gebeugt, die Füße stehen am Boden oder sind eingehakt. Halt eine Scheibe oder Hantel an der oberen Brust." },
        { titel: "Aufrichten", text: "Roll dich Wirbel für Wirbel auf, bis du aufrecht sitzt. Atme dabei aus." },
        { titel: "Abrollen", text: "Roll langsam wieder ab, bis die Schulterblätter den Boden berühren, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Lie on your back with your knees bent and your feet on the floor or hooked under something. Hold a plate or dumbbell at your upper chest." },
        { titel: "Sit up", text: "Roll up one vertebra at a time until you are sitting upright. Breathe out." },
        { titel: "Roll down", text: "Roll back down slowly until your shoulder blades touch the floor and breathe in." }
      ]
    },
    fehler: { de: "Du reißt dich mit geradem Rücken und Schwung hoch.", en: "You yank yourself up with a straight back and momentum." },
    sicherheit: { de: "Zieht es im unteren Rücken, nimm weniger Gewicht oder bleib bei Crunches.", en: "If you feel it pulling in your lower back, use less weight or stick with crunches." }
  },
  "sit-ups": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf den Rücken, die Knie sind gebeugt, die Füße stehen am Boden. Kreuz die Arme vor der Brust." },
        { titel: "Aufrichten", text: "Roll dich Wirbel für Wirbel auf, bis du aufrecht sitzt. Atme dabei aus." },
        { titel: "Abrollen", text: "Roll langsam wieder ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Lie on your back with your knees bent and your feet on the floor. Cross your arms over your chest." },
        { titel: "Sit up", text: "Roll up one vertebra at a time until you are sitting upright. Breathe out." },
        { titel: "Roll down", text: "Roll back down slowly and breathe in." }
      ]
    },
    fehler: { de: "Du ziehst mit den Händen am Kopf, oder die Füße heben ab.", en: "You pull on your head with your hands, or your feet lift off the floor." }
  },
  "decline-sit-up-eigen": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Hak die Füße in die Polster der Negativbank und leg dich langsam zurück. Kreuz die Arme vor der Brust." },
        { titel: "Aufrichten", text: "Roll dich auf, bis der Oberkörper aufrecht ist, und atme aus." },
        { titel: "Abrollen", text: "Roll langsam ab, bis der untere Rücken die Bank berührt, und atme ein. Die Schultern müssen nicht ganz abgelegt werden." }
      ],
      en: [
        { titel: "Setup", text: "Hook your feet into the pads of the decline bench and lean back slowly. Cross your arms over your chest." },
        { titel: "Sit up", text: "Roll up until your torso is upright and breathe out." },
        { titel: "Roll down", text: "Roll down slowly until your lower back touches the bench and breathe in. Your shoulders do not have to come all the way down." }
      ]
    },
    fehler: { de: "Du lässt dich nach hinten fallen und federst von der Bank ab.", en: "You drop back and bounce off the bench." },
    tipp: { de: "Je steiler die Bank, desto schwerer. Fang flach an.", en: "The steeper the bench, the harder it gets. Start with a low angle." }
  },
  "lying-leg-raise-eigen": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf den Rücken, die Beine sind gestreckt. Die Hände liegen neben dem Körper oder unter dem Gesäß. Drück den unteren Rücken in den Boden." },
        { titel: "Heben", text: "Heb die gestreckten Beine, bis sie senkrecht stehen, und atme aus." },
        { titel: "Senken", text: "Senk die Beine langsam, bis sie knapp über dem Boden sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Lie on your back with your legs straight. Your hands rest beside your body or under your glutes. Press your lower back into the floor." },
        { titel: "Raise", text: "Lift your straight legs until they are vertical and breathe out." },
        { titel: "Lower", text: "Lower your legs slowly until they are just above the floor and breathe in." }
      ]
    },
    fehler: { de: "Der untere Rücken hebt beim Senken vom Boden ab. Senk dann nur so weit, wie er liegen bleibt.", en: "Your lower back lifts off the floor as you lower. Then lower only as far as it stays down." }
  },
  "reverse-crunch-eigen": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf den Rücken, die Arme liegen neben dem Körper. Heb die Beine an, Hüfte und Knie sind rechtwinklig." },
        { titel: "Einrollen", text: "Zieh die Knie zur Brust und roll das Becken vom Boden, bis der untere Rücken abhebt. Atme dabei aus." },
        { titel: "Zurück", text: "Roll das Becken langsam wieder ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Lie on your back with your arms beside your body. Lift your legs so your hips and knees are at right angles." },
        { titel: "Curl in", text: "Pull your knees toward your chest and curl your pelvis off the floor until your lower back lifts. Breathe out." },
        { titel: "Return", text: "Roll your pelvis back down slowly and breathe in." }
      ]
    },
    fehler: { de: "Du schwingst die Beine, statt das Becken einzurollen.", en: "You swing your legs instead of curling your pelvis." }
  },
  "v-up": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf den Rücken, die Beine sind gestreckt, die Arme liegen gestreckt über dem Kopf." },
        { titel: "Zusammenklappen", text: "Heb Oberkörper und Beine gleichzeitig und führ die Hände zu den Füßen. Atme dabei aus. Du balancierst kurz auf dem Gesäß." },
        { titel: "Zurück", text: "Senk Oberkörper und Beine langsam ab, bis sie knapp über dem Boden sind, und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Lie on your back with your legs straight and your arms stretched out overhead." },
        { titel: "Fold up", text: "Lift your torso and legs at the same time and reach your hands toward your feet. Breathe out. You balance on your glutes for a moment." },
        { titel: "Return", text: "Lower your torso and legs slowly until they are just above the floor and breathe in." }
      ]
    },
    fehler: { de: "Du schwingst mit den Armen hoch und fällst zurück auf den Boden.", en: "You swing up with your arms and drop back to the floor." },
    tipp: { de: "Mit gebeugten Knien ist es leichter.", en: "It is easier with bent knees." }
  },
  "hollow-body-hold": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf den Rücken und drück den unteren Rücken in den Boden." },
        { titel: "Anheben", text: "Heb Schultern und gestreckte Beine ein kleines Stück vom Boden. Streck die Arme über den Kopf oder neben den Körper." },
        { titel: "Halten", text: "Halt die Position und atme ruhig weiter. Der untere Rücken bleibt am Boden." }
      ],
      en: [
        { titel: "Setup", text: "Lie on your back and press your lower back into the floor." },
        { titel: "Lift", text: "Lift your shoulders and straight legs slightly off the floor. Stretch your arms overhead or along your sides." },
        { titel: "Hold", text: "Hold the position and keep breathing calmly. Your lower back stays on the floor." }
      ]
    },
    fehler: { de: "Der untere Rücken hebt ab. Heb dann die Beine höher oder beug die Knie.", en: "Your lower back lifts off. Then raise your legs higher or bend your knees." }
  },
  "mountain-climbers": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Geh in die Liegestützposition, die Hände unter den Schultern, die Arme gestreckt. Der Körper bildet eine gerade Linie." },
        { titel: "Knie zur Brust", text: "Zieh ein Knie zügig zur Brust und stell den Fuß wieder zurück." },
        { titel: "Wechseln", text: "Zieh direkt das andere Knie nach vorn und wechsle im Laufrhythmus. Atme gleichmäßig weiter." }
      ],
      en: [
        { titel: "Setup", text: "Get into a push-up position with your hands under your shoulders and your arms straight. Your body forms a straight line." },
        { titel: "Knee to chest", text: "Drive one knee quickly toward your chest and put the foot back." },
        { titel: "Switch", text: "Bring the other knee forward right away and alternate at a running rhythm. Keep breathing steadily." }
      ]
    },
    fehler: { de: "Der Po geht nach oben, oder die Hüfte hüpft bei jedem Schritt.", en: "Your butt rises, or your hips bounce with every step." }
  },
  "hanging-knee-raise-eigen": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng im Obergriff schulterbreit an der Stange. Die Schultern sind aktiv, die Beine hängen ruhig." },
        { titel: "Heben", text: "Zieh die Knie nach oben in Richtung Brust und roll das Becken am Ende leicht ein. Atme dabei aus." },
        { titel: "Senken", text: "Lass die Beine langsam ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Hang from the bar with a shoulder-width overhand grip. Your shoulders are active and your legs hang still." },
        { titel: "Raise", text: "Pull your knees up toward your chest and curl your pelvis slightly at the top. Breathe out." },
        { titel: "Lower", text: "Lower your legs slowly and breathe in." }
      ]
    },
    fehler: { de: "Du schwingst vor und zurück. Starte jede Wiederholung aus dem ruhigen Hang.", en: "You swing back and forth. Start every rep from a still hang." }
  },
  "hanging-leg-raise-eigen": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng im Obergriff schulterbreit an der Stange. Die Schultern sind aktiv, die Beine sind gestreckt." },
        { titel: "Heben", text: "Heb die gestreckten Beine, bis sie mindestens waagerecht sind, und atme aus." },
        { titel: "Senken", text: "Senk die Beine langsam ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Hang from the bar with a shoulder-width overhand grip. Your shoulders are active and your legs are straight." },
        { titel: "Raise", text: "Lift your straight legs until they are at least horizontal and breathe out." },
        { titel: "Lower", text: "Lower your legs slowly and breathe in." }
      ]
    },
    fehler: { de: "Du schwingst die Beine hoch und lässt sie fallen.", en: "You swing your legs up and let them drop." },
    tipp: { de: "Wenn die Beine nicht gestreckt bleiben, üb zuerst das Knieheben im Hang.", en: "If your legs will not stay straight, practice the hanging knee raise first." }
  },
  "toes-to-bar": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Häng im Obergriff etwas breiter als schulterbreit an der Stange. Die Schultern sind aktiv." },
        { titel: "Heben", text: "Heb die gestreckten Beine und roll das Becken ein, bis die Zehen die Stange berühren. Atme dabei aus." },
        { titel: "Senken", text: "Senk die Beine kontrolliert ab und atme ein." }
      ],
      en: [
        { titel: "Setup", text: "Hang from the bar with an overhand grip slightly wider than shoulder width. Your shoulders are active." },
        { titel: "Raise", text: "Lift your straight legs and curl your pelvis until your toes touch the bar. Breathe out." },
        { titel: "Lower", text: "Lower your legs under control and breathe in." }
      ]
    },
    fehler: { de: "Die Knie beugen sich stark, oder der Körper pendelt unkontrolliert.", en: "Your knees bend a lot, or your body swings out of control." },
    sicherheit: { de: "Mach die Übung erst, wenn Beinheben im Hang sauber klappt. Hör auf, bevor der Griff aufgeht.", en: "Only do this exercise once your hanging leg raises are clean. Stop before your grip gives out." }
  },
  "ab-wheel-rollout-eigen": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Knie dich hin und greif das Rad mit beiden Händen unter den Schultern. Spann Bauch und Po an, der Rücken ist leicht rund." },
        { titel: "Ausrollen", text: "Roll das Rad langsam nach vorn, Hüfte und Schultern gehen gleichzeitig mit. Atme dabei ein. Geh nur so weit, wie der untere Rücken nicht durchhängt." },
        { titel: "Zurück", text: "Zieh das Rad mit dem Bauch zurück unter die Schultern und atme aus." }
      ],
      en: [
        { titel: "Setup", text: "Kneel down and grip the wheel with both hands under your shoulders. Brace your abs and glutes, with your back slightly rounded." },
        { titel: "Roll out", text: "Roll the wheel forward slowly, with your hips and shoulders moving together. Breathe in. Go only as far as you can without your lower back sagging." },
        { titel: "Return", text: "Pull the wheel back under your shoulders with your abs and breathe out." }
      ]
    },
    fehler: { de: "Die Hüfte bleibt hinten, und nur die Arme rollen nach vorn. Oder der Rücken hängt durch.", en: "Your hips stay back and only your arms roll forward. Or your back sags." },
    sicherheit: { de: "Hängt der untere Rücken durch, roll weniger weit. Leg etwas Weiches unter die Knie.", en: "If your lower back sags, do not roll out as far. Put something soft under your knees." }
  },
  "dragon-flag-eigen": {
    schritte: {
      de: [
        { titel: "Ausgangsposition", text: "Leg dich auf eine Bank und halt dich hinter dem Kopf an der Bank fest. Roll die Beine und die Hüfte hoch, bis nur noch die Schultern aufliegen und der Körper gestreckt nach oben zeigt." },
        { titel: "Absenken", text: "Senk den gestreckten Körper langsam ab, Hüfte und Beine bleiben in einer Linie. Atme dabei ein." },
        { titel: "Zurück", text: "Heb den Körper in derselben Linie wieder an, bevor Rücken oder Beine die Bank berühren. Atme dabei aus." }
      ],
      en: [
        { titel: "Setup", text: "Lie on a bench and hold on to it behind your head. Roll your legs and hips up until only your shoulders are on the bench and your body points straight up." },
        { titel: "Lower", text: "Lower your straight body slowly, keeping your hips and legs in one line. Breathe in." },
        { titel: "Return", text: "Raise your body again in the same line before your back or legs touch the bench. Breathe out." }
      ]
    },
    fehler: { de: "Die Hüfte knickt ein, und die Beine sinken allein ab.", en: "Your hips bend and your legs sink on their own." },
    sicherheit: { de: "Die Bank muss fest stehen. Das Gewicht liegt auf den Schultern, nicht auf dem Nacken. Fang mit angezogenen Knien und nur dem Absenken an.", en: "The bench must be stable. The weight rests on your shoulders, not your neck. Start with your knees tucked and only the lowering part." }
  }
});
