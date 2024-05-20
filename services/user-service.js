// models/userModel.js
const postgres = require('../postgres');

const getAllUsers = async () => {
    try {
        return (await postgres().select('*')).from('users');
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
};

const createUser = async (userData) => {
    const [newUser] = await postgres('users').insert(userData).returning('*');
    return newUser;
};

module.exports = {
    getAllUsers,
    createUser,
};
