const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = mongoose.Schema({

});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = { Movie };