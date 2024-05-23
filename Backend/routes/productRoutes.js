import express from "express";
import { newProduct, getLatestProducts, getAllCategories, getAdminProducts, getSingleProducts, getSingleProductsByName,  } from "../controllers/product.js";
import upload from "../middleware/mutler.js";

const app = express.Router();

//create new Product -/api/v1/product/new
app.post("/new", upload.single('photo'),newProduct);
//To get last 10 products -/api/v1/product/latest
app.get("/latest",getLatestProducts);
//To get all unique categories -/api/v1/product/categories
app.get("/categories",getAllCategories);
//To get all products -/api/v1/product/admin-products
app.get("/admin-products", getAdminProducts);
//To get single product -/api/v1/product/:id
app.route("/:id").get(getSingleProducts);
//To get single product -/api/v1/product/:name
app.route("/:name").get(getSingleProductsByName);

export default app;