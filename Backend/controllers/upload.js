import multer from "multer";
//import upload2 from "../middleware/mutler.js";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); // Specify the directory where files should be uploaded
    },
    filename: function (req, file, cb) {
      // Rename the file to prevent conflicts
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
  });

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, 
  }).single("file");


export const uploadPhoto = (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).json({ error: "Failed to upload file" });
      }
  
      // File uploaded successfully, return the file path
      const filePath = req.file.path;
      res.json({ filePath: filePath });
    });
  }