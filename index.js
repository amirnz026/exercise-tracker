const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const usersRouter = require('./routes/api/users');
const exercisesRouter = require('./routes/api/exercises');
// const testRouter = require('./test');

const bodyParser = require('body-parser');
app.use(cors());
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', usersRouter);
app.use('/api/users', exercisesRouter);
// app.use('/', testRouter);

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

mongoose.connect(process.env.DB_CONNECTION),
  {
    useNewUrlParser: true,
  };

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to db'));

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
