const adminMiddleware = (
  req,
  res,
  next
) => {

  try {

    // Check user role
    if (
      req.user.role !== "admin"
    ) {

      return res.status(403).json({

        success: false,

        message:
          "Access denied. Admin only.",

      });

    }


    // Continue
    next();

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};


module.exports =
  adminMiddleware;