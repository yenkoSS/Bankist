const path = require('path');
const CustomError = require('./../utils/errorHandler');
const jwt = require('jsonwebtoken');

exports.dashboard = (req, res) => {
  res.sendFile(path.join(__dirname, './../public', 'dashboard.html'));
};

exports.form = (req, res) => {
  res.sendFile(path.join(__dirname, './../public', 'form.html'));
};

exports.redirectMiddleware = (req, res, next) => {
  try {
    const cookie = req.cookies.authCookie;
    if (!cookie) {
      return res.redirect('/form');
    }
    const token = jwt.verify(cookie, process.env.JWT_PASSWORD);
    req.id = token.id;
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
  }
};

exports.protect = async (req, res, next) => {
  try {
    const JWTtoken = req.cookies.token;

    if (!JWTtoken) {
      /*throw new CustomError(401, 'fail', 'You are not authenticated.'); */
      res.redirect('/form');
    } else {
      const token = jwt.verify(JWTtoken, process.env.JWT_PASSWORD);

      req.id = token.id;
      next();
    }
  } catch (err) {
    if (err.message.startsWith('Invalid signature')) {
      const error = new CustomError(401, 'fail', 'Invalid signature!');
      next(error);
    }
    const error = new CustomError(400, err.status, err.message);
    next(error);
  }
};
