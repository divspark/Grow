import axios from 'axios';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';

dotenv.config();

const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID;
const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

export const getRecipes = async (req, res) => {
  try {
    const query = req.query.q ? req.query.q.toLowerCase() : 'chicken'; // Normalize query to lowercase
    const diet = req.query.diet ? req.query.diet.toLowerCase() : 'balanced'; // Normalize diet to lowercase
    const calories = req.query.calories || '591-722';
    const allergy = req.query.health ? req.query.health.toLowerCase() : 'alcohol-free'; // Normalize health to lowercase
    const cuisine = req.query.cuisine ? req.query.cuisine.toLowerCase() : 'indian'; // Normalize cuisine to lowercase

    // Construct the API request URL
    let url = `https://api.edamam.com/search?q=${query}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&diet=${diet}&health=${allergy}&cuisineType=${cuisine}&from=0&to=5&calories=${calories}`;

    // Make GET request to Edamam API
    const response = await axios.get(url);

    // Extract recipe information from response
    const recipes = response.data.hits.map(hit => ({
      name: hit.recipe.label,
      url: hit.recipe.url,
      ingredients: hit.recipe.ingredientLines,
      image: hit.recipe.image,
      calories: hit.recipe.calories
    }));

    // Send recipes as JSON response
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
