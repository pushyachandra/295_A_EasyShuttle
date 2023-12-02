const mongoose = require("mongoose");

const shuttleSchedulerSchema = new mongoose.Schema({
  location: { type: String, required: true },
  total_count: { type: Number, required: true },
  time: { type: String, required: true },
  active: { type: Boolean, required: true },
  createdAt: { type: String, required: true },
  createdBy: { type: String, required: true },
  lastUpdatedOn: { type: String, required: true },
});

const shuttleScheduler = mongoose.model(
  "shuttleScheduler",
  shuttleSchedulerSchema
);

module.exports = shuttleScheduler;
