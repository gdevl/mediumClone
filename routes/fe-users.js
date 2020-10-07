const express = require("express");
const bcrypt = require("bcryptjs");
const { User, Story } = require("../../db/models");
const { getUserToken } = require("../../config/auth");

const { asyncHandler } = require("../../utils");

const router = express.Router();


router.get(
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