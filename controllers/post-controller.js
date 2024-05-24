const express = require("express");
const postgres = require("../postgres");
const router = express.Router();

const { getAllPosts } = require("../services/post-service");

router.get("/", async (req, res) => {
    const posts = await getAllPosts();
    res.status(200).json({ posts });
})

router.post("/create", async (req, res) => {
    const { title, company, description, date, location, image } = req.body;
    try {
        await postgres('posts').insert({ title, company, description, date, location, image_url: image });
        return res.status(201).send("Post created successfully");
    }
    catch (err) {
        console.log("Server Error", err);
        throw err;
    }
})

module.exports = router;