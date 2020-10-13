const express = require("express");

const { User, Story, StoryClap, sequelize, Follow } = require("../db/models");
const { asyncHandler, createTrendingStories, formatDate, determineReadTime } = require("../utils");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    
    const randomNums = Array.from({ length: 6 }, () => Math.floor(Math.random()*35 + 1));

    
    //******** Async Calls
    
    const heroStories = await Story.findAll({
      where: { id: randomNums },
      include: User
    })
    
    let topStoryClaps = await Story.findAll({
      group: ["Story.id", "User.id"],
      include: [
        {
          model: StoryClap,
          attributes: [],
        },
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "avatarUrl", "bio"],
        },
      ],
      attributes: [
        "id",
        "title",
        "subtitle",
        "userId",
        "updatedAt",
        "content",
        [sequelize.fn("COUNT", sequelize.col("StoryClaps.id")), "num_claps"],
      ],
      order: [[sequelize.literal("num_claps"), "DESC"]],
    });
    
    const stories = await Story.findAll({
      limit: 10,
      order: [["userId", "DESC"]],
      include: {
        model: User,
      },
    });
    
    //********** Sync functions
    const authorsUnfiltered = []
    const seen = new Set();
    
    heroStories.map(story => {
      story.readTime = determineReadTime(story.content);
      story.date = formatDate(story.updatedAt);
      authorsUnfiltered.push(story.User)
    });
    
    // filter any repeated authors
    const authorsFiltered = authorsUnfiltered.filter(ele => {
      if (!seen.has(ele.id)) {
        seen.add(ele.id);
        return ele.id;
      }
    });

    
    const addFollowData = async (authorsArray) => {
      let auths = [];
      if (req.user) {
        for(let i=0; i<authorsArray.length; i++){
          const follows = await Follow.findAll({
            where: { followerId: req.user.id, followedId: authorsArray[i].id },
          });
          if (follows.length > 0) {
            authorsArray[i].followBtnText = 'Following';
          } else {
            authorsArray[i].followBtnText = 'Follow';
          }
          auths.push(authorsArray[i]);
        }
        return auths
      }else{
        return authorsArray;
      }
    }

    const authors = await addFollowData(authorsFiltered);
    
    
    const hero = heroStories.pop();
    heroStories.splice(4);
    
    topStoryClaps = topStoryClaps.splice(0, 6);
    const trendingStoriesData = createTrendingStories(topStoryClaps);
    
    
    const storiesData = (query) => {
      return query.map((story) => {
        return {
          id: story.id,
          title: story.title,
          subtitle: story.subtitle,
          authorId: story.User.id,
          image: story.imageUrl,
          authorName: `${story.User.firstName} ${story.User.lastName}`,
          date: formatDate(story.createdAt),
        };
      });
    };

    res.render("home", {
      hero,
      heroStories,
      authors,
      trendingStoriesData,
      storiesData: storiesData(stories),
      user: req.user,
    });
  })
);

module.exports = router;
