const express = require("express");
const { User, Story, StoryClap, Follow } = require("../db/models");


const { asyncHandler, trendingStoriesData } = require("../utils");


const router = express.Router();

router.get('/', asyncHandler(async (req, res, next) => {
  const topStoryClaps = await StoryClap.findAll({
    // where: {
    //   createdAt: {
    //       [Op.gte]: [moment().subtract(7, 'days').toDate()]
    //   }
    // },
    include: { 
      model: Story, 
      include: { model: User }
    },
    limit: 6,
    order: [['storyId', 'DESC']],
  });
  
  const stories = await Story.findAll({
    limit: 5,
    order: [['userId', 'DESC']],
    include: {
      model: User,
    }
  })
  // console.log(stories)
  res.render('home', { stories, trendingStoriesData });
}))

module.exports = router;