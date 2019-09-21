'use strict';

const User = require('../../model/user');

const getMembers = (req, res, next) => {
  res.status(200).json({
    message: 'found users that belong to group',
    users: res.locals.group.members
  });
};

const findUsers = (req, res, next) => {
  const search = req.params.search;
  if (!search) {
    return res.status(501).json({
      message: 'bad search',
      users: null
    });
  }

  if (search.includes('@')) {
    // searching by email, must be exact
    User.findOne({ email: search }, 'username').then((user) => {
      if (!user || user.length === 0) {
        res.status(404).json({
          message: 'no users found by email',
          users: null
        });
      } else {
        res.status(200).json({
          message: 'user found by email',
          users: [user.username]
        });
      }
    }).catch((error) => {
      console.error(error);
      res.status(500).json({
        message: 'something went wrong finding user by email',
        error: error
      });
    });
  } else {
    // searching by username
    User.find({ username: new RegExp(search) }, 'username').then((users) => {
      if (!users || users.length === 0) {
        res.status(404).json({
          message: 'no users found by username',
          users: null
        });
      } else {
        res.status(200).json({
          message: 'users found by username',
          users: users.map((user) => user.username)
        });
      }
    }).catch((error) => {
      res.status(500).json({
        message: 'something went wrong finding user by username',
        error: error
      });
    });
  }
};

module.exports = {
  authentication: require('./authentication'),
  getMembers: getMembers,
  findUsers: findUsers,
  notifications: require('./notifications'),
  profile: require('./profile'),
  stats: require('./stats')
};
