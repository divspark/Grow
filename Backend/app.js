import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
//import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import TestimonialsRoutes from "./routes/TestimonialsRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import RecipeRoutes from "./routes/RecipeRoutes.js";
//import RecognizeRoutes from "./routes/RecognizeRoute.js";
//import uploadRoutes from "./routes/UploadRoute.js";
import speechRoutes from "./routes/speechRoutes.js";
import dotenv from 'dotenv';
// import { fileURLToPath } from 'url';
// import path from 'path';

// import { dirname } from 'path';

const app = express();
const port = process.env.PORT || 4000;



// Serve static files from the 'public' directory
//app.use(express.static("./Controllers/views"));
// app.use(express.static("D:/Project Modules/Payment Gateway/views"));
// app.use(express.static("./controllers/views"));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// const currentFileUrl = import.meta.url;
// const currentDirPath = path.dirname(fileURLToPath(currentFileUrl)); // Use path directly
// const uploadsPath = path.join(currentDirPath, 'uploads');

dotenv.config(); // Load environment variables from .env

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

// app.use('/uploads', express.static(uploadsPath));
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error('Not allowed by CORS')); // Block the origin
    }
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
// app.use(cors({
//     origin: "https://grow-frontend-lime.vercel.app",
//     methods: ["GET", "POST","DELETE"],
//     optionsSuccessStatus: 200,
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization'], 

// }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Database Connection
connectDB();

// app.use("/api/v1/user", userRoutes);
// app.use("/api/v1/product", productRoutes);
// app.use("/api/v1/order", orderRoutes);
// app.use("/api/v1/testimonials", TestimonialsRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/recipe", RecipeRoutes);
// app.use("/api/v1/recognize", RecognizeRoutes);
// app.use("/api/v1/upload", uploadRoutes);
// app.use("/api/v1/speech", speechRoutes);

app.get("/", (req, res) => {
  
  res.json("API is running....");
})
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);
app.use("/testimonials", TestimonialsRoutes);
app.use("/payment", paymentRoutes);
app.use("/recipe", RecipeRoutes);
//app.use("/recognize", RecognizeRoutes);
//app.use("/upload", uploadRoutes);
app.use("/speech", speechRoutes);


app.listen(port, () => {
  console.log(`Server is listening at port:${port}`);
});
