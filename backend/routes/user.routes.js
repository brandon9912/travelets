const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  userRegister,
  userLogin,
  getUserProfile,
} = require("../controllers/user.controller");

router.get("/user", getAllUsers);
router.post("/user", userRegister);
router.post("/user/login", userLogin);
router.get("/user/profile", getUserProfile);

module.exports = router;
