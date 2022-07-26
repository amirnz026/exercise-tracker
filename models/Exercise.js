const mongoose = require('mongoose');

const ExerciseSchema = mongoose.Schema({
  username: String,
  description: String,
  duration: Number,
  date: String,
  _id: String,
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
