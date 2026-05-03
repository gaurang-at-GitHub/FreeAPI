import { useEffect, useState } from 'react';
import './App.css';

function App8() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("https://api.freeapi.app/api/v1/public/randomusers");
        const data = await response.json();
        
        if (response.ok && data.data && data.data.data) {
          setUsers(data.data.data);
          setStatus(""); 
        } else {
          setStatus("Failed to load users.");
        }
      } catch (error) {
        setStatus("Error fetching users.");
      }
    }
    
    fetchUsers();
  }, []);

  return (
    <div className="app-container">
      <h1>Random Users</h1>
      
      {status && <p className="status-text">{status}</p>}
      
      {users.map((user) => (
        <div key={user.login.uuid || user.id} className="user-card">
          <img src={user.picture.large} alt={user.name.first} width="100" />
          <h3>{user.name.title} {user.name.first} {user.name.last}</h3>
          <p>{user.email}</p>
          <p>{user.location.city}, {user.location.country}</p>
        </div>
      ))}
    </div>
  );
}

export default App8;
