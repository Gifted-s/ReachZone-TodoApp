/* eslint-disable no-restricted-globals */
const cachename = 'Todo';
const urlsToCache = [
    '/',
    '/signin',
    '/signup',
 
]
//register service worker
self.addEventListener('install', (event)=>{
event.waitUntil(caches.open(cachename).then(cache=>{
    cache.addAll(urlsToCache)
}))
})

self.addEventListener('fetch', (event)=>{
    event.respondWith(caches.match(event.request).then(response=>{
        if(response){
            return response
        }
        return fetch(event.request)
    }))
})


self.addEventListener('activate', event => {
    var cacheWhitelist = ['makemyday'];
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });