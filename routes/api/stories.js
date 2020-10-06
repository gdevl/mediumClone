const express = require('express');
const { Story } = require('../../db/models');

const { asyncHandler } = require('../../utils');
const {
  handleValidationErrors,
  storyValidator,
} = require('../../validations');

const router = express.Router();

router.post('/', storyValidator, handleValidationErrors, asyncHandler(async (req, res, next) => {
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

module.exports = router;