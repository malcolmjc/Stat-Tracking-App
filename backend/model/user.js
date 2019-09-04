'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const gameSchema = require('./game').schema;
const notificationSchema = require('./notification').schema;

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: false },
  username: { type: String, required: true, unique: true},
  games: [gameSchema],
  groups: [{ type: String }],
  stats: {
    catches: { type: Number, default: 0 },
    sinkers: { type: Number, default: 0 },
    drops: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    fifas: { type: Number, default: 0 },
    gamesWon: { type: Number, default: 0 },
    gamesLost: { type: Number, default: 0 }
  },
  profileImagePath: { type: String, required: true },
  notifications: [notificationSchema]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
