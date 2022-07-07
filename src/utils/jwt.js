const JWT = require('jsonwebtoken');

const config = require('../config');

function encodeJwt(payload) {
  return JWT.sign(payload, config.jwtKey);
}

function decodeJwt(token) {
  return JWT.verify(token, config.jwtKey);
}

module.exports = { encodeJwt, decodeJwt };
