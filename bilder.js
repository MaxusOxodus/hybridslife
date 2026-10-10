// Übungsbilder: selbst gezeichnete Strichbilder (Motive) und die Tabelle, welche Übung welches Motiv zeigt.
// Die app.js liest das nur, über die Funktion uebungsBild(id) ganz unten.
//
// Jedes Motiv ist das Innere eines SVG mit der Zeichenfläche 64 x 64. Die Linien haben die Textfarbe
// (currentColor), nichts ist gefüllt. Zwei Klassen setzen Akzente, ihre Farben stehen in der style.css:
//   class="g": das Gerät (Bank, Turm, Seil), blasser gezeichnet als die Figur
//   class="a": das Gewicht (Scheibe, Hantel, Griff), in Akzentgrün
// Ein neues Motiv braucht zwei Schritte: hier in BILDER zeichnen und unten in BILD_ZU_UEBUNG zuordnen.

const BILDER = {
  // Platzhalter für alle Übungen ohne eigenes Motiv: eine Kurzhantel
  "hantel": '<path d="M22 32h20"/><rect class="a" x="14" y="22" width="8" height="20" rx="2.5"/><rect class="a" x="42" y="22" width="8" height="20" rx="2.5"/><path class="a" d="M10 27v10M54 27v10"/>',

  // Flachbank von der Seite: die Figur liegt, die Stange ist über der Brust (die Scheibe sieht man von vorn)
  "bankdruecken": '<path class="g" d="M12 43h40M19 43v13M45 43v13"/><circle cx="17" cy="37" r="4"/><path d="M22 39h18l10 1 2 16M26 38V24"/><circle class="a" cx="26" cy="18" r="6"/><path class="a" d="M26 18h.01"/>',

  // Schrägbank von der Seite: Lehne schräg, die Figur drückt die Stange nach oben
  "schraegbank": '<path class="g" d="M17 26l18 20h14M24 34v22M45 46v10"/><circle cx="18.5" cy="20.5" r="4"/><path d="M21 26l16 18 12-2 3 14M24 29l2-15"/><circle class="a" cx="26" cy="11" r="5.5"/><path class="a" d="M26 11h.01"/>',

  // Dasselbe an der Multipresse: Die Stange läuft an einer senkrechten Schiene
  "schraegbank-multi": '<path class="g" d="M26 3v54M19 57h14M17 26l18 20h14M45 46v10"/><circle cx="18.5" cy="20.5" r="4"/><path d="M21 26l16 18 12-2 3 14M23.5 29l2.5-15"/><circle class="a" cx="26" cy="11" r="5.5"/><path class="a" d="M26 11h.01"/>',

  // Brustpresse sitzend: Die Figur drückt den Griff nach vorn, rechts der Turm mit dem Gewicht
  "brustpresse": '<path class="g" d="M17 20v24h14M23 44v12M12 56h42M50 8v48M50 8h-6l-3 14"/><circle cx="23" cy="15" r="4"/><path d="M22 21l1 21h13l1 13M23 27h17"/><path class="a" d="M41 22v10"/><rect class="a" x="46" y="32" width="8" height="16" rx="2"/>',

  // Butterfly von vorn: Arme seitlich angewinkelt an den Polstern
  "butterfly": '<path class="g" d="M15 7h34M15 7v5M49 7v5M24 45h16"/><circle cx="32" cy="16" r="4"/><path d="M32 21v21M32 42l-7 4-1 11M32 42l7 4 1 11M32 25l-11 2V15M32 25l11 2V15"/><rect class="a" x="13" y="12" width="5" height="17" rx="2.5"/><rect class="a" x="46" y="12" width="5" height="17" rx="2.5"/>',

  // Kabelfly von oben nach unten, von vorn: zwischen zwei Türmen, die Seile kommen von oben
  "kabelfly": '<path class="g" d="M8 6v51M56 6v51M8 10l12 20M56 10L44 30"/><circle cx="32" cy="16" r="4"/><path d="M32 21v19M32 40l-5 17M32 40l5 17M32 24l-12 6M32 24l12 6"/><path class="a" d="M18 27l3 6M46 27l-3 6"/>',

  // Kabelfly von unten nach oben, von vorn: Die Seile kommen von unten, die Hände gehen vor die Brust
  "kabelfly-tief": '<path class="g" d="M8 6v51M56 6v51M8 54l13-33M56 54L43 21"/><circle cx="32" cy="14" r="4"/><path d="M32 19v21M32 40l-5 17M32 40l5 17M32 25l-11-4M32 25l11-4"/><path class="a" d="M19 18l4 6M45 18l-4 6"/>',

  // Negativbank von der Seite: Der Kopf liegt tiefer als die Hüfte, die Füße sind eingehakt
  "negativbank": '<path class="g" d="M10 47l34-13M16 45v11M42 35v21"/><circle cx="14" cy="40" r="4"/><path d="M19 40l19-8 9-5 4 11M24 38V23"/><circle class="a" cx="24" cy="17" r="6"/><path class="a" d="M24 17h.01"/>',

  // Floor Press von der Seite: wie Bankdrücken, aber auf dem Boden liegend
  "floor-press": '<path class="g" d="M8 51h48"/><circle cx="14" cy="44" r="4"/><path d="M19 46h19l8-10 4 13M24 45V31"/><circle class="a" cx="24" cy="25" r="6"/><path class="a" d="M24 25h.01"/>',

  // Fliegende von vorn: auf der Bank liegend, die Arme weit geöffnet
  "fliegende": '<path class="g" d="M22 46h20M27 46v10M37 46v10"/><circle cx="32" cy="35" r="4"/><path d="M26 42h12M26 42l-11-6-6-10M38 42l11-6 6-10"/><rect class="a" x="4" y="20" width="9" height="5" rx="2.5"/><rect class="a" x="51" y="20" width="9" height="5" rx="2.5"/>',

  // Dips von vorn: zwischen zwei Holmen gestützt, die Füße in der Luft
  "dips": '<path class="g" d="M16 30v27M48 30v27"/><path class="a" d="M11 30h10M43 30h10"/><circle cx="32" cy="11" r="4"/><path d="M16 30l8-11h16l8 11M32 19v21M32 40l-3 14M32 40l3 14"/>',

  // Liegestütz von der Seite: der Körper gestreckt, die Arme stützen
  "liegestuetze": '<path class="g" d="M6 55h52"/><circle cx="49" cy="26" r="4"/><path d="M44 31L10 52M43 32l2 22"/>',

  // Latzug von vorn: breite Stange am Seil, die Figur sitzt und zieht sie herunter
  "latzug": '<path class="g" d="M26 4h12M32 4v10M24 49h16"/><circle cx="32" cy="26" r="4"/><path d="M32 31v15M32 46l-7 4v8M32 46l7 4v8M32 33L19 14M32 33l13-19"/><path class="a" d="M9 17l3-3h40l3 3"/>',

  // Rudern am Kabelzug von der Seite: sitzend, Füße an der Platte, Griff zum Bauch
  "rudern": '<path class="g" d="M16 48h24M21 48v8M36 48v8M49 39v13M57 8v48M30 36l27 2"/><circle cx="23" cy="21" r="4"/><path d="M24 26l2 18 12-3 10 5M24 30l-7 7 13-1"/><path class="a" d="M30 32v8"/><rect class="a" x="53" y="14" width="8" height="14" rx="2"/>',

  // Klimmzug von vorn: Kinn über der Stange
  "klimmzug": '<path class="g" d="M10 10V5M54 10V5"/><path class="a" d="M8 10h48"/><circle cx="32" cy="18" r="4"/><path d="M22 10l-3 14h26l-3-14M32 24v18M32 42l-4 15M32 42l4 15"/>',

  // Schulterdrücken von vorn: sitzend, die Stange über dem Kopf
  "schulterdruecken": '<path class="g" d="M24 47h16"/><circle cx="32" cy="21" r="4"/><path d="M32 26v18M32 44l-7 4v9M32 44l7 4v9M26 28h12M26 28l-6-3V11M38 28l6-3V11"/><path class="a" d="M12 10h40"/><rect class="a" x="7" y="4" width="5" height="12" rx="2"/><rect class="a" x="52" y="4" width="5" height="12" rx="2"/>',

  // Seitheben von vorn: stehend, beide Arme seitlich angehoben
  "seitheben": '<circle cx="32" cy="12" r="4"/><path d="M32 17v21M32 38l-5 19M32 38l5 19M32 20l-17 4M32 20l17 4"/><rect class="a" x="9" y="20" width="5" height="9" rx="2.5"/><rect class="a" x="50" y="20" width="5" height="9" rx="2.5"/>',

  // Bizeps-Curl von der Seite: stehend, der Unterarm ist angewinkelt
  "bizeps-curl": '<circle cx="29" cy="10" r="4"/><path d="M29 15v21M29 36l-3 21M29 36l4 21M29 18l2 13 10-8"/><circle class="a" cx="44" cy="20" r="5"/><path class="a" d="M44 20h.01"/>',

  // Trizepsdrücken am Kabel von der Seite: stehend vor dem Turm, der Griff wird nach unten gedrückt
  "trizepsdruecken": '<path class="g" d="M55 6v51M55 6H44M44 8l-4 27"/><circle cx="25" cy="12" r="4"/><path d="M26 17l2 20M28 37l-3 20M28 37l4 20M27 20l2 11 10 5"/><path class="a" d="M36 36h8"/><rect class="a" x="51" y="30" width="8" height="14" rx="2"/>',

  // Kniebeuge von der Seite: tief in der Hocke, die Stange auf dem Rücken
  "kniebeuge": '<path class="g" d="M12 57h40"/><circle cx="41" cy="16" r="4"/><path d="M37 22L26 40l16 2-8 14h7"/><circle class="a" cx="30" cy="22" r="6"/><path class="a" d="M30 22h.01"/>',

  // Beinpresse 45° von der Seite: zurückgelehnt, die Füße drücken den Schlitten schräg nach oben
  "beinpresse": '<path class="g" d="M9 35l11 18h9M30 57l28-28"/><circle cx="13" cy="29" r="4"/><path d="M15 35l9 14 7-15 12-5"/><path class="a" d="M40 24l8 8"/><circle class="a" cx="52" cy="21" r="5"/>',

  // Kreuzheben von der Seite: vorgebeugt, die Arme gestreckt an der Stange am Boden
  "kreuzheben": '<path class="g" d="M10 57h44"/><circle cx="44" cy="19" r="4"/><path d="M38 24L22 36l15 8-4 12h6M38 24l2 25"/><circle class="a" cx="40" cy="49" r="7"/><path class="a" d="M40 49h.01"/>',

  // Latzug mit gestreckten Armen von der Seite: stehend vor dem Turm, die Arme bleiben gestreckt
  "latzug-gestreckt": '<path class="g" d="M56 6v51M56 6H46M46 8l-6 22"/><circle cx="24" cy="13" r="4"/><path d="M25 18l2 20M27 38l-4 19M27 38l4 19M26 21l14 9"/><path class="a" d="M38 27l4 6"/><rect class="a" x="52" y="32" width="8" height="14" rx="2"/>',

  // Kurzhantelrudern von der Seite: eine Hand und ein Knie auf der Bank, der andere Arm zieht die Hantel hoch
  "kurzhantelrudern": '<path class="g" d="M10 45h30M14 45v11M36 45v11"/><circle cx="12" cy="28" r="4"/><path d="M17 31h19M19 31l-1 13M36 31l-4 13h8M36 31l8 25M22 31l6-8-1 13"/><rect class="a" x="22" y="36" width="10" height="5" rx="2.5"/>',

  // Überzüge von der Seite: auf der Bank liegend, das Gewicht geht hinter den Kopf
  "ueberzuege": '<path class="g" d="M14 43h36M21 43v13M43 43v13"/><circle cx="19" cy="37" r="4"/><path d="M24 39h16l10 1 2 16M26 37L13 24"/><circle class="a" cx="10" cy="21" r="4.5"/><path class="a" d="M10 21h.01"/>',

  // Langhantelrudern von der Seite: vorgebeugt, die Stange wird zum Bauch gezogen
  "langhantelrudern": '<path class="g" d="M10 57h44"/><circle cx="45" cy="22" r="4"/><path d="M40 27L22 38l13 7-3 11h6M40 27l-6 5 4 6"/><circle class="a" cx="38" cy="40" r="6"/><path class="a" d="M38 40h.01"/>',

  // T-Bar-Rudern von der Seite: Die Stange ist hinten am Boden verankert, vorn sitzen die Scheiben
  "t-bar-rudern": '<path class="g" d="M6 57h50"/><circle cx="45" cy="20" r="4"/><path d="M40 25L22 37l12 8-3 11h6M40 25v15"/><path class="a" d="M8 56l33-16M43 34l4 11M47 33l4 11"/>',

  // Rudern mit Brustauflage von der Seite: bäuchlings auf der schrägen Bank, die Arme hängen nach unten
  "rudern-brustauflage": '<path class="g" d="M16 25l20 20M24 33v23M14 56h34"/><circle cx="13" cy="16" r="4"/><path d="M18 21l20 20 11 15M20 23l-7 13"/><rect class="a" x="7" y="36" width="11" height="5" rx="2.5"/>',

  // Inverted Row von der Seite: unter der Stange hängend, der Körper gestreckt, die Fersen am Boden
  "inverted-row": '<path class="g" d="M52 8v49M6 57h52"/><path class="a" d="M52 22H33"/><circle cx="42" cy="35" r="4"/><path d="M8 55l28-18V22"/>',

  // Armheben in Bauchlage von der Seite: auf dem Bauch liegend, die Arme heben vom Boden ab
  "bauchlage-heben": '<path class="g" d="M6 53h52"/><circle cx="49" cy="43" r="4"/><path d="M43 46L10 50M42 45l9-15"/>',

  // Rückenstrecker von der Seite: die Hüfte auf dem Polster, die Füße eingehakt, der Oberkörper hängt nach vorn
  "rueckenstrecker": '<path class="g" d="M22 57h30M42 57L30 39M25 35l9 7M46 57v-6"/><circle cx="11" cy="45" r="4"/><path d="M47 51L28 33 15 42"/>',

  // Good Morning von der Seite: die Stange im Nacken, der Oberkörper beugt sich mit geradem Rücken vor
  "good-morning": '<path class="g" d="M12 57h40"/><circle cx="52" cy="30" r="4"/><path d="M46 31l-16 7 2 18h6"/><circle class="a" cx="42" cy="26" r="5.5"/><path class="a" d="M42 26h.01"/>',

  // Rumänisches Kreuzheben von der Seite: die Beine fast gestreckt, die Stange auf Höhe der Knie
  "rumaenisches-kreuzheben": '<path class="g" d="M12 57h40"/><circle cx="47" cy="21" r="4"/><path d="M42 26L26 36l8 9-1 11h6M42 26v17"/><circle class="a" cx="42" cy="45" r="6"/><path class="a" d="M42 45h.01"/>',

  // Sumo-Kreuzheben von vorn: sehr breiter Stand, die Arme greifen zwischen den Knien
  "sumo-kreuzheben": '<circle cx="32" cy="15" r="4"/><path d="M32 20v16M14 57l5-13 9-8h8l9 8 5 13M27 24h10M27 24v24M37 24v24"/><path class="a" d="M9 48h46"/><rect class="a" x="4" y="41" width="5" height="14" rx="2"/><rect class="a" x="55" y="41" width="5" height="14" rx="2"/>',

  // Shrugs von vorn: stehend, die Stange an gestreckten Armen, die Schultern ziehen hoch
  "shrugs": '<circle cx="32" cy="12" r="4"/><path d="M32 17v21M32 38l-5 19M32 38l5 19M24 20h16M24 20l-1 20M40 20l1 20"/><path class="a" d="M11 41h42"/><rect class="a" x="6" y="35" width="5" height="12" rx="2"/><rect class="a" x="53" y="35" width="5" height="12" rx="2"/>',

  // Farmer's Walk von der Seite: gehend, das Gewicht am gestreckten Arm
  "farmers-walk": '<path class="g" d="M10 57h44"/><circle cx="32" cy="11" r="4"/><path d="M32 16v20M32 36l-8 20M32 36l9 20M32 19l1 18"/><circle class="a" cx="33" cy="42" r="5"/><path class="a" d="M33 42h.01"/>',

  // Aufrechtes Rudern von vorn: die Stange vor der Brust, die Ellbogen zeigen nach oben außen
  "aufrechtes-rudern": '<circle cx="32" cy="11" r="4"/><path d="M32 16v22M32 38l-5 19M32 38l5 19M32 20l-14-2 9 10M32 20l14-2-9 10"/><path class="a" d="M14 29h36"/><rect class="a" x="9" y="23" width="5" height="12" rx="2"/><rect class="a" x="50" y="23" width="5" height="12" rx="2"/>',

  // Face Pulls von der Seite: stehend vor dem Turm, das Seil wird auf Kopfhöhe zum Gesicht gezogen
  "face-pulls": '<path class="g" d="M56 6v51M56 19H41"/><circle cx="25" cy="13" r="4"/><path d="M26 18l1 20M27 38l-5 19M27 38l6 19M26 22l8 3 6-6"/><path class="a" d="M40 15v8"/><rect class="a" x="52" y="30" width="8" height="14" rx="2"/>',

  // Reverse Butterfly von vorn: die Brust am Polster, die Arme gehen gestreckt nach außen
  "reverse-butterfly": '<path class="g" d="M27 29h10v9H27zM24 45h16"/><circle cx="32" cy="16" r="4"/><path d="M32 21v21M32 42l-7 4-1 11M32 42l7 4 1 11M32 25l-20-2M32 25l20-2"/><path class="a" d="M11 17v12M53 17v12"/>',

  // Reverse Flys von vorn: weit vorgebeugt, die Arme heben seitlich an
  "reverse-flys": '<circle cx="32" cy="27" r="4"/><path d="M32 32v9M32 41l-6 16M32 41l6 16M32 34l-19-7M32 34l19-7"/><rect class="a" x="7" y="22" width="5" height="9" rx="2.5"/><rect class="a" x="52" y="22" width="5" height="9" rx="2.5"/>',

  // Frontheben von der Seite: stehend, ein Arm hebt das Gewicht gestreckt nach vorn
  "frontheben": '<circle cx="28" cy="11" r="4"/><path d="M28 16v21M28 37l-4 20M28 37l5 20M28 20h17M28 20l-2 16"/><circle class="a" cx="49" cy="20" r="4.5"/><path class="a" d="M49 20h.01"/>',

  // Landmine von der Seite: Die Stange ist am Boden verankert, das freie Ende wird schräg nach oben gedrückt
  "landmine": '<path class="g" d="M10 57h48"/><circle cx="24" cy="13" r="4"/><path d="M25 18l1 20M26 38l-4 19M26 38l5 19M25 22l5 6 7-7"/><path class="a" d="M56 56L37 21M38 33l9-5"/>',

  // Pike-Liegestütz von der Seite: die Hüfte hoch, der Körper bildet ein umgedrehtes V
  "pike-liegestuetze": '<path class="g" d="M6 57h52"/><circle cx="46" cy="45" r="4"/><path d="M12 55l18-33 12 18-2 15"/>',

  // Handstand von vorn: auf den Händen, die Beine gestreckt nach oben
  "handstand": '<path class="g" d="M8 57h48"/><circle cx="32" cy="48" r="4"/><path d="M25 56l4-15h6l4 15M32 41V23M32 23L29 6M32 23l3-17"/>',

  // Seitheben am Kabelzug von vorn: Das Seil kommt von unten quer vor dem Körper, ein Arm hebt seitlich an
  "seitheben-kabel": '<path class="g" d="M8 8v49M8 54l42-29"/><circle cx="34" cy="12" r="4"/><path d="M34 17v21M34 38l-5 19M34 38l5 19M34 20l16 5M34 20l-6 15"/><path class="a" d="M51 20v9"/>',

  // Kabelcurls von der Seite: stehend vor dem Turm, das Seil kommt von unten
  "kabelcurls": '<path class="g" d="M56 8v49M56 54L41 25"/><circle cx="26" cy="10" r="4"/><path d="M26 15v21M26 36l-3 21M26 36l4 21M26 18l2 13 12-7"/><path class="a" d="M38 21l4 7"/><rect class="a" x="52" y="18" width="8" height="14" rx="2"/>',

  // Scottcurls von der Seite: sitzend, der Oberarm liegt auf dem schrägen Polster
  "scottcurls": '<path class="g" d="M27 29l15 13M38 39v17M15 45h13M21 45v11"/><circle cx="21" cy="16" r="4"/><path d="M21 21l1 21 12 1 1 13M22 25l17 11 5-13"/><circle class="a" cx="46" cy="19" r="4.5"/><path class="a" d="M46 19h.01"/>',

  // Konzentrationscurls von der Seite: sitzend vorgebeugt, der Ellbogen stützt am Oberschenkel
  "konzentrationscurls": '<path class="g" d="M12 45h20M16 45v11M28 45v11"/><circle cx="33" cy="19" r="4"/><path d="M31 24l-7 18h16l1 14M31 26l5 13 6-9"/><circle class="a" cx="44" cy="27" r="4.5"/><path class="a" d="M44 27h.01"/>',

  // Überkopf-Trizepsstrecken von der Seite: der Oberarm zeigt nach oben, das Gewicht hängt hinter dem Kopf
  "ueberkopf-trizeps": '<circle cx="30" cy="17" r="4"/><path d="M30 22v18M30 40l-4 17M30 40l4 17M31 24l8-15-15-3"/><circle class="a" cx="20" cy="7" r="4.5"/><path class="a" d="M20 7h.01"/>',

  // Kickbacks von der Seite: vorgebeugt, der Arm streckt sich nach hinten
  "kickbacks": '<path class="g" d="M12 57h40"/><circle cx="49" cy="25" r="4"/><path d="M44 29l-16 8 8 8-2 11h6M43 29l-21-4"/><circle class="a" cx="18" cy="24" r="4"/><path class="a" d="M18 24h.01"/>',

  // French Press von der Seite: auf der Bank liegend, die Unterarme senken das Gewicht zur Stirn
  "french-press": '<path class="g" d="M12 43h40M19 43v13M45 43v13"/><circle cx="17" cy="37" r="4"/><path d="M22 39h18l10 1 2 16M26 38l1-14-10 1"/><circle class="a" cx="12" cy="25" r="5"/><path class="a" d="M12 25h.01"/>'
};

// Welche Übung (ID aus der uebungen.js) welches Motiv zeigt. Ähnliche Übungen teilen sich ein Motiv.
// Übungen, die hier fehlen, zeigen den Platzhalter "hantel".
const BILD_ZU_UEBUNG = {
  // Brust
  "bankdruecken-lh": "bankdruecken",
  "bankdruecken-kh": "bankdruecken",
  "bankdruecken-multi": "bankdruecken",
  "bankdruecken-multi-breit": "bankdruecken",
  "bankdruecken-kh-neutral": "bankdruecken",
  "bankdruecken-kh-einarmig": "bankdruecken",
  "bankdruecken-kb": "bankdruecken",
  "bankdruecken-lh-breit": "bankdruecken",
  "pause-smith-machine-bench-press": "bankdruecken",
  "reverse-grip-barbell-bench-press": "bankdruecken",
  "dumbbell-squeeze-press": "bankdruecken",
  "close-grip-dumbbell-press": "bankdruecken",
  "enges-bankdruecken-multi": "bankdruecken",
  "enges-bankdruecken-lh": "bankdruecken",
  "schraegbank-45-multi": "schraegbank-multi",
  "schraegbank-steil-multi": "schraegbank-multi",
  "schraegbank-flach-multi": "schraegbank-multi",
  "schraegbank-45-kh": "schraegbank",
  "schraegbank-45-lh": "schraegbank",
  "schraegbank-45-lh-pause": "schraegbank",
  "schraegbank-45-kh-neutral": "schraegbank",
  "schraegbank-45-lh-eng": "schraegbank",
  "schraegbank-steil-lh": "schraegbank",
  "schraegbank-steil-kh": "schraegbank",
  "schraegbank-flach-lh": "schraegbank",
  "schraegbank-flach-kh": "schraegbank",
  "incline-dumbbell-squeeze-press": "schraegbank",
  "brustpresse-steck": "brustpresse",
  "brustpresse-steck-neutral": "brustpresse",
  "brustpresse-scheibe": "brustpresse",
  "brustpresse-scheibe-neutral": "brustpresse",
  "schraegpresse-scheibe": "brustpresse",
  "schraegpresse-scheibe-einarmig": "brustpresse",
  "machine-incline-press": "brustpresse",
  "butterfly": "butterfly",
  "butterfly-obergriff": "butterfly",
  "kabelfly-hoch-tief": "kabelfly",
  "kabelfly-hoch-tief-einarmig": "kabelfly",
  "kabelfly-sitzend": "kabelfly",
  "kabelfly-horizontal": "kabelfly",
  "kabelfly-horizontal-einarmig": "kabelfly",
  "kabel-crossover": "kabelfly",
  "kabelfly-vorgebeugt": "kabelfly",
  "brustpresse-kabel": "kabelfly",
  "brustpresse-kabel-einarmig": "kabelfly",
  "kabelfly-tief-hoch": "kabelfly-tief",
  "kabelfly-tief-hoch-einarmig": "kabelfly-tief",
  "negativbank-multi": "negativbank",
  "negativbank-lh": "negativbank",
  "negativbank-kh": "negativbank",
  "negativbank-lh-breit": "negativbank",
  "floor-press-lh": "floor-press",
  "floor-press-kh": "floor-press",
  "floor-press-kb": "floor-press",
  "fliegende-kh": "fliegende",
  "fliegende-45-kh": "fliegende",
  "fliegende-flach-kh": "fliegende",
  "decline-dumbbell-fly": "fliegende",
  "brust-dips": "dips",
  "brust-dips-gewicht": "dips",
  "brust-dips-assistiert": "dips",
  "machine-assisted-dip": "dips",
  "dip-maschine-brust": "dips",
  "dips": "dips",
  "liegestuetze": "liegestuetze",
  "liegestuetze-fuesse-hoch": "liegestuetze",
  "liegestuetze-haende-hoch": "liegestuetze",
  "liegestuetze-breit": "liegestuetze",
  "liegestuetze-knie": "liegestuetze",
  "liegestuetze-gewicht": "liegestuetze",
  "liegestuetze-defizit": "liegestuetze",
  "liegestuetze-einarmig": "liegestuetze",
  "archer-push-up": "liegestuetze",
  "pseudo-planche-push-up": "liegestuetze",
  "ring-push-up": "liegestuetze",
  "ring-chest-fly": "liegestuetze",
  "explosive-push-up": "liegestuetze",
  "clap-push-up": "liegestuetze",

  // Rücken
  "latzug": "latzug",
  "wide-grip-cable-lat-pulldown": "latzug",
  "overhand-grip-cable-lat-pulldown": "latzug",
  "machine-lat-pulldown": "latzug",
  "cable-lat-pulldown": "latzug",
  "neutral-close-grip-cable-lat-pulldown": "latzug",
  "underhand-wide-grip-cable-lat-pulldown": "latzug",
  "underhand-close-grip-cable-lat-pulldown": "latzug",
  "single-arm-cable-lat-pulldown": "latzug",
  "kabelrudern": "rudern",
  "neutral-wide-grip-cable-row": "rudern",
  "wide-grip-cable-row": "rudern",
  "underhand-grip-cable-row": "rudern",
  "seated-single-arm-cable-row": "rudern",
  "neutral-grip-machine-row": "rudern",
  "neutral-grip-plate-loaded-machine-row": "rudern",
  "wide-grip-plate-loaded-machine-row": "rudern",
  "pin-loaded-row-machine": "rudern",
  "klimmzuege": "klimmzug",
  "wide-grip-pull-up": "klimmzug",
  "neutral-grip-pull-up": "klimmzug",
  "chin-up": "klimmzug",
  "close-grip-chin-up": "klimmzug",
  "commando-pull-up": "klimmzug",
  "towel-pull-up": "klimmzug",
  "commando-chin-up": "klimmzug",
  "towel-chin-up": "klimmzug",
  "kreuzheben": "kreuzheben",
  "deficit-deadlift": "kreuzheben",

  // Schultern
  "schulterdruecken": "schulterdruecken",
  "military-press": "schulterdruecken",
  "arnold-press": "schulterdruecken",
  "barbell-overhead-press": "schulterdruecken",
  "dumbbell-overhead-press": "schulterdruecken",
  "seated-dumbbell-shoulder-press": "schulterdruecken",
  "bradford-press": "schulterdruecken",
  "smith-machine-overhead-press": "schulterdruecken",
  "seitheben": "seitheben",
  "seated-dumbbell-lateral-raise": "seitheben",

  // Arme
  "langhantelcurls": "bizeps-curl",
  "kurzhantelcurls": "bizeps-curl",
  "hammercurls": "bizeps-curl",
  "ez-bar-curl": "bizeps-curl",
  "alternating-dumbbell-curl": "bizeps-curl",
  "cross-body-hammer-curl": "bizeps-curl",
  "reverse-barbell-curl": "bizeps-curl",
  "reverse-dumbbell-curl": "bizeps-curl",
  "zottman-curl": "bizeps-curl",
  "drag-curl": "bizeps-curl",
  "trizepsdruecken-kabel": "trizepsdruecken",
  "single-arm-neutral-grip-cable-triceps-pushdown": "trizepsdruecken",
  "cable-v-bar-triceps-pushdown": "trizepsdruecken",
  "cable-straight-bar-triceps-pushdown": "trizepsdruecken",
  "underhand-grip-cable-triceps-pushdown": "trizepsdruecken",
  "cable-dual-rope-diverging-triceps": "trizepsdruecken",

  // Beine
  "kniebeuge": "kniebeuge",
  "high-bar-back-squat": "kniebeuge",
  "low-bar-back-squat": "kniebeuge",
  "tempo-squat": "kniebeuge",
  "pause-squat": "kniebeuge",
  "smith-machine-back-squat": "kniebeuge",
  "beinpresse": "beinpresse",
  "45-leg-press": "beinpresse",
  "pin-loaded-leg-press": "beinpresse",
  "single-leg-45-leg-press": "beinpresse",
  "single-leg-pin-loaded-leg-press": "beinpresse",
  "pin-loaded-quad-biased-leg-press": "beinpresse",
  "45-glute-biased-leg-press": "beinpresse",

  // Latissimus
  "half-kneeling-single-arm-elbow-lat-pulldown": "latzug",
  "cross-body-cable-lat-pull-around": "latzug",
  "scapular-pulldown": "latzug",
  "kneeling-cable-straight-arm-lat-pulldown": "latzug-gestreckt",
  "cable-rope-straight-arm-lat-pulldown": "latzug-gestreckt",
  "machine-assisted-pull-up": "klimmzug",
  "machine-assisted-chin-up": "klimmzug",
  "archer-pull-up": "klimmzug",
  "typewriter-pull-up": "klimmzug",
  "muscle-up": "klimmzug",
  "kurzhantelrudern": "kurzhantelrudern",
  "dumbbell-pullover": "ueberzuege",
  "barbell-pullover": "ueberzuege",
  "meadows-row": "t-bar-rudern",
  "landmine-row": "t-bar-rudern",
  "pendlay-row": "langhantelrudern",
  "underhand-barbell-row": "langhantelrudern",
  "seal-row": "rudern-brustauflage",
  "chest-supported-dumbbell-row": "rudern-brustauflage",
  "australian-pull-up": "inverted-row",
  "ring-row": "inverted-row",
  "feet-elevated-inverted-row": "inverted-row",

  // Oberer Rücken
  "chest-supported-overhand-grip-t-bar-row": "rudern-brustauflage",
  "chest-supported-neutral-grip-t-bar-row": "rudern-brustauflage",
  "chest-supported-semi-neutral-grip-t-bar-row": "rudern-brustauflage",
  "chest-supported-wide-grip-t-bar-row": "rudern-brustauflage",
  "standing-single-arm-cable-row": "rudern",
  "cable-rope-high-row": "rudern",
  "moto-cable-row": "rudern",
  "smith-machine-row": "langhantelrudern",
  "smith-machine-deficit-row": "langhantelrudern",
  "smith-machine-pendlay-row": "langhantelrudern",
  "langhantelrudern": "langhantelrudern",
  "wide-grip-barbell-row": "langhantelrudern",
  "dumbbell-rear-delt-row": "langhantelrudern",
  "bent-over-neutral-grip-t-bar-row": "t-bar-rudern",
  "bent-over-underhand-grip-t-bar-row": "t-bar-rudern",
  "bent-over-semi-neutral-grip-t-bar-row": "t-bar-rudern",
  "bent-over-wide-grip-t-bar-row": "t-bar-rudern",
  "t-bar-rudern": "t-bar-rudern",
  "wide-grip-inverted-row": "inverted-row",
  "scapular-pull-up": "klimmzug",
  "scapular-push-up": "liegestuetze",
  "prone-y-raise": "bauchlage-heben",
  "prone-t-raise": "bauchlage-heben",
  "reverse-snow-angel": "bauchlage-heben",

  // Unterer Rücken
  "machine-back-extension": "rueckenstrecker",
  "smith-machine-good-morning": "good-morning",
  "wide-stance-smith-machine-good-morning": "good-morning",
  "good-morning": "good-morning",
  "dumbbell-good-morning": "good-morning",
  "bodyweight-good-morning": "good-morning",
  "smith-machine-deficit-romanian-deadlift": "rumaenisches-kreuzheben",
  "cable-romanian-deadlift": "rumaenisches-kreuzheben",
  "dumbbell-romanian-deadlift": "rumaenisches-kreuzheben",
  "stiff-leg-deadlift": "rumaenisches-kreuzheben",
  "single-leg-romanian-deadlift-eigen": "rumaenisches-kreuzheben",
  "seated-cable-romanian-deadlift": "rudern",
  "seated-single-leg-cable-romanian-deadlift": "rudern",
  "seated-cable-deadlift": "rudern",
  "shrug-machine-deadlift": "kreuzheben",
  "rack-pull": "kreuzheben",
  "jefferson-deadlift": "kreuzheben",
  "sumo-deadlift": "sumo-kreuzheben",

  // Trapez
  "smith-machine-shrug": "shrugs",
  "standing-machine-shrug": "shrugs",
  "cable-shrug": "shrugs",
  "single-arm-cable-shrug": "shrugs",
  "machine-cheat-shrug": "shrugs",
  "smith-machine-cheat-shrug": "shrugs",
  "pause-cable-shrug-in": "shrugs",
  "cable-shrug-in": "shrugs",
  "barbell-shrug": "shrugs",
  "dumbbell-shrug": "shrugs",
  "behind-the-back-barbell-shrug": "shrugs",
  "pin-loaded-row-machine-kelso-shrug": "rudern",
  "seated-cable-kelso-shrug": "rudern",
  "t-bar-kelso-shrug": "t-bar-rudern",
  "incline-dumbbell-shrug": "rudern-brustauflage",
  "farmers-walk": "farmers-walk",
  "trap-bar-carry": "farmers-walk",
  "high-pull": "aufrechtes-rudern",
  "barbell-upright-row": "aufrechtes-rudern",
  "dumbbell-upright-row": "aufrechtes-rudern",

  // Schultern
  "face-pulls": "face-pulls",
  "innenrotation-kabel": "face-pulls",
  "single-arm-cable-face-pull": "face-pulls",
  "high-pulley-cable-face-pull": "face-pulls",
  "lying-pause-cable-face-pull": "face-pulls",
  "ring-face-pull": "face-pulls",
  "neutral-grip-machine-rear-delt-fly": "reverse-butterfly",
  "overhand-grip-machine-rear-delt-fly": "reverse-butterfly",
  "sideways-single-arm-machine-rear-delt-fly": "reverse-butterfly",
  "overhand-grip-cable-rear-delt-fly": "reverse-flys",
  "single-arm-45-cable-rear-delt-fly": "reverse-flys",
  "45-cable-rear-delt-fly": "reverse-flys",
  "reverse-flys": "reverse-flys",
  "dumbbell-rear-delt-fly": "reverse-flys",
  "incline-dumbbell-rear-delt-fly": "reverse-flys",
  "chest-supported-dumbbell-rear-delt-fly": "reverse-flys",
  "barbell-rear-delt-row": "langhantelrudern",
  "prone-y-t-w-raises": "bauchlage-heben",
  "plate-loaded-machine-shoulder-press": "schulterdruecken",
  "neutral-grip-machine-shoulder-press": "schulterdruecken",
  "neutral-grip-plate-loaded-machine-shoulder-press": "schulterdruecken",
  "cable-shoulder-press": "schulterdruecken",
  "z-press": "schulterdruecken",
  "single-arm-dumbbell-press": "schulterdruecken",
  "cable-front-raise": "frontheben",
  "single-arm-cable-front-raise": "frontheben",
  "frontheben": "frontheben",
  "dumbbell-front-raise": "frontheben",
  "plate-front-raise": "frontheben",
  "landmine-press": "landmine",
  "pike-push-up": "pike-liegestuetze",
  "elevated-pike-push-up": "pike-liegestuetze",
  "handstand-push-up": "handstand",
  "wall-handstand-push-up": "handstand",
  "freestanding-handstand-push-up": "handstand",
  "handstand-shoulder-tap": "handstand",
  "single-arm-high-cable-lateral-raise": "seitheben-kabel",
  "single-arm-cable-lateral-raise": "seitheben-kabel",
  "dual-cable-lateral-raise": "seitheben-kabel",
  "behind-the-back-cable-lateral-raise": "seitheben-kabel",
  "leaning-cable-lateral-raise": "seitheben-kabel",
  "single-arm-cable-cuffed-lateral-raise": "seitheben-kabel",
  "seated-machine-lateral-raise": "seitheben",
  "leaning-dumbbell-lateral-raise": "seitheben",
  "incline-dumbbell-lateral-raise": "seitheben",
  "cable-upright-row": "aufrechtes-rudern",
  "smith-machine-upright-row": "aufrechtes-rudern",

  // Bizeps
  "kabelcurls": "kabelcurls",
  "cable-rope-hammer-curl": "kabelcurls",
  "cable-straight-bar-biceps-curl": "kabelcurls",
  "cable-ez-bar-biceps-curl": "kabelcurls",
  "single-arm-bayesian-curl": "kabelcurls",
  "single-arm-cable-biceps-curl": "kabelcurls",
  "dual-cable-bayesian-curl": "kabelcurls",
  "low-pulley-dual-cable-biceps-curl": "kabelcurls",
  "single-arm-elbow-out-cable-biceps-curl": "kabelcurls",
  "single-arm-crucifix-curl": "kabelcurls",
  "seated-crucifix-curl": "kabelcurls",
  "seated-dual-cable-bayesian-curl": "kabelcurls",
  "cable-reverse-curl": "kabelcurls",
  "single-arm-pin-loaded-machine-preacher-curl": "scottcurls",
  "pin-loaded-machine-preacher-curl": "scottcurls",
  "machine-biceps-curl-with-arms-at-sides": "scottcurls",
  "scottcurls": "scottcurls",
  "cable-concentration-curl": "konzentrationscurls",
  "konzentrationscurls": "konzentrationscurls",
  "seated-dumbbell-curl": "bizeps-curl",
  "incline-dumbbell-curl": "bizeps-curl",
  "archer-chin-up": "klimmzug",
  "ring-chin-up": "klimmzug",
  "inverted-row-mit-supiniertem-griff": "inverted-row",

  // Trizeps
  "trizeps-dips-assistiert": "dips",
  "dip-maschine-trizeps": "dips",
  "pause-machine-assisted-dip": "dips",
  "trizeps-dips": "dips",
  "trizeps-dips-gewicht": "dips",
  "bench-parallel-bar-dip": "dips",
  "ring-dip": "dips",
  "korean-dip": "dips",
  "jm-press-multi": "bankdruecken",
  "jm-press-lh": "bankdruecken",
  "lockout-bank-lh": "bankdruecken",
  "enges-negativbank-lh": "negativbank",
  "single-arm-cable-overhead-triceps-extension": "ueberkopf-trizeps",
  "cable-v-bar-overhead-triceps-extension": "ueberkopf-trizeps",
  "high-pulley-cable-straight-bar-overhead-triceps-extension": "ueberkopf-trizeps",
  "ueberkopf-trizepsstrecken": "ueberkopf-trizeps",
  "dumbbell-overhead-triceps-extension": "ueberkopf-trizeps",
  "single-arm-dumbbell-overhead-extension": "ueberkopf-trizeps",
  "machine-triceps-extension": "trizepsdruecken",
  "dual-cable-triceps-press": "trizepsdruecken",
  "neutral-grip-cable-triceps-kickback": "kickbacks",
  "kickbacks": "kickbacks",
  "cable-skull-crusher": "french-press",
  "french-press": "french-press",
  "ez-bar-skull-crusher": "french-press",
  "dumbbell-skull-crusher": "french-press",
  "dumbbell-tate-press": "french-press",
  "enge-liegestuetze": "liegestuetze",
  "diamant-liegestuetze": "liegestuetze",
  "enge-liegestuetze-knie": "liegestuetze",
  "bodyweight-triceps-extension": "liegestuetze",
  "ring-triceps-extension": "liegestuetze"
};

// Das Bild einer Übung als fertiges SVG. Ohne Zuordnung (auch bei eigenen Übungen) kommt der Platzhalter.
function uebungsBild(id) {
  let motiv = "hantel";
  if (Object.prototype.hasOwnProperty.call(BILD_ZU_UEBUNG, id)) {
    motiv = BILD_ZU_UEBUNG[id];
  }
  return '<svg class="uebungsbild" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5"'
    + ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (BILDER[motiv] || BILDER.hantel) + '</svg>';
}
