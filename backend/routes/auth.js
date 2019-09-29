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
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Traffic.remove({ _id: id })
    .exec()
    .then(docs => {
      res.status(200).json({
        message: 'Traffic Signal Removed Succesfully'
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Traffic Signal Not Removed Succesfully'
      });
    });
});
module.exports = router;
