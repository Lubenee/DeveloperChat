const express = require("express");
const bcrypt = require("bcrypt");
const postgres = require("../postgres");
const jwtDecode = require("jwt-decode");
const jwt = require("jsonwebtoken");

const SALT = parseInt(process.env.BCRYPT_SALT)
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

const { getAllUsers, verifyToken } = require("../services/user-service");

// Login endpoint, returns a JWT token
// JWT SIGNATURE:
// {
//   id: string,
//   email: string,
//   name: string,
//   type: userType,
// }

router.get("/", async (req, res) => {
    const users = await getAllUsers();
    res.status(200).json({ users });
});

// Register endpoint, returns a message and a status
router.post(`/register`, async (req, res) => {
    try {
        const { name, email, password, type } = req.body;

        //todo - use dotenv variable
        const salt = bcrypt.genSaltSync(SALT);
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

router.post(`/login`, async (req, res) => {
    const { email, password } = req.body;

    try {
        //.first(): This limits the result to the first matching record and returns it.
        const userLogin = await postgres("login").where({ email: email.toLowerCase() }).first();

        if (!userLogin || !bcrypt.compareSync(password, userLogin.hash))
            return res.status(400).send("Invalid email or password.");

        const user = await postgres("users").where({ id: userLogin.user_id });
        const token = jwt.sign(
            { id: user[0].id, email: user[0].email, name: user[0].name, type: user[0].type },
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

router.get(`/check-valid-token`, (req, res) => {
    const token = req.headers.authorization;
    if (verifyToken(token)) return res.status(200).send(true);
    return res.status(403).send(false);
});

router.get(`/:token`, async (req, res) => {
    const token = req.headers.authorization;
    if (!verifyToken(token))
        return res.status(403).json({ message: "Forbidden: Invalid token" });
    const decoded = jwtDecode(token);
    const user = await postgres('users').where({ id: decoded.id }).first();
    if (!user) return res.status(404).json({ message: "User not found." });
    return res.status(200).json(user);
});

router.patch(`/email-username-update`, async (req, res) => {
    const { email, username } = req.body;
    const token = req.headers.authorization;
    if (!verifyToken(token))
        return res.status(403).json({ message: "Forbidden: Invalid token" });
    const decoded = jwtDecode(token);

    try {

        const userToUpdate = await postgres('users').where({ id: decoded.id }).first();
        if (!userToUpdate) return res.status(404).json("User not found.");

        if (userToUpdate.email == email && userToUpdate.name == username)
            return res.status(200).send("User already has those credentials.");

        //See if the email is available
        if (email != userToUpdate.email) {
            const isEmailTaken = await postgres('users').where({ email });
            if (isEmailTaken)
                return res.status(403).send("Email already taken.");
        }

        await postgres('users').where({ id: decoded.id }).update({ name: username, email: email });
        return res.status(200).send("Updated successfully.");
    }
    catch (err) {
        console.error("Error updating username & email", err);
        return res.status(500).send("Server error.");
    }
});

router.patch(`/password-update`, async (req, res) => {
    const token = req.headers.authorization;
    if (!verifyToken(token))
        return res.status(403).json({ message: "Forbidden: Invalid token" });
    const decoded = jwtDecode(token);

    const { password } = req.body;

    try {
        const user = await postgres('login').where({ user_id: decoded.id }).first();
        if (!user) return res.status(404).send('User not found.');

        const hashedPassword = bcrypt.hashSync(password, SALT);

        await postgres('login')
            .where({ user_id: decoded.id })
            .update({ hash: hashedPassword });

        return res.send('Password updated successfully');
    } catch (err) {
        console.error('Error updating password', err);
        return res.status(500).send('Server error.');
    }
});

router.get(`/:username`, async (req, res) => {
    const username = req.params.username;

    try {
        const user = await postgres('users').where({ name: username });
        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json(user);
    }
    catch (err) {
        console.error("Error fetching user", err);
    }

});

module.exports = router;
