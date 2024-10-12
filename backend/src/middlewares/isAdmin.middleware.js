exports.roleAuth = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      req.flash("message", "unauthorized access");
      return res.render("login", { message: req.flash("message") });
      // return res.status(400).json({ status: false, message: "unauthorized access" });
    }
  };
};
