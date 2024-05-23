// import mongoose from "mongoose";

// const { Schema } = mongoose;

// const userSchema = new Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model("User", userSchema);

// export default User;


import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['producer', 'consumer'], default: 'consumer' } // Adding a role field
});

const User = mongoose.model("User", userSchema);

export default User;
