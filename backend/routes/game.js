'use strict';

const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const checkGroup = require('../middleware/check-belongs-to-group');

const gameController = require('../controllers/game/index');

router.post(
  '/addToUser',
  checkAuth,
  gameController.addToUser
);

router.post(
  '/addToGroup',
  checkAuth,
  checkGroup,
  gameController.addToGroup
);

// TODO, make this get request - query param with userId
router.post(
  '/get',
  checkAuth,
  gameController.getGame
);

module.exports = router;
