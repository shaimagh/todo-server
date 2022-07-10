const HttpStatus = require('http-status-codes');

const { UserModel } = require('../models');
const { encodeJwt } = require('../utils/jwt');

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const query = { email };
    const user = await UserModel.findOne(query);

    if (!user || !user.isValidPassword(password)) {
      return res.sendStatus(HttpStatus.NOT_FOUND);
    }

    const payload = { _id: user._id };

    const token = encodeJwt(payload);

    res.end(JSON.stringify({ token }));
  } catch (e) {
    next(e);
  }
}

async function register(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await new UserModel({ email, password }).save();

    const payload = { _id: user._id };

    const token = encodeJwt(payload);

    res.end(JSON.stringify({ token }));
  } catch (e) {
    if (e.code === 11000) {
      return res.sendStatus(HttpStatus.CONFLICT);
    }

    next(e);
  }
}

module.exports = { login, register };
