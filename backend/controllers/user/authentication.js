'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../model/user');

const validateUsername = (username) => {
  return username && username.length >= 4 && /^[a-zA-Z\d ]*$/.test(username);
};

const validatePassword = (password) => {
  return password && password.length >= 5;
};

const signup = (req, res, next) => {
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
};

const login = (req, res, next) => {
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
};

module.exports = {
  login: login,
  signup: signup
};
