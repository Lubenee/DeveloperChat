// index.js
const express = require('express');
const routers = require('./routers');
const cors = require("cors");
const http = require('http');
const bodyParser = require("body-parser");
const initializeChat = require("./services/chat-service");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
initializeChat(server);

app.use('/api', routers);
app.use('/uploads', express.static('./uploads'));

server.listen(PORT, () => {
  console.log(`DeveloperChat server is running on port ${PORT}`);
});

