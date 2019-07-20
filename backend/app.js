const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Game = require('./model/game').model;

const userRoutes = require("./routes/user");
const gameRoutes = require("./routes/game");

mongoose.connect(
  'mongodb+srv://malcolmjc:uR2P7vVIrtlVhwVr@cluster0-85oau.mongodb.net/dye-stats',
  { useNewUrlParser: true })
  .then(() => {
    console.log('connected to database');
  })
  .catch(() => {
    console.log('connection to database failed');
  });

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
   'Origin, X-Requested-With, Content-Type, Accept, Authorization, Authentication');

  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/user', userRoutes);
app.use('/api/games', gameRoutes);

module.exports = app;
