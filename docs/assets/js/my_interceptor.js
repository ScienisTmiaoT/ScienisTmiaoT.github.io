(function Interceptor(nativeOpenWrapper, nativeSendWrapper) {
    XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
        nativeOpenWrapper.call(this, method, replaceUrl(url), async, user, password);
    };
})(XMLHttpRequest.prototype.open, XMLHttpRequest.prototype.send);

function replaceUrl(url) {
    const index = url.indexOf('/ghost/api/content/posts');
    if (index !== -1) {
        const i = url.indexOf('?');
        const new_url = url.substring(0, i) + '1.json';
        console.log("new url: " + new_url);
        return new_url;
    }
    return url;
}