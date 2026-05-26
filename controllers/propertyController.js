const Property = require("../models/Property");


// CREATE PROPERTY
const createProperty = async (req, res) => {
  try {

    console.log("FILES:", req.files);

    let imageUrls = [];

    if (req.files && req.files.length > 0) {

      imageUrls = req.files.map(
        (file) => file.path
      );

    }

    const newProperty = new Property({
      ...req.body,

      images: imageUrls,

      createdBy: req.user.id,
    });

    await newProperty.save();

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      property: newProperty,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};


// GET ALL PROPERTIES
const getAllProperties = async (req, res) => {
  try {

    const properties = await Property.find();

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


// GET SINGLE PROPERTY
const getSingleProperty = async (
  req,
  res
) => {

  try {

    // Find property by ID
    const property =
      await Property.findById(
        req.params.id
      );

    // Check property exists
    if (!property) {

      return res.status(404).json({
        success: false,
        message: "Property not found",
      });

    }

    // Increase views count
    property.views += 1;

    // Save updated views
    await property.save();

    // Send response
    res.status(200).json({
      success: true,
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


// UPDATE PROPERTY
const updateProperty = async (req, res) => {
  try {

    const updatedProperty =
      await Property.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json({
      success: true,
      message: "Property updated",
      property: updatedProperty,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};


// DELETE PROPERTY
const deleteProperty = async (req, res) => {
  try {

    await Property.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Property deleted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};


//Search Controlls
const searchProperties = async (req, res) => {
  try {

    // Create empty filter object
    let filters = {};

    // CITY FILTER
    if (req.query.city) {

      filters.city = req.query.city;

    }

    // PROPERTY TYPE FILTER
    if (req.query.propertyType) {

      filters.propertyType =
        req.query.propertyType;

    }

    // PRICE FILTER
    if (
      req.query.minPrice ||
      req.query.maxPrice
    ) {

      filters.price = {};

      // Minimum price
      if (req.query.minPrice) {

        filters.price.$gte =
          Number(req.query.minPrice);

      }

      // Maximum price
      if (req.query.maxPrice) {

        filters.price.$lte =
          Number(req.query.maxPrice);

      }

    }

    // Find filtered properties
    const properties =
      await Property.find(filters);

    res.status(200).json({
      success: true,
      results: properties.length,
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


// EXPORTS
module.exports = {
  createProperty,
  getAllProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
  searchProperties,
};