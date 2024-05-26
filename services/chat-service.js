const socketIo = require("socket.io");
const { Server } = require("socket.io")
require("dotenv").config();

const initializeChat = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://192.168.100.171:5173',
      methods: ['GET', 'POST'],
    }
  })

  io.on("connection", (socket) => {
    // console.log("A user connected", socket.id);

    socket.on("joinRoom", (data) => {
      console.log("from join room", data);
      socket.join(data);
    })

    socket.on("sendMessage", (data) => {
      // Save the message to the database (PostgreSQL)
      // Emit the message to other users
      console.log("Sent message:", data.messageInput, '\n');
      socket.broadcast.emit("receiveMessage", data);
      //to(data.room)
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });


};

module.exports = initializeChat;
