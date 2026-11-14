// Browser-Regressionstest (seit Version 182, Audit Phase 11): die echte App in Chromium über einen eigenen lokalen Server.
// Kein Netz außer localhost, Anfragen an Supabase werden blockiert, nur synthetische Daten.
// Starten mit: node tests/browser-regression.mjs [Filter]
//   Exit-Code 0 = alles bestanden, 1 = mindestens ein Fehler, 77 = übersprungen (Playwright fehlt).
// Playwright gehört nicht zum Projekt: Es wird über PLAYWRIGHT (Pfad zu index.js), sonst über das Paket „playwright“ gesucht.
// Fotos nur mit AUSGABE=<Ordner>. Die Datei heißt bewusst nicht *-test.js, damit die Node-Suite sie nicht mitnimmt.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { createRequire } from "node:module";

const wurzel = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const filter = process.argv[2] || "";
const AUS = process.env.AUSGABE || "";
const VERSION = String(/const VERSION = (\d+);/.exec(fs.readFileSync(path.join(wurzel, "sw.js"), "utf8"))[1]);

let pw = null;
try {
  if (process.env.PLAYWRIGHT) {
    pw = (await import(process.env.PLAYWRIGHT)).default;
  } else {
    pw = createRequire(import.meta.url)("playwright");
  }
} catch (e) {
  for (const ort of ["/opt/npm-tools/node_modules/playwright/index.js"]) {
    if (!pw && fs.existsSync(ort)) {
      pw = (await import(ort)).default;
    }
  }
}
if (!pw) {
  console.log("ÜBERSPRUNGEN: Playwright nicht gefunden (PLAYWRIGHT=/pfad/zu/playwright/index.js setzen)");
  process.exit(77);
}

// Statischer Server für den Projektordner (nur lesen)
const TYPEN = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml", ".mp4": "video/mp4", ".webp": "image/webp" };
const server = http.createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const datei = path.join(wurzel, p === "/" ? "index.html" : p);
  if (!datei.startsWith(wurzel) || !fs.existsSync(datei) || fs.statSync(datei).isDirectory()) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.writeHead(200, { "Content-Type": TYPEN[path.extname(datei)] || "application/octet-stream" });
  fs.createReadStream(datei).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const ORT = "http://127.0.0.1:" + server.address().port + "/index.html";

const TAG = 86400000;
const jetzt = Date.now();
const iso = (tage) => new Date(jetzt - tage * TAG).toISOString();
const satz = (g, w, rir) => (rir === undefined ? { gewicht: g, wdh: w } : { gewicht: g, wdh: w, rir });
function e(id, tage, saetze, extra) {
  return Object.assign({ id, uebung: "Bankdrücken", uebungId: "bankdruecken-lh", muskelgruppe: "brust", datum: iso(tage), routineId: "r1", routineName: "Test",
    einzelsaetze: saetze, saetze: saetze.length, gewicht: saetze[0].gewicht, wdh: saetze[0].wdh }, extra || {});
}
const BASIS = {
  profil: { name: "Test", geburtstag: "1990-01-01" },
  screening: { am: jetzt, ja: [] },
  einfuehrungGesehen: Object.fromEntries(["home", "training", "modus", "fortschritt", "profil", "einstellungen"].map((b) => [b, { gesehen: true }])),
  routinen: [{ id: "r1", name: "Test", uebungen: [{ name: "Bankdrücken", uebungId: "bankdruecken-lh", muskelgruppe: "brust", zielSaetze: 3, zielWdh: 8, zielWdhMax: 10 }] }],
  eintraege: [e("a", 9, [satz(100, 8, 2), satz(100, 8, 2), satz(100, 8, 2)]), e("b", 6, [satz(100, 9, 2), satz(100, 9, 2), satz(100, 9, 2)]), e("c", 2, [satz(102.5, 10, 2), satz(102.5, 10, 2), satz(102.5, 10, 2)])],
  koerpergewicht: [{ datum: iso(5), gewicht: 80, koerperfett: 18 }],
  notizen: { "bankdruecken-lh": "Schulter zwickt" },
  einstellungen: { einschraenkungen: [{ stelle: "knie", seite: "links", stufe: "leicht" }], zielGewicht: 76, auszeiten: [{ art: "krank", von: jetzt - 40 * TAG, bis: jetzt - 38 * TAG }] },
  coach: {}
};

const ergebnis = [];
function pruefe(name, ok, info) {
  ergebnis.push((ok ? "OK   " : "FEHL ") + name + (info !== undefined && !ok ? "  (" + info + ")" : ""));
}
const foto = (page, name) => (AUS ? page.screenshot({ path: path.join(AUS, name + ".png") }) : Promise.resolve());

async function seite(browser, breite, sprache, extra) {
  // Sprache des Browsers fest (ohne sie meldet Chromium in manchen Umgebungen „en-US@posix“, das toLocaleString ablehnt)
  const ctx = await browser.newContext({ viewport: { width: breite, height: breite === 320 ? 568 : 844 }, deviceScaleFactor: 2, locale: sprache === "en" ? "en-US" : "de-DE" });
  await ctx.route(/supabase\.co/, (r) => r.abort());
  const daten = Object.assign({}, BASIS, extra || {});
  daten.einstellungen = Object.assign({ sprache, design: "dunkel", palette: "korund", akzent: "blau" }, BASIS.einstellungen, (extra || {}).einstellungen || {});
  await ctx.addInitScript((d) => {
    if (!sessionStorage.getItem("gesetzt")) {
      localStorage.clear();
      for (const k of Object.keys(d)) localStorage.setItem(k, JSON.stringify(d[k]));
      sessionStorage.setItem("gesetzt", "1");
    }
  }, daten);
  const page = await ctx.newPage();
  const fehler = [];
  page.on("pageerror", (err) => fehler.push(err.message));
  page.on("console", (m) => { if (m.type() === "error" && !/supabase|Failed to load resource|ERR_FAILED|ERR_ABORTED/i.test(m.text())) fehler.push(m.text()); });
  page.on("dialog", (d) => { fehler.push("Browser-Dialog: " + d.message()); d.dismiss(); });
  await page.goto(ORT);
  await page.waitForTimeout(800);
  return { ctx, page, fehler };
}
const teil = (name) => !filter || name.indexOf(filter) !== -1;

let browser;
try {
  browser = await pw.chromium.launch();
} catch (e) {
  console.log("ÜBERSPRUNGEN: Chromium startet nicht (" + e.message.split("\n")[0] + ")");
  server.close();
  process.exit(77);
}

try {
  // ======== Grundablauf (Phase 8): 320/390 px, Deutsch/Englisch ========
  if (teil("grund")) {
    for (const breite of [320, 390]) {
      for (const sprache of ["de", "en"]) {
        const tag = breite + "-" + sprache;
        let { ctx, page, fehler } = await seite(browser, breite, sprache);
        const version = await page.evaluate(() => typeof appVersion === "function" ? appVersion() : null);
        pruefe(tag + " App lädt, Version " + VERSION, String(version) === VERSION, version);
        pruefe(tag + " Startprüfung nicht offen", await page.evaluate(() => !document.getElementById("start-ebene").classList.contains("offen")));
        await page.evaluate(() => { const el = document.querySelector(".letztes-rekord"); if (el) el.scrollIntoView({ block: "center" }); });
        await foto(page, "home-" + tag);
        const rekord = await page.evaluate(() => { const el = document.querySelector(".letztes-rekord"); return el ? { text: el.textContent, ueber: el.scrollWidth > el.clientWidth + 1 } : null; });
        pruefe(tag + " Home: Bestwert-Zeile geschätzt, ohne Überlauf", !!rekord && /geschätzt|estimated/.test(rekord.text) && !rekord.ueber, JSON.stringify(rekord));

        await page.evaluate(() => { seiteZeigen("fortschritt"); fortschrittReiter = "statistik"; fortschrittReiterAnzeigen(); });
        await page.waitForTimeout(400);
        const karte = await page.evaluate(() => { const k = document.querySelector(".saetze-karte"); if (!k) return null; const t = k.querySelector(".statistik-titel"); return { titel: t && t.textContent, ueber: t ? t.scrollWidth > t.clientWidth + 1 : null, text: k.textContent.slice(0, 200) }; });
        pruefe(tag + " Statistik: harte Sätze „bisher“, Orientierung, ohne Überlauf", !!karte && /bisher|so far/.test(karte.titel) && /Orientierung|Guide/.test(karte.text) && !karte.ueber, JSON.stringify(karte));
        await page.evaluate(() => document.querySelector(".saetze-hilfe") && document.querySelector(".saetze-hilfe").click());
        await page.waitForTimeout(200);
        const hilfe = await page.evaluate(() => document.getElementById("frage-text").textContent);
        pruefe(tag + " Hilfe: misst die Anstrengung nicht", /misst Korund nicht|does not measure/.test(hilfe), hilfe.slice(0, 80));
        await page.evaluate(() => document.getElementById("frage-hintergrund").classList.remove("offen"));

        await page.evaluate(() => { seiteZeigen("training"); routineStarten(routinen[0]); });
        await page.waitForTimeout(500);
        const vor = await page.evaluate(() => eintraege.length);
        const feld = await page.evaluate(() => document.getElementById("t-feld-gewicht").value);
        pruefe(tag + " Vorschlag Satz 1 (102,5 × 10 bei Ziel 8–10 → 105)", /105/.test(feld), feld);
        await page.fill("#t-feld-gewicht", "10");
        await page.fill("#t-feld-wdh", "10");
        await page.click("button[onclick='satzFertigPruefen()']");
        await page.waitForTimeout(300);
        const frage = await page.evaluate(() => ({ offen: document.getElementById("frage-hintergrund").classList.contains("offen"), titel: document.getElementById("frage-titel").textContent }));
        pruefe(tag + " 10 statt 100: Rückfrage", frage.offen && /Ungewöhnlich|Unusual/.test(frage.titel), JSON.stringify(frage));
        await foto(page, "rueckfrage-" + tag);
        pruefe(tag + " Rückfrage: Knöpfe ohne Überlauf", !(await page.evaluate(() => [...document.querySelectorAll("#frage-knoepfe button")].some((b) => b.scrollWidth > b.clientWidth + 1))));
        await page.click("#frage-knoepfe button.leise");
        await page.waitForTimeout(200);
        pruefe(tag + " Korrigieren: nichts gespeichert", (await page.evaluate(() => eintraege.length)) === vor && (await page.inputValue("#t-feld-gewicht")) === "10");
        await page.fill("#t-feld-gewicht", "105");
        await page.click("button[onclick='satzFertigPruefen()']");
        await page.waitForTimeout(300);
        const nach = await page.evaluate(() => ({ n: eintraege.length, frage: document.getElementById("frage-hintergrund").classList.contains("offen"), g: eintraege[eintraege.length - 1].einzelsaetze[0].gewicht }));
        pruefe(tag + " 105 kg: ohne Rückfrage gespeichert", nach.n === vor + 1 && !nach.frage && nach.g === 105, JSON.stringify(nach));
        await page.evaluate(() => { if (typeof pauseUeberspringen === "function") pauseUeberspringen(); });
        // Seit Version 193 zählt ein Tipp auf „Satz fertig“ erst 600 ms nach dem letzten Satz (Doppeltipp-Sperre)
        await page.waitForTimeout(650);
        await page.fill("#t-feld-gewicht", "10");
        await page.fill("#t-feld-wdh", "10");
        await page.click("button[onclick='satzFertigPruefen()']");
        await page.waitForTimeout(200);
        await page.click("#frage-knoepfe button.haupt");
        await page.waitForTimeout(200);
        const ja = await page.evaluate(() => eintraege[eintraege.length - 1].einzelsaetze.map((s) => s.gewicht));
        pruefe(tag + " Ja, speichern: Wert bleibt wie eingegeben", JSON.stringify(ja) === "[105,10]", JSON.stringify(ja));

        const nutz = await page.evaluate(() => JSON.stringify(Object.assign(cloudDaten(), { cloudOhne: null })));
        pruefe(tag + " cloudDaten ohne Gesundheitsfelder", !/koerperfett|Schulter zwickt|einschraenkungen|zielGewicht|auszeiten|krank/.test(nutz) && /koerpergewichtCloud/.test(nutz));
        pruefe(tag + " backupText vollständig", await page.evaluate(() => { const d = JSON.parse(backupText()); return d.koerpergewicht[0].koerperfett === 18 && !!d.notizen && d.einstellungen.einschraenkungen.length === 1; }));
        pruefe(tag + " keine JS-Fehler", fehler.length === 0, fehler.join(" | "));
        await ctx.close();

        // Entlastungswoche: zwei Einheiten am selben Tag gleich schwer, der Eintrag trägt den Merker (Mutation M13)
        ({ ctx, page, fehler } = await seite(browser, breite, sprache, { coach: { entlastung: { von: jetzt - TAG, bis: jetzt + 6 * TAG } } }));
        await page.evaluate(() => { seiteZeigen("training"); routineStarten(routinen[0]); });
        await page.waitForTimeout(400);
        const g1 = await page.inputValue("#t-feld-gewicht");
        await page.fill("#t-feld-wdh", "8");
        await page.click("button[onclick='satzFertigPruefen()']");
        await page.waitForTimeout(200);
        const merker = await page.evaluate(() => eintraege[eintraege.length - 1].entlastung === true);
        await page.evaluate(() => { laufendesTraining = null; routineStarten(routinen[0]); });
        await page.waitForTimeout(400);
        const g2 = await page.inputValue("#t-feld-gewicht");
        pruefe(tag + " Entlastung: zweite Einheit gleich schwer wie die erste", g1 === g2 && /92[,.]5/.test(g1), g1 + "/" + g2);
        pruefe(tag + " Entlastung: Eintrag trägt den Merker", merker);
        pruefe(tag + " Entlastung: keine JS-Fehler", fehler.length === 0, fehler.join(" | "));
        await ctx.close();
      }
    }
    for (const [name, einst] of [["hell", { design: "hell" }], ["klassisch", { stil: "klassisch", design: "hell" }]]) {
      for (const breite of [320, 390]) {
        const { ctx, page, fehler } = await seite(browser, breite, "de", { einstellungen: einst });
        await page.evaluate(() => { seiteZeigen("training"); routineStarten(routinen[0]); });
        await page.waitForTimeout(400);
        await page.fill("#t-feld-gewicht", "10");
        await page.fill("#t-feld-wdh", "10");
        await page.click("button[onclick='satzFertigPruefen()']");
        await page.waitForTimeout(300);
        const offen = await page.evaluate(() => document.getElementById("frage-hintergrund").classList.contains("offen"));
        pruefe(name + "-" + breite + " Rückfrage erscheint, keine JS-Fehler", offen && fehler.length === 0, fehler.join(" | "));
        await ctx.close();
      }
    }
  }

  // ======== Zukunftseinträge (Phase 11, Priorität A) ========
  if (teil("zukunft")) {
    // Werte, die ein Zukunftseintrag nicht verändern darf, aus den echten Funktionen der App
    const kennzahlen = () => {
      const st = rangStand();
      seiteZeigen("profil");
      const z = gesamtZahlen();
      return JSON.stringify({
        workouts: z.workouts, gewicht: z.gewicht, uebungen: z.uebungen, serie: z.serie,
        rekorde: rekorde(st.uebungen.map((u) => u.punkte)).length, kraft: JSON.stringify(st.kraft),
        level: (document.getElementById("profil-level") || {}).textContent || "",
        comebacks: comebacks().length,
        letztesMal: letztesMalText("Bankdrücken", "bankdruecken-lh"),
        verlauf: verlaufPunkte("Bankdrücken", "bankdruecken-lh", "rang").length,
        // Seit Version 184: harte Sätze in der Woche des Zukunftseintrags, trainierte Übungen, „zuletzt“ der Routine
        harteZukunftswoche: JSON.stringify(harteSaetzeWoche(eintraege, montagDerWoche(new Date(Date.now() + 30 * 86400000)))),
        trainiert: trainierteUebungen().map((u) => u.name).join(","),
        routineZuletzt: routineZuletzt(routinen[0]),
        // Home-Karte „Letztes Training“ (letztesTraining, Mutation N6)
        letztesTraining: (function () { const l = letztesTraining(); return l ? new Date(l.datum).toISOString().slice(0, 10) + "|" + l.eintraege.length : null; })()
      });
    };
    const zukunft = e("z", -30, [satz(200, 5), satz(200, 5), satz(200, 5)]);
    const bald = e("h", 0, [satz(102.5, 10)], { datum: new Date(jetzt + 2 * 3600e3).toISOString() });
    const kaputt = e("k", 0, [satz(100, 8)], { datum: "kein Datum" });
    const wert = async (eintraege, einst) => {
      const { ctx, page, fehler } = await seite(browser, 390, "de", { eintraege, einstellungen: einst || {} });
      const w = await page.evaluate(kennzahlen);
      await ctx.close();
      return { w, fehler };
    };
    const ohne = await wert(BASIS.eintraege);
    const mit = await wert(BASIS.eintraege.concat([zukunft]));
    pruefe("Zukunft: Eintrag in 30 Tagen ändert Workouts, Volumen, Serie, Rekorde, Ränge, Level, „Letztes Mal“ nicht", ohne.w === mit.w, "ohne " + ohne.w + " | mit " + mit.w);
    const mitBald = await wert(BASIS.eintraege.concat([bald]));
    const mitJetzt = await wert(BASIS.eintraege.concat([Object.assign({}, bald, { datum: new Date(jetzt).toISOString() })]));
    pruefe("Zukunft: Eintrag 2 Stunden voraus (Zeitzone) zählt wie ein Eintrag von jetzt", mitBald.w === mitJetzt.w && mitBald.w !== ohne.w, mitBald.w + " | " + mitJetzt.w);
    const mitKaputt = await wert(BASIS.eintraege.concat([kaputt]));
    pruefe("Zukunft: ungültiges Datum verhält sich wie bisher (keine JS-Fehler)", mitKaputt.fehler.length === 0, mitKaputt.fehler.join(" | "));
    // Vorbelegung mit ausgeschalteter Steigerung (modusStartWerte nimmt den ersten Satz vom letzten Mal)
    for (const [name, liste] of [["ohne", BASIS.eintraege], ["mit", BASIS.eintraege.concat([zukunft])]]) {
      const { ctx, page } = await seite(browser, 390, "de", { eintraege: liste, einstellungen: { steigern: false } });
      await page.evaluate(() => { seiteZeigen("training"); routineStarten(routinen[0]); });
      await page.waitForTimeout(400);
      const g = await page.inputValue("#t-feld-gewicht");
      pruefe("Zukunft: Vorbelegung ohne Steigerung (" + name + " Zukunftseintrag) = 102,5", /102[,.]5/.test(g), g);
      await ctx.close();
    }
    // Der Eintrag bleibt gespeichert und im Backup (nichts wird gelöscht)
    const { ctx, page } = await seite(browser, 390, "de", { eintraege: BASIS.eintraege.concat([zukunft]) });
    pruefe("Zukunft: Eintrag bleibt gespeichert und im Backup", await page.evaluate(() => eintraege.some((x) => x.id === "z") && JSON.parse(backupText()).eintraege.some((x) => x.id === "z")));
    await ctx.close();
  }
  // ======== Import-Prüfung (Phase 11, Priorität B) ========
  if (teil("import")) {
    for (const breite of [320, 390]) {
      for (const sprache of ["de", "en"]) {
        const { ctx, page, fehler } = await seite(browser, breite, sprache);
        const datei = JSON.stringify({ app: "korund", version: 13, eintraege: [
          e("i1", 1, [satz(90, 8)]), e("i2", 1, [satz(5000, 8)]), e("i1", 1, [satz(90, 8)]),
          e("i3", -40, [satz(95, 5)]), e("i4", 4, [Object.assign(satz(70, 8), { puls: 150 })], { fremd: "x" })] });
        await page.evaluate((t) => backupLesen(t), datei);
        await page.waitForTimeout(300);
        const d = await page.evaluate(() => { const h = document.getElementById("dialog-hintergrund"); const t = document.getElementById("dialog-text"); return { offen: h.classList.contains("offen"), text: t.textContent, ueber: t.scrollWidth > t.clientWidth + 1 }; });
        await foto(page, "import-" + breite + "-" + sprache);
        pruefe(breite + "-" + sprache + " Import: Frage nennt unmögliche Werte, Dublette, Zukunft, Zusatzangaben", d.offen && /1 Eintrag mit unmöglichen Werten wird|1 entry with impossible values will/.test(d.text) && !/1 Einträge|1 entries/.test(d.text) && /doppelte|duplicate/.test(d.text) && /Zukunft|future/.test(d.text) && /Zusatzangaben|extra data/.test(d.text) && !d.ueber, d.text);
        // Beide Knöpfe lassen sich antippen: nach dem Scrollen liegt an ihrer Mitte wirklich der Knopf (kein Scheintest)
        const knopf = await page.evaluate(() => [...document.querySelectorAll("#dialog-hintergrund .dialog-btn")].every((b) => {
          b.scrollIntoView({ block: "center" });
          const r = b.getBoundingClientRect();
          return r.height > 0 && r.top >= 0 && r.bottom <= window.innerHeight && document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2) === b;
        }));
        pruefe(breite + "-" + sprache + " Import: Knöpfe erreichbar", knopf);
        await page.click("button[onclick=\"importAusfuehren('ersetzen')\"]");
        await page.waitForTimeout(300);
        // Seit Version 189: Ersetzen erst nach der Rückfrage (zweiter Knopf „Endgültig ersetzen“)
        await page.locator("#frage-knoepfe .dialog-btn.gefahr").click();
        await page.waitForTimeout(300);
        const r = await page.evaluate(() => ({ ids: eintraege.map((x) => x.id).sort().join(","), fremd: (eintraege.filter((x) => x.id === "i4")[0] || {}).fremd, cloud: JSON.stringify(cloudDaten().eintraege) }));
        pruefe(breite + "-" + sprache + " Import: 3 Einträge übernommen, Zusatzfeld lokal da, nicht in der Cloud", r.ids === "i1,i3,i4" && r.fremd === "x" && !/fremd|puls/.test(r.cloud), JSON.stringify(r).slice(0, 200));
        pruefe(breite + "-" + sprache + " Import: keine JS-Fehler", fehler.length === 0, fehler.join(" | "));
        await ctx.close();
      }
    }
  }
  // ======== Datenintegrität beim Ergänzen (Phase 12): derselbe Eintrag, auf einem anderen Gerät bearbeitet ========
  if (teil("integritaet")) {
    for (const breite of [320, 390]) {
      for (const sprache of ["de", "en"]) {
        const { ctx, page, fehler } = await seite(browser, breite, sprache);
        // Eintrag c von diesem Gerät, auf einem anderen Gerät ein Satz auf 105 kg geändert, dazu ein neuer Eintrag
        const anders = e("c", 2, [satz(105, 10, 0), satz(102.5, 10, 2), satz(102.5, 10, 2)]);
        const datei = JSON.stringify({ app: "korund", version: 13, eintraege: BASIS.eintraege.slice(0, 2).concat([anders, e("neu", 1, [satz(90, 8)]), Object.assign(e("od", 1, [satz(50, 8)]), { datum: "kaputt" })]) });
        const vorher = await page.evaluate(() => ({ n: eintraege.length }));
        await page.evaluate((t) => backupLesen(t), datei);
        await page.waitForTimeout(200);
        const frage = await page.evaluate(() => document.getElementById("dialog-text").textContent);
        pruefe(breite + "-" + sprache + " Integrität: Frage nennt Eintrag ohne Datum", /kein gültiges Datum|no valid date/.test(frage), frage);
        await page.click("button[onclick=\"importAusfuehren('ergaenzen')\"]");
        await page.waitForTimeout(300);
        const r = await page.evaluate(() => ({ n: eintraege.length, c: JSON.stringify(eintraege.filter((x) => x.id === "c")), ids: eintraege.map((x) => x.id), text: document.getElementById("daten-meldung").textContent, ohne: document.getElementById("log-liste") ? document.getElementById("log-liste").textContent : "" }));
        pruefe(breite + "-" + sprache + " Integrität: nur neue Einträge dazu (2), c nicht doppelt", r.n === vorher.n + 2 && r.ids.filter((x) => x === "c").length === 1 && new Set(r.ids).size === r.ids.length, JSON.stringify(r.ids));
        pruefe(breite + "-" + sprache + " Integrität: Fassung dieses Geräts von c bleibt", /102\.5/.test(r.c) && !/105/.test(r.c), r.c);
        pruefe(breite + "-" + sprache + " Integrität: Meldung nennt die andere Fassung", /anderen Fassung|different version/.test(r.text), r.text);
        // Die Meldung steht in Einstellungen → Daten: dort ganz zu sehen, nichts läuft seitlich hinaus
        await page.evaluate(() => { einstOeffnen(); document.getElementById("daten-meldung").scrollIntoView({ block: "center" }); });
        await page.waitForTimeout(400);
        const m = await page.evaluate(() => { const el = document.getElementById("daten-meldung"); const b = el.getBoundingClientRect(); return { ueber: el.scrollWidth > el.clientWidth + 1, innen: b.left >= 0 && b.right <= window.innerWidth && b.height > 0 }; });
        pruefe(breite + "-" + sprache + " Integrität: Meldung passt ins Fenster", !m.ueber && m.innen, JSON.stringify(m));
        await foto(page, "integritaet-" + breite + "-" + sprache);
        pruefe(breite + "-" + sprache + " Integrität: keine JS-Fehler", fehler.length === 0, fehler.join(" | "));
        await ctx.close();
      }
    }
  }
  // ======== Ersetzen nur nach Bestätigung (Phase 13, F3, seit Version 189) ========
  if (teil("ersetzen")) {
    const faelle = [[320, "de", "dunkel", "glass"], [320, "en", "dunkel", "glass"], [320, "de", "hell", "klassisch"], [320, "en", "hell", "klassisch"], [390, "de", "dunkel", "glass"], [390, "en", "hell", "klassisch"]];
    for (const [breite, sprache, design, stil] of faelle) {
      const n = breite + "-" + sprache + "-" + design + "-" + stil;
      const { ctx, page, fehler } = await seite(browser, breite, sprache, { einstellungen: { design, stil } });
      const datei = JSON.stringify({ app: "korund", version: 13, profil: { name: "Backup" }, eintraege: [e("v1", 20, [satz(70, 8)]), e("v2", 18, [satz(72, 8)])],
        routinen: [{ id: "rb", name: "Routine Backup", uebungen: [] }], wochenplan: ["", "", "", "", "", "", ""], trainings: [], notizen: { x: "y" }, coach: { ziel: "muskel" },
        eigeneUebungen: [], koerpergewicht: [{ datum: iso(19), gewicht: 70 }], einstellungen: { sprache: sprache } });
      const speicher = () => page.evaluate(() => JSON.stringify(Object.keys(localStorage).sort().filter((k) => !/^cloud|^korundCloud/.test(k)).map((k) => [k, localStorage.getItem(k)])));
      const vorher = await speicher();
      await page.evaluate(() => einstOeffnen());
      await page.evaluate((t) => backupLesen(t), datei);
      await page.waitForTimeout(250);
      await page.click("button[onclick=\"importAusfuehren('ersetzen')\"]");
      await page.waitForTimeout(300);
      const r = await page.evaluate(() => {
        const h = document.getElementById("frage-hintergrund"), box = document.getElementById("frage").getBoundingClientRect();
        const knoepfe = [...document.querySelectorAll("#frage-knoepfe .dialog-btn")];
        return { offen: h.classList.contains("offen"), import: document.getElementById("dialog-hintergrund").classList.contains("offen"),
          titel: document.getElementById("frage-titel").textContent, text: document.getElementById("frage-text").textContent, knoepfe: knoepfe.map((b) => b.textContent + "|" + b.className),
          // Ist die Rückfrage höher als das Fenster, scrollt die Ebene: Titel, Text und beide Knöpfe müssen nach dem Scrollen ganz zu sehen sein
          passt: box.left >= 0 && box.right <= innerWidth && [document.getElementById("frage-titel"), document.getElementById("frage-text")].concat(knoepfe).every((el) => {
            el.scrollIntoView({ block: "nearest" }); const x = el.getBoundingClientRect(); return x.top >= 0 && x.bottom <= innerHeight + 0.5 || x.height > innerHeight; }),
          tippbar: knoepfe.every((b) => { b.scrollIntoView({ block: "center" }); const x = b.getBoundingClientRect(); return x.height >= 40 && document.elementFromPoint(x.left + x.width / 2, x.top + x.height / 2) === b; }) };
      });
      await foto(page, "ersetzen-" + n);
      pruefe(n + " Ersetzen: Rückfrage offen, Import-Dialog zu", r.offen && !r.import, JSON.stringify(r).slice(0, 160));
      pruefe(n + " Ersetzen: Text nennt Gerät, Umfang und dass es nicht rückgängig geht", sprache === "de" ? /diesem Gerät/.test(r.titel + r.text) && /Trainingseinträge \(\d+ hier, 2 im Backup\)/.test(r.text) && /Routinen und Wochenplan/.test(r.text) && /nicht rückgängig/.test(r.text) : /this device/.test(r.titel + r.text) && /workout entries \(\d+ here, 2 in the backup\)/.test(r.text) && /routines and the weekly plan/.test(r.text) && /cannot be undone/.test(r.text), r.text);
      pruefe(n + " Ersetzen: Abbrechen und Endgültig ersetzen", r.knoepfe.length === 2 && /^(Abbrechen|Cancel)\|.*haupt/.test(r.knoepfe[0]) && /^(Endgültig ersetzen|Replace permanently)\|.*gefahr/.test(r.knoepfe[1]), r.knoepfe.join(" / "));
      pruefe(n + " Ersetzen: Rückfrage ganz lesbar (ggf. scrollen), beide Knöpfe tippbar", r.passt && r.tippbar, JSON.stringify({ passt: r.passt, tippbar: r.tippbar }));
      pruefe(n + " Ersetzen: vor der Bestätigung nichts gespeichert", await speicher() === vorher);
      // Abbrechen: nichts geändert, Import-Dialog wieder da, „Ergänzen“ ohne Rückfrage
      await page.locator("#frage-knoepfe .dialog-btn").first().click();
      await page.waitForTimeout(250);
      const nachAbbruch = await page.evaluate(() => ({ import: document.getElementById("dialog-hintergrund").classList.contains("offen"), frage: document.getElementById("frage-hintergrund").classList.contains("offen") }));
      pruefe(n + " Abbrechen: nichts geändert, Import-Dialog wieder offen", nachAbbruch.import && !nachAbbruch.frage && await speicher() === vorher, JSON.stringify(nachAbbruch));
      // Jetzt bewusst ersetzen
      await page.click("button[onclick=\"importAusfuehren('ersetzen')\"]");
      await page.waitForTimeout(250);
      await page.locator("#frage-knoepfe .dialog-btn.gefahr").click();
      await page.waitForTimeout(350);
      const d = await page.evaluate(() => ({ ids: eintraege.map((x) => x.id).join(), routinen: routinen.map((x) => x.id).join(), stil: einstellungen.stil, design: einstellungen.design, meldung: document.getElementById("daten-meldung").textContent }));
      pruefe(n + " Endgültig ersetzen: Einträge und Routinen aus dem Backup, Stil bleibt", d.ids === "v1,v2" && d.routinen === "rb" && d.stil === stil && d.design === design && /2/.test(d.meldung), JSON.stringify(d));
      pruefe(n + " Ersetzen: keine JS-Fehler", fehler.length === 0, fehler.join(" | "));
      await ctx.close();
    }
    // Ergänzen fragt nicht nach
    {
      const { ctx, page } = await seite(browser, 390, "de");
      await page.evaluate((t) => backupLesen(t), JSON.stringify({ eintraege: [e("w1", 30, [satz(50, 8)])] }));
      await page.waitForTimeout(200);
      await page.click("button[onclick=\"importAusfuehren('ergaenzen')\"]");
      await page.waitForTimeout(300);
      const r = await page.evaluate(() => ({ frage: document.getElementById("frage-hintergrund").classList.contains("offen"), n: eintraege.length }));
      pruefe("Ergänzen: ohne Rückfrage wie bisher", !r.frage && r.n === BASIS.eintraege.length + 1, JSON.stringify(r));
      await ctx.close();
    }
  }
  // ======== Gym-Spiel (Phase 12): Einträge in der Zukunft verbuchen erst, wenn ihr Datum erreicht ist ========
  // Das Spiel liest „eintraege“ selbst (appAbgleich, __gymSync) und verbucht Tage dauerhaft in stand.verarbeitet.
  // Die Uhr der Seite wird mit page.clock verstellt, nur Date ändert sich, nichts wird im echten Spielstand gespeichert.
  if (teil("spiel")) {
    const SPIEL = ORT.replace("index.html", "spiel/index.html");
    const T0 = jetzt;
    const tagIso = (t) => { const d = new Date(t); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
    const eintrag = (id, zeit, kg) => ({ id, uebung: "Bankdrücken", uebungId: "bankdruecken-lh", muskelgruppe: "brust", datum: new Date(zeit).toISOString(), einzelsaetze: [{ gewicht: kg, wdh: 8 }], saetze: 1, gewicht: kg, wdh: 8 });
    async function spielSeite(lokal, zeit, zone) {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, locale: "de-DE", timezoneId: zone || undefined });
      await ctx.route(/supabase\.co/, (r) => r.abort());
      await ctx.addInitScript((d) => {
        if (!sessionStorage.getItem("gesetzt")) {
          localStorage.clear();
          for (const k of Object.keys(d)) localStorage.setItem(k, JSON.stringify(d[k]));
          sessionStorage.setItem("gesetzt", "1");
        }
      }, lokal);
      const page = await ctx.newPage();
      const fehler = [];
      page.on("pageerror", (err) => fehler.push(err.message));
      await page.clock.setSystemTime(zeit);
      await page.goto(SPIEL);
      await page.waitForFunction(() => window.__gymSync && window.__gym, null, { timeout: 15000 });
      return { ctx, page, fehler };
    }
    const sync = (page) => page.evaluate(() => { window.__gymSync(); const s = window.__gym.stand(); return { verarbeitet: s.verarbeitet.slice().sort(), tage: Object.keys(s.tage).sort(), splitter: s.splitter, ruf: s.ruf, kristalle: s.kristalle, demo: s.demo }; });
    const vergangen = [eintrag("s1", T0 - 5 * TAG, 60), eintrag("s2", T0 - 2 * TAG, 65)];
    const zukunft = eintrag("sz", T0 + 3 * TAG, 70);
    const zTag = tagIso(T0 + 3 * TAG);
    const jetztPlus3 = () => T0 + 3 * TAG;

    // 1. Frischer Spielstand (Demo): Der Zukunftstag wird nicht verbucht und nicht als Spieltag angelegt
    {
      const { ctx, page, fehler } = await spielSeite({ eintraege: vergangen.concat([zukunft]) }, T0);
      const a = await sync(page);
      pruefe("Spiel: vergangene Tage verbucht", a.verarbeitet.includes(tagIso(T0 - 5 * TAG)) && a.verarbeitet.includes(tagIso(T0 - 2 * TAG)) && !a.demo, JSON.stringify(a.verarbeitet));
      pruefe("Spiel: Tag in der Zukunft nicht verbucht", !a.verarbeitet.includes(zTag) && !a.tage.includes(zTag), JSON.stringify(a.verarbeitet));
      const b = await sync(page);
      pruefe("Spiel: zweiter Abgleich ändert nichts", b.splitter === a.splitter && b.ruf === a.ruf && b.verarbeitet.length === a.verarbeitet.length, a.splitter + " → " + b.splitter);
      // Das Datum ist erreicht: jetzt wird der Tag genau einmal verbucht
      await page.clock.setSystemTime(T0 + 3 * TAG + 3600000);
      const c = await sync(page);
      pruefe("Spiel: am Tag selbst wird er verbucht", c.verarbeitet.includes(zTag) && c.splitter > b.splitter, c.splitter + " / " + JSON.stringify(c.verarbeitet));
      const d = await sync(page);
      pruefe("Spiel: und nur einmal", d.splitter === c.splitter && d.verarbeitet.filter((t) => t === zTag).length === 1, d.splitter);
      pruefe("Spiel: Einträge der App unverändert (nur gelesen)", await page.evaluate(() => JSON.parse(localStorage.getItem("eintraege")).length === 3));
      pruefe("Spiel: keine JS-Fehler", fehler.length === 0, fehler.join(" | "));
      await ctx.close();
    }
    // 2. Grenze 24 Stunden wie in der App (ZUKUNFT_TOLERANZ_MS): 23 h voraus zählt, 25 h voraus nicht
    {
      const nah = eintrag("n1", T0 + 23 * 3600000, 60), fern = eintrag("n2", T0 + 49 * 3600000, 60);
      const { ctx, page } = await spielSeite({ eintraege: vergangen.concat([nah, fern]) }, T0);
      const a = await sync(page);
      pruefe("Spiel: 23 h voraus zählt (wie in der App)", a.verarbeitet.includes(tagIso(T0 + 23 * 3600000)), JSON.stringify(a.verarbeitet));
      pruefe("Spiel: 49 h voraus zählt nicht", !a.verarbeitet.includes(tagIso(T0 + 49 * 3600000)), JSON.stringify(a.verarbeitet));
      await ctx.close();
    }
    // 3. Bestehender Spielstand, der einen Zukunftstag schon verbucht hat (vor dieser Änderung): nichts wird zurückgenommen,
    //    nichts doppelt verbucht, der Tag bleibt im Spielstand
    {
      const { ctx, page } = await spielSeite({ eintraege: vergangen.concat([zukunft]) }, T0);
      // so stand es vor der Änderung: ein echtes Gym (keine Demo), der Zukunftstag schon verbucht und belohnt
      const vorher = await page.evaluate((zt) => {
        const s = window.__gym.stand();
        s.demo = false; s.tage = {}; s.verarbeitet = []; s.splitter = 500; s.ruf = 40; s.kristalle = 1;
        s.tage[zt] = { gruppen: ["brust"], familien: [], rekord: false };
        s.verarbeitet.push(zt);
        localStorage.setItem("korund-gym-v2", JSON.stringify(s));
        return { splitter: s.splitter, ruf: s.ruf };
      }, zTag);
      const a = await sync(page);
      pruefe("Spiel alt: verbuchter Zukunftstag bleibt, Belohnung nicht zurückgenommen", a.verarbeitet.includes(zTag) && a.tage.includes(zTag) && a.splitter >= vorher.splitter, JSON.stringify(a));
      await page.clock.setSystemTime(T0 + 3 * TAG + 3600000);
      const b = await sync(page);
      pruefe("Spiel alt: am Tag selbst nicht doppelt verbucht", b.splitter === a.splitter && b.verarbeitet.filter((t) => t === zTag).length === 1, a.splitter + " → " + b.splitter);
      await ctx.close();
    }
    // 5. Nur ein Eintrag in der Zukunft: die Demo bleibt, nichts wird verbucht
    {
      const { ctx, page } = await spielSeite({ eintraege: [zukunft] }, T0);
      const a = await sync(page);
      pruefe("Spiel: nur Zukunft, Demo bleibt", a.demo === true && !a.verarbeitet.includes(zTag), JSON.stringify(a).slice(0, 160));
      await ctx.close();
    }
    // 6. Echter Weg in der App: Gym-Tab öffnen (gymSpielZeigen → iframe → __gymSync)
    {
      const { ctx, page, fehler } = await seite(browser, 390, "de", { eintraege: BASIS.eintraege.concat([e("zz", -3, [satz(100, 8)])]) });
      await page.evaluate(() => seiteZeigen("gym"));
      const rahmen = page.frameLocator("#gym-spiel");
      await rahmen.locator("body").waitFor({ timeout: 15000 });
      // Der Frame ist nicht immer sofort in page.frames(): kurz warten, bis er da ist
      let f = null;
      for (let i = 0; i < 100 && !f; i++) {
        f = page.frames().find((x) => /spiel\/index\.html/.test(x.url()));
        if (!f) await page.waitForTimeout(100);
      }
      await f.waitForFunction(() => window.__gym && window.__gym.stand().demo === false, null, { timeout: 15000 });
      const r = await f.evaluate(() => window.__gym.stand().verarbeitet.slice());
      pruefe("Spiel im Gym-Tab: 3 vergangene Tage verbucht, Zukunft nicht", r.length === 3 && !r.includes(tagIso(jetztPlus3())), JSON.stringify(r));
      pruefe("Spiel im Gym-Tab: keine JS-Fehler", fehler.length === 0, fehler.join(" | "));
      await ctx.close();
    }
    // 8. Ein Tag liegt teils vor, teils hinter der Grenze (Befund der Durchsicht): er wird erst als Ganzes verbucht,
    //    sonst fehlten Kristall und Ruf eines späteren Rekords für immer
    {
      const T = Date.parse("2026-10-22T10:00:00Z");
      const morgenFrueh = Date.parse("2026-10-23T08:00:00Z"), morgenSpaet = Date.parse("2026-10-23T12:00:00Z");
      const liste = [eintrag("g1", T - 2 * TAG, 60), Object.assign(eintrag("g2", morgenFrueh, 100), { uebung: "Kniebeuge", uebungId: "kniebeuge-lh", muskelgruppe: "beine" }), eintrag("g3", morgenSpaet, 80)];
      const einmal = await spielSeite({ eintraege: liste }, morgenSpaet + 3600000, "Europe/Berlin");
      const a = await sync(einmal.page);
      await einmal.ctx.close();
      const zweimal = await spielSeite({ eintraege: liste }, T, "Europe/Berlin");
      const b0 = await sync(zweimal.page);
      await zweimal.page.clock.setSystemTime(morgenSpaet + 3600000);
      const b = await sync(zweimal.page);
      await zweimal.ctx.close();
      pruefe("Spiel: Tag an der Grenze nicht zum Teil verbucht", !b0.verarbeitet.includes("2026-10-23"), JSON.stringify(b0.verarbeitet));
      pruefe("Spiel: Tag an der Grenze gibt denselben Lohn wie ein Abgleich danach", b.kristalle === a.kristalle && b.ruf === a.ruf && b.splitter === a.splitter, JSON.stringify([a.kristalle, a.ruf, b.kristalle, b.ruf]));
    }
    // 7. Zeitzonen und Zeitumstellung: Ende der Sommerzeit in Europa (25.10.2026), Datumsgrenze und Westküste. Der Spieltag ist
    //    der Kalendertag des Eintrags in der Zone des Geräts, die 24 Stunden sind echte Stunden (Date.now), keine Kalendertage.
    for (const zone of ["Europe/Berlin", "Pacific/Kiritimati", "America/Los_Angeles"]) {
      const T = Date.parse("2026-10-24T22:30:00Z");
      const alt = eintrag("z1", T - 2 * TAG, 60), spaet = eintrag("z2", T + 30 * 3600000, 62);
      const { ctx, page, fehler } = await spielSeite({ eintraege: [alt, spaet] }, T, zone);
      const schluessel = await page.evaluate((zeiten) => zeiten.map((t) => { const d = new Date(t); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }), [T - 2 * TAG, T + 30 * 3600000]);
      const a = await sync(page);
      pruefe("Spiel " + zone + ": 30 h voraus nicht verbucht, der alte Tag schon", a.verarbeitet.includes(schluessel[0]) && !a.verarbeitet.includes(schluessel[1]) && a.verarbeitet.length === 1, JSON.stringify(a.verarbeitet));
      await page.clock.setSystemTime(T + 7 * 3600000);
      const b = await sync(page);
      pruefe("Spiel " + zone + ": nach 7 h (23 h voraus) verbucht, als Kalendertag der Zone", b.verarbeitet.includes(schluessel[1]) && b.verarbeitet.length === 2, JSON.stringify(b.verarbeitet) + " erwartet " + schluessel[1]);
      pruefe("Spiel " + zone + ": keine JS-Fehler", fehler.length === 0, fehler.join(" | "));
      await ctx.close();
    }
    // 4. Wochenzahl des Spiels (Truhe, Serie) zählt nur Tage bis heute, auch wenn ein alter Spielstand einen späteren Tag dieser Woche hat
    {
      // Mittwoch dieser Woche, 12 Uhr: ein Tag am Freitag derselben Woche liegt sicher in ihr
      const d = new Date(T0); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() - ((d.getDay() + 6) % 7) + 2);
      const mi = d.getTime(), fr = mi + 2 * TAG;
      const { ctx, page } = await spielSeite({ eintraege: [eintrag("w1", mi - 3600000, 60)] }, mi);
      await sync(page);
      const w = await page.evaluate((ft) => { const s = window.__gym.stand(); s.tage[ft] = { gruppen: ["beine"], familien: [], rekord: true }; s.verarbeitet.push(ft); return window.__gym.woche ? window.__gym.woche() : null; }, tagIso(fr));
      pruefe("Spiel: Wochenzahl ohne späteren Tag dieser Woche", w && w.tage === 1 && !w.gruppen.beine && w.rekorde === 0, JSON.stringify(w));
      await ctx.close();
    }
  }

  // ======== Audit 14.11.2026 (Version 193): K-02, K-03, K-04, K-06, K-07, K-11, K-21 ========
  if (teil("audit193")) {
    const satzKnopf = "button[onclick='satzFertigPruefen()']";
    const modusStarten = async (page) => { await page.evaluate(() => { seiteZeigen("training"); routineStarten(routinen[0]); }); await page.waitForTimeout(500); };
    const saetzeHeute = (page) => page.evaluate(() => { const t = laufendesTraining; const u = t && t.uebungen[t.index]; return u ? u.saetze.length : -1; });
    const pauseLaeuft = (page) => page.evaluate(() => !!pause);
    // K-04: Doppeltipp auf „Satz fertig“ (echte Maus, zweiter Tipp trifft, was nach dem ersten dort liegt)
    for (const abstand of [40, 120, 250]) {
      const { ctx, page, fehler } = await seite(browser, 390, "de");
      await modusStarten(page);
      await page.fill("#t-feld-gewicht", "100"); await page.fill("#t-feld-wdh", "8");
      const box = await page.locator(satzKnopf).first().boundingBox();
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      await page.waitForTimeout(abstand);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      await page.waitForTimeout(300);
      pruefe("Doppeltipp " + abstand + " ms: ein Satz, Pause läuft weiter", (await saetzeHeute(page)) === 1 && (await pauseLaeuft(page)), String(await saetzeHeute(page)) + " / " + (await pauseLaeuft(page)));
      await page.waitForTimeout(700);
      await page.evaluate(() => pauseUeberspringenTipp());
      pruefe("Doppeltipp " + abstand + " ms: nach der Sperre geht Überspringen", !(await pauseLaeuft(page)));
      pruefe("Doppeltipp " + abstand + " ms: keine JS-Fehler", fehler.length === 0, fehler.join(" | "));
      await ctx.close();
    }
    // K-04 mit „Keine Pause“: zwei schnelle Tipps speichern nur einen Satz
    {
      const r = JSON.parse(JSON.stringify(BASIS.routinen)); r[0].uebungen[0].pause = 0;
      const { ctx, page } = await seite(browser, 390, "de", { routinen: r });
      await modusStarten(page);
      await page.fill("#t-feld-gewicht", "100"); await page.fill("#t-feld-wdh", "8");
      const box = await page.locator(satzKnopf).first().boundingBox();
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      await page.waitForTimeout(150);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      await page.waitForTimeout(300);
      pruefe("Keine Pause, Doppeltipp: ein Satz", (await saetzeHeute(page)) === 1, await saetzeHeute(page));
      await page.waitForTimeout(700);
      await page.locator(satzKnopf).first().click();
      await page.waitForTimeout(300);
      pruefe("Keine Pause: nach der Sperre zählt der nächste Tipp", (await saetzeHeute(page)) === 2, await saetzeHeute(page));
      await ctx.close();
    }
    // K-06: leere und ungültige Felder speichern nichts, auch wenn das Feld beim Tippen auf den Knopf den Fokus verliert
    for (const [name, gewicht, wdh] of [["Gewicht leer", "", "8"], ["Wdh. leer", "100", ""], ["Gewicht −50", "-50", "8"], ["0 Wdh.", "100", "0"]]) {
      const { ctx, page, fehler } = await seite(browser, 390, "de");
      await modusStarten(page);
      await page.fill("#t-feld-gewicht", gewicht); await page.fill("#t-feld-wdh", wdh);
      await page.focus(wdh === "" || wdh === "0" ? "#t-feld-wdh" : "#t-feld-gewicht");
      await page.locator(satzKnopf).first().click();
      await page.waitForTimeout(300);
      const r = await page.evaluate(() => ({ titel: document.getElementById("frage-hintergrund").classList.contains("offen") ? document.getElementById("frage-titel").textContent : "", n: eintraege.length }));
      pruefe("Eingabe " + name + ": kein Satz, Hinweis", (await saetzeHeute(page)) === 0 && r.n === 3 && r.titel === "Eingabe prüfen", JSON.stringify(r));
      pruefe("Eingabe " + name + ": keine JS-Fehler", fehler.length === 0, fehler.join(" | "));
      await ctx.close();
    }
    {
      const { ctx, page } = await seite(browser, 390, "en");
      await modusStarten(page);
      await page.fill("#t-feld-gewicht", "102,5"); await page.fill("#t-feld-wdh", "8");
      await page.locator(satzKnopf).first().click();
      await page.waitForTimeout(300);
      const g = await page.evaluate(() => laufendesTraining.uebungen[0].saetze.map((x) => x.gewicht).join(","));
      pruefe("Eingabe 102,5 × 8: wird wie bisher gespeichert", g === "102.5", g);
      await ctx.close();
    }
    // K-03: zwei Tabs. Tab 2 speichert, Tab 1 lädt neu oder fragt, danach schreibt Tab 1 auf dem neuen Stand
    {
      const { ctx, page } = await seite(browser, 390, "de");
      const zwei = await ctx.newPage();
      await zwei.goto(ORT); await zwei.waitForTimeout(800);
      await page.evaluate(() => { window.__alterStand = true; });
      await zwei.evaluate(() => { eintraege.push({ id: "tab2", uebung: "Bankdrücken", uebungId: "bankdruecken-lh", muskelgruppe: "brust", datum: new Date().toISOString(), einzelsaetze: [{ gewicht: 100, wdh: 8 }], saetze: 1, gewicht: 100, wdh: 8 }); sicherSpeichern("eintraege", eintraege); });
      await page.waitForTimeout(600);
      const a = await page.evaluate(() => ({ neu: !window.__alterStand, titel: document.getElementById("frage-hintergrund").classList.contains("offen") ? document.getElementById("frage-titel").textContent : "" }));
      pruefe("Zwei Tabs: Tab 1 lädt neu oder fragt", a.neu || a.titel === "In einem anderen Fenster geändert", JSON.stringify(a));
      if (!a.neu) {
        await page.click("#frage-knoepfe button.haupt");
        await page.waitForTimeout(1000);
      }
      await page.evaluate(() => { eintraege.push({ id: "tab1", uebung: "Bankdrücken", uebungId: "bankdruecken-lh", muskelgruppe: "brust", datum: new Date().toISOString(), einzelsaetze: [{ gewicht: 100, wdh: 9 }], saetze: 1, gewicht: 100, wdh: 9 }); sicherSpeichern("eintraege", eintraege); });
      const ids = await page.evaluate(() => JSON.parse(localStorage.getItem("eintraege")).map((x) => x.id).join(","));
      pruefe("Zwei Tabs: beide Einträge bleiben (5)", ids.split(",").length === 5 && ids.includes("tab1") && ids.includes("tab2"), ids);
      // Das Gym-Spiel (eigener Schlüssel) löst nichts aus
      await page.evaluate(() => { window.__alterStand = true; });
      await zwei.evaluate(() => localStorage.setItem("korund-gym-v2", JSON.stringify({ test: Date.now() })));
      await page.waitForTimeout(500);
      const b = await page.evaluate(() => ({ alt: !!window.__alterStand, offen: document.getElementById("frage-hintergrund").classList.contains("offen") }));
      pruefe("Zwei Tabs: Spielstand löst nichts aus", b.alt && !b.offen, JSON.stringify(b));
      await ctx.close();
    }
    // K-02 Variante A: helles Gerät ohne Wahl und mit gespeichertem „hell“ startet dunkel, die Wahl bleibt gespeichert
    for (const wahl of [undefined, "hell", "dunkel"]) {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, locale: "de-DE", colorScheme: "light" });
      await ctx.route(/supabase\.co/, (r) => r.abort());
      const daten = Object.assign({}, BASIS); daten.einstellungen = Object.assign({ sprache: "de" }, BASIS.einstellungen);
      if (wahl) daten.einstellungen.design = wahl;
      await ctx.addInitScript((d) => { if (!sessionStorage.getItem("gesetzt")) { localStorage.clear(); for (const k of Object.keys(d)) localStorage.setItem(k, JSON.stringify(d[k])); sessionStorage.setItem("gesetzt", "1"); } }, daten);
      const page = await ctx.newPage();
      await page.goto(ORT); await page.waitForTimeout(800);
      const r = await page.evaluate(() => { seiteZeigen("training"); routineStarten(routinen[0]); const w = document.getElementById("modus-w"); einstOeffnen(); einstZeigen("design");
        return { attr: document.documentElement.getAttribute("data-design"), korund: lookKorund(), w: !!w && w.offsetParent !== null, wahl: !document.getElementById("design-auswahl").classList.contains("versteckt"), gespeichert: JSON.parse(localStorage.getItem("einstellungen")).design, hinweis: document.querySelector("[data-nur-dunkel]").offsetParent !== null }; });
      pruefe("Hell aus (" + wahl + "): dunkel, Look Korund, W sichtbar, keine Design-Wahl, Hinweis ohne System", r.attr === "dunkel" && r.korund && r.w && !r.wahl && r.hinweis, JSON.stringify(r));
      pruefe("Hell aus (" + wahl + "): gespeicherte Wahl unverändert", r.gespeichert === wahl, String(r.gespeichert));
      await ctx.close();
    }
    // K-07: Statistik im Profil ohne Überlauf bei 320 px, auch mit sechsstelligem Volumen
    for (const sprache of ["de", "en"]) {
      const viel = BASIS.eintraege.map((x) => Object.assign({}, x, { datum: new Date().toISOString(), id: x.id + "v", einzelsaetze: x.einzelsaetze.map((s) => ({ gewicht: 400, wdh: 100 })) }));
      const { ctx, page } = await seite(browser, 320, sprache, { eintraege: BASIS.eintraege.concat(viel) });
      const r = await page.evaluate(() => { seiteZeigen("profil"); profilReiter = "statistik"; profilReiterAnzeigen();
        const w = [...document.querySelectorAll(".statistik-kachel-wert")]; return { breite: document.documentElement.scrollWidth, text: w.map((x) => x.textContent).join(" | "), raus: w.filter((x) => x.getBoundingClientRect().right > x.closest(".statistik-kachel").getBoundingClientRect().right - 4).length }; });
      pruefe("320-" + sprache + " Profil-Statistik ohne Überlauf (" + r.text + ")", r.breite === 320 && r.raus === 0, JSON.stringify(r));
      await ctx.close();
    }
    // K-21: Gym-Tab ohne Netz zeigt einen Hinweis (Service Worker), mit Netz lädt das Spiel beim nächsten Öffnen
    {
      const { ctx, page, fehler } = await seite(browser, 390, "de");
      await page.evaluate(async () => { await navigator.serviceWorker.ready; });
      await page.reload(); await page.waitForTimeout(1200);
      await ctx.setOffline(true);
      await page.evaluate(() => seiteZeigen("gym")); await page.waitForTimeout(1500);
      const a = await page.evaluate(() => { const f = document.getElementById("gym-spiel"); return { off: !!(f.contentWindow && f.contentWindow.__gymOffline), text: f.contentDocument ? f.contentDocument.body.innerText.slice(0, 30) : "" }; });
      pruefe("Gym offline: Hinweis statt leerer Fläche", a.off && /Internet/.test(a.text), JSON.stringify(a));
      await ctx.setOffline(false);
      await page.evaluate(() => { seiteZeigen("home"); seiteZeigen("gym"); }); await page.waitForTimeout(3500);
      const b = await page.evaluate(() => { const f = document.getElementById("gym-spiel"); return { off: !!(f.contentWindow && f.contentWindow.__gymOffline), sync: !!(f.contentWindow && f.contentWindow.__gymSync) }; });
      pruefe("Gym wieder online: Spiel lädt", !b.off && b.sync, JSON.stringify(b));
      pruefe("Gym offline/online: keine JS-Fehler", fehler.length === 0, fehler.join(" | "));
      await ctx.close();
    }
    // K-11: Gym-Name mit HTML wird als Text gezeigt
    {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
      const page = await ctx.newPage();
      await page.goto(ORT.replace("index.html", "spiel/index.html")); await page.waitForTimeout(2500);
      await page.evaluate(() => document.querySelectorAll("button").forEach((x) => { if (/^Gym$/i.test(x.textContent.trim())) x.click(); }));
      await page.waitForTimeout(800);
      const feld = page.locator("input[placeholder='Mein Gym']");
      await feld.fill("<i id=xss>x</i>"); await feld.press("Tab"); await page.waitForTimeout(800);
      const r = await page.evaluate(() => ({ html: !!document.getElementById("xss"), text: document.body.innerText.includes("<i id=xss>x</i>") }));
      pruefe("Spiel: Gym-Name mit HTML als Text", !r.html && r.text, JSON.stringify(r));
      await ctx.close();
    }
  }
} finally {
  await browser.close();
  server.close();
}
const fehlerZahl = ergebnis.filter((z) => z.startsWith("FEHL")).length;
console.log(ergebnis.join("\n"));
console.log(fehlerZahl + " Fehler von " + ergebnis.length);
process.exit(fehlerZahl > 0 || ergebnis.length === 0 ? 1 : 0);
