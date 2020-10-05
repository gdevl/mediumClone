const express = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../../db/models');
const {getUserToken} = require('../../config/auth');

const { handleValidationErrors, signUpValidator } = require('../../validations');
const {asyncHandler} = require('../../utils');


const router = express.Router();

router.post('/', signUpValidator, handleValidationErrors, asyncHandler(async(req,res,next) => {
    const { username, password, email, firstName, lastName, bio, avatarUrl } = req.body;
    const hashedPassword = await bcrypt.hash(password, 16);
    const user = await User.create({
        username,
        email,
        firstName,
        lastName,
        bio,
        avatarUrl,
        hashedPassword,
    });

    const token = getUserToken(user);
    res.status(201).json({
        user: {id:user.id},
        token,
    })
}))


module.exports = router;
