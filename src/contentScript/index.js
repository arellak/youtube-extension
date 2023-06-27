import "./App.css";
import React from 'react';
import {createRoot} from 'react-dom/client';
import ContentScript from './contentScript';

function init(parentContainer){
  const appContainer = document.createElement("div");
  appContainer.className = "arellak-app-container";


  const observer = new MutationObserver((mutationList, observer) => {
    const contentScript = document.querySelector(".arellak-app");
    const targetNode = document.querySelector(parentContainer);
    if(targetNode && !contentScript){
      targetNode?.insertBefore(appContainer, targetNode?.firstChild);
      const root = createRoot(appContainer);
      root.render(<ContentScript />);
      observer.disconnect();
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.message === "urlChanged"){
    changeParent();
  }
});

function changeParent(){
  removeOldApp();
  if(window.innerWidth < 1000){
    init("#related");
  }
  else{
    init("#secondary");
  }
}

window.onresize = () => {
  changeParent();
};

setInterval(() => {
  const container = document.querySelectorAll(".arellak-app-container");
  if(container.length > 1){
    for(let i = 1; i < container.length; i++){
      container[i].remove();
    }
  }
}, 10);

changeParent();
