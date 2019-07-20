const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const Game = require("../model/game").model;
const User = require("../model/user");

router.post(
  '/add',
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

router.post(
  '/get',
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

router.delete(
  '/:userId/:gameId',
  checkAuth,
  (req, res, next) => {
    console.log('deleting game');
    User.findById(req.params.userId, 'games').then((user) => {
      user.games.id(req.params.gameId).remove();
      user.save().then((user) => {
        res.status(200).json({
          message: 'game deleted'
        });
      });
    });
  });

module.exports = router;
