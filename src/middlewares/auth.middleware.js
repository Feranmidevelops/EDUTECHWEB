const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      req.flash("message", "unauthorized access ");
      return res.render("login", { message: req.flash("message") });
      // return res.status(400).json({ status: false, message: "unauthorized access " });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
  }
};
