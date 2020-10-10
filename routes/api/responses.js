const express = require('express');
const { Response } = require('../../db/models');
// const { getUserToken } = require('../../config/auth');

const { asyncHandler } = require('../../utils');
const {
    handleValidationErrors,
    responseValidator,
} = require('../../validations');

const router = express.Router();


// response creation route
router.post('/create', responseValidator, handleValidationErrors, asyncHandler(async( req, res, next) => {
    const { content, userId, storyId } = req.body;

    const newResponse = await Response.create({
        userId,
        storyId,
        content,
    });
    
    res.status(201).json({newResponse})
}))


module.exports = router;
