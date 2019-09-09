'use strict';

const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const checkGroup = require('../middleware/check-belongs-to-group');

const User = require('../model/user');

const validateUsername = (username) => {
  return username && username.length >= 4 && /^[a-zA-Z\d ]*$/.test(username);
};

const validatePassword = (password) => {
  return password && password.length >= 5;
};

router.post('/signup', (req, res, next) => {
  console.log('signing up');
  if (!validateUsername(req.body.username)
    || !validatePassword(req.body.password)) {
    return res.status(400).json({
      message: 'Username or Password not provided or invalid'
    });
  }
  bcrypt.hash(req.body.password, 14).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      username: req.body.username,
      profileImagePath: 'assets/question.png'
    });
    user.save().then((result) => {
      res.status(201).json({
        message: 'new user created',
        result: result
      });
    }).catch((error) => {
      if (error.errors && error.errors.email) {
        res.status(403).json({
          emailError: true
        });
      } else if (error.errors && error.errors.username) {
        res.status(403).json({
          usernameError: true
        });
      } else {
        res.status(500).json({
          error: error
        });
      }
    });
  }).catch((error) => {
    res.status(500).json({
      message: 'Unable to hash password',
      error: error
    });
  });
});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  console.log('logging in');
  User.findOne({ email: req.body.email },
    'email password username').then((user) => {
    if (!user) {
      return res.status(404).json({
        message: 'Authentication failed - user was not found'
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then((result) => {
    if (!result) {
      return res.status(401).json({
        message: 'Authentication failed - password was incorrect'
      });
    }
    const expiresInHours = 2;
    const token = jwt.sign({
      email: fetchedUser.email,
      userId: fetchedUser._id
    },
    process.env.JWT_SECRET,
    { expiresIn: expiresInHours + 'h' }
    );
    res.status(200).json({
      token: token,
      expiresIn: expiresInHours * 60 * 60,
      userId: fetchedUser._id,
      username: fetchedUser.username
    });
  }).catch((error) => {
    return res.status(500).json({
      message: 'Authentication failed for unknown reason',
      error: error
    });
  });
});

const checkAuth = require('../middleware/check-auth');

const multer = require('multer');
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};
const fs = require('fs');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = null;
    if (!isValid) {
      error = new Error('Mime type not supported');
    }

    const dir = './profile-images/' + file.originalname;
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    cb(error, dir);
  },
  filename: (req, file, cb) => {
    const extension = MIME_TYPE_MAP[file.mimetype];
    cb(null, Date.now() + '.' + extension);
  }
});

router.post(
  '/profileImage',
  checkAuth,
  multer({ storage: storage }).single('image'),
  (req, res, next) => {
    console.log('updating users profile image');
    const url = req.protocol + '://' + req.get('host');
    const profilePath = url + '/profile-images/' + req.file.originalname + '/' + req.file.filename;
    User.updateOne({ username: req.body.username },
      { profileImagePath: profilePath }).then((user) => {
        res.status(200).json({
          message: 'User profile image updated!'
        });
      }).catch((error) => {
        res.status(500).json({
          error: error
        });
      });
  });

router.get(
  '/profileImage/:username',
  checkAuth,
  (req, res, next) => {
    const username = req.params.username;
    if (!username) {
      return res.status(400).json({
        error: 'username not provided'
      });
    }
    User.findOne({ username: username }, 'profileImagePath').then((user) => {
      res.status(200).json({
        path: user.profileImagePath
      });
    }).catch((error) => {
      res.status(500).json({
        error: error
      });
    });
  });

router.get('/usernames/:userId/:groupId',
  checkAuth,
  checkGroup,
  (req, res, next) => {
    res.status(200).json({
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
  });

router.get('/groupStats/:userId/:groupId',
  checkAuth,
  checkGroup,
  (req, res, next) => {
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
  });

router.get('/userStats/:userId',
  checkAuth,
  (req, res, next) => {
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
  });

router.get('/find/:search',
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
  });

const Notification = require('../model/notification').model;

router.post('/notifications/add',
  (req, res, next) => {
    console.log('adding notification');
    if (!req.body.username || !req.body.notification) {
      return res.status(400).json({
        message: 'Incorrect information for add notification request'
      });
    }
    User.updateOne({ username: req.body.username },
      { $push: { notifications: req.body.notification } }).then(() => {
        res.status(201).json({
          message: 'Notification added to user!'
        });
      }).catch((error) => {
        res.status(500).json({
          error: error
        });
      });
  });

router.get('/notifications/:username',
  checkAuth,
  (req, res, next) => {
    console.log('getting notifications');
    if (!req.params.username) {
      return res.status(400).json({
        message: 'Requesting user notifications without user id',
        user: null
      });
    }
    User.findOne({ username: req.params.username }, 'notifications').then((user) => {
      return res.status(200).json({
        message: 'retrieved notifications for user',
        notifications: user.notifications
      });
    }).catch((error) => {
      res.status(500).json({
        message: 'Something went wrong',
        error: error
      });
    });
  });

router.delete('/notifications/:id/:userId',
  checkAuth,
  (req, res, next) => {
    console.log('deleting notification');
    if (!req.params.id || !req.params.userId) {
      return res.status(400).json({
        message: 'Need more information in request'
      });
    }
    User.updateOne({ _id: req.params.userId },
      { $pull: { notifications: { _id: req.params.id } } }).then((result) => {
        return res.status(200).json({
          message: 'succesfully deleted notification'
        });
      }).catch((error) => {
        res.status(500).json({
          message: 'Something went wrong',
          error: error
        });
      });
  });

module.exports = router;
