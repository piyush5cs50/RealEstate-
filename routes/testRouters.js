const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Backend API is working"
  });
});
router.get("/test", (req, res) => {
  res.json({
    message: "Testing the Backend API is working or not"
  });
});

module.exports = router;