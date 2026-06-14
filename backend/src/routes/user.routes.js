const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const {
  getCurrentUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/me", authMiddleware, getCurrentUser);

router.get(
  "/employer-only",
  authMiddleware,
  roleMiddleware("employer"),
  (req, res) => {
    res.json({
      message: "Welcome employer",
    });
  }
);

router.get(
  "/admin-only",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({
      message: "Welcome admin",
    });
  }
);

module.exports = router;