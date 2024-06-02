import Product from "../models/product.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// export const newProduct = async (req, res, next) => {
//   //const { name, photo, price, stock, category } = req.body;
  
  

//   const { name, price, stock, category } = req.body;
//   const photo = req.file;

//   const token = req.header('Authorization').replace('Bearer ', '');
//   const decoded = jwt.verify(token, 'your_jwt_secret'); // Replace with your JWT secret
//   const user = await User.findById(decoded.id);

//   if (!user) {
//     throw new Error('User not found');
//   }
//   req.user = user;
//   req.district = decoded.district;
//   console.log(district);

//   if (!photo)
//     return res.status(400).json({
//       message: "Please Add Photo",
//     });
//   if (!name || !price)
//     return res.status(400).json({
//       message: "Please Enter All Fields",
//     });
//     const photoPath = photo.path.replace(/\\/g, '/');;
//    const photo2 =` http://localhost:5000/${photoPath}`
//   //const photoPath = photo.path;
  

//   // await Product.create({
//   //     name,photo, price, stock, category:category.toLowerCase(),
//   // })

//   const newFruit = new Product({
//     name,
//     photo: photo2,
//     price,
//     stock,
//     category,
//     district,
//   });
//   // const newFruit = new Product({
//   //   name,
//   //   photo,
//   //   price,
//   //   stock,
//   //   category,
//   // });
//   try {
//     const savedFruit = await newFruit.save();
//     // return res.status(201).json({
//     //     success: true, message: "Product Created Successfully"
//     // });
//     res.status(201).json(savedFruit);
//   } catch (error) {
//     res.status(500).json({ error: err.message });
//   }
//   // Product.create({ name, price, stock, photo: photoPath }, (err, product) => {
//   //   if (err) {
//   //     console.error(err);
//   //     res.status(500).json({ error: 'Failed to upload data' });
//   //   } else {
//   //     res.status(200).json({ message: 'Data uploaded successfully', product });
//   //   }
//   // });
// };

export const newProduct = async (req, res, next) => {
  const { name, price, stock, category } = req.body;
  const photo = req.file;

  // Extract token from cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  try {
    const decoded = jwt.verify(token, 'Dabbemein4098'); // Replace with your JWT secret
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    const district = decoded.district;
    console.log('District:', district);

    if (!photo) {
      return res.status(400).json({ message: 'Please Add Photo' });
    }

    if (!name || !price) {
      return res.status(400).json({ message: 'Please Enter All Fields' });
    }

    const photoPath = photo.path.replace(/\\/g, '/');
    const photoUrl = `http://localhost:5000/${photoPath}`;

    const newProduct = new Product({
      name,
      photo: photoUrl,
      price,
      stock,
      category,
      district,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


export const getLatestProducts = async (req, res, next) => {
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(6);

  // res.setHeader("Access-Control-Allow-Origin", "*")
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  
  return res.status(200).json(products).setHeader("Access-Control-Allow-Origin", "*").setHeader("Access-Control-Allow-Credentials", "true");
};

export const getAllCategories = async (req, res, next) => {
  const categories = await Product.distinct("category");
  return res.status(200).json({ categories });
};

// export const getAdminProducts = async (req, res, next) => {
//   const products = await Product.find({});
//   // return res.status(200).json({
//   //     success:true,products,
//   // })
//   return res.status(200).json(products);
// };

export const getAdminProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    // Assuming each product has an image field that contains the filename
    // const updatedProducts = products.map(product => {
    //   return {
    //     ...product._doc, // Spread the original product object
    //     photo: ` http://localhost:5000/${product.photoPath}` // Append image URL
    //   };
    // });

    return res.status(200).json(products).setHeader("Access-Control-Allow-Origin", "*").setHeader("Access-Control-Allow-Credentials", "true");
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getSingleProducts = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  return res.status(200).json(product);
};

// export const getSingleProductsByName = async (req, res, next) => {
//   const name = req.params.name;
//   res.json({name:name})
//   console.log(name);
//   const name2 = req.params.name.toString();
//   console.log(name2);
// };

export const getSingleProductsByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const product = await Product.findOne({ name });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json( product ).setHeader("Access-Control-Allow-Origin", "*").setHeader("Access-Control-Allow-Credentials", "true");
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// export const getProductsByDistrict = async (req, res, next) => {
//   const { category } = req.params;
//   const products = await Product.find({ category });
//   return res.status(200).json(products);
// };


export const getProductsByDistrict = async (req, res) => {
  const { district } = req.params;

  try {
    if (!district) {
      return res.status(400).json({ error: 'District query parameter is required' });
    }

    const products = await Product.find({ district });

    // const updatedProducts = products.map(product => ({
    //   ...product._doc,
    //   imageUrl: `${req.protocol}://${req.get('host')}/uploads/${product.image}`.replace(/\\/g, '/')
    // }));

    return res.status(200).json(products).setHeader("Access-Control-Allow-Origin", "*").setHeader("Access-Control-Allow-Credentials", "true");
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
};
