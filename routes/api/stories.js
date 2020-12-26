const express = require('express');
const { StoryClap, Story, User } = require('../../db/models');
// const { getUserToken } = require('../../config/auth');
// const { checkUser } = require('../../config/auth')

const { asyncHandler } = require('../../utils');
const {
    handleValidationErrors,
    storyValidator,
    responseValidator,
} = require('../../validations');

const router = express.Router();

router.post('/', storyValidator, handleValidationErrors, asyncHandler(async (req, res, next) => {
    const { userId, title, subtitle, content, imageUrl} = req.body;
    try {
        const story = await Story.create({
            userId,
            title,
            subtitle,
            content,
            imageUrl,
        });
        console.log("STORY", story);
        // res.status(201).json({story})

    } catch (e) {
        console.log(e);
    }
}))




module.exports = router;
