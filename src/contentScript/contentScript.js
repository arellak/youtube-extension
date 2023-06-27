import React, {useEffect} from "react";
import "./App.css";

export default function ContentScript() {
  const [videoData, setVideoData] = React.useState({});
  const [channelData, setChannelData] = React.useState({});
  const [apiKey, setApiKey] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  function formatNumber(num){
    return num.toLocaleString("en-US");
  }

  useEffect(() => {
    const fetchData = async () => {
      const videoId = window.location.href.match(/(?<==).+/)?.[0];
      const videoUrl = "https://youtube138.p.rapidapi.com/video/details/?id=" + videoId + "&hl=en&gl=US";

      try {
        chrome.storage.sync.get("apiKey", async (result) => {
          const videoOptions = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': result.apiKey,
              'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
            }
          };

          const videoResponse = await fetch(videoUrl, videoOptions);
          const vData = await videoResponse.json();
          setVideoData(vData);

          const channelId = await vData?.author?.channelId;
          const channelUrl = "https://youtube138.p.rapidapi.com/channel/details/?id=" + channelId + "&hl=en&gl=US";
          
          const channelOptions = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': result.apiKey,
              'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
            }
          };

          const channelResponse = await fetch(channelUrl, channelOptions);
          const cData = await channelResponse.json();
          setChannelData(cData);
          setApiKey(result.apiKey);
          setLoading(false);
        });
      }
      catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      setVideoData({});
      setChannelData({});
    };
  }, [window.location.href]);

  if(loading && (apiKey === undefined || apiKey === "")){
    return (
      <div className="arellak-app">
        <span className="back">
          <span>L</span>
          <span>o</span>
          <span>a</span>
          <span>d</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
        </span>
      </div>
    );
  }

  if(apiKey !== undefined && apiKey !== "" && !loading){
    if(Object.keys(videoData).length > 0 && Object.keys(channelData).length > 0){
      return (
        <>
          <div className="arellak-app">
            <img className="channel_avatar" src={ videoData?.author?.avatar[1]?.url } alt="No avatar" width={ videoData?.author?.avatar[1]?.width } height={ videoData?.author?.avatar[1]?.height }></img>
            <p className="channel_name"><a className="channel_link" href={ "https://youtube.com" + channelData?.canonicalBaseUrl }>{ channelData?.title }</a></p>
            <p className="channel_joined">{ channelData?.joinedDateText }</p>
            <p className="channel_description">{ channelData?.description }</p>
            <label>Subscriber count:</label>
            <p className="channel_subs">{ formatNumber(channelData?.stats?.subscribers) }</p>
            <label>View count:</label>
            <p className="channel_views">{ formatNumber(channelData?.stats?.views) }</p>
            <label>Badges:</label>
            <ul className="channel_badges">{ channelData?.badges.length > 0 && channelData?.badges.map((badge) => <li className="channel_badge_item">{ badge?.text }</li>) }</ul>
            <label>Links:</label>
            <ul className="channel_links">{ channelData?.links.length > 0 && channelData?.links.map((link) => <li className="channel_link_item"><a className="channel_link" href={link?.targetUrl}>{ link?.title }</a></li>) } </ul>
            <label>Keywords:</label>
            <ul className="channel_keywords">{ channelData?.keywords.length > 0 && channelData?.keywords.map((keyword) => <li className="channel_keyword_item">{ keyword }</li>) }</ul>
          </div>
        </>
      );
    }
  }
  else{
    return(
      <>
        <div className="arellak-app">
          <p className="channel_name">Please enter your RapidAPI key in the extension options</p>
        </div>
      </>
    );
  }
}
