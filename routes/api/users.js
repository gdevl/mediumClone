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

    const usernameCheck = await User.findOne({ where: { username: username } });

    if (usernameCheck) {
      const err = new Error("Sign-up failed");
      err.status = 409;
      err.title = "Sign-up failed";
      err.errors = ["Username is already in use"];
      return next(err);
    }

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
  // loginValidator,
  // handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username: username } });
    // return bcrypt.compareSync(password, user.hashedPassword.toString());

    if (
      !user ||
      !bcrypt.compareSync(password, user.hashedPassword.toString())
    ) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login failed";
      err.errors = ["Provided credentials are invalid"];
      return next(err);
    }

    const token = getUserToken(user);
    res.cookie("auth-token", token);
    res.json({ id: user.id });
  })
);

router.delete(
  "/log-out",
  asyncHandler(async (req, res, next) => {
    res.clearCookie("auth-token");
    res.status(200);
    res.json("Successfully logged out");
  })
);
module.exports = router;


router.post('/update', asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.body.userId);
  await user.update(req.body)
  res.status(201).json(user);
}))