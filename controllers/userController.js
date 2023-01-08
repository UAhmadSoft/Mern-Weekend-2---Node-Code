const User = require('../models/userModel');
// const bcrypt = require('../node_modules/bcrypt') Wrong Method

exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    users,
  });
};

exports.deleteUser = async (req, res) => {
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
    return res.status(404).json({
      staus: 'failed',
      message: `No user found against id ${id}`,
    });
  }

  res.status(200).json({
    staus: 'success',
    // user  : user ,
    user,
  });

  // console.log(req.params);
};

exports.getUser = async (req, res) => {
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
    return res.status(404).json({
      staus: 'failed',
      message: `No user found against id ${id}`,
    });
  }

  res.status(200).json({
    staus: 'success',
    // user  : user ,
    user,
  });

  // console.log(req.params);
};

exports.createUser = async (req, res) => {
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

  res.status(201).json({
    status: 'success',
    user,
  });
};

exports.updateUser = async (req, res) => {
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

  res.status(202).json({
    status: 'success',
    user,
  });
};
