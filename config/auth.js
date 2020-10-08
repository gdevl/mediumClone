const jwt = require("jsonwebtoken");
const user = require("../db/models/user");
const { jwtConfig } = require("./index");
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

const getUserToken = (user) => {
  const userDataForToken = {
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    // added
    userId: user.id,
  };
  const token = jwt.sign({ data: userDataForToken }, secret, {
    expiresIn: parseInt(expiresIn, 10),
  });
  return token;
};

const checkUser = (req, res, next) => {
  const { token } = req
  if (!token) {
    const err = new Error("Not logged in.");
    err.status = 401;
    return next(err);
  }

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      err.status = 401;
      return next(err);
    }

    const { userId } = jwtPayload.data;

    try {
      req.user = await User.findByPk(userId);
    } catch (err) {
      return next(err);
    }

  })
  return next();
}

module.exports = {
  getUserToken,
  checkUser,
};
