const express = require("express");
const bcrypt = require("bcryptjs");
const { User, Story, Follow } = require("../db/models");
const { getUserToken } = require("../config/auth");

const { asyncHandler, formatDate } = require("../utils");

const router = express.Router();

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const stories = await Story.findAll({
      where: { userId: id },
      include: { model: User },
    });

    const storiesData = (query) => {
      return query.map((story) => {
        return {
          id: story.id,
          bio: `${story.User.bio}`,
          avatarUrl: `${story.User.avatarUrl}`,
          title: story.title,
          subtitle: story.subtitle,
          authorId: story.User.id,
          image: story.imageUrl,
          authorName: `${story.User.firstName} ${story.User.lastName}`,
          date: formatDate(story.createdAt),
        };
      });
    };

    const following = await Follow.findAll({
      where: { followerId: id }
    })
    const followers = await Follow.findAll({
      where: { followedId: id }
    })

    if (req.user) {
      const follows = await Follow.findAll({
        where: { followerId: req.user.id, followedId: req.params.id },
      });
      let followBtnText;
      if(follows.length > 0){
        followBtnText = 'Following'
      }else{
        followBtnText = 'Follow'
      }
      res.render("user", {
        storiesData: storiesData(stories),
        following: following.length,
        followers: followers.length,
        followBtnText,
        user: req.user,
      });
    } else {
      res.render("user", {
        storiesData: storiesData(stories),
        following: following.length,
        followers: followers.length,
      });
    }
  })
);

router.get('/:id(\\d+)/user-info', asyncHandler(async(req, res, next) => {
  const id = req.params.id;
  const user = await User.findByPk(id);
  res.render('user-info', { user });
}))

module.exports = router;
