const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const { getAllUsers } = require('../services/user-service');
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");

// Login endpoint, returns a JWT token
// JWT SIGNATURE:
// {
//   id: string,
//   email: string,
//   name: string,
// }

router.get('/', async (req, res) => {
    console.log(await getAllUsers());
    res.status(200).json({ message: " implemented" });
});

// //TODO: Register must fail on a username that's unavailable, or an email that's already used
// // Register endpoint, returns a message and a status
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, type } = req.body;
        const emailLowerCase = email.toLowerCase();

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = {
            name,
            email: emailLowerCase,
            password: hashedPassword,
            type,
        };

        res.setHeader("Content-Type", "application/json");
        return res.status(201).send("Registered successfully");
    } catch (error) {
        return res.status(500).send("An unexpected error occurred");
    }
});


router.post('/login', async (req, res) => {
    //   const { email, password } = req.body;
    //   const emailLowerCase = email.toLowerCase();
    //   const user = users.find((u) => u.email === emailLowerCase);
    //   if (!user) return res.status(401).json({ message: "User not found" });

    //   // Compare the provided password with the hashed password stored in the user object
    //   bcrypt.compare(password, user.password, (err, result) => {
    //     // If there's an error or the password doesn't match, return 401 Unauthorized
    //     if (err || !result) {
    //       return res.status(401).json({ message: "Invalid email or password" });
    //     }

    //     // If authentication is successful, generate a JWT token
    //     const token = jwt.sign(
    //       { id: user.id, email: user.email, name: user.name },
    //       JWT_SECRET,
    //       {
    //         expiresIn: "1h",
    //       }
    //     );

    //     // Return the token in the response
    //     res.status(200).json({ token });
    //   });
});

module.exports = router;
