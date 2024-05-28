const express = require('express');
const userRoutes = require('./controllers/user-controller');
const postRoutes = require('./controllers/post-controller');
const chatRoutes = require('./controllers/chat-controller');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/chat', chatRoutes);

module.exports = router;
