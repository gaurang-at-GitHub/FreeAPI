import { useEffect, useState } from 'react';
import './App.css';

function App7() {
  const [meals, setMeals] = useState([]);
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch("https://api.freeapi.app/api/v1/public/meals");
        const data = await response.json();
        
        if (response.ok && data.data && data.data.data) {
          setMeals(data.data.data);
          setStatus(""); 
        } else {
          setStatus("Failed to load meals.");
        }
      } catch (error) {
        setStatus("Error fetching meals.");
      }
    }
    
    fetchMeals();
  }, []);

  return (
    <div className="app-container">
      <h1>Meals List</h1>
      
      {status && <p className="status-text">{status}</p>}
      
      {meals.map((meal) => (
        <div key={meal.idMeal} className="meal-card">
          <h2>{meal.strMeal}</h2>
          <img src={meal.strMealThumb} alt={meal.strMeal} width="200" />
          <p>{meal.strArea} - {meal.strCategory}</p>
        </div>
      ))}
    </div>
  );
}

export default App7;
