const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const Game = require("../model/game").model;
const Group = require("../model/group").model;
const User = require("../model/user");

const checkAuth = require("../middleware/check-auth");

router.post(
  '/add',
  checkAuth,
  (req, res, next) => {
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

      group.save();
      res.status(200).json({
        message: 'Group created',
        groupId: group._id
      });
    });
  });

router.post(
  '/addToUser',
  checkAuth,
  (req, res, next) => {
    User.findById(req.body.userId, 'groups').then((user) => {
      user.groups.push(req.body.groupId);
      user.save().then((user) => {
        res.status(200).json({
          message: 'Group added to user'
        });
      });
    });
  });

router.get(
  '/:userId',
  checkAuth,
  (req, res, next) => {
    console.log('getting groups for user');
    User.findById(req.params.userId, 'groups').then((user) => {
      let groups = [];

      if (!user.groups || user.groups.length === 0) {
        res.status(200).json({
          message: 'user has no groups',
          groups: []
        });
      } else {
        user.groups.forEach((groupId) => {
          Group.findById(groupId).then((group) => {
            groups.push(group);
            if (groups.length === user.groups.length) {
              res.status(200).json({
                message: 'groups retrieved',
                groups: groups
              });
            }
          });
        });
      }
    });
  });

router.get(
  '/byId/:groupId',
  checkAuth,
  (req, res, next) => {
    console.log('getting group by id');
    Group.findById(req.params.groupId).then((group) => {
      res.status(200).json({
        message: 'group found by id',
        group: group
      });
    }).catch((err) => {
      res.status(404).json({
        message: 'Error: ' + err,
        group: null
      });
    });
  });

router.get("/find/:search", (req, res, next) => {
  const search = req.params.search;
  if (!search) {
    res.status(501).json({
      message: 'bad search',
      groups: null
    });
  } else {
    Group.find({ name: new RegExp(search) }, 'name slogan description members').then((groups) => {
      res.status(200).json({
        message: 'these groups found',
        groups: groups
      });
    });
  }
});

router.put(
  '/join',
  checkAuth,
  (req, res, next) => {
    console.log('joining group');
    let foundGroup;
    Group.findById(req.body.groupId, 'password members memberStats').then((group) => {
      foundGroup = group;
      return bcrypt.compare(req.body.password, group.password);
    }).then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "joining group failed - bad password"
        });
      }

      User.findById(req.body.userId, 'groups username').then((user) => {
        if (foundGroup.members.includes(user.username) || user.groups.includes(req.body.groupId)) {
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
        });
      });
    });
  });

module.exports = router;