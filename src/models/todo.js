const { model, Schema } = require('mongoose');

const todoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users'
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    date: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('todos', todoSchema);
