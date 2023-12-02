const mongoose = require("mongoose");
const Joi = require("joi");

const shuttleRouteSchema = new mongoose.Schema({
  serviceId: { type: Object, required: true },
  vehicleId: { type: Object, required: true },
  vehicleName: { type: String, required: true },
  capacity: { type: Number, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  stops: { type: [String], required: true },
  estimatedTime: { type: String, required: true },
  active: { type: Boolean, required: true },
  createdAt: { type: String, required: true },
  createdBy: { type: String, required: true },
  lastUpdatedOn: { type: String, required: true },
});

// Define Joi schema for validation
const shuttleRouteValidationSchema = Joi.object({
  serviceId: Joi.object().required(),
  vehicleId: Joi.object().required(),
  vehicleName: Joi.string().required(),
  capacity: Joi.number().required(),
  source: Joi.string().required(),
  destination: Joi.string().required(),
  startTime: Joi.string().required(),
  endTime: Joi.string().required(),
  stops: Joi.array().items(Joi.string()).required(),
  estimatedTime: Joi.string().required(),
  active: Joi.boolean().required(),
  createdAt: Joi.string().required(),
  createdBy: Joi.string().required(),
  lastUpdatedOn: Joi.string().required(),
});

const ShuttleRoute = mongoose.model("ShuttleRoute", shuttleRouteSchema);

// Attach the Joi validation to the Mongoose model
// ShuttleRoute.validateShuttleRoute = (shuttleRoute) => {
//   return shuttleRouteValidationSchema.validate(shuttleRoute);
// };

module.exports = { ShuttleRoute, shuttleRouteValidationSchema };
