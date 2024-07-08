const path = require('path');
const User = require('../models/userModel');
const CustomError = require('../utils/errorHandler');

exports.htmlLoader = (req, res) => {
  res.sendFile(path.join(__dirname, './../public', 'app.html'));
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json({ status: 'success', data: users });
  } catch (err) {
    const customError = new CustomError(500, 'fail', err.message);
    next(customError);
  }
};

exports.postUser = async (req, res) => {
  try {
    console.log('not implemented yet.');
    const newUserData = req.body;
    const newUser = await User.save(newUserData);
    res.status(200).json({ status: 'success', data: newUser });
  } catch (err) {
    console.log(err);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    res
      .status(200)
      .json({ status: 'success', data: user, userId: user._id.valueOf() });
  } catch (err) {
    console.log(err);
  }
};

exports.updateUserById = (req, res) => {
  console.log('Not implemented yet.');
};

exports.deleteUserById = (req, res) => {
  console.log('Not implemented yet.');
};

exports.myAccount = async (req, res, next) => {
  try {
    console.log(req.id);
    const user = await User.findById(req.id);

    if (!user) {
      throw new CustomError(404, 'fail', 'User not found.');
    }

    res.status(200).json({ status: 'success', data: user });
  } catch (err) {
    if ((err.message.startsWith = 'Cast')) {
      const customError = new CustomError(404, 'fail', 'User not found.');
      next(customError);
    }

    const customError = new CustomError(400, 'fail', err.message);
    next(customError);
  }
};

exports.requestAmount = async (req, res, next) => {
  try {
    const requestedAmount = req.body.reqAmount;
    const transaction = {
      date: new Date(),
      amount: requestedAmount,
      category: 'Credit',
    };
    const user = await User.findByIdAndUpdate(
      { _id: req.id },
      { $push: { movements: transaction } }
    );
    res.status(200).json({ status: 'success', message: 'user updated.' });
  } catch (err) {
    const error = new CustomError(400, 'fail', err.message);
  }
};
