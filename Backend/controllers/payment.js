import stripe from "stripe";
import { config as dotenvConfig } from "dotenv";
import Order from "../models/order.js";

dotenvConfig();

const STRIPE_KEY = process.env.STRIPE_KEY || "";

// Initialize Stripe with your secret key
const stripeClient = stripe(STRIPE_KEY);

export const createPaymentIntent = async(req, res) => {
    const { amount } = req.body;

    //console.log(amount);

    if (!amount) return res.send("Please enter amount details");

    try {
        // Create a payment intent using the Stripe client
        const paymentIntent = await stripeClient.paymentIntents.create({
            amount: Number(amount) * 100, // Stripe expects amount in cents
            currency: "inr"
        });

        // return res.status(201).json({
        //     success: true,
        //     clientSecret: paymentIntent.client_secret,
        // });

        // return res.sendFile("D:/Food Miles/Backend/Controllers/views/Success.html").status(201).json({
        //     success: true,
        //     clientSecret: paymentIntent.client_secret,
        // });

        return res.status(201).json({ clientSecret: paymentIntent.client_secret});

    } catch (error) {
        // Handle any errors
        console.error("Error creating payment intent:", error);
        return res.status(500).json({
            success: false,
            error: "An error occurred while creating payment intent"
        });
    }
}

export const updateOrderAfterPayment = async (req, res) => {
  const paymentId = req.body.paymentId; // This will depend on your payment gateway's response format
  const orderId = req.body.orderId; // You might need to include this in the payment process

  try {
    // Find the order by ID and update the paymentId and status
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentId: paymentId,
        status: "Paid",
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).send("Order not found");
    }

    res.status(200).send("Payment processed successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
