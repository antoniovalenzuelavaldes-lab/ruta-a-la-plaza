// Guarda la aplicacion para que abra sin conexion. Los mp3 no se guardan: se reproducen en streaming.
const V = 'ruta-v1';
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(['./', 'index.html', 'manifest.json', 'icon-192.png']))); self.skipWaiting(); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== V).map(x => caches.delete(x)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin || u.pathname.endsWith('.mp3') || u.pathname.endsWith('config.js')) return;
  e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); return res; }).catch(() => caches.match(r, { ignoreSearch: true })));
});
