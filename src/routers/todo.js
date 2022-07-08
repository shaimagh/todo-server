const { Router } = require('express');
const { TodoController } = require('../controllers');

const TodoRouter = Router();

TodoRouter.get('/', TodoController.getTodos);
TodoRouter.post('/', TodoController.createTodo);
TodoRouter.put('/:id', TodoController.updateTodo);
TodoRouter.delete('/:id', TodoController.deleteTodo);

module.exports = TodoRouter;
