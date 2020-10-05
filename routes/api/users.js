const express = require('express');
const { handleValidationErrors, signUpValidator } = require('../../validations');
const {asyncHandler} = require('../../utils');
const { route } = require('../../app');


const router = express.Router();

router.post('/', signUpValidator, handleValidationErrors, asyncHandler(async(req,res,next) => {
    const { username, password, email, firstName, lastName, bio, avatarUrl } = req.body;

}))


module.exports = router;
