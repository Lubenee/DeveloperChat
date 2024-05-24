const express = require('express');
const userRoutes = require('./controllers/user-controller');
const postRoutes = require('./controllers/post-controller')

const router = express.Router();

router.use('/user', userRoutes);
router.use('/post', postRoutes);

module.exports = router;
