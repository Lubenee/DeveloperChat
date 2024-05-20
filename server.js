// index.js
const express = require('express');
const routers = require('./routers');
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routers);

app.listen(PORT, () => {
  console.log(`DeveloperChat server is running on port ${PORT}`);
});













// const bodyParser = require("body-parser");
// const http = require("http");

// const initializeChat = require("./services/chat-service");

// const httpServer = http.createServer(app);

// initializeChat(httpServer);

// // Endpoint to get a user by username
// app.get("/api/users/:username", (req, res) => {
//   // Extract the username from the request parameters
//   const username = req.params.username;

//   const user = users.find((u) => u.name === username);
//   if (!user) return res.status(404).json({ message: "User not found" });

//   // If user is found, return the user object
//   res.json(user);
// });

// // Middleware to verify JWT token from headers
// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized: Missing token" });
//   }
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.body.tokenData = decoded;
//     next();
//   } catch (error) {
//     return res.status(403).json({ message: "Forbidden: Invalid token" });
//   }
// };

// app.get(`/api/tusers/:token`, verifyToken, (req, res) => {
//   const { tokenData } = req.body;
//   const user = users.find((u) => u.id === tokenData.id);
//   if (!user) return res.status(404).json({ message: "User not found." });
//   return res.status(200).json(user);
// });

// app.patch(`/api/email-username-update`, verifyToken, (req, res) => {
//   const { tokenData, email, username } = req.body;

//   //Find the correct user
//   const userToUpdate = users.find((user) => user.id === tokenData.id);
//   if (!userToUpdate) return res.status(404).json("User not found.");

//   //See if the email is available
//   const isEmailTaken = users.some(
//     (user) => user.email === email && user.id !== userToUpdate.id
//   );
//   if (isEmailTaken) {
//     return res.status(403).send("Email already taken.");
//   }

//   // Update the data
//   if (username) userToUpdate.name = username;
//   if (email) userToUpdate.email = email;

//   fs.writeFileSync("users.json", JSON.stringify(users));

//   return res.status(200).send("Updated successfully.");
// });

// app.patch(`/api/password-update`, verifyToken, (req, res) => {
//   const { password, tokenData } = req.body;
//   const user = users.find((user) => user.id === tokenData.id);
//   if (!user) return res.status(404).send("User not found.");
//   const hashedPassword = bcrypt.hashSync(password, 10);
//   user.password = hashedPassword;
//   fs.writeFileSync("users.json", JSON.stringify(users));
//   return res.send("Password updated successfully");
// });

// app.get(`/api/check-valid-token`, verifyToken, (req, res) => {
//   return res.status(200).send(true);
// });
