const CACHE_NAME = 'flight-checklist-v1';
const urlsToCache = [
  './',
  './index.html',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
        console.log('Opened cache and caching assets');
        return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  // We only want to cache GET requests.
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return from cache if found, otherwise fetch from network.
      return response || fetch(event.request);
    })
  );
});
