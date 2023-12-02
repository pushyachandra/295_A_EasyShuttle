const express = require("express");
const router = express.Router();
const { Shuttle, validateShuttle } = require("../models/shuttleService");
const {
  ShuttleRoute,
  validateShuttleRoute,
} = require("../models/shuttleServiceRoute");
const authMiddleware = require("../middleware/authToken");

router.get("/getRouteInfo", authMiddleware, async (req, res) => {
  const userId = req.user._id;
  //   console.log("hi");
  try {
    const existingShuttle = await Shuttle.findOne({
      userId: userId,
      active: true,
    });
    // console.log(existingShuttle);
    if (!existingShuttle) {
      return res.status(404).json({ error: "Shuttle not found for the user" });
    }

    const serviceId = existingShuttle._id;
    // console.log(serviceId);

    const allShuttleRoutes = await ShuttleRoute.find({
      serviceId: serviceId,
    });
    // console.log(allShuttleRoutes);
    res.json(allShuttleRoutes);
  } catch (error) {
    console.error("Error fetching all shuttle routes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
