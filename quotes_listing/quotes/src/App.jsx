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
            {quotes.map((quote, index)=>(
                <div key={index}>
                  <li>
                    <p>{quote.content}</p>
                    <p>{quote.author}</p>
                    </li>
                </div>
            ))}
 
       </div>
  );
}

export default App4;
