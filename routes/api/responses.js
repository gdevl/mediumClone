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
    const date = formatDate(newResponse.createdAt)
    
    res.status(201).json({ newResponse, user, date });
}));


router.delete('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const response = await Response.findByPk(id);
    await response.destroy();
    res.status(200).json({ message: `Response Id: ${id} has been deleted`});
}));


module.exports = router;
