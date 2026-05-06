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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
            <h1 style={{ marginBottom: "10px" }}>Cats Info</h1>
            <p style={{ color: "#a3a3a3", marginBottom: "20px" }}>{status}</p>
            {cat && (
            <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                gap: "15px", 
                border: "1px solid #404040", 
                borderRadius: "12px", 
                padding: "30px", 
                backgroundColor: "#171717",
                maxWidth: "400px",
                textAlign: "center"
            }}>
                <img 
                    src={cat.image} 
                    alt={`cat image`} 
                    style={{ 
                        width: "100%", 
                        height: "auto", 
                        borderRadius: "8px", 
                        objectFit: "cover",
                        maxHeight: "250px" 
                    }}
                />
                <h2 style={{ margin: 0, fontSize: "22px", color: "#ededed" }}>{cat.name}</h2>
                <p style={{ margin: 0, fontSize: "15px", color: "#a3a3a3", lineHeight: "1.5" }}>
                    {cat.description}
                </p>
                <p style={{ margin: 0, fontSize: "14px", fontWeight: "bold", color: "#ededed" }}>
                    🐾 Life span: {cat.life_span}
                </p>
                <button 
                    onClick={fetchCats}
                    style={{
                        marginTop: "10px",
                        padding: "10px 20px",
                        backgroundColor: "#ededed",
                        color: "#0a0a0a",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "600",
                        cursor: "pointer",
                        width: "100%"
                    }}
                >
                    Get New Cat
                </button>
            </div>
            )}
        </div>
    )
}

export default App6;
