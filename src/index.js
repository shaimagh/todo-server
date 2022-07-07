require('dotenv/config');
const express = require('express');

const config = require('./config');

const app = express();

app.listen(config.port, () =>
  console.log('Server is running at port %d', config.port)
);
