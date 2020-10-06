const express = require('express');
const { Story } = require('../../db/models');
const { getUserToken } = require('../../config/auth'); //we need to authenticate?

const { asyncHandler } = require('../../utils');

const router = express.Router();

router.post('/', asyncHandler(async (req, res, next) => {
  const { user, title, subtitle, content } = req.body;
  const userId = user.id;
  const story = await Story.create({
    userId,
    title,
    subtitle,
    content,
  });
  
  res.status(201).json({story})
}))