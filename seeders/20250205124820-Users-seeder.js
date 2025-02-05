'use strict';
const fs = require ('fs').promises

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface, Sequelize) {
    let user = JSON.parse (await fs.readFile("./data/user.json", "utf-8"))
    
    user.forEach(el => {
      delete el.id
      el.createdAt = new Date ()
      el.updatedAt = new Date ()
    });

    await queryInterface.bulkInsert('Users', user,{});

  },


  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
 }
};