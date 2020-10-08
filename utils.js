const asyncHandler = (handler) => (req,res,next) => handler(req,res,next).catch(next);


const formatDate = date => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    
    switch (month) {
        case 01:
            return `Jan ${day}, ${year}`;
        case 02:
            return `Feb ${day}, ${year}`;
        case 03:
            return `Mar ${day}, ${year}`;
        case 04:
            return `Apr ${day}, ${year}`;
        case 05:
            return `May ${day}, ${year}`;
        case 06:
            return `June ${day}, ${year}`;
        case 07:
            return `July ${day}, ${year}`;
        case 08:
            return `Aug ${day}, ${year}`;
        case 09:
            return `Sep ${day}, ${year}`;
        case 10:
            return `Oct ${day}, ${year}`;
        case 11:
            return `Nov ${day}, ${year}`;
        case 12:
            return `Dec ${day}, ${year}`;
    }
}

const determineReadTime = content => {
    const wordCount = content.split(' ').length;
    const minutes = Math.round(wordCount / 300);
    return `${minutes} min read`
}

const createTrendingStories = searchReturn => {
    return searchReturn.map(storyClap => {
        return { 
            id: storyClap.Story.id,
            title: storyClap.Story.title,
            authorName: `${storyClap.Story.User.firstName} ${storyClap.Story.User.lastName}`,
            authorAvatar: storyClap.Story.User.avatarUrl,
            date: formatDate(storyClap.Story.updatedAt),
            readTime: determineReadTime(storyClap.Story.content)
        }
    })
}

module.exports = {
    asyncHandler,
    formatDate,
    determineReadTime,
    createTrendingStories
}