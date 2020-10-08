const express = require("express");
const { User, Story, StoryClap, Follow } = require("../db/models");
const { getUserToken } = require("../config/auth");

const { asyncHandler, formatDate, determineReadTime } = require("../utils");


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

  const trendingStoriesData = topStoryClaps.map(storyClap => {
    return { 
      title: storyClap.Story.title,
      authorName: `${storyClap.Story.User.firstName} ${storyClap.Story.User.lastName}`,
      authorAvatar: storyClap.Story.User.avatarUrl,
      date: formatDate(storyClap.Story.updatedAt),
      readTime: determineReadTime(storyClap.Story.content)
    }
  })
  
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