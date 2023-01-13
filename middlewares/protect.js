const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log('token', token);

    if (!token) return next(new AppError('You must login first', 401));

    // const jwtPayload =  jwt.verify(token , process.env.JWT_SECRET)
    // * promisfy is converting callback return to promise return so
    // * that we can use async/await

    const jwtPayload = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    console.log('jwtPayload', jwtPayload);

    const user = await User.findById(jwtPayload.id);

    if (!user)
      return next(
        new AppError(`No user found agains id ${jwtPayload.id}`, 401)
      );

    req.user = user;
  } catch (err) {
    return next(new AppError(err.message || 'YOu must login first', 401));
  }

  next();
};

module.exports = protect;
