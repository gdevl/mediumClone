const express = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../../db/models");
const { getUserToken } = require("../../config/auth");

const { asyncHandler } = require("../../utils");
const {
  handleValidationErrors,
  signUpValidator,
  loginValidator,
} = require("../../validations");

const router = express.Router();

router.post(
  "/",
  signUpValidator,
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const {
      username,
      password,
      email,
      firstName,
      lastName,
      bio,
      avatarUrl,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 16);
    const user = await User.create({
      username,
      email,
      firstName,
      lastName,
      bio,
      avatarUrl,
      hashedPassword,
    });

    const token = getUserToken(user);
    res.status(201).json({
      user: { id: user.id },
      token,
    });
  })
);

router.post(
  "/log-in",
  loginValidator,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });

    if (!user || !user.validatePassword(password)) {
      const err = new Error("Login failed.");
      err.status(401);
      err.title("Login failed.");
      err.errors = ["The provided credentials were invalid"];
      return next(err);
    }

    const token = getUserToken(user);
    res.json({
      token,
      user: { id: user.id },
    });
  })
);

module.exports = router;