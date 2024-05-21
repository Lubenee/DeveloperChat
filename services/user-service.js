// models/userModel.js
const postgres = require('../postgres');
const jwt = require('jsonwebtoken')

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
    } catch (error) {
        return false;
    }
    return true;
};

module.exports = {
    getAllUsers,
    verifyToken
};
