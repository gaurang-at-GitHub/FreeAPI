import { useEffect, useState } from 'react';
import './App.css';

function App5() {
  const [jokes, setJokes] = useState([]);
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    async function fetchJokes() {
      try {
        const response = await fetch("https://api.freeapi.app/api/v1/public/randomjokes");
        const data = await response.json();
        
        if (response.ok && data.data && data.data.data) {
          setJokes(data.data.data);
          setStatus(""); 
        } else {
          setStatus("Failed to load jokes.");
        }
      } catch (error) {
        setStatus("Error fetching jokes.");
      }
    }
    
    fetchJokes();
  }, []);

  // Extremely minimal return block!
  return (
    <div className="app-container">
      <h1>Random Jokes</h1>
      
      {status && <p className="status-text">{status}</p>}
      
      {jokes.map((joke) => (
        <div key={joke.id} className="joke-card">
          <p>{joke.content}</p>
        </div>
      ))}
    </div>
  );
}

export default App5;
