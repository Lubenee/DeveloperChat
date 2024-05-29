const express = require("express");
const postgres = require("../postgres");
const router = express.Router();

const { verifyToken } = require("../services/user-service");
const { default: jwtDecode } = require("jwt-decode");

router.post('/', async (req, res) => {
    const token = req.headers.authorization;
    if (!verifyToken(token))
        return res.status(403).send("Session expired. Please log in again.");
    const decoded = jwtDecode(token);
    try {

        const chats = await postgres('chats')
            .select(
                'chats.*',
                'user1.name as user1_name',
                'user1.avatar as user1_avatar',
                'user2.name as user2_name',
                'user2.avatar as user2_avatar'
            )
            .leftJoin('users as user1', 'chats.user1_id', 'user1.id')
            .leftJoin('users as user2', 'chats.user2_id', 'user2.id')
            .where('chats.user1_id', decoded.id)
            .orWhere('chats.user2_id', decoded.id);

        return res.status(200).send(chats);
    }
    catch (err) {
        console.error("Server Error", err);
        throw err;
    }
})

router.post('/get-chat', async (req, res) => {
    // const token = req.headers.authorization;
    // if (!verifyToken(token))
    // return res.status(403).send("Session expired. Please log in again.");
    const { chatId } = req.body;
    try {
        const data = await postgres('chats')
            .select('chats.*', 'user1.name as user1_name', 'user2.name as user2_name')
            .join('users as user1', 'chats.user1_id', 'user1.id')
            .join('users as user2', 'chats.user2_id', 'user2.id')
            .where({ 'chats.id': chatId })
            .first();

        return res.status(200).send(data);
    }
    catch (err) {
        console.error(err);
        return res.status(400);
    }

})

router.post('/get-messages', async (req, res) => {
    const token = req.headers.authorization;
    if (!verifyToken(token))
        return res.status(403).send("Session expired. Please log in again.");
    const { chatId } = req.body;
    try {

        const data = await postgres('messages')
            .select('*')
            .where({ chat_id: chatId });

        const messages = data.map(mess => ({
            chatId: mess.chat_id,
            senderId: mess.sender_id,
            receiverId: mess.receiver_id,
            sentAt: mess.sent_at,
            message: mess.message
        }));

        return res.status(200).send(messages);
    }
    catch (err) {
        return res.status(400);
    }
})

module.exports = router;