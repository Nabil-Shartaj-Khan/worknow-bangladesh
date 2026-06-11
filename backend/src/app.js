const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("WorkNow Bangladesh API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

module.exports = app;