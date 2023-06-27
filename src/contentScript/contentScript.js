import React, {useEffect} from "react";
import Content from "./Content";
import Loading from "./Loading";
import Error from "./Error";
import "./App.css";

export default function ContentScript() {
  const [videoData, setVideoData] = React.useState({});
  const [channelData, setChannelData] = React.useState({});
  const [apiKey, setApiKey] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const videoId = window.location.href.match(/(?<==).+/)?.[0];
      const videoUrl = "https://youtube138.p.rapidapi.com/video/details/?id=" + videoId + "&hl=en&gl=US";

      try {
        chrome.storage.sync.get("apiKey", async (result) => {
          if(result.apiKey && result.apiKey !== ""){
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
          }
          setApiKey(result.apiKey);
          setLoading(false);
        });
      }
      catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [window.location.href]);

  if(loading && (apiKey === undefined || apiKey === "")){
    return (
      <>
        <Loading />
      </>
    );
  }

  if(apiKey !== undefined && apiKey !== "" && !loading){
    if(Object.keys(videoData).length > 0 && Object.keys(channelData).length > 0){
      return (
        <>
          <Content videoData={videoData} channelData={channelData} />
        </>
      );
    }
    else {
      return (
        <>
          <Error message="Something went wrong retrieving the data..." />
        </>
      );
    }
  }
  else{
    return(
      <>
        <Error message="Please enter your RapidAPI key in the extension options" />
      </>
    );
  }
}
