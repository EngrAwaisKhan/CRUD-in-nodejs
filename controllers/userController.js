const User = require('../models/userModel.js');
// const data = require('../data.js');
const bcryptjs = require('bcryptjs');

exports.getUsers = async (req, res) => {
  const users = await User.find({});
  if (users != null) {
    res.send({ users });
  } else {
    res.status(404).send({ message: 'No User Found!' });
  }
};
exports.createUser = async (req, res) => {
  //   await User.deleteMany({});

  if (req.body.password === req.body.confirmPassword) {
    const createdUsers = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password),
    });
    createdUsers.save();
    res.send({ createdUsers });
  } else {
    res
      .status(404)
      .send({ message: 'Password and Confirm Password must be match!' });
  }
};
exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send({ user });
  } else {
    res.status(404).send({ message: 'No User Found!' });
  }
};
exports.updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    // user.password = bcryptjs.hashSync(req.body.password) || user.password;
    const updatedUser = await user.save();
    res.send({ message: 'User Updated Successfully!', user: updatedUser });
  } else {
    res.status(404).send({ message: 'User Not Found!' });
  }
};
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (user) {
    res.send({ message: 'User deleted Successfully!', user: user });
  } else {
    res.status(404).send({ message: 'User not Found!' });
  }
};
