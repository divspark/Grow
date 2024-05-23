import jwt from "jsonwebtoken";

const secretKey = "Dabbemein4098";

export const ensureLoggedIn = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token,secretKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: "Invalid token." });
  }
};

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // Assuming the token is stored in a cookie named "token"

  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user; // Set user object in request for future use
    next();
  });
}

//module.exports = ensureLoggedIn;

// export function ensureRole(role) {
//     return function (req, res, next) {
//       if (req.user && req.user.role === role) {
//         next();
//       } else {
//         res.status(403).send('Access denied.');
//       }
//     };
//   }
