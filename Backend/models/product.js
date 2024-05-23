import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
      type: String,
      required: [true, "Please Enter Name"],
  },
  photo: {
      type: String,
  },
  price: {
      type: Number,
      required: [true, "Please Enter Price"],
  },
  stock: {
      type: Number,
    //   required: [true, "Please Enter Stock"],
  },
  category: {
      type: String,
    //   required: [true, "Please Enter Product category"],
      trim: true,
  }
}, {
  timestamps: true,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
