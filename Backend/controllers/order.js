import Order from "../models/order.js";
import jwt from "jsonwebtoken";

//Api-for creating new orders
export const newOrder = async (req, res) => {
    const { user, products, shippingAddress } = req.body;
    const totalAmount = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
    const order = new Order({user,products,totalAmount,shippingAddress,});
  
    try {
      const savedOrder = await order.save();
      res.status(201).json(savedOrder).setHeader("Access-Control-Allow-Origin", "*").setHeader("Access-Control-Allow-Credentials", "true");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

//Api -updating order
export const updateOrder = async (req, res) => {
    const { orderId } = req.params;
    const { user, products, shippingAddress, status } = req.body;
  
    try {
      // Find the order by ID
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      // Validate and update the order fields
      if (user) order.user = user;
      if (products) {
        order.products = products;
        order.totalAmount = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
      }
      if (shippingAddress) order.shippingAddress = shippingAddress;
      if (status) order.status = status;
  
      // Save the updated order
      const updatedOrder = await order.save();
  
      res.status(200).json(updatedOrder).setHeader("Access-Control-Allow-Origin", "*").setHeader("Access-Control-Allow-Credentials", "true");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }


  export const fetchOrder = async (req, res) => {
    try {

      const token = req.cookies.token;

    if (!token) {
      throw new Error('Authentication token is missing');
    }

    // Verify the token and extract user ID
    const decoded = jwt.verify(token, 'Dabbemein4098'); // Use the correct secret key from environment variables
    req.user = { id: decoded.id };
      // Fetch user ID from the request object (set by middleware)
      const userId = req.user.id;
  
      // Fetch orders associated with the user ID
      const orders = await Order.find({ user: userId });
  
      // Return orders as response
      res.json(orders).setHeader("Access-Control-Allow-Origin", "*").setHeader("Access-Control-Allow-Credentials", "true");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };