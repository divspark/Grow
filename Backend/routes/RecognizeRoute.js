import express from "express";
import { uploadPhoto } from "../middleware/mutler.js";
import { newReco } from "../controllers/Recognize.js";



const app = express.Router();

//create new Order -/api/v1/order/new
app.post('/new',uploadPhoto,newReco );


export default app;