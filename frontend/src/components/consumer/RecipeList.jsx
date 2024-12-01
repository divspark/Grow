import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import axios from "axios";
import { Loader, Center } from "@mantine/core";  // Import Loader and Center from Mantine

const RecipeList = ({ query }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true); // Set loading to true before starting the fetch
      try {
        const response = await axios.get(
          `https://grow-backend-pi.vercel.app/recipe/recipes?q=${query}`
        );
        setRecipes(response.data || []); // Ensure recipes is an array
        setError(null); // Reset error state if successful
      } catch (err) {
        setError("Failed to fetch recipes");
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false once fetching is done
      }
    };

    fetchRecipes();
  }, [query]);

  return (
    <div className="recipe-list">
      <h1>Recipe List</h1>
      <div className="recipe-card-list">
        {loading ? (
          <Center>
            <Loader size="lg" /> {/* Show the loader when loading is true */}
          </Center>
        ) : error ? (
          <p>{error}</p> // Display error if there's an issue fetching recipes
        ) : recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe} // Pass the recipe object directly
            />
          ))
        ) : (
          <p>No recipes found</p> // Show message if no recipes are found
        )}
      </div>
    </div>
  );
};

export default RecipeList;
