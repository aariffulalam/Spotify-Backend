const express = require('express');
const {PrismaClient} = require('@prisma/client')
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
  let user = await prisma.user.findMany()
  res.send({ message: 'Awesome it works 🐻' , users:user});
});

app.use('/', require('./routes/song.route'));
app.use('/', require('./routes/user.route'));
app.use('/', require('./routes/auth.route'));


app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
})

const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
