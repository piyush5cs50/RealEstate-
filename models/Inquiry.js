const mongoose = require("mongoose");


const inquirySchema =
  new mongoose.Schema(

    {
      // Property Reference
      propertyId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Property",

        required: true,
      },


      // Buyer Name
      buyerName: {

        type: String,

        required: true,

        trim: true,
      },


      // Buyer Email
      buyerEmail: {

        type: String,

        required: true,

        trim: true,
      },


      // Inquiry Message
      message: {

        type: String,

        required: true,

        trim: true,
      },

    },

    {
      timestamps: true,
    }

  );


module.exports =
  mongoose.model(
    "Inquiry",
    inquirySchema
  );