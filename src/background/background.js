chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if(changeInfo.url && changeInfo.url.match(/https:\/\/www\.youtube\.com\/watch\?/)){
    chrome.tabs.sendMessage(tabId, {
      message: "urlChanged",
      url: changeInfo.url,
    });
  }
});
