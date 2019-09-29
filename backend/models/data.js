const mongoose = require('mongoose');
const Traffic = require('./Traffic');
const DataSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  data: { type: Array, required: true },
  date: { type: Date, default: Date.now() },
  traffic_id: { type: mongoose.Schema.Types.ObjectId, refs: Traffic }
});
module.exports = mongoose.model('DataStore', DataSchema);
