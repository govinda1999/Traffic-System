const mongoose = require('mongoose');
const TrafficSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  location: { type: String, required: true }
});
module.exports = mongoose.model('Traffic', TrafficSchema);
