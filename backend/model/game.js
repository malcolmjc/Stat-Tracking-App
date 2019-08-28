const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  date: { type: Date, required: true },
  playerGames: {}
});

module.exports = {
  model: mongoose.model('Game', gameSchema),
  schema: gameSchema
};
