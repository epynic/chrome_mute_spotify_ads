chrome.runtime.sendMessage({ todo: "showPageAction" });
chrome.runtime.sendMessage({ muteTab: false });

var observer = new MutationObserver(function nZ(mutations) {
  if (mutations[0].target.innerText.indexOf("Advertisement") !== -1) {
    chrome.runtime.sendMessage({ muteTab: "yes" });
  } else {
    chrome.runtime.sendMessage({ muteTab: "no" });
  }
});

function isNodeAvailable() {
  console.log("isNodeAvailable");

  var target = document.querySelector("title");
  if (!target) {
    window.setTimeout(isNodeAvailable, 500);
    return;
  }

  observer.observe(target, {
    subtree: true,
    characterData: true,
    childList: true,
  });
}

isNodeAvailable();
