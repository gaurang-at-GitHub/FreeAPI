import { useEffect, useState } from 'react';

function App4() {
  const [quotes, setQuotes] = useState([]);
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const response = await fetch("https://api.freeapi.app/api/v1/public/quotes");
        const data = await response.json();
        
        if (response.ok && data.data && data.data.data) {
          setQuotes(data.data.data);
          setStatus(""); 
        } else {
          setStatus("Failed to load quotes.");
        }
      } catch (error) {
        setStatus("Error fetching quotes.");
      }
    }
    
    fetchQuotes();
  }, []);

  return (
       <div>
         <h1>Quotes</h1>
         <p>{status}</p>
         <br></br>
            {quotes.map((quote, index)=>(
                <div key={index} style={{ display: "flex", flexDirection:"column", gap:"20px", textAlign: "left", border:"1px solid", borderRadius:"8px", padding: "20px", marginBottom:"20px", backgroundColor: "#171717"}}>
                    <p style={{ margin: 0, fontSize: "16px" }}>{quote.content}</p>
                    <p style={{ margin: 0, color: "#a3a3a3", fontStyle: "italic" }}>-{quote.author}</p>
                    <br></br>
                </div>
            ))}
 
       </div>
  );
}

export default App4;
