chrome.runtime.sendMessage({ todo: "showPageAction" });
chrome.runtime.sendMessage({ muteTab: false })

var observer = new MutationObserver(function (mutations) {
    if(mutations[0].target.innerText.indexOf('Advertisement') !== -1)
        chrome.runtime.sendMessage({ muteTab: 'yes' });
    else
        chrome.runtime.sendMessage({ muteTab: 'no' });
    // mutations.forEach(function (mutation) {
    //     console.log("This line 6");
    //     if (mutation.attributeName === "data-testid") {
    //         var attributeValue = mutation.target.dataset.testid;
    //         if (!attributeValue) return;
    //         if (attributeValue == 'now-playing-bar-ad-type-ad') {
    //             chrome.runtime.sendMessage({ muteTab: 'yes' });
    //         } else chrome.runtime.sendMessage({ muteTab: 'no' });
    //     }
    // });
});

function isNodeAvailable() {
    console.log('isNodeAvailable');

    var target = document.querySelector('title');
    if(!target) {
        window.setTimeout(isNodeAvailable, 500);
        return;
    }

    observer.observe(target, {
        subtree: true, characterData: true, childList: true 
    });

}

isNodeAvailable();