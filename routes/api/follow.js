const express = require("express");

const { Follow } = require("../../db/models");
const { asyncHandler } = require("../../utils");

const router = express.Router();

router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const { followerId, followedId } = req.body;
    // console.log(`FollowedId: ${followedId}`);
    console.log("req.body: ", req.body);
    const newFollow = await Follow.create({ followerId, followedId });

    res.status(201).json({ newFollow });
  })
);

router.delete(
  "/",
  asyncHandler(async (req, res, next) => {
    const { followerId, followedId } = req.body;
    await Follow.destroy({
      where: {
        followerId,
        followedId,
      },
    });
    res.status(201).json("Follow deleted");
  })
);

module.exports = router;
