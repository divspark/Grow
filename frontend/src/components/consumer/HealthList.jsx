import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import axios from "axios";
import { Loader, Center } from "@mantine/core";

const HealthList = ({ query }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(
          `https://grow-backend-pi.vercel.app/recipe/recipes?health=${query}`
        );
        setRecipes(response.data || []); // Ensure recipes is an array
        setError(null); // Reset error state
      } catch (err) {
        setError("Failed to fetch recipes");
        console.error(err);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchRecipes();
  }, [query]);

  return (
    <div className="recipe-list">
      <h1>Recipe List</h1>
      <div className="recipe-card-list">
        {loading ? ( // Show loader while loading
          <Center>
            <Loader size="lg" />
          </Center>
        ) : error ? ( // Show error if any
          <p>{error}</p>
        ) : recipes.length > 0 ? ( // Show recipes if available
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe} // Pass the recipe object directly
            />
          ))
        ) : (
          <p>No recipes found</p> // Fallback if no recipes found
        )}
      </div>
    </div>
  );
};

export default HealthList;
