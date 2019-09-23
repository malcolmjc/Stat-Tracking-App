'use strict';

const Game = require('../../model/game').model;
const Group = require('../../model/group').model;
const User = require('../../model/user');

const addToUser = (req, res, next) => {
  const game = new Game({
    date: req.body.date,
    playerGames: req.body.playerGames
  });
  console.log('adding game to user');
  User.findById(req.body.userId, 'stats games').then((user) => {
    user.games.push(game);
    // update users stats if they played
    const usersGame = req.body.playerGames.find((game) => {
      return game.name === req.body.name;
    });
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
    }).catch((error) => {
      res.status(500).json({
        message: 'Something went wrong',
        error: error
      });
    });
  });
};

const addToGroup = (req, res, next) => {
  const game = new Game({
    date: req.body.date,
    playerGames: req.body.playerGames
  });
  console.log('adding game to group');
  const group = res.locals.group;
  group.games.push(game);
  game.playerGames.forEach((playerGame) => {
    // update group stats
    const groupMemberStats = group.memberStats.find((memberStat) => {
      return memberStat.username === playerGame.playerName;
    });
    groupMemberStats.catches += playerGame.catches;
    groupMemberStats.sinkers += playerGame.sinkers;
    groupMemberStats.drops += playerGame.drops;
    groupMemberStats.points += playerGame.points;
    groupMemberStats.fifas += playerGame.fifas;
    playerGame.won ? groupMemberStats.gamesWon++
      : groupMemberStats.gamesLost++;
  });
  group.save().then((group) => {
    let updatedCount = 0;
    game.playerGames.forEach((playerGame) => {
      // Update user's individual stats
      User.findOne({
        username: playerGame.playerName
      }, 'stats').then((user) => {
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
        }).catch((error) => {
          res.status(500).json({
            message: 'Something went wrong saving user',
            error: error
          });
        });
      });
    });
  }).catch((error) => {
    res.status(500).json({
      message: 'Something went wrong saving group',
      error: error
    });
  });
};

const getGames = (req, res, next) => {
  if (!req.body.groupId) { // get all games for user
    console.log('getting games for user');
    User.findById(req.body.userId, 'games groups username').then((user) => {
      const resGames = user.games ? user.games : [];
      if (user.groups && user.groups.length > 0) {
        let requests = 0;
        user.groups.forEach((groupId) => {
          Group.findById(groupId, 'games').then((group) => {
            if (group.games) {
              group.games.forEach((game) => {
                if (game.playerGames && game.playerGames.some((pGame) => {
                  return pGame.playerName === user.username;
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
    }).catch((error) => {
      res.status(500).json({
        message: 'Something went wrong getting games for user',
        error: error
      });
    });
  } else {
    console.log('getting games for group');
    Group.findById(req.body.groupId, 'games').then((group) => {
      res.status(200).json({
        message: 'games fetched for group',
        games: group.games
      });
    }).catch((error) => {
      res.status(500).json({
        message: 'Something went wrong getting games for group',
        error: error
      });
    });
  }
};

module.exports = {
  addToUser: addToUser,
  addToGroup: addToGroup,
  getGames: getGames
};
