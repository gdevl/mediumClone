const express = require("express");
const bcrypt = require("bcryptjs");
const { User, Story } = require("../../db/models");
const { getUserToken } = require("../../config/auth");

const { asyncHandler } = require("../../utils");
const {
  handleValidationErrors,
  signUpValidator,
  loginValidator,
} = require("../../validations");

const router = express.Router();

router.post(
  "/sign-up",
  signUpValidator,
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const { username, password, email, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      firstName,
      lastName,
      hashedPassword,
    });

    const token = getUserToken(user);
    res.cookie("auth-token", token);
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
  asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username: username } });
    // return bcrypt.compareSync(password, user.hashedPassword.toString());

    if (
      !user ||
      !bcrypt.compareSync(password, user.hashedPassword.toString())
    ) {
      const err = new Error("Login failed.");
      err.status = 401;
      err.title = "Login failed.";
      err.errors = ["The provided credentials were invalid"];
      return next(err);
    }

    const token = getUserToken(user);
    res.cookie("auth-token", token);
    res.json({ id: user.id });
  })
);

module.exports = router;
