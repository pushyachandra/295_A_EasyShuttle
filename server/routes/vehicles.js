const express = require("express");
const router = express.Router();
const { Vehicle, validateVehicle } = require("../models/vehicle");
const authMiddleware = require("../middleware/authToken");
const { Shuttle, validateShuttle } = require("../models/shuttleService");
const { ObjectId } = require("mongodb"); // or ObjectID

router.get("/getVehicles", authMiddleware, async (req, res) => {
  const userId = req.user._id;
  try {
    const shuttle = await Shuttle.findOne({ userId: userId, active: true });
    const activeVehicles = await Vehicle.find({
      serviceId: shuttle._id,
      active: true,
    });
    res.json(activeVehicles);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getVehicle/:id", authMiddleware, async (req, res) => {
  // const userId = req.user._id;
  const vehicleId = req.params.id;
  try {
    // const shuttle = await Shuttle.findOne({ userId: userId, active: true });
    const activeVehicles = await Vehicle.findOne({
      _id: vehicleId,
      active: true,
    });
    res.json(activeVehicles);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addVehicles", authMiddleware, async (req, res) => {
  const vehicleData = req.body;
  const userId = req.user._id;
  const date = new Date().toISOString();
  try {
    const shuttle = await Shuttle.findOne({ userId: userId });
    vehicleData.serviceId = shuttle._id;
    vehicleData.createdBy = userId.toString();
    vehicleData.createdAt = date;
    vehicleData.lastUpdatedOn = date;
    vehicleData.active = true;
    const { error } = validateVehicle(vehicleData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newVehicle = new Vehicle(vehicleData);
    await newVehicle.save();

    res.json({ message: "Vehicle added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/editVehicle/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { _id, __v, ...updateData } = req.body;
  const updatedVehicleData = req.body;
  updatedVehicleData.serviceId = ObjectId(updatedVehicleData.serviceId);
  updateData.serviceId = ObjectId(updateData.serviceId);
  const date = new Date().toISOString();
  updatedVehicleData.lastUpdatedOn = date;
  try {
    const { error } = validateVehicle(updateData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      updatedVehicleData,
      { new: true }
    );
    res.json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/deleteVehicle/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      { active: false },
      { new: true }
    );

    if (!updatedVehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.json({ message: "Vehicle deactivated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/count/:serviceId", authMiddleware, async (req, res) => {
  const { serviceId } = req.params;

  try {
    const { error } = validateVehicle({ serviceId });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const vehicleCount = await Vehicle.countDocuments({ serviceId });
    res.json({ count: vehicleCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
