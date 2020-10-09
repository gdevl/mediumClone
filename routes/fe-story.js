const express = require("express");

const router = express.Router();

const { asyncHandler, formatDate, determineReadTime } = require("../utils");
const { User, Story } = require('../db/models');


router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const storyId = parseInt(req.params.id, 10);
    const storyData = await Story.findOne({ 
        where: { id: storyId },
        include: User,
        attributes: [
            'id', 
            'title', 
            'subtitle', 
            'content', 
            'updatedAt',
        ]
    });
    
    const story = {
        id: storyData.id,
        title: storyData.title,
        subtitle: storyData.subtitle,
        content: storyData.content,
        readTime: determineReadTime(storyData.content),
        date: formatDate(storyData.updatedAt),
        authorId: storyData.User.id,
        authorName: `${storyData.User.firstName} ${storyData.User.lastName}`,
        avatarUrl: storyData.User.avatarUrl,
        bio: storyData.User.bio
    }
    res.render('story-page', { story });
    // res.json(story)
}));


// router.get("/:id(\\d+)", asyncHandler(async (req, res, next) => {
//     const storyId = parseInt(req.params.id, 10);
//     const storyJSON = await fetch(`/stories/${storyId}`);
//     const story = await storyJSON.json();
//     res.render('story-page', { story });
// }));



//*Attempt to find Responses Count
// const storyId = parseInt(req.params.id, 10);
//     const storyData = await Story.findOne({ 
//         group: ['Story.id'],
//         where: { id: storyId },
//         include: [{ model: User }, { model: Response, attributes: []}],
//         attributes: [
//             'id', 
//             'title', 
//             'subtitle', 
//             'content', 
//             'updatedAt',
//             [sequelize.fn('COUNT', sequelize.col('Response.id')), 'num_responses'],
//         ]
//     });
//     console.log('STORY DATA: ', storyData)
//     const story = {
//         id: storyData.id,
//         title: storyData.title,
//         subtitle: storyData.subtitle,
//         content: storyData.content,
//         date: formatDate(storyData.updatedAt),
//         authorName: `${storyData.User.firstName} ${storyData.User.lastName}`,
//         avatarUrl: storyData.User.avatarUrl,
//         bio: storyData.User.bio
//     }
//     res.render('story-page', { story });



module.exports = router;