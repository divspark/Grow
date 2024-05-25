import express from "express";
import { allTest, newTest } from "../controllers/Testimonials.js";
import { uploadPhoto } from "../middleware/mutler.js";



const app = express.Router();

//create new Order -/api/v1/order/new
app.post('/new',uploadPhoto,newTest );

app.get('/all', allTest);


export default app;