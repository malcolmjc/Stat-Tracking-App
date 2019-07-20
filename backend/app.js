const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Game = require('./model/game').model;

const userRoutes = require("./routes/user");

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

const checkAuth = require("./middleware/check-auth");
const User = require("./model/user");
app.post(
  '/api/games/add',
  checkAuth,
  (req, res, next) => {
    console.log('adding game');
    User.findById(req.body.userId, 'stats games').then((user) => {
      const game = new Game({
        date: req.body.date,
        playerGames: req.body.playerGames,
        winners: req.body.winners,
        losers: req.body.losers,
        score: req.body.score
      });
      user.games.push(game);
      // TODO: update stats
      user.save().then((data) => {
        res.status(201).json({
           message: 'game added',
           id: game._id
        });
      });
    });
});

app.post(
  '/api/games/get',
  checkAuth,
  (req, res, next) => {
    console.log('getting games');
    User.findById(req.body.userId, 'games')
      .then(user => {
        res.status(200).json({
          message: 'games fetched',
          games: user.games
        });
      });
  });

app.delete(
  '/api/games/:userId/:gameId',
  checkAuth,
  (req, res, next) => {
    User.findById(req.params.userId, 'games').then((user) => {
      user.games.id(req.params.gameId).remove();
      user.save().then((user) => {
        res.status(200).json({
          message: 'game deleted'
        });
      });
    });
  });

app.use('/api/user', userRoutes);

module.exports = app;
