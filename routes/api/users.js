const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.post('/', async (req, res) => {
  try {
    const foundUser = await User.findOne({ username: req.body.username });
    if (foundUser) {
      res.json({ msg: 'Username exists' });
    } else {
      const user = new User({
        username: req.body.username,
      });
      const savedUser = await user.save();
      res.json({
        username: savedUser.username,
        _id: savedUser._id,
      });
    }
  } catch (err) {
    res.json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('username _id');
    res.json(users);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
