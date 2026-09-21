const CACHE_NAME = 'estudaja-v2'; // O 'v2' avisa o telemóvel para destruir o cache antigo

self.addEventListener('install', e => {
  self.skipWaiting(); // Força a atualização imediata e expulsa a versão antiga
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  // NOVA REGRA: Vai à internet primeiro (Network First). 
  // Só mostra a versão offline se o telemóvel estiver em modo avião.
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
