const Document = require("../../models/document.model");
//user routes
exports.userPage = async (req, res) => {
  try {
    const documents = await Document.find();
    res.render("profile", { documents, message: req.flash("message") });
  } catch (err) {
    return res.render("500error");
    // return res.status(500).json({ status: false, message: `Internal Server Error: ${err.message}`,});
  }
};

exports.downloadDoc = async (req, res) => {
  try {
    const { id } = req.params;
    const foundDoc = await Document.findById(id);
    if (!foundDoc) {
      req.flash("message", "document not found");
      const documents = await Document.find();
      return res.render("profile", { documents, message: req.flash("message") });
      // return res.status(400).json({ status: false, message: "document not found" });
    }
    // return res.status(200).json({
    //   status: true,
    //   message: "document downloaded successfully",
    // });
    return res.download(foundDoc.path, foundDoc.name);
  } catch (err) {
    return res.render("500error");
    // return res.status(500).json({ status: false, message: `Internal Server Error: ${err.message}`,});
  }
};
