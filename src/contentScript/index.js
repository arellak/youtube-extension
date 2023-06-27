import "./App.css";
// eslint-disable-next-line no-unused-vars
import React from "react";
import {createRoot} from "react-dom/client";
// eslint-disable-next-line no-unused-vars
import ContentScript from "./contentScript";

function init(parentContainer){
  const appContainer = document.createElement("div");
  appContainer.className = "arellak-app-container";

  const observer = new MutationObserver((mutationList, obs) => {
    const contentScript = document.querySelector(".arellak-app");
    const targetNode = document.querySelector(parentContainer);
    if(targetNode && !contentScript){
      targetNode?.insertBefore(appContainer, targetNode?.firstChild);
      const root = createRoot(appContainer);
      root.render(<ContentScript />);
      obs.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function removeOldApp(){
  const oldAppContainer = document.querySelector(".arellak-app-container");
  if(oldAppContainer){
    oldAppContainer.remove();
  }
}

function changeParent(){
  removeOldApp();
  if(window.innerWidth < 1000){
    init("#related");
  }
  else{
    init("#secondary");
  }
}

chrome.runtime.onMessage.addListener((request) => {
  if(request.message === "urlChanged"){
    changeParent();
  }
});

let resizeTimeout;
window.onresize = () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(changeParent, 200);
};

changeParent();
