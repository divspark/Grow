import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const secretKey = "Dabbemein4098";

export const HandleUserLogin = async (req, res) => {
  // const { email, password, role,district,state } = req.body;
  const { email, password, role,district } = req.body;

  // Check if user exists with provided email, password, and role
  const user = await User.findOne({ email, password, role,district });
  if (!user) {
    return res.status(401).json({ message: "Invalid Email, Password, or User Role" });
  }

  // Generate token
  const token = jwt.sign({ id: user._id, role: user.role,district:user.district }, secretKey, { expiresIn: '1h' });

  // Set token in cookies (You may need to configure your server to handle cookies properly)
  res.cookie('token', token, { httpOnly: true });

  // Authenticate token (Redundant here since token is just created, hence directly proceed to role-based actions)
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // Token is valid, user is authenticated
    if (decoded.role === 'consumer') {
      res.send('Welcome to Consumer Dashboard');
      // res.redirect(`http://localhost:3001/`);
    } else if (decoded.role === 'producer') {
      res.send('Welcome to Producer Dashboard'+`${district}`);
       //res.redirect(`http://localhost:3000/producer/:${decoded.id}`);
      
    }
    else if (decoded.role === 'admin') {
      res.send('Welcome to Admin Dashboard');
       //res.redirect(`http://localhost:3000/producer/:${decoded.id}`);
      
    } else {
      res.status(403).send('Access denied.');
    }
  });

  console.log("User authentication successful");
};




// import jwt from "jsonwebtoken";
// import  User  from "../models/userModel.js";

// const secretKey = "Dabbemein4098";

// export const HandleUserLogin = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email, password, role });
//   if (!user) {
//     return res.status(401).json({ message: "Invalid Email or Password or User Role" });
//   }
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
//   // Authenticate token
//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid token" });
//     }
//     // Token is valid, user is authenticated
//     const { id, role } = req.user;
//     if (req.body.role === 'consumer') {
//       res.send('Welcome to Consumer Dashboard');
//       // res.redirect(`http://localhost:3001/`);
//     }
//     else if (req.body.role === 'producer') {
//       res.send('Welcome to Producer Dashboard');
//       // res.redirect(`http://localhost:3001/producer/:${id}`);
//     } else {
//       res.status(403).send('Access denied.');
//     }
//   });
  
//   console.log("user authentication successfull");
// };

// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import User from "../models/userModel.js";

// const secretKey = "Dabbemein4098";

export const HandleUserSignup = async (req, res) => {
  const { email, password, role,district,state } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving the user
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({ email, password, role,district,state });
    await newUser.save();

    // Generate a token for the new user
    const token = jwt.sign(
      { email: newUser.email, userId: newUser._id, role: newUser.role,district:newUser.district,state:newUser.state },
      secretKey,
      { expiresIn: "1h" }
    );

    // Set the token in cookies
    res.cookie("token", token, { httpOnly: true });

    // Respond with success message
    res.status(201).json({ message: "User created successfully", token ,district});
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ message: error.message });
  }
};


export const GetAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const getAdminProducts = async (req, res, next) => {
//   try {
//     const products = await Product.find({});
//     // Assuming each product has an image field that contains the filename
//     // const updatedProducts = products.map(product => {
//     //   return {
//     //     ...product._doc, // Spread the original product object
//     //     photo: ` http://localhost:5000/${product.photoPath}` // Append image URL
//     //   };
//     // });

//     return res.status(200).json(products);
//   } catch (error) {
//     return res.status(500).json({ error: 'Failed to fetch products' });
//   }
// };

export const deleteUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
