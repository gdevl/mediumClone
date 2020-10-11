const express = require('express');
const { Response, User } = require('../../db/models');
// const { getUserToken } = require('../../config/auth');

const { asyncHandler, formatDate } = require('../../utils');
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
    
    const user = await User.findByPk(userId)
    console.log('CREATED AT: ', newResponse.createdAt)
    const date = formatDate(newResponse.createdAt)
    console.log("newResponse.date", newResponse.date)
    
    res.status(201).json({ newResponse, user, date });
}))




module.exports = router;
