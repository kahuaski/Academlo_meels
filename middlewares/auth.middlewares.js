const { Users } = require("../models/users.models");
const jwt = require("jsonwebtoken");
const { catchAsync } = require("../utils/catchAsync.utils");
const { AppError } = require("../utils/appError.utils");


exports.protectSession = catchAsync(async (req, res, next) => {
  // Get token
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Extract token
    
    token = req.headers.authorization.split(" ")[1]; 
  }

  if (!token) {
    return res.status(403).json({
      status: "error",
      message: "Invalid session",
    });
  }


  const decoded = jwt.verify(token, "blsjhos");

  const user = await Users.findOne({
    where: { id: decoded.id, status: "active" },
  });

  if (!user) {
    return res.status(403).json({
      status: "error",
      message: "The owner of the session is no longer active 😒",
    });
  }

  req.sessionUser = user;
  next();
});

exports.protectAdmin = (req, res, next) => {
  const { sessionUser } = req;

  if (sessionUser.role !== "admin") {
    return next(
      new AppError("You do not have the access level for this data. 😯", 403)
    );
  }

  next();
};

