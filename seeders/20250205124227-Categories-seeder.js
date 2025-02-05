'use strict';
const fs = require ('fs').promises

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface, Sequelize) {
    let category = JSON.parse (await fs.readFile("./data/category.json", "utf-8"))
    
    category.forEach(el => {
      delete el.id
      el.createdAt = new Date ()
      el.updatedAt = new Date ()
    });

    await queryInterface.bulkInsert('Categories', category,{});

  },


  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
 }
};