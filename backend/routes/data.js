const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Traffic = require('../models/Traffic');
const DataStore = require('../models/data');
router.get('/', (req, res) => {
  DataStore.find()
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        data: docs.map(doc => {
          return {
            array_data: doc.data,
            id: doc.traffic_id
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error ' + err
      });
    });
});

router.post('/add', (req, res) => {
  const id = req.body.traffic_id;
  Traffic.find({ _id: id })
    .exec()
    .then(docs => {
      if (docs.length > 0) {
        const DataEnter = new DataStore({
          _id: mongoose.Types.ObjectId(),
          data: req.body.data,
          traffic_id: req.body.traffic_id
        });
        DataEnter.save((error, result) => {
          if (error) {
            res.status(500).json({
              message: 'Error at Saving Data'
            });
          } else {
            res.status(200).json({
              message: 'Data Saved'
            });
          }
        });
      } else {
        res.status(500).json({
          message: 'No Trafic System Exist'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error'
      });
    });
});
router.get('/:id', (req, res) => {
  const id = req.params.id;
  DataStore.find({ traffic_id: id })
    .limit(1)
    .sort({ date: -1 })
    .then(docs => {
      res.status(200).json({
        data: docs[0].data,
        id: docs[0].traffic_id
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error'
      });
    });
});
module.exports = router;
