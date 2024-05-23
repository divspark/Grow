import Order from "../models/order.js";

//Api-for creating new orders
export const newOrder = async (req, res) => {
    const { user, products, shippingAddress } = req.body;
    const totalAmount = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
    const order = new Order({user,products,totalAmount,shippingAddress,});
  
    try {
      const savedOrder = await order.save();
      res.status(201).json(savedOrder);
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
  
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }


  export const fetchOrder = async (req, res) => {
    try {
      // Extract user ID from JWT token
      const userId = req.user.id;
  
      // Fetch orders associated with the user ID
      const orders = await Order.find({ user: userId });
  
      // Return orders as response
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }