const mongoose = require('mongoose');

function toLower(v) {
  return v.toLowerCase();
}

const TestSchema = mongoose.Schema({
  username: {
    type: String,
  },
  email: { type: String, set: toLower },
});

module.exports = mongoose.model('Test', TestSchema);
