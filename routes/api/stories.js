const express = require('express');
const { StoryClap, Story, User } = require('../../db/models');
// const { getUserToken } = require('../../config/auth');

const { asyncHandler } = require('../../utils');
const {
    handleValidationErrors,
    storyValidator,
    responseValidator,
} = require('../../validations');

const router = express.Router();

router.get('/create', (req, res) => {
    res.render('new-story');
})

router.post('/', storyValidator, handleValidationErrors, asyncHandler(async (req, res, next) => {
  const { user, title, subtitle, content } = req.body;
  const userId = user.id;
  const story = await Story.create({
    userId,
    title,
    subtitle,
    content,
  });
  res.status(201).json({story})
}))

// clap already exists error handler
function clapAlreadyExistsError(id) {
    let error = new Error(`Story with ${id} has already been clapped.`);
    error.title = "Clap already exists.";
    error.status = 400;
    return error;
  }

// clap creation route
router.post('/:id(\\d+)/clap', asyncHandler (async (req, res, next) => {
    const storyId = req.params.id;
    const userClap = await StoryClap.findAll({
        where: {
            userId: req.user.id,
            storyId: storyId
        }
    })

    if (userClap.length === 0) {
        const newStoryClap = await StoryClap.create({
            userId: req.user.id,
            storyId: storyId,
        });
        const totalClaps = await StoryClap.findAll({
            where: {
                storyId: storyId,
            }
        });
        const numClaps = totalClaps.length;
        res.json({newStoryClap, numClaps: numClaps}); // include number of current likes
    } else {
        next(clapAlreadyExistsError(storyId))
    }
}));


module.exports = router;
