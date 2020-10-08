const express = require("express");
const { User, Story, Follow } = require("../db/models");
const { getUserToken } = require("../config/auth");

const { asyncHandler } = require("../utils");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const stories = await Story.findAll({
      limit: 10,
      order: [["userId", "DESC"]],
      include: {
        model: User,
      },
    });
    res.render("home", { stories, user: req.user });
  })
);

module.exports = router;
