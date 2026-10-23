// ═══════════════════════════════════════════════════════════════════
// SYLLABUS 3D — AUTO-UPDATING OFFLINE-READY SERVICE WORKER (PWA)
// ═══════════════════════════════════════════════════════════════════

const VERSION = 'v3.0.1';
const CACHE_NAME = `syllabus-3d-${VERSION}`;
const DYNAMIC_CACHE = `syllabus-3d-dynamic-${VERSION}`;

// Pre-cache essential shell assets for instant boot even completely offline
const PRECACHE_ASSETS = [
  '/',
  'index.html',
  'manifest.json',
  'favicon.png',
  'logo.png',
  'auth-crest.jpg',
  'dashboard_icon_3d.png',
  'pwa-192x192.png',
  'pwa-512x512.png',
  'apple-touch-icon.png',
  'focus-desk-day.jpg',
  'focus-desk-night.png',
  'study-tools-ga/ga-notes.min.css',
  'study-tools-ga/polity/making_of_indian_constitution.html',
  'study-tools-ga/polity/salient_features_of_constitution.html',
  'study-tools-ga/polity/preamble.html',
  'study-tools-ga/polity/part1_part2_union_citizenship.html',
  'study-tools-ga/polity/fundamental_rights.html',
  'study-tools-ga/polity/dpsp.html',
  'study-tools-ga/polity/president_and_vice_president.html',
  'study-tools-ga/polity/parliament_part_1.html',
  'study-tools-ga/polity/parliament_part_2.html',
  'ssc-vocab/theme-sync.css',
  'ssc-vocab/theme-sync.js',
  'ssc-vocab/vocabulary_mastery_457.html',
  'ssc-vocab/phrasal_verbs_mastery.html',
  'ssc-vocab/idioms_mastery_notes.html',
  'ssc-vocab/root_words_mastery_notes.html',
  'ssc-vocab/commonly_confused_words_mastery.html',
  'ssc-vocab/practice_zone_mastery.html',
  'ssc-vocab/fixed_prepositions_mastery.html'
];

// 1. INSTALL EVENT: Pre-cache static assets and skip waiting immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Pre-cache partial warning:', err);
      });
    })
  );
});

// 2. ACTIVATE EVENT: Clear ALL previous cache versions immediately and claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME && name !== DYNAMIC_CACHE) {
            console.log('[SW] Deleting stale cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. MESSAGE EVENT: Support instant skip-waiting from main thread
self.addEventListener('message', (event) => {
  if (event.data && (event.data.type === 'SKIP_WAITING' || event.data === 'skipWaiting')) {
    self.skipWaiting();
  }
});

// 4. FETCH EVENT: Always fetch fresh HTML (No stale app on deploy)
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only intercept GET requests
  if (request.method !== 'GET' || !request.url.startsWith('http')) return;

  const url = new URL(request.url);

  // Strategy A: Navigation requests (HTML pages) → Fast Network-First with 1.2s timeout to cached app shell
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      new Promise((resolve) => {
        let timedOut = false;
        const timer = setTimeout(() => {
          timedOut = true;
          caches.match(request).then((cached) => {
            if (cached) {
              resolve(cached);
            }
          });
        }, 1200);

        fetch(new Request(request.url, {
          method: 'GET',
          headers: request.headers,
          cache: 'no-cache', // Bypass browser disk cache for HTML
          mode: 'cors',
          credentials: request.credentials,
          redirect: 'follow'
        }))
          .then((networkResponse) => {
            clearTimeout(timer);
            if (networkResponse && networkResponse.status === 200) {
              const copy = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            }
            if (!timedOut) {
              resolve(networkResponse);
            }
          })
          .catch(() => {
            clearTimeout(timer);
            caches.match(request).then((cached) => {
              resolve(cached || caches.match('/index.html'));
            });
          });
      })
    );
    return;
  }

  // Strategy B: Hashed Vite static assets (/assets/*) → Cache First (content hash guarantees freshness)
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, copy));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Strategy D: GA Master Notes & Assets (/study-tools-ga/*) → Instant Cache-First with Background Revalidation
  if (url.pathname.includes('/study-tools-ga/')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, copy));
          }
          return networkResponse;
        }).catch(() => null);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Strategy E: SSC Special Vocab Modules (/ssc-vocab/*) → Instant Cache-First with Background Revalidation
  if (url.pathname.includes('/ssc-vocab/')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, copy));
          }
          return networkResponse;
        }).catch(() => null);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Strategy C: Other requests (images, fonts, APIs) → Network First with Cache Fallback
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const copy = networkResponse.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, copy));
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(request).then((cached) => {
          if (cached) return cached;
          if (request.destination === 'image') {
            return new Response('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', {
              headers: { 'Content-Type': 'image/png' }
            });
          }
          return new Response('Offline content unavailable', { status: 503, statusText: 'Offline' });
        });
      })
  );
});
