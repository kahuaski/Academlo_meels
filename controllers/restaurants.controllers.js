const { Restaurants } = require("../models/restaurants.models");
const { AppError } = require("../utils/appError.utils");
const { catchAsync } = require("../utils/catchAsync.utils");

exports.restaurantCreate = catchAsync(async (req, res) => {
  await Restaurants.create({
    name: req.body.name,
    address: req.body.address,
    rating: req.body.rating,
    status: "active",
  });

  res.status(201).json({
    status: "success",
  });
});

exports.restaurantsAll = catchAsync(async (req, res) => {
  const restaurants = await Restaurants.findAll({
    where: { status: "active" },
  });

  res.status(200).json({
    status: "success",
    data: {
      restaurants,
    },
  });
});

exports.restaurantFind = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const restaurant = await Restaurants.findOne({ where: { id } });
  if (!restaurant) {
    return next(new AppError("restaurant not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      restaurant,
    },
  });
});

exports.restaurantsUpdate = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const restaurant = await Restaurants.findOne({ where: { id } });

  if (!restaurant) {
    return next(new AppError("restaurant not found 🙁", 404));
  }

  const result = await restaurant.update({
    name: req.body.name,
    address: req.body.address,
  });

  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.restaurantsDelete = catchAsync(async (req, res) => {
  const { id } = req.params;
  const restaurant = await Restaurants.findOne({ where: { id } });
  restaurant.update({ status: "delete" });

  res.status(200).json({
    status: "success",
  });
});

