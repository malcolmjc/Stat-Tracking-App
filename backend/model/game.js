const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  date: { type: String, required: true },
  playerGames: {},
  winners: [{ type: String, required: true}],
  losers: [{ type: String, required: true}],
  score: { type: String, required: true }
});

module.exports = {
  model: mongoose.model('Game', gameSchema),
  schema: gameSchema
};
