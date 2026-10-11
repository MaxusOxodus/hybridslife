// Vorlagen: fertige Trainingspläne nach Trainingstagen pro Woche (2 bis 6 Tage).
// Die app.js liest diese Listen nur. Die Namen der Muster, Varianten und Tage stehen in der texte.js.
//
// Quelle der Pläne: externes Gratis-PDF von Shifting Fitness (Trainingspläne nach Bewegungsmustern).
// Die Nutzungsrechte sind noch nicht geklärt. Das muss vor der Veröffentlichung der App geschehen.
//
// Die Pläne geben Bewegungsmuster vor, keine festen Übungen. Jeder Platz eines Trainingstags ("Slot")
// nennt sein Muster und eine Standard-Übung, die sich in der Vorschau tauschen lässt.

// Die Bewegungsmuster. Der Schlüssel ist das Kürzel aus dem Plan, der Name steht unter "vorlage.muster.<Kürzel>".
// uebungId:     die Standard-Übung (ihre ID aus der uebungen.js). Wo es das gibt, zählt sie für einen Kraft-Rang.
// alternativen: die Übungen, die beim Tauschen zuerst vorgeschlagen werden, die Standard-Übung eingeschlossen.
//               Bei FREI und ISO ist die Liste leer: Dort schlägt die App Übungen derselben Muskelgruppe vor.
const VORLAGEN_MUSTER = {
  HD: { uebungId: "bankdruecken-lh", alternativen: ["bankdruecken-lh", "bankdruecken-kh", "bankdruecken-multi", "brustpresse-steck", "brustpresse-scheibe", "brustpresse-kabel"] },
  VD: { uebungId: "seated-dumbbell-shoulder-press", alternativen: ["seated-dumbbell-shoulder-press", "military-press", "schulterdruecken", "plate-loaded-machine-shoulder-press", "smith-machine-overhead-press"] },
  SD: { uebungId: "schraegbank-45-kh", alternativen: ["schraegbank-45-kh", "schraegbank-45-lh", "machine-incline-press", "schraegbank-45-multi", "schraegpresse-scheibe"] },
  DIPS: { uebungId: "dips", alternativen: ["dips", "brust-dips", "trizeps-dips", "machine-assisted-dip", "dip-maschine-brust"] },
  FLY: { uebungId: "butterfly", alternativen: ["butterfly", "kabelfly-horizontal", "kabelfly-sitzend", "fliegende-kh"] },
  FLYS: { uebungId: "kabelfly-tief-hoch", alternativen: ["kabelfly-tief-hoch", "fliegende-45-kh", "fliegende-flach-kh"] },
  SEIT: { uebungId: "seitheben", alternativen: ["seitheben", "single-arm-cable-lateral-raise", "seated-machine-lateral-raise", "seated-dumbbell-lateral-raise"] },
  HSI: { uebungId: "neutral-grip-machine-rear-delt-fly", alternativen: ["neutral-grip-machine-rear-delt-fly", "overhand-grip-cable-rear-delt-fly", "dumbbell-rear-delt-row", "barbell-rear-delt-row", "reverse-flys", "face-pulls"] },
  TRI: { uebungId: "trizepsdruecken-kabel", alternativen: ["trizepsdruecken-kabel", "ueberkopf-trizepsstrecken", "cable-v-bar-overhead-triceps-extension", "dumbbell-overhead-triceps-extension", "french-press", "ez-bar-skull-crusher"] },
  BIZ: { uebungId: "kurzhantelcurls", alternativen: ["kurzhantelcurls", "seated-dumbbell-curl", "kabelcurls", "pin-loaded-machine-preacher-curl", "scottcurls", "hammercurls"] },
  PREA: { uebungId: "scottcurls", alternativen: ["scottcurls", "pin-loaded-machine-preacher-curl", "single-arm-pin-loaded-machine-preacher-curl", "kurzhantelcurls", "kabelcurls"] },
  HAMM: { uebungId: "hammercurls", alternativen: ["hammercurls", "cable-rope-hammer-curl", "cross-body-hammer-curl", "kurzhantelcurls"] },
  UEB: { uebungId: "cable-rope-straight-arm-lat-pulldown", alternativen: ["cable-rope-straight-arm-lat-pulldown", "kneeling-cable-straight-arm-lat-pulldown", "dumbbell-pullover", "barbell-pullover"] },
  HZB: { uebungId: "wide-grip-cable-row", alternativen: ["wide-grip-cable-row", "wide-grip-barbell-row", "langhantelrudern", "wide-grip-plate-loaded-machine-row", "chest-supported-wide-grip-t-bar-row", "t-bar-rudern"] },
  HZE: { uebungId: "kabelrudern", alternativen: ["kabelrudern", "kurzhantelrudern", "underhand-barbell-row", "neutral-grip-machine-row", "neutral-grip-plate-loaded-machine-row"] },
  VZB: { uebungId: "wide-grip-cable-lat-pulldown", alternativen: ["wide-grip-cable-lat-pulldown", "latzug", "machine-lat-pulldown", "wide-grip-pull-up"] },
  VZE: { uebungId: "neutral-close-grip-cable-lat-pulldown", alternativen: ["neutral-close-grip-cable-lat-pulldown", "underhand-close-grip-cable-lat-pulldown", "chin-up", "machine-lat-pulldown", "cable-rope-high-row"] },
  KB: { uebungId: "kniebeuge", alternativen: ["kniebeuge", "smith-machine-back-squat", "hack-squat", "dumbbell-split-squat", "smith-machine-split-squat"] },
  KBP: { uebungId: "hack-squat", alternativen: ["hack-squat", "kniebeuge", "smith-machine-back-squat", "beinpresse", "45-leg-press"] },
  BP: { uebungId: "beinpresse", alternativen: ["beinpresse", "45-leg-press", "pin-loaded-leg-press", "single-leg-45-leg-press"] },
  KH: { uebungId: "rumaenisches-kreuzheben", alternativen: ["rumaenisches-kreuzheben", "stiff-leg-deadlift", "kreuzheben", "dumbbell-romanian-deadlift"] },
  BBI: { uebungId: "seated-hamstring-curl", alternativen: ["seated-hamstring-curl", "lying-hamstring-curl", "beinbeuger-maschine"] },
  BBP: { uebungId: "lying-hamstring-curl", alternativen: ["lying-hamstring-curl", "seated-hamstring-curl", "kickbacks-kabel", "standing-pin-loaded-machine-glute-kickback", "hip-thrust", "machine-back-extension"] },
  BS: { uebungId: "beinstrecker", alternativen: ["beinstrecker", "single-leg-leg-extension"] },
  ADD: { uebungId: "reclined-machine-hip-adduction", alternativen: ["reclined-machine-hip-adduction", "cable-hip-adduction"] },
  WAD: { uebungId: "wadenheben", alternativen: ["wadenheben", "seated-calf-raise", "standing-smith-machine-calf-raise", "45-leg-press-calf-raise"] },
  WADS: { uebungId: "standing-calf-raise", alternativen: ["standing-calf-raise", "standing-smith-machine-calf-raise", "dumbbell-standing-calf-raise", "barbell-standing-calf-raise", "wadenheben"] },
  HUEFT: { uebungId: "hip-thrust", alternativen: ["hip-thrust", "plate-loaded-machine-hip-thrust", "smith-machine-hip-thrust", "good-morning", "machine-back-extension"] },
  BAUCH: { uebungId: "cable-crunches", alternativen: ["cable-crunches", "machine-crunch", "crunches", "beinheben", "hanging-leg-raise-eigen"] },
  FREI: { uebungId: "", alternativen: [] },
  ISO: { uebungId: "", alternativen: [] }
};

// Baut einen Slot: Muster, Sätze und Wiederholungsbereich. Die Übung ist die Standard-Übung des Musters,
// außer es steht eine eigene dabei. Das braucht es bei FREI und ISO und wenn ein Muster an einem Tag zweimal vorkommt.
function vorlageSlot(muster, saetze, wdhVon, wdhBis, uebungId) {
  return { muster: muster, uebungId: uebungId || VORLAGEN_MUSTER[muster].uebungId, saetze: saetze, wdhVon: wdhVon, wdhBis: wdhBis };
}

// Die Pläne: Tageszahl → Varianten → Tage → Slots.
// tage:       so viele Trainingstage pro Woche
// varianten:  id (fest, für den Namen unter "vorlage.variante.<id>"), wochentage und die Trainingstage
// wochentage: an welchen Tagen trainiert wird, in der Reihenfolge der Trainingstage (0 = Montag, 6 = Sonntag)
// tage[].name: Schlüssel für den Namen des Trainingstags, er steht unter "vorlage.tag.<name>"
// Ein neuer Plan kommt als weitere Variante dazu, eine neue Tageszahl als weiterer Eintrag der Liste.
const VORLAGEN_PLAENE = [
  {
    tage: 2,
    varianten: [
      {
        id: "2-ganzkoerper",
        wochentage: [0, 3],
        tage: [
          // Im PDF stehen hier drei Split-Tage (A, B, C), aber nur A und B sind beschrieben.
          // FREI ("Übung deiner Wahl"): Vorgeschlagen wird, was im Plan zu kurz kommt (Arme, Waden, Bauch).
          { name: "ganzkoerperA", slots: [
            vorlageSlot("HD", 2, 6, 10), vorlageSlot("VZB", 2, 6, 10), vorlageSlot("VD", 2, 6, 10), vorlageSlot("HZB", 2, 6, 10),
            vorlageSlot("BP", 2, 6, 8), vorlageSlot("BBI", 2, 8, 12),
            vorlageSlot("FREI", 2, 8, 12, "kurzhantelcurls"), vorlageSlot("FREI", 2, 8, 12, "trizepsdruecken-kabel")
          ] },
          { name: "ganzkoerperB", slots: [
            vorlageSlot("KH", 3, 5, 8), vorlageSlot("BS", 2, 6, 8), vorlageSlot("FLY", 2, 6, 10), vorlageSlot("VZE", 2, 6, 10),
            vorlageSlot("HZB", 2, 6, 10), vorlageSlot("SEIT", 2, 8, 12),
            vorlageSlot("FREI", 2, 8, 12, "wadenheben"), vorlageSlot("FREI", 2, 8, 12, "cable-crunches")
          ] }
        ]
      }
    ]
  },
  {
    tage: 3,
    varianten: [
      {
        id: "3-ganzkoerper",
        wochentage: [0, 3, 5],
        tage: [
          { name: "ganzkoerperA", slots: [
            vorlageSlot("KB", 3, 6, 8), vorlageSlot("HD", 3, 6, 10), vorlageSlot("VZB", 2, 6, 10), vorlageSlot("HZB", 2, 8, 12),
            vorlageSlot("SEIT", 3, 8, 12), vorlageSlot("BBI", 2, 8, 12), vorlageSlot("BIZ", 2, 6, 10)
          ] },
          { name: "ganzkoerperB", slots: [
            vorlageSlot("KH", 3, 5, 8), vorlageSlot("VD", 3, 6, 8), vorlageSlot("BP", 2, 6, 10), vorlageSlot("HZE", 3, 8, 12),
            vorlageSlot("FLY", 2, 8, 12), vorlageSlot("HSI", 2, 8, 12), vorlageSlot("TRI", 3, 8, 12)
          ] },
          { name: "ganzkoerperC", slots: [
            vorlageSlot("SD", 3, 6, 8), vorlageSlot("VZE", 3, 6, 10), vorlageSlot("BS", 2, 8, 12), vorlageSlot("SEIT", 3, 10, 12),
            vorlageSlot("BIZ", 2, 8, 12), vorlageSlot("WAD", 3, 8, 12), vorlageSlot("BAUCH", 3, 6, 10)
          ] }
        ]
      },
      {
        id: "3-ok-uk-gk",
        wochentage: [0, 2, 5],
        tage: [
          { name: "oberkoerper", slots: [
            vorlageSlot("HD", 3, 6, 8), vorlageSlot("VZB", 3, 6, 8), vorlageSlot("SEIT", 3, 8, 12), vorlageSlot("HZB", 2, 6, 10),
            vorlageSlot("BIZ", 2, 6, 10), vorlageSlot("TRI", 2, 6, 10)
          ] },
          { name: "unterkoerper", slots: [
            vorlageSlot("BBI", 3, 6, 10), vorlageSlot("KBP", 2, 5, 8), vorlageSlot("ADD", 2, 8, 12), vorlageSlot("BS", 2, 6, 10),
            vorlageSlot("WAD", 3, 8, 12), vorlageSlot("BAUCH", 3, 6, 10)
          ] },
          // ISO ("Isolation deiner Wahl"): Die hintere Schulter fehlt im Plan ganz, die Hammercurls ergänzen die Arme.
          { name: "ganzkoerper", slots: [
            vorlageSlot("KH", 3, 5, 8), vorlageSlot("FLY", 3, 6, 10), vorlageSlot("VZE", 2, 8, 12), vorlageSlot("BP", 2, 6, 8),
            vorlageSlot("VD", 2, 6, 10),
            vorlageSlot("ISO", 2, 6, 10, "neutral-grip-machine-rear-delt-fly"), vorlageSlot("ISO", 2, 6, 10, "hammercurls")
          ] }
        ]
      }
    ]
  },
  {
    tage: 4,
    varianten: [
      {
        id: "4-ok-uk",
        wochentage: [0, 1, 3, 4],
        tage: [
          { name: "oberkoerperA", slots: [
            vorlageSlot("HD", 3, 6, 10), vorlageSlot("HZB", 3, 6, 10), vorlageSlot("VD", 3, 8, 12), vorlageSlot("VZB", 2, 8, 12),
            vorlageSlot("SEIT", 3, 8, 12), vorlageSlot("TRI", 2, 8, 12), vorlageSlot("BIZ", 2, 8, 12)
          ] },
          { name: "unterkoerperA", slots: [
            vorlageSlot("BBI", 3, 6, 10), vorlageSlot("KB", 2, 6, 8), vorlageSlot("BS", 3, 6, 10), vorlageSlot("HUEFT", 2, 6, 10),
            vorlageSlot("WAD", 3, 8, 12)
          ] },
          { name: "oberkoerperB", slots: [
            vorlageSlot("VZB", 3, 6, 10), vorlageSlot("SD", 3, 6, 10), vorlageSlot("HZE", 2, 6, 10), vorlageSlot("FLY", 2, 6, 10),
            vorlageSlot("SEIT", 3, 8, 12), vorlageSlot("BIZ", 2, 8, 12), vorlageSlot("TRI", 2, 8, 12)
          ] },
          { name: "unterkoerperB", slots: [
            vorlageSlot("KH", 3, 6, 8), vorlageSlot("BP", 3, 6, 8), vorlageSlot("BBI", 2, 8, 12), vorlageSlot("ADD", 2, 8, 12),
            vorlageSlot("WAD", 2, 6, 10), vorlageSlot("BAUCH", 3, 8, 12)
          ] }
        ]
      },
      {
        id: "4-push-pull",
        wochentage: [0, 1, 4, 5],
        tage: [
          { name: "pushFullbody", slots: [
            vorlageSlot("HD", 3, 6, 8), vorlageSlot("SEIT", 3, 8, 12), vorlageSlot("FLYS", 2, 6, 10), vorlageSlot("TRI", 2, 8, 12),
            vorlageSlot("BP", 2, 6, 8), vorlageSlot("BS", 2, 6, 10), vorlageSlot("WADS", 3, 6, 10)
          ] },
          { name: "pullFullbody", slots: [
            vorlageSlot("VZB", 2, 6, 10), vorlageSlot("HZB", 3, 6, 10), vorlageSlot("HZE", 2, 6, 10), vorlageSlot("BIZ", 3, 6, 10),
            vorlageSlot("BBI", 3, 6, 10), vorlageSlot("BAUCH", 3, 6, 10)
          ] },
          { name: "pushFullbody2", slots: [
            vorlageSlot("DIPS", 3, 5, 8), vorlageSlot("VD", 3, 6, 10), vorlageSlot("FLY", 2, 6, 10), vorlageSlot("TRI", 2, 6, 10),
            vorlageSlot("BS", 3, 6, 10), vorlageSlot("WAD", 3, 6, 10)
          ] },
          { name: "pullFullbody2", slots: [
            vorlageSlot("KH", 3, 5, 8), vorlageSlot("VZE", 3, 6, 10), vorlageSlot("HZB", 2, 6, 10), vorlageSlot("BBP", 2, 6, 10),
            vorlageSlot("PREA", 2, 6, 10), vorlageSlot("HAMM", 2, 6, 10)
          ] }
        ]
      },
      {
        id: "4-torso-limbs",
        wochentage: [0, 1, 3, 4],
        tage: [
          { name: "torso1", slots: [
            vorlageSlot("SEIT", 3, 8, 12), vorlageSlot("FLY", 3, 6, 8), vorlageSlot("VZB", 2, 6, 10), vorlageSlot("HZB", 3, 6, 10),
            vorlageSlot("SD", 2, 6, 10), vorlageSlot("HZE", 2, 6, 10)
          ] },
          { name: "limbs1", slots: [
            vorlageSlot("BIZ", 3, 6, 10), vorlageSlot("TRI", 3, 6, 10), vorlageSlot("BBI", 3, 6, 10), vorlageSlot("KBP", 2, 6, 8),
            vorlageSlot("BS", 3, 6, 10), vorlageSlot("HUEFT", 2, 6, 10), vorlageSlot("WAD", 3, 8, 12)
          ] },
          { name: "torso2", slots: [
            vorlageSlot("VZB", 2, 6, 10), vorlageSlot("VD", 3, 6, 10), vorlageSlot("FLY", 3, 6, 10), vorlageSlot("HSI", 2, 6, 10),
            vorlageSlot("UEB", 2, 6, 10), vorlageSlot("BAUCH", 3, 6, 10)
          ] },
          { name: "limbs2", slots: [
            vorlageSlot("KH", 2, 5, 8), vorlageSlot("BIZ", 2, 6, 10), vorlageSlot("TRI", 3, 6, 10), vorlageSlot("HAMM", 2, 6, 10),
            vorlageSlot("BS", 3, 6, 8), vorlageSlot("BBI", 2, 8, 12), vorlageSlot("ADD", 2, 8, 12), vorlageSlot("WAD", 2, 6, 10)
          ] }
        ]
      }
    ]
  },
  {
    tage: 5,
    varianten: [
      {
        id: "5-ppl-ok-uk",
        wochentage: [0, 1, 2, 4, 5],
        tage: [
          { name: "pull", slots: [
            vorlageSlot("HZB", 3, 6, 10), vorlageSlot("VZE", 3, 8, 12), vorlageSlot("HZE", 2, 12, 15), vorlageSlot("VZB", 2, 12, 15),
            vorlageSlot("PREA", 2, 6, 10), vorlageSlot("HAMM", 2, 6, 10)
          ] },
          { name: "push", slots: [
            vorlageSlot("HD", 3, 6, 8), vorlageSlot("FLYS", 2, 6, 10), vorlageSlot("DIPS", 2, 6, 8), vorlageSlot("SEIT", 3, 8, 12),
            vorlageSlot("TRI", 2, 8, 12)
          ] },
          { name: "beine", slots: [
            vorlageSlot("KH", 3, 5, 8), vorlageSlot("BP", 3, 6, 8), vorlageSlot("BBI", 3, 6, 10), vorlageSlot("BS", 2, 8, 12),
            vorlageSlot("WAD", 3, 6, 10)
          ] },
          { name: "oberkoerper", slots: [
            vorlageSlot("VZB", 3, 6, 10), vorlageSlot("VD", 2, 6, 10), vorlageSlot("HZB", 3, 6, 10), vorlageSlot("FLY", 2, 6, 10),
            vorlageSlot("SEIT", 2, 8, 12), vorlageSlot("BIZ", 2, 8, 12), vorlageSlot("TRI", 2, 8, 12)
          ] },
          { name: "unterkoerper", slots: [
            vorlageSlot("KBP", 2, 6, 8), vorlageSlot("BBI", 3, 6, 10), vorlageSlot("BS", 3, 6, 10), vorlageSlot("HUEFT", 2, 6, 10),
            vorlageSlot("WAD", 3, 8, 12), vorlageSlot("BAUCH", 3, 6, 10)
          ] }
        ]
      },
      {
        id: "5-brust-ruecken",
        wochentage: [0, 1, 2, 4, 5],
        tage: [
          { name: "brustRuecken", slots: [
            vorlageSlot("HZB", 3, 6, 10), vorlageSlot("HD", 3, 6, 8), vorlageSlot("VZB", 2, 6, 10), vorlageSlot("FLYS", 2, 6, 10),
            vorlageSlot("HZE", 2, 6, 10)
          ] },
          // Trizeps steht im PDF zweimal. Der Slot bleibt zweimal, der zweite bekommt eine andere Standard-Übung,
          // damit dieselbe Übung nicht doppelt im Training steht.
          { name: "schulterArme", slots: [
            vorlageSlot("VD", 3, 6, 8), vorlageSlot("SEIT", 2, 8, 12), vorlageSlot("HSI", 2, 8, 12), vorlageSlot("PREA", 2, 6, 10),
            vorlageSlot("TRI", 3, 8, 12), vorlageSlot("HAMM", 2, 6, 10), vorlageSlot("TRI", 2, 8, 12, "ueberkopf-trizepsstrecken")
          ] },
          { name: "beine", slots: [
            vorlageSlot("BBI", 3, 6, 10), vorlageSlot("KBP", 3, 6, 8), vorlageSlot("BS", 2, 8, 12), vorlageSlot("ADD", 2, 8, 12),
            vorlageSlot("WAD", 3, 8, 12)
          ] },
          { name: "pushWaden", slots: [
            vorlageSlot("SEIT", 3, 8, 12), vorlageSlot("SD", 2, 6, 8), vorlageSlot("FLY", 2, 6, 10), vorlageSlot("DIPS", 2, 6, 8),
            vorlageSlot("TRI", 3, 6, 10), vorlageSlot("WAD", 3, 6, 10)
          ] },
          { name: "pullFullbody", slots: [
            vorlageSlot("KH", 3, 5, 8), vorlageSlot("HZB", 2, 6, 10), vorlageSlot("VZB", 2, 6, 10), vorlageSlot("UEB", 2, 6, 10),
            vorlageSlot("BIZ", 3, 6, 10)
          ] }
        ]
      }
    ]
  },
  {
    tage: 6,
    varianten: [
      {
        id: "6-ppl",
        wochentage: [0, 1, 2, 4, 5, 6],
        tage: [
          { name: "beine1", slots: [
            vorlageSlot("KB", 3, 6, 8), vorlageSlot("BBI", 3, 10, 15), vorlageSlot("BS", 2, 6, 10), vorlageSlot("WAD", 3, 6, 10),
            vorlageSlot("BAUCH", 3, 6, 10)
          ] },
          { name: "push1", slots: [
            vorlageSlot("HD", 3, 6, 8), vorlageSlot("FLYS", 2, 6, 10), vorlageSlot("DIPS", 2, 6, 8), vorlageSlot("SEIT", 3, 8, 12),
            vorlageSlot("TRI", 2, 8, 12)
          ] },
          { name: "pull1", slots: [
            vorlageSlot("HZB", 3, 6, 10), vorlageSlot("VZE", 3, 8, 12), vorlageSlot("HZE", 2, 12, 15), vorlageSlot("VZB", 2, 12, 15),
            vorlageSlot("PREA", 2, 6, 10), vorlageSlot("HAMM", 2, 6, 10)
          ] },
          { name: "beine2", slots: [
            vorlageSlot("KH", 3, 5, 8), vorlageSlot("BP", 2, 6, 10), vorlageSlot("BBI", 2, 6, 10), vorlageSlot("BS", 2, 6, 10),
            vorlageSlot("WAD", 3, 6, 10)
          ] },
          { name: "push2", slots: [
            vorlageSlot("SD", 2, 6, 8), vorlageSlot("FLY", 2, 6, 10), vorlageSlot("SEIT", 3, 8, 12), vorlageSlot("TRI", 3, 6, 10)
          ] },
          { name: "pull2", slots: [
            vorlageSlot("VZE", 2, 6, 10), vorlageSlot("HZB", 2, 6, 10), vorlageSlot("VZB", 2, 6, 10), vorlageSlot("HSI", 3, 8, 12),
            vorlageSlot("BIZ", 3, 6, 10)
          ] }
        ]
      }
    ]
  }
];
