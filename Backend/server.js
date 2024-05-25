import express from 'express';
import nlp from 'compromise';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 3002;

app.use(cors());

// Define enum for units of measurement
const Unit = {
  KILOGRAM: 'kilogram',
  KG: 'kg',
  GRAMS: 'grams',
  G: 'g',
  POUNDS: 'pounds',
  LBS: 'lbs',
  PIECES: 'pieces',
  PCS: 'pcs'
};

// Improved parsing logic with enum
const parseInput = (input) => {
  let doc = nlp(input);
  let values = doc.values().toNumber().out('text');
  let units = doc.match('#Unit').out('text');
  let productName = doc.not(doc.values()).not(units).out('text').trim();

  // Fallback in case units are not recognized
  if (!units) {
    units = input.match(new RegExp(Object.values(Unit).join('|'), 'i'));
    units = units ? units[0] : Unit.PIECES;
  }

  // Fallback in case quantity is not recognized
  if (!values) {
    values = input.match(/\d+/);
    values = values ? values[0] : '1';
  }

  console.log('Parsed Input:', { product_name: productName, quantity: values, unit: units });

  return {
    product_name: productName.trim(),
    quantity: values.trim(),
    unit: units.trim()
  };
};

const getProductData = async (productName) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/v1/product/${productName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    return null;
  }
};

app.get('/product', async (req, res) => {
  const userInput = req.query.input;
  const parsedData = parseInput(userInput);
  const productData = await getProductData(parsedData.product_name);

  if (productData) {
    const response = {
      name: productData.name,
      stock: `${parsedData.quantity} ${parsedData.unit}`,
      photo: productData.photo,
      price: productData.price
    };
    res.json(response);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});



// import express from 'express';
// import nlp from 'compromise';
// import cors from 'cors';

// const app = express();
// const port = 3002;

// app.use(cors());

// // Define enum for units of measurement
// const Unit = {
//   KILOGRAM: 'kilogram',
//   KG: 'kg',
//   GRAMS: 'grams',
//   G: 'g',
//   POUNDS: 'pounds',
//   LBS: 'lbs',
//   PIECES: 'pieces',
//   PCS: 'pcs'
// };

// // Improved parsing logic with enum
// const parseInput = (input) => {
//   let doc = nlp(input);
//   let values = doc.values().toNumber().out('text');
//   let units = doc.match('#Unit').out('text');
//   let productName = doc.not(doc.values()).not(units).out('text').trim();

//   // Fallback in case units are not recognized
//   if (!units) {
//     units = input.match(new RegExp(Object.values(Unit).join('|'), 'i'));
//     units = units ? units[0] : Unit.PIECES;
//   }

//   // Fallback in case quantity is not recognized
//   if (!values) {
//     values = input.match(/\d+/);
//     values = values ? values[0] : '1';
//   }

//   console.log('Parsed Input:', { product_name: productName, quantity: values, unit: units });

//   return {
//     product_name: productName.trim(),
//     quantity: values.trim(),
//     unit: units.trim()
//   };
// };

// const getProductData = (productName) => {
//   const productDatabase = {
//     "aalu": {
//       name: "aalu",
//       photo: "https://cdn.mos.cms.futurecdn.net/iC7HBvohbJqExqvbKcV3pP-650-80.jpg.webp",  // Placeholder image URL
//       price: "2.50"
//     },
//     "pyaj": {
//       name: "pyaj",
//       photo: "https://img.etimg.com/thumb/msid-107845571,width-300,height-225,imgsize-178900,resizemode-75/how-to-shop-and-store-onion.jpg",  // Placeholder image URL
//       price: "2.50"
//     },
//     "tamatar": {
//       name: "tamatar",
//       photo: "https://m.media-amazon.com/images/I/51zGJKaNDRL.jpg",  // Placeholder image URL
//       price: "2.50"
//     },
//     // Add more products if needed
//   };
//   return productDatabase[productName.toLowerCase()];
// };

// app.get('/product', (req, res) => {
//   const userInput = req.query.input;
//   const parsedData = parseInput(userInput);
//   const productData = getProductData(parsedData.product_name);

//   if (productData) {
//     const response = {
//       name: productData.name,
//       stock: `${parsedData.quantity} ${parsedData.unit}`,
//       photo: productData.photo,
//       price: productData.price
//     };
//     res.json(response);
//   } else {
//     res.status(404).json({ error: 'Product not found' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}/`);
// });
