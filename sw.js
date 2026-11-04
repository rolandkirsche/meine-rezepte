// Antwortet immer zuerst aus dem Speicher (funktioniert offline) und holt im
// Hintergrund neue Dateien, die beim nächsten Start der App aktiv sind.
const CACHE = 'meine-rezepte-v4';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-180.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE)
    // cache: 'reload' umgeht den Browser-Zwischenspeicher, sonst könnte ein Update alte Dateien speichern.
    .then(cache => cache.addAll(FILES.map(url => new Request(url, { cache: 'reload' }))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

  // waitUntil muss synchron laufen: Safari 15 kann spätere Aufrufe ablehnen.
  const network = fetch(request.url, { cache: 'no-cache' }).then(async response => {
    if (response.ok && !response.redirected) {
      const cache = await caches.open(CACHE);
      await cache.put(request, response.clone());
    }
    return response;
  });
  event.waitUntil(network.catch(() => {}));

  event.respondWith(
    caches.open(CACHE)
      .then(cache => cache.match(request, { ignoreSearch: true })
        .then(hit => hit || (request.mode === 'navigate' ? cache.match('./index.html') : undefined)))
      .then(hit => hit || network)
  );
});
