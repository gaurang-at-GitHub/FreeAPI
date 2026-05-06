import { useEffect, useState } from 'react';
import './App.css';

function App6(){
     const [cat, setCat] = useState()
     const [status, setStatus] = useState("Loading...")
     
     async function fetchCats() {
        const response = await fetch("https://api.freeapi.app/api/v1/public/cats/cat/random")
        const data = await response.json()
        if(response.ok && data.data){
            setCat(data.data)
            setStatus("")
        }else{
            setStatus("Unable to load the data")
        }
     }
     useEffect(()=>{
        fetchCats()
     }, [])

    return(
        <div>
            <h1>Cats Info: </h1>
            <p>{status}</p>
            {cat && (
            <div>
            <img src={cat.image} alt={`cat image`} width={`200`}/>
            <p>Name: {cat.name}</p>
            <p>Description: {cat.description}</p>
            <p>Cat's Life span: {cat.life_span}</p>
            <button onClick={fetchCats}>Get New Cat</button>
            </div>
            )}
        </div>
    )
}

export default App6;
