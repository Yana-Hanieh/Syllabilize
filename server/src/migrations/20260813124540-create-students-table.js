'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Students',{
      studentId:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      studentName:{
        type:Sequelize.STRING,
        allowNull:false
      },
      studentAge:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      classroomId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Classrooms',
          key:'classroomId',
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      createdAt:{
        type:Sequelize.DATE,
        allowNull:false
      },
      updatedAt:{
        type:Sequelize.DATE,
        allowNull:false
      }
    })
  
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('Students')
  }
};
