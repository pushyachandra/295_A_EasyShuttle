const router = require("express").Router();
const Company = require("../models/company");
const authMiddleware = require("../middleware/authToken");

router.get("/", authMiddleware, async (req, res) => {
  try {
    console.log();
    const company = await Company.findOne({
      userId: req.user._id,
    });
    res.json(company);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
