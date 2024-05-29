const path = require('path');
const User = require('../models/userModel');
const CustomError = require('../utils/errorHandler');

exports.htmlLoader = (req, res) => {
  res.sendFile(path.join(__dirname, './../public', 'app.html'));
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
