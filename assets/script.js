if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("/serviceWorker.js");
  })
}

fixScale = function(doc) {    
    var addEvent = 'addEventListener',
      type = 'gesturestart',
      qsa = 'querySelectorAll',
      scales = [1, 1],
      meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

    function fix() {
          meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
          doc.removeEventListener(type, fix, true);
    }

    if ((meta = meta[meta.length - 1]) && addEvent in doc) {
        fix();
        scales = [.25, 1.6];
        doc[addEvent](type, fix, true);
    }
};
allowed = ["http:","https:","data:","isolated-app:","chrome-extension:","chrome:","chrome-untrusted:",""];
if(allowed.includes(window.location.protocol)){}else{alert("You are not at a HTTP or a HTTPS protocol. This website uses XMLHttp, which is only supported on HTTP and HTTPS and some more protocols.\n\nThis is just a warning. The blog post will fail to load everything.");}