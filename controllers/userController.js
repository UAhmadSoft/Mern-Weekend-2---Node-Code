const User = require('../models/userModel');
// const bcrypt = require('../node_modules/bcrypt') Wrong Method
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllUsers = catchAsync(async (req, res) => {
  let query = User.find(); //! return query

  // ! 1 Sorting .sort("-createdAt firstName")
  console.log('req.query.sort', req.query.sort);

  // ! "firstName,-age"
  // ! ["firstName" , "-age"]
  // ! "firstName -age"
  if (req.query.sort) {
    const sortQuery = req.query.sort.split(',').join(' ');
    console.log('sortQuery', sortQuery);
    query = query.sort(sortQuery);
  }

  // ! Fields Limitings - .select("firstName lastName")
  if (req.query.fields) {
    const fieldsQuery = req.query.fields.split(',').join(' ');
    console.log('fieldsQuery', fieldsQuery);
    query = query.select(fieldsQuery);
  }
  // ! Pagination - .skip(10).limit(5)
  // ! 10 users per page , page no 2
  // ! skip( (page - 1) * limit).limit(20)
  // ! page = 2 , limit = 5
  if (req.query.page) {
    const page = req.query.page;
    const limit = req.query.limit;

    query = query.skip((page - 1) * limit).limit(limit);
  }

  console.log('req.query.role', req.query.role);
  if (req.query.role) {
    console.log('query');
    query = query.find({
      role: req.query.role,
    });
  }

  const users = await query;

  res.status(200).json({
    status: 'success',
    results: users.length,
    users,
  });
});

exports.deleteUsers = catchAsync(async (req, res, next) => {
  const users = await User.deleteMany();

  res.status(200).json({
    staus: 'success',
    // user  : user ,
    users,
  });

  // console.log(req.params);
});
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  console.log('id', id);

  // const user = await User.findOneAndDelete({
  //   email : 'umad1@gmail.com'
  // });
  // const user = await User.findOne({
  //   _id: id,
  // });
  const user = await User.findByIdAndDelete(id);

  // if(user === null)
  if (!user) {
    return next(new AppError(`Cant find user with id ${id}`, 404, true));
  }

  res.status(200).json({
    staus: 'success',
    // user  : user ,
    user,
  });

  // console.log(req.params);
});

exports.getUser = catchAsync(async (req, res, next) => {
  console.log('getUsr');
  const { id } = req.params;

  console.log('id', id);

  // const user = await User.findOne({
  //   email : 'umad1@gmail.com'
  // });
  // const user = await User.findOne({
  //   _id: id,
  // });
  const user = await User.findById(id);

  // if(user === null)
  if (!user) {
    return next(new AppError(`Can't find user with id ${id}`, 404, true));
  }

  res.status(200).json({
    staus: 'success',
    // user  : user ,
    user,
  });

  // console.log(req.params);
});

exports.login = catchAsync(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email }).select(
    '+password -__v'
  );

  if (!user)
    return next(
      new AppError(`No user found against email ${req.body.email}`, 404, true)
    );

  const isMatched = await user.comparePassword(
    req.body.password,
    user.password
  );

  if (!isMatched) return next(new AppError('Password Not Correct', 401));

  // * Create token
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '2d',
    }
  );

  console.log('token', token);

  res.status(200).json({
    status: 'success',
    user,
    token,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  // new user
  console.log('req.body', req.body);

  // * Run Validations
  let user = await User.create({
    ...req.body,
  });

  // bcrypt.hash(myPlaintextPassword, 11, function (err, hash) {
  //   // Store hash in your password DB.
  // });
  // bcrypt.hash(myPlaintextPassword, 11, function (err, hash) {
  //   // Store hash in your password DB.
  // });

  // const user = await User.create({
  //   fistName : req.body.fistName
  // })

  // catch(err) {
  //   next(err)
  // }

  res.status(201).json({
    status: 'success',
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // const user = await User.findOneAndUpdate({
  //   _id : id
  // }, {
  //   ...req.body
  // }, {
  //   new : true,
  // runValidators : false
  // })
  const user = await User.findByIdAndUpdate(
    id,
    {
      ...req.body,
    },
    {
      new: true,
      // runValidators : false
    }
  );

  if (!user) return next(new AppError(`Cant find user with id ${id}`, 404));

  res.status(202).json({
    status: 'success',
    user,
  });
});
