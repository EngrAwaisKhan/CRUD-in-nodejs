const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter.js');
const authRouter = require('./routes/authRouter.js');
const postRouter = require('./routes/postRouter.js');
const commentRouter = require('./routes/commentRouter.js');

dotenv.config();

const url = process.env.MONGODB_URI.replace(
  '<PASSWORD>',
  process.env.PASSWORD
).replace('<DATABASE>', process.env.DATABASE);

mongoose.set('strictQuery', false);
mongoose
  .connect(url)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

// Post Routes & Comment Routers
app.use('/api/posts',postRouter, commentRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
