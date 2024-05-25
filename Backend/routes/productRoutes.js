import express from "express";
import { newProduct, getLatestProducts, getAllCategories, getAdminProducts, getSingleProducts, getSingleProductsByName, getProductsByDistrict,  } from "../controllers/product.js";
import uploadPhoto from "../middleware/mutler.js";
import { authMiddleware } from "../middleware/Auth.js";

const app = express.Router();

//create new Product -/api/v1/product/new
app.post("/new", uploadPhoto,newProduct);
//To get last 10 products -/api/v1/product/latest
app.get("/latest",getLatestProducts);
//To get all unique categories -/api/v1/product/categories
app.get("/categories",getAllCategories);
//To get all products -/api/v1/product/admin-products
app.get("/admin-products", getAdminProducts);
//To get single product -/api/v1/product/:id
app.route("/:id").get(getSingleProducts);
//To get single product -/api/v1/product/:name
app.get("/name/:name",getSingleProductsByName);

app.get("/district/:district",getProductsByDistrict);


export default app;