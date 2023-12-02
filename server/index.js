require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const vehicleRoutes = require("./routes/vehicles");
const shuttles = require("./routes/shuttle");
const routes = require("./routes/route");
const companyRoutes = require("./routes/company");

connection();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/shuttles", shuttles);
app.use("/api/routes", routes);
app.use("/api/company", companyRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
