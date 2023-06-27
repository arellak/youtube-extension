import React from "react";

export default function Popup(){
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".saveButton")?.addEventListener("click", () => {
      const apiKey = document.querySelector(".api_input")?.value;
      chrome.storage.sync.set({apiKey: apiKey});
    });
  
    document.querySelector(".deleteButton")?.addEventListener("click", () => {
      chrome.storage.sync.remove("apiKey");
    });
  });

  return (
    <>
      <div className="api-container">
        <h2 className="apiText">RapidAPI Key</h2>
        <div className="input-wrapper">
          <input className="api_input" type="password" placeholder="API Key" />
          <span className="underline"></span>
        </div>
        
        <div className="apiButtons">
          <button className="saveButton">Save</button>
          <button className="deleteButton">Delete</button>
        </div>
      </div>
    </>
  );
}