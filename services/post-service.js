const postgres = require('../postgres');

const getAllPosts = async () => {
    try {
        return await postgres('posts').select('*');
    }
    catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
}

const getPost = async (id) => {
    try {
        return (await postgres('posts').where({ id: id }).first())
    }
    catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
}

module.exports = {
    getAllPosts,
    getPost
}