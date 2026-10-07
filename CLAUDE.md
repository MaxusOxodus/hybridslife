# Gymstead

Trainings-App für Hybrid-Athleten (Krafttraining + Laufen).

## Ziel
- Phase 1: Gym-Workouts tracken (Übung, Sätze, Wdh., Gewicht, Datum)
- Phase 2: KI-Coach für Krafttraining
- Phase 3: Spiel: Punkte für Training sammeln und eigenes Gym bauen
- Später: Laufen ergänzen (Hybrid-Training)

## Technik
- HTML, CSS, JavaScript, später als PWA aufs Handy

## Wie du mit mir arbeitest
- Ich lerne gerade programmieren. Erklär jede Änderung kurz auf Deutsch
- Mach bei größeren Aufgaben erst einen Plan und warte auf mein OK
- Ändere nur das, worum ich bitte
- Versionsnummer: Sie steht an drei Stellen und ist überall gleich: `style.css?v=N` und `app.js?v=N` in der `index.html` sowie `const VERSION = N` in der `sw.js`. Bei jeder Änderung an einer Datei der App (`index.html`, `style.css`, `app.js`, `sw.js`, `manifest.json`, `icons/`) erhöhst du im selben Commit alle drei um 1. Der Service Worker liefert die App aus seinem Cache und holt neue Dateien erst, wenn sich die Nummer in der `sw.js` ändert, sonst bleibt nach dem Push die alte Version auf dem Handy
- Neue Dateien der App (z. B. weitere Icons oder Skripte) trägst du in die Liste `DATEIEN` in der `sw.js` ein, sonst fehlen sie offline
