
const { Users } = require("../models/users.models");
const { AppError } = require("../utils/appError.utils");
const { catchAsync } = require("../utils/catchAsync.utils");

exports.userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await Users.findOne({ where: { id } });
  req.user = user;
 
  if (!user) {
    return next(new AppError("user not found ", 404));
  }

 
  req.user = user;
  next();
});

exports.validateTokenAndId = (req, res, next) => {
  const { id } = req.params;

  
  if (!(parseInt(id) === req.sessionUser.id)) {
    return next(
      new AppError(
        "id from token does not match with id from end point ",
        402
      )
    );
   
  }
  next();
};


