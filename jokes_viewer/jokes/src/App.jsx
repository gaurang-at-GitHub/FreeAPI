import { useEffect, useState } from 'react';
import './App.css';

function App5(){
      const [jokes, setJokes] = useState([])
      const [status, setStatus] = useState("Loading...")
      const [theme, setTheme] = useState('dark');
      
      useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
      }, [theme]);

      const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
      };
      
      useEffect(()=>{
         async function fetchJokes(){
            const response = await fetch("https://api.freeapi.app/api/v1/public/randomjokes")
            const data = await response.json()
            if(response.ok && data.data && data.data.data){
                setJokes(data.data.data)
                setStatus("")
            }else{
                setStatus("Could not fetch Jokes")
            }
         }
         fetchJokes()
      }, [])

    return (
       <div className="container">
         <button className="theme-toggle" onClick={toggleTheme}>
           {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
         </button>

         <header className="header">
           <h1>Jokes</h1>
           <p className="subtitle">Random humor from FreeAPI</p>
         </header>

         {status && <div className="status">{status}</div>}

         <div className="jokes-grid">
           {jokes.map((joke, index) => (
               <div key={index} className="joke-card">
                   <div className="joke-category">{joke.categories || "General"}</div>
                   <p className="joke-content">{joke.content}</p>
               </div>
           ))}
         </div>
       </div>
    )
}

export default App5;
