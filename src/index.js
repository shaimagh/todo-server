const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const cors = require('cors');
const logger = require('morgan');

const { Strategy, ExtractJwt } = passportJwt;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv/config');
}

const config = require('./config');
const { UserRouter, TodoRouter } = require('./routers');
const { UserModel } = require('./models');

const jwtStrategyOpts = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.jwtKey
};

passport.use(
  new Strategy(jwtStrategyOpts, async function (payload, done) {
    try {
      const user = await UserModel.findById(payload._id);
      if (user) return done(null, user);

      return done(null, false);
    } catch (err) {
      done(err, false);
    }
  })
);

async function startServer() {
  await mongoose.connect(config.mongodbUri);
  console.log('Connected to database');

  const app = express();

  app.use(bodyParser.json());
  app.use(cors());
  app.use(logger('combined'));
  app.use('/auth', UserRouter);
  app.use(
    '/todos',
    passport.authenticate('jwt', { session: false }),
    TodoRouter
  );

  app.listen(config.port, () =>
    console.log('Server is running at port %d', config.port)
  );
}

startServer();
