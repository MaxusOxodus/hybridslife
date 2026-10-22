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
        verlauf: verlaufPunkte("Bankdrücken", "bankdruecken-lh", "rang").length
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
        pruefe(breite + "-" + sprache + " Import: Frage nennt unmögliche Werte, Dublette, Zukunft, Zusatzangaben", d.offen && /1 Einträge mit unmöglichen|1 entries with impossible/.test(d.text) && /doppelte|duplicate/.test(d.text) && /Zukunft|future/.test(d.text) && /Zusatzangaben|extra data/.test(d.text) && !d.ueber, d.text);
        // Beide Knöpfe lassen sich antippen: nach dem Scrollen liegt an ihrer Mitte wirklich der Knopf (kein Scheintest)
        const knopf = await page.evaluate(() => [...document.querySelectorAll("#dialog-hintergrund .dialog-btn")].every((b) => {
          b.scrollIntoView({ block: "center" });
          const r = b.getBoundingClientRect();
          return r.height > 0 && r.top >= 0 && r.bottom <= window.innerHeight && document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2) === b;
        }));
        pruefe(breite + "-" + sprache + " Import: Knöpfe erreichbar", knopf);
        await page.click("button[onclick=\"importAusfuehren('ersetzen')\"]");
        await page.waitForTimeout(300);
        const r = await page.evaluate(() => ({ ids: eintraege.map((x) => x.id).sort().join(","), fremd: (eintraege.filter((x) => x.id === "i4")[0] || {}).fremd, cloud: JSON.stringify(cloudDaten().eintraege) }));
        pruefe(breite + "-" + sprache + " Import: 3 Einträge übernommen, Zusatzfeld lokal da, nicht in der Cloud", r.ids === "i1,i3,i4" && r.fremd === "x" && !/fremd|puls/.test(r.cloud), JSON.stringify(r).slice(0, 200));
        pruefe(breite + "-" + sprache + " Import: keine JS-Fehler", fehler.length === 0, fehler.join(" | "));
        await ctx.close();
      }
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
