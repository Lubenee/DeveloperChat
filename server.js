const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();

const { v4: uuidv4 } = require("uuid"); // Import v4 function from uuid package for ID generation
const { jwtDecode } = require("jwt-decode");

const app = express();
const PORT = 5000;
const TOKEN_KEY = process.env.JWT_SECRET_KEY;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Load users data
let users = JSON.parse(fs.readFileSync("users.json", "utf-8"));

app.get("/", (req, res) => {
  return res.json(users);
});

// Login endpoint, returns a JWT token
// JWT SIGNATURE:
// {
//   id: string,
//   email: string,
//   name: string,
// }
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const emailLowerCase = email.toLowerCase();
  const user = users.find((u) => u.email === emailLowerCase);
  if (!user) return res.status(401).json({ message: "User not found" });

  // Compare the provided password with the hashed password stored in the user object
  bcrypt.compare(password, user.password, (err, result) => {
    // If there's an error or the password doesn't match, return 401 Unauthorized
    if (err || !result) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If authentication is successful, generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );

    // Return the token in the response
    res.status(200).json({ token });
  });
});

//TODO: Register must fail on a username that's unavailable, or an email that's already used
// Register endpoint, returns a message and a status
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, type } = req.body;
    const emailLowerCase = email.toLowerCase();

    const matchingEmail = users.find((u) => u.email === emailLowerCase);
    if (matchingEmail) return res.status(403).send("Email unavailable.");

    const hashedPassword = bcrypt.hashSync(password, 10);
    const generatedId = uuidv4();

    const newUser = {
      id: generatedId,
      name,
      email: emailLowerCase,
      password: hashedPassword,
      type,
    };
    users.push(newUser);
    fs.writeFileSync("users.json", JSON.stringify(users));
    res.setHeader("Content-Type", "application/json");
    return res.status(201).send("Registered successfully");
  } catch (error) {
    return res.status(500).send("An unexpected error occurred");
  }
});

app.get(`/api/tusers/:token`, (req, res) => {
  const token = req.params.token;
  try {
    jwt.verify(token, TOKEN_KEY);
    const decoded = jwtDecode(token);
    const user = users.find((u) => u.id === decoded.id);
    if (!user) return res.status(404).json({ message: "User not found." });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(403).json({ message: "Invalid token." });
  }
});

// Endpoint to get a user by username
app.get("/api/users/:username", (req, res) => {
  // Extract the username from the request parameters
  const username = req.params.username;

  const user = users.find((u) => u.name === username);
  if (!user) return res.status(404).json({ message: "User not found" });

  // If user is found, return the user object
  res.json(user);
});

// Middleware to verify JWT token from headers
const verifyTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }
  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.email = decoded.email; // Attach decoded email to request object
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

app.patch(`/api/email-username-update`, verifyTokenMiddleware, (req, res) => {
  const { username, email } = req.body;
  const existingEmail = users.find((user) => user.email === email);
  if (existingEmail) return res.status(403).send("Email already taken.");

  const user = users.find((user) => user.email === req.email);
  if (!user) return res.status(404).json("User not found");
  if (username) user.name = username;
  if (email) user.email = email;
  res.json({ message: "User updated successfully", user });
});

app.patch(`/api/password-update`, verifyTokenMiddleware, (req, res) => {
  const { password } = req.body;
  console.log("PASS: ", password);
  const user = users.find((user) => user.email === req.email);
  if (!user) return res.status(404).send("User not found.");
  const hashedPassword = bcrypt.hashSync(password, 10);
  user.password = hashedPassword;
  return res.send("Password updated successfully");
});

const verifyToken = (req, res) => {
  const token = req.headers.authorization;
  // 401 - Unauthorized: Lacks valid authentication.
  if (!token)
    return res
      .status(401)
      .json({ message: "No token was provided.", isValid: false });
  try {
    jwt.verify(token, TOKEN_KEY);
    return res.status(200).json({ message: "Token is valid.", isValid: true });
  } catch (err) {
    // 403 - Forbidden: Request understood, but the server doesn't authorize it.
    return res.status(403).json({ message: "Invalid token.", isValid: false });
  }
};
app.get("/api/check-valid-token", verifyToken);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
