const express = require("express");

const router = express.Router();

const { asyncHandler, formatDate, determineReadTime } = require("../utils");
const { User, Story, StoryClap, Response, Follow } = require('../db/models');


router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const storyId = parseInt(req.params.id, 10);
    const storyData = await Story.findOne({
        where: { id: storyId },
        include: User,
    });

    const storyClaps = await StoryClap.findAndCountAll({
        where: { storyId: storyId }
    });

    let imageClapped;
    let isClapped;
    let followBtnText;

    if (req.user) {
        const currentUser = req.user.id;
        const isStoryClapped = await StoryClap.findOne({
            where: {
                storyId: storyId,
                userId: currentUser,
            }
        })
        if (!isStoryClapped) {
            isClapped = 'toBeClapped'
            imageClapped = false
        } else {
            isClapped = 'unclap'
            imageClapped = true;
        }
        const follows = await Follow.findAll({
            where: { followerId: req.user.id, followedId: req.params.id },
        });
        if (follows.length > 0) {
            followBtnText = 'Following'
        } else {
            followBtnText = 'Follow'
        }
    } else {
        isClapped = null;
    }

    const storyResponses = await Response.findAndCountAll({
        where: { storyId: storyId }
    });

    const story = {
        id: storyData.id,
        title: storyData.title,
        subtitle: storyData.subtitle,
        content: storyData.content,
        imageUrl: storyData.imageUrl,
        readTime: determineReadTime(storyData.content),
        date: formatDate(storyData.updatedAt),
        authorId: storyData.User.id,
        authorName: `${storyData.User.firstName} ${storyData.User.lastName}`,
        avatarUrl: storyData.User.avatarUrl,
        bio: storyData.User.bio,
        clapsCount: storyClaps.count,
        responsesCount: storyResponses.count,
        isClapped,
        imageClapped,
    }
    res.render('story-page', { story, followBtnText });
}));





module.exports = router;
