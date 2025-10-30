const bcrypt = require('bcrypt');

module.exports = {
  hash: (plain) => bcrypt.hash(plain, 10),
  compare: (plain, hash) => bcrypt.compare(plain, hash)
};

