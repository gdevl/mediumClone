const express = require("express");
const { Story, Response, User } = require("../db/models");

const { asyncHandler } = require("../utils");

const router = express.Router();

// this will be absorbed by fe-stories.js

router.get(
  "/stories/:id(\\d+)/responses",
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    // const story = await Story.findByPK(id);
    const responses = await Response.findAll({
      where: { storyId: id },
      order: [["createdAt", "DESC"]],
      include: [{ model: User, as: "user" }],
    });
    
    console.log(re)
    const responseObjs = res.json(responses);
    res.render("responses", { responseObjs, user: req.user });
  })
);

module.exports = router;
