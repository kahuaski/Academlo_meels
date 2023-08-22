// Models
const { Restaurants } = require("../models/restaurants.models");
const { AppError } = require("../utils/appError.utils");
const { catchAsync } = require("../utils/catchAsync.utils");

exports.restaurantExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  exports.restaurant = await Restaurants.findOne({ where: { id } });
  req.restaurant = restaurant;
  
  if (!restaurant) {
    return next(new AppError("restaurant not found ☹", 404));
  }

  
  req.restaurant = restaurant;
  next();
});

