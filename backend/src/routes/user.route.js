const express = require("express");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const router = express.Router(); // Define router
const {
  adminPage,
  uploadDoc,
  delDoc,
  addComment,
  deleteComment,
} = require("../controllers/user/admin.controller");
const {
  userPage,
  downloadDoc,
  userProfile,
  searchDocuments,
} = require("../controllers/user/user.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { roleAuth } = require("../middlewares/isAdmin.middleware");
const { upload } = require("../middlewares/multer.middleware");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware for file upload
router.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Admin Routes
router.get("/admin", verifyToken, roleAuth("admin"), adminPage);

// Simplified upload route
router.post("/upload", verifyToken, roleAuth("admin"), uploadDoc);

router.get("/delete/:id", verifyToken, roleAuth("admin"), delDoc);
router.post("/admin/add-comment", verifyToken, roleAuth("admin"), addComment);
router.post(
  "/admin/delete-comment/:id",
  verifyToken,
  roleAuth("admin"),
  deleteComment
);

// User Routes
router.get("/profile", verifyToken, roleAuth("user"), userPage);
router.get("/profile", verifyToken, roleAuth("user"), userProfile);
router.get("/download/:id", verifyToken, roleAuth("user"), downloadDoc);

// Document Search Route
router.get("/search", verifyToken, roleAuth("user"), searchDocuments);

module.exports = router; // Export the consolidated router
