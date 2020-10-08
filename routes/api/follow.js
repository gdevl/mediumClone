const express = require('express');

const { Follow } = require('../../db/models');
const { asyncHandler } = require('../../utils');

const router = express.Router();

router.post('/', asyncHandler(async (req, res, next) => {
  const { followerId, followedId } = req.body;
  const newFollow = await Follow.create({followerId, followedId})

  res.status(201).json( { newFollow } );
}))

module.exports = router;
