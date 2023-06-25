import "./App.css";
import React from 'react';
import {createRoot} from 'react-dom/client';
import ContentScript from './contentScript';

function init(parentContainer){
  const appContainer = document.createElement("div");
  appContainer.className = "arellak-app-container";

  setTimeout(() => {
    const targetNode = document.querySelector(parentContainer);
    targetNode?.insertBefore(appContainer, targetNode?.firstChild);
    const root = createRoot(appContainer);
    root.render(<ContentScript />);
  }, 2000);
}

function removeOldApp(){
  const oldAppContainer = document.querySelector(".arellak-app-container");
  if(oldAppContainer){
    oldAppContainer.remove();
  }
}

const observeUrlChange = () => {
  let oldHref = document.location.href;
  const body = document.querySelector("body");
  const observer = new MutationObserver(() => {
    if (oldHref !== document.location.href && document.location.href.match(/https:\/\/www\.youtube\.com\/watch\?/)) {
      oldHref = document.location.href;
      changeParent();
    }
  });
  observer.observe(body, { childList: true, subtree: true });
};

function changeParent(){
  removeOldApp();
  if(window.innerWidth < 1000){
    init("#related");
  }
  else{
    init("#secondary");
  }
}

window.onload = observeUrlChange;

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
