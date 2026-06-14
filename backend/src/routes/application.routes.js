const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const {
  applyToJob,
} = require("../controllers/application.controller");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("worker"),
  applyToJob
);

module.exports = router;