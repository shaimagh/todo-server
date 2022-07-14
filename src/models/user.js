const { model, Schema } = require('mongoose');
const { genSaltSync, hashSync, compareSync } = require('bcryptjs');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minLength: 6
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', function (next) {
  if (this.isModified('password') && this.isNew) {
    const salt = genSaltSync(10);
    this.password = hashSync(this.password, salt);
  }

  next();
});

userSchema.methods.isValidPassword = function (password) {
  return compareSync(password, this.password);
};

module.exports = model('users', userSchema);
