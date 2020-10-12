const express = require('express');
const { ResponseClap } = require('../../db/models')
const {asyncHandler, clapAlreadyExistsError} = require('../../utils');

const router = express.Router();

//clap creation route

router.post('/', asyncHandler (async (req, res, next) => {
    const { responseId } = req.body;
    const userClap = await ResponseClap.findAll({
        where: {
            userId: req.user.id,
            responseId: responseId,
        }
    });

    if (userClap.length === 0) {
        const newResponseClap = await ResponseClap.create({
            userId: req.user.id,
            responseId,
        });
        const totalClaps = await ResponseClap.findAll({
            where: {
                responseId: responseId,
            }
        });

        const numClaps = totalClaps.length;

        res.status(201).json({newResponseClap, numClaps: numClaps})
    } else {
        next(clapAlreadyExistsError(responseId, "Response"));
    }
}))

router.delete('/', asyncHandler( async (req, res, next) => {
    const { responseId } = req.body;
    const userClap = await ResponseClap.findOne({
        where: {
            responseId: responseId,
            userId: req.user.id
        }
    });
    let removeClap = await userClap.destroy();

    const totalClaps = await ResponseClap.findAll({
        where: {
            responseId: responseId,
        }
    });
    const numClaps = totalClaps.length;
    res.status(201).json({numClaps: numClaps})
}));


module.exports = router;
