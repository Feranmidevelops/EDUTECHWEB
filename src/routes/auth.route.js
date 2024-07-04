const express = require("express");
const { registerUser, loginUser, registerForm, loginForm } = require("../controllers/auth.controller");

const authRoute = express.Router();

// goes to the register and login forms
// /auth/register
authRoute.get("/register", registerForm)
// /auth/login
authRoute.get("/login", loginForm)

// goes to the register and login route
// auth/register
authRoute.post("/register", registerUser);
// auth/login
authRoute.post("/login", loginUser);


module.exports = authRoute;
