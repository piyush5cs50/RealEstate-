const Property =
require("../models/Property");

const Inquiry =
require("../models/Inquiry");

const User =
require("../models/User");


// ============================
// View All Properties
// ============================


const getAllProperties =
async (req, res) => {

  try {

    const properties =
      await Property.find()
      .populate(
        "createdBy",
        "name email"
      );

    res.status(200).json({

      success: true,

      properties,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};


// ============================
// Approve Property
// ============================

const approveProperty =
async (req, res) => {

  try {

    const property =
      await Property.findById(
        req.params.id
      );

    if (!property) {

      return res.status(404).json({

        success: false,

        message:
          "Property not found",

      });

    }


    property.isApproved = true;

    await property.save();


    res.status(200).json({

      success: true,

      message:
        "Property approved",

      property,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};


// ============================
// Reject Property
// ============================

const rejectProperty =
async (req, res) => {

  try {

    const property =
      await Property.findByIdAndDelete(
        req.params.id
      );

    if (!property) {

      return res.status(404).json({

        success: false,

        message:
          "Property not found",

      });

    }


    res.status(200).json({

      success: true,

      message:
        "Property rejected and deleted",

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};


// ============================
// View All Inquiries
// ============================

const getAllInquiries =
async (req, res) => {

  try {

    const inquiries =
      await Inquiry.find()

      .populate(
        "propertyId",
        "title city price"
      );


    res.status(200).json({

      success: true,

      inquiries,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};

const getAnalytics =
async (req, res) => {

  try {

    // ======================
    // Total Users
    // ======================

    const totalUsers =
      await User.countDocuments();


    // ======================
    // Total Properties
    // ======================

    const totalProperties =
      await Property.countDocuments();


    // ======================
    // Total Inquiries
    // ======================

    const totalInquiries =
      await Inquiry.countDocuments();


    // ======================
    // Get All Properties
    // ======================

    const properties =
      await Property.find();


    // ======================
    // Total Views
    // ======================

    const totalViews =
      properties.reduce(

        (total, property) =>

          total + property.views,

        0
      );


    // ======================
    // Response
    // ======================

    res.status(200).json({

      success: true,

      analytics: {

        totalUsers,

        totalProperties,

        totalInquiries,

        totalViews,
      },

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};


module.exports = {

  getAllProperties,

  approveProperty,

  rejectProperty,

  getAllInquiries,
  
  getAnalytics,
};