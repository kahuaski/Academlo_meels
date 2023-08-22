// Models
const { Reviews } = require("../models/reviews.models");
const { AppError } = require("../utils/appError.utils");
const { catchAsync } = require("../utils/catchAsync.utils");

exports.reviewsExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const reviews = await Reviews.findOne({ where: { id } });
  req.reviews = reviews;
  
  if (!reviews) {
    return next(new AppError("reviews not found ", 404));
  }


  req.reviews = reviews;
  next();
});

exports.validateTokenAndUser = (req, res, next) => {
  //Validar que el dueño del token sea el creador del review
  const { userId } = req.reviews;

  if (!(parseInt(userId) === req.sessionUser.id)) {
    return next(new AppError("You are not the owner of the review ", 402));

   
  }
  next();
};


