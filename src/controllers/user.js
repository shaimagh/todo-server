const HttpStatus = require('http-status-codes');
const { validationResult } = require('express-validator');

const { UserModel } = require('../models');
const { encodeJwt } = require('../utils/jwt');

async function login(req, res, next) {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
  }

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

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

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
