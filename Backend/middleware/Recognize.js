import { ClarifaiStub, grpc } from "clarifai-nodejs-grpc";

const PAT = "7a7826024b914d8daa641d044be0d4bc";
const USER_ID = "divine_ansh";
const APP_ID = "Image-Recognitio";
const MODEL_ID = "food-item-recognition";
const MODEL_VERSION_ID = "1d5fd481e0cf4826aa72ec3ff049e044";
const IMAGE_URL =
  "https://5.imimg.com/data5/SELLER/Default/2022/4/VP/VE/EO/18118948/60mm-red-onion.jpg";

const stub = ClarifaiStub.grpc();

// This will be used by every Clarifai endpoint call
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + PAT);

stub.PostModelOutputs(
  {
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    model_id: MODEL_ID,
    version_id: MODEL_VERSION_ID, // This is optional. Defaults to the latest model version
    inputs: [
      { data: { image: { url: IMAGE_URL, allow_duplicate_url: true } } },
    ],
  },
  metadata,
  (err, response) => {
    if (err) {
      throw new Error(err);
    }

    if (response.status.code !== 10000) {
      throw new Error(
        "Post model outputs failed, status: " + response.status.description
      );
    }

    // Since we have one input, one output will exist here
    const output = response.outputs[0];

    if (
      output &&
      output.data &&
      output.data.concepts &&
      output.data.concepts.length > 0
    ) {
      const firstConcept = output.data.concepts[0];
      console.log("Name : "+firstConcept.name);
    } else {
      console.log("No concepts predicted.");
    }
  }
);
