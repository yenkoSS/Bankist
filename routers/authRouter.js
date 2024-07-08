const express = require('express');
const authController = require('./../controllers/authController');
const { htmlLoader } = require('../controllers/userController');

const router = express.Router();

router.route('/').get(htmlLoader.redirectMiddleware);
router.route('/form').get(htmlLoader.form);
router.route('/dashboard').get(htmlLoader.dashboard);

module.exports = router;
