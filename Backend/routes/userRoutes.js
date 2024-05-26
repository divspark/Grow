import express from "express";
import { GetAllUser, HandleUserLogin, HandleUserSignup, deleteUserByEmail } from "../controllers/user.js";
import cookieParser from "cookie-parser";

const app = express.Router();

app.use(express.json());
app.use(cookieParser());

app.post("/login", HandleUserLogin);
app.post("/signup", HandleUserSignup);
app.get("/all", GetAllUser);
app.delete("/delete", deleteUserByEmail);

// app.get("/login", (req, res) => {
//     res.sendFile(
//       "D:/Food Miles/Backend/Controllers/views/index.html"
//     );
//   });
  
//   app.get("/home",(req,res) => {
//     res.sendFile(
//       "D:/Food Miles/Backend/Controllers/views/home.html"
//     );
//   })
  
//   app.get("/signup", (req, res) => {
//     res.sendFile(
//       "D:/Food Miles/Backend/Controllers/views/index2.html"
//     );
//   });

  // app.get('/Producer-dashboard', verifyToken, ensureRole('producer'), (req, res) => {
  //   res.send('Welcome to Admin Dashboard');
  // });

  // app.get('/consumer-dashboard', verifyToken, ensureRole('consumer'), (req, res) => {
  //   res.send('Welcome to User Dashboard');
  // });

export default app;
