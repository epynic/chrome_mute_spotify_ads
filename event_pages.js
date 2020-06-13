var tabId = 0;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.todo == "showPageAction") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            tabId = tabs[0].id;
            chrome.pageAction.show(tabs[0].id);
        });
    }

    if (tabId && request.muteTab) {
        if (request.muteTab == 'yes')
            chrome.tabs.update(tabId, { muted: true });
        else
            chrome.tabs.update(tabId, { muted: false });
    }
});