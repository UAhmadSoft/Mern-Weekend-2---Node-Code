const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log('token', token);

    if (!token)
      return res.status(401).json({
        status: 'failed',
        message: 'You must login first',
      });

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
      return res.status(404).json({
        status: 'failed',
        message: `No user found agains id ${jwtPayload.id}`,
      });

    req.user = user;
  } catch (err) {
    return res.status(401).json({
      status: 'failed',
      message: err.message || 'Unauthorizes',
    });
  }

  next();
};

module.exports = protect;
