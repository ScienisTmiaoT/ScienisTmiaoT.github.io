(function Interceptor(nativeOpenWrapper, nativeSendWrapper) {
    XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
        nativeOpenWrapper.call(this, method, replaceUrls(url), async, user, password);
    };
})(XMLHttpRequest.prototype.open, XMLHttpRequest.prototype.send);

function replaceUrls(url) {
    console.log("intercepted url: " + url);
    const suffixes = ['posts', 'authors', 'tags'];
    for (let i of suffixes) {
        const path = '/ghost/api/content/' + i;
        if (url.indexOf(path) != -1) {
            return replaceUrl(url);
        }
    }
    return url;
}

function replaceUrl(url) {
    const i = url.indexOf('?');
    const new_url = url.substring(0, i) + '1.json';
    console.log("new url: " + new_url);
    return new_url;
    return url;
}