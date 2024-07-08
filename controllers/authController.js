const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const CustomError = require('./../utils/errorHandler');

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res
      .status(201)
      .json({ status: 'success', message: 'User created', data: newUser });
  } catch (err) {
    if (err.message.startsWith('E11000')) {
      const error = new CustomError(
        409,
        'fail',
        'Email address already registered in database.'
      );
      next(error);
    }

    if (err.message.startsWith('User validation failed: password')) {
      const error = new CustomError(
        400,
        'fail',
        'You must provide a password.'
      );
      next(error);
    }

    if (err.message.startsWith('User validation failed: email')) {
      const error = new CustomError(
        400,
        'fail',
        'You must provide an email address.'
      );
      next(error);
    }
  }
};

exports.login = async (req, res, next) => {
  try {
    const clientEmail = req.body.email;
    const clientPassword = req.body.password;

    if (!clientEmail || !clientPassword) {
      throw new CustomError(
        400,
        'fail',
        'You must provide email address and password.'
      );
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new CustomError(404, 'fail', 'Email not found in our database.');
    }

    if (user.password !== clientPassword) {
      throw new CustomError(400, 'fail', 'Invalid password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_PASSWORD);
    console.log(user._id);
    res.cookie('token', token, { maxAge: 1000 * 60 * 2, httpOnly: true });
    res.cookie('userId', user._id.valueOf(), { maxAge: 1000 * 60 * 2 });
    res
      .status(200)
      .json({ status: 'success', message: 'You are authenticated.' });
  } catch (err) {
    next(err);
  }
};

exports.protect = (req, res, next) => {
  try {
    const cookie = req.cookies;
    console.log(cookie);
    if (!cookie) {
      /*throw new CustomError(401, 'fail', 'You are not authenticated.'); */
      res.redirect('/form');
    }

    const token = jwt.verify(cookie, process.env.JWT_PASSWORD);
    console.log(`This is the cookie and token: ${cookie}, ${token}`);
    next();
  } catch (err) {
    if (err.message.startsWith('Invalid signature')) {
      const error = new CustomError(401, 'fail', 'Invalid signature!');
      next(error);
    }
    const error = new CustomError(400, err.status, err.message);
    next(error);
  }
};
