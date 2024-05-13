const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const http = require("http");
require("dotenv").config();

const { v4: uuidv4 } = require("uuid"); // Import v4 function from uuid package for ID generation
const initializeChat = require("./services/chatService");

const app = express();
const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.SERVER_PORT;
const server = http.createServer(app);

initializeChat(server);

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
      JWT_SECRET,
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
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.body.tokenData = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

app.get(`/api/tusers/:token`, verifyToken, (req, res) => {
  const { tokenData } = req.body;
  const user = users.find((u) => u.id === tokenData.id);
  if (!user) return res.status(404).json({ message: "User not found." });
  return res.status(200).json(user);
});

app.patch(`/api/email-username-update`, verifyToken, (req, res) => {
  const { tokenData, email, username } = req.body;

  //Find the correct user
  const userToUpdate = users.find((user) => user.id === tokenData.id);
  if (!userToUpdate) return res.status(404).json("User not found.");

  //See if the email is available
  const isEmailTaken = users.some(
    (user) => user.email === email && user.id !== userToUpdate.id
  );
  if (isEmailTaken) {
    return res.status(403).send("Email already taken.");
  }

  // Update the data
  if (username) userToUpdate.name = username;
  if (email) userToUpdate.email = email;

  return res.status(200).send("Updated successfully.");
});

app.patch(`/api/password-update`, verifyToken, (req, res) => {
  const { password, tokenData } = req.body;
  const user = users.find((user) => user.id === tokenData.id);
  if (!user) return res.status(404).send("User not found.");
  const hashedPassword = bcrypt.hashSync(password, 10);
  user.password = hashedPassword;
  return res.send("Password updated successfully");
});

app.get(`/api/check-valid-token`, verifyToken, (req, res) => {
  return res.status(200).send(true);
});

app.listen(port, () => {
  console.log(`Developer Chat Server listening at http://localhost:${port}`);
});
