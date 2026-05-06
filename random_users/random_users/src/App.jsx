import { useEffect, useState } from 'react';
import './App.css';

function App8(){
    const [users, setUsers] = useState([])
    const [status, setStatus] = useState("Loading...")

    async function fetchUsers() {
        const response = await fetch("https://api.freeapi.app/api/v1/public/randomusers")
        const data = await response.json()
        if(response.ok && data.data && data.data.data){
            setUsers(data.data.data)
            setStatus("")
        }else{
            setStatus("Unable to load the Users")
        }
    }
    
    useEffect(()=>{
        fetchUsers()
    }, [])
    return(
        <div>
           <h1>Random Users : </h1>
           <p>{status}</p>
           <hr></hr>
           <div style={{ display:"grid", gap:"20px", gridTemplateColumns:"repeat(2, 1fr)"}}>
            {users.map((user, index)=>(
                <div key={index} style={{ border: "1px solid", borderRadius: "2px", padding:"15px", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)"}}>
                     <img src={user.picture.thumbnail} alt="user profile" style={{ borderRadius: "50%" }}/>
                     <span>{user.name.title}. </span>
                     <span>{user.name.first} </span>
                     <span>{user.name.last}</span>
                     <p>Email: {user.email}</p>
                     <p>City: {user.location.city}, </p>
                     <span>State: {user.location.state}, </span>
                     <br></br>
                     <span>Country: {user.location.country}</span>
                </div>
            ))}

           </div>
        </div>
    )
}

export default App8;
