const express =
  require("express");

const router =
  express.Router();

const {
  createInquiry,
} = require(
  "../controllers/inquiryController"
);


// Submit Inquiry
router.post(
  "/",
  createInquiry
);


module.exports = router;