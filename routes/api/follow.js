const express = require('express');

const { Follow } = require('../../db/models');
const { asyncHandler } = require('../../utils');

const router = express.Router();

router.post('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const followerId = localStorage.getItem('MEDIUM_CLONE_CURRENT_USER_ID');
  const followedId = req.params.id;
  
  const followed = await Follow.create({followerId, followedId})

  res.status(201).json({followed});
}))

module.exports = router;
