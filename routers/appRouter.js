const express = require('express');
const appController = require('../controllers/appController');

const router = express.Router();

router.route('/').get(appController.redirectMiddleware);
router.route('/form').get(appController.form);
router.route('/dashboard').get(appController.protect, appController.dashboard);

module.exports = router;
