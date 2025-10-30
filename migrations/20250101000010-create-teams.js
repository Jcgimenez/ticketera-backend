"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Teams', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Teams');
  }
};

