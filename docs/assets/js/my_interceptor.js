(function Interceptor(nativeOpenWrapper, nativeSendWrapper) {
    XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
        nativeOpenWrapper.call(this, method, replaceUrls(url), async, user, password);
    };
})(XMLHttpRequest.prototype.open, XMLHttpRequest.prototype.send);

function replaceUrls(url) {
    const suffixes = ['posts', 'authors', 'tags'];
    for (let i of suffixes) {
        url = replaceUrl(url, i);
    }
    return url;
}

function replaceUrl(url, suffix) {
    const index = url.indexOf('/ghost/api/content/' + suffix);
    if (index !== -1) {
        const i = url.indexOf('?');
        const new_url = url.substring(0, i) + '1.json';
        console.log("new url: " + new_url);
        return new_url;
    }
    return url;
}