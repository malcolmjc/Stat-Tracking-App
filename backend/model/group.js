'use strict';

const mongoose = require('mongoose');
const gameSchema = require('./game').schema;
const uniqueValidator = require('mongoose-unique-validator');

const groupSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  slogan: { type: String, required: false },
  description: { type: String, required: false },
  // should be username of user who creates group
  admin: { type: String, required: true },
  // user name of members, admin should be included
  members: [{ type: String, required: true}],
  games: [gameSchema],
  memberStats: [{
    username: { type: String },
    catches: { type: Number, default: 0 },
    sinkers: { type: Number, default: 0 },
    drops: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    fifas: { type: Number, default: 0 },
    gamesWon: { type: Number, default: 0 },
    gamesLost: { type: Number, default: 0 }
  }]
});

groupSchema.plugin(uniqueValidator);

module.exports = {
  model: mongoose.model('Group', groupSchema),
  schema: groupSchema
};
