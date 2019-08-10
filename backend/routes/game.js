const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const checkGroup = require("../middleware/check-belongs-to-group");

const Game = require("../model/game").model;
const Group = require("../model/group").model
const User = require("../model/user");

router.post(
  '/addToUser',
  checkAuth,
  (req, res, next) => {
    const game = new Game({
      date: req.body.date,
      playerGames: req.body.playerGames,
    });
    console.log('adding game to user');
    User.findById(req.body.userId, 'stats games').then((user) => {
      user.games.push(game);
      // update users stats if they played
      const usersGame = req.body.playerGames.find((game) => game.name === req.body.name);
      if (usersGame) {
        user.stats.catches += usersGame.catches;
        user.stats.sinkers += usersGame.sinkers;
        user.stats.drops += usersGame.drops;
        user.stats.points += usersGame.points;
        user.stats.fifas += usersGame.fifas;
        usersGame.won ? user.stats.gamesWon++ : user.stats.gamesLost++;
      }

      user.save().then((user) => {
        res.status(201).json({
            message: 'game added to user',
            id: game._id
        });
      });
    });
  });

router.post(
  '/addToGroup',
  checkAuth,
  checkGroup,
  (req, res, next) => {
    const game = new Game({
      date: req.body.date,
      playerGames: req.body.playerGames,
    });
    console.log('adding game to group');
    const group = res.locals.group;
    group.games.push(game);
    game.playerGames.forEach((playerGame) => {
      // update group stats
      // console.log(playerGame.playerName);
      // console.log(group.memberStats);
      const groupMemberStats = group.memberStats.find((memberStat) => {
        return memberStat.username === playerGame.playerName
      });
      groupMemberStats.catches += playerGame.catches;
      groupMemberStats.sinkers += playerGame.sinkers;
      groupMemberStats.drops += playerGame.drops;
      groupMemberStats.points += playerGame.points;
      groupMemberStats.fifas += playerGame.fifas;
      playerGame.won ? groupMemberStats.gamesWon++ : groupMemberStats.gamesLost++;
    });
    group.save().then((group) => {
      let updatedCount = 0;
      game.playerGames.forEach((playerGame) => {
        // Update user's individual stats
        User.findOne({ username: playerGame.playerName }, 'stats').then((user) => {
          user.stats.catches += playerGame.catches;
          user.stats.sinkers += playerGame.sinkers;
          user.stats.drops += playerGame.drops;
          user.stats.points += playerGame.points;
          user.stats.fifas += playerGame.fifas;
          playerGame.won ? user.stats.gamesWon++ : user.stats.gamesLost++;
          user.save().then(() => {
            updatedCount++;
            if (updatedCount === game.playerGames.length) {
              res.status(201).json({
                message: 'game added to group',
                id: game._id
              });
            }
          });
        })
      });
    });
  });

// TODO, make this get request - query param with userId
router.post(
  '/get',
  checkAuth,
  (req, res, next) => {
    if (!req.body.groupId) { // get all games for user
      console.log('getting games for user');
      User.findById(req.body.userId, 'games groups username').then((user) => {
        const resGames = user.games ? user.games : [];
        if (user.groups) {
          requests = 0;
          user.groups.forEach((groupId) => {
            Group.findById(groupId, 'games').then((group) => {
              if (group.games) {
                group.games.forEach((game) => {
                  if (game.playerGames && game.playerGames.some((playerGame) => {
                    return playerGame.playerName === user.username;
                  })) {
                    resGames.push(game);
                  }
                });
              }
              if (++requests === user.groups.length) {
                res.status(200).json({
                  message: 'games fetched for user and their groups',
                  games: resGames
                });
              }
            });
          });
        } else {
          res.status(200).json({
            message: 'games fetched only for users games',
            games: resGames
          });
        }
      });
    } else {
      console.log('getting games for group');
      Group.findById(req.body.groupId, 'games').then((group) => {
        res.status(200).json({
          message: 'games fetched for group',
          games: group.games
        });
      });
    }
  });

// GAME DELETION DISABLED FOR NOW
// router.delete(
//   '/:userId/:gameId',
//   checkAuth,
//   (req, res, next) => {
//     console.log('deleting game');
//     User.findById(req.params.userId, 'games').then((user) => {
//       user.games.id(req.params.gameId).remove();
//       user.save().then((user) => {
//         res.status(200).json({
//           message: 'game deleted'
//         });
//       });
//     });
//   });

module.exports = router;
