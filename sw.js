// Service worker de retirada: borra las cachés de la app antigua, se da de baja y lleva a los clientes al sitio nuevo.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil((async function () {
    try { var ks = await caches.keys(); await Promise.all(ks.map(function (k) { return caches.delete(k); })); } catch (x) {}
    try { await self.registration.unregister(); } catch (x) {}
    try { var cs = await self.clients.matchAll({ type: 'window' }); cs.forEach(function (c) { c.navigate('https://rutaalaplaza.com/'); }); } catch (x) {}
  })());
});
self.addEventListener('fetch', function () {});
