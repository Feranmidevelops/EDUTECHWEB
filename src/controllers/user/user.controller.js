//user routes
exports.userPage = async (req, res) => {
  console.log('This is the user route')
  res.render("profile")
  // try {
  //   const documents = await Document.find();
  //   res.send(documents);
  // } catch (err) {
  //   res.status(400).send(err);
  // }
}

exports.downloadDoc = async (req, res) => {
  console.log('This is the downloadDoc route')
  // try {
  //   const document = await Document.findById(req.params.id);
  //   if (!document) {
  //     return res.status(404).send({ error: 'Document not found' });
  //   }
  //   res.download(document.path, document.name);
  // } catch (err) {
  //   res.status(400).send(err);
  // }
}