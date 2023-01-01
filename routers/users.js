const express = require('express');

const router = express.Router();

// Array of users with name,id and age
const users = [
  {
    id: 1,
    name: 'A',
    age: 20,
  },
  {
    id: 2,
    name: 'B',
    age: 21,
  },
  {
    id: 3,
    name: 'C',
    age: 22,
  },
];

// * Get ALl Users
router.get('/', (req, res) => {
  // res.send('Hello World');
  res.status(200).json({
    status: 'success',
    users,
  });
});

// * Get Single User
// ! users/123/ali
router.get('/:id', (req, res) => {
  const { id } = req.params;

  console.log('id', id);

  const user = users.find((el) => el.id === +id);

  res.status(200).json({
    staus: 'success',
    // user  : user ,
    user,
  });

  // console.log(req.params);
});

// Create
router.post('/', (req, res) => {
  // new user
  console.log('req.body', req.body);

  const newUser = {
    name: req.body.name,
    age: req.body.age,
    id: users.length,
  };

  res.status(201).json({
    status: 'success',
    user: newUser,
    users,
  });
});

// Update
router.patch('/:id', (req, res) => {
  const { id } = req.params;

  let user = users.find((el) => el.id === +id);

  user = {
    ...users,
    ...req.body,
  };

  res.status(200);
});

module.exports = router;
