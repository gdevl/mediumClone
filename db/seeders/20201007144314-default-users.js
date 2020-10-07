"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "rwemerson",
          email: "ralph@philosophers.org",
          firstName: "Ralph",
          lastName: "Emerson",
          bio:
            "Ralph Waldo Emerson, who went by his middle name Waldo, was an American essayist, lecturer, philosopher, and poet who led the transcendentalist movement of the mid-19th century.",
          avatarUrl:
            "https://pbs.twimg.com/profile_images/704285531836948481/jeGmdUOZ_400x400.jpg",
          hashedPassword:
            "$2a$16$GNLiEU33rzqdYf04yTsPmOtElYqll7w/7ODmJIPXd8nDCNRw5fhiS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "cdickens",
          email: "charles@authors.org",
          firstName: "Charles",
          lastName: "Dickens",
          bio:
            "Charles John Huffam Dickens FRSA was an English writer and social critic. He created some of the world's best-known fictional characters and is regarded by many as the greatest novelist of the Victorian era.",
          avatarUrl:
            "https://pbs.twimg.com/profile_images/615276816014520320/SLVv3AeB.jpg",
          hashedPassword:
            "$2a$16$GNLiEU33rzqdYf04yTsPmOtElYqll7w/7ODmJIPXd8nDCNRw5fhiS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "hthoreau",
          email: "hank@philosophers.org",
          firstName: "Henry",
          lastName: "Thoreau",
          bio:
            "Henry David Thoreau was an American naturalist, essayist, poet, and philosopher. A leading transcendentalist, he is best known for his book Walden, a reflection upon simple living in natural surroundings, and his essay 'Civil Disobedience', an argument for disobedience to an unjust state.",
          avatarUrl:
            "https://pbs.twimg.com/profile_images/718469638921650177/64AbJqfT_400x400.jpg",
          hashedPassword:
            "$2a$16$GNLiEU33rzqdYf04yTsPmOtElYqll7w/7ODmJIPXd8nDCNRw5fhiS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "fdouglass",
          email: "fred@authors.org",
          firstName: "Frederick",
          lastName: "Douglass",
          bio:
            "Frederick Douglass was an American social reformer, abolitionist, orator, writer, and statesman. After escaping from slavery in Maryland, he became a national leader of the abolitionist movement in Massachusetts and New York, becoming famous for his oratory and incisive antislavery writings.",
          avatarUrl:
            "https://pbs.twimg.com/profile_images/740153951920771072/_BlRqvBP_400x400.jpg",
          hashedPassword:
            "$2a$16$GNLiEU33rzqdYf04yTsPmOtElYqll7w/7ODmJIPXd8nDCNRw5fhiS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
