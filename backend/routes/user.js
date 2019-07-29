const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkGroup = require("../middleware/check-belongs-to-group");

const Group = require("../model/group").model;
const User = require("../model/user");

router.post("/signup", (req, res, next) => {
  console.log('signing up');
  bcrypt.hash(req.body.password, 14).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      username: req.body.username
    });
    user.save().then(result => {
      res.status(201).json({
        message: "new user created",
        result: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  console.log('logging in');
  User.findOne({ email: req.body.email }, 'email password username').then(user => {
    if (!user) {
      return res.status(401).json({
        message: "authentication failed - user was not found"
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
    if (!result) {
      return res.status(401).json({
        message: "authentication failed for unknown reason"
      });
    }
    const token = jwt.sign({
        email: fetchedUser.email,
        userId: fetchedUser._id
      },
      "this-is-a-super-secret-message-should-be-hidden-TODO-make-hidden",
      { expiresIn: "2h" }
    );
    res.status(200).json({
      token: token,
      expiresIn: 3000,
      userId: fetchedUser._id,
      username: fetchedUser.username
    });
  }).catch(err => {
    return res.status(401).json({
      message: "authentication failed - password was not valid",
      error: err
    });
  });
});

const checkAuth = require("../middleware/check-auth");

router.get('/usernames/:userId/:groupId',
  checkAuth,
  checkGroup,
  (req, res, next) => {
    res.status(201).json({
      message: 'found users that belong to group',
      users: res.locals.group.members
    });
  });

router.get('/allTimeStats/:userId/:groupId',
  checkAuth,
  checkGroup,
  (req, res, next) => {
    const foundUserStats = [];
    res.locals.group.members.forEach((username) => {
      User.findOne({ username: username }, 'stats').then((foundUser) => {
        foundUserStats.push({
          stats: foundUser.stats,
          username: username
        });
        if (foundUserStats.length === res.locals.group.members.length) {
          return res.status(201).json({
            message: 'retrieved stats for all users in group',
            users: foundUserStats
          });
        }
      });
    });
  });

router.get('/groupStats/:userId/:groupId',
  checkAuth,
  checkGroup,
  (req, res, next) => {
    const group = res.locals.group;
    return res.status(201).json({
      message: 'retrieved stats for all users in group',
      users: group.memberStats.map((stats) => {
        return {
          stats: stats,
          username: stats.username
        };
      })
    });
  });

router.get("/find/:search",
  checkAuth,
  (req, res, next) => {
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
        res.status(200).json({
          message: 'user found by email',
          users: [user.username]
        });
      });
    }

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
    });
  });

module.exports = router;
