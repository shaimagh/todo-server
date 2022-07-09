const { isValidObjectId } = require('mongoose');
const { validationResult } = require('express-validator');
const HttpStatus = require('http-status-codes');

function isObjectId(objectId) {
  if (!isValidObjectId(objectId)) throw new Error('Invalid ObjectId');
  return true;
}

function validateRequestInput(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });

  next();
}

module.exports = { isObjectId, validateRequestInput };
