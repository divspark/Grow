import express from "express";

import { voiceReco } from "../controllers/speech.js";

const app = express.Router();

app.get('/new', voiceReco);


export default app;