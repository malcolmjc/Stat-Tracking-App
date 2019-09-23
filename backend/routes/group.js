'use strict';

const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const groupController = require('../controllers/group');

router.post(
  '/add',
  checkAuth,
  groupController.addGroup
);

router.post(
  '/addToUser',
  checkAuth,
  groupController.addToUser
);

router.get(
  '/userGroups/:userId/:fields',
  checkAuth,
  groupController.getUserGroups
);

router.get(
  '/byId/:groupId/:fields',
  checkAuth,
  groupController.getById
);

router.get(
  '/find/:search',
  checkAuth,
  groupController.findGroup
);

router.put(
  '/join',
  checkAuth,
  groupController.joinGroup
);

module.exports = router;
