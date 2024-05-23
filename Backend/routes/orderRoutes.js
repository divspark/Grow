import express from "express";
import { fetchOrder, newOrder,updateOrder } from "../controllers/order.js";
import { authenticateToken } from "../middleware/Auth.js";



const app = express.Router();

//create new Order -/api/v1/order/new
app.post('/new',newOrder );

app.get('/all',authenticateToken, fetchOrder );

app.put('/update/:orderId', updateOrder);


export default app;