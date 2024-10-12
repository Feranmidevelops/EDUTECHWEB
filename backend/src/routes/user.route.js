const express = require("express");
const router = express.Router(); // Define router
const { adminPage, uploadDoc, delDoc, addComment, deleteComment } = require("../controllers/user/admin.controller");
const { userPage, downloadDoc, userProfile, searchDocuments } = require("../controllers/user/user.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { roleAuth } = require("../middlewares/isAdmin.middleware");
const { upload } = require("../middlewares/multer.middleware");

// Admin Routes
router.get("/admin", verifyToken, roleAuth("admin"), adminPage);
router.post("/upload", verifyToken, roleAuth("admin"), upload.single('document'), uploadDoc);
router.get("/delete/:id", verifyToken, roleAuth("admin"), delDoc);
router.post('/admin/add-comment', verifyToken, roleAuth('admin'), addComment);
router.post('/admin/delete-comment/:id', verifyToken, roleAuth("admin"), deleteComment);

// User Routes
router.get("/profile", verifyToken, roleAuth("user"), userPage);
router.get("/profile", verifyToken, roleAuth("user"), userProfile);
router.get("/download/:id", verifyToken, roleAuth("user"), downloadDoc);

// Document Search Route
router.get("/search", verifyToken, roleAuth("user"), searchDocuments);

module.exports = router; // Export the consolidated router
