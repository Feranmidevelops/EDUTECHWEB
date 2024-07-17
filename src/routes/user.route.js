const express = require("express");
const { adminPage, uploadDoc, delDoc } = require("../controllers/user/admin.controller");
const { userPage, downloadDoc } = require("../controllers/user/user.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { roleAuth } = require("../middlewares/isAdmin.middleware");
const {upload} = require("../middlewares/multer.middleware")

const userRoute = express.Router();

//admin Routes
userRoute.get("/admin", verifyToken, roleAuth("admin"), adminPage);
userRoute.post("/upload", verifyToken, roleAuth("admin"), upload.single('document'), uploadDoc);
userRoute.get("/delete/:id", verifyToken, roleAuth("admin"), delDoc);

//UserRoutes
userRoute.get("/profile", verifyToken, roleAuth("user"), userPage);
userRoute.get("/download/:id", verifyToken, roleAuth("user"), downloadDoc);

module.exports = userRoute;
