'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
     
      userId:{
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        primaryKey:true,
      },
    
      userName:{
        type:Sequelize.STRING, 
        allowNull:false,
      },

      userEmail:{
        type:Sequelize.STRING, 
        allowNull:false,
        unique:true,
      },

      userPermissions:{
        type:Sequelize.STRING, 
        allowNull:true,
      },
            
      userPassword: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      userRole:{
        type:Sequelize.ENUM('admin', 'student'),  
        allowNull:false,
      },  
        
      studentId:{
        type:Sequelize.INTEGER, 
        autoIncrement:true,
        unique:true,
        allowNull:true, 
      },
            
      studentAge:{
        type:Sequelize.INTEGER, 
        allowNull:true,
      },
        
      classroomId:{
        type:Sequelize.INTEGER, 
        allowNull:true, 
        references:{ //always add references for the foreign keys!!
          model:'Classrooms', 
          key:'classroomId',
        }, 
        onUpdate: 'CASCADE',
        onDelete:'SET NULL',
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
  await queryInterface.dropTable('Users');
  }
};
