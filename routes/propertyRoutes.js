const express = require("express");

const router = express.Router();


// IMPORT CONTROLLER
const propertyController = require(
  "../controllers/propertyController"
);


// IMPORT AUTH MIDDLEWARE
const authMiddleware = require(
  "../middleware/authMiddleware"
);


// IMPORT UPLOAD MIDDLEWARE
const upload = require(
  "../middleware/uploadMiddleware"
);


// DEBUG LOGS
console.log("createProperty:",
  propertyController.createProperty
);

console.log("authMiddleware:",
  authMiddleware
);

console.log("upload:",
  upload
);


// CREATE PROPERTY
router.post(
  "/",
  authMiddleware,
  upload.array("images", 5),
  propertyController.createProperty
);


// GET ALL PROPERTIES
router.get(
  "/",
  propertyController.getAllProperties
);


router.get(
  "/search",
  propertyController.searchProperties
);

// GET SINGLE PROPERTY
router.get(
  "/:id",
  propertyController.getSingleProperty
);


// UPDATE PROPERTY
router.put(
  "/:id",
  authMiddleware,
  propertyController.updateProperty
);


// DELETE PROPERTY
router.delete(
  "/:id",
  authMiddleware,
  propertyController.deleteProperty
);

module.exports = router;