let cache_name = 'pwa-app-v1'

const urlsToCache = [
    '/',
    '/index.html'
]

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cache_name).then((cache) => {
            console.log('Opened cache')
            return cache.addAll(urlsToCache)
        })
    )
    self.skipWaiting()
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if(response) {
                return response
            }
            return fetch(event.request)
        })
    )
})