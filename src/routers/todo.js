const { Router } = require('express');
const { body, param } = require('express-validator');

const { TodoController } = require('../controllers');
const { isObjectId, validateRequestInput } = require('../utils/validator');

const TodoRouter = Router();

TodoRouter.get('/', TodoController.getTodos);
TodoRouter.post(
  '/',
  body('title').exists().isString(),
  body('description').isString(),
  body('date').isDate({ format: 'dd-mm-yyyy' }),
  validateRequestInput,
  TodoController.createTodo
);
TodoRouter.put(
  '/:id',
  param('id').custom(isObjectId),
  body('title').exists().isString(),
  body('description').isString(),
  body('date').isDate({ format: 'dd-mm-yyyy' }),
  validateRequestInput,
  TodoController.updateTodo
);
TodoRouter.delete(
  '/:id',
  param('id').custom(isObjectId),
  validateRequestInput,
  TodoController.deleteTodo
);

module.exports = TodoRouter;
