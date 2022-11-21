const staticBlog = "static-blog-v1-by-ashish-agarwal-and-steve-smith";
const assets = [
  "/",
  "/index.html",
  "/post.html",
  "/db.json",
  "/assets/application.js",
  "/assets/detail.js",
  "/assets/reset.css",
  "/assets/script.js",
  "/assets/style.css"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})