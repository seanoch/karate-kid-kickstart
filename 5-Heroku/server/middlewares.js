const uuid = require("uuid");

module.exports.userIdMiddleware = (req, res, next) => {
  let userId = req.cookies?.userId;

  if (!userId) {
    userId = uuid.v4();
    res.cookie("userId", userId);
  }
  
  req.userId = userId;

  next();
};
