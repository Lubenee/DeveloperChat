const express = require("express");
const postgres = require("../postgres");
const router = express.Router();
const multer = require('multer');
const { DateTime } = require('luxon');


const { getAllPosts } = require("../services/post-service");
const { verifyToken } = require("../services/user-service");
const { default: jwtDecode } = require("jwt-decode");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage });

router.get("/", async (req, res) => {
    const posts = await getAllPosts();
    res.status(200).json({ posts });
})

router.post("/create", upload.single('image'), async (req, res) => {
    const { title, company, description, location } = req.body;

    if (req.file)
        console.log(req.file);
    const image_m = req.file ? req.file.filename : null;
    const date = new Date();

    if (!image_m)
        return res.status(400).send('Image file is required');

    const token = req.headers.authorization;
    if (!verifyToken(token))
        return res.status(403).send("Session expired. Please log in again.");
    const decoded = jwtDecode(token);

    try {
        await postgres('posts').insert({ title, company, description, date, location, image_url: image_m, user_id: decoded.id });
        return res.status(201).send("Post created successfully");
    }
    catch (err) {
        console.log("Server Error", err);
        throw err;
    }
})

module.exports = router;