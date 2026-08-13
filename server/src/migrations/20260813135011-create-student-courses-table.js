'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('StudentCourses', {
    courseId:{
          type:Sequelize.INTEGER, 
          allowNull:false, 
          references:{
            model:'Courses',
            key:'courseId',
        }, 
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
        primaryKey:true // part of the composite primary key
      },
       studentId:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Students',
          key:'studentId',
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
        primaryKey:true // part of the composite primary key
      },
       createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.dropTable('StudentCourses')
  }
};
