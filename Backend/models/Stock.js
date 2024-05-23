import mongoose from 'mongoose';
import Product from './product.js';
import Manufacturer from './Manufacture.js';

const { Schema } = mongoose;

const stockSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  manufacturer: { type: Schema.Types.ObjectId, ref: 'Manufacturer', required: true },
  quantity: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;
