const express = require("express");
const multer = require("multer");
const { adminPage, uploadDoc, delDoc } = require("../controllers/user/admin.controller");
const { userPage, viewDoc, downloadDoc } = require("../controllers/user/user.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { adminAuth } = require("../middlewares/isAdmin.middleware");

const userRoute = express.Router();
const upload = multer({ dest: "uploads/" });

//admin Routes
userRoute.get("/admin", verifyToken, adminAuth, adminPage);
userRoute.post("/upload", verifyToken, adminAuth, uploadDoc);
userRoute.delete("/delete/:id", verifyToken, adminAuth, delDoc);

//UserRoutes
userRoute.get("/profile", verifyToken, userPage);
userRoute.get("/download/:id", verifyToken, downloadDoc);

module.exports = userRoute;
