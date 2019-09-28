const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Traffic = require('../models/Traffic');
router.post('/register', (req, res) => {
  const TrafficData = new Traffic({
    _id: mongoose.Types.ObjectId(),
    location: req.body.location
  });
  TrafficData.save()
    .exec()
    .then(docs => {
      res.status(200).json({
        message: 'Traffic Signal Registered Succesfully'
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Traffic Signal Not Registered Succesfully'
      });
    });
});
router.get('/', (req, res) => {
  Traffic.find()
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        data: docs
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error'
      });
    });
});
module.exports = router;
