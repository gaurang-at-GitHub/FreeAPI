import { useEffect, useState } from 'react';

function App2() {
  const [videos, setVideos] = useState([]);
  const [status, setStatus] = useState("Loading videos...");

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch("https://api.freeapi.app/api/v1/public/youtube/videos");
        const data = await response.json();
        
        if (response.ok && data.data && data.data.data) {
          setVideos(data.data.data);
          setStatus(""); 
        } else {
          setStatus("Failed to load videos.");
        }
      } catch (error) {
        setStatus("An error occurred while fetching videos.");
      }
    }
    
    fetchVideos();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>YouTube Clone</h1>
      
      {status && <p style={{ color: "blue" }}>{status}</p>}
      
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
        gap: "20px",
        marginTop: "20px"
      }}>
        
        {videos.map((video, index) => {
          const details = video.items; 
          
          return (
            <div key={index} style={{ border: "1px solid #e0e0e0", borderRadius: "10px", overflow: "hidden" }}>
              
              <img 
                src={details.snippet.thumbnails.high.url} 
                alt={details.snippet.title} 
                style={{ width: "100%", height: "180px", objectFit: "cover" }} 
              />
              
              <div style={{ padding: "12px" }}>
                <h3 style={{ margin: "0 0 8px 0", fontSize: "16px" }}>
                  {details.snippet.title}
                </h3>
                <p style={{ margin: "0", color: "#606060", fontSize: "14px" }}>
                  {details.snippet.channelTitle}
                </p>
                <p style={{ margin: "4px 0 0 0", color: "#606060", fontSize: "12px" }}>
                  {details.statistics.viewCount} views
                </p>
              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}

export default App2;
