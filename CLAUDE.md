# Gymstead

Trainings-App für Athleten im Krafttraining (früher "Hybridslife", Repo-Name bleibt `hybridslife`). Sie ist bewusst keine Hybrid-App.

## Ziel
- Phase 1: Gym-Workouts tracken (Übung, Sätze, Wdh., Gewicht, RIR, Datum)
- Phase 2: KI-Coach für Krafttraining
- Phase 3: Spiel: Punkte für Training sammeln und eigenes Gym bauen
- Laufen ist nicht geplant (Stand 12.10.2026)

## Technik
- HTML, CSS, JavaScript. Die App läuft heute als PWA auf dem Homescreen des Handys. Eine native App ist erst ein späteres Ziel

## Design
- Es gibt zwei Stile: Glass (`glass.css`) ist der Standard, Klassisch ist unter Einstellungen → Design → Stil wählbar
- Ohne Eintrag im Speicher gilt Glass. Klassisch gilt nur, wenn in den Einstellungen ausdrücklich `stil: "klassisch"` steht
- Klassisch bleibt pixelgleich zum Tag `design-klassisch-v64`. Änderungen am Glass-Look gehören in die `glass.css`
- Ausnahme: Die Körper-Figuren der Muskelgruppen (`figuren.js`) sind in beiden Stilen gleich und weichen in Klassisch von v64 ab. Seit Version 81 zeigen alle Muskelgruppen den großen Oberkörper oder den großen Unterkörper, nur „Ganzkörper" und die Kachel „Eigene" zeigen die ganze Figur
- Ausnahme: Die Details eines Trainingstags (Tag-Sheet) und die Liste im Log (seit Version 93: je Tag eine Datumszeile, je Training eine Karte) gibt es in v64 noch nicht in dieser Form. Sie sehen in Klassisch anders aus als dort, der Glass-Look dazu steht trotzdem in der `glass.css`
- Ausnahme: In der Karte „Letztes Training" auf Home steht seit Version 94 das „kg" der Volumenzahl kleiner in derselben Zeile wie die Zahl, auch in Klassisch
- Ausnahme: Seit Version 95 sind der Gym-Tab und in den Einstellungen die Zeilen Konto, Abo verwalten und Blockierte Nutzer in beiden Stilen ausgeblendet, die Tab-Leiste zeigt vier statt fünf Tabs. Der Schalter `SHOW_PLATZHALTER` am Anfang der `app.js` holt sie mit `true` zurück, die Elemente tragen in der `index.html` das Merkmal `data-platzhalter`
- Ausnahme: Die Einführung (Rundgang, seit Version 96) gibt es in v64 nicht. Abdunkelung, Rahmen, Linie und Box stehen in der `style.css` (`#tour`, `.tour-...`) und sind nur zu sehen, solange ein Rundgang läuft. Der Glass-Look der Box steht in der `glass.css`. Die Merkmale `data-tour` in der `index.html` ändern am Aussehen nichts. In Phase 1 steht dazu in den Einstellungen unter Support die Zeile „Anleitung (Test)", auch in Klassisch
- Ausnahme: Wischgesten (seit Version 100) gibt es in v64 nicht. Sie ändern nur das Verhalten: In Ruhe sieht jedes Sheet in beiden Stilen aus wie vorher, beim Ziehen folgt es dem Finger und der dunkle Hintergrund wird heller. Neu in der `style.css` ist dafür nur `touch-action: none` an `.sheet-griff` und `.sheet-kopf`
- Ältere Figuren liegen unverändert als Backup im Projekt: `figuren-v1.js` und Tag `figuren-v1` (Version 79, alle Kacheln mit der ganzen Figur), `figuren-v2.js` und Tag `figuren-v2` (Version 80, großer Oberkörper nur bei Schultern, Bizeps, Trizeps und Unterarmen). Die Backup-Dateien nicht ändern, nicht löschen, nicht in der `index.html` laden und nicht in `DATEIEN` eintragen
- Zurückwechseln auf ein Backup: in der `index.html` (`<script src="figuren.js?v=N">`) und in `DATEIEN` der `sw.js` (`"figuren.js?v=" + VERSION`) jeweils `figuren.js` durch `figuren-v2.js` oder `figuren-v1.js` ersetzen und die Versionsnummer an allen elf Stellen erhöhen. Die `figuren.js` und die CSS-Regeln in der `style.css` bleiben dabei stehen, so geht es auf demselben Weg wieder vorwärts

## Wie du mit mir arbeitest
- Ich lerne gerade programmieren. Erklär jede Änderung kurz auf Deutsch
- Mach bei größeren Aufgaben erst einen Plan und warte auf mein OK
- Ändere nur das, worum ich bitte
- Versionsnummer: Sie steht an elf Stellen und ist überall gleich: `style.css?v=N`, `glass.css?v=N`, `texte.js?v=N`, `uebungen.js?v=N`, `erklaerungen.js?v=N`, `raenge.js?v=N`, `bilder.js?v=N`, `vorlagen.js?v=N`, `figuren.js?v=N` und `app.js?v=N` in der `index.html` sowie `const VERSION = N` in der `sw.js`. Bei jeder Änderung an einer Datei der App (`index.html`, `style.css`, `glass.css`, `texte.js`, `uebungen.js`, `erklaerungen.js`, `erklaerungen-*.js`, `raenge.js`, `bilder.js`, `vorlagen.js`, `figuren.js`, `einfuehrung.js`, `app.js`, `sw.js`, `manifest.json`, `icons/`) erhöhst du im selben Commit alle elf um 1. Der Service Worker liefert die App aus seinem Cache und holt neue Dateien erst, wenn sich die Nummer in der `sw.js` ändert, sonst bleibt nach dem Push die alte Version auf dem Handy
- Neue Dateien der App (z. B. weitere Icons oder Skripte) trägst du in die Liste `DATEIEN` in der `sw.js` ein, sonst fehlen sie offline
- Erklärungen: Die ersten 40 stehen in der `erklaerungen.js` und bleiben unverändert. Alle weiteren stehen pro Muskelgruppe in einer eigenen Datei (`erklaerungen-brust.js` seit Version 82), die ihre Einträge an `ERKLAERUNGEN` anhängt. Diese Dateien stehen in der `index.html` direkt nach der `erklaerungen.js` und in `DATEIEN`, beide Male ohne `?v=N`. So bleibt es bei elf Stellen für die Versionsnummer. Die Nummer steigt trotzdem bei jeder Änderung an einer dieser Dateien, sonst holt der Service Worker sie nicht neu
- Ein Paket Erklärungen zurücknehmen: die Zeile der Datei in der `index.html` und in `DATEIEN` entfernen und die Versionsnummer an allen elf Stellen erhöhen. Die Übungen zeigen dann wieder „Erklärung kommt noch"
- Einführung: Schritte, Figur und Motor des Rundgangs stehen in der `einfuehrung.js` (seit Version 96). Sie steht in der `index.html` direkt vor der `app.js` und in `DATEIEN`, beide Male ohne `?v=N`, wie die `erklaerungen-*.js`. So bleibt es bei elf Stellen. Die Texte der Schritte stehen dort direkt im Schritt (Deutsch und Englisch), nur die festen Wörter (`tour.…`) in der `texte.js`. Jedes erklärte Element trägt in der `index.html` ein Merkmal `data-tour="name"`, der Schritt nennt diesen Namen als `ziel`. Nach Änderungen an Schritten oder an erklärten Elementen in der Browser-Konsole `einfuehrungPruefen()` aufrufen: Die Funktion listet Schritte ohne gefundenes Element, mit unbekannter Pose oder fehlendem Text
- Schritte der Einführung: Jeder Schritt hat `bereich`, `seite`, `ziel`, `pose`, `titel { de, en }` und `text { de, en }`. Es gibt drei Bereiche: `"home"` (sechs Schritte, seit Version 98), `"training"` (fünf Schritte) und `"modus"` (Trainingsmodus, sieben Schritte, beide seit Version 99). Die Zeile „Anleitung (Test)" fragt, welcher Bereich starten soll (`einfuehrungWaehlen`), „Trainingsmodus" steht nur zur Wahl, solange ein Training läuft. Der Titel hat ein bis drei Wörter (einzige Ausnahme: „Deine Woche in Zahlen") und passt in eine Zeile, er darf fehlen. Der Text hat höchstens zwei kurze Sätze mit einfachen Wörtern, ohne Fachwörter. Er muss auch stimmen, wenn der Bereich noch leer ist (neuer Nutzer ohne Daten). Fehlt ein Element, wird der Schritt ausgelassen und nicht mitgezählt. Der Home-Rundgang springt beim Start zur aktuellen Woche. `einfuehrungPruefen()` meldet auch einen Titel, der nicht in jeder Sprache da ist
- Schritte im Training haben zusätzlich `ansicht` (`"uebersicht"` oder `"modus"`), freiwillig `zeigt` (`"eingabe"` oder `"pause"`) und freiwillig `braucht` (`"routine"`, `"training"` oder `"erklaerung"`, die Namen stehen in `EINFUEHRUNG_BRAUCHT`). `braucht` nennt, was da sein muss, damit es das Element gibt: Fehlt es, fällt der Schritt weg, und `einfuehrungPruefen()` nennt ihn nur als Hinweis, nicht als Fehler. Alle Schritte prüft die Funktion nur im laufenden Training. Der Rundgang durch den Trainingsmodus legt keine Daten an und baut kein Beispiel-Training: Ohne laufendes Training gibt es ihn nicht. Für `zeigt` setzt die `einfuehrung.js` nur eine Klasse an den `body` (`tour-zeigt-eingabe`, `tour-zeigt-pause`, Regeln in der `style.css`), es startet keine Pause und es entsteht kein Satz. Der Rundgang „training" stellt am Ende Ansicht und Reiter von vorher wieder her
- Hohe Elemente in der Einführung: Seit Version 99 rückt der Rundgang die Seite, wenn ein hohes Element und die Box zusammen ins Bild passen (Element oben, Box darunter, oben bleiben 44 px für die Kopfzeile frei). Bekannte Einschränkung bei 320 px Breite: Im Rundgang „training" ist der Rahmen um den Wochenplan gekappt (die Karte ist höher als der Platz), und bei den Vorlagen zeigt der Rahmen nur die Kacheln 2 bis 5 Tage, „6 Tage" liegt unter der Box (die Vorlagen stehen am Seitenende, die Seite kann nicht weiter rücken). Ab 390 px sind beide ganz im Rahmen
- Angebot der Einführung: Die `app.js` ruft an zwei Stellen `einfuehrungAnbieten` auf, in `seiteZeigen` beim Öffnen des Training-Tabs (`"training"`) und in `trainingBeginnen` nach dem Start eines Trainings (`"modus"`). Dann fragt der normale Rückfrage-Dialog „Kurz zeigen?" mit „Ja, zeigen" und „Später". Jeder Rundgang wird höchstens zweimal angeboten, je Start der App einmal. Der Merker steht im Speicher unter dem eigenen Schlüssel `einfuehrungGesehen` und absichtlich nicht in den Einstellungen, damit er nicht ins Backup kommt
- Wischgesten: Alle Gesten laufen über die eine Funktion `wischen(element, optionen)` in der `app.js` (seit Version 100), keine Einzellösungen. Sie erkennt Richtung, Weg und Tempo, schluckt den Klick nach einem Wisch und gilt nicht, solange die Einführung läuft oder eine Rückfrage offen ist (`wischenGesperrt`). Die Zahlen für Schwelle und Tempo stehen als Konstanten `WISCH_…` am Anfang der `app.js`. Einzige Ausnahme: Die Wochenleiste auf Home hat noch ihre eigene, ältere Lösung
- Sheets wischen: Alle elf Sheets mit Griff (`#sheet` und jedes `.zusatz-sheet`) schließen beim Wisch nach unten (`sheetWischbar`). Geschlossen wird über das ✕ des Sheets, so läuft derselbe Weg wie beim Antippen, auch bei zwei Sheets übereinander. Ein neues Sheet braucht deshalb in der `.sheet-kopf` einen Knopf mit `data-t-aria="schliessen"`. Am Griff und an der Kopfzeile lässt sich immer ziehen, im Inhalt nur, wenn die Liste ganz oben steht, und nie auf Eingabefeldern, dem Rad oder dem Diagramm. Sheets mit Eingaben (`SHEETS_NUR_KOPF`: Satz bearbeiten, Eigene Übung, Gewicht) lassen sich nur an Griff und Kopfzeile ziehen. Die Einstellungen, die Rückfragen und der Import-Dialog haben keine Geste
- Zu jeder Geste gibt es einen sichtbaren Knopf, der dasselbe tut. Keine Geste ändert Daten oder legt etwas im Speicher an
- Die Entwürfe der Texte liegen im Ordner `entwuerfe/`. Er gehört nicht zur App und wird nicht committet

## Programmier-Regeln
1. Erst denken, dann programmieren
   - Annahmen ausdrücklich nennen. Bei Unsicherheit fragen
   - Gibt es mehrere Deutungen, zeig sie mir und wähle nicht still eine
   - Gibt es einen einfacheren Weg, sag es mir
2. Einfachheit zuerst
   - So wenig Code wie möglich, nichts auf Vorrat
   - Keine Funktionen, Abstraktionen oder Einstellungen, die ich nicht verlangt habe
   - Wenn es mit weniger Code geht, schreib es kürzer
3. Chirurgische Änderungen
   - Fass nur an, was für die Aufgabe nötig ist. Kein "Verbessern" von Code daneben
   - Halte dich an den vorhandenen Stil
   - Siehst du toten Code oder Fehler außerhalb der Aufgabe, sag es mir, lösch oder ändere nichts
   - Entferne nur, was durch deine eigene Änderung ungenutzt wurde
   - Jede geänderte Zeile muss auf meine Bitte zurückgehen
4. Ziele prüfbar machen
   - Sag vorher, woran wir merken, dass es funktioniert
   - Bei mehreren Schritten: kurzer Plan mit "Schritt → so prüfen wir es"

## Daten und Sicherheit
- Bestehende Einträge, Routinen, Wochenplan und Backups dürfen nie verloren gehen oder verändert werden
- Am Datenformat oder an der Backup-Version nichts ändern, ohne es mir vorher zu sagen. Alte Backups müssen weiter importierbar sein
- Berechnungen (1RM, Volumen, Verlauf) gibt es nur an einer Stelle und Home und Fortschritt nutzen dieselbe Funktion

## Prüfen vor dem Abschluss
- Testen bei 320 und 390 px Breite, Hell und Dunkel, Glass und Klassisch, Deutsch und Englisch
- Testen mit alten Daten und mit leerer App
- Pushen nur nach meinem ausdrücklichen OK. Nach dem Push nennst du Commit und Version
