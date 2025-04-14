const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors"); // ✅ Important

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
require("./src/config/db");

const userRoutes = require("./src/routes/userRoutes");

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});