const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/').get(userController.htmlLoader);
router
  .route('/myaccount')
  .get(authController.protect, userController.myAccount);
router.route('/signup').post(authController.signUp);
router.route('/login').post(authController.login);
router.route('/requestAmount').post(userController.requestAmount);

module.exports = router;
