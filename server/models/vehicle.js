const mongoose = require("mongoose");
const Joi = require("joi");

const vehicleSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, required: true },
  vehicleNumber: { type: String, required: true },
  type: { type: String, required: true },
  totalCapacity: { type: Number, required: true },
  remainingCapacity: { type: Number, required: true },
  active: { type: Boolean, required: true },
  createdAt: { type: String, required: true },
  createdBy: { type: String, required: true },
  lastUpdatedOn: { type: String, required: true },
});

const validateVehicle = (vehicle) => {
  const schema = Joi.object({
    serviceId: Joi.object().required(),
    vehicleNumber: Joi.string().required().label("Vehicle Number"),
    type: Joi.string().required(),
    totalCapacity: Joi.number().required().label("Total Capacity"),
    remainingCapacity: Joi.number().required(),
    active: Joi.boolean().required(),
    createdAt: Joi.string().required(),
    createdBy: Joi.string().required(),
    lastUpdatedOn: Joi.string().required(),
  });

  return schema.validate(vehicle);
};

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = { Vehicle, validateVehicle };
