const socketIo = require("socket.io");

const initializeChat = (server) => {
  const io = socketIo(server);
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("message", (data) => {
      // Save the message to the database (PostgreSQL)
      // Emit the message to other users
      socket.broadcast.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

module.exports = initializeChat;
