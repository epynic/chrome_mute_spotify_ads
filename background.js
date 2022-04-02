let tabId = 0;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.todo == "showPageAction") {
    tabId = sender.tab.id;
  }

  if (tabId && request.muteTab) {
    console.log("Mute?: ", request.muteTab);
    console.log("TabID: ", tabId);

    if (request.muteTab == "yes") chrome.tabs.update(tabId, { muted: true });
    else chrome.tabs.update(tabId, { muted: false });
  }
});
