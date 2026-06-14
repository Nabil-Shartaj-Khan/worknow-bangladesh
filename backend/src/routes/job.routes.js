const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const {
  createJob,
  getAllJobs,
} = require("../controllers/job.controller");

const router = express.Router();
router.get("/", getAllJobs);
router.post(
  "/",
  authMiddleware,
  roleMiddleware("employer"),
  createJob
);

module.exports = router;