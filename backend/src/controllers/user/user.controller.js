const Document = require("../../models/document.model");
const Comment = require("../../models/comment.model");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

// New added route for searching documents
const searchDocuments = async (req, res) => {
  const query = req.query.q || ""; // Get the search query from the request, default to empty string if not provided

  try {
    // Search for documents where the name matches the query (case-insensitive)
    const documents = await Document.find({
      name: { $regex: query, $options: "i" },
    });

    // Render a view or send the search results
    res.render("searchResults", { documents });
  } catch (err) {
    console.error("Error searching documents:", err);
    res.status(500).json({ error: "Error searching documents" });
  }
};

// Route for displaying comments and user profile
exports.userProfile = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.render("profile", { comments });
  } catch (err) {
    console.error("Error retrieving profile:", err);
    req.flash("message", "Error retrieving profile"); // Use req.flash instead of res.flash
    res.redirect("/"); // Redirect to a safe route
  }
};

// User routes
exports.userPage = async (req, res) => {
  try {
    const documents = await Document.find();
    const comments = await Comment.find().sort({ createdAt: -1 }); // Fetch comments here
    res.render("profile", {
      documents,
      comments,
      message: req.flash("message"),
    }); // Pass comments to the view
  } catch (err) {
    console.error("Error loading user page:", err);
    res.render("500error");
  }
};

exports.searchDocuments = searchDocuments; // Ensure the function is exported

exports.downloadDoc = async (req, res) => {
  try {
    const { id } = req.params;
    const foundDoc = await Document.findById(id);
    if (!foundDoc) {
      req.flash("message", "Document not found");
      const documents = await Document.find();
      return res.render("profile", {
        documents,
        message: req.flash("message"),
      });
    }

    // Extract the public_id from the Cloudinary URL
    console.log(foundDoc.path);
    const urlParts = foundDoc.path;
    const publicId = urlParts;

    // Generate a signed URL with download transformation
    const downloadUrl = cloudinary.url(publicId, {
      resource_type: "raw",
      flags: "attachment",
      sign_url: true,
    });

    res.redirect(downloadUrl);
  } catch (err) {
    console.error("Error downloading document:", err);
    res.render("500error");
  }
};
