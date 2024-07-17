const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname.substring(0, file.originalname.lastIndexOf(".")) +
        "_" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

exports.upload = multer({
  storage: storage,
  // limits: { fileSize: 1024 * 1024 * 1 }
});
