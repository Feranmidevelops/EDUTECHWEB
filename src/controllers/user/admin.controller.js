//admin routes
exports.adminPage = async (req, res) => {
  console.log("This is the admin route");
  res.render("admin");
};

exports.uploadDoc = async (req, res) => {
  console.log("This is the uploadDoc route");

  // const document = new Document({ name: req.file.originalname, path: req.file.path });
  // try {
  //   await document.save();
  //   res.status(201).send(document);
  // } catch (err) {
  //   res.status(400).send(err);
  // }
};

exports.delDoc = async (req, res) => {
  console.log("This is the delDoc route");
  // try {
  //   const document = await Document.findByIdAndDelete(req.params.id);
  //   if (!document) {
  //     return res.status(404).send({ error: 'Document not found' });
  //   }
  //   res.send(document);
  // } catch (err) {
  //   res.status(400).send(err);
  // }
};
