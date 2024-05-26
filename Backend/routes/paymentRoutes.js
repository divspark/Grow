import express from "express";
import { createPaymentIntent, updateOrderAfterPayment } from "../controllers/payment.js";

const app = express.Router();

//create new Order -/api/v1/order/new
app.post("/pay", createPaymentIntent);

// app.get("/", (req, res) => {
//   res.sendFile("D:/Food Miles/Backend/Controllers/views/payment.html");
// });

app.post('/callback',updateOrderAfterPayment);

export default app;
