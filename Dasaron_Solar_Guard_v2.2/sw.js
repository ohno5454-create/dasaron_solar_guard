// Dasaron Solar Guard v2.1 PWA Service Worker
const CACHE = 'dasaronsolar-v22';
const ASSETS = [
  './', './index.html', './manifest.webmanifest',
  './icon-192.png', './icon-512.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      // 동적으로 받은 동일 출처 자원 + CDN 라이브러리(Chart.js·MapLibre) 캐시 → 오프라인 동작
      try {
        const url = new URL(req.url);
        const cacheable = url.origin === self.location.origin ||
          /cdnjs\.cloudflare\.com/.test(url.host);
        if (cacheable && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
      } catch (err) {}
      return res;
    }).catch(() => {
      // 오프라인: 페이지 요청이면 앱 본체로 폴백
      if (req.mode === 'navigate') return caches.match('./index.html');
    }))
  );
});
