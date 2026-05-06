import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [user, setUser] = useState(null); 
  const [status, setStatus] = useState('Please login or register');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

    useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setStatus("Welcome back! You are logged in.");
    }
  }, []);

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
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", data.data.accessToken);
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
      const token = localStorage.getItem("accessToken");
      await fetch("https://api.freeapi.app/api/v1/users/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setUser(null); 
      localStorage.removeItem("accessToken");
      setStatus("Logged out successfully.");
    } catch (error) {
      setStatus("Logout failed");
    }
  }

  return (
    <>
      <button 
        className="theme-toggle" 
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>
      
      <div className="app-container">
        <h1 className="title">Auth Project</h1>
      <p className={`status ${status.toLowerCase().includes('success') ? 'success' : status.toLowerCase().includes('fail') || status.toLowerCase().includes('error') ? 'error' : ''}`}>
        {status}
      </p>

      {user ? (
        <div>
          <div className="profile-card">
            <h2>Profile Details</h2>
            <p className="profile-detail"><strong>Username:</strong> {user.username}</p>
            <p className="profile-detail"><strong>Email:</strong> {user.email}</p>
          </div>
          <button className="btn btn-secondary" style={{ width: '100%' }} onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="form-group">
          <input 
            className="input-field"
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            className="input-field"
            placeholder="Email (only needed for register)" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            className="input-field"
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          
          <div className="button-group">
            <button className="btn btn-primary" onClick={login}>Login</button>
            <button className="btn btn-secondary" onClick={register}>Register</button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default App;
