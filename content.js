chrome.runtime.sendMessage({ todo: "showPageAction" });
chrome.runtime.sendMessage({ muteTab: false })

var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.attributeName === "data-testid") {
            var attributeValue = mutation.target.dataset.testid;
            if (!attributeValue) return;
            if (attributeValue == 'now-playing-bar-ad-type-ad') {
                chrome.runtime.sendMessage({ muteTab: 'yes' });
            } else chrome.runtime.sendMessage({ muteTab: 'no' });
        }
    });
});

function isNodeAvailable() {
    var playFooter = document.querySelectorAll(".now-playing-bar-container")[0];
    if (!playFooter) {
        window.setTimeout(isNodeAvailable, 500);
        return;
    }

    observer.observe(playFooter, {
        attributes: true
    });
}

isNodeAvailable();