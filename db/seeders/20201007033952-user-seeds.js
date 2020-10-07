'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      { firstName: 'Demo', lastName: 'Login', username: 'demologin', email: 'demo@login.com', hashedPassword: bcrypt.hash('Password1!'), createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
