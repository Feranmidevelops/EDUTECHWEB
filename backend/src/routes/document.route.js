const express = require("express");
const router = express.Router();
const Document = require("../models/document.model"); // Adjust path as needed

// Search documents route
router.get("/search", async (req, res) => {
  const query = req.query.q; // Get the search term from the query string

  try {
    // Find documents where the name contains the search query (case-insensitive)
    const documents = await Document.find({
      name: { $regex: query, $options: "i" }, // 'i' makes the search case-insensitive
    });

    // Render a results page and pass the found documents
    res.render("searchResults", { documents });
  } catch (error) {
    res.status(500).send("Error searching documents");
  }
});

module.exports = router;
