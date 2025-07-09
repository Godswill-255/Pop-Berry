const cacheName = 'pop-berry-cache-v1';
const assets = [
  '/',
  '/index.html',
  '/manifest.json',
  '/sw.js',
  '/pop-berry-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
