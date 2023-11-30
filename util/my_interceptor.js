const config = {
    "script_path": "/assets/js/my_interceptor.js",
    "script_id": "my_interceptor",
    "intercept": {
        "url": "/ghost/api/content/",
        "list": [{"old_suffix": "posts", "new_suffix": "posts.json"},
        {"old_suffix": "authors", "new_suffix": "authors.json"},
        {"old_suffix": "tags", "new_suffix": "tags.json"}]
    }
}

(function Interceptor(nativeOpenWrapper, nativeSendWrapper) {
    renew_script();
    XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
        nativeOpenWrapper.call(this, method, replace_urls(url), async, user, password);
    };
})(XMLHttpRequest.prototype.open, XMLHttpRequest.prototype.send);


function renew_script() {
    document.getElementById(config['script_id']).src = config['script_path'] + '?v=' + Date.now();
}

function replace_urls(url) {
    const c = config['intercept'];
    const suffixes = c['list'];
    for (let i of suffixes) {
        const path = c['url'] + i['old_suffix'];
        const new_path = c['url'] + i['new_suffix'];
        if (url.indexOf(path) != -1) {
            return replace_url(url, path, new_path);
        }
    }
    return url;
}

function replace_url(url, path, new_path) {
    const i = url.indexOf(path);
    const new_url = url.substring(0, i) + new_path;
    return new_url;
}