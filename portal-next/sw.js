// JACARALL Team Hub — shows notifications and opens the hub when one is tapped.
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('notificationclick', function(e){
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(self.clients.matchAll({type:'window', includeUncontrolled:true}).then(function(list){
    for(var i = 0; i < list.length; i++){ if('focus' in list[i]) { list[i].postMessage({open: e.notification.data || {}}); return list[i].focus(); } }
    return self.clients.openWindow(url);
  }));
});
