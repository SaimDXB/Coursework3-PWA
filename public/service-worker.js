var cacheName = 'petstore-v1';
var cacheFiles = [
    'index.html',
    'server.js',
    'CSS/stylesheet.css',
    'Images/art&craft.jpg',
    'Images/athlon.png',
    'Images/basketball.jpg',
    'Images/boxer.jpg',
    'Images/cricket.jpg',
    'Images/cybersecurity.jpg',
    'Images/football.jpg',
    'Images/karate.jpg',
    'Images/programming.jpg',
    'Images/swimming.jpg',
    'Images/tableTennis.jpg',
    'javascript/products.js',
    
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});

// self.addEventListener('fetch', function (e) {
//     e.respondWith(
//         // check if the cache has the file
//         caches.match(e.request).then(function (r) {
//             console.log('[Service Worker] Fetching resource: ' + e.request.url);
//             // 'r' is the matching file if it exists in the cache
//             return r 
//         })
//     );
// });

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            // Download the file if it is not in the cache, 
            return r || fetch(e.request).then(function (response) {
                // add the new file to cache
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});