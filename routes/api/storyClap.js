const express = require('express');
const { StoryClap } = require('../../db/models');
const {asyncHandler} = require('../../utils')

const router = express.Router();


// clap already exists error handler
function clapAlreadyExistsError(id) {
    let error = new Error(`Story with ${id} has already been clapped.`);
    error.title = "Clap already exists.";
    error.status = 400;
    return error;
}


// clap creation route
router.post('/', asyncHandler (async (req, res, next) => {
    const { storyId } = req.body;
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

        res.status(201).json({newStoryClap, numClaps: numClaps}); // include number of current likes
    } else {
        next(clapAlreadyExistsError(storyId))
    }
}));

router.delete('/', asyncHandler (async(req,res, next) => {
    const { storyId }= req.body;
    const userClap = await StoryClap.findOne({
        where: {
            userId: req.user.id,
            storyId: storyId
        }
    })
    let removeClap = await userClap.destroy();
    const totalClaps = await StoryClap.findAll({
        where: {
            storyId: storyId,
        }
    });
    const numClaps = totalClaps.length;
    res.json({numClaps});
}))

module.exports = router;
