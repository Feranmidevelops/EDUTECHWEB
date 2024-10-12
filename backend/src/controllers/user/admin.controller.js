const Document = require("../../models/document.model");
const Comment = require('../../models/comment.model');

// Admin Routes

// Renders the admin page with documents and comments
exports.adminPage = async (req, res) => {
  try {
    const documents = await Document.find();
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.render("admin", { documents, comments, message: req.flash("message") });
  } catch (err) {
    console.error("Error retrieving admin page:", err);
    req.flash("message", "Error retrieving admin page");
    res.redirect("/admin");
  }
};


// Adds a new comment
exports.addComment = async (req, res) => {
  try {
    const { content, author } = req.body;
    const newComment = new Comment({ content, author });
    await newComment.save();
    req.flash('message', 'Comment added successfully');
    res.redirect('/user/admin');
  } catch (err) {
    console.error('Error adding comment:', err);
    req.flash('message', 'Error adding comment');
    res.redirect('/user/admin');
  }
};


// Deletes a comment by ID
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) {
      req.flash("message", "Comment not found");
    } else {
      req.flash("message", "Comment deleted successfully");
    }

    res.redirect("/admin");
  } catch (err) {
    console.error("Error deleting comment:", err);
    req.flash("message", "Error deleting comment");
    res.redirect("/admin");
  }
};


// Uploads a document
exports.uploadDoc = async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const foundDoc = await Document.findOne({ name: originalname });

    if (foundDoc) {
      req.flash("message", "Document already stored");
      const documents = await Document.find();
      const comments = await Comment.find().sort({ createdAt: -1 });
      return res.render("admin", { documents, comments, message: req.flash("message") });
    }

    await Document.create({ name: originalname, path });
    req.flash("message", "Document uploaded successfully");
    res.redirect("/user/admin");
  } catch (err) {
    console.error("Error uploading document:", err);
    res.render("500error");
  }
};

// Deletes a document by ID
exports.delDoc = async (req, res) => {
  try {
    const { id } = req.params;
    const foundDoc = await Document.findByIdAndDelete(id);

    if (!foundDoc) {
      req.flash("message", "Document not found");
      const documents = await Document.find();
      const comments = await Comment.find().sort({ createdAt: -1 });
      return res.render("admin", { documents, comments, message: req.flash("message") });
    }

    req.flash("message", "Document deleted successfully");
    res.redirect("/user/admin");
  } catch (err) {
    console.error("Error deleting document:", err);
    res.render("500error");
  }
};
