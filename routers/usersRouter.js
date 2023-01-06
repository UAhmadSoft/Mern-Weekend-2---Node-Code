const express = require('express');
const User = require('../models/userModel');

const router = express.Router();

// * Get ALl Users
router.get('/', async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    users,
  });
});

// * Get Single User
// ! users/123/ali
router.delete('/:id', async (req, res) => {
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
});
router.get('/:id', async (req, res) => {
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
});

// Create
router.post('/', async (req, res) => {
  // new user
  console.log('req.body', req.body);

  const user = await User.create({
    ...req.body,
  });
  // const user = await User.create({
  //   fistName : req.body.fistName
  // })

  res.status(201).json({
    status: 'success',
    user,
  });
});

// Update
router.patch('/:id', async (req, res) => {
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
});

module.exports = router;
