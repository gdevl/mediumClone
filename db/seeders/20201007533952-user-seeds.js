'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      { firstName: 'Demo', lastName: 'Login', username: 'demologin', email: 'demo@login.com', hashedPassword: await bcrypt.hash('Password1!'), createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
