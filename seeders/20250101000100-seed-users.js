"use strict";

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const password = await bcrypt.hash('Password123!', 10);
    const now = new Date();
    await queryInterface.bulkInsert('Users', [
      { name: 'Admin', email: 'admin@example.com', passwordHash: password, role: 'admin', active: true, createdAt: now, updatedAt: now },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', { email: ['admin@example.com'] });
  }
};

