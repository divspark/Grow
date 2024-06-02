import axios from 'axios';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import express from "express";
dotenv.config();
const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID;
const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

export const getRecipes = async (req, res) => {
    try {
      const query = req.query.q || 'chicken'; // Default to searching for chicken recipes if no query provided
      const diet = req.query.diet || 'balanced'; // Default to balanced diet if not specified
      const calories = req.query.calories || '591-722';
      const allergy = req.query.health || 'alcohol-free';
      const cuisine = req.query.cuisine || 'indian';
    //   const nutrients = {
    //     'PROCNT': req.query.protein || '20',  // Default to at least 20g of protein
    //     'CHOCDF': req.query.carbs || '30',     // Default to at least 30g of carbohydrates
    //     'FAT': req.query.fat || '10'           // Default to at least 10g of fat
    //   };
  
      // Construct the API request URL
      let url = `https://api.edamam.com/search?q=${query}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&diet=${diet}&health=${allergy}&cuisineType=${cuisine}&from=0&to=5&calories=${calories}`;

      //https://api.edamam.com/search?q=${query}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&diet=${diet}&from=0&to=3&calories=591-722&health=alcohol-free
  
      // Add nutrient constraints to the URL
    //   for (const nutrient in nutrients) {
    //     url += `&nutrient-${nutrient}=${nutrients[nutrient]}`;
    //   }
  
      // Make GET request to Edamam API
      const response = await axios.get(url);
  
      // Extract recipe information from response
      //console.log(response.data);
      const recipes = response.data.hits.map(hit => ({
        name: hit.recipe.label,
        url: hit.recipe.url,
        // nutrients : hit.recipe.digest.map(nutrient => ({
        //   label: nutrient.label,
        //   total: nutrient.total,
        //   unit: nutrient.unit
        // })),
        ingredients: hit.recipe.ingredientLines,
        image: hit.recipe.image,
        calories: hit.recipe.calories
      }));
  
      // Send recipes as JSON response
      res.json(recipes).setHeader("Access-Control-Allow-Origin", "*").setHeader("Access-Control-Allow-Credentials", "true");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }