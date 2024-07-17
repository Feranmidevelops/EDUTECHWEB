const Document = require("../../models/document.model");
//admin routes
exports.adminPage = async (req, res) => {
  try {
    const documents = await Document.find();
    return res.render("admin", { documents, message: req.flash("message") });
  } catch (err) {
    return res.render("500error");
    // return res.status(500).json({ status: false, message: `Internal Server Error: ${err.message}`,});
  }
};

exports.uploadDoc = async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const foundDoc = await Document.findOne({ name: originalname });
    if (foundDoc) {
      req.flash("message", "document already stored");
      const documents = await Document.find();
      return res.render("admin", {documents, message: req.flash("message") });
      // return res.status(400).json({ status: false, message: "document already stored" });
    }

    await Document.create({
      name: originalname,
      path,
    });
    // return res.status(200).json({
    //   status: true,
    //   message: "document uploaded successfully",
    // });
    return res.redirect("/user/admin");
  } catch (err) {
    return res.render("500error");
    // return res.status(500).json({ status: false, message: `Internal Server Error: ${err.message}`,});
  }
};

exports.delDoc = async (req, res) => {
  try {
    const { id } = req.params;
    const foundDoc = await Document.findByIdAndDelete(id);
    if (!foundDoc) {
      req.flash("message", "document not found");
      const documents = await Document.find();
      return res.render("admin", {documents, message: req.flash("message") });
      // return res.status(400).json({ status: false, message: "document not found" });
    }
    // return res.status(200).json({
    //   status: true,
    //   message: "document deleted successfully",
    // });
    res.redirect("/user/admin");
  } catch (err) {
    return res.render("500error");
    // return res.status(500).json({ status: false, message: `Internal Server Error: ${err.message}`,});
  }
};
