const express = require("express");
const router = express.Router();

const { userRegister ,userLogin} = require("../controller/userController");

// POST /userRegister - Register a new user
router.post("/userRegister", userRegister);
router.post("/userLogin",userLogin)
module.exports = router;
