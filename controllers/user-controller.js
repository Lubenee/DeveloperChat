const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { getAllUsers, verifyToken } = require("../services/user-service");
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const postgres = require("../postgres");
const { default: jwtDecode } = require("jwt-decode");

// Login endpoint, returns a JWT token
// JWT SIGNATURE:
// {
//   id: string,
//   email: string,
//   name: string,
// }

router.get("/", async (req, res) => {
    console.log(await getAllUsers());
    res.status(200).json({ message: " implemented" });
});

// Register endpoint, returns a message and a status
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, type } = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const insertedUsers = await postgres("users")
            .insert({ name, type, email: email.toLowerCase(), joined: new Date() })
            .returning("id");
        const userId = insertedUsers[0].id;

        await postgres("login").insert({
            user_id: userId,
            hash: hashedPassword,
            email: email.toLowerCase(),
        });

        return res.status(201).send("User added successfully");
    } catch (err) {
        console.error(err);
        if (err.code === "23505") {
            // Unique violation
            res.status(400).send("Email already exists.");
        } else {
            res.status(500).send("Server error.");
        }
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        //.first(): This limits the result to the first matching record and returns it.
        const userLogin = await postgres("login").where({ email }).first();

        if (!userLogin || !bcrypt.compareSync(password, userLogin.hash))
            res.status(400).send("Invalid email or password.");
        const token = jwt.sign(
            { id: userLogin.id, email: userLogin.email, name: userLogin.name },
            JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );
        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error.");
    }
});

app.get(`/check-valid-token`, (req, res) => {
    const token = req.headers.authorization;
    if (verifyToken(token)) return res.status(200).send(true);
    return res.status(403).json({ message: "Forbidden: Invalid token" });
});

app.get(`/api/tusers/:token`, (req, res) => {
    const token = req.headers.authorization;
    if (!validToken(token))
        return res.status(403).json({ message: "Forbidden: Invalid token" });
    const decoded = jwtDecode(token);
    const user = await postgres('users').where({ decoded.email });
    if (!user) return res.status(404).json({ message: "User not found." });
    return res.status(200).json(user);
});

module.exports = router;
