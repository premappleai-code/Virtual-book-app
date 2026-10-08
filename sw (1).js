const C='kagajat-v7',F=['./','index.html','manifest.json','icon-192.png','icon-512.png','fonts/hind-devanagari-400-normal.woff2','fonts/hind-devanagari-600-normal.woff2','fonts/hind-devanagari-700-normal.woff2','fonts/hind-latin-400-normal.woff2','fonts/hind-latin-600-normal.woff2','fonts/hind-latin-700-normal.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>c.add(u).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const same=new URL(r.url).origin===location.origin;
  if(r.mode==='navigate'){e.respondWith(fetch(r).then(x=>{if(x.ok){const cp=x.clone();caches.open(C).then(c=>c.put('index.html',cp))}return x}).catch(()=>caches.match('index.html')));return}
  e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>{if(x.ok&&same){const cp=x.clone();caches.open(C).then(c=>c.put(r,cp))}return x})))});
