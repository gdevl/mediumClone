const express = require("express");
const { Story, Response, User } = require("../db/models");

const { asyncHandler } = require("../utils");

const router = express.Router();

// this will be absorbed by stories.js

router.get(
  "/stories/:id(\\d+)/responses",
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    // const story = await Story.findByPK(id);
    const responsesJson = await Response.findAll({
        where: { storyId: id },
        order: [['createdAt', 'DESC']],
        include: [{ model: User, as: 'user' }],
    });

    const responseObjs = res.json(responsesJson);
    res.render('responses', { responseObjs });
  })
)

module.exports = router;
