'use strict';

const User = require('../../model/user');

const multer = require('multer');
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
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

const addProfileImage = (req, res, next) => {
  console.log('updating users profile image');
  const url = req.protocol + '://' + req.get('host');
  const profilePath = url + '/profile-images/' +
    req.file.originalname + '/' + req.file.filename;
  const update = { profileImagePath: profilePath };
  User.updateOne({ username: req.body.username }, update).then((user) => {
    res.status(200).json({
      message: 'User profile image updated!'
    });
  }).catch((error) => {
    res.status(500).json({
      error: error
    });
  });
};

const getProfileImage = (req, res, next) => {
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
};

module.exports = {
  storage: storage,
  addProfileImage: addProfileImage,
  getProfileImage: getProfileImage
};
