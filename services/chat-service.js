const { Server } = require("socket.io")
const postgres = require("../postgres");
require("dotenv").config();

const initializeChat = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ['http://192.168.100.171:5173', 'http://localhost:5173'],
      methods: ['GET', 'POST'],
    }
  })

  io.on("connection", (socket) => {

    socket.on("joinRoom", (data) => {
      socket.join(data);
    })

    socket.on("sendMessage", async ({ messageObject, room }) => {
      console.log(messageObject);
      await postgres('messages').insert({
        chat_id: messageObject.chat_id,
        sender_id: messageObject.sender_id,
        receiver_id: messageObject.receiver_id,
        sent_at: new Date(messageObject.sent_at),
        message: messageObject.message
      });

      // console.log("Sent message:", message, "to", room, '\n');
      socket.to(room).emit("receiveMessage", messageObject);
    });

    socket.on("disconnect", () => {
      // console.log("A user disconnected");
    });
  });


};

module.exports = initializeChat;
