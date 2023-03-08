const bcryptjs = require('bcryptjs');

module.exports = {
  users: [
    {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: bcryptjs.hashSync('password123'),
    },
    {
      name: 'Doe Johns',
      email: 'janedoe123@example.com',
      password: bcryptjs.hashSync('password123'),
    },
  ],
};




