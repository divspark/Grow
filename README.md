# Grow

Welcome to Grow – a cutting-edge platform that bridges the gap between producers, farmers, and consumers to promote sustainability, reduce food miles, and lower environmental pollution. Our mission is to create a more eco-friendly food supply chain by connecting local farmers directly with consumers, minimizing the need for long-distance transport, and fostering sustainable practices.
At Grow, we are committed to promoting sustainable agriculture and empowering local communities, all while offering consumers fresh, local food with reduced environmental impact. Join us in making food sourcing more sustainable, transparent, and efficient!

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Payment Processing](#payment-processing)
- [Contributing](#contributing)

## Features

- **User Authentication**: Secure login and registration for producers, farmers, and consumers.
- **Product Listings**: Producers and farmers can list their products with detailed descriptions and prices.
- **Voice Recognition**: Utilize a basic machine learning model to recognize voice commands for an enhanced user experience.
- **Payment Gateway**: Secure and seamless transactions using Stripe.
- **Sustainability Focus**: Connects local producers and consumers to reduce food miles and promote sustainable practices.

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Redux**: State management for React applications.
- **Axios**: Promise-based HTTP client for the browser and Node.js.

### Backend

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data and product listings.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.

## Payment Processing

- **Stripe**: A suite of APIs powering online payment processing.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/divspark/grow.git
   cd grow
   ```

2. **Install dependencies**:
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```
   - For the backend:
     ```bash
     cd backend
     npm install
     ```

3. **Set up environment variables**:
   - Create a `.env` file in the `backend` directory and add the following variables:
     ```env
     MONGO_URI=your_mongodb_connection_string
     STRIPE_SECRET_KEY=your_stripe_secret_key
     STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
     ```

4. **Start the development servers**:
   - For the backend:
     ```bash
     cd backend
     npm start
     ```
   - For the frontend:
     ```bash
     cd frontend
     npm start
     ```

## Payment Processing

Stripe is used for secure payment processing. Ensure that your `.env` file contains the correct Stripe keys. The payment workflow is integrated into the order creation process, providing a seamless experience for users.

## Contributing

We welcome contributions to the Grow platform! If you would like to contribute, please follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes and commit them**:
   ```bash
   git commit -m 'Add some feature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Submit a pull request**.

6.**your Pr will be merge**
