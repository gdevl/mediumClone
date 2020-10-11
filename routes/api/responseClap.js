const express = require('express');
const { ResponseClap } = require('../../db/models')
const {asyncHandler, clapAlreadyExistsError} = require('../../utils');

const router = express.Router();

//clap creation route

router.post('/', asyncHandler (async (req, res, next) => {
    const { userId, responseId } = req.body;
    const userClap = await ResponseClap.findAll({
        where: {
            userId: userId,
            responseId: responseId,
        }
    });

    if (userClap.length === 0) {
        const newResponseClap = await ResponseClap.create({
            userId,
            responseId,
        });
        const totalClaps = await StoryClap.findAll({
            where: {
                responseId: responseId,
            }
        });

        const numClaps = totalClaps.length;

        res.status(201).json({newResponseClap, numClaps})
    } else {
        next(clapAlreadyExistsError(responseId, "Response"));
    }
}))

router.delete('/', asyncHandler( async (req, res, next) => {
    const { userId, responseId } = req.body;
    const userClap = await ResponseClap.findOne({
        where: {
            responseId: responseId,
            userId: userId,
        }
    });
    let removeClap = await userClap.destroy();

    const totalClaps = await ResponseClap.findAll({
        where: {
            responseId: responseId,
        }
    });
    const numClaps = totalClaps.length;

    res.status(201).json({numClaps})
}));


module.exports = router;
