"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      passwordHash: { type: Sequelize.STRING, allowNull: false },
      role: { type: Sequelize.ENUM('admin','manager','member'), allowNull: false, defaultValue: 'member' },
      active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
    await queryInterface.addIndex('Users', ['email'], { unique: true, name: 'users_email_unique' });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
    // drop enum type
    await queryInterface.sequelize.query("DROP TYPE IF EXISTS \"enum_Users_role\";");
  }
};

