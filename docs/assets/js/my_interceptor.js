const config={t:"/assets/js/my_interceptor.js",i:"my_interceptor",intercept:{url:"/ghost/api/content/",list:[{o:"posts",u:"posts.json"},{o:"authors",u:"authors.json"},{o:"tags",u:"tags.json"}],l:["/api/"]}};function renew_script(){document.getElementById(config.i).src=config.t+"?v="+Date.now()}function replace_urls(t){var s,e=config.intercept;for(s of e.list){var i=e.url+s.o,r=e.url+s.u;if(-1!=t.indexOf(i))return replace_url(t,i,r)}return is_blacklisted(t)?"":t}function replace_url(t,s,e){s=t.indexOf(s);return t.substring(0,s)+e}function is_blacklisted(t){for(var s of config.intercept.l)if(-1!=t.indexOf(path))return!0;return!1}!function(o){renew_script(),XMLHttpRequest.prototype.open=function(t,s,e,i,r){var n=replace_urls(s);n?o.call(this,t,n,e,i,r):console.log("this url is blacklisted: "+s)}}(XMLHttpRequest.prototype.open,XMLHttpRequest.prototype.send);