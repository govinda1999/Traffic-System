const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/trafficsystem';
const auth = require('./routes/auth');
const data = require('./routes/data');
const app = express();
const port = process.env.PORT || 5000;
mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, result) => {
    if (err) {
      console.log('Error at connecting Database');
    } else {
      console.log('Database Connected');
    }
  }
);

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET POST PATCH DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use('/api/auth', auth);
app.use('/api/data', data);

app.use((req, res, next) => {
  const error = new Error('Routes Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    Error_status: error.status || 500,
    message: error.message
  });
});

app.listen(port, () => console.log(`Hello Listening at ${port}`));
