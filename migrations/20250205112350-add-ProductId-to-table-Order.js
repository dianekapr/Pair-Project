'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Orders',
      'ProductId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "id"
        }
      },
      null,

    )
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.removeColumn('Orders', 'ProductId', null);
  }
};
