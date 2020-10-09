'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      { 
        firstName: 'Demo', 
        lastName: 'Login', 
        username: 'demologin', 
        email: 'demo@login.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'Jon', 
        lastName: 'Snow', 
        username: 'jonsnow', 
        email: 'jon@snow.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'Ned', 
        lastName: 'Stark', 
        username: 'NedStark', 
        email: 'Ned@Stark.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'Catelyn', 
        lastName: 'Stark', 
        username: 'CatelynStark', 
        email: 'Catelyn@Stark.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'Robb', 
        lastName: 'Stark', 
        username: 'RobbStark', 
        email: 'Robb@Stark.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'Sansa', 
        lastName: 'Stark', 
        username: 'SansaStark', 
        email: 'Sansa@Stark.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'Arya', 
        lastName: 'Stark', 
        username: 'AryaStark', 
        email: 'Arya@Stark.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'Bran', 
        lastName: 'Stark', 
        username: 'BranStark', 
        email: 'Bran@Stark.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'Rickon', 
        lastName: 'Stark', 
        username: 'RickonStark', 
        email: 'Rickon@Stark.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'BenJen', 
        lastName: 'Stark', 
        username: 'BenJenStark', 
        email: 'BenJen@Stark.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'Tywin', 
        lastName: 'Lannister', 
        username: 'TywinLannister', 
        email: 'Tywin@Lannister.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'Cersei', 
        lastName: 'Lannister', 
        username: 'CerseiLannister', 
        email: 'Cersei@Lannister.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'Jaimie', 
        lastName: 'Lannister', 
        username: 'JaimieLannister', 
        email: 'Jaimie@Lannister.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'Tyrion', 
        lastName: 'Lannister', 
        username: 'TyrionLannister', 
        email: 'Tyrion@Lannister.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'Joffrey', 
        lastName: 'Lannister', 
        username: 'JoffreyLannister', 
        email: 'Joffrey@Lannister.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'Myrcella', 
        lastName: 'Lannister', 
        username: 'MyrcellaLannister', 
        email: 'Myrcella@Lannister.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'Tommen', 
        lastName: 'Lannister', 
        username: 'TommenLannister', 
        email: 'Tommen@Lannister.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'Kevan', 
        lastName: 'Lannister', 
        username: 'KevanLannister', 
        email: 'Kevan@Lannister.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'Lancel', 
        lastName: 'Lannister', 
        username: 'LancelLannister', 
        email: 'Lancel@Lannister.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'Aemon', 
        lastName: 'Targaryen', 
        username: 'AemonTargaryen', 
        email: 'Aemon@Targaryen.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'Aerys', 
        lastName: 'Targaryen', 
        username: 'AerysTargaryen', 
        email: 'Aerys@Targaryen.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'Rhaella', 
        lastName: 'Targaryen', 
        username: 'RhaellaTargaryen', 
        email: 'Rhaella@Targaryen.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'Rhaegar', 
        lastName: 'Targaryen', 
        username: 'RhaegarTargaryen', 
        email: 'Rhaegar@Targaryen.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'Viserys', 
        lastName: 'Targaryen', 
        username: 'ViserysTargaryen', 
        email: 'Viserys@Targaryen.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'Daenerys', 
        lastName: 'Targaryen', 
        username: 'DaenerysTargaryen', 
        email: 'Daenerys@Targaryen.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        firstName: 'Aegon', 
        lastName: 'Targaryen', 
        username: 'AegonTargaryen', 
        email: 'Aegon@Targaryen.com', 
        hashedPassword: await bcrypt.hash('Password1!', 10), 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
