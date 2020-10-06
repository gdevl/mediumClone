const express = require('express');
const { Story } = require('../../db/models');

const { asyncHandler } = require('../../utils');
const {
  handleValidationErrors,
  storyValidator,
} = require('../../validations');

const router = express.Router();

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

module.exports = router;
const { StoryClap, Story, User } = require('../../db/models');
// const { getUserToken } = require('../../config/auth');

const { asyncHandler } = require('../../utils');
const {
    handleValidationErrors,
    signUpValidator,
    loginValidator
} = require('../../validations');


const router = express.Router();

// story not found error handler

function clapAlreadyExistsError(id) {
    let error = new Error(`Story with ${id} has already been clapped.`);
    error.title = "Clap already exists.";
    error.status = 400;
    return error;
  }

//not sure about this story clap route
router.post('/:id(\\d+)', asyncHandler (async (req, res, next) => {
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
        res.json(newStoryClap);
    } else {
        next(clapAlreadyExistsError(storyId))
    }
}));


module.exports = router;
