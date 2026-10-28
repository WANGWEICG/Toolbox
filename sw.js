/* Scope-limited offline shell. Never cache data.json or arbitrary requests. */
const CACHE_NAME = 'wangwei-toolbox-shell-v5';
const CACHE_PREFIX = 'wangwei-toolbox-';
const SHELL = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];
const SCOPE = new URL(self.registration.scope);
const SHELL_PATHS = new Set(SHELL.map(path => new URL(path, SCOPE).pathname));

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key))
    )),
    self.clients.claim()
  ]));
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(SCOPE.pathname)) return;
  if (url.pathname.endsWith('/data.json')) return; // Always network-only for stock/FX/weather.
  if (!SHELL_PATHS.has(url.pathname) && req.mode !== 'navigate') return;

  const offlineKey = req.mode === 'navigate' ? './index.html' : url.origin + url.pathname;
  event.respondWith(
    fetch(req).then(response => {
      if (response.ok && (req.mode === 'navigate' || SHELL_PATHS.has(url.pathname))) {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put(offlineKey, copy)));
      }
      return response;
    }).catch(async () => (await caches.match(offlineKey)) || Response.error())
  );
});
