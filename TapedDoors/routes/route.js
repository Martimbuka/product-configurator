const router = require('express').Router();

const { personData } = require('../controller/appController.js');

// HTTP Request
router.post('/person', personData);

module.exports = router;