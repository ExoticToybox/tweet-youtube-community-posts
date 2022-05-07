chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    /https:\/\/.*\.youtube\.com\/c\/.*\/community/.test(tab.url)
  ) {
    chrome.tabs.sendMessage(tabId, {});
  }
});
