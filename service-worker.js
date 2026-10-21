
const CACHE_NAME = "lis-moi-quand-v2";

const FICHIERS = [
    "./",
    "./index.html",
    "./Muslim.css",
    "./Muslim.js",
    "./FhGEBsod.jpg",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FICHIERS);
        })
    );

    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((nomsCaches) => {
            return Promise.all(
                nomsCaches
                    .filter((nom) => nom.startsWith("lis-moi-quand-") && nom !== CACHE_NAME)
                    .map((nom) => caches.delete(nom))
            );
        })
    );

    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((reponseEnCache) => {
            return reponseEnCache || fetch(event.request);
        })
    );
});
