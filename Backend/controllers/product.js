import Product from "../models/product.js";

export const newProduct = async (req, res, next) => {
  //const { name, photo, price, stock, category } = req.body;
  
  

  const { name, price, stock, category,photo } = req.body;
  //const photo = req.file;

  if (!photo)
    return res.status(400).json({
      message: "Please Add Photo",
    });
  if (!name || !price)
    return res.status(400).json({
      message: "Please Enter All Fields",
    });

  //const photoPath = photo.path;

  // await Product.create({
  //     name,photo, price, stock, category:category.toLowerCase(),
  // })

  // const newFruit = new Product({
  //   name,
  //   photo: photoPath,
  //   price,
  //   stock,
  //   category,
  // });
  const newFruit = new Product({
    name,
    photo,
    price,
    stock,
    category,
  });
  try {
    const savedFruit = await newFruit.save();
    // return res.status(201).json({
    //     success: true, message: "Product Created Successfully"
    // });
    res.status(201).json(savedFruit);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
  // Product.create({ name, price, stock, photo: photoPath }, (err, product) => {
  //   if (err) {
  //     console.error(err);
  //     res.status(500).json({ error: 'Failed to upload data' });
  //   } else {
  //     res.status(200).json({ message: 'Data uploaded successfully', product });
  //   }
  // });
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
  const products = await Product.find({});
  // return res.status(200).json({
  //     success:true,products,
  // })
  return res.status(200).json(products);
};

export const getSingleProducts = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  return res.status(200).json(product);
};

export const getSingleProductsByName = async (req, res, next) => {
  const name = req.params.name;
  res.json({name:name})
  console.log(name);
  const name2 = req.params.name.toString();
  console.log(name2);
};
