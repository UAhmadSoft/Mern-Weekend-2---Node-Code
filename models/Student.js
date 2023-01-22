const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./userModel');

const studentSchema = new mongoose.Schema(
  {
    degree: String,
    marks: Number,
    fees: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const studentModel = User.discriminator('Student', studentSchema);
module.exports = studentModel;
