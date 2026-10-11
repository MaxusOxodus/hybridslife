# Gymstead

Trainings-App für Hybrid-Athleten (Krafttraining + Laufen).

## Ziel
- Phase 1: Gym-Workouts tracken (Übung, Sätze, Wdh., Gewicht, Datum)
- Phase 2: KI-Coach für Krafttraining
- Phase 3: Spiel: Punkte für Training sammeln und eigenes Gym bauen
- Später: Laufen ergänzen (Hybrid-Training)

## Technik
- HTML, CSS, JavaScript, später als PWA aufs Handy

## Design
- Es gibt zwei Stile: Glass (`glass.css`) ist der Standard, Klassisch ist unter Einstellungen → Design → Stil wählbar
- Ohne Eintrag im Speicher gilt Glass. Klassisch gilt nur, wenn in den Einstellungen ausdrücklich `stil: "klassisch"` steht
- Klassisch bleibt pixelgleich zum Tag `design-klassisch-v64`. Änderungen am Glass-Look gehören in die `glass.css`
- Ausnahme: Die Körper-Figuren der Muskelgruppen (`figuren.js`) sind in beiden Stilen gleich und weichen in Klassisch von v64 ab. Seit Version 81 zeigen alle Muskelgruppen den großen Oberkörper oder den großen Unterkörper, nur „Ganzkörper" und die Kachel „Eigene" zeigen die ganze Figur
- Ältere Figuren liegen unverändert als Backup im Projekt: `figuren-v1.js` und Tag `figuren-v1` (Version 79, alle Kacheln mit der ganzen Figur), `figuren-v2.js` und Tag `figuren-v2` (Version 80, großer Oberkörper nur bei Schultern, Bizeps, Trizeps und Unterarmen). Die Backup-Dateien nicht ändern, nicht löschen, nicht in der `index.html` laden und nicht in `DATEIEN` eintragen
- Zurückwechseln auf ein Backup: in der `index.html` (`<script src="figuren.js?v=N">`) und in `DATEIEN` der `sw.js` (`"figuren.js?v=" + VERSION`) jeweils `figuren.js` durch `figuren-v2.js` oder `figuren-v1.js` ersetzen und die Versionsnummer an allen elf Stellen erhöhen. Die `figuren.js` und die CSS-Regeln in der `style.css` bleiben dabei stehen, so geht es auf demselben Weg wieder vorwärts

## Wie du mit mir arbeitest
- Ich lerne gerade programmieren. Erklär jede Änderung kurz auf Deutsch
- Mach bei größeren Aufgaben erst einen Plan und warte auf mein OK
- Ändere nur das, worum ich bitte
- Versionsnummer: Sie steht an elf Stellen und ist überall gleich: `style.css?v=N`, `glass.css?v=N`, `texte.js?v=N`, `uebungen.js?v=N`, `erklaerungen.js?v=N`, `raenge.js?v=N`, `bilder.js?v=N`, `vorlagen.js?v=N`, `figuren.js?v=N` und `app.js?v=N` in der `index.html` sowie `const VERSION = N` in der `sw.js`. Bei jeder Änderung an einer Datei der App (`index.html`, `style.css`, `glass.css`, `texte.js`, `uebungen.js`, `erklaerungen.js`, `erklaerungen-*.js`, `raenge.js`, `bilder.js`, `vorlagen.js`, `figuren.js`, `app.js`, `sw.js`, `manifest.json`, `icons/`) erhöhst du im selben Commit alle elf um 1. Der Service Worker liefert die App aus seinem Cache und holt neue Dateien erst, wenn sich die Nummer in der `sw.js` ändert, sonst bleibt nach dem Push die alte Version auf dem Handy
- Neue Dateien der App (z. B. weitere Icons oder Skripte) trägst du in die Liste `DATEIEN` in der `sw.js` ein, sonst fehlen sie offline
- Erklärungen: Die ersten 40 stehen in der `erklaerungen.js` und bleiben unverändert. Alle weiteren stehen pro Muskelgruppe in einer eigenen Datei (`erklaerungen-brust.js` seit Version 82), die ihre Einträge an `ERKLAERUNGEN` anhängt. Diese Dateien stehen in der `index.html` direkt nach der `erklaerungen.js` und in `DATEIEN`, beide Male ohne `?v=N`. So bleibt es bei elf Stellen für die Versionsnummer. Die Nummer steigt trotzdem bei jeder Änderung an einer dieser Dateien, sonst holt der Service Worker sie nicht neu
- Ein Paket Erklärungen zurücknehmen: die Zeile der Datei in der `index.html` und in `DATEIEN` entfernen und die Versionsnummer an allen elf Stellen erhöhen. Die Übungen zeigen dann wieder „Erklärung kommt noch"
- Die Entwürfe der Texte liegen im Ordner `entwuerfe/`. Er gehört nicht zur App und wird nicht committet
