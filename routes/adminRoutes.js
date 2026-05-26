const express =
require("express");

const router =
express.Router();

const {

  getAllProperties,

  approveProperty,

  rejectProperty,

  getAllInquiries,

  getAnalytics,

} = require(
  "../controllers/adminController"
);


const authMiddleware =
require(
  "../middleware/authMiddleware"
);

const adminMiddleware =
require(
  "../middleware/adminMiddleware"
);


// ============================
// View All Properties
// ============================

router.get(
  "/properties",

  authMiddleware,

  adminMiddleware,

  getAllProperties
);


// ============================
// Approve Property
// ============================

router.put(
  "/properties/approve/:id",

  authMiddleware,

  adminMiddleware,

  approveProperty
);


// ============================
// Reject Property
// ============================

router.delete(
  "/properties/reject/:id",

  authMiddleware,

  adminMiddleware,

  rejectProperty
);


// ============================
// View Inquiries
// ============================

router.get(
  "/inquiries",

  authMiddleware,

  adminMiddleware,

  getAllInquiries
);

router.get(
  "/analytics",

  authMiddleware,

  adminMiddleware,

  getAnalytics
);


module.exports = router;