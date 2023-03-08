const User = require('../models/userModel.js');
const bcryptjs = require('bcryptjs');
const { generateToken } = require('../utils.js');

exports.loginAuth = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcryptjs.compareSync(req.body.password, user.password)) {
      const token = await generateToken(user);
      res.send({ message: 'Generated Token', token: token });
    }
    return;
  } else {
    res.status(404).send({ message: 'User not Found!' });
  }
};
