exports.adminAuth = async () => {
  const { role } = req.user;

  if (role !== "admin")
    return res
      .status(400)
      .json({ status: false, message: "unauthorized access" });
  next();
};
