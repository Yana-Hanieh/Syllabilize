'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'studentId', {
      type: Sequelize.INTEGER, 
      unique: true, 
      allowNull: true,
      autoIncrement: false, 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'studentId', {
      type: Sequelize.INTEGER, 
      unique: true, 
      allowNull: true, 
      autoIncrement: true,
    });
  }
};
