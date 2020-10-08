const express = require("express");

const { User, Story } = require("../db/models");

const { asyncHandler } = require("../utils");

const router = express.Router();


router.get("/:username(\\w+)/:title(\\w+)", asyncHandler(async (req, res, next) => {
    const username = req.params.username;
    const story = await Story.findOne({
        where: { username: username,  title: title }, 
        include: { model: User },
    });
    res.render('story-page', { story })
    })
)

module.exports = router;