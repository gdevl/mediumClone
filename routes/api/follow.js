const express = require("express");

const { Follow } = require("../../db/models");
const { asyncHandler } = require("../../utils");

const router = express.Router();

router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const { followerId, followedId } = req.body;

    const newFollow = await Follow.create({ followerId, followedId });
    const followersArr = await Follow.findAll({
      where: {
        followedId : followedId
      }
    })
    const followers = `${followersArr.length} Followers`

    res.status(201).json({ newFollow, followers });
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
    const followersArr = await Follow.findAll({
      where: {
        followedId: followedId
      }
    })
    const followers = `${followersArr.length} Followers`;
    res.status(201).json({message: "Follow deleted", followers});
  })
);

module.exports = router;
