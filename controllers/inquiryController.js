const Inquiry =
  require("../models/Inquiry");


// Submit Inquiry
const createInquiry = async (
  req,
  res
) => {

  try {

    // Get data from request body
    const {
      propertyId,
      buyerName,
      buyerEmail,
      message,
    } = req.body;


    // Validation
    if (
      !propertyId ||
      !buyerName ||
      !buyerEmail ||
      !message
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Please fill all fields",
      });

    }


    // Create inquiry
    const inquiry =
      await Inquiry.create({

        propertyId,

        buyerName,

        buyerEmail,

        message,
      });


    // Success response
    res.status(201).json({

      success: true,

      message:
        "Inquiry submitted successfully",

      inquiry,

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
  createInquiry,
};