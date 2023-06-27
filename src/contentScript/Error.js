import React from "react";

export default function Error(props){
  return(
    <>
      <div className="arellak-app">
        <p className="extension_error_message">{props.message}</p>
      </div>
    </>
  );
}