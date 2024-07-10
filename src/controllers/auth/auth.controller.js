const User = require("../../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

//this logic renders a register form
exports.registerForm = async (req, res) => {
  res.render("register");
};

//this logic renders a login form
exports.loginForm = async (req, res) => {
  res.render("login");
};

// this logic registers and adds data to database
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res
        .status(400)
        .json({ status: false, message: "email already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      status: true,
      message: `${role} registered successfully`,
      data: ({ password, ...userwithoutPassword } = newUser),
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `Internal Server Error: ${err.message}`,
    });
  }
};

//this logic checks user data and logs user in
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(400).json({
        status: false,
        message: "email doesn't exist",
      });
    }

    const isSimilar = await bcryptjs.compare(password, foundUser.password);
    if (!isSimilar) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid email or password" });
    }

    //destructure the gotten user object and add them to jwt token
    const { id, username, role } = foundUser;
    const token = jwt.sign(
      { id, username, email, role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );
    res.status(200).json({
      status: true,
      message: "Successfully logged in",
      data: { id, username, email, role, token },
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `Internal Server Error: ${err.message}`,
    });
  }
};
