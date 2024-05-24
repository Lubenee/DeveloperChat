// models/userModel.js
const postgres = require('../postgres');
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;

const getAllUsers = async () => {
    try {
        return (await postgres('users').select('*'));
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
};

// Middleware to verify JWT token from headers
const verifyToken = (token) => {
    if (!token) return false;
    try {
        jwt.verify(token, JWT_SECRET);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports = {
    getAllUsers,
    verifyToken
};
