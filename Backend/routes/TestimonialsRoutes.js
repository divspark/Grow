import express from "express";
import { allTest, newTest } from "../controllers/Testimonials.js";
import upload from "../middleware/mutler.js";



const app = express.Router();

//create new Order -/api/v1/order/new
app.post('/new',upload.single('photo'),newTest );

app.get('/all', allTest);


export default app;