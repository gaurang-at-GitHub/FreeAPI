import { useEffect, useState } from 'react';
import './App.css';

function App5(){
      const [jokes, setJokes] = useState([])
      const [status, setStatus] = useState("Loading...")
      
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
       <div>
        <h1>Jokes</h1>
        <p>{status}</p>
        {jokes.map((joke, index)=>(
            <div key={index}>
                <h3>{joke.categories}</h3>
                <p>{joke.content}</p>
            </div>
        ))}
        </div>
    )
}



export default App5;
