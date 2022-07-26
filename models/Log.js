const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  _id: {
    type: String,
    required: true,
  },

  log: [
    {
      description: String,
      duration: String,
      date: String,
    },
  ],
});
module.exports = mongoose.model('Log', LogSchema);
