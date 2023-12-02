const mongoose = require("mongoose");
const Joi = require("joi");

const shuttleSchema = new mongoose.Schema({
  userId: { type: Object, required: true },
  shuttleNumber: { type: String, required: true },
  shuttleName: { type: String, required: true },
  active: { type: Boolean, required: true },
  companiesAssociated: { type: [String], required: true },
  createdAt: { type: String, required: true },
  createdBy: { type: String, required: true },
  lastUpdatedOn: { type: String, required: true },
});

const validateShuttle = (shuttle) => {
  const schema = Joi.object({
    userId: Joi.object().required().label("User Id"),
    shuttleNumber: Joi.string().required().label("Shuttle Number"),
    shuttleName: Joi.string().required().label("Shuttle Name"),
    companiesAssociated: Joi.array()
      .items(Joi.string())
      .min(1)
      .required()
      .label("Associated Companies"),
    active: Joi.boolean().required(),
    createdAt: Joi.string().required(),
    createdBy: Joi.string().required(),
    lastUpdatedOn: Joi.string().required(),
  });

  return schema.validate(shuttle);
};

const Shuttle = mongoose.model("Shuttle", shuttleSchema);

module.exports = {
  Shuttle,
  validateShuttle,
};
