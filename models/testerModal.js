const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    firstName: String,
    position: String,
    jerseyNum: Number,
}, {
    collection: 'players',
});

const PlayerModel = new mongoose.model('PlayerModel', playerSchema);

module.exports = PlayerModel;

