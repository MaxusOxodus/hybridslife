// Service Worker: speichert alle Dateien der App, damit sie auch ohne Internet startet.

// Dieselbe Nummer wie bei style.css?v=N, texte.js?v=N, uebungen.js?v=N, raenge.js?v=N, bilder.js?v=N und app.js?v=N in der index.html.
// Erst wenn sich diese Zahl ändert, bemerkt der Browser eine neue Version.
const VERSION = 193;

const CACHE = "gymstead-v" + VERSION;

// Alle Dateien, die offline gebraucht werden
const DATEIEN = [
  "./",
  "index.html",
  "style.css?v=" + VERSION,
  "glass.css?v=" + VERSION,
  "korund.css?v=" + VERSION,
  "texte.js?v=" + VERSION,
  "uebungen.js?v=" + VERSION,
  "erklaerungen.js?v=" + VERSION,
  "erklaerungen-brust.js",
  "erklaerungen-latissimus.js",
  "erklaerungen-trizeps.js",
  "erklaerungen-quadrizeps.js",
  "erklaerungen-bizeps.js",
  "erklaerungen-ruecken-oben.js",
  "erklaerungen-schulter-vorn.js",
  "erklaerungen-schulter-hinten.js",
  "erklaerungen-bauch-schraeg.js",
  "erklaerungen-bauch.js",
  "erklaerungen-schulter-seite.js",
  "erklaerungen-ruecken-unten.js",
  "erklaerungen-trapez.js",
  "erklaerungen-po.js",
  "erklaerungen-waden.js",
  "erklaerungen-unterarme.js",
  "erklaerungen-nachtrag.js",
  "erklaerungen-beinbeuger.js",
  "erklaerungen-abduktoren.js",
  "erklaerungen-adduktoren.js",
  "erklaerungen-ganzkoerper.js",
  "raenge.js?v=" + VERSION,
  "bilder.js?v=" + VERSION,
  "vorlagen.js?v=" + VERSION,
  "figuren.js?v=" + VERSION,
  "einfuehrung.js",
  "supabase-2.117.2.js",
  "app.js?v=" + VERSION,
  "manifest.json",
  "icons/korund-favicon-32.png",
  "icons/korund-icon-platin-180.png",
  "icons/korund-icon-platin-192.png",
  "icons/korund-icon-platin-512.png"
];

// Hinweis für das Gym-Spiel ohne Netz (Deutsch und Englisch, die Sprache der App kennt der Service Worker nicht)
const SPIEL_OFFLINE = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">' +
  '<script>window.__gymOffline = true;</script>' +
  '<style>html,body{height:100%;margin:0;background:#000;color:#9B9B9B;font:15px/1.45 -apple-system,system-ui,sans-serif}' +
  'body{display:flex;align-items:center;justify-content:center;text-align:center;padding:0 32px;box-sizing:border-box}b{color:#F0F0F0;font-weight:600}</style></head>' +
  '<body><div><p><b>Das Gym braucht Internet.</b><br>Verbinde dich und öffne den Tab erneut.</p>' +
  '<p lang="en"><b>The gym needs internet.</b><br>Connect and open the tab again.</p></div></body></html>';

// Installieren: alle Dateien frisch vom Server holen und in den Cache legen.
// "reload" umgeht den normalen Browser-Cache, sonst könnten alte Dateien hineingeraten.
self.addEventListener("install", function (ereignis) {
  ereignis.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(DATEIEN.map(function (datei) {
        return new Request(datei, { cache: "reload" });
      }));
    })
  );
});

// Aktivieren: die Caches älterer Versionen löschen. Die Einträge liegen nicht im Cache,
// sondern im localStorage, und bleiben davon unberührt.
self.addEventListener("activate", function (ereignis) {
  ereignis.waitUntil(
    caches.keys().then(function (namen) {
      return Promise.all(namen.map(function (name) {
        if (name.startsWith("gymstead-") && name !== CACHE) {
          return caches.delete(name);
        }
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

// Die neue Version wartet, bis die App nach dem Tippen auf den Hinweis Bescheid gibt
self.addEventListener("message", function (ereignis) {
  if (ereignis.data === "aktualisieren") {
    self.skipWaiting();
  }
});

// Jede Anfrage der App: erst im Cache nachsehen, nur sonst ins Internet gehen
self.addEventListener("fetch", function (ereignis) {
  const anfrage = ereignis.request;
  const adresse = new URL(anfrage.url);
  // Das Gym-Spiel unter spiel/ ist eine eigene Seite und kommt immer aus dem Netz.
  // Ohne Netz bekommt die Seite des Spiels (seit Version 193, Audit K-21) einen kurzen Hinweis statt einer leeren Fläche.
  // Das Merkmal __gymOffline sagt der App, dass sie das Spiel beim nächsten Öffnen des Tabs neu laden soll.
  if (anfrage.method === "GET" && adresse.origin === self.location.origin && adresse.pathname.includes("/spiel/") && anfrage.mode === "navigate") {
    ereignis.respondWith(fetch(anfrage).catch(function () {
      return new Response(SPIEL_OFFLINE, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }));
    return;
  }
  if (anfrage.method !== "GET" || adresse.origin !== self.location.origin || adresse.pathname.includes("/spiel/")) {
    return;
  }

  ereignis.respondWith(
    caches.open(CACHE).then(function (cache) {
      // Beim Öffnen der App immer die gespeicherte Startseite liefern
      const gesucht = anfrage.mode === "navigate" ? "./" : anfrage;
      return cache.match(gesucht).then(function (treffer) {
        return treffer || fetch(anfrage);
      });
    })
  );
});
