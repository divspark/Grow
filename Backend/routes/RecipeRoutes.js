import express from "express";

import { getRecipes } from "../controllers/Recipe.js";

const app = express.Router();

app.get('/recipes', getRecipes);


export default app;
