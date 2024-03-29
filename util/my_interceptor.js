const config = {
    "script_path": "/assets/js/my_interceptor.js",
    "script_id": "my_interceptor",
    "intercept": {
        "url": "/ghost/api/content/",
        "list": [{
                "old_suffix": "posts",
                "new_suffix": "posts.json"
            },
            {
                "old_suffix": "authors",
                "new_suffix": "authors.json"
            },
            {
                "old_suffix": "tags",
                "new_suffix": "tags.json"
            }
        ],
        "blacklist": ["/api/"]
    }
};

(function Interceptor(nativeOpenWrapper, nativeSendWrapper) {
    renew_script();
    XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
        const new_url = replace_urls(url)
        if (new_url !== undefined) {
            nativeOpenWrapper.call(this, method, new_url, async, user, password);
        } else {
            console.log("this url is blacklisted: " + url);
        }
    };
})(XMLHttpRequest.prototype.open, XMLHttpRequest.prototype.send);

(function localFetch() {
    var originalFetch = window.fetch;
    window.fetch = function (url, options) {
        const new_url = replace_urls(url)
        if (new_url !== undefined) {
            return originalFetch(new_url, options);
        } else {
            console.log("this url is blacklisted: " + url);
            return new Promise((resolve) => {
                const fakeResponse = createFakeResponse();
                resolve(fakeResponse);
            });
            // return originalFetch(url, options).then(response => {
            //     return modifyResponse(response);
            //   });
        }
    };
})();

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
    return is_blacklisted(url) ? undefined : url;
}

function replace_url(url, path, new_path) {
    const i = url.indexOf(path);
    const new_url = url.substring(0, i) + new_path;
    return new_url;
}

function is_blacklisted(url) {
    for (let i of config['intercept']['blacklist']) {
        if (url.indexOf(i) != -1) {
            return true;
        }
    }
    return false;
}

function modifyResponse(response) {
    const modifiedBody = JSON.stringify({});
    const modifiedHeaders = new Headers(response.headers);
    const modifiedStatus = 200;
    return new Response(modifiedBody, {
        status: modifiedStatus,
        headers: modifiedHeaders,
    });
}

function createFakeResponse() {
    const fakeBody = JSON.stringify({});
    const fakeHeaders = new Headers({
        'Content-Type': 'application/json',
    });
    const fakeResponse = new Response(fakeBody, {
        status: 200,
        headers: fakeHeaders,
    });
    return fakeResponse;
}