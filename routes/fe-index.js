const express = require("express");

const { User, Story, StoryClap, sequelize } = require("../db/models");
const { asyncHandler, createTrendingStories, formatDate } = require("../utils");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
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

    topStoryClaps = topStoryClaps.splice(0, 6);

    const trendingStoriesData = createTrendingStories(topStoryClaps);

    const stories = await Story.findAll({
      limit: 10,
      order: [["userId", "DESC"]],
      include: {
        model: User,
      },
    });

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
      storiesData: storiesData(stories),
      trendingStoriesData,
      user: req.user,
    });
  })
);

// router.get(
//   "/",
//   asyncHandler(async (req, res, next) => {
//     const stories = await Story.findAll({
//       limit: 10,
//       attributes: [
//         "id",
//         "title",
//         "subtitle",
//         "userId",
//         "content",
//         formatDate(story.createdAt),
//       ],
//       order: [["userId", "DESC"]],
//       include: {
//         model: User,
//       },
//     });
//     res.render("home", { stories, user: req.user });
//   })
// );

module.exports = router;
