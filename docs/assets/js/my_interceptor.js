xhook.before(function (request, response) {
    request.url = replaceUrl(request.url);
});


function replaceUrl(url) {
    const index = url.indexOf('/ghost/api/content/posts');
    if (index !== -1) {
        const i = url.indexOf('?');
        return url.substring(0, i) + '1.json';
    }
    return url;
}