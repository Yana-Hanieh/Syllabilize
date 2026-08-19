'use strict';

const bcrypt = require('bcrypt');
const {v4: uuidv4} = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPasswordA = await bcrypt.hash('adminA', 10);
    const hashedPasswordB = await bcrypt.hash('adminB', 10);

    await queryInterface.bulkInsert('Users',[
      {
        userId: uuidv4(),
        userName: 'Admin A',
        userEmail: 'adminA@school.com',
        userPassword: hashedPasswordA,
        userRole: 'admin',
        userPermissions: null,
        studentId: null,
        studentAge: null,
        classroomId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
       {
        userId: uuidv4(),
        userName: 'Admin B',
        userEmail: 'adminB@school.com',
        userPassword:hashedPasswordB,
        userRole: 'admin',
        userPermissions: null,
        studentId: null,
        studentAge: null,
        classroomId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {userEmail:'adminA@school.com'});
    await queryInterface.bulkDelete('Users', {userEmail:'adminB@school.com'});
  }
};
