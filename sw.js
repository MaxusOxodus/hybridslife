// Service Worker: speichert alle Dateien der App, damit sie auch ohne Internet startet.

// Dieselbe Nummer wie bei style.css?v=N, texte.js?v=N, uebungen.js?v=N, raenge.js?v=N, bilder.js?v=N und app.js?v=N in der index.html.
// Erst wenn sich diese Zahl ändert, bemerkt der Browser eine neue Version.
const VERSION = 62;

const CACHE = "gymstead-v" + VERSION;

// Alle Dateien, die offline gebraucht werden
const DATEIEN = [
  "./",
  "index.html",
  "style.css?v=" + VERSION,
  "texte.js?v=" + VERSION,
  "uebungen.js?v=" + VERSION,
  "erklaerungen.js?v=" + VERSION,
  "raenge.js?v=" + VERSION,
  "bilder.js?v=" + VERSION,
  "vorlagen.js?v=" + VERSION,
  "app.js?v=" + VERSION,
  "manifest.json",
  "icons/icon-32.png",
  "icons/icon-180.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png"
];

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
  if (anfrage.method !== "GET" || new URL(anfrage.url).origin !== self.location.origin) {
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
