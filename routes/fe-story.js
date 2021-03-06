const express = require("express");

const router = express.Router();

const { asyncHandler, formatDate, determineReadTime, createTrendingStories } = require("../utils");
const {
    User,
    Story,
    StoryClap,
    Response,
    ResponseClap,
    Follow,
    sequelize
} = require('../db/models');


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
    let currentUser;
    let followBtnText;


    if (req.user) {
        currentUser = req.user;
        const isStoryClapped = await StoryClap.findOne({
            where: {
                storyId: storyId,
                userId: currentUser.id,
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
            where: { followerId: req.user.id, followedId: storyData.User.id },
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
        where: { storyId: storyId },
        include: [
            User,
            {
                model: ResponseClap,
                attributes: [],
            },
        ],
        order: [["createdAt", "DESC"]],
        
    });

    if (currentUser) {
        for (let i = 0; i < storyResponses.rows.length; i++) {
            let newObj = {};
            let currentResponse = storyResponses.rows[i];
            let responseClapStatus;
            let responseImageClapped;
            const responseId = currentResponse.dataValues.id;

            const totalResponseClaps = await ResponseClap.findAll({
                where: {
                    responseId: responseId,
                }
            });
            newObj.numResponseClaps = totalResponseClaps.length;

            const isResponseClappedByUser = await ResponseClap.findOne({
                where: {
                    responseId: responseId,
                    userId: currentUser.id,
                }
            })
            if (!isResponseClappedByUser) {
                responseClapStatus = 'toBeClapped'
                responseImageClapped = false
            } else {
                responseClapStatus = 'unclap'
                responseImageClapped = true;
            }
            newObj.responseClapStatus = responseClapStatus;
            newObj.responseImageClapped = responseImageClapped;
            currentResponse.obj = newObj;
        }
    }

    storyResponses.rows.map( async (response) => {
        response.date = formatDate(response.dataValues.updatedAt)

    })


    const story = {
        id: storyData.id,
        title: storyData.title,
        subtitle: storyData.subtitle,
        content: storyData.content,
        imageUrl: storyData.imageUrl,
        readTime: determineReadTime(storyData.content),
        date: formatDate(storyData.updatedAt),
        authorId: storyData.User.id,
        authorUsername: storyData.User.username,
        authorName: `${storyData.User.firstName} ${storyData.User.lastName}`,
        avatarUrl: storyData.User.avatarUrl,
        bio: storyData.User.bio,
        clapsCount: storyClaps.count,
        responsesCount: storyResponses.count,
        responses: storyResponses.rows,
        isClapped,
        imageClapped,
    }

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


    res.render('story-page', {
        story,
        currentUser,
        followBtnText,
        trendingStoriesData,
        user: currentUser
    });
}));





module.exports = router;
