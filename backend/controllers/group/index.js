'use strict';

const Group = require('../../model/group').model;
const User = require('../../model/user');

const bcrypt = require('bcryptjs');

const validateGroupName = (groupName) => {
  return groupName && groupName.length >= 4 && /^[a-zA-Z\d ]*$/.test(groupName);
};

const validateGroupPassword = (groupPassword) => {
  return groupPassword && groupPassword.length >= 5;
};

const addGroup = (req, res, next) => {
  if (!validateGroupName(req.body.name)
    || !validateGroupPassword(req.body.password)) {
    return res.status(400).json({
      message: 'Invalid Group Name or Password'
    });
  }
  bcrypt.hash(req.body.password, 14).then(hash => {
    const group = new Group({
      name: req.body.name,
      password: hash,
      slogan: req.body.slogan,
      description: req.body.description,
      admin: req.body.admin,
      members: [req.body.admin],
      games: [],
      memberStats: [{ username: req.body.admin }]
    });

    group.save().then((group) => {
      res.status(200).json({
        message: 'Group created',
        groupId: group._id
      });
    }).catch((error) => {
      res.status(500).json({
        message: 'Something went wrong saving group',
        error: error
      });
    });
  }).catch((error) => {
    res.status(500).json({
      message: 'Something went wrong adding hashing password',
      error: error
    });
  });
};

const addToUser = (req, res, next) => {
  User.findById(req.body.userId, 'groups').then((user) => {
    user.groups.push(req.body.groupId);
    user.save().then((user) => {
      res.status(200).json({
        message: 'Group added to user'
      });
    }).catch((error) => {
      res.status(500).json({
        message: 'Something went wrong saving user',
        error: error
      });
    });
  });
};

const getUserGroups = (req, res, next) => {
  console.log('getting groups for user');
  User.findById(req.params.userId, 'groups').then((user) => {
    let groups = [];

    if (!user.groups || user.groups.length === 0) {
      res.status(200).json({
        message: 'user has no groups',
        groups: []
      });
    } else {
      const fields = req.params.fields.split('-').join(' ');
      user.groups.forEach((groupId) => {
        Group.findById(groupId, fields).then((group) => {
          groups.push(group);
          if (groups.length === user.groups.length) {
            res.status(200).json({
              message: 'groups retrieved',
              groups: groups
            });
          }
        }).catch((error) => {
          res.status(500).json({
            message: 'Something went group finding groups for user',
            error: error
          });
        });
      });
    }
  });
};

const getById = (req, res, next) => {
  const fields = req.params.fields.split('-').join(' ');
  Group.findById(req.params.groupId, fields).then((group) => {
    res.status(200).json({
      message: 'group found by id',
      group: group
    });
  }).catch((error) => {
    res.status(500).json({
      message: 'Something went wrong finding group',
      error: error
    });
  });
};

const findGroup = (req, res, next) => {
  const search = req.params.search;
  if (!search) {
    res.status(400).json({
      message: 'bad search',
      groups: null
    });
  } else {
    Group.find({ name: new RegExp(search, 'i') },
      'name slogan description members').then((groups) => {
      res.status(200).json({
        message: 'these groups found',
        groups: groups
      });
    }).catch((error) => {
      res.status(500).json({
        message: 'Something went wrong finding groups',
        error: error
      });
    });
  }
};

const joinGroup = (req, res, next) => {
  console.log('joining group');
  let foundGroup;
  Group.findById(req.body.groupId,
    'password members memberStats').then((group) => {
    foundGroup = group;
    if (req.body.password) {
      return bcrypt.compare(req.body.password, group.password);
    } else {
      return Promise.resolve(req.body.encryptedPassword === group.password);
    }
  }).then((result) => {
    if (!result) {
      return res.status(401).json({
        message: 'joining group failed - bad password'
      });
    }

    User.findById(req.body.userId, 'groups username').then((user) => {
      if (foundGroup.members.includes(user.username)
        || user.groups.includes(req.body.groupId)) {
        return res.status(409).json({
          message: 'Already joined group'
        });
      }
      foundGroup.members.push(user.username);
      foundGroup.memberStats.push({ username: user.username });
      user.groups.push(req.body.groupId);
      user.save().then((user) => {
        foundGroup.save().then((group) => {
          res.status(200).json({
            message: 'Joined group'
          });
        });
      }).catch((error) => {
        res.status(500).json({
          message: 'Something went wrong saving user',
          error: error
        });
      });
    }).catch((error) => {
      res.status(500).json({
        message: 'Something went wrong finding user',
        error: error
      });
    });
  }).catch((error) => {
    res.status(500).json({
      message: 'Something went wrong finding group',
      error: error
    });
  });
};

module.exports = {
  addGroup: addGroup,
  addToUser: addToUser,
  getUserGroups: getUserGroups,
  getById: getById,
  findGroup: findGroup,
  joinGroup: joinGroup
};
