const CACHE_NAME = 'mwiri-league-v1';
const STATIC_CACHE = 'mwiri-static-v1';

// Static assets to cache on install
const STATIC_ASSETS = [
    '/',
    '/table',
    '/fixtures',
    '/results',
    '/stats',
    '/compare',
    '/knockout',
    '/clubs',
    '/news',
    '/fantasy',
    '/gallery',
    '/manifest.json',
    '/images/mwiri-logo.png',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => {
            console.log('[SW] Caching static assets');
            return cache.addAll(STATIC_ASSETS);
        }).catch((error) => {
            console.log('[SW] Failed to cache some assets:', error);
        })
    );
    // Activate immediately
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => {
                        return cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE;
                    })
                    .map((cacheName) => {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    })
            );
        })
    );
    // Take control of all clients immediately
    self.clients.claim();
});

// Fetch event - network first, then cache fallback
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip external requests
    if (!url.origin.includes(self.location.origin)) {
        return;
    }

    // Skip API calls and dynamic content
    if (url.pathname.startsWith('/api')) {
        return;
    }

    event.respondWith(
        // Network first strategy for pages
        fetch(request)
            .then((response) => {
                // Clone the response for caching
                const responseClone = response.clone();

                // Cache successful responses
                if (response.status === 200) {
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone);
                    });
                }

                return response;
            })
            .catch(() => {
                // If offline, try to serve from cache
                return caches.match(request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    // Return offline page for navigation requests
                    if (request.mode === 'navigate') {
                        return caches.match('/');
                    }

                    return new Response('Offline', {
                        status: 503,
                        statusText: 'Service Unavailable',
                    });
                });
            })
    );
});

// Handle messages from the main thread
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
