const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    // required: true,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    maxlength: [20, 'must be less than or equal to 20'],
    minlength: [8, 'must be greater than 8'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    maxlength: [20, 'must be less than or equal to 20'],
    minlength: [8, 'must be greater than 8'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
    select: false,
  },
  age: Number,
  isActivated: {
    type: Boolean,
    // default  : false
    default: true, // for testing
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const userModel = new mongoose.model('User', userSchema);
module.exports = userModel;
