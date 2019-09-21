'use strict';

const User = require('../../model/user');

const addNotification = (req, res, next) => {
  console.log('adding notification');
  if (!req.body.username || !req.body.notification) {
    return res.status(400).json({
      message: 'Incorrect information for add notification request'
    });
  }
  const toPush = { $push: { notifications: req.body.notification } };
  User.updateOne({ username: req.body.username }, toPush).then(() => {
    res.status(201).json({
      message: 'Notification added to user!'
    });
  }).catch((error) => {
    res.status(500).json({
      error: error
    });
  });
};

const getNotifications = (req, res, next) => {
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
};

const deleteNotification = (req, res, next) => {
  console.log('deleting notification');
  if (!req.params.id || !req.params.userId) {
    return res.status(400).json({
      message: 'Need more information in request'
    });
  }
  const toPull = { $pull: { notifications: { _id: req.params.id } } };
  User.updateOne({ _id: req.params.userId }, toPull).then((result) => {
    return res.status(200).json({
      message: 'succesfully deleted notification'
    });
  }).catch((error) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: error
    });
  });
};

module.exports = {
  addNotification: addNotification,
  getNotifications: getNotifications,
  deleteNotification: deleteNotification
};
