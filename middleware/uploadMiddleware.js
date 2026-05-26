const multer = require("multer");

const { CloudinaryStorage } =
  require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");


// Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,

  params: {
    folder: "real-estate-properties",

    allowed_formats: ["jpg", "png", "jpeg"],
  },
});


// Multer Upload
const upload = multer({
  storage: storage,
});

module.exports = upload;