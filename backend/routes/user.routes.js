const express = require("express");
const router = express.Router();

const { getAllUsers } = require("../controllers/user.controller");

router.get("/user", getAllUsers);

module.exports = router;
