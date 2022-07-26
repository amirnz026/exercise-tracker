const express = require('express');
const router = express.Router();
// const Exercise = require('../../models/Exercise');
const User = require('../../models/User');
const Log = require('../../models/Log');
const Exercise = require('../../models/Exercise');
const { base } = require('../../models/User');

router.post('/:_id/exercises', async (req, res) => {
  try {
    const foundUser = await User.findOne({ _id: req.params._id });
    if (foundUser) {
      const foundLog = await Log.findOne({ _id: foundUser._id });
      if (foundLog) {
        foundLog.log.push({
          description: req.body.description,
          duration: Number(req.body.duration),
          date: req.body.date || new Date().toDateString(),
        });
        foundLog.count += 1;
        const updateLog = await foundLog.save();
      } else {
        const log = new Log({
          username: foundUser.username,
          count: 1,
          _id: foundUser._id,
          log: [
            {
              description: req.body.description,
              duration: Number(req.body.duration),
              date: req.body.date || new Date().toDateString(),
            },
          ],
        });
        const savedLog = await log.save();
        console.log(savedLog);
      }
      res.json({
        _id: req.params._id,
        username: foundUser.username,
        date: req.body.date || new Date().toDateString(),
        duration: Number(req.body.duration),
        description: req.body.description,
      });
    } else {
      console.log('wrong _id');
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/:_id/logs', async (req, res) => {
  console.log('redirected');
  console.log(req.params._id);
  const foundLog = await Log.findOne({ _id: req.params._id });
  res.json(foundLog);
});

router.get('/:_id/exercises', async (req, res) => {
  const logs = await Log.find();
  res.json(logs);
});

router.delete('/deletedb', (req, res) => {
  Log.deleteMany({}, (err) => {
    console.log('Log got emptied');
  });
  User.deleteMany({}, (err) => {
    console.log('User got emptied');
  });
});

module.exports = router;
