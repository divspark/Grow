import mongoose from "mongoose";

const { Schema } = mongoose;

const DEFAULT_IMAGE_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsoNuZnvNjNEkh8WpID074lmQDS6HDXmmLkppzrCKECw&s"

const testimonialSchema = new Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  photo: { type: String, default: DEFAULT_IMAGE_URL },
  date: { type: Date, default: Date.now },
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
