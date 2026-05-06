import { useEffect, useState } from 'react';
import './App.css';

function App7(){
      const [recipes, setRecipe] = useState([])
      const [status, setStatus] = useState("Loading...")
    
        useEffect(()=>{
        async function fetchMeals(){
        const response = await fetch("https://api.freeapi.app/api/v1/public/meals")
        const data = await response.json()
        if(response.ok && data.data && data.data.data){
            setRecipe(data.data.data)
            setStatus("")
        }else{
            setStatus("Could not fetch/load recipes")
        }
    }
    fetchMeals()
    }, [])

    return(
        <div>
           <h1>Meals Recipes</h1>
                     <hr></hr>
                     <br></br>
                     <br></br>
           <p>{status}</p>
           {recipes.map((recipe, index) => {
               // 1. Gather all valid ingredients into a simple array first
               const validIngredients = [];
               for (let i = 1; i <= 20; i++) {
                   const ingredient = recipe[`strIngredient${i}`];
                   if (ingredient && ingredient.trim() !== "") {
                       validIngredients.push(ingredient);
                   }
               }

               // 2. Return the layout with the gathered ingredients
               return (
                  <div key={index} style={{ marginBottom: '40px' }}>
                      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                          {/* Left Column: Video (1/3 width) */}
                          <div style={{ flex: 1 }}>
                              {recipe.strYoutube && (
                                  <iframe 
                                      width="100%" 
                                      height="100%" 
                                      src={recipe.strYoutube.replace("watch?v=", "embed/")} 
                                      title="Recipe Video" 
                                      allowFullScreen
                                  ></iframe>
                              )}
                          </div>

                          {/* Right Column: Info (2/3 width) */}
                          <div style={{ flex: 2 }}>
                              <p> {recipe.strMeal} </p>
                              <img src={recipe.strMealThumb} alt={recipe.strMeal} width="200" />
                              <br></br>
                              <br></br>
                              <p> -{recipe.strCategory} </p>
                              <></>
                              <span>-Ingredients: </span>
                              
                              {/* Display the gathered ingredients */}
                              {validIngredients.map((ing, idx) => (
                                  <span key={idx}>{ing}, </span>
                              ))}

                              <br></br>
                              <br></br>
                              <span>-Instructions: </span>
                              <span> {recipe.strInstructions} </span>
                          </div>
                      </div>
                      <hr />
                  </div>
               );
           })}
        </div>
    )
}

export default App7;
