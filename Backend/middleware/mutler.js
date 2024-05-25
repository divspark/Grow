// import multer from 'multer';
// import path from 'path';

// // // Configure Multer storage
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, 'uploads/');
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
// //   }
// // });

// // const upload = multer({ storage:storage });

// // export default upload;

// // const express = require('express');
// // const multer = require('multer');
// // const path = require('path');

// //const app = express();

// // Set storage engine
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, 'file-' + Date.now() + path.extname(file.originalname));
//   }
// });

// // Initialize upload
// // export const upload = multer({
// //   storage: storage,
// //   fileFilter: (req, file, cb) => {
// //     checkFileType(file, cb);
// //   }
// // }).single('myImage');

// // Check File Type
// function checkFileType(file, cb) {
//   const filetypes = /jpeg|jpg|png|gif/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb('Error: Images Only!');
//   }
// }

// // Upload route
// // app.post('/upload', (req, res) => {
// //   upload(req, res, (err) => {
// //     if (err) {
// //       res.status(400).json({ message: err });
// //     } else {
// //       if (req.file === undefined) {
// //         res.status(400).json({ message: 'No file selected' });
// //       } else {
// //         const filePath = path.join('uploads', req.file.filename).replace(/\\/g, '/');
// //         res.status(200).json({ file: filePath });
// //       }
// //     }
// //   });
// // });

// // Serve static files
// //app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// export default upload;

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


  // export const uploadPhoto =  (req, res) => {
  //   upload(req, res, (err) => {
  //     if (err) {
  //       res.status(400).json({ message: err });
  //     } else {
  //       if (req.file === undefined) {
  //         res.status(400).json({ message: 'No file selected' });
  //       } else {
  //         const filePath = path.join('uploads', req.file.filename).replace(/\\/g, '/');
  //         res.status(200).json({ file: filePath });
  //       }
  //     }
  //   });
  // }

  export const uploadPhoto =  (req, res,next) => {
    upload(req, res, (err) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        if (req.file === undefined) {
          res.status(400).json({ message: 'No file selected' });
        } else {
          const filePath = path.join('uploads', req.file.filename).replace(/\\/g, '/');
          // res.status(200).json({ file: filePath });
          req.filePath = filePath; // Attach the file path to the request object
        next();
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

  export default upload;