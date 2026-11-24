/**
 * BhashaBuddy Service Worker (sw.js)
 * Implements versioned cache-first offline support for core app shell.
 */

const CACHE_NAME = "bhashabuddy-shell-v1";

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/variables.css",
  "./css/base.css",
  "./css/components.css",
  "./css/layout.css",
  "./js/data.js",
  "./js/i18n.js",
  "./js/storage.js",
  "./js/speech.js",
  "./js/levenshtein.js",
  "./js/flashcards.js",
  "./js/pronunciation.js",
  "./js/quiz.js",
  "./js/progress.js",
  "./js/chatbot.js",
  "./js/dictionary.js",
  "./js/peer.js",
  "./js/app.js",
  "./assets/icons/icon-192.svg",
  "./assets/icons/icon-512.svg"
];

// Install: Cache all static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up old outdated caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Cache-first, fallback to network
self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        // Cache valid fetched static resources
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === "basic") {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Offline fallback
        if (event.request.headers.get("accept").includes("text/html")) {
          return caches.match("./index.html");
        }
      });
    })
  );
});
