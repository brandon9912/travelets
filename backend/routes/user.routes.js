const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");

const {
  userRegister,
  userLogin,
  getUserProfile,
} = require("../controllers/user.controller");

router.post("/user", userRegister);
router.post("/user/login", userLogin);
router.get("/user/profile", isAuth, getUserProfile);

module.exports = router;
