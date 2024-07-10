const express = require("express");
const { validateSchemas } = require("../middlewares/validation.middleware");
const { registerSchema, loginSchema } = require("../validations/auth.validation");
const {
  registerUser,
  loginUser,
  registerForm,
  loginForm,
} = require("../controllers/auth/auth.controller");

const authRoute = express.Router();

// goes to the register and login forms
// /auth/register
authRoute.get("/register", registerForm);
// /auth/login
authRoute.get("/login", loginForm);

// goes to the register and login route
// auth/register
authRoute.post("/register", validateSchemas(registerSchema), registerUser);
// auth/login
authRoute.post("/login", validateSchemas(loginSchema), loginUser);

module.exports = authRoute;
