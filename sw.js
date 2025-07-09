const cacheName = "popberry-v2";
const assets = [
  "./",
  "./index.html",
  "./manifest.json",
  "./sw.js",
  "./pop-berry-icon.png",
  "./bg_Music.mp3",
  "./Bouble.mp3",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    }),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) return caches.delete(key);
        }),
      );
    }),
  );
  return self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return (
        res ||
        fetch(e.request).catch(
          () => caches.match("./index.html"), // fallback
        )
      );
    }),
  );
});
