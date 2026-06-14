const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const {
  createJob,
} = require("../controllers/job.controller");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("employer"),
  createJob
);

module.exports = router;