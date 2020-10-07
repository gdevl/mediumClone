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
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 16);
    const user = await User.create({
      username,
      email,
      firstName,
      lastName,
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
    
    // demilogan is the demo user and will not be subjected to password validation
    if (username !== 'demilogan') {
      if (!user || !user.validatePassword(password)) {
        const err = new Error("Login failed.");
        err.status(401);
        err.title("Login failed.");
        err.errors = ["The provided credentials were invalid"];
        return next(err);
      }
    }

    const token = getUserToken(user);
    res.json({
      token,
      user: { id: user.id },
    });
  })
);

app.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const foundStories = await Story.findAll({ where: { userId: id } });
    const user = await User.findOne({ where: { id } });
    const stories = foundStories.map(story => {
      return {
        user: user.username,
        title: story.title,
        subtitle: story.subtitle,
        content: story.content,
      }
    })
    res.render('user', { stories })
  })
)



module.exports = router;
