
import Testimonial from '../models/Testimonials.js'; // Adjust the path as necessary


// Add a new testimonial
export const newTest = async (req, res) => {
  const { name, message } = req.body;
  const photo = req.file;
  const photoPath = photo.path;
  try {
    const newTestimonial = new Testimonial({ name, message, photo: photoPath });
    await newTestimonial.save();
    res.status(201).json(newTestimonial).setHeader("Access-Control-Allow-Origin", "*").setHeader("Access-Control-Allow-Credentials", "true");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all testimonials
export const allTest = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials).setHeader("Access-Control-Allow-Origin", "*").setHeader("Access-Control-Allow-Credentials", "true");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

