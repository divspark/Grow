import Product from "../models/product.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const newProduct = async (req, res, next) => {
  const { name, price, stock, category } = req.body;
  const photo = req.file;

  // Extract token from cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Authentication token is missing" });
  }

  try {
    const decoded = jwt.verify(token, "Dabbemein4098"); // Replace with your JWT secret
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    const district = decoded.district;
    console.log("District:", district);

    if (!photo) {
      return res.status(400).json({ message: "Please Add Photo" });
    }

    if (!name || !price) {
      return res.status(400).json({ message: "Please Enter All Fields" });
    }

    const photoPath = photo.path.replace(/\\/g, "/");
    const photoUrl = `https://grow-frontend-lime.vercel.app/${photoPath}`;

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

  return res.status(200).json(products);
};

export const getAllCategories = async (req, res, next) => {
  const categories = await Product.distinct("category");
  return res.status(200).json({ categories });
};

export const getAdminProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getSingleProducts = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  return res.status(200).json(product);
};

export const getSingleProductsByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const product = await Product.findOne({ name });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getProductsByDistrict = async (req, res) => {
  const { district } = req.params;

  try {
    if (!district) {
      return res
        .status(400)
        .json({ error: "District query parameter is required" });
    }

    const products = await Product.find({ district });

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch products" });
  }
};
