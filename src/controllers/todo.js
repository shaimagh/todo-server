const HttpStatus = require('http-status-codes');

const { TodoModel } = require('../models');

async function getTodos(req, res) {
  const query = { userId: req.user._id };

  const todos = await TodoModel.find(query).sort('-createdAt');

  res.end(JSON.stringify(todos));
}

async function createTodo(req, res, next) {
  try {
    const { title, description, date } = req.body;

    const todoDoc = { userId: req.user._id, title, description, date };

    const todo = await new TodoModel(todoDoc).save();

    res.end(JSON.stringify(todo));
  } catch (e) {
    next(e);
  }
}

async function updateTodo(req, res, next) {
  const _id = req.params.id;
  const { title, description, date } = req.body;

  try {
    const todo = await TodoModel.findOneAndUpdate(
      { _id, userId: req.user._id },
      { title, description, date },
      { new: true }
    );

    if (!todo) return res.sendStatus(HttpStatus.NOT_FOUND);

    res.end(JSON.stringify(todo));
  } catch (e) {
    next(e);
  }
}

async function deleteTodo(req, res, next) {
  try {
    const query = { _id: req.params.id, userId: req.user._id };

    const todo = await TodoModel.findOneAndRemove(query);

    if (!todo) {
      return res.sendStatus(HttpStatus.NOT_FOUND);
    }

    res.end(JSON.stringify(todo));
  } catch (e) {
    next(e);
  }
}

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
