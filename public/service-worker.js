var CACHE_NAME = "binni-pwa-cache";
var urlsToCache = [
    "/",
    "/style.css",
    "/images/binni_logo.png",
    "/fonts/IrishGrover-Regular.ttf",
    "/fonts/Kalam-Bold.ttf",
    "fonts/Roboto-Regular.ttf",
];

// Install a service worker
self.addEventListener("install", (event) => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});

// Cache and return requests
self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }

            return fetch(event.request).then(function(response) {
                // Check if we received a valid response
                if (!response || response.status !== 200 || response.type !== "basic") {
                    return response;
                }

                // IMPORTANT: Clone the response. A response is a stream
                // and because we want the browser to consume the response
                // as well as the cache consuming the response, we need
                // to clone it so we have two streams.
                var responseToCache = response.clone();

                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(event.request, responseToCache);
                });

                return response;
            });
        })
    );
});

// Update a service worker
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    console.log(cacheName);
                    if (cacheName != CACHE_NAME) {
                        console.log("cache deleted");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});