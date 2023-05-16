const express = require("express");
const router = express.Router();

const { getAllUsers, userRegister } = require("../controllers/user.controller");

router.get("/user", getAllUsers);
router.post("/user", userRegister);

module.exports = router;
