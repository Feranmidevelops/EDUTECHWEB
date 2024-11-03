const User = require("../../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

//this logic renders a register form
exports.registerForm = async (req, res) => {
  res.render("register", { message: "" });
};

//this logic renders a login form
exports.loginForm = async (req, res) => {
  console.log(req.flash("message"));
  console.log(req);

  res.render("login", { message: req.flash("message") });
};

// this logic registers and adds data to database
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      req.flash("message", "email already exists");
      return res.render("register", { message: req.flash("message") });
      // return res.status(400).send({ status: false, message: "email already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    req.flash("message", `${role} registered successfully`);
    return res.redirect("/auth/login");
  } catch (err) {
    return res.render("500error");
    // return res.status(500).json({ status: false, message: `Internal Server Eror: ${err.message}`});
  }
};

//this logic checks user data and logs user in
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      console.log("founduser");
      req.flash("message", "email doesn't exist");
      return res.render("login", { message: req.flash("message") });
      // return res.status(400).json({ status: false, message: "email doesn't exist"});
    }

    const isSimilar = await bcryptjs.compare(password, foundUser.password);
    if (!isSimilar) {
      req.flash("message", "invalid email or password");
      return res.render("login", { message: req.flash("message") });
      // return res.status(400).json({ status: false, message: "Invalid email or password" });
    }
    console.log(foundUser, "found");
    //destructure the gotten user object and add them to jwt token
    const { id, username, role } = foundUser;
    const token = jwt.sign(
      { id, username, email, role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );

    res.cookie("jwt", token, { httpOnly: true, secure: true });
    req.flash("message", `${role} logged in successfully`);
    if (role === "admin") {
      return res.redirect("/user/admin");
    } else if (role === "user") {
      return res.redirect("/user/profile");
    } else {
      return res.status(403).send("Forbidden");
    }
  } catch (err) {
    return res.render("500error");
    // return res.status(500).json({ status: false, message: `Internal Server Error: ${err.message}`,});
  }
};
