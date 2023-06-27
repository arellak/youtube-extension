// eslint-disable-next-line no-unused-vars
import React from "react";

export default function Content(props){
  function formatNumber(num){
    if(num === undefined){
      return  "0";
    }
    return num.toLocaleString("en-US");
  }

  return (
    <>
      <div className="arellak-app">
        <img className="channel_avatar" src={ props.videoData?.author?.avatar[1]?.url } alt="No avatar" width={ props.videoData?.author?.avatar[1]?.width } height={ props.videoData?.author?.avatar[1]?.height }></img>
        <p className="channel_name"><a className="channel_link" href={ "https://youtube.com" + props.channelData?.canonicalBaseUrl }>{ props.channelData?.title }</a></p>
        <p className="channel_joined">{ props.channelData?.joinedDateText }</p>
        <p className="channel_description">{ props.channelData?.description }</p>
        <label>Subscriber count:</label>
        <p className="channel_subs">{ formatNumber(props.channelData?.stats?.subscribers) }</p>
        <label>View count:</label>
        <p className="channel_views">{ formatNumber(props.channelData?.stats?.views) }</p>
        <label>Badges:</label>
        <ul className="channel_badges">{ props.channelData?.badges.length > 0 && props.channelData?.badges.map((badge) => <li className="channel_badge_item">{ badge?.text }</li>) }</ul>
        <label>Links:</label>
        <ul className="channel_links">{ props.channelData?.links.length > 0 && props.channelData?.links.map((link) => <li className="channel_link_item"><a className="channel_link" href={link?.targetUrl}>{ link?.title }</a></li>) } </ul>
        <label>Keywords:</label>
        <ul className="channel_keywords">{ props.channelData?.keywords.length > 0 && props.channelData?.keywords.map((keyword) => <li className="channel_keyword_item"><a className="channel_keyword_link" href={"https://www.youtube.com/results?search_query=" + keyword.replaceAll(" ", "+")}>{ keyword }</a></li>) }</ul>
      </div>
    </>
  );
}
