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

router.route('/').get(userController.getAllUsers);
router.route('/').post(userController.postUser);
router.route('/:id').get(userController.getUserById);
router.route('/:id').put(userController.updateUserById);
router.route('/:id').delete(userController.deleteUserById);

module.exports = router;
