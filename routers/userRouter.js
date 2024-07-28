const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

/*router.route('/').get(userController.htmlLoader);

router
  .route('/myaccount')
  .get(authController.protect, userController.myAccount); */

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

router.route('/').get(authController.protect, userController.getAllUsers);
router.route('/').post(authController.protect, userController.postUser);
router.route('/:id').get(authController.protect, userController.getUserById);
router.route('/:id').put(authController.protect, userController.updateUserById);
router
  .route('/:id')
  .delete(authController.protect, userController.deleteUserById);

module.exports = router;
