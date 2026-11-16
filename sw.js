// Guarda la app para que abra sin internet. Cambia VERSION al subir cambios.
var VERSION='finanzas-v2';
var CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(VERSION).then(function(c){return c.addAll(CORE);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==VERSION;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(caches.open(VERSION).then(function(c){
    return c.match(e.request).then(function(hit){
      var net=fetch(e.request).then(function(r){if(r&&(r.ok||r.type==='opaque'))c.put(e.request,r.clone());return r;}).catch(function(){return hit;});
      return hit||net;
    });
  }));
});
