const express = require("express");

const { User, Story, StoryClap, Follow } = require("../db/models");
const { asyncHandler, createTrendingStories } = require("../utils");


const router = express.Router();

router.get('/', asyncHandler(async (req, res, next) => {
  const topStoryClaps = await StoryClap.findAll({
    group: ['Story.id'],
    include: { model: StoryClap, attributes: [] },
    attributes: ['title', 'subtitle', [db.sequelize.fn('COUNT', db.sequelize.col('StoryClaps.id')), 'num_claps']],
    order: [[db.sequelize.literal('num_claps'), 'DESC']]
  });
  
  const trendingStoriesData = createTrendingStories(topStoryClaps);
  
  const stories = await Story.findAll({
    limit: 5,
    order: [['userId', 'DESC']],
    include: {
      model: User,
    }
  })

  res.render('home', { stories, trendingStoriesData });
}))

module.exports = router;