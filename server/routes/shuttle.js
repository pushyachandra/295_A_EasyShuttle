const express = require("express");
const router = express.Router();
const { Shuttle, validateShuttle } = require("../models/shuttleService");
const authMiddleware = require("../middleware/authToken");
const { Vehicle, validateVehicle } = require("../models/vehicle");

router.get("/getShuttleData", authMiddleware, async (req, res) => {
  const userId = req.user._id;

  try {
    const shuttle = await Shuttle.findOne({ userId: userId });
    let vehicleCount;
    if (shuttle) {
      vehicleCount = await Vehicle.countDocuments({
        serviceId: shuttle._id,
        active: true,
      });
    }
    console.log(vehicleCount);
    res.json({ shuttle, vehicleCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/updateShuttle", authMiddleware, async (req, res) => {
  const userId = req.user._id;

  try {
    const newDate = new Date().toISOString();
    const existingShuttle = await Shuttle.findOne({ userId: userId });
    // console.log(existingShuttle, "===");

    if (existingShuttle) {
      const { _id, __v, ...updateData } = req.body;
      updateData.userId = userId;
      req.body.lastUpdatedOn = newDate;
      req.body.userId = userId;
      console.log(updateData);
      const { error } = validateShuttle(updateData);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const updatedShuttle = await Shuttle.findOneAndUpdate(
        { userId: userId },
        req.body,
        { new: true }
      );
      res.json(updatedShuttle);
    } else {
      const newShuttleData = {
        ...req.body,
        active: true,
        userId: userId,
        createdBy: userId.toString(),
        createdAt: newDate,
        lastUpdatedOn: newDate,
      };
      console.log(newShuttleData);
      const { error } = validateShuttle(newShuttleData);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const newShuttle = await Shuttle.create(newShuttleData);
      res.status(201).json(newShuttle);
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
