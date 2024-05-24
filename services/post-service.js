const postgres = require('../postgres');
const { post } = require('../routers');

const getAllPosts = async () => {
    try {
        return await postgres('posts').select('*');
    }
    catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
}

module.exports = {
    getAllPosts,
}