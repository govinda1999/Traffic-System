const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/trafficsystem';
const auth = require('./routes/auth');
const data = require('./routes/data');
const cors = require('cors');
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
app.use(cors);

app.use('/api/auth', auth);
app.use('/api/data', data);

app.use((req, res, next) => {
  const error = new Error('Page Not Found');
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
