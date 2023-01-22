const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./userModel');

const teacherSchema = new mongoose.Schema(
  {
    department: String,
    salary: Number,
    qualification: String,
    experience: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const teacherModel = User.discriminator('Teacher', teacherSchema);
module.exports = teacherModel;
