require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config');
const { UserRouter } = require('./routers');

async function startServer() {
  await mongoose.connect(config.mongodbUri);
  console.log('Connected to database');

  const app = express();

  app.use(bodyParser.json());
  app.use('/auth', UserRouter);

  app.listen(config.port, () =>
    console.log('Server is running at port %d', config.port)
  );
}

startServer();
