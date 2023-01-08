require('dotenv').config({
  path: './config.env',
});

const mongoose = require('mongoose');

const express = require('express');
const morgan = require('morgan');
// const userRouter = require("./routers/users.js")
const userRouter = require('./routers/usersRouter');
// const todoRouter = require('./routers/todos');

const app = express();

console.log('process.env.DATABASE', process.env.DATABASE);

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

app.use('*', (req, res, next) => {
  console.log('Hello from middleware');

  next();
});

app.use(morgan('dev'));
app.use(express.json());

// 5000/users

app.use('/users', userRouter);
// app.use('/todos', todoRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'Not Found',
    messsage: `No Route for this url ${req.originalUrl}`,
  });
});

const PORT = process.env.PORT || 5000;

mongoose
  // .connect('mongodb://127.0.0.1:27017/test') for local mongodb
  .connect(process.env.DATABASE)
  .then(() => {
    console.log('Connected!');
    app.listen(PORT, () => {
      console.log(`Listening to server ${PORT} `);
    });
  })
  .catch((err) => {
    console.log('err', err);
  });
