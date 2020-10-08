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
    const { content } = req.body;
    const userId = localStorage.getItem('MEDIUM_CLONE_CURRENT_USER_ID');
    const storyId = req.params.id;

    const newResponse = await Response.create({
        userId,
        storyId,
        content,
    });
    res.status(201).json({newResponse})
}))


module.exports = router;
