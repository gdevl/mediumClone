const express = require('express');
const { User, Story } = require("../db/models");
const { getUserToken } = require("../config/auth");

const { asyncHandler } = require("../utils");

const router = express.Router();


router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const stories = await Story.findAll(
      {
        where: { userId: id }, 
        include: {model: User},
      });
    res.render('user', { stories })
  })
)

module.exports = router;