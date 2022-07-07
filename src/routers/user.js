const { Router } = require('express');
const { body } = require('express-validator');

const { UserController } = require('../controllers');

const UserRouter = Router();

UserRouter.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  UserController.login
);

UserRouter.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  UserController.register
);

module.exports = UserRouter;
