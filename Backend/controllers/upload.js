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


// export const uploadPhoto = (req, res) => {
//     upload(req, res, (err) => {
//       if (err) {
//         console.error("Error uploading file:", err);
//         return res.status(500).json({ error: "Failed to upload file" });
//       }
  
//       // File uploaded successfully, return the file path
//       const filePath = req.file.path;
//       res.json({ filePath: filePath });
//     });
//   }


  export const uploadPhoto =  (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        if (req.file === undefined) {
          res.status(400).json({ message: 'No file selected' });
        } else {
          const filePath = path.join('uploads', req.file.filename).replace(/\\/g, '/');
          res.status(200).json({ file: filePath });
        }
      }
    });
  }

  function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }