const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");

const {
  getCurrentUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;