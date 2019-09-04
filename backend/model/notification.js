'use strict';

const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
  type: { type: String, required: true },
  message: { type: String, required: false },
  recipient: { type: String, required: true },
  sender: { type: String, required: true },
  details: {}
});

module.exports = {
  model: mongoose.model('Notification', notificationSchema),
  schema: notificationSchema
};
