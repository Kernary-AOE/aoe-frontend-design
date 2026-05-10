# PwaServiceWorkerOffline [pattern] v1.0.0
Register a service worker from the main thread; inside the worker, cache critical assets on the install event and intercept fetch requests to serve cached responses when the network is unavailable.
domain: frontend-design

## Problem
PWAs must remain usable during network interruptions — a blank screen on lost connectivity destroys the native-app illusion and user trust.

## Solution
```
    Two-file pattern:
    1. Register in main JS/TS:
       navigator.serviceWorker.register('/sw.js')

    2. In sw.js:
       - install event: open a named cache and add all critical assets
       - fetch event: try network first; fall back to cache on NetworkError
  
```

## Implementation
```
    // sw.js — cache-on-install + network-first-then-cache strategy
    const CACHE = 'app-v1';
    const PRECACHE = ['/', '/index.html', '/app.js', '/app.css', '/offline.html'];

    self.addEventListener('install', (e) => {
      e.waitUntil(
        caches.open(CACHE).then(c => c.addAll(PRECACHE))
      );
      self.skipWaiting();
    });

    self.addEventListener('activate', (e) => {
      e.waitUntil(
        caches.keys().then(keys =>
          Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        )
      );
      self.clients.claim();
    });

    self.addEventListener('fetch', (e) => {
      if (e.request.method !== 'GET') return;
      e.respondWith(
        fetch(e.request)
          .then(res => {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
            return res;
          })
          .catch(() => caches.match(e.request).then(r => r || caches.match('/offline.html')))
      );
    });
  
```

## Problem
PWAs must remain usable during network interruptions — a blank screen on lost connectivity destroys the native-app illusion and user trust.

## Solution
```
    Two-file pattern:
    1. Register in main JS/TS:
       navigator.serviceWorker.register('/sw.js')

    2. In sw.js:
       - install event: open a named cache and add all critical assets
       - fetch event: try network first; fall back to cache on NetworkError
  
```

## Implementation
```
    // sw.js — cache-on-install + network-first-then-cache strategy
    const CACHE = 'app-v1';
    const PRECACHE = ['/', '/index.html', '/app.js', '/app.css', '/offline.html'];

    self.addEventListener('install', (e) => {
      e.waitUntil(
        caches.open(CACHE).then(c => c.addAll(PRECACHE))
      );
      self.skipWaiting();
    });

    self.addEventListener('activate', (e) => {
      e.waitUntil(
        caches.keys().then(keys =>
          Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        )
      );
      self.clients.claim();
    });

    self.addEventListener('fetch', (e) => {
      if (e.request.method !== 'GET') return;
      e.respondWith(
        fetch(e.request)
          .then(res => {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
            return res;
          })
          .catch(() => caches.match(e.request).then(r => r || caches.match('/offline.html')))
      );
    });
  
```
