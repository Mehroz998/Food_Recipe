import React, { useState, useEffect } from 'react';
import Header from './Header';
import '../App.css';

const Recipe = ({ code }) => {
  const [recipes, setRecipes] = useState(null); // Start with null since recipes will be an object
  const [ingredients, setIngredients] = useState([]); // Store ingredients and measurements

  const fetchapi = async () => {
    try {
      const get = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${code}`);
      const res = await get.json();
      const meal = res.meals[0];
      setRecipes(meal);

      // Extract ingredients and measurements dynamically
      const ingredientsArray = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
          ingredientsArray.push(`${measure ? measure : ""} ${ingredient}`.trim());
        }
      }
      setIngredients(ingredientsArray); // Store the ingredients in state
    } catch (error) {
      console.error("Error fetching recipe data:", error);
    }
  };

  useEffect(() => {
    fetchapi();
  }, []);

  return (
    <div className="resCon">
      <Header/>
      <div className="rcontainer">
        <div className="ingredients">
          <h2>Ingredients</h2>
          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li> // Display each ingredient
            ))}
          </ul>
        </div>
        <div className="main">
          {recipes && ( // Render only if recipes is available
            <>
              <h1>{recipes.strMeal}</h1>
              <h3>{recipes.strArea} Dish</h3>
              <div className="instruction">
                <h2>Instructions</h2>
                <p>{recipes.strInstructions}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recipe;
