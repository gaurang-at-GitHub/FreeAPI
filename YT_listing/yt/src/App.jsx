import { useEffect, useState } from 'react';

function App2(){
       const [videos, setVideos] = useState([])
       const [status, setStatus] = useState("Loading...")
       
       useEffect(()=>{
        async function fetchVideos() {
            const response = await fetch("https://api.freeapi.app/api/v1/public/youtube/videos")
            const data = await response.json()
            if(response.ok && data.data && data.data.data){
                setVideos(data.data.data)
                setStatus("")
            }else{
                setStatus("Could not load the list")
            }
        }
        fetchVideos()
       }, [])

    return(
        <div>
            <h1>Videos List</h1>
            <p>{status}</p>
            <br></br>
            <hr></hr>
            <div style={{ display: "grid", gap: "20px",  gridTemplateColumns: "repeat(3, 1fr)"}}>
            {videos.map((video, index)=>(
                <div key={index} style={{ border: "1px solid", borderRadius: "10px", padding: "15px", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)"}}>
                  <br></br>
                  <img src={video.items.snippet.thumbnails.high.url} alt={`thumbnail`} width='100%'/>
                 <h2>{video.items.snippet.title}</h2>
                  <p>{video.items.snippet.channelTitle}</p>
                  <p>View count : {video.items.statistics.viewCount}</p>
                <br></br>
                <br></br>
                  </div>
            ))}
        </div>
        </div>

    )
}

export default App2;
