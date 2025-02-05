'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const product = require("../data/product.json").map(el => {
      delete el.id
      el.createdAt = el.updatedAt = new Date()
      return el
    })

    await queryInterface.bulkInsert('Products', product)
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Products', null, {})
  }
};
