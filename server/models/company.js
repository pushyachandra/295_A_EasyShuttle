const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  companyId: { type: Number, required: true },
  companyName: { type: String, required: true },
  resourceCount: { type: Number, required: true },
  subscriptionUntil: Date,
  joinedOn: Date,
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
