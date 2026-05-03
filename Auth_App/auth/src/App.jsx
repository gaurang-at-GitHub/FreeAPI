import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [user, setUser] = useState(null); 
  const [status, setStatus] = useState('Please login or register');

  async function register() {
    setStatus("Registering...");
    try {
      const response = await fetch("https://api.freeapi.app/api/v1/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role: "ADMIN" })
      });
      const data = await response.json();
      
      if (response.ok) {
        setStatus("Registration success! You can now click Login.");
      } else {
        setStatus("Error: " + (data.message || "Registration failed"));
      }
    } catch (error) {
      setStatus("Register request failed");
    }
  }

  async function login() {
    setStatus("Logging in...");
    try {
      const response = await fetch("https://api.freeapi.app/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      if (response.ok) {
        setUser(data.data.user); 
        setStatus("Login success!");
      } else {
        setStatus("Error: " + (data.message || "Login failed"));
      }
    } catch (error) {
      setStatus("Login request failed");
    }
  }

  
  async function logout() {
    setStatus("Logging out...");
    try {
      await fetch("https://api.freeapi.app/api/v1/users/logout", {
        method: "POST",
        credentials: "include" 
      });
      setUser(null); 
      setStatus("Logged out successfully.");
    } catch (error) {
      setStatus("Logout failed");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Auth Project</h1>
      <p style={{ color: "blue" }}><strong>Status:</strong> {status}</p>

      {user ? (
        <div>
          <h2>Profile Details</h2>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "300px", gap: "10px" }}>
          <input 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            placeholder="Email (only needed for register)" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button onClick={login}>Login</button>
            <button onClick={register}>Register</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
