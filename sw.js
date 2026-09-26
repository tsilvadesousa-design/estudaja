// EXTERMINADOR DE CACHE: Força o telemóvel a apagar a versão velha e a atualizar
self.addEventListener('install', function(e) {
  self.skipWaiting(); // Força a instalação imediata
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // Apaga todos os visuais velhos guardados no telemóvel
          return caches.delete(cacheName);
        })
      );
    })
  );
  // Comete "suicídio" para nunca mais bloquear o site
  self.registration.unregister();
});

self.addEventListener('fetch', function(e) {
  // Obriga o telemóvel a ir sempre buscar à internet (GitHub) e nunca à memória
  e.respondWith(fetch(e.request));
});
