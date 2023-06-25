document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".saveButton").addEventListener("click", () => {
    const apiKey = document.querySelector(".api_input").value;
    chrome.storage.sync.set({apiKey: apiKey});
  });

  document.querySelector(".deleteButton").addEventListener("click", () => {
    chrome.storage.sync.remove("apiKey");
  });
});