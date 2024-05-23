import mongoose from 'mongoose';

const { Schema } = mongoose;

const manufacturerSchema = new Schema({
  name: { type: String, required: true },
  contactInfo: {
    email: String,
  }
});

const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);

export default Manufacturer;
