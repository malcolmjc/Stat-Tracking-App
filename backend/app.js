const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Game = require('./model/game');

mongoose.connect('mongodb+srv://malcolmjc:uR2P7vVIrtlVhwVr@cluster0-85oau.mongodb.net/node-angular?retryWrites=true')
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
   'Origin, X-Requested-With, Content-Type, Accept');

  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.post('/api/games', (req, res, next) => {
  const game = new Game({
    date: req.body.date,
    playerGames: req.body.playerGames,
    winners: req.body.winners,
    losers: req.body.losers,
    score: req.body.score
  });
  console.log(game);
  game.save().then((data) => {
    console.log('game added now');
    res.status(201).json({
       message: 'game added',
       id: data._id
    });
  });
});

app.get('/api/games', (req, res, next) => {
  Game.find()
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        message: 'games fetched',
        games: documents
      });
    });
});

app.delete('/api/games/:id', (req, res, next) => {
  Game.deleteOne({
    _id: req.params.id
  })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: 'game deleted'
      });
    });
});

module.exports = app;
