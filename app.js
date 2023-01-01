const express = require('express');
const morgan = require('morgan');
// const userRouter = require("./routers/users.js")
const userRouter = require('./routers/users');
// const todoRouter = require('./routers/todos');

const app = express();

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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Listening to server ${PORT} `);
});
