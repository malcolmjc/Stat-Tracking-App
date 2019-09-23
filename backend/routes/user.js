'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');

const checkAuth = require('../middleware/check-auth');
const checkGroup = require('../middleware/check-belongs-to-group');
const userController = require('../controllers/user/index');

router.post('/signup', userController.authentication.signup);
router.post('/login', userController.authentication.login);

router.post(
  '/profileImage',
  checkAuth,
  multer({ storage: userController.profile.storage }).single('image'),
  userController.profile.addProfileImage
);

router.get(
  '/profileImage/:username',
  checkAuth,
  userController.profile.getProfileImage
);

router.get('/usernames/:userId/:groupId',
  checkAuth,
  checkGroup,
  userController.getMembers
);

router.get('/allTimeStats/:userId/:groupId',
  checkAuth,
  checkGroup,
  userController.stats.allTimeStats
);

router.get('/groupStats/:userId/:groupId',
  checkAuth,
  checkGroup,
  userController.stats.groupStats
);

router.get('/userStats/:userId',
  checkAuth,
  userController.stats.userStats
);

router.get('/find/:search',
  checkAuth,
  userController.findUsers
);

router.post('/notifications/add',
  checkAuth,
  userController.notifications.addNotification
);

router.get('/notifications/:username',
  checkAuth,
  userController.notifications.getNotifications
);

router.delete('/notifications/:id/:userId',
  checkAuth,
  userController.notifications.deleteNotification
);

module.exports = router;
