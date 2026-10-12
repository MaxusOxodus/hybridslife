// Die Erklärungen der Muskelgruppe Ganzkörper. Sie kommen zu den Einträgen aus der erklaerungen.js dazu,
// deshalb muss diese Datei in der index.html nach der erklaerungen.js stehen. Aufbau wie dort:
// Schlüssel ist die Übungs-ID, pro Übung schritte (2 bis 3) und optional fehler, sicherheit, tipp, alle in de und en.
// Die Datei hat in der index.html und in der sw.js kein ?v=N: Der Service Worker holt sie bei jeder neuen VERSION frisch.
Object.assign(ERKLAERUNGEN, {
  "burpee": {
    schritte: {
      de: [
        { titel: "Runter", text: "Steh aufrecht, die Füße hüftbreit. Geh in die Hocke, setz die Hände schulterbreit vor den Füßen auf und spring mit beiden Füßen nach hinten in die Liegestützposition. Der Körper bildet eine gerade Linie." },
        { titel: "Liegestütz", text: "Senk die Brust zum Boden, atme ein und drück dich wieder hoch." },
        { titel: "Sprung", text: "Spring mit den Füßen zurück zu den Händen, richte dich auf und spring mit gestreckten Armen nach oben. Atme dabei aus. Lande weich und geh direkt in die nächste Wiederholung." }
      ],
      en: [
        { titel: "Down", text: "Stand upright with your feet hip width apart. Squat down, place your hands shoulder width apart in front of your feet and jump both feet back into a push-up position. Your body forms a straight line." },
        { titel: "Push-up", text: "Lower your chest to the floor, breathe in and push back up." },
        { titel: "Jump", text: "Jump your feet back to your hands, stand up and jump with your arms straight overhead. Breathe out. Land softly and go straight into the next rep." }
      ]
    },
    fehler: { de: "Die Hüfte hängt in der Liegestützposition durch, wenn du müde wirst.", en: "Your hips sag in the push-up position when you get tired." },
    tipp: { de: "Leichter wird es ohne Liegestütz, mit Schritten statt Sprüngen nach hinten und ohne den Sprung am Ende.", en: "It gets easier without the push-up, stepping back instead of jumping, and without the jump at the end." }
  }
});
