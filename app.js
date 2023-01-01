const express = require('express');

const app = express();

app.use(express.json());

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
app.get('/users', (req, res) => {
  // res.send('Hello World');
  res.status(200).json({
    status: 'success',
    users,
  });
});

// * Get Single User
// ! /users/123/ali
app.get('/users/:id', (req, res) => {
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
app.post('/users', (req, res) => {
  // new user
  console.log('req.body', req.body);
  console.log('req.query', req.query);

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
app.patch('/users/:id', (req, res) => {
  const { id } = req.params;

  let user = users.find((el) => el.id === +id);

  user = {
    ...users,
    ...req.body,
  };

  res.status(200).json({
    staus: 'success',
    user,
  });
});
// Update
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  let user = users.find((el) => el.id === +id);

  res.status(200).json({
    staus: 'success',
    user,
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Listening to server ${PORT} `);
});
