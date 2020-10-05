const express = require('express');
const { handleValidationErrors, signUpValidator } = require('../../validations');
const {asyncHandler} = require('../../utils');


const router = express.Router();
