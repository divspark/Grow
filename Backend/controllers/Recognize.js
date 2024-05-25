import multer from "multer";
import { ClarifaiStub, grpc } from "clarifai-nodejs-grpc";
import fs from "fs";

const upload = multer({ dest: "uploads/" });

const PAT = "7a7826024b914d8daa641d044be0d4bc";
const USER_ID = "divine_ansh";
const APP_ID = "Image-Recognitio";
const MODEL_ID = "food-item-recognition";
const MODEL_VERSION_ID = "1d5fd481e0cf4826aa72ec3ff049e044";
//const imageBytes = fs.readFileSync("{YOUR_IMAGE_LOCATION}", { encoding: "base64" });

// Configure Clarifai stub
const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + PAT);

// Define a route handler for image annotation
export const newReco = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded." });
  }

  console.log(req.file.filename);
  const imageBytes = fs.readFileSync(`D:/Grow/Grow/Backend/uploads/${req.file.filename}`, { encoding: "base64" });

  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`; // Assuming multer saves the image to disk
  //const imageUrl = `http://localhost:3000/uploads/photo-1716477041008.jpg`;
  //const imageUrl = "https://images.immediate.co.uk/production/volatile/sites/30/2021/03/Tamarind-fruit-d9faec1.jpg?resize=440%2C230";
  // stub.PostModelOutputs(
  //   {
  //     user_app_id: {
  //       user_id: USER_ID,
  //       app_id: APP_ID,
  //     },
  //     model_id: MODEL_ID,
  //     version_id: MODEL_VERSION_ID,
  //     inputs: [{ data: { image: { url: imageUrl } } }],
  //   },
  //   metadata,
  //   (err, response) => {
  //     if (err) {
  //       console.error("Error processing image:", err);
  //       return res.status(500).json({ error: "Internal server error." });
  //     }

  //     if (response.status.code !== 10000) {
  //       console.error("Clarifai API error:", response.status.description);
  //       return res.status(500).json({ error: "Clarifai API error." });
  //     }

  //     const output = response.outputs[0];
  //     if (
  //       output &&
  //       output.data &&
  //       output.data.concepts &&
  //       output.data.concepts.length > 0
  //     ) {
  //       const firstConcept = output.data.concepts[0];
  //       return res.json({ annotation: firstConcept.name });
  //     } else {
  //       return res.status(404).json({ error: "No concepts predicted." });
  //     }
  //   }
  // );
  stub.PostInputs(
    {
      inputs: [{ data: { image: { base64: imageBytes } } }]
    },
    metadata,
    (err, response) => {
      if (err) {
        console.error("Error processing image:", err);
        return res.status(500).json({ error: "Internal server error." });
      }
  
      if (response.status.code !== 10000) {
        console.error("Clarifai API error:", response.status.description);
        return res.status(500).json({ error: "Clarifai API error." });
      }
  
      const output = response.outputs[0];
      if (
        output &&
        output.data &&
        output.data.concepts &&
        output.data.concepts.length > 0
      ) {
        const firstConcept = output.data.concepts[0];
        return res.json({ annotation: firstConcept.name });
      } else {
        return res.status(404).json({ error: "No concepts predicted." });
      }
    }
  );
  
};
