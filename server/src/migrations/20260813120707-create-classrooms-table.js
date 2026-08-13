'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) { //what happens when we want to apply the migration(create table)
   await queryInterface.createTable('Classrooms', {
      classroomId:{
          type:Sequelize.INTEGER, 
          autoIncrement:true, //allows to generate automatic classroom id, autoIncrement is used for numeric columns
          primaryKey:true, //set it to primary key
      },
      classroomName:{
          type: Sequelize.STRING,
          allowNull:false
      },
      createdAt:{ //a new field thats added by default by sequelize, its an automatically managed timestamp that gets set once a row is inserted
        type:Sequelize.DATE,
        allowNull:false,
      },
      updatedAt:{ //a new field thats added by default by sequelize, its an automatically managed timestamp that gets refreshed everytime a row changes
        type: Sequelize.DATE,
        allowNull:false,
      }
   });
  },

  async down (queryInterface, Sequelize) { //what happens when we want to reverse the migration(delete the table)
   await queryInterface.dropTable('Classrooms') //just deletes the table
  }
};
