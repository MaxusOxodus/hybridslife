// Rang-System: alle Zahlen und die Rechenfunktionen für Kraft-Ränge, Fortschritts-Rang, Konstanz-Rang und Abzeichen.
// Die Funktionen hier rechnen nur. Sie lesen nichts aus dem Speicher und zeigen nichts an:
// Die app.js sammelt die Daten, übergibt sie und baut aus dem Ergebnis die Anzeige.
// Welche Übung zu welchem Bewegungsmuster gehört, steht in der uebungen.js im Feld "rang".
// Die Namen der Ränge und Muster stehen in der texte.js.

// ---------- Rang-Leiter ----------

// 6 Ränge mit je 3 Unterstufen (I, II, III). Jede Stufe hat 100 Rangpunkte (RP), ein Rang also 300.
const RANG_ANZAHL = 6;
const RANG_STUFEN = 3;
const RP_JE_STUFE = 100;
const RP_JE_RANG = RANG_STUFEN * RP_JE_STUFE;
const RP_MAX = RANG_ANZAHL * RP_JE_RANG;

// ---------- Kraft-Rang ----------

// Die sechs Bewegungsmuster in der Reihenfolge, in der das Profil sie zeigt
const MUSTER = ["drueckenH", "drueckenV", "beine", "huefte", "ziehenV", "ziehenH"];

// Schwellen je Muster: geschätztes Maximalgewicht (1RM) der Referenz-Übung geteilt durch das Körpergewicht.
// Platz 0 = Rang 1 ab dem ersten gültigen Satz, Platz 1 bis 5 = Beginn von Rang 2 bis 6, Platz 6 = 1800 RP.
const MUSTER_SCHWELLEN = {
  drueckenH: [0, 0.50, 0.75, 1.00, 1.35, 1.70, 2.05], // Brust, Referenz: Bankdrücken (Langhantel)
  drueckenV: [0, 0.35, 0.50, 0.70, 0.90, 1.10, 1.30], // Schulter, Referenz: Schulterdrücken stehend (Langhantel)
  beine:     [0, 0.75, 1.10, 1.50, 1.90, 2.30, 2.70], // Referenz: Kniebeuge (Langhantel)
  huefte:    [0, 1.00, 1.40, 1.85, 2.30, 2.75, 3.20], // Referenz: Kreuzheben
  ziehenV:   [0, 0.80, 1.05, 1.30, 1.55, 1.80, 2.05], // Referenz: Klimmzug (Körpergewicht + Zusatzgewicht)
  ziehenH:   [0, 0.45, 0.65, 0.90, 1.15, 1.40, 1.65]  // Referenz: Langhantelrudern
};

// Die Referenz-Übung jedes Musters (ihre ID aus der uebungen.js). Ein leeres Muster nennt sie als Beispiel.
const MUSTER_REFERENZ = {
  drueckenH: "bankdruecken-lh",
  drueckenV: "military-press",
  beine: "kniebeuge",
  huefte: "kreuzheben",
  ziehenV: "klimmzuege",
  ziehenH: "langhantelrudern"
};

// Für Ränge zählen nur Sätze mit so vielen Wiederholungen. Bei mehr wird die 1RM-Schätzung zu ungenau.
const RANG_WDH_MIN = 1;
const RANG_WDH_MAX = 10;

// Der Bestwert einer Übung ist ihr höchstes 1RM aus so vielen Tagen
const BESTWERT_TAGE = 180;

// Den Gesamt-Kraftrang gibt es erst ab so vielen Mustern mit Wert
const GESAMT_MIN_MUSTER = 3;

// Nachfrage "Stimmt der Wert?": wenn ein neuer Bestwert um mehr als diesen Anteil über dem
// Bestwert derselben Übung aus den letzten PLAUSIBEL_TAGE Tagen liegt
const PLAUSIBEL_ANTEIL = 0.15;
const PLAUSIBEL_TAGE = 14;

// ---------- Fortschritts-Rang ----------

// Schwellen für die Steigerung gegenüber dem Startwert: 0.10 heißt 10 % mehr
const FORTSCHRITT_SCHWELLEN = [0, 0.10, 0.25, 0.50, 0.80, 1.20, 1.60];

// Der Startwert ist das beste 1RM aus den ersten so vielen Tagen mit der Übung.
// Einen Fortschritts-Rang gibt es ab so vielen Trainingstagen mit ihr.
const FORTSCHRITT_START_TAGE = 28;
const FORTSCHRITT_MIN_TAGE = 2;

// ---------- Konstanz-Rang ----------

// Schwellen für die Serie in Wochen
const KONSTANZ_SCHWELLEN = [0, 2, 6, 12, 26, 52, 78];

// Nach je so vielen Trainingswochen einer Serie kommt eine Pausenwoche dazu, höchstens SERIE_PAUSEN_MAX
const SERIE_WOCHEN_JE_PAUSE = 8;
const SERIE_PAUSEN_MAX = 2;

// ---------- Abzeichen ----------

// Abzeichen mit drei Stufen (Bronze, Silber, Gold). Das Volumen steht in kg (10 t, 100 t, 500 t),
// die Serie in Wochen, der Gesamt-Rang in RP (Beginn von Rang 3, 4 und 5).
const ABZEICHEN_STUFEN = {
  workouts: [10, 50, 100],
  volumen: [10000, 100000, 500000],
  serie: [4, 12, 26],
  gesamtRang: [2 * RP_JE_RANG, 3 * RP_JE_RANG, 4 * RP_JE_RANG],
  rekorde: [5, 25, 100]
};

// Abzeichen, die es nur einmal gibt, und geheime, die erst erscheinen, wenn sie erreicht sind
const ABZEICHEN_EINMALIG = ["erstesTraining", "koerpergewicht", "ersteRoutine", "erstesBackup", "allrounder"];
const ABZEICHEN_GEHEIM = ["fruehaufsteher"];

// Allrounder: alle sechs Muster haben mindestens so viele RP (Beginn von Rang 3)
const ALLROUNDER_RP = 2 * RP_JE_RANG;

// Frühaufsteher: ein Training, das vor dieser Stunde begonnen hat
const FRUEH_STUNDE = 7;

const TAG_MS = 86400000;

// ---------- Rechnen: Rangpunkte ----------

// Geschätztes Maximalgewicht für eine Wiederholung nach Epley: Last × (1 + Wdh. ÷ 30).
// Bei genau einer Wiederholung gilt die Last selbst.
function epley1RM(last, wdh) {
  if (wdh > 1) {
    return last * (1 + wdh / 30);
  }
  return last;
}

// Zählt ein Satz für die Ränge? Nur mit 1 bis 10 Wiederholungen und einer Last über 0.
function rangSatzGueltig(last, wdh) {
  return wdh >= RANG_WDH_MIN && wdh <= RANG_WDH_MAX && last > 0;
}

// Macht aus Rangpunkten den Rang (1 bis 6), die Unterstufe (1 bis 3) und die RP, die bis zur nächsten Stufe fehlen.
// rpInStufe sind die RP, die in der laufenden Stufe schon erreicht sind (für den Balken).
function rpZuRang(rp) {
  const punkte = Math.max(0, Math.min(RP_MAX, rp));
  // Ganz oben gibt es keine nächste Stufe mehr: Die 1800 RP gehören noch zur letzten
  const stufeGesamt = Math.min(RANG_ANZAHL * RANG_STUFEN - 1, Math.floor(punkte / RP_JE_STUFE));
  let rpBisNaechste = (stufeGesamt + 1) * RP_JE_STUFE - punkte;
  if (punkte >= RP_MAX) {
    rpBisNaechste = 0;
  }
  return {
    rang: Math.floor(stufeGesamt / RANG_STUFEN) + 1,
    stufe: stufeGesamt % RANG_STUFEN + 1,
    rpBisNaechste: rpBisNaechste,
    rpInStufe: punkte - stufeGesamt * RP_JE_STUFE
  };
}

// Rechnet einen Wert über sieben Schwellen in Rangpunkte um. Zwischen zwei Schwellen steigen die RP gleichmäßig,
// je Abschnitt um 300. Das Ergebnis ist abgerundet und liegt zwischen 0 und 1800.
function rpAusSchwellen(wert, schwellen) {
  if (!(wert > 0)) {
    return 0;
  }
  if (wert >= schwellen[RANG_ANZAHL]) {
    return RP_MAX;
  }
  let r = 0;
  while (r < RANG_ANZAHL - 1 && wert >= schwellen[r + 1]) {
    r++;
  }
  const rp = r * RP_JE_RANG + RP_JE_RANG * (wert - schwellen[r]) / (schwellen[r + 1] - schwellen[r]);
  // Der winzige Zuschlag fängt Rundungsfehler ab, sonst würde aus 299,9999999 eine 299
  return Math.floor(rp + 1e-9);
}

// Die Umkehrung: der Wert, bei dem genau so viele Rangpunkte erreicht sind
function wertFuerRP(rp, schwellen) {
  const punkte = Math.max(0, Math.min(RP_MAX, rp));
  const r = Math.min(RANG_ANZAHL - 1, Math.floor(punkte / RP_JE_RANG));
  return schwellen[r] + (punkte - r * RP_JE_RANG) / RP_JE_RANG * (schwellen[r + 1] - schwellen[r]);
}

// ---------- Rechnen: Bestwerte ----------

// Der höchste Wert aus den letzten Tagen als { zeit, wert }. punkte ist eine Liste von { zeit, wert },
// jetzt der Zeitpunkt in Millisekunden, von dem aus zurückgerechnet wird. Ohne Punkt in dieser Zeit: null.
function bestwertIn(punkte, jetzt, tage) {
  let bester = null;
  for (let i = 0; i < punkte.length; i++) {
    const p = punkte[i];
    if (p.zeit > jetzt - tage * TAG_MS && p.zeit <= jetzt && (bester === null || p.wert > bester.wert)) {
      bester = p;
    }
  }
  return bester;
}

// Soll die App nachfragen, ob der Wert stimmt? Ja, wenn der neue Bestwert um mehr als 15 % über dem vorigen liegt.
// vorher ist der Bestwert derselben Übung aus den letzten PLAUSIBEL_TAGE Tagen (ohne den neuen Satz).
function bestwertUnplausibel(neu, vorher) {
  // Der winzige Zuschlag fängt Rundungsfehler ab: Genau 15 % mehr ist noch in Ordnung
  return vorher > 0 && neu / vorher - 1 > PLAUSIBEL_ANTEIL + 1e-9;
}

// Rechnet das 1RM einer Übung in das der Referenz-Übung ihres Musters um.
// rang ist das Feld der Übung aus der uebungen.js: { muster, faktor, zaehlung }.
// zaehlung "summe": Eingetragen wird das Gewicht einer Kurzhantel, gezählt werden beide.
// Bei "normal", "proSeite" und "koerpergewicht" gilt das 1RM, wie es ist. Das Körpergewicht
// steckt bei Eigengewicht-Übungen schon im 1RM.
function kraftAequivalent(einsRM, rang) {
  let last = einsRM;
  if (rang.zaehlung === "summe") {
    last = einsRM * 2;
  }
  return last / rang.faktor;
}

// Das Körpergewicht für einen Kraft-Rang: der 7-Tage-Schnitt am Tag des Bestwerts,
// sonst die letzte Messung davor, sonst die erste danach. Ohne jede Messung: null.
// messungen ist eine Liste von { zeit, wert }, die älteste zuerst. schnittAm ist die Funktion der app.js.
function rangKoerpergewicht(messungen, zeit, schnittAm) {
  if (messungen.length === 0) {
    return null;
  }
  const schnitt = schnittAm(messungen, new Date(zeit));
  if (schnitt !== null) {
    return schnitt;
  }
  let wert = messungen[0].wert;
  for (let i = 0; i < messungen.length; i++) {
    if (messungen[i].zeit < zeit) {
      wert = messungen[i].wert;
    }
  }
  return wert;
}

// ---------- Rechnen: Kraft-Ränge ----------

// Die Kraft-Ränge aller Muster und der Gesamt-Kraftrang.
// uebungen:   Liste von { id, rang, punkte }. punkte sind die 1RM-Werte der Übung je Trainingstag
//             als { zeit, wert }, nur aus gültigen Sätzen.
// koerperAm:  Funktion, die zu einem Zeitpunkt das Körpergewicht in kg liefert (oder null)
// jetzt:      heutiger Zeitpunkt in Millisekunden
// Ergebnis:   muster[<id>] ist null oder { uebungId, rang, bestwert, zeit, aequivalent, koerper, verhaeltnis, rp }.
//             Ohne Körpergewicht sind koerper, verhaeltnis und rp null und ohneKoerper ist true.
//             gesamt ist der Durchschnitt der RP oder null, solange weniger als drei Muster einen Wert haben.
//             fehlen sagt, wie viele Muster bis zum Gesamt-Rang noch fehlen.
function kraftRaenge(uebungen, koerperAm, jetzt) {
  const ergebnis = { muster: {}, anzahl: 0, gesamt: null, fehlen: GESAMT_MIN_MUSTER, ohneKoerper: false };
  for (let i = 0; i < MUSTER.length; i++) {
    ergebnis.muster[MUSTER[i]] = null;
  }

  // Je Muster gewinnt die Übung mit dem höchsten Äquivalent
  for (let i = 0; i < uebungen.length; i++) {
    const u = uebungen[i];
    if (!u.rang || !MUSTER_SCHWELLEN[u.rang.muster]) {
      continue;
    }
    const bester = bestwertIn(u.punkte, jetzt, BESTWERT_TAGE);
    if (!bester) {
      continue;
    }
    const aequivalent = kraftAequivalent(bester.wert, u.rang);
    const bisher = ergebnis.muster[u.rang.muster];
    if (!bisher || aequivalent > bisher.aequivalent) {
      ergebnis.muster[u.rang.muster] = {
        uebungId: u.id, rang: u.rang, bestwert: bester.wert, zeit: bester.zeit,
        aequivalent: aequivalent, koerper: null, verhaeltnis: null, rp: null
      };
    }
  }

  let summe = 0;
  for (let i = 0; i < MUSTER.length; i++) {
    const m = ergebnis.muster[MUSTER[i]];
    if (!m) {
      continue;
    }
    const koerper = koerperAm(m.zeit);
    if (koerper === null || !(koerper > 0)) {
      ergebnis.ohneKoerper = true;
      continue;
    }
    m.koerper = koerper;
    m.verhaeltnis = m.aequivalent / koerper;
    m.rp = rpAusSchwellen(m.verhaeltnis, MUSTER_SCHWELLEN[MUSTER[i]]);
    summe += m.rp;
    ergebnis.anzahl++;
  }

  // Fehlende Muster geben keinen Abzug: Der Durchschnitt geht nur über die Muster mit Wert
  ergebnis.fehlen = Math.max(0, GESAMT_MIN_MUSTER - ergebnis.anzahl);
  if (ergebnis.anzahl >= GESAMT_MIN_MUSTER) {
    ergebnis.gesamt = Math.floor(summe / ergebnis.anzahl);
  }
  return ergebnis;
}

// Das Muster, das seiner nächsten Stufe am nächsten ist, für "noch X kg bis ...".
// ergebnis kommt von kraftRaenge. Zurück kommt { muster, uebungId, zielRp, fehltKg } oder null.
// fehltKg ist das fehlende 1RM in der Übung selbst, so wie sie eingetragen wird (bei Kurzhanteln pro Hantel).
function naechsterSchritt(ergebnis) {
  let naechster = null;
  for (let i = 0; i < MUSTER.length; i++) {
    const m = ergebnis.muster[MUSTER[i]];
    if (!m || m.rp === null || m.rp >= RP_MAX) {
      continue;
    }
    const bis = rpZuRang(m.rp).rpBisNaechste;
    if (naechster === null || bis < naechster.bis) {
      const zielRp = m.rp + bis;
      const zielAequivalent = wertFuerRP(zielRp, MUSTER_SCHWELLEN[MUSTER[i]]) * m.koerper;
      // Das Äquivalent zurück in das 1RM der Übung rechnen: der umgekehrte Weg von kraftAequivalent
      const fehltKg = (zielAequivalent - m.aequivalent) * m.rang.faktor / kraftAequivalent(1, { faktor: 1, zaehlung: m.rang.zaehlung });
      naechster = { muster: MUSTER[i], uebungId: m.uebungId, zielRp: zielRp, fehltKg: Math.max(0, fehltKg), bis: bis };
    }
  }
  return naechster;
}

// ---------- Rechnen: Fortschritts-Rang ----------

// Der Fortschritts-Rang einer Übung: wie stark ihr Bestwert über dem Startwert liegt.
// punkte sind ihre 1RM-Werte je Trainingstag als { zeit, wert }, der älteste Tag zuerst.
// Zurück kommt { start, bestwert, steigerung, rp }. Mit weniger als zwei Trainingstagen
// oder ohne Bestwert aus den letzten 180 Tagen: null.
function fortschrittRang(punkte, jetzt) {
  if (punkte.length < FORTSCHRITT_MIN_TAGE) {
    return null;
  }
  const bester = bestwertIn(punkte, jetzt, BESTWERT_TAGE);
  if (!bester) {
    return null;
  }
  let start = 0;
  for (let i = 0; i < punkte.length; i++) {
    if (punkte[i].zeit < punkte[0].zeit + FORTSCHRITT_START_TAGE * TAG_MS) {
      start = Math.max(start, punkte[i].wert);
    }
  }
  if (!(start > 0)) {
    return null;
  }
  const steigerung = bester.wert / start - 1;
  return { start: start, bestwert: bester.wert, steigerung: steigerung, rp: rpAusSchwellen(steigerung, FORTSCHRITT_SCHWELLEN) };
}

// ---------- Rechnen: Serie ----------

// Die Serie in Wochen, mit Pausenwochen.
// tageProWoche:    zu jedem Montag (Zeit in Millisekunden) die Zahl der Trainingstage der Woche
// aktuellerMontag: der Montag der laufenden Woche als Zeit in Millisekunden
// minTage:         so viele Trainingstage braucht eine Woche, um zu zählen
// Eine Woche mit genug Tagen verlängert die Serie. Nach je 8 solchen Wochen kommt eine Pausenwoche dazu
// (höchstens 2). Eine verpasste Woche verbraucht eine Pausenwoche, statt die Serie zu brechen.
// Sie zählt selbst nicht mit. Die laufende Woche zählt erst, wenn sie vorbei ist.
// Zurück kommt { serie, pausen, laengste, erreichtAm }: die laufende Serie, die angesparten Pausenwochen,
// die längste Serie überhaupt und zu jeder je erreichten Länge der Sonntag, an dem sie zum ersten Mal erreicht war.
function serieBerechnen(tageProWoche, aktuellerMontag, minTage) {
  const ergebnis = { serie: 0, pausen: 0, laengste: 0, erreichtAm: {} };
  const montage = Object.keys(tageProWoche).map(Number).sort(function (a, b) {
    return a - b;
  });
  if (montage.length === 0) {
    return ergebnis;
  }

  // Über das Datum weiterzählen, nicht über Millisekunden: Wochen mit Zeitumstellung sind eine Stunde kürzer oder länger
  let montag = new Date(montage[0]);
  while (montag.getTime() < aktuellerMontag) {
    if ((tageProWoche[montag.getTime()] || 0) >= minTage) {
      ergebnis.serie++;
      if (ergebnis.serie % SERIE_WOCHEN_JE_PAUSE === 0) {
        ergebnis.pausen = Math.min(SERIE_PAUSEN_MAX, ergebnis.pausen + 1);
      }
      if (ergebnis.serie > ergebnis.laengste) {
        ergebnis.laengste = ergebnis.serie;
        ergebnis.erreichtAm[ergebnis.serie] = new Date(montag.getFullYear(), montag.getMonth(), montag.getDate() + 6).getTime();
      }
    } else if (ergebnis.serie > 0 && ergebnis.pausen > 0) {
      ergebnis.pausen--;
    } else {
      ergebnis.serie = 0;
      ergebnis.pausen = 0;
    }
    montag = new Date(montag.getFullYear(), montag.getMonth(), montag.getDate() + 7);
  }
  return ergebnis;
}

// ---------- Rechnen: Abzeichen ----------

// Wie viele Stufen eines Abzeichens erreicht sind: 0 (keine) bis 3 (Gold)
function abzeichenStufe(wert, stufen) {
  let stufe = 0;
  while (stufe < stufen.length && wert >= stufen[stufe]) {
    stufe++;
  }
  return stufe;
}

// Wann eine wachsende Summe eine Schwelle erreicht hat. punkte ist eine Liste von { zeit, wert },
// die älteste zuerst. Die Werte werden zusammengezählt. Zurück kommt die Zeit des Punktes,
// mit dem die Schwelle erreicht war, oder null, wenn sie noch nicht erreicht ist.
function summeErreichtAm(punkte, schwelle) {
  let summe = 0;
  for (let i = 0; i < punkte.length; i++) {
    summe += punkte[i].wert;
    if (summe >= schwelle) {
      return punkte[i].zeit;
    }
  }
  return null;
}

// Die persönlichen Rekorde über alle Übungen als Liste von { zeit, wert: 1 }, der älteste zuerst.
// punkteListen enthält je Übung ihre 1RM-Werte je Trainingstag, der älteste Tag zuerst.
// Ein Rekord ist ein Tag, an dem der Wert über dem bisherigen Bestwert der Übung liegt.
// Der erste Tag einer Übung zählt nicht.
function rekorde(punkteListen) {
  const liste = [];
  for (let i = 0; i < punkteListen.length; i++) {
    const punkte = punkteListen[i];
    let bester = 0;
    for (let j = 0; j < punkte.length; j++) {
      if (j > 0 && punkte[j].wert > bester) {
        liste.push({ zeit: punkte[j].zeit, wert: 1 });
      }
      bester = Math.max(bester, punkte[j].wert);
    }
  }
  liste.sort(function (a, b) {
    return a.zeit - b.zeit;
  });
  return liste;
}

// ---------- Rechnen: Merker ----------

// Der Merker ist das Einzige, was das Rang-System speichert:
// gesehen:            die RP, zu denen schon eine Meldung "Neuer Rang" kam (je Muster, "gesamt" und "konstanz")
// hoechsterGesamtRP:  der höchste Gesamt-Kraftrang, der je erreicht war
// abzeichenGesehen:   die erreichten Abzeichen mit dem Datum des ersten Erreichens ("" = Datum unbekannt)
// Prüft einen gespeicherten oder importierten Merker. Was fehlt oder kaputt ist, wird leer.
function rangMerkerBereinigen(m) {
  const sauber = { gesehen: {}, hoechsterGesamtRP: 0, abzeichenGesehen: {} };
  if (!m || typeof m !== "object") {
    return sauber;
  }

  const schluessel = MUSTER.concat(["gesamt", "konstanz"]);
  if (m.gesehen && typeof m.gesehen === "object") {
    for (let i = 0; i < schluessel.length; i++) {
      const rp = m.gesehen[schluessel[i]];
      if (typeof rp === "number" && rp >= 0 && rp <= RP_MAX) {
        sauber.gesehen[schluessel[i]] = rp;
      }
    }
  }
  if (typeof m.hoechsterGesamtRP === "number" && m.hoechsterGesamtRP >= 0 && m.hoechsterGesamtRP <= RP_MAX) {
    sauber.hoechsterGesamtRP = m.hoechsterGesamtRP;
  }

  // Eine reine Liste von ids wird auch angenommen, dann fehlt das Datum
  const abzeichen = m.abzeichenGesehen;
  if (Array.isArray(abzeichen)) {
    for (let i = 0; i < abzeichen.length; i++) {
      if (abzeichenIdGueltig(abzeichen[i])) {
        sauber.abzeichenGesehen[abzeichen[i]] = "";
      }
    }
  } else if (abzeichen && typeof abzeichen === "object") {
    Object.keys(abzeichen).forEach(function (id) {
      if (abzeichenIdGueltig(id)) {
        const datum = abzeichen[id];
        sauber.abzeichenGesehen[id] = typeof datum === "string" && !isNaN(new Date(datum)) ? datum : "";
      }
    });
  }
  return sauber;
}

// Die id eines Abzeichens: bei Abzeichen mit Stufen der Name und die Stufe, z. B. "workouts-2", sonst nur der Name
function abzeichenIdGueltig(id) {
  if (typeof id !== "string") {
    return false;
  }
  const teile = id.split("-");
  if (ABZEICHEN_STUFEN[teile[0]]) {
    return teile.length === 2 && Number(teile[1]) >= 1 && Number(teile[1]) <= ABZEICHEN_STUFEN[teile[0]].length
      && String(Number(teile[1])) === teile[1];
  }
  return teile.length === 1 && (ABZEICHEN_EINMALIG.indexOf(id) !== -1 || ABZEICHEN_GEHEIM.indexOf(id) !== -1);
}

// Welche Ränge seit der letzten Meldung eine Stufe gestiegen sind.
// gesehen ist der Teil des Merkers, aktuell hat denselben Aufbau mit den heutigen RP (null = kein Rang).
// Zurück kommt eine Liste von { schluessel, rp }. Ein Rang, den es vorher noch gar nicht gab, zählt als neu.
function neueStufen(gesehen, aktuell) {
  const liste = [];
  const schluessel = MUSTER.concat(["gesamt", "konstanz"]);
  for (let i = 0; i < schluessel.length; i++) {
    const rp = aktuell[schluessel[i]];
    if (typeof rp !== "number") {
      continue;
    }
    const vorher = gesehen[schluessel[i]];
    const stufeVorher = typeof vorher === "number" ? Math.floor(Math.min(vorher, RP_MAX - 1) / RP_JE_STUFE) : -1;
    if (Math.floor(Math.min(rp, RP_MAX - 1) / RP_JE_STUFE) > stufeVorher) {
      liste.push({ schluessel: schluessel[i], rp: rp });
    }
  }
  return liste;
}
