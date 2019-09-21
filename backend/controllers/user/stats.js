'use strict';

const User = require('../../model/user');

const allTimeStats = (req, res, next) => {
  const foundUserStats = [];
  res.locals.group.members.forEach((username) => {
    User.findOne({ username: username }, 'stats').then((foundUser) => {
      foundUserStats.push({
        stats: foundUser.stats,
        username: username
      });
      if (foundUserStats.length === res.locals.group.members.length) {
        return res.status(200).json({
          message: 'retrieved stats for all users in group',
          users: foundUserStats
        });
      }
    }).catch((error) => {
      res.status(500).json({
        message: 'Something went wrong',
        error: error
      });
    });
  });
};

const groupStats = (req, res, next) => {
  const group = res.locals.group;
  return res.status(200).json({
    message: 'retrieved stats for all users in group',
    users: group.memberStats.map((stats) => {
      return {
        stats: stats,
        username: stats.username
      };
    })
  });
};

const userStats = (req, res, next) => {
  if (!req.params.userId) {
    return res.status(400).json({
      message: 'Requesting user stats without user id',
      user: null
    });
  }
  User.findById(req.params.userId, 'stats username').then((user) => {
    return res.status(200).json({
      message: 'retrieved stats for user',
      user: {
        stats: user.stats,
        username: user.username
      }
    });
  }).catch((error) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: error
    });
  });
};

module.exports = {
  allTimeStats: allTimeStats,
  groupStats: groupStats,
  userStats: userStats
};
