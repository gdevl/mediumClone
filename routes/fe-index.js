const express = require("express");
const { User, Story, StoryClap, Follow } = require("../db/models");
const { getUserToken } = require("../config/auth");

const { asyncHandler } = require("../utils");

const router = express.Router();

router.get('/', asyncHandler(async (req, res, next) => {
  const mostPopularData = await StoryClap.findAndCountAll({
    include: { model: Story },
    limit: 6,
    order: [['storyId', 'DESC']],
    where: {
      createdAt: {
          [Op.gte]: moment().subtract(7, 'days').toDate()
      }
    }
  });
  console.log(mostPopularData)
  
  const stories = await Story.findAll({
    limit: 5,
    order: [['userId', 'DESC']],
    include: {
      model: User,
    }
  })
  // console.log(sstories)
  res.render('home', {stories});
}))

module.exports = router;