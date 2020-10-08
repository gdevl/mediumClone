const express = require("express");
const bcrypt = require("bcryptjs");
const { User, Story, Follow } = require("../db/models");
const { getUserToken } = require("../config/auth");

const { asyncHandler } = require("../utils");

const router = express.Router();

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const stories = await Story.findAll({
      where: { userId: id },
      include: { model: User },
    });

    const follows = await Follow.findAll({
      where: { followerId: req.user.id, followedId: req.params.id },
    });
    // if follows.length ==== 0
    console.log("follows: ", follows);
    res.render("user", { stories, follows, user: req.user });
  })
);

module.exports = router;
