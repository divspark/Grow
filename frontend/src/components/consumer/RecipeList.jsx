import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/recipe/recipes?q=onion');
        setRecipes(response.data|| []); // Ensure recipes is an array
      } catch (err) {
        setError('Failed to fetch recipes');
        console.error(err);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="recipe-list">
      <h1>Recipe List</h1>
      <div className="recipecard_list">

      
      {error ? (
        <p>{error}</p>
      ) : (
        recipes.length > 0 ? (
          recipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              name={recipe.name}
              image={recipe.image}
              url={recipe.url}
              ingredients={recipe.ingredients}
            //   nutrients={recipe.nutrients}
              calories={recipe.calories}
            />
          ))
        ) : (
          <p>Loading recipes...</p>
        )
      )}
      </div>
    </div>
  );
};

export default RecipeList;
