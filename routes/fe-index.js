const express = require("express");
const { User, Story, Follow } = require("../db/models");
const { getUserToken } = require("../config/auth");

const { asyncHandler } = require("../utils");

const router = express.Router();

router.get('/', asyncHandler(async (req, res, next) => {
  const stories = await Story.findAll({
    limit: 5,
    order: [['userId', 'DESC']],
    include: {
      model: User,
      attributes:['username', 'id'],
    }
  })
  // console.log(sstories)
  res.render('home', {stories});
}))

module.exports = router;