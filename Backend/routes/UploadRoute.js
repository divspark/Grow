import express from "express";
import { uploadPhoto } from "../controllers/upload.js";

//import upload from "../middleware/mutler.js";



const app = express.Router();

//create new Order -/api/v1/order/new
app.post('/new',uploadPhoto );

// app.get('/all', allTest);


export default app;