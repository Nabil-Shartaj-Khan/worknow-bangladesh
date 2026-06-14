const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const {
  applyToJob,
  getJobApplications,
  updateApplicationStatus,
  getMyApplications
} = require("../controllers/application.controller");

const router = express.Router();


router.post("/", authMiddleware, roleMiddleware("worker"), applyToJob);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("worker"),
  getMyApplications
);
router.get(
  "/job/:jobId",
  authMiddleware,
  roleMiddleware("employer"),
  getJobApplications,
);

router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("employer"),
  updateApplicationStatus
);


module.exports = router;
