chrome.runtime.sendMessage({ todo: "showPageAction" });

var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.attributeName === "data-testid") {
            var attributeValue = $(mutation.target).attr(mutation.attributeName);
            if (attributeValue == 'now-playing-bar-ad-type-ad')
                chrome.runtime.sendMessage({ muteTab: true });
            else
                chrome.runtime.sendMessage({ muteTab: false });
        }
    });
});

function isNodeAvailable() {
    var playFooter = document.querySelectorAll(".now-playing-bar-container")[0];
    if (!playFooter) {
        window.setTimeout(isNodeAvailable, 500);
        return;
    }

    console.log('Loaded - SpotifyAds Muted');
    observer.observe(playFooter, {
        attributes: true
    });
}
isNodeAvailable();