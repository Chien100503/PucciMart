const express = require("express");
const login = require("./login");
const register = require("./register");
const logout = require("./logout");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout)
// register

//  login-----------------
// Định nghĩa các route và xử lý liên quan đến xác thực ở đây

module.exports = router;
