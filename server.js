// index.js
const express = require('express');
const routers = require('./routers');
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routers);

app.listen(PORT, () => {
  console.log(`DeveloperChat server is running on port ${PORT}`);
});

