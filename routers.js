// routers.js
const express = require('express');
const userRoutes = require('./controllers/user-controller');

const router = express.Router();

router.use('/user', userRoutes);

module.exports = router;
