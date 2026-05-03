import { useEffect, useState } from 'react';
import './App.css';

function App6() {
  const [cat, setCat] = useState(null); 
  const [status, setStatus] = useState("Loading...");

  async function fetchCat() {
    setStatus("Loading...");
    try {
      const response = await fetch("https://api.freeapi.app/api/v1/public/cats/cat/random");
      const data = await response.json();
      
      if (response.ok && data.data) {
        setCat(data.data);
        setStatus(""); 
      } else {
        setStatus("Failed to load cat.");
      }
    } catch (error) {
      setStatus("Error fetching cat.");
    }
  }

  useEffect(() => {
    fetchCat();
  }, []);

  return (
    <div className="app-container">
      <h1>Random Cat Viewer</h1>
      
      <button onClick={fetchCat}>Get New Cat</button>
      
      {status && <p className="status-text">{status}</p>}
      
      {cat && (
        <div className="cat-card">
          <h2>{cat.name}</h2>
          <img src={cat.image} alt={cat.name} width="300" />
          <p>{cat.description}</p>
        </div>
      )}
    </div>
  );
}

export default App6;
