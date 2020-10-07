'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      { firstName: 'Demi', lastName: 'Logan', username: 'demilogan', email: 'demi@logan.com', hashedPassword: '$2a$16$.B5Jg7Tk0R5bdp2RB6gbD.uuXWQCpFBEcZlBdt.RqXuuFVQINZ42F', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
