import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import axios from "axios";
import { Loader, Center } from "@mantine/core";

const Calories = ({ query }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.get(
          `https://grow-backend-pi.vercel.app/recipe/recipes?calories=${query}`
        );
        setRecipes(response.data || []); // Ensure recipes is an array
        setError(null); // Clear any previous error
      } catch (err) {
        setError("Failed to fetch recipes");
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false after fetching
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
        ) : error ? (
          <p>{error}</p> // Show error if fetch fails
        ) : recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe} // Pass the recipe object directly
            />
          ))
        ) : (
          <p>No recipes found</p> // Show message if no recipes
        )}
      </div>
    </div>
  );
};

export default Calories;
